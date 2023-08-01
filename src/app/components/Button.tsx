
interface ButtonProps {
	href: string;
	target?: '_blank' | '_self' | '_parent' | '_top';
}

export interface TextButtonProps extends ButtonProps {
	text: string;
}

export const TextButton = (
	{ text, href, target = '_blank' }: TextButtonProps
) => {
	return (
		<a href={href} target={target}>
			<div className='
				flex flex-row justify-center items-center
				drop-shadow-md hover:drop-shadow-lg
				bg-slate-200 hover:bg-slate-300
				dark:bg-nav-button-bg-dark
				dark:hover:bg-nav-button-bg-hover-dark
				rounded-lg px-3 py-3 w-fit h-fit
				hover:cursor-pointer select-none
			'>
				<span className='
					text-2xl dark:text-slate-200
					whitespace-nowrap
				'>
					{text}
				</span>
			</div>
		</a>
	);
};

export interface IconButtonProps extends ButtonProps {
	icon: React.ReactNode;
}

export const IconButton = (
	{ icon, href, target = '_blank' }: IconButtonProps
) => {
	return (
		<a href={href} target={target}>
			<div className='
				flex flex-row justify-center items-center
				drop-shadow-md hover:drop-shadow-lg
				bg-slate-200 hover:bg-slate-300
				dark:bg-nav-button-bg-dark
				dark:hover:bg-nav-button-bg-hover-dark
				rounded-lg px-3 py-3 w-fit h-fit
				hover:cursor-pointer
			'>
				{icon}
			</div>
		</a>
	);
};

export type TextIconButtonProps = IconButtonProps & TextButtonProps;

export const TextIconButton = (
	{ text, icon, href, target = '_blank' }: TextIconButtonProps
) => {
	return (
		<a href={href} target={target}>
			<div className='
				flex flex-row justify-center items-center
				drop-shadow-md hover:drop-shadow-lg
				bg-slate-200 hover:bg-slate-300
				dark:bg-nav-button-bg-dark
				dark:hover:bg-nav-button-bg-hover-dark
				rounded-lg px-3 py-3
				hover:cursor-pointer gap-x-2 select-none
			'>
				<span className='
					text-2xl dark:text-slate-200
					whitespace-nowrap
				'>
					{text}
				</span>
				{icon}
			</div>
		</a>
	);
};