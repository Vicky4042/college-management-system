import {Link, useLocation} from 'react-router-dom'
import {cn} from '@/lib/utils'
import {BarChart3, Search, BookOpen, DollarSign, LogOut, User, Users, Container} from 'lucide-react'
import {useAuthStore} from '@/stores/authStores'
import {Button} from '@/components/ui/button'
const Btn: any = Button

const navigation = [
 {name: 'Dashboard', href: '/', icon: BarChart3},
 {name: 'Student Management', href: '/student-management', icon: Users},
 {name: 'Student Marks Details', href: '/student-marks', icon: Search},
 {name: 'Course Details', href: '/course-details', icon: BookOpen},
 {name: 'Fees Details', href: '/fees-details', icon: DollarSign},
 {name: 'DevOps Guide', href: '/devops-guide', icon: Container}
]

export function Navigation() {
 const location = useLocation()
 const {user, logout} = useAuthStore()

 return (
  <div className="fixed inset-y-0 left-0 z-50 w-64 bg-background border-r border-border">
   <div className="flex flex-col h-full">
    <div className="p-6">
     <h1 className="text-2xl font-bold text-foreground">College Management</h1>
     <p className="text-sm text-muted-foreground mt-1">Enterprise Student Information System</p>
    </div>

    <nav className="flex-1 px-4 space-y-1">
     {navigation.map(item => {
      const Icon = item.icon
      const isActive = location.pathname === item.href

      return (
       <Link key={item.name} to={item.href} className={cn('group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors', isActive ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-accent')}>
        <Icon className="mr-3 h-5 w-5" />
        {item.name}
       </Link>
      )
     })}
    </nav>

    <div className="p-4 border-t border-border">
     <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
       <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
        <User className="h-4 w-4 text-primary-foreground" />
       </div>
       <div>
        <p className="text-sm font-medium">{user?.email}</p>
        <p className="text-xs text-muted-foreground">Enterprise User</p>
       </div>
      <Btn variant="ghost" size="sm" onClick={logout}>
       <LogOut className="h-4 w-4" />
      </Btn>
      </div>
     </div>
    </div>
   </div>
  </div>
 )
}