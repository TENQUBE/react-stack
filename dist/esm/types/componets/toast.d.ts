import { ReactElement } from 'react';
import { AnimationType } from '../interfaces';
interface IProps {
    route: string;
    component: ReactElement;
    animation?: AnimationType;
    className?: string;
}
declare const Toast: ({ route, component, className }: IProps) => any;
export default Toast;
