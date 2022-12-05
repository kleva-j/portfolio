/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { applyTheme } from 'src/themes/utils';

type AboutMe = {
	name: string;
	role: string;
	desc: string;
	contactMe: string;
};

type Link = {
	url: string;
	icon?: string;
	alt: string;
};

type Work = {
	title: string;
	desc: string;
	backgroundImage: string;
	links: Link[];
};

type Social = { name: string } & Link;

enum Themes {
	default = 'default',
	light = 'light',
	dark = 'dark',
	cupcake = 'cupcake',
	bumblebee = 'bumblebee',
	emerald = 'emerald',
	corporate = 'corporate',
	synthwave = 'synthwave',
	retro = 'retro',
	cyberpunk = 'cyberpunk',
	valentine = 'valentine',
	halloween = 'halloween',
	garden = 'garden',
	forest = 'forest',
	aqua = 'aqua',
	lofi = 'lofi',
	pastel = 'pastel',
	fantasy = 'fantasy',
	wireframe = 'wireframe',
	black = 'black',
	luxury = 'luxury',
	dracula = 'dracula',
	cmyk = 'cmyk',
	autumn = 'autumn',
	business = 'business',
	acid = 'acid',
	lemonade = 'lemonade',
	night = 'night',
	coffee = 'coffee',
	winter = 'winter',
	necleo = 'necleo'
}

type AppContextState = {
	theme: Themes | string;
	darkMode: boolean;
	defaultTheme: Themes;
	profileImg: string;
	aboutMe: AboutMe;
	works: Work[];
	themePaletes: (string | Themes)[];
	socials: Social[];
};

type AppContext = {
	setTheme: (theme: Themes | string) => void;
	setDarkMode: (mode: boolean) => void;
} & AppContextState;

export const AppContext = createContext<AppContext>(null!);

export const UseAppContext = () => useContext(AppContext);

const context: AppContextState = {
	defaultTheme: Themes.default,
	darkMode: false,
	theme: 'default',
	profileImg: './michael.jpg',
	aboutMe: {
		name: 'Michael Obasi',
		role: 'Software Engineer',
		desc: 'I love solving problems by building cool software tool that addresses such problem and makes live a bit easier.',
		contactMe: 'kasmickleva@gmail.com'
	},
	works: [{ title: 'ReplIt', desc: '', backgroundImage: '', links: [{ url: '', alt: '' }] }],
	themePaletes: Object.values(Themes).filter((value) => !isNaN(Number(value)) === false),
	socials: [{ name: 'github', url: 'https://github.com/kleva-j', alt: 'github' }]
};

export const AppProvider = (props: { children: ReactNode }) => {
	const [state, setState] = useState<AppContextState>({ ...context, theme: context.defaultTheme });

	const setTheme = (theme: Themes | string) => {
		setState((state) => ({ ...state, theme }));
		applyTheme(theme);
	};

	const setDarkMode = (darkMode: boolean) => setState((state) => ({ ...state, darkMode }));

	const contextValue = useMemo(() => ({ ...state, setTheme, setDarkMode }), [state]);

	return <AppContext.Provider value={contextValue}>{props.children}</AppContext.Provider>;
};
