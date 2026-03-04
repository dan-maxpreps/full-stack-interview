import { NextResponse } from "next/server";
import { createAthlete, listAthletes, validateAthleteForm } from "./store";

export async function GET() {
  return NextResponse.json(listAthletes(), { status: 200 });
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { data, error } = validateAthleteForm(body);
  if (!data) {
    return NextResponse.json({ error }, { status: 400 });
  }

  const athlete = createAthlete(data);

  return NextResponse.json(athlete, { status: 201 });
}
