import { useQuery } from '@tanstack/react-query'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, BookOpen, DollarSign, FileText, Search } from 'lucide-react'
import { StatsCard } from '@/components/dashboard/StatsCard'
import { QuickActions } from '@/components/dashboard/QuickActions'
import { RecentActivities } from '@/components/dashboard/RecentActivities'
import { studentService, Student as StudentType } from '@/services/studentService'
import { courseService, Course as CourseType } from '@/services/courseService'
import { feeService, FeesSummary } from '@/services/feeService'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'

export function Dashboard() {
  // Fetch students
  const { data: students = [], error: studentsError, isLoading: studentsPending } =
    useQuery<StudentType[]>({
      queryKey: ['students'],
      queryFn: async () => {
        try {
          return await studentService.getAllStudents()
        } catch (e) {
          console.error('Error fetching students', e)
          throw e
        }
      },
      retry: false,
    })

  // Fetch courses
  const { data: courses = [], error: coursesError, isLoading: coursesPending } =
    useQuery<CourseType[]>({
      queryKey: ['courses'],
      queryFn: async () => {
        try {
          return await courseService.getAll()
        } catch (e) {
          console.error('Error fetching courses', e)
          throw e
        }
      },
      retry: false,
    })

  // Fetch fee summary
  const { data: feesSummary, error: feesError, isLoading: feesPending } =
    useQuery<FeesSummary>({
      queryKey: ['feesSummary'],
      queryFn: async () => {
        try {
          return await feeService.getSummary()
        } catch (e) {
          console.error('Error fetching fees summary', e)
          throw e
        }
      },
      retry: false,
    })

  const hasErrors = !!(studentsError || coursesError || feesError)
  const isLoading = studentsPending || coursesPending || feesPending

  const stats = [
    {
      title: 'Total Students',
      value: studentsPending ? 'Loading...' : students.length.toString(),
      icon: Users,
      trend: 'Active enrollments',
      trendUp: true,
    },
    {
      title: 'Available Courses',
      value: coursesPending ? 'Loading...' : courses.length.toString(),
      icon: BookOpen,
      trend: 'All departments',
      trendUp: true,
    },
    {
      title: 'Fees Collected',
      value: feesPending
        ? 'Loading...'
        : `$${feesSummary?.totalFeesCollected.toLocaleString() || 0}`,
      icon: DollarSign,
      trend: 'Payment records',
      trendUp: true,
    },
    {
      title: 'Outstanding Balance',
      value: feesPending
        ? 'Loading...'
        : `$${feesSummary?.totalOutstanding.toLocaleString() || 0}`,
      icon: FileText,
      trend: 'Pending payments',
      trendUp: false,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">College Management Dashboard</h1>
          <p className="text-muted-foreground">
            Search student marks, view course details, and check fee information.
          </p>
        </div>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="p-4 bg-blue-100 text-blue-800 rounded">
          Loading dashboard data, please wait...
        </div>
      )}

      {/* Error */}
      {hasErrors && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Some data could not be loaded from the backend. Please check your server.
          </AlertDescription>
        </Alert>
      )}

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RecentActivities />
        </div>
        <div>
          <QuickActions />
        </div>
      </div>

      {/* Quick Access Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="mr-2 h-5 w-5" />
              Student Marks Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              Search and view student academic performance and marks across all courses.
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="mr-2 h-5 w-5" />
              Course Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              Browse all available courses and their detailed information.
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center">
              <DollarSign className="mr-2 h-5 w-5" />
              Fees Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              View fee payment records and outstanding balance of students.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
