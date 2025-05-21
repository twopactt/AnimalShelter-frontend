export interface AnimalStatus {
	id: string;
	name: string;
}

export const getAllAnimalStatuses = async (): Promise<AnimalStatus[]> => {
	const response = await fetch('http://localhost:5251/AnimalStatuses');
	return response.json();
};