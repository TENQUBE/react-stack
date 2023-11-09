import { ReactElement } from 'react';
interface IProps {
    route: string;
    component: ReactElement;
    isExpandabled?: boolean;
    height?: number;
}
declare const BottomSheet: ({ route, component, isExpandabled, height }: IProps) => any;
export default BottomSheet;
