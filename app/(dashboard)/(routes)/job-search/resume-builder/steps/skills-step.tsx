'use client'

import React from "react"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Plus, X } from 'lucide-react'

interface SkillsStepProps {
  data: string[]
  onChange: (data: string[]) => void
}

const suggestedSkills = [
  'JavaScript',
  'TypeScript',
  'React',
  'Node.js',
  'Python',
  'SQL',
  'AWS',
  'Git',
  'Docker',
  'Agile',
  'Leadership',
  'Communication',
]

export function SkillsStep({ data, onChange }: SkillsStepProps) {
  const [newSkill, setNewSkill] = useState('')

  const addSkill = (skill: string) => {
    const trimmed = skill.trim()
    if (trimmed && !data.includes(trimmed)) {
      onChange([...data, trimmed])
    }
    setNewSkill('')
  }

  const removeSkill = (skill: string) => {
    onChange(data.filter((s) => s !== skill))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addSkill(newSkill)
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">Skills</h2>
        <p className="text-muted-foreground">Add your technical and soft skills</p>
      </div>

      <div>
        <Label htmlFor="newSkill">Add a Skill</Label>
        <div className="flex gap-2 mt-2">
          <Input
            id="newSkill"
            placeholder="Type a skill and press Enter"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button onClick={() => addSkill(newSkill)} disabled={!newSkill.trim()}>
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {data.length > 0 && (
        <div>
          <Label className="mb-2 block">Your Skills</Label>
          <div className="flex flex-wrap gap-2">
            {data.map((skill) => (
              <Badge key={skill} variant="secondary" className="px-3 py-1.5 text-sm">
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="ml-2 hover:text-destructive"
                  aria-label={`Remove ${skill}`}
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      )}

      <div>
        <Label className="mb-2 block">Suggested Skills</Label>
        <div className="flex flex-wrap gap-2">
          {suggestedSkills
            .filter((skill) => !data.includes(skill))
            .map((skill) => (
              <Badge
                key={skill}
                variant="outline"
                className="px-3 py-1.5 text-sm cursor-pointer hover:bg-secondary transition-colors"
                onClick={() => addSkill(skill)}
              >
                <Plus className="w-3 h-3 mr-1" />
                {skill}
              </Badge>
            ))}
        </div>
      </div>
    </div>
  )
}
