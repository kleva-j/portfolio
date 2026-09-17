import { FullWidthDivider } from "@/components/full-width-divider";
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
    <div className="flex w-full items-center justify-center overflow-hidden">
      <div className="flex h-screen items-center border-x">
        <div>
          <FullWidthDivider />
          <Empty>
            <EmptyHeader>
              <EmptyTitle className="font-mono text-8xl font-black">
                404
              </EmptyTitle>
              <EmptyDescription className="text-nowrap">
                The page you're looking for might have been <br />
                moved or doesn't exist.
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
                  render={<Link to="/design-arena" />}
                  nativeButton={false}
                >
                  <CompassIcon data-icon="inline-start" />
                  Explore
                </Button>
              </div>
            </EmptyContent>
          </Empty>
          <FullWidthDivider />
        </div>
      </div>
    </div>
  );
}
