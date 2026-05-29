import React from "react";

export function GridOverlay() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 flex justify-center w-full h-full">
      {/* 
        This max-w-[1440px] exactly matches the width of the main content wrapper.
        We draw 5 lines to create 4 equal columns.
      */}
      <div className="w-full max-w-[1440px] h-full flex justify-between px-6 md:px-12 lg:px-16">
        <div className="w-px h-full bg-border-harsh/10" />
        <div className="w-px h-full bg-border-harsh/10 hidden lg:block" />
        <div className="w-px h-full bg-border-harsh/10" />
        <div className="w-px h-full bg-border-harsh/10 hidden lg:block" />
        <div className="w-px h-full bg-border-harsh/10" />
      </div>
    </div>
  );
}
