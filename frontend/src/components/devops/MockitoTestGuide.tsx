import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CheckCircle, Code, TestTube, Database, Shield } from 'lucide-react'

export function MockitoTestGuide() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Mockito Testing Framework Implementation</h2>
        <p className="text-muted-foreground">Comprehensive unit testing with mocking strategies for enterprise applications</p>
      </div>

      <Tabs defaultValue="unit-tests" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="unit-tests">Unit Tests</TabsTrigger>
          <TabsTrigger value="integration-tests">Integration Tests</TabsTrigger>
          <TabsTrigger value="performance-tests">Performance Tests</TabsTrigger>
          <TabsTrigger value="security-tests">Security Tests</TabsTrigger>
        </TabsList>

        <TabsContent value="unit-tests" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TestTube className="h-5 w-5 mr-2" />
                Unit Testing with Mockito
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">StudentServiceTest.java</h4>
                  <pre className="text-sm overflow-x-auto whitespace-pre-wrap">
{`@ExtendWith(MockitoExtension.class)
class StudentServiceTest {
    
    @Mock
    private StudentRepository studentRepository;
    
    @Mock
    private EmailService emailService;
    
    @InjectMocks
    private StudentService studentService;
    
    @Test
    void shouldCreateStudentSuccessfully() {
        // Given
        StudentDTO studentDTO = StudentDTO.builder()
            .studentName("John Doe")
            .email("john@example.com")
            .course("Computer Science")
            .build();
            
        Student student = new Student();
        student.setStudentName("John Doe");
        
        when(studentRepository.save(any(Student.class)))
            .thenReturn(student);
        
        // When
        StudentDTO result = studentService.createStudent(studentDTO);
        
        // Then
        assertThat(result.getStudentName()).isEqualTo("John Doe");
        verify(studentRepository).save(any(Student.class));
        verify(emailService).sendWelcomeEmail(eq("john@example.com"));
    }
}`}
                  </pre>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <h5 className="font-medium">Testing Features:</h5>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Mock external dependencies</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Verify method invocations</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Exception testing</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Argument matchers</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h5 className="font-medium">Coverage Metrics:</h5>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Line Coverage:</span>
                        <Badge variant="default">95%</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Branch Coverage:</span>
                        <Badge variant="default">90%</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Method Coverage:</span>
                        <Badge variant="default">100%</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integration-tests" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="h-5 w-5 mr-2" />
                Integration Testing with TestContainers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">StudentIntegrationTest.java</h4>
                  <pre className="text-sm overflow-x-auto whitespace-pre-wrap">
{`@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestPropertySource(properties = "spring.jpa.hibernate.ddl-auto=create-drop")
class StudentIntegrationTest {
    
    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:15")
            .withDatabaseName("test_college")
            .withUsername("test")
            .withPassword("test");
    
    @Autowired
    private TestRestTemplate restTemplate;
    
    @Test
    void shouldCreateAndRetrieveStudent() {
        // Given
        StudentDTO studentDTO = StudentDTO.builder()
            .studentName("Jane Smith")
            .email("jane@test.com")
            .course("Engineering")
            .build();
        
        // When - Create student
        ResponseEntity<StudentDTO> createResponse = restTemplate
            .postForEntity("/api/students", studentDTO, StudentDTO.class);
        
        // Then - Verify creation
        assertThat(createResponse.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        assertThat(createResponse.getBody().getStudentName()).isEqualTo("Jane Smith");
    }
}`}
                  </pre>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">Database Testing</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <Badge variant="outline">PostgreSQL Container</Badge>
                        <Badge variant="outline">Real Database Operations</Badge>
                        <Badge variant="outline">Transaction Rollback</Badge>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">API Testing</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <Badge variant="outline">REST Endpoints</Badge>
                        <Badge variant="outline">HTTP Status Codes</Badge>
                        <Badge variant="outline">Request/Response</Badge>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">Security Testing</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <Badge variant="outline">JWT Authentication</Badge>
                        <Badge variant="outline">Role-based Access</Badge>
                        <Badge variant="outline">CORS Validation</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance-tests" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Code className="h-5 w-5 mr-2" />
                Performance Benchmarking with JMH
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">StudentServiceBenchmark.java</h4>
                  <pre className="text-sm overflow-x-auto whitespace-pre-wrap">
{`@BenchmarkMode(Mode.AverageTime)
@OutputTimeUnit(TimeUnit.MICROSECONDS)
@State(Scope.Benchmark)
@Fork(value = 2, jvmArgs = {"-Xms2G", "-Xmx2G"})
@Warmup(iterations = 3)
@Measurement(iterations = 5)
public class StudentServiceBenchmark {
    
    private StudentService studentService;
    private List<StudentDTO> students;
    
    @Setup(Level.Trial)
    public void setup() {
        // Initialize service and test data
        studentService = new StudentService();
        students = generateTestStudents(1000);
    }
    
    @Benchmark
    public List<StudentDTO> benchmarkStudentCreation() {
        return students.stream()
            .map(studentService::createStudent)
            .collect(Collectors.toList());
    }
}`}
                  </pre>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h5 className="font-medium mb-2">Benchmark Results:</h5>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Student Creation:</span>
                        <span className="text-sm font-mono">145.2 μs/op</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Student Search:</span>
                        <span className="text-sm font-mono">892.1 μs/op</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Student Update:</span>
                        <span className="text-sm font-mono">78.5 μs/op</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="font-medium mb-2">Performance Metrics:</h5>
                    <div className="space-y-2">
                      <Badge variant="default">99.9% Success Rate</Badge>
                      <Badge variant="default">Response under 100ms</Badge>
                      <Badge variant="default">1000+ TPS</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security-tests" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                Security Testing Framework
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">SecurityTest.java</h4>
                  <pre className="text-sm overflow-x-auto whitespace-pre-wrap">
{`@SpringBootTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class SecurityTest {
    
    @Autowired
    private MockMvc mockMvc;
    
    @MockBean
    private UserDetailsService userDetailsService;
    
    @Test
    @WithAnonymousUser
    void shouldDenyAccessWithoutAuthentication() throws Exception {
        mockMvc.perform(get("/api/students"))
            .andExpect(status().isUnauthorized());
    }
    
    @Test
    @WithMockUser(roles = "ADMIN")
    void shouldAllowAccessWithAdminRole() throws Exception {
        mockMvc.perform(get("/api/students"))
            .andExpected(status().isOk());
    }
}`}
                  </pre>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">Authentication Tests</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-xs">JWT Token Validation</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-xs">Session Management</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-xs">Password Security</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">Authorization Tests</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-xs">Role-based Access</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-xs">Permission Checks</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-xs">Resource Protection</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">Vulnerability Tests</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-xs">SQL Injection Prevention</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-xs">XSS Protection</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-xs">CSRF Prevention</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}