// "use client";

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import ECommerce from "@/components/Dashboard/E-commerce";
// import DefaultLayout from "@/components/Layouts/DefaultLayout";
// import { cookies } from "next/headers";

// export default function Home() {
//   const router = useRouter();

//   useEffect(() => {
//     const token = cookies().get("token")?.value;
//     if (!token) {
//       router.push("/login");
//     }
//   }, [router]);

//   return (
//     <DefaultLayout>
//       <ECommerce />
//     </DefaultLayout>
//   );
// }

// app/dashboard/page.js
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardClient from "./DashboardClient";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export default function DashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsAuthenticated(true);
    } else {
      router.push("/login"); // Redirect to login if not authenticated
    }

    setLoading(false); // Stop loading spinner
  }, [router]);

  if (loading) {
    return <p>Loading...</p>; // Optional: Show a loader while checking auth
  }

  if (!isAuthenticated) {
    return null; // Avoid rendering content if redirecting
  }

  return (
    <DefaultLayout>
      <DashboardClient />
    </DefaultLayout>
  );
}
