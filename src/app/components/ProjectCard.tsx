import Image from 'next/image';

export type Project = {
	projectSrc: string
	projectImgSrc: string
	projectName: string
	projectDesc: string
}

interface ProjectCardProps extends Project {
	size: number
}

const ProjectCard = async ({
	size,
	projectSrc,
	projectImgSrc,
	projectName,
	projectDesc
}: ProjectCardProps) => {

	return (
		<a href={projectSrc} target='_blank'>	
			<div className={`
				border-solid border-2 rounded-lg
				border-green-400 w-[200px] h-[200px]
				flex flex-col flex-basis
			`}>
				<div className='relative basis-2/3'>
					<Image className='rounded-t-lg'
						src={projectImgSrc}
						alt={projectName}
						fill={true}
					/>
				</div>
				<div className='
					flex flex-col text-center h-1/3
					basis-1/3 overflow-auto
				'>
					<h1 className='text-2xl'>{projectName}</h1>
					<p>{projectDesc}</p>
				</div>
			</div>
		</a>
	);
};

/* <div className={`
	grid grid-flow-row grid-cols-1
	w-[${size}px] h-[${size}px] relative
	border-solid border-2 rounded-lg
	hover:cursor-pointer dark:bg-app-bg-dark
	`}>
	<div className={`
		relative w-full
	`}>
		<Image className='rounded-t-lg'
			src={projectImgSrc}
			alt={`${projectName} image`}
			fill={true}
		/>
	</div>
	<div className='
		grid grid-cols-1 grid-flow-row justify-center items-center
		text-center
	'>
		<p className='text-xl'>{projectName}</p>
		<p>{projectDesc}</p>
	</div>
</div> */

export default ProjectCard;