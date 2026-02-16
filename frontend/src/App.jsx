import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const Properties = lazy(() => import('./pages/Properties'));
const PropertyDetail = lazy(() => import('./pages/PropertyDetail'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));

// Admin Dashboard Pages
const AdminLayout = lazy(() => import('./components/layout/AdminLayout'));
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const ManageProperties = lazy(() => import('./pages/admin/ManageProperties'));
const ManageAgents = lazy(() => import('./pages/admin/ManageAgents'));
const AppointmentsList = lazy(() => import('./pages/admin/AppointmentsList'));
const AdminCalendar = lazy(() => import('./pages/admin/AdminCalendar'));
const PublicLayout = lazy(() => import('./components/layout/PublicLayout'));

// Loading Fallback
const LoadingFallback = () => (
    <div className="loading-screen">
        <div className="loader"></div>
        <p>Chargement de Dubai Luxury Properties...</p>
    </div>
);

function App() {
    return (
        <Router>
            <div className="app">
                <Suspense fallback={<LoadingFallback />}>
                    <Routes>
                        {/* Public Routes */}
                        <Route element={<PublicLayout />}>
                            <Route path="/" element={<Home />} />
                            <Route path="/properties" element={<Properties />} />
                            <Route path="/properties/:id" element={<PropertyDetail />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                        </Route>

                        {/* Admin Dashboard Routes */}
                        <Route path="/admin/login" element={<AdminLogin />} />
                        <Route path="/admin" element={<AdminLayout />}>
                            <Route index element={<Navigate to="/admin/dashboard" replace />} />
                            <Route path="dashboard" element={<AdminDashboard />} />
                            <Route path="properties" element={<ManageProperties />} />
                            <Route path="agents" element={<ManageAgents />} />
                            <Route path="appointments" element={<AppointmentsList />} />
                            <Route path="calendar" element={<AdminCalendar />} />
                        </Route>
                    </Routes>
                </Suspense>
            </div>
        </Router>
    );
}

export default App;

