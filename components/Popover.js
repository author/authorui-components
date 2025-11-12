// DEPRECATED: Use html Popover API

// import { observe } from 'aui'

// const popovers = []

// class Popover {
//   #isOpen

//   constructor (isOpen) {
//     this.#isOpen = isOpen
//   }

//   get isOpen () {
//     return this.#isOpen.value
//   }

//   bindToState (cb) {
//     return this.#isOpen.bind(cb)
//   }

//   close () {
//     this.#isOpen.setValue(false)
//   }

//   disable () {

//   }

//   enable () {

//   }

//   freeze () {

//   }

//   open () {
//     this.#isOpen.setValue(true)
//   }

//   toggle () {
//     this.#isOpen.setValue(!this.#isOpen.value)
//   }

//   unfreeze () {

//   }
// }

// export class PopoverManager {
//   static closeAll () {
//     for (const popover of popovers) {
//       popover.close()
//     }
//   }

//   static async createPopover (render) {
//     const popover = new Popover(await observe(false))
//     popovers.push(popover)
//     return await render(popover)
//   }
// }

// // export default ({ anchor, attributes = {}, contents, properties = {}, on = {}, state = getState() }) => {
// //   const id = `popover_${crypto.randomUUID()}`

// //   const { bind, proxy } = state,
// //         clickHandler = on.click,
// //         methods = getMethods(state),
// //         toggle = ({ target }) => {
// //           const popover = document.getElementById(id)

// //           if (!(target === popover || popover?.contains(target) || proxy.frozen || proxy.disabled)) {
// //             proxy.open = !proxy.open
// //           }
// //         }

// //   state.on('change', (e, changes) => {
// //     const { key, value } = changes.at(-1)
// //     return key === 'open' && document.body[`${value ? 'add' : 'remove'}EventListener`]('click', toggle)
// //   })

// //   on.click = async e => {
// //     await clickHandler?.(e)
// //     toggle(e)
// //   }

// //   return html`
// //     <div>
// //       <div class="anchor">
// //         ${anchor && anchor(methods)}
// //       </div>
      
// //       ${bind('open', o => o && html`
// //         <div id="${id}" class="contents">
// //           ${contents(methods)}
// //         </div>
// //       `)}
// //     </div>
// //   `({
// //     attributes: {
// //       class: [bind('open', o => o ? 'open' : ''), attributes.class, 'popover']
// //     },

// //     on,
// //     properties
// //   })
// // }

// // function getMethods ({ proxy }) {
// //   return {
// //     close: () => proxy.open = false,
// //     disable: () => proxy.disabled = true,
// //     enable: () => proxy.disabled = false,
// //     freeze: () => proxy.frozen = true,
// //     open: () => proxy.open = true,
// //     toggle: () => proxy.open = !proxy.open,
// //     unfreeze: () => proxy.frozen = false
// //   }
// // }

// // function getState ({ disabled = false, frozen = false, open = false, ...rest } = {}) {
// //   return State.createObject({ disabled, frozen, open, ...rest })
// // }