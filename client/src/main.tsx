import React from "react";

import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./App";

import "./index.css";

import { AuthProvider } from "@/contexts/AuthContext";

import { Toaster } from "sonner";

import { AuthInitializer } from "@/components/auth/AuthInitializer";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <AuthInitializer>
            <App />

            <Toaster position="top-right" richColors closeButton />
          </AuthInitializer>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
);
