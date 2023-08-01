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
			<div
				className={`
					border-solid border-2 rounded-lg border-green-400
					flex flex-col flex-basis select-none
				`}
				style={{
					width: `${size}rem`,
					height: `${size}rem`
				}}
			>
				<div className='basis-2/3 relative'>
					<Image
						className='rounded-t-lg'
						src={projectImgSrc}
						alt={projectName}
						fill={true}
					/>
				</div>
				<div className='
					flex flex-col text-center
					basis-1/3 overflow-scroll px-2 pt-1
				'>
					<h1 className='text-2xl'>{projectName}</h1>
					<p>{projectDesc}</p>
				</div>
			</div>
		</a>
	);
};

export default ProjectCard;