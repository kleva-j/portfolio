import { UseAppContext } from '@app/context';
import email from '../../assets/at-sign.svg';
import github from '../../assets/github.svg';
import linkedin from '../../assets/linkedin.svg';

export const Index = () => {
	const { aboutMe, profileImg } = UseAppContext();

	return (
		<section className="flex w-full max-w-3xl mx-auto mt-24 lg:mt-[160px] px-4 justify-between">
			<article className="w-full md:w-6/12 flex flex-col gap-y-8">
				<div>
					<h1 className="text-[46px] font-bold leading-10 text-accent uppercase">{aboutMe.name}</h1>

					<span className="text-[20px] font-medium text-neutral">{aboutMe.role}</span>
				</div>

				<div>Currently based in Lagos, Nigeria, I love building interactive digital experiences on the web.</div>

				<div className="flex flex-col gap-5">
					<span className="">
						{`I'm an experienced software developer with a passion for building robust and scalable applications. Proficient in
						multiple programming languages and frameworks, with a keen eye for detail and a drive for continuous
						learning.`}
					</span>

					<span>
						I build software solutions using <strong>TypeScript</strong>, <strong>React</strong> and{' '}
						<strong>NodeJS</strong>
					</span>
				</div>
				<div className="border-t border-[#006DAA] border-dotted dashed pt-3 -mt-3 flex gap-x-4">
					<a
						href="https://www.linkedin.com/in/michael-obasi-808806140/"
						title="linkedin"
						target="_blank"
						rel="noreferrer noopener"
					>
						<img className="text-[#006DAA]" src={linkedin} alt="linkedin icon" />
					</a>
					<a href="https://github.com/kleva-j" title="github" target="_blank" rel="noreferrer noopener">
						<img className="text-[#006DAA]" src={github} alt="github icon" />
					</a>
					<a href="mailto:kasmickleva@gmail.com" title="email" target="_blank" rel="noreferrer noopener">
						<img className="text-[#006DAA]" src={email} alt="at sign icon" />
					</a>
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
