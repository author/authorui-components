import { html } from 'aui'

const getInput = ({
  attributes,
  properties,
  on = {}
}) => html`<input>`({ attributes, properties, on })

const getLabel = (label, id, before, after) => html`
  ${before && before}
  <label for="${id}">${label}</label>
  ${after && after}
`

export default () => html`CONTROL`

// export default ({
//   afterLabel = null,
//   attributes = {},
//   autofocus = false,
//   beforeLabel = null,
//   error,
//   id,
//   label,
//   name,
//   on = {},
//   placeholder = '',
//   required = false,
//   type,
//   value = null
// }) => {
//   const classes = new Set([name, type]),
//         properties = {},
//         attributes = { id, type }
  
//   label = getLabel(label, id, beforeLabel, afterLabel)

//   !['checkbox', 'radio', 'select', 'textarea'].includes(type) && classes.add('input')
//   classes.add('control')

//   value && (properties.value = value)
//   placeholder && (attributes.placeholder = placeholder)
//   required && (attributes.required = true)

//   return html`
//     <div>
//       ${labelBeforeInput && label}
//       ${getInput(name, { attributes, properties, on })}
//       ${!labelBeforeInput && label}
//       ${error}
//     </div>
//   `({
//     attributes: {
//       class: [...classes].filter(Boolean)
//     },

//     on: {
//       render () {
//         autofocus && document.getElementById(id)?.focus()
//       }
//     }
//   })
// }