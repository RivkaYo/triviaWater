import {
  Navigate,
  Outlet,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { provide } from "@hilma/tools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@hilma/auth-client";
import { AlertProvider } from "@hilma/forms";
import { isMobile } from "react-device-detect";

import { fetchAuthData, fetchToken } from "./api/auth.api";
import HomePage from "./pages/home-page/HomePage";
import { I18nProvider } from "./i18n/i18n-main";
import { Layout } from "./components/layout/Layout";
import LeaderBoard from "./pages/leader-board/LeaderBoard";
import SharedLayout from "./components/shared-layout/SharedLayout";
import LogIn from "./pages/log-in/LogIn";
import CreateQuizPage from "./pages/create-quiz-page/CreateQuizPage";
import Register from "./pages/register/Register";
import MyQuizzes from "./pages/my-quizzes/MyQuizzes";
import GameWithProvider from "./components/game-flow/GamePagesFlow";
import AboutPage from "./pages/about-page/AboutPage";
import ChangePassword from "./pages/change-password/ChangePassword";
import NotFoundPage from "./pages/not-found-page/NotFoundPage";

const queryClient = new QueryClient();
// eslint-disable-next-line react-refresh/only-export-components -- component name
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Navigate to="/login" replace />,
        },
        {
          path: "/",
          element: isMobile ? <Outlet /> : <SharedLayout />,
          children: [
            {
              path: "login",
              element: <LogIn />,
            },
            {
              path: "register",
              element: <Register />,
            },
            {
              path: "home",
              element: <HomePage />,
            },
            {
              path: "change-password",
              element: <ChangePassword />,
            },
          ],
        },
        { path: "about", element: <AboutPage /> },
        {
          path: "quizzes",
          children: [
            {
              index: true,
              element: <MyQuizzes />,
            },
            {
              path: ":quizId",
              children: [
                { index: true, element: <GameWithProvider /> },
                {
                  path: "scoreboard",
                  element: <LeaderBoard />,
                },
              ],
            },
          ],
        },
        {
          path: "edit-quiz",
          element: <CreateQuizPage />,
        },
        {
          path: "*",
          element: <NotFoundPage />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

// eslint-disable-next-line react-refresh/only-export-components -- without name
export default provide(
  [I18nProvider, { router: false }],
  [QueryClientProvider, { client: queryClient }],
  [
    AuthProvider,
    {
      fetchToken,
      fetchAuthData,
      redirectOnPrivate: () => "/login",
      redirectOnPublic: () => "/home",
    },
  ],
  [AlertProvider, {}],
)(App);
