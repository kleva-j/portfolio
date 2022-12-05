import { Index } from '@app/components';
import { AppProvider } from '@app/context';
import { render, screen } from '@testing-library/react';

test('Name is present.', () => {
	render(
		<AppProvider>
			<Index />
		</AppProvider>
	);

	expect(screen.getByText('Michael Obasi')).toBeDefined();
});

test('Image is present.', () => {
	render(
		<AppProvider>
			<Index />
		</AppProvider>
	);

	expect(screen.getByAltText('My background profile picture')).toBeDefined();
});
