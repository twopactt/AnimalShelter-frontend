'use client';

import Button from 'antd/es/button/button';
import { Animals } from '../components/Animals';
import { useEffect, useState } from 'react';
import {
	AnimalRequest,
	createAnimal,
	deleteAnimal,
	getAllAnimals,
	updateAnimal,
} from '../services/animals';
import Title from 'antd/es/skeleton/Title';
import { CreateUpdateAnimal, Mode } from '../components/CreateUpdateAnimal';
import { Animal } from '../Models/Animal';

export default function AnimalsPage() {
	const defaultValues = {
		name: '',
		description: '',
		age: 1,
	} as Animal;

	const [values, setValues] = useState<Animal>(defaultValues);

	const [animals, setAnimals] = useState<Animal[]>([]);
	const [loading, setLoading] = useState(true);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [mode, setMode] = useState(Mode.Create);

	useEffect(() => {
		const getAnimals = async () => {
			const animals = await getAllAnimals();
			setLoading(false);
			setAnimals(animals);
		};

		getAnimals();
	}, []);

	const handleCreateAnimal = async (request: AnimalRequest) => {
		await createAnimal(request);
		closeModal();

		const animals = await getAllAnimals();
		setAnimals(animals);
	};

	const handleUpdateAnimal = async (id: string, request: AnimalRequest) => {
		await updateAnimal(id, request);
		closeModal();

		const animals = await getAllAnimals();
		setAnimals(animals);
	};

	const handleDeleteAnimal = async (id: string) => {
		await deleteAnimal(id);
		closeModal();

		const animals = await getAllAnimals();
		setAnimals(animals);
	};

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setValues(defaultValues);
		setIsModalOpen(false);
	};

	const openEditModal = (animal: Animal) => {
		setMode(Mode.Edit);
		setValues(animal);
		setIsModalOpen(true);
	};

	return (
		<div>
			<Button
				type='primary'
				style={{ marginTop: '30px' }}
				size='large'
				onClick={openModal}
			>
				Добавить животного
			</Button>

			<CreateUpdateAnimal
				mode={mode}
				values={values}
				isModalOpen={isModalOpen}
				handleCreate={handleCreateAnimal}
				handleUpdate={handleUpdateAnimal}
				handleCancel={closeModal}
			/>

			{loading ? (
				<Title>Загрузка...</Title>
			) : (
				<Animals
					animals={animals}
					handleOpen={openEditModal}
					handleDelete={handleDeleteAnimal}
				/>
			)}
		</div>
	);
}