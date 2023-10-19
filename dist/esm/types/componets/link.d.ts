import { ReactNode } from 'react';
interface IProps {
    to: string;
    target?: string;
    children?: ReactNode;
}
declare const Link: ({ to, target, children }: IProps) => import("react/jsx-runtime").JSX.Element;
export default Link;
