import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const Logo: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
  return (
    <div class={`logo ${displayClass ?? ""}`}>
			<a href="/">
				<img
					src="./static/icon.png"
					alt="Smiling Monkey"
					style={{margin: "10px auto", display: "block" }}
				/>
			</a>
    </div>
  )
}

Logo.css = `
.logo {
}
.logo img {
  max-width: 180px;
  height: auto;
}


@media (max-width: 768px) {
  .logo img {
    width: 40px;
  }
}
`

export default (() => Logo) satisfies QuartzComponentConstructor
