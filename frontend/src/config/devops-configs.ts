// DevOps Configuration Files and Templates
// This file contains all the configuration content that would be in separate config files

export const dockerConfigs = {
  backendDockerfile: `FROM openjdk:17-jdk-slim as build

# Set working directory
WORKDIR /app

# Copy gradle wrapper and build files
COPY gradlew .
COPY gradle gradle
COPY build.gradle .
COPY settings.gradle .

# Copy source code
COPY src src

# Make gradlew executable
RUN chmod +x ./gradlew

# Build the application
RUN ./gradlew build -x test

# Production stage
FROM openjdk:17-jre-slim

# Create app user
RUN addgroup --system spring && adduser --system spring --ingroup spring

# Set working directory
WORKDIR /app

# Copy jar file from build stage
COPY --from=build /app/build/libs/*.jar app.jar

# Change ownership
RUN chown spring:spring app.jar

# Switch to app user
USER spring

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=30s --retries=3 \\
  CMD curl -f http://localhost:8080/actuator/health || exit 1

# Run the application
ENTRYPOINT ["java", "-Djava.security.egd=file:/dev/./urandom", "-jar", "app.jar"]`,

  frontendDockerfile: `FROM node:18-alpine as build

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built app to nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \\
  CMD curl -f http://localhost/health || exit 1

CMD ["nginx", "-g", "daemon off;"]`,

  dockerCompose: `version: '3.8'

services:
  # PostgreSQL Database
  postgres:
    image: postgres:15-alpine
    container_name: college-db
    environment:
      POSTGRES_DB: college_management
      POSTGRES_USER: college_user
      POSTGRES_PASSWORD: college_password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql
    networks:
      - college-network
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U college_user -d college_management"]
      interval: 30s
      timeout: 10s
      retries: 3

  # Backend Service
  backend:
    build:
      context: ../backend
      dockerfile: ../docker/backend.Dockerfile
    container_name: college-backend
    environment:
      SPRING_PROFILES_ACTIVE: docker
      SPRING_DATASOURCE_URL: jdbc:postgresql://postgres:5432/college_management
      SPRING_DATASOURCE_USERNAME: college_user
      SPRING_DATASOURCE_PASSWORD: college_password
      SPRING_JPA_HIBERNATE_DDL_AUTO: update
      JWT_SECRET: your-jwt-secret-key-here
      CORS_ALLOWED_ORIGINS: http://localhost:3000,http://frontend:80
    ports:
      - "8080:8080"
    depends_on:
      postgres:
        condition: service_healthy
    networks:
      - college-network
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080/actuator/health"]
      interval: 30s
      timeout: 10s
      retries: 3
    restart: unless-stopped

  # Frontend Service
  frontend:
    build:
      context: ../frontend
      dockerfile: ../docker/frontend.Dockerfile
    container_name: college-frontend
    ports:
      - "3000:80"
    environment:
      REACT_APP_API_BASE_URL: http://localhost:8080/api
    depends_on:
      backend:
        condition: service_healthy
    networks:
      - college-network
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:80/health"]
      interval: 30s
      timeout: 10s
      retries: 3
    restart: unless-stopped

  # SonarQube for Code Analysis
  sonarqube:
    image: sonarqube:community
    container_name: college-sonarqube
    ports:
      - "9000:9000"
    environment:
      SONAR_ES_BOOTSTRAP_CHECKS_DISABLE: true
      SONAR_JDBC_URL: jdbc:postgresql://postgres:5432/sonarqube
      SONAR_JDBC_USERNAME: college_user
      SONAR_JDBC_PASSWORD: college_password
    depends_on:
      postgres:
        condition: service_healthy
    networks:
      - college-network
    volumes:
      - sonarqube_data:/opt/sonarqube/data
      - sonarqube_logs:/opt/sonarqube/logs
      - sonarqube_extensions:/opt/sonarqube/extensions

volumes:
  postgres_data:
  sonarqube_data:
  sonarqube_logs:
  sonarqube_extensions:

networks:
  college-network:
    driver: bridge`,

  nginxConfig: `events {
    worker_connections 1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;
    
    # Logging
    log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                    '$status $body_bytes_sent "$http_referer" '
                    '"$http_user_agent" "$http_x_forwarded_for"';
    
    access_log /var/log/nginx/access.log main;
    error_log /var/log/nginx/error.log warn;
    
    # Performance optimizations
    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
    types_hash_max_size 2048;
    
    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 10240;
    gzip_proxied expired no-cache no-store private must-revalidate auth;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/javascript
        application/xml+rss
        application/json;
    
    server {
        listen 80;
        server_name localhost;
        root /usr/share/nginx/html;
        index index.html;
        
        # Security headers
        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header X-XSS-Protection "1; mode=block" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header Referrer-Policy "no-referrer-when-downgrade" always;
        add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
        
        # Handle client-side routing
        location / {
            try_files $uri $uri/ /index.html;
            add_header Cache-Control "no-cache, no-store, must-revalidate";
            add_header Pragma "no-cache";
            add_header Expires "0";
        }
        
        # Static assets caching
        location ~* \\.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
        
        # Health check endpoint
        location /health {
            access_log off;
            return 200 "healthy\\n";
            add_header Content-Type text/plain;
        }
        
        # API proxy (if needed)
        location /api/ {
            proxy_pass http://backend:8080/api/;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
}`
};

