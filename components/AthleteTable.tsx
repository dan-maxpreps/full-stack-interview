export const AthleteTable = props => (
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Position</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {props.athletes.length > 0 ? (
        props.athletes.map(athlete => (
          <tr key={athlete.position}>
            <td>{athlete.name}</td>
            <td>{athlete.position}</td>
            <td>
              <button
                onClick={() => {
                  props.editRow(athlete)
                }}
                className="button muted-button"
              >
                Edit
              </button>
              <button
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
