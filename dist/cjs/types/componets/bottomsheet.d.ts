import { ReactElement } from 'react';
interface IProps {
    route: string;
    component: ReactElement;
    isExpandabled?: boolean;
    height?: number;
    className?: string;
}
declare const BottomSheet: ({ route, component, isExpandabled, height, className }: IProps) => any;
export default BottomSheet;
