import { element, html, observe, tokens } from 'authorui'

export default ({ content }) => {
  const isOpen = observe(false)

  return Object.defineProperties({}, {
    open: {
      value: () => isOpen.value = true
    },

    close: {
      value: () => isOpen.value = false
    },

    isOpen: {
      get: () => isOpen.value
    },

    content: {
      get: () => isOpen.derive(o => o ? element('div', {
        attrs: {
          class: tokens`overlay area`
        }
      }, html`
        <div class="modal">
          ${content}
        </div>
      `) : '')
    }
  })
}