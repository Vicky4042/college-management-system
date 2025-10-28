import { useBackendStatus } from '@/hooks/useBackendStatus'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertCircle, Loader2, CheckCircle } from 'lucide-react'
import * as React from 'react'

export function BackendStatus() {
  const { isOnline, isChecking } = useBackendStatus()

  if (isChecking) {
    return (
      <Alert>
        <Loader2 className="h-4 w-4 animate-spin mr-2" />
        <AlertDescription>Checking backend connection...</AlertDescription>
      </Alert>
    )
  }

  if (!isOnline) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4 mr-2" />
        <AlertDescription>
          <strong>Backend Offline:</strong> Cannot connect to Spring Boot server on localhost:8080. Please ensure your backend is running.
        </AlertDescription>
      </Alert>
    )
  }

  // Optional: show "Backend Online" status
  return (
    <Alert variant="default">
      <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
      <AlertDescription>Backend is online and running.</AlertDescription>
    </Alert>
  )
}
