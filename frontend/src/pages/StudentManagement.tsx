// ✅ StudentManagement.tsx
/* eslint-disable */
import { useQuery } from '@tanstack/react-query'
import { studentService } from '../services/studentService'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Skeleton } from '../components/ui/skeleton'
import { AlertCircle, UserPlus } from 'lucide-react'

export default function StudentManagement() {
  const { data: students = [], isLoading, error } = useQuery({
    queryKey: ['students'],
    queryFn: () => studentService.getAllStudents(),
  })

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-48" />
        <div className="grid gap-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-16" />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <Card className="p-4">
        <div className="flex items-center text-red-500 space-x-2">
          <AlertCircle className="h-5 w-5" />
          <p>Failed to load students.</p>
        </div>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Student Management</h1>
        <Button className="flex items-center space-x-2">
          <UserPlus className="h-4 w-4" />
          <span>Add Student</span>
        </Button>
      </div>

      {students.length === 0 ? (
        <p className="text-gray-500">No students found.</p>
      ) : (
        <div className="grid gap-4">
          {students.map((student: any) => (
            <Card key={student.id}>
              <CardHeader>
                <CardTitle>{student.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Email: {student.email}</p>
                <p>Department: {student.department}</p>
                <p>Year: {student.year}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
