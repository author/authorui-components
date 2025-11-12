import { element, html } from 'authorui'
import FormControl from './FormControl.js'

// export default ({ name, label, value = '', error, ...config }) => FormControl({
//   ...config,
//   invalid: error?.bind(e => !!e) ?? false,
//   value
// }, attributes => html`
//   <label for="${attributes.id}">${label}</label>

//   ${createElement('input', {
//     name,
//     attributes,

//     on: {
//       input: ({ target: { value: v } }) => {
//         error.setValue('')
//         value.setValue(v)
//       }
//     }
//   })}

//   ${error ? error.bind(e => e.trim() && html`
//     <p class="error notice">${e}</p>
//   `({ name: `'${label ?? name}' Input Error` })) : ''}
// `({ name: `'${label ?? name}' Input` }))


export default ({ afterInput, afterLabel, beforeInput, beforeLabel, error, label, name, on = {}, value = '', ...config } = {}) => FormControl({
  ...config,
  invalid: error?.derive(e => !!e) ?? false,
  type: 'text',
  value
}, attrs => {
  // const { input: onInput } = on

  // TODO: Make 'for' attribute dynamic?
  return html`
    ${label ? html`
      ${beforeLabel ?? ''}
      <label>${label}</label>
      ${afterLabel ?? ''}
    ` : ''}
    
    ${beforeInput ?? ''}
    
    ${element('input', {
      name,
      attrs,

      props: {
        value
      },

      on/*: {
        input: onInput
      }*/
    })}

    ${afterInput ?? ''}
  `
})

//   ${error ? error.bind(e => e.trim() && html`
//     <p class="error notice">${e}</p>
//   `({ name: `'${label ?? name}' Input Error` })) : ''}