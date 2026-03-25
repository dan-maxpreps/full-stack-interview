import { useState, useEffect, type ChangeEvent, type FormEvent, type Dispatch, type SetStateAction } from 'react'
import type { Athlete } from '@/types/athlete';

type EditAthleteFormProps = {
  currentAthlete: Athlete;
  setAthletes: Dispatch<SetStateAction<Athlete[]>>
}

export const EditAthleteForm = ({ currentAthlete, setAthletes }: EditAthleteFormProps) => {
  const [formData, setFormData] = useState<Athlete>(currentAthlete)

  useEffect(() => {
    setFormData(currentAthlete)
  }, [currentAthlete]) // can also be solved with a key prop

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setFormData(prevAthlete => ({ ...prevAthlete, [name]: value }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setAthletes(prevList =>
      prevList.map(athlete =>
        athlete.id === formData.id ? formData : athlete
      )
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Name</label>
      <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
      <label>Position</label>
      <input type="text" name="position" value={formData.position} onChange={handleInputChange} />
      <button type="submit">Submit</button>
    </form>
  )
}
