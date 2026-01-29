'use client'

import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

interface SummaryStepProps {
  data: string
  onChange: (data: string) => void
}

export function SummaryStep({ data, onChange }: SummaryStepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">Professional Summary</h2>
        <p className="text-muted-foreground">Write a brief overview of your professional background</p>
      </div>

      <div>
        <Label htmlFor="summary">Summary</Label>
        <Textarea
          id="summary"
          placeholder="Experienced software engineer with 5+ years of expertise in building scalable web applications. Passionate about creating elegant solutions to complex problems and mentoring junior developers..."
          value={data}
          onChange={(e) => onChange(e.target.value)}
          className="mt-2 min-h-[200px] resize-none"
          rows={8}
        />
        <p className="text-sm text-muted-foreground mt-2">
          Tip: Keep it concise (3-4 sentences) and highlight your key strengths and career goals.
        </p>
      </div>
    </div>
  )
}
