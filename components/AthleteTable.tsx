import type { Athlete } from "@/types/athlete";
import type { Dispatch, SetStateAction } from 'react'

type AthleteTableProps = {
  athletes: Athlete[];
  emptyMessage?: string;
  currentAthlete: Athlete | undefined;
  setCurrentAthlete: Dispatch<SetStateAction<Athlete | undefined>>
  deleteAthlete: (id: number) => Promise<void>;
};

export const AthleteTable = ({
  athletes,
  emptyMessage = "No athletes",
  currentAthlete,
  setCurrentAthlete,
  deleteAthlete
}: AthleteTableProps) => (
  <div className="table-wrap">
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
                  className="button muted-button"
                  onClick={() => void deleteAthlete(athlete.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={3}>{emptyMessage}</td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
)
