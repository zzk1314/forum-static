'use strict'
import { pget, ppost } from './request'

class RequestProxy {

  observer = {}

  addObserver (observer) {
    if (observer) {
      this.observer = observer
    }
  }

  async getProxy (url: string, query?: object) {
    if (this.observer && this.observer.startLoad && this.observer.endLoad) {
      this.observer.startLoad()
      try {
        let res = await pget(url, query)
        this.observer.endLoad()
        return res
      } catch (e) {
        this.observer.endLoad()
        this.observer.alertMessage(e)
      }
    }
  }

  async postProxy (url: string, query?: object) {
    if (this.observer && this.observer.startLoad && this.observer.endLoad) {
      this.observer.startLoad()
      try {
        let res = await ppost(url, query)
        this.observer.endLoad()
        return res
      } catch (e) {
        this.observer.endLoad()
        this.observer.alertMessage(e)
      }
    }
  }
}

let requestProxy = new RequestProxy()
export default requestProxy
