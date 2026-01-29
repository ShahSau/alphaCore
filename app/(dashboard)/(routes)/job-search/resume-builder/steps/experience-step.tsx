'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent } from '@/components/ui/card'
import type { Experience } from '../constants'
import { Plus, Trash2 } from 'lucide-react'

interface ExperienceStepProps {
  data: Experience[]
  onChange: (data: Experience[]) => void
}

export function ExperienceStep({ data, onChange }: ExperienceStepProps) {
  const addExperience = () => {
    const newExperience: Experience = {
      id: crypto.randomUUID(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    }
    onChange([...data, newExperience])
  }

  const removeExperience = (id: string) => {
    onChange(data.filter((exp) => exp.id !== id))
  }

  const updateExperience = (id: string, field: keyof Experience, value: string | boolean) => {
    onChange(data.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)))
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">Work Experience</h2>
        <p className="text-muted-foreground">Add your relevant work history</p>
      </div>

      <div className="space-y-4">
        {data.map((experience, index) => (
          <Card key={experience.id} className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-muted-foreground">Experience {index + 1}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeExperience(experience.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor={`company-${experience.id}`}>Company</Label>
                  <Input
                    id={`company-${experience.id}`}
                    placeholder="Company name"
                    value={experience.company}
                    onChange={(e) => updateExperience(experience.id, 'company', e.target.value)}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor={`position-${experience.id}`}>Position</Label>
                  <Input
                    id={`position-${experience.id}`}
                    placeholder="Job title"
                    value={experience.position}
                    onChange={(e) => updateExperience(experience.id, 'position', e.target.value)}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor={`startDate-${experience.id}`}>Start Date</Label>
                  <Input
                    id={`startDate-${experience.id}`}
                    placeholder="MM/YYYY"
                    value={experience.startDate}
                    onChange={(e) => updateExperience(experience.id, 'startDate', e.target.value)}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor={`endDate-${experience.id}`}>End Date</Label>
                  <Input
                    id={`endDate-${experience.id}`}
                    placeholder="MM/YYYY"
                    value={experience.endDate}
                    onChange={(e) => updateExperience(experience.id, 'endDate', e.target.value)}
                    className="mt-2"
                    disabled={experience.current}
                  />
                </div>

                <div className="sm:col-span-2 flex items-center space-x-2">
                  <Checkbox
                    id={`current-${experience.id}`}
                    checked={experience.current}
                    onCheckedChange={(checked) => updateExperience(experience.id, 'current', !!checked)}
                  />
                  <Label htmlFor={`current-${experience.id}`} className="text-sm font-normal cursor-pointer">
                    I currently work here
                  </Label>
                </div>

                <div className="sm:col-span-2">
                  <Label htmlFor={`description-${experience.id}`}>Description</Label>
                  <Textarea
                    id={`description-${experience.id}`}
                    placeholder="Describe your responsibilities and achievements..."
                    value={experience.description}
                    onChange={(e) => updateExperience(experience.id, 'description', e.target.value)}
                    className="mt-2 min-h-[100px] resize-none"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button variant="outline" onClick={addExperience} className="w-full bg-transparent">
        <Plus className="w-4 h-4 mr-2" />
        Add Experience
      </Button>
    </div>
  )
}
