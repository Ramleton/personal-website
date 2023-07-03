import './globals.css';

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
					grid-cols-1 auto-rows-max h-screen w-screen
					bg-white dark:bg-app-bg-dark gap-y-2
				`}>
					<Navbar />
					{children}
				</div>
			</body>
		</html>
	);
};

export default AppLayout;