import { GithubLogoIcon, StarIcon } from "@phosphor-icons/react";

import { Button } from "@/components/ui/button";

export function GithubStarButton() {
  return (
    <Button
      variant="outline"
      className="group rounded transition-transform duration-150 ease-out hover:scale-[1.02] active:scale-[0.97] motion-reduce:transition-none"
    >
      <span className="relative flex h-4 w-4 shrink-0 items-center justify-center">
        {/* GitHub mark — default state, slides up and out on hover */}
        <GithubLogoIcon className="absolute h-4 w-4 transition-all duration-200 ease-out group-hover:-translate-y-4 group-hover:opacity-0 motion-reduce:transition-none" />

        {/* Star + sparkle — hidden until hover, then slides up into place */}
        <span className="absolute flex translate-y-4 items-center justify-center opacity-0 transition-all duration-200 ease-out group-hover:translate-y-0 group-hover:opacity-100 motion-reduce:transition-none">
          <StarIcon className="h-4 w-4 text-yellow-400" />
          <span className="absolute -top-3 -right-2 scale-0 -rotate-45 opacity-0 transition-all delay-75 duration-200 ease-out group-hover:scale-100 group-hover:rotate-0 group-hover:opacity-100 motion-reduce:transition-none">
            <svg
              className="h-2.5 w-2.5 text-yellow-200"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2l2.4 7.6H22l-6.2 4.5 2.4 7.6-6.2-4.5-6.2 4.5 2.4-7.6L2 9.6h7.6z" />
            </svg>
          </span>
        </span>
      </span>
      <span className="text-[13px] font-medium tracking-tight">
        Star on GitHub
      </span>
    </Button>
  );
}
