import { Suspense } from "react";
import PrologueContent from "./prologue-content";

export default async function ProloguePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const params = await searchParams;

  return (
    <Suspense fallback={<div className="flex min-h-dvh items-center justify-center"><p className="text-[#a8a29e]">加载中...</p></div>}>
      <PrologueContent
        plan={params.plan ?? "safe_goose"}
        amount={params.amount ?? "1,000 元"}
        egg={params.egg ?? "0.10 元"}
        goal={params.goal ?? ""}
      />
    </Suspense>
  );
}
