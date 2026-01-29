'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { StepProgress } from './steps/step-progress'
import { PersonalInfoStep } from './steps/personal-info-step'
import { SummaryStep } from './steps/summary-step'
import { ExperienceStep } from './steps/experience-step'
import { EducationStep } from './steps/education-step'
import { SkillsStep } from './steps/skills-step'
import { PreviewStep } from './steps/preview-step'
import { type ResumeData, initialResumeData } from './constants'
import { ChevronLeft, ChevronRight, Download, FileText } from 'lucide-react'
import html2canvas from 'html2canvas-pro'
import jsPDF from 'jspdf'

const steps = ['Personal Info', 'Summary', 'Experience', 'Education', 'Skills', 'Preview']

export function ResumeBuilder() {
  const [currentStep, setCurrentStep] = useState(0)
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData)
  const [isGenerating, setIsGenerating] = useState(false)
  const previewRef = useRef<HTMLDivElement>(null)

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleDownload = async () => {
    const element = document.getElementById('resume-preview')
    if (!element) return

    setIsGenerating(true)

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      })

      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      })

      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()
      const imgWidth = canvas.width
      const imgHeight = canvas.height
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight)
      const imgX = (pdfWidth - imgWidth * ratio) / 2
      const imgY = 10

      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio)
      pdf.save(`${resumeData.personalInfo.fullName || 'resume'}.pdf`)
    } catch (error) {
      console.error('Error generating PDF:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <PersonalInfoStep
            data={resumeData.personalInfo}
            onChange={(data) => setResumeData({ ...resumeData, personalInfo: data })}
          />
        )
      case 1:
        return (
          <SummaryStep data={resumeData.summary} onChange={(data) => setResumeData({ ...resumeData, summary: data })} />
        )
      case 2:
        return (
          <ExperienceStep
            data={resumeData.experiences}
            onChange={(data) => setResumeData({ ...resumeData, experiences: data })}
          />
        )
      case 3:
        return (
          <EducationStep
            data={resumeData.education}
            onChange={(data) => setResumeData({ ...resumeData, education: data })}
          />
        )
      case 4:
        return (
          <SkillsStep data={resumeData.skills} onChange={(data) => setResumeData({ ...resumeData, skills: data })} />
        )
      case 5:
        return <PreviewStep data={resumeData} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <StepProgress currentStep={currentStep} totalSteps={steps.length} steps={steps} />

        <div ref={previewRef} className="bg-card border border-border rounded-2xl p-6 sm:p-8 mb-8">
          {renderStep()}
        </div>

        <div className="flex justify-between items-center">
          <Button variant="outline" onClick={handleBack} disabled={currentStep === 0} className="gap-2 bg-transparent">
            <ChevronLeft className="w-4 h-4" />
            Back
          </Button>

          {currentStep === steps.length - 1 ? (
            <Button onClick={handleDownload} disabled={isGenerating} className="gap-2">
              <Download className="w-4 h-4" />
              {isGenerating ? 'Generating PDF...' : 'Download PDF'}
            </Button>
          ) : (
            <Button onClick={handleNext} className="gap-2">
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
