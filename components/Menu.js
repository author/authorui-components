import { element, html, observe, observeArray, tokens } from 'authorui'

export default ({ controlClasses = [], controlId, id, items = [], label, menuClasses = [] }) => {
  let rendered = false, control, menu

  if (!id) id = `menu-${crypto.randomUUID()}`
  if (!controlId) controlId = `menu_control-${crypto.randomUUID()}`

  items = observeArray(items)
  
  const open = observe(false)

  return {
    open: () => {
      open.value = true
      menu.showPopover()
    },

    close: () => {
      open.value = false
      menu.hidePopover()
    },
    
    render: () => {
      if (rendered) throw new Error(`Menu ${id} has already been rendered`)

      rendered = true

      return html`
        ${element('button', label, {
          attrs: {
            class: tokens`
              ${open.derive(o => o ? 'active' : '')}
              ${controlClasses.join(' ')}
              menu_toggle
            `,

            id: controlId,
            popovertarget: id,
            popovertargetaction: 'toggle',
            role: 'button',
            'aria-haspopup': 'true',
            'aria-expanded': open.derive(o => o ? 'true' : 'false')
          },

          on: {
            render: ({ target }) => control = target.element
          }
        })}

        ${element('ul', {
          attrs: {
            class: tokens`
              ${open.derive(o => o ? 'open' : '')}
              ${menuClasses.join(' ')}
              menu
            `,
            
            id,
            role: 'menu',
            popover: true,
            'aria-labelledby': controlId
          },

          on: {
            render: ({ target }) => {
              menu = target.element
              menu.addEventListener('toggle', () => open.value = menu.matches(':popover-open'))
            }
          }
        }, items.map(({ label, onClick }) => element('li', label, {
          attrs: {
            class: 'item'
          },
          
          on: {
            click: onClick
          }
        })))}
      `
    }
  }
}