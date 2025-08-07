import { useBackendStatus } from '@/hooks/useBackendStatus'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertCircle, CheckCircle, Loader2 } from 'lucide-react'

export function BackendStatus() {
  const { isOnline, isChecking } = useBackendStatus()

  if (isChecking) {
    return (
      <Alert>
        <Loader2 className="h-4 w-4 animate-spin" />
        <AlertDescription>Checking backend connection...</AlertDescription>
      </Alert>
    )
  }

  if (!isOnline) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          <strong>Backend Offline:</strong> Cannot connect to Spring Boot server on localhost:8080. Please ensure your backend is running.
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <Alert className="border-green-200 bg-green-50">
      <CheckCircle className="h-4 w-4 text-green-600" />
      <AlertDescription className="text-green-800">
        <strong>Backend Online:</strong> ✅ Connected to Vikas's College Management Backend on localhost:8080
      </AlertDescription>
    </Alert>
  )
}