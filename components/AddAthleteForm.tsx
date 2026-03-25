import { useState, type ChangeEvent, type FormEvent } from 'react'
import type { Athlete, AthleteForm } from '@/types/athlete';

type AddAthleteFormProps = {
	addAthlete: (athlete: AthleteForm) => void;
};

const DEFAULT_FORM_DATA: AthleteForm = { name: '', position: '' };

export const AddAthleteForm = ({ addAthlete }: AddAthleteFormProps) => {
	const [formData, setFormData] = useState<AthleteForm>(DEFAULT_FORM_DATA);

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		const nextAthlete = { ...formData, [name]: value } as Athlete;

		setFormData(nextAthlete);
	}

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!formData.name || !formData.position) return;

		addAthlete(formData);
		setFormData(DEFAULT_FORM_DATA);
	};

	return (
		<form onSubmit={handleSubmit}>
			<label>Name</label>
			<input type="text" name="name" value={formData.name} onChange={handleInputChange} />
			<label>Position</label>
			<input type="text" name="position" value={formData.position} onChange={handleInputChange} />
			<button>Add new athlete</button>
		</form>
	)
}
