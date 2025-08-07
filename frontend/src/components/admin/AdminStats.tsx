import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, 
  GraduationCap, 
  BookOpen, 
  FileText,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

const stats = [
  {
    title: 'Total Users',
    value: '3,157',
    icon: Users,
    change: '+12%',
    changeType: 'positive' as const
  },
  {
    title: 'Active Sessions',
    value: '89',
    icon: TrendingUp,
    change: '+5%',
    changeType: 'positive' as const
  },
  {
    title: 'System Alerts',
    value: '3',
    icon: AlertCircle,
    change: '-2',
    changeType: 'negative' as const
  },
  {
    title: 'Reports Generated',
    value: '156',
    icon: FileText,
    change: '+8%',
    changeType: 'positive' as const
  }
];

export function AdminStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-xs ${
                stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change} from last week
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}