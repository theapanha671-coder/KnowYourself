import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Protected from "./components/Protected.jsx";
import { useI18n } from "./i18n/I18nContext.jsx";
import Footer from "./components/Footer.jsx";
import AdminProtected from "./components/AdminProtected.jsx";
import HomePage from "./pages/HomePage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import TestPage from "./pages/TestPage.jsx";
import TestResultPage from "./pages/TestResultPage.jsx";
import MajorsPage from "./pages/MajorsPage.jsx";
import MajorDetailPage from "./pages/MajorDetailPage.jsx";
import RoadmapsPage from "./pages/RoadmapsPage.jsx";
import RoadmapDetailPage from "./pages/RoadmapDetailPage.jsx";
import ExperiencesPage from "./pages/ExperiencesPage.jsx";
import BlogPage from "./pages/BlogPage.jsx";
import BlogPostPage from "./pages/BlogPostPage.jsx";
import VideosPage from "./pages/VideosPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import AdminLayout from "./pages/admin/AdminLayout.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import AdminMajors from "./pages/admin/AdminMajors.jsx";
import AdminCareers from "./pages/admin/AdminCareers.jsx";
import AdminPosts from "./pages/admin/AdminPosts.jsx";
import AdminVideos from "./pages/admin/AdminVideos.jsx";
import AdminExperiences from "./pages/admin/AdminExperiences.jsx";
import AdminUsers from "./pages/admin/AdminUsers.jsx";

export default function App() {
  const i18n = useI18n();
  const location = useLocation();

  useEffect(() => {
    if (window.AOS) {
      window.AOS.init({
        duration: 800,
        once: true,
      });
    }
  }, []);

  useEffect(() => {
    if (window.AOS) {
      window.AOS.refresh();
    }
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 py-8">
        <div key={location.pathname} className="page-enter">
          <Routes location={location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/test" element={<TestPage />} />
            <Route
              path="/test/result"
              element={
                <Protected>
                  <TestResultPage />
                </Protected>
              }
            />
            <Route path="/majors" element={<MajorsPage />} />
            <Route path="/majors/:slug" element={<MajorDetailPage />} />
            <Route path="/roadmaps" element={<RoadmapsPage />} />
            <Route path="/roadmaps/:slug" element={<RoadmapDetailPage />} />
            <Route path="/experiences" element={<ExperiencesPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/videos" element={<VideosPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/dashboard"
              element={
                <Protected>
                  <DashboardPage />
                </Protected>
              }
            />
            <Route
              path="/admin"
              element={
                <AdminProtected>
                  <AdminLayout />
                </AdminProtected>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="majors" element={<AdminMajors />} />
              <Route path="careers" element={<AdminCareers />} />
              <Route path="posts" element={<AdminPosts />} />
              <Route path="videos" element={<AdminVideos />} />
              <Route path="experiences" element={<AdminExperiences />} />
              <Route path="users" element={<AdminUsers />} />
            </Route>
            <Route path="*" element={<div className="p-6">{i18n.t("notFound")}</div>} />
          </Routes>
        </div>
      </main>
      <Footer />
    </div>
  );
}
