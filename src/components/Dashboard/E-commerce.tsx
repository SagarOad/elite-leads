"use client";
import dynamic from "next/dynamic";
import React from "react";
import TableThree from "@/components/Tables/TableThree";



const ECommerce: React.FC = () => {
  return (
    <>
      <div className="">
        <h2 className=" text-black text-[26px] mb-4 font-bold">Leads</h2>
        <TableThree />
      </div>
    </>
  );
};

export default ECommerce;
