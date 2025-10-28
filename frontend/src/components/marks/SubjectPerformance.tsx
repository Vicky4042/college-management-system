import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { BookOpen } from 'lucide-react'

interface SubjectPerformanceProps {
  student: any
}

export function SubjectPerformance({ student }: SubjectPerformanceProps) {
  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'default'
    if (grade.startsWith('B')) return 'secondary'
    if (grade.startsWith('C')) return 'outline'
    return 'destructive'
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <BookOpen className="mr-2 h-5 w-5" />
          Subject Performance
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {student.subjects.map((subject: any, index: number) => {
          const percentage = (subject.marks / subject.maxMarks) * 100
          
          return (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{subject.name}</p>
                  <p className="text-sm text-muted-foreground">{subject.code}</p>
                </div>
                <div className="text-right">
                  <Badge variant={getGradeColor(subject.grade)}>
                    {subject.grade}
                  </Badge>
                  <p className="text-sm text-muted-foreground mt-1">
                    {subject.marks}/{subject.maxMarks}
                  </p>
                </div>
              </div>
              <Progress value={percentage} className="h-2" />
              <p className="text-xs text-muted-foreground text-right">
                {percentage.toFixed(1)}%
              </p>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}