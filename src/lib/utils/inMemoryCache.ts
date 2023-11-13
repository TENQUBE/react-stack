import { IScreen } from "../data/screen"

class InMemoryCache {
  screens: IScreen[]
  historyIndex: number

  constructor() {
    this.screens = []
    this.historyIndex = 1
  }

  setScreens(screens: IScreen[]) {
    this.screens = screens
  }

  getScreens() {
    return this.screens
  }

  setHistoryIndex(index: number) {
    this.historyIndex = index
  }

  getHistoryIndex() {
    return this.historyIndex
  }
}

export default new InMemoryCache()