import { useState, useEffect, type ChangeEvent, type FormEvent, type Dispatch, type SetStateAction } from 'react'
import type { Athlete, AthleteForm } from '@/types/athlete';

type EditAthleteFormProps = {
  currentAthlete: Athlete;
  setCurrentAthlete: Dispatch<SetStateAction<Athlete | undefined>>;
  updateAthlete: (id: number, athlete: AthleteForm) => Promise<boolean>;
}

export const EditAthleteForm = ({ currentAthlete, setCurrentAthlete, updateAthlete }: EditAthleteFormProps) => {
  const [formData, setFormData] = useState<AthleteForm>({
    name: currentAthlete.name,
    position: currentAthlete.position
  });

  useEffect(() => {
    setFormData({
      name: currentAthlete.name,
      position: currentAthlete.position
    });
  }, [currentAthlete])

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setFormData(prevAthlete => ({ ...prevAthlete, [name]: value } as AthleteForm))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!formData.name || !formData.position) return;

    const didUpdate = await updateAthlete(currentAthlete.id, formData);
    if (didUpdate) {
      setCurrentAthlete(undefined);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="edit-athlete-name">Name</label>
      <input id="edit-athlete-name" type="text" name="name" value={formData.name} onChange={handleInputChange} />
      <label htmlFor="edit-athlete-position">Position</label>
      <input id="edit-athlete-position" type="text" name="position" value={formData.position} onChange={handleInputChange} />
      <div className="actions">
        <button type="submit">Save athlete</button>
        <button
          type="button"
          onClick={() => setCurrentAthlete(undefined)}
          className="button muted-button"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
