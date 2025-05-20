export interface AnimalStatusRequest {
	name: string;
}

export const getAllAnimalStatus = async () => {
	const response = await fetch('http://localhost:5251/AnimalStatuses');

	return response.json();
};