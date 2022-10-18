"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VerifyEmail = VerifyEmail;
var _components = require("@jsx-mail/components");
var _react = _interopRequireDefault(require("react"));
var _Layout = require("../components/Layout");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function VerifyEmail({
  code
}) {
  return /*#__PURE__*/_react.default.createElement(_Layout.Layout, null, /*#__PURE__*/_react.default.createElement(_components.Group, {
    align: "center"
  }, /*#__PURE__*/_react.default.createElement("h1", null, "Verifica\xE7\xE3o de Email"), /*#__PURE__*/_react.default.createElement("p", null, "Este e-mail tem a finalidade de verificar o e-mail fornecido no site My Data For Followers. Se voc\xEA n\xE3o inseriu seu endere\xE7o de e-mail neste site, ignore esta mensagem e n\xE3o forne\xE7a o c\xF3digo abaixo a ningu\xE9m. No entanto, se voc\xEA mesmo digitou o endere\xE7o de e-mail, basta digitar o c\xF3digo abaixo no campo que apareceu no site ap\xF3s digitar seu e-mail."), /*#__PURE__*/_react.default.createElement("b", null, "C\xF3digo:"), /*#__PURE__*/_react.default.createElement(_components.Group, {
    align: "center"
  }, code), /*#__PURE__*/_react.default.createElement("p", null, "Lembre-se de n\xE3o compartilhar o c\xF3digo com ningu\xE9m e n\xE3o somos respons\xE1veis pelos resultados do compartilhamento deste c\xF3digo.")));
}