"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFocusGroupId = exports.FocusContextConsumer = exports.FocusGroup = exports.FocusContext = void 0;
var tslib_1 = require("tslib");
var react_1 = (0, tslib_1.__importStar)(require("react"));
var context_1 = require("../focused-stack/context");
exports.FocusContext = (0, react_1.createContext)({
    focusGroupId: null,
});
function FocusGroup(props) {
    var focusedStack = (0, context_1.useFocusedStack)();
    var focusGroupId = (0, react_1.useMemo)(function () { return focusedStack.getGroupId(); }, [focusedStack]);
    var _a = (0, react_1.useState)(false), groupPushed = _a[0], setGroupPushed = _a[1];
    // Layout effect fires before rendering children to ensure that groups are
    // pushed before handlers are added
    (0, react_1.useLayoutEffect)(function groupLifecycle() {
        focusedStack.pushGroup(focusGroupId);
        setGroupPushed(true);
        return function () {
            focusedStack.removeGroup(focusGroupId);
            setGroupPushed(false);
        };
    }, [focusGroupId, focusedStack]);
    return (react_1.default.createElement(exports.FocusContext.Provider, { value: { focusGroupId: focusGroupId } }, groupPushed && props.children));
}
exports.FocusGroup = FocusGroup;
exports.FocusContextConsumer = exports.FocusContext.Consumer;
function useFocusGroupId() {
    var focusGroupId = (0, react_1.useContext)(exports.FocusContext).focusGroupId;
    return focusGroupId;
}
exports.useFocusGroupId = useFocusGroupId;