export const cicdConfigs = {
  githubActions: `# GitHub Actions CI/CD Pipeline for College Management System
name: College Management System CI/CD

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

env:
  REGISTRY: ghcr.io
  BACKEND_IMAGE_NAME: college-management-backend
  FRONTEND_IMAGE_NAME: college-management-frontend

jobs:
  # Backend Tests and Analysis
  backend-tests:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: ./backend
    
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: test_password
          POSTGRES_USER: test_user
          POSTGRES_DB: test_db
        ports:
          - 5432:5432
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

    steps:
    - uses: actions/checkout@v4
    
    - name: Set up JDK 17
      uses: actions/setup-java@v3
      with:
        java-version: '17'
        distribution: 'temurin'
        cache: gradle
    
    - name: Grant execute permission for gradlew
      run: chmod +x gradlew
    
    - name: Run unit tests
      run: ./gradlew test --info
      env:
        SPRING_DATASOURCE_URL: jdbc:postgresql://localhost:5432/test_db
        SPRING_DATASOURCE_USERNAME: test_user
        SPRING_DATASOURCE_PASSWORD: test_password
    
    - name: Run integration tests
      run: ./gradlew integrationTest --info
      env:
        SPRING_DATASOURCE_URL: jdbc:postgresql://localhost:5432/test_db
        SPRING_DATASOURCE_USERNAME: test_user
        SPRING_DATASOURCE_PASSWORD: test_password
    
    - name: Generate test coverage report
      run: ./gradlew jacocoTestReport
    
    - name: SonarQube Scan
      uses: sonarqube-quality-gate-action@master
      env:
        GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
        SONAR_TOKEN: \${{ secrets.SONAR_TOKEN }}
      with:
        scanMetadataReportFile: build/sonar/report-task.txt`,

  sonarConfig: `# SonarQube Configuration for College Management System

# Project identification
sonar.projectKey=college-management-system
sonar.projectName=College Management System
sonar.projectVersion=1.0.0

# Source code directories
sonar.sources=src/main
sonar.tests=src/test

# Language-specific settings
sonar.java.source=17
sonar.java.target=17
sonar.java.binaries=build/classes
sonar.java.libraries=build/libs/*
sonar.java.test.binaries=build/test-classes

# Coverage reports
sonar.coverage.jacoco.xmlReportPaths=build/reports/jacoco/test/jacocoTestReport.xml
sonar.junit.reportPaths=build/test-results/test

# Exclude files from analysis
sonar.exclusions=**/*Config.java,**/*Application.java,**/*Entity.java,**/*Dto.java

# Quality gate settings
sonar.qualitygate.wait=true`
};

