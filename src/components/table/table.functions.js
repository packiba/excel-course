import {colDecrease, colIncrease, rangeCols, rangeRows} from '@core/util'

export function shouldResize(event) {
  return event.target.dataset.resize
}

export function matrix($target, $current) {
  const target = $target.id(true)
  const current = $current.id(true)
  const rows = rangeRows(current.row, target.row)
  const cols = rangeCols(current.col, target.col)

  return rows.reduce((acc, row) => {
    cols.forEach(col => acc.push(`${col}:${row}`))
    return acc
  }, [])
}

export function nextSelector(key, {col, row}) {
  const MIN_ROW = 1
  const MIN_COL = 66
  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      row++
      break
    case 'Tab':
    case 'ArrowRight':
      col = colIncrease(col)
      break
    case 'ArrowLeft':
      col = (col.charCodeAt() < MIN_COL) ? 'A' : colDecrease(col)
      break
    case 'ArrowUp':
      row = row -1 < MIN_ROW ? MIN_ROW : row -1
  }

  return `[data-id="${col}:${row}"]`
}

