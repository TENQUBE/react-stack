import { ReactNode } from 'react';
interface IProps {
    to: string;
    target?: string;
    children?: ReactNode;
}
declare const HybridLink: ({ to, target, children }: IProps) => import("react/jsx-runtime").JSX.Element;
export default HybridLink;
