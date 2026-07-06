import { notFound } from "next/navigation";
import { getJourneyDays, type PlanType } from "@/data/journey";
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
  const planType = (plan as PlanType) ?? "safe_goose";
  const dayId = parseInt(id, 10);

  const days = getJourneyDays(planType);
  const day = days.find((d) => d.id === dayId);

  if (!day) {
    notFound();
  }

  return (
    <DayContent
      day={day}
      plan={planType}
      amount={amount ?? "1,000 元"}
      egg={egg ?? "0.10 元"}
    />
  );
}
