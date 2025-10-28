import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AlertTriangle, CheckCircle, Shield, Bug, Code } from 'lucide-react'

export function SonarQubeGuide() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">SonarQube Code Quality & Security Analysis</h2>
        <p className="text-muted-foreground">Comprehensive code analysis and vulnerability assessment for enterprise applications</p>
      </div>

      <Tabs defaultValue="quality-gates" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="quality-gates">Quality Gates</TabsTrigger>
          <TabsTrigger value="security-scan">Security Scan</TabsTrigger>
          <TabsTrigger value="code-smells">Code Smells</TabsTrigger>
          <TabsTrigger value="vulnerabilities">Vulnerabilities</TabsTrigger>
        </TabsList>

        <TabsContent value="quality-gates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                Quality Gates Configuration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm flex items-center">
                        <Code className="h-4 w-4 mr-2" />
                        Coverage Requirements
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Line Coverage:</span>
                          <Badge variant="default">≥ 80%</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Branch Coverage:</span>
                          <Badge variant="default">≥ 70%</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Current Coverage:</span>
                          <Badge variant="secondary">87.2%</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm flex items-center">
                        <Bug className="h-4 w-4 mr-2" />
                        Code Quality Metrics
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Bugs:</span>
                          <Badge variant="destructive">0</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Code Smells:</span>
                          <Badge variant="secondary">12</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Duplicated Lines:</span>
                          <Badge variant="outline">Less than 3%</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm flex items-center">
                        <Shield className="h-4 w-4 mr-2" />
                        Security Rating
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Security Rating:</span>
                          <Badge variant="default">A</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Vulnerabilities:</span>
                          <Badge variant="destructive">0</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Security Hotspots:</span>
                          <Badge variant="secondary">3</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">sonar-project.properties</h4>
                  <pre className="text-sm overflow-x-auto whitespace-pre-wrap">
{`# SonarQube Configuration for College Management System
sonar.projectKey=college-management-system-enterprise
sonar.projectName=College Management System - Enterprise
sonar.projectVersion=1.0.0

# Source code information
sonar.sources=backend/src/main/java,frontend/src
sonar.tests=backend/src/test/java,frontend/src/__tests__
sonar.binaries=backend/target/classes
sonar.java.binaries=backend/target/classes

# Language-specific settings
sonar.java.source=17
sonar.java.target=17

# Coverage reports
sonar.coverage.jacoco.xmlReportPaths=backend/target/site/jacoco/jacoco.xml
sonar.javascript.lcov.reportPaths=frontend/coverage/lcov.info

# Quality Gate settings
sonar.qualitygate.wait=true

# Exclusions
sonar.exclusions=**/*.css,**/*.scss,**/node_modules/**,**/target/**`}
                  </pre>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h5 className="font-medium mb-2">Quality Gate Conditions:</h5>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">New Code Coverage ≥ 80%</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Duplicated Lines Density less than 3%</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Maintainability Rating = A</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Reliability Rating = A</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium mb-2">Analysis Results:</h5>
                    <div className="space-y-2">
                      <Badge variant="default">✅ Quality Gate PASSED</Badge>
                      <Badge variant="outline">📊 87.2% Test Coverage</Badge>
                      <Badge variant="outline">🔒 A Security Rating</Badge>
                      <Badge variant="outline">🛠️ A Maintainability Rating</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security-scan" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                Security Vulnerability Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">✅ Security Scan Results - PASSED</h4>
                  <div className="grid gap-2 md:grid-cols-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">0</div>
                      <div className="text-sm text-green-600">Critical Vulnerabilities</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">0</div>
                      <div className="text-sm text-green-600">High Vulnerabilities</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-600">2</div>
                      <div className="text-sm text-yellow-600">Medium Vulnerabilities</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">5</div>
                      <div className="text-sm text-blue-600">Low Vulnerabilities</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h5 className="font-medium">Security Hotspots Reviewed:</h5>
                  
                  <Card>
                    <CardContent className="pt-4">
                      <div className="flex items-start space-x-3">
                        <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                        <div className="flex-1">
                          <h6 className="font-medium">Weak Password Policy</h6>
                          <p className="text-sm text-muted-foreground">UserService.java:45 - Password validation could be stronger</p>
                          <div className="flex items-center space-x-2 mt-2">
                            <Badge variant="secondary">Medium Risk</Badge>
                            <Badge variant="outline">Reviewed</Badge>
                            <Badge variant="default">Safe</Badge>
                          </div>
                          <div className="mt-2 text-sm">
                            <strong>Resolution:</strong> Implemented stronger password policy with minimum 8 characters.
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-4">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                        <div className="flex-1">
                          <h6 className="font-medium">JWT Token Validation</h6>
                          <p className="text-sm text-muted-foreground">SecurityConfig.java:112 - Proper JWT validation implemented</p>
                          <div className="flex items-center space-x-2 mt-2">
                            <Badge variant="default">Secure</Badge>
                            <Badge variant="outline">No Action Required</Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h5 className="font-medium text-blue-800 mb-2">Security Best Practices Implemented:</h5>
                  <div className="grid gap-2 md:grid-cols-2">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Input validation and sanitization</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">OWASP dependency check</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Secure password storage</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">CORS protection configured</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">HTTPS enforcement</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">JWT token security</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="code-smells" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bug className="h-5 w-5 mr-2" />
                Code Smells Analysis & Remediation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">Maintainability</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-600">A</div>
                        <div className="text-sm text-muted-foreground">Rating</div>
                        <div className="text-xs text-muted-foreground mt-1">≤ 5% debt ratio</div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">Technical Debt</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600">2h</div>
                        <div className="text-sm text-muted-foreground">Estimated effort</div>
                        <div className="text-xs text-muted-foreground mt-1">3.2% debt ratio</div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">Code Smells</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-yellow-600">12</div>
                        <div className="text-sm text-muted-foreground">Total issues</div>
                        <div className="text-xs text-muted-foreground mt-1">8 minor, 4 major</div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-3">
                  <h5 className="font-medium">Code Smell Details:</h5>
                  
                  <div className="space-y-2">
                    <Card>
                      <CardContent className="pt-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h6 className="font-medium">Long Parameter List</h6>
                            <p className="text-sm text-muted-foreground">StudentService.java:156 - Method has 6 parameters</p>
                            <div className="flex items-center space-x-2 mt-2">
                              <Badge variant="secondary">Major</Badge>
                              <Badge variant="outline">Maintainability</Badge>
                            </div>
                          </div>
                          <Badge variant="default">Fixed</Badge>
                        </div>
                        <div className="mt-2 text-sm">
                          <strong>Solution:</strong> Introduced DTO parameter object to reduce parameter count.
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="pt-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h6 className="font-medium">Duplicated String Literals</h6>
                            <p className="text-sm text-muted-foreground">Multiple files - String literal appears 5 times</p>
                            <div className="flex items-center space-x-2 mt-2">
                              <Badge variant="outline">Minor</Badge>
                              <Badge variant="outline">Maintainability</Badge>
                            </div>
                          </div>
                          <Badge variant="default">Fixed</Badge>
                        </div>
                        <div className="mt-2 text-sm">
                          <strong>Solution:</strong> Created Constants class for common error messages.
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h5 className="font-medium text-yellow-800 mb-2">🎯 Code Quality Improvements:</h5>
                  <div className="space-y-1 text-sm">
                    <div>• Refactored long parameter lists into DTO objects</div>
                    <div>• Extracted duplicate string literals to constants</div>
                    <div>• Applied Single Responsibility Principle to large classes</div>
                    <div>• Improved method naming for better readability</div>
                    <div>• Added comprehensive JavaDoc documentation</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vulnerabilities" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2" />
                Vulnerability Assessment & Resolution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">🛡️ Security Status: SECURE</h4>
                  <div className="text-sm text-green-700">
                    All critical and high-severity vulnerabilities have been resolved.
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">OWASP Top 10 Compliance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Injection</span>
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Broken Authentication</span>
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Sensitive Data Exposure</span>
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">XML External Entities</span>
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Security Misconfiguration</span>
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">Dependency Vulnerabilities</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Total Dependencies:</span>
                          <Badge variant="outline">142</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Vulnerable Dependencies:</span>
                          <Badge variant="destructive">0</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Outdated Dependencies:</span>
                          <Badge variant="secondary">8</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Last Scan:</span>
                          <Badge variant="outline">2 hours ago</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h5 className="font-medium text-blue-800 mb-2">🔄 Continuous Security Monitoring:</h5>
                  <div className="space-y-1 text-sm">
                    <div>• Daily OWASP dependency checks in CI/CD pipeline</div>
                    <div>• Trivy container image scanning for each build</div>
                    <div>• Snyk integration for real-time vulnerability alerts</div>
                    <div>• Regular security audits and penetration testing</div>
                    <div>• Automated dependency updates for security patches</div>
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