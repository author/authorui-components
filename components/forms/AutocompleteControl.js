import { element, html, observe, observeArray, tokens } from 'authorui'
import InputControl from './InputControl.js'

export default ({
  fetchSuggestions,
  minLength = 2,
  onSelect,
  renderSuggestion,
  ...rest
} = {}) => {
  const id = `suggestions_${crypto.randomUUID()}`,
        inputValue = observe(''),
        suggestions = observeArray([]),
        loading = observe(false),
        error = observe(''),
        isOpen = observe(false),
        activeIndex = observe(-1)

  let activeRequestId = 0, closeTimeout, listElement

  const handleSelect = suggestion => {
    if (!suggestion) return

    suggestions.value = []
    inputValue.value = ''
    hideList()
    activeIndex.value = -1
    onSelect?.(suggestion)
  }

  const hideList = () => {
    isOpen.value = false
    activeIndex.value = -1
  }

  const openList = () => {
    if (suggestions.value.length === 0) {
      hideList()
    } else {
      isOpen.value = true
      if (activeIndex.value < 0 || activeIndex.value >= suggestions.value.length) {
        activeIndex.value = 0
      }
    }
  }

  const cancelScheduledClose = () => clearTimeout(closeTimeout)

  const scheduleClose = () => {
    cancelScheduledClose()
    closeTimeout = setTimeout(() => hideList(), 120)
  }

  const fetchForValue = async value => {
    inputValue.value = value

    const trimmed = value.trim(),
          normalizedLength = trimmed.length
    
    if (normalizedLength < minLength) {
      loading.value = false
      error.value = ''
      suggestions.value = []
      hideList()
      return
    }
    
    loading.value = true
    const requestId = ++activeRequestId
    
    try {
      const results = await fetchSuggestions(trimmed)

      if (requestId !== activeRequestId) return

      const list = Array.isArray(results) ? results : []
      suggestions.value = list
      error.value = ''
      list.length ? openList() : hideList()
      
    } catch (err) {
      if (requestId !== activeRequestId) return

      suggestions.value = []
      error.value = err?.message ?? 'Failed to fetch suggestions'
      hideList()
    } finally {
      if (requestId === activeRequestId) loading.value = false
    }
  }

  const moveHighlight = direction => {
    const { length } = suggestions.value
    if (!length) {
      activeIndex.value = -1
      return
    }

    let next = activeIndex.value + direction

    if (next < 0) next = length - 1
    if (next >= length) next = 0

    activeIndex.value = next
    isOpen.value = true
  }

  const selectHighlighted = () => {
    const index = activeIndex.value
    if (index < 0 || index >= suggestions.value.length) return

    handleSelect(suggestions.value[index])
  }

  activeIndex.on('change', ({ target: { value } }) => {
    if (!listElement || value < 0) return

    const item = listElement.children?.[value]
    if (!item) return

    const { offsetTop, offsetHeight } = item
    const viewTop = listElement.scrollTop
    const viewBottom = viewTop + listElement.clientHeight
    const itemBottom = offsetTop + offsetHeight

    if (offsetTop < viewTop) {
      listElement.scrollTop = offsetTop
    } else if (itemBottom > viewBottom) {
      listElement.scrollTop = itemBottom - listElement.clientHeight
    }
  })

  const renderSuggestionContent = suggestion => {
    if (renderSuggestion) return renderSuggestion(suggestion)

    const label = suggestion?.label ?? suggestion?.name ?? ''
    const description = suggestion?.description ?? ''

    return html`
      <div class="primary">${label}</div>
      ${description ? html`<div class="secondary">${description}</div>` : ''}
    `
  }

  return element('div', {
    attrs: {
      class: 'autocomplete',
    }
  }, html`
    ${InputControl({
      type: 'search',
      value: inputValue,
      ...rest,

      on: {
        input: ({ target }) => {
          cancelScheduledClose()
          fetchForValue(target.value)
        },

        focus: ({ target }) => {
          cancelScheduledClose()

          const { value } = target
          inputValue.value = value

          if (value.trim().length >= minLength) {
            if (suggestions.value.length) {
              openList()
            } else {
              fetchForValue(value)
            }
          }
        },

        keydown: event => {
          switch (event.key) {
            case 'ArrowDown': {
              event.preventDefault()
              if (!isOpen.value && suggestions.value.length === 0) {
                fetchForValue(event.target.value)
              } else {
                moveHighlight(1)
              }
              break
            }

            case 'ArrowUp': {
              event.preventDefault()
              if (suggestions.value.length > 0) moveHighlight(-1)
              break
            }

            case 'Enter': {
              if (isOpen.value) {
                event.preventDefault()
                selectHighlighted()
              }
              break
            }

            case 'Escape': {
              if (isOpen.value) {
                event.preventDefault()
                hideList()
              }
              break
            }

            default: break
          }
        },

        blur: () => scheduleClose()
      }
    })}

    ${isOpen.derive(open => {
      if (!open) return ''

      return element('ul', {
        attrs: {
          id,
          class: 'suggestions'
        },

        on: {
          render: ({ target }) => {
            listElement = target.element
          },
          destroy: () => {
            listElement = null
          },
          pointerdown: e => {
            e.preventDefault()
            cancelScheduledClose()
          }
        }
      }, suggestions.map((suggestion, index) => element('li', {
        attrs: {
          class: tokens`
            suggestion
            ${activeIndex.derive(i => i === index ? 'active' : '')}
          `
        },

        on: {
          pointerenter: () => (activeIndex.value = index),
          mousedown: event => event.preventDefault(),
          click: () => handleSelect(suggestion)
        }
      }, renderSuggestionContent(suggestion))))
    })}
  `)
}