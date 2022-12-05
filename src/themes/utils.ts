import { themes } from './index';

export interface ITheme {
	[key: string]: string;
}

export interface IThemes {
	[key: string]: ITheme;
}

export interface IMappedTheme {
	[key: string]: string | null;
}

export const mapTheme = (variables: ITheme): IMappedTheme => {
	return {
		'--color-primary': variables.primary || '',
		'--color-secondary': variables.secondary || '',
		'--color-accent': variables.accent || '',
		'--color-neutral': variables.neutral || '',
		'--color-info': variables.info || '',
		'--color-success': variables.success || '',
		'--color-warning': variables.warning || '',
		'--color-error': variables.error || '',
		'--color-text-primary': variables.textPrimary || '#e0eaea',
		'--color-text-secondary': variables.textSecondary || '#4c4c4c',
		'--color-bg-primary': variables.backgroundPrimary || '#ECFBFB',
		'--color-bg-secondary': variables.backgroundSecondary || '#e0eaea'
	};
};

export const applyTheme = (theme: string): void => {
	const themeObject: IMappedTheme = mapTheme(themes[theme]);
	if (!themeObject) return;

	const root = document.documentElement;

	Object.keys(themeObject).forEach((property) => {
		if (property === 'name') {
			return;
		}

		root.style.setProperty(property, themeObject[property]);
	});
};

export const extend = (extending: ITheme, newTheme: ITheme): ITheme => {
	return { ...extending, ...newTheme };
};
