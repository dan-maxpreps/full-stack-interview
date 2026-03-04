# MaxPreps React Interview

This React app has a number of bugs and does not meet all of the requirements below. This interview will assess your ability to debug code and create features, both with and without AI assistance.

## Section 1: No AI-Assistance

Clone this repository and launch the app. Ensure it meets all of these requirements.

- The app builds and starts.
- No errors in the console.
- The form should reset after adding an athlete.
- Clicking the Delete button should remove the athlete from the list.
- Clicking on the Edit button should update the form data, even if another athlete is already loaded in the edit form.
- You should be able to edit the name and position of an athlete.
- When adding an athlete, if the position is `center`, the add button should be hidden.
- There should be 2 columns, one with the Add/Edit Athlete form and the other with View Athletes table. The columns should stack on smaller devices.

When **section 1** is complete, the app should look like this:

| Mobile | Desktop |
|--------|---------|
| <img width="250" alt="mobile" src="https://user-images.githubusercontent.com/49081448/69361282-0258c100-0c41-11ea-8d94-7568ec736431.png" style="width: 100%; max-width: 250px"> | <img width="400" alt="desktop" src="https://user-images.githubusercontent.com/49081448/69361281-01279400-0c41-11ea-8e98-35d37ec3380e.png" style="width: 100%; max-width: 400px;"> |

## Section 2: AI-Assistance Allowed

In this section, you may use whatever AI tools you want with no token limit. External libraries are not allowed.

- Instead of using hard-coded data, fetch the data from this endpoint
    - `http://localhost:3000/api/test/athletes/`
