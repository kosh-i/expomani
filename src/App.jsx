import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import PackageDetailPage from './pages/PackageDetailPage';
import DestinationExplorerPage from './pages/DestinationExplorerPage';
import CultureHubPage from './pages/CultureHubPage';
import AIPlannerPage from './pages/AIPlannerPage';
import PlanYourVisitPage from './pages/PlanYourVisitPage';
import AgencyDashboardPage from './pages/AgencyDashboardPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CustomerProfilePage from './pages/CustomerProfilePage';
import HotelsPage from './pages/HotelsPage';
import CustomerSupportChat from './components/common/CustomerSupportChat';
import { useAppStore } from './store/useAppStore';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, activeRole } = useAppStore();
  
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(activeRole)) return <Navigate to="/" replace />;
  
  return children;
};

export default function App() {
  const { token } = useAppStore();

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['x-auth-token'] = token;
    }
  }, [token]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-white">
      <Navbar />

      <main className="flex-1 bg-white text-slate-900">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/packages" element={<SearchPage />} />
          <Route path="/packages/:id" element={<PackageDetailPage />} />
          <Route path="/destinations" element={<DestinationExplorerPage />} />
          <Route path="/culture" element={<CultureHubPage />} />
          <Route path="/ai-planner" element={<AIPlannerPage />} />
          <Route path="/plan-visit" element={<PlanYourVisitPage />} />
          
          <Route path="/hotels" element={<HotelsPage />} />
          
          <Route path="/profile" element={
            <ProtectedRoute>
              <CustomerProfilePage />
            </ProtectedRoute>
          } />
          
          <Route path="/agency" element={
            <ProtectedRoute allowedRoles={['agency', 'admin']}>
              <AgencyDashboardPage />
            </ProtectedRoute>
          } />
          
          <Route path="/admin" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboardPage />
            </ProtectedRoute>
          } />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <CustomerSupportChat />
      <Footer />
    </div>
  );
}
