import { html, Router } from 'aui'

export default ({ href, label }) => html`<a href="${href}">${label}</a>`({
  on: {
    click: evt => {
      evt.preventDefault()
      Router.goto(href)
    }
  }
})