import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar'; // Fixed casing
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Mail, Phone, Edit, Trash2 } from 'lucide-react';

const faculty = [
  {
    id: 1,
    name: 'Dr. Robert Smith',
    email: 'robert.smith@college.edu',
    phone: '+1 (555) 987-6543',
    department: 'Computer Science',
    position: 'Professor',
    courses: ['CS 101', 'CS 301'],
    experience: '15 years'
  },
  {
    id: 2,
    name: 'Prof. Maria Garcia',
    email: 'maria.garcia@college.edu',
    phone: '+1 (555) 876-5432',
    department: 'Mathematics',
    position: 'Associate Professor',
    courses: ['MATH 201', 'MATH 301'],
    experience: '10 years'
  },
  {
    id: 3,
    name: 'Dr. John Anderson',
    email: 'john.anderson@college.edu',
    phone: '+1 (555) 765-4321',
    department: 'Engineering',
    position: 'Professor',
    courses: ['ENG 101', 'ENG 401'],
    experience: '20 years'
  }
];

export function FacultyList() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Faculty Member</TableHead>
          <TableHead>Contact</TableHead>
          <TableHead>Department</TableHead>
          <TableHead>Position</TableHead>
          <TableHead>Courses</TableHead>
          <TableHead>Experience</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {faculty.map((member) => (
          <TableRow key={member.id}>
            <TableCell>
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarFallback>
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{member.name}</p>
                  <p className="text-sm text-muted-foreground">ID: {member.id.toString().padStart(6, '0')}</p>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <div className="space-y-1">
                <div className="flex items-center text-sm">
                  <Mail className="mr-2 h-3 w-3" />
                  {member.email}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Phone className="mr-2 h-3 w-3" />
                  {member.phone}
                </div>
              </div>
            </TableCell>
            <TableCell>{member.department}</TableCell>
            <TableCell>
              <Badge variant="outline">{member.position}</Badge>
            </TableCell>
            <TableCell>
              <div className="flex flex-wrap gap-1">
                {member.courses.map((course) => (
                  <Badge key={course} variant="secondary" className="text-xs">
                    {course}
                  </Badge>
                ))}
              </div>
            </TableCell>
            <TableCell>{member.experience}</TableCell>
            <TableCell>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
