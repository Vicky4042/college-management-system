import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, User, BookOpen, UserPlus } from 'lucide-react';

const activities = [
  {
    id: 1,
    type: 'enrollment',
    message: 'Sarah Johnson enrolled in Computer Science 101',
    time: '2 minutes ago',
    icon: UserPlus,
    badge: 'New Enrollment'
  },
  {
    id: 2,
    type: 'grade',
    message: 'Dr. Smith updated grades for Mathematics 201',
    time: '15 minutes ago',
    icon: BookOpen,
    badge: 'Grade Update'
  },
  {
    id: 3,
    type: 'student',
    message: 'New student registration: Michael Brown',
    time: '1 hour ago',
    icon: User,
    badge: 'Registration'
  },
  {
    id: 4,
    type: 'course',
    message: 'Physics 301 schedule updated for next semester',
    time: '2 hours ago',
    icon: Clock,
    badge: 'Schedule Change'
  }
];

export function RecentActivities() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activities</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon = activity.icon;
            return (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">{activity.message}</p>
                  <div className="flex items-center mt-1 space-x-2">
                    <Badge variant="secondary" className="text-xs">
                      {activity.badge}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {activity.time}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}