import {toInlineStyles} from '@core/util'
import {defaultStyles} from '@/constants'
import {parse} from '@core/parse'

const CODES = {
  A: 65,
  Z: 90
}

const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 20

function getWidth(state, col) {
  return (state[col] || DEFAULT_WIDTH) + 'px'
}

function getHeight(state, row) {
  return (state[row] || DEFAULT_HEIGHT) + 'px'
}

function getText(state, col, row) {
  const id = `${col}:${row + 1}`
  return state[id] || ''
}

function toCell(state, row) {
  return function(col) {
    const id = `${col}:${row + 1}`
    const width = getWidth(state.colState, col)
    const text = getText(state.dataState, col, row)
    const styles = toInlineStyles({
      ...defaultStyles,
      ...state.stylesState[id]
    })
    return `
      <div 
        class="cell" 
        contenteditable 
        data-type="cell"
        data-id="${id}" 
        data-value="${text || ''}"
        data-col="${col}"
        style="${styles}; width: ${width}"
      >
      ${parse(text)}
      </div>
    `
  }
}

function toColumn({col, width}) {
  return `
    <div 
      class="column" 
      data-type="resizable" 
      data-col="${col}" 
      style="width: ${width}"
    >
      ${col}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `
}

function createRow(state, content, rowNum = '') {
  const height = getHeight(state, rowNum)
  const resize = rowNum ?
    '<div class="row-resize" data-resize="row"></div>' : ''
  return `
    <div 
      class="row" 
      data-type="resizable" 
      data-row="${rowNum}" 
      style="height: ${height}">
        <div class="row-info">
            ${rowNum}
            ${resize}
        </div> 
        <div class="row-data">${content}</div> 
    </div>
  `
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

function withWidthFrom(state) {
  return function(col) {
    return {
      col, width: getWidth(state.colState, col)
    }
  }
}

export function createTable(rowsCount = 100, state = {}) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(withWidthFrom(state))
      .map(toColumn)
      .join('')


  rows.push(createRow(state, cols))
  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(toCell(state, row))
        .join('')
    rows.push(createRow(state.rowState, cells, row + 1))
  }

  return rows.join('')
}
