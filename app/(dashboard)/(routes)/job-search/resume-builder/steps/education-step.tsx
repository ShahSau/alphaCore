'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import type { Education } from '../constants'
import { Plus, Trash2 } from 'lucide-react'

interface EducationStepProps {
  data: Education[]
  onChange: (data: Education[]) => void
}

export function EducationStep({ data, onChange }: EducationStepProps) {
  const addEducation = () => {
    const newEducation: Education = {
      id: crypto.randomUUID(),
      school: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      gpa: '',
    }
    onChange([...data, newEducation])
  }

  const removeEducation = (id: string) => {
    onChange(data.filter((edu) => edu.id !== id))
  }

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    onChange(data.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)))
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">Education</h2>
        <p className="text-muted-foreground">Add your educational background</p>
      </div>

      <div className="space-y-4">
        {data.map((education, index) => (
          <Card key={education.id} className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-muted-foreground">Education {index + 1}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeEducation(education.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <Label htmlFor={`school-${education.id}`}>School / University</Label>
                  <Input
                    id={`school-${education.id}`}
                    placeholder="University name"
                    value={education.school}
                    onChange={(e) => updateEducation(education.id, 'school', e.target.value)}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor={`degree-${education.id}`}>Degree</Label>
                  <Input
                    id={`degree-${education.id}`}
                    placeholder="Bachelor's, Master's, etc."
                    value={education.degree}
                    onChange={(e) => updateEducation(education.id, 'degree', e.target.value)}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor={`field-${education.id}`}>Field of Study</Label>
                  <Input
                    id={`field-${education.id}`}
                    placeholder="Computer Science"
                    value={education.field}
                    onChange={(e) => updateEducation(education.id, 'field', e.target.value)}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor={`startDate-${education.id}`}>Start Date</Label>
                  <Input
                    id={`startDate-${education.id}`}
                    placeholder="MM/YYYY"
                    value={education.startDate}
                    onChange={(e) => updateEducation(education.id, 'startDate', e.target.value)}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor={`endDate-${education.id}`}>End Date</Label>
                  <Input
                    id={`endDate-${education.id}`}
                    placeholder="MM/YYYY"
                    value={education.endDate}
                    onChange={(e) => updateEducation(education.id, 'endDate', e.target.value)}
                    className="mt-2"
                  />
                </div>

                <div className="sm:col-span-2">
                  <Label htmlFor={`gpa-${education.id}`}>GPA (optional)</Label>
                  <Input
                    id={`gpa-${education.id}`}
                    placeholder="3.8/4.0"
                    value={education.gpa || ''}
                    onChange={(e) => updateEducation(education.id, 'gpa', e.target.value)}
                    className="mt-2"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button variant="outline" onClick={addEducation} className="w-full bg-transparent">
        <Plus className="w-4 h-4 mr-2" />
        Add Education
      </Button>
    </div>
  )
}
