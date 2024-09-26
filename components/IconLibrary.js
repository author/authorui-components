import { include } from 'aui'

export default class IconLibrary {
  #aliases
  #path

  constructor ({ path, aliases }) {
    this.#aliases = aliases
    this.#path = path
  }

  get (alias) {
    return include(`${this.#path}/${this.#aliases?.[alias] ?? alias}.svg`, {
      type: 'text/html'
    })
  }
}