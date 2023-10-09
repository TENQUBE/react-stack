'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var react = require('react');

class Stack {
    constructor({ route, component, animation }) {
        this.route = route;
        this.component = component;
        this.animation = animation;
    }
}

exports.AnimationType = void 0;
(function (AnimationType) {
    AnimationType[AnimationType["None"] = 0] = "None";
    AnimationType[AnimationType["ToLeft"] = 1] = "ToLeft";
    AnimationType[AnimationType["Scale"] = 2] = "Scale";
})(exports.AnimationType || (exports.AnimationType = {}));

const HybridStackContext = react.createContext(null);
const HybridRoute = ({ route, component, animation }) => {
    const [stacks, setStacks] = react.useContext(HybridStackContext);
    react.useEffect(() => {
        setStacks([
            ...stacks,
            new Stack({ route, component, animation })
        ]);
    }, []);
    return null;
};
const HybridStackProvider = ({ children }) => {
    const [stacks, setStacks] = react.useState([]);
    react.useEffect(() => {
        console.log(stacks);
    }, [stacks]);
    return (jsxRuntime.jsx(HybridStackContext.Provider, { value: [stacks, setStacks], children: children }));
};

exports.HybridRoute = HybridRoute;
exports.default = HybridStackProvider;
//# sourceMappingURL=index.js.map
