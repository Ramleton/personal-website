import Image from 'next/image';

export type SkillType = {
	skill_src: string
	skill_img_src: string
	skill_img_alt: string
}

interface SkillProps extends SkillType {
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
			href={skill_src}
			target='_blank'
			rel='noreferrer'
		>
			<div className={`
				w-${size} h-${size}
				hover:cursor-pointer relative
			`}>
				<Image className='rounded-lg'
					src={skill_img_src}
					alt={skill_img_alt}
					width={size}
					height={size}
				/>
			</div>
		</a>
	);
};

export default Skill;