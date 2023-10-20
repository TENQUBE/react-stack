import { ReactNode } from 'react';
import { AnimationType } from '../interfaces';
interface IProps {
    route: string;
    component: ReactNode;
    animation?: AnimationType;
}
declare const Screen: ({ route, component, animation }: IProps) => any;
export default Screen;
