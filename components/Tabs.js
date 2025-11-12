import { observe } from 'aui'

// function Tab (content, config) {
//   Object.defineProperties(this, {
//     get: {
//       value: key => config[key]
//     },

//     content: {
//       get: () => content.bind()
//     },

//     replaceContent: {
//       value: replacement => content.setValue(replacement)
//     }
//   })
// }

// class Tab {
//   #config
//   #observer
//   #render

//   constructor (observer, render, config) {
//     this.#config = config
//     this.#observer = observer
//     this.#render = render
//   }

//   // get content () {
//   //   return this.#content
//   // }

//   get (key) {
//     return this.#config[key]
//   }

//   async render () {
//     await this.#observer.setValue(this.#render(this))
//     return this.#observer.bind()
//   }

//   async replaceContent (render, config) {
//     this.#config = config
//     this.#observer.setValue(render(this))
//   }
// }

class Tab {
  #meta
  #renderContent
  #renderLabel

  constructor ({ content, label }, meta = {}) {
    this.#meta = meta
    this.#renderContent = content
    this.#renderLabel = label
  }

  

  renderContent () {
    return this.#renderContent(this)
  }

  renderLabel () {
    return this.#renderLabel(this)
  }
}

export async function createTabs ({ selected, initial = [] } = {}) {
  const tabs = await observe(initial),
        selectedTab = await observe(selected),
        { value } = tabs

  return {
    addTab: async (tab, { index = -1, select = true } = {}) => {
      if (value.includes(tab)) return

      if (index > 0) await value.splice(index, 0, tab)
      else await value[index === 0 ? 'unshift' : 'push'](tab)

      select && await selectedTab.setValue(tab)
      return tab
    },

    bindToSelectedTab: selectedTab.bind,
    bindToTabs: tabs.bind,
    createTab: (...args) => new Tab(...args),
    getSelectedTab: () => selectedTab.value,
    getTabAt: index => tabs.value[index],
    getTabCount: () => tabs.value.length,
    getTabs: () => tabs.value,
    getTabIndex: tab => tabs.value.indexOf(tab),
    mapTabs: cb => tabs.map(cb),

    moveTab: async (from, to) => {
      const { value } = tabs,
            { length } = value

      to = to >= length ? length - 1 : to < 0 ? 0 : to
      from = from >= length ? length - 1 : from < 0 ? 0 : from

      if (from !== to) return await value.moveWithin(from, to)
    },

    removeTab: async tab => {
      const index = value.indexOf(tab)    

      if (index < 0) {
        console.log(tab)
        throw new Error(`Tab not found matching object`)
      }

      const target = value[index],
            lastIndex = value.length - 1
      
      if (target === selectedTab.value) {
        await selectedTab.setValue(value[index === lastIndex ? lastIndex - 1 : index + 1])
      }    
      
      await (index === lastIndex
        ? value.pop()
        : index === 0
          ? value.shift()
          : value.splice(index, 1)
      )
    },

    renderTabs: renderTab => tabs.map(renderTab),

    // replaceTab: async (target, replacement) => {
    //   tabs.value.splice(getTabIndex(target), 1, replacement)
    //   selectTab(replacement)
    // },

    selectTab: async key => {
      switch (typeof key) {
        case 'number': return await selectedTab.setValue(value[key])
        // case 'string': return await selectedTab.setValue(value.find(({ id }) => id === key))
        default: return await selectedTab.setValue(value.find(tab => tab === key))
      }
    }
  }
}

// return Object.defineProperties(result, {

//     // moveTab: async (tab, from, to) => {
//     //   console.log('MOVE', tab)
//     //   console.log({ from, to })
      
//     //   // find its current index
//     //   // const { value } = tabs
      
//     //   // if (from < 0 || to < 0 || to > value.length) return
      
//     //   // // remove at oldIndex
//     //   // console.log('REMOVE TAB FROM INDEX', from)
//     //   // await value.splice(from, 1)
      
//     //   // // insert at index
//     //   // console.log('REPLACE TAB AT INDEX', to)
      
//     //   // await value.splice(to, 0, tab)
      
//     //   // console.log('After moving:', tabs.value)
//     // }
//   })