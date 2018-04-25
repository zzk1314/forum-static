'use strict'
import { pget, ppost } from '../../utils/request'

class RequestProxy {

  observer = {}

  addObserver (observer) {
    if (observer) {
      this.observer = observer
    }
  }

  async getProxy (url: string, query?: object) {
    if (this.observer && this.observer.startLoad && this.observer.endLoad && this.observer.alertMessage) {
      this.observer.startLoad()
      try {
        let res = await pget(url, query)
        this.observer.endLoad()
        if (res.code >= 200 && res.code <= 220) {
          return res
        } else {
          this.observer.alertMessage(res.msg)
        }
      } catch (e) {
        this.observer.endLoad()
        this.observer.alertMessage(e)
      }
    }
  }

  async postProxy (url: string, query?: object) {
    if (this.observer && this.observer.startLoad && this.observer.endLoad && this.observer.alertMessage) {
      this.observer.startLoad()
      try {
        let res = await ppost(url, query)
        this.observer.endLoad()
        if (res.code >= 200 && res.code <= 220) {
          return res
        } else {
          this.observer.alertMessage(res.msg)
        }
      } catch (e) {
        this.observer.endLoad()
        this.observer.alertMessage(e)
      }
    }
  }

  async alertMessage (message) {
    if (this.observer && this.observer.alertMessage) {
      this.observer.alertMessage(message)
    }
  }

}

let requestProxy = new RequestProxy()
export default requestProxy
