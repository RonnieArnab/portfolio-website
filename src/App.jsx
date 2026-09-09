import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import ProfileApp from "./profile/ProfileApp.jsx";

// The RPG is the easter egg — keep it out of the main bundle.
const RpgApp = lazy(() => import("./rpg/RpgApp.jsx"));

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProfileApp />} />
          <Route
            path="/rpg"
            element={
              <Suspense
                fallback={
                  <div className="grid min-h-screen place-items-center bg-ink font-pixel text-[10px] uppercase text-parchment">
                    loading the region…
                  </div>
                }
              >
                <RpgApp />
              </Suspense>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </MotionConfig>
  );
}
