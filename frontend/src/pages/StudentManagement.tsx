import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { UserPlus, Users, Edit, Trash2, Save, X, Eye, Filter, Download } from 'lucide-react'
import { studentService, type Student } from '@/services/studentService'
import { useToast } from '@/hooks/use-toast'

export function StudentManagement() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [newStudent, setNewStudent] = useState({
    studentId: '',
    studentName: '',
    course: '',
    semester: '',
    email: '',
    phone: '',
    department: ''
  })
  
  const { toast } = useToast()
  const queryClient = useQueryClient()

  // Fetch all students
  const {
    data: students = [],
    isLoading,
    error
  } = useQuery('students', studentService.getAllStudents, {
    onError: (error: any) => {
      toast({
        title: 'Failed to Load Students',
        description: error.message || 'Unable to fetch student information',
        variant: 'destructive'
      })
    }
  })

  // Add student mutation
  const addStudentMutation = useMutation(studentService.createStudent, {
    onSuccess: () => {
      queryClient.invalidateQueries('students')
      setIsAddDialogOpen(false)
      setNewStudent({
        studentId: '',
        studentName: '',
        course: '',
        semester: '',
        email: '',
        phone: '',
        department: ''
      })
      toast({
        title: 'Student Added Successfully',
        description: 'New student has been registered in the system'
      })
    },
    onError: (error: any) => {
      toast({
        title: 'Failed to Add Student',
        description: error.message || 'Unable to register new student',
        variant: 'destructive'
      })
    }
  })

  // Update student mutation
  const updateStudentMutation = useMutation(
    ({ id, student }: { id: string; student: Partial<Student> }) => 
      studentService.updateStudent(id, student),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('students')
        setIsEditDialogOpen(false)
        setSelectedStudent(null)
        toast({
          title: 'Student Updated Successfully',
          description: 'Student information has been updated'
        })
      },
      onError: (error: any) => {
        toast({
          title: 'Failed to Update Student',
          description: error.message || 'Unable to update student information',
          variant: 'destructive'
        })
      }
    }
  )

  // Delete student mutation
  const deleteStudentMutation = useMutation(studentService.deleteStudent, {
    onSuccess: () => {
      queryClient.invalidateQueries('students')
      toast({
        title: 'Student Removed',
        description: 'Student has been removed from the system'
      })
    },
    onError: (error: any) => {
      toast({
        title: 'Failed to Remove Student',
        description: error.message || 'Unable to remove student',
        variant: 'destructive'
      })
    }
  })

  // Filter students based on search
  const filteredStudents = students.filter(student =>
    student.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.department.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleAddStudent = () => {
    if (!newStudent.studentId || !newStudent.studentName || !newStudent.email) {
      toast({
        title: 'Missing Required Fields',
        description: 'Please fill in Student ID, Name, and Email',
        variant: 'destructive'
      })
      return
    }
    addStudentMutation.mutate(newStudent)
  }

  const handleEditStudent = (student: Student) => {
    setSelectedStudent(student)
    setIsEditDialogOpen(true)
  }

  const handleUpdateStudent = () => {
    if (!selectedStudent) return
    updateStudentMutation.mutate({
      id: selectedStudent.id,
      student: selectedStudent
    })
  }

  const handleDeleteStudent = (studentId: string) => {
    if (confirm('Are you sure you want to remove this student?')) {
      deleteStudentMutation.mutate(studentId)
    }
  }

  const getDepartmentColor = (department: string) => {
    const colors = {
      'Computer Science': 'bg-blue-100 text-blue-800',
      'Mathematics': 'bg-green-100 text-green-800',
      'Engineering': 'bg-orange-100 text-orange-800',
      'Business Administration': 'bg-purple-100 text-purple-800',
      'Biology': 'bg-teal-100 text-teal-800',
      'Physics': 'bg-red-100 text-red-800'
    }
    return colors[department as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-96" />
        </div>
        <div className="grid gap-6 md:grid-cols-4">
          {[1, 2, 3, 4].map(i => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
        <Skeleton className="h-96" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Student Management</h1>
          <p className="text-muted-foreground">Register, view, and manage student information and records.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export List
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Add Student
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Register New Student</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="studentId">Student ID *</Label>
                    <Input
                      id="studentId"
                      placeholder="STU001"
                      value={newStudent.studentId}
                      onChange={(e) => setNewStudent(prev => ({ ...prev, studentId: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="semester">Semester</Label>
                    <Select value={newStudent.semester} onValueChange={(value) => setNewStudent(prev => ({ ...prev, semester: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select semester" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1st Semester">1st Semester</SelectItem>
                        <SelectItem value="2nd Semester">2nd Semester</SelectItem>
                        <SelectItem value="3rd Semester">3rd Semester</SelectItem>
                        <SelectItem value="4th Semester">4th Semester</SelectItem>
                        <SelectItem value="5th Semester">5th Semester</SelectItem>
                        <SelectItem value="6th Semester">6th Semester</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="studentName">Full Name *</Label>
                  <Input
                    id="studentName"
                    placeholder="Enter student full name"
                    value={newStudent.studentName}
                    onChange={(e) => setNewStudent(prev => ({ ...prev, studentName: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="student@email.com"
                    value={newStudent.email}
                    onChange={(e) => setNewStudent(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    placeholder="+1 234 567 8900"
                    value={newStudent.phone}
                    onChange={(e) => setNewStudent(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="course">Course</Label>
                    <Select value={newStudent.course} onValueChange={(value) => setNewStudent(prev => ({ ...prev, course: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select course" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Computer Science">Computer Science</SelectItem>
                        <SelectItem value="Mathematics">Mathematics</SelectItem>
                        <SelectItem value="Engineering">Engineering</SelectItem>
                        <SelectItem value="Business Administration">Business Administration</SelectItem>
                        <SelectItem value="Biology">Biology</SelectItem>
                        <SelectItem value="Physics">Physics</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Select value={newStudent.department} onValueChange={(value) => setNewStudent(prev => ({ ...prev, department: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Computer Science">Computer Science</SelectItem>
                        <SelectItem value="Mathematics">Mathematics</SelectItem>
                        <SelectItem value="Engineering">Engineering</SelectItem>
                        <SelectItem value="Business Administration">Business Administration</SelectItem>
                        <SelectItem value="Biology">Biology</SelectItem>
                        <SelectItem value="Physics">Physics</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    <X className="mr-2 h-4 w-4" />
                    Cancel
                  </Button>
                  <Button onClick={handleAddStudent} disabled={addStudentMutation.isLoading}>
                    <Save className="mr-2 h-4 w-4" />
                    {addStudentMutation.isLoading ? 'Adding...' : 'Add Student'}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{students.length}</div>
            <p className="text-xs text-muted-foreground">Registered students</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Courses</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Set(students.map(s => s.course)).size}
            </div>
            <p className="text-xs text-muted-foreground">Different programs</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Departments</CardTitle>
            <Filter className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Set(students.map(s => s.department)).size}
            </div>
            <p className="text-xs text-muted-foreground">Academic departments</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Latest Registration</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">
              {students.length > 0 ? students[students.length - 1]?.studentName || 'None' : 'None'}
            </div>
            <p className="text-xs text-muted-foreground">Most recent</p>
          </CardContent>
        </Card>
      </div>

      {/* Search Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="mr-2 h-5 w-5" />
            Student Directory
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Input
                placeholder="Search by name, ID, course, or department..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10"
              />
            </div>
            <Badge variant="secondary">
              {filteredStudents.length} students
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Students Table */}
      <Card>
        <CardHeader>
          <CardTitle>Registered Students</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student Details</TableHead>
                <TableHead>Course & Semester</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{student.studentName}</p>
                      <p className="text-sm text-muted-foreground">ID: {student.studentId}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{student.course}</p>
                      <p className="text-sm text-muted-foreground">{student.semester}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getDepartmentColor(student.department)}>
                      {student.department}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm">{student.email}</p>
                      {student.phone && (
                        <p className="text-xs text-muted-foreground">{student.phone}</p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEditStudent(student)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDeleteStudent(student.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Student Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Student Information</DialogTitle>
          </DialogHeader>
          {selectedStudent && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="editStudentId">Student ID</Label>
                  <Input
                    id="editStudentId"
                    value={selectedStudent.studentId}
                    onChange={(e) => setSelectedStudent(prev => prev ? { ...prev, studentId: e.target.value } : null)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editSemester">Semester</Label>
                  <Select 
                    value={selectedStudent.semester} 
                    onValueChange={(value) => setSelectedStudent(prev => prev ? { ...prev, semester: value } : null)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1st Semester">1st Semester</SelectItem>
                      <SelectItem value="2nd Semester">2nd Semester</SelectItem>
                      <SelectItem value="3rd Semester">3rd Semester</SelectItem>
                      <SelectItem value="4th Semester">4th Semester</SelectItem>
                      <SelectItem value="5th Semester">5th Semester</SelectItem>
                      <SelectItem value="6th Semester">6th Semester</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="editStudentName">Full Name</Label>
                <Input
                  id="editStudentName"
                  value={selectedStudent.studentName}
                  onChange={(e) => setSelectedStudent(prev => prev ? { ...prev, studentName: e.target.value } : null)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="editEmail">Email Address</Label>
                <Input
                  id="editEmail"
                  type="email"
                  value={selectedStudent.email}
                  onChange={(e) => setSelectedStudent(prev => prev ? { ...prev, email: e.target.value } : null)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="editPhone">Phone Number</Label>
                <Input
                  id="editPhone"
                  value={selectedStudent.phone || ''}
                  onChange={(e) => setSelectedStudent(prev => prev ? { ...prev, phone: e.target.value } : null)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="editCourse">Course</Label>
                  <Select 
                    value={selectedStudent.course} 
                    onValueChange={(value) => setSelectedStudent(prev => prev ? { ...prev, course: value } : null)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Computer Science">Computer Science</SelectItem>
                      <SelectItem value="Mathematics">Mathematics</SelectItem>
                      <SelectItem value="Engineering">Engineering</SelectItem>
                      <SelectItem value="Business Administration">Business Administration</SelectItem>
                      <SelectItem value="Biology">Biology</SelectItem>
                      <SelectItem value="Physics">Physics</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="editDepartment">Department</Label>
                  <Select 
                    value={selectedStudent.department} 
                    onValueChange={(value) => setSelectedStudent(prev => prev ? { ...prev, department: value } : null)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Computer Science">Computer Science</SelectItem>
                      <SelectItem value="Mathematics">Mathematics</SelectItem>
                      <SelectItem value="Engineering">Engineering</SelectItem>
                      <SelectItem value="Business Administration">Business Administration</SelectItem>
                      <SelectItem value="Biology">Biology</SelectItem>
                      <SelectItem value="Physics">Physics</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
                <Button onClick={handleUpdateStudent} disabled={updateStudentMutation.isLoading}>
                  <Save className="mr-2 h-4 w-4" />
                  {updateStudentMutation.isLoading ? 'Updating...' : 'Update Student'}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}