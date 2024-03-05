import { html } from 'aui'
// import Control from './Control.js'
import { getClassList, getLabel } from './utilities.js'

export default ({
  afterLabel,
  attributes = {},
  autofocus = false,
  beforeLabel,
  id,
  label,
  name,
  on = {},
  onChange,
  onFocus,
  onInput,
  placeholder = null,
  properties = {},
  required = false,
  type = 'text',
  value = null
}) => {
  id = id ?? `${type ? `${type}_` : ''}input_${crypto.randomUUID()}`
  attributes.class = getClassList(attributes.class, name, type, 'input', 'control')

  const onRender = on.render

  on.render = async evt => {
    await onRender?.(evt)
    autofocus && document.getElementById(id)?.focus()
  }

  const inputCfg = {
    attributes: { id, placeholder, required, type },
    properties: { value },
    on: {}
  }

  onChange && (inputCfg.on.change = onChange)
  onFocus && (inputCfg.on.focus = onFocus)
  onInput && (inputCfg.on.input = onInput)

  return html`<div>
    ${label && getLabel(label, id)}
    ${html`<input>`(inputCfg)}
  </div>`({ attributes, properties, on })
}