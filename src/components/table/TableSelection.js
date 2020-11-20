export class TableSelection {
  static cellSelected = 'selected'

  constructor() {
    this.group = []
    this.current = null
  }

  select($el) {
    this.clearSelection()
    this.group.push($el)
    this.current = $el
    $el.focus().addClass(TableSelection.cellSelected)
  }

  clearSelection() {
    this.group.forEach(el => el.removeClass(TableSelection.cellSelected))
    this.group = []
  }

  get selectedIds() {
    return this.group.map($el => $el.id())
  }

  selectGroup($group = []) {
    this.clearSelection()
    this.group = $group
    this.group.forEach($el => $el.addClass(TableSelection.cellSelected))
  }

  applyStyle(style) {
    this.group.forEach($el => $el.css(style))
  }
}
