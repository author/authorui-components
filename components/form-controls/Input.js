import { html } from 'aui'

export default ({
  id = null,
  type = 'text',
  placeholder = '',
  required = false,
  value = null,
  on = {}
}) => {
  const attributes = { type }
  
  id && (attributes.id = id)
  placeholder && (attributes.placeholder = placeholder)
  required && (attributes.required = true)

  return html`<input>`({
    attributes,
    properties: { value },
    on
  })
}