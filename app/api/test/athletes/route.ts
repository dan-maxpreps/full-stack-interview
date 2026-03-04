import { NextResponse } from "next/server";
import type { Athlete } from "@/types/athlete";

const ATHLETES: Athlete[] = [
  { id: 1, name: "Dan", position: "Quarterback" },
  { id: 2, name: "Ken", position: "Running Back" },
  { id: 3, name: "Ryan", position: "Tight End" },
  { id: 4, name: "Nick", position: "Running Back" },
  { id: 5, name: "Sam", position: "Safety" },
];

export async function GET() {
  return NextResponse.json(ATHLETES);
}
