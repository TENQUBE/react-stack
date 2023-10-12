export const parseToRoute = (route: string) => {
  return route.split('#')[0].split('?')[0]
}