import type { Athlete, AthleteForm } from "@/types/athlete";

const INITIAL_ATHLETES: Athlete[] = [
  { id: 1, name: "Dan", position: "Quarterback" },
  { id: 2, name: "Ken", position: "Running Back" },
  { id: 3, name: "Ryan", position: "Tight End" },
  { id: 4, name: "Nick", position: "Running Back" },
  { id: 5, name: "Sam", position: "Safety" }
];

let athletes: Athlete[] = [...INITIAL_ATHLETES];
let nextAthleteId = INITIAL_ATHLETES.length + 1;

export function listAthletes(): Athlete[] {
  return athletes;
}

export function createAthlete(form: AthleteForm): Athlete {
  const athlete: Athlete = {
    id: nextAthleteId++,
    name: form.name,
    position: form.position
  };

  athletes = [...athletes, athlete];

  return athlete;
}

export function updateAthlete(id: number, form: AthleteForm): Athlete | undefined {
  const index = athletes.findIndex((athlete) => athlete.id === id);
  if (index < 0) return undefined;

  const updatedAthlete: Athlete = { id, ...form };

  athletes = athletes.map((athlete) => (athlete.id === id ? updatedAthlete : athlete));

  return updatedAthlete;
}

export function removeAthlete(id: number): Athlete | undefined {
  const athlete = athletes.find((entry) => entry.id === id);
  if (!athlete) return undefined;

  athletes = athletes.filter((entry) => entry.id !== id);

  return athlete;
}

export function validateAthleteForm(payload: unknown): { data?: AthleteForm; error?: string } {
  if (!payload || typeof payload !== "object") {
    return { error: "Invalid request body" };
  }

  const record = payload as Record<string, unknown>;
  const name = typeof record.name === "string" ? record.name.trim() : "";
  const position = typeof record.position === "string" ? record.position.trim() : "";

  if (!name || !position) {
    return { error: "name and position are required" };
  }

  return {
    data: { name, position }
  };
}
