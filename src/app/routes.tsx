import { createBrowserRouter, Navigate } from "react-router";
import { HomePage } from "./pages/home-page";
import { BrowsePage } from "./pages/browse-page";
import { UploadPage } from "./pages/upload-page";
import { SearchPage } from "./pages/search-page";
import { NotFoundPage } from "./pages/not-found-page";
import { LoginPage } from "./pages/login-page";
import { RegisterPage } from "./pages/register-page";
import { PendingPage } from "./pages/pending-page";
import { RejectedPage } from "./pages/rejected-page";
import { AdminPage } from "./pages/admin-page";
import { DashboardPage } from "./pages/dashboard-page";
import { Layout } from "./components/layout";
import { AdminRouteGuard, ApprovedRouteGuard, SignedInRouteGuard } from "./components/auth-route-guards";

function ApprovedPage({ children }: { children: React.ReactNode }) {
  return (
    <ApprovedRouteGuard>
      {children}
    </ApprovedRouteGuard>
  );
}

function GuardedBrowsePage() {
  return (
    <ApprovedPage>
      <BrowsePage />
    </ApprovedPage>
  );
}

function GuardedUploadPage() {
  return (
    <ApprovedPage>
      <UploadPage />
    </ApprovedPage>
  );
}

function GuardedSearchPage() {
  return (
    <ApprovedPage>
      <SearchPage />
    </ApprovedPage>
  );
}

function GuardedAdminPage() {
  return (
    <AdminRouteGuard>
      <AdminPage />
    </AdminRouteGuard>
  );
}

function GuardedDashboardPage() {
  return (
    <SignedInRouteGuard>
      <DashboardPage />
    </SignedInRouteGuard>
  );
}

export const router = createBrowserRouter([
  // Auth screens — rendered without the main Layout (no navbar/footer)
  { path: "/admin",    Component: GuardedAdminPage },
  { path: "/auth",     element: <Navigate to="/login" replace /> },
  { path: "/login",    Component: LoginPage    },
  { path: "/register", Component: RegisterPage },
  { path: "/pending",  Component: PendingPage  },
  { path: "/rejected", Component: RejectedPage },

  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: "browse", Component: GuardedBrowsePage },
      { path: "upload", Component: GuardedUploadPage },
      { path: "search", Component: GuardedSearchPage },
      { path: "dashboard", Component: GuardedDashboardPage },
      { path: "*", Component: NotFoundPage },
    ],
  },
]);