export const terraformConfigs = {
  mainTf: `# Terraform configuration for AWS infrastructure

terraform {
  required_version = ">= 1.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
  
  backend "s3" {
    bucket = "college-management-terraform-state"
    key    = "terraform.tfstate"
    region = "us-west-2"
  }
}

provider "aws" {
  region = var.aws_region
}

# VPC Configuration
resource "aws_vpc" "college_vpc" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true
  
  tags = {
    Name        = "college-management-vpc"
    Environment = var.environment
  }
}`,

  variablesTf: `# Terraform Variables

variable "aws_region" {
  description = "AWS region for resources"
  type        = string
  default     = "us-west-2"
}

variable "environment" {
  description = "Environment name"
  type        = string
  default     = "production"
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t3.medium"
}

variable "db_name" {
  description = "Database name"
  type        = string
  default     = "college_management"
}

variable "db_username" {
  description = "Database username"
  type        = string
  default     = "college_user"
}

variable "db_password" {
  description = "Database password"
  type        = string
  sensitive   = true
}`
};

export const designPatterns = {
  repositoryPattern: `/**
 * Repository Pattern Implementation
 * Provides abstraction layer for data access
 */
public interface BaseRepository<T, ID> {
    T save(T entity);
    Optional<T> findById(ID id);
    List<T> findAll();
    Page<T> findAll(Pageable pageable);
    void deleteById(ID id);
    boolean existsById(ID id);
    long count();
}

/**
 * Student Repository with specific business methods
 */
public interface StudentRepository extends BaseRepository<Student, Long> {
    Optional<Student> findByStudentId(String studentId);
    List<Student> findByStudentNameContainingIgnoreCase(String name);
    List<Student> findByCourse(String course);
    List<Student> findByDepartment(String department);
    boolean existsByStudentId(String studentId);
    boolean existsByEmail(String email);
}`,

  servicePattern: `/**
 * Service Layer Pattern with Business Logic
 * Implements Facade Pattern for complex operations
 */
@Service
@Transactional
public class StudentServiceImpl implements StudentService {
    
    private final StudentRepository studentRepository;
    private final StudentMapper studentMapper;
    private final StudentValidator studentValidator;
    private final NotificationService notificationService;
    private final AuditService auditService;
    
    @Override
    @Transactional
    @CacheEvict(value = "students", allEntries = true)
    public StudentDto createStudent(StudentDto studentDto) {
        // Validation using Strategy Pattern
        ValidationResult result = studentValidator.validate(studentDto);
        if (!result.isValid()) {
            throw new ValidationException(result.getErrors());
        }
        
        // Check for duplicates
        if (studentRepository.existsByStudentId(studentDto.getStudentId())) {
            throw new DuplicateStudentException("Student ID already exists");
        }
        
        // Map and save
        Student student = studentMapper.toEntity(studentDto);
        Student savedStudent = studentRepository.save(student);
        StudentDto resultDto = studentMapper.toDto(savedStudent);
        
        // Notifications using Observer Pattern
        notificationService.notifyStudentCreated(resultDto);
        auditService.logStudentCreation(resultDto);
        
        return resultDto;
    }
}`,

  dtoPattern: `/**
 * DTO Pattern with Builder Implementation
 */
public class StudentDto {
    private Long id;
    
    @NotBlank(message = "Student ID is required")
    @Pattern(regexp = "^STU\\\\d{6}$", message = "Invalid student ID format")
    private String studentId;
    
    @NotBlank(message = "Student name is required")
    @Size(min = 2, max = 100, message = "Name must be 2-100 characters")
    private String studentName;
    
    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;
    
    private String course;
    private String department;
    private String semester;
    private String phone;
    
    // Builder Pattern Implementation
    public static class Builder {
        private StudentDto dto = new StudentDto();
        
        public Builder id(Long id) {
            dto.id = id;
            return this;
        }
        
        public Builder studentId(String studentId) {
            dto.studentId = studentId;
            return this;
        }
        
        public Builder studentName(String studentName) {
            dto.studentName = studentName;
            return this;
        }
        
        public Builder email(String email) {
            dto.email = email;
            return this;
        }
        
        public Builder from(StudentDto other) {
            dto.id = other.id;
            dto.studentId = other.studentId;
            dto.studentName = other.studentName;
            dto.email = other.email;
            dto.course = other.course;
            dto.department = other.department;
            dto.semester = other.semester;
            dto.phone = other.phone;
            return this;
        }
        
        public StudentDto build() {
            return dto;
        }
    }
    
    public static Builder builder() {
        return new Builder();
    }
}`
};

