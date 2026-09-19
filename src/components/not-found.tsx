import { HouseIcon, CompassIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

import {
  EmptyDescription,
  EmptyContent,
  EmptyHeader,
  EmptyTitle,
  Empty,
} from "@/components/ui/empty";

export function NotFoundPage() {
  return (
    <main
      id="main-content"
      className="mx-auto flex min-h-svh max-w-3xl items-center justify-center border-x px-6"
    >
      <Empty>
        <EmptyHeader>
          <h1 className="sr-only">Page not found</h1>
          <EmptyTitle className="font-mono text-8xl font-black">404</EmptyTitle>
          <EmptyDescription className="text-balance">
            The page you're looking for might have been moved or doesn't exist.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <div className="flex gap-2">
            <Button render={<Link to="/" />} nativeButton={false}>
              <HouseIcon data-icon="inline-start" />
              Go Home
            </Button>

            <Button
              variant="outline"
              render={<Link to="/arena/design-arena" />}
              nativeButton={false}
            >
              <CompassIcon data-icon="inline-start" />
              Explore
            </Button>
          </div>
        </EmptyContent>
      </Empty>
    </main>
  );
}
