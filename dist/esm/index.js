import { jsx } from 'react/jsx-runtime';
import { createContext, useContext, useEffect, useState } from 'react';

class Stack {
    constructor({ route, component, animation }) {
        this.route = route;
        this.component = component;
        this.animation = animation;
    }
}

var AnimationType;
(function (AnimationType) {
    AnimationType[AnimationType["None"] = 0] = "None";
    AnimationType[AnimationType["ToLeft"] = 1] = "ToLeft";
    AnimationType[AnimationType["Scale"] = 2] = "Scale";
})(AnimationType || (AnimationType = {}));

const HybridStackContext = createContext(null);
const HybridRoute = ({ route, component, animation }) => {
    const [stacks, setStacks] = useContext(HybridStackContext);
    useEffect(() => {
        setStacks([
            ...stacks,
            new Stack({ route, component, animation })
        ]);
    }, []);
    return null;
};
const HybridStackProvider = ({ children }) => {
    const [stacks, setStacks] = useState([]);
    useEffect(() => {
        console.log(stacks);
    }, [stacks]);
    return (jsx(HybridStackContext.Provider, { value: [stacks, setStacks], children: children }));
};

export { AnimationType, HybridRoute, HybridStackProvider as default };
//# sourceMappingURL=index.js.map
