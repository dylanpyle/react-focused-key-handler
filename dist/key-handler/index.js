"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyHandler = exports.Modifier = void 0;
var tslib_1 = require("tslib");
var react_1 = (0, tslib_1.__importStar)(require("react"));
var focus_group_1 = require("../focus-group");
var context_1 = require("../focused-stack/context");
var Modifier;
(function (Modifier) {
    Modifier["Meta"] = "Meta";
    Modifier["Shift"] = "Shift";
    Modifier["Control"] = "Control";
    Modifier["Alt"] = "Alt";
})(Modifier = exports.Modifier || (exports.Modifier = {}));
function KeyHandler(props) {
    var triggers = props.triggers, rest = (0, tslib_1.__rest)(props, ["triggers"]);
    var focusGroupId = (0, focus_group_1.useFocusGroupId)();
    var focusedStack = (0, context_1.useFocusedStack)();
    var _a = (0, react_1.useState)(false), shouldRenderChildren = _a[0], setShouldRenderChildren = _a[1];
    var handler = "handler" in rest ? rest.handler : null;
    var children = "children" in rest ? rest.children : null;
    var preventDefault = "preventDefault" in rest ? rest.preventDefault : false;
    (0, react_1.useLayoutEffect)(function handlerLifecycle() {
        if (focusGroupId === null) {
            return function () {
                /* consistent return type */
            };
        }
        var wrappedHandler = function (e) {
            if (preventDefault) {
                e.preventDefault();
            }
            if (handler) {
                handler(e);
                focusedStack.tearDown();
            }
            else {
                focusedStack.startClock();
                setShouldRenderChildren(true);
                focusedStack.registerTeardown(function () { return setShouldRenderChildren(false); });
            }
        };
        triggers.forEach(function (trigger) {
            return focusedStack.pushHandler(focusGroupId, wrappedHandler, trigger);
        });
        return function () {
            triggers.forEach(function (trigger) {
                return focusedStack.removeAtIdAndTrigger(focusGroupId, trigger, wrappedHandler);
            });
        };
    }, [focusedStack, focusGroupId, handler, triggers]);
    if (shouldRenderChildren) {
        return react_1.default.createElement(focus_group_1.FocusGroup, null, children);
    }
    return null;
}
exports.KeyHandler = KeyHandler;
