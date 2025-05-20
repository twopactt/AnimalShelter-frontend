import Modal from 'antd/es/modal/Modal';
import { AnimalRequest } from '../services/animals';
import Input from 'antd/es/input/Input';
import { useEffect, useState, ChangeEvent } from 'react';
import TextArea from 'antd/es/input/TextArea';
import { Animal } from '../Models/Animal';
import { Button, message, Upload, UploadProps } from 'antd';
import { DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import Image from 'next/image';
import axios from 'axios';

interface Props {
	mode: Mode;
	values: Animal;
	isModalOpen: boolean;
	handleCancel: () => void;
	handleCreate: (request: AnimalRequest) => void;
	handleUpdate: (id: string, request: AnimalRequest) => void;
}

export enum Mode {
	Create,
	Edit,
}

export const CreateUpdateAnimal = ({
	mode,
	values,
	isModalOpen,
	handleCancel,
	handleCreate,
	handleUpdate,
}: Props) => {
	const [name, setName] = useState<string>('');
	const [gender, setGender] = useState<string>('');
	const [age, setAge] = useState<number>(1);
	const [description, setDescription] = useState<string>('');
	const [photoPath, setPhotoPath] = useState<string>('');
	const [typeAnimalId, setTypeAnimalId] = useState<string>('');
	const [animalStatusId, setAnimalStatusId] = useState<string>('');
	const [uploading, setUploading] = useState<boolean>(false);

	useEffect(() => {
		setName(values.name);
		setGender(values.gender);
		setAge(values.age);
		setDescription(values.description);
		setPhotoPath(values.photo || '');
		setTypeAnimalId(values.typeAnimalId);
		setAnimalStatusId(values.animalStatusId);
	}, [values]);

	const handleRemovePhoto = () => {
		setPhotoPath('');
	};

	const uploadProps: UploadProps = {
		beforeUpload: async file => {
			setUploading(true);
			try {
				const formData = new FormData();
				formData.append('file', file);

				const response = await axios.post<{ filePath: string }>(
					'http://localhost:5251/api/upload/upload-photo',
					formData,
					{
						headers: {
							'Content-Type': 'multipart/form-data',
						},
					}
				);

				setPhotoPath(response.data.filePath);
				message.success('Фото успешно загружено');
			} catch (error) {
				console.error('Upload error:', error);
				message.error('Ошибка загрузки фото');
			} finally {
				setUploading(false);
			}
			return false;
		},
		showUploadList: false,
		accept: 'image/*',
		multiple: false,
		capture: 'environment' as const,
	};

	const handleOnOk = async () => {
		if (!photoPath) {
			message.warning('Пожалуйста, загрузите фото животного');
			return;
		}

		const animalRequest = {
			name,
			gender,
			age,
			description,
			photo: photoPath,
			typeAnimalId,
			animalStatusId,
		};

		if (mode === Mode.Create) {
			handleCreate(animalRequest);
		} else {
			handleUpdate(values.id, animalRequest);
		}
	};

	return (
		<Modal
			title={
				mode === Mode.Create ? 'Добавить животного' : 'Редактировать животного'
			}
			open={isModalOpen}
			onOk={handleOnOk}
			onCancel={handleCancel}
			cancelText={'Отмена'}
		>
			<div className='animal__modal'>
				<Input
					value={name}
					onChange={(e: ChangeEvent<HTMLInputElement>) =>
						setName(e.target.value)
					}
					placeholder='Имя'
				/>
				<Input
					value={gender}
					onChange={(e: ChangeEvent<HTMLInputElement>) =>
						setGender(e.target.value)
					}
					placeholder='Пол'
				/>
				<Input
					value={age}
					onChange={(e: ChangeEvent<HTMLInputElement>) =>
						setAge(Number(e.target.value))
					}
					placeholder='Возраст'
				/>
				<TextArea
					value={description}
					onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
						setDescription(e.target.value)
					}
					autoSize={{ minRows: 3, maxRows: 3 }}
					placeholder='Описание'
				/>
				<div style={{ margin: '16px 0' }}>
					{photoPath ? (
						<div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
							<div style={{ position: 'relative', width: '100%', height: 200 }}>
								<Image
									src={
										photoPath.startsWith('http')
											? photoPath
											: `http://localhost:5251${photoPath}`
									}
									alt='Preview'
									fill
									style={{ objectFit: 'cover', borderRadius: 8 }}
								/>
							</div>
							<div style={{ display: 'flex', gap: 8 }}>
								<Upload {...uploadProps}>
									<Button icon={<UploadOutlined />}>Заменить фото</Button>
								</Upload>
								<Button
									danger
									onClick={handleRemovePhoto}
									icon={<DeleteOutlined />}
								>
									Удалить фото
								</Button>
							</div>
						</div>
					) : (
						<Upload {...uploadProps}>
							<Button icon={<UploadOutlined />} loading={uploading}>
								Загрузить фото
							</Button>
						</Upload>
					)}
				</div>
				<Input
					value={typeAnimalId}
					onChange={(e: ChangeEvent<HTMLInputElement>) =>
						setTypeAnimalId(e.target.value)
					}
					placeholder='Тип животного'
				/>
				<Input
					value={animalStatusId}
					onChange={(e: ChangeEvent<HTMLInputElement>) =>
						setAnimalStatusId(e.target.value)
					}
					placeholder='Статус животного'
				/>
			</div>
		</Modal>
	);
};