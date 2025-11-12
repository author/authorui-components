import { html } from 'aui'
import Control from './Control.js'
import { getClassList, getID, getLabel } from './utilities.js'

export default ({
  after,
  before,
  attributes = {},
  error,
  input = {},
  name,
  label = {},
  on = {},
  properties = {}
} = {}) => {
  // TODO: if input.attributes.class is a binding, add it to a bindAll()

  const inputConfig = { name, ...getInputConfig(input) },
        { id, type } = inputConfig.attributes

  return Control('input', { name, attributes, error, properties, on, type }, html`
    ${label && getLabel(id, label)}
    ${html`<input>`(inputConfig)}
    ${after && after}
  `)
}

function getInputConfig ({ attributes = {}, properties = {}, on = {} } = {}) {
  const { autofocus = false, class: classes, disabled, placeholder, name, required = false, type = 'text', value, ...rest } = attributes,
        id = getID({ id: attributes.id, type }),
        onRender = on.render

  properties.value = properties.value ?? value

  on.render = async (...args) => {
    await onRender?.(...args)
    autofocus && document.getElementById(id)?.focus()
  }

  return {
    attributes: {
      autofocus,
      class: getClassList({ config: (classes ?? []), name, type }),
      disabled,
      id,
      placeholder,
      name,
      required,
      type,
      ...rest
    },

    properties,
    on
  }
}