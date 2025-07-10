import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const Logo: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
  return (
    <div class={`logo ${displayClass ?? ""}`}>
      <img
        src="./static/icon.png"
        alt="My Blog Logo"
        style={{margin: "10px auto", display: "block" }}
      />
    </div>
  )
}

Logo.css = `
.logo {
  text-align: center;
  margin-bottom: 15px;
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
