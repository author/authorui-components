import { html, State } from 'aui'

export default (controlType, { attributes, properties, on, type }, content) => {
  const { map } = State.createArray([...[type, controlType].filter(Boolean), 'control'])
  attributes.class = map({ delimiter: ' ' })
  return html`<div>${content}</div>`({ attributes, properties, on })
}