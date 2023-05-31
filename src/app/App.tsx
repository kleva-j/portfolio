import { Index } from '@app/components';
import { DEFAULT_THEME } from 'src/themes';
import { applyTheme } from 'src/themes/utils';

import './App.css';

applyTheme(DEFAULT_THEME);

function App() {
	return (
		<section className="relative border-[8px] border-secondary bg-primary h-screen">
			{/* <Navbar /> */}
			<Index />
		</section>
	);
}

export default App;
