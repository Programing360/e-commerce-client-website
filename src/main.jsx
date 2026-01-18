import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import router from "./router/router.jsx";
import AuthProvider from "./Context/AuthProvider.jsx";
import { ToastContainer } from "react-toastify";
import "aos/dist/aos.css";
import Aos from "aos";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";

const queryClient = new QueryClient();

Aos.init();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="urbanest-text">
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <RouterProvider
              router={router}
              fallbackElement={
                <span className="loading loading-bars loading-xl"></span>
              }
            />
          </AuthProvider>
        </QueryClientProvider>
      </HelmetProvider>

      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  </StrictMode>
);
