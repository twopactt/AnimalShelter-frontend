export interface TypeAnimalRequest {
	name: string;
}

export const getAllTypeAnimals = async () => {
	const response = await fetch('http://localhost:5251/TypeAnimals');
	
	return response.json();
};