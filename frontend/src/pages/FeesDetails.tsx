import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Search, DollarSign, CreditCard, Download, AlertCircle } from 'lucide-react'
import { FeePayment } from '@/components/fees/FeePayment'

interface FeeRecord {
  id: number
  studentId: string
  studentName: string
  program: string
  totalFees: number
  paidAmount: number
  balanceDue: number
  dueDate: string
  status: 'Paid' | 'Partial' | 'Pending'
}

export function FeesDetails() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStudent, setSelectedStudent] = useState<FeeRecord | null>(null)
  const [showPayment, setShowPayment] = useState(false)

  const feeRecords: FeeRecord[] = [
    {
      id: 1,
      studentId: '000001',
      studentName: 'Sarah Johnson',
      program: 'Computer Science',
      totalFees: 15000,
      paidAmount: 10000,
      balanceDue: 5000,
      dueDate: '2024-01-15',
      status: 'Partial',
    },
    {
      id: 2,
      studentId: '000002',
      studentName: 'Michael Brown',
      program: 'Business Administration',
      totalFees: 12000,
      paidAmount: 12000,
      balanceDue: 0,
      dueDate: '2024-01-15',
      status: 'Paid',
    },
    {
      id: 3,
      studentId: '000003',
      studentName: 'Emily Davis',
      program: 'Engineering',
      totalFees: 18000,
      paidAmount: 0,
      balanceDue: 18000,
      dueDate: '2024-01-15',
      status: 'Pending',
    },
  ]

  const filteredRecords = feeRecords.filter(
    (record) =>
      record.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.studentId.includes(searchQuery) ||
      record.program.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getStatusVariant = (status: FeeRecord['status']): 'default' | 'secondary' | 'destructive' => {
    switch (status) {
      case 'Paid':
        return 'default'
      case 'Partial':
        return 'secondary'
      case 'Pending':
        return 'destructive'
      default:
        return 'default'
    }
  }

  const handlePayment = (student: FeeRecord) => {
    setSelectedStudent(student)
    setShowPayment(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Fee Details</h1>
          <p className="text-muted-foreground">View fee records and manage payments for all students.</p>
        </div>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Fee Records</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by student name, ID, or program..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-80"
              />
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Program</TableHead>
                <TableHead>Total Fees</TableHead>
                <TableHead>Paid Amount</TableHead>
                <TableHead>Balance Due</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
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
                  <TableCell>{record.program}</TableCell>
                  <TableCell>${record.totalFees.toLocaleString()}</TableCell>
                  <TableCell className="text-green-600">${record.paidAmount.toLocaleString()}</TableCell>
                  <TableCell className={record.balanceDue > 0 ? 'text-red-600' : 'text-green-600'}>
                    ${record.balanceDue.toLocaleString()}
                  </TableCell>
                  <TableCell>{record.dueDate}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(record.status)}>{record.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      {record.balanceDue > 0 && (
                        <Button size="sm" onClick={() => handlePayment(record)}>
                          <CreditCard className="mr-1 h-3 w-3" /> Pay
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        View History
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {selectedStudent && (
        <FeePayment open={showPayment} onOpenChange={setShowPayment} student={selectedStudent} />
      )}
    </div>
  )
}
