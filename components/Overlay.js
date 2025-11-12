import { html, observe } from 'aui'

// TODO: We need the array syntax for attribute values in order to combine sets of values.
// If we pass in a custom class for this overlay, we need to be able to combine it with the 
// default classList of "overlay" while still allowing the addition of bindings, etc.
export async function createOverlay (cfg) {
  const active = await observe(false)
  let content

  return {
    overlay: active.bind(a => a ? html`
      <div class="overlay">
        ${content}
      </div>
    `(cfg) : ''),

    disable: () => active.setValue(false),

    enable: c => {
      content = c
      active.setValue(true)
    }
  }
}