import { ReactNode } from 'react';
interface IProps {
    to: string;
    target?: string;
    state?: unknown;
    children?: ReactNode;
}
declare const HybridLink: ({ to, target, state, children }: IProps) => import("react/jsx-runtime").JSX.Element;
export default HybridLink;
