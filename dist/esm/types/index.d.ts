import { AnimationType } from './interfaces';
import Route from './componets/route';
import Link from './componets/link';
import useStackRouter, { IStackRouter } from './hooks/useStackRouter';
import useStacks from './hooks/useStacks';
import { IStack } from './data/stack';
import './styles/main.scss';
declare const Index: ({ children }: {
    children: any;
}) => import("react/jsx-runtime").JSX.Element;
export { Route, Link, AnimationType, useStackRouter, IStackRouter, useStacks, IStack };
export default Index;
