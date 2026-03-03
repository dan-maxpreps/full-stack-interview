'use client'

import { AddAthleteForm } from "@/components/AddAthleteForm";
import { AthleteTable } from "@/components/AthleteTable";
import { EditAthleteForm } from "@/components/EditAthleteForm";
import { useState } from "react";

export const DEFAULT_FORM_DATA = { id: null, name: '', position: '' };

const DATA = [
  { id: 1, name: 'Dan', position: 'Quarterback' },
  { id: 2, name: 'Ken', position: 'Running Back' },
  { id: 3, name: 'Ryan', position: 'Tight End' },
  { id: 4, name: 'Nick', position: 'Running Back' },
  { id: 5, name: 'Sam', position: 'Safety' }
];

export default function HomePage() {
  const [athletes, setAthletes] = useState(DATA);
  const [currentAthlete, setCurrentAthlete] = useState(DEFAULT_FORM_DATA);
  const [isEditing, setIsEditing] = useState(false);

  const addAthlete = athlete => {
    athlete.id = athletes.length + 1;
    setAthletes([...athletes, athlete]);
  }

  const updateAthlete = (id, updatedAthlete) => {
    setIsEditing(false);
    setAthletes(athletes.map(athlete => (athlete.id === id ? updatedAthlete : athlete)));
  }

  const editRow = athlete => {
    setIsEditing(true);
    setCurrentAthlete({ id: athlete.id, name: athlete.name, position: athlete.position });
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
            {isEditing ? (
              <>
                <h2>Edit Athlete</h2>
                <EditAthleteForm
                  isEditing={isEditing}
                  currentAthlete={currentAthlete}
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
            <AthleteTable athletes={athletes} editRow={editRow} isEditing={isEditing} setEditing={setIsEditing} currentAthlete={currentAthlete} />
          </div>
        </div>
        <span>Total Athletes: {athletes.length}</span>
      </section>
    </main>
  );
}
