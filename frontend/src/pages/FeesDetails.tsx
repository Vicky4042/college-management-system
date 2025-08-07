import {useState} from 'react'
import {useQuery} from 'react-query'
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import {Badge} from '@/components/ui/badge'
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table'
import {Input} from '@/components/ui/input'
import {Button} from '@/components/ui/button'
import {Skeleton} from '@/components/ui/skeleton'
import {DollarSign, Search, Users, TrendingUp, AlertCircle, Download} from 'lucide-react'
import {feeService} from '@/services/feeService'
import {useToast} from '@/hooks/use-toast'

export function FeesDetails() {
  const [searchQuery, setSearchQuery] = useState('')
  const {toast} = useToast()

  const {
    data: feeRecords = [],
    isLoading: recordsLoading,
    error: recordsError
  } = useQuery(
    'feeRecords',
    feeService.getAllFeeRecords,
    {
      onError: (error: any) => {
        toast({
          title: 'Failed to Load Fee Records',
          description: error.response?.data?.message || 'Unable to fetch fee information',
          variant: 'destructive'
        })
      }
    }
  )

  const {
    data: feesSummary,
    isLoading: summaryLoading
  } = useQuery(
    'feesSummary',
    feeService.getFeesSummary,
    {
      enabled: !recordsError
    }
  )

  const filteredRecords = feeRecords.filter(record =>
    record.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.course.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid': return 'default'
      case 'Partial': return 'secondary'
      case 'Pending': return 'destructive'
      default: return 'secondary'
    }
  }

  if (recordsLoading || summaryLoading) {
    return (
      <div className="space-y-6">
        <div>
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-96" />
        </div>
        
        <div className="grid gap-6 md:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>

        <Skeleton className="h-96" />
      </div>
    )
  }

  if (recordsError) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Fees Details</h1>
          <p className="text-muted-foreground">View fee payment records and outstanding balance details for all students.</p>
        </div>
        
        <Card>
          <CardContent className="py-8">
            <div className="text-center">
              <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Failed to Load Fee Records</h3>
              <p className="text-muted-foreground">Unable to fetch fee information. Please try again later.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Fees Details</h1>
          <p className="text-muted-foreground">View fee payment records and outstanding balance details for all students.</p>
        </div>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Fees Collected</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${feesSummary?.totalFeesCollected?.toLocaleString() || '0'}
            </div>
            <p className="text-xs text-green-600">Payment received</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Outstanding Balance</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${feesSummary?.totalOutstanding?.toLocaleString() || '0'}
            </div>
            <p className="text-xs text-red-600">
              {feesSummary?.studentsWithOutstanding || 0} students pending
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{feesSummary?.totalStudents || 0}</div>
            <p className="text-xs text-muted-foreground">Fee records</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Collection Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {feesSummary?.collectionRate?.toFixed(0) || 0}%
            </div>
            <p className="text-xs text-muted-foreground">Payment completion</p>
          </CardContent>
        </Card>
      </div>

      {/* Search Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Search className="mr-2 h-5 w-5" />
            Search Fee Records
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
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Fee Records Table */}
      <Card>
        <CardHeader>
          <CardTitle>Student Fee Records</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student Details</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Total Fees</TableHead>
                <TableHead>Fee Paid</TableHead>
                <TableHead>Balance Due</TableHead>
                <TableHead>Last Payment</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Due Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{record.studentName}</p>
                      <p className="text-sm text-muted-foreground">ID: {record.studentId}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{record.course}</p>
                      <p className="text-sm text-muted-foreground">{record.semester}</p>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">${record.totalFees.toLocaleString()}</TableCell>
                  <TableCell className="text-green-600 font-medium">${record.feePaid.toLocaleString()}</TableCell>
                  <TableCell className={record.balanceDue > 0 ? 'text-red-600 font-medium' : 'text-green-600 font-medium'}>
                    ${record.balanceDue.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm">{record.lastPaymentDate}</p>
                      {record.lastPaymentAmount > 0 && (
                        <p className="text-xs text-muted-foreground">
                          ${record.lastPaymentAmount.toLocaleString()}
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(record.paymentStatus)}>
                      {record.paymentStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className={record.balanceDue > 0 ? 'text-red-600' : 'text-muted-foreground'}>
                      {record.dueDate}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Payment Status Summary */}
      <div className="grid gap-6 md:grid-cols-3">
        {['Paid', 'Partial', 'Pending'].map((status) => {
          const statusRecords = feeRecords.filter(record => record.paymentStatus === status)
          const statusTotal = statusRecords.reduce((sum, record) => sum + record.feePaid, 0)

          return (
            <Card key={status}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{status} Students</span>
                  <Badge variant={getStatusColor(status)}>{statusRecords.length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Total Collected:</span>
                    <span className="font-medium">${statusTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Outstanding:</span>
                    <span className="font-medium">
                      ${statusRecords.reduce((sum, record) => sum + record.balanceDue, 0).toLocaleString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}