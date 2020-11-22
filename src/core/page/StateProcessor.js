import {debounce} from '@core/util'

export class StateProcessor {
  constructor(client, delay = 300) {
    this.client = client
    this.listen = debounce(this.listen.bind(this), delay)
  }

  listen(state) {
    this.saver.save(state)
  }

  get() {
    return this.client.get()
  }
}