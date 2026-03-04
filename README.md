# MaxPreps React Interview

This React app has a number of bugs and does not meet all of the requirements below. This interview will assess your ability to debug code and create features, both with and without AI assistance.

Total interview time: **30 minutes** for completing **both sections**.

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

While working through this section, be sure to communicate:
1. Your plan for breaking down requirements
2. The tools you choose to use and why
3. Your thought process for writing prompts
3. Any AI-generated suggestions you correct or reject
4. Your thought process to verify results

### Core requirements (scoped for remaining interview time)

1. Replace hard-coded client data with this native Next.js API:
   - `GET /api/test/athletes`
2. Create additional API routes for CRUD operations:
   - `POST /api/test/athletes` creates a new athlete
   - `PATCH /api/test/athletes/{id}` updates an athlete
   - `DELETE /api/test/athletes/{id}` deletes an athlete
3. Keep data in server memory (module-level array is fine). No database needed.
4. Add basic API validation:
   - `name` and `position` are required
   - return appropriate HTTP status codes (`200/201/400/404`)
5. Wire the frontend to these endpoints so that load, add, edit, and delete all go through the API.
6. Add a search input that filters athletes by name.
7. Show `No athletes match your filters` when filtered results are empty.
8. Add a `Clear filters` action that resets search/filter to defaults.

### Stretch goals (only if time remains)

- Add a `position` filter dropdown with `All` plus each unique position.
- Add sortable columns (ascending/descending) for name and position.
- Improve error UX (inline error messaging for failed API requests).
