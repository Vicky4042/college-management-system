import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { Search, BookOpen, DollarSign, FileText } from 'lucide-react'

const actions = [
  {
    title: 'Search Student Marks',
    description: 'Find and view student academic records',
    icon: Search,
    href: '/student-marks',
    action: 'Search'
  },
  {
    title: 'Browse Courses',
    description: 'View all course details and particulars',
    icon: BookOpen,
    href: '/course-details',
    action: 'Browse'
  },
  {
    title: 'Check Fee Records',
    description: 'View fee payments and balances',
    icon: DollarSign,
    href: '/fees-details',
    action: 'Check'
  },
  {
    title: 'Generate Reports',
    description: 'Export academic and financial reports',
    icon: FileText,
    href: '/',
    action: 'Generate'
  }
]

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {actions.map((action) => {
            const Icon = action.icon
            return (
              <div key={action.title} className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{action.title}</p>
                    <p className="text-xs text-muted-foreground">{action.description}</p>
                  </div>
                </div>
                <Button size="sm" variant="outline" asChild>
                  <Link to={action.href}>{action.action}</Link>
                </Button>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}