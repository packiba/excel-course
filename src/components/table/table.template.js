const CODES = {
  A: 65,
  Z: 90
}

function toCell(row) {
  return function(col) {
    return `
      <div 
        class="cell" 
        contenteditable 
        data-type="cell"
        data-id="${col}:${row + 1}" 
        data-col="${col}"
      ></div>
    `
  }
}

function toColumn(col) {
  return `
    <div class="column" data-type="resizable" data-col="${col}">
        ${col}
        <div class="col-resize" data-resize="col"></div>
    </div>
  `
}

function createRow(content, rowNum = '') {
  const resize = rowNum ?
    '<div class="row-resize" data-resize="row"></div>' : ''
  return `
    <div class="row" data-type="resizable" data-row="${rowNum}">
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

export function createTable(rowsCount = 100) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(toColumn)
      .join('')


  rows.push(createRow(cols))
  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(toCell(row))
        .join('')
    rows.push(createRow(cells, row + 1))
  }

  return rows.join('')
}
