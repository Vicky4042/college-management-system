import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'
import { CreditCard, DollarSign } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface FeePaymentProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  student: any
}

export function FeePayment({ open, onOpenChange, student }: FeePaymentProps) {
  const [paymentData, setPaymentData] = useState({
    amount: '',
    paymentMethod: '',
    transactionRef: '',
    remarks: ''
  })
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // TODO: Connect to Spring Boot API for payment processing
      // const response = await fetch(`/api/fees/payment`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     studentId: student.studentId,
      //     amount: parseFloat(paymentData.amount),
      //     paymentMethod: paymentData.paymentMethod,
      //     transactionRef: paymentData.transactionRef,
      //     remarks: paymentData.remarks
      //   })
      // })

      await new Promise(resolve => setTimeout(resolve, 1000)) // Mock delay

      toast({
        title: "Payment Successful",
        description: `Payment of $${paymentData.amount} has been recorded for ${student?.studentName}.`
      })

      onOpenChange(false)
      setPaymentData({ amount: '', paymentMethod: '', transactionRef: '', remarks: '' })
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "There was an error processing the payment. Please try again.",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  if (!student) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <CreditCard className="mr-2 h-5 w-5" />
            Record Fee Payment
          </DialogTitle>
          <DialogDescription>
            Record a fee payment for {student.studentName} (ID: {student.studentId})
          </DialogDescription>
        </DialogHeader>

        <Card className="mb-4">
          <CardContent className="p-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Total Fees:</p>
                <p className="font-semibold">${student.totalFees?.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Paid Amount:</p>
                <p className="font-semibold text-green-600">${student.paidAmount?.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Balance Due:</p>
                <p className="font-semibold text-red-600">${student.balanceDue?.toLocaleString()}</p>
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
                placeholder="0.00"
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
            <Select value={paymentData.paymentMethod} onValueChange={(value) => setPaymentData(prev => ({ ...prev, paymentMethod: value }))}>
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
              placeholder="Transaction ID, Check number, etc."
              value={paymentData.transactionRef}
              onChange={(e) => setPaymentData(prev => ({ ...prev, transactionRef: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="remarks">Remarks (Optional)</Label>
            <Input
              id="remarks"
              placeholder="Additional notes about the payment"
              value={paymentData.remarks}
              onChange={(e) => setPaymentData(prev => ({ ...prev, remarks: e.target.value }))}
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
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