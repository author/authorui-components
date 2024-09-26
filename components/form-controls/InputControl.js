import { html } from 'aui'
import Control from './Control.js'
import { getClassList, getID, getLabel } from './utilities.js'

export default ({
  attributes = {},
  input = {},
  name,
  label = {},
  on = {},
  properties = {}
} = {}) => {
  // TODO: if input.attributes.class is a binding, add it to a bindAll()

  console.log('HEYYY')

  const inputConfig = getInputConfig(input),
        { id, type } = inputConfig.attributes

  return Control('input', { name, attributes, properties, on, type }, html`
    ${label && getLabel(id, label)}
    ${html`<input>`(inputConfig)}
  `)
}

function getInputConfig ({ attributes = {}, properties = {}, on = {} } = {}) {
  const { autofocus = false, class: classes, placeholder, name, required = false, type = 'text', value } = attributes,
        id = getID({ id: attributes.id, type }),
        onRender = on.render

  properties.value = properties.value ?? value

  on.render = async (...args) => {
    // await onRender?.(evt)
    console.log(document.getElementById(id))
    

    // setTimeout(() => {
    //   console.log(document.getElementById(id))
    // }, 100)
    // autofocus && document.getElementById(id)?.focus()
  }

  return {
    attributes: {
      autofocus,
      class: getClassList({ config: (classes ?? []), name, type }),
      id,
      placeholder,
      name,
      required,
      type
    },

    properties,
    on
  }
}

// import { html } from 'aui'
// // import Control from './Control.js'
// import { getClassList, getLabel } from './utilities.js'

// export default ({
//   afterLabel,
//   attributes = {},
//   autofocus = false,
//   beforeLabel,
//   id,
//   label,
//   name,
//   on = {},
//   onChange,
//   onFocus,
//   onInput,
//   placeholder = null,
//   properties = {},
//   required = false,
//   type = 'text',
//   value = null
// }) => {
//   id = id ?? `${type ? `${type}_` : ''}input_${crypto.randomUUID()}`
//   attributes.class = getClassList(attributes.class, name, type, 'input', 'control')

//   const onRender = on.render

//   on.render = async evt => {
//     await onRender?.(evt)
//     autofocus && document.getElementById(id)?.focus()
//   }

//   const inputCfg = {
//     attributes: { id, placeholder, required, type },
//     properties: { value },
//     on: {}
//   }

//   onChange && (inputCfg.on.change = onChange)
//   onFocus && (inputCfg.on.focus = onFocus)
//   onInput && (inputCfg.on.input = onInput)

//   return html`<div>
//     ${label && getLabel(label, id)}
//     ${html`<input>`(inputCfg)}
//   </div>`({ attributes, properties, on })
// }