import {useState} from 'react'
import {useQuery} from 'react-query'
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {Badge} from '@/components/ui/badge'
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table'
import {Skeleton} from '@/components/ui/skeleton'
import {Search, FileText, Download, Award, AlertCircle} from 'lucide-react'
import {studentService} from '@/services/studentService'
import {useToast} from '@/hooks/use-toast'

export function StudentMarks() {
  const [searchQuery, setSearchQuery] = useState('')
  const [hasSearched, setHasSearched] = useState(false)
  const {toast} = useToast()

  // Query for search results
  const {
    data: searchResults = [],
    isLoading,
    error,
    refetch
  } = useQuery(
    ['studentMarks', searchQuery],
    () => studentService.searchStudentMarks(searchQuery),
    {
      enabled: false, // Only run when manually triggered
      onError: (error: any) => {
        toast({
          title: 'Search Failed',
          description: error.response?.data?.message || 'Failed to search student marks',
          variant: 'destructive'
        })
      }
    }
  )

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setHasSearched(false)
      return
    }
    setHasSearched(true)
    refetch()
  }

  const getGradeColor = (grade: string) => {
    if (grade.includes('A')) return 'default'
    if (grade.includes('B')) return 'secondary'
    if (grade.includes('C')) return 'outline'
    return 'destructive'
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Student Marks Details</h1>
          <p className="text-muted-foreground">Search for student marks and display academic performance records.</p>
        </div>
        <Button disabled={!hasSearched || searchResults.length === 0}>
          <Download className="mr-2 h-4 w-4" />
          Export Results
        </Button>
      </div>

      {/* Search Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Search className="mr-2 h-5 w-5" />
            Search Student Marks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by student name, ID, or course..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="pl-10"
                disabled={isLoading}
              />
            </div>
            <Button onClick={handleSearch} disabled={isLoading}>
              {isLoading ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-foreground" />
                  Searching...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Loading State */}
      {isLoading && (
        <Card>
          <CardContent className="py-8">
            <div className="space-y-4">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Error State */}
      {error && hasSearched && !isLoading && (
        <Card>
          <CardContent className="py-8">
            <div className="text-center">
              <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Search Error</h3>
              <p className="text-muted-foreground">Failed to search student marks. Please try again.</p>
              <Button className="mt-4" onClick={handleSearch}>
                Retry Search
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search Results */}
      {hasSearched && !isLoading && !error && (
        searchResults.length > 0 ? (
          <>
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Students Found</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{searchResults.length}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Average Performance</CardTitle>
                  <Award className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {(searchResults.reduce((acc, student) => acc + student.percentage, 0) / searchResults.length).toFixed(1)}%
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Top Performer</CardTitle>
                  <Award className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-bold">
                    {searchResults.reduce((prev, current) => 
                      prev.percentage > current.percentage ? prev : current
                    ).studentName}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Student Marks Results</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student Details</TableHead>
                      <TableHead>Course</TableHead>
                      <TableHead>Semester</TableHead>
                      <TableHead>Total Marks</TableHead>
                      <TableHead>Percentage</TableHead>
                      <TableHead>GPA</TableHead>
                      <TableHead>Subject Breakdown</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {searchResults.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{student.studentName}</p>
                            <p className="text-sm text-muted-foreground">ID: {student.studentId}</p>
                          </div>
                        </TableCell>
                        <TableCell>{student.course}</TableCell>
                        <TableCell>{student.semester}</TableCell>
                        <TableCell className="font-medium">
                          {student.totalMarks}/{student.maxTotalMarks}
                        </TableCell>
                        <TableCell>
                          <Badge variant={student.percentage >= 85 ? 'default' : 'secondary'}>
                            {student.percentage}%
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">{student.gpa}</TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            {student.subjects.map((subject, index) => (
                              <div key={index} className="flex items-center justify-between text-xs">
                                <span className="text-muted-foreground">{subject.name}:</span>
                                <div className="flex items-center space-x-1">
                                  <span>{subject.marks}/{subject.totalMarks}</span>
                                  <Badge variant={getGradeColor(subject.grade)} className="text-xs px-1 py-0">
                                    {subject.grade}
                                  </Badge>
                                </div>
                              </div>
                            ))}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </>
        ) : (
          <Card>
            <CardContent className="py-8">
              <div className="text-center">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No results found</h3>
                <p className="text-muted-foreground">
                  No student marks found matching "{searchQuery}". Please try different keywords.
                </p>
              </div>
            </CardContent>
          </Card>
        )
      )}

      {/* Instructions when no search performed */}
      {!hasSearched && !isLoading && (
        <Card>
          <CardContent className="py-8">
            <div className="text-center">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Search Student Marks</h3>
              <p className="text-muted-foreground">
                Enter a student name, student ID, or course name to search for marks and academic records.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}