'use client'

import { AddAthleteForm } from "@/components/AddAthleteForm";
import { AthleteTable } from "@/components/AthleteTable";
import { EditAthleteForm } from "@/components/EditAthleteForm";
import { useState } from "react";
import type { Athlete, AthleteForm } from "@/types/athlete";

const DATA: Athlete[] = [
  { id: 1, name: "Dan", position: "Quarterback" },
  { id: 2, name: "Ken", position: "Running Back" },
  { id: 3, name: "Ryan", position: "Tight End" },
  { id: 4, name: "Nick", position: "Running Back" },
  { id: 5, name: "Sam", position: "Safety" }
];

export default function HomePage() {
  const [athletes, setAthletes] = useState<Athlete[]>(DATA);
  const [currentAthlete, setCurrentAthlete] = useState<Athlete | undefined>();

  const addAthlete = (athlete: AthleteForm) => {
    const newAthlete = {
      ...athlete,
      id: athletes.length + 1
    };

    setAthletes([...athletes, newAthlete]);
  }

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
        <div className='roster'>
          <div>
            {currentAthlete ? (
              <>
                <h2>Edit Athlete</h2>
                <EditAthleteForm
                  currentAthlete={currentAthlete}
                  setAthletes={setAthletes}
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
            <AthleteTable
              athletes={athletes}
              setAthletes={setAthletes}
              currentAthlete={currentAthlete}
              setCurrentAthlete={setCurrentAthlete} />
          </div>
        </div>
        <span>Total Athletes: {athletes.length}</span>
      </section>
    </main>
  );
}
