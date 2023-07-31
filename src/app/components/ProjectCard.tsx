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

const ProjectCard = ({
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
				border-green-400 w-${size} h-${size}
				flex flex-col flex-basis select-none
				
			`}>
				<div className='basis-2/3 relative'>
					<Image className='rounded-t-lg object-cover'
						src={projectImgSrc}
						alt={projectName}
						fill={true}
					/>
				</div>
				<div className='
					flex flex-col text-center h-1/3
					basis-1/3 overflow-scroll px-2
				'>
					<h1 className='text-2xl'>{projectName}</h1>
					<p>{projectDesc}</p>
				</div>
			</div>
		</a>
	);
};

export default ProjectCard;