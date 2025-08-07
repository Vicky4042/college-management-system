import { useQuery } from 'react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, BookOpen, DollarSign, FileText, Search } from 'lucide-react';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { RecentActivities } from '@/components/dashboard/RecentActivities';
import { BackendStatus } from '@/components/common/BackendStatus';
import { studentService } from '@/services/studentService';
import { courseService } from '@/services/courseService';
import { feeService } from '@/services/feeService';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

export function Dashboard() {
  // Fetch data for dashboard stats
  const {
    data: students,
    error: studentsError,
    isLoading: studentsLoading,
  } = useQuery('students', studentService.getAllStudents, {
    retry: false,
  });

  const {
    data: courses,
    error: coursesError,
    isLoading: coursesLoading,
  } = useQuery('courses', courseService.getAllCourses, {
    retry: false,
  });

  const {
    data: feesSummary,
    error: feesError,
    isLoading: feesLoading,
  } = useQuery('feesSummary', feeService.getFeesSummary, {
    retry: false,
  });

  // Show backend connection status and errors
  const hasErrors = studentsError || coursesError || feesError;
  const isLoading = studentsLoading || coursesLoading || feesLoading;

  const stats = [
    {
      title: 'Total Students',
      value: students?.length?.toString() || '0',
      icon: Users,
      trend: 'Active enrollments',
      trendUp: true,
    },
    {
      title: 'Available Courses',
      value: courses?.length?.toString() || '0',
      icon: BookOpen,
      trend: 'All departments',
      trendUp: true,
    },
    {
      title: 'Fees Collected',
      value: feesSummary
        ? `$${feesSummary.totalFeesCollected.toLocaleString()}`
        : '$0',
      icon: DollarSign,
      trend: 'Payment records',
      trendUp: true,
    },
    {
      title: 'Outstanding Balance',
      value: feesSummary
        ? `$${feesSummary.totalOutstanding.toLocaleString()}`
        : '$0',
      icon: FileText,
      trend: 'Pending payments',
      trendUp: false,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            College Management Dashboard
          </h1>
          <p className="text-muted-foreground">
            Search student marks, view course details, and check fee information.
          </p>
        </div>
      </div>

      {/* Backend Status */}
      <BackendStatus />

      {/* Error Alert */}
      {hasErrors && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>Data Loading Error:</strong> Some data could not be loaded from the backend. 
            Please check your Spring Boot server connection.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

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
              Browse all available courses and their detailed particulars and information.
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
              View fee payment records and outstanding balance details for students.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}