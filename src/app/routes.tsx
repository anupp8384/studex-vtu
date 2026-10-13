import { createBrowserRouter } from "react-router";
import { HomePage } from "./pages/home-page";
import { BrowsePage } from "./pages/browse-page";
import { UploadPage } from "./pages/upload-page";
import { SearchPage } from "./pages/search-page";
import { NotFoundPage } from "./pages/not-found-page";
import { AuthDemoPage } from "./pages/auth-demo-page";
import { LoginPage } from "./pages/login-page";
import { RegisterPage } from "./pages/register-page";
import { PendingPage } from "./pages/pending-page";
import { RejectedPage } from "./pages/rejected-page";
import { Layout } from "./components/layout";

export const router = createBrowserRouter([
  // Auth screens — rendered without the main Layout (no navbar/footer)
  { path: "/auth",     Component: AuthDemoPage },
  { path: "/login",    Component: LoginPage    },
  { path: "/register", Component: RegisterPage },
  { path: "/pending",  Component: PendingPage  },
  { path: "/rejected", Component: RejectedPage },

  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: "browse", Component: BrowsePage },
      { path: "upload", Component: UploadPage },
      { path: "search", Component: SearchPage },
      { path: "*", Component: NotFoundPage },
    ],
  },
]);