import { useState } from 'react';
import { themes } from 'src/themes';

const themePalettes = Object.keys(themes);

interface Props {
	theme: string;
	setTheme: (theme: string) => void;
}

export const ThemePalette = (props: Props) => {
	const [isOpen, setIsOpen] = useState(false);

	const handleSelect = (item: string) => () => {
		props.setTheme(item);
		setIsOpen(false);
	};

	return (
		<div tabIndex={0} className="relative" onBlur={() => setIsOpen(false)}>
			<label
				onClick={() => setIsOpen(!isOpen)}
				className="border border-accent text-accent rounded-md px-[10px] py-[6px] m-2 transition duration-500 ease select-none focus:outline-none focus:shadow-outline cursor-pointer text-xs uppercase"
			>
				Palette
			</label>
			<div
				className={`p-2 shadow rounded w-28 flex flex-col gap-1 absolute top-2 -z-50 transition ease transform duration-300 opacity-0 bg-accent ${
					isOpen ? 'z-20 translate-y-8 opacity-100' : ''
				}`}
			>
				{themePalettes.map((item) => {
					return (
						<div
							key={item}
							className={`text-xs px-2 flex align-center py-[2px] rounded hover:bg-secondary-background cursor-pointer text capitalize ${
								props.theme == item ? 'bg-secondary-background' : ''
							}`}
							onClick={handleSelect(item)}
						>
							<a className="">{item}</a>
						</div>
					);
				})}
			</div>
		</div>
	);
};
