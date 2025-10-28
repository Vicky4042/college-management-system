import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Clock, 
  Users, 
  Calendar,
  Edit,
  Trash2,
  BookOpen
} from 'lucide-react';

const courses = [
  {
    id: 1,
    code: 'CS 101',
    title: 'Introduction to Computer Science',
    instructor: 'Dr. Robert Smith',
    credits: 3,
    enrolled: 45,
    capacity: 50,
    schedule: 'MWF 9:00-10:00 AM',
    semester: 'Fall 2024',
    department: 'Computer Science'
  },
  {
    id: 2,
    code: 'MATH 201',
    title: 'Calculus II',
    instructor: 'Prof. Maria Garcia',
    credits: 4,
    enrolled: 32,
    capacity: 35,
    schedule: 'TTh 11:00-12:30 PM',
    semester: 'Fall 2024',
    department: 'Mathematics'
  },
  {
    id: 3,
    code: 'ENG 101',
    title: 'Engineering Fundamentals',
    instructor: 'Dr. John Anderson',
    credits: 3,
    enrolled: 28,
    capacity: 30,
    schedule: 'MWF 2:00-3:00 PM',
    semester: 'Fall 2024',
    department: 'Engineering'
  },
  {
    id: 4,
    code: 'BUS 301',
    title: 'Business Strategy',
    instructor: 'Prof. Sarah Williams',
    credits: 3,
    enrolled: 25,
    capacity: 40,
    schedule: 'TTh 1:00-2:30 PM',
    semester: 'Fall 2024',
    department: 'Business'
  }
];

export function CourseGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {courses.map((course) => (
        <Card key={course.id} className="h-fit">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-lg">{course.code}</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  {course.title}
                </p>
              </div>
              <Badge variant="outline">{course.credits} Credits</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <BookOpen className="mr-2 h-4 w-4 text-muted-foreground" />
                {course.instructor}
              </div>
              <div className="flex items-center text-sm">
                <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                {course.schedule}
              </div>
              <div className="flex items-center text-sm">
                <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                {course.semester}
              </div>
              <div className="flex items-center text-sm">
                <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                {course.enrolled}/{course.capacity} Students
              </div>
            </div>
            
            <div className="space-y-2">
              <Badge variant="secondary">{course.department}</Badge>
              <div className="w-full bg-secondary rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full" 
                  style={{ width: `${(course.enrolled / course.capacity) * 100}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                {course.capacity - course.enrolled} spots available
              </p>
            </div>
            
            <div className="flex justify-between pt-2">
              <Button variant="ghost" size="sm">
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}