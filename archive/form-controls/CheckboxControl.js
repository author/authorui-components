import { html } from 'aui'
import { getClassList, getLabel } from './utilities.js'

export default ({
  attributes = {},
  checked = false,
  id = `checkbox_${crypto.randomUUID()}`,
  label,
  name,
  on = {},
  onClick,
  onChange,
  properties,
  required = false
}) => {
  attributes.class = getClassList(attributes.class, name, 'checkbox', 'control')

  const inputCfg = {
    attributes: { id, required },
    properties: { checked },
    on: {}
  }
  
  onClick && (inputCfg.on.click = onClick)
  onChange && (inputCfg.on.change = onChange)

  return html`<div>
    ${html`<input type="checkbox">`(inputCfg)}
    ${label && getLabel(label, id)}
  </div>`({ attributes, properties, on })
}