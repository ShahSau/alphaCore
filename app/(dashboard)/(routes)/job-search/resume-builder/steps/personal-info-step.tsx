'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { PersonalInfo } from '../constants'

interface PersonalInfoStepProps {
  data: PersonalInfo
  onChange: (data: PersonalInfo) => void
}

export function PersonalInfoStep({ data, onChange }: PersonalInfoStepProps) {
  const handleChange = (field: keyof PersonalInfo, value: string) => {
    onChange({ ...data, [field]: value })
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">Let's start with the basics</h2>
        <p className="text-muted-foreground">Tell us about yourself</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            placeholder="John Doe"
            value={data.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            className="mt-2"
          />
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="john@example.com"
            value={data.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className="mt-2"
          />
        </div>

        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+1 (555) 123-4567"
            value={data.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            className="mt-2"
          />
        </div>

        <div className="sm:col-span-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            placeholder="San Francisco, CA"
            value={data.location}
            onChange={(e) => handleChange('location', e.target.value)}
            className="mt-2"
          />
        </div>

        <div>
          <Label htmlFor="linkedin">LinkedIn (optional)</Label>
          <Input
            id="linkedin"
            placeholder="linkedin.com/in/johndoe"
            value={data.linkedin || ''}
            onChange={(e) => handleChange('linkedin', e.target.value)}
            className="mt-2"
          />
        </div>

        <div>
          <Label htmlFor="website">Website (optional)</Label>
          <Input
            id="website"
            placeholder="johndoe.com"
            value={data.website || ''}
            onChange={(e) => handleChange('website', e.target.value)}
            className="mt-2"
          />
        </div>
      </div>
    </div>
  )
}
