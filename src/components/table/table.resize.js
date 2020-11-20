import {$} from '@core/dom';

export function resizeHandler(event, component) {
  return new Promise(resolve => {
    const $resizer = $(event.target)
    const $parent = $resizer.closest('[data-type="resizable"]')
    const coords = $parent.getCoords()
    const type = $resizer.data.resize
    let value
    $resizer.css({
      opacity: 1
    })

    document.onmousemove = e => {
      if (type === 'col') {
        const delta = e.pageX - coords.right
        value = coords.width + delta
        $resizer.css({
          right: -delta + 'px',
          bottom: '-5000px'
        })
      } else {
        const delta = e.pageY - coords.bottom
        value = coords.height + delta
        $resizer.css({
          bottom: -delta + 'px',
          right: '-1920px'
        })
      }
    }

    document.onmouseup = () => {
      document.onmousemove = null
      document.onmouseup = null
      if (type === 'col') {
        $parent.css({width: value + 'px'})
        component.findAll(`[data-col="${$parent.data.col}"]`)
            .forEach(el => el.style.width = value + 'px')
      } else {
        $parent.css({height: `${value}px`})
      }

      resolve({
        type,
        value,
        id: $parent.data[type]
      })

      $resizer.css({
        opacity: 0,
        bottom: 0,
        right: 0
      })
    }
  })
}
