import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'
import { CreditCard, DollarSign } from 'lucide-react'

interface FeePaymentProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  student: {
    studentId: string
    studentName: string
    totalFees: number
    paidAmount: number
    balanceDue: number
    dueDate: string
  }
}

export function FeePayment({ open, onOpenChange, student }: FeePaymentProps) {
  const [paymentData, setPaymentData] = useState({
    amount: '',
    paymentMethod: '',
    transactionRef: '',
    remarks: ''
  })
  const [loading, setLoading] = useState(false)

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    setTimeout(() => {
      alert(`Payment of $${paymentData.amount} recorded for ${student.studentName}`)
      setLoading(false)
      setPaymentData({ amount: '', paymentMethod: '', transactionRef: '', remarks: '' })
      onOpenChange(false)
    }, 1000)
  }

  if (!student) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
         <DialogTitle className="flex items-center gap-2">
  <CreditCard className="h-5 w-5" />
  Record Fee Payment
</DialogTitle>

          <p>Record a fee payment for {student.studentName} (ID: {student.studentId})</p>
        </DialogHeader>

        <Card className="mb-4">
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Total Fees:</p>
                <p className="font-semibold">${student.totalFees.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Paid Amount:</p>
                <p className="font-semibold text-green-600">${student.paidAmount.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Balance Due:</p>
                <p className="font-semibold text-red-600">${student.balanceDue.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Due Date:</p>
                <p className="font-semibold">{student.dueDate}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <form onSubmit={handlePayment} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Payment Amount ($)</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="amount"
                type="number"
                step="0.01"
                value={paymentData.amount}
                onChange={(e) => setPaymentData(prev => ({ ...prev, amount: e.target.value }))}
                className="pl-10"
                max={student.balanceDue}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="paymentMethod">Payment Method</Label>
            <Select
              value={paymentData.paymentMethod}
              onChange={(val: string) => setPaymentData(prev => ({ ...prev, paymentMethod: val }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cash">Cash</SelectItem>
                <SelectItem value="check">Check</SelectItem>
                <SelectItem value="credit-card">Credit Card</SelectItem>
                <SelectItem value="debit-card">Debit Card</SelectItem>
                <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                <SelectItem value="online">Online Payment</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="transactionRef">Transaction Reference</Label>
            <Input
              id="transactionRef"
              value={paymentData.transactionRef}
              onChange={(e) => setPaymentData(prev => ({ ...prev, transactionRef: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="remarks">Remarks (Optional)</Label>
            <Input
              id="remarks"
              value={paymentData.remarks}
              onChange={(e) => setPaymentData(prev => ({ ...prev, remarks: e.target.value }))}
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" onClick={() => onOpenChange(false)} variant="outline">
              Cancel
            </Button>
            <Button type="submit" disabled={loading || !paymentData.amount || !paymentData.paymentMethod}>
              {loading ? 'Processing...' : 'Record Payment'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
