"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Provider = void 0;
var tslib_1 = require("tslib");
var react_1 = (0, tslib_1.__importDefault)(require("react"));
var context_1 = require("./focused-stack/context");
var focus_group_1 = require("./focus-group");
function Provider(_a) {
    var children = _a.children, timeout = _a.timeout;
    return (react_1.default.createElement(context_1.Provider, { timeout: timeout },
        react_1.default.createElement(focus_group_1.FocusGroup, null, children)));
}
exports.Provider = Provider;
