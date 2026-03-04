import { NextResponse } from "next/server";
import { removeAthlete, updateAthlete, validateAthleteForm } from "../store";

function parseAthleteId(rawId: string): number | undefined {
  const id = Number.parseInt(rawId, 10);
  if (Number.isNaN(id) || id <= 0) return undefined;
  return id;
}

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(request: Request, { params }: RouteContext) {
  const { id: rawId } = await params;
  const id = parseAthleteId(rawId);
  if (!id) {
    return NextResponse.json({ error: "Athlete not found" }, { status: 404 });
  }

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

  const athlete = updateAthlete(id, data);
  if (!athlete) {
    return NextResponse.json({ error: "Athlete not found" }, { status: 404 });
  }

  return NextResponse.json(athlete, { status: 200 });
}

export async function DELETE(_: Request, { params }: RouteContext) {
  const { id: rawId } = await params;
  const id = parseAthleteId(rawId);
  if (!id) {
    return NextResponse.json({ error: "Athlete not found" }, { status: 404 });
  }

  const athlete = removeAthlete(id);
  if (!athlete) {
    return NextResponse.json({ error: "Athlete not found" }, { status: 404 });
  }

  return NextResponse.json(athlete, { status: 200 });
}
