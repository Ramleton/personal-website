import Image from 'next/image';

import ProjectCard from './components/ProjectCard';
import Skill from './components/Skill';
import { projects } from './projects';
import { skills } from './skills';

const HomePage = () => {
	return (
		<div className='flex flex-col'>
			<div className='
				flex flex-row py-[14px] px-4 gap-x-8 flex-basis
				h-[500px]
			'>
				<div className='relative h-full w-auto basis-1/4'>
					<Image
						className='
							border-double border-8 border-green-400
						'
						src={process.env.PFP_IMG_URL || ''}
						alt='Profile Image'
						// width={400}
						// height={400}
						fill={true}
					/>
				</div>
				<div className='
					flex flex-col basis-3/4 px-2 py-2
					gap-y-2 justify-center
				'>
					<h1 className='text-3xl'><b>Hello!</b></h1>
					<p>
						My name is Ishaan Saini. I&#39;m an undergraduate
						student at the University of Toronto majoring in
						Computer Science and Mathematical Sciences. I&#39;ve
						recently begun working on developing my portfolio.
					</p>
					<p>
						I&#39;m passionate about algorithms analysis and design,
						databases, and recently frontend development.
					</p>
					<HorizontalDividerLine />
					<h1 className='text-3xl'><b>Projects</b></h1>
					<div className='
						flex flex-row w-full h-full items-center
						dark:bg-nav-bg-dark py-2 px-4 gap-x-2
					'>
						{
							projects.map((project, i) => <ProjectCard
								key={i}
								size={200}
								projectSrc={project.projectSrc}
								projectImgSrc={project.projectImgSrc}
								projectName={project.projectName}
								projectDesc={project.projectDesc}
							/>)
						}
					</div>
				</div>
			</div>
			{/** Skills Section */}
			<div className='grid grid-flow-row grid-cols-1 mx-4 gap-y-2'>
				<h1 className='text-3xl'><b>Skills</b></h1>
				<div className='
					flex flex-row items-center py-2 gap-x-2 px-2 justify-center
					dark:bg-nav-bg-dark w-full h-[120px]
				'>
					{skills.map((skill, i) => <Skill
						key={i}
						size={100}
						skill_src={skill.skill_src}
						skill_img_src={skill.skill_img_src}
						skill_img_alt={skill.skill_img_alt}
					/>)}
				</div>
			</div>
		</div>
	);
};

const HorizontalDividerLine = () => {
	return <div className='border-b-2 mx-2 pt-2 dark:border-slate-700'/>;
};

const VerticalDividerLine = () => {
	return <div className='border-l-2 mx-2 my-2 dark:border-slate-700'/>;
};

export default HomePage;