import { Suspense } from "react";
import MatchContent from "./match-content";

export default async function MatchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const params = await searchParams;

  return (
    <Suspense
      fallback={
        <div className="flex min-h-dvh items-center justify-center">
          <p className="text-stone-400">正在匹配你的专属计划...</p>
        </div>
      }
    >
      <MatchContent
        income={params.income ?? ""}
        savings={params.savings ?? ""}
        goal={params.goal ?? ""}
      />
    </Suspense>
  );
}
