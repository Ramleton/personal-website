import { headers } from 'next/headers';
import { MdDensityMedium } from 'react-icons/md';
import { SiLinkedin } from 'react-icons/si';
import { VscGithub } from 'react-icons/vsc';

import {
	TextIconButton,
	TextIconButtonProps
} from './Button';
import { Dropdown } from './Dropdown';

const Navbar = () => {

	const userAgent = headers().get('user-agent');

	const isMobile = userAgent!.match(
		// eslint-disable-next-line max-len
		/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
	);

	const contactButton: TextIconButtonProps = {
		text: 'Contact me',
		icon: undefined,
		href: `mailto:${
			process.env.CONTACT_EMAIL
			?? 'ishaansaini@outlook.com'
		}`
	};

	const resumeButton: TextIconButtonProps = {
		text: 'Resume/CV',
		icon: undefined,
		href: process.env.RESUME_URL || ''
	};

	const githubButton: TextIconButtonProps = {
		text: 'Github',
		icon: <VscGithub size={40} />,
		href: process.env.GITHUB_URL
			?? 'https://github.com/Ramleton'
	};

	const linkedInButton: TextIconButtonProps = {
		text: 'LinkedIn',
		icon: <SiLinkedin size={40} />,
		href: process.env.LINKEDIN_URL ?? ''
	};

	return !isMobile
		? 
		<div className='dark:bg-nav-bg-dark'>
			<div className='
				flex flex-row flex-basis h-24
				border-b-2 mx-16 dark:border-slate-700
			'>
				<div className='
					flex flex-row items-center
					gap-x-4 basis-1/3 pr-4
				'>
					<TextIconButton {...contactButton}/>
					<TextIconButton {...resumeButton}/>
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
					<TextIconButton {...githubButton}/>
					<TextIconButton {...linkedInButton}/>
				</div>
			</div>
		</div>
		:
		<div className='dark:bg-nav-bg-dark'>
			<div
				className='
				flex flex-row w-auto mx-4
				 dark:border-slate-700 border-b-2 flex-basis
			'>
				<div className='
						flex flex-row items-center
						justify-start basis-2/3 my-4 mx-2
					'>
					<span className='
						text-2xl select-none
					'>
						{process.env.DOMAIN}
					</span>
				</div>
				<div className='
					flex flex-row items-center basis-1/3
					justify-end my-2 mx-2 relative
				'>
					<Dropdown
						name=''
						icon={<MdDensityMedium
							size={35}
							color='white'
						/>}
						childButtons={[
							contactButton,
							resumeButton,
							githubButton,
							linkedInButton
						]}
						color='white'
					/>
				</div>
			</div>
		</div>;
};


export default Navbar;