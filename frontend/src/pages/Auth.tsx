import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { GraduationCap, Mail, Lock, CheckCircle, AlertCircle } from 'lucide-react'
import { useAuthStore } from '@/stores/authStore'
import { useToast } from '@/hooks/use-toast'
import { Alert, AlertDescription } from '@/components/ui/alert'

export function Auth() {
  const [loginData, setLoginData] = useState({ email: 'vikas9036vicky@gmail.com', password: 'password123' })
  const [registerData, setRegisterData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  })
  const [loading, setLoading] = useState(false)
  const [registrationSuccess, setRegistrationSuccess] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const { login, register } = useAuthStore()
  const { toast } = useToast()

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePassword = (password: string) => {
    return password.length >= 6
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrors({})

    // Validation
    const newErrors: { [key: string]: string } = {}
    if (!validateEmail(loginData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    if (!loginData.password) {
      newErrors.password = 'Password is required'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setLoading(false)
      return
    }

    try {
      await login(loginData.email, loginData.password)

      toast({
        title: 'Welcome back to Vikas\'s College Management System! 🎉',
        description: 'Successfully logged in to the system.'
      })
    } catch (error: any) {
      let errorMessage = 'Login failed. Please try again.'

      if (error.message.includes('401')) {
        errorMessage = 'Invalid email or password.'
      } else if (error.message.includes('Network')) {
        errorMessage = 'Cannot connect to server. Please ensure the backend is running on localhost:8080.'
      } else if (error.message.includes('404')) {
        errorMessage = 'Authentication service not found. Please check your backend configuration.'
      }

      toast({
        title: 'Login failed',
        description: errorMessage,
        variant: 'destructive'
      })
    }

    setLoading(false)
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrors({})
    setRegistrationSuccess(false)

    // Validation
    const newErrors: { [key: string]: string } = {}

    if (!registerData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!validateEmail(registerData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!validatePassword(registerData.password)) {
      newErrors.password = 'Password must be at least 6 characters long'
    }

    if (registerData.password !== registerData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setLoading(false)
      return
    }

    try {
      await register({
        email: registerData.email,
        password: registerData.password,
        name: registerData.name
      })

      setRegistrationSuccess(true)

      toast({
        title: 'Registration successful! 🎉',
        description: 'Your account has been created and you are now logged in.'
      })

      // Clear form
      setRegisterData({ email: '', password: '', confirmPassword: '', name: '' })
    } catch (error: any) {
      let errorMessage = 'Registration failed. Please try again.'

      if (error.message.includes('409')) {
        errorMessage = 'User with this email already exists.'
      } else if (error.message.includes('Network')) {
        errorMessage = 'Cannot connect to server. Please ensure the backend is running on localhost:8080.'
      } else if (error.message.includes('400')) {
        errorMessage = 'Invalid registration data. Please check your inputs.'
      }

      toast({
        title: 'Registration failed',
        description: errorMessage,
        variant: 'destructive'
      })
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <GraduationCap className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Vikas's College Management</h1>
          <p className="text-muted-foreground mt-2">Hexaware Student Information System</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-center">Access Your Account</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <Alert className="mb-4">
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Backend Ready:</strong> Your Spring Boot backend is configured on localhost:8080
                    <br />
                    <span className="text-xs text-muted-foreground">Demo credentials are pre-filled for quick testing</span>
                  </AlertDescription>
                </Alert>

                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email address"
                        value={loginData.email}
                        onChange={(e) => setLoginData((prev) => ({ ...prev, email: e.target.value }))}
                        className="pl-10"
                        required
                      />
                    </div>
                    {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={loginData.password}
                        onChange={(e) => setLoginData((prev) => ({ ...prev, password: e.target.value }))}
                        className="pl-10"
                        required
                      />
                    </div>
                    {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Signing in...' : 'Sign In'}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="register">
                {registrationSuccess && (
                  <Alert className="mb-4">
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>Registration successful! You are now logged in.</AlertDescription>
                  </Alert>
                )}

                <Alert className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Backend Ready:</strong> Your Spring Boot backend is configured on localhost:8080
                  </AlertDescription>
                </Alert>

                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="registerName">Full Name</Label>
                    <div className="relative">
                      <Input
                        id="registerName"
                        type="text"
                        placeholder="Enter your full name"
                        value={registerData.name}
                        onChange={(e) => setRegisterData((prev) => ({ ...prev, name: e.target.value }))}
                        required
                      />
                    </div>
                    {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="registerEmail">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="registerEmail"
                        type="email"
                        placeholder="Enter your email address"
                        value={registerData.email}
                        onChange={(e) => setRegisterData((prev) => ({ ...prev, email: e.target.value }))}
                        className="pl-10"
                        required
                      />
                    </div>
                    {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="registerPassword">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="registerPassword"
                        type="password"
                        placeholder="Create a password (min 6 characters)"
                        value={registerData.password}
                        onChange={(e) => setRegisterData((prev) => ({ ...prev, password: e.target.value }))}
                        className="pl-10"
                        required
                      />
                    </div>
                    {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm your password"
                        value={registerData.confirmPassword}
                        onChange={(e) => setRegisterData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                        className="pl-10"
                        required
                      />
                    </div>
                    {errors.confirmPassword && <p className="text-sm text-red-600">{errors.confirmPassword}</p>}
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Creating Account...' : 'Create Account'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="mt-4 text-center text-sm text-muted-foreground">
          <p>🚀 Vikas's College Management System</p>
          <p className="mt-1">Connected to Spring Boot backend on localhost:8080</p>
        </div>
      </div>
    </div>
  )
}