import { Composition, registerRoot } from "remotion";
import "@fontsource-variable/inter";

import { PostOg } from "./post-og";
import type { PostOgProps } from "./post-og";

const samplePost: PostOgProps = {
  title: "A thoughtful engineering decision",
  category: "Engineering",
  date: "Oct 2026",
  slug: "sample-post",
};

function RemotionRoot() {
  return (
    <Composition
      id="PostOg"
      component={PostOg}
      durationInFrames={1}
      fps={1}
      width={1200}
      height={630}
      defaultProps={samplePost}
    />
  );
}

registerRoot(RemotionRoot);
