import config from '../../config';

export interface TypeAnimalRequest {
	name: string;
}

export const getAllTypeAnimals = async () => {
	const response = await fetch(
		`${config.api.baseUrl}${config.api.endpoints.typeAnimals}`
	);

	return response.json();
};