import { i18n } from "../../i18n"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"

const NotFound: QuartzComponent = ({ cfg }: QuartzComponentProps) => {
  // If baseUrl contains a pathname after the domain, use this as the home link
  const url = new URL(`https://${cfg.baseUrl ?? "example.com"}`)
  const baseDir = url.pathname

  return (
    <article class="popover-hint">
      <p>{i18n(cfg.locale).pages.error.notFound}</p>
      <a href={baseDir}>{i18n(cfg.locale).pages.error.home}</a>
			<pre><code>
     ____________/\\\________/\\\\\\\_______________/\\\____ 
<br/> __________/\\\\\______/\\\/////\\\___________/\\\\\____
<br/>  ________/\\\/\\\_____/\\\____\//\\\________/\\\/\\\____
<br/>   ______/\\\/\/\\\____\/\\\_____\/\\\______/\\\/\/\\\____
<br/>    ____/\\\/__\/\\\____\/\\\_____\/\\\____/\\\/__\/\\\____
<br/>     __/\\\\\\\\\\\\\\\\_\/\\\_____\/\\\__/\\\\\\\\\\\\\\\\_
<br/>      _\///////////\\\//__\//\\\____/\\\__\///////////\\\//__
<br/>       ___________\/\\\_____\///\\\\\\\/_____________\/\\\____ 
<br/>        ___________\///________\///////_______________\///_____ 
</code></pre>
    </article>
  )
}

export default (() => NotFound) satisfies QuartzComponentConstructor
