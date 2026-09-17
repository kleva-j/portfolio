import type { PageTypographyProps } from "./pageTypography"
import type { LandingPageProps } from "./LandingPageFrame"

import { splitTypographyProps, usePageTypography } from "./pageTypography"
import { COMPLETE_SHELF_TYPOGRAPHY } from "./pageRecipes"
import { LandingPageFrame } from "./LandingPageFrame"

export {
  applyBackgroundPresentation,
  LandingPageFrame,
} from "./LandingPageFrame"
export type {
  LandingPageFrameProps,
  LandingPageProps,
} from "./LandingPageFrame"

export function CompleteShelfLandingPage(
  props: LandingPageProps & PageTypographyProps
) {
  const [type, frame] = splitTypographyProps(props)
  const customization = usePageTypography(COMPLETE_SHELF_TYPOGRAPHY, type)
  return (
    <LandingPageFrame
      {...frame}
      customization={customization}
      title="Working Volumes — Seven Tools for Making"
      sourceUrl="/landing-pages/complete-shelf-v2.html"
    />
  )
}
