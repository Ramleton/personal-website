import './globals.css';

import { Analytics } from '@vercel/analytics/react';

import Navbar from './components/Navbar';

interface AppLayoutProps {
	children: React.ReactNode
}

const AppLayout = ({ children }: AppLayoutProps) => {
	return (
		<html lang='en'>
			<head>
				<title>{process.env.DOMAIN}</title>
			</head>
			<body>
				<div className={`
					grid-cols-1 auto-rows-max h-fit w-screen
					bg-white dark:bg-app-bg-dark gap-y-2
				`}>
					<header>
						<Navbar />
					</header>
					{children}
					<Analytics />
					<footer />
				</div>
			</body>
		</html>
	);
};

export default AppLayout;