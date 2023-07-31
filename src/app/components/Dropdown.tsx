'use client';

import {
	MutableRefObject,
	ReactElement,
	useEffect,
	useRef,
	useState
} from 'react';
import { MdExpandLess, MdExpandMore } from 'react-icons/md';

import { TextIconButton, TextIconButtonProps } from './Button';

export interface DropdownProps {
	name: string;
	icon?: ReactElement;
	childButtons: TextIconButtonProps[];
	color: string;
}

export const Dropdown = ({
	name, icon, childButtons, color }: DropdownProps
) => {

	const [open, setOpen] = useState(false);
	
	const dropdownMenu: MutableRefObject<HTMLDivElement | null> = useRef(null);

	useEffect(() => {
		
		const closeDropdown = (e: any) => {
			if (!dropdownMenu.current?.contains(e.target)) {
				setOpen(false);
			}
		};

		document.body.addEventListener('click', closeDropdown);
		document.body.addEventListener('touchend', closeDropdown);
		return () => {
			document.body.removeEventListener('click', closeDropdown);
			document.body.removeEventListener('touchend', closeDropdown);
		};

	});

	const mapChildren = (
		children: TextIconButtonProps[]
	) => children.map((child, i) => {
		return (
			<li key={child.text} className= {
				i == children.length - 1 ?
					'block rounded-b-lg pt-2' :
					'block pt-2'
			}
			>
				<TextIconButton {...child} />
			</li>
		);
	});

	return (
		<div
			ref={dropdownMenu}
			className='
			group w-fill h-fill py-2
			rounded-t-lg dark:bg-nav-button-bg-dark
		'>
			<span 
				onTouchEnd={() => setOpen(open => !open)}
				className='
				flex flex-row items-center justify-center
				gap-[6px] h-full w-full px-2
				text-black
			'>
				{icon}
				{name}
				{open
					? <MdExpandLess color={color} />
					: <MdExpandMore color={color} />
				}
			</span>
			<div className='
				absolute right-0 top-[100%] z-50
				dark:bg-nav-button-bg-dark rounded-lg
			'>
				{open ? mapChildren(childButtons) : undefined}
			</div>
		</div>
	);
};