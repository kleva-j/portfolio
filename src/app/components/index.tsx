import { UseAppContext } from '@app/context';

export const Index = () => {
	const { aboutMe, profileImg } = UseAppContext();

	return (
		<section className="flex w-full max-w-3xl mx-auto mt-24 px-4 justify-between">
			<article className="w-full md:w-6/12 flex flex-col gap-y-8">
				<div>
					<h1 className="text-[46px] font-bold leading-10 text-accent uppercase">{aboutMe.name}</h1>

					<span className="text-[20px] font-medium text-neutral">{aboutMe.role}</span>
				</div>

				<div>Currently based in Lagos, Nigeria, I love building interactive digital experiences on the web.</div>

				<div className="flex flex-col gap-5">
					<span className="">
						{`I'm an experienced software engineer who constantly seeks out innovative solutions to everyday problems. In
						my four years in this industry, I've honed my analytical thinking and collaboration skills, and I love
						working with a team. I've also had the opportunity to serve as the software engineer lead for three projects
						with First Technology`}
					</span>

					<span>
						I build software solutions using <strong>JavaScript</strong>, <strong>React</strong> and{' '}
						<strong>NodeJS</strong>
					</span>
				</div>
			</article>
			<article className="hidden md:block w-4/12">
				<img
					src={profileImg}
					className="rounded-sm img-responsive grayscale hover:grayscale-0 transition duration-1000"
					alt="My background profile picture"
				/>
			</article>
		</section>
	);
};
