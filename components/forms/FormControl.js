import { element, tokens } from 'authorui'

export default ({
  classes = [],
  id,
  name,
  type,
  ...rest
} = {}, render) => {
  const attributes = {
    id: id ?? `form-control_${name ? `${name}_` : ''}${crypto.randomUUID()}`,
    type,
    ...rest
  }

  if (name) attributes.name = name

  return element('div', {
    attrs: {
      class: tokens`${classes.join(' ')} ${type} ${!['checkbox', 'radio'].includes(type) ? 'input' : ''} control`
    }
  }, render(attributes))
}