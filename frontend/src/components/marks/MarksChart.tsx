import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { TrendingUp } from 'lucide-react'

interface MarksChartProps {
  student: any
}

export function MarksChart({ student }: MarksChartProps) {
  const chartData = student.subjects.map((subject: any) => ({
    subject: subject.code,
    marks: subject.marks,
    maxMarks: subject.maxMarks,
    percentage: (subject.marks / subject.maxMarks * 100).toFixed(1)
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <TrendingUp className="mr-2 h-5 w-5" />
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
              formatter={(value, name) => [
                name === 'marks' ? `${value}/${chartData.find(d => d.marks === value)?.maxMarks}` : value,
                name === 'marks' ? 'Marks Obtained' : 'Percentage'
              ]}
            />
            <Legend />
            <Bar dataKey="marks" fill="hsl(var(--primary))" name="marks" />
            <Bar dataKey="percentage" fill="hsl(var(--secondary))" name="percentage" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}