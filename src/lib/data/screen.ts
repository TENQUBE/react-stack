import { ReactElement } from 'react'
import { AnimationType } from '../interfaces'

export interface IScreen {
  readonly route?: string
  readonly component?: ReactElement | null
  readonly animation?: AnimationType
  pathVariable: unknown
  setPathVariable(pathVariable: unknown): void
}

interface IScreenParams {
  readonly route?: string | null
  readonly component?: ReactElement | null
  readonly animation?: AnimationType
}

class Screen implements IScreen {
  readonly route: string
  readonly component?: ReactElement | null
  readonly animation?: AnimationType
  pathVariable: unknown

  constructor({ route, component, animation }: IScreenParams) {
    this.route = route ? route : '*'
    this.component = component ? component : null
    this.animation = typeof animation === 'undefined' ? AnimationType.None : animation
    this.pathVariable = {}
  }

  setPathVariable(pathVariable: unknown) {
    this.pathVariable = pathVariable
  }
}

export default Screen