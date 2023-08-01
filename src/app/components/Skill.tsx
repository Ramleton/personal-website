import Image from 'next/image';

export type SkillType = {
	skill_src: string
	skill_img_src: string
	skill_img_alt: string
}

export interface SkillProps extends SkillType {
	size: number
}

const Skill = ({
	size,
	skill_src,
	skill_img_src,
	skill_img_alt
}: SkillProps) => {
	return (
		<a
			className='
				mx-auto select-none
			'
			href={skill_src}
			target='_blank'
			rel='noreferrer'
		>
			<div
				className='hover:cursor-pointer relative'
				style={{
					width: `${size}rem`,
					height: `${size}rem`
				}}
			>
				<Image className='rounded-lg'
					src={skill_img_src}
					alt={skill_img_alt}
					fill={true}
				/>
			</div>
		</a>
	);
};

export default Skill;