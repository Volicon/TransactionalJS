"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var typeR=require("type-r"),extendStatics=function(t,e){return(extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(t,e)};function __extends(t,e){function r(){this.constructor=t}extendStatics(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)}var msDatePattern=/\/Date\(([0-9]+)\)\//,MicrosoftDateType=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return __extends(e,t),e.prototype.convert=function(t){if("string"==typeof t){var e=msDatePattern.exec(t);if(e)return new Date(Number(e[1]))}return typeR.DateType.prototype.convert.apply(this,arguments)},e.prototype.toJSON=function(t){return t&&"/Date("+t.getTime()+")/"},e}(typeR.DateType),TimestampType=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return __extends(e,t),e.prototype.toJSON=function(t){return t&&t.getTime()},e}(typeR.DateType),MicrosoftDate=new typeR.ChainableAttributeSpec({type:Date,_attribute:MicrosoftDateType}),Timestamp=new typeR.ChainableAttributeSpec({type:Date,_attribute:TimestampType});function Integer(t){return t?Math.round(t):0}Integer._attribute=typeR.NumericType;var urlPattern=/^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;function isUrl(t){return!t||urlPattern.test(t)}isUrl.error="Not valid URL";var Url=typeR.type(String).check(isUrl,void 0),ipPattern=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;function isIPAddress(t){return!t||ipPattern.test(t)}isIPAddress.error="Not valid IP address";var IPAddress=typeR.type(String).check(isIPAddress,void 0),emailPattern=/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;function isEmail(t){return!t||!!t.match(emailPattern)}isEmail.error="Not valid email";var Email=typeR.type(String).check(isEmail,void 0);exports.MicrosoftDateType=MicrosoftDateType,exports.TimestampType=TimestampType,exports.MicrosoftDate=MicrosoftDate,exports.Timestamp=Timestamp,exports.Integer=Integer,exports.isUrl=isUrl,exports.Url=Url,exports.isIPAddress=isIPAddress,exports.IPAddress=IPAddress,exports.isEmail=isEmail,exports.Email=Email;
//# sourceMappingURL=index.js.map