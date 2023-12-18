import Screen, { IScreenParams } from '../data/screen';
export declare const isHashRoute: (route: string | number) => boolean;
export declare const matchRouteToPathname: (stacks: IScreenParams[], pathname: string, id: string) => Screen;
