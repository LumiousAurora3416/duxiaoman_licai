import { notFound } from "next/navigation";
import journeyDays from "@/data/journey";
import DayContent from "./day-content";

export default async function DayPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { id } = await params;
  const { plan, amount, egg } = await searchParams;
  const dayId = parseInt(id, 10);
  const day = journeyDays.find((d) => d.id === dayId);

  if (!day) {
    notFound();
  }

  return (
    <DayContent
      day={day}
      plan={plan ?? "safe_goose"}
      amount={amount ?? "1,000 元"}
      egg={egg ?? "0.10 元"}
    />
  );
}
