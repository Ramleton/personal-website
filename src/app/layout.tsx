import './globals.css';

import Navbar from './components/Navbar';

interface AppLayoutProps {
	children: React.ReactNode
}

const AppLayout = ({ children }: AppLayoutProps) => {
	return (
		<html lang='en'>
			<body>
				<div className=''>
					<Navbar />
					{children}
				</div>
			</body>
		</html>
	);
};

export default AppLayout;