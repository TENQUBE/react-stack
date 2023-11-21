import { ReactElement } from 'react';
interface IProps {
    route: string;
    component: ReactElement;
    className?: string;
}
declare const Toast: ({ route, component, className }: IProps) => any;
export default Toast;
