import type { Athlete } from "@/types/athlete";
import type { Dispatch, SetStateAction } from 'react'

type AthleteTableProps = {
  athletes: Athlete[];
  currentAthlete: Athlete | undefined;
  setCurrentAthlete: Dispatch<SetStateAction<Athlete | undefined>>;
  setAthletes: Dispatch<SetStateAction<Athlete[]>>;
  deleteAthlete: (athlete: Athlete) => void;
};

export const AthleteTable = ({ athletes, currentAthlete, setCurrentAthlete, deleteAthlete }: AthleteTableProps) => (
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Position</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {athletes.length > 0 ? (
        athletes.map(athlete => (
          <tr key={athlete.id}>
            <td>{athlete.name}</td>
            <td>{athlete.position}</td>
            <td>
              {currentAthlete && currentAthlete.id === athlete.id ?
                <button onClick={() => setCurrentAthlete(undefined)} className="button muted-button">
                  Cancel
                </button>
                :
                <button
                  onClick={() => setCurrentAthlete(athlete)}
                  className="button muted-button"
                >
                  Edit
                </button>
              }
              <button
                onClick={() => deleteAthlete(athlete)}
                className="button muted-button"
              >
                Delete
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={3}>No athletes</td>
        </tr>
      )}
    </tbody>
  </table>
)
