"use client";

import { useState } from "react";
import PageLoader from "./PageLoader";

export default function LoadingWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoaderComplete = () => {
    // Wait a tiny bit for the loader to fully disappear, then show content
    setTimeout(() => {
      setIsLoading(false);
    }, 100);
  };

  return (
    <>
      {/* <PageLoader onComplete={handleLoaderComplete} /> */}
      {isLoading ? (
        <PageLoader onComplete={handleLoaderComplete} />
      ) : (
        <div
          className="page-content h-full"
          style={{
            opacity: isLoading ? 0 : 1,
            pointerEvents: isLoading ? "none" : "auto",
            transition: "opacity 0.6s ease-out",
          }}
        >
          {children}
        </div>
      )}
    </>
  );
}
