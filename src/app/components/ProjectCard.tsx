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
				flex flex-col flex-basis
				border-solid border-2 rounded-lg
				hover:cursor-pointer dark:bg-app-bg-dark
				w-[${size}px] h-[${size}px] relative
				`}>
				<div className={`
					basis-2/3 relative`
				}>
					<Image className='rounded-t-lg'
						src={projectImgSrc}
						alt={`${projectName} image`}
						fill={true}
					/>
				</div>
				<div className='
					flex flex-col justify-center items-center
					basis-1/3 text-center
				'>
					<p className='text-xl'>{projectName}</p>
					<p>{projectDesc}</p>
				</div>
			</div>
		</a>
	);
};

export default ProjectCard;