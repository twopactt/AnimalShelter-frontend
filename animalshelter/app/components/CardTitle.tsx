interface Props {
	name: string;
	age: number;
}

export const CardTitle = ({ name, age }: Props) => {
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'row',
				alignItems: 'center',
				justifyContent: 'space-between',
			}}
		>
			<p className='card__name'>{name}</p>
			<p className='card__age'>{age} лет</p>
		</div>
	);
};