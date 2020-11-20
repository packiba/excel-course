import {isEqual} from '@core/util'

export class StoreSubsciber {
  constructor(store) {
    this.store = store
    this.sub = null
    this.prevState = {}
  }

  subcribeComponents(components) {
    this.prevState = this.store.getState()
    this.sub = this.store.subscribe(state => {
      Object.keys(state).forEach(key => {
        if (!isEqual(this.prevState[key], state[key])) {
          components.forEach(component => {
            if (component.isWatching(key)) {
              const changes = {[key]: state[key]}
              component.storeChanged(changes)
            }
          })
        }
      })

      this.prevState = this.store.getState()
    })
  }

  unsubcribeFromStore() {
    this.sub.unsubscribe()
  }
}