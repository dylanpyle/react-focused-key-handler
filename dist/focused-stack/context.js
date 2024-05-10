"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFocusedStack = exports.Provider = void 0;
var tslib_1 = require("tslib");
var react_1 = (0, tslib_1.__importStar)(require("react"));
var index_1 = require("./index");
var StackContext = (0, react_1.createContext)(null);
function Provider(props) {
    var children = props.children, FocusedStackOptions = (0, tslib_1.__rest)(props, ["children"]);
    var focusedStack = new index_1.FocusedStack(FocusedStackOptions);
    (0, react_1.useLayoutEffect)(function attachListenerToBody() {
        var handler = function (event) {
            focusedStack.fireEvent(event);
        };
        document.body.addEventListener("keydown", handler);
        return function () {
            document.body.removeEventListener("keydown", handler);
        };
    }, [focusedStack]);
    return (react_1.default.createElement(StackContext.Provider, { value: focusedStack }, children));
}
exports.Provider = Provider;
function useFocusedStack() {
    var focusedStack = (0, react_1.useContext)(StackContext);
    if (!focusedStack) {
        throw new Error("You must wrap KeyHandlers and FocusGroups in a Provider");
    }
    return focusedStack;
}
exports.useFocusedStack = useFocusedStack;