export const testingFramework = {
  mockitoTests: `/**
 * Comprehensive Test Suite using Mockito Framework
 */
@ExtendWith(MockitoExtension.class)
@DisplayName("Student Service Tests")
class StudentServiceTest {
    
    @Mock
    private StudentRepository studentRepository;
    
    @Mock
    private StudentMapper studentMapper;
    
    @Mock
    private NotificationService notificationService;
    
    @InjectMocks
    private StudentServiceImpl studentService;
    
    @Captor
    private ArgumentCaptor<Student> studentCaptor;
    
    private Student testStudent;
    private StudentDto testStudentDto;
    
    @BeforeEach
    void setUp() {
        testStudent = Student.builder()
                .id(1L)
                .studentId("STU000001")
                .studentName("John Doe")
                .course("Computer Science")
                .email("john.doe@email.com")
                .build();
                
        testStudentDto = StudentDto.builder()
                .id(1L)
                .studentId("STU000001")
                .studentName("John Doe")
                .course("Computer Science")
                .email("john.doe@email.com")
                .build();
    }
    
    @Test
    @DisplayName("Should create student successfully when valid data provided")
    void shouldCreateStudentSuccessfully() {
        // Arrange
        when(studentRepository.existsByStudentId(testStudentDto.getStudentId()))
            .thenReturn(false);
        when(studentMapper.toEntity(testStudentDto)).thenReturn(testStudent);
        when(studentRepository.save(any(Student.class))).thenReturn(testStudent);
        when(studentMapper.toDto(testStudent)).thenReturn(testStudentDto);
        
        // Act
        StudentDto result = studentService.createStudent(testStudentDto);
        
        // Assert
        assertThat(result).isNotNull();
        assertThat(result.getStudentId()).isEqualTo(testStudentDto.getStudentId());
        
        // Verify interactions
        verify(studentRepository).save(studentCaptor.capture());
        verify(notificationService).notifyStudentCreated(any(StudentDto.class));
        
        Student capturedStudent = studentCaptor.getValue();
        assertThat(capturedStudent.getStudentId()).isEqualTo(testStudent.getStudentId());
    }
    
    @Test
    @DisplayName("Should throw exception when student ID already exists")
    void shouldThrowExceptionWhenStudentIdExists() {
        // Arrange
        when(studentRepository.existsByStudentId(testStudentDto.getStudentId()))
            .thenReturn(true);
        
        // Act & Assert
        assertThrows(DuplicateStudentException.class, 
            () -> studentService.createStudent(testStudentDto));
        
        verify(studentRepository, never()).save(any(Student.class));
    }
}`,

  integrationTests: `/**
 * Integration Test using TestContainers
 */
@SpringBootTest
@Testcontainers
@DisplayName("Student Service Integration Tests")
class StudentServiceIntegrationTest {
    
    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:15")
            .withDatabaseName("college_test")
            .withUsername("test")
            .withPassword("test");
    
    @Autowired
    private StudentService studentService;
    
    @DynamicPropertySource
    static void configureProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", postgres::getJdbcUrl);
        registry.add("spring.datasource.username", postgres::getUsername);
        registry.add("spring.datasource.password", postgres::getPassword);
    }
    
    @Test
    @DisplayName("Should perform full CRUD operations on real database")
    void shouldPerformFullCrudOperations() {
        // Create
        StudentDto createDto = StudentDto.builder()
                .studentId("STU000001")
                .studentName("Integration Test Student")
                .course("Computer Science")
                .email("integration@test.com")
                .build();
                
        StudentDto created = studentService.createStudent(createDto);
        assertThat(created.getId()).isNotNull();
        
        // Read
        Optional<StudentDto> found = studentService.getStudentById(created.getId());
        assertThat(found).isPresent();
        
        // Update
        StudentDto updateDto = StudentDto.builder()
                .from(created)
                .studentName("Updated Name")
                .build();
                
        StudentDto updated = studentService.updateStudent(created.getId(), updateDto);
        assertThat(updated.getStudentName()).isEqualTo("Updated Name");
        
        // Delete
        studentService.deleteStudent(created.getId());
        Optional<StudentDto> deleted = studentService.getStudentById(created.getId());
        assertThat(deleted).isEmpty();
    }
}`
};