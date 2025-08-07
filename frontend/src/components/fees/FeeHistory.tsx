import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { CreditCard, Calendar, DollarSign } from 'lucide-react'

const recentPayments = [
  {
    id: 1,
    studentName: 'Sarah Johnson',
    amount: 5000,
    paymentMethod: 'Credit Card',
    transactionRef: 'TXN-2024-001',
    date: '2024-01-10',
    status: 'Completed'
  },
  {
    id: 2,
    studentName: 'Michael Brown',
    amount: 12000,
    paymentMethod: 'Bank Transfer',
    transactionRef: 'TXN-2024-002',
    date: '2024-01-08',
    status: 'Completed'
  },
  {
    id: 3,
    studentName: 'Emily Davis',
    amount: 3000,
    paymentMethod: 'Cash',
    transactionRef: 'CASH-2024-001',
    date: '2024-01-05',
    status: 'Pending'
  }
]

export function FeeHistory() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'default'
      case 'Pending': return 'secondary'
      case 'Failed': return 'destructive'
      default: return 'secondary'
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calendar className="mr-2 h-5 w-5" />
          Recent Payment History
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentPayments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell className="font-medium">{payment.studentName}</TableCell>
                <TableCell className="flex items-center">
                  <DollarSign className="mr-1 h-3 w-3" />
                  {payment.amount.toLocaleString()}
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <CreditCard className="mr-1 h-3 w-3" />
                    {payment.paymentMethod}
                  </div>
                </TableCell>
                <TableCell>{payment.date}</TableCell>
                <TableCell>
                  <Badge variant={getStatusColor(payment.status)}>
                    {payment.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}