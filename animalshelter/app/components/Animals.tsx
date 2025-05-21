import Card from 'antd/es/card/Card';
import Button from 'antd/es/button/button';
import { Animal } from '../Models/Animal';
import Image from 'next/image';
import { TypeAnimal } from '../Models/TypeAnimal';
import { AnimalStatus } from '../Models/AnimalStatus';
import { getAgeString } from '../utils/ageHelper';

interface Props {
	animals: Animal[];
	typeAnimals: TypeAnimal[];
	animalStatuses: AnimalStatus[];
	handleDelete: (id: string) => void;
	handleOpen: (animal: Animal) => void;
}

export const Animals = ({
	animals,
	typeAnimals,
	animalStatuses,
	handleDelete,
	handleOpen,
}: Props) => {
	const getTypeName = (id: string) => {
		const type = typeAnimals.find(t => t.id === id);
		return type ? type.name : id;
	};

	const getStatusName = (id: string) => {
		const status = animalStatuses.find(s => s.id === id);
		return status ? status.name : id;
	};

	return (
		<div className='cards'>
			{animals.map((animal: Animal) => (
				<Card
					key={animal.id}
					cover={
						<>
							{animal.photo && (
								<div style={{ position: 'relative', height: '200px' }}>
									<Image
										src={`http://localhost:5251${animal.photo}`}
										alt={animal.name}
										fill
										style={{ objectFit: 'cover', borderRadius: '6px' }}
									/>
								</div>
							)}
							<div
								style={{
									display: 'flex',
									justifyContent: 'space-between',
									padding: '16px',
									background: '#fafafa',
									borderBottom: '1px solid #f0f0f0',
								}}
							>
								<span style={{ fontWeight: 'bold' }}>{animal.name}</span>
								<span>{getAgeString(animal.age)}</span>
							</div>
						</>
					}
					variant='inner'
				>
					<p>
						<strong>Пол: </strong>
						{animal.gender === 'Мальчик' ? 'Мальчик' : 'Девочка'}
					</p>
					<p>
						<strong>Описание: </strong>
						{animal.description}
					</p>
					<p>
						<strong>Тип: </strong>
						{getTypeName(animal.typeAnimalId)}
					</p>
					<p>
						<strong>Статус: </strong>
						{getStatusName(animal.animalStatusId)}
					</p>
					<div className='card__buttons'>
						<Button onClick={() => handleOpen(animal)} style={{ flex: 1 }}>
							Редактировать
						</Button>
						<Button
							onClick={() => handleDelete(animal.id)}
							danger
							style={{ flex: 1 }}
						>
							Удалить
						</Button>
					</div>
				</Card>
			))}
		</div>
	);
};