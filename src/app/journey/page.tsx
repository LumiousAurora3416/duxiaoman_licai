import { Suspense } from "react";
import JourneyContent from "./journey-content";

export default function JourneyPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-dvh items-center justify-center">
          <p className="text-stone-400">加载中...</p>
        </div>
      }
    >
      <JourneyContent />
    </Suspense>
  );
}
