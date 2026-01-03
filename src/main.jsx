import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { RouterProvider } from "react-router";
import router from "./router/router.jsx";
import AuthProvider from "./Context/AuthProvider.jsx";
import { ToastContainer } from "react-toastify";
import 'aos/dist/aos.css';
import Aos from "aos";

Aos.init();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="urbanest-text">
      <AuthProvider>
        <RouterProvider router={router} 
        fallbackElement={<span className="loading loading-bars loading-xl"></span>}
        />
      </AuthProvider>
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  </StrictMode>
);
