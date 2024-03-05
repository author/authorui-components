import { html } from 'aui'

export const getClassList = (...classes) => [...new Set(classes.reduce((result, entry) => {
  return entry ? result : [...result, ...(Array.isArray(entry) ? entry : [entry])]
}, []))]

export const getLabel = (label, id, before, after) => html`
  ${before && before}
  <label for="${id}">${label}</label>
  ${after && after}
`