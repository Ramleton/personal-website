import { SiLinkedin } from 'react-icons/si';
import { VscGithub } from 'react-icons/vsc';

const Navbar = () => {
	return (
		<div className='dark:bg-nav-bg-dark'>
			<div className='
				flex flex-row flex-basis
				h-[90px] border-b-2 mx-16 dark:border-slate-700
			'>
				<div className='
					flex flex-row items-center
					gap-x-4 basis-1/3 pr-4
				'>
					<TextButton
						text='Contact me'
						href={`mailto:${
							process.env.CONTACT_EMAIL
									?? 'ishaansaini@outlook.com'
						}`}
					/>
					<TextButton
						text='Resume/CV'
						href={process.env.RESUME_URL || ''}
					/>
				</div>
				<div className='
						flex flex-row items-center justify-center basis-1/3
					'>
					<span className='
						text-4xl select-none
					'>
						{process.env.DOMAIN}
					</span>
				</div>
				<div className='
						flex flex-row items-center pl-4
						gap-x-4 justify-end basis-1/3
					'>
					<IconButton
						icon={<VscGithub size={40} />}
						href={
							process.env.GITHUB_URL
									?? 'https://github.com/Ramleton'
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
				hover:cursor-pointer select-none
			'>
				<span className='
					text-2xl dark:text-slate-200
					whitespace-nowrap
				'>
					{text}
				</span>
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