import { useState, type ChangeEvent, type FormEvent } from 'react'
import type { AthleteForm } from '@/types/athlete';

type AddAthleteFormProps = {
	addAthlete: (athlete: AthleteForm) => Promise<boolean>;
};

const DEFAULT_FORM_DATA: AthleteForm = { name: '', position: '' };

export const AddAthleteForm = ({ addAthlete }: AddAthleteFormProps) => {
	const [formData, setFormData] = useState<AthleteForm>(DEFAULT_FORM_DATA);

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		const nextAthlete = { ...formData, [name]: value } as AthleteForm;

		setFormData(nextAthlete);
	}

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!formData.name || !formData.position) return;

		const wasAdded = await addAthlete(formData);
		if (wasAdded) {
			setFormData(DEFAULT_FORM_DATA);
		}
	};

	const hideSubmit = formData.position.trim().toLowerCase() === 'center';

	return (
		<form onSubmit={handleSubmit}>
			<label htmlFor="add-athlete-name">Name</label>
			<input id="add-athlete-name" type="text" name="name" value={formData.name} onChange={handleInputChange} />
			<label htmlFor="add-athlete-position">Position</label>
			<input id="add-athlete-position" type="text" name="position" value={formData.position} onChange={handleInputChange} />
			{hideSubmit ? null : <button type="submit">Add new athlete</button>}
		</form>
	)
}
