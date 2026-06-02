var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve6, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve6(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// node_modules/ltx/lib/escape.js
var require_escape = __commonJS({
  "node_modules/ltx/lib/escape.js"(exports) {
    "use strict";
    var escapeXMLTable = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&apos;"
    };
    function escapeXMLReplace(match) {
      return escapeXMLTable[match];
    }
    var unescapeXMLTable = {
      "&amp;": "&",
      "&lt;": "<",
      "&gt;": ">",
      "&quot;": '"',
      "&apos;": "'"
    };
    function unescapeXMLReplace(match) {
      if (match[1] === "#") {
        const num = match[2] === "x" ? parseInt(match.slice(3), 16) : parseInt(match.slice(2), 10);
        if (num === 9 || num === 10 || num === 13 || num >= 32 && num <= 55295 || num >= 57344 && num <= 65533 || num >= 65536 && num <= 1114111) {
          return String.fromCodePoint(num);
        }
        throw new Error("Illegal XML character 0x" + num.toString(16));
      }
      if (unescapeXMLTable[match]) {
        return unescapeXMLTable[match] || match;
      }
      throw new Error("Illegal XML entity " + match);
    }
    function escapeXML2(s) {
      return s.replace(/["&'<>]/g, escapeXMLReplace);
    }
    function unescapeXML2(s) {
      let result = "";
      let start = -1;
      let end = -1;
      let previous = 0;
      while ((start = s.indexOf("&", previous)) !== -1 && (end = s.indexOf(";", start + 1)) !== -1) {
        result = result + s.slice(previous, start) + unescapeXMLReplace(s.slice(start, end + 1));
        previous = end + 1;
      }
      if (previous === 0) return s;
      result = result + s.substring(previous);
      return result;
    }
    function escapeXMLText2(s) {
      return s.replace(/[&<>]/g, escapeXMLReplace);
    }
    function unescapeXMLText2(s) {
      return s.replace(/&(amp|#38|lt|#60|gt|#62);/g, unescapeXMLReplace);
    }
    exports.escapeXML = escapeXML2;
    exports.escapeXMLText = escapeXMLText2;
    exports.unescapeXML = unescapeXML2;
    exports.unescapeXMLText = unescapeXMLText2;
  }
});

// node_modules/ltx/lib/Element.js
var require_Element = __commonJS({
  "node_modules/ltx/lib/Element.js"(exports, module) {
    "use strict";
    var escape2 = require_escape();
    var Element3 = class _Element {
      constructor(name, attrs) {
        this.name = name;
        this.parent = null;
        this.children = [];
        this.attrs = {};
        this.setAttrs(attrs);
      }
      /* Accessors */
      /**
       * if (element.is('message', 'jabber:client')) ...
       **/
      is(name, xmlns) {
        return this.getName() === name && (!xmlns || this.getNS() === xmlns);
      }
      /* without prefix */
      getName() {
        const idx = this.name.indexOf(":");
        return idx >= 0 ? this.name.slice(idx + 1) : this.name;
      }
      /**
       * retrieves the namespace of the current element, upwards recursively
       **/
      getNS() {
        const idx = this.name.indexOf(":");
        if (idx >= 0) {
          const prefix = this.name.slice(0, idx);
          return this.findNS(prefix);
        }
        return this.findNS();
      }
      /**
       * find the namespace to the given prefix, upwards recursively
       **/
      findNS(prefix) {
        if (!prefix) {
          if (this.attrs.xmlns) {
            return this.attrs.xmlns;
          } else if (this.parent) {
            return this.parent.findNS();
          }
        } else {
          const attr = "xmlns:" + prefix;
          if (this.attrs[attr]) {
            return this.attrs[attr];
          } else if (this.parent) {
            return this.parent.findNS(prefix);
          }
        }
      }
      /**
       * Recursiverly gets all xmlns defined, in the form of {url:prefix}
       **/
      getXmlns() {
        let namespaces = {};
        if (this.parent) {
          namespaces = this.parent.getXmlns();
        }
        for (const attr in this.attrs) {
          const m = attr.match("xmlns:?(.*)");
          if (this.attrs.hasOwnProperty(attr) && m) {
            namespaces[this.attrs[attr]] = m[1];
          }
        }
        return namespaces;
      }
      setAttrs(attrs) {
        if (typeof attrs === "string") {
          this.attrs.xmlns = attrs;
        } else if (attrs) {
          Object.assign(this.attrs, attrs);
        }
      }
      /**
       * xmlns can be null, returns the matching attribute.
       **/
      getAttr(name, xmlns) {
        if (!xmlns) {
          return this.attrs[name];
        }
        const namespaces = this.getXmlns();
        if (!namespaces[xmlns]) {
          return null;
        }
        return this.attrs[[namespaces[xmlns], name].join(":")];
      }
      /**
       * xmlns can be null
       **/
      getChild(name, xmlns) {
        return this.getChildren(name, xmlns)[0];
      }
      /**
       * xmlns can be null
       **/
      getChildren(name, xmlns) {
        const result = [];
        for (const child of this.children) {
          if (child.getName && child.getName() === name && (!xmlns || child.getNS() === xmlns)) {
            result.push(child);
          }
        }
        return result;
      }
      /**
       * xmlns and recursive can be null
       **/
      getChildByAttr(attr, val, xmlns, recursive) {
        return this.getChildrenByAttr(attr, val, xmlns, recursive)[0];
      }
      /**
       * xmlns and recursive can be null
       **/
      getChildrenByAttr(attr, val, xmlns, recursive) {
        let result = [];
        for (const child of this.children) {
          if (child.attrs && child.attrs[attr] === val && (!xmlns || child.getNS() === xmlns)) {
            result.push(child);
          }
          if (recursive && child.getChildrenByAttr) {
            result.push(child.getChildrenByAttr(attr, val, xmlns, true));
          }
        }
        if (recursive) {
          result = result.flat();
        }
        return result;
      }
      getChildrenByFilter(filter, recursive) {
        let result = [];
        for (const child of this.children) {
          if (filter(child)) {
            result.push(child);
          }
          if (recursive && child.getChildrenByFilter) {
            result.push(child.getChildrenByFilter(filter, true));
          }
        }
        if (recursive) {
          result = result.flat();
        }
        return result;
      }
      getText() {
        let text2 = "";
        for (const child of this.children) {
          if (typeof child === "string" || typeof child === "number") {
            text2 += child;
          }
        }
        return text2;
      }
      getChildText(name, xmlns) {
        const child = this.getChild(name, xmlns);
        return child ? child.getText() : null;
      }
      /**
       * Return all direct descendents that are Elements.
       * This differs from `getChildren` in that it will exclude text nodes,
       * processing instructions, etc.
       */
      getChildElements() {
        return this.getChildrenByFilter((child) => {
          return child instanceof _Element;
        });
      }
      /* Builder */
      /** returns uppermost parent */
      root() {
        if (this.parent) {
          return this.parent.root();
        }
        return this;
      }
      /** just parent or itself */
      up() {
        if (this.parent) {
          return this.parent;
        }
        return this;
      }
      /** create child node and return it */
      c(name, attrs) {
        return this.cnode(new _Element(name, attrs));
      }
      cnode(child) {
        this.children.push(child);
        if (typeof child === "object") {
          child.parent = this;
        }
        return child;
      }
      append(...nodes) {
        for (const node of nodes) {
          this.children.push(node);
          if (typeof node === "object") {
            node.parent = this;
          }
        }
      }
      prepend(...nodes) {
        for (const node of nodes) {
          this.children.unshift(node);
          if (typeof node === "object") {
            node.parent = this;
          }
        }
      }
      /** add text node and return element */
      t(text2) {
        this.children.push(text2);
        return this;
      }
      /* Manipulation */
      /**
       * Either:
       *   el.remove(childEl)
       *   el.remove('author', 'urn:...')
       */
      remove(el, xmlns) {
        const filter = typeof el === "string" ? (child) => {
          return !(child.is && child.is(el, xmlns));
        } : (child) => {
          return child !== el;
        };
        this.children = this.children.filter(filter);
        return this;
      }
      text(val) {
        if (val && this.children.length === 1) {
          this.children[0] = val;
          return this;
        }
        return this.getText();
      }
      attr(attr, val) {
        if (typeof val !== "undefined" || val === null) {
          if (!this.attrs) {
            this.attrs = {};
          }
          this.attrs[attr] = val;
          return this;
        }
        return this.attrs[attr];
      }
      /* Serialization */
      toString() {
        let s = "";
        this.write((c) => {
          s += c;
        });
        return s;
      }
      _addChildren(writer) {
        writer(">");
        for (const child of this.children) {
          if (child != null) {
            if (child.write) {
              child.write(writer);
            } else if (typeof child === "string") {
              writer(escape2.escapeXMLText(child));
            } else if (child.toString) {
              writer(escape2.escapeXMLText(child.toString(10)));
            }
          }
        }
        writer("</");
        writer(this.name);
        writer(">");
      }
      write(writer) {
        writer("<");
        writer(this.name);
        for (const k in this.attrs) {
          const v = this.attrs[k];
          if (v != null) {
            writer(" ");
            writer(k);
            writer('="');
            writer(escape2.escapeXML(typeof v === "string" ? v : v.toString(10)));
            writer('"');
          }
        }
        if (this.children.length === 0) {
          writer("/>");
        } else {
          this._addChildren(writer);
        }
      }
    };
    Element3.prototype.tree = Element3.prototype.root;
    module.exports = Element3;
  }
});

// node_modules/ltx/lib/createElement.js
var require_createElement = __commonJS({
  "node_modules/ltx/lib/createElement.js"(exports, module) {
    "use strict";
    var Element3 = require_Element();
    function append(el, child) {
      if (Array.isArray(child)) {
        for (const c of child) append(el, c);
        return;
      }
      if (child === "" || child == null || child === true || child === false) {
        return;
      }
      el.cnode(child);
    }
    function createElement2(name, attrs, ...children) {
      if (typeof attrs === "object" && attrs !== null) {
        delete attrs.__source;
        delete attrs.__self;
        for (const [key, value] of Object.entries(attrs)) {
          if (value == null) delete attrs[key];
          else attrs[key] = value.toString(10);
        }
      }
      const el = new Element3(name, attrs);
      for (const child of children) {
        append(el, child);
      }
      return el;
    }
    module.exports = createElement2;
  }
});

// node_modules/ltx/lib/parsers/ltx.js
var require_ltx = __commonJS({
  "node_modules/ltx/lib/parsers/ltx.js"(exports, module) {
    "use strict";
    var events = __require("events");
    var escape2 = require_escape();
    var STATE_TEXT = 0;
    var STATE_IGNORE_COMMENT = 1;
    var STATE_IGNORE_INSTRUCTION = 2;
    var STATE_TAG_NAME = 3;
    var STATE_TAG = 4;
    var STATE_ATTR_NAME = 5;
    var STATE_ATTR_EQ = 6;
    var STATE_ATTR_QUOT = 7;
    var STATE_ATTR_VALUE = 8;
    var STATE_CDATA = 9;
    var STATE_IGNORE_CDATA = 10;
    var SaxLtx = class extends events.EventEmitter {
      constructor() {
        super();
        let state = STATE_TEXT;
        let remainder;
        let parseRemainder;
        let tagName;
        let attrs;
        let endTag;
        let selfClosing;
        let attrQuote;
        let attrQuoteChar;
        let recordStart = 0;
        let attrName;
        this._handleTagOpening = function _handleTagOpening(endTag2, tagName2, attrs2) {
          if (!endTag2) {
            this.emit("startElement", tagName2, attrs2);
            if (selfClosing) {
              this.emit("endElement", tagName2, true);
            }
          } else {
            this.emit("endElement", tagName2, false);
          }
        };
        this.write = function write(data) {
          if (typeof data !== "string") {
            data = data.toString();
          }
          let pos = 0;
          if (remainder) {
            data = remainder + data;
            pos += !parseRemainder ? remainder.length : 0;
            parseRemainder = false;
            remainder = null;
          }
          function endRecording() {
            if (typeof recordStart === "number") {
              const recorded = data.slice(recordStart, pos);
              recordStart = void 0;
              return recorded;
            }
          }
          for (; pos < data.length; pos++) {
            switch (state) {
              case STATE_TEXT: {
                const lt = data.indexOf("<", pos);
                if (lt !== -1 && pos !== lt) {
                  pos = lt;
                }
                break;
              }
              case STATE_ATTR_VALUE: {
                const quot = data.indexOf(attrQuoteChar, pos);
                if (quot !== -1) {
                  pos = quot;
                }
                break;
              }
              case STATE_IGNORE_COMMENT: {
                const endcomment = data.indexOf("-->", pos);
                if (endcomment !== -1) {
                  pos = endcomment + 2;
                }
                break;
              }
              case STATE_IGNORE_CDATA: {
                const endCDATA = data.indexOf("]]>", pos);
                if (endCDATA !== -1) {
                  pos = endCDATA + 2;
                }
                break;
              }
            }
            const c = data.charCodeAt(pos);
            switch (state) {
              case STATE_TEXT:
                if (c === 60) {
                  const text2 = endRecording();
                  if (text2) {
                    this.emit("text", escape2.unescapeXML(text2));
                  }
                  state = STATE_TAG_NAME;
                  recordStart = pos + 1;
                  attrs = {};
                }
                break;
              case STATE_CDATA:
                if (c === 93) {
                  if (data.substr(pos + 1, 2) === "]>") {
                    const cData = endRecording();
                    if (cData) {
                      this.emit("text", cData);
                    }
                    state = STATE_TEXT;
                  } else if (data.length < pos + 2) {
                    parseRemainder = true;
                    pos = data.length;
                  }
                }
                break;
              case STATE_TAG_NAME:
                if (c === 47 && recordStart === pos) {
                  recordStart = pos + 1;
                  endTag = true;
                } else if (c === 33) {
                  if (data.substr(pos + 1, 7) === "[CDATA[") {
                    recordStart = pos + 8;
                    state = STATE_CDATA;
                  } else if (data.length < pos + 8 && "[CDATA[".startsWith(data.slice(pos + 1))) {
                    parseRemainder = true;
                    pos = data.length;
                  } else {
                    recordStart = void 0;
                    state = STATE_IGNORE_COMMENT;
                  }
                } else if (c === 63) {
                  recordStart = void 0;
                  state = STATE_IGNORE_INSTRUCTION;
                } else if (c <= 32 || c === 47 || c === 62) {
                  tagName = endRecording();
                  pos--;
                  state = STATE_TAG;
                }
                break;
              case STATE_IGNORE_COMMENT:
                if (c === 62) {
                  const prevFirst = data.charCodeAt(pos - 1);
                  const prevSecond = data.charCodeAt(pos - 2);
                  if (prevFirst === 45 && prevSecond === 45 || prevFirst === 93 && prevSecond === 93) {
                    state = STATE_TEXT;
                  }
                }
                break;
              case STATE_IGNORE_INSTRUCTION:
                if (c === 62) {
                  const prev = data.charCodeAt(pos - 1);
                  if (prev === 63) {
                    state = STATE_TEXT;
                  }
                }
                break;
              case STATE_TAG:
                if (c === 62) {
                  this._handleTagOpening(endTag, tagName, attrs);
                  tagName = void 0;
                  attrs = void 0;
                  endTag = void 0;
                  selfClosing = void 0;
                  state = STATE_TEXT;
                  recordStart = pos + 1;
                } else if (c === 47) {
                  selfClosing = true;
                } else if (c > 32) {
                  recordStart = pos;
                  state = STATE_ATTR_NAME;
                }
                break;
              case STATE_ATTR_NAME:
                if (c <= 32 || c === 61) {
                  attrName = endRecording();
                  pos--;
                  state = STATE_ATTR_EQ;
                }
                break;
              case STATE_ATTR_EQ:
                if (c === 61) {
                  state = STATE_ATTR_QUOT;
                }
                break;
              case STATE_ATTR_QUOT:
                if (c === 34 || c === 39) {
                  attrQuote = c;
                  attrQuoteChar = c === 34 ? '"' : "'";
                  state = STATE_ATTR_VALUE;
                  recordStart = pos + 1;
                }
                break;
              case STATE_ATTR_VALUE:
                if (c === attrQuote) {
                  const value = escape2.unescapeXML(endRecording());
                  attrs[attrName] = value;
                  attrName = void 0;
                  state = STATE_TAG;
                }
                break;
            }
          }
          if (typeof recordStart === "number" && recordStart <= data.length) {
            remainder = data.slice(recordStart);
            recordStart = 0;
          }
        };
      }
      end(data) {
        if (data) {
          this.write(data);
        }
        this.write = function write() {
        };
      }
    };
    module.exports = SaxLtx;
  }
});

// node_modules/koa-compose/index.js
var require_koa_compose = __commonJS({
  "node_modules/koa-compose/index.js"(exports, module) {
    "use strict";
    module.exports = compose2;
    function compose2(middleware2) {
      if (!Array.isArray(middleware2)) throw new TypeError("Middleware stack must be an array!");
      for (const fn of middleware2) {
        if (typeof fn !== "function") throw new TypeError("Middleware must be composed of functions!");
      }
      return function(context, next) {
        let index = -1;
        return dispatch(0);
        function dispatch(i) {
          if (i <= index) return Promise.reject(new Error("next() called multiple times"));
          index = i;
          let fn = middleware2[i];
          if (i === middleware2.length) fn = next;
          if (!fn) return Promise.resolve();
          try {
            return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
          } catch (err) {
            return Promise.reject(err);
          }
        }
      };
    }
  }
});

// node_modules/saslmechanisms/lib/factory.js
var require_factory = __commonJS({
  "node_modules/saslmechanisms/lib/factory.js"(exports, module) {
    (function(root, factory) {
      if (typeof exports === "object") {
        factory(exports, module);
      } else if (typeof define === "function" && define.amd) {
        define(["exports", "module"], factory);
      }
    })(exports, function(exports2, module2) {
      function Factory() {
        this._mechs = [];
      }
      Factory.prototype.use = function(name, mech4) {
        if (!mech4) {
          mech4 = name;
          name = mech4.prototype.name;
        }
        this._mechs.push({ name, mech: mech4 });
        return this;
      };
      Factory.prototype.create = function(mechs) {
        for (var i = 0, len = this._mechs.length; i < len; i++) {
          for (var j2 = 0, jlen = mechs.length; j2 < jlen; j2++) {
            var entry = this._mechs[i];
            if (entry.name == mechs[j2]) {
              return new entry.mech();
            }
          }
        }
        return null;
      };
      exports2 = module2.exports = Factory;
    });
  }
});

// node_modules/saslmechanisms/main.js
var require_main = __commonJS({
  "node_modules/saslmechanisms/main.js"(exports, module) {
    (function(root, factory) {
      if (typeof exports === "object") {
        factory(
          exports,
          module,
          require_factory()
        );
      } else if (typeof define === "function" && define.amd) {
        define([
          "exports",
          "module",
          "./lib/factory"
        ], factory);
      }
    })(exports, function(exports2, module2, Factory) {
      exports2 = module2.exports = Factory;
      exports2.Factory = Factory;
    });
  }
});

// node_modules/sasl-scram-sha-1/lib/bitops.js
var require_bitops = __commonJS({
  "node_modules/sasl-scram-sha-1/lib/bitops.js"(exports) {
    exports.XOR = function(a, b) {
      var res = [];
      if (a.length > b.length) {
        for (var i = 0; i < b.length; i++) {
          res.push(a[i] ^ b[i]);
        }
      } else {
        for (var j2 = 0; j2 < a.length; j2++) {
          res.push(a[j2] ^ b[j2]);
        }
      }
      return new Uint8Array(res);
    };
    exports.H = function(text2) {
      return __async(this, null, function* () {
        return new Uint8Array(
          yield crypto.subtle.digest("SHA-1", text2)
        );
      });
    };
    exports.HMAC = function(key, msg) {
      return __async(this, null, function* () {
        const hmac = yield crypto.subtle.importKey(
          "raw",
          key,
          // https://developer.mozilla.org/en-US/docs/Web/API/HmacImportParams
          { name: "HMAC", hash: "SHA-1" },
          false,
          // extractable
          ["sign"]
        );
        return new Uint8Array(yield crypto.subtle.sign(
          "HMAC",
          hmac,
          msg
        ));
      });
    };
    exports.Hi = function(text2, salt, iterations) {
      return __async(this, null, function* () {
        const key = new TextEncoder().encode(text2);
        var concat = new Uint8Array(salt.length + 4);
        concat.set(salt);
        concat.set(new Uint8Array([0, 0, 0, 1]), salt.length);
        var ui1 = yield exports.HMAC(key, concat);
        var ui = ui1;
        for (var i = 0; i < iterations - 1; i++) {
          ui1 = yield exports.HMAC(key, ui1);
          ui = exports.XOR(ui, ui1);
        }
        return ui;
      });
    };
  }
});

// node_modules/sasl-scram-sha-1/lib/utils.js
var require_utils = __commonJS({
  "node_modules/sasl-scram-sha-1/lib/utils.js"(exports) {
    exports.parse = function(chal) {
      var dtives = {};
      var tokens = chal.split(/,(?=(?:[^"]|"[^"]*")*$)/);
      for (var i = 0, len = tokens.length; i < len; i++) {
        var dtiv = /(\w+)=["]?([^"]+)["]?$/.exec(tokens[i]);
        if (dtiv) {
          dtives[dtiv[1]] = dtiv[2];
        }
      }
      return dtives;
    };
    exports.saslname = function(name) {
      var escaped = [];
      var curr = "";
      for (var i = 0; i < name.length; i++) {
        curr = name[i];
        if (curr === ",") {
          escaped.push("=2C");
        } else if (curr === "=") {
          escaped.push("=3D");
        } else {
          escaped.push(curr);
        }
      }
      return escaped.join("");
    };
    exports.genNonce = function(len) {
      const bytes = new Uint8Array((len || 32) / 2);
      crypto.getRandomValues(bytes);
      return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
    };
  }
});

// node_modules/sasl-scram-sha-1/index.js
var require_sasl_scram_sha_1 = __commonJS({
  "node_modules/sasl-scram-sha-1/index.js"(exports, module) {
    var bitops = require_bitops();
    var utils = require_utils();
    var RESP = {};
    var CLIENT_KEY = new TextEncoder().encode("Client Key");
    var SERVER_KEY = new TextEncoder().encode("Server Key");
    function base64decode(s) {
      if (atob) {
        return Uint8Array.from(atob(s), function(c) {
          return c.charCodeAt(0);
        });
      } else {
        return Uint8Array.from(Buffer.from(s, "base64"));
      }
    }
    function base64encode(s) {
      if (btoa) {
        return btoa(s);
      } else {
        return Buffer.from(s).toString("base64");
      }
    }
    function Mechanism2(options) {
      options = options || {};
      this._genNonce = options.genNonce || utils.genNonce;
      this._stage = "initial";
    }
    Mechanism2.Mechanism = Mechanism2;
    Mechanism2.prototype.name = "SCRAM-SHA-1";
    Mechanism2.prototype.clientFirst = true;
    Mechanism2.prototype.response = function(cred) {
      return RESP[this._stage](this, cred);
    };
    Mechanism2.prototype.challenge = function(chal) {
      var values = utils.parse(chal);
      this._salt = base64decode(values.s || "");
      this._iterationCount = parseInt(values.i, 10);
      this._nonce = values.r;
      this._verifier = values.v;
      this._error = values.e;
      this._challenge = chal;
      return this;
    };
    RESP.initial = function(mech4, cred) {
      mech4._cnonce = mech4._genNonce();
      var authzid = "";
      if (cred.authzid) {
        authzid = "a=" + utils.saslname(cred.authzid);
      }
      mech4._gs2Header = "n," + authzid + ",";
      var nonce = "r=" + mech4._cnonce;
      var username = "n=" + utils.saslname(cred.username || "");
      mech4._clientFirstMessageBare = username + "," + nonce;
      var result = mech4._gs2Header + mech4._clientFirstMessageBare;
      mech4._stage = "challenge";
      return result;
    };
    RESP.challenge = function(mech4, cred) {
      return __async(this, null, function* () {
        var gs2Header = base64encode(mech4._gs2Header);
        mech4._clientFinalMessageWithoutProof = "c=" + gs2Header + ",r=" + mech4._nonce;
        var saltedPassword, clientKey, serverKey;
        if (cred.salt && cred.salt.every(function(value, index) {
          return value === mech4._salt[index];
        })) {
          if (cred.clientKey && cred.serverKey) {
            clientKey = cred.clientKey;
            serverKey = cred.serverKey;
          } else if (cred.saltedPassword) {
            saltedPassword = cred.saltedPassword;
            clientKey = yield bitops.HMAC(saltedPassword, CLIENT_KEY);
            serverKey = yield bitops.HMAC(saltedPassword, SERVER_KEY);
          }
        } else {
          saltedPassword = yield bitops.Hi(cred.password || "", mech4._salt, mech4._iterationCount);
          clientKey = yield bitops.HMAC(saltedPassword, CLIENT_KEY);
          serverKey = yield bitops.HMAC(saltedPassword, SERVER_KEY);
        }
        var storedKey = yield bitops.H(clientKey);
        var authMessage = new TextEncoder().encode(mech4._clientFirstMessageBare + "," + mech4._challenge + "," + mech4._clientFinalMessageWithoutProof);
        var clientSignature = yield bitops.HMAC(storedKey, authMessage);
        var clientProof = base64encode(String.fromCharCode.apply(null, bitops.XOR(clientKey, clientSignature)));
        mech4._serverSignature = yield bitops.HMAC(serverKey, authMessage);
        var result = mech4._clientFinalMessageWithoutProof + ",p=" + clientProof;
        mech4._stage = "final";
        mech4.cache = {
          salt: mech4._salt,
          saltedPassword,
          clientKey,
          serverKey
        };
        return result;
      });
    };
    RESP.final = function() {
      return "";
    };
    module.exports = Mechanism2;
  }
});

// node_modules/sasl-plain/lib/mechanism.js
var require_mechanism = __commonJS({
  "node_modules/sasl-plain/lib/mechanism.js"(exports, module) {
    (function(root, factory) {
      if (typeof exports === "object") {
        factory(exports, module);
      } else if (typeof define === "function" && define.amd) {
        define(["exports", "module"], factory);
      }
    })(exports, function(exports2, module2) {
      function Mechanism2() {
      }
      Mechanism2.prototype.name = "PLAIN";
      Mechanism2.prototype.clientFirst = true;
      Mechanism2.prototype.response = function(cred) {
        var str = "";
        str += cred.authzid || "";
        str += "\0";
        str += cred.username;
        str += "\0";
        str += cred.password;
        return str;
      };
      Mechanism2.prototype.challenge = function(chal) {
        return this;
      };
      exports2 = module2.exports = Mechanism2;
    });
  }
});

// node_modules/sasl-plain/main.js
var require_main2 = __commonJS({
  "node_modules/sasl-plain/main.js"(exports, module) {
    (function(root, factory) {
      if (typeof exports === "object") {
        factory(
          exports,
          module,
          require_mechanism()
        );
      } else if (typeof define === "function" && define.amd) {
        define([
          "exports",
          "module",
          "./lib/mechanism"
        ], factory);
      }
    })(exports, function(exports2, module2, Mechanism2) {
      exports2 = module2.exports = Mechanism2;
      exports2.Mechanism = Mechanism2;
    });
  }
});

// node_modules/sasl-anonymous/lib/mechanism.js
var require_mechanism2 = __commonJS({
  "node_modules/sasl-anonymous/lib/mechanism.js"(exports, module) {
    (function(root, factory) {
      if (typeof exports === "object") {
        factory(exports, module);
      } else if (typeof define === "function" && define.amd) {
        define(["exports", "module"], factory);
      }
    })(exports, function(exports2, module2) {
      function Mechanism2() {
      }
      Mechanism2.prototype.name = "ANONYMOUS";
      Mechanism2.prototype.clientFirst = true;
      Mechanism2.prototype.response = function(cred) {
        return cred.trace || "";
      };
      Mechanism2.prototype.challenge = function(chal) {
      };
      exports2 = module2.exports = Mechanism2;
    });
  }
});

// node_modules/sasl-anonymous/main.js
var require_main3 = __commonJS({
  "node_modules/sasl-anonymous/main.js"(exports, module) {
    (function(root, factory) {
      if (typeof exports === "object") {
        factory(
          exports,
          module,
          require_mechanism2()
        );
      } else if (typeof define === "function" && define.amd) {
        define([
          "exports",
          "module",
          "./lib/mechanism"
        ], factory);
      }
    })(exports, function(exports2, module2, Mechanism2) {
      exports2 = module2.exports = Mechanism2;
      exports2.Mechanism = Mechanism2;
    });
  }
});

// src/bootstrap.ts
import path from "path";
import { EventEmitter } from "events";
var bootstrap = {
  isReady: true,
  ratelimits: {},
  session_xmpp: null,
  database: null,
  cron: null,
  listener: new EventEmitter(),
  ansi_colors: {
    RED: `\x1B[31m`,
    GREEN: `\x1B[32m`,
    YELLOW: `\x1B[33m`,
    BLUE: `\x1B[34m`,
    MAGENTA: `\x1B[35m`,
    CYAN: `\x1B[36m`,
    WHITE: `\x1B[37m`,
    RESET: `\x1B[0m`
  },
  cache: {
    lastStanza: null,
    lastConnect: null,
    isConnected: false,
    isReconnecting: false,
    tReconnects: 0,
    sigHault: false,
    events: { type: "FeatureCollection", features: [] },
    nodes: { type: "FeatureCollection", features: [] },
    hashes: []
  },
  settings: {
    Database: path.join(process.cwd(), "shapefiles.db"),
    EnableWireService: true,
    EnableJournal: true,
    NOAAWeatherWireServiceSettings: {
      ReconnectionSettings: {
        Enabled: true,
        ReconnectionInterval: 60
      },
      CredentialSettings: {
        Username: null,
        Password: null,
        Nickname: "@atmosx/event-product-parser/3.0"
      },
      CacheSettings: {
        Enabled: true,
        MaxDatabaseHistory: 5e3,
        MaxRetentionHistory: 1e3
      },
      StanzaSettings: {
        DisableUGC: false,
        DisableVTEC: false,
        DisableText: false
      }
    },
    NationalWeatherServiceSettings: {
      CallbackInterval: 15,
      EventsEndpoint: `https://api.weather.gov/alerts/active`
    },
    GlobalSettings: {
      BetterEventNames: true,
      DisableGeometryParsing: false,
      UseShapefileCoordinates: false,
      ShapefileSkipPoints: 15,
      NodeTTL: 60,
      NodeMinDistance: 120,
      EventFiltering: {
        ListeningEvents: [],
        ListeningICAO: [],
        IgnoredICAO: [],
        IgnoredEvents: [`Xx`, `Test Message`],
        ListeningUGC: [],
        ListeningStates: [],
        NodeLocationFiltering: false,
        IgnoreTestProducts: true
      },
      EASSettings: {
        ArchiveDirectory: null,
        IntroWavFile: null
      }
    }
  }
};

// src/@modules/@utilities/utilities.setSettings.ts
var setSettings = (newSettings) => {
  const settings = bootstrap.settings;
  const merge = (target, source) => {
    for (const key in source) {
      if (!Object.prototype.hasOwnProperty.call(source, key)) continue;
      const srcVal = source[key];
      const tgtVal = target[key];
      if (srcVal && typeof srcVal === "object" && !Array.isArray(srcVal)) {
        if (!tgtVal || typeof tgtVal !== "object" || Array.isArray(tgtVal)) {
          target[key] = {};
        }
        merge(target[key], srcVal);
      } else {
        target[key] = srcVal;
      }
    }
  };
  merge(settings, newSettings);
  return settings;
};

// src/@modules/@utilities/utilities.getSettings.ts
var getSettings = () => {
  return bootstrap.settings;
};

// src/@parsers/@ugc/ugc.coordinates.ts
import { union } from "polygon-clipping";
var getZonePolygon = (options) => {
  const list = [...new Set(options.zones.map((z) => z.trim()))].filter((z) => z === "XX000" ? false : true);
  if (list.length === 0) return null;
  const placeholders = list.map(() => "?").join(",");
  const rows = bootstrap.database.prepare(`SELECT geometry FROM shapefiles WHERE id IN (${placeholders})`).all(...list);
  const polygons = [];
  for (const row of rows) {
    if (!(row == null ? void 0 : row.geometry)) continue;
    const geom = JSON.parse(row.geometry);
    if ((geom == null ? void 0 : geom.type) === "Polygon") {
      polygons.push(geom.coordinates);
    }
  }
  if (polygons.length === 0) return null;
  if (options.isUnion) {
    const unionFn = union;
    const mergedCoords = unionFn(...polygons);
    if (!mergedCoords || mergedCoords.length === 0) return null;
    let maxArea = -1;
    let bestPoly = [];
    for (const poly of mergedCoords) {
      const outerRing2 = poly[0];
      let area = 0;
      for (let i = 0; i < outerRing2.length - 1; i++) {
        const [x1, y1] = outerRing2[i];
        const [x2, y2] = outerRing2[i + 1];
        area += x1 * y2 - x2 * y1;
      }
      area = Math.abs(area / 2);
      if (area > maxArea) {
        maxArea = area;
        bestPoly = poly;
      }
    }
    if (!bestPoly || bestPoly.length === 0) return null;
    const outerRing = bestPoly[0];
    const skip = Math.max(1, parseInt(String(bootstrap.settings.GlobalSettings.ShapefileSkipPoints), 10) || 1);
    let skipped = outerRing.filter((_, idx) => idx % skip === 0);
    if (skipped.length < 4) {
      skipped = outerRing.slice();
    }
    const first = skipped[0];
    const last = skipped[skipped.length - 1];
    if (!first || !last || first[0] !== last[0] || first[1] !== last[1]) {
      skipped.push([first[0], first[1]]);
    }
    return { type: "Polygon", coordinates: [skipped] };
  } else {
    const multi = [];
    for (const polyCoords of polygons) {
      if (Array.isArray(polyCoords) && Array.isArray(polyCoords[0])) {
        multi.push(polyCoords);
      }
    }
    if (multi.length === 0) return null;
    const skip = Math.max(1, parseInt(String(bootstrap.settings.GlobalSettings.ShapefileSkipPoints), 10) || 1);
    if (skip > 1) {
      for (let p = 0; p < multi.length; p++) {
        for (let r = 0; r < multi[p].length; r++) {
          const ring = multi[p][r];
          let reduced = ring.filter((_, i) => i % skip === 0);
          if (reduced.length < 4) reduced = ring.slice();
          const first = reduced[0];
          const last = reduced[reduced.length - 1];
          if (first && last && (first[0] !== last[0] || first[1] !== last[1])) {
            reduced.push([first[0], first[1]]);
          }
          multi[p][r] = reduced;
        }
      }
    }
    return { type: "MultiPolygon", coordinates: multi };
  }
};

// src/@building/building.geometry.ts
var getEventGeometry = (event) => __async(null, null, function* () {
  var _a, _b, _c, _d, _e, _f;
  const settings = getSettings();
  const generated = (_c = (_b = (_a = event == null ? void 0 : event.properties) == null ? void 0 : _a.geocode) == null ? void 0 : _b.polygon) != null ? _c : null;
  const ugc2 = (_f = (_e = (_d = event == null ? void 0 : event.properties) == null ? void 0 : _d.geocode) == null ? void 0 : _e.ugc) != null ? _f : null;
  let geo = {
    type: `Polygon`,
    coordinates: generated != null ? JSON.parse(Buffer.from(generated, "base64").toString("utf-8")) : null
  };
  if (settings.GlobalSettings.UseShapefileCoordinates && generated == null && ugc2 != null) {
    geo = yield getZonePolygon({ zones: ugc2, isUnion: false });
  }
  return geo;
});

// src/@building/building.clean.ts
var getCleanedEvent = (event) => {
  for (const key of Object.keys(event)) {
    const value = event[key];
    if (value === null || value === void 0) {
      delete event[key];
    } else if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      event[key] = getCleanedEvent(value);
    }
  }
  return event;
};

// src/@modules/@utilities/utilities.setTimeoutAction.ts
var setTimeoutAction = (options) => {
  var _a, _b;
  let target = (_b = (_a = bootstrap) == null ? void 0 : _a.ratelimits) == null ? void 0 : _b[options == null ? void 0 : options.identifier];
  if (!target) {
    bootstrap.ratelimits[options == null ? void 0 : options.identifier] = [];
    target = bootstrap.ratelimits[options == null ? void 0 : options.identifier];
  }
  if ((target == null ? void 0 : target.length) > 0) {
    bootstrap.ratelimits[options == null ? void 0 : options.identifier] = target.filter((ts) => Date.now() - ts < (options == null ? void 0 : options.interval) * 1e3);
    target = bootstrap.ratelimits[options == null ? void 0 : options.identifier];
  }
  const oldestTimestamp = target == null ? void 0 : target[0];
  const getWait = oldestTimestamp ? Math.ceil((options == null ? void 0 : options.interval) * 1e3 - (Date.now() - oldestTimestamp)) : 0;
  const max = (options == null ? void 0 : options.max) || 1;
  if ((target == null ? void 0 : target.length) >= max && getWait > 0) {
    return {
      limited: true,
      remaining: getWait,
      response: `You are being rate limited, please wait ${(getWait / 1e3).toFixed(1)} second(s) before performing this action again.`
    };
  }
  bootstrap.ratelimits[options == null ? void 0 : options.identifier].push(Date.now());
  return { limited: false };
};

// src/@modules/@utilities/utilities.setWarning.ts
var setWarning = (options) => {
  var _a, _b;
  const settings = bootstrap.settings;
  bootstrap.listener.emit(`log`, `${(_a = options.title) != null ? _a : `[${bootstrap.ansi_colors.YELLOW}ATMOSX-PARSER${bootstrap.ansi_colors.RESET}]`} ${options.message}`);
  if (settings.EnableJournal) {
    console.log(`${(_b = options.title) != null ? _b : `[${bootstrap.ansi_colors.YELLOW}ATMOSX-PARSER${bootstrap.ansi_colors.RESET}]`} ${options.message}`);
  }
};

// src/@modules/@utilities/utilities.setEventEmit.ts
var setEventEmit = (options) => {
  if (options.limited) {
    const isTimeout = setTimeoutAction({ identifier: `event.${options.event}`, addTime: true, max: 1, interval: 1 });
    if (isTimeout.limited) return;
  }
  bootstrap.listener.emit(options.event, options.metadata);
  if (options.event != `log`) {
    bootstrap.listener.emit(`*`, { event: options.event, data: options.metadata });
  }
  if (options.message) {
    setWarning({ message: options.message });
  }
};

// src/@modules/@utilities/utilities.setListener.ts
var setListener = (options) => {
  bootstrap.listener.on(options.event, options.callback);
  return () => {
    void bootstrap.listener.off(options.event, options.callback);
  };
};

// src/@core/core.listener.ts
var listener = (event, callback2) => {
  setListener({ event, callback: callback2 });
};

// node_modules/@xmpp/xml/index.js
var import_Element2 = __toESM(require_Element(), 1);
var import_createElement = __toESM(require_createElement(), 1);
var import_escape = __toESM(require_escape(), 1);

// node_modules/@xmpp/xml/lib/Parser.js
var import_ltx = __toESM(require_ltx(), 1);
var import_Element = __toESM(require_Element(), 1);

// node_modules/@xmpp/events/index.js
import { EventEmitter as EventEmitter2 } from "events";

// node_modules/@xmpp/events/lib/TimeoutError.js
var TimeoutError = class extends Error {
  constructor(message) {
    super(message);
    this.name = "TimeoutError";
  }
};

// node_modules/@xmpp/events/lib/delay.js
function delay(ms) {
  let timeout2;
  const promise2 = new Promise((resolve6) => {
    timeout2 = setTimeout(resolve6, ms);
  });
  promise2.timeout = timeout2;
  return promise2;
}

// node_modules/@xmpp/events/lib/timeout.js
function timeout(promise2, ms) {
  const promiseDelay = delay(ms);
  function cancelDelay() {
    clearTimeout(promiseDelay.timeout);
  }
  const error = new TimeoutError();
  return Promise.race([
    promise2.finally(cancelDelay),
    promiseDelay.then(() => {
      throw error;
    })
  ]);
}

// node_modules/@xmpp/events/lib/onoff.js
var map = /* @__PURE__ */ new WeakMap();
function onoff(target) {
  var _a, _b, _c;
  let m = map.get(target);
  if (!m) {
    const on = ((_a = target.addEventListener) != null ? _a : target.addListener).bind(target);
    const off = ((_b = target.removeEventListener) != null ? _b : target.removeListener).bind(
      target
    );
    const once = ((_c = target.once) != null ? _c : ((event, handler) => target.addEventListener(event, handler, { once: true }))).bind(target);
    m = { on, off, once };
    map.set(target, m);
  }
  return m;
}

// node_modules/@xmpp/events/lib/promise.js
function promise(target, event, rejectEvent = "error", timeout2) {
  return new Promise((resolve6, reject) => {
    let timeoutId;
    const { off, once } = onoff(target);
    const cleanup = () => {
      clearTimeout(timeoutId);
      off(event, onEvent);
      off(rejectEvent, onError);
    };
    function onError(reason) {
      reject(reason);
      cleanup();
    }
    function onEvent(value) {
      resolve6(value);
      cleanup();
    }
    once(event, onEvent);
    if (rejectEvent) {
      once(rejectEvent, onError);
    }
    if (timeout2) {
      const error = new TimeoutError();
      timeoutId = setTimeout(() => {
        cleanup();
        reject(error);
      }, timeout2);
    }
  });
}

// node_modules/@xmpp/events/lib/Deferred.js
function Deferred() {
  this.promise = new Promise((resolve6, reject) => {
    this.resolve = resolve6;
    this.reject = reject;
  });
}

// node_modules/@xmpp/events/lib/procedure.js
function procedure(entity, stanza = null, handler) {
  return new Promise((resolve6, reject) => {
    function onError(err) {
      entity.removeListener("nonza", listener3);
      reject(err);
    }
    function done(...args) {
      entity.removeListener("nonza", listener3);
      resolve6(...args);
    }
    function listener3(element) {
      return __async(this, null, function* () {
        try {
          yield handler(element, done);
        } catch (err) {
          onError(err);
        }
      });
    }
    stanza && entity.send(stanza).catch(onError);
    entity.on("nonza", listener3);
  });
}

// node_modules/@xmpp/events/lib/listeners.js
function listeners(events) {
  return {
    subscribe(target) {
      const { on } = onoff(target);
      for (const [event, handler] of Object.entries(events)) {
        on(event, handler);
      }
    },
    unsubscribe(target) {
      const { off } = onoff(target);
      for (const [event, handler] of Object.entries(events)) {
        off(event, handler);
      }
    }
  };
}

// node_modules/@xmpp/xml/lib/XMLError.js
var XMLError = class extends Error {
  constructor(...args) {
    super(...args);
    this.name = "XMLError";
  }
};

// node_modules/@xmpp/xml/lib/Parser.js
var Parser = class extends EventEmitter2 {
  constructor() {
    super();
    const parser = new import_ltx.default();
    this.root = null;
    this.cursor = null;
    parser.on("startElement", this.onStartElement.bind(this));
    parser.on("endElement", this.onEndElement.bind(this));
    parser.on("text", this.onText.bind(this));
    this.parser = parser;
  }
  onStartElement(name, attrs) {
    const element = new import_Element.default(name, attrs);
    const { root, cursor } = this;
    if (!root) {
      this.root = element;
      this.emit("start", element);
    } else if (cursor !== root) {
      cursor.append(element);
    }
    this.cursor = element;
  }
  onEndElement(name) {
    const { root, cursor } = this;
    if (name !== cursor.name) {
      this.emit("error", new XMLError(`${cursor.name} must be closed.`));
      return;
    }
    if (cursor === root) {
      this.emit("end", root);
      return;
    }
    if (!cursor.parent) {
      cursor.parent = root;
      this.emit("element", cursor);
      this.cursor = root;
      return;
    }
    this.cursor = cursor.parent;
  }
  onText(str) {
    const { cursor } = this;
    if (!cursor) {
      this.emit("error", new XMLError(`${str} must be a child.`));
      return;
    }
    cursor.t(str);
  }
  write(data) {
    this.parser.write(data);
  }
  end(data) {
    if (data) {
      this.parser.write(data);
    }
  }
};
Parser.XMLError = XMLError;
var Parser_default = Parser;

// node_modules/@xmpp/xml/index.js
function xml(...args) {
  return (0, import_createElement.default)(...args);
}
Object.assign(xml, {
  Element: import_Element2.default,
  createElement: import_createElement.default,
  Parser: Parser_default,
  escapeXML: import_escape.escapeXML,
  unescapeXML: import_escape.unescapeXML,
  escapeXMLText: import_escape.escapeXMLText,
  unescapeXMLText: import_escape.unescapeXMLText,
  XMLError,
  xml
});

// node_modules/@xmpp/jid/lib/escaping.js
function detect(local) {
  if (!local) {
    return false;
  }
  const tmp = local.replaceAll(String.raw`\20`, "").replaceAll(String.raw`\22`, "").replaceAll(String.raw`\26`, "").replaceAll(String.raw`\27`, "").replaceAll(String.raw`\2f`, "").replaceAll(String.raw`\3a`, "").replaceAll(String.raw`\3c`, "").replaceAll(String.raw`\3e`, "").replaceAll(String.raw`\40`, "").replaceAll(String.raw`\5c`, "");
  const search = tmp.search(/[ "&'/:<>@\\]/g);
  if (search === -1) {
    return false;
  }
  return true;
}
function escape(local) {
  if (local === null) {
    return null;
  }
  return local.replaceAll(/^\s+|\s+$/g, "").replaceAll("\\", String.raw`\5c`).replaceAll(" ", String.raw`\20`).replaceAll('"', String.raw`\22`).replaceAll("&", String.raw`\26`).replaceAll("'", String.raw`\27`).replaceAll("/", String.raw`\2f`).replaceAll(":", String.raw`\3a`).replaceAll("<", String.raw`\3c`).replaceAll(">", String.raw`\3e`).replaceAll("@", String.raw`\40`);
}
function unescape2(local) {
  if (local === null) {
    return null;
  }
  return local.replaceAll(String.raw`\20`, " ").replaceAll(String.raw`\22`, '"').replaceAll(String.raw`\26`, "&").replaceAll(String.raw`\27`, "'").replaceAll(String.raw`\2f`, "/").replaceAll(String.raw`\3a`, ":").replaceAll(String.raw`\3c`, "<").replaceAll(String.raw`\3e`, ">").replaceAll(String.raw`\40`, "@").replaceAll(String.raw`\5c`, "\\");
}

// node_modules/@xmpp/jid/lib/JID.js
var JID = class _JID {
  constructor(local, domain, resource) {
    if (typeof domain !== "string" || !domain) {
      throw new TypeError(`Invalid domain.`);
    }
    this.setDomain(domain);
    this.setLocal(typeof local === "string" ? local : "");
    this.setResource(typeof resource === "string" ? resource : "");
  }
  [Symbol.toPrimitive](hint) {
    if (hint === "number") {
      return Number.NaN;
    }
    return this.toString();
  }
  toString(unescape3) {
    let s = this._domain;
    if (this._local) {
      s = this.getLocal(unescape3) + "@" + s;
    }
    if (this._resource) {
      s = s + "/" + this._resource;
    }
    return s;
  }
  /**
   * Convenience method to distinguish users
   * */
  bare() {
    if (this._resource) {
      return new _JID(this._local, this._domain, null);
    }
    return this;
  }
  /**
   * Comparison function
   * */
  equals(other) {
    return this._local === other._local && this._domain === other._domain && this._resource === other._resource;
  }
  /**
   * http://xmpp.org/rfcs/rfc6122.html#addressing-localpart
   * */
  setLocal(local, escape2) {
    escape2 = escape2 || detect(local);
    if (escape2) {
      local = escape(local);
    }
    this._local = local && local.toLowerCase();
    return this;
  }
  getLocal(unescape3 = false) {
    let local = null;
    local = unescape3 ? unescape2(this._local) : this._local;
    return local;
  }
  /**
   * http://xmpp.org/rfcs/rfc6122.html#addressing-domain
   */
  setDomain(domain) {
    this._domain = domain.toLowerCase();
    return this;
  }
  getDomain() {
    return this._domain;
  }
  /**
   * http://xmpp.org/rfcs/rfc6122.html#addressing-resourcepart
   */
  setResource(resource) {
    this._resource = resource;
    return this;
  }
  getResource() {
    return this._resource;
  }
};
Object.defineProperty(JID.prototype, "local", {
  get: JID.prototype.getLocal,
  set: JID.prototype.setLocal
});
Object.defineProperty(JID.prototype, "domain", {
  get: JID.prototype.getDomain,
  set: JID.prototype.setDomain
});
Object.defineProperty(JID.prototype, "resource", {
  get: JID.prototype.getResource,
  set: JID.prototype.setResource
});
var JID_default = JID;

// node_modules/@xmpp/jid/lib/parse.js
function parse(s) {
  let local;
  let resource;
  const resourceStart = s.indexOf("/");
  if (resourceStart !== -1) {
    resource = s.slice(resourceStart + 1);
    s = s.slice(0, resourceStart);
  }
  const atStart = s.indexOf("@");
  if (atStart !== -1) {
    local = s.slice(0, atStart);
    s = s.slice(atStart + 1);
  }
  return new JID_default(local, s, resource);
}

// node_modules/@xmpp/jid/index.js
function equal(a, b) {
  return a.equals(b);
}
function jid(...args) {
  if (!args[1] && !args[2]) {
    return parse(...args);
  }
  return new JID_default(...args);
}
var j = jid.bind();
j.jid = jid;
j.JID = JID_default;
j.parse = parse;
j.equal = equal;
j.detectEscape = detect;
j.escapeLocal = escape;
j.unescapeLocal = unescape2;
var jid_default = j;

// node_modules/@xmpp/error/index.js
var XMPPError = class extends Error {
  constructor(condition, text2, application) {
    super(condition + (text2 ? ` - ${text2}` : ""));
    this.name = "XMPPError";
    this.condition = condition;
    this.text = text2;
    this.application = application;
  }
  static fromElement(element) {
    const [condition, second, third] = element.getChildElements();
    let text2;
    let application;
    if (second) {
      if (second.is("text")) {
        text2 = second;
      } else if (second) {
        application = second;
      }
      if (third) application = third;
    }
    const error = new this(
      condition.name,
      text2 ? text2.text() : "",
      application
    );
    error.element = element;
    return error;
  }
};
var error_default = XMPPError;

// node_modules/@xmpp/connection/lib/StreamError.js
var StreamError = class extends error_default {
  constructor(...args) {
    super(...args);
    this.name = "StreamError";
  }
};
var StreamError_default = StreamError;

// node_modules/@xmpp/connection/lib/util.js
function parseURI(URI) {
  let { port, hostname, protocol } = new URL(URI);
  if (hostname === "[::1]") {
    hostname = "::1";
  }
  return { port, hostname, protocol };
}
function parseHost(host) {
  const { port, hostname } = parseURI(`http://${host}`);
  return { port, hostname };
}
function parseService(service) {
  return service.includes("://") ? parseURI(service) : parseHost(service);
}

// node_modules/@xmpp/connection/index.js
var NS_STREAM = "urn:ietf:params:xml:ns:xmpp-streams";
var NS_JABBER_STREAM = "http://etherx.jabber.org/streams";
var _socketListeners, _parserListeners, _Connection_instances, onParserError_fn, onSocketClosed_fn, onStreamClosed_fn, _hooks, _hook_events, assertHookEventName_fn, runHooks_fn;
var Connection = class extends EventEmitter2 {
  constructor(options = {}) {
    super();
    __privateAdd(this, _Connection_instances);
    __privateAdd(this, _socketListeners, null);
    __privateAdd(this, _parserListeners, null);
    /* Experimental hooks */
    __privateAdd(this, _hooks, /* @__PURE__ */ new Map());
    __privateAdd(this, _hook_events, /* @__PURE__ */ new Set(["close"]));
    if (typeof options === "string") {
      options = { domain: options };
    }
    this.jid = null;
    this.timeout = options.timeout || 2e3;
    this.options = options;
    this.status = "offline";
    this.socket = null;
    this.parser = null;
    this.root = null;
  }
  isSecure() {
    var _a;
    return ((_a = this.socket) == null ? void 0 : _a.secure) === true;
  }
  _streamError(condition, children) {
    return __async(this, null, function* () {
      try {
        yield this.send(
          // prettier-ignore
          xml("stream:error", {}, [
            xml(condition, { xmlns: NS_STREAM }, children)
          ])
        );
      } catch (e) {
      }
      return this.disconnect();
    });
  }
  _onData(data) {
    const str = data.toString("utf8");
    this.parser.write(str);
  }
  _attachSocket(socket) {
    var _a;
    this.socket = socket;
    (_a = __privateGet(this, _socketListeners)) != null ? _a : __privateSet(this, _socketListeners, listeners({
      data: this._onData.bind(this),
      close: __privateMethod(this, _Connection_instances, onSocketClosed_fn).bind(this),
      connect: () => this._status("connect"),
      error: (error) => this.emit("error", error)
    }));
    __privateGet(this, _socketListeners).subscribe(this.socket);
  }
  _detachSocket() {
    var _a;
    this.socket && ((_a = __privateGet(this, _socketListeners)) == null ? void 0 : _a.unsubscribe(this.socket));
    this.socket = null;
  }
  _onElement(element) {
    const isStreamError = element.is("error", NS_JABBER_STREAM);
    if (isStreamError) {
      this._onStreamError(element);
    }
    this.emit("element", element);
    this.emit(this.isStanza(element) ? "stanza" : "nonza", element);
    if (isStreamError) {
      this.disconnect();
    }
  }
  // https://xmpp.org/rfcs/rfc6120.html#streams-error
  _onStreamError(element) {
    const error = StreamError_default.fromElement(element);
    if (error.condition === "see-other-host") {
      return this._onSeeOtherHost(error);
    }
    this.emit("error", error);
  }
  // https://xmpp.org/rfcs/rfc6120.html#streams-error-conditions-see-other-host
  _onSeeOtherHost(error) {
    return __async(this, null, function* () {
      const { protocol } = parseService(this.options.service);
      const host = error.element.getChildText("see-other-host");
      const { port } = parseHost(host);
      let service;
      service = port ? `${protocol || "xmpp:"}//${host}` : (protocol ? `${protocol}//` : "") + host;
      try {
        yield promise(this, "disconnect");
        const { domain, lang } = this.options;
        yield this.connect(service);
        yield this.open({ domain, lang });
      } catch (err) {
        this.emit("error", err);
      }
    });
  }
  _attachParser(parser) {
    var _a;
    this.parser = parser;
    (_a = __privateGet(this, _parserListeners)) != null ? _a : __privateSet(this, _parserListeners, listeners({
      element: this._onElement.bind(this),
      error: __privateMethod(this, _Connection_instances, onParserError_fn).bind(this),
      end: __privateMethod(this, _Connection_instances, onStreamClosed_fn).bind(this),
      start: (element) => this._status("open", element)
    }));
    __privateGet(this, _parserListeners).subscribe(this.parser);
  }
  _detachParser() {
    var _a;
    this.parser && ((_a = __privateGet(this, _parserListeners)) == null ? void 0 : _a.unsubscribe(this.parser));
    this.parser = null;
    this.root = null;
  }
  _jid(id2) {
    this.jid = jid_default(id2);
    return this.jid;
  }
  /*
  [
    "offline",
    // "disconnect",
    "connecting",
    "connected",
    "opening",
    "open",
    "online",
    "closing",
    "close",
    "disconnecting",
    "disconnect",
    "offline",
  ];
  */
  _status(status, ...args) {
    if (this.status === status) return;
    this.status = status;
    this.emit("status", status, ...args);
    this.emit(status, ...args);
  }
  _ready(resumed = false) {
    if (resumed) {
      this.status = "online";
    } else {
      this._status("online", this.jid);
    }
  }
  disconnect() {
    return __async(this, null, function* () {
      let el;
      try {
        el = yield this._closeStream();
      } catch (err) {
        __privateMethod(this, _Connection_instances, onStreamClosed_fn).call(this, err);
      }
      try {
        yield this._closeSocket();
      } catch (err) {
        __privateMethod(this, _Connection_instances, onSocketClosed_fn).call(this, true, err);
      }
      return el;
    });
  }
  /**
   * Opens the socket then opens the stream
   */
  start() {
    return __async(this, null, function* () {
      if (this.status !== "offline") {
        throw new Error("Connection is not offline");
      }
      const { service, domain, lang } = this.options;
      yield this.connect(service);
      const promiseOnline = promise(this, "online");
      yield this.open({ domain, lang });
      return promiseOnline;
    });
  }
  /**
   * Connects the socket
   */
  connect(service) {
    return __async(this, null, function* () {
      this._status("connecting", service);
      const socket = new this.Socket();
      this._attachSocket(socket);
      socket.connect(this.socketParameters(service));
      return promise(socket, "connect");
    });
  }
  /**
   * Disconnects the socket
   * https://xmpp.org/rfcs/rfc6120.html#streams-close
   * https://tools.ietf.org/html/rfc7395#section-3.6
   */
  _closeSocket() {
    return __async(this, arguments, function* (timeout2 = this.timeout) {
      this._status("disconnecting");
      this.socket.end();
      yield promise(this.socket, "close", "error", timeout2);
    });
  }
  /**
   * Opens the stream
   */
  open(options) {
    return __async(this, null, function* () {
      this._status("opening");
      const { domain, lang } = options;
      const headerElement = this.headerElement();
      headerElement.attrs.to = domain;
      headerElement.attrs["xml:lang"] = lang;
      this.root = headerElement;
      this._attachParser(new this.Parser());
      yield this.write(this.header(headerElement));
      return promise(this, "open", "error", this.timeout);
    });
  }
  /**
   * Closes the stream then closes the socket
   * https://xmpp.org/rfcs/rfc6120.html#streams-close
   * https://tools.ietf.org/html/rfc7395#section-3.6
   */
  stop() {
    return __async(this, null, function* () {
      const el = yield this.disconnect();
      this._status("offline", el);
      return el;
    });
  }
  /**
   * Closes the stream and wait for the server to close it
   * https://xmpp.org/rfcs/rfc6120.html#streams-close
   * https://tools.ietf.org/html/rfc7395#section-3.6
   */
  _closeStream() {
    return __async(this, arguments, function* (timeout2 = this.timeout) {
      yield __privateMethod(this, _Connection_instances, runHooks_fn).call(this, "close");
      const fragment = this.footer(this.footerElement());
      yield this.write(fragment);
      this._status("closing");
      return promise(this.parser, "end", "error", timeout2);
    });
  }
  /**
   * Restart the stream
   * https://xmpp.org/rfcs/rfc6120.html#streams-negotiation-restart
   */
  restart() {
    return __async(this, null, function* () {
      this._detachParser();
      const { domain, lang } = this.options;
      return this.open({ domain, lang });
    });
  }
  send(element) {
    return __async(this, null, function* () {
      element.parent = this.root;
      yield this.write(element.toString());
      this.emit("send", element);
    });
  }
  sendReceive(element, timeout2 = this.timeout) {
    return Promise.all([
      this.send(element),
      promise(this, "element", "error", timeout2)
    ]).then(([, el]) => el);
  }
  write(string) {
    return __async(this, null, function* () {
      if (this.status === "closing") {
        throw new Error("Connection is closing");
      }
      return new Promise((resolve6, reject) => {
        this.socket.write(string, (err) => err ? reject(err) : resolve6());
      });
    });
  }
  isStanza(element) {
    const { name } = element;
    return name === "iq" || name === "message" || name === "presence";
  }
  isNonza(element) {
    return !this.isStanza(element);
  }
  // Override
  header(el) {
    return el.toString();
  }
  // Override
  headerElement() {
    return new xml.Element("", {
      version: "1.0",
      xmlns: this.NS
    });
  }
  // Override
  footer(el) {
    return el.toString();
  }
  // Override
  footerElement() {
  }
  // Override
  socketParameters() {
  }
  hook(event, handler) {
    __privateMethod(this, _Connection_instances, assertHookEventName_fn).call(this, event);
    if (!__privateGet(this, _hooks).has(event)) {
      __privateGet(this, _hooks).set(event, /* @__PURE__ */ new Set());
    }
    __privateGet(this, _hooks).get(event).add([handler]);
  }
  unhook(event, handler) {
    __privateMethod(this, _Connection_instances, assertHookEventName_fn).call(this, event);
    const handlers = __privateGet(this, _hooks).get("event");
    const item = [...handlers].find((item2) => item2.handler === handler);
    handlers.remove(item);
  }
};
_socketListeners = new WeakMap();
_parserListeners = new WeakMap();
_Connection_instances = new WeakSet();
onParserError_fn = function(error) {
  this._streamError("bad-format");
  this._detachParser();
  this.emit("error", error);
};
onSocketClosed_fn = function(dirty, reason) {
  this._detachSocket();
  this._status("disconnect", { clean: !dirty, reason });
};
onStreamClosed_fn = function(dirty, reason) {
  this._detachParser();
  this._status("close", { clean: !dirty, reason });
};
_hooks = new WeakMap();
_hook_events = new WeakMap();
assertHookEventName_fn = function(event) {
  if (!__privateGet(this, _hook_events).has(event)) {
    throw new Error(`Hook event name "${event}" is unknown.`);
  }
};
runHooks_fn = function(event, ...args) {
  return __async(this, null, function* () {
    __privateMethod(this, _Connection_instances, assertHookEventName_fn).call(this, event);
    const hooks = __privateGet(this, _hooks).get(event);
    if (!hooks) return;
    yield Promise.all(
      [...hooks].map((_0) => __async(this, [_0], function* ([handler]) {
        try {
          yield handler(...args);
        } catch (err) {
          this.emit("error", err);
        }
      }))
    );
  });
};
Connection.prototype.NS = "";
Connection.prototype.Socket = null;
Connection.prototype.Parser = null;
var connection_default = Connection;

// node_modules/@xmpp/client-core/lib/Client.js
var Client = class extends connection_default {
  constructor(options) {
    super(options);
    this.transports = [];
  }
  send(element, ...args) {
    return this.Transport.prototype.send.call(this, element, ...args);
  }
  sendMany(...args) {
    return this.Transport.prototype.sendMany.call(this, ...args);
  }
  _findTransport(service) {
    return this.transports.find((Transport) => {
      try {
        return Transport.prototype.socketParameters(service) !== void 0;
      } catch (e) {
        return false;
      }
    });
  }
  connect(service) {
    const Transport = this._findTransport(service);
    if (!Transport) {
      throw new Error("No compatible connection method found.");
    }
    this.Transport = Transport;
    this.Socket = Transport.prototype.Socket;
    this.Parser = Transport.prototype.Parser;
    return super.connect(service);
  }
  socketParameters(...args) {
    return this.Transport.prototype.socketParameters(...args);
  }
  header(headerElement, ...args) {
    var _a;
    const from = this.isSecure() && ((_a = this.jid) == null ? void 0 : _a.bare().toString());
    if (from) headerElement.attrs.from = from;
    return this.Transport.prototype.header(headerElement, ...args);
  }
  headerElement(...args) {
    return this.Transport.prototype.headerElement(...args);
  }
  footer(...args) {
    return this.Transport.prototype.footer(...args);
  }
  footerElement(...args) {
    return this.Transport.prototype.footerElement(...args);
  }
};
Client.prototype.NS = "jabber:client";
var Client_default = Client;

// node_modules/@xmpp/reconnect/index.js
var _onDisconnect;
var Reconnect = class extends EventEmitter2 {
  constructor(entity) {
    super();
    __privateAdd(this, _onDisconnect, () => {
      this.scheduleReconnect();
    });
    this.delay = 1e3;
    this.entity = entity;
    this._timeout = null;
  }
  scheduleReconnect() {
    const { entity, delay: delay2, _timeout } = this;
    clearTimeout(_timeout);
    this._timeout = setTimeout(() => __async(this, null, function* () {
      if (entity.status !== "disconnect") {
        return;
      }
      try {
        yield this.reconnect();
      } catch (e) {
      }
    }), delay2);
  }
  reconnect() {
    return __async(this, null, function* () {
      const { entity } = this;
      this.emit("reconnecting");
      const { service, domain, lang } = entity.options;
      yield entity.connect(service);
      yield entity.open({ domain, lang });
      this.emit("reconnected");
    });
  }
  start() {
    const { entity } = this;
    entity.on("disconnect", __privateGet(this, _onDisconnect));
  }
  stop() {
    const { entity, _timeout } = this;
    entity.removeListener("disconnect", __privateGet(this, _onDisconnect));
    clearTimeout(_timeout);
  }
};
_onDisconnect = new WeakMap();
function reconnect({ entity }) {
  const r = new Reconnect(entity);
  r.start();
  return r;
}

// node_modules/@xmpp/websocket/lib/Socket.js
var CODE = "ECONNERROR";
function isSecure(url) {
  const uri = parseURI(url);
  if (uri.protocol === "wss:") return true;
  if (["localhost", "127.0.0.1", "::1"].includes(uri.hostname)) return true;
  return false;
}
var _listeners;
var Socket = class extends EventEmitter2 {
  constructor() {
    super(...arguments);
    __privateAdd(this, _listeners, null);
    __publicField(this, "socket", null);
    __publicField(this, "url", null);
    __publicField(this, "secure", false);
  }
  connect(url) {
    this.url = url;
    this.secure = isSecure(url);
    this._attachSocket(new WebSocket(url, ["xmpp"]));
  }
  _attachSocket(socket) {
    var _a;
    this.socket = socket;
    (_a = __privateGet(this, _listeners)) != null ? _a : __privateSet(this, _listeners, listeners({
      open: () => this.emit("connect"),
      message: ({ data }) => this.emit("data", data),
      error: (event) => {
        const { url } = this;
        let { error } = event;
        if (!error) {
          error = new Error(event.message || `WebSocket ${CODE} ${url}`);
          error.errno = CODE;
          error.code = CODE;
        }
        error.event = event;
        error.url = url;
        this.emit("error", error);
      },
      close: (event) => {
        this._detachSocket();
        this.emit("close", !event.wasClean, event);
      }
    }));
    __privateGet(this, _listeners).subscribe(this.socket);
  }
  _detachSocket() {
    var _a;
    this.url = null;
    this.secure = false;
    this.socket && ((_a = __privateGet(this, _listeners)) == null ? void 0 : _a.unsubscribe(this.socket));
    this.socket = null;
  }
  end() {
    this.socket.close();
  }
  write(data, fn) {
    function done(err) {
      if (!fn) return;
      Promise.resolve().then(() => fn(err));
    }
    try {
      this.socket.send(data);
    } catch (err) {
      done(err);
      return;
    }
    done();
  }
};
_listeners = new WeakMap();

// node_modules/@xmpp/websocket/lib/FramedParser.js
var FramedParser = class extends Parser_default {
  onStartElement(name, attrs) {
    const element = new import_Element2.default(name, attrs);
    const { cursor } = this;
    if (cursor) {
      cursor.append(element);
    }
    this.cursor = element;
  }
  onEndElement(name) {
    const { cursor } = this;
    if (name !== cursor.name) {
      this.emit("error", new XMLError(`${cursor.name} must be closed.`));
      return;
    }
    if (cursor.parent) {
      this.cursor = cursor.parent;
      return;
    }
    if (cursor.is("open", "urn:ietf:params:xml:ns:xmpp-framing")) {
      this.emit("start", cursor);
    } else if (cursor.is("close", "urn:ietf:params:xml:ns:xmpp-framing")) {
      this.emit("end", cursor);
    } else {
      this.emit("element", cursor);
    }
    this.cursor = null;
  }
};

// node_modules/@xmpp/websocket/lib/Connection.js
var NS_FRAMING = "urn:ietf:params:xml:ns:xmpp-framing";
var ConnectionWebSocket = class extends connection_default {
  send(element, ...args) {
    var _a, _b;
    (_b = (_a = element.attrs).xmlns) != null ? _b : _a.xmlns = this.NS;
    return super.send(element, ...args);
  }
  sendMany(elements) {
    return __async(this, null, function* () {
      var _a, _b;
      for (const element of elements) {
        (_b = (_a = element.attrs).xmlns) != null ? _b : _a.xmlns = this.NS;
        element.parent = this.root;
        this.socket.write(element.toString());
        this.emit("send", element);
      }
    });
  }
  // https://tools.ietf.org/html/rfc7395#section-3.6
  footerElement() {
    return new xml.Element("close", {
      xmlns: NS_FRAMING
    });
  }
  // https://tools.ietf.org/html/rfc7395#section-3.4
  headerElement() {
    const el = super.headerElement();
    el.name = "open";
    el.attrs.xmlns = NS_FRAMING;
    return el;
  }
  socketParameters(service) {
    return /^wss?:\/\//.test(service) ? service : void 0;
  }
};
ConnectionWebSocket.prototype.Socket = Socket;
ConnectionWebSocket.prototype.NS = "jabber:client";
ConnectionWebSocket.prototype.Parser = FramedParser;
var Connection_default = ConnectionWebSocket;

// node_modules/@xmpp/websocket/index.js
function websocket({ entity }) {
  entity.transports.push(Connection_default);
}

// node_modules/@xmpp/connection-tcp/Socket.js
import { Socket as TCPSocket } from "net";
var Socket2 = class extends TCPSocket {
  constructor() {
    super(...arguments);
    __publicField(this, "secure", false);
  }
};

// node_modules/@xmpp/connection-tcp/index.js
var NS_STREAM2 = "http://etherx.jabber.org/streams";
var ConnectionTCP = class extends connection_default {
  sendMany(elements) {
    return __async(this, null, function* () {
      let fragment = "";
      for (const element of elements) {
        element.parent = this.root;
        fragment += element.toString();
      }
      yield this.write(fragment);
      for (const element of elements) {
        this.emit("send", element);
      }
    });
  }
  socketParameters(service) {
    const { port, hostname, protocol } = parseURI(service);
    return protocol === "xmpp:" ? { port: port ? Number(port) : null, host: hostname } : void 0;
  }
  // https://xmpp.org/rfcs/rfc6120.html#streams-open
  headerElement() {
    const el = super.headerElement();
    el.name = "stream:stream";
    el.attrs["xmlns:stream"] = NS_STREAM2;
    return el;
  }
  // https://xmpp.org/rfcs/rfc6120.html#streams-open
  header(el) {
    return `<?xml version='1.0'?>${el.toString().slice(0, -2)}>`;
  }
  // https://xmpp.org/rfcs/rfc6120.html#streams-close
  footer() {
    return "</stream:stream>";
  }
};
ConnectionTCP.prototype.NS = NS_STREAM2;
ConnectionTCP.prototype.Socket = Socket2;
ConnectionTCP.prototype.Parser = Parser_default;
var connection_tcp_default = ConnectionTCP;

// node_modules/@xmpp/tcp/lib/Connection.js
var ConnectionTCP2 = class extends connection_tcp_default {
  socketParameters(service) {
    const params = super.socketParameters(service);
    if (!params) return params;
    params.port = params.port || 5222;
    return params;
  }
};
ConnectionTCP2.prototype.NS = "jabber:client";
var Connection_default2 = ConnectionTCP2;

// node_modules/@xmpp/tcp/index.js
function tcp({ entity }) {
  entity.transports.push(Connection_default2);
}

// node_modules/@xmpp/tls/lib/Socket.js
import tls from "tls";
var _listeners2;
var Socket3 = class extends EventEmitter2 {
  constructor() {
    super(...arguments);
    __publicField(this, "timeout", null);
    __privateAdd(this, _listeners2, null);
    __publicField(this, "socket", null);
    __publicField(this, "secure", true);
  }
  connect(...args) {
    this._attachSocket(tls.connect(...args));
  }
  _attachSocket(socket) {
    var _a;
    this.socket = socket;
    (_a = __privateGet(this, _listeners2)) != null ? _a : __privateSet(this, _listeners2, listeners({
      close: () => {
        this._detachSocket();
        this.emit("close");
      },
      data: (data) => {
        this.emit("data", data);
      },
      error: (err) => {
        this.emit("error", err);
      },
      secureConnect: () => {
        if (this.socket.getProtocol() !== "TLSv1.3") {
          return this.emit("connect");
        }
        this.timeout = setTimeout(() => {
          this.emit("connect");
        }, 1);
      }
    }));
    __privateGet(this, _listeners2).subscribe(this.socket);
  }
  _detachSocket() {
    __privateGet(this, _listeners2).unsubscribe(this.socket);
    this.socket = null;
  }
  end() {
    this.socket.end();
  }
  write(data, fn) {
    this.socket.write(data, fn);
  }
};
_listeners2 = new WeakMap();
var Socket_default = Socket3;

// node_modules/@xmpp/tls/lib/Connection.js
var ConnectionTLS = class extends connection_tcp_default {
  socketParameters(service) {
    const { port, hostname, protocol } = parseURI(service);
    return protocol === "xmpps:" ? {
      port: Number(port) || 5223,
      host: hostname
    } : void 0;
  }
};
ConnectionTLS.prototype.Socket = Socket_default;
ConnectionTLS.prototype.NS = "jabber:client";
var Connection_default3 = ConnectionTLS;

// node_modules/@xmpp/tls/index.js
function tls2({ entity }) {
  entity.transports.push(Connection_default3);
}

// node_modules/@xmpp/middleware/index.js
var import_koa_compose = __toESM(require_koa_compose(), 1);

// node_modules/@xmpp/middleware/lib/Context.js
var Context = class {
  constructor(entity, stanza) {
    this.stanza = stanza;
    this.entity = entity;
    const { name, attrs } = stanza;
    const { type, id: id2 } = attrs;
    this.name = name;
    this.id = id2 || "";
    if (name === "message") {
      this.type = type || "normal";
    } else if (name === "presence") {
      this.type = type || "available";
    } else {
      this.type = type || "";
    }
    this.from = null;
    this.to = null;
    this.local = "";
    this.domain = "";
    this.resource = "";
  }
};

// node_modules/@xmpp/middleware/lib/IncomingContext.js
var IncomingContext = class extends Context {
  constructor(entity, stanza) {
    var _a;
    super(entity, stanza);
    const { jid: jid2 } = entity;
    const { domain } = (_a = entity.options) != null ? _a : {};
    const to = stanza.attrs.to || (jid2 == null ? void 0 : jid2.toString());
    const from = stanza.attrs.from || domain;
    if (to) this.to = new jid_default(to);
    if (from) {
      this.from = new jid_default(from);
      this.local = this.from.local;
      this.domain = this.from.domain;
      this.resource = this.from.resource;
    }
  }
};

// node_modules/@xmpp/middleware/lib/OutgoingContext.js
var OutgoingContext = class extends Context {
  constructor(entity, stanza) {
    var _a;
    super(entity, stanza);
    const { jid: jid2 } = entity;
    const { domain } = (_a = entity.options) != null ? _a : {};
    const from = stanza.attrs.from || (jid2 == null ? void 0 : jid2.toString());
    const to = stanza.attrs.to || domain;
    if (from) this.from = new jid_default(from);
    if (to) {
      this.to = new jid_default(to);
      this.local = this.to.local;
      this.domain = this.to.domain;
      this.resource = this.to.resource;
    }
  }
};

// node_modules/@xmpp/middleware/index.js
function listener2(entity, middleware2, Context2) {
  return (stanza) => {
    const ctx = new Context2(entity, stanza);
    return (0, import_koa_compose.default)(middleware2)(ctx);
  };
}
function errorHandler(entity) {
  return (ctx, next) => {
    next().then((reply) => reply && entity.send(reply)).catch((err) => entity.emit("error", err));
  };
}
function middleware({ entity }) {
  const incoming = [errorHandler(entity)];
  const outgoing = [];
  const incomingListener = listener2(entity, incoming, IncomingContext);
  const outgoingListener = listener2(entity, outgoing, OutgoingContext);
  entity.on("element", incomingListener);
  entity.on("send", outgoingListener);
  return {
    use(fn) {
      incoming.push(fn);
      return fn;
    },
    filter(fn) {
      outgoing.push(fn);
      return fn;
    }
  };
}

// node_modules/@xmpp/stream-features/index.js
function streamFeatures({ middleware: middleware2 }) {
  function use(name, xmlns, handler) {
    return middleware2.use((ctx, next) => {
      const { stanza } = ctx;
      if (!stanza.is("features", "http://etherx.jabber.org/streams"))
        return next();
      const feature = stanza.getChild(name, xmlns);
      if (!feature) return next();
      return handler(ctx, next, feature);
    });
  }
  return {
    use
  };
}

// node_modules/@xmpp/id/index.js
function id() {
  let i;
  while (!i) {
    i = Math.random().toString(36).slice(2, 12);
  }
  return i;
}

// node_modules/@xmpp/middleware/lib/StanzaError.js
var StanzaError = class extends error_default {
  constructor(condition, text2, application, type) {
    super(condition, text2, application);
    this.type = type;
    this.name = "StanzaError";
  }
  static fromElement(element) {
    const error = super.fromElement(element);
    error.type = element.attrs.type;
    return error;
  }
};
var StanzaError_default = StanzaError;

// node_modules/@xmpp/iq/caller.js
function isReply({ name, type }) {
  if (name !== "iq") return false;
  if (type !== "error" && type !== "result") return false;
  return true;
}
var IQCaller = class {
  constructor({ entity, middleware: middleware2 }) {
    this.handlers = /* @__PURE__ */ new Map();
    this.entity = entity;
    this.middleware = middleware2;
  }
  start() {
    this.middleware.use(this._route.bind(this));
  }
  _route({ type, name, id: id2, stanza }, next) {
    if (!isReply({ name, type })) return next();
    const deferred = this.handlers.get(id2);
    if (!deferred) {
      return next();
    }
    if (type === "error") {
      deferred.reject(StanzaError_default.fromElement(stanza.getChild("error")));
    } else {
      deferred.resolve(stanza);
    }
    this.handlers.delete(id2);
  }
  request(_0) {
    return __async(this, arguments, function* (stanza, timeout2 = 30 * 1e3) {
      if (!stanza.attrs.id) {
        stanza.attrs.id = id();
      }
      const deferred = new Deferred();
      this.handlers.set(stanza.attrs.id, deferred);
      try {
        yield this.entity.send(stanza);
        yield timeout(deferred.promise, timeout2);
      } catch (err) {
        this.handlers.delete(stanza.attrs.id);
        throw err;
      }
      return deferred.promise;
    });
  }
  _childRequest(type, element, to, ...args) {
    const {
      name,
      attrs: { xmlns }
    } = element;
    return this.request(xml("iq", { type, to }, element), ...args).then(
      (stanza) => stanza.getChild(name, xmlns)
    );
  }
  get(...args) {
    return __async(this, null, function* () {
      return this._childRequest("get", ...args);
    });
  }
  set(...args) {
    return __async(this, null, function* () {
      return this._childRequest("set", ...args);
    });
  }
};
function iqCaller(...args) {
  const iqCaller2 = new IQCaller(...args);
  iqCaller2.start();
  return iqCaller2;
}

// node_modules/@xmpp/iq/callee.js
var NS_STANZA = "urn:ietf:params:xml:ns:xmpp-stanzas";
function isQuery({ name, type }) {
  if (name !== "iq") return false;
  if (type === "error" || type === "result") return false;
  return true;
}
function isValidQuery({ type }, children, child) {
  if (type !== "get" && type !== "set") return false;
  if (children.length !== 1) return false;
  if (!child) return false;
  return true;
}
function buildReply({ stanza }) {
  return xml("iq", {
    to: stanza.attrs.from,
    from: stanza.attrs.to,
    id: stanza.attrs.id
  });
}
function buildReplyResult(ctx, child) {
  const reply = buildReply(ctx);
  reply.attrs.type = "result";
  if (child) {
    reply.append(child);
  }
  return reply;
}
function buildReplyError(ctx, error, child) {
  const reply = buildReply(ctx);
  reply.attrs.type = "error";
  if (child) {
    reply.append(child);
  }
  reply.append(error);
  return reply;
}
function buildError(type, condition) {
  return xml("error", { type }, xml(condition, NS_STANZA));
}
function iqHandler(entity) {
  return function iqHandler2(ctx, next) {
    return __async(this, null, function* () {
      if (!isQuery(ctx)) return next();
      const { stanza } = ctx;
      const children = stanza.getChildElements();
      const [child] = children;
      if (!isValidQuery(ctx, children, child)) {
        return buildReplyError(ctx, buildError("modify", "bad-request"), child);
      }
      ctx.element = child;
      let reply;
      try {
        reply = yield next();
      } catch (err) {
        entity.emit("error", err);
        reply = buildError("cancel", "internal-server-error");
      }
      if (!reply) {
        reply = buildError("cancel", "service-unavailable");
      }
      if (reply instanceof xml.Element && reply.is("error")) {
        return buildReplyError(ctx, reply, child);
      }
      return buildReplyResult(
        ctx,
        reply instanceof xml.Element ? reply : void 0
      );
    });
  };
}
function route(type, ns, name, handler) {
  return (ctx, next) => {
    if (ctx.type !== type | !ctx.element || !ctx.element.is(name, ns))
      return next();
    return handler(ctx, next);
  };
}
function iqCallee({ middleware: middleware2, entity }) {
  middleware2.use(iqHandler(entity));
  return {
    get(ns, name, handler) {
      middleware2.use(route("get", ns, name, handler));
    },
    set(ns, name, handler) {
      middleware2.use(route("set", ns, name, handler));
    }
  };
}

// node_modules/@xmpp/resolve/lib/dns.js
import dns from "dns";
var IGNORE_CODES = ["ENOTFOUND", "ENODATA"];
function lookup(domain, options = {}) {
  options.all = true;
  return new Promise((resolve6, reject) => {
    dns.lookup(domain, options, (err, addresses) => {
      if (err) {
        return reject(err);
      }
      const result = [];
      for (const { family, address } of addresses) {
        const uri = `://${family === 4 ? address : "[" + address + "]"}:`;
        result.push(
          {
            family,
            address,
            uri: "xmpps" + uri + "5223"
          },
          {
            family,
            address,
            uri: "xmpp" + uri + "5222"
          }
        );
      }
      resolve6(result);
    });
  });
}
function resolveSrv(domain, { service, protocol }) {
  return new Promise((resolve6, reject) => {
    dns.resolveSrv(`_${service}._${protocol}.${domain}`, (err, records) => {
      if (err && IGNORE_CODES.includes(err.code)) {
        resolve6([]);
      } else if (err) {
        reject(err);
      } else {
        resolve6(
          records.map((record) => {
            return Object.assign(record, { service, protocol });
          })
        );
      }
    });
  });
}
function sortSrv(records) {
  return records.toSorted((a, b) => {
    const priority = a.priority - b.priority;
    if (priority !== 0) {
      return priority;
    }
    const weight = b.weight - a.weight;
    if (weight !== 0) {
      return weight;
    }
    return 0;
  });
}
function lookupSrvs(srvs, options) {
  const addresses = [];
  return Promise.all(
    srvs.map((srv) => __async(null, null, function* () {
      const srvAddresses = yield lookup(srv.name, options);
      for (const address of srvAddresses) {
        const { port, service } = srv;
        const addr = address.address;
        addresses.push(__spreadProps(__spreadValues(__spreadValues({}, address), srv), {
          uri: `${service.split("-")[0]}://${address.family === 6 ? "[" + addr + "]" : addr}:${port}`
        }));
      }
    }))
  ).then(() => addresses);
}
function resolve(domain, options = {}) {
  if (!options.srv) {
    options.srv = [
      {
        service: "xmpps-client",
        protocol: "tcp"
      },
      {
        service: "xmpp-client",
        protocol: "tcp"
      },
      {
        service: "xmpps-server",
        protocol: "tcp"
      },
      {
        service: "xmpp-server",
        protocol: "tcp"
      },
      {
        service: "stun",
        protocol: "tcp"
      },
      {
        service: "stun",
        protocol: "udp"
      },
      {
        service: "stuns ",
        protcol: "tcp"
      },
      {
        service: "turn",
        protocol: "tcp"
      },
      {
        service: "turn",
        protocol: "udp"
      },
      {
        service: "turns",
        protcol: "tcp"
      }
    ];
  }
  const family = { options };
  return lookup(domain, options).then((addresses) => {
    return Promise.all(
      options.srv.map((srv) => {
        return resolveSrv(domain, __spreadProps(__spreadValues({}, srv), { family })).then((records) => {
          return lookupSrvs(records, options);
        });
      })
    ).then((srvs) => [...sortSrv(srvs.flat()), ...addresses]);
  });
}

// node_modules/@xmpp/xml/lib/parse.js
function parse2(data) {
  const p = new Parser_default();
  let result = null;
  let error = null;
  p.on("start", (el) => {
    result = el;
  });
  p.on("element", (el) => {
    result.append(el);
  });
  p.on("error", (err) => {
    error = err;
  });
  p.write(data);
  p.end();
  if (error) {
    throw error;
  } else {
    return result;
  }
}

// node_modules/@xmpp/resolve/lib/alt-connections.js
function isSecure2(uri) {
  return uri.startsWith("https") || uri.startsWith("wss");
}
function compare(a, b) {
  let secure;
  if (isSecure2(a.uri) && !isSecure2(b.uri)) {
    secure = -1;
  } else if (!isSecure2(a.uri) && isSecure2(b.uri)) {
    secure = 1;
  } else {
    secure = 0;
  }
  if (secure !== 0) {
    return secure;
  }
  let method;
  if (a.method === b.method) {
    method = 0;
  } else if (a.method === "websocket") {
    method = -1;
  } else if (b.method === "websocket") {
    method = 1;
  } else if (a.method === "xbosh") {
    method = -1;
  } else if (b.method === "xbosh") {
    method = 1;
  } else if (a.method === "httppoll") {
    method = -1;
  } else if (b.method === "httppoll") {
    method = 1;
  } else {
    method = 0;
  }
  if (method !== 0) {
    return method;
  }
  return 0;
}

// node_modules/@xmpp/resolve/lib/http.js
function resolve2(domain) {
  return fetch(`https://${domain}/.well-known/host-meta`).then((res) => res.text()).then((res) => {
    return parse2(res).getChildren("Link").filter(
      (link) => [
        "urn:xmpp:alt-connections:websocket",
        "urn:xmpp:alt-connections:httppoll",
        "urn:xmpp:alt-connections:xbosh"
      ].includes(link.attrs.rel)
    ).map(({ attrs }) => ({
      rel: attrs.rel,
      href: attrs.href,
      method: attrs.rel.split(":").pop(),
      uri: attrs.href
    })).toSorted(compare);
  }).catch(() => {
    return [];
  });
}

// node_modules/@xmpp/resolve/resolve.js
function resolve3(...args) {
  return Promise.all([
    resolve ? resolve(...args) : Promise.resolve([]),
    resolve2(...args)
  ]).then(([records, endpoints]) => [...records, ...endpoints]);
}

// node_modules/@xmpp/resolve/index.js
function fetchURIs(domain) {
  return __async(this, null, function* () {
    const result = yield resolve3(domain, {
      srv: [
        {
          service: "xmpps-client",
          protocol: "tcp"
        },
        {
          service: "xmpp-client",
          protocol: "tcp"
        }
      ]
    });
    return [
      // Remove duplicates
      ...new Set(result.map((record) => record.uri))
    ];
  });
}
function filterSupportedURIs(entity, uris) {
  return uris.filter((uri) => entity._findTransport(uri));
}
function fallbackConnect(entity, uris) {
  return __async(this, null, function* () {
    if (uris.length === 0) {
      throw new Error("Couldn't connect");
    }
    const uri = uris.shift();
    const Transport = entity._findTransport(uri);
    if (!Transport) {
      return fallbackConnect(entity, uris);
    }
    entity._status("connecting", uri);
    const params = Transport.prototype.socketParameters(uri);
    const socket = new Transport.prototype.Socket();
    try {
      socket.connect(params);
      yield promise(socket, "connect");
    } catch (e) {
      return fallbackConnect(entity, uris);
    }
    entity._attachSocket(socket);
    socket.emit("connect");
    entity.Transport = Transport;
    entity.Socket = Transport.prototype.Socket;
    entity.Parser = Transport.prototype.Parser;
  });
}
function resolve4({ entity }) {
  const _connect = entity.connect;
  entity.connect = function connect(service) {
    return __async(this, null, function* () {
      if (!service || /:\/\//.test(service)) {
        return _connect.call(this, service);
      }
      const uris = filterSupportedURIs(entity, yield fetchURIs(service));
      if (uris.length === 0) {
        throw new Error("No compatible transport found.");
      }
      try {
        yield fallbackConnect(entity, uris);
      } catch (err) {
        yield entity.disconnect();
        entity._status("disconnect");
        throw err;
      }
    });
  };
}

// node_modules/@xmpp/starttls/starttls.js
import tls3 from "tls";
import net from "net";
function canUpgrade(socket) {
  return socket instanceof net.Socket && !(socket instanceof tls3.TLSSocket);
}
function upgrade(_0) {
  return __async(this, arguments, function* (socket, options = {}) {
    const tlsSocket = new Socket_default();
    tlsSocket.connect(__spreadValues({ socket }, options));
    yield promise(tlsSocket, "connect");
    return tlsSocket;
  });
}

// node_modules/@xmpp/starttls/index.js
var NS = "urn:ietf:params:xml:ns:xmpp-tls";
function negotiate(entity) {
  return __async(this, null, function* () {
    const element = yield entity.sendReceive(xml("starttls", { xmlns: NS }));
    if (element.is("proceed", NS)) {
      return element;
    }
    throw new Error("STARTTLS_FAILURE");
  });
}
function starttls({ streamFeatures: streamFeatures2 }) {
  return streamFeatures2.use("starttls", NS, (_0, _1) => __async(null, [_0, _1], function* ({ entity }, next) {
    const { socket, options } = entity;
    if (!canUpgrade(socket)) {
      return next();
    }
    yield negotiate(entity);
    const tlsSocket = yield upgrade(socket, { host: options.domain });
    entity._attachSocket(tlsSocket);
    yield entity.restart();
  }));
}

// node_modules/@xmpp/base64/index.js
function encode(string) {
  return globalThis.btoa(string);
}
function decode(string) {
  return globalThis.atob(string);
}

// node_modules/@xmpp/sasl/lib/SASLError.js
var SASLError = class extends error_default {
  constructor(...args) {
    super(...args);
    this.name = "SASLError";
  }
};
var SASLError_default = SASLError;

// node_modules/@xmpp/sasl/index.js
var NS2 = "urn:ietf:params:xml:ns:xmpp-sasl";
function getAvailableMechanisms(element, NS8, saslFactory) {
  const offered = new Set(
    element.getChildren("mechanism", NS8).map((m) => m.text())
  );
  const supported = saslFactory._mechs.map(({ name }) => name);
  return supported.filter((mech4) => offered.has(mech4));
}
function authenticate(_0) {
  return __async(this, arguments, function* ({ saslFactory, entity, mechanism, credentials }) {
    const mech4 = saslFactory.create([mechanism]);
    if (!mech4) {
      throw new Error(`SASL: Mechanism ${mechanism} not found.`);
    }
    const { domain } = entity.options;
    const creds = __spreadValues({
      username: null,
      password: null,
      server: domain,
      host: domain,
      realm: domain,
      serviceType: "xmpp",
      serviceName: domain
    }, credentials);
    yield procedure(
      entity,
      mech4.clientFirst && xml(
        "auth",
        { xmlns: NS2, mechanism: mech4.name },
        encode(yield mech4.response(creds))
      ),
      (element, done) => __async(null, null, function* () {
        if (element.getNS() !== NS2) return;
        if (element.name === "challenge") {
          yield mech4.challenge(decode(element.text()));
          const resp = yield mech4.response(creds);
          yield entity.send(
            xml(
              "response",
              { xmlns: NS2, mechanism: mech4.name },
              typeof resp === "string" ? encode(resp) : ""
            )
          );
          return;
        }
        if (element.name === "failure") {
          throw SASLError_default.fromElement(element);
        }
        if (element.name === "success") {
          return done();
        }
      })
    );
  });
}
function sasl({ streamFeatures: streamFeatures2, saslFactory }, onAuthenticate) {
  streamFeatures2.use("mechanisms", NS2, (_0, _1, _2) => __async(null, [_0, _1, _2], function* ({ entity }, _next, element) {
    const mechanisms = getAvailableMechanisms(element, NS2, saslFactory);
    if (mechanisms.length === 0) {
      throw new SASLError_default("SASL: No compatible mechanism available.");
    }
    function done(credentials, mechanism) {
      return __async(this, null, function* () {
        yield authenticate({
          saslFactory,
          entity,
          mechanism,
          credentials
        });
      });
    }
    yield onAuthenticate(done, mechanisms, null, entity);
    yield entity.restart();
  }));
}

// node_modules/@xmpp/sasl2/index.js
var NS3 = "urn:xmpp:sasl:2";
function authenticate2(_0) {
  return __async(this, arguments, function* ({
    saslFactory,
    entity,
    mechanism,
    credentials,
    userAgent,
    streamFeatures: streamFeatures2,
    features
  }) {
    const mech4 = saslFactory.create([mechanism]);
    if (!mech4) {
      throw new Error(`SASL: Mechanism ${mechanism} not found.`);
    }
    const { domain } = entity.options;
    const creds = __spreadValues({
      username: null,
      password: null,
      server: domain,
      host: domain,
      realm: domain,
      serviceType: "xmpp",
      serviceName: domain
    }, credentials);
    yield procedure(
      entity,
      xml("authenticate", { xmlns: NS3, mechanism: mech4.name }, [
        mech4.clientFirst && xml("initial-response", {}, encode(yield mech4.response(creds))),
        userAgent,
        ...streamFeatures2
      ]),
      (element, done) => __async(null, null, function* () {
        var _a, _b;
        if (element.getNS() !== NS3) return;
        if (element.name === "challenge") {
          yield mech4.challenge(decode(element.text()));
          const resp = yield mech4.response(creds);
          yield entity.send(
            xml(
              "response",
              { xmlns: NS3, mechanism: mech4.name },
              typeof resp === "string" ? encode(resp) : ""
            )
          );
          return;
        }
        if (element.name === "failure") {
          throw SASLError_default.fromElement(element);
        }
        if (element.name === "continue") {
          throw new Error("SASL continue is not supported yet");
        }
        if (element.name === "success") {
          const additionalData = (_a = element.getChild("additional-data")) == null ? void 0 : _a.text();
          if (additionalData && mech4.final) {
            yield mech4.final(decode(additionalData));
          }
          const aid = element.getChildText("authorization-identifier");
          if (aid) {
            entity._jid(aid);
          }
          for (const child of element.getChildElements()) {
            const feature = features.get(child.getNS());
            (_b = feature == null ? void 0 : feature[1]) == null ? void 0 : _b.call(feature, child);
          }
          return done();
        }
      })
    );
  });
}
function sasl2({ streamFeatures: streamFeatures2, saslFactory }, onAuthenticate) {
  const features = /* @__PURE__ */ new Map();
  let fast2;
  streamFeatures2.use(
    "authentication",
    NS3,
    (_0, _1, _2) => __async(null, [_0, _1, _2], function* ({ entity }, _next, element) {
      const mechanisms = getAvailableMechanisms(element, NS3, saslFactory);
      const streamFeatures3 = yield getStreamFeatures({ element, features });
      const fast_available = !!(fast2 == null ? void 0 : fast2.mechanism);
      if (mechanisms.length === 0 && !fast_available) {
        throw new SASLError_default("SASL: No compatible mechanism available.");
      }
      yield onAuthenticate(
        done,
        mechanisms,
        fast_available ? fast2 : null,
        entity
      );
      function done(credentials, mechanism, userAgent) {
        return __async(this, null, function* () {
          const success = yield fast2.auth({
            authenticate: authenticate2,
            entity,
            userAgent,
            streamFeatures: streamFeatures3,
            features,
            credentials
          });
          if (success) return;
          yield authenticate2({
            entity,
            userAgent,
            streamFeatures: streamFeatures3,
            features,
            saslFactory,
            mechanism,
            credentials
          });
        });
      }
    })
  );
  return {
    use(ns, req, res) {
      features.set(ns, [req, res]);
    },
    setup({ fast: _fast }) {
      fast2 = _fast;
    }
  };
}
function getStreamFeatures(_0) {
  return __async(this, arguments, function* ({ element, features }) {
    const promises = [];
    const inline = element.getChild("inline");
    if (!inline) return promises;
    for (const element2 of inline.getChildElements()) {
      const xmlns = element2.getNS();
      const feature = features.get(xmlns);
      if (!feature) continue;
      promises.push(feature[0](element2));
    }
    return Promise.all(promises);
  });
}

// node_modules/@xmpp/resource-binding/index.js
var NS4 = "urn:ietf:params:xml:ns:xmpp-bind";
function makeBindElement(resource) {
  return xml("bind", { xmlns: NS4 }, resource && xml("resource", {}, resource));
}
function bind(entity, iqCaller2, resource) {
  return __async(this, null, function* () {
    const result = yield iqCaller2.set(makeBindElement(resource));
    const jid2 = result.getChildText("jid");
    entity._jid(jid2);
    entity._ready(false);
    return jid2;
  });
}
function route2({ iqCaller: iqCaller2 }, resource) {
  return (_0, _1) => __async(null, [_0, _1], function* ({ entity }, next) {
    resource = typeof resource === "function" ? yield resource() : resource;
    yield bind(entity, iqCaller2, resource);
    next();
  });
}
function resourceBinding({ streamFeatures: streamFeatures2, iqCaller: iqCaller2 }, resource) {
  streamFeatures2.use("bind", NS4, route2({ iqCaller: iqCaller2 }, resource));
}

// node_modules/@xmpp/time/index.js
function datetime(d = /* @__PURE__ */ new Date()) {
  if (typeof d === "string") {
    d = new Date(d);
  }
  return new Date(d).toISOString().split(".")[0] + "Z";
}

// node_modules/@xmpp/stream-management/bind2.js
function setupBind2({ bind2: bind22, sm, failed, enabled }) {
  bind22.use(
    NS5,
    // https://xmpp.org/extensions/xep-0198.html#inline-examples
    (_element) => {
      return makeEnableElement({ sm });
    },
    (element) => __async(null, null, function* () {
      if (element.is("enabled")) {
        enabled(element.attrs);
      } else if (element.is("failed")) {
        failed();
      }
    })
  );
}

// node_modules/@xmpp/stream-management/sasl2.js
function setupSasl2({ sasl2: sasl22, sm, failed, resumed }) {
  sasl22.use(
    NS5,
    (element) => {
      if (!element.is("sm")) return;
      if (sm.id) return makeResumeElement({ sm });
    },
    (element) => {
      if (element.is("resumed")) {
        resumed(element);
      } else if (element.is("failed")) {
        failed();
      }
    }
  );
}

// node_modules/@xmpp/stream-management/stream-feature.js
function setupStreamFeature({
  streamFeatures: streamFeatures2,
  sm,
  entity,
  resumed,
  failed,
  enabled
}) {
  streamFeatures2.use("sm", NS5, (context, next) => __async(null, null, function* () {
    if (sm.id) {
      try {
        const element = yield resume(entity, sm);
        yield resumed(element);
        return;
      } catch (e) {
        failed();
      }
    }
    yield next();
    const promiseEnable = enable(entity, sm);
    if (sm.outbound_q.length > 0) {
      throw new Error(
        "Stream Management assertion failure, queue should be empty after enable"
      );
    }
    sm.outbound = 0;
    try {
      const response2 = yield promiseEnable;
      enabled(response2.attrs);
    } catch (e) {
      sm.enabled = false;
      sm.enableSent = false;
    }
  }));
}
function enable(entity, sm) {
  return procedure(entity, makeEnableElement({ sm }), (element, done) => {
    if (element.is("enabled", NS5)) {
      return done(element);
    } else if (element.is("failed", NS5)) {
      throw error_default.fromElement(element);
    }
  });
}
function resume(entity, sm) {
  return __async(this, null, function* () {
    return procedure(entity, makeResumeElement({ sm }), (element, done) => {
      if (element.is("resumed", NS5)) {
        return done(element);
      } else if (element.is("failed", NS5)) {
        throw error_default.fromElement(element);
      }
    });
  });
}

// node_modules/@xmpp/stream-management/index.js
var NS5 = "urn:xmpp:sm:3";
function makeEnableElement({ sm }) {
  return xml("enable", {
    xmlns: NS5,
    max: sm.preferredMaximum,
    resume: "true"
  });
}
function makeResumeElement({ sm }) {
  return xml("resume", { xmlns: NS5, h: sm.inbound, previd: sm.id });
}
function streamManagement({
  streamFeatures: streamFeatures2,
  entity,
  middleware: middleware2,
  bind2: bind22,
  sasl2: sasl22
}) {
  let timeoutTimeout = null;
  let requestAckTimeout = null;
  let requestAckDebounce = null;
  const sm = new EventEmitter2();
  Object.assign(sm, {
    preferredMaximum: null,
    enabled: false,
    enableSent: false,
    id: "",
    outbound_q: [],
    outbound: 0,
    inbound: 0,
    max: null,
    timeout: 6e4,
    requestAckInterval: 3e4,
    requestAckDebounce: 250
  });
  function sendAck() {
    return __async(this, null, function* () {
      try {
        yield entity.send(xml("a", { xmlns: NS5, h: sm.inbound }));
      } catch (e) {
      }
    });
  }
  entity.on("disconnect", () => {
    clearTimeout(timeoutTimeout);
    clearTimeout(requestAckTimeout);
    clearTimeout(requestAckDebounce);
    sm.enabled = false;
    sm.enableSent = false;
  });
  entity.hook("close", () => __async(null, null, function* () {
    if (!sm.enabled) return;
    yield sendAck();
  }));
  function resumed(resumed2) {
    return __async(this, null, function* () {
      sm.enabled = true;
      ackQueue(+resumed2.attrs.h);
      let q = sm.outbound_q;
      sm.outbound_q = [];
      yield entity.sendMany(q.map((item) => queueToStanza({ entity, item })));
      sm.emit("resumed");
      entity._ready(true);
      scheduleRequestAck();
    });
  }
  function failed() {
    sm.enabled = false;
    sm.enableSent = false;
    sm.id = "";
    failQueue();
  }
  function ackQueue(n) {
    const oldOutbound = sm.outbound;
    for (let i = 0; i < +n - oldOutbound; i++) {
      const item = sm.outbound_q.shift();
      sm.outbound++;
      sm.emit("ack", item.stanza);
    }
  }
  function failQueue() {
    let item;
    while (item = sm.outbound_q.shift()) {
      sm.emit("fail", item.stanza);
    }
    sm.outbound = 0;
  }
  function enabled({ id: id2, max }) {
    sm.enabled = true;
    sm.id = id2;
    sm.max = max;
    sm.inbound = 0;
    scheduleRequestAck();
  }
  entity.on("offline", () => {
    failQueue();
    sm.inbound = 0;
    sm.enabled = false;
    sm.enableSent = false;
    sm.id = "";
  });
  middleware2.use((context, next) => __async(null, null, function* () {
    const { stanza } = context;
    clearTimeout(timeoutTimeout);
    timeoutTimeout = null;
    if (["presence", "message", "iq"].includes(stanza.name)) {
      sm.inbound += 1;
    } else if (stanza.is("r", NS5)) {
      yield sendAck();
    } else if (stanza.is("a", NS5)) {
      ackQueue(+stanza.attrs.h);
    }
    scheduleRequestAck();
    return next();
  }));
  if (bind22) {
    setupBind2({ bind2: bind22, sm, failed, enabled });
  }
  if (sasl22) {
    setupSasl2({ sasl2: sasl22, sm, failed, resumed });
  }
  function scheduleRequestAck(timeout2 = sm.requestAckInterval) {
    clearTimeout(requestAckTimeout);
    if (!sm.enabled) return;
    if (!timeout2) return;
    requestAckTimeout = setTimeout(requestAck, timeout2);
  }
  function requestAck() {
    clearTimeout(requestAckTimeout);
    clearTimeout(requestAckDebounce);
    if (!sm.enabled) return;
    if (sm.timeout && !timeoutTimeout) {
      timeoutTimeout = setTimeout(() => {
        clearTimeout(requestAckTimeout);
        entity.disconnect().catch(() => {
        });
      }, sm.timeout);
    }
    entity.send(xml("r", { xmlns: NS5 })).catch(() => {
    });
    scheduleRequestAck();
  }
  middleware2.filter((context, next) => {
    const { stanza } = context;
    if (stanza.is("enable", NS5)) {
      sm.enableSent = true;
    }
    if (!sm.enabled && !sm.enableSent) return next();
    if (!["presence", "message", "iq"].includes(stanza.name)) return next();
    sm.outbound_q.push({ stanza, stamp: datetime() });
    clearTimeout(requestAckTimeout);
    clearTimeout(requestAckDebounce);
    requestAckDebounce = setTimeout(requestAck, sm.requestAckDebounce);
    return next();
  });
  if (streamFeatures2) {
    setupStreamFeature({
      streamFeatures: streamFeatures2,
      sm,
      entity,
      resumed,
      failed,
      enabled
    });
  }
  return sm;
}
function queueToStanza({ entity, item }) {
  const { stanza, stamp } = item;
  if (stanza.name === "message" && !stanza.getChild("delay", "urn:xmpp:delay")) {
    stanza.append(
      xml("delay", {
        xmlns: "urn:xmpp:delay",
        from: entity.jid.toString(),
        stamp
      })
    );
  }
  return stanza;
}

// node_modules/@xmpp/client-core/src/bind2/bind2.js
var NS6 = "urn:xmpp:bind:0";
function bind2({ sasl2: sasl22, entity }, tag) {
  const features = /* @__PURE__ */ new Map();
  sasl22.use(
    NS6,
    (element) => __async(null, null, function* () {
      if (!element.is("bind", NS6)) return;
      tag = typeof tag === "function" ? yield tag() : tag;
      const sessionFeatures = yield getSessionFeatures({ element, features });
      return xml(
        "bind",
        { xmlns: "urn:xmpp:bind:0" },
        tag && xml("tag", null, tag),
        ...sessionFeatures
      );
    }),
    (element) => {
      var _a;
      if (!element.is("bound")) return;
      entity._ready(false);
      for (const child of element.getChildElements()) {
        const feature = features.get(child.getNS());
        (_a = feature == null ? void 0 : feature[1]) == null ? void 0 : _a.call(feature, child);
      }
    }
  );
  return {
    use(ns, req, res) {
      features.set(ns, [req, res]);
    }
  };
}
function getSessionFeatures({ element, features }) {
  const promises = [];
  const inline = element.getChild("inline");
  if (!inline) return promises;
  for (const element2 of inline.getChildElements()) {
    const xmlns = element2.attrs.var;
    const feature = features.get(xmlns);
    if (!feature) continue;
    promises.push(feature[0](element2));
  }
  return Promise.all(promises);
}

// node_modules/@xmpp/client-core/src/fast/fast.js
var import_saslmechanisms = __toESM(require_main(), 1);
var NS7 = "urn:xmpp:fast:0";
function fast({ sasl2: sasl22, entity }) {
  const saslFactory = new import_saslmechanisms.default();
  let token;
  const fast2 = new EventEmitter2();
  Object.assign(fast2, {
    mechanism: null,
    mechanisms: [],
    saveToken(t) {
      return __async(this, null, function* () {
        token = t;
      });
    },
    fetchToken() {
      return __async(this, null, function* () {
        return token;
      });
    },
    deleteToken() {
      return __async(this, null, function* () {
        token = null;
      });
    },
    save(token2) {
      return __async(this, null, function* () {
        try {
          yield this.saveToken(token2);
        } catch (err) {
          entity.emit("error", err);
        }
      });
    },
    fetch() {
      return __async(this, null, function* () {
        try {
          return this.fetchToken();
        } catch (err) {
          entity.emit("error", err);
        }
      });
    },
    delete() {
      return __async(this, null, function* () {
        try {
          yield this.deleteToken();
        } catch (err) {
          entity.emit("error", err);
        }
      });
    },
    saslFactory,
    auth(_0) {
      return __async(this, arguments, function* ({
        authenticate: authenticate3,
        entity: entity2,
        userAgent,
        credentials,
        streamFeatures: streamFeatures2,
        features
      }) {
        if (!fast2.mechanism) {
          return false;
        }
        const { token: token2 } = credentials;
        if (!isTokenValid(token2, fast2.mechanisms)) {
          return onInvalidToken();
        }
        try {
          yield authenticate3({
            saslFactory: fast2.saslFactory,
            mechanism: token2.mechanism,
            credentials: __spreadProps(__spreadValues({}, credentials), {
              password: token2.token
            }),
            streamFeatures: [
              ...streamFeatures2,
              xml("fast", {
                xmlns: NS7
              })
            ],
            entity: entity2,
            userAgent,
            features
          });
          return true;
        } catch (err) {
          if (err instanceof SASLError_default && ["not-authorized", "credentials-expired"].includes(err.condition)) {
            return onInvalidToken();
          }
          entity2.emit("error", err);
          return false;
        }
        function onInvalidToken() {
          return __async(this, null, function* () {
            yield fast2.delete();
            requestToken(streamFeatures2);
            return false;
          });
        }
      });
    }
  });
  function requestToken(streamFeatures2) {
    streamFeatures2.push(
      xml("request-token", {
        xmlns: NS7,
        mechanism: fast2.mechanism
      })
    );
  }
  function reset() {
    fast2.mechanism = null;
    fast2.mechanisms = [];
  }
  reset();
  sasl22.use(
    NS7,
    (element) => __async(null, null, function* () {
      if (!element.is("fast", NS7)) return reset();
      fast2.available = true;
      const mechanisms = getAvailableMechanisms(element, NS7, saslFactory);
      const mechanism = mechanisms[0];
      if (!mechanism) return reset();
      fast2.mechanisms = mechanisms;
      fast2.mechanism = mechanism;
    }),
    (element) => __async(null, null, function* () {
      if (element.is("token", NS7)) {
        yield fast2.save({
          // The token is bound by the mechanism
          // > Servers MUST bind tokens to the mechanism selected by the client in its original request, and reject attempts to use them with other mechanisms.
          mechanism: fast2.mechanism,
          token: element.attrs.token,
          expiry: element.attrs.expiry
        });
      }
    })
  );
  return fast2;
}
function isTokenValid(token, mechanisms) {
  if (!token) return false;
  if (!mechanisms.includes(token.mechanism)) {
    return false;
  }
  if (new Date(token.expiry) <= /* @__PURE__ */ new Date()) {
    return false;
  }
  return true;
}

// node_modules/@xmpp/client/index.js
var import_saslmechanisms2 = __toESM(require_main(), 1);

// node_modules/@xmpp/sasl-scram-sha-1/index.js
var import_sasl_scram_sha_1 = __toESM(require_sasl_scram_sha_1(), 1);
function saslScramSha1(sasl3) {
  sasl3.use(import_sasl_scram_sha_1.default);
}

// node_modules/@xmpp/sasl-plain/index.js
var import_sasl_plain = __toESM(require_main2(), 1);
function saslPlain(sasl3) {
  sasl3.use(import_sasl_plain.default);
}

// node_modules/@xmpp/sasl-anonymous/index.js
var import_sasl_anonymous = __toESM(require_main3(), 1);
function saslAnonymous(sasl3) {
  sasl3.use(import_sasl_anonymous.default);
}

// node_modules/@xmpp/sasl-ht-sha-256-none/index.js
function Mechanism() {
}
Mechanism.prototype.Mechanism = Mechanism;
Mechanism.prototype.name = "HT-SHA-256-NONE";
Mechanism.prototype.clientFirst = true;
Mechanism.prototype.response = function response(_0) {
  return __async(this, arguments, function* ({ username, password }) {
    this.key = yield crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(password),
      // https://developer.mozilla.org/en-US/docs/Web/API/HmacImportParams
      { name: "HMAC", hash: "SHA-256" },
      false,
      // extractable
      ["sign", "verify"]
    );
    const signature = yield crypto.subtle.sign(
      "HMAC",
      this.key,
      new TextEncoder().encode("Initiator")
    );
    return `${username}\0${String.fromCodePoint(...new Uint8Array(signature))}`;
  });
};
Mechanism.prototype.final = function final(data) {
  return __async(this, null, function* () {
    const signature = Uint8Array.from(data, (c) => c.codePointAt(0));
    const result = yield crypto.subtle.verify(
      "HMAC",
      this.key,
      signature,
      new TextEncoder().encode("Responder")
    );
    if (result !== true) {
      throw new Error("Responder message from server was wrong");
    }
  });
};
function saslHashedToken(sasl3) {
  sasl3.use(Mechanism);
}

// node_modules/@xmpp/client/lib/createOnAuthenticate.js
var ANONYMOUS = "ANONYMOUS";
var PLAIN = "PLAIN";
function createOnAuthenticate(credentials, userAgent) {
  return function onAuthenticate(...args) {
    return __async(this, null, function* () {
      var _a;
      if (typeof credentials === "function") {
        yield credentials(...args);
        return;
      }
      const [authenticate3, mechanisms, fast2, entity] = args;
      (_a = credentials.token) != null ? _a : credentials.token = yield fast2 == null ? void 0 : fast2.fetch();
      const mechanism = getMechanism({ mechanisms, entity, credentials });
      yield authenticate3(credentials, mechanism, userAgent);
    });
  };
}
function getMechanism({ mechanisms, entity, credentials }) {
  if (!(credentials == null ? void 0 : credentials.username) && !(credentials == null ? void 0 : credentials.password) && !(credentials == null ? void 0 : credentials.token) && mechanisms.includes(ANONYMOUS)) {
    return ANONYMOUS;
  }
  if (entity.isSecure()) return mechanisms[0];
  return mechanisms.find((mechanism) => mechanism !== PLAIN);
}

// node_modules/@xmpp/client/lib/getDomain.js
function getDomain(service) {
  const domain = service.split("://")[1] || service;
  return domain.split(":")[0].split("/")[0];
}

// node_modules/@xmpp/client/index.js
function client(options = {}) {
  let _a = options, { resource, credentials, username, password, userAgent } = _a, params = __objRest(_a, ["resource", "credentials", "username", "password", "userAgent"]);
  const { domain, service } = params;
  if (!domain && service) {
    params.domain = getDomain(service);
  }
  const entity = new Client_default(params);
  if (username && params.domain) {
    entity.jid = jid_default(username, params.domain);
  }
  const reconnect2 = reconnect({ entity });
  const websocket2 = websocket({ entity });
  const tcp2 = setupIfAvailable(tcp, { entity });
  const tls4 = setupIfAvailable(tls2, { entity });
  const middleware2 = middleware({ entity });
  const streamFeatures2 = streamFeatures({ middleware: middleware2 });
  const iqCaller2 = iqCaller({ middleware: middleware2, entity });
  const iqCallee2 = iqCallee({ middleware: middleware2, entity });
  const resolve6 = resolve4({ entity });
  const saslFactory = new import_saslmechanisms2.default();
  const mechanisms = Object.entries(__spreadProps(__spreadValues({}, typeof saslScramSha1 === "function" && { scramsha1: saslScramSha1 }), {
    plain: saslPlain,
    anonymous: saslAnonymous
  })).map(([k, v]) => ({ [k]: v(saslFactory) }));
  userAgent != null ? userAgent : userAgent = xml("user-agent", { id: globalThis.crypto.randomUUID() });
  const starttls2 = setupIfAvailable(starttls, { streamFeatures: streamFeatures2 });
  const sasl22 = sasl2(
    { streamFeatures: streamFeatures2, saslFactory },
    createOnAuthenticate(credentials != null ? credentials : { username, password }, userAgent)
  );
  const fast2 = fast({
    sasl2: sasl22,
    entity
  });
  sasl22.setup({ fast: fast2 });
  const bind22 = bind2({ sasl2: sasl22, entity }, resource);
  saslHashedToken(fast2.saslFactory);
  const sasl3 = sasl(
    { streamFeatures: streamFeatures2, saslFactory },
    createOnAuthenticate(credentials != null ? credentials : { username, password }, userAgent)
  );
  const streamManagement2 = streamManagement({
    streamFeatures: streamFeatures2,
    entity,
    middleware: middleware2,
    bind2: bind22,
    sasl2: sasl22
  });
  const resourceBinding2 = resourceBinding(
    { iqCaller: iqCaller2, streamFeatures: streamFeatures2 },
    resource
  );
  iqCallee2 == null ? void 0 : iqCallee2.get("urn:xmpp:ping", "ping", () => {
    return {};
  });
  return Object.assign(entity, {
    entity,
    reconnect: reconnect2,
    tcp: tcp2,
    websocket: websocket2,
    tls: tls4,
    middleware: middleware2,
    streamFeatures: streamFeatures2,
    iqCaller: iqCaller2,
    iqCallee: iqCallee2,
    resolve: resolve6,
    starttls: starttls2,
    saslFactory,
    sasl2: sasl22,
    sasl: sasl3,
    resourceBinding: resourceBinding2,
    streamManagement: streamManagement2,
    mechanisms,
    bind2: bind22,
    fast: fast2
  });
}
function setupIfAvailable(module, ...args) {
  if (typeof module !== "function") {
    return void 0;
  }
  return module(...args);
}

// src/@modules/@utilities/utilities.setSleep.ts
var setSleep = (options) => __async(null, null, function* () {
  return new Promise((resolve6) => {
    setTimeout(() => {
      resolve6();
    }, options.timeout);
  });
});

// src/@modules/@xmpp/xmpp.xOnline.ts
var xOnline = () => {
  const settings = bootstrap.settings;
  bootstrap.session_xmpp.on(`online`, (address) => __async(null, null, function* () {
    const tick = Date.now();
    if (bootstrap.cache.lastConnect && tick - bootstrap.cache.lastConnect > 1e4) {
      bootstrap.cache.sigHault = true;
      setEventEmit({
        event: `onXMPPStatus`,
        metadata: {
          message: `The XMPP Client is attempting to reconnect too fast, this may be due to network instability and this reconnect request has been throttled. We will attempt to reconnect when all connections have been killed`,
          data: {},
          type: `offline`,
          error: true
        }
      });
      yield setSleep({ timeout: 2e3 });
      bootstrap.session_xmpp.stop().catch(() => {
      });
      return;
    }
    bootstrap.cache.sigHault = false;
    bootstrap.cache.isConnected = true;
    bootstrap.cache.lastConnect = tick;
    const nickname = settings.NOAAWeatherWireServiceSettings.CredentialSettings.Nickname;
    bootstrap.session_xmpp.send(xml("presence", {
      to: `nwws@conference.nwws-oi.weather.gov/${nickname}`,
      xmlns: "http://jabber.org/protocol/muc"
    }));
    setEventEmit({
      event: `onXMPPStatus`,
      metadata: {
        message: `Succesfully connected to NOAA Weather Wire Service as "${nickname}"`,
        data: {},
        type: `online`,
        error: false
      }
    });
  }));
};

// src/@modules/@xmpp/xmpp.xOffline.ts
var xOffline = () => {
  bootstrap.session_xmpp.on(`offline`, () => __async(null, null, function* () {
    bootstrap.cache.isConnected = false;
    bootstrap.cache.sigHault = true;
    setEventEmit({
      event: `onXMPPStatus`,
      metadata: {
        message: `Client has gone offline`,
        data: {},
        type: `offline`,
        error: true
      }
    });
  }));
};

// src/@modules/@xmpp/xmpp.xError.ts
var xError = () => {
  bootstrap.session_xmpp.on(`error`, (error) => __async(null, null, function* () {
    bootstrap.cache.isConnected = false;
    bootstrap.cache.sigHault = true;
    setEventEmit({
      event: `onXMPPStatus`,
      metadata: {
        message: `Client has recieved an error`,
        data: {},
        type: `error`,
        error: true
      }
    });
  }));
};

// src/@dictionaries/dictionaries.regExp.ts
var regExp = {
  pvtec: new RegExp(`[OTEX].(NEW|CON|EXT|EXA|EXB|UPG|CAN|EXP|COR|ROU).[A-Z]{4}.[A-Z]{2}.[WAYSFON].[0-9]{4}.[0-9]{6}T[0-9]{4}Z-[0-9]{6}T[0-9]{4}Z`, "g"),
  hvtec: new RegExp(`[a-zA-Z0-9]{4}.[A-Z0-9].[A-Z]{2}.[0-9]{6}T[0-9]{4}Z.[0-9]{6}T[0-9]{4}Z.[0-9]{6}T[0-9]{4}Z.[A-Z]{2}`, "imu"),
  wmo: new RegExp(`[A-Z0-9]{6}\\s[A-Z]{4}\\s\\d{6}`, "imu"),
  ugc1: new RegExp(`(\\w{2}[CZ](\\d{3}((-|>)\\s?(\\n\\n)?))+)`, "imu"),
  ugc2: new RegExp(`(\\d{6}(-|>)\\s?(\\n\\n)?)`, "imu"),
  ugc3: new RegExp(`(\\d{6})(?=-|$)`, "imu"),
  dateline: new RegExp(`\\d{3,4}\\s*(AM|PM)?\\s*[A-Z]{2,4}\\s+[A-Z]{3,}\\s+[A-Z]{3,}\\s+\\d{1,2}\\s+\\d{4}`, "gim")
};

// src/@dictionaries/dictionaries.eventAwipAbreviations.ts
var eventAwipAbreviations = {
  ABV: `rawinsonde-data-above-100-millibars`,
  ADA: `alarm-alert-administrative-message`,
  ADM: `alert-administrative-message`,
  ADR: `nws-administrative-message`,
  ADV: `space-environment-advisory`,
  AFD: `area-forecast-discussion`,
  AFM: `area-forecast-matrices`,
  AFP: `area-forecast-product`,
  AFW: `fire-weather-matrix`,
  AGF: `agricultural-forecast`,
  AGO: `agricultural-observations`,
  ALT: `space-environment-alert`,
  AQA: `air-quality-alert`,
  AQI: `air-quality-index-statement`,
  ASA: `air-stagnation-advisory`,
  AVA: `avalanche-watch`,
  AVG: `avalanche-weather-guidance`,
  AVW: `avalanche-warning`,
  AWO: `area-weather-outlook`,
  AWS: `area-weather-summary`,
  AWU: `area-weather-update`,
  AWW: `airport-weather-warning`,
  BLU: `blue-alert`,
  BOY: `buoy-report`,
  BRG: `coast-guard-observations`,
  BRT: `hourly-roundup-for-weather-radio`,
  CAE: `child-abduction-emergency`,
  CCF: `coded-city-forecast`,
  CDW: `civil-danger-warning`,
  CEM: `civil-emergency-message`,
  CF6: `monthly-daily-climate-data`,
  CFP: `convective-forecast-product`,
  CFW: `coastal-flood-warnings-watches-statements`,
  CGR: `coast-guard-surface-report`,
  CHG: `computer-hurricane-guidance`,
  CLA: `climatological-report-annual`,
  CLI: `climatological-report-daily`,
  CLM: `climatological-report-monthly`,
  CLQ: `climatological-report-quarterly`,
  CLS: `climatological-report-seasonal`,
  CLT: `climate-report`,
  CMM: `coded-climatological-monthly-means`,
  COD: `coded-analysis-and-forecasts`,
  CPF: `great-lakes-port-forecast`,
  CUR: `space-environment-products-routine`,
  CWA: `center-weather-advisory`,
  CWF: `coastal-waters-forecast`,
  CWS: `center-weather-statement`,
  DAY: `space-environment-product-daily`,
  DDO: `daily-dispersion-outlook`,
  DGT: `drought-information-statement`,
  DMO: `practice-demo-warning`,
  DSA: `unnumbered-depression-advisory`,
  DSM: `asos-daily-summary`,
  DSW: `dust-storm-warning`,
  EFP: `extended-forecast-3-to-5-day`,
  EOL: `six-to-ten-day-weather-outlook-local`,
  EQI: `tsunami-bulletin`,
  EQR: `earthquake-report`,
  EQW: `earthquake-warning`,
  ESF: `flood-potential-outlook`,
  ESG: `extended-streamflow-guidance`,
  ESP: `extended-streamflow-prediction`,
  ESS: `water-supply-outlook`,
  EVI: `evacuation-immediate`,
  EWW: `extreme-wind-warning`,
  FA0: `aviation-area-forecast-pacific`,
  FA1: `aviation-area-forecast-northeast`,
  FA2: `aviation-area-forecast-southeast`,
  FA3: `aviation-area-forecast-north-central`,
  FA4: `aviation-area-forecast-south-central`,
  FA5: `aviation-area-forecast-rocky-mountains`,
  FA6: `aviation-area-forecast-west-coast`,
  FA7: `aviation-area-forecast-juneau-ak`,
  FA8: `aviation-area-forecast-anchorage-ak`,
  FA9: `aviation-area-forecast-fairbanks-ak`,
  FD0: `winds-aloft-forecast-24hr-high-altitude`,
  FD1: `winds-aloft-forecast-6hr`,
  FD2: `winds-aloft-forecast-12hr`,
  FD3: `winds-aloft-forecast-24hr`,
  FD4: `winds-aloft-forecast`,
  FD5: `winds-aloft-forecast`,
  FD6: `winds-aloft-forecast`,
  FD7: `winds-aloft-forecast`,
  FD8: `winds-aloft-forecast-6hr-high-altitude`,
  FD9: `winds-aloft-forecast-12hr-high-altitude`,
  FDI: `fire-danger-indices`,
  FFA: `flash-flood-watch`,
  FFG: `flash-flood-guidance`,
  FFH: `headwater-guidance`,
  FFS: `flash-flood-statement`,
  FFW: `flash-flood-warning`,
  FLN: `national-flood-summary`,
  FLS: `flood-statement`,
  FLW: `flood-warning`,
  FOF: `upper-wind-fallout-forecast`,
  FRW: `fire-warning`,
  FSH: `marine-fisheries-service-message`,
  FTM: `radar-outage-notification`,
  FTP: `temp-pop-guidance`,
  FWA: `fire-weather-administrative-message`,
  FWD: `fire-weather-outlook-discussion`,
  FWF: `fire-weather-forecast`,
  FWL: `land-management-forecast`,
  FWM: `miscellaneous-fire-weather-product`,
  FWN: `fire-weather-notification`,
  FWO: `fire-weather-observation`,
  FWS: `fire-weather-spot-forecast`,
  FZL: `freezing-level-data`,
  GLF: `great-lakes-forecast`,
  GLS: `great-lakes-storm-summary`,
  GRE: `green`,
  HD1: `rfc-qpf-data-product`,
  HD2: `rfc-qpf-data-product`,
  HD3: `rfc-qpf-data-product`,
  HD4: `rfc-qpf-data-product`,
  HD7: `rfc-qpf-data-product`,
  HD8: `rfc-qpf-data-product`,
  HD9: `rfc-qpf-data-product`,
  HLS: `hurricane-local-statement`,
  HMD: `hydrometeorological-discussion`,
  HML: `ahps-xml-product`,
  HMW: `hazardous-materials-warning`,
  HP1: `rfc-qpf-verification-product`,
  HP2: `rfc-qpf-verification-product`,
  HP3: `rfc-qpf-verification-product`,
  HP4: `rfc-qpf-verification-product`,
  HP5: `rfc-qpf-verification-product`,
  HP6: `rfc-qpf-verification-product`,
  HP7: `rfc-qpf-verification-product`,
  HP8: `rfc-qpf-verification-product`,
  HRR: `weather-roundup`,
  HSF: `high-seas-forecast`,
  HWO: `hazardous-weather-outlook`,
  HWR: `hourly-weather-roundup`,
  HYD: `daily-hydrometeorological-products`,
  HYM: `monthly-hydrometeorological-product`,
  ICE: `ice-forecast`,
  IDM: `ice-drift-vectors`,
  INI: `administrative-message`,
  IOB: `ice-observation`,
  KPA: `keep-alive-message`,
  LAE: `local-area-emergency`,
  LCD: `preliminary-local-climatological-data`,
  LCO: `local-cooperative-observation`,
  LEW: `law-enforcement-warning`,
  LFP: `local-forecast`,
  LKE: `lake-stages`,
  LLS: `low-level-sounding`,
  LOW: `low-temperatures`,
  LSR: `local-storm-report`,
  LTG: `lightning-data`,
  MAN: `rawinsonde-mandatory-levels`,
  MAP: `mean-areal-precipitation`,
  MAW: `amended-marine-forecast`,
  MFM: `marine-forecast-matrix`,
  MIM: `marine-interpretation-message`,
  MIS: `miscellaneous-local-product`,
  MOB: `marine-observations`,
  MON: `space-environment-product-monthly`,
  MRP: `marine-product-techniques-development`,
  MSM: `asos-monthly-summary-message`,
  MTR: `metar-observation`,
  MTT: `metar-test-message`,
  MVF: `marine-verification-coded-message`,
  MWS: `marine-weather-statement`,
  MWW: `marine-weather-message`,
  NOU: `weather-reconnaissance-flights`,
  NOW: `short-term-forecast`,
  NOX: `data-management-message`,
  NPW: `non-precipitation-warning`,
  NSH: `nearshore-marine-forecast`,
  NUW: `nuclear-power-plant-warning`,
  NWR: `noaa-weather-radio-forecast`,
  OAV: `other-aviation-products`,
  OBS: `observations`,
  OFA: `offshore-aviation-forecast`,
  OFF: `offshore-forecast`,
  OMR: `other-marine-products`,
  OPU: `other-public-products`,
  OSO: `other-surface-observations`,
  OSW: `ocean-surface-winds`,
  OUA: `other-upper-air-data`,
  OZF: `zone-forecast`,
  PFM: `point-forecast-matrices`,
  PFW: `fire-weather-point-forecast-matrices`,
  PLS: `plain-language-ship-report`,
  PMD: `prognostic-meteorological-discussion`,
  PNS: `public-information-statement`,
  POE: `probability-of-exceedance`,
  PRB: `heat-index-forecast-tables`,
  PRC: `pilot-report-collective`,
  PRE: `preliminary-forecasts`,
  PSH: `post-storm-hurricane-report`,
  PTS: `probabilistic-outlook-points`,
  PWO: `public-severe-weather-outlook`,
  PWS: `tropical-cyclone-probabilities`,
  QPF: `quantitative-precipitation-forecast`,
  QPS: `quantitative-precipitation-statement`,
  RDF: `revised-digital-forecast`,
  REC: `recreational-report`,
  RER: `record-report`,
  RET: `eas-activation-request`,
  RFD: `rangeland-fire-danger-forecast`,
  RFI: `rfi-observation`,
  RFR: `route-forecast`,
  RFW: `red-flag-warning`,
  RHW: `radiological-hazard-warning`,
  RMT: `required-monthly-test`,
  RNS: `rain-information-statement`,
  RR1: `hydro-met-data-report-part-1`,
  RR2: `hydro-met-data-report-part-2`,
  RR3: `hydro-met-data-report-part-3`,
  RR4: `hydro-met-data-report-part-4`,
  RR5: `hydro-met-data-report-part-5`,
  RR6: `hydro-met-data-report-part-6`,
  RR7: `hydro-met-data-report-part-7`,
  RR8: `hydro-met-data-report-part-8`,
  RR9: `hydro-met-data-report-part-9`,
  RRA: `automated-hydrologic-observation-report`,
  RRM: `miscellaneous-hydrologic-data`,
  RRS: `hads-data`,
  RRY: `asos-hourly-test-message`,
  RSD: `daily-snotel-data`,
  RSM: `monthly-snotel-data`,
  RTP: `regional-temp-precip-table`,
  RVA: `river-summary`,
  RVD: `daily-river-forecast`,
  RVF: `river-forecast`,
  RVI: `river-ice-statement`,
  RVM: `miscellaneous-river-product`,
  RVR: `river-recreation-statement`,
  RVS: `river-statement`,
  RWR: `regional-weather-roundup`,
  RWS: `regional-weather-summary`,
  RWT: `required-weekly-test`,
  SAB: `special-avalanche-bulletin`,
  SAF: `agricultural-weather-forecast`,
  SAG: `snow-avalanche-guidance`,
  SAT: `apt-prediction`,
  SAW: `preliminary-notice-of-watch`,
  SCC: `storm-summary`,
  SCD: `supplementary-climatological-data`,
  SCN: `soil-climate-analysis-network`,
  SCP: `satellite-cloud-product`,
  SCS: `selected-cities-summary`,
  SDO: `supplementary-data-observation`,
  SDS: `special-dispersion-statement`,
  SEL: `severe-local-storm-watch`,
  SEV: `spc-watch-point-information`,
  SFP: `state-forecast`,
  SFT: `tabular-state-forecast`,
  SGL: `rawinsonde-significant-levels`,
  SHP: `surface-ship-report`,
  SIG: `international-sigmet`,
  SIM: `satellite-interpretation-message`,
  SLS: `severe-local-storm-outline`,
  SMF: `smoke-management-weather-forecast`,
  SMW: `special-marine-warning`,
  SOO: `science-operations-officer-product`,
  SPE: `satellite-precipitation-estimates`,
  SPF: `storm-strike-probability-bulletin`,
  SPS: `special-weather-statement`,
  SPW: `shelter-in-place-warning`,
  SQW: `snow-squall-warning`,
  SRD: `surf-discussion`,
  SRF: `surf-forecast`,
  SRG: `soaring-guidance`,
  SSM: `synoptic-surface-observation`,
  STA: `weather-statistical-summary`,
  STD: `satellite-tropical-disturbance-summary`,
  STO: `road-condition-report`,
  STP: `state-temp-precip-table`,
  STQ: `spot-forecast-request`,
  SUM: `space-weather-message`,
  SVR: `severe-thunderstorm-warning`,
  SVS: `severe-weather-statement`,
  SWOMCD: `mesoscale-discussion`,
  SWODY1: `day-1`,
  SWODY2: `day-2`,
  SWODY3: `day-3`,
  SWS: `state-weather-summary`,
  SYN: `regional-weather-synopsis`,
  TAF: `terminal-aerodrome-forecast`,
  TAP: `terminal-alerting-products`,
  TAV: `travelers-forecast-table`,
  TCA: `tropical-cyclone-advisory`,
  TCD: `tropical-cyclone-discussion`,
  TCE: `tropical-cyclone-position-estimate`,
  TCM: `tropical-cyclone-marine-aviation-advisory`,
  TCP: `public-tropical-cyclone-advisory`,
  TCS: `satellite-tropical-cyclone-summary`,
  TCU: `tropical-cyclone-update`,
  TCV: `tropical-cyclone-break-points`,
  TIB: `tsunami-bulletin`,
  TID: `tide-report`,
  TMA: `tsunami-tide-seismic-acknowledgement`,
  TOE: `telephone-outage-emergency`,
  TOR: `tornado-warning`,
  TPT: `temperature-precipitation-table`,
  TSU: `tsunami-watch-warning`,
  TUV: `ultraviolet-index`,
  TVL: `travelers-forecast`,
  TWB: `transcribed-weather-broadcast`,
  TWD: `tropical-weather-discussion`,
  TWO: `tropical-weather-outlook`,
  TWS: `tropical-weather-summary`,
  URN: `aircraft-reconnaissance`,
  UVI: `ultraviolet-index`,
  VAA: `volcanic-activity-advisory`,
  VER: `forecast-verification-statistics`,
  VFT: `taf-verification-product`,
  VOW: `volcano-warning`,
  WA0: `airmet-pacific`,
  WA1: `airmet-northeast`,
  WA2: `airmet-southeast`,
  WA3: `airmet-north-central`,
  WA4: `airmet-south-central`,
  WA5: `airmet-rocky-mountains`,
  WA6: `airmet-west-coast`,
  WA7: `airmet-juneau-ak`,
  WA8: `airmet-anchorage-ak`,
  WA9: `airmet-fairbanks-ak`,
  WAR: `space-environment-warning`,
  WAT: `space-environment-watch`,
  WCN: `weather-watch-clearance-notification`,
  WCR: `weekly-weather-and-crop-report`,
  WDA: `weekly-data-for-agriculture`,
  WDU: `warning-decision-update`,
  WEK: `space-environment-product-weekly`,
  WOU: `watch-outline-update`,
  WS1: `sigmet-northeast`,
  WS2: `sigmet-southeast`,
  WS3: `sigmet-north-central`,
  WS4: `sigmet-south-central`,
  WS5: `sigmet-rocky-mountains`,
  WS6: `sigmet-west-coast`,
  WST: `tropical-cyclone-sigmet`,
  WSV: `volcanic-activity-sigmet`,
  WSW: `winter-weather-warning`,
  WWA: `watch-status-report`,
  WWP: `watch-probabilities`,
  ZFP: `zone-forecast-product`
};

// src/@modules/@stanza/stanza.getAwipsType.ts
var getAwipsType = (options) => {
  const attributes = options.attributes;
  if (!attributes.awipsid) {
    return {
      type: null,
      prefix: null
    };
  }
  for (const [prefix, type] of Object.entries(eventAwipAbreviations)) {
    if (attributes.awipsid.startsWith(prefix)) {
      return { type, prefix };
    }
  }
  return { type: null, prefix: null };
};

// src/@modules/@stanza/stanza.validate.ts
var validate = (options) => {
  if (options.stanza.is(`message`)) {
    const cb = options.stanza.getChild(`x`);
    if (cb && cb.children) {
      const message = unescape(cb.children[0]);
      const attributes = cb.attrs;
      if (attributes.awipsid && attributes.awipsid.length > 1) {
        const isCapEvent = message.includes(`<?xml`);
        const isCapAreaDescription = message.includes(`<areaDesc>`);
        const isVTEC = message.match(regExp.pvtec) != null;
        const isUGC = message.match(regExp.ugc1) != null;
        const getType = getAwipsType({ attributes });
        if (getType.type != null) {
          return {
            message,
            attributes,
            isCapEvent,
            isVTEC,
            isUGC,
            isCapAreaDescription,
            isIgnored: false,
            isNWWS: true,
            getType
          };
        }
      }
    }
  }
  return { isIgnored: true };
};

// src/@parsers/@text/text.getDescriptionFromProduct.ts
var getDescriptionFromProduct = (options) => {
  let message = options.message;
  const dates = Array.from(message.matchAll(regExp.dateline));
  if (dates.length) {
    const lastMatch = dates[dates.length - 1][0];
    const sIndx = message.lastIndexOf(lastMatch);
    if (sIndx !== -1) {
      const endIndx = message.indexOf("&&", sIndx);
      message = message.substring(sIndx + lastMatch.length, endIndx !== -1 ? endIndx : void 0).trimStart();
      if (message.startsWith("/")) message = message.slice(1).trimStart();
      if (options.handle && message.includes(options.handle)) {
        const handleIdx = message.indexOf(options.handle);
        message = message.substring(handleIdx + options.handle.length).trimStart();
        if (message.startsWith("/")) message = message.slice(1).trimStart();
      }
    }
  } else if (options.handle) {
    const handleIndx = message.indexOf(options.handle);
    if (handleIndx !== -1) {
      let afterHandle = message.substring(handleIndx + options.handle.length).trimStart();
      if (afterHandle.startsWith("/")) afterHandle = afterHandle.slice(1).trimStart();
      const latEnd = afterHandle.indexOf("&&");
      message = latEnd !== -1 ? afterHandle.substring(0, latEnd).trim() : afterHandle.trim();
    }
  }
  return message.trim();
};

// src/@parsers/@text/text.getPolygonFromProduct.ts
var getPolygonFromProduct = (message) => {
  const coordinates = [];
  const match = message.match(/LAT\.{3}LON\s+([\d\s]+)/i);
  if (!match || !match[1]) return coordinates;
  const coordStrings = match[1].replace(/\n/g, " ").trim().split(/\s+/);
  for (let i = 0; i < coordStrings.length - 1; i += 2) {
    const lat = parseFloat(coordStrings[i]) / 100;
    const lon = -parseFloat(coordStrings[i + 1]) / 100;
    if (!isNaN(lat) && !isNaN(lon)) {
      coordinates.push([lon, lat]);
    }
  }
  if (coordinates.length > 2) {
    coordinates.push(coordinates[0]);
  }
  return coordinates;
};

// src/@parsers/@text/text.getTextFromProduct.ts
var getTextFromProduct = (options) => {
  var _a;
  const lines = options.message.split(`
`);
  for (const line of lines) {
    const matchedFind = options.find.find((find) => line.includes(find));
    if (matchedFind) {
      let result = line.slice(line.indexOf(matchedFind) + matchedFind.length).trim();
      if (options.removal) {
        for (const str of options.removal) {
          result = result.toLowerCase().split(str.toLowerCase()).join("");
        }
        result = result.replace(matchedFind, "").replace("<", "").trim();
      }
      return result.toUpperCase() + ((_a = options == null ? void 0 : options.append) != null ? _a : ``);
    }
  }
  return null;
};

// src/@dictionaries/dictionaries.officeICAOs.ts
var officeICAOs = {
  "KLCH": "Lake Charles, LA",
  "TSTL": "St. Louis, MO",
  "PABC": "Bethel, AK",
  "TCMH": "Columbus, OH",
  "KEPZ": "El Paso, TX",
  "KCYS": "Cheyenne, WY",
  "KJKL": "Jackson, KY",
  "KWNS": "Storm Prediction Center",
  "KPAH": "Paducah, KY",
  "KEMX": "Tucson, AZ",
  "KMHX": "Morehead City, NC",
  "PAPD": "Fairbanks, AK",
  "KDLH": "Duluth, MN",
  "TADW": "Andrews Air Force Base, MD",
  "KOKX": "Brookhaven, NY",
  "KLZK": "Little Rock, AR",
  "KHGX": "Houston, TX",
  "TMSY": "New Orleans, LA",
  "KDGX": "Jackson/Brandon, MS",
  "KCTP": "Caribou, ME",
  "KAMA": "Amarillo, TX",
  "PGUA": "Andersen AFB, GU",
  "KAPX": "Gaylord, MI",
  "PAHG": "Kenai, AK",
  "KLWX": "Sterling, VA",
  "HWPA2": "Homer, AK",
  "KGRK": "Fort Hood, TX",
  "KAKQ": "Wakefield, VA",
  "ROCO2": "Norman, OK",
  "KCLX": "Charleston, SC",
  "TPHX": "Phoenix, AZ",
  "KNKX": "San Diego, CA",
  "TDEN": "Denver, CO",
  "TLAS": "Las Vegas, NV",
  "KBUF": "Buffalo, NY",
  "KTLX": "Norman, OK",
  "KILX": "Lincoln, IL",
  "KHDC": "Hammond, LA",
  "KVWX": "Evansville, IN",
  "TCLT": "Charlotte, NC",
  "TEWR": "Newark, NJ",
  "KFSD": "Sioux Falls, SD",
  "KEAX": "Pleasant Hill, MO",
  "KICX": "Cedar City, UT",
  "KHTX": "Huntsville, AL",
  "PACG": "Sitka, AK",
  "KSOX": "Santa Ana Mountains, CA",
  "TPBI": "West Palm Beach, FL",
  "TSLC": "Salt Lake City, UT",
  "KGLD": "Goodland, KS",
  "TRDU": "Raleigh-Durham, NC",
  "KATX": "Seattle, WA",
  "TICH": "Wichita, KS",
  "TSDF": "Louisville, KY",
  "TBOS": "Boston, MA",
  "TDCA": "Washington, DC",
  "KUEX": "Grand Island, NE",
  "TLKA2": "Talkeetna, AK",
  "KBGM": "Binghamton, NY",
  "TLVE": "Cleveland, OH",
  "KCAE": "Columbia, SC",
  "KDVN": "Quad Cities, IA",
  "KABR": "Aberdeen, SD",
  "KBYX": "Key West, FL",
  "KMPX": "Minneapolis, MN",
  "KCRP": "Corpus Christi, TX",
  "KCBW": "Caribou, ME",
  "KMRX": "Knoxville, TN",
  "KSHV": "Shreveport, LA",
  "KIWA": "Phoenix, AZ",
  "KRGX": "Reno, NV",
  "PHKM": "Kamuela, HI",
  "KABX": "Albuquerque, NM",
  "KBMX": "Birmingham, AL",
  "TMDW": "Chicago Midway, IL",
  "KVAX": "Moody AFB, GA",
  "KHDX": "Holloman AFB, NM",
  "KBRO": "Brownsville, TX",
  "KTWX": "Topeka, KS",
  "KRTX": "Portland, OR",
  "KCXX": "Burlington, VT",
  "KFCX": "Roanoke, VA",
  "KFFC": "Atlanta, GA",
  "KBOX": "Boston, MA",
  "KTLH": "Tallahassee, FL",
  "KPUX": "Pueblo, CO",
  "KFDR": "Altus AFB, OK",
  "KGJX": "Grand Junction, CO",
  "KDTX": "Detroit, MI",
  "PHWA": "Waimea, HI",
  "KMQT": "Marquette, MI",
  "KSJT": "San Angelo, TX",
  "KUDX": "Rapid City, SD",
  "TIAH": "Houston, TX",
  "KSRX": "Fort Smith, AR",
  "TJFK": "New York City, NY",
  "KDDC": "Dodge City, KS",
  "PAKC": "King Salmon, AK",
  "PAIH": "Middleton Island, AK",
  "RODN": "Kadena AB, JA",
  "TBWI": "Baltimore/Washington, MD",
  "KIWX": "Northern Indiana, IN",
  "KFDX": "Cannon AFB, NM",
  "TMIA": "Miami, FL",
  "KICT": "Wichita, KS",
  "TMKE": "Milwaukee, WI",
  "TFLL": "Fort Lauderdale, FL",
  "KARX": "La Crosse, WI",
  "KLRX": "Elko, NV",
  "KDAX": "Sacramento, CA",
  "KGRB": "Green Bay, WI",
  "KLGX": "Langley Hill, WA",
  "KFTG": "Denver, CO",
  "KMKX": "Milwaukee, WI",
  "TTUL": "Tulsa, OK",
  "TDFW": "Dallas/Fort Worth, TX",
  "TTPA": "Tampa Bay, FL",
  "TDAL": "Dallas Love Field, TX",
  "KDFX": "Laughlin AFB, TX",
  "KSFX": "Pocatello, ID",
  "KMTX": "Salt Lake City, UT",
  "PAEC": "Nome, AK",
  "RKSG": "Camp Humphreys, KR",
  "KOAX": "Omaha, NE",
  "PHMO": "Molokai, HI",
  "TDTW": "Detroit, MI",
  "THOU": "Houston, TX",
  "AWPA2": "Anchorage, AK",
  "KTYX": "Fort Drum, NY",
  "KCCX": "State College, PA",
  "TMSP": "Minneapolis, MN",
  "KMVX": "Grand Forks, ND",
  "KBIS": "Bismarck, ND",
  "KBBX": "Beale AFB, CA",
  "KVBX": "Vandenberg AFB, CA",
  "KPOE": "Fort Polk, LA",
  "KMOB": "Mobile, AL",
  "KJGX": "Robins AFB, GA",
  "KMUX": "San Francisco, CA",
  "TMCI": "Kansas City, MO",
  "KLSX": "St. Louis, MO",
  "KMAX": "Medford, OR",
  "KRAX": "Raleigh/Durham, NC",
  "KINX": "Tulsa, OK",
  "RKJK": "Kunsan AB, KR",
  "KSGF": "Springfield, MO",
  "TDAY": "Dayton, OH",
  "KDOX": "Dover AFB, DE",
  "KGGW": "Glasgow, MT",
  "KAMX": "Miami, FL",
  "KENX": "Albany, NY",
  "KTFX": "Great Falls, MT",
  "KPBZ": "Pittsburgh, PA",
  "KMAF": "Midland/Odessa, TX",
  "KPDT": "Pendleton, OR",
  "KLNX": "North Platte, NE",
  "KEOX": "Fort Rucker, AL",
  "KGSP": "Greer, SC",
  "KHPX": "Fort Campbell, KY",
  "KGRR": "Grand Rapids, MI",
  "KLOT": "Chicago, IL",
  "TPIT": "Pittsburgh, PA",
  "KEYX": "Edwards AFB, CA",
  "TIAD": "Dulles, VA",
  "KFWS": "Dallas/Fort Worth, TX",
  "KMLB": "Melbourne, FL",
  "KMBX": "Minot AFB, ND",
  "KDMX": "Des Moines, IA",
  "KEVX": "Eglin AFB, FL",
  "TBNA": "Nashville, TN",
  "KDYX": "Dyess AFB, TX",
  "TOKC": "Oklahoma City, OK",
  "PHKI": "South Kauai, HI",
  "TMCO": "Orlando, FL",
  "KDIX": "Philadelphia, PA",
  "TORD": "Chicago, IL",
  "KYUX": "Yuma, AZ",
  "KVNX": "Vance AFB, OK",
  "TJUA": "San Juan, PR",
  "TATL": "Atlanta, GA",
  "KVTX": "Los Angeles, CA",
  "KIND": "Indianapolis, IN",
  "KCBX": "Boise, ID",
  "KGYX": "Portland, ME",
  "KMXX": "Maxwell AFB, AL",
  "TSJU": "San Juan, PR",
  "KHNX": "San Joaquin Valley, CA",
  "KLVX": "Louisville, KY",
  "KMSX": "Missoula, MT",
  "KJAX": "Jacksonville, FL",
  "KNQA": "Memphis, TN",
  "KRIW": "Riverton/Lander, WY",
  "TCVG": "Covington, KY",
  "KBLX": "Billings, MT",
  "TPHL": "Philadelphia, PA",
  "KRLX": "Charleston, WV",
  "TMEM": "Memphis, TN",
  "KCLE": "Cleveland, OH",
  "KBHX": "Eureka, CA",
  "KLBB": "Lubbock, TX",
  "KOTX": "Spokane, WA",
  "KEWX": "Austin/San Antonio, TX",
  "KGWX": "Columbus AFB, MS",
  "KESX": "Las Vegas, NV",
  "KTBW": "Tampa, FL",
  "KOHX": "Nashville, TN",
  "KLTX": "Wilmington, NC",
  "KFSX": "Flagstaff, AZ",
  "TIDS": "Indianapolis, IN",
  "KILN": "Cincinnati, OH",
  "PAFG": "Fairbanks, AK",
  "KPQR": "Portland, OR",
  "KILM": "Wilmington, NC",
  "KEKA": "Eureka, CA",
  "KCHS": "Charleston, SC",
  "KPHI": "Philadelphia/Mt. Holly, NJ",
  "KUNR": "Rapid City, SD",
  "KMFL": "Miami, FL",
  "TJSJ": "San Juan, PR",
  "KFGF": "Grand Forks, ND",
  "KSEW": "Seattle, WA",
  "PAFC": "Anchorage, AK",
  "KLMK": "Louisville, KY",
  "PHFO": "Honolulu, HI",
  "KLIX": "New Orleans/Baton Rouge, LA",
  "KBOI": "Boise, ID",
  "KPIH": "Pocatello, ID",
  "KMTR": "San Francisco/Monterey, CA",
  "KGJT": "Grand Junction, CO",
  "PAAQ": "Anchorage, AK",
  "KABQ": "Albuquerque, NM",
  "KTAE": "Tallahassee, FL",
  "KCAR": "Caribou, ME",
  "KMFR": "Medford, OR",
  "PGUM": "Guam, GU",
  "PAJK": "Juneau, AK"
};

// src/@building/building.office.ts
var getEventOffice = (options) => {
  var _a, _b, _c, _d, _e, _f;
  const office = options.pVtec != null ? (_b = (_a = options.pVtec) == null ? void 0 : _a.tracking) == null ? void 0 : _b.split(`-`)[0] : ((_c = options.attributes) == null ? void 0 : _c.cccc) || (options.organization != null ? Array.isArray(options.organization) ? (_d = options.organization) == null ? void 0 : _d[0] : options.organization : null);
  const name = (_f = (_e = officeICAOs) == null ? void 0 : _e[office]) != null ? _f : null;
  return { office, name };
};

// src/@dictionaries/dictionaries.eventTags.ts
var eventTags = {
  "FROSTBITE AND HYPOTHERMIA ARE LIKELY": "Frostbite and Hypothermia Likely",
  "LICKELY BECOME SLICK AND HAZARDOUS": "Slick and Hazardous Roads",
  "SLIPPERY ROAD CONDITIONS": "Slippery Roads",
  "BLOWING SNOW WHICH COULD REDUCE VISIBILITY": "Blowing Snow Reducing Visibility",
  "TRAVEL COULD BE VERY DIFFICULT": "Difficult Travel Conditions",
  "DIFFICULT TRAVEL CONDITIONS": "Difficult Travel Conditions",
  "EXPECT DISRUPTIONS": "Expect Disruptions to Travel",
  "A LARGE AND EXTREMELY DANGEROUS TORNADO": "Large and Dangerous Tornado",
  "THIS IS A PARTICULARLY DANGEROUS SITUATION": "Particularly Dangerous Situation",
  "RADAR INDICATED ROTATION": "Radar Indicated Tornado",
  "WEATHER SPOTTERS CONFIRMED TORNADO": "Confirmed by Storm Spotters",
  "A SEVERE THUNDERSTORM CAPABLE OF PRODUCING A TORNADO": "Developing Tornado",
  "LAW ENFORCEMENT CONFIRMED TORNADO": "Reported by Law Enforcement",
  "A TORNADO IS ON THE GROUND": "Confirmed Tornado",
  "WEATHER SPOTTERS REPORTED FUNNEL CLOUD": "Confirmed Funnel Cloud by Storm Spotters",
  "PUBLIC CONFIRMED TORNADO": "Public reports of Tornado",
  "RADAR CONFIRMED": "Radar Confirmed",
  "TORNADO WAS REPORTED BRIEFLY ON THE GROUND": "Tornado no longer on ground",
  "SPOTTERS INDICATE THAT A FUNNEL CLOUD CONTINUES WITH THIS STORM": "Funnel Cloud Continues",
  "A TORNADO MAY DEVELOP AT ANY TIME": "Potentional still exists for Tornado to form",
  "LIFE-THREATENING SITUATION": "Life Threating Situation",
  "COMPLETE DESTRUCTION IS POSSIBLE": "Extremly Damaging Tornado",
  "POTENTIALLY DEADLY TORNADO": "Deadly Tornado",
  "RADAR INDICATED": "Radar Indicated",
  "HAIL DAMAGE TO VEHICLES IS EXPECTED": "Damaging to Vehicles",
  "EXPECT WIND DAMAGE": "Wind Damage",
  "FREQUENT LIGHTNING": "Frequent Lightning",
  "PEOPLE AND ANIMALS OUTDOORS WILL BE INJURED": "Capable of Injuring People and Animals",
  "TRAINED WEATHER SPOTTERS": "Confirmed by Storm Spotters",
  "SOURCE...PUBLIC": "Confirmed by Public",
  "SMALL CRAFT COULD BE DAMAGED": "Potential Damage to Small Craft",
  "A TORNADO WATCH REMAINS IN EFFECT": "Active Tornado Watch",
  "TENNIS BALL SIZE HAIL": "Tennis Ball Size Hail",
  "BASEBALL SIZE HAIL": "Baseball Size Hail",
  "GOLF BALL SIZE HAIL": "Golf Ball Size Hail",
  "QUARTER SIZE HAIL": "Quarter Size Hail",
  "PING PONG BALL SIZE HAIL": "Ping Pong Ball Size Hail",
  "NICKEL SIZE HAIL": "Nickel Size Hail",
  "DOPPLER RADAR.": "Confirmed by Radar",
  "DOPPLER RADAR AND AUTOMATED GAUGES.": "Confirmed by Radar and Gauges",
  "FLASH FLOODING CAUSED BY THUNDERSTORMS.": "Caused by Thunderstorm",
  "SOURCE...EMERGENCY MANAGEMENT.": "Confirmed by Emergency Management",
  "FLASH FLOODING CAUSED BY HEAVY RAIN.": "Caused by heavy rain",
  "SOURCE...LAW ENFORCEMENT REPORTED.": "Confirmed by Law Enforcement",
  "MINOR FLOODING IS OCCURING": "Minor Flooding Occurring",
  "VERY COLD TEMPERATURES CAN LEAD TO HYPOTHERMIA": "Hypothermia Risk",
  "SENSITIVE VEGETATION AND POSSIBLY DAMAGE UNPROTECTED OUTDOOR": "Vegetation and Outdoor Plumbing Risk",
  "RIP CURRENTS CAN SWEEP EVEN THE BEST SWIMMER": "Hazardous to All Swimmers",
  "HYPOTHERMIA IF PRECAUTIONS ARE NOT TAKEN.": "Hypothermia Risk",
  "FROSTBITE AND HYPOTHERMIA WILL OCCUR IF UNPROTECTED SKIN": "Frostbite and Hypothermia Risk on Unprotected Skin",
  "TEMPERATURES COULD CAUSE RUPTURED WATER PIPES": "Risk of Ruptured Water Pipes",
  "COULD RESULT IN HYPOTHERMIA OR FROSTBITE ON EXPOSED SKIN IF": "Hypothermia or Frostbite Risk on Exposed Skin",
  "WINDS WILL STRENGTHEN": "Strengthening Winds",
  "EXPECT ROADS TO RE-FREEZE": "Roads May Re-Freeze",
  "SLICK AND ICY SPOTS ON ROADS": "Slick and Icy Roads",
  "ICY PATCHES MAY BE MORE COMMON ON BRIDGES": "Icy Patches Likely on Bridges",
  "SLICK SPOTS ON UNTREATED ROADS": "Slick Spots on Untreated Roads",
  "TEMPERATURES ARE EXPECTED TO FALL BELOW FREEZING": "Temperatures Expected Below Freezing",
  "HAZARDOUS ROADWAYS AND BLACK ICE": "Hazardous Roadways and Black Ice",
  "SLOW DOWN AND ALLOW EXTRA TIME": "Slow Down and Allow Extra Time",
  "SHOULD EXERCISE CAUTION": "Should Exercise Caution",
  "LAKE EFFECT SNOW EXPECTED": "Lake Effect Snow Expected",
  "MODERATE LAKE EFFECT SNOWFALL RATES AND BLOWING SNOW": "Moderate Lake Effect Snowfall and Blowing Snow"
};

// src/@building/building.tags.ts
var getEventTags = (message) => {
  return Object.entries(eventTags).filter(([key]) => message == null ? void 0 : message.toLowerCase().includes(key.toLowerCase())).map(([, value]) => value);
};

// src/@building/building.properties.ts
var properties = (options) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J;
  const organization = (_b = (_a = options.message.match(regExp.wmo)) == null ? void 0 : _a[0]) != null ? _b : null;
  const polygons = getPolygonFromProduct(options.message);
  return {
    locations: (_e = (_d = (_c = options == null ? void 0 : options.ugc) == null ? void 0 : _c.locations) == null ? void 0 : _d.join(`; `)) != null ? _e : null,
    description: getDescriptionFromProduct({ message: options.message, handle: (_g = (_f = options == null ? void 0 : options.pVtec) == null ? void 0 : _f.vtec) != null ? _g : null }),
    attributes: options.attributes,
    geocode: {
      office: getEventOffice({ attributes: options.attributes, organization, pVtec: options.pVtec }),
      organization,
      ugc: (_i = (_h = options == null ? void 0 : options.ugc) == null ? void 0 : _h.zones) != null ? _i : [],
      polygon: polygons.length > 0 ? Buffer.from(JSON.stringify([polygons])).toString("base64") : null,
      polygon_generated: polygons.length > 0 ? true : false
    },
    parameters: {
      tags: getEventTags(options.message),
      instructions: (_j = getTextFromProduct({ message: options.message, find: [`For your protection`, `do not`, `use extreme caution`], append: `...`, removal: [`.`] })) != null ? _j : null,
      source: (_k = getTextFromProduct({ message: options.message, find: [`SOURCE...`], removal: [`.`] })) != null ? _k : null,
      hazards: (_l = getTextFromProduct({ message: options.message, find: [`HAZARD...`], removal: [`.`] })) != null ? _l : null,
      impacts: (_m = getTextFromProduct({ message: options.message, find: [`IMPACT...`], removal: [`.`] })) != null ? _m : null,
      estimated_hail_size: (_n = getTextFromProduct({ message: options.message, find: [`MAX HAIL SIZE...`, `HAIL...`], removal: ["in"] })) != null ? _n : null,
      estimated_wind_gusts: (_o = getTextFromProduct({ message: options.message, find: [`MAX WIND GUST...`, `WIND...`] })) != null ? _o : null,
      damage_threat: (_p = getTextFromProduct({ message: options.message, find: [`DAMAGE THREAT...`], removal: [] })) != null ? _p : null,
      tornado_threat: (_q = getTextFromProduct({ message: options.message, find: [`TORNADO...`, `WATERSPOUT...`] })) != null ? _q : null,
      flood_threat: (_r = getTextFromProduct({ message: options.message, find: [`FLASH FLOOD...`] })) != null ? _r : null,
      wind_threat: (_s = getTextFromProduct({ message: options.message, find: [`WIND THREAT...`] })) != null ? _s : null,
      hail_threat: (_t = getTextFromProduct({ message: options.message, find: [`HAIL THREAT...`], removal: [] })) != null ? _t : null
    },
    spc_parameters: {
      spc_max_tornado: (_u = getTextFromProduct({ message: options.message, find: [`MOST PROBABLE PEAK TORNADO INTENSITY...`] })) != null ? _u : null,
      spc_max_hail: (_v = getTextFromProduct({ message: options.message, find: [`MOST PROBABLE PEAK HAIL SIZE...`] })) != null ? _v : null,
      spc_max_wind: (_w = getTextFromProduct({ message: options.message, find: [`MOST PROBABLE PEAK WIND GUST...`] })) != null ? _w : null,
      spc_watch_issuance: (_x = getTextFromProduct({ message: options.message, find: [`Probability of Watch Issuance...`], removal: [`percent`] })) != null ? _x : null
    },
    watch_parameters: {
      watch_number: (_A = (_z = (_y = getTextFromProduct({ message: options.message, find: [`ITIES FOR`, `UPDATE FOR`, `Watch Number `], removal: [`%`, `<`, `:`] })) == null ? void 0 : _y.replace(/(WT|WS|)/g, "")) == null ? void 0 : _z.trim()) != null ? _A : null,
      watch_type: options.message.includes(`TORNADO WATCH`) ? `Tornado` : (options == null ? void 0 : options.message.includes(`SEVERE`)) ? `Severe` : null,
      additional_tornadoes_probability: (_B = getTextFromProduct({ message: options.message, find: [`PROB OF 2 OR MORE TORNADOES`], removal: [`%`, `<`, `:`] })) != null ? _B : null,
      strong_tornadoes_probability: (_C = getTextFromProduct({ message: options.message, find: [`PROB OF 1 OR MORE STRONG /EF2-EF5/ TORNADOES`], removal: [`%`, `<`, `:`] })) != null ? _C : null,
      severe_wind_probability: (_D = getTextFromProduct({ message: options.message, find: [`PROB OF 10 OR MORE SEVERE WIND EVENTS`], removal: [`%`, `<`, `:`] })) != null ? _D : null,
      severe_hail_probability: (_E = getTextFromProduct({ message: options.message, find: [`PROB OF 10 OR MORE SEVERE HAIL EVENTS`], removal: [`%`, `<`, `:`] })) != null ? _E : null,
      hail_2in_probability: (_F = getTextFromProduct({ message: options.message, find: [`PROB OF 1 OR MORE HAIL EVENTS >= 2 INCHES`], removal: [`%`, `<`, `:`] })) != null ? _F : null,
      combined_hail_wind_probability: (_G = getTextFromProduct({ message: options.message, find: [`PROB OF 6 OR MORE COMBINED SEVERE HAIL/WIND EVENTS`], removal: [`%`, `<`, `:`] })) != null ? _G : null,
      max_hail_in: (_H = getTextFromProduct({ message: options.message, find: [`MAX HAIL /INCHES/`], removal: [`%`, `<`, `:`] })) != null ? _H : null,
      max_wind_surface: (_I = getTextFromProduct({ message: options.message, find: [`MAX WIND GUSTS SURFACE /KNOTS/`], removal: [`%`, `<`, `:`] })) != null ? _I : null,
      max_tops_x100feet: (_J = getTextFromProduct({ message: options.message, find: [`MAX TOPS /X 100 FEET/`], removal: [`%`, `<`, `:`] })) != null ? _J : null,
      pds_watch: getTextFromProduct({ message: options.message, find: [`PARTICULARLY DANGEROUS SITUATION`], removal: [`%`, `<`, `:`] }) === `YES`
    }
  };
};

// src/@building/building.headers.ts
var getEventHeader = (options) => {
  var _a, _b, _c;
  const properties2 = options.properties;
  const vtec2 = (_a = options.vtec) != null ? _a : null;
  const ugc2 = properties2.geocode.ugc != null ? properties2.geocode.ugc.join(`-`) : `0`;
  return `ZCZC-ATMOSX-${options.getType.prefix}-${ugc2}-${(_b = vtec2 == null ? void 0 : vtec2.status) != null ? _b : `Issued`}-${(/* @__PURE__ */ new Date()).toISOString().replace(/[-:]/g, "").split(".")[0]}-${(_c = properties2.geocode.office.office) != null ? _c : `KWNS`}`;
};

// src/@dictionaries/dictionaries.eventsOffshore.ts
var eventsOffshore = {
  "Special Weather Statement": "Special Weather Statement",
  "Hurricane Warning": "Hurricane Warning",
  "Hurricane Force Wind Warning": "Hurricane Force Wind Warning",
  "Hurricane Watch": "Hurricane Watch",
  "Tropical Storm Warning": "Tropical Storm Warning",
  "Tropical Storm Watch": "Tropical Storm Watch",
  "High Wind Warning": "High Wind Warning",
  "Gale Warning": "Gale Warning",
  "Small Craft Advisory": "Small Craft Advisory",
  "Small Craft Warning": "Small Craft Warning"
};

// src/@building/building.tracking.ts
var getEventTracking = (options) => {
  var _a, _b, _c, _d, _e, _f, _g;
  const proprties = options.properties;
  const attributes = options.attributes;
  const stanza = options.stanza;
  const vtec2 = options.vtec;
  if (options.type === `RAW`) {
    const getWatchNumber = (_a = proprties.watch_parameters.watch_number) != null ? _a : null;
    if (getWatchNumber) {
      return `${proprties.geocode.office.office}-${stanza.getType.prefix}-A-${getWatchNumber}`;
    }
    return `${proprties.geocode.office.office}-${attributes.ttaaii}-${(_b = attributes.id.slice(-4).replace(`.`, ``)) != null ? _b : "0"}`;
  }
  if (options.type === `VTEC`) {
    return vtec2.tracking;
  }
  if (options.type === `API`) {
    if (options.vtec) {
      const vtecValue = Array.isArray(options.vtec) ? options.vtec[0] : options.vtec;
      const splitPVTEC = vtecValue.split(".");
      return `${splitPVTEC[2]}-${splitPVTEC[3]}-${splitPVTEC[4]}-${splitPVTEC[5]}`;
    }
    const wmoMatch = (_d = (_c = options.organization) == null ? void 0 : _c.wmoidentifier) == null ? void 0 : _d.match(/([A-Z]{4}\d{2})\s+([A-Z]{4})/);
    const station = (_e = wmoMatch == null ? void 0 : wmoMatch[2]) != null ? _e : "N/A";
    if (options.organization.featureId) {
      const idMatch = options.organization.featureId.match(/([a-f0-9]+)\.(\d+)\.(\d+)$/);
      return `${station}-${(_f = idMatch == null ? void 0 : idMatch[1]) != null ? _f : "N/A"}`;
    }
    const id2 = (_g = wmoMatch == null ? void 0 : wmoMatch[1]) != null ? _g : "N/A";
    return `${station}-${id2}`;
  }
};

// src/@building/building.validate.ts
import { createHash } from "crypto";

// src/@dictionaries/dictionaries.betterEventNames.ts
var betterEventNames = {
  "Tornado Warning": {
    "Tornado Emergency": {
      description: "tornado emergency"
    },
    "PDS Tornado Warning": {
      description: "particularly dangerous situation",
      damage: `CONSIDERABLE`
    },
    "Confirmed Tornado Warning": {
      tornado: `OBSERVED`
    },
    "Radar Indicated Tornado Warning": {}
  },
  "Special Marine Warning": {
    "Special Marine Warning (TPROB)": {
      tornado: `POSSIBLE`
    }
  },
  "Tornado Watch": {
    "PDS Tornado Watch": {
      description: "particularly dangerous situation"
    }
  },
  "Flash Flood Warning": {
    "Flash Flood Emergency": {
      description: "flash flood emergency"
    },
    "Considerable Flash Flood Warning": {
      damage: `CONSIDERABLE`
    }
  },
  "Severe Thunderstorm Warning": {
    "EDS Severe Thunderstorm Warning (TPROB)": {
      description: "extremely dangerous situation",
      tornado: "POSSIBLE"
    },
    "EDS Severe Thunderstorm Warning": {
      description: "extremely dangerous situation"
    },
    "Destructive Severe Thunderstorm Warning (TPROB)": {
      damage: `DESTRUCTIVE`,
      tornado: `POSSIBLE`
    },
    "Destructive Severe Thunderstorm Warning": {
      damage: `DESTRUCTIVE`
    },
    "Considerable Severe Thunderstorm Warning (TPROB)": {
      damage: `CONSIDERABLE`,
      tornado: `POSSIBLE`
    },
    "Considerable Severe Thunderstorm Warning": {
      damage: `CONSIDERABLE`
    },
    "Severe Thunderstorm Warning (TPROB)": {
      tornado: `POSSIBLE`
    }
  }
};

// src/@building/building.enhance.ts
var getEventEnhancedName = (event) => {
  var _a, _b, _c, _d, _e, _f, _g;
  const configurations = bootstrap.settings;
  let name = (_a = event == null ? void 0 : event.properties) == null ? void 0 : _a.event;
  if (!((_b = configurations == null ? void 0 : configurations.GlobalSettings) == null ? void 0 : _b.BetterEventNames)) {
    return name;
  }
  const damage = (_d = (_c = event == null ? void 0 : event.properties) == null ? void 0 : _c.parameters) == null ? void 0 : _d.damage_threat;
  const tornado = (_e = event == null ? void 0 : event.properties) == null ? void 0 : _e.parameters.tornado_threat;
  const description = (_g = (_f = event == null ? void 0 : event.properties) == null ? void 0 : _f.description) == null ? void 0 : _g.toLowerCase();
  for (const [eventKey, eventConfig] of Object.entries(betterEventNames)) {
    if (eventKey !== name) continue;
    for (const [paramKey, paramValue] of Object.entries(eventConfig)) {
      let matches = true;
      if (paramValue == null ? void 0 : paramValue.description) {
        if (!description.includes(paramValue.description.toLowerCase())) matches = false;
      }
      if (paramValue == null ? void 0 : paramValue.damage) {
        if (paramValue.damage !== damage) matches = false;
      }
      if (paramValue == null ? void 0 : paramValue.tornado) {
        if (paramValue.tornado !== tornado) matches = false;
      }
      if (matches) {
        name = paramKey;
        break;
      }
    }
  }
  return name;
};

// src/@dictionaries/dictionaries.statusCorrelationText.ts
var statusCorrelationText = [
  { type: "Update", name: "Updated", isCancel: false, isUpdate: true, isIssued: false },
  { type: "Cancel", name: "Cancelled", isCancel: true, isUpdate: false, isIssued: false },
  { type: "Alert", name: "Issued", isCancel: false, isUpdate: false, isIssued: true },
  { type: "Updated", name: "Updated", isCancel: false, isUpdate: true, isIssued: false },
  { type: "Expired", name: "Expired", isCancel: true, isUpdate: false, isIssued: false },
  { type: "Issued", name: "Issued", isCancel: false, isUpdate: false, isIssued: true },
  { type: "Extended", name: "Extended", isCancel: false, isUpdate: true, isIssued: false },
  { type: "Correction", name: "Correction", isCancel: false, isUpdate: true, isIssued: false },
  { type: "Upgraded", name: "Upgraded", isCancel: false, isUpdate: true, isIssued: false },
  { type: "Cancelled", name: "Cancelled", isCancel: true, isUpdate: false, isIssued: false },
  { type: "Routine", name: "Routine", isCancel: false, isUpdate: true, isIssued: false }
];

// src/@dictionaries/dictionaries.eventCancelMessages.ts
var eventCancelMessages = [
  "subsided sufficiently for the advisory to be cancelled",
  "has been cancelled",
  "will be allowed to expire",
  "has diminished",
  "and no longer",
  "has been replaced",
  "The threat has ended",
  "has weakened below severe"
];

// src/@dictionaries/dictionaries.test_signatures.ts
var test_signatures = [
  `This is a test message`,
  `THIS_MESSAGE_IS_FOR_TEST_PURPOSES_ONLY`
];

// src/@dictionaries/dictionaries.eventProducts.ts
var eventProducts = {
  "O": "Operational Product",
  "T": "Test Product",
  "E": "Experimental Product",
  "X": "Experimental Product (Non-Operational)"
};

// src/@dictionaries/dictionaries.hailStrings.ts
var hailStrings = {
  "0.75": "Penny",
  "0.88": "Nickel",
  "1.00": "Quarter",
  "1.25": "Half Dollar",
  "1.50": "Ping Pong Ball",
  "1.75": "Golf Ball",
  "2.00": "Hen Egg",
  "2.50": "Tennis Ball",
  "2.75": "Baseball",
  "4.00": "CD/DVD"
};

// src/@building/building.signature.ts
var getEventSignature = (event) => {
  var _a, _b, _c, _d;
  const properties2 = event == null ? void 0 : event.properties;
  const vtec2 = (_b = (_a = event == null ? void 0 : event.properties) == null ? void 0 : _a.metadata) == null ? void 0 : _b.vtec;
  const status = statusCorrelationText.find((c) => c.type === (properties2 == null ? void 0 : properties2.status));
  const csig = eventCancelMessages.find((sig) => properties2.description.toLowerCase().includes(sig.toLowerCase()));
  properties2.status_metadata = __spreadProps(__spreadValues({}, properties2.status_metadata), { is_issued: true, is_test: false });
  if (properties2.parameters.estimated_hail_size) {
    properties2.parameters.estimated_hail_size += ` (${hailStrings[properties2.parameters.estimated_hail_size]})`;
  }
  if (status) {
    properties2.status = (_c = status.name) != null ? _c : properties2.status;
    properties2.status_metadata = __spreadProps(__spreadValues({}, properties2.status_metadata), { is_updated: !!status.isUpdate, is_issued: !!status.isIssued, is_expired: !!status.isCancel });
  }
  if (csig) {
    properties2.status_metadata = __spreadProps(__spreadValues({}, properties2.status_metadata), { is_expired: true });
  }
  if (vtec2) {
    const getProduct = (_d = vtec2.split(`.`)[0]) == null ? void 0 : _d.replace(`/`, ``);
    const isTestProduct = eventProducts[getProduct] == `Test Product`;
    if (isTestProduct || test_signatures.some((sig) => {
      var _a2, _b2, _c2;
      return ((_a2 = properties2.description) == null ? void 0 : _a2.toLowerCase().includes(sig.toLowerCase())) || ((_c2 = (_b2 = properties2 == null ? void 0 : properties2.parameters) == null ? void 0 : _b2.instructions) == null ? void 0 : _c2.toLowerCase().includes(sig.toLowerCase()));
    })) {
      properties2.status_metadata = __spreadProps(__spreadValues({}, properties2.status_metadata), { is_test: true });
    }
  }
  if (new Date(properties2.expires).getTime() < Date.now()) {
    properties2.status_metadata = __spreadProps(__spreadValues({}, properties2.status_metadata), { is_expired: true });
  }
  properties2.status_metadata = __spreadValues({}, properties2.status_metadata);
  return event;
};

// src/@manager/manager.setHash.ts
var setHash = (event, entry) => {
  if (entry) {
    entry.hashes.push(event.properties.metadata.hash);
    entry.expires = event.properties.expires;
  } else {
    bootstrap.cache.hashes.push({
      tracking: event.properties.metadata.tracking,
      hashes: [event.properties.metadata.hash],
      expires: event.properties.expires
    });
  }
};

// src/@manager/manager.mkEvent.ts
var mkEvent = (event) => __async(null, null, function* () {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w;
  const features = bootstrap.cache.events.features;
  const featureMap = /* @__PURE__ */ new Map();
  const getHash = event.properties.metadata.hash;
  const getTracking = event.properties.metadata.tracking;
  features.forEach((f) => {
    var _a2, _b2, _c2, _d2;
    return ((_b2 = (_a2 = f == null ? void 0 : f.properties) == null ? void 0 : _a2.metadata) == null ? void 0 : _b2.tracking) && featureMap.set((_d2 = (_c2 = f == null ? void 0 : f.properties) == null ? void 0 : _c2.metadata) == null ? void 0 : _d2.tracking, f);
  });
  const isEntry = (_a = bootstrap.cache.hashes) == null ? void 0 : _a.find((hash) => hash.tracking === getTracking);
  const isHashed = (_c = (_b = isEntry == null ? void 0 : isEntry.hashes) == null ? void 0 : _b.includes(getHash)) != null ? _c : false;
  const getFeature = featureMap.get(getTracking);
  if (isHashed || event.properties.status_metadata.is_expired) return;
  setEventEmit({
    event: `onEventStatus`,
    metadata: {
      type: getFeature ? `Updated` : `New`,
      event
    },
    message: `[${getFeature ? "Updated" : "New"}] ${event.properties.event} (${event.properties.status}) (${event.properties.metadata.tracking})`
  });
  setHash(event, isEntry);
  if (event.properties.status_metadata.is_issued || event.properties.status_metadata.is_updated) {
    if (getFeature) {
      const getIndex = features.indexOf(getFeature);
      const cHistory = (_f = (_e = (_d = getFeature == null ? void 0 : getFeature.properties) == null ? void 0 : _d.metadata) == null ? void 0 : _e.history) != null ? _f : [];
      const cLocations = (_i = (_h = (_g = getFeature == null ? void 0 : getFeature.properties) == null ? void 0 : _g.locations) == null ? void 0 : _h.split(";").map((l) => l.trim())) != null ? _i : [];
      const cUgc = (_l = (_k = (_j = getFeature == null ? void 0 : getFeature.properties) == null ? void 0 : _j.geocode) == null ? void 0 : _k.ugc) != null ? _l : [];
      const iHistory = (_o = (_n = (_m = event.properties) == null ? void 0 : _m.metadata) == null ? void 0 : _n.history) != null ? _o : [];
      const iLocations = (_r = (_q = (_p = event.properties) == null ? void 0 : _p.locations) == null ? void 0 : _q.split(";").map((l) => l.trim())) != null ? _r : [];
      const iUgc = (_u = (_t = (_s = event.properties) == null ? void 0 : _s.geocode) == null ? void 0 : _t.ugc) != null ? _u : [];
      const mHistory = [...cHistory, ...iHistory].filter((v, i, a) => a.indexOf(v) === i);
      const mLocations = [...cLocations, ...iLocations].filter((v, i, a) => a.indexOf(v) === i).join("; ");
      const mUgc = [...cUgc, ...iUgc].filter((v, i, a) => a.indexOf(v) === i);
      bootstrap.cache.events.features[getIndex] = __spreadProps(__spreadValues({}, event), {
        properties: __spreadProps(__spreadValues({}, event.properties), {
          metadata: __spreadProps(__spreadValues({}, (_v = event == null ? void 0 : event.properties) == null ? void 0 : _v.metadata), {
            history: mHistory
          }),
          locations: mLocations,
          geocode: __spreadProps(__spreadValues({}, (_w = event == null ? void 0 : event.properties) == null ? void 0 : _w.geocode), {
            ugc: mUgc
          })
        })
      });
    } else {
      features.push(event);
      featureMap.set(getTracking, event);
    }
  }
});

// src/@manager/manager.rmEvent.ts
var rmEvent = (event) => {
  const getEvent = bootstrap.cache.events.features.find((f) => {
    var _a, _b, _c, _d;
    return ((_b = (_a = f == null ? void 0 : f.properties) == null ? void 0 : _a.metadata) == null ? void 0 : _b.tracking) === ((_d = (_c = event == null ? void 0 : event.properties) == null ? void 0 : _c.metadata) == null ? void 0 : _d.tracking);
  });
  if (getEvent) {
    setEventEmit({
      event: `onEventStatus`,
      metadata: {
        type: `Removed`,
        event
      },
      message: `[Removed] ${event.properties.event} (${event.properties.status}) (${event.properties.metadata.tracking})`
    });
    setEventEmit({ event: `onExpiredProduct`, metadata: event });
    bootstrap.cache.events.features.splice(bootstrap.cache.events.features.indexOf(getEvent), 1);
    bootstrap.cache.hashes = bootstrap.cache.hashes.filter((hash) => hash.tracking !== event.properties.metadata.tracking);
  }
  setEventEmit({
    event: `onEventCache`,
    metadata: bootstrap.cache.events,
    limited: true
  });
};

// src/@modules/@utilities/utilities.getShapeNearestPoint.ts
var getShapeNearestPoint = (coordinates, point) => {
  if (!coordinates || !point) {
    return { proximity: false, point: [0, 0], distance: null };
  }
  const normalize = (coords) => {
    if (!Array.isArray(coords)) return [];
    if (typeof coords[0] === "number" && typeof coords[1] === "number") return [];
    if (Array.isArray(coords[0]) && typeof coords[0][0] === "number") {
      return [[coords]];
    }
    if (Array.isArray(coords[0]) && Array.isArray(coords[0][0]) && typeof coords[0][0][0] === "number") {
      return [coords];
    }
    if (Array.isArray(coords[0]) && Array.isArray(coords[0][0]) && Array.isArray(coords[0][0][0]) && typeof coords[0][0][0][0] === "number") {
      return coords;
    }
    return [];
  };
  const polys = normalize(coordinates);
  if (polys.length === 0) return { proximity: false, point: [0, 0], distance: null };
  const lon = point[0];
  const lat = point[1];
  const pointInRing = (pt, ring) => {
    let x = pt[0], y = pt[1];
    let inside = false;
    for (let i = 0, j2 = ring.length - 1; i < ring.length; j2 = i++) {
      const xi = ring[i][0], yi = ring[i][1];
      const xj = ring[j2][0], yj = ring[j2][1];
      const intersect = yi > y !== yj > y && x < (xj - xi) * (y - yi) / (yj - yi + 0) + xi;
      if (intersect) inside = !inside;
    }
    return inside;
  };
  const toRadians = (deg) => deg * Math.PI / 180;
  const haversineMiles = (a, b) => {
    const R = 3958.8;
    const dLat = toRadians(b[1] - a[1]);
    const dLon = toRadians(b[0] - a[0]);
    const lat1 = toRadians(a[1]);
    const lat2 = toRadians(b[1]);
    const sinDLat = Math.sin(dLat / 2);
    const sinDLon = Math.sin(dLon / 2);
    const c = 2 * Math.asin(Math.sqrt(sinDLat * sinDLat + Math.cos(lat1) * Math.cos(lat2) * sinDLon * sinDLon));
    return R * c;
  };
  let minDistance = Infinity;
  let closestPoint = null;
  for (const poly of polys) {
    const outer = poly[0];
    const holes = poly.slice(1);
    if (pointInRing(point, outer)) {
      let inHole = false;
      for (const hole of holes) {
        if (pointInRing(point, hole)) {
          inHole = true;
          break;
        }
      }
      if (!inHole) {
        return { proximity: true, point, distance: 0 };
      }
    }
    for (const ring of poly) {
      for (let i = 0; i < ring.length - 1; i++) {
        const start = [ring[i][0], ring[i][1]];
        const end = [ring[i + 1][0], ring[i + 1][1]];
        const A = lon - start[0];
        const B = lat - start[1];
        const C = end[0] - start[0];
        const D = end[1] - start[1];
        const lenSq = C * C + D * D;
        const t = lenSq === 0 ? 0 : Math.max(0, Math.min(1, (A * C + B * D) / lenSq));
        const candidate = [start[0] + t * C, start[1] + t * D];
        const dist = haversineMiles([lon, lat], candidate);
        if (!isNaN(dist) && dist < minDistance) {
          minDistance = Number(dist.toFixed(3));
          closestPoint = candidate;
        }
      }
    }
  }
  if (!isFinite(minDistance) || closestPoint == null) {
    return { proximity: false, point: [0, 0], distance: null };
  }
  const distanceMiles = minDistance;
  const distanceKm = Number((distanceMiles * 1.609344).toFixed(3));
  const distanceMeters = Math.round(distanceKm * 1e3);
  return { proximity: distanceMiles === 0, point: closestPoint, distance: distanceMiles, distanceKm, distanceMeters };
};

// src/@building/building.polygon.ts
var getEventNodes = (event) => __async(null, null, function* () {
  var _a, _b;
  const metadata = { nodes: [], proximity: false, filtered: false };
  const geometry = yield getEventGeometry(event);
  if (!geometry || !geometry.coordinates) {
    return { nodes: [], filtered: false, updated: Date.now() };
  }
  const nodes = bootstrap.cache.nodes.features;
  for (const node of nodes) {
    const [longitude, latitude] = node.geometry.coordinates;
    const getPoint = getShapeNearestPoint(geometry.coordinates, [longitude, latitude]);
    const miles = (_a = getPoint.distance) != null ? _a : null;
    const kilometers = Number((miles * 1.609344).toFixed(3));
    const info = {
      id: (_b = node.properties) == null ? void 0 : _b.identifier,
      coordinates: [longitude, latitude],
      nearest: getPoint.point,
      miles,
      kilometers,
      proximity: getPoint.proximity
    };
    metadata.nodes.push(info);
    if (bootstrap.settings.GlobalSettings.EventFiltering.NodeLocationFiltering && miles < bootstrap.settings.GlobalSettings.NodeMinDistance) {
      metadata.proximity = true;
      info.proximity = true;
    }
  }
  return {
    nodes: metadata.nodes,
    filtered: metadata.proximity,
    updated: Date.now()
  };
});

// src/@manager/manager.updateNodes.ts
var updateNodes = () => __async(null, null, function* () {
  const events = bootstrap.cache.events.features;
  const ttl = bootstrap.settings.GlobalSettings.NodeTTL * 1e3;
  let total = 0;
  yield Promise.all(events.map((evt) => __async(null, null, function* () {
    var _a, _b, _c;
    const lastUpdate = (_c = (_b = (_a = evt == null ? void 0 : evt.properties) == null ? void 0 : _a.metadata) == null ? void 0 : _b.nodes_updated) != null ? _c : null;
    if (lastUpdate != null && Date.now() - lastUpdate < ttl) {
      return evt;
    }
    const node = yield getEventNodes(evt);
    evt.properties.metadata.nodes = node.nodes;
    evt.properties.metadata.filtered_proximity = node.filtered;
    evt.properties.metadata.nodes_updated = node.updated;
    total++;
  })));
  if (total > 0) {
    setEventEmit({
      event: `onNodeUpdate`,
      metadata: {
        type: `global-update`,
        updated: total
      }
    });
  }
});

// src/@building/building.validate.ts
var validateEvents = (events) => __async(null, null, function* () {
  var _a;
  if (events.length === 0) return;
  const configurations = bootstrap.settings;
  const sets = {};
  const bools = {};
  const megered = __spreadValues(__spreadValues({}, configurations.GlobalSettings), configurations.GlobalSettings.EventFiltering);
  for (const key in megered) {
    const setting = megered[key];
    if (Array.isArray(setting)) {
      sets[key] = new Set(setting.map((item) => item.toLowerCase()));
    }
    if (typeof setting === "boolean") {
      bools[key] = setting;
    }
  }
  const filterd = events.filter((event) => {
    var _a2;
    const define2 = getEventSignature(event);
    const properties2 = define2.properties;
    const zones = properties2.geocode.ugc;
    const icao = properties2.geocode.office.office;
    const enhancedEventName = properties2.event = getEventEnhancedName(event);
    const filteredProperties = JSON.parse(JSON.stringify(properties2));
    if ((filteredProperties == null ? void 0 : filteredProperties.metadata) && "ms" in filteredProperties.metadata) {
      delete filteredProperties.metadata.ms;
    }
    filteredProperties.metadata = (_a2 = filteredProperties.metadata) != null ? _a2 : {};
    filteredProperties.metadata.hash = createHash("sha256").update(JSON.stringify(filteredProperties)).digest("hex");
    setEventEmit({
      event: `onProductType${enhancedEventName.replace(/\s+/g, "")}`,
      metadata: define2
    });
    if (properties2.status_metadata.is_test) {
      setEventEmit({ event: `onTestProduct`, metadata: define2 });
      if (bools == null ? void 0 : bools.IgnoreTestProducts) return false;
    }
    if (properties2.status_metadata.is_expired) {
      setEventEmit({ event: `onExpiredProduct`, metadata: define2 });
      rmEvent(define2);
      return false;
    }
    for (const key in sets) {
      const setting = sets[key];
      if (key === "ListeningEvents" && setting.size > 0 && !setting.has(define2.properties.event.toLowerCase())) {
        setEventEmit({
          event: `onFilteredEvent`,
          metadata: define2
        });
        return false;
      }
      if (key === "IgnoredEvents" && setting.size > 0 && setting.has(define2.properties.event.toLowerCase())) {
        setEventEmit({
          event: `onIgnoredEvent`,
          metadata: define2
        });
        return false;
      }
      if (key === "ListeningICAO" && setting.size > 0 && icao != null && !setting.has(icao.toLowerCase())) {
        setEventEmit({
          event: `onFilteredICAO`,
          metadata: define2
        });
        return false;
      }
      if (key === "IgnoredICAO" && setting.size > 0 && icao != null && setting.has(icao.toLowerCase())) {
        setEventEmit({
          event: `onIgnoredICAO`,
          metadata: define2
        });
        return false;
      }
      if (key === "ListeningUGC" && setting.size > 0 && zones.length > 0 && !zones.some((ugc2) => setting.has(ugc2.toLowerCase()))) {
        setEventEmit({
          event: `onFilteredUGC`,
          metadata: define2
        });
        return false;
      }
      if (key === "ListeningStates" && setting.size > 0 && zones.length > 0 && !zones.some((ugc2) => setting.has(ugc2.substring(0, 2).toLowerCase()))) {
        setEventEmit({
          event: `onFilteredState`,
          metadata: define2
        });
        return false;
      }
    }
    return true;
  });
  if (!((_a = configurations == null ? void 0 : configurations.GlobalSettings) == null ? void 0 : _a.DisableGeometryParsing)) {
    for (const event of filterd) {
      event.geometry = yield getEventGeometry(event);
    }
  }
  if (filterd.length > 0) {
    for (const event of filterd) {
      yield mkEvent(event);
    }
  }
  yield updateNodes();
  setEventEmit({
    event: `onEventCache`,
    metadata: bootstrap.cache.events,
    limited: true
  });
});

// src/@events/events.text.ts
var text = (stanza) => __async(null, null, function* () {
  var _a, _b, _c;
  let processed = [];
  const getMessages = (_c = (_b = (_a = stanza == null ? void 0 : stanza.message) == null ? void 0 : _a.split(/(?=\$\$)/g)) == null ? void 0 : _b.map((message) => message.trim())) == null ? void 0 : _c.filter((message) => message && message !== "$$");
  if (!getMessages || (getMessages == null ? void 0 : getMessages.length) == 0) return;
  for (const message of getMessages) {
    const tick = performance.now();
    const attributes = stanza == null ? void 0 : stanza.attributes;
    const props = properties({ message, attributes });
    const header = getEventHeader({ properties: props, getType: stanza.getType });
    const issued = new Date(attributes.issue);
    const expires = new Date(issued.getTime() + 12 * 60 * 60 * 1e3);
    let event = Object.keys(eventsOffshore).find((event2) => message.toLowerCase().includes(event2.toLowerCase()));
    if (!event) {
      event = stanza.getType.type.split(`-`).map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(` `);
    }
    processed.push({
      type: `Feature`,
      geometry: {
        type: `Point`,
        coordinates: []
      },
      properties: __spreadProps(__spreadValues({
        event,
        parent: event,
        status: `Issued`,
        issued: !isNaN(issued.getTime()) ? issued.toISOString() : (/* @__PURE__ */ new Date()).toISOString(),
        expires: !isNaN(expires.getTime()) ? expires.toISOString() : new Date(Date.now() + 60 * 60 * 1e3).toISOString()
      }, props), {
        metadata: {
          ms: performance.now() - tick,
          source: `events.text`,
          tracking: getEventTracking({ type: `RAW`, stanza, attributes, properties: props }),
          header,
          vtec: null,
          hvtec: null,
          history: [
            {
              description: props.description,
              issued: !isNaN(issued.getTime()) ? issued.toISOString() : (/* @__PURE__ */ new Date()).toISOString(),
              status: `Issued`
            }
          ]
        }
      })
    });
  }
  validateEvents(processed);
});

// src/@parsers/@ugc/ugc.header.ts
var getUGCHeader = (message) => {
  const start = message.search(regExp.ugc1);
  const sub = message.substring(start);
  const end = sub.search(regExp.ugc2);
  const fin = sub.substring(0, end).replace(/\s+/g, "").slice(0, -1);
  return fin != null ? fin : null;
};

// src/@parsers/@ugc/ugc.zones.ts
var getZones = (header) => {
  const splits = header.split("-");
  const zones = [];
  let state = splits[0].substring(0, 2);
  const format = splits[0].substring(2, 3);
  for (const part of splits) {
    if (/^[A-Z]/.test(part)) {
      state = part.substring(0, 2);
      if (part.includes(">")) {
        const [start, end] = part.split(">");
        const startNum = parseInt(start.substring(3), 10);
        const endNum = parseInt(end, 10);
        for (let j2 = startNum; j2 <= endNum; j2++) {
          zones.push(`${state}${format}${j2.toString().padStart(3, "0")}`);
        }
      } else {
        zones.push(part);
      }
      continue;
    }
    if (part.includes(">")) {
      const [start, end] = part.split(">");
      const startNum = parseInt(start, 10);
      const endNum = parseInt(end, 10);
      for (let j2 = startNum; j2 <= endNum; j2++) {
        zones.push(`${state}${format}${j2.toString().padStart(3, "0")}`);
      }
    } else {
      zones.push(`${state}${format}${part}`);
    }
  }
  return zones.filter((item) => item !== "");
};

// src/@parsers/@ugc/ugc.expiry.ts
var getExpiry = (message) => {
  const match = message.match(/\b(\d{6})-/);
  if (!match) {
    return null;
  }
  const date = match == null ? void 0 : match[1];
  const day = parseInt(date == null ? void 0 : date.slice(0, 2), 10);
  const hour = parseInt(date == null ? void 0 : date.slice(2, 4), 10);
  const minute = parseInt(date == null ? void 0 : date.slice(4, 6), 10);
  const now = /* @__PURE__ */ new Date();
  const expires = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), day, hour, minute));
  return expires.toISOString();
};

// src/@parsers/@ugc/ugc.locations.ts
var getLocations = (zones) => __async(null, null, function* () {
  const sites = Array.from(new Set(zones));
  const placeholders = sites.map(() => "?").join(",");
  const rows = yield bootstrap.database.prepare(`SELECT id, location FROM shapefiles WHERE id IN (${placeholders})`).all(...sites);
  return rows.map((row) => row.location).sort();
});

// src/@parsers/@ugc/ugc.extract.ts
var ugcExtract = (message) => __async(null, null, function* () {
  const head = getUGCHeader(message);
  const ugcs = getZones(head);
  const expires = getExpiry(message);
  const areas = yield getLocations(ugcs);
  if (!head || (ugcs == null ? void 0 : ugcs.length) == 0) return;
  return {
    zones: ugcs,
    locations: areas,
    expires
  };
});

// src/@events/events.ugc.ts
var ugc = (stanza) => __async(null, null, function* () {
  var _a, _b, _c;
  let processed = [];
  const getMessages = (_c = (_b = (_a = stanza == null ? void 0 : stanza.message) == null ? void 0 : _a.split(/(?=\$\$)/g)) == null ? void 0 : _b.map((message) => message.trim())) == null ? void 0 : _c.filter((message) => message && message !== "$$");
  if (!getMessages || (getMessages == null ? void 0 : getMessages.length) == 0) return;
  for (const message of getMessages) {
    const tick = performance.now();
    const attributes = stanza == null ? void 0 : stanza.attributes;
    const ugc2 = yield ugcExtract(message);
    if (ugc2 != null) {
      const props = properties({ message, attributes, ugc: ugc2 });
      const issued = new Date(attributes.issue);
      const expires = new Date(issued.getTime() + 12 * 60 * 60 * 1e3);
      const header = getEventHeader({ properties: props, getType: stanza.getType });
      let event = Object.keys(eventsOffshore).find((event2) => message.toLowerCase().includes(event2.toLowerCase()));
      if (!event) {
        event = stanza.getType.type.split(`-`).map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(` `);
      }
      processed.push({
        type: `Feature`,
        geometry: {
          type: `Point`,
          coordinates: []
        },
        properties: __spreadProps(__spreadValues({
          event,
          parent: event,
          status: `Issued`,
          issued: !isNaN(issued.getTime()) ? issued.toISOString() : (/* @__PURE__ */ new Date()).toISOString(),
          expires: !isNaN(expires.getTime()) ? expires.toISOString() : new Date(Date.now() + 60 * 60 * 1e3).toISOString()
        }, props), {
          metadata: {
            ms: performance.now() - tick,
            source: `events.ugc`,
            tracking: getEventTracking({ type: `RAW`, stanza, attributes, properties: props }),
            header,
            vtec: null,
            hvtec: null,
            history: [
              {
                description: props.description,
                issued: !isNaN(issued.getTime()) ? issued.toISOString() : (/* @__PURE__ */ new Date()).toISOString(),
                status: `Issued`
              }
            ]
          }
        })
      });
    }
  }
  validateEvents(processed);
});

// src/@dictionaries/dictionaries.eventTypes.ts
var eventTypes = {
  "AF": "Ashfall",
  "AS": "Air Stagnation",
  "BH": "Beach Hazard",
  "BW": "Brisk Wind",
  "BZ": "Blizzard",
  "CF": "Coastal Flood",
  "DF": "Debris Flow",
  "DS": "Dust Storm",
  "EC": "Extreme Cold",
  "EH": "Excessive Heat",
  "XH": "Extreme Heat",
  "EW": "Extreme Wind",
  "FA": "Areal Flood",
  "FF": "Flash Flood",
  "FG": "Dense Fog",
  "FL": "Flood",
  "FR": "Frost",
  "FW": "Fire Weather",
  "FZ": "Freeze",
  "GL": "Gale",
  "HF": "Hurricane Force Wind",
  "HT": "Heat",
  "HU": "Hurricane",
  "HW": "High Wind",
  "HY": "Hydrologic",
  "HZ": "Hard Freeze",
  "IS": "Ice Storm",
  "LE": "Lake Effect Snow",
  "LO": "Low Water",
  "LS": "Lakeshore Flood",
  "LW": "Lake Wind",
  "MA": "Special Marine",
  "EQ": "Earthquake",
  "MF": "Dense Fog",
  "MH": "Ashfall",
  "MS": "Dense Smoke",
  "RB": "Small Craft for Rough Bar",
  "RP": "Rip Current Risk",
  "SC": "Small Craft",
  "SE": "Hazardous Seas",
  "SI": "Small Craft for Winds",
  "SM": "Dense Smoke",
  "SQ": "Snow Squall",
  "SR": "Storm",
  "SS": "Storm Surge",
  "SU": "High Surf",
  "SV": "Severe Thunderstorm",
  "SW": "Small Craft for Hazardous Seas",
  "TO": "Tornado",
  "TR": "Tropical Storm",
  "TS": "Tsunami",
  "TY": "Typhoon",
  "SP": "Special Weather",
  "UP": "Heavy Freezing Spray",
  "WC": "Wind Chill",
  "WI": "Wind",
  "WS": "Winter Storm",
  "WW": "Winter Weather",
  "ZF": "Freezing Fog",
  "ZR": "Freezing Rain",
  "ZY": "Freezing Spray"
};

// src/@dictionaries/dictionaries.eventActions.ts
var eventActions = {
  "W": "Warning",
  "F": "Forecast",
  "A": "Watch",
  "O": "Outlook",
  "Y": "Advisory",
  "N": "Synopsis",
  "S": "Statement"
};

// src/@dictionaries/dictionaries.eventStatus.ts
var eventStatus = {
  "NEW": "Issued",
  "CON": "Updated",
  "EXT": "Extended",
  "EXA": "Extended",
  "EXB": "Extended",
  "UPG": "Upgraded",
  "COR": "Correction",
  "ROU": "Routine",
  "CAN": "Cancelled",
  "EXP": "Expired"
};

// src/@parsers/@pvtec/pvtec.expires.ts
var getExpiry2 = (dates) => {
  if ((dates == null ? void 0 : dates[1]) == `000000T0000Z`) return "Invalid Date Format";
  const expires = `${(/* @__PURE__ */ new Date()).getFullYear().toString().substring(0, 2)}${dates[1].substring(0, 2)}-${dates[1].substring(2, 4)}-${dates[1].substring(4, 6)}T${dates[1].substring(7, 9)}:${dates[1].substring(9, 11)}:00`;
  const local = new Date(new Date(expires).getTime() - 4 * 60 * 6e4);
  const pad = (n) => n.toString().padStart(2, "0");
  return `${local.getFullYear()}-${pad(local.getMonth() + 1)}-${pad(local.getDate())}T${pad(local.getHours())}:${pad(local.getMinutes())}:00.000-04:00`;
};

// src/@parsers/@pvtec/pvtec.extract.ts
var pvExtract = (message) => {
  var _a, _b, _c, _d;
  const getVTECs = (_a = message.match(regExp.pvtec)) != null ? _a : [];
  const vtecs = [];
  for (const vtec2 of getVTECs) {
    const sub = vtec2.split(`.`);
    if ((sub == null ? void 0 : sub.length) < 7) continue;
    const dates = (_b = sub[6]) == null ? void 0 : _b.split(`-`);
    vtecs.push({
      vtec: vtec2,
      product: eventProducts[sub[0]],
      tracking: `${sub[2]}-${sub[3]}-${sub[4]}-${sub[5]}`,
      event: `${eventTypes[sub[3]]} ${eventActions[sub[4]]}`,
      status: eventStatus[sub[1]],
      organization: (_d = (_c = message.match(regExp.wmo)) == null ? void 0 : _c[0]) != null ? _d : null,
      expires: getExpiry2(dates),
      prediction_center: (sub[4] == `A` || sub[4] == `Y`) && (sub[3] == `TO` || sub[3] == `SV`) ? true : false
    });
  }
  return vtecs.length > 0 ? vtecs : null;
};

// src/@dictionaries/dictionaries.eventCauses.ts
var eventCauses = {
  "SM": "Snow Melt",
  "RS": "Rain/Snow Melt",
  "ER": "Excessive Rain",
  "DM": "Dam/Levee Failure",
  "IJ": "Ice Jam",
  "GO": "Glacier Lake Outburst",
  "IC": "Ice",
  "FS": "Flash Flood / Storm Surge",
  "FT": "Tidal Effects",
  "ET": "Elevated Upstream Flow",
  "MC": "Other Multiple Causes",
  "WT": "Wind and/or Tidal Effects",
  "DR": "Reservoir Release",
  "UU": "Unknown",
  "OT": "Other Effects"
};

// src/@dictionaries/dictionaries.eventRecords.ts
var eventRecords = {
  "NO": "No Record Expected",
  "NR": "Near Record or possible record",
  "UU": "Unknown history of records",
  "OO": "Other"
};

// src/@dictionaries/dictionaries.eventSeverity.ts
var eventSeverity = {
  N: "Not Expected",
  0: "Areal Flood or FF Product",
  1: "Minor",
  2: "Moderate",
  3: "Major",
  U: "Unknown"
};

// src/@parsers/@hvtec/hvtec.extract.ts
var hvExtract = (message) => {
  var _a;
  const getHVTECs = (_a = message.match(regExp.hvtec)) != null ? _a : [];
  const vtecs = [];
  for (const vtec2 of getHVTECs) {
    const sub = vtec2.split(`.`);
    if (sub.length < 7) continue;
    vtecs.push({
      hvtec: vtec2,
      severity: eventSeverity[sub[1]],
      cause: eventCauses[sub[2]],
      record: eventRecords[sub[6]]
    });
  }
  return vtecs.length > 0 ? vtecs : null;
};

// src/@events/events.vtec.ts
var vtec = (stanza) => __async(null, null, function* () {
  var _a, _b, _c, _d;
  let processed = [];
  const getMessages = (_c = (_b = (_a = stanza == null ? void 0 : stanza.message) == null ? void 0 : _a.split(/(?=\$\$)/g)) == null ? void 0 : _b.map((message) => message.trim())) == null ? void 0 : _c.filter((message) => message && message !== "$$");
  if (!getMessages || (getMessages == null ? void 0 : getMessages.length) == 0) return;
  for (const message of getMessages) {
    const tick = performance.now();
    const attributes = stanza == null ? void 0 : stanza.attributes;
    const pVtec = yield pvExtract(message);
    const hVtec = yield hvExtract(message);
    const ugc2 = yield ugcExtract(message);
    if (pVtec != null && ugc2 != null) {
      for (const pv of pVtec) {
        const vtec2 = pv;
        const props = properties({ message, attributes, ugc: ugc2, pVtec: vtec2 });
        const header = getEventHeader({ properties: props, getType: stanza.getType, vtec: vtec2 });
        const issued = (_d = new Date(attributes.issue)) != null ? _d : /* @__PURE__ */ new Date();
        const expires = new Date(vtec2.expires);
        processed.push({
          type: `Feature`,
          geometry: {
            type: `Point`,
            coordinates: []
          },
          properties: __spreadProps(__spreadValues({
            event: pv.event,
            parent: pv.event,
            status: pv.status,
            issued: !isNaN(issued.getTime()) ? issued.toISOString() : (/* @__PURE__ */ new Date()).toISOString(),
            expires: !isNaN(expires.getTime()) ? expires.toISOString() : new Date(Date.now() + 60 * 60 * 1e3).toISOString()
          }, props), {
            metadata: {
              ms: performance.now() - tick,
              source: `events.vtec`,
              tracking: getEventTracking({ type: `VTEC`, stanza, attributes, properties: props, vtec: vtec2 }),
              header,
              vtec: pv.vtec,
              hvtec: hVtec,
              history: [
                {
                  description: props.description,
                  issued: !isNaN(issued.getTime()) ? issued.toISOString() : (/* @__PURE__ */ new Date()).toISOString(),
                  status: pv.status
                }
              ]
            }
          })
        });
      }
    }
  }
  validateEvents(processed);
});

// src/@events/events.api.ts
var api = (stanza) => __async(null, null, function* () {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J, _K, _L, _M, _N, _O, _P, _Q, _R, _S, _T, _U, _V, _W, _X, _Y, _Z, __, _$, _aa, _ba, _ca, _da, _ea, _fa, _ga, _ha, _ia, _ja, _ka, _la, _ma, _na, _oa, _pa, _qa, _ra, _sa, _ta, _ua, _va, _wa, _xa, _ya, _za, _Aa, _Ba, _Ca, _Da, _Ea, _Fa, _Ga, _Ha, _Ia, _Ja, _Ka, _La, _Ma, _Na, _Oa, _Pa, _Qa, _Ra, _Sa, _Ta, _Ua, _Va, _Wa, _Xa, _Ya, _Za, __a, _$a, _ab, _bb;
  let processed = [];
  const messages = Object.values(JSON.parse(stanza.message).features);
  for (const feature of messages) {
    const tick = performance.now();
    const pVtec = (_d = (_c = (_b = (_a = feature == null ? void 0 : feature.properties) == null ? void 0 : _a.parameters) == null ? void 0 : _b.VTEC) == null ? void 0 : _c[0]) != null ? _d : null;
    processed.push({
      type: `Feature`,
      geometry: {
        type: `Point`,
        coordinates: []
      },
      properties: {
        event: (_f = (_e = feature == null ? void 0 : feature.properties) == null ? void 0 : _e.event) != null ? _f : null,
        parent: (_h = (_g = feature == null ? void 0 : feature.properties) == null ? void 0 : _g.event) != null ? _h : null,
        status: (_j = (_i = feature == null ? void 0 : feature.properties) == null ? void 0 : _i.messageType) != null ? _j : null,
        issued: ((_k = feature == null ? void 0 : feature.properties) == null ? void 0 : _k.sent) ? new Date((_l = feature == null ? void 0 : feature.properties) == null ? void 0 : _l.sent).toISOString() : null,
        expires: ((_m = feature == null ? void 0 : feature.properties) == null ? void 0 : _m.expires) ? new Date((_n = feature == null ? void 0 : feature.properties) == null ? void 0 : _n.expires).toISOString() : null,
        locations: (_p = (_o = feature == null ? void 0 : feature.properties) == null ? void 0 : _o.areaDesc) != null ? _p : null,
        description: (_r = (_q = feature == null ? void 0 : feature.properties) == null ? void 0 : _q.description) != null ? _r : null,
        attributes: (_t = (_s = feature == null ? void 0 : feature.properties) == null ? void 0 : _s.attributes) != null ? _t : {},
        geocode: {
          office: {
            office: pVtec ? pVtec.split(`.`)[2] : null,
            name: (_u = officeICAOs[pVtec ? pVtec.split(`.`)[2] : null]) != null ? _u : null
          },
          organization: (_x = (_w = (_v = feature == null ? void 0 : feature.properties) == null ? void 0 : _v.parameters) == null ? void 0 : _w.WMOidentifier) == null ? void 0 : _x[0],
          ugc: (_A = (_z = (_y = feature == null ? void 0 : feature.properties) == null ? void 0 : _y.geocode) == null ? void 0 : _z.UGC) != null ? _A : [],
          polygon: ((_B = feature == null ? void 0 : feature.geometry) == null ? void 0 : _B.coordinates.length) > 0 ? Buffer.from(JSON.stringify([(_C = feature == null ? void 0 : feature.geometry) == null ? void 0 : _C.coordinates[0]])).toString("base64") : null,
          polygon_generated: ((_D = feature == null ? void 0 : feature.geometry) == null ? void 0 : _D.coordinates.length) > 0 ? true : false
        },
        parameters: {
          tags: getEventTags((_E = feature == null ? void 0 : feature.properties) == null ? void 0 : _E.description),
          instructions: (_G = (_F = feature == null ? void 0 : feature.properties) == null ? void 0 : _F.instruction) != null ? _G : null,
          source: (_I = getTextFromProduct({ message: (_H = feature == null ? void 0 : feature.properties) == null ? void 0 : _H.description, find: [`SOURCE...`], removal: [`.`] })) != null ? _I : null,
          hazards: (_K = getTextFromProduct({ message: (_J = feature == null ? void 0 : feature.properties) == null ? void 0 : _J.description, find: [`HAZARD...`], removal: [`.`] })) != null ? _K : null,
          impacts: (_M = getTextFromProduct({ message: (_L = feature == null ? void 0 : feature.properties) == null ? void 0 : _L.description, find: [`IMPACT...`], removal: [`.`] })) != null ? _M : null,
          estimated_hail_size: (_Q = (_P = (_O = (_N = feature == null ? void 0 : feature.properties) == null ? void 0 : _N.parameters) == null ? void 0 : _O.maxHailSize) == null ? void 0 : _P[0]) != null ? _Q : null,
          estimated_wind_gusts: (_U = (_T = (_S = (_R = feature == null ? void 0 : feature.properties) == null ? void 0 : _R.parameters) == null ? void 0 : _S.maxWindGust) == null ? void 0 : _T[0]) != null ? _U : null,
          damage_threat: (_Y = (_X = (_W = (_V = feature == null ? void 0 : feature.properties) == null ? void 0 : _V.parameters) == null ? void 0 : _W.thunderstormDamageThreat) == null ? void 0 : _X[0]) != null ? _Y : null,
          tornado_threat: (_aa = (_$ = (__ = (_Z = feature == null ? void 0 : feature.properties) == null ? void 0 : _Z.parameters) == null ? void 0 : __.tornadoDetection) == null ? void 0 : _$[0]) != null ? _aa : null,
          flood_threat: (_ea = (_da = (_ca = (_ba = feature == null ? void 0 : feature.properties) == null ? void 0 : _ba.parameters) == null ? void 0 : _ca.floodDetection) == null ? void 0 : _da[0]) != null ? _ea : null,
          wind_threat: (_ia = (_ha = (_ga = (_fa = feature == null ? void 0 : feature.properties) == null ? void 0 : _fa.parameters) == null ? void 0 : _ga.windThreat) == null ? void 0 : _ha[0]) != null ? _ia : null,
          hail_threat: (_ma = (_la = (_ka = (_ja = feature == null ? void 0 : feature.properties) == null ? void 0 : _ja.parameters) == null ? void 0 : _ka.hailThreat) == null ? void 0 : _la[0]) != null ? _ma : null
        },
        spc_parameters: {
          spc_max_tornado: (_oa = getTextFromProduct({ message: (_na = feature == null ? void 0 : feature.properties) == null ? void 0 : _na.description, find: [`MOST PROBABLE PEAK TORNADO INTENSITY...`] })) != null ? _oa : null,
          spc_max_hail: (_qa = getTextFromProduct({ message: (_pa = feature == null ? void 0 : feature.properties) == null ? void 0 : _pa.description, find: [`MOST PROBABLE PEAK HAIL SIZE...`] })) != null ? _qa : null,
          spc_max_wind: (_sa = getTextFromProduct({ message: (_ra = feature == null ? void 0 : feature.properties) == null ? void 0 : _ra.description, find: [`MOST PROBABLE PEAK WIND GUST...`] })) != null ? _sa : null,
          spc_watch_issuance: (_ua = getTextFromProduct({ message: (_ta = feature == null ? void 0 : feature.properties) == null ? void 0 : _ta.description, find: [`Probability of Watch Issuance...`], removal: [`percent`] })) != null ? _ua : null
        },
        watch_parameters: {
          watch_number: (_ya = (_xa = (_wa = getTextFromProduct({ message: (_va = feature == null ? void 0 : feature.properties) == null ? void 0 : _va.description, find: [`ITIES FOR`, `UPDATE FOR`, `Watch Number `], removal: [`%`, `<`, `:`] })) == null ? void 0 : _wa.replace(/(WT|WS|)/g, "")) == null ? void 0 : _xa.trim()) != null ? _ya : null,
          watch_type: ((_za = feature == null ? void 0 : feature.properties) == null ? void 0 : _za.description.includes(`TORNADO WATCH`)) ? `Tornado` : ((_Aa = feature == null ? void 0 : feature.properties) == null ? void 0 : _Aa.description.includes(`SEVERE`)) ? `Severe` : null,
          additional_tornadoes_probability: (_Ca = getTextFromProduct({ message: (_Ba = feature == null ? void 0 : feature.properties) == null ? void 0 : _Ba.description, find: [`PROB OF 2 OR MORE TORNADOES`], removal: [`%`, `<`, `:`] })) != null ? _Ca : null,
          strong_tornadoes_probability: (_Ea = getTextFromProduct({ message: (_Da = feature == null ? void 0 : feature.properties) == null ? void 0 : _Da.description, find: [`PROB OF 1 OR MORE STRONG /EF2-EF5/ TORNADOES`], removal: [`%`, `<`, `:`] })) != null ? _Ea : null,
          severe_wind_probability: (_Ga = getTextFromProduct({ message: (_Fa = feature == null ? void 0 : feature.properties) == null ? void 0 : _Fa.description, find: [`PROB OF 10 OR MORE SEVERE WIND EVENTS`], removal: [`%`, `<`, `:`] })) != null ? _Ga : null,
          severe_hail_probability: (_Ia = getTextFromProduct({ message: (_Ha = feature == null ? void 0 : feature.properties) == null ? void 0 : _Ha.description, find: [`PROB OF 10 OR MORE SEVERE HAIL EVENTS`], removal: [`%`, `<`, `:`] })) != null ? _Ia : null,
          hail_2in_probability: (_Ka = getTextFromProduct({ message: (_Ja = feature == null ? void 0 : feature.properties) == null ? void 0 : _Ja.description, find: [`PROB OF 1 OR MORE HAIL EVENTS >= 2 INCHES`], removal: [`%`, `<`, `:`] })) != null ? _Ka : null,
          combined_hail_wind_probability: (_Ma = getTextFromProduct({ message: (_La = feature == null ? void 0 : feature.properties) == null ? void 0 : _La.description, find: [`PROB OF 6 OR MORE COMBINED SEVERE HAIL/WIND EVENTS`], removal: [`%`, `<`, `:`] })) != null ? _Ma : null,
          max_hail_in: (_Oa = getTextFromProduct({ message: (_Na = feature == null ? void 0 : feature.properties) == null ? void 0 : _Na.description, find: [`MAX HAIL /INCHES/`], removal: [`%`, `<`, `:`] })) != null ? _Oa : null,
          max_wind_surface: (_Qa = getTextFromProduct({ message: (_Pa = feature == null ? void 0 : feature.properties) == null ? void 0 : _Pa.description, find: [`MAX WIND GUSTS SURFACE /KNOTS/`], removal: [`%`, `<`, `:`] })) != null ? _Qa : null,
          max_tops_x100feet: (_Sa = getTextFromProduct({ message: (_Ra = feature == null ? void 0 : feature.properties) == null ? void 0 : _Ra.description, find: [`MAX TOPS /X 100 FEET/`], removal: [`%`, `<`, `:`] })) != null ? _Sa : null,
          pds_watch: getTextFromProduct({ message: (_Ta = feature == null ? void 0 : feature.properties) == null ? void 0 : _Ta.description, find: [`PARTICULARLY DANGEROUS SITUATION`], removal: [`%`, `<`, `:`] }) === `YES`
        },
        metadata: {
          ms: performance.now() - tick,
          source: `events.api`,
          tracking: getEventTracking({ type: `API`, organization: { wmoidentifier: (_Wa = (_Va = (_Ua = feature == null ? void 0 : feature.properties) == null ? void 0 : _Ua.parameters) == null ? void 0 : _Va.WMOidentifier) == null ? void 0 : _Wa[0], featureId: feature == null ? void 0 : feature.id }, vtec: pVtec }),
          header: `ZCZC-ATMOSX-${(_Ya = (_Xa = feature == null ? void 0 : feature.properties) == null ? void 0 : _Xa.parameters) == null ? void 0 : _Ya.WMOidentifier}`,
          vtec: pVtec,
          hvtec: null,
          history: [
            {
              description: (_Za = feature == null ? void 0 : feature.properties) == null ? void 0 : _Za.description,
              issued: ((__a = feature == null ? void 0 : feature.properties) == null ? void 0 : __a.sent) ? new Date((_$a = feature == null ? void 0 : feature.properties) == null ? void 0 : _$a.sent).toISOString() : null,
              status: (_bb = (_ab = feature == null ? void 0 : feature.properties) == null ? void 0 : _ab.messageType) != null ? _bb : null
            }
          ]
        }
      }
    });
  }
  validateEvents(processed);
});

// src/@building/building.create.ts
var createEvent = (stanza) => __async(null, null, function* () {
  const settings = bootstrap.settings;
  const StanzaSettings = settings.NOAAWeatherWireServiceSettings.StanzaSettings;
  const isVtecEvent = stanza.isVTEC && stanza.isUGC;
  const isUgcEvent = !stanza.isVTEC && stanza.isUGC;
  const isTextEvent = !stanza.isVTEC && !stanza.isUGC;
  const isNWWS = stanza.isNWWS;
  if (!isNWWS) return yield api(stanza);
  if (!StanzaSettings.DisableVTEC && isVtecEvent) return yield vtec(stanza);
  if (!StanzaSettings.DisableUGC && isUgcEvent) return yield ugc(stanza);
  if (!StanzaSettings.DisableText && isTextEvent) return yield text(stanza);
  return "nothing picked";
});

// src/@modules/@database/database.stanza.ts
var importStanza = (stanza) => __async(null, null, function* () {
  const settings = bootstrap.settings;
  try {
    bootstrap.database.prepare(`INSERT OR IGNORE INTO stanzas (type, stanza, issued) VALUES (?, ?, ?)`).run(stanza.getType.type, JSON.stringify(stanza), stanza.attributes.issue);
    const count = bootstrap.database.prepare(`SELECT COUNT(*) as total FROM stanzas`).get();
    const max = settings.NOAAWeatherWireServiceSettings.CacheSettings.MaxDatabaseHistory;
    if (count.total > max) {
      const toDelete = count.total - max;
      if (toDelete > 0) {
        bootstrap.database.prepare(`DELETE FROM stanzas WHERE id IN (SELECT id FROM stanzas ORDER BY issued ASC LIMIT ?)`).run(toDelete);
      }
    }
  } catch (error) {
    setWarning({ message: `An error occurred while importing stanza: ${error.message}` });
  }
});

// src/@modules/@xmpp/xmpp.xStanza.ts
var xStanza = () => {
  bootstrap.session_xmpp.on(`stanza`, (stanza) => __async(null, null, function* () {
    var _a, _b, _c, _d;
    const msgFrom = (_b = (_a = stanza == null ? void 0 : stanza.attrs) == null ? void 0 : _a.from) != null ? _b : ``;
    const msgType = (_d = (_c = stanza == null ? void 0 : stanza.attrs) == null ? void 0 : _c.type) != null ? _d : ``;
    bootstrap.cache.lastStanza = Date.now();
    if (stanza.is(`message`)) {
      const result = validate({ stanza });
      const isSkippable = result.isIgnored || result.isCapEvent || result.isCapEvent && !result.isCapAreaDescription;
      if (isSkippable) {
        return;
      }
      yield createEvent(result);
      yield importStanza(result);
    }
    if (stanza.is(`presence`) && msgFrom.startsWith("nwws@conference.nwws-oi.weather.gov/")) {
      const getOccupant = msgFrom.split(`/`).slice(1).join(`/`);
      const getAvailability = msgType === `unavailable`;
      setEventEmit({
        event: `onXMPPStatus`,
        metadata: {
          message: `Occupant ${getOccupant} has ${getAvailability ? `left` : `joined`} the room`,
          data: {},
          type: `occupant`,
          error: false
        }
      });
    }
  }));
};

// src/@modules/@xmpp/xmpp.xDeploy.ts
var xDeploy = () => __async(null, null, function* () {
  var _a, _b;
  let session;
  const settings = bootstrap.settings;
  (_b = (_a = settings.NOAAWeatherWireServiceSettings.CredentialSettings).Nickname) != null ? _b : _a.Nickname = settings.NOAAWeatherWireServiceSettings.CredentialSettings.Username;
  session = bootstrap.session_xmpp = client({
    service: "xmpp://nwws-oi.weather.gov",
    domain: "nwws-oi.weather.gov",
    username: settings.NOAAWeatherWireServiceSettings.CredentialSettings.Username,
    password: settings.NOAAWeatherWireServiceSettings.CredentialSettings.Password
  });
  try {
    yield xOffline();
    yield xError();
    yield xStanza();
    yield xOnline();
    yield session.start();
  } catch (error) {
    setEventEmit({
      event: `onXMPPStatus`,
      metadata: {
        message: `Error occured while starting XMPP Session: ${error}`,
        data: {},
        type: `error`,
        error: true
      }
    });
  }
});

// src/@modules/@database/database.init.ts
import fs2 from "fs";
import sqlite3 from "better-sqlite3";

// src/@modules/@database/database.shapefiles.ts
import fs from "fs";
import { resolve as resolve5, extname } from "path";
import { loadAsync } from "jszip";
import { read } from "shapefile";

// src/@dictionaries/dictionaries.shapefileLinks.ts
var shapefileLinks = [
  { name: "us_counties", id: "C", link: "https://www.weather.gov/source/gis/Shapefiles/County/c_16ap26.zip" },
  { name: "us_states_territories", id: "Z", link: "https://www.weather.gov/source/gis/Shapefiles/County/s_16ap26.zip" },
  { name: "fire_weather_zones", id: "Z", link: "https://www.weather.gov/source/gis/Shapefiles/WSOM/fz16ap26.zip" },
  { name: "costal_marine_zones", id: "Z", link: "https://www.weather.gov/source/gis/Shapefiles/WSOM/mz16ap26.zip" },
  { name: "offshore_marine_zones", id: "Z", link: "https://www.weather.gov/source/gis/Shapefiles/WSOM/oz16ap26.zip" },
  { name: "public_forecast_zones", id: "Z", link: "https://www.weather.gov/source/gis/Shapefiles/WSOM/z_16ap26.zip" },
  { name: "county_warning_areas", id: "Z", link: "https://www.weather.gov/source/gis/Shapefiles/WSOM/w_16ap26.zip" },
  { name: "river_forecast_boundaries", id: "Z", link: "https://www.weather.gov/source/gis/Shapefiles/Misc/rf05mr24.zip" },
  { name: "high_seas_marine_zones", id: "Z", link: "https://www.weather.gov/source/gis/Shapefiles/WSOM/hz17fe26.zip" }
];

// src/@modules/@database/database.shapefiles.ts
var importShapefiles = () => __async(null, null, function* () {
  var _a, _b;
  const settings = bootstrap.settings;
  try {
    const tShapefiles = bootstrap.database.prepare(`SELECT COUNT(*) AS count FROM shapefiles`).get().count;
    if (tShapefiles === 0) {
      yield setSleep({ timeout: 1e3 });
      setWarning({ message: `Shapefiles are currently building, please DO NOT close your terminal. The shapefiles will not finish and will remain incomplete. If you do mess up, you will need to delete ${settings.Database} and restart the application.` });
      for (const shapefile of shapefileLinks) {
        const response2 = yield fetch(shapefile.link);
        const arrayBuff = yield response2.arrayBuffer();
        const content = yield loadAsync(arrayBuff);
        const directory = resolve5(__dirname, `../../shapefiles`);
        if (!fs.existsSync(directory)) {
          fs.mkdirSync(directory, { recursive: true });
        }
        for (const file of Object.keys(content.files)) {
          if (file.endsWith(".shp") || file.endsWith(".dbf")) {
            const data = yield content.files[file].async(`nodebuffer`);
            const output = resolve5(directory, `${(_a = shapefile == null ? void 0 : shapefile.name) != null ? _a : ``}_${(_b = shapefile == null ? void 0 : shapefile.id) != null ? _b : ``}${extname(file)}`);
            fs.writeFileSync(output, data);
            setWarning({ message: `Successfully downloaded and extracted ${file}` });
          }
        }
        const filepath = resolve5(__dirname, "../../shapefiles", shapefile.name + "_" + shapefile.id);
        const { features } = yield read(
          filepath,
          filepath
        );
        setWarning({ message: `Importing ${features.length} features from ${shapefile.name}_${shapefile.id}` });
        const insert = bootstrap.database.prepare(`INSERT OR REPLACE INTO shapefiles (id, location, geometry) VALUES (?, ?, ?)`);
        const transaction = bootstrap.database.transaction((entries) => {
          var _a2, _b2, _c;
          for (const entry of entries) {
            const { properties: properties2, geometry } = entry;
            let final2, location;
            if (properties2.FIPS) {
              final2 = `${properties2.STATE}${shapefile.id}${properties2.FIPS.substring(2)}`;
              location = `${properties2.COUNTYNAME}, ${properties2.STATE}`;
            } else if (properties2.FULLSTAID) {
              final2 = `${properties2.ST}${shapefile.id}${properties2.WFO}`;
              location = `${properties2.CITY}, ${properties2.STATE}`;
            } else if (properties2.STATE) {
              final2 = `${properties2.STATE}${shapefile.id}${(_a2 = properties2.ZONE) != null ? _a2 : properties2.SITE_ID}`;
              location = `${(_b2 = properties2.NAME) != null ? _b2 : `${properties2.RFC_NAME} ${properties2.RFC_CITY}`}, ${properties2.STATE}`;
            } else {
              final2 = (_c = properties2.ID) != null ? _c : properties2.WFO;
              location = properties2.NAME;
            }
            insert.run(final2, location, JSON.stringify(geometry));
          }
        });
        fs.unlinkSync(`${filepath}.shp`);
        fs.unlinkSync(`${filepath}.dbf`);
        setWarning({ message: `Cleaned up temporary files for ${shapefile.name}_${shapefile.id}` });
        transaction(features);
      }
      setWarning({ message: `Shapefiles have finished compiling, you can now continue and close this terminal` });
      fs.rm(resolve5(__dirname, "../../shapefiles"), { recursive: true, force: true }, () => {
      });
    }
  } catch (error) {
    setWarning({ message: `An error occurred while compiling shapefiles: ${error.message}` });
  }
});

// src/@modules/@database/database.init.ts
var initializeDatabase = () => __async(null, null, function* () {
  const settings = bootstrap.settings;
  try {
    if (!fs2.existsSync(settings.Database)) {
      fs2.writeFileSync(settings.Database, "");
      setWarning({ message: `Creating new database at ${settings.Database}` });
    }
    bootstrap.database = new sqlite3(settings.Database);
    bootstrap.database.prepare(`CREATE TABLE IF NOT EXISTS stanzas ( id INTEGER PRIMARY KEY AUTOINCREMENT, type TEXT, issued TEXT, stanza TEXT )`).run();
    bootstrap.database.prepare(`CREATE TABLE IF NOT EXISTS shapefiles (id TEXT PRIMARY KEY, location TEXT, geometry TEXT)`).run();
    yield importShapefiles();
  } catch (error) {
    setWarning({ message: `An error occurred while initializing the database: ${error.message}` });
  }
});

// src/@modules/@database/database.cache.ts
var getCachedEvents = () => __async(null, null, function* () {
  var _a;
  try {
    const settings = bootstrap.settings;
    const tick = performance.now();
    if (settings.NOAAWeatherWireServiceSettings.CacheSettings.Enabled) {
      const max = (_a = settings.NOAAWeatherWireServiceSettings.CacheSettings.MaxRetentionHistory) != null ? _a : 500;
      const get = yield bootstrap.database.prepare(`SELECT * FROM stanzas ORDER BY rowid DESC LIMIT ?`).all(max);
      setWarning({ message: `Fetched ${get.length} cached events from the database in ${Math.floor(performance.now() - tick)} ms` });
      let events = get.map((row) => JSON.parse(row.stanza)).filter((stanza) => {
        if (!stanza) {
          return;
        }
        const isSkippable = stanza.isIgnored || stanza.isCapEvent || stanza.isCapEvent && !stanza.isCapAreaDescription;
        return !isSkippable;
      });
      events = events.sort((a, b) => b.issued - a.issued);
      yield Promise.all(events.map((event) => createEvent(event)));
      setWarning({ message: `Processed ${events.length} cached events in ${Math.floor(performance.now() - tick)} ms` });
    }
  } catch (error) {
    setWarning({ message: `An error occurred while fetching cached events: ${error.message} -> ${error.stack}` });
  }
});

// src/@modules/@xmpp/xmpp.xReconnect.ts
var xReconnect = (interval) => __async(null, null, function* () {
  const settings = bootstrap.settings;
  const lastStanza = Date.now() - bootstrap.cache.lastStanza;
  const reconnectThreshold = interval * 1e3;
  if (!bootstrap.cache.isConnected && !bootstrap.cache.sigHault || !bootstrap.session_xmpp) {
    return;
  }
  if (lastStanza > reconnectThreshold) {
    if (!bootstrap.cache.isReconnecting) {
      bootstrap.cache.isReconnecting = true;
      bootstrap.cache.isConnected = false;
      bootstrap.cache.tReconnects += 1;
      try {
        setEventEmit({
          event: `onXMPPStatus`,
          metadata: {
            message: `Attempting to reconnect to XMPP Service (Reconnect Attempt ${bootstrap.cache.tReconnects})`,
            data: {
              last_stanza: lastStanza,
              nickname: settings.NOAAWeatherWireServiceSettings.CredentialSettings.Nickname
            },
            type: `reconnect`,
            error: true
          }
        });
        yield bootstrap.session_xmpp.stop().catch(() => {
        });
        yield bootstrap.session_xmpp.start().catch(() => {
        });
      } catch (error) {
        setWarning({ message: `XMPP Reconnect Failed - ${error.message}` });
      } finally {
        bootstrap.cache.isReconnecting = false;
      }
    }
  }
});

// src/@modules/@utilities/utilities.createHttp.ts
import request from "request";
var createHttp = (options) => __async(null, null, function* () {
  return new Promise((resolve6, reject) => {
    var _a, _b, _c, _d;
    const requestOptions = {
      url: (_a = options.url) != null ? _a : `https://api.weather.gov/alerts/active`,
      headers: (_b = options.headers) != null ? _b : {
        "User-Agent": "AtmosphericX",
        "Accept": "application/geo+json, text/plain, */*; q=0.9",
        "Accept-Language": "en-US,en;q=0.9"
      },
      timeout: (_c = options.timeout) != null ? _c : 1e4,
      proxy: (_d = options.proxy) != null ? _d : null,
      maxRedirects: 1
    };
    request(requestOptions, (error, response2, body) => {
      var _a2, _b2, _c2, _d2, _e;
      if (error) {
        return resolve6({
          error: true,
          options: requestOptions,
          status: -1,
          message: (_a2 = error.message) != null ? _a2 : `Unknown Error`
        });
      }
      if (response2.statusCode !== 200) {
        return resolve6({
          error: true,
          options: requestOptions,
          status: (_b2 = response2.statusCode) != null ? _b2 : -1,
          message: `HTTP Status Code ${(_c2 = response2.statusCode) != null ? _c2 : `Unknown Status Code`}`
        });
      }
      if (body == void 0 || body == null) {
        return resolve6({
          error: true,
          options: requestOptions,
          status: (_d2 = response2.statusCode) != null ? _d2 : -1,
          message: `Empty Response Body`
        });
      }
      resolve6({
        error: false,
        options: requestOptions,
        status: (_e = response2.statusCode) != null ? _e : -1,
        message: body
      });
    });
  });
});

// src/@core/core.callback.ts
var callback = () => __async(null, null, function* () {
  const settings = bootstrap.settings;
  const response2 = yield createHttp({
    url: settings.NationalWeatherServiceSettings.EventsEndpoint,
    headers: {
      "User-Agent": "@atmosx/event-product-parser"
    }
  });
  if (response2.error) return;
  createEvent({
    message: response2.message,
    isNWWS: false
  });
});

// src/@modules/@utilities/utilities.setCronSchedule.ts
var setCronSchedule = () => __async(null, null, function* () {
  const settings = bootstrap.settings;
  if (settings.EnableWireService) {
    if (settings.NOAAWeatherWireServiceSettings.ReconnectionSettings.Enabled) {
      void xReconnect(settings.NOAAWeatherWireServiceSettings.ReconnectionSettings.ReconnectionInterval);
    }
  } else {
    yield callback();
  }
});

// src/@core/core.start.ts
import { Cron } from "croner";
var startService = (settings) => __async(null, null, function* () {
  if (!bootstrap.isReady) {
    return setWarning({
      message: `You can not create another instance without shutting down the current one first, please make sure to call the stop() method first!`
    });
  }
  setSettings(settings);
  bootstrap.isReady = true;
  yield initializeDatabase();
  if (settings.EnableWireService) {
    (() => __async(null, null, function* () {
      yield getCachedEvents();
      yield xDeploy();
    }))();
  }
  yield setCronSchedule();
  const scheduleInterval = !settings.EnableWireService ? settings.NationalWeatherServiceSettings.CallbackInterval : 5;
  bootstrap.cron = new Cron(`*/${scheduleInterval} * * * * *`, () => __async(null, null, function* () {
    yield setCronSchedule();
  }));
  bootstrap.cron = new Cron(`*/1 * * * * *`, () => __async(null, null, function* () {
    yield updateNodes();
  }));
});

// src/@core/core.stop.ts
var stopService = () => __async(null, null, function* () {
  if (bootstrap.isReady) {
    bootstrap.isReady = false;
    if (bootstrap.session_xmpp) {
      try {
        yield bootstrap.session_xmpp.stop();
      } catch (e) {
      }
      bootstrap.cache.isConnected = false;
      bootstrap.cache.sigHault = true;
      bootstrap.session_xmpp = null;
    }
  }
});

// src/@core/core.setNode.ts
var setNode = (options) => {
  const nodes = bootstrap.cache.nodes.features;
  const exists = nodes.find((node) => node.properties.identifier === options.identifier);
  if (options.delete) {
    if (exists) {
      const index = nodes.indexOf(exists);
      nodes.splice(index, 1);
      return setEventEmit({
        event: `onNodeDelete`,
        metadata: {
          type: `node-delete`,
          node: exists
        }
      });
    }
    return setWarning({ message: `Node with identifier '${options.identifier}' not found.` });
  }
  if (exists) {
    const index = nodes.indexOf(exists);
    nodes[index] = __spreadProps(__spreadValues({}, exists), {
      geometry: {
        type: "Point",
        coordinates: [options.coordinates.longitude, options.coordinates.latitude]
      }
    });
    return setEventEmit({
      event: `onNodeUpdate`,
      metadata: {
        type: `node-update`,
        node: nodes[index]
      }
    });
  }
  nodes.push({
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [options.coordinates.longitude, options.coordinates.latitude]
    },
    properties: {
      identifier: options.identifier
    }
  });
  return setEventEmit({
    event: `onNodeUpdate`,
    metadata: {
      type: `node-add`,
      node: nodes[nodes.length - 1]
    }
  });
};

// src/@core/core.getEvents.ts
var getEvents = () => {
  return bootstrap.cache.events;
};

// src/@core/core.getNodes.ts
var getNodes = () => {
  return bootstrap.cache.nodes;
};

// src/index.ts
var Manager = class {
  constructor(settings) {
    this.trycatch();
    startService(settings);
  }
  on(event, callback2) {
    listener(event, callback2);
  }
  trycatch() {
    process.on("uncaughtException", (err) => {
      var _a;
      const ignored = ["ETIMEDOUT", "ECONNRESET", "EHOSTUNREACH", "STARTTLS_FAILURE"];
      if (ignored.includes(err == null ? void 0 : err.code)) {
        setEventEmit({
          event: `onXMPPStatus`,
          metadata: {
            message: `XMPP Critical Error: ${(_a = err == null ? void 0 : err.code) != null ? _a : "Unknown error code"}. This may indicate a connection issue. Attempting to continue...`,
            data: {},
            type: `error`,
            error: true
          }
        });
        return;
      }
      setWarning({ message: `Uncaught Exception: ${err instanceof Error ? err.stack || err.message : String(err)}` });
    });
  }
};
var index_default = Manager;
export {
  Manager,
  index_default as default,
  getCleanedEvent,
  getEventGeometry,
  getEvents,
  getNodes,
  setNode,
  setSettings,
  startService,
  stopService
};
