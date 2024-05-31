import { include } from 'aui'

export default class IconLibrary {
  #aliases
  #path

  constructor ({ path, aliases }) {
    this.#aliases = aliases
    this.#path = path
  }

  get (id) {
    return include(`${this.#path}/${this.#aliases?.[id] ?? id}.svg`, {
      type: 'text/html'
    })
  }
}