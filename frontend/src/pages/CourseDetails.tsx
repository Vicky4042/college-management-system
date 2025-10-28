import { useQuery } from '@tanstack/react-query'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import {
  BookOpen,
  Clock,
  Users,
  Calendar,
  GraduationCap,
  MapPin,
  AlertCircle,
} from 'lucide-react'
import { courseService, Course } from '@/services/courseService'
import { useToast } from '@/hooks/use-toast'

export function CourseDetails() {
  const { toast } = useToast()

  // React Query v5 useQuery (object syntax)
  const { data: courses = [] as Course[], isPending, error } = useQuery<Course[]>({
    queryKey: ['courses'],
    queryFn: async () => {
      try {
        return await courseService.getAll()
      } catch {
        toast({
          title: 'Error',
          description: 'Failed to load courses',
          variant: 'destructive',
        })
        return [] as Course[]
      }
    },
    retry: false,
  })

  const getDepartmentColor = (department: string) => {
    const colors: Record<string, string> = {
      'Computer Science': 'bg-blue-100 text-blue-800',
      Mathematics: 'bg-green-100 text-green-800',
      Engineering: 'bg-orange-100 text-orange-800',
      'Business Administration': 'bg-purple-100 text-purple-800',
      Biology: 'bg-teal-100 text-teal-800',
      Physics: 'bg-red-100 text-red-800',
    }
    return colors[department] || 'bg-gray-100 text-gray-800'
  }

  // Loading skeleton
  if (isPending) {
    return (
      <div className="space-y-6">
        <div>
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-96" />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-96" />
          ))}
        </div>
      </div>
    )
  }

  // Error block
  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Course Details</h1>
          <p className="text-muted-foreground">
            Browse all available courses and their detailed particulars.
          </p>
        </div>

        <Card>
          <CardContent className="py-8">
            <div className="text-center">
              <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Failed to Load Courses</h3>
              <p className="text-muted-foreground">
                Unable to fetch course information. Please try again later.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Main content
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Course Details</h1>
          <p className="text-muted-foreground">
            Browse all available courses and their detailed particulars.
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Courses
            </CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{courses.length}</div>
            <p className="text-xs text-muted-foreground">Available this semester</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Enrolled
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {courses.reduce((total: number, course: Course) => total + course.enrolledStudents, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Students across all courses</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Available Seats
            </CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {courses.reduce(
                (total: number, course: Course) => total + (course.maxCapacity - course.enrolledStudents),
                0
              )}
            </div>
            <p className="text-xs text-muted-foreground">Open for enrollment</p>
          </CardContent>
        </Card>
      </div>

      {/* Individual Course Cards */}
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        {courses.map((course: Course) => (
          <Card key={course.id} className="h-fit">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-semibold">{course.courseCode}</h3>
                    <Badge variant="outline">{course.credits} Credits</Badge>
                  </div>
                  <h4 className="text-xl font-bold text-foreground">{course.courseName}</h4>
                  <Badge variant="secondary" className={getDepartmentColor(course.department)}>
                    {course.department}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{course.description}</p>

              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <GraduationCap className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Instructor:</span>
                  <span className="ml-1">{course.instructor}</span>
                </div>

                <div className="flex items-center text-sm">
                  <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Schedule:</span>
                  <span className="ml-1">{course.schedule}</span>
                </div>

                <div className="flex items-center text-sm">
                  <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Classroom:</span>
                  <span className="ml-1">{course.classroom}</span>
                </div>

                <div className="flex items-center text-sm">
                  <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Duration:</span>
                  <span className="ml-1">{course.duration} ({course.semester})</span>
                </div>

                <div className="flex items-center text-sm">
                  <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Enrollment:</span>
                  <span className="ml-1">
                    {course.enrolledStudents}/{course.maxCapacity} Students
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="w-full bg-secondary rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full"
                    style={{ width: `${(course.enrolledStudents / course.maxCapacity) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Enrollment: {Math.round((course.enrolledStudents / course.maxCapacity) * 100)}%</span>
                  <span>{course.maxCapacity - course.enrolledStudents} seats available</span>
                </div>
              </div>

              {course.prerequisites !== 'None' && (
                <div className="pt-2 border-t">
                  <p className="text-xs text-muted-foreground">
                    <span className="font-medium">Prerequisites:</span> {course.prerequisites}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
