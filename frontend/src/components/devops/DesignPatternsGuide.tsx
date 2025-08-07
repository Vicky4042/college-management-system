import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CheckCircle, Layers, Database, Settings, Bell } from 'lucide-react'

export function DesignPatternsGuide() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Enterprise Design Patterns Implementation</h2>
        <p className="text-muted-foreground">Professional design patterns for scalable and maintainable enterprise applications</p>
      </div>

      <Tabs defaultValue="repository" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="repository">Repository</TabsTrigger>
          <TabsTrigger value="service">Service Layer</TabsTrigger>
          <TabsTrigger value="dto">DTO Pattern</TabsTrigger>
          <TabsTrigger value="observer">Observer</TabsTrigger>
          <TabsTrigger value="strategy">Strategy</TabsTrigger>
        </TabsList>

        <TabsContent value="repository" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="h-5 w-5 mr-2" />
                Repository Pattern Implementation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">StudentRepository.java</h4>
                  <pre className="text-sm overflow-x-auto whitespace-pre-wrap">
{`@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    
    @Query("SELECT s FROM Student s WHERE s.department = :department")
    List<Student> findByDepartment(@Param("department") String department);
    
    @Query("SELECT s FROM Student s WHERE s.studentName LIKE %:name% " +
           "OR s.studentId LIKE %:name%")
    List<Student> searchByNameOrId(@Param("name") String searchTerm);
    
    @Query("SELECT COUNT(s) FROM Student s WHERE s.course = :course")
    long countByCourse(@Param("course") String course);
    
    boolean existsByEmail(String email);
    boolean existsByStudentId(String studentId);
    
    @EntityGraph(attributePaths = {"enrollments", "feeRecords"})
    Optional<Student> findByIdWithDetails(Long id);
}`}
                  </pre>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h5 className="font-medium mb-2">Key Benefits:</h5>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Clean separation of data access</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Testable with mock repositories</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Custom query methods</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Criteria API for complex queries</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="font-medium mb-2">Features:</h5>
                    <div className="space-y-2">
                      <Badge variant="outline">JPA Repositories</Badge>
                      <Badge variant="outline">Custom Implementations</Badge>
                      <Badge variant="outline">Entity Graphs</Badge>
                      <Badge variant="outline">Query Optimization</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="service" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Layers className="h-5 w-5 mr-2" />
                Service Layer Pattern with Caching
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">StudentService.java</h4>
                  <pre className="text-sm overflow-x-auto whitespace-pre-wrap">
{`@Service
@Transactional
@Slf4j
public class StudentService {
    
    private final StudentRepository studentRepository;
    private final StudentMapper studentMapper;
    private final EmailService emailService;
    private final AuditService auditService;
    
    @Cacheable(value = "students", key = "#id")
    @Transactional(readOnly = true)
    public StudentDTO getStudentById(Long id) {
        log.debug("Fetching student with id: {}", id);
        
        Student student = studentRepository.findById(id)
            .orElseThrow(() -> new StudentNotFoundException("Student not found"));
        
        return studentMapper.toDTO(student);
    }
    
    public StudentDTO createStudent(StudentDTO studentDTO) {
        log.info("Creating new student: {}", studentDTO.getStudentName());
        
        validateStudentData(studentDTO);
        
        if (studentRepository.existsByEmail(studentDTO.getEmail())) {
            throw new StudentAlreadyExistsException("Student with email already exists");
        }
        
        Student student = studentMapper.toEntity(studentDTO);
        student.setCreatedDate(LocalDateTime.now());
        student.setStatus(StudentStatus.ACTIVE);
        
        Student savedStudent = studentRepository.save(student);
        
        return studentMapper.toDTO(savedStudent);
    }
}`}
                  </pre>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">Business Logic</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <Badge variant="outline">Validation</Badge>
                        <Badge variant="outline">Business Rules</Badge>
                        <Badge variant="outline">Orchestration</Badge>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">Caching</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <Badge variant="outline">Redis Cache</Badge>
                        <Badge variant="outline">TTL Management</Badge>
                        <Badge variant="outline">Cache Eviction</Badge>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">Transactions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <Badge variant="outline">ACID Properties</Badge>
                        <Badge variant="outline">Rollback Handling</Badge>
                        <Badge variant="outline">Isolation Levels</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dto" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                DTO Pattern with Builder and Validation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">StudentDTO.java</h4>
                  <pre className="text-sm overflow-x-auto whitespace-pre-wrap">
{`@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class StudentDTO {
    
    private Long id;
    
    @NotBlank(message = "Student name is required")
    @Size(min = 2, max = 100, message = "Student name must be between 2 and 100 characters")
    private String studentName;
    
    @NotBlank(message = "Student ID is required")
    @Pattern(regexp = "^STU\\\\d{6}$", message = "Student ID must follow format STU######")
    private String studentId;
    
    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;
    
    @Pattern(regexp = "^\\\\+?[1-9]\\\\d{1,14}$", message = "Invalid phone number format")
    private String phone;
    
    @NotBlank(message = "Course is required")
    private String course;
    
    @NotBlank(message = "Department is required")
    private String department;
    
    @Valid
    private List<SubjectDTO> subjects;
    
    @Valid
    private AddressDTO address;
}`}
                  </pre>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h5 className="font-medium mb-2">Validation Features:</h5>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Bean Validation annotations</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Custom validation methods</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Nested object validation</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Cross-field validation</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="font-medium mb-2">Mapping Features:</h5>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">MapStruct integration</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Custom mapping methods</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Builder pattern support</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">JSON serialization</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="observer" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 mr-2" />
                Observer Pattern for Event Handling
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Event-Driven Architecture</h4>
                  <pre className="text-sm overflow-x-auto whitespace-pre-wrap">
{`// Event Definition
public class StudentCreatedEvent extends ApplicationEvent {
    private final StudentDTO student;
    private final LocalDateTime timestamp;
    
    public StudentCreatedEvent(Object source, StudentDTO student) {
        super(source);
        this.student = student;
        this.timestamp = LocalDateTime.now();
    }
}

// Event Publisher in Service
@Service
public class StudentService {
    
    private final ApplicationEventPublisher eventPublisher;
    
    public StudentDTO createStudent(StudentDTO studentDTO) {
        // Create student logic...
        StudentDTO createdStudent = // ... save logic
        
        // Publish event
        eventPublisher.publishEvent(
            new StudentCreatedEvent(this, createdStudent)
        );
        
        return createdStudent;
    }
}

// Event Listeners
@Component
@Slf4j
public class StudentEventListener {
    
    @EventListener
    @Async
    public void handleStudentCreated(StudentCreatedEvent event) {
        log.info("Handling student created event for: {}", 
                event.getStudent().getStudentName());
        
        try {
            // Send welcome email
            emailService.sendWelcomeEmail(event.getStudent().getEmail());
            
            // Log audit trail
            auditService.logStudentCreation(event.getStudent().getId());
            
        } catch (Exception e) {
            log.error("Error handling student created event", e);
        }
    }
}`}
                  </pre>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">Event Types</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <Badge variant="outline">Student Created</Badge>
                        <Badge variant="outline">Grade Updated</Badge>
                        <Badge variant="outline">Course Enrolled</Badge>
                        <Badge variant="outline">Fee Payment</Badge>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">Event Handlers</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <Badge variant="outline">Email Service</Badge>
                        <Badge variant="outline">Audit Service</Badge>
                        <Badge variant="outline">Notification Service</Badge>
                        <Badge variant="outline">Analytics Service</Badge>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">Benefits</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-xs">Loose Coupling</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-xs">Async Processing</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-xs">Extensibility</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="strategy" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                Strategy Pattern for Payment Processing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Payment Strategy Implementation</h4>
                  <pre className="text-sm overflow-x-auto whitespace-pre-wrap">
{`// Strategy Interface
public interface PaymentStrategy {
    PaymentResult processPayment(PaymentRequest request);
    boolean supports(PaymentMethod method);
    PaymentMethod getPaymentMethod();
}

// Concrete Strategies
@Component
public class CreditCardPaymentStrategy implements PaymentStrategy {
    
    private final CreditCardService creditCardService;
    
    @Override
    public PaymentResult processPayment(PaymentRequest request) {
        try {
            CreditCardPayment payment = CreditCardPayment.builder()
                .cardNumber(request.getCardNumber())
                .amount(request.getAmount())
                .currency(request.getCurrency())
                .build();
            
            String transactionId = creditCardService.processPayment(payment);
            
            return PaymentResult.builder()
                .success(true)
                .transactionId(transactionId)
                .message("Payment processed successfully")
                .build();
                
        } catch (PaymentException e) {
            return PaymentResult.builder()
                .success(false)
                .errorCode(e.getErrorCode())
                .message(e.getMessage())
                .build();
        }
    }
    
    @Override
    public boolean supports(PaymentMethod method) {
        return PaymentMethod.CREDIT_CARD.equals(method);
    }
}

// Context
@Service
public class PaymentService {
    
    private final List<PaymentStrategy> paymentStrategies;
    
    public PaymentResult processPayment(PaymentRequest request) {
        PaymentStrategy strategy = findStrategy(request.getPaymentMethod());
        
        if (strategy == null) {
            throw new UnsupportedPaymentMethodException(
                "Payment method not supported: " + request.getPaymentMethod()
            );
        }
        
        return strategy.processPayment(request);
    }
}`}
                  </pre>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h5 className="font-medium mb-2">Supported Payment Methods:</h5>
                    <div className="space-y-2">
                      <Badge variant="default">Credit Card</Badge>
                      <Badge variant="default">Bank Transfer</Badge>
                      <Badge variant="default">PayPal</Badge>
                      <Badge variant="default">Digital Wallet</Badge>
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="font-medium mb-2">Key Benefits:</h5>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Easy to add new payment methods</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Testable in isolation</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Runtime strategy selection</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Clean separation of concerns</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}