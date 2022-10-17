"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Layout = Layout;
var _react = _interopRequireDefault(require("react"));
var _components = require("@jsx-mail/components");
var _styledComponents = _interopRequireDefault(require("styled-components"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function Layout({
  children
}) {
  return /*#__PURE__*/_react.default.createElement(Container, null, /*#__PURE__*/_react.default.createElement(Body, null, children));
}
const Container = (0, _styledComponents.default)(_components.Group).withConfig({
  displayName: "file__Container"
})(["font-family:\"Segoe UI\",Tahoma,Geneva,Verdana,sans-serif;padding:20px 150px;background-color:#f7f7f7;@media (max-width:600px){padding:20px;}"]);
const Body = (0, _styledComponents.default)(_components.Group).withConfig({
  displayName: "file__Body"
})(["background-color:#fff;padding:20px;"]);