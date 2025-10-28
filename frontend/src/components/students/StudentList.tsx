import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Mail, Phone, Edit, Trash2 } from 'lucide-react';

interface StudentListProps {
  searchQuery: string;
}

const students = [
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah.johnson@college.edu',
    phone: '+1 (555) 123-4567',
    program: 'Computer Science',
    year: 'Sophomore',
    gpa: '3.8',
    status: 'Active'
  },
  {
    id: 2,
    name: 'Michael Brown',
    email: 'michael.brown@college.edu',
    phone: '+1 (555) 234-5678',
    program: 'Business Administration',
    year: 'Junior',
    gpa: '3.6',
    status: 'Active'
  },
  {
    id: 3,
    name: 'Emily Davis',
    email: 'emily.davis@college.edu',
    phone: '+1 (555) 345-6789',
    program: 'Engineering',
    year: 'Senior',
    gpa: '3.9',
    status: 'Active'
  },
  {
    id: 4,
    name: 'James Wilson',
    email: 'james.wilson@college.edu',
    phone: '+1 (555) 456-7890',
    program: 'Mathematics',
    year: 'Freshman',
    gpa: '3.7',
    status: 'Inactive'
  }
];

export function StudentList({ searchQuery }: StudentListProps) {
  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.program.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Student</TableHead>
          <TableHead>Contact</TableHead>
          <TableHead>Program</TableHead>
          <TableHead>Year</TableHead>
          <TableHead>GPA</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredStudents.map((student) => (
          <TableRow key={student.id}>
            <TableCell>
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarFallback>
                    {student.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{student.name}</p>
                  <p className="text-sm text-muted-foreground">ID: {student.id.toString().padStart(6, '0')}</p>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <div className="space-y-1">
                <div className="flex items-center text-sm">
                  <Mail className="mr-2 h-3 w-3" />
                  {student.email}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Phone className="mr-2 h-3 w-3" />
                  {student.phone}
                </div>
              </div>
            </TableCell>
            <TableCell>{student.program}</TableCell>
            <TableCell>{student.year}</TableCell>
            <TableCell>
              <Badge variant={parseFloat(student.gpa) >= 3.5 ? 'default' : 'secondary'}>
                {student.gpa}
              </Badge>
            </TableCell>
            <TableCell>
              <Badge variant={student.status === 'Active' ? 'default' : 'secondary'}>
                {student.status}
              </Badge>
            </TableCell>
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