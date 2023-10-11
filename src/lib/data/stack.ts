import { ReactNode } from "react"
import { AnimationType } from "../interfaces"

export interface IStack {
  readonly route: string
  readonly component: ReactNode
  readonly animation: AnimationType
}

class Stack implements IStack {
  readonly route: string
  readonly component: ReactNode
  readonly animation: AnimationType

  constructor({ route, component, animation }) {
    this.route = route
    this.component = component
    this.animation = typeof animation === 'undefined' ? AnimationType.None : animation
  }
}

export default Stack