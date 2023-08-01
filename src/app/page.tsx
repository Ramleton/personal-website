import { headers } from 'next/headers';
import Image from 'next/image';

import ProjectCard from './components/ProjectCard';
import Skill from './components/Skill';
import { projects } from './projects';
import { skills } from './skills';

const HomePage = () => {

	const userAgent = headers().get('user-agent');

	const isMobile = userAgent!.match(
		// eslint-disable-next-line max-len
		/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
	);

	return !isMobile ? 
		<div className='flex flex-col w-fill h-fill'>
			<div className='
				grid grid-flow-col grid-rows-1 py-4 gap-x-8
				w-auto mx-4
			'>
				{/** Profile Image Section */}
				<div className='relative w-[25rem] h-[30rem]'>
					<Image
						className='
							border-double border-8 border-green-400
						'
						src={process.env.PFP_IMG_URL || ''}
						alt='Profile Image'
						fill={true}
					/>
				</div>
				<div className='
					flex flex-col basis-3/4 py-2
					flex-basis h-full justify-center
				'>
					{/** About Section */}
					<div className='basis-1/3 overflow-auto'>
						<h1 className='text-3xl'><b>Hello!</b></h1>
						<span>
							My name is Ishaan Saini. I&#39;m an undergraduate
							student at the University of Toronto majoring in
							Computer Science and Mathematical Sciences. I&#39;ve
							recently begun working on developing my portfolio.
							<br />
							I&#39;m passionate about algorithms analysis and
							design, databases, and recently frontend
							development.
						</span>
						<HorizontalDividerLine />
					</div>
					{/** Projects Section */}
					<div className='basis-2/3'>
						<h1 className='text-3xl pb-2'><b>Projects</b></h1>
						<div className='
							flex flex-row w-full min-h-fit items-center
							dark:bg-nav-bg-dark py-2 px-4 gap-x-2
							overflow-x-auto overflow-y-hidden
						'>
							{
								projects.map((project, i) => <ProjectCard
									key={i}
									size={14}
									{...project}
								/>)
							}
						</div>
					</div>
				</div>
			</div>
			{/** Skills Section */}
			<div className='grid grid-flow-row grid-cols-1 gap-y-2 mx-4'>
				<h1 className='text-3xl'><b>Skills</b></h1>
				<div className='
					flex flex-row gap-x-2
					items-center py-4 px-4
					dark:bg-nav-bg-dark w-auto h-fit
					overflow-x-auto overflow-y-hidden
				'>
					{skills.map((skill, i) => <Skill
						key={i}
						size={8}
						skill_src={skill.skill_src}
						skill_img_src={skill.skill_img_src}
						skill_img_alt={skill.skill_img_alt}
					/>)}
				</div>
			</div>
			<div className='
				w-full h-40 flex flex-row
				justify-center items-center
			'>
				<div className=' 
					flex flex-col whitespace-nowrap
					bg-green-400 rounded-xl w-fit px-2
					text-center h-1/2 justify-center
				'>
					<h1 className=' text-5xl'>
						<b>Thanks for Visiting!</b>
					</h1>
				</div>
			</div>
		</div>
		: <div
			className='
			grid grid-flow-row grid-cols-1 h-auto w-auto mx-4 my-2
		'>
			{/** About Section */}
			<div className='overflow-auto'>
				<h1 className='text-3xl'><b>Hello!</b></h1>
				<span>
					My name is Ishaan Saini. I&#39;m an<br />
					undergraduate student at the University
					of Toronto majoring in Computer Science and
					Mathematical Sciences. I&#39;ve recently begun
					working on developing my portfolio.
					<br />
					I&#39;m passionate about algorithms analysis and
					design, databases, and recently frontend
					development.
				</span>
			</div>
			<HorizontalDividerLine />
			{/** Profile Image Section */}
			<div className='flex flex-row justify-center items-center '>
				<div className='w-56 h-64 relative'>
					<Image
						className='
							border-double border-8 border-green-400 object-cover
						'
						src={process.env.PFP_IMG_URL || ''}
						alt='Profile Image'
						fill={true}
					/>
				</div>
			</div>
			<HorizontalDividerLine />
			{/** Projects Section */}
			<div>
				<h1 className='text-3xl pb-2'><b>Projects</b></h1>
				<div className='
					flex flex-row w-full min-h-fit items-center
					dark:bg-nav-bg-dark py-2 px-4 gap-x-2
					overflow-x-auto overflow-y-hidden
				'>
					{
						projects.map((project, i) => <ProjectCard
							key={i}
							size={10}
							{...project}
						/>)
					}
				</div>
			</div>
			<HorizontalDividerLine />
			{/** Skills Section */}
			<div className='grid grid-flow-row grid-cols-1 gap-y-2'>
				<h1 className='text-3xl'><b>Skills</b></h1>
				<div className='
					flex flex-row gap-x-2
					items-center py-2 px-2
					dark:bg-nav-bg-dark w-auto h-fit
					overflow-x-scroll overflow-y-hidden
				'>
					{skills.map((skill, i) => <Skill
						size={6}
						key={i}
						skill_src={skill.skill_src}
						skill_img_src={skill.skill_img_src}
						skill_img_alt={skill.skill_img_alt}
					/>)}
				</div>
			</div>
		</div>;
};

const HorizontalDividerLine = () => {
	return <div className='border-b-2 mx-2 my-2 dark:border-slate-700'/>;
};

const VerticalDividerLine = () => {
	return <div className='border-l-2 mx-2 my-2 dark:border-slate-700'/>;
};

export default HomePage;