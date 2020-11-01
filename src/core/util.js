export function capitalize(string) {
  if (typeof string !== 'string') {
    return ''
  }
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function rangeRows(start, end) {
  if (start > end) {
    [start, end] = [end, start]
  }
  return new Array(end - start +1)
      .fill('')
      .map((_, index) => start + index)
}

export function rangeCols(start, end) {
  start = start.charCodeAt() - 64
  end = end.charCodeAt() - 64
  if (start > end) {
    [start, end] = [end, start]
  }
  return new Array(end - start +1)
      .fill('')
      .map((_, index) => String.fromCharCode(start + index + 64))
}


export function colIncrease(col) {
  return String.fromCharCode(col.charCodeAt() + 1)
}

export function colDecrease(col) {
  return String.fromCharCode(col.charCodeAt() - 1)
}
