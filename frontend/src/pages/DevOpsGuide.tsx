import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Container, Play, Settings, Shield, Monitor, Cloud, GitBranch, Database, CheckCircle } from 'lucide-react'
import { MockitoTestGuide } from '@/components/devops/MockitoTestGuide'
import { DesignPatternsGuide } from '@/components/devops/DesignPatternsGuide'
import { SonarQubeGuide } from '@/components/devops/SonarQubeGuide'

export function DevOpsGuide() {
  const dockerCommands = [
    {
      title: 'Start Development Environment',
      command: 'docker-compose up -d',
      description: 'Starts all services in background'
    },
    {
      title: 'View Logs',
      command: 'docker-compose logs -f',
      description: 'Follow logs from all containers'
    },
    {
      title: 'Stop All Services',
      command: 'docker-compose down',
      description: 'Stops and removes all containers'
    },
    {
      title: 'Rebuild Images',
      command: 'docker-compose build --no-cache',
      description: 'Rebuild all images from scratch'
    }
  ]

  const deploymentSteps = [
    {
      step: 1,
      title: 'Setup Infrastructure',
      description: 'Configure AWS/Azure resources with Terraform',
      status: 'ready'
    },
    {
      step: 2,
      title: 'Build Docker Images',
      description: 'Create optimized production containers',
      status: 'ready'
    },
    {
      step: 3,
      title: 'Deploy to Cloud',
      description: 'Deploy containers to EC2/Azure VM',
      status: 'ready'
    },
    {
      step: 4,
      title: 'Configure CI/CD',
      description: 'Setup GitHub Actions pipeline',
      status: 'ready'
    }
  ]

  const features = [
    {
      icon: Container,
      title: 'Docker Containerization',
      description: 'Frontend & Backend containerized with optimized production builds',
      items: ['Multi-stage builds', 'Security hardening', 'Health checks', 'Volume management']
    },
    {
      icon: Shield,
      title: 'Security Scanning',
      description: 'Comprehensive vulnerability assessment and code quality analysis',
      items: ['SonarQube integration', 'Trivy image scanning', 'OWASP dependency check', 'Security best practices']
    },
    {
      icon: GitBranch,
      title: 'CI/CD Pipeline',
      description: 'Automated testing, building, and deployment workflow',
      items: ['GitHub Actions', 'Automated testing', 'Quality gates', 'Deployment automation']
    },
    {
      icon: Cloud,
      title: 'Cloud Deployment',
      description: 'Production-ready deployment on AWS or Azure',
      items: ['Infrastructure as Code', 'Auto scaling', 'Load balancing', 'Database management']
    },
    {
      icon: Monitor,
      title: 'Monitoring & Logging',
      description: 'Comprehensive application and infrastructure monitoring',
      items: ['Application metrics', 'Log aggregation', 'Performance monitoring', 'Alerting']
    },
    {
      icon: Database,
      title: 'Database Integration',
      description: 'Production PostgreSQL with AWS RDS or Azure SQL',
      items: ['Connection pooling', 'Backup strategy', 'High availability', 'Performance tuning']
    }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Enterprise DevOps Implementation</h1>
        <p className="text-muted-foreground">Production-ready deployment with Docker, CI/CD, and cloud infrastructure</p>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => {
          const Icon = feature.icon
          return (
            <Card key={index} className="h-fit">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{feature.description}</p>
                <div className="space-y-2">
                  {feature.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-xs">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Implementation Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Implementation Guide</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="docker" className="w-full">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="docker">Docker</TabsTrigger>
              <TabsTrigger value="testing">Mockito Tests</TabsTrigger>
              <TabsTrigger value="patterns">Design Patterns</TabsTrigger>
              <TabsTrigger value="security">SonarQube</TabsTrigger>
              <TabsTrigger value="cicd">CI/CD</TabsTrigger>
              <TabsTrigger value="cloud">Cloud</TabsTrigger>
            </TabsList>

            <TabsContent value="docker" className="space-y-4">
              <h3 className="text-lg font-semibold">Docker Setup</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {dockerCommands.map((cmd, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">{cmd.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <code className="block bg-muted p-3 rounded text-sm font-mono mb-2">{cmd.command}</code>
                      <p className="text-xs text-muted-foreground">{cmd.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Container Architecture:</h4>
                <div className="grid gap-2 md:grid-cols-3">
                  <Badge variant="outline" className="justify-center">
                    Frontend (React + Nginx)
                  </Badge>
                  <Badge variant="outline" className="justify-center">
                    Backend (Spring Boot + OpenJDK)
                  </Badge>
                  <Badge variant="outline" className="justify-center">
                    Database (PostgreSQL)
                  </Badge>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="testing">
              <MockitoTestGuide />
            </TabsContent>

            <TabsContent value="patterns">
              <DesignPatternsGuide />
            </TabsContent>

            <TabsContent value="security">
              <SonarQubeGuide />
            </TabsContent>

            <TabsContent value="cicd" className="space-y-4">
              <h3 className="text-lg font-semibold">CI/CD Pipeline</h3>
              <div className="space-y-4">
                {deploymentSteps.map((step, index) => (
                  <Card key={index}>
                    <CardContent className="pt-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full">
                          <span className="text-sm font-semibold">{step.step}</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold">{step.title}</h4>
                          <p className="text-sm text-muted-foreground">{step.description}</p>
                        </div>
                        <Badge variant={step.status === 'completed' ? 'default' : 'secondary'}>
                          {step.status === 'ready' ? '✅ Ready' : step.status}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">GitHub Actions Pipeline Features:</h4>
                <div className="grid gap-2 md:grid-cols-2">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Automated code quality checks</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Security vulnerability scanning</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Unit & integration testing</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Docker image building & scanning</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Automated deployment to staging</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Production deployment with approval</span>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="cloud" className="space-y-4">
              <h3 className="text-lg font-semibold">Cloud Deployment</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">AWS Deployment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">EC2 instances with Auto Scaling</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">RDS PostgreSQL database</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Application Load Balancer</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">CloudWatch monitoring</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Azure Deployment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Container Instances</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Azure SQL Database</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Application Gateway</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Azure Monitor</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Implementation Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
            Implementation Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-800 mb-2">✅ All Enterprise Features Implemented:</h4>
              <div className="grid gap-2 md:grid-cols-2">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Docker multi-stage containers</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Mockito testing framework</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Enterprise design patterns</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">SonarQube code quality</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Security vulnerability scanning</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">AWS/Azure deployment ready</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">CI/CD pipeline configured</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Production-grade monitoring</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold">🚀 Ready for Enterprise Deployment!</h4>
                <p className="text-sm text-muted-foreground">All DevOps configurations, testing frameworks, and deployment scripts are implemented and ready to use.</p>
              </div>
              <Button className="ml-4">
                <Play className="h-4 w-4 mr-2" />
                Deploy to Production
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}