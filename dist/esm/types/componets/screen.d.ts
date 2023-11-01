import { ReactElement } from 'react';
import { AnimationType } from '../interfaces';
interface IProps {
    route: string;
    component: ReactElement;
    animation?: AnimationType;
}
declare const Screen: ({ route, component, animation }: IProps) => any;
export default Screen;
