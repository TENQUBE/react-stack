import { ReactElement } from 'react';
import { AnimationType } from '../interfaces';
interface IProps {
    route: string;
    component: ReactElement;
    animation?: AnimationType;
}
declare const Toast: ({ route, component }: IProps) => any;
export default Toast;
