import { element, html } from 'authorui'
import FormControl from './FormControl.js'

export default ({ afterInput, afterLabel, beforeInput, beforeLabel, checked = false, error, label, name, on = {}, ...config } = {}) => FormControl({
  ...config,
  invalid: error?.derive(e => !!e) ?? false,
  type: 'checkbox'
}, attrs => {
  let input

  return html`
    ${beforeInput ?? ''}
    
    ${element('input', {
      name,
      attrs,

      props: {
        checked
      },

      on: {
        ...on,

        render: e => {
          input = e.target.element
          on.render?.(e)
        }
      }
    })}

    ${afterInput ?? ''}

    ${label ? html`
      ${beforeLabel ?? ''}
      
      ${element('label', label, {
        on: {
          click: () => input.click()
        }
      })}
      
      ${afterLabel ?? ''}
    ` : ''}
  `
})