!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t=t||self).Mixture={})}(this,function(t){"use strict";function f(t,e){for(var n in e)e.hasOwnProperty(n)&&!t.hasOwnProperty(n)&&(t[n]=e[n]);if(2<arguments.length)for(var r=2;r<arguments.length;r++){var i=arguments[r];i&&f(t,i)}return t}function o(t){return Object.getPrototypeOf(t.prototype).constructor}function n(t,e){return Object.getPrototypeOf(t)===i?function(t,e){for(var n,r=0;r<t.length;r++)if(n=e(t[r],r))return n}(t,e):function(t,e){var n;for(var r in t)if(t.hasOwnProperty(r)&&(n=e(t[r],r)))return n}(t,e)}function r(t,e){return!n(t,function(t){return!e(t)})}function e(t){for(var e={},n={},r=1;r<arguments.length;r++)n[arguments[r]]=!0;for(var i in t)!n.hasOwnProperty(i)&&t.hasOwnProperty(i)&&(e[i]=t[i]);return e}function s(t,e,n){for(var r in e)if(e.hasOwnProperty(r)){var i=n(e[r],r);void 0===i||(t[r]=i)}return t}function a(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);if(2<arguments.length)for(var r=2;r<arguments.length;r++){var i=arguments[r];i&&a(t,i)}return t}function c(t){var e,n=!0;return function(){return n&&(n=!1,e=t.apply(this,arguments),t=null),e}}var i=Array.prototype,u=Date.prototype,l=Object.prototype;function p(t,e){if(t===e)return!1;if(t&&e&&"object"==typeof t&&"object"==typeof e){var n=Object.getPrototypeOf(t);if(n!==Object.getPrototypeOf(e))return!0;switch(n){case u:return+t!=+e;case i:return function(t,e){if(t.length!==e.length)return!0;for(var n=0;n<t.length;n++)if(p(t[n],e[n]))return!0;return!1}(t,e);case l:case null:return function(t,e){var n=Object.keys(t);if(n.length!==Object.keys(e).length)return!0;for(var r=0;r<n.length;r++){var i=n[r];if(!e.hasOwnProperty(i)||p(t[i],e[i]))return!0}return!1}(t,e)}}return!0}var h=Object.create(null);function v(t){var e=Object.create(h);return t?a(e,t):e}h.hasOwnProperty=l.hasOwnProperty;var y=Object.freeze({defaults:f,isValidJSON:function t(e){if(null===e)return!0;switch(typeof e){case"number":case"string":case"boolean":return!0;case"object":var n=Object.getPrototypeOf(e);if(n===Object.prototype||n===Array.prototype)return r(e,t)}return!1},getBaseClass:o,assignToClassProto:function(t,e){for(var n=[],r=2;r<arguments.length;r++)n[r-2]=arguments[r];for(var i=0,o=n;i<o.length;i++){var s=o[i],f=e[s];void 0===f||(t.prototype[s]=f)}},isEmpty:function(t){if(t)for(var e in t)if(t.hasOwnProperty(e))return!1;return!0},some:n,every:r,getPropertyDescriptor:function(t,e){for(var n,r=t;!n&&r;r=Object.getPrototypeOf(r))n=Object.getOwnPropertyDescriptor(r,e);return n},omit:e,transform:s,fastAssign:function(t,e){for(var n in e)t[n]=e[n];return t},fastDefaults:function(t,e){for(var n in e)void 0===t[n]&&(t[n]=e[n]);return t},assign:a,keys:function(t){return t?Object.keys(t):[]},once:c,notEqual:p,hashMap:v,compare:function(t,e){if(t==e)return 0;if(null==t)return-1;if(null==e)return 1;var n=t.valueOf(),r=e.valueOf();return n<r?-1:r<n?1:0}}),g=(d.prototype.merge=function(t){this.handlers=this.handlers.concat(t.handlers)},d.prototype.addEventsMap=function(t){for(var e in t)this.addEvent(e,t[e])},d.prototype.bubbleEvents=function(t){for(var e=0,n=t.split(R);e<n.length;e++){var r=n[e];this.addEvent(r,m(r))}},d.prototype.addEvent=function(t,e){for(var n=this.handlers,r=0,i=t.split(R);r<i.length;r++){var o=i[r];n.push(new O(o,e))}},d.prototype.subscribe=function(t,e){for(var n=0,r=this.handlers;n<r.length;n++){var i=r[n];w(e,i.name,i.callback,t)}},d.prototype.unsubscribe=function(t,e){for(var n=0,r=this.handlers;n<r.length;n++){var i=r[n];E(e,i.name,i.callback,t)}},d);function d(t){this.handlers=[],t&&(t instanceof d?this.handlers=t.handlers.slice():t&&this.addEventsMap(t))}var O=function(t,e){this.name=t,this.callback=!0===e?m(t):"string"==typeof e?function(){var t=this[e];t&&t.apply(this,arguments)}:e},b={};function m(o){return b[o]||(b[o]=function(t,e,n,r,i){void 0===r&&void 0===i||C(this,o,t,e,n,r,i),void 0!==n?D(this,o,t,e,n):k(this,o,t,e)})}var j=function(t,e,n){void 0===n&&(n=null),this.callback=t,this.context=e,this.next=n};function x(t,e,n,r){for(var i,o,s=t[e],f=s;f;f=f.next)n&&n!==f.callback&&n!==f.callback._callback||r&&r!==f.context?(o=f,i=i||f):o&&(o.next=f.next);s!==i&&(t[e]=i)}function _(t,e,n,r){for(var i=t;i;i=i.next)i.callback.call(i.context,e,n,r)}function w(t,e,n,r){if(n){var i=t._events||(t._events=Object.create(null));i[e]=new j(n,r,i[e])}}function P(t,e,n,r){if(n){var i=c(function(){E(t,e,i),n.apply(this,arguments)});i._callback=n,w(t,e,i,r)}}function E(t,e,n,r){var i=t._events;if(i)if(n||r)if(e)x(i,e,n,r);else for(var o in i)x(i,o,n,r);else e?i[e]=void 0:t._events=void 0}var R=/\s+/;function M(t,e,n,r,i){if(R.test(n))for(var o=0,s=n.split(R);o<s.length;o++){t(e,s[o],r,i)}else t(e,n,r,i)}function k(t,e,n,r){var i=t._events;if(i){var o=i[e],s=i.all;!function(t,e,n){for(var r=t;r;r=r.next)r.callback.call(r.context,e,n)}(o,n,r),_(s,e,n,r)}}function D(t,e,n,r,i){var o=t._events;if(o){var s=o[e],f=o.all;_(s,n,r,i),function(t,e,n,r,i){for(var o=t;o;o=o.next)o.callback.call(o.context,e,n,r,i)}(f,e,n,r,i)}}function C(t,e,n,r,i,o,s){var f=t._events;if(f){var a=f[e],c=f.all;!function(t,e,n,r,i,o){for(var s=t;s;s=s.next)s.callback.call(s.context,e,n,r,i,o)}(a,n,r,i,o,s),function(t,e,n,r,i,o,s){for(var f=t;f;f=f.next)f.callback.call(f.context,e,n,r,i,o,s)}(c,e,n,r,i,o,s)}}var T=Object.freeze({EventMap:g,EventDescriptor:O,EventHandler:j,on:w,once:P,off:E,strings:M,trigger2:k,trigger3:D,trigger5:C}),A=function(t,e){return(A=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)};function S(t,e){function n(){this.constructor=t}A(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}function L(t,e,n,r){var i,o=arguments.length,s=o<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,n,r);else for(var f=t.length-1;0<=f;f--)(i=t[f])&&(s=(o<3?i(s):3<o?i(e,n,s):i(e,n))||s);return 3<o&&s&&Object.defineProperty(e,n,s),s}var z=(N.define=function(t,e){void 0===t&&(t={});var n=o(this);e&&a(this,e);var r=t.mixins,i=function(t,e){var n={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.indexOf(r)<0&&(n[r]=t[r]);if(null!=t&&"function"==typeof Object.getOwnPropertySymbols){var i=0;for(r=Object.getOwnPropertySymbols(t);i<r.length;i++)e.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(t,r[i])&&(n[r[i]]=t[r[i]])}return n}(t,["mixins"]);return r&&this.mixins.merge(r),this.mixins.mergeObject(this.prototype,i,!0),this.mixins.mergeObject(this.prototype,this.mixins.getStaticDefinitions(n),!0),this.onDefine&&this.onDefine(this.mixins.definitions,n),this.mixins.mergeInheritedMembers(n),this},N.extend=function(t,e){var n,r;function i(){return null!==r&&r.apply(this,arguments)||this}return t&&t.hasOwnProperty("constructor")?S(n=t.constructor,this):(S(i,r=this),n=i),V(n),t&&n.define(t,e),n},N);function N(){}function V(t){var e=o(t);t.__super__=e.prototype,t.define||q.get(z).populate(t),q.get(t),t.onExtend&&t.onExtend(e)}function I(e){if("function"!=typeof e)return function(t){V(t),t.define(e)};V(e),e.define()}function J(n){return function(t){var e=q.get(t);e.definitionRules=f(v(),n,e.definitionRules)}}var q=(B.get=function(t){var e=t.mixins;return e&&t===e.Class?e:t.mixins=new B(t)},B.prototype.getStaticDefinitions=function(n){var t=v(),r=this.Class;return s(t,this.definitionRules,function(t,e){if(n[e]!==r[e])return r[e]})},B.prototype.merge=function(t){for(var e=this.Class.prototype,n=(this.mergeRules,this.appliedMixins=this.appliedMixins.slice()),r=0,i=t;r<i.length;r++){var o=i[r];if(Array.isArray(o))this.merge(o);else if(n.indexOf(o)<0)if(n.push(o),"function"==typeof o){this.mergeObject(this.Class,o);var s=o.mixins;s&&(this.mergeRules=f(v(),this.mergeRules,s.mergeRules),this.definitionRules=f(v(),this.definitionRules,s.definitionRules),this.appliedMixins=this.appliedMixins.concat(s.appliedMixins)),this.mergeObject(e,o.prototype)}else this.mergeObject(e,o)}},B.prototype.populate=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];for(var n=0,r=t;n<r.length;n++){var i=r[n];B.get(i).merge([this.Class])}},B.prototype.mergeObject=function(r,i,o){var s=this;!function(t,e){for(var n=F[typeof t],r=0,i=Object.getOwnPropertyNames(t);r<i.length;r++){var o=i[r];n[o]||e(o)}}(i,function(t){var e,n=Object.getOwnPropertyDescriptor(i,t);(e=s.definitionRules[t])&&G(s.definitions,t,n,e,o),e&&e!==H.protoValue||G(r,t,n,s.mergeRules[t],o)})},B.prototype.mergeInheritedMembers=function(t){var e=this.mergeRules,n=this.Class;if(e){var r=n.prototype,i=t.prototype;for(var o in e){var s=e[o];r.hasOwnProperty(o)&&o in i&&(r[o]=K(r[o],i[o],s))}}},B);function B(t){this.Class=t,this.definitions={};var e=o(t).mixins;this.mergeRules=e&&e.mergeRules||v(),this.definitionRules=e&&e.definitionRules||v(),this.appliedMixins=e&&e.appliedMixins||[]}var F={function:v({length:!0,prototype:!0,caller:!0,arguments:!0,name:!0,__super__:!0}),object:v({constructor:!0})};var H=function(n){return function(t){var e=q.get(t);e.mergeRules=f(n,e.mergeRules)}};function G(t,e,n,r,i){if(t.hasOwnProperty(e)){var o=Object.getOwnPropertyDescriptor(t,e);o.configurable&&"value"in o&&(t[e]=i?K(n.value,o.value,r):K(o.value,n.value,r))}else Object.defineProperty(t,e,n)}function K(t,e,n){return void 0===t?e:n&&void 0!==e?n(t,e):t}H.value=function(t,e){return t},H.protoValue=function(t,e){return t},H.merge=function(t,e){return f({},t,e)},H.pipe=function(e,n){return function(t){return e.call(this,n.call(this,t))}},H.defaults=function(t,e){return function(){return f(t.apply(this,arguments),e.apply(this,arguments))}},H.classFirst=function(t,e){return function(){t.apply(this,arguments),e.apply(this,arguments)}},H.classLast=function(t,e){return function(){e.apply(this,arguments),t.apply(this,arguments)}},H.every=function(t,e){return function(){return t.apply(this,arguments)&&e.apply(this,arguments)}},H.some=function(t,e){return function(){return t.apply(this,arguments)||e.apply(this,arguments)}};var Q=M,U=w,W=E,X=P,Y=C,Z=k,$=D,tt=0;function et(){return"l"+tt++}var nt=(rt.onDefine=function(t,e){var n=t.localEvents,r=t._localEvents,i=t.properties;if(n||r){var o=new g(this.prototype._localEvents);n&&o.addEventsMap(n),r&&o.merge(r),this.prototype._localEvents=o}i&&Object.defineProperties(this.prototype,s({},i,ot))},rt.prototype.initialize=function(){},rt.prototype.on=function(t,e,n){if("string"==typeof t)Q(U,this,t,e,n);else for(var r in t)Q(U,this,r,t[r],n||e);return this},rt.prototype.once=function(t,e,n){if("string"==typeof t)Q(X,this,t,e,n);else for(var r in t)Q(X,this,r,t[r],n||e);return this},rt.prototype.off=function(t,e,n){if(t)if("string"==typeof t)Q(W,this,t,e,n);else for(var r in t)Q(W,this,r,t[r],n||e);else W(this,void 0,e,n);return this},rt.prototype.trigger=function(t,e,n,r,i,o){return void 0!==i||void 0!==o?Y(this,t,e,n,r,i,o):void 0!==r?$(this,t,e,n,r):Z(this,t,e,n),this},rt.prototype.listenTo=function(t,e,n){return t&&(st(this,t),t.on(e,n||"object"!=typeof e?n:this,this)),this},rt.prototype.listenToOnce=function(t,e,n){return t&&(st(this,t),t.once(e,n||"object"!=typeof e?n:this,this)),this},rt.prototype.stopListening=function(t,e,n){var r=this._listeningTo;if(r){var i=!(e||n),o=n||"object"!=typeof e?n:this;if(t){var s=r[t.cid];s&&(i&&delete r[t.cid],s.off(e,o,this))}else if(null==t){for(var f in r)r[f].off(e,o,this);i&&(this._listeningTo=void 0)}}return this},rt.prototype.dispose=function(){this._disposed||(this.stopListening(),this.off(),this._disposed=!0)},rt=L([I,J({properties:H.merge,localEvents:H.merge})],rt));function rt(){this._events=void 0,this._listeningTo=void 0,this.cid=et(),this.initialize.apply(this,arguments)}var it=e(nt.prototype,"constructor","initialize");function ot(t){if(t)return"function"==typeof t?{get:t,configurable:!0}:t}function st(t,e){(t._listeningTo||(t._listeningTo=Object.create(null)))[e.cid||(e.cid=et())]=e}var ft,at="undefined"!=typeof process&&process.env&&"production"===process.env.NODE_ENV,ct=at?["error","info"]:["error","warn","debug","info","log"],ut=(S(lt,ft=nt),lt.prototype.logToConsole=function(o,s){return this.on(o,function(t,e,n){if(!s||s.test(t)){var r=["["+t+"] "+e];for(var i in n)r.push("\n\t"+i+":",pt(n[i]));console[o].apply(console,r)}})},lt.prototype.throwOn=function(t,r){return this.on(t,function(t,e,n){if(!r||r.test(t))throw new Error("["+t+"] "+e)})},lt.prototype.count=function(r,i){var o=this;return this.on(r,function(t,e,n){i&&!i.test(t)||(o.counter[r]=(o.counter[r]||0)+1)})},lt.prototype.on=function(t,e){return ft.prototype.on.call(this,t,e)},lt=L([I],lt));function lt(){var t=null!==ft&&ft.apply(this,arguments)||this;return t.counter={},t}var pt="undefined"==typeof window?function(t){if(t&&"object"==typeof t){var e=t.__inner_state__||t,n=Array.isArray(e)?"[ length = "+e.length+" ]":"{ "+Object.keys(e).join(", ")+" }";return t.constructor.name+" "+n}return JSON.stringify(t)}:function(t){return t},ht=new ut;if("undefined"!=typeof console)for(var vt=0,yt=ct;vt<yt.length;vt++){var gt=yt[vt];ht.logToConsole(gt)}var dt=new ut;dt.throwOn("error").throwOn("warn");var Ot=ht.trigger.bind(ht);t.EventMap=g,t.Events=it,t.Logger=ut,t.Messenger=nt,t.Mixable=z,t.MixinsState=q,t.define=I,t.definitionDecorator=function(i,o){return function(t,e){var n,r;q.get(t.constructor).mergeObject(t,((n={})[i]=((r={})[e]=o,r),n))}},t.definitions=J,t.eventsApi=T,t.isProduction=at,t.log=Ot,t.logEvents=ct,t.logger=ht,t.mixinRules=H,t.mixins=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return function(t){return q.get(t).merge(e)}},t.predefine=V,t.propertyListDecorator=function(n){return function(t,e){(t.hasOwnProperty(n)?t[n]:t[n]=(t[n]||[]).slice()).push(e)}},t.throwingLogger=dt,t.tools=y,Object.defineProperty(t,"__esModule",{value:!0})});
//# sourceMappingURL=index.js.map
