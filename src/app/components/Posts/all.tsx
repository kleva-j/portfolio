import { postsRoute } from '@client/main';
import { useQuery } from '@tanstack/react-query';
import { Outlet, useMatch } from '@tanstack/react-router';
import { fetchPosts } from 'src/utils/fetchPost';

export const Posts = () => {
	const postsQuery = useQuery(['posts'], fetchPosts);
	const { Link } = useMatch(postsRoute.id);

	return (
		<div className="m-auto bg-white dark:bg-gray-600 grid place-items-center">
			<h2 className="text-3xl font-bold text-gray-800 uppercase dark:text-white my-5">This is the All posts page</h2>
			<div className="flex gap-4">
				<div className="">
					{postsQuery.data?.map((post) => {
						return (
							<div key={post.id} className="my-5 bg-gray-500">
								<Link to="/posts/:postId" params={{ postId: post.id }} activeProps={{ className: 'font-bold' }}>
									<pre>{post.title.substring(0, 20)}</pre>
								</Link>
							</div>
						);
					})}
				</div>
				<hr />
				<Outlet />
			</div>
		</div>
	);
};
