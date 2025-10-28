import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { TrendingUp } from 'lucide-react'

interface MarksChartProps {
  student: {
    subjects: {
      code: string
      marks: number
      maxMarks: number
    }[]
  }
}

export function MarksChart({ student }: MarksChartProps) {
  const chartData = student.subjects.map(subject => ({
    subject: subject.code,
    marks: subject.marks,
    maxMarks: subject.maxMarks,
    percentage: Number(((subject.marks / subject.maxMarks) * 100).toFixed(1))
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Performance Chart
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="subject" />
            <YAxis />
            <Tooltip
              formatter={(val: any, name: string, props: any) => {
                if (name === 'marks') {
                  return [`${val}/${props.payload.maxMarks}`, 'Marks Obtained']
                }
                if (name === 'percentage') {
                  return [`${val}%`, 'Percentage']
                }
                return val
              }}
            />
            <Legend />
            <Bar dataKey="marks" name="Marks" />
            <Bar dataKey="percentage" name="Percentage" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
