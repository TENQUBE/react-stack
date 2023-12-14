import { ReactElement } from 'react'
import { AnimationType } from '../interfaces'

export interface IScreen {
  readonly route: string
  readonly component: ReactElement | null
  readonly animation: AnimationType
  readonly className?: string
  readonly useInitialAnimation: boolean
  pathVariable: unknown
  URIPath: string
  hash: string
  setPathVariable(pathVariable: unknown): void
  setURIPath(path: string): void
  setHash(hash: string): void
}

export interface IScreenParams {
  readonly route?: string | null
  readonly component?: ReactElement | null
  readonly animation?: AnimationType
  readonly useInitialAnimation?: boolean
  readonly className?: string
}

class Screen implements IScreen {
  readonly route: string
  readonly component: ReactElement | null
  readonly animation: AnimationType
  readonly className?: string
  readonly useInitialAnimation: boolean
  pathVariable: unknown
  URIPath: string
  hash: string

  constructor({ route, component, animation, useInitialAnimation, className }: IScreenParams) {
    this.route = route ? route : '*'
    this.component = component ? component : null
    this.animation = typeof animation === 'undefined' ? AnimationType.None : animation
    this.useInitialAnimation =
      typeof useInitialAnimation === 'undefined' ? true : useInitialAnimation
    if (className) this.className = className
    this.pathVariable = {}
  }

  static hashScreen(allPath: string) {
    const hash = allPath.split('#')[1]
    const hashStack = new Screen({ route: `#${hash}` })
    hashStack.setURIPath(allPath)
    hashStack.hash = hash
    return hashStack
  }

  setPathVariable(pathVariable: unknown) {
    this.pathVariable = pathVariable
  }

  setURIPath(path: string) {
    this.URIPath = path
  }

  setHash(hash: string) {
    this.hash = hash
  }
}

export default Screen
