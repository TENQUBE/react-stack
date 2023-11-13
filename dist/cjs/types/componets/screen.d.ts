import { ReactElement } from 'react';
import { AnimationType } from '../interfaces';
interface IProps {
    route: string;
    component: ReactElement;
    animation?: AnimationType;
    className?: string;
}
declare const Screen: ({ route, component, animation, className }: IProps) => any;
export default Screen;
