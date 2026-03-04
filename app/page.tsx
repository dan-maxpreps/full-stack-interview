'use client'

import { AddAthleteForm } from "@/components/AddAthleteForm";
import { AthleteTable } from "@/components/AthleteTable";
import { EditAthleteForm } from "@/components/EditAthleteForm";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { Athlete, AthleteForm } from "@/types/athlete";

type ApiErrorPayload = {
  error?: string;
};

async function getApiErrorMessage(response: Response): Promise<string> {
  try {
    const payload = (await response.json()) as ApiErrorPayload;
    if (payload.error) return payload.error;
  } catch {
    // Swallow JSON parsing errors and fall back to status-based message.
  }

  return `Request failed with status ${response.status}`;
}

export default function HomePage() {
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [currentAthlete, setCurrentAthlete] = useState<Athlete | undefined>();
  const [searchQuery, setSearchQuery] = useState("");
  const [positionFilter, setPositionFilter] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | undefined>();

  const fetchAthletes = useCallback(async () => {
    setIsLoading(true);
    setError(undefined);

    try {
      const response = await fetch("/api/test/athletes", { cache: "no-store" });
      if (!response.ok) {
        setError(await getApiErrorMessage(response));
        return;
      }

      const data = (await response.json()) as Athlete[];
      setAthletes(data);
    } catch {
      setError("Unable to load athletes");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchAthletes();
  }, [fetchAthletes]);

  const addAthlete = async (athlete: AthleteForm): Promise<boolean> => {
    setError(undefined);

    try {
      const response = await fetch("/api/test/athletes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(athlete)
      });

      if (!response.ok) {
        setError(await getApiErrorMessage(response));
        return false;
      }

      const createdAthlete = (await response.json()) as Athlete;
      setAthletes((prevList) => [...prevList, createdAthlete]);
      return true;
    } catch {
      setError("Unable to add athlete");
      return false;
    }
  };

  const updateAthlete = async (id: number, athlete: AthleteForm): Promise<boolean> => {
    setError(undefined);

    try {
      const response = await fetch(`/api/test/athletes/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(athlete)
      });

      if (!response.ok) {
        setError(await getApiErrorMessage(response));
        return false;
      }

      const updatedAthlete = (await response.json()) as Athlete;
      setAthletes((prevList) => prevList.map((entry) => (entry.id === id ? updatedAthlete : entry)));
      return true;
    } catch {
      setError("Unable to update athlete");
      return false;
    }
  };

  const deleteAthlete = async (id: number): Promise<void> => {
    setError(undefined);

    try {
      const response = await fetch(`/api/test/athletes/${id}`, {
        method: "DELETE"
      });

      if (!response.ok) {
        setError(await getApiErrorMessage(response));
        return;
      }

      setAthletes((prevList) => prevList.filter((entry) => entry.id !== id));
      setCurrentAthlete((prevAthlete) => (prevAthlete?.id === id ? undefined : prevAthlete));
    } catch {
      setError("Unable to delete athlete");
    }
  };

  const positions = useMemo(() => {
    const unique = Array.from(new Set(athletes.map((athlete) => athlete.position))).sort((a, b) =>
      a.localeCompare(b)
    );

    return ["All", ...unique];
  }, [athletes]);

  const normalizedSearch = searchQuery.trim().toLowerCase();

  const filteredAthletes = useMemo(() => {
    return athletes.filter((athlete) => {
      const matchesName = athlete.name.toLowerCase().includes(normalizedSearch);
      const matchesPosition = positionFilter === "All" || athlete.position === positionFilter;

      return matchesName && matchesPosition;
    });
  }, [athletes, normalizedSearch, positionFilter]);

  const hasActiveFilters = normalizedSearch.length > 0 || positionFilter !== "All";

  const clearFilters = () => {
    setSearchQuery("");
    setPositionFilter("All");
  };

  return (
    <main className="container">
      <img
        src="https://asset.maxpreps.io/includes/images/logos/maxpreps_1200x630.png"
        alt="MaxPreps Logo"
        className='logo'
        width={128}
      />
      <section className="card">
        <h1>Team Roster</h1>
        {error ? <p className="error-message">{error}</p> : null}
        <div className='roster'>
          <div>
            {currentAthlete ? (
              <>
                <h2>Edit Athlete</h2>
                <EditAthleteForm
                  currentAthlete={currentAthlete}
                  setCurrentAthlete={setCurrentAthlete}
                  updateAthlete={updateAthlete}
                />
              </>
            ) : (
              <>
                <h2>Add Athlete</h2>
                <AddAthleteForm addAthlete={addAthlete} />
              </>
            )}
          </div>
          <div>
            <h2>View Athletes</h2>
            <div className="filters">
              <div>
                <label htmlFor="search-athletes">Search by name</label>
                <input
                  id="search-athletes"
                  type="text"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Type a name..."
                />
              </div>
              <div>
                <label htmlFor="position-filter">Position</label>
                <select
                  id="position-filter"
                  value={positionFilter}
                  onChange={(event) => setPositionFilter(event.target.value)}
                >
                  {positions.map((position) => (
                    <option key={position} value={position}>
                      {position}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="button"
                className="button muted-button"
                disabled={!hasActiveFilters}
                onClick={clearFilters}
              >
                Clear filters
              </button>
            </div>
            {isLoading ? (
              <p>Loading athletes...</p>
            ) : (
              <AthleteTable
                athletes={filteredAthletes}
                currentAthlete={currentAthlete}
                setCurrentAthlete={setCurrentAthlete}
                deleteAthlete={deleteAthlete}
                emptyMessage={hasActiveFilters ? "No athletes match your filters" : "No athletes"}
              />
            )}
          </div>
        </div>
        <span>Total Athletes: {filteredAthletes.length} / {athletes.length}</span>
      </section>
    </main>
  );
}
