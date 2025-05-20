export interface AnimalRequest {
	name: string;
	gender: string;
	age: number;
	description: string;
	photo: string;
	typeAnimalId: string;
	animalStatusId: string;
}

export const getAllAnimals = async () => {
	const response = await fetch('http://localhost:5251/Animals');

	return response.json();
};

export const createAnimal = async (animalRequest: AnimalRequest) => {
	await fetch('http://localhost:5251/Animals', {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
		},
		body: JSON.stringify(animalRequest),
	});
};

export const updateAnimal = async (id: string, animalRequest: AnimalRequest) => {
	await fetch(`http://localhost:5251/Animals/${id}`, {
		method: 'PUT',
		headers: {
			'content-type': 'application/json',
		},
		body: JSON.stringify(animalRequest),
	});
};

export const deleteAnimal = async (id: string) => {
	await fetch(`http://localhost:5251/Animals/${id}`, {
		method: 'DELETE',
	});
};