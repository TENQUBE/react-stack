import { ReactElement } from "react"
import { AnimationType } from "../interfaces"

export interface IStack {
  readonly route: string | null
  readonly component: ReactElement
  readonly animation: AnimationType
  pathVariable: unknown
  setPathVariable(pathVariable: unknown): void
}

class Stack implements IStack {
  readonly route: string | null
  readonly component: ReactElement
  readonly animation: AnimationType
  pathVariable: unknown

  constructor({ route, component, animation }) {
    this.route = route
    this.component = component
    this.animation = typeof animation === 'undefined' ? AnimationType.None : animation
    this.pathVariable = {}
  }

  setPathVariable(pathVariable: unknown) {
    this.pathVariable = pathVariable
  }
}

export default Stack