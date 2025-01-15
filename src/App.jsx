import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css'
import { Button } from './components/ui/button';
import AppLayout from './layout/app-layout';
import Home from './pages/home';
import OnBoarding from './pages/on-boarding';
import JobListing from './pages/job-listing';
import JobPage from './pages/job';
import PostJobs from './pages/post-jobs';
import SavedJobs from './pages/saved-jobs';
import MyJobs from './pages/my-jobs';
import { ThemeProvider } from './components/theme-provider';
import ProtectedRoute from './components/protected-route';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children : [
    {
      path:'/',
      element:<Home />
    },
    {
      path:'/onboarding',
      element:(
        <ProtectedRoute>
          <OnBoarding />
        </ProtectedRoute>
      )
    },
    {
      path:'/jobs',
      element: (
        <ProtectedRoute>
          <JobListing />
        </ProtectedRoute>
      )
    },
    {
      path:'/job/:id',
      element:(
      <ProtectedRoute>
        <JobPage />
      </ProtectedRoute>
    )
    },
    {
      path:'/post-jobs',
      element:(
        <ProtectedRoute>
          <PostJobs />
        </ProtectedRoute>
      )
    },
    {
      path:'/saved-jobs',
      element:(
        <ProtectedRoute>
          <SavedJobs />
        </ProtectedRoute>
      )
    },
    {
      path:'/my-jobs',
      element:(
        <ProtectedRoute>
          <MyJobs />
        </ProtectedRoute>
      )
    },
  ]}
])

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router = {router} />
    </ThemeProvider>
  )
}

export default App;
