import { ReactElement } from 'react';
import { AnimationType } from '../interfaces';
interface IProps {
    route: string;
    component: ReactElement;
    animation?: AnimationType;
    useInitialAnimation?: boolean;
    className?: string;
}
declare const Screen: ({ route, component, animation, useInitialAnimation, className }: IProps) => any;
export default Screen;
