import { useState, useEffect } from 'react'

export const EditAthleteForm = props => {
  const [ athlete, setAthlete ] = useState(props.currentAthlete)

  useEffect(
    () => {
      setAthlete(props.currentAthlete)
    },
    []
  )

  const handleInputChange = event => {
    const { name, value } = event.target

    athlete[name] = value;
  }

  return (
    <form
      onSubmit={event => {
        event.preventDefault()
        props.updateAthlete(athlete.id, athlete)
      }}
    >
      <label>Name</label>
      <input type="text" name="name" value={athlete.name} onChange={handleInputChange} />
      <label>Position</label>
      <input type="text" name="position" value={athlete.position} onChange={handleInputChange} />
      <button>Update athlete</button>
      <button onClick={() => props.setEditing(false)} className="button muted-button">
        Cancel
      </button>
    </form>
  )
}

