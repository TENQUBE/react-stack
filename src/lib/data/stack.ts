import { ReactNode } from "react"
import { AnimationType } from "../interfaces"

export interface IStack {
  readonly id: string
  readonly route: string
  readonly component: ReactNode
  readonly animation: AnimationType
}


class Stack implements IStack {
  readonly id: string
  readonly route: string
  readonly component: ReactNode
  readonly animation: AnimationType

  constructor({ route, component, animation }) {
    this.route = route
    this.component = component
    this.animation = animation
  }
}

export default Stack