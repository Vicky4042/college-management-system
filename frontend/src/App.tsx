import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {QueryClient, QueryClientProvider} from 'react-query'
import {Toaster} from '@/components/ui/toaster'
import {Navigation} from '@/components/navigation/Navigation'
import {Dashboard} from '@/pages/Dashboard'
import {StudentManagement} from '@/pages/StudentManagement'
import {StudentMarks} from '@/pages/StudentMarks'
import {CourseDetails} from '@/pages/CourseDetails'
import {FeesDetails} from '@/pages/FeesDetails'
import {DevOpsGuide} from '@/pages/DevOpsGuide'
import {Auth} from '@/pages/Auth'
import {useAuthStore} from '@/stores/authStore'
import {useEffect} from 'react'

const queryClient = new QueryClient({
 defaultOptions: {
  queries: {
   retry: false,
   refetchOnWindowFocus: false
  }
 }
})

export default function App() {
 const {isAuthenticated, checkAuth} = useAuthStore()

 useEffect(() => {
  checkAuth()
 }, [checkAuth])

 if (!isAuthenticated) {
  return (
   <QueryClientProvider client={queryClient}>
    <div className="min-h-screen bg-background">
     <Auth />
     <Toaster />
    </div>
   </QueryClientProvider>
  )
 }

 return (
  <QueryClientProvider client={queryClient}>
   <Router>
    <div className="min-h-screen bg-background">
     <Navigation />
     <main className="ml-64 p-6">
      <Routes>
       <Route path="/" element={<Dashboard />} />
       <Route path="/student-management" element={<StudentManagement />} />
       <Route path="/student-marks" element={<StudentMarks />} />
       <Route path="/course-details" element={<CourseDetails />} />
       <Route path="/fees-details" element={<FeesDetails />} />
       <Route path="/devops-guide" element={<DevOpsGuide />} />
      </Routes>
     </main>
     <Toaster />
    </div>
   </Router>
  </QueryClientProvider>
 )
}