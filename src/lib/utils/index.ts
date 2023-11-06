import { IScreen } from '../data/screen'

export const isHashRoute = (route: string | number): boolean => {
  return typeof route === 'string' && route[0] === '#'
}

enum PathSubDirectoryType {
  Static,
  Dynamic,
  Splat,
  NotFound
}

interface IPathSubDirectory {
  readonly type: PathSubDirectoryType
  readonly name: string | null
}

class PathSubDirectory implements IPathSubDirectory {
  readonly type: PathSubDirectoryType
  readonly name: string | null

  constructor(type: PathSubDirectoryType, name?: string) {
    this.type = type
    this.name = typeof name === 'undefined' ? null : name
  }
}

const explodeRouteSegments = (route: string): IPathSubDirectory[] => {
  if(route === '*') return [new PathSubDirectory(PathSubDirectoryType.Splat, '*')]
  const segments = route.split('/')
  const segmentNames = segments.slice(1, segments.length)

  return segmentNames.map((seg: string) => {
    if(seg === '*') return new PathSubDirectory(PathSubDirectoryType.Splat, '*')

    const isDynamic = seg.charAt(0) === ':'
    const directoryName = seg.replace(/^\:/, '')

    return new PathSubDirectory(
      isDynamic ? PathSubDirectoryType.Dynamic : PathSubDirectoryType.Static, 
      directoryName
    )
  })
}

const matchRoute = (paths: string[], matchData: IPathSubDirectory[]): { match: boolean; pathVariable: unknown } => {
  const pathVariable = {}
  for(let i=0; i<paths.length; i++) {
    const match = matchData[i]
    if(!match) {
      return {
        match: false,
        pathVariable
      }
    }
    if(match.type === PathSubDirectoryType.Splat) {
      return {
        match: true,
        pathVariable
      }
    }
    if(match.type === PathSubDirectoryType.Static && paths[i] !== match.name) {
      return {
        match: false,
        pathVariable
      }
    } 
    if(match.type === PathSubDirectoryType.Dynamic) {
      pathVariable[match.name] = paths[i]
    }
  }
  return {
    match: true,
    pathVariable
  }
}

export const matchRouteToPathname = (stacks: IScreen[], pathname: string) => {
  const matchData = stacks.map(({ route }) => explodeRouteSegments(route))
  const segments = pathname.split('#')[0].split('?')[0].split('/')
  const paths = segments.slice(1, segments.length)
  
  for(let i=0; i<matchData.length; i++) {
    const { match, pathVariable } = matchRoute(paths, matchData[i])
    if(match) {
      stacks[i].setPathVariable(pathVariable)
      stacks[i].setURIPath(pathname)
      stacks[i].setHash(pathname.split('#')[1])
      return stacks[i]
    }
  }    
}