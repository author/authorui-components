import { html } from 'aui'

export function getClassList ({ config, name, type }) {
  return [...(new Set([...(Array.isArray(config) ? config : config.split(' ')), name, type].filter(Boolean)))]
}

export function getID ({ id, type } = {}) {
  return id ?? `${type ? `${type}_` : ''}input_${crypto.randomUUID()}`
}

export function getLabel (id, config) {
  const { attributes = {}, properties = {}, on = {}, before, after, content } = getLabelConfig(config)

  return html`
    ${before && before}
    
    ${html`
      <label for="${id}">${content}</label>
    `({ attributes, properties, on })}

    ${after && after}
  `
}

function getLabelConfig (spec) {
  switch (spec.constructor.name) {
    case 'Function': return { content: spec }
    case 'String': return { content: html`${spec}` }
    default: return spec
  }
}