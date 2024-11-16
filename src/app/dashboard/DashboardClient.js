"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import ECommerce component to avoid SSR issues
const ECommerce = dynamic(
  () => import("../../components/Dashboard/E-commerce"),
  { ssr: false },
);

export default function DashboardClient() {
  return (
    <div>
      <ECommerce />
    </div>
  );
}
