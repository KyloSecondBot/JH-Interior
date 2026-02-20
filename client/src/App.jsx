import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import AuroraBackground from "./components/reactbits/AuroraBackground.jsx";
import BlobCursor from "./components/reactbits/BlobCursor.jsx";
import NavBar from "./components/NavBar.jsx";
import Footer from "./components/Footer.jsx";
import Hero from "./components/sections/Hero.jsx";
import Stats from "./components/sections/Stats.jsx";
import About from "./components/sections/About.jsx";
import Portfolio from "./components/sections/Portfolio.jsx";
import WorkStack from "./components/sections/WorkStack.jsx";
import Services from "./components/sections/Services.jsx";
import Process from "./components/sections/Process.jsx";
import Testimonials from "./components/sections/Testimonials.jsx";
import Contact from "./components/sections/Contact.jsx";
import LoginPage from "./components/auth/LoginPage.jsx";
import WorkPage from "./pages/WorkPage.jsx";
import ProtectedRoute from "./components/auth/ProtectedRoute.jsx";
import DashboardLayout from "./components/dashboard/DashboardLayout.jsx";
import DashboardHome from "./components/dashboard/DashboardHome.jsx";
import PortfolioPage from "./pages/dashboard/PortfolioPage.jsx";
import WorkStackPage from "./pages/dashboard/WorkStackPage.jsx";
import ServicesPage from "./pages/dashboard/ServicesPage.jsx";
import ProcessPage from "./pages/dashboard/ProcessPage.jsx";
import TestimonialsPage from "./pages/dashboard/TestimonialsPage.jsx";
import StatsPage from "./pages/dashboard/StatsPage.jsx";
import ContactPage from "./pages/dashboard/ContactPage.jsx";
import { useAuth } from "./context/AuthContext.jsx";

// Redirects already-authenticated users away from public-only pages (e.g. /login).
function PublicRoute({ children }) {
  const { user, role, loading } = useAuth();
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#080808]">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-amber-400 border-t-transparent" />
      </div>
    );
  }
  if (user) return <Navigate to={role === 'admin' ? '/dashboard' : '/'} replace />;
  return children;
}

function Landing() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      <AuroraBackground />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(251,191,36,0.08),transparent_35%)]" />
      <div className="absolute inset-x-0 top-[120px] h-px bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-50" />
      <div className="relative z-10">
        <NavBar />
        <main className="space-y-20 pb-12 pt-4 sm:space-y-24">
          <Hero />
          <Stats />
          <About />
          <Portfolio />
          <WorkStack />
          <Services />
          <Process />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
      </div>
      <BlobCursor />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/work/:id" element={<WorkPage />} />
      <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />

      {/* ── Admin dashboard ── */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute roles={['admin']}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardHome />} />
        <Route path="portfolio"    element={<PortfolioPage />} />
        <Route path="workstack"    element={<WorkStackPage />} />
        <Route path="services"     element={<ServicesPage />} />
        <Route path="process"      element={<ProcessPage />} />
        <Route path="testimonials" element={<TestimonialsPage />} />
        <Route path="stats"        element={<StatsPage />} />
        <Route path="contact"      element={<ContactPage />} />
      </Route>
    </Routes>
  );
}
