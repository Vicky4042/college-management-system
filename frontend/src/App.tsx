import { Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from '@/components/ui/toaster';
import { Navigation } from '@/components/navigation/Navigation';
import { Dashboard } from '@/pages/Dashboard';
import StudentManagement from "@/pages/StudentManagement"
import { StudentMarks } from '@/pages/StudentMarks';
import { CourseDetails } from '@/pages/CourseDetails';
import { FeesDetails } from '@/pages/FeesDetails';
import { DevOpsGuide } from '@/pages/DevOpsGuide';
import { Auth } from '@/pages/Auth';
import { useAuthStore } from '@/stores/authStores';
import { useEffect, useState } from 'react';
import React from 'react';

// ✅ Error Boundary
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("ErrorBoundary caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background">
          <h2 className="text-red-600">Something went wrong while loading this page.</h2>
        </div>
      );
    }
    return this.props.children;
  }
}

const queryClient = new QueryClient();

export function App() {
  const { isAuthenticated, checkAuth, isLoading } = useAuthStore();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    checkAuth().finally(() => setChecked(true));
  }, [checkAuth]);

  if (!checked || isLoading) {
    return (
      <QueryClientProvider client={queryClient}>
        <div className="min-h-screen flex items-center justify-center bg-background">
          <p>Loading...</p>
        </div>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <div className="min-h-screen bg-background">
          {isAuthenticated && <Navigation />}
          <main className={isAuthenticated ? "ml-64 p-6" : "p-6"}>
            <Routes>
              {!isAuthenticated && <Route path="/*" element={<Auth />} />}
              {isAuthenticated && (
                <>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/student-management" element={<StudentManagement />} />
                  <Route path="/student-marks" element={<StudentMarks />} />
                  <Route path="/course-details" element={<CourseDetails />} />
                  <Route path="/fees-details" element={<FeesDetails />} />
                  <Route path="/devops-guide" element={<DevOpsGuide />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </>
              )}
            </Routes>
          </main>
          <Toaster />
        </div>
      </ErrorBoundary>
    </QueryClientProvider>
  );
}
