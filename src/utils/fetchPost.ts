import axios from 'axios';

type PostType = {
	id: string;
	title: string;
	body: string;
};

export const fetchPosts = async () => {
	console.log('Fetching posts...');
	await new Promise((r) => setTimeout(r, 500));
	return axios.get<PostType[]>('https://jsonplaceholder.typicode.com/posts').then((r) => r.data.slice(0, 10));
};

export const fetchPostById = async (postId: string) => {
	console.log(`Fetching post with id ${postId}...`);
	await new Promise((r) => setTimeout(r, 500));

	return await axios.get<PostType>(`https://jsonplaceholder.typicode.com/posts/${postId}`).then((r) => r.data);
};
