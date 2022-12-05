import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createReactRouter, createRouteConfig, RouterProvider } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { httpBatchLink } from '@trpc/client';
import { createTRPCReact } from '@trpc/react-query';
import { StrictMode, useState } from 'react';

import App from '@app/App';
import { Index } from '@app/components';
import { AppProvider } from '@app/context';
import { AppRouter } from '@server/index';

import ReactDOM from 'react-dom/client';
import '../styles/index.css';

export const trpc = createTRPCReact<AppRouter>({});

export const rootRoute = createRouteConfig();

export const queryClient = new QueryClient();

const indexRoute = rootRoute.createRoute({ path: '/', component: Index });
const worksRoute = rootRoute.createRoute({ path: '/works', component: () => <></> });
const aboutMeRoute = rootRoute.createRoute({ path: '/aboutme', component: () => <></> });
const contactRoute = rootRoute.createRoute({ path: '/contact', component: () => <></> });

// Set up a ReactRouter instance
const router = createReactRouter({
	routeConfig: rootRoute.addChildren([indexRoute, worksRoute, aboutMeRoute, contactRoute]),
	defaultPreload: 'intent'
});

function MainApp() {
	const [trpcClient] = useState(() =>
		trpc.createClient({
			links: [
				httpBatchLink({
					url: 'http://localhost:4000',
					headers() {
						return {
							// authorization: getAuthCookie(),
						};
					}
				})
			]
		})
	);

	return (
		<trpc.Provider client={trpcClient} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router}>
					<AppProvider>
						<App />
					</AppProvider>
					<TanStackRouterDevtools position="bottom-left" />
				</RouterProvider>
			</QueryClientProvider>
		</trpc.Provider>
	);
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<MainApp />
	</StrictMode>
);
