export interface TypeAnimal {
	id: string;
	name: string;
}

export const getAllTypeAnimals = async (): Promise<TypeAnimal[]> => {
	const response = await fetch('http://localhost:5251/TypeAnimals');
	return response.json();
};