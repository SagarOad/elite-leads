// app/layout.js
"use client";
import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import React, { useEffect, useState } from "react";
import Loader from "@/components/common/Loader";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { useRouter } from "next/navigation";

export default function RootLayout({
  children,
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <AuthProvider>
      <html lang="en">
        <body suppressHydrationWarning={true}>
          <div className="dark:bg-boxdark-2 dark:text-bodydark">
            {loading ? <Loader /> : children}
          </div>
        </body>
      </html>
    </AuthProvider>
  );
}
