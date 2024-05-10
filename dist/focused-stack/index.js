"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FocusedStack = void 0;
var tslib_1 = require("tslib");
var key_handler_1 = require("../key-handler");
var FocusedStack = /** @class */ (function () {
    function FocusedStack(options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        this.getGroupId = function () {
            var key = _this.keyGenId;
            _this.keyGenId += 1;
            return key;
        };
        this.getKeyCodeFromEvent = function (e) {
            var key = e.code;
            var modifiers = [];
            if (e.altKey) {
                modifiers.push(key_handler_1.Modifier.Alt);
            }
            if (e.ctrlKey) {
                modifiers.push(key_handler_1.Modifier.Control);
            }
            if (e.metaKey) {
                modifiers.push(key_handler_1.Modifier.Meta);
            }
            if (e.shiftKey) {
                modifiers.push(key_handler_1.Modifier.Shift);
            }
            return "" + key + modifiers.join("-");
        };
        this.fireEvent = function (e) {
            if (_this.stack.length === 0) {
                return;
            }
            var key = _this.getKeyCodeFromEvent(e);
            var handlerGroup = _this.stack.reduce(function (acc, group) {
                if (acc === null) {
                    return group;
                }
                if (group.groupId > acc.groupId) {
                    return group;
                }
                return acc;
            }, null);
            if (!handlerGroup) {
                return;
            }
            var handlerObjects = handlerGroup.handlers[key];
            if (!handlerObjects) {
                _this.tearDown();
                return;
            }
            var target = e.target;
            var isContentEditable = target
                ? target.nodeName === "INPUT" ||
                    target.nodeName === "TEXTAREA" ||
                    target.isContentEditable
                : false;
            for (var _i = 0, handlerObjects_1 = handlerObjects; _i < handlerObjects_1.length; _i++) {
                var handlerObject = handlerObjects_1[_i];
                var isContentEditableAndShouldTrigger = isContentEditable && handlerObject.shouldTriggerInInputs;
                if (!isContentEditable || isContentEditableAndShouldTrigger) {
                    handlerObject.handler(e);
                }
            }
        };
        this.pushGroup = function (groupId) {
            var exists = _this.stack.find(function (group) { return group.groupId === groupId; });
            if (exists) {
                return;
            }
            _this.stack.push({
                groupId: groupId,
                handlers: {},
            });
        };
        this.registerTeardown = function (callback) {
            if (_this.teardownHandler === null) {
                _this.teardownHandler = callback;
            }
        };
        this.pushHandler = function (groupId, handler, trigger) {
            var key = _this.getKey(trigger);
            var found = _this.stack.find(function (thing) { return thing.groupId === groupId; });
            if (!found) {
                return;
            }
            var existingHandlers = found.handlers[key] || [];
            found.handlers[key] = (0, tslib_1.__spreadArray)((0, tslib_1.__spreadArray)([], existingHandlers, true), [
                {
                    handler: handler,
                    key: key,
                    shouldTriggerInInputs: trigger.shouldTriggerInInputs,
                },
            ], false);
        };
        this.removeAtIdAndTrigger = function (groupId, trigger, handler) {
            var handlerKey = _this.getKey(trigger);
            _this.stack = _this.stack.map(function (group) {
                var _a;
                if (group.groupId === groupId) {
                    var handlersAtKey = group.handlers[handlerKey] || [];
                    // eslint-disable-next-line no-param-reassign
                    group.handlers = (0, tslib_1.__assign)((0, tslib_1.__assign)({}, group.handlers), (_a = {}, _a[handlerKey] = handlersAtKey.filter(function (handlerObject) { return handlerObject.handler !== handler; }), _a));
                }
                return group;
            });
        };
        this.removeGroup = function (groupId) {
            _this.stack = _this.stack.filter(function (group) { return group.groupId !== groupId; });
        };
        this.getKey = function (trigger) {
            return "" + trigger.key + (trigger.modifiers ? trigger.modifiers.sort().join("-") : "");
        };
        this.tearDown = function () {
            var _a;
            (_a = _this.teardownHandler) === null || _a === void 0 ? void 0 : _a.call(_this);
            _this.teardownHandler = null;
        };
        this.startClock = function () {
            if (_this.clock) {
                clearTimeout(_this.clock);
            }
            _this.clock = window.setTimeout(function () {
                _this.tearDown();
            }, _this.timeout);
        };
        var _a = options.timeout, timeout = _a === void 0 ? 2000 : _a;
        this.keyGenId = 0;
        this.timeout = timeout;
        this.stack = [];
        this.teardownHandler = null;
        this.clock = null;
    }
    return FocusedStack;
}());
exports.FocusedStack = FocusedStack;
