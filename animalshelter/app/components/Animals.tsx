import Card from 'antd/es/card/Card';
import Button from 'antd/es/button/button';
import { Animal } from '../Models/Animal';
import Image from 'next/image';

interface Props {
	animals: Animal[];
	handleDelete: (id: string) => void;
	handleOpen: (animal: Animal) => void;
}

export const Animals = ({ animals, handleDelete, handleOpen }: Props) => {
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
								<span>{animal.age} лет</span>
							</div>
						</>
					}
					variant='inner'
				>
					<p>
						<strong>Пол: </strong>
						{animal.gender}
					</p>
					<p>
						<strong>Описание: </strong>
						{animal.description}
					</p>
					<p>
						<strong>Тип: </strong>
						{animal.typeAnimalId}
					</p>
					<p>
						<strong>Статус: </strong>
						{animal.animalStatusId}
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