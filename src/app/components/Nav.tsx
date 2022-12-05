/* eslint-disable @typescript-eslint/no-explicit-any */
import { Logo } from '@app/components/Logo';
import { ThemePalette } from '@app/components/ThemePalette';
import { UseAppContext } from '@app/context';
import { Link } from '@tanstack/react-router';
import { useState } from 'react';

const genericHamburgerLine = `text-accent h-[2.5px] w-5 bg-black bg-current transition ease transform duration-300 text-xs`;

type NavItem = {
	to: string;
	label: string;
};

const links: NavItem[] = [
	{ to: '/works', label: 'Works' },
	{ to: '/contact', label: 'Contact' }
];

export const Navbar = () => {
	const { theme, setTheme } = UseAppContext();
	const [isOpen, setIsOpen] = useState(false);

	return (
		<header className="flex items-center justify-between py-3 px-5">
			<Logo />
			<div className="flex items-center gap-5">
				<ThemePalette theme={theme} setTheme={setTheme} />
				<div className="hidden md:flex md:gap-3">
					{links.map(({ label, to }) => (
						<div key={label} className="flex items-center text-sm">
							<Link
								to={to as any}
								tabIndex={0}
								className="text-accent transition border-2 border-transparent"
								activeProps={{ className: 'text-info border-b-accent' }}
								activeOptions={{ exact: true }}
							>
								{label}
							</Link>
						</div>
					))}
				</div>

				<div className="relative md:hidden" onBlur={() => setIsOpen(false)}>
					<button
						className="flex flex-col w-8 h-8 rounded justify-center items-center group"
						onClick={() => setIsOpen(!isOpen)}
					>
						<div className={`${genericHamburgerLine} ${isOpen && 'rotate-45 translate-y-[6.5px]'} mb-1`} />
						<div className={`${genericHamburgerLine} ${isOpen && 'opacity-0'}`} />
						<div className={`${genericHamburgerLine} ${isOpen && '-rotate-45 -translate-y-[6.5px]'} mt-1`} />
					</button>
					<div
						className={`p-2 shadow rounded w-28 flex flex-col gap-1 absolute top-2 right-0 -z-50 transition ease transform duration-300 opacity-0 bg-accent ${
							isOpen ? 'z-20 translate-y-8 opacity-100' : ''
						}`}
					>
						{links.map(({ to, label }) => (
							<div
								key={to}
								className="text-xs px-2 flex align-center py-[2px] rounded hover:bg-secondary-background cursor-pointer text capitalize"
							>
								<Link to={to as any} tabIndex={0} activeOptions={{ exact: true }}>
									{label}
								</Link>
							</div>
						))}
					</div>
				</div>
			</div>
		</header>
	);
};
