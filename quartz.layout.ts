import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import Logo from "./quartz/components/Logo"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/Pi3dra",
    },
  }),
}


const oldexplorerConfig = {
  filterFn: (node: FileNode) => node.name !== "tags" &&
  !(node.file?.frontmatter?.tags?.includes("explorer-exclude") === true),
  mapFn: (node: FileNode) => {
    // dont change name of root node
    if (node.depth > 0) {
      // set emoji for file/folder
      if (node.file) {
        node.displayName = "⚛" + node.displayName
      } else {
        //node.displayName = " " + node.displayName
      }
  }
}}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
		Component.Logo(),
    Component.DesktopOnly(Component.PageTitle()),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        { Component: Component.Darkmode() },
        {
          Component: Component.Search(),
          grow: true,
        },
				{ Component: Component.MobileOnly(Component.OverlayExplorer(oldexplorerConfig)),},
      ],

    }),
    Component.DesktopOnly(Component.Explorer()),
  ],

  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer(),
  ],
  right: [],
}
