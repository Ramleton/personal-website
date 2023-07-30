import Image from 'next/image';

export interface SkillProps {
	skill_src: string
	skill_img_src: string
	skill_img_alt: string
}

const Skill = ({
	skill_src,
	skill_img_src,
	skill_img_alt
}: SkillProps) => {
	return (
		<a className='w-[90px] h-[90px] mx-auto'
			href={skill_src}
			target='_blank'
			rel='noreferrer'
		>
			<div className='
				w-[90px] h-[90px]
				hover:cursor-pointer relative
			'>
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