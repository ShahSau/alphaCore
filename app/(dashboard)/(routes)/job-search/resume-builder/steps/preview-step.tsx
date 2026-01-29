'use client'

import type { ResumeData } from '../constants'
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react'

interface PreviewStepProps {
  data: ResumeData
}

export function PreviewStep({ data }: PreviewStepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">Preview Your Resume</h2>
        <p className="text-muted-foreground">Review your resume before downloading</p>
      </div>

      <div id="resume-preview" className="bg-white text-gray-900 p-8 rounded-lg shadow-lg max-w-3xl mx-auto">
        {/* Header */}
        <div className="border-b border-gray-200 pb-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{data.personalInfo.fullName || 'Your Name'}</h1>
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            {data.personalInfo.email && (
              <span className="flex items-center gap-1">
                <Mail className="w-4 h-4" />
                {data.personalInfo.email}
              </span>
            )}
            {data.personalInfo.phone && (
              <span className="flex items-center gap-1">
                <Phone className="w-4 h-4" />
                {data.personalInfo.phone}
              </span>
            )}
            {data.personalInfo.location && (
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {data.personalInfo.location}
              </span>
            )}
            {data.personalInfo.linkedin && (
              <span className="flex items-center gap-1">
                <Linkedin className="w-4 h-4" />
                {data.personalInfo.linkedin}
              </span>
            )}
            {data.personalInfo.website && (
              <span className="flex items-center gap-1">
                <Globe className="w-4 h-4" />
                {data.personalInfo.website}
              </span>
            )}
          </div>
        </div>

        {/* Summary */}
        {data.summary && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2 uppercase tracking-wide">Professional Summary</h2>
            <p className="text-gray-700 leading-relaxed">{data.summary}</p>
          </div>
        )}

        {/* Experience */}
        {data.experiences.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 uppercase tracking-wide">Experience</h2>
            <div className="space-y-4">
              {data.experiences.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">{exp.position || 'Position'}</h3>
                      <p className="text-gray-600">{exp.company || 'Company'}</p>
                    </div>
                    <span className="text-sm text-gray-500">
                      {exp.startDate || 'Start'} - {exp.current ? 'Present' : exp.endDate || 'End'}
                    </span>
                  </div>
                  {exp.description && <p className="text-gray-700 mt-2 leading-relaxed">{exp.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 uppercase tracking-wide">Education</h2>
            <div className="space-y-4">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">{edu.school || 'School'}</h3>
                      <p className="text-gray-600">
                        {edu.degree || 'Degree'} {edu.field ? `in ${edu.field}` : ''}
                        {edu.gpa && <span className="text-gray-500"> | GPA: {edu.gpa}</span>}
                      </p>
                    </div>
                    <span className="text-sm text-gray-500">
                      {edu.startDate || 'Start'} - {edu.endDate || 'End'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2 uppercase tracking-wide">Skills</h2>
            <p className="text-gray-700">{data.skills.join(' • ')}</p>
          </div>
        )}
      </div>
    </div>
  )
}
