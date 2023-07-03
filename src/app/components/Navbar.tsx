import { SiLinkedin } from 'react-icons/si';
import { VscGithub } from 'react-icons/vsc';

const Navbar = () => {
	return (
		<div className='dark:bg-nav-bg-dark'>
			<div className='
				grid grid-cols-3 grid-rows-1
				h-[90px] border-b-2 mx-16 dark:border-slate-700
			'>
				<div className='
					flex flex-row justify-start items-center
				'>
					<TextButton
						text='Contact me'
						href={`mailto:${
							process.env.CONTACT_EMAIL
							?? 'ishaansaini@outlook.com'
						}`}
					/>
				</div>
				<div className='
					flex flex-row justify-evenly items-center
				'>
					<span className='text-4xl'>{process.env.DOMAIN}</span>
				</div>
				<div className='
					flex flex-row justify-end items-center
					gap-x-4
				'>
					<IconButton
						icon={<VscGithub size={40} />}
						href={
							process.env.GITHUB_URL
							?? 'github.com/Ramleton'
						}
					/>
					<IconButton
						icon={<SiLinkedin size={40} />}
						href={
							process.env.LINKEDIN_URL
							?? ''
						}
					/>
				</div>
			</div>
		</div>
	);
};

interface ButtonProps {
	href: string;
	target?: '_blank' | '_self' | '_parent' | '_top';
}

interface TextButtonProps extends ButtonProps {
	text: string;
}

const TextButton = ({ text, href, target = '_blank' }: TextButtonProps) => {
	return (
		<a href={href} target={target}>
			<div className='
				flex flex-row justify-center items-center
				drop-shadow-md hover:drop-shadow-lg
				bg-slate-200 hover:bg-slate-300
				dark:bg-nav-button-bg-dark
				dark:hover:bg-nav-button-bg-hover-dark
				rounded-lg px-3 py-3 w-fit h-fit
				hover:cursor-pointer
			'>
				<span className='text-2xl dark:text-slate-200'>{text}</span>
			</div>
		</a>
	);
};

interface IconButtonProps extends ButtonProps {
	icon: React.ReactNode;
}

const IconButton = ({ icon, href, target = '_blank' }: IconButtonProps) => {
	return (
		<a href={href} target={target}>
			<div className='
				flex flex-row justify-center items-center
				drop-shadow-md hover:drop-shadow-lg
				bg-slate-200 hover:bg-slate-300
				dark:bg-nav-button-bg-dark
				dark:hover:bg-nav-button-bg-hover-dark
				rounded-lg px-3 py-3 w-fit h-fit
				hover:cursor-pointer
			'>
				{icon}
			</div>
		</a>
	);
};

export default Navbar;