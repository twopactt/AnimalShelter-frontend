import './globals.css';
import { Layout, Menu } from 'antd';
import { Header, Footer, Content } from 'antd/es/layout/layout';
import Link from 'next/link';

const items = [
	{ key: 'home', label: <Link href={'/'}>Главная</Link> },
	{ key: 'animals', label: <Link href={'/animals'}>Животные</Link> },
];

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body>
				<Layout style={{ minHeight: '100vh' }}>
					<Header>
						<Menu
							theme='dark'
							mode='horizontal'
							items={items}
							style={{ flex: 1, minWidth: 0 }}
						/>
					</Header>
					<Content style={{ padding: '0 48px' }}>{children}</Content>
					<Footer style={{ textAlign: 'center' }}>
						Animal Shelter 2025 Created by Artem
					</Footer>
				</Layout>
			</body>
		</html>
	);
}