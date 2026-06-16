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

// node_modules/delayed-stream/lib/delayed_stream.js
var require_delayed_stream = __commonJS({
  "node_modules/delayed-stream/lib/delayed_stream.js"(exports, module) {
    var Stream = __require("stream").Stream;
    var util = __require("util");
    module.exports = DelayedStream;
    function DelayedStream() {
      this.source = null;
      this.dataSize = 0;
      this.maxDataSize = 1024 * 1024;
      this.pauseStream = true;
      this._maxDataSizeExceeded = false;
      this._released = false;
      this._bufferedEvents = [];
    }
    util.inherits(DelayedStream, Stream);
    DelayedStream.create = function(source, options) {
      var delayedStream = new this();
      options = options || {};
      for (var option in options) {
        delayedStream[option] = options[option];
      }
      delayedStream.source = source;
      var realEmit = source.emit;
      source.emit = function() {
        delayedStream._handleEmit(arguments);
        return realEmit.apply(source, arguments);
      };
      source.on("error", function() {
      });
      if (delayedStream.pauseStream) {
        source.pause();
      }
      return delayedStream;
    };
    Object.defineProperty(DelayedStream.prototype, "readable", {
      configurable: true,
      enumerable: true,
      get: function() {
        return this.source.readable;
      }
    });
    DelayedStream.prototype.setEncoding = function() {
      return this.source.setEncoding.apply(this.source, arguments);
    };
    DelayedStream.prototype.resume = function() {
      if (!this._released) {
        this.release();
      }
      this.source.resume();
    };
    DelayedStream.prototype.pause = function() {
      this.source.pause();
    };
    DelayedStream.prototype.release = function() {
      this._released = true;
      this._bufferedEvents.forEach(function(args) {
        this.emit.apply(this, args);
      }.bind(this));
      this._bufferedEvents = [];
    };
    DelayedStream.prototype.pipe = function() {
      var r = Stream.prototype.pipe.apply(this, arguments);
      this.resume();
      return r;
    };
    DelayedStream.prototype._handleEmit = function(args) {
      if (this._released) {
        this.emit.apply(this, args);
        return;
      }
      if (args[0] === "data") {
        this.dataSize += args[1].length;
        this._checkIfMaxDataSizeExceeded();
      }
      this._bufferedEvents.push(args);
    };
    DelayedStream.prototype._checkIfMaxDataSizeExceeded = function() {
      if (this._maxDataSizeExceeded) {
        return;
      }
      if (this.dataSize <= this.maxDataSize) {
        return;
      }
      this._maxDataSizeExceeded = true;
      var message = "DelayedStream#maxDataSize of " + this.maxDataSize + " bytes exceeded.";
      this.emit("error", new Error(message));
    };
  }
});

// node_modules/combined-stream/lib/combined_stream.js
var require_combined_stream = __commonJS({
  "node_modules/combined-stream/lib/combined_stream.js"(exports, module) {
    var util = __require("util");
    var Stream = __require("stream").Stream;
    var DelayedStream = require_delayed_stream();
    module.exports = CombinedStream;
    function CombinedStream() {
      this.writable = false;
      this.readable = true;
      this.dataSize = 0;
      this.maxDataSize = 2 * 1024 * 1024;
      this.pauseStreams = true;
      this._released = false;
      this._streams = [];
      this._currentStream = null;
      this._insideLoop = false;
      this._pendingNext = false;
    }
    util.inherits(CombinedStream, Stream);
    CombinedStream.create = function(options) {
      var combinedStream = new this();
      options = options || {};
      for (var option in options) {
        combinedStream[option] = options[option];
      }
      return combinedStream;
    };
    CombinedStream.isStreamLike = function(stream) {
      return typeof stream !== "function" && typeof stream !== "string" && typeof stream !== "boolean" && typeof stream !== "number" && !Buffer.isBuffer(stream);
    };
    CombinedStream.prototype.append = function(stream) {
      var isStreamLike = CombinedStream.isStreamLike(stream);
      if (isStreamLike) {
        if (!(stream instanceof DelayedStream)) {
          var newStream = DelayedStream.create(stream, {
            maxDataSize: Infinity,
            pauseStream: this.pauseStreams
          });
          stream.on("data", this._checkDataSize.bind(this));
          stream = newStream;
        }
        this._handleErrors(stream);
        if (this.pauseStreams) {
          stream.pause();
        }
      }
      this._streams.push(stream);
      return this;
    };
    CombinedStream.prototype.pipe = function(dest, options) {
      Stream.prototype.pipe.call(this, dest, options);
      this.resume();
      return dest;
    };
    CombinedStream.prototype._getNext = function() {
      this._currentStream = null;
      if (this._insideLoop) {
        this._pendingNext = true;
        return;
      }
      this._insideLoop = true;
      try {
        do {
          this._pendingNext = false;
          this._realGetNext();
        } while (this._pendingNext);
      } finally {
        this._insideLoop = false;
      }
    };
    CombinedStream.prototype._realGetNext = function() {
      var stream = this._streams.shift();
      if (typeof stream == "undefined") {
        this.end();
        return;
      }
      if (typeof stream !== "function") {
        this._pipeNext(stream);
        return;
      }
      var getStream = stream;
      getStream(function(stream2) {
        var isStreamLike = CombinedStream.isStreamLike(stream2);
        if (isStreamLike) {
          stream2.on("data", this._checkDataSize.bind(this));
          this._handleErrors(stream2);
        }
        this._pipeNext(stream2);
      }.bind(this));
    };
    CombinedStream.prototype._pipeNext = function(stream) {
      this._currentStream = stream;
      var isStreamLike = CombinedStream.isStreamLike(stream);
      if (isStreamLike) {
        stream.on("end", this._getNext.bind(this));
        stream.pipe(this, { end: false });
        return;
      }
      var value = stream;
      this.write(value);
      this._getNext();
    };
    CombinedStream.prototype._handleErrors = function(stream) {
      var self = this;
      stream.on("error", function(err) {
        self._emitError(err);
      });
    };
    CombinedStream.prototype.write = function(data) {
      this.emit("data", data);
    };
    CombinedStream.prototype.pause = function() {
      if (!this.pauseStreams) {
        return;
      }
      if (this.pauseStreams && this._currentStream && typeof this._currentStream.pause == "function") this._currentStream.pause();
      this.emit("pause");
    };
    CombinedStream.prototype.resume = function() {
      if (!this._released) {
        this._released = true;
        this.writable = true;
        this._getNext();
      }
      if (this.pauseStreams && this._currentStream && typeof this._currentStream.resume == "function") this._currentStream.resume();
      this.emit("resume");
    };
    CombinedStream.prototype.end = function() {
      this._reset();
      this.emit("end");
    };
    CombinedStream.prototype.destroy = function() {
      this._reset();
      this.emit("close");
    };
    CombinedStream.prototype._reset = function() {
      this.writable = false;
      this._streams = [];
      this._currentStream = null;
    };
    CombinedStream.prototype._checkDataSize = function() {
      this._updateDataSize();
      if (this.dataSize <= this.maxDataSize) {
        return;
      }
      var message = "DelayedStream#maxDataSize of " + this.maxDataSize + " bytes exceeded.";
      this._emitError(new Error(message));
    };
    CombinedStream.prototype._updateDataSize = function() {
      this.dataSize = 0;
      var self = this;
      this._streams.forEach(function(stream) {
        if (!stream.dataSize) {
          return;
        }
        self.dataSize += stream.dataSize;
      });
      if (this._currentStream && this._currentStream.dataSize) {
        this.dataSize += this._currentStream.dataSize;
      }
    };
    CombinedStream.prototype._emitError = function(err) {
      this._reset();
      this.emit("error", err);
    };
  }
});

// node_modules/mime-db/db.json
var require_db = __commonJS({
  "node_modules/mime-db/db.json"(exports, module) {
    module.exports = {
      "application/1d-interleaved-parityfec": {
        source: "iana"
      },
      "application/3gpdash-qoe-report+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/3gpp-ims+xml": {
        source: "iana",
        compressible: true
      },
      "application/3gpphal+json": {
        source: "iana",
        compressible: true
      },
      "application/3gpphalforms+json": {
        source: "iana",
        compressible: true
      },
      "application/a2l": {
        source: "iana"
      },
      "application/ace+cbor": {
        source: "iana"
      },
      "application/activemessage": {
        source: "iana"
      },
      "application/activity+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-costmap+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-costmapfilter+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-directory+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-endpointcost+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-endpointcostparams+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-endpointprop+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-endpointpropparams+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-error+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-networkmap+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-networkmapfilter+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-updatestreamcontrol+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-updatestreamparams+json": {
        source: "iana",
        compressible: true
      },
      "application/aml": {
        source: "iana"
      },
      "application/andrew-inset": {
        source: "iana",
        extensions: ["ez"]
      },
      "application/applefile": {
        source: "iana"
      },
      "application/applixware": {
        source: "apache",
        extensions: ["aw"]
      },
      "application/at+jwt": {
        source: "iana"
      },
      "application/atf": {
        source: "iana"
      },
      "application/atfx": {
        source: "iana"
      },
      "application/atom+xml": {
        source: "iana",
        compressible: true,
        extensions: ["atom"]
      },
      "application/atomcat+xml": {
        source: "iana",
        compressible: true,
        extensions: ["atomcat"]
      },
      "application/atomdeleted+xml": {
        source: "iana",
        compressible: true,
        extensions: ["atomdeleted"]
      },
      "application/atomicmail": {
        source: "iana"
      },
      "application/atomsvc+xml": {
        source: "iana",
        compressible: true,
        extensions: ["atomsvc"]
      },
      "application/atsc-dwd+xml": {
        source: "iana",
        compressible: true,
        extensions: ["dwd"]
      },
      "application/atsc-dynamic-event-message": {
        source: "iana"
      },
      "application/atsc-held+xml": {
        source: "iana",
        compressible: true,
        extensions: ["held"]
      },
      "application/atsc-rdt+json": {
        source: "iana",
        compressible: true
      },
      "application/atsc-rsat+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rsat"]
      },
      "application/atxml": {
        source: "iana"
      },
      "application/auth-policy+xml": {
        source: "iana",
        compressible: true
      },
      "application/bacnet-xdd+zip": {
        source: "iana",
        compressible: false
      },
      "application/batch-smtp": {
        source: "iana"
      },
      "application/bdoc": {
        compressible: false,
        extensions: ["bdoc"]
      },
      "application/beep+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/calendar+json": {
        source: "iana",
        compressible: true
      },
      "application/calendar+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xcs"]
      },
      "application/call-completion": {
        source: "iana"
      },
      "application/cals-1840": {
        source: "iana"
      },
      "application/captive+json": {
        source: "iana",
        compressible: true
      },
      "application/cbor": {
        source: "iana"
      },
      "application/cbor-seq": {
        source: "iana"
      },
      "application/cccex": {
        source: "iana"
      },
      "application/ccmp+xml": {
        source: "iana",
        compressible: true
      },
      "application/ccxml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["ccxml"]
      },
      "application/cdfx+xml": {
        source: "iana",
        compressible: true,
        extensions: ["cdfx"]
      },
      "application/cdmi-capability": {
        source: "iana",
        extensions: ["cdmia"]
      },
      "application/cdmi-container": {
        source: "iana",
        extensions: ["cdmic"]
      },
      "application/cdmi-domain": {
        source: "iana",
        extensions: ["cdmid"]
      },
      "application/cdmi-object": {
        source: "iana",
        extensions: ["cdmio"]
      },
      "application/cdmi-queue": {
        source: "iana",
        extensions: ["cdmiq"]
      },
      "application/cdni": {
        source: "iana"
      },
      "application/cea": {
        source: "iana"
      },
      "application/cea-2018+xml": {
        source: "iana",
        compressible: true
      },
      "application/cellml+xml": {
        source: "iana",
        compressible: true
      },
      "application/cfw": {
        source: "iana"
      },
      "application/city+json": {
        source: "iana",
        compressible: true
      },
      "application/clr": {
        source: "iana"
      },
      "application/clue+xml": {
        source: "iana",
        compressible: true
      },
      "application/clue_info+xml": {
        source: "iana",
        compressible: true
      },
      "application/cms": {
        source: "iana"
      },
      "application/cnrp+xml": {
        source: "iana",
        compressible: true
      },
      "application/coap-group+json": {
        source: "iana",
        compressible: true
      },
      "application/coap-payload": {
        source: "iana"
      },
      "application/commonground": {
        source: "iana"
      },
      "application/conference-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/cose": {
        source: "iana"
      },
      "application/cose-key": {
        source: "iana"
      },
      "application/cose-key-set": {
        source: "iana"
      },
      "application/cpl+xml": {
        source: "iana",
        compressible: true,
        extensions: ["cpl"]
      },
      "application/csrattrs": {
        source: "iana"
      },
      "application/csta+xml": {
        source: "iana",
        compressible: true
      },
      "application/cstadata+xml": {
        source: "iana",
        compressible: true
      },
      "application/csvm+json": {
        source: "iana",
        compressible: true
      },
      "application/cu-seeme": {
        source: "apache",
        extensions: ["cu"]
      },
      "application/cwt": {
        source: "iana"
      },
      "application/cybercash": {
        source: "iana"
      },
      "application/dart": {
        compressible: true
      },
      "application/dash+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mpd"]
      },
      "application/dash-patch+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mpp"]
      },
      "application/dashdelta": {
        source: "iana"
      },
      "application/davmount+xml": {
        source: "iana",
        compressible: true,
        extensions: ["davmount"]
      },
      "application/dca-rft": {
        source: "iana"
      },
      "application/dcd": {
        source: "iana"
      },
      "application/dec-dx": {
        source: "iana"
      },
      "application/dialog-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/dicom": {
        source: "iana"
      },
      "application/dicom+json": {
        source: "iana",
        compressible: true
      },
      "application/dicom+xml": {
        source: "iana",
        compressible: true
      },
      "application/dii": {
        source: "iana"
      },
      "application/dit": {
        source: "iana"
      },
      "application/dns": {
        source: "iana"
      },
      "application/dns+json": {
        source: "iana",
        compressible: true
      },
      "application/dns-message": {
        source: "iana"
      },
      "application/docbook+xml": {
        source: "apache",
        compressible: true,
        extensions: ["dbk"]
      },
      "application/dots+cbor": {
        source: "iana"
      },
      "application/dskpp+xml": {
        source: "iana",
        compressible: true
      },
      "application/dssc+der": {
        source: "iana",
        extensions: ["dssc"]
      },
      "application/dssc+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xdssc"]
      },
      "application/dvcs": {
        source: "iana"
      },
      "application/ecmascript": {
        source: "iana",
        compressible: true,
        extensions: ["es", "ecma"]
      },
      "application/edi-consent": {
        source: "iana"
      },
      "application/edi-x12": {
        source: "iana",
        compressible: false
      },
      "application/edifact": {
        source: "iana",
        compressible: false
      },
      "application/efi": {
        source: "iana"
      },
      "application/elm+json": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/elm+xml": {
        source: "iana",
        compressible: true
      },
      "application/emergencycalldata.cap+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/emergencycalldata.comment+xml": {
        source: "iana",
        compressible: true
      },
      "application/emergencycalldata.control+xml": {
        source: "iana",
        compressible: true
      },
      "application/emergencycalldata.deviceinfo+xml": {
        source: "iana",
        compressible: true
      },
      "application/emergencycalldata.ecall.msd": {
        source: "iana"
      },
      "application/emergencycalldata.providerinfo+xml": {
        source: "iana",
        compressible: true
      },
      "application/emergencycalldata.serviceinfo+xml": {
        source: "iana",
        compressible: true
      },
      "application/emergencycalldata.subscriberinfo+xml": {
        source: "iana",
        compressible: true
      },
      "application/emergencycalldata.veds+xml": {
        source: "iana",
        compressible: true
      },
      "application/emma+xml": {
        source: "iana",
        compressible: true,
        extensions: ["emma"]
      },
      "application/emotionml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["emotionml"]
      },
      "application/encaprtp": {
        source: "iana"
      },
      "application/epp+xml": {
        source: "iana",
        compressible: true
      },
      "application/epub+zip": {
        source: "iana",
        compressible: false,
        extensions: ["epub"]
      },
      "application/eshop": {
        source: "iana"
      },
      "application/exi": {
        source: "iana",
        extensions: ["exi"]
      },
      "application/expect-ct-report+json": {
        source: "iana",
        compressible: true
      },
      "application/express": {
        source: "iana",
        extensions: ["exp"]
      },
      "application/fastinfoset": {
        source: "iana"
      },
      "application/fastsoap": {
        source: "iana"
      },
      "application/fdt+xml": {
        source: "iana",
        compressible: true,
        extensions: ["fdt"]
      },
      "application/fhir+json": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/fhir+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/fido.trusted-apps+json": {
        compressible: true
      },
      "application/fits": {
        source: "iana"
      },
      "application/flexfec": {
        source: "iana"
      },
      "application/font-sfnt": {
        source: "iana"
      },
      "application/font-tdpfr": {
        source: "iana",
        extensions: ["pfr"]
      },
      "application/font-woff": {
        source: "iana",
        compressible: false
      },
      "application/framework-attributes+xml": {
        source: "iana",
        compressible: true
      },
      "application/geo+json": {
        source: "iana",
        compressible: true,
        extensions: ["geojson"]
      },
      "application/geo+json-seq": {
        source: "iana"
      },
      "application/geopackage+sqlite3": {
        source: "iana"
      },
      "application/geoxacml+xml": {
        source: "iana",
        compressible: true
      },
      "application/gltf-buffer": {
        source: "iana"
      },
      "application/gml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["gml"]
      },
      "application/gpx+xml": {
        source: "apache",
        compressible: true,
        extensions: ["gpx"]
      },
      "application/gxf": {
        source: "apache",
        extensions: ["gxf"]
      },
      "application/gzip": {
        source: "iana",
        compressible: false,
        extensions: ["gz"]
      },
      "application/h224": {
        source: "iana"
      },
      "application/held+xml": {
        source: "iana",
        compressible: true
      },
      "application/hjson": {
        extensions: ["hjson"]
      },
      "application/http": {
        source: "iana"
      },
      "application/hyperstudio": {
        source: "iana",
        extensions: ["stk"]
      },
      "application/ibe-key-request+xml": {
        source: "iana",
        compressible: true
      },
      "application/ibe-pkg-reply+xml": {
        source: "iana",
        compressible: true
      },
      "application/ibe-pp-data": {
        source: "iana"
      },
      "application/iges": {
        source: "iana"
      },
      "application/im-iscomposing+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/index": {
        source: "iana"
      },
      "application/index.cmd": {
        source: "iana"
      },
      "application/index.obj": {
        source: "iana"
      },
      "application/index.response": {
        source: "iana"
      },
      "application/index.vnd": {
        source: "iana"
      },
      "application/inkml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["ink", "inkml"]
      },
      "application/iotp": {
        source: "iana"
      },
      "application/ipfix": {
        source: "iana",
        extensions: ["ipfix"]
      },
      "application/ipp": {
        source: "iana"
      },
      "application/isup": {
        source: "iana"
      },
      "application/its+xml": {
        source: "iana",
        compressible: true,
        extensions: ["its"]
      },
      "application/java-archive": {
        source: "apache",
        compressible: false,
        extensions: ["jar", "war", "ear"]
      },
      "application/java-serialized-object": {
        source: "apache",
        compressible: false,
        extensions: ["ser"]
      },
      "application/java-vm": {
        source: "apache",
        compressible: false,
        extensions: ["class"]
      },
      "application/javascript": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["js", "mjs"]
      },
      "application/jf2feed+json": {
        source: "iana",
        compressible: true
      },
      "application/jose": {
        source: "iana"
      },
      "application/jose+json": {
        source: "iana",
        compressible: true
      },
      "application/jrd+json": {
        source: "iana",
        compressible: true
      },
      "application/jscalendar+json": {
        source: "iana",
        compressible: true
      },
      "application/json": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["json", "map"]
      },
      "application/json-patch+json": {
        source: "iana",
        compressible: true
      },
      "application/json-seq": {
        source: "iana"
      },
      "application/json5": {
        extensions: ["json5"]
      },
      "application/jsonml+json": {
        source: "apache",
        compressible: true,
        extensions: ["jsonml"]
      },
      "application/jwk+json": {
        source: "iana",
        compressible: true
      },
      "application/jwk-set+json": {
        source: "iana",
        compressible: true
      },
      "application/jwt": {
        source: "iana"
      },
      "application/kpml-request+xml": {
        source: "iana",
        compressible: true
      },
      "application/kpml-response+xml": {
        source: "iana",
        compressible: true
      },
      "application/ld+json": {
        source: "iana",
        compressible: true,
        extensions: ["jsonld"]
      },
      "application/lgr+xml": {
        source: "iana",
        compressible: true,
        extensions: ["lgr"]
      },
      "application/link-format": {
        source: "iana"
      },
      "application/load-control+xml": {
        source: "iana",
        compressible: true
      },
      "application/lost+xml": {
        source: "iana",
        compressible: true,
        extensions: ["lostxml"]
      },
      "application/lostsync+xml": {
        source: "iana",
        compressible: true
      },
      "application/lpf+zip": {
        source: "iana",
        compressible: false
      },
      "application/lxf": {
        source: "iana"
      },
      "application/mac-binhex40": {
        source: "iana",
        extensions: ["hqx"]
      },
      "application/mac-compactpro": {
        source: "apache",
        extensions: ["cpt"]
      },
      "application/macwriteii": {
        source: "iana"
      },
      "application/mads+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mads"]
      },
      "application/manifest+json": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["webmanifest"]
      },
      "application/marc": {
        source: "iana",
        extensions: ["mrc"]
      },
      "application/marcxml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mrcx"]
      },
      "application/mathematica": {
        source: "iana",
        extensions: ["ma", "nb", "mb"]
      },
      "application/mathml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mathml"]
      },
      "application/mathml-content+xml": {
        source: "iana",
        compressible: true
      },
      "application/mathml-presentation+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-associated-procedure-description+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-deregister+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-envelope+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-msk+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-msk-response+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-protection-description+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-reception-report+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-register+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-register-response+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-schedule+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-user-service-description+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbox": {
        source: "iana",
        extensions: ["mbox"]
      },
      "application/media-policy-dataset+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mpf"]
      },
      "application/media_control+xml": {
        source: "iana",
        compressible: true
      },
      "application/mediaservercontrol+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mscml"]
      },
      "application/merge-patch+json": {
        source: "iana",
        compressible: true
      },
      "application/metalink+xml": {
        source: "apache",
        compressible: true,
        extensions: ["metalink"]
      },
      "application/metalink4+xml": {
        source: "iana",
        compressible: true,
        extensions: ["meta4"]
      },
      "application/mets+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mets"]
      },
      "application/mf4": {
        source: "iana"
      },
      "application/mikey": {
        source: "iana"
      },
      "application/mipc": {
        source: "iana"
      },
      "application/missing-blocks+cbor-seq": {
        source: "iana"
      },
      "application/mmt-aei+xml": {
        source: "iana",
        compressible: true,
        extensions: ["maei"]
      },
      "application/mmt-usd+xml": {
        source: "iana",
        compressible: true,
        extensions: ["musd"]
      },
      "application/mods+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mods"]
      },
      "application/moss-keys": {
        source: "iana"
      },
      "application/moss-signature": {
        source: "iana"
      },
      "application/mosskey-data": {
        source: "iana"
      },
      "application/mosskey-request": {
        source: "iana"
      },
      "application/mp21": {
        source: "iana",
        extensions: ["m21", "mp21"]
      },
      "application/mp4": {
        source: "iana",
        extensions: ["mp4s", "m4p"]
      },
      "application/mpeg4-generic": {
        source: "iana"
      },
      "application/mpeg4-iod": {
        source: "iana"
      },
      "application/mpeg4-iod-xmt": {
        source: "iana"
      },
      "application/mrb-consumer+xml": {
        source: "iana",
        compressible: true
      },
      "application/mrb-publish+xml": {
        source: "iana",
        compressible: true
      },
      "application/msc-ivr+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/msc-mixer+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/msword": {
        source: "iana",
        compressible: false,
        extensions: ["doc", "dot"]
      },
      "application/mud+json": {
        source: "iana",
        compressible: true
      },
      "application/multipart-core": {
        source: "iana"
      },
      "application/mxf": {
        source: "iana",
        extensions: ["mxf"]
      },
      "application/n-quads": {
        source: "iana",
        extensions: ["nq"]
      },
      "application/n-triples": {
        source: "iana",
        extensions: ["nt"]
      },
      "application/nasdata": {
        source: "iana"
      },
      "application/news-checkgroups": {
        source: "iana",
        charset: "US-ASCII"
      },
      "application/news-groupinfo": {
        source: "iana",
        charset: "US-ASCII"
      },
      "application/news-transmission": {
        source: "iana"
      },
      "application/nlsml+xml": {
        source: "iana",
        compressible: true
      },
      "application/node": {
        source: "iana",
        extensions: ["cjs"]
      },
      "application/nss": {
        source: "iana"
      },
      "application/oauth-authz-req+jwt": {
        source: "iana"
      },
      "application/oblivious-dns-message": {
        source: "iana"
      },
      "application/ocsp-request": {
        source: "iana"
      },
      "application/ocsp-response": {
        source: "iana"
      },
      "application/octet-stream": {
        source: "iana",
        compressible: false,
        extensions: ["bin", "dms", "lrf", "mar", "so", "dist", "distz", "pkg", "bpk", "dump", "elc", "deploy", "exe", "dll", "deb", "dmg", "iso", "img", "msi", "msp", "msm", "buffer"]
      },
      "application/oda": {
        source: "iana",
        extensions: ["oda"]
      },
      "application/odm+xml": {
        source: "iana",
        compressible: true
      },
      "application/odx": {
        source: "iana"
      },
      "application/oebps-package+xml": {
        source: "iana",
        compressible: true,
        extensions: ["opf"]
      },
      "application/ogg": {
        source: "iana",
        compressible: false,
        extensions: ["ogx"]
      },
      "application/omdoc+xml": {
        source: "apache",
        compressible: true,
        extensions: ["omdoc"]
      },
      "application/onenote": {
        source: "apache",
        extensions: ["onetoc", "onetoc2", "onetmp", "onepkg"]
      },
      "application/opc-nodeset+xml": {
        source: "iana",
        compressible: true
      },
      "application/oscore": {
        source: "iana"
      },
      "application/oxps": {
        source: "iana",
        extensions: ["oxps"]
      },
      "application/p21": {
        source: "iana"
      },
      "application/p21+zip": {
        source: "iana",
        compressible: false
      },
      "application/p2p-overlay+xml": {
        source: "iana",
        compressible: true,
        extensions: ["relo"]
      },
      "application/parityfec": {
        source: "iana"
      },
      "application/passport": {
        source: "iana"
      },
      "application/patch-ops-error+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xer"]
      },
      "application/pdf": {
        source: "iana",
        compressible: false,
        extensions: ["pdf"]
      },
      "application/pdx": {
        source: "iana"
      },
      "application/pem-certificate-chain": {
        source: "iana"
      },
      "application/pgp-encrypted": {
        source: "iana",
        compressible: false,
        extensions: ["pgp"]
      },
      "application/pgp-keys": {
        source: "iana",
        extensions: ["asc"]
      },
      "application/pgp-signature": {
        source: "iana",
        extensions: ["asc", "sig"]
      },
      "application/pics-rules": {
        source: "apache",
        extensions: ["prf"]
      },
      "application/pidf+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/pidf-diff+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/pkcs10": {
        source: "iana",
        extensions: ["p10"]
      },
      "application/pkcs12": {
        source: "iana"
      },
      "application/pkcs7-mime": {
        source: "iana",
        extensions: ["p7m", "p7c"]
      },
      "application/pkcs7-signature": {
        source: "iana",
        extensions: ["p7s"]
      },
      "application/pkcs8": {
        source: "iana",
        extensions: ["p8"]
      },
      "application/pkcs8-encrypted": {
        source: "iana"
      },
      "application/pkix-attr-cert": {
        source: "iana",
        extensions: ["ac"]
      },
      "application/pkix-cert": {
        source: "iana",
        extensions: ["cer"]
      },
      "application/pkix-crl": {
        source: "iana",
        extensions: ["crl"]
      },
      "application/pkix-pkipath": {
        source: "iana",
        extensions: ["pkipath"]
      },
      "application/pkixcmp": {
        source: "iana",
        extensions: ["pki"]
      },
      "application/pls+xml": {
        source: "iana",
        compressible: true,
        extensions: ["pls"]
      },
      "application/poc-settings+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/postscript": {
        source: "iana",
        compressible: true,
        extensions: ["ai", "eps", "ps"]
      },
      "application/ppsp-tracker+json": {
        source: "iana",
        compressible: true
      },
      "application/problem+json": {
        source: "iana",
        compressible: true
      },
      "application/problem+xml": {
        source: "iana",
        compressible: true
      },
      "application/provenance+xml": {
        source: "iana",
        compressible: true,
        extensions: ["provx"]
      },
      "application/prs.alvestrand.titrax-sheet": {
        source: "iana"
      },
      "application/prs.cww": {
        source: "iana",
        extensions: ["cww"]
      },
      "application/prs.cyn": {
        source: "iana",
        charset: "7-BIT"
      },
      "application/prs.hpub+zip": {
        source: "iana",
        compressible: false
      },
      "application/prs.nprend": {
        source: "iana"
      },
      "application/prs.plucker": {
        source: "iana"
      },
      "application/prs.rdf-xml-crypt": {
        source: "iana"
      },
      "application/prs.xsf+xml": {
        source: "iana",
        compressible: true
      },
      "application/pskc+xml": {
        source: "iana",
        compressible: true,
        extensions: ["pskcxml"]
      },
      "application/pvd+json": {
        source: "iana",
        compressible: true
      },
      "application/qsig": {
        source: "iana"
      },
      "application/raml+yaml": {
        compressible: true,
        extensions: ["raml"]
      },
      "application/raptorfec": {
        source: "iana"
      },
      "application/rdap+json": {
        source: "iana",
        compressible: true
      },
      "application/rdf+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rdf", "owl"]
      },
      "application/reginfo+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rif"]
      },
      "application/relax-ng-compact-syntax": {
        source: "iana",
        extensions: ["rnc"]
      },
      "application/remote-printing": {
        source: "iana"
      },
      "application/reputon+json": {
        source: "iana",
        compressible: true
      },
      "application/resource-lists+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rl"]
      },
      "application/resource-lists-diff+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rld"]
      },
      "application/rfc+xml": {
        source: "iana",
        compressible: true
      },
      "application/riscos": {
        source: "iana"
      },
      "application/rlmi+xml": {
        source: "iana",
        compressible: true
      },
      "application/rls-services+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rs"]
      },
      "application/route-apd+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rapd"]
      },
      "application/route-s-tsid+xml": {
        source: "iana",
        compressible: true,
        extensions: ["sls"]
      },
      "application/route-usd+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rusd"]
      },
      "application/rpki-ghostbusters": {
        source: "iana",
        extensions: ["gbr"]
      },
      "application/rpki-manifest": {
        source: "iana",
        extensions: ["mft"]
      },
      "application/rpki-publication": {
        source: "iana"
      },
      "application/rpki-roa": {
        source: "iana",
        extensions: ["roa"]
      },
      "application/rpki-updown": {
        source: "iana"
      },
      "application/rsd+xml": {
        source: "apache",
        compressible: true,
        extensions: ["rsd"]
      },
      "application/rss+xml": {
        source: "apache",
        compressible: true,
        extensions: ["rss"]
      },
      "application/rtf": {
        source: "iana",
        compressible: true,
        extensions: ["rtf"]
      },
      "application/rtploopback": {
        source: "iana"
      },
      "application/rtx": {
        source: "iana"
      },
      "application/samlassertion+xml": {
        source: "iana",
        compressible: true
      },
      "application/samlmetadata+xml": {
        source: "iana",
        compressible: true
      },
      "application/sarif+json": {
        source: "iana",
        compressible: true
      },
      "application/sarif-external-properties+json": {
        source: "iana",
        compressible: true
      },
      "application/sbe": {
        source: "iana"
      },
      "application/sbml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["sbml"]
      },
      "application/scaip+xml": {
        source: "iana",
        compressible: true
      },
      "application/scim+json": {
        source: "iana",
        compressible: true
      },
      "application/scvp-cv-request": {
        source: "iana",
        extensions: ["scq"]
      },
      "application/scvp-cv-response": {
        source: "iana",
        extensions: ["scs"]
      },
      "application/scvp-vp-request": {
        source: "iana",
        extensions: ["spq"]
      },
      "application/scvp-vp-response": {
        source: "iana",
        extensions: ["spp"]
      },
      "application/sdp": {
        source: "iana",
        extensions: ["sdp"]
      },
      "application/secevent+jwt": {
        source: "iana"
      },
      "application/senml+cbor": {
        source: "iana"
      },
      "application/senml+json": {
        source: "iana",
        compressible: true
      },
      "application/senml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["senmlx"]
      },
      "application/senml-etch+cbor": {
        source: "iana"
      },
      "application/senml-etch+json": {
        source: "iana",
        compressible: true
      },
      "application/senml-exi": {
        source: "iana"
      },
      "application/sensml+cbor": {
        source: "iana"
      },
      "application/sensml+json": {
        source: "iana",
        compressible: true
      },
      "application/sensml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["sensmlx"]
      },
      "application/sensml-exi": {
        source: "iana"
      },
      "application/sep+xml": {
        source: "iana",
        compressible: true
      },
      "application/sep-exi": {
        source: "iana"
      },
      "application/session-info": {
        source: "iana"
      },
      "application/set-payment": {
        source: "iana"
      },
      "application/set-payment-initiation": {
        source: "iana",
        extensions: ["setpay"]
      },
      "application/set-registration": {
        source: "iana"
      },
      "application/set-registration-initiation": {
        source: "iana",
        extensions: ["setreg"]
      },
      "application/sgml": {
        source: "iana"
      },
      "application/sgml-open-catalog": {
        source: "iana"
      },
      "application/shf+xml": {
        source: "iana",
        compressible: true,
        extensions: ["shf"]
      },
      "application/sieve": {
        source: "iana",
        extensions: ["siv", "sieve"]
      },
      "application/simple-filter+xml": {
        source: "iana",
        compressible: true
      },
      "application/simple-message-summary": {
        source: "iana"
      },
      "application/simplesymbolcontainer": {
        source: "iana"
      },
      "application/sipc": {
        source: "iana"
      },
      "application/slate": {
        source: "iana"
      },
      "application/smil": {
        source: "iana"
      },
      "application/smil+xml": {
        source: "iana",
        compressible: true,
        extensions: ["smi", "smil"]
      },
      "application/smpte336m": {
        source: "iana"
      },
      "application/soap+fastinfoset": {
        source: "iana"
      },
      "application/soap+xml": {
        source: "iana",
        compressible: true
      },
      "application/sparql-query": {
        source: "iana",
        extensions: ["rq"]
      },
      "application/sparql-results+xml": {
        source: "iana",
        compressible: true,
        extensions: ["srx"]
      },
      "application/spdx+json": {
        source: "iana",
        compressible: true
      },
      "application/spirits-event+xml": {
        source: "iana",
        compressible: true
      },
      "application/sql": {
        source: "iana"
      },
      "application/srgs": {
        source: "iana",
        extensions: ["gram"]
      },
      "application/srgs+xml": {
        source: "iana",
        compressible: true,
        extensions: ["grxml"]
      },
      "application/sru+xml": {
        source: "iana",
        compressible: true,
        extensions: ["sru"]
      },
      "application/ssdl+xml": {
        source: "apache",
        compressible: true,
        extensions: ["ssdl"]
      },
      "application/ssml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["ssml"]
      },
      "application/stix+json": {
        source: "iana",
        compressible: true
      },
      "application/swid+xml": {
        source: "iana",
        compressible: true,
        extensions: ["swidtag"]
      },
      "application/tamp-apex-update": {
        source: "iana"
      },
      "application/tamp-apex-update-confirm": {
        source: "iana"
      },
      "application/tamp-community-update": {
        source: "iana"
      },
      "application/tamp-community-update-confirm": {
        source: "iana"
      },
      "application/tamp-error": {
        source: "iana"
      },
      "application/tamp-sequence-adjust": {
        source: "iana"
      },
      "application/tamp-sequence-adjust-confirm": {
        source: "iana"
      },
      "application/tamp-status-query": {
        source: "iana"
      },
      "application/tamp-status-response": {
        source: "iana"
      },
      "application/tamp-update": {
        source: "iana"
      },
      "application/tamp-update-confirm": {
        source: "iana"
      },
      "application/tar": {
        compressible: true
      },
      "application/taxii+json": {
        source: "iana",
        compressible: true
      },
      "application/td+json": {
        source: "iana",
        compressible: true
      },
      "application/tei+xml": {
        source: "iana",
        compressible: true,
        extensions: ["tei", "teicorpus"]
      },
      "application/tetra_isi": {
        source: "iana"
      },
      "application/thraud+xml": {
        source: "iana",
        compressible: true,
        extensions: ["tfi"]
      },
      "application/timestamp-query": {
        source: "iana"
      },
      "application/timestamp-reply": {
        source: "iana"
      },
      "application/timestamped-data": {
        source: "iana",
        extensions: ["tsd"]
      },
      "application/tlsrpt+gzip": {
        source: "iana"
      },
      "application/tlsrpt+json": {
        source: "iana",
        compressible: true
      },
      "application/tnauthlist": {
        source: "iana"
      },
      "application/token-introspection+jwt": {
        source: "iana"
      },
      "application/toml": {
        compressible: true,
        extensions: ["toml"]
      },
      "application/trickle-ice-sdpfrag": {
        source: "iana"
      },
      "application/trig": {
        source: "iana",
        extensions: ["trig"]
      },
      "application/ttml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["ttml"]
      },
      "application/tve-trigger": {
        source: "iana"
      },
      "application/tzif": {
        source: "iana"
      },
      "application/tzif-leap": {
        source: "iana"
      },
      "application/ubjson": {
        compressible: false,
        extensions: ["ubj"]
      },
      "application/ulpfec": {
        source: "iana"
      },
      "application/urc-grpsheet+xml": {
        source: "iana",
        compressible: true
      },
      "application/urc-ressheet+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rsheet"]
      },
      "application/urc-targetdesc+xml": {
        source: "iana",
        compressible: true,
        extensions: ["td"]
      },
      "application/urc-uisocketdesc+xml": {
        source: "iana",
        compressible: true
      },
      "application/vcard+json": {
        source: "iana",
        compressible: true
      },
      "application/vcard+xml": {
        source: "iana",
        compressible: true
      },
      "application/vemmi": {
        source: "iana"
      },
      "application/vividence.scriptfile": {
        source: "apache"
      },
      "application/vnd.1000minds.decision-model+xml": {
        source: "iana",
        compressible: true,
        extensions: ["1km"]
      },
      "application/vnd.3gpp-prose+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp-prose-pc3ch+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp-v2x-local-service-information": {
        source: "iana"
      },
      "application/vnd.3gpp.5gnas": {
        source: "iana"
      },
      "application/vnd.3gpp.access-transfer-events+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.bsf+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.gmop+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.gtpc": {
        source: "iana"
      },
      "application/vnd.3gpp.interworking-data": {
        source: "iana"
      },
      "application/vnd.3gpp.lpp": {
        source: "iana"
      },
      "application/vnd.3gpp.mc-signalling-ear": {
        source: "iana"
      },
      "application/vnd.3gpp.mcdata-affiliation-command+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcdata-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcdata-payload": {
        source: "iana"
      },
      "application/vnd.3gpp.mcdata-service-config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcdata-signalling": {
        source: "iana"
      },
      "application/vnd.3gpp.mcdata-ue-config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcdata-user-profile+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-affiliation-command+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-floor-request+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-location-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-mbms-usage-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-service-config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-signed+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-ue-config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-ue-init-config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-user-profile+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-affiliation-command+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-affiliation-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-location-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-mbms-usage-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-service-config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-transmission-request+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-ue-config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-user-profile+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mid-call+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.ngap": {
        source: "iana"
      },
      "application/vnd.3gpp.pfcp": {
        source: "iana"
      },
      "application/vnd.3gpp.pic-bw-large": {
        source: "iana",
        extensions: ["plb"]
      },
      "application/vnd.3gpp.pic-bw-small": {
        source: "iana",
        extensions: ["psb"]
      },
      "application/vnd.3gpp.pic-bw-var": {
        source: "iana",
        extensions: ["pvb"]
      },
      "application/vnd.3gpp.s1ap": {
        source: "iana"
      },
      "application/vnd.3gpp.sms": {
        source: "iana"
      },
      "application/vnd.3gpp.sms+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.srvcc-ext+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.srvcc-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.state-and-event-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.ussd+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp2.bcmcsinfo+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp2.sms": {
        source: "iana"
      },
      "application/vnd.3gpp2.tcap": {
        source: "iana",
        extensions: ["tcap"]
      },
      "application/vnd.3lightssoftware.imagescal": {
        source: "iana"
      },
      "application/vnd.3m.post-it-notes": {
        source: "iana",
        extensions: ["pwn"]
      },
      "application/vnd.accpac.simply.aso": {
        source: "iana",
        extensions: ["aso"]
      },
      "application/vnd.accpac.simply.imp": {
        source: "iana",
        extensions: ["imp"]
      },
      "application/vnd.acucobol": {
        source: "iana",
        extensions: ["acu"]
      },
      "application/vnd.acucorp": {
        source: "iana",
        extensions: ["atc", "acutc"]
      },
      "application/vnd.adobe.air-application-installer-package+zip": {
        source: "apache",
        compressible: false,
        extensions: ["air"]
      },
      "application/vnd.adobe.flash.movie": {
        source: "iana"
      },
      "application/vnd.adobe.formscentral.fcdt": {
        source: "iana",
        extensions: ["fcdt"]
      },
      "application/vnd.adobe.fxp": {
        source: "iana",
        extensions: ["fxp", "fxpl"]
      },
      "application/vnd.adobe.partial-upload": {
        source: "iana"
      },
      "application/vnd.adobe.xdp+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xdp"]
      },
      "application/vnd.adobe.xfdf": {
        source: "iana",
        extensions: ["xfdf"]
      },
      "application/vnd.aether.imp": {
        source: "iana"
      },
      "application/vnd.afpc.afplinedata": {
        source: "iana"
      },
      "application/vnd.afpc.afplinedata-pagedef": {
        source: "iana"
      },
      "application/vnd.afpc.cmoca-cmresource": {
        source: "iana"
      },
      "application/vnd.afpc.foca-charset": {
        source: "iana"
      },
      "application/vnd.afpc.foca-codedfont": {
        source: "iana"
      },
      "application/vnd.afpc.foca-codepage": {
        source: "iana"
      },
      "application/vnd.afpc.modca": {
        source: "iana"
      },
      "application/vnd.afpc.modca-cmtable": {
        source: "iana"
      },
      "application/vnd.afpc.modca-formdef": {
        source: "iana"
      },
      "application/vnd.afpc.modca-mediummap": {
        source: "iana"
      },
      "application/vnd.afpc.modca-objectcontainer": {
        source: "iana"
      },
      "application/vnd.afpc.modca-overlay": {
        source: "iana"
      },
      "application/vnd.afpc.modca-pagesegment": {
        source: "iana"
      },
      "application/vnd.age": {
        source: "iana",
        extensions: ["age"]
      },
      "application/vnd.ah-barcode": {
        source: "iana"
      },
      "application/vnd.ahead.space": {
        source: "iana",
        extensions: ["ahead"]
      },
      "application/vnd.airzip.filesecure.azf": {
        source: "iana",
        extensions: ["azf"]
      },
      "application/vnd.airzip.filesecure.azs": {
        source: "iana",
        extensions: ["azs"]
      },
      "application/vnd.amadeus+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.amazon.ebook": {
        source: "apache",
        extensions: ["azw"]
      },
      "application/vnd.amazon.mobi8-ebook": {
        source: "iana"
      },
      "application/vnd.americandynamics.acc": {
        source: "iana",
        extensions: ["acc"]
      },
      "application/vnd.amiga.ami": {
        source: "iana",
        extensions: ["ami"]
      },
      "application/vnd.amundsen.maze+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.android.ota": {
        source: "iana"
      },
      "application/vnd.android.package-archive": {
        source: "apache",
        compressible: false,
        extensions: ["apk"]
      },
      "application/vnd.anki": {
        source: "iana"
      },
      "application/vnd.anser-web-certificate-issue-initiation": {
        source: "iana",
        extensions: ["cii"]
      },
      "application/vnd.anser-web-funds-transfer-initiation": {
        source: "apache",
        extensions: ["fti"]
      },
      "application/vnd.antix.game-component": {
        source: "iana",
        extensions: ["atx"]
      },
      "application/vnd.apache.arrow.file": {
        source: "iana"
      },
      "application/vnd.apache.arrow.stream": {
        source: "iana"
      },
      "application/vnd.apache.thrift.binary": {
        source: "iana"
      },
      "application/vnd.apache.thrift.compact": {
        source: "iana"
      },
      "application/vnd.apache.thrift.json": {
        source: "iana"
      },
      "application/vnd.api+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.aplextor.warrp+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.apothekende.reservation+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.apple.installer+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mpkg"]
      },
      "application/vnd.apple.keynote": {
        source: "iana",
        extensions: ["key"]
      },
      "application/vnd.apple.mpegurl": {
        source: "iana",
        extensions: ["m3u8"]
      },
      "application/vnd.apple.numbers": {
        source: "iana",
        extensions: ["numbers"]
      },
      "application/vnd.apple.pages": {
        source: "iana",
        extensions: ["pages"]
      },
      "application/vnd.apple.pkpass": {
        compressible: false,
        extensions: ["pkpass"]
      },
      "application/vnd.arastra.swi": {
        source: "iana"
      },
      "application/vnd.aristanetworks.swi": {
        source: "iana",
        extensions: ["swi"]
      },
      "application/vnd.artisan+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.artsquare": {
        source: "iana"
      },
      "application/vnd.astraea-software.iota": {
        source: "iana",
        extensions: ["iota"]
      },
      "application/vnd.audiograph": {
        source: "iana",
        extensions: ["aep"]
      },
      "application/vnd.autopackage": {
        source: "iana"
      },
      "application/vnd.avalon+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.avistar+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.balsamiq.bmml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["bmml"]
      },
      "application/vnd.balsamiq.bmpr": {
        source: "iana"
      },
      "application/vnd.banana-accounting": {
        source: "iana"
      },
      "application/vnd.bbf.usp.error": {
        source: "iana"
      },
      "application/vnd.bbf.usp.msg": {
        source: "iana"
      },
      "application/vnd.bbf.usp.msg+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.bekitzur-stech+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.bint.med-content": {
        source: "iana"
      },
      "application/vnd.biopax.rdf+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.blink-idb-value-wrapper": {
        source: "iana"
      },
      "application/vnd.blueice.multipass": {
        source: "iana",
        extensions: ["mpm"]
      },
      "application/vnd.bluetooth.ep.oob": {
        source: "iana"
      },
      "application/vnd.bluetooth.le.oob": {
        source: "iana"
      },
      "application/vnd.bmi": {
        source: "iana",
        extensions: ["bmi"]
      },
      "application/vnd.bpf": {
        source: "iana"
      },
      "application/vnd.bpf3": {
        source: "iana"
      },
      "application/vnd.businessobjects": {
        source: "iana",
        extensions: ["rep"]
      },
      "application/vnd.byu.uapi+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.cab-jscript": {
        source: "iana"
      },
      "application/vnd.canon-cpdl": {
        source: "iana"
      },
      "application/vnd.canon-lips": {
        source: "iana"
      },
      "application/vnd.capasystems-pg+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.cendio.thinlinc.clientconf": {
        source: "iana"
      },
      "application/vnd.century-systems.tcp_stream": {
        source: "iana"
      },
      "application/vnd.chemdraw+xml": {
        source: "iana",
        compressible: true,
        extensions: ["cdxml"]
      },
      "application/vnd.chess-pgn": {
        source: "iana"
      },
      "application/vnd.chipnuts.karaoke-mmd": {
        source: "iana",
        extensions: ["mmd"]
      },
      "application/vnd.ciedi": {
        source: "iana"
      },
      "application/vnd.cinderella": {
        source: "iana",
        extensions: ["cdy"]
      },
      "application/vnd.cirpack.isdn-ext": {
        source: "iana"
      },
      "application/vnd.citationstyles.style+xml": {
        source: "iana",
        compressible: true,
        extensions: ["csl"]
      },
      "application/vnd.claymore": {
        source: "iana",
        extensions: ["cla"]
      },
      "application/vnd.cloanto.rp9": {
        source: "iana",
        extensions: ["rp9"]
      },
      "application/vnd.clonk.c4group": {
        source: "iana",
        extensions: ["c4g", "c4d", "c4f", "c4p", "c4u"]
      },
      "application/vnd.cluetrust.cartomobile-config": {
        source: "iana",
        extensions: ["c11amc"]
      },
      "application/vnd.cluetrust.cartomobile-config-pkg": {
        source: "iana",
        extensions: ["c11amz"]
      },
      "application/vnd.coffeescript": {
        source: "iana"
      },
      "application/vnd.collabio.xodocuments.document": {
        source: "iana"
      },
      "application/vnd.collabio.xodocuments.document-template": {
        source: "iana"
      },
      "application/vnd.collabio.xodocuments.presentation": {
        source: "iana"
      },
      "application/vnd.collabio.xodocuments.presentation-template": {
        source: "iana"
      },
      "application/vnd.collabio.xodocuments.spreadsheet": {
        source: "iana"
      },
      "application/vnd.collabio.xodocuments.spreadsheet-template": {
        source: "iana"
      },
      "application/vnd.collection+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.collection.doc+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.collection.next+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.comicbook+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.comicbook-rar": {
        source: "iana"
      },
      "application/vnd.commerce-battelle": {
        source: "iana"
      },
      "application/vnd.commonspace": {
        source: "iana",
        extensions: ["csp"]
      },
      "application/vnd.contact.cmsg": {
        source: "iana",
        extensions: ["cdbcmsg"]
      },
      "application/vnd.coreos.ignition+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.cosmocaller": {
        source: "iana",
        extensions: ["cmc"]
      },
      "application/vnd.crick.clicker": {
        source: "iana",
        extensions: ["clkx"]
      },
      "application/vnd.crick.clicker.keyboard": {
        source: "iana",
        extensions: ["clkk"]
      },
      "application/vnd.crick.clicker.palette": {
        source: "iana",
        extensions: ["clkp"]
      },
      "application/vnd.crick.clicker.template": {
        source: "iana",
        extensions: ["clkt"]
      },
      "application/vnd.crick.clicker.wordbank": {
        source: "iana",
        extensions: ["clkw"]
      },
      "application/vnd.criticaltools.wbs+xml": {
        source: "iana",
        compressible: true,
        extensions: ["wbs"]
      },
      "application/vnd.cryptii.pipe+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.crypto-shade-file": {
        source: "iana"
      },
      "application/vnd.cryptomator.encrypted": {
        source: "iana"
      },
      "application/vnd.cryptomator.vault": {
        source: "iana"
      },
      "application/vnd.ctc-posml": {
        source: "iana",
        extensions: ["pml"]
      },
      "application/vnd.ctct.ws+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.cups-pdf": {
        source: "iana"
      },
      "application/vnd.cups-postscript": {
        source: "iana"
      },
      "application/vnd.cups-ppd": {
        source: "iana",
        extensions: ["ppd"]
      },
      "application/vnd.cups-raster": {
        source: "iana"
      },
      "application/vnd.cups-raw": {
        source: "iana"
      },
      "application/vnd.curl": {
        source: "iana"
      },
      "application/vnd.curl.car": {
        source: "apache",
        extensions: ["car"]
      },
      "application/vnd.curl.pcurl": {
        source: "apache",
        extensions: ["pcurl"]
      },
      "application/vnd.cyan.dean.root+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.cybank": {
        source: "iana"
      },
      "application/vnd.cyclonedx+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.cyclonedx+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.d2l.coursepackage1p0+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.d3m-dataset": {
        source: "iana"
      },
      "application/vnd.d3m-problem": {
        source: "iana"
      },
      "application/vnd.dart": {
        source: "iana",
        compressible: true,
        extensions: ["dart"]
      },
      "application/vnd.data-vision.rdz": {
        source: "iana",
        extensions: ["rdz"]
      },
      "application/vnd.datapackage+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dataresource+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dbf": {
        source: "iana",
        extensions: ["dbf"]
      },
      "application/vnd.debian.binary-package": {
        source: "iana"
      },
      "application/vnd.dece.data": {
        source: "iana",
        extensions: ["uvf", "uvvf", "uvd", "uvvd"]
      },
      "application/vnd.dece.ttml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["uvt", "uvvt"]
      },
      "application/vnd.dece.unspecified": {
        source: "iana",
        extensions: ["uvx", "uvvx"]
      },
      "application/vnd.dece.zip": {
        source: "iana",
        extensions: ["uvz", "uvvz"]
      },
      "application/vnd.denovo.fcselayout-link": {
        source: "iana",
        extensions: ["fe_launch"]
      },
      "application/vnd.desmume.movie": {
        source: "iana"
      },
      "application/vnd.dir-bi.plate-dl-nosuffix": {
        source: "iana"
      },
      "application/vnd.dm.delegation+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dna": {
        source: "iana",
        extensions: ["dna"]
      },
      "application/vnd.document+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dolby.mlp": {
        source: "apache",
        extensions: ["mlp"]
      },
      "application/vnd.dolby.mobile.1": {
        source: "iana"
      },
      "application/vnd.dolby.mobile.2": {
        source: "iana"
      },
      "application/vnd.doremir.scorecloud-binary-document": {
        source: "iana"
      },
      "application/vnd.dpgraph": {
        source: "iana",
        extensions: ["dpg"]
      },
      "application/vnd.dreamfactory": {
        source: "iana",
        extensions: ["dfac"]
      },
      "application/vnd.drive+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ds-keypoint": {
        source: "apache",
        extensions: ["kpxx"]
      },
      "application/vnd.dtg.local": {
        source: "iana"
      },
      "application/vnd.dtg.local.flash": {
        source: "iana"
      },
      "application/vnd.dtg.local.html": {
        source: "iana"
      },
      "application/vnd.dvb.ait": {
        source: "iana",
        extensions: ["ait"]
      },
      "application/vnd.dvb.dvbisl+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.dvbj": {
        source: "iana"
      },
      "application/vnd.dvb.esgcontainer": {
        source: "iana"
      },
      "application/vnd.dvb.ipdcdftnotifaccess": {
        source: "iana"
      },
      "application/vnd.dvb.ipdcesgaccess": {
        source: "iana"
      },
      "application/vnd.dvb.ipdcesgaccess2": {
        source: "iana"
      },
      "application/vnd.dvb.ipdcesgpdd": {
        source: "iana"
      },
      "application/vnd.dvb.ipdcroaming": {
        source: "iana"
      },
      "application/vnd.dvb.iptv.alfec-base": {
        source: "iana"
      },
      "application/vnd.dvb.iptv.alfec-enhancement": {
        source: "iana"
      },
      "application/vnd.dvb.notif-aggregate-root+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.notif-container+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.notif-generic+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.notif-ia-msglist+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.notif-ia-registration-request+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.notif-ia-registration-response+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.notif-init+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.pfr": {
        source: "iana"
      },
      "application/vnd.dvb.service": {
        source: "iana",
        extensions: ["svc"]
      },
      "application/vnd.dxr": {
        source: "iana"
      },
      "application/vnd.dynageo": {
        source: "iana",
        extensions: ["geo"]
      },
      "application/vnd.dzr": {
        source: "iana"
      },
      "application/vnd.easykaraoke.cdgdownload": {
        source: "iana"
      },
      "application/vnd.ecdis-update": {
        source: "iana"
      },
      "application/vnd.ecip.rlp": {
        source: "iana"
      },
      "application/vnd.eclipse.ditto+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ecowin.chart": {
        source: "iana",
        extensions: ["mag"]
      },
      "application/vnd.ecowin.filerequest": {
        source: "iana"
      },
      "application/vnd.ecowin.fileupdate": {
        source: "iana"
      },
      "application/vnd.ecowin.series": {
        source: "iana"
      },
      "application/vnd.ecowin.seriesrequest": {
        source: "iana"
      },
      "application/vnd.ecowin.seriesupdate": {
        source: "iana"
      },
      "application/vnd.efi.img": {
        source: "iana"
      },
      "application/vnd.efi.iso": {
        source: "iana"
      },
      "application/vnd.emclient.accessrequest+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.enliven": {
        source: "iana",
        extensions: ["nml"]
      },
      "application/vnd.enphase.envoy": {
        source: "iana"
      },
      "application/vnd.eprints.data+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.epson.esf": {
        source: "iana",
        extensions: ["esf"]
      },
      "application/vnd.epson.msf": {
        source: "iana",
        extensions: ["msf"]
      },
      "application/vnd.epson.quickanime": {
        source: "iana",
        extensions: ["qam"]
      },
      "application/vnd.epson.salt": {
        source: "iana",
        extensions: ["slt"]
      },
      "application/vnd.epson.ssf": {
        source: "iana",
        extensions: ["ssf"]
      },
      "application/vnd.ericsson.quickcall": {
        source: "iana"
      },
      "application/vnd.espass-espass+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.eszigno3+xml": {
        source: "iana",
        compressible: true,
        extensions: ["es3", "et3"]
      },
      "application/vnd.etsi.aoc+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.asic-e+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.etsi.asic-s+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.etsi.cug+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvcommand+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvdiscovery+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvprofile+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvsad-bc+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvsad-cod+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvsad-npvr+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvservice+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvsync+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvueprofile+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.mcid+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.mheg5": {
        source: "iana"
      },
      "application/vnd.etsi.overload-control-policy-dataset+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.pstn+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.sci+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.simservs+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.timestamp-token": {
        source: "iana"
      },
      "application/vnd.etsi.tsl+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.tsl.der": {
        source: "iana"
      },
      "application/vnd.eu.kasparian.car+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.eudora.data": {
        source: "iana"
      },
      "application/vnd.evolv.ecig.profile": {
        source: "iana"
      },
      "application/vnd.evolv.ecig.settings": {
        source: "iana"
      },
      "application/vnd.evolv.ecig.theme": {
        source: "iana"
      },
      "application/vnd.exstream-empower+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.exstream-package": {
        source: "iana"
      },
      "application/vnd.ezpix-album": {
        source: "iana",
        extensions: ["ez2"]
      },
      "application/vnd.ezpix-package": {
        source: "iana",
        extensions: ["ez3"]
      },
      "application/vnd.f-secure.mobile": {
        source: "iana"
      },
      "application/vnd.familysearch.gedcom+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.fastcopy-disk-image": {
        source: "iana"
      },
      "application/vnd.fdf": {
        source: "iana",
        extensions: ["fdf"]
      },
      "application/vnd.fdsn.mseed": {
        source: "iana",
        extensions: ["mseed"]
      },
      "application/vnd.fdsn.seed": {
        source: "iana",
        extensions: ["seed", "dataless"]
      },
      "application/vnd.ffsns": {
        source: "iana"
      },
      "application/vnd.ficlab.flb+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.filmit.zfc": {
        source: "iana"
      },
      "application/vnd.fints": {
        source: "iana"
      },
      "application/vnd.firemonkeys.cloudcell": {
        source: "iana"
      },
      "application/vnd.flographit": {
        source: "iana",
        extensions: ["gph"]
      },
      "application/vnd.fluxtime.clip": {
        source: "iana",
        extensions: ["ftc"]
      },
      "application/vnd.font-fontforge-sfd": {
        source: "iana"
      },
      "application/vnd.framemaker": {
        source: "iana",
        extensions: ["fm", "frame", "maker", "book"]
      },
      "application/vnd.frogans.fnc": {
        source: "iana",
        extensions: ["fnc"]
      },
      "application/vnd.frogans.ltf": {
        source: "iana",
        extensions: ["ltf"]
      },
      "application/vnd.fsc.weblaunch": {
        source: "iana",
        extensions: ["fsc"]
      },
      "application/vnd.fujifilm.fb.docuworks": {
        source: "iana"
      },
      "application/vnd.fujifilm.fb.docuworks.binder": {
        source: "iana"
      },
      "application/vnd.fujifilm.fb.docuworks.container": {
        source: "iana"
      },
      "application/vnd.fujifilm.fb.jfi+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.fujitsu.oasys": {
        source: "iana",
        extensions: ["oas"]
      },
      "application/vnd.fujitsu.oasys2": {
        source: "iana",
        extensions: ["oa2"]
      },
      "application/vnd.fujitsu.oasys3": {
        source: "iana",
        extensions: ["oa3"]
      },
      "application/vnd.fujitsu.oasysgp": {
        source: "iana",
        extensions: ["fg5"]
      },
      "application/vnd.fujitsu.oasysprs": {
        source: "iana",
        extensions: ["bh2"]
      },
      "application/vnd.fujixerox.art-ex": {
        source: "iana"
      },
      "application/vnd.fujixerox.art4": {
        source: "iana"
      },
      "application/vnd.fujixerox.ddd": {
        source: "iana",
        extensions: ["ddd"]
      },
      "application/vnd.fujixerox.docuworks": {
        source: "iana",
        extensions: ["xdw"]
      },
      "application/vnd.fujixerox.docuworks.binder": {
        source: "iana",
        extensions: ["xbd"]
      },
      "application/vnd.fujixerox.docuworks.container": {
        source: "iana"
      },
      "application/vnd.fujixerox.hbpl": {
        source: "iana"
      },
      "application/vnd.fut-misnet": {
        source: "iana"
      },
      "application/vnd.futoin+cbor": {
        source: "iana"
      },
      "application/vnd.futoin+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.fuzzysheet": {
        source: "iana",
        extensions: ["fzs"]
      },
      "application/vnd.genomatix.tuxedo": {
        source: "iana",
        extensions: ["txd"]
      },
      "application/vnd.gentics.grd+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.geo+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.geocube+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.geogebra.file": {
        source: "iana",
        extensions: ["ggb"]
      },
      "application/vnd.geogebra.slides": {
        source: "iana"
      },
      "application/vnd.geogebra.tool": {
        source: "iana",
        extensions: ["ggt"]
      },
      "application/vnd.geometry-explorer": {
        source: "iana",
        extensions: ["gex", "gre"]
      },
      "application/vnd.geonext": {
        source: "iana",
        extensions: ["gxt"]
      },
      "application/vnd.geoplan": {
        source: "iana",
        extensions: ["g2w"]
      },
      "application/vnd.geospace": {
        source: "iana",
        extensions: ["g3w"]
      },
      "application/vnd.gerber": {
        source: "iana"
      },
      "application/vnd.globalplatform.card-content-mgt": {
        source: "iana"
      },
      "application/vnd.globalplatform.card-content-mgt-response": {
        source: "iana"
      },
      "application/vnd.gmx": {
        source: "iana",
        extensions: ["gmx"]
      },
      "application/vnd.google-apps.document": {
        compressible: false,
        extensions: ["gdoc"]
      },
      "application/vnd.google-apps.presentation": {
        compressible: false,
        extensions: ["gslides"]
      },
      "application/vnd.google-apps.spreadsheet": {
        compressible: false,
        extensions: ["gsheet"]
      },
      "application/vnd.google-earth.kml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["kml"]
      },
      "application/vnd.google-earth.kmz": {
        source: "iana",
        compressible: false,
        extensions: ["kmz"]
      },
      "application/vnd.gov.sk.e-form+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.gov.sk.e-form+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.gov.sk.xmldatacontainer+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.grafeq": {
        source: "iana",
        extensions: ["gqf", "gqs"]
      },
      "application/vnd.gridmp": {
        source: "iana"
      },
      "application/vnd.groove-account": {
        source: "iana",
        extensions: ["gac"]
      },
      "application/vnd.groove-help": {
        source: "iana",
        extensions: ["ghf"]
      },
      "application/vnd.groove-identity-message": {
        source: "iana",
        extensions: ["gim"]
      },
      "application/vnd.groove-injector": {
        source: "iana",
        extensions: ["grv"]
      },
      "application/vnd.groove-tool-message": {
        source: "iana",
        extensions: ["gtm"]
      },
      "application/vnd.groove-tool-template": {
        source: "iana",
        extensions: ["tpl"]
      },
      "application/vnd.groove-vcard": {
        source: "iana",
        extensions: ["vcg"]
      },
      "application/vnd.hal+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.hal+xml": {
        source: "iana",
        compressible: true,
        extensions: ["hal"]
      },
      "application/vnd.handheld-entertainment+xml": {
        source: "iana",
        compressible: true,
        extensions: ["zmm"]
      },
      "application/vnd.hbci": {
        source: "iana",
        extensions: ["hbci"]
      },
      "application/vnd.hc+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.hcl-bireports": {
        source: "iana"
      },
      "application/vnd.hdt": {
        source: "iana"
      },
      "application/vnd.heroku+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.hhe.lesson-player": {
        source: "iana",
        extensions: ["les"]
      },
      "application/vnd.hl7cda+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/vnd.hl7v2+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/vnd.hp-hpgl": {
        source: "iana",
        extensions: ["hpgl"]
      },
      "application/vnd.hp-hpid": {
        source: "iana",
        extensions: ["hpid"]
      },
      "application/vnd.hp-hps": {
        source: "iana",
        extensions: ["hps"]
      },
      "application/vnd.hp-jlyt": {
        source: "iana",
        extensions: ["jlt"]
      },
      "application/vnd.hp-pcl": {
        source: "iana",
        extensions: ["pcl"]
      },
      "application/vnd.hp-pclxl": {
        source: "iana",
        extensions: ["pclxl"]
      },
      "application/vnd.httphone": {
        source: "iana"
      },
      "application/vnd.hydrostatix.sof-data": {
        source: "iana",
        extensions: ["sfd-hdstx"]
      },
      "application/vnd.hyper+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.hyper-item+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.hyperdrive+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.hzn-3d-crossword": {
        source: "iana"
      },
      "application/vnd.ibm.afplinedata": {
        source: "iana"
      },
      "application/vnd.ibm.electronic-media": {
        source: "iana"
      },
      "application/vnd.ibm.minipay": {
        source: "iana",
        extensions: ["mpy"]
      },
      "application/vnd.ibm.modcap": {
        source: "iana",
        extensions: ["afp", "listafp", "list3820"]
      },
      "application/vnd.ibm.rights-management": {
        source: "iana",
        extensions: ["irm"]
      },
      "application/vnd.ibm.secure-container": {
        source: "iana",
        extensions: ["sc"]
      },
      "application/vnd.iccprofile": {
        source: "iana",
        extensions: ["icc", "icm"]
      },
      "application/vnd.ieee.1905": {
        source: "iana"
      },
      "application/vnd.igloader": {
        source: "iana",
        extensions: ["igl"]
      },
      "application/vnd.imagemeter.folder+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.imagemeter.image+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.immervision-ivp": {
        source: "iana",
        extensions: ["ivp"]
      },
      "application/vnd.immervision-ivu": {
        source: "iana",
        extensions: ["ivu"]
      },
      "application/vnd.ims.imsccv1p1": {
        source: "iana"
      },
      "application/vnd.ims.imsccv1p2": {
        source: "iana"
      },
      "application/vnd.ims.imsccv1p3": {
        source: "iana"
      },
      "application/vnd.ims.lis.v2.result+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ims.lti.v2.toolconsumerprofile+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ims.lti.v2.toolproxy+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ims.lti.v2.toolproxy.id+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ims.lti.v2.toolsettings+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ims.lti.v2.toolsettings.simple+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.informedcontrol.rms+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.informix-visionary": {
        source: "iana"
      },
      "application/vnd.infotech.project": {
        source: "iana"
      },
      "application/vnd.infotech.project+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.innopath.wamp.notification": {
        source: "iana"
      },
      "application/vnd.insors.igm": {
        source: "iana",
        extensions: ["igm"]
      },
      "application/vnd.intercon.formnet": {
        source: "iana",
        extensions: ["xpw", "xpx"]
      },
      "application/vnd.intergeo": {
        source: "iana",
        extensions: ["i2g"]
      },
      "application/vnd.intertrust.digibox": {
        source: "iana"
      },
      "application/vnd.intertrust.nncp": {
        source: "iana"
      },
      "application/vnd.intu.qbo": {
        source: "iana",
        extensions: ["qbo"]
      },
      "application/vnd.intu.qfx": {
        source: "iana",
        extensions: ["qfx"]
      },
      "application/vnd.iptc.g2.catalogitem+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.iptc.g2.conceptitem+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.iptc.g2.knowledgeitem+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.iptc.g2.newsitem+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.iptc.g2.newsmessage+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.iptc.g2.packageitem+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.iptc.g2.planningitem+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ipunplugged.rcprofile": {
        source: "iana",
        extensions: ["rcprofile"]
      },
      "application/vnd.irepository.package+xml": {
        source: "iana",
        compressible: true,
        extensions: ["irp"]
      },
      "application/vnd.is-xpr": {
        source: "iana",
        extensions: ["xpr"]
      },
      "application/vnd.isac.fcs": {
        source: "iana",
        extensions: ["fcs"]
      },
      "application/vnd.iso11783-10+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.jam": {
        source: "iana",
        extensions: ["jam"]
      },
      "application/vnd.japannet-directory-service": {
        source: "iana"
      },
      "application/vnd.japannet-jpnstore-wakeup": {
        source: "iana"
      },
      "application/vnd.japannet-payment-wakeup": {
        source: "iana"
      },
      "application/vnd.japannet-registration": {
        source: "iana"
      },
      "application/vnd.japannet-registration-wakeup": {
        source: "iana"
      },
      "application/vnd.japannet-setstore-wakeup": {
        source: "iana"
      },
      "application/vnd.japannet-verification": {
        source: "iana"
      },
      "application/vnd.japannet-verification-wakeup": {
        source: "iana"
      },
      "application/vnd.jcp.javame.midlet-rms": {
        source: "iana",
        extensions: ["rms"]
      },
      "application/vnd.jisp": {
        source: "iana",
        extensions: ["jisp"]
      },
      "application/vnd.joost.joda-archive": {
        source: "iana",
        extensions: ["joda"]
      },
      "application/vnd.jsk.isdn-ngn": {
        source: "iana"
      },
      "application/vnd.kahootz": {
        source: "iana",
        extensions: ["ktz", "ktr"]
      },
      "application/vnd.kde.karbon": {
        source: "iana",
        extensions: ["karbon"]
      },
      "application/vnd.kde.kchart": {
        source: "iana",
        extensions: ["chrt"]
      },
      "application/vnd.kde.kformula": {
        source: "iana",
        extensions: ["kfo"]
      },
      "application/vnd.kde.kivio": {
        source: "iana",
        extensions: ["flw"]
      },
      "application/vnd.kde.kontour": {
        source: "iana",
        extensions: ["kon"]
      },
      "application/vnd.kde.kpresenter": {
        source: "iana",
        extensions: ["kpr", "kpt"]
      },
      "application/vnd.kde.kspread": {
        source: "iana",
        extensions: ["ksp"]
      },
      "application/vnd.kde.kword": {
        source: "iana",
        extensions: ["kwd", "kwt"]
      },
      "application/vnd.kenameaapp": {
        source: "iana",
        extensions: ["htke"]
      },
      "application/vnd.kidspiration": {
        source: "iana",
        extensions: ["kia"]
      },
      "application/vnd.kinar": {
        source: "iana",
        extensions: ["kne", "knp"]
      },
      "application/vnd.koan": {
        source: "iana",
        extensions: ["skp", "skd", "skt", "skm"]
      },
      "application/vnd.kodak-descriptor": {
        source: "iana",
        extensions: ["sse"]
      },
      "application/vnd.las": {
        source: "iana"
      },
      "application/vnd.las.las+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.las.las+xml": {
        source: "iana",
        compressible: true,
        extensions: ["lasxml"]
      },
      "application/vnd.laszip": {
        source: "iana"
      },
      "application/vnd.leap+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.liberty-request+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.llamagraphics.life-balance.desktop": {
        source: "iana",
        extensions: ["lbd"]
      },
      "application/vnd.llamagraphics.life-balance.exchange+xml": {
        source: "iana",
        compressible: true,
        extensions: ["lbe"]
      },
      "application/vnd.logipipe.circuit+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.loom": {
        source: "iana"
      },
      "application/vnd.lotus-1-2-3": {
        source: "iana",
        extensions: ["123"]
      },
      "application/vnd.lotus-approach": {
        source: "iana",
        extensions: ["apr"]
      },
      "application/vnd.lotus-freelance": {
        source: "iana",
        extensions: ["pre"]
      },
      "application/vnd.lotus-notes": {
        source: "iana",
        extensions: ["nsf"]
      },
      "application/vnd.lotus-organizer": {
        source: "iana",
        extensions: ["org"]
      },
      "application/vnd.lotus-screencam": {
        source: "iana",
        extensions: ["scm"]
      },
      "application/vnd.lotus-wordpro": {
        source: "iana",
        extensions: ["lwp"]
      },
      "application/vnd.macports.portpkg": {
        source: "iana",
        extensions: ["portpkg"]
      },
      "application/vnd.mapbox-vector-tile": {
        source: "iana",
        extensions: ["mvt"]
      },
      "application/vnd.marlin.drm.actiontoken+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.marlin.drm.conftoken+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.marlin.drm.license+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.marlin.drm.mdcf": {
        source: "iana"
      },
      "application/vnd.mason+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.maxar.archive.3tz+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.maxmind.maxmind-db": {
        source: "iana"
      },
      "application/vnd.mcd": {
        source: "iana",
        extensions: ["mcd"]
      },
      "application/vnd.medcalcdata": {
        source: "iana",
        extensions: ["mc1"]
      },
      "application/vnd.mediastation.cdkey": {
        source: "iana",
        extensions: ["cdkey"]
      },
      "application/vnd.meridian-slingshot": {
        source: "iana"
      },
      "application/vnd.mfer": {
        source: "iana",
        extensions: ["mwf"]
      },
      "application/vnd.mfmp": {
        source: "iana",
        extensions: ["mfm"]
      },
      "application/vnd.micro+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.micrografx.flo": {
        source: "iana",
        extensions: ["flo"]
      },
      "application/vnd.micrografx.igx": {
        source: "iana",
        extensions: ["igx"]
      },
      "application/vnd.microsoft.portable-executable": {
        source: "iana"
      },
      "application/vnd.microsoft.windows.thumbnail-cache": {
        source: "iana"
      },
      "application/vnd.miele+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.mif": {
        source: "iana",
        extensions: ["mif"]
      },
      "application/vnd.minisoft-hp3000-save": {
        source: "iana"
      },
      "application/vnd.mitsubishi.misty-guard.trustweb": {
        source: "iana"
      },
      "application/vnd.mobius.daf": {
        source: "iana",
        extensions: ["daf"]
      },
      "application/vnd.mobius.dis": {
        source: "iana",
        extensions: ["dis"]
      },
      "application/vnd.mobius.mbk": {
        source: "iana",
        extensions: ["mbk"]
      },
      "application/vnd.mobius.mqy": {
        source: "iana",
        extensions: ["mqy"]
      },
      "application/vnd.mobius.msl": {
        source: "iana",
        extensions: ["msl"]
      },
      "application/vnd.mobius.plc": {
        source: "iana",
        extensions: ["plc"]
      },
      "application/vnd.mobius.txf": {
        source: "iana",
        extensions: ["txf"]
      },
      "application/vnd.mophun.application": {
        source: "iana",
        extensions: ["mpn"]
      },
      "application/vnd.mophun.certificate": {
        source: "iana",
        extensions: ["mpc"]
      },
      "application/vnd.motorola.flexsuite": {
        source: "iana"
      },
      "application/vnd.motorola.flexsuite.adsi": {
        source: "iana"
      },
      "application/vnd.motorola.flexsuite.fis": {
        source: "iana"
      },
      "application/vnd.motorola.flexsuite.gotap": {
        source: "iana"
      },
      "application/vnd.motorola.flexsuite.kmr": {
        source: "iana"
      },
      "application/vnd.motorola.flexsuite.ttc": {
        source: "iana"
      },
      "application/vnd.motorola.flexsuite.wem": {
        source: "iana"
      },
      "application/vnd.motorola.iprm": {
        source: "iana"
      },
      "application/vnd.mozilla.xul+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xul"]
      },
      "application/vnd.ms-3mfdocument": {
        source: "iana"
      },
      "application/vnd.ms-artgalry": {
        source: "iana",
        extensions: ["cil"]
      },
      "application/vnd.ms-asf": {
        source: "iana"
      },
      "application/vnd.ms-cab-compressed": {
        source: "iana",
        extensions: ["cab"]
      },
      "application/vnd.ms-color.iccprofile": {
        source: "apache"
      },
      "application/vnd.ms-excel": {
        source: "iana",
        compressible: false,
        extensions: ["xls", "xlm", "xla", "xlc", "xlt", "xlw"]
      },
      "application/vnd.ms-excel.addin.macroenabled.12": {
        source: "iana",
        extensions: ["xlam"]
      },
      "application/vnd.ms-excel.sheet.binary.macroenabled.12": {
        source: "iana",
        extensions: ["xlsb"]
      },
      "application/vnd.ms-excel.sheet.macroenabled.12": {
        source: "iana",
        extensions: ["xlsm"]
      },
      "application/vnd.ms-excel.template.macroenabled.12": {
        source: "iana",
        extensions: ["xltm"]
      },
      "application/vnd.ms-fontobject": {
        source: "iana",
        compressible: true,
        extensions: ["eot"]
      },
      "application/vnd.ms-htmlhelp": {
        source: "iana",
        extensions: ["chm"]
      },
      "application/vnd.ms-ims": {
        source: "iana",
        extensions: ["ims"]
      },
      "application/vnd.ms-lrm": {
        source: "iana",
        extensions: ["lrm"]
      },
      "application/vnd.ms-office.activex+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ms-officetheme": {
        source: "iana",
        extensions: ["thmx"]
      },
      "application/vnd.ms-opentype": {
        source: "apache",
        compressible: true
      },
      "application/vnd.ms-outlook": {
        compressible: false,
        extensions: ["msg"]
      },
      "application/vnd.ms-package.obfuscated-opentype": {
        source: "apache"
      },
      "application/vnd.ms-pki.seccat": {
        source: "apache",
        extensions: ["cat"]
      },
      "application/vnd.ms-pki.stl": {
        source: "apache",
        extensions: ["stl"]
      },
      "application/vnd.ms-playready.initiator+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ms-powerpoint": {
        source: "iana",
        compressible: false,
        extensions: ["ppt", "pps", "pot"]
      },
      "application/vnd.ms-powerpoint.addin.macroenabled.12": {
        source: "iana",
        extensions: ["ppam"]
      },
      "application/vnd.ms-powerpoint.presentation.macroenabled.12": {
        source: "iana",
        extensions: ["pptm"]
      },
      "application/vnd.ms-powerpoint.slide.macroenabled.12": {
        source: "iana",
        extensions: ["sldm"]
      },
      "application/vnd.ms-powerpoint.slideshow.macroenabled.12": {
        source: "iana",
        extensions: ["ppsm"]
      },
      "application/vnd.ms-powerpoint.template.macroenabled.12": {
        source: "iana",
        extensions: ["potm"]
      },
      "application/vnd.ms-printdevicecapabilities+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ms-printing.printticket+xml": {
        source: "apache",
        compressible: true
      },
      "application/vnd.ms-printschematicket+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ms-project": {
        source: "iana",
        extensions: ["mpp", "mpt"]
      },
      "application/vnd.ms-tnef": {
        source: "iana"
      },
      "application/vnd.ms-windows.devicepairing": {
        source: "iana"
      },
      "application/vnd.ms-windows.nwprinting.oob": {
        source: "iana"
      },
      "application/vnd.ms-windows.printerpairing": {
        source: "iana"
      },
      "application/vnd.ms-windows.wsd.oob": {
        source: "iana"
      },
      "application/vnd.ms-wmdrm.lic-chlg-req": {
        source: "iana"
      },
      "application/vnd.ms-wmdrm.lic-resp": {
        source: "iana"
      },
      "application/vnd.ms-wmdrm.meter-chlg-req": {
        source: "iana"
      },
      "application/vnd.ms-wmdrm.meter-resp": {
        source: "iana"
      },
      "application/vnd.ms-word.document.macroenabled.12": {
        source: "iana",
        extensions: ["docm"]
      },
      "application/vnd.ms-word.template.macroenabled.12": {
        source: "iana",
        extensions: ["dotm"]
      },
      "application/vnd.ms-works": {
        source: "iana",
        extensions: ["wps", "wks", "wcm", "wdb"]
      },
      "application/vnd.ms-wpl": {
        source: "iana",
        extensions: ["wpl"]
      },
      "application/vnd.ms-xpsdocument": {
        source: "iana",
        compressible: false,
        extensions: ["xps"]
      },
      "application/vnd.msa-disk-image": {
        source: "iana"
      },
      "application/vnd.mseq": {
        source: "iana",
        extensions: ["mseq"]
      },
      "application/vnd.msign": {
        source: "iana"
      },
      "application/vnd.multiad.creator": {
        source: "iana"
      },
      "application/vnd.multiad.creator.cif": {
        source: "iana"
      },
      "application/vnd.music-niff": {
        source: "iana"
      },
      "application/vnd.musician": {
        source: "iana",
        extensions: ["mus"]
      },
      "application/vnd.muvee.style": {
        source: "iana",
        extensions: ["msty"]
      },
      "application/vnd.mynfc": {
        source: "iana",
        extensions: ["taglet"]
      },
      "application/vnd.nacamar.ybrid+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ncd.control": {
        source: "iana"
      },
      "application/vnd.ncd.reference": {
        source: "iana"
      },
      "application/vnd.nearst.inv+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.nebumind.line": {
        source: "iana"
      },
      "application/vnd.nervana": {
        source: "iana"
      },
      "application/vnd.netfpx": {
        source: "iana"
      },
      "application/vnd.neurolanguage.nlu": {
        source: "iana",
        extensions: ["nlu"]
      },
      "application/vnd.nimn": {
        source: "iana"
      },
      "application/vnd.nintendo.nitro.rom": {
        source: "iana"
      },
      "application/vnd.nintendo.snes.rom": {
        source: "iana"
      },
      "application/vnd.nitf": {
        source: "iana",
        extensions: ["ntf", "nitf"]
      },
      "application/vnd.noblenet-directory": {
        source: "iana",
        extensions: ["nnd"]
      },
      "application/vnd.noblenet-sealer": {
        source: "iana",
        extensions: ["nns"]
      },
      "application/vnd.noblenet-web": {
        source: "iana",
        extensions: ["nnw"]
      },
      "application/vnd.nokia.catalogs": {
        source: "iana"
      },
      "application/vnd.nokia.conml+wbxml": {
        source: "iana"
      },
      "application/vnd.nokia.conml+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.nokia.iptv.config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.nokia.isds-radio-presets": {
        source: "iana"
      },
      "application/vnd.nokia.landmark+wbxml": {
        source: "iana"
      },
      "application/vnd.nokia.landmark+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.nokia.landmarkcollection+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.nokia.n-gage.ac+xml": {
        source: "iana",
        compressible: true,
        extensions: ["ac"]
      },
      "application/vnd.nokia.n-gage.data": {
        source: "iana",
        extensions: ["ngdat"]
      },
      "application/vnd.nokia.n-gage.symbian.install": {
        source: "iana",
        extensions: ["n-gage"]
      },
      "application/vnd.nokia.ncd": {
        source: "iana"
      },
      "application/vnd.nokia.pcd+wbxml": {
        source: "iana"
      },
      "application/vnd.nokia.pcd+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.nokia.radio-preset": {
        source: "iana",
        extensions: ["rpst"]
      },
      "application/vnd.nokia.radio-presets": {
        source: "iana",
        extensions: ["rpss"]
      },
      "application/vnd.novadigm.edm": {
        source: "iana",
        extensions: ["edm"]
      },
      "application/vnd.novadigm.edx": {
        source: "iana",
        extensions: ["edx"]
      },
      "application/vnd.novadigm.ext": {
        source: "iana",
        extensions: ["ext"]
      },
      "application/vnd.ntt-local.content-share": {
        source: "iana"
      },
      "application/vnd.ntt-local.file-transfer": {
        source: "iana"
      },
      "application/vnd.ntt-local.ogw_remote-access": {
        source: "iana"
      },
      "application/vnd.ntt-local.sip-ta_remote": {
        source: "iana"
      },
      "application/vnd.ntt-local.sip-ta_tcp_stream": {
        source: "iana"
      },
      "application/vnd.oasis.opendocument.chart": {
        source: "iana",
        extensions: ["odc"]
      },
      "application/vnd.oasis.opendocument.chart-template": {
        source: "iana",
        extensions: ["otc"]
      },
      "application/vnd.oasis.opendocument.database": {
        source: "iana",
        extensions: ["odb"]
      },
      "application/vnd.oasis.opendocument.formula": {
        source: "iana",
        extensions: ["odf"]
      },
      "application/vnd.oasis.opendocument.formula-template": {
        source: "iana",
        extensions: ["odft"]
      },
      "application/vnd.oasis.opendocument.graphics": {
        source: "iana",
        compressible: false,
        extensions: ["odg"]
      },
      "application/vnd.oasis.opendocument.graphics-template": {
        source: "iana",
        extensions: ["otg"]
      },
      "application/vnd.oasis.opendocument.image": {
        source: "iana",
        extensions: ["odi"]
      },
      "application/vnd.oasis.opendocument.image-template": {
        source: "iana",
        extensions: ["oti"]
      },
      "application/vnd.oasis.opendocument.presentation": {
        source: "iana",
        compressible: false,
        extensions: ["odp"]
      },
      "application/vnd.oasis.opendocument.presentation-template": {
        source: "iana",
        extensions: ["otp"]
      },
      "application/vnd.oasis.opendocument.spreadsheet": {
        source: "iana",
        compressible: false,
        extensions: ["ods"]
      },
      "application/vnd.oasis.opendocument.spreadsheet-template": {
        source: "iana",
        extensions: ["ots"]
      },
      "application/vnd.oasis.opendocument.text": {
        source: "iana",
        compressible: false,
        extensions: ["odt"]
      },
      "application/vnd.oasis.opendocument.text-master": {
        source: "iana",
        extensions: ["odm"]
      },
      "application/vnd.oasis.opendocument.text-template": {
        source: "iana",
        extensions: ["ott"]
      },
      "application/vnd.oasis.opendocument.text-web": {
        source: "iana",
        extensions: ["oth"]
      },
      "application/vnd.obn": {
        source: "iana"
      },
      "application/vnd.ocf+cbor": {
        source: "iana"
      },
      "application/vnd.oci.image.manifest.v1+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oftn.l10n+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.contentaccessdownload+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.contentaccessstreaming+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.cspg-hexbinary": {
        source: "iana"
      },
      "application/vnd.oipf.dae.svg+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.dae.xhtml+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.mippvcontrolmessage+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.pae.gem": {
        source: "iana"
      },
      "application/vnd.oipf.spdiscovery+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.spdlist+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.ueprofile+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.userprofile+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.olpc-sugar": {
        source: "iana",
        extensions: ["xo"]
      },
      "application/vnd.oma-scws-config": {
        source: "iana"
      },
      "application/vnd.oma-scws-http-request": {
        source: "iana"
      },
      "application/vnd.oma-scws-http-response": {
        source: "iana"
      },
      "application/vnd.oma.bcast.associated-procedure-parameter+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.bcast.drm-trigger+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.bcast.imd+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.bcast.ltkm": {
        source: "iana"
      },
      "application/vnd.oma.bcast.notification+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.bcast.provisioningtrigger": {
        source: "iana"
      },
      "application/vnd.oma.bcast.sgboot": {
        source: "iana"
      },
      "application/vnd.oma.bcast.sgdd+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.bcast.sgdu": {
        source: "iana"
      },
      "application/vnd.oma.bcast.simple-symbol-container": {
        source: "iana"
      },
      "application/vnd.oma.bcast.smartcard-trigger+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.bcast.sprov+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.bcast.stkm": {
        source: "iana"
      },
      "application/vnd.oma.cab-address-book+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.cab-feature-handler+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.cab-pcc+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.cab-subs-invite+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.cab-user-prefs+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.dcd": {
        source: "iana"
      },
      "application/vnd.oma.dcdc": {
        source: "iana"
      },
      "application/vnd.oma.dd2+xml": {
        source: "iana",
        compressible: true,
        extensions: ["dd2"]
      },
      "application/vnd.oma.drm.risd+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.group-usage-list+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.lwm2m+cbor": {
        source: "iana"
      },
      "application/vnd.oma.lwm2m+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.lwm2m+tlv": {
        source: "iana"
      },
      "application/vnd.oma.pal+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.poc.detailed-progress-report+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.poc.final-report+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.poc.groups+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.poc.invocation-descriptor+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.poc.optimized-progress-report+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.push": {
        source: "iana"
      },
      "application/vnd.oma.scidm.messages+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.xcap-directory+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.omads-email+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/vnd.omads-file+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/vnd.omads-folder+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/vnd.omaloc-supl-init": {
        source: "iana"
      },
      "application/vnd.onepager": {
        source: "iana"
      },
      "application/vnd.onepagertamp": {
        source: "iana"
      },
      "application/vnd.onepagertamx": {
        source: "iana"
      },
      "application/vnd.onepagertat": {
        source: "iana"
      },
      "application/vnd.onepagertatp": {
        source: "iana"
      },
      "application/vnd.onepagertatx": {
        source: "iana"
      },
      "application/vnd.openblox.game+xml": {
        source: "iana",
        compressible: true,
        extensions: ["obgx"]
      },
      "application/vnd.openblox.game-binary": {
        source: "iana"
      },
      "application/vnd.openeye.oeb": {
        source: "iana"
      },
      "application/vnd.openofficeorg.extension": {
        source: "apache",
        extensions: ["oxt"]
      },
      "application/vnd.openstreetmap.data+xml": {
        source: "iana",
        compressible: true,
        extensions: ["osm"]
      },
      "application/vnd.opentimestamps.ots": {
        source: "iana"
      },
      "application/vnd.openxmlformats-officedocument.custom-properties+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.customxmlproperties+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.drawing+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.drawingml.chart+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.drawingml.diagramcolors+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.drawingml.diagramdata+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.drawingml.diagramlayout+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.drawingml.diagramstyle+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.extended-properties+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.commentauthors+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.comments+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.handoutmaster+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.notesmaster+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.notesslide+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.presentation": {
        source: "iana",
        compressible: false,
        extensions: ["pptx"]
      },
      "application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.presprops+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.slide": {
        source: "iana",
        extensions: ["sldx"]
      },
      "application/vnd.openxmlformats-officedocument.presentationml.slide+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.slidelayout+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.slidemaster+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.slideshow": {
        source: "iana",
        extensions: ["ppsx"]
      },
      "application/vnd.openxmlformats-officedocument.presentationml.slideshow.main+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.slideupdateinfo+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.tablestyles+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.tags+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.template": {
        source: "iana",
        extensions: ["potx"]
      },
      "application/vnd.openxmlformats-officedocument.presentationml.template.main+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.viewprops+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.calcchain+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.externallink+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcachedefinition+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcacherecords+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.pivottable+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.querytable+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionheaders+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionlog+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sharedstrings+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
        source: "iana",
        compressible: false,
        extensions: ["xlsx"]
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheetmetadata+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.tablesinglecells+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.template": {
        source: "iana",
        extensions: ["xltx"]
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.usernames+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.volatiledependencies+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.theme+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.themeoverride+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.vmldrawing": {
        source: "iana"
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
        source: "iana",
        compressible: false,
        extensions: ["docx"]
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document.glossary+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.endnotes+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.fonttable+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.template": {
        source: "iana",
        extensions: ["dotx"]
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.template.main+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.websettings+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-package.core-properties+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-package.digital-signature-xmlsignature+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-package.relationships+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oracle.resource+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.orange.indata": {
        source: "iana"
      },
      "application/vnd.osa.netdeploy": {
        source: "iana"
      },
      "application/vnd.osgeo.mapguide.package": {
        source: "iana",
        extensions: ["mgp"]
      },
      "application/vnd.osgi.bundle": {
        source: "iana"
      },
      "application/vnd.osgi.dp": {
        source: "iana",
        extensions: ["dp"]
      },
      "application/vnd.osgi.subsystem": {
        source: "iana",
        extensions: ["esa"]
      },
      "application/vnd.otps.ct-kip+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oxli.countgraph": {
        source: "iana"
      },
      "application/vnd.pagerduty+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.palm": {
        source: "iana",
        extensions: ["pdb", "pqa", "oprc"]
      },
      "application/vnd.panoply": {
        source: "iana"
      },
      "application/vnd.paos.xml": {
        source: "iana"
      },
      "application/vnd.patentdive": {
        source: "iana"
      },
      "application/vnd.patientecommsdoc": {
        source: "iana"
      },
      "application/vnd.pawaafile": {
        source: "iana",
        extensions: ["paw"]
      },
      "application/vnd.pcos": {
        source: "iana"
      },
      "application/vnd.pg.format": {
        source: "iana",
        extensions: ["str"]
      },
      "application/vnd.pg.osasli": {
        source: "iana",
        extensions: ["ei6"]
      },
      "application/vnd.piaccess.application-licence": {
        source: "iana"
      },
      "application/vnd.picsel": {
        source: "iana",
        extensions: ["efif"]
      },
      "application/vnd.pmi.widget": {
        source: "iana",
        extensions: ["wg"]
      },
      "application/vnd.poc.group-advertisement+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.pocketlearn": {
        source: "iana",
        extensions: ["plf"]
      },
      "application/vnd.powerbuilder6": {
        source: "iana",
        extensions: ["pbd"]
      },
      "application/vnd.powerbuilder6-s": {
        source: "iana"
      },
      "application/vnd.powerbuilder7": {
        source: "iana"
      },
      "application/vnd.powerbuilder7-s": {
        source: "iana"
      },
      "application/vnd.powerbuilder75": {
        source: "iana"
      },
      "application/vnd.powerbuilder75-s": {
        source: "iana"
      },
      "application/vnd.preminet": {
        source: "iana"
      },
      "application/vnd.previewsystems.box": {
        source: "iana",
        extensions: ["box"]
      },
      "application/vnd.proteus.magazine": {
        source: "iana",
        extensions: ["mgz"]
      },
      "application/vnd.psfs": {
        source: "iana"
      },
      "application/vnd.publishare-delta-tree": {
        source: "iana",
        extensions: ["qps"]
      },
      "application/vnd.pvi.ptid1": {
        source: "iana",
        extensions: ["ptid"]
      },
      "application/vnd.pwg-multiplexed": {
        source: "iana"
      },
      "application/vnd.pwg-xhtml-print+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.qualcomm.brew-app-res": {
        source: "iana"
      },
      "application/vnd.quarantainenet": {
        source: "iana"
      },
      "application/vnd.quark.quarkxpress": {
        source: "iana",
        extensions: ["qxd", "qxt", "qwd", "qwt", "qxl", "qxb"]
      },
      "application/vnd.quobject-quoxdocument": {
        source: "iana"
      },
      "application/vnd.radisys.moml+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-audit+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-audit-conf+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-audit-conn+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-audit-dialog+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-audit-stream+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-conf+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-dialog+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-dialog-base+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-dialog-fax-detect+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-dialog-fax-sendrecv+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-dialog-group+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-dialog-speech+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-dialog-transform+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.rainstor.data": {
        source: "iana"
      },
      "application/vnd.rapid": {
        source: "iana"
      },
      "application/vnd.rar": {
        source: "iana",
        extensions: ["rar"]
      },
      "application/vnd.realvnc.bed": {
        source: "iana",
        extensions: ["bed"]
      },
      "application/vnd.recordare.musicxml": {
        source: "iana",
        extensions: ["mxl"]
      },
      "application/vnd.recordare.musicxml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["musicxml"]
      },
      "application/vnd.renlearn.rlprint": {
        source: "iana"
      },
      "application/vnd.resilient.logic": {
        source: "iana"
      },
      "application/vnd.restful+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.rig.cryptonote": {
        source: "iana",
        extensions: ["cryptonote"]
      },
      "application/vnd.rim.cod": {
        source: "apache",
        extensions: ["cod"]
      },
      "application/vnd.rn-realmedia": {
        source: "apache",
        extensions: ["rm"]
      },
      "application/vnd.rn-realmedia-vbr": {
        source: "apache",
        extensions: ["rmvb"]
      },
      "application/vnd.route66.link66+xml": {
        source: "iana",
        compressible: true,
        extensions: ["link66"]
      },
      "application/vnd.rs-274x": {
        source: "iana"
      },
      "application/vnd.ruckus.download": {
        source: "iana"
      },
      "application/vnd.s3sms": {
        source: "iana"
      },
      "application/vnd.sailingtracker.track": {
        source: "iana",
        extensions: ["st"]
      },
      "application/vnd.sar": {
        source: "iana"
      },
      "application/vnd.sbm.cid": {
        source: "iana"
      },
      "application/vnd.sbm.mid2": {
        source: "iana"
      },
      "application/vnd.scribus": {
        source: "iana"
      },
      "application/vnd.sealed.3df": {
        source: "iana"
      },
      "application/vnd.sealed.csf": {
        source: "iana"
      },
      "application/vnd.sealed.doc": {
        source: "iana"
      },
      "application/vnd.sealed.eml": {
        source: "iana"
      },
      "application/vnd.sealed.mht": {
        source: "iana"
      },
      "application/vnd.sealed.net": {
        source: "iana"
      },
      "application/vnd.sealed.ppt": {
        source: "iana"
      },
      "application/vnd.sealed.tiff": {
        source: "iana"
      },
      "application/vnd.sealed.xls": {
        source: "iana"
      },
      "application/vnd.sealedmedia.softseal.html": {
        source: "iana"
      },
      "application/vnd.sealedmedia.softseal.pdf": {
        source: "iana"
      },
      "application/vnd.seemail": {
        source: "iana",
        extensions: ["see"]
      },
      "application/vnd.seis+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.sema": {
        source: "iana",
        extensions: ["sema"]
      },
      "application/vnd.semd": {
        source: "iana",
        extensions: ["semd"]
      },
      "application/vnd.semf": {
        source: "iana",
        extensions: ["semf"]
      },
      "application/vnd.shade-save-file": {
        source: "iana"
      },
      "application/vnd.shana.informed.formdata": {
        source: "iana",
        extensions: ["ifm"]
      },
      "application/vnd.shana.informed.formtemplate": {
        source: "iana",
        extensions: ["itp"]
      },
      "application/vnd.shana.informed.interchange": {
        source: "iana",
        extensions: ["iif"]
      },
      "application/vnd.shana.informed.package": {
        source: "iana",
        extensions: ["ipk"]
      },
      "application/vnd.shootproof+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.shopkick+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.shp": {
        source: "iana"
      },
      "application/vnd.shx": {
        source: "iana"
      },
      "application/vnd.sigrok.session": {
        source: "iana"
      },
      "application/vnd.simtech-mindmapper": {
        source: "iana",
        extensions: ["twd", "twds"]
      },
      "application/vnd.siren+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.smaf": {
        source: "iana",
        extensions: ["mmf"]
      },
      "application/vnd.smart.notebook": {
        source: "iana"
      },
      "application/vnd.smart.teacher": {
        source: "iana",
        extensions: ["teacher"]
      },
      "application/vnd.snesdev-page-table": {
        source: "iana"
      },
      "application/vnd.software602.filler.form+xml": {
        source: "iana",
        compressible: true,
        extensions: ["fo"]
      },
      "application/vnd.software602.filler.form-xml-zip": {
        source: "iana"
      },
      "application/vnd.solent.sdkm+xml": {
        source: "iana",
        compressible: true,
        extensions: ["sdkm", "sdkd"]
      },
      "application/vnd.spotfire.dxp": {
        source: "iana",
        extensions: ["dxp"]
      },
      "application/vnd.spotfire.sfs": {
        source: "iana",
        extensions: ["sfs"]
      },
      "application/vnd.sqlite3": {
        source: "iana"
      },
      "application/vnd.sss-cod": {
        source: "iana"
      },
      "application/vnd.sss-dtf": {
        source: "iana"
      },
      "application/vnd.sss-ntf": {
        source: "iana"
      },
      "application/vnd.stardivision.calc": {
        source: "apache",
        extensions: ["sdc"]
      },
      "application/vnd.stardivision.draw": {
        source: "apache",
        extensions: ["sda"]
      },
      "application/vnd.stardivision.impress": {
        source: "apache",
        extensions: ["sdd"]
      },
      "application/vnd.stardivision.math": {
        source: "apache",
        extensions: ["smf"]
      },
      "application/vnd.stardivision.writer": {
        source: "apache",
        extensions: ["sdw", "vor"]
      },
      "application/vnd.stardivision.writer-global": {
        source: "apache",
        extensions: ["sgl"]
      },
      "application/vnd.stepmania.package": {
        source: "iana",
        extensions: ["smzip"]
      },
      "application/vnd.stepmania.stepchart": {
        source: "iana",
        extensions: ["sm"]
      },
      "application/vnd.street-stream": {
        source: "iana"
      },
      "application/vnd.sun.wadl+xml": {
        source: "iana",
        compressible: true,
        extensions: ["wadl"]
      },
      "application/vnd.sun.xml.calc": {
        source: "apache",
        extensions: ["sxc"]
      },
      "application/vnd.sun.xml.calc.template": {
        source: "apache",
        extensions: ["stc"]
      },
      "application/vnd.sun.xml.draw": {
        source: "apache",
        extensions: ["sxd"]
      },
      "application/vnd.sun.xml.draw.template": {
        source: "apache",
        extensions: ["std"]
      },
      "application/vnd.sun.xml.impress": {
        source: "apache",
        extensions: ["sxi"]
      },
      "application/vnd.sun.xml.impress.template": {
        source: "apache",
        extensions: ["sti"]
      },
      "application/vnd.sun.xml.math": {
        source: "apache",
        extensions: ["sxm"]
      },
      "application/vnd.sun.xml.writer": {
        source: "apache",
        extensions: ["sxw"]
      },
      "application/vnd.sun.xml.writer.global": {
        source: "apache",
        extensions: ["sxg"]
      },
      "application/vnd.sun.xml.writer.template": {
        source: "apache",
        extensions: ["stw"]
      },
      "application/vnd.sus-calendar": {
        source: "iana",
        extensions: ["sus", "susp"]
      },
      "application/vnd.svd": {
        source: "iana",
        extensions: ["svd"]
      },
      "application/vnd.swiftview-ics": {
        source: "iana"
      },
      "application/vnd.sycle+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.syft+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.symbian.install": {
        source: "apache",
        extensions: ["sis", "sisx"]
      },
      "application/vnd.syncml+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["xsm"]
      },
      "application/vnd.syncml.dm+wbxml": {
        source: "iana",
        charset: "UTF-8",
        extensions: ["bdm"]
      },
      "application/vnd.syncml.dm+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["xdm"]
      },
      "application/vnd.syncml.dm.notification": {
        source: "iana"
      },
      "application/vnd.syncml.dmddf+wbxml": {
        source: "iana"
      },
      "application/vnd.syncml.dmddf+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["ddf"]
      },
      "application/vnd.syncml.dmtnds+wbxml": {
        source: "iana"
      },
      "application/vnd.syncml.dmtnds+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/vnd.syncml.ds.notification": {
        source: "iana"
      },
      "application/vnd.tableschema+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.tao.intent-module-archive": {
        source: "iana",
        extensions: ["tao"]
      },
      "application/vnd.tcpdump.pcap": {
        source: "iana",
        extensions: ["pcap", "cap", "dmp"]
      },
      "application/vnd.think-cell.ppttc+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.tmd.mediaflex.api+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.tml": {
        source: "iana"
      },
      "application/vnd.tmobile-livetv": {
        source: "iana",
        extensions: ["tmo"]
      },
      "application/vnd.tri.onesource": {
        source: "iana"
      },
      "application/vnd.trid.tpt": {
        source: "iana",
        extensions: ["tpt"]
      },
      "application/vnd.triscape.mxs": {
        source: "iana",
        extensions: ["mxs"]
      },
      "application/vnd.trueapp": {
        source: "iana",
        extensions: ["tra"]
      },
      "application/vnd.truedoc": {
        source: "iana"
      },
      "application/vnd.ubisoft.webplayer": {
        source: "iana"
      },
      "application/vnd.ufdl": {
        source: "iana",
        extensions: ["ufd", "ufdl"]
      },
      "application/vnd.uiq.theme": {
        source: "iana",
        extensions: ["utz"]
      },
      "application/vnd.umajin": {
        source: "iana",
        extensions: ["umj"]
      },
      "application/vnd.unity": {
        source: "iana",
        extensions: ["unityweb"]
      },
      "application/vnd.uoml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["uoml"]
      },
      "application/vnd.uplanet.alert": {
        source: "iana"
      },
      "application/vnd.uplanet.alert-wbxml": {
        source: "iana"
      },
      "application/vnd.uplanet.bearer-choice": {
        source: "iana"
      },
      "application/vnd.uplanet.bearer-choice-wbxml": {
        source: "iana"
      },
      "application/vnd.uplanet.cacheop": {
        source: "iana"
      },
      "application/vnd.uplanet.cacheop-wbxml": {
        source: "iana"
      },
      "application/vnd.uplanet.channel": {
        source: "iana"
      },
      "application/vnd.uplanet.channel-wbxml": {
        source: "iana"
      },
      "application/vnd.uplanet.list": {
        source: "iana"
      },
      "application/vnd.uplanet.list-wbxml": {
        source: "iana"
      },
      "application/vnd.uplanet.listcmd": {
        source: "iana"
      },
      "application/vnd.uplanet.listcmd-wbxml": {
        source: "iana"
      },
      "application/vnd.uplanet.signal": {
        source: "iana"
      },
      "application/vnd.uri-map": {
        source: "iana"
      },
      "application/vnd.valve.source.material": {
        source: "iana"
      },
      "application/vnd.vcx": {
        source: "iana",
        extensions: ["vcx"]
      },
      "application/vnd.vd-study": {
        source: "iana"
      },
      "application/vnd.vectorworks": {
        source: "iana"
      },
      "application/vnd.vel+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.verimatrix.vcas": {
        source: "iana"
      },
      "application/vnd.veritone.aion+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.veryant.thin": {
        source: "iana"
      },
      "application/vnd.ves.encrypted": {
        source: "iana"
      },
      "application/vnd.vidsoft.vidconference": {
        source: "iana"
      },
      "application/vnd.visio": {
        source: "iana",
        extensions: ["vsd", "vst", "vss", "vsw"]
      },
      "application/vnd.visionary": {
        source: "iana",
        extensions: ["vis"]
      },
      "application/vnd.vividence.scriptfile": {
        source: "iana"
      },
      "application/vnd.vsf": {
        source: "iana",
        extensions: ["vsf"]
      },
      "application/vnd.wap.sic": {
        source: "iana"
      },
      "application/vnd.wap.slc": {
        source: "iana"
      },
      "application/vnd.wap.wbxml": {
        source: "iana",
        charset: "UTF-8",
        extensions: ["wbxml"]
      },
      "application/vnd.wap.wmlc": {
        source: "iana",
        extensions: ["wmlc"]
      },
      "application/vnd.wap.wmlscriptc": {
        source: "iana",
        extensions: ["wmlsc"]
      },
      "application/vnd.webturbo": {
        source: "iana",
        extensions: ["wtb"]
      },
      "application/vnd.wfa.dpp": {
        source: "iana"
      },
      "application/vnd.wfa.p2p": {
        source: "iana"
      },
      "application/vnd.wfa.wsc": {
        source: "iana"
      },
      "application/vnd.windows.devicepairing": {
        source: "iana"
      },
      "application/vnd.wmc": {
        source: "iana"
      },
      "application/vnd.wmf.bootstrap": {
        source: "iana"
      },
      "application/vnd.wolfram.mathematica": {
        source: "iana"
      },
      "application/vnd.wolfram.mathematica.package": {
        source: "iana"
      },
      "application/vnd.wolfram.player": {
        source: "iana",
        extensions: ["nbp"]
      },
      "application/vnd.wordperfect": {
        source: "iana",
        extensions: ["wpd"]
      },
      "application/vnd.wqd": {
        source: "iana",
        extensions: ["wqd"]
      },
      "application/vnd.wrq-hp3000-labelled": {
        source: "iana"
      },
      "application/vnd.wt.stf": {
        source: "iana",
        extensions: ["stf"]
      },
      "application/vnd.wv.csp+wbxml": {
        source: "iana"
      },
      "application/vnd.wv.csp+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.wv.ssp+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.xacml+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.xara": {
        source: "iana",
        extensions: ["xar"]
      },
      "application/vnd.xfdl": {
        source: "iana",
        extensions: ["xfdl"]
      },
      "application/vnd.xfdl.webform": {
        source: "iana"
      },
      "application/vnd.xmi+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.xmpie.cpkg": {
        source: "iana"
      },
      "application/vnd.xmpie.dpkg": {
        source: "iana"
      },
      "application/vnd.xmpie.plan": {
        source: "iana"
      },
      "application/vnd.xmpie.ppkg": {
        source: "iana"
      },
      "application/vnd.xmpie.xlim": {
        source: "iana"
      },
      "application/vnd.yamaha.hv-dic": {
        source: "iana",
        extensions: ["hvd"]
      },
      "application/vnd.yamaha.hv-script": {
        source: "iana",
        extensions: ["hvs"]
      },
      "application/vnd.yamaha.hv-voice": {
        source: "iana",
        extensions: ["hvp"]
      },
      "application/vnd.yamaha.openscoreformat": {
        source: "iana",
        extensions: ["osf"]
      },
      "application/vnd.yamaha.openscoreformat.osfpvg+xml": {
        source: "iana",
        compressible: true,
        extensions: ["osfpvg"]
      },
      "application/vnd.yamaha.remote-setup": {
        source: "iana"
      },
      "application/vnd.yamaha.smaf-audio": {
        source: "iana",
        extensions: ["saf"]
      },
      "application/vnd.yamaha.smaf-phrase": {
        source: "iana",
        extensions: ["spf"]
      },
      "application/vnd.yamaha.through-ngn": {
        source: "iana"
      },
      "application/vnd.yamaha.tunnel-udpencap": {
        source: "iana"
      },
      "application/vnd.yaoweme": {
        source: "iana"
      },
      "application/vnd.yellowriver-custom-menu": {
        source: "iana",
        extensions: ["cmp"]
      },
      "application/vnd.youtube.yt": {
        source: "iana"
      },
      "application/vnd.zul": {
        source: "iana",
        extensions: ["zir", "zirz"]
      },
      "application/vnd.zzazz.deck+xml": {
        source: "iana",
        compressible: true,
        extensions: ["zaz"]
      },
      "application/voicexml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["vxml"]
      },
      "application/voucher-cms+json": {
        source: "iana",
        compressible: true
      },
      "application/vq-rtcpxr": {
        source: "iana"
      },
      "application/wasm": {
        source: "iana",
        compressible: true,
        extensions: ["wasm"]
      },
      "application/watcherinfo+xml": {
        source: "iana",
        compressible: true,
        extensions: ["wif"]
      },
      "application/webpush-options+json": {
        source: "iana",
        compressible: true
      },
      "application/whoispp-query": {
        source: "iana"
      },
      "application/whoispp-response": {
        source: "iana"
      },
      "application/widget": {
        source: "iana",
        extensions: ["wgt"]
      },
      "application/winhlp": {
        source: "apache",
        extensions: ["hlp"]
      },
      "application/wita": {
        source: "iana"
      },
      "application/wordperfect5.1": {
        source: "iana"
      },
      "application/wsdl+xml": {
        source: "iana",
        compressible: true,
        extensions: ["wsdl"]
      },
      "application/wspolicy+xml": {
        source: "iana",
        compressible: true,
        extensions: ["wspolicy"]
      },
      "application/x-7z-compressed": {
        source: "apache",
        compressible: false,
        extensions: ["7z"]
      },
      "application/x-abiword": {
        source: "apache",
        extensions: ["abw"]
      },
      "application/x-ace-compressed": {
        source: "apache",
        extensions: ["ace"]
      },
      "application/x-amf": {
        source: "apache"
      },
      "application/x-apple-diskimage": {
        source: "apache",
        extensions: ["dmg"]
      },
      "application/x-arj": {
        compressible: false,
        extensions: ["arj"]
      },
      "application/x-authorware-bin": {
        source: "apache",
        extensions: ["aab", "x32", "u32", "vox"]
      },
      "application/x-authorware-map": {
        source: "apache",
        extensions: ["aam"]
      },
      "application/x-authorware-seg": {
        source: "apache",
        extensions: ["aas"]
      },
      "application/x-bcpio": {
        source: "apache",
        extensions: ["bcpio"]
      },
      "application/x-bdoc": {
        compressible: false,
        extensions: ["bdoc"]
      },
      "application/x-bittorrent": {
        source: "apache",
        extensions: ["torrent"]
      },
      "application/x-blorb": {
        source: "apache",
        extensions: ["blb", "blorb"]
      },
      "application/x-bzip": {
        source: "apache",
        compressible: false,
        extensions: ["bz"]
      },
      "application/x-bzip2": {
        source: "apache",
        compressible: false,
        extensions: ["bz2", "boz"]
      },
      "application/x-cbr": {
        source: "apache",
        extensions: ["cbr", "cba", "cbt", "cbz", "cb7"]
      },
      "application/x-cdlink": {
        source: "apache",
        extensions: ["vcd"]
      },
      "application/x-cfs-compressed": {
        source: "apache",
        extensions: ["cfs"]
      },
      "application/x-chat": {
        source: "apache",
        extensions: ["chat"]
      },
      "application/x-chess-pgn": {
        source: "apache",
        extensions: ["pgn"]
      },
      "application/x-chrome-extension": {
        extensions: ["crx"]
      },
      "application/x-cocoa": {
        source: "nginx",
        extensions: ["cco"]
      },
      "application/x-compress": {
        source: "apache"
      },
      "application/x-conference": {
        source: "apache",
        extensions: ["nsc"]
      },
      "application/x-cpio": {
        source: "apache",
        extensions: ["cpio"]
      },
      "application/x-csh": {
        source: "apache",
        extensions: ["csh"]
      },
      "application/x-deb": {
        compressible: false
      },
      "application/x-debian-package": {
        source: "apache",
        extensions: ["deb", "udeb"]
      },
      "application/x-dgc-compressed": {
        source: "apache",
        extensions: ["dgc"]
      },
      "application/x-director": {
        source: "apache",
        extensions: ["dir", "dcr", "dxr", "cst", "cct", "cxt", "w3d", "fgd", "swa"]
      },
      "application/x-doom": {
        source: "apache",
        extensions: ["wad"]
      },
      "application/x-dtbncx+xml": {
        source: "apache",
        compressible: true,
        extensions: ["ncx"]
      },
      "application/x-dtbook+xml": {
        source: "apache",
        compressible: true,
        extensions: ["dtb"]
      },
      "application/x-dtbresource+xml": {
        source: "apache",
        compressible: true,
        extensions: ["res"]
      },
      "application/x-dvi": {
        source: "apache",
        compressible: false,
        extensions: ["dvi"]
      },
      "application/x-envoy": {
        source: "apache",
        extensions: ["evy"]
      },
      "application/x-eva": {
        source: "apache",
        extensions: ["eva"]
      },
      "application/x-font-bdf": {
        source: "apache",
        extensions: ["bdf"]
      },
      "application/x-font-dos": {
        source: "apache"
      },
      "application/x-font-framemaker": {
        source: "apache"
      },
      "application/x-font-ghostscript": {
        source: "apache",
        extensions: ["gsf"]
      },
      "application/x-font-libgrx": {
        source: "apache"
      },
      "application/x-font-linux-psf": {
        source: "apache",
        extensions: ["psf"]
      },
      "application/x-font-pcf": {
        source: "apache",
        extensions: ["pcf"]
      },
      "application/x-font-snf": {
        source: "apache",
        extensions: ["snf"]
      },
      "application/x-font-speedo": {
        source: "apache"
      },
      "application/x-font-sunos-news": {
        source: "apache"
      },
      "application/x-font-type1": {
        source: "apache",
        extensions: ["pfa", "pfb", "pfm", "afm"]
      },
      "application/x-font-vfont": {
        source: "apache"
      },
      "application/x-freearc": {
        source: "apache",
        extensions: ["arc"]
      },
      "application/x-futuresplash": {
        source: "apache",
        extensions: ["spl"]
      },
      "application/x-gca-compressed": {
        source: "apache",
        extensions: ["gca"]
      },
      "application/x-glulx": {
        source: "apache",
        extensions: ["ulx"]
      },
      "application/x-gnumeric": {
        source: "apache",
        extensions: ["gnumeric"]
      },
      "application/x-gramps-xml": {
        source: "apache",
        extensions: ["gramps"]
      },
      "application/x-gtar": {
        source: "apache",
        extensions: ["gtar"]
      },
      "application/x-gzip": {
        source: "apache"
      },
      "application/x-hdf": {
        source: "apache",
        extensions: ["hdf"]
      },
      "application/x-httpd-php": {
        compressible: true,
        extensions: ["php"]
      },
      "application/x-install-instructions": {
        source: "apache",
        extensions: ["install"]
      },
      "application/x-iso9660-image": {
        source: "apache",
        extensions: ["iso"]
      },
      "application/x-iwork-keynote-sffkey": {
        extensions: ["key"]
      },
      "application/x-iwork-numbers-sffnumbers": {
        extensions: ["numbers"]
      },
      "application/x-iwork-pages-sffpages": {
        extensions: ["pages"]
      },
      "application/x-java-archive-diff": {
        source: "nginx",
        extensions: ["jardiff"]
      },
      "application/x-java-jnlp-file": {
        source: "apache",
        compressible: false,
        extensions: ["jnlp"]
      },
      "application/x-javascript": {
        compressible: true
      },
      "application/x-keepass2": {
        extensions: ["kdbx"]
      },
      "application/x-latex": {
        source: "apache",
        compressible: false,
        extensions: ["latex"]
      },
      "application/x-lua-bytecode": {
        extensions: ["luac"]
      },
      "application/x-lzh-compressed": {
        source: "apache",
        extensions: ["lzh", "lha"]
      },
      "application/x-makeself": {
        source: "nginx",
        extensions: ["run"]
      },
      "application/x-mie": {
        source: "apache",
        extensions: ["mie"]
      },
      "application/x-mobipocket-ebook": {
        source: "apache",
        extensions: ["prc", "mobi"]
      },
      "application/x-mpegurl": {
        compressible: false
      },
      "application/x-ms-application": {
        source: "apache",
        extensions: ["application"]
      },
      "application/x-ms-shortcut": {
        source: "apache",
        extensions: ["lnk"]
      },
      "application/x-ms-wmd": {
        source: "apache",
        extensions: ["wmd"]
      },
      "application/x-ms-wmz": {
        source: "apache",
        extensions: ["wmz"]
      },
      "application/x-ms-xbap": {
        source: "apache",
        extensions: ["xbap"]
      },
      "application/x-msaccess": {
        source: "apache",
        extensions: ["mdb"]
      },
      "application/x-msbinder": {
        source: "apache",
        extensions: ["obd"]
      },
      "application/x-mscardfile": {
        source: "apache",
        extensions: ["crd"]
      },
      "application/x-msclip": {
        source: "apache",
        extensions: ["clp"]
      },
      "application/x-msdos-program": {
        extensions: ["exe"]
      },
      "application/x-msdownload": {
        source: "apache",
        extensions: ["exe", "dll", "com", "bat", "msi"]
      },
      "application/x-msmediaview": {
        source: "apache",
        extensions: ["mvb", "m13", "m14"]
      },
      "application/x-msmetafile": {
        source: "apache",
        extensions: ["wmf", "wmz", "emf", "emz"]
      },
      "application/x-msmoney": {
        source: "apache",
        extensions: ["mny"]
      },
      "application/x-mspublisher": {
        source: "apache",
        extensions: ["pub"]
      },
      "application/x-msschedule": {
        source: "apache",
        extensions: ["scd"]
      },
      "application/x-msterminal": {
        source: "apache",
        extensions: ["trm"]
      },
      "application/x-mswrite": {
        source: "apache",
        extensions: ["wri"]
      },
      "application/x-netcdf": {
        source: "apache",
        extensions: ["nc", "cdf"]
      },
      "application/x-ns-proxy-autoconfig": {
        compressible: true,
        extensions: ["pac"]
      },
      "application/x-nzb": {
        source: "apache",
        extensions: ["nzb"]
      },
      "application/x-perl": {
        source: "nginx",
        extensions: ["pl", "pm"]
      },
      "application/x-pilot": {
        source: "nginx",
        extensions: ["prc", "pdb"]
      },
      "application/x-pkcs12": {
        source: "apache",
        compressible: false,
        extensions: ["p12", "pfx"]
      },
      "application/x-pkcs7-certificates": {
        source: "apache",
        extensions: ["p7b", "spc"]
      },
      "application/x-pkcs7-certreqresp": {
        source: "apache",
        extensions: ["p7r"]
      },
      "application/x-pki-message": {
        source: "iana"
      },
      "application/x-rar-compressed": {
        source: "apache",
        compressible: false,
        extensions: ["rar"]
      },
      "application/x-redhat-package-manager": {
        source: "nginx",
        extensions: ["rpm"]
      },
      "application/x-research-info-systems": {
        source: "apache",
        extensions: ["ris"]
      },
      "application/x-sea": {
        source: "nginx",
        extensions: ["sea"]
      },
      "application/x-sh": {
        source: "apache",
        compressible: true,
        extensions: ["sh"]
      },
      "application/x-shar": {
        source: "apache",
        extensions: ["shar"]
      },
      "application/x-shockwave-flash": {
        source: "apache",
        compressible: false,
        extensions: ["swf"]
      },
      "application/x-silverlight-app": {
        source: "apache",
        extensions: ["xap"]
      },
      "application/x-sql": {
        source: "apache",
        extensions: ["sql"]
      },
      "application/x-stuffit": {
        source: "apache",
        compressible: false,
        extensions: ["sit"]
      },
      "application/x-stuffitx": {
        source: "apache",
        extensions: ["sitx"]
      },
      "application/x-subrip": {
        source: "apache",
        extensions: ["srt"]
      },
      "application/x-sv4cpio": {
        source: "apache",
        extensions: ["sv4cpio"]
      },
      "application/x-sv4crc": {
        source: "apache",
        extensions: ["sv4crc"]
      },
      "application/x-t3vm-image": {
        source: "apache",
        extensions: ["t3"]
      },
      "application/x-tads": {
        source: "apache",
        extensions: ["gam"]
      },
      "application/x-tar": {
        source: "apache",
        compressible: true,
        extensions: ["tar"]
      },
      "application/x-tcl": {
        source: "apache",
        extensions: ["tcl", "tk"]
      },
      "application/x-tex": {
        source: "apache",
        extensions: ["tex"]
      },
      "application/x-tex-tfm": {
        source: "apache",
        extensions: ["tfm"]
      },
      "application/x-texinfo": {
        source: "apache",
        extensions: ["texinfo", "texi"]
      },
      "application/x-tgif": {
        source: "apache",
        extensions: ["obj"]
      },
      "application/x-ustar": {
        source: "apache",
        extensions: ["ustar"]
      },
      "application/x-virtualbox-hdd": {
        compressible: true,
        extensions: ["hdd"]
      },
      "application/x-virtualbox-ova": {
        compressible: true,
        extensions: ["ova"]
      },
      "application/x-virtualbox-ovf": {
        compressible: true,
        extensions: ["ovf"]
      },
      "application/x-virtualbox-vbox": {
        compressible: true,
        extensions: ["vbox"]
      },
      "application/x-virtualbox-vbox-extpack": {
        compressible: false,
        extensions: ["vbox-extpack"]
      },
      "application/x-virtualbox-vdi": {
        compressible: true,
        extensions: ["vdi"]
      },
      "application/x-virtualbox-vhd": {
        compressible: true,
        extensions: ["vhd"]
      },
      "application/x-virtualbox-vmdk": {
        compressible: true,
        extensions: ["vmdk"]
      },
      "application/x-wais-source": {
        source: "apache",
        extensions: ["src"]
      },
      "application/x-web-app-manifest+json": {
        compressible: true,
        extensions: ["webapp"]
      },
      "application/x-www-form-urlencoded": {
        source: "iana",
        compressible: true
      },
      "application/x-x509-ca-cert": {
        source: "iana",
        extensions: ["der", "crt", "pem"]
      },
      "application/x-x509-ca-ra-cert": {
        source: "iana"
      },
      "application/x-x509-next-ca-cert": {
        source: "iana"
      },
      "application/x-xfig": {
        source: "apache",
        extensions: ["fig"]
      },
      "application/x-xliff+xml": {
        source: "apache",
        compressible: true,
        extensions: ["xlf"]
      },
      "application/x-xpinstall": {
        source: "apache",
        compressible: false,
        extensions: ["xpi"]
      },
      "application/x-xz": {
        source: "apache",
        extensions: ["xz"]
      },
      "application/x-zmachine": {
        source: "apache",
        extensions: ["z1", "z2", "z3", "z4", "z5", "z6", "z7", "z8"]
      },
      "application/x400-bp": {
        source: "iana"
      },
      "application/xacml+xml": {
        source: "iana",
        compressible: true
      },
      "application/xaml+xml": {
        source: "apache",
        compressible: true,
        extensions: ["xaml"]
      },
      "application/xcap-att+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xav"]
      },
      "application/xcap-caps+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xca"]
      },
      "application/xcap-diff+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xdf"]
      },
      "application/xcap-el+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xel"]
      },
      "application/xcap-error+xml": {
        source: "iana",
        compressible: true
      },
      "application/xcap-ns+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xns"]
      },
      "application/xcon-conference-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/xcon-conference-info-diff+xml": {
        source: "iana",
        compressible: true
      },
      "application/xenc+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xenc"]
      },
      "application/xhtml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xhtml", "xht"]
      },
      "application/xhtml-voice+xml": {
        source: "apache",
        compressible: true
      },
      "application/xliff+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xlf"]
      },
      "application/xml": {
        source: "iana",
        compressible: true,
        extensions: ["xml", "xsl", "xsd", "rng"]
      },
      "application/xml-dtd": {
        source: "iana",
        compressible: true,
        extensions: ["dtd"]
      },
      "application/xml-external-parsed-entity": {
        source: "iana"
      },
      "application/xml-patch+xml": {
        source: "iana",
        compressible: true
      },
      "application/xmpp+xml": {
        source: "iana",
        compressible: true
      },
      "application/xop+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xop"]
      },
      "application/xproc+xml": {
        source: "apache",
        compressible: true,
        extensions: ["xpl"]
      },
      "application/xslt+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xsl", "xslt"]
      },
      "application/xspf+xml": {
        source: "apache",
        compressible: true,
        extensions: ["xspf"]
      },
      "application/xv+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mxml", "xhvml", "xvml", "xvm"]
      },
      "application/yang": {
        source: "iana",
        extensions: ["yang"]
      },
      "application/yang-data+json": {
        source: "iana",
        compressible: true
      },
      "application/yang-data+xml": {
        source: "iana",
        compressible: true
      },
      "application/yang-patch+json": {
        source: "iana",
        compressible: true
      },
      "application/yang-patch+xml": {
        source: "iana",
        compressible: true
      },
      "application/yin+xml": {
        source: "iana",
        compressible: true,
        extensions: ["yin"]
      },
      "application/zip": {
        source: "iana",
        compressible: false,
        extensions: ["zip"]
      },
      "application/zlib": {
        source: "iana"
      },
      "application/zstd": {
        source: "iana"
      },
      "audio/1d-interleaved-parityfec": {
        source: "iana"
      },
      "audio/32kadpcm": {
        source: "iana"
      },
      "audio/3gpp": {
        source: "iana",
        compressible: false,
        extensions: ["3gpp"]
      },
      "audio/3gpp2": {
        source: "iana"
      },
      "audio/aac": {
        source: "iana"
      },
      "audio/ac3": {
        source: "iana"
      },
      "audio/adpcm": {
        source: "apache",
        extensions: ["adp"]
      },
      "audio/amr": {
        source: "iana",
        extensions: ["amr"]
      },
      "audio/amr-wb": {
        source: "iana"
      },
      "audio/amr-wb+": {
        source: "iana"
      },
      "audio/aptx": {
        source: "iana"
      },
      "audio/asc": {
        source: "iana"
      },
      "audio/atrac-advanced-lossless": {
        source: "iana"
      },
      "audio/atrac-x": {
        source: "iana"
      },
      "audio/atrac3": {
        source: "iana"
      },
      "audio/basic": {
        source: "iana",
        compressible: false,
        extensions: ["au", "snd"]
      },
      "audio/bv16": {
        source: "iana"
      },
      "audio/bv32": {
        source: "iana"
      },
      "audio/clearmode": {
        source: "iana"
      },
      "audio/cn": {
        source: "iana"
      },
      "audio/dat12": {
        source: "iana"
      },
      "audio/dls": {
        source: "iana"
      },
      "audio/dsr-es201108": {
        source: "iana"
      },
      "audio/dsr-es202050": {
        source: "iana"
      },
      "audio/dsr-es202211": {
        source: "iana"
      },
      "audio/dsr-es202212": {
        source: "iana"
      },
      "audio/dv": {
        source: "iana"
      },
      "audio/dvi4": {
        source: "iana"
      },
      "audio/eac3": {
        source: "iana"
      },
      "audio/encaprtp": {
        source: "iana"
      },
      "audio/evrc": {
        source: "iana"
      },
      "audio/evrc-qcp": {
        source: "iana"
      },
      "audio/evrc0": {
        source: "iana"
      },
      "audio/evrc1": {
        source: "iana"
      },
      "audio/evrcb": {
        source: "iana"
      },
      "audio/evrcb0": {
        source: "iana"
      },
      "audio/evrcb1": {
        source: "iana"
      },
      "audio/evrcnw": {
        source: "iana"
      },
      "audio/evrcnw0": {
        source: "iana"
      },
      "audio/evrcnw1": {
        source: "iana"
      },
      "audio/evrcwb": {
        source: "iana"
      },
      "audio/evrcwb0": {
        source: "iana"
      },
      "audio/evrcwb1": {
        source: "iana"
      },
      "audio/evs": {
        source: "iana"
      },
      "audio/flexfec": {
        source: "iana"
      },
      "audio/fwdred": {
        source: "iana"
      },
      "audio/g711-0": {
        source: "iana"
      },
      "audio/g719": {
        source: "iana"
      },
      "audio/g722": {
        source: "iana"
      },
      "audio/g7221": {
        source: "iana"
      },
      "audio/g723": {
        source: "iana"
      },
      "audio/g726-16": {
        source: "iana"
      },
      "audio/g726-24": {
        source: "iana"
      },
      "audio/g726-32": {
        source: "iana"
      },
      "audio/g726-40": {
        source: "iana"
      },
      "audio/g728": {
        source: "iana"
      },
      "audio/g729": {
        source: "iana"
      },
      "audio/g7291": {
        source: "iana"
      },
      "audio/g729d": {
        source: "iana"
      },
      "audio/g729e": {
        source: "iana"
      },
      "audio/gsm": {
        source: "iana"
      },
      "audio/gsm-efr": {
        source: "iana"
      },
      "audio/gsm-hr-08": {
        source: "iana"
      },
      "audio/ilbc": {
        source: "iana"
      },
      "audio/ip-mr_v2.5": {
        source: "iana"
      },
      "audio/isac": {
        source: "apache"
      },
      "audio/l16": {
        source: "iana"
      },
      "audio/l20": {
        source: "iana"
      },
      "audio/l24": {
        source: "iana",
        compressible: false
      },
      "audio/l8": {
        source: "iana"
      },
      "audio/lpc": {
        source: "iana"
      },
      "audio/melp": {
        source: "iana"
      },
      "audio/melp1200": {
        source: "iana"
      },
      "audio/melp2400": {
        source: "iana"
      },
      "audio/melp600": {
        source: "iana"
      },
      "audio/mhas": {
        source: "iana"
      },
      "audio/midi": {
        source: "apache",
        extensions: ["mid", "midi", "kar", "rmi"]
      },
      "audio/mobile-xmf": {
        source: "iana",
        extensions: ["mxmf"]
      },
      "audio/mp3": {
        compressible: false,
        extensions: ["mp3"]
      },
      "audio/mp4": {
        source: "iana",
        compressible: false,
        extensions: ["m4a", "mp4a"]
      },
      "audio/mp4a-latm": {
        source: "iana"
      },
      "audio/mpa": {
        source: "iana"
      },
      "audio/mpa-robust": {
        source: "iana"
      },
      "audio/mpeg": {
        source: "iana",
        compressible: false,
        extensions: ["mpga", "mp2", "mp2a", "mp3", "m2a", "m3a"]
      },
      "audio/mpeg4-generic": {
        source: "iana"
      },
      "audio/musepack": {
        source: "apache"
      },
      "audio/ogg": {
        source: "iana",
        compressible: false,
        extensions: ["oga", "ogg", "spx", "opus"]
      },
      "audio/opus": {
        source: "iana"
      },
      "audio/parityfec": {
        source: "iana"
      },
      "audio/pcma": {
        source: "iana"
      },
      "audio/pcma-wb": {
        source: "iana"
      },
      "audio/pcmu": {
        source: "iana"
      },
      "audio/pcmu-wb": {
        source: "iana"
      },
      "audio/prs.sid": {
        source: "iana"
      },
      "audio/qcelp": {
        source: "iana"
      },
      "audio/raptorfec": {
        source: "iana"
      },
      "audio/red": {
        source: "iana"
      },
      "audio/rtp-enc-aescm128": {
        source: "iana"
      },
      "audio/rtp-midi": {
        source: "iana"
      },
      "audio/rtploopback": {
        source: "iana"
      },
      "audio/rtx": {
        source: "iana"
      },
      "audio/s3m": {
        source: "apache",
        extensions: ["s3m"]
      },
      "audio/scip": {
        source: "iana"
      },
      "audio/silk": {
        source: "apache",
        extensions: ["sil"]
      },
      "audio/smv": {
        source: "iana"
      },
      "audio/smv-qcp": {
        source: "iana"
      },
      "audio/smv0": {
        source: "iana"
      },
      "audio/sofa": {
        source: "iana"
      },
      "audio/sp-midi": {
        source: "iana"
      },
      "audio/speex": {
        source: "iana"
      },
      "audio/t140c": {
        source: "iana"
      },
      "audio/t38": {
        source: "iana"
      },
      "audio/telephone-event": {
        source: "iana"
      },
      "audio/tetra_acelp": {
        source: "iana"
      },
      "audio/tetra_acelp_bb": {
        source: "iana"
      },
      "audio/tone": {
        source: "iana"
      },
      "audio/tsvcis": {
        source: "iana"
      },
      "audio/uemclip": {
        source: "iana"
      },
      "audio/ulpfec": {
        source: "iana"
      },
      "audio/usac": {
        source: "iana"
      },
      "audio/vdvi": {
        source: "iana"
      },
      "audio/vmr-wb": {
        source: "iana"
      },
      "audio/vnd.3gpp.iufp": {
        source: "iana"
      },
      "audio/vnd.4sb": {
        source: "iana"
      },
      "audio/vnd.audiokoz": {
        source: "iana"
      },
      "audio/vnd.celp": {
        source: "iana"
      },
      "audio/vnd.cisco.nse": {
        source: "iana"
      },
      "audio/vnd.cmles.radio-events": {
        source: "iana"
      },
      "audio/vnd.cns.anp1": {
        source: "iana"
      },
      "audio/vnd.cns.inf1": {
        source: "iana"
      },
      "audio/vnd.dece.audio": {
        source: "iana",
        extensions: ["uva", "uvva"]
      },
      "audio/vnd.digital-winds": {
        source: "iana",
        extensions: ["eol"]
      },
      "audio/vnd.dlna.adts": {
        source: "iana"
      },
      "audio/vnd.dolby.heaac.1": {
        source: "iana"
      },
      "audio/vnd.dolby.heaac.2": {
        source: "iana"
      },
      "audio/vnd.dolby.mlp": {
        source: "iana"
      },
      "audio/vnd.dolby.mps": {
        source: "iana"
      },
      "audio/vnd.dolby.pl2": {
        source: "iana"
      },
      "audio/vnd.dolby.pl2x": {
        source: "iana"
      },
      "audio/vnd.dolby.pl2z": {
        source: "iana"
      },
      "audio/vnd.dolby.pulse.1": {
        source: "iana"
      },
      "audio/vnd.dra": {
        source: "iana",
        extensions: ["dra"]
      },
      "audio/vnd.dts": {
        source: "iana",
        extensions: ["dts"]
      },
      "audio/vnd.dts.hd": {
        source: "iana",
        extensions: ["dtshd"]
      },
      "audio/vnd.dts.uhd": {
        source: "iana"
      },
      "audio/vnd.dvb.file": {
        source: "iana"
      },
      "audio/vnd.everad.plj": {
        source: "iana"
      },
      "audio/vnd.hns.audio": {
        source: "iana"
      },
      "audio/vnd.lucent.voice": {
        source: "iana",
        extensions: ["lvp"]
      },
      "audio/vnd.ms-playready.media.pya": {
        source: "iana",
        extensions: ["pya"]
      },
      "audio/vnd.nokia.mobile-xmf": {
        source: "iana"
      },
      "audio/vnd.nortel.vbk": {
        source: "iana"
      },
      "audio/vnd.nuera.ecelp4800": {
        source: "iana",
        extensions: ["ecelp4800"]
      },
      "audio/vnd.nuera.ecelp7470": {
        source: "iana",
        extensions: ["ecelp7470"]
      },
      "audio/vnd.nuera.ecelp9600": {
        source: "iana",
        extensions: ["ecelp9600"]
      },
      "audio/vnd.octel.sbc": {
        source: "iana"
      },
      "audio/vnd.presonus.multitrack": {
        source: "iana"
      },
      "audio/vnd.qcelp": {
        source: "iana"
      },
      "audio/vnd.rhetorex.32kadpcm": {
        source: "iana"
      },
      "audio/vnd.rip": {
        source: "iana",
        extensions: ["rip"]
      },
      "audio/vnd.rn-realaudio": {
        compressible: false
      },
      "audio/vnd.sealedmedia.softseal.mpeg": {
        source: "iana"
      },
      "audio/vnd.vmx.cvsd": {
        source: "iana"
      },
      "audio/vnd.wave": {
        compressible: false
      },
      "audio/vorbis": {
        source: "iana",
        compressible: false
      },
      "audio/vorbis-config": {
        source: "iana"
      },
      "audio/wav": {
        compressible: false,
        extensions: ["wav"]
      },
      "audio/wave": {
        compressible: false,
        extensions: ["wav"]
      },
      "audio/webm": {
        source: "apache",
        compressible: false,
        extensions: ["weba"]
      },
      "audio/x-aac": {
        source: "apache",
        compressible: false,
        extensions: ["aac"]
      },
      "audio/x-aiff": {
        source: "apache",
        extensions: ["aif", "aiff", "aifc"]
      },
      "audio/x-caf": {
        source: "apache",
        compressible: false,
        extensions: ["caf"]
      },
      "audio/x-flac": {
        source: "apache",
        extensions: ["flac"]
      },
      "audio/x-m4a": {
        source: "nginx",
        extensions: ["m4a"]
      },
      "audio/x-matroska": {
        source: "apache",
        extensions: ["mka"]
      },
      "audio/x-mpegurl": {
        source: "apache",
        extensions: ["m3u"]
      },
      "audio/x-ms-wax": {
        source: "apache",
        extensions: ["wax"]
      },
      "audio/x-ms-wma": {
        source: "apache",
        extensions: ["wma"]
      },
      "audio/x-pn-realaudio": {
        source: "apache",
        extensions: ["ram", "ra"]
      },
      "audio/x-pn-realaudio-plugin": {
        source: "apache",
        extensions: ["rmp"]
      },
      "audio/x-realaudio": {
        source: "nginx",
        extensions: ["ra"]
      },
      "audio/x-tta": {
        source: "apache"
      },
      "audio/x-wav": {
        source: "apache",
        extensions: ["wav"]
      },
      "audio/xm": {
        source: "apache",
        extensions: ["xm"]
      },
      "chemical/x-cdx": {
        source: "apache",
        extensions: ["cdx"]
      },
      "chemical/x-cif": {
        source: "apache",
        extensions: ["cif"]
      },
      "chemical/x-cmdf": {
        source: "apache",
        extensions: ["cmdf"]
      },
      "chemical/x-cml": {
        source: "apache",
        extensions: ["cml"]
      },
      "chemical/x-csml": {
        source: "apache",
        extensions: ["csml"]
      },
      "chemical/x-pdb": {
        source: "apache"
      },
      "chemical/x-xyz": {
        source: "apache",
        extensions: ["xyz"]
      },
      "font/collection": {
        source: "iana",
        extensions: ["ttc"]
      },
      "font/otf": {
        source: "iana",
        compressible: true,
        extensions: ["otf"]
      },
      "font/sfnt": {
        source: "iana"
      },
      "font/ttf": {
        source: "iana",
        compressible: true,
        extensions: ["ttf"]
      },
      "font/woff": {
        source: "iana",
        extensions: ["woff"]
      },
      "font/woff2": {
        source: "iana",
        extensions: ["woff2"]
      },
      "image/aces": {
        source: "iana",
        extensions: ["exr"]
      },
      "image/apng": {
        compressible: false,
        extensions: ["apng"]
      },
      "image/avci": {
        source: "iana",
        extensions: ["avci"]
      },
      "image/avcs": {
        source: "iana",
        extensions: ["avcs"]
      },
      "image/avif": {
        source: "iana",
        compressible: false,
        extensions: ["avif"]
      },
      "image/bmp": {
        source: "iana",
        compressible: true,
        extensions: ["bmp"]
      },
      "image/cgm": {
        source: "iana",
        extensions: ["cgm"]
      },
      "image/dicom-rle": {
        source: "iana",
        extensions: ["drle"]
      },
      "image/emf": {
        source: "iana",
        extensions: ["emf"]
      },
      "image/fits": {
        source: "iana",
        extensions: ["fits"]
      },
      "image/g3fax": {
        source: "iana",
        extensions: ["g3"]
      },
      "image/gif": {
        source: "iana",
        compressible: false,
        extensions: ["gif"]
      },
      "image/heic": {
        source: "iana",
        extensions: ["heic"]
      },
      "image/heic-sequence": {
        source: "iana",
        extensions: ["heics"]
      },
      "image/heif": {
        source: "iana",
        extensions: ["heif"]
      },
      "image/heif-sequence": {
        source: "iana",
        extensions: ["heifs"]
      },
      "image/hej2k": {
        source: "iana",
        extensions: ["hej2"]
      },
      "image/hsj2": {
        source: "iana",
        extensions: ["hsj2"]
      },
      "image/ief": {
        source: "iana",
        extensions: ["ief"]
      },
      "image/jls": {
        source: "iana",
        extensions: ["jls"]
      },
      "image/jp2": {
        source: "iana",
        compressible: false,
        extensions: ["jp2", "jpg2"]
      },
      "image/jpeg": {
        source: "iana",
        compressible: false,
        extensions: ["jpeg", "jpg", "jpe"]
      },
      "image/jph": {
        source: "iana",
        extensions: ["jph"]
      },
      "image/jphc": {
        source: "iana",
        extensions: ["jhc"]
      },
      "image/jpm": {
        source: "iana",
        compressible: false,
        extensions: ["jpm"]
      },
      "image/jpx": {
        source: "iana",
        compressible: false,
        extensions: ["jpx", "jpf"]
      },
      "image/jxr": {
        source: "iana",
        extensions: ["jxr"]
      },
      "image/jxra": {
        source: "iana",
        extensions: ["jxra"]
      },
      "image/jxrs": {
        source: "iana",
        extensions: ["jxrs"]
      },
      "image/jxs": {
        source: "iana",
        extensions: ["jxs"]
      },
      "image/jxsc": {
        source: "iana",
        extensions: ["jxsc"]
      },
      "image/jxsi": {
        source: "iana",
        extensions: ["jxsi"]
      },
      "image/jxss": {
        source: "iana",
        extensions: ["jxss"]
      },
      "image/ktx": {
        source: "iana",
        extensions: ["ktx"]
      },
      "image/ktx2": {
        source: "iana",
        extensions: ["ktx2"]
      },
      "image/naplps": {
        source: "iana"
      },
      "image/pjpeg": {
        compressible: false
      },
      "image/png": {
        source: "iana",
        compressible: false,
        extensions: ["png"]
      },
      "image/prs.btif": {
        source: "iana",
        extensions: ["btif"]
      },
      "image/prs.pti": {
        source: "iana",
        extensions: ["pti"]
      },
      "image/pwg-raster": {
        source: "iana"
      },
      "image/sgi": {
        source: "apache",
        extensions: ["sgi"]
      },
      "image/svg+xml": {
        source: "iana",
        compressible: true,
        extensions: ["svg", "svgz"]
      },
      "image/t38": {
        source: "iana",
        extensions: ["t38"]
      },
      "image/tiff": {
        source: "iana",
        compressible: false,
        extensions: ["tif", "tiff"]
      },
      "image/tiff-fx": {
        source: "iana",
        extensions: ["tfx"]
      },
      "image/vnd.adobe.photoshop": {
        source: "iana",
        compressible: true,
        extensions: ["psd"]
      },
      "image/vnd.airzip.accelerator.azv": {
        source: "iana",
        extensions: ["azv"]
      },
      "image/vnd.cns.inf2": {
        source: "iana"
      },
      "image/vnd.dece.graphic": {
        source: "iana",
        extensions: ["uvi", "uvvi", "uvg", "uvvg"]
      },
      "image/vnd.djvu": {
        source: "iana",
        extensions: ["djvu", "djv"]
      },
      "image/vnd.dvb.subtitle": {
        source: "iana",
        extensions: ["sub"]
      },
      "image/vnd.dwg": {
        source: "iana",
        extensions: ["dwg"]
      },
      "image/vnd.dxf": {
        source: "iana",
        extensions: ["dxf"]
      },
      "image/vnd.fastbidsheet": {
        source: "iana",
        extensions: ["fbs"]
      },
      "image/vnd.fpx": {
        source: "iana",
        extensions: ["fpx"]
      },
      "image/vnd.fst": {
        source: "iana",
        extensions: ["fst"]
      },
      "image/vnd.fujixerox.edmics-mmr": {
        source: "iana",
        extensions: ["mmr"]
      },
      "image/vnd.fujixerox.edmics-rlc": {
        source: "iana",
        extensions: ["rlc"]
      },
      "image/vnd.globalgraphics.pgb": {
        source: "iana"
      },
      "image/vnd.microsoft.icon": {
        source: "iana",
        compressible: true,
        extensions: ["ico"]
      },
      "image/vnd.mix": {
        source: "iana"
      },
      "image/vnd.mozilla.apng": {
        source: "iana"
      },
      "image/vnd.ms-dds": {
        compressible: true,
        extensions: ["dds"]
      },
      "image/vnd.ms-modi": {
        source: "iana",
        extensions: ["mdi"]
      },
      "image/vnd.ms-photo": {
        source: "apache",
        extensions: ["wdp"]
      },
      "image/vnd.net-fpx": {
        source: "iana",
        extensions: ["npx"]
      },
      "image/vnd.pco.b16": {
        source: "iana",
        extensions: ["b16"]
      },
      "image/vnd.radiance": {
        source: "iana"
      },
      "image/vnd.sealed.png": {
        source: "iana"
      },
      "image/vnd.sealedmedia.softseal.gif": {
        source: "iana"
      },
      "image/vnd.sealedmedia.softseal.jpg": {
        source: "iana"
      },
      "image/vnd.svf": {
        source: "iana"
      },
      "image/vnd.tencent.tap": {
        source: "iana",
        extensions: ["tap"]
      },
      "image/vnd.valve.source.texture": {
        source: "iana",
        extensions: ["vtf"]
      },
      "image/vnd.wap.wbmp": {
        source: "iana",
        extensions: ["wbmp"]
      },
      "image/vnd.xiff": {
        source: "iana",
        extensions: ["xif"]
      },
      "image/vnd.zbrush.pcx": {
        source: "iana",
        extensions: ["pcx"]
      },
      "image/webp": {
        source: "apache",
        extensions: ["webp"]
      },
      "image/wmf": {
        source: "iana",
        extensions: ["wmf"]
      },
      "image/x-3ds": {
        source: "apache",
        extensions: ["3ds"]
      },
      "image/x-cmu-raster": {
        source: "apache",
        extensions: ["ras"]
      },
      "image/x-cmx": {
        source: "apache",
        extensions: ["cmx"]
      },
      "image/x-freehand": {
        source: "apache",
        extensions: ["fh", "fhc", "fh4", "fh5", "fh7"]
      },
      "image/x-icon": {
        source: "apache",
        compressible: true,
        extensions: ["ico"]
      },
      "image/x-jng": {
        source: "nginx",
        extensions: ["jng"]
      },
      "image/x-mrsid-image": {
        source: "apache",
        extensions: ["sid"]
      },
      "image/x-ms-bmp": {
        source: "nginx",
        compressible: true,
        extensions: ["bmp"]
      },
      "image/x-pcx": {
        source: "apache",
        extensions: ["pcx"]
      },
      "image/x-pict": {
        source: "apache",
        extensions: ["pic", "pct"]
      },
      "image/x-portable-anymap": {
        source: "apache",
        extensions: ["pnm"]
      },
      "image/x-portable-bitmap": {
        source: "apache",
        extensions: ["pbm"]
      },
      "image/x-portable-graymap": {
        source: "apache",
        extensions: ["pgm"]
      },
      "image/x-portable-pixmap": {
        source: "apache",
        extensions: ["ppm"]
      },
      "image/x-rgb": {
        source: "apache",
        extensions: ["rgb"]
      },
      "image/x-tga": {
        source: "apache",
        extensions: ["tga"]
      },
      "image/x-xbitmap": {
        source: "apache",
        extensions: ["xbm"]
      },
      "image/x-xcf": {
        compressible: false
      },
      "image/x-xpixmap": {
        source: "apache",
        extensions: ["xpm"]
      },
      "image/x-xwindowdump": {
        source: "apache",
        extensions: ["xwd"]
      },
      "message/cpim": {
        source: "iana"
      },
      "message/delivery-status": {
        source: "iana"
      },
      "message/disposition-notification": {
        source: "iana",
        extensions: [
          "disposition-notification"
        ]
      },
      "message/external-body": {
        source: "iana"
      },
      "message/feedback-report": {
        source: "iana"
      },
      "message/global": {
        source: "iana",
        extensions: ["u8msg"]
      },
      "message/global-delivery-status": {
        source: "iana",
        extensions: ["u8dsn"]
      },
      "message/global-disposition-notification": {
        source: "iana",
        extensions: ["u8mdn"]
      },
      "message/global-headers": {
        source: "iana",
        extensions: ["u8hdr"]
      },
      "message/http": {
        source: "iana",
        compressible: false
      },
      "message/imdn+xml": {
        source: "iana",
        compressible: true
      },
      "message/news": {
        source: "iana"
      },
      "message/partial": {
        source: "iana",
        compressible: false
      },
      "message/rfc822": {
        source: "iana",
        compressible: true,
        extensions: ["eml", "mime"]
      },
      "message/s-http": {
        source: "iana"
      },
      "message/sip": {
        source: "iana"
      },
      "message/sipfrag": {
        source: "iana"
      },
      "message/tracking-status": {
        source: "iana"
      },
      "message/vnd.si.simp": {
        source: "iana"
      },
      "message/vnd.wfa.wsc": {
        source: "iana",
        extensions: ["wsc"]
      },
      "model/3mf": {
        source: "iana",
        extensions: ["3mf"]
      },
      "model/e57": {
        source: "iana"
      },
      "model/gltf+json": {
        source: "iana",
        compressible: true,
        extensions: ["gltf"]
      },
      "model/gltf-binary": {
        source: "iana",
        compressible: true,
        extensions: ["glb"]
      },
      "model/iges": {
        source: "iana",
        compressible: false,
        extensions: ["igs", "iges"]
      },
      "model/mesh": {
        source: "iana",
        compressible: false,
        extensions: ["msh", "mesh", "silo"]
      },
      "model/mtl": {
        source: "iana",
        extensions: ["mtl"]
      },
      "model/obj": {
        source: "iana",
        extensions: ["obj"]
      },
      "model/step": {
        source: "iana"
      },
      "model/step+xml": {
        source: "iana",
        compressible: true,
        extensions: ["stpx"]
      },
      "model/step+zip": {
        source: "iana",
        compressible: false,
        extensions: ["stpz"]
      },
      "model/step-xml+zip": {
        source: "iana",
        compressible: false,
        extensions: ["stpxz"]
      },
      "model/stl": {
        source: "iana",
        extensions: ["stl"]
      },
      "model/vnd.collada+xml": {
        source: "iana",
        compressible: true,
        extensions: ["dae"]
      },
      "model/vnd.dwf": {
        source: "iana",
        extensions: ["dwf"]
      },
      "model/vnd.flatland.3dml": {
        source: "iana"
      },
      "model/vnd.gdl": {
        source: "iana",
        extensions: ["gdl"]
      },
      "model/vnd.gs-gdl": {
        source: "apache"
      },
      "model/vnd.gs.gdl": {
        source: "iana"
      },
      "model/vnd.gtw": {
        source: "iana",
        extensions: ["gtw"]
      },
      "model/vnd.moml+xml": {
        source: "iana",
        compressible: true
      },
      "model/vnd.mts": {
        source: "iana",
        extensions: ["mts"]
      },
      "model/vnd.opengex": {
        source: "iana",
        extensions: ["ogex"]
      },
      "model/vnd.parasolid.transmit.binary": {
        source: "iana",
        extensions: ["x_b"]
      },
      "model/vnd.parasolid.transmit.text": {
        source: "iana",
        extensions: ["x_t"]
      },
      "model/vnd.pytha.pyox": {
        source: "iana"
      },
      "model/vnd.rosette.annotated-data-model": {
        source: "iana"
      },
      "model/vnd.sap.vds": {
        source: "iana",
        extensions: ["vds"]
      },
      "model/vnd.usdz+zip": {
        source: "iana",
        compressible: false,
        extensions: ["usdz"]
      },
      "model/vnd.valve.source.compiled-map": {
        source: "iana",
        extensions: ["bsp"]
      },
      "model/vnd.vtu": {
        source: "iana",
        extensions: ["vtu"]
      },
      "model/vrml": {
        source: "iana",
        compressible: false,
        extensions: ["wrl", "vrml"]
      },
      "model/x3d+binary": {
        source: "apache",
        compressible: false,
        extensions: ["x3db", "x3dbz"]
      },
      "model/x3d+fastinfoset": {
        source: "iana",
        extensions: ["x3db"]
      },
      "model/x3d+vrml": {
        source: "apache",
        compressible: false,
        extensions: ["x3dv", "x3dvz"]
      },
      "model/x3d+xml": {
        source: "iana",
        compressible: true,
        extensions: ["x3d", "x3dz"]
      },
      "model/x3d-vrml": {
        source: "iana",
        extensions: ["x3dv"]
      },
      "multipart/alternative": {
        source: "iana",
        compressible: false
      },
      "multipart/appledouble": {
        source: "iana"
      },
      "multipart/byteranges": {
        source: "iana"
      },
      "multipart/digest": {
        source: "iana"
      },
      "multipart/encrypted": {
        source: "iana",
        compressible: false
      },
      "multipart/form-data": {
        source: "iana",
        compressible: false
      },
      "multipart/header-set": {
        source: "iana"
      },
      "multipart/mixed": {
        source: "iana"
      },
      "multipart/multilingual": {
        source: "iana"
      },
      "multipart/parallel": {
        source: "iana"
      },
      "multipart/related": {
        source: "iana",
        compressible: false
      },
      "multipart/report": {
        source: "iana"
      },
      "multipart/signed": {
        source: "iana",
        compressible: false
      },
      "multipart/vnd.bint.med-plus": {
        source: "iana"
      },
      "multipart/voice-message": {
        source: "iana"
      },
      "multipart/x-mixed-replace": {
        source: "iana"
      },
      "text/1d-interleaved-parityfec": {
        source: "iana"
      },
      "text/cache-manifest": {
        source: "iana",
        compressible: true,
        extensions: ["appcache", "manifest"]
      },
      "text/calendar": {
        source: "iana",
        extensions: ["ics", "ifb"]
      },
      "text/calender": {
        compressible: true
      },
      "text/cmd": {
        compressible: true
      },
      "text/coffeescript": {
        extensions: ["coffee", "litcoffee"]
      },
      "text/cql": {
        source: "iana"
      },
      "text/cql-expression": {
        source: "iana"
      },
      "text/cql-identifier": {
        source: "iana"
      },
      "text/css": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["css"]
      },
      "text/csv": {
        source: "iana",
        compressible: true,
        extensions: ["csv"]
      },
      "text/csv-schema": {
        source: "iana"
      },
      "text/directory": {
        source: "iana"
      },
      "text/dns": {
        source: "iana"
      },
      "text/ecmascript": {
        source: "iana"
      },
      "text/encaprtp": {
        source: "iana"
      },
      "text/enriched": {
        source: "iana"
      },
      "text/fhirpath": {
        source: "iana"
      },
      "text/flexfec": {
        source: "iana"
      },
      "text/fwdred": {
        source: "iana"
      },
      "text/gff3": {
        source: "iana"
      },
      "text/grammar-ref-list": {
        source: "iana"
      },
      "text/html": {
        source: "iana",
        compressible: true,
        extensions: ["html", "htm", "shtml"]
      },
      "text/jade": {
        extensions: ["jade"]
      },
      "text/javascript": {
        source: "iana",
        compressible: true
      },
      "text/jcr-cnd": {
        source: "iana"
      },
      "text/jsx": {
        compressible: true,
        extensions: ["jsx"]
      },
      "text/less": {
        compressible: true,
        extensions: ["less"]
      },
      "text/markdown": {
        source: "iana",
        compressible: true,
        extensions: ["markdown", "md"]
      },
      "text/mathml": {
        source: "nginx",
        extensions: ["mml"]
      },
      "text/mdx": {
        compressible: true,
        extensions: ["mdx"]
      },
      "text/mizar": {
        source: "iana"
      },
      "text/n3": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["n3"]
      },
      "text/parameters": {
        source: "iana",
        charset: "UTF-8"
      },
      "text/parityfec": {
        source: "iana"
      },
      "text/plain": {
        source: "iana",
        compressible: true,
        extensions: ["txt", "text", "conf", "def", "list", "log", "in", "ini"]
      },
      "text/provenance-notation": {
        source: "iana",
        charset: "UTF-8"
      },
      "text/prs.fallenstein.rst": {
        source: "iana"
      },
      "text/prs.lines.tag": {
        source: "iana",
        extensions: ["dsc"]
      },
      "text/prs.prop.logic": {
        source: "iana"
      },
      "text/raptorfec": {
        source: "iana"
      },
      "text/red": {
        source: "iana"
      },
      "text/rfc822-headers": {
        source: "iana"
      },
      "text/richtext": {
        source: "iana",
        compressible: true,
        extensions: ["rtx"]
      },
      "text/rtf": {
        source: "iana",
        compressible: true,
        extensions: ["rtf"]
      },
      "text/rtp-enc-aescm128": {
        source: "iana"
      },
      "text/rtploopback": {
        source: "iana"
      },
      "text/rtx": {
        source: "iana"
      },
      "text/sgml": {
        source: "iana",
        extensions: ["sgml", "sgm"]
      },
      "text/shaclc": {
        source: "iana"
      },
      "text/shex": {
        source: "iana",
        extensions: ["shex"]
      },
      "text/slim": {
        extensions: ["slim", "slm"]
      },
      "text/spdx": {
        source: "iana",
        extensions: ["spdx"]
      },
      "text/strings": {
        source: "iana"
      },
      "text/stylus": {
        extensions: ["stylus", "styl"]
      },
      "text/t140": {
        source: "iana"
      },
      "text/tab-separated-values": {
        source: "iana",
        compressible: true,
        extensions: ["tsv"]
      },
      "text/troff": {
        source: "iana",
        extensions: ["t", "tr", "roff", "man", "me", "ms"]
      },
      "text/turtle": {
        source: "iana",
        charset: "UTF-8",
        extensions: ["ttl"]
      },
      "text/ulpfec": {
        source: "iana"
      },
      "text/uri-list": {
        source: "iana",
        compressible: true,
        extensions: ["uri", "uris", "urls"]
      },
      "text/vcard": {
        source: "iana",
        compressible: true,
        extensions: ["vcard"]
      },
      "text/vnd.a": {
        source: "iana"
      },
      "text/vnd.abc": {
        source: "iana"
      },
      "text/vnd.ascii-art": {
        source: "iana"
      },
      "text/vnd.curl": {
        source: "iana",
        extensions: ["curl"]
      },
      "text/vnd.curl.dcurl": {
        source: "apache",
        extensions: ["dcurl"]
      },
      "text/vnd.curl.mcurl": {
        source: "apache",
        extensions: ["mcurl"]
      },
      "text/vnd.curl.scurl": {
        source: "apache",
        extensions: ["scurl"]
      },
      "text/vnd.debian.copyright": {
        source: "iana",
        charset: "UTF-8"
      },
      "text/vnd.dmclientscript": {
        source: "iana"
      },
      "text/vnd.dvb.subtitle": {
        source: "iana",
        extensions: ["sub"]
      },
      "text/vnd.esmertec.theme-descriptor": {
        source: "iana",
        charset: "UTF-8"
      },
      "text/vnd.familysearch.gedcom": {
        source: "iana",
        extensions: ["ged"]
      },
      "text/vnd.ficlab.flt": {
        source: "iana"
      },
      "text/vnd.fly": {
        source: "iana",
        extensions: ["fly"]
      },
      "text/vnd.fmi.flexstor": {
        source: "iana",
        extensions: ["flx"]
      },
      "text/vnd.gml": {
        source: "iana"
      },
      "text/vnd.graphviz": {
        source: "iana",
        extensions: ["gv"]
      },
      "text/vnd.hans": {
        source: "iana"
      },
      "text/vnd.hgl": {
        source: "iana"
      },
      "text/vnd.in3d.3dml": {
        source: "iana",
        extensions: ["3dml"]
      },
      "text/vnd.in3d.spot": {
        source: "iana",
        extensions: ["spot"]
      },
      "text/vnd.iptc.newsml": {
        source: "iana"
      },
      "text/vnd.iptc.nitf": {
        source: "iana"
      },
      "text/vnd.latex-z": {
        source: "iana"
      },
      "text/vnd.motorola.reflex": {
        source: "iana"
      },
      "text/vnd.ms-mediapackage": {
        source: "iana"
      },
      "text/vnd.net2phone.commcenter.command": {
        source: "iana"
      },
      "text/vnd.radisys.msml-basic-layout": {
        source: "iana"
      },
      "text/vnd.senx.warpscript": {
        source: "iana"
      },
      "text/vnd.si.uricatalogue": {
        source: "iana"
      },
      "text/vnd.sosi": {
        source: "iana"
      },
      "text/vnd.sun.j2me.app-descriptor": {
        source: "iana",
        charset: "UTF-8",
        extensions: ["jad"]
      },
      "text/vnd.trolltech.linguist": {
        source: "iana",
        charset: "UTF-8"
      },
      "text/vnd.wap.si": {
        source: "iana"
      },
      "text/vnd.wap.sl": {
        source: "iana"
      },
      "text/vnd.wap.wml": {
        source: "iana",
        extensions: ["wml"]
      },
      "text/vnd.wap.wmlscript": {
        source: "iana",
        extensions: ["wmls"]
      },
      "text/vtt": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["vtt"]
      },
      "text/x-asm": {
        source: "apache",
        extensions: ["s", "asm"]
      },
      "text/x-c": {
        source: "apache",
        extensions: ["c", "cc", "cxx", "cpp", "h", "hh", "dic"]
      },
      "text/x-component": {
        source: "nginx",
        extensions: ["htc"]
      },
      "text/x-fortran": {
        source: "apache",
        extensions: ["f", "for", "f77", "f90"]
      },
      "text/x-gwt-rpc": {
        compressible: true
      },
      "text/x-handlebars-template": {
        extensions: ["hbs"]
      },
      "text/x-java-source": {
        source: "apache",
        extensions: ["java"]
      },
      "text/x-jquery-tmpl": {
        compressible: true
      },
      "text/x-lua": {
        extensions: ["lua"]
      },
      "text/x-markdown": {
        compressible: true,
        extensions: ["mkd"]
      },
      "text/x-nfo": {
        source: "apache",
        extensions: ["nfo"]
      },
      "text/x-opml": {
        source: "apache",
        extensions: ["opml"]
      },
      "text/x-org": {
        compressible: true,
        extensions: ["org"]
      },
      "text/x-pascal": {
        source: "apache",
        extensions: ["p", "pas"]
      },
      "text/x-processing": {
        compressible: true,
        extensions: ["pde"]
      },
      "text/x-sass": {
        extensions: ["sass"]
      },
      "text/x-scss": {
        extensions: ["scss"]
      },
      "text/x-setext": {
        source: "apache",
        extensions: ["etx"]
      },
      "text/x-sfv": {
        source: "apache",
        extensions: ["sfv"]
      },
      "text/x-suse-ymp": {
        compressible: true,
        extensions: ["ymp"]
      },
      "text/x-uuencode": {
        source: "apache",
        extensions: ["uu"]
      },
      "text/x-vcalendar": {
        source: "apache",
        extensions: ["vcs"]
      },
      "text/x-vcard": {
        source: "apache",
        extensions: ["vcf"]
      },
      "text/xml": {
        source: "iana",
        compressible: true,
        extensions: ["xml"]
      },
      "text/xml-external-parsed-entity": {
        source: "iana"
      },
      "text/yaml": {
        compressible: true,
        extensions: ["yaml", "yml"]
      },
      "video/1d-interleaved-parityfec": {
        source: "iana"
      },
      "video/3gpp": {
        source: "iana",
        extensions: ["3gp", "3gpp"]
      },
      "video/3gpp-tt": {
        source: "iana"
      },
      "video/3gpp2": {
        source: "iana",
        extensions: ["3g2"]
      },
      "video/av1": {
        source: "iana"
      },
      "video/bmpeg": {
        source: "iana"
      },
      "video/bt656": {
        source: "iana"
      },
      "video/celb": {
        source: "iana"
      },
      "video/dv": {
        source: "iana"
      },
      "video/encaprtp": {
        source: "iana"
      },
      "video/ffv1": {
        source: "iana"
      },
      "video/flexfec": {
        source: "iana"
      },
      "video/h261": {
        source: "iana",
        extensions: ["h261"]
      },
      "video/h263": {
        source: "iana",
        extensions: ["h263"]
      },
      "video/h263-1998": {
        source: "iana"
      },
      "video/h263-2000": {
        source: "iana"
      },
      "video/h264": {
        source: "iana",
        extensions: ["h264"]
      },
      "video/h264-rcdo": {
        source: "iana"
      },
      "video/h264-svc": {
        source: "iana"
      },
      "video/h265": {
        source: "iana"
      },
      "video/iso.segment": {
        source: "iana",
        extensions: ["m4s"]
      },
      "video/jpeg": {
        source: "iana",
        extensions: ["jpgv"]
      },
      "video/jpeg2000": {
        source: "iana"
      },
      "video/jpm": {
        source: "apache",
        extensions: ["jpm", "jpgm"]
      },
      "video/jxsv": {
        source: "iana"
      },
      "video/mj2": {
        source: "iana",
        extensions: ["mj2", "mjp2"]
      },
      "video/mp1s": {
        source: "iana"
      },
      "video/mp2p": {
        source: "iana"
      },
      "video/mp2t": {
        source: "iana",
        extensions: ["ts"]
      },
      "video/mp4": {
        source: "iana",
        compressible: false,
        extensions: ["mp4", "mp4v", "mpg4"]
      },
      "video/mp4v-es": {
        source: "iana"
      },
      "video/mpeg": {
        source: "iana",
        compressible: false,
        extensions: ["mpeg", "mpg", "mpe", "m1v", "m2v"]
      },
      "video/mpeg4-generic": {
        source: "iana"
      },
      "video/mpv": {
        source: "iana"
      },
      "video/nv": {
        source: "iana"
      },
      "video/ogg": {
        source: "iana",
        compressible: false,
        extensions: ["ogv"]
      },
      "video/parityfec": {
        source: "iana"
      },
      "video/pointer": {
        source: "iana"
      },
      "video/quicktime": {
        source: "iana",
        compressible: false,
        extensions: ["qt", "mov"]
      },
      "video/raptorfec": {
        source: "iana"
      },
      "video/raw": {
        source: "iana"
      },
      "video/rtp-enc-aescm128": {
        source: "iana"
      },
      "video/rtploopback": {
        source: "iana"
      },
      "video/rtx": {
        source: "iana"
      },
      "video/scip": {
        source: "iana"
      },
      "video/smpte291": {
        source: "iana"
      },
      "video/smpte292m": {
        source: "iana"
      },
      "video/ulpfec": {
        source: "iana"
      },
      "video/vc1": {
        source: "iana"
      },
      "video/vc2": {
        source: "iana"
      },
      "video/vnd.cctv": {
        source: "iana"
      },
      "video/vnd.dece.hd": {
        source: "iana",
        extensions: ["uvh", "uvvh"]
      },
      "video/vnd.dece.mobile": {
        source: "iana",
        extensions: ["uvm", "uvvm"]
      },
      "video/vnd.dece.mp4": {
        source: "iana"
      },
      "video/vnd.dece.pd": {
        source: "iana",
        extensions: ["uvp", "uvvp"]
      },
      "video/vnd.dece.sd": {
        source: "iana",
        extensions: ["uvs", "uvvs"]
      },
      "video/vnd.dece.video": {
        source: "iana",
        extensions: ["uvv", "uvvv"]
      },
      "video/vnd.directv.mpeg": {
        source: "iana"
      },
      "video/vnd.directv.mpeg-tts": {
        source: "iana"
      },
      "video/vnd.dlna.mpeg-tts": {
        source: "iana"
      },
      "video/vnd.dvb.file": {
        source: "iana",
        extensions: ["dvb"]
      },
      "video/vnd.fvt": {
        source: "iana",
        extensions: ["fvt"]
      },
      "video/vnd.hns.video": {
        source: "iana"
      },
      "video/vnd.iptvforum.1dparityfec-1010": {
        source: "iana"
      },
      "video/vnd.iptvforum.1dparityfec-2005": {
        source: "iana"
      },
      "video/vnd.iptvforum.2dparityfec-1010": {
        source: "iana"
      },
      "video/vnd.iptvforum.2dparityfec-2005": {
        source: "iana"
      },
      "video/vnd.iptvforum.ttsavc": {
        source: "iana"
      },
      "video/vnd.iptvforum.ttsmpeg2": {
        source: "iana"
      },
      "video/vnd.motorola.video": {
        source: "iana"
      },
      "video/vnd.motorola.videop": {
        source: "iana"
      },
      "video/vnd.mpegurl": {
        source: "iana",
        extensions: ["mxu", "m4u"]
      },
      "video/vnd.ms-playready.media.pyv": {
        source: "iana",
        extensions: ["pyv"]
      },
      "video/vnd.nokia.interleaved-multimedia": {
        source: "iana"
      },
      "video/vnd.nokia.mp4vr": {
        source: "iana"
      },
      "video/vnd.nokia.videovoip": {
        source: "iana"
      },
      "video/vnd.objectvideo": {
        source: "iana"
      },
      "video/vnd.radgamettools.bink": {
        source: "iana"
      },
      "video/vnd.radgamettools.smacker": {
        source: "iana"
      },
      "video/vnd.sealed.mpeg1": {
        source: "iana"
      },
      "video/vnd.sealed.mpeg4": {
        source: "iana"
      },
      "video/vnd.sealed.swf": {
        source: "iana"
      },
      "video/vnd.sealedmedia.softseal.mov": {
        source: "iana"
      },
      "video/vnd.uvvu.mp4": {
        source: "iana",
        extensions: ["uvu", "uvvu"]
      },
      "video/vnd.vivo": {
        source: "iana",
        extensions: ["viv"]
      },
      "video/vnd.youtube.yt": {
        source: "iana"
      },
      "video/vp8": {
        source: "iana"
      },
      "video/vp9": {
        source: "iana"
      },
      "video/webm": {
        source: "apache",
        compressible: false,
        extensions: ["webm"]
      },
      "video/x-f4v": {
        source: "apache",
        extensions: ["f4v"]
      },
      "video/x-fli": {
        source: "apache",
        extensions: ["fli"]
      },
      "video/x-flv": {
        source: "apache",
        compressible: false,
        extensions: ["flv"]
      },
      "video/x-m4v": {
        source: "apache",
        extensions: ["m4v"]
      },
      "video/x-matroska": {
        source: "apache",
        compressible: false,
        extensions: ["mkv", "mk3d", "mks"]
      },
      "video/x-mng": {
        source: "apache",
        extensions: ["mng"]
      },
      "video/x-ms-asf": {
        source: "apache",
        extensions: ["asf", "asx"]
      },
      "video/x-ms-vob": {
        source: "apache",
        extensions: ["vob"]
      },
      "video/x-ms-wm": {
        source: "apache",
        extensions: ["wm"]
      },
      "video/x-ms-wmv": {
        source: "apache",
        compressible: false,
        extensions: ["wmv"]
      },
      "video/x-ms-wmx": {
        source: "apache",
        extensions: ["wmx"]
      },
      "video/x-ms-wvx": {
        source: "apache",
        extensions: ["wvx"]
      },
      "video/x-msvideo": {
        source: "apache",
        extensions: ["avi"]
      },
      "video/x-sgi-movie": {
        source: "apache",
        extensions: ["movie"]
      },
      "video/x-smv": {
        source: "apache",
        extensions: ["smv"]
      },
      "x-conference/x-cooltalk": {
        source: "apache",
        extensions: ["ice"]
      },
      "x-shader/x-fragment": {
        compressible: true
      },
      "x-shader/x-vertex": {
        compressible: true
      }
    };
  }
});

// node_modules/mime-db/index.js
var require_mime_db = __commonJS({
  "node_modules/mime-db/index.js"(exports, module) {
    module.exports = require_db();
  }
});

// node_modules/mime-types/index.js
var require_mime_types = __commonJS({
  "node_modules/mime-types/index.js"(exports) {
    "use strict";
    var db = require_mime_db();
    var extname2 = __require("path").extname;
    var EXTRACT_TYPE_REGEXP = /^\s*([^;\s]*)(?:;|\s|$)/;
    var TEXT_TYPE_REGEXP = /^text\//i;
    exports.charset = charset;
    exports.charsets = { lookup: charset };
    exports.contentType = contentType;
    exports.extension = extension;
    exports.extensions = /* @__PURE__ */ Object.create(null);
    exports.lookup = lookup2;
    exports.types = /* @__PURE__ */ Object.create(null);
    populateMaps(exports.extensions, exports.types);
    function charset(type) {
      if (!type || typeof type !== "string") {
        return false;
      }
      var match = EXTRACT_TYPE_REGEXP.exec(type);
      var mime = match && db[match[1].toLowerCase()];
      if (mime && mime.charset) {
        return mime.charset;
      }
      if (match && TEXT_TYPE_REGEXP.test(match[1])) {
        return "UTF-8";
      }
      return false;
    }
    function contentType(str) {
      if (!str || typeof str !== "string") {
        return false;
      }
      var mime = str.indexOf("/") === -1 ? exports.lookup(str) : str;
      if (!mime) {
        return false;
      }
      if (mime.indexOf("charset") === -1) {
        var charset2 = exports.charset(mime);
        if (charset2) mime += "; charset=" + charset2.toLowerCase();
      }
      return mime;
    }
    function extension(type) {
      if (!type || typeof type !== "string") {
        return false;
      }
      var match = EXTRACT_TYPE_REGEXP.exec(type);
      var exts = match && exports.extensions[match[1].toLowerCase()];
      if (!exts || !exts.length) {
        return false;
      }
      return exts[0];
    }
    function lookup2(path2) {
      if (!path2 || typeof path2 !== "string") {
        return false;
      }
      var extension2 = extname2("x." + path2).toLowerCase().substr(1);
      if (!extension2) {
        return false;
      }
      return exports.types[extension2] || false;
    }
    function populateMaps(extensions, types) {
      var preference = ["nginx", "apache", void 0, "iana"];
      Object.keys(db).forEach(function forEachMimeType(type) {
        var mime = db[type];
        var exts = mime.extensions;
        if (!exts || !exts.length) {
          return;
        }
        extensions[type] = exts;
        for (var i = 0; i < exts.length; i++) {
          var extension2 = exts[i];
          if (types[extension2]) {
            var from = preference.indexOf(db[types[extension2]].source);
            var to = preference.indexOf(mime.source);
            if (types[extension2] !== "application/octet-stream" && (from > to || from === to && types[extension2].substr(0, 12) === "application/")) {
              continue;
            }
          }
          types[extension2] = type;
        }
      });
    }
  }
});

// node_modules/asynckit/lib/defer.js
var require_defer = __commonJS({
  "node_modules/asynckit/lib/defer.js"(exports, module) {
    module.exports = defer;
    function defer(fn) {
      var nextTick = typeof setImmediate == "function" ? setImmediate : typeof process == "object" && typeof process.nextTick == "function" ? process.nextTick : null;
      if (nextTick) {
        nextTick(fn);
      } else {
        setTimeout(fn, 0);
      }
    }
  }
});

// node_modules/asynckit/lib/async.js
var require_async = __commonJS({
  "node_modules/asynckit/lib/async.js"(exports, module) {
    var defer = require_defer();
    module.exports = async;
    function async(callback) {
      var isAsync = false;
      defer(function() {
        isAsync = true;
      });
      return function async_callback(err, result) {
        if (isAsync) {
          callback(err, result);
        } else {
          defer(function nextTick_callback() {
            callback(err, result);
          });
        }
      };
    }
  }
});

// node_modules/asynckit/lib/abort.js
var require_abort = __commonJS({
  "node_modules/asynckit/lib/abort.js"(exports, module) {
    module.exports = abort;
    function abort(state) {
      Object.keys(state.jobs).forEach(clean.bind(state));
      state.jobs = {};
    }
    function clean(key) {
      if (typeof this.jobs[key] == "function") {
        this.jobs[key]();
      }
    }
  }
});

// node_modules/asynckit/lib/iterate.js
var require_iterate = __commonJS({
  "node_modules/asynckit/lib/iterate.js"(exports, module) {
    var async = require_async();
    var abort = require_abort();
    module.exports = iterate;
    function iterate(list, iterator, state, callback) {
      var key = state["keyedList"] ? state["keyedList"][state.index] : state.index;
      state.jobs[key] = runJob(iterator, key, list[key], function(error, output) {
        if (!(key in state.jobs)) {
          return;
        }
        delete state.jobs[key];
        if (error) {
          abort(state);
        } else {
          state.results[key] = output;
        }
        callback(error, state.results);
      });
    }
    function runJob(iterator, key, item, callback) {
      var aborter;
      if (iterator.length == 2) {
        aborter = iterator(item, async(callback));
      } else {
        aborter = iterator(item, key, async(callback));
      }
      return aborter;
    }
  }
});

// node_modules/asynckit/lib/state.js
var require_state = __commonJS({
  "node_modules/asynckit/lib/state.js"(exports, module) {
    module.exports = state;
    function state(list, sortMethod) {
      var isNamedList = !Array.isArray(list), initState = {
        index: 0,
        keyedList: isNamedList || sortMethod ? Object.keys(list) : null,
        jobs: {},
        results: isNamedList ? {} : [],
        size: isNamedList ? Object.keys(list).length : list.length
      };
      if (sortMethod) {
        initState.keyedList.sort(isNamedList ? sortMethod : function(a, b) {
          return sortMethod(list[a], list[b]);
        });
      }
      return initState;
    }
  }
});

// node_modules/asynckit/lib/terminator.js
var require_terminator = __commonJS({
  "node_modules/asynckit/lib/terminator.js"(exports, module) {
    var abort = require_abort();
    var async = require_async();
    module.exports = terminator;
    function terminator(callback) {
      if (!Object.keys(this.jobs).length) {
        return;
      }
      this.index = this.size;
      abort(this);
      async(callback)(null, this.results);
    }
  }
});

// node_modules/asynckit/parallel.js
var require_parallel = __commonJS({
  "node_modules/asynckit/parallel.js"(exports, module) {
    var iterate = require_iterate();
    var initState = require_state();
    var terminator = require_terminator();
    module.exports = parallel;
    function parallel(list, iterator, callback) {
      var state = initState(list);
      while (state.index < (state["keyedList"] || list).length) {
        iterate(list, iterator, state, function(error, result) {
          if (error) {
            callback(error, result);
            return;
          }
          if (Object.keys(state.jobs).length === 0) {
            callback(null, state.results);
            return;
          }
        });
        state.index++;
      }
      return terminator.bind(state, callback);
    }
  }
});

// node_modules/asynckit/serialOrdered.js
var require_serialOrdered = __commonJS({
  "node_modules/asynckit/serialOrdered.js"(exports, module) {
    var iterate = require_iterate();
    var initState = require_state();
    var terminator = require_terminator();
    module.exports = serialOrdered;
    module.exports.ascending = ascending;
    module.exports.descending = descending;
    function serialOrdered(list, iterator, sortMethod, callback) {
      var state = initState(list, sortMethod);
      iterate(list, iterator, state, function iteratorHandler(error, result) {
        if (error) {
          callback(error, result);
          return;
        }
        state.index++;
        if (state.index < (state["keyedList"] || list).length) {
          iterate(list, iterator, state, iteratorHandler);
          return;
        }
        callback(null, state.results);
      });
      return terminator.bind(state, callback);
    }
    function ascending(a, b) {
      return a < b ? -1 : a > b ? 1 : 0;
    }
    function descending(a, b) {
      return -1 * ascending(a, b);
    }
  }
});

// node_modules/asynckit/serial.js
var require_serial = __commonJS({
  "node_modules/asynckit/serial.js"(exports, module) {
    var serialOrdered = require_serialOrdered();
    module.exports = serial;
    function serial(list, iterator, callback) {
      return serialOrdered(list, iterator, null, callback);
    }
  }
});

// node_modules/asynckit/index.js
var require_asynckit = __commonJS({
  "node_modules/asynckit/index.js"(exports, module) {
    module.exports = {
      parallel: require_parallel(),
      serial: require_serial(),
      serialOrdered: require_serialOrdered()
    };
  }
});

// node_modules/form-data/lib/populate.js
var require_populate = __commonJS({
  "node_modules/form-data/lib/populate.js"(exports, module) {
    module.exports = function(dst, src) {
      Object.keys(src).forEach(function(prop) {
        dst[prop] = dst[prop] || src[prop];
      });
      return dst;
    };
  }
});

// node_modules/form-data/lib/form_data.js
var require_form_data = __commonJS({
  "node_modules/form-data/lib/form_data.js"(exports, module) {
    var CombinedStream = require_combined_stream();
    var util = __require("util");
    var path2 = __require("path");
    var http = __require("http");
    var https = __require("https");
    var parseUrl = __require("url").parse;
    var fs3 = __require("fs");
    var mime = require_mime_types();
    var asynckit = require_asynckit();
    var populate = require_populate();
    module.exports = FormData2;
    util.inherits(FormData2, CombinedStream);
    function FormData2(options) {
      if (!(this instanceof FormData2)) {
        return new FormData2();
      }
      this._overheadLength = 0;
      this._valueLength = 0;
      this._valuesToMeasure = [];
      CombinedStream.call(this);
      options = options || {};
      for (var option in options) {
        this[option] = options[option];
      }
    }
    FormData2.LINE_BREAK = "\r\n";
    FormData2.DEFAULT_CONTENT_TYPE = "application/octet-stream";
    FormData2.prototype.append = function(field, value, options) {
      options = options || {};
      if (typeof options == "string") {
        options = { filename: options };
      }
      var append = CombinedStream.prototype.append.bind(this);
      if (typeof value == "number") {
        value = "" + value;
      }
      if (util.isArray(value)) {
        this._error(new Error("Arrays are not supported."));
        return;
      }
      var header = this._multiPartHeader(field, value, options);
      var footer = this._multiPartFooter();
      append(header);
      append(value);
      append(footer);
      this._trackLength(header, value, options);
    };
    FormData2.prototype._trackLength = function(header, value, options) {
      var valueLength = 0;
      if (options.knownLength != null) {
        valueLength += +options.knownLength;
      } else if (Buffer.isBuffer(value)) {
        valueLength = value.length;
      } else if (typeof value === "string") {
        valueLength = Buffer.byteLength(value);
      }
      this._valueLength += valueLength;
      this._overheadLength += Buffer.byteLength(header) + FormData2.LINE_BREAK.length;
      if (!value || !value.path && !(value.readable && value.hasOwnProperty("httpVersion"))) {
        return;
      }
      if (!options.knownLength) {
        this._valuesToMeasure.push(value);
      }
    };
    FormData2.prototype._lengthRetriever = function(value, callback) {
      if (value.hasOwnProperty("fd")) {
        if (value.end != void 0 && value.end != Infinity && value.start != void 0) {
          callback(null, value.end + 1 - (value.start ? value.start : 0));
        } else {
          fs3.stat(value.path, function(err, stat) {
            var fileSize;
            if (err) {
              callback(err);
              return;
            }
            fileSize = stat.size - (value.start ? value.start : 0);
            callback(null, fileSize);
          });
        }
      } else if (value.hasOwnProperty("httpVersion")) {
        callback(null, +value.headers["content-length"]);
      } else if (value.hasOwnProperty("httpModule")) {
        value.on("response", function(response2) {
          value.pause();
          callback(null, +response2.headers["content-length"]);
        });
        value.resume();
      } else {
        callback("Unknown stream");
      }
    };
    FormData2.prototype._multiPartHeader = function(field, value, options) {
      if (typeof options.header == "string") {
        return options.header;
      }
      var contentDisposition = this._getContentDisposition(value, options);
      var contentType = this._getContentType(value, options);
      var contents = "";
      var headers = {
        // add custom disposition as third element or keep it two elements if not
        "Content-Disposition": ["form-data", 'name="' + field + '"'].concat(contentDisposition || []),
        // if no content type. allow it to be empty array
        "Content-Type": [].concat(contentType || [])
      };
      if (typeof options.header == "object") {
        populate(headers, options.header);
      }
      var header;
      for (var prop in headers) {
        if (!headers.hasOwnProperty(prop)) continue;
        header = headers[prop];
        if (header == null) {
          continue;
        }
        if (!Array.isArray(header)) {
          header = [header];
        }
        if (header.length) {
          contents += prop + ": " + header.join("; ") + FormData2.LINE_BREAK;
        }
      }
      return "--" + this.getBoundary() + FormData2.LINE_BREAK + contents + FormData2.LINE_BREAK;
    };
    FormData2.prototype._getContentDisposition = function(value, options) {
      var filename, contentDisposition;
      if (typeof options.filepath === "string") {
        filename = path2.normalize(options.filepath).replace(/\\/g, "/");
      } else if (options.filename || value.name || value.path) {
        filename = path2.basename(options.filename || value.name || value.path);
      } else if (value.readable && value.hasOwnProperty("httpVersion")) {
        filename = path2.basename(value.client._httpMessage.path);
      }
      if (filename) {
        contentDisposition = 'filename="' + filename + '"';
      }
      return contentDisposition;
    };
    FormData2.prototype._getContentType = function(value, options) {
      var contentType = options.contentType;
      if (!contentType && value.name) {
        contentType = mime.lookup(value.name);
      }
      if (!contentType && value.path) {
        contentType = mime.lookup(value.path);
      }
      if (!contentType && value.readable && value.hasOwnProperty("httpVersion")) {
        contentType = value.headers["content-type"];
      }
      if (!contentType && (options.filepath || options.filename)) {
        contentType = mime.lookup(options.filepath || options.filename);
      }
      if (!contentType && typeof value == "object") {
        contentType = FormData2.DEFAULT_CONTENT_TYPE;
      }
      return contentType;
    };
    FormData2.prototype._multiPartFooter = function() {
      return function(next) {
        var footer = FormData2.LINE_BREAK;
        var lastPart = this._streams.length === 0;
        if (lastPart) {
          footer += this._lastBoundary();
        }
        next(footer);
      }.bind(this);
    };
    FormData2.prototype._lastBoundary = function() {
      return "--" + this.getBoundary() + "--" + FormData2.LINE_BREAK;
    };
    FormData2.prototype.getHeaders = function(userHeaders) {
      var header;
      var formHeaders = {
        "content-type": "multipart/form-data; boundary=" + this.getBoundary()
      };
      for (header in userHeaders) {
        if (userHeaders.hasOwnProperty(header)) {
          formHeaders[header.toLowerCase()] = userHeaders[header];
        }
      }
      return formHeaders;
    };
    FormData2.prototype.getBoundary = function() {
      if (!this._boundary) {
        this._generateBoundary();
      }
      return this._boundary;
    };
    FormData2.prototype._generateBoundary = function() {
      var boundary = "--------------------------";
      for (var i = 0; i < 24; i++) {
        boundary += Math.floor(Math.random() * 10).toString(16);
      }
      this._boundary = boundary;
    };
    FormData2.prototype.getLengthSync = function() {
      var knownLength = this._overheadLength + this._valueLength;
      if (this._streams.length) {
        knownLength += this._lastBoundary().length;
      }
      if (!this.hasKnownLength()) {
        this._error(new Error("Cannot calculate proper length in synchronous way."));
      }
      return knownLength;
    };
    FormData2.prototype.hasKnownLength = function() {
      var hasKnownLength = true;
      if (this._valuesToMeasure.length) {
        hasKnownLength = false;
      }
      return hasKnownLength;
    };
    FormData2.prototype.getLength = function(cb) {
      var knownLength = this._overheadLength + this._valueLength;
      if (this._streams.length) {
        knownLength += this._lastBoundary().length;
      }
      if (!this._valuesToMeasure.length) {
        process.nextTick(cb.bind(this, null, knownLength));
        return;
      }
      asynckit.parallel(this._valuesToMeasure, this._lengthRetriever, function(err, values) {
        if (err) {
          cb(err);
          return;
        }
        values.forEach(function(length) {
          knownLength += length;
        });
        cb(null, knownLength);
      });
    };
    FormData2.prototype.submit = function(params, cb) {
      var request2, options, defaults = { method: "post" };
      if (typeof params == "string") {
        params = parseUrl(params);
        options = populate({
          port: params.port,
          path: params.pathname,
          host: params.hostname,
          protocol: params.protocol
        }, defaults);
      } else {
        options = populate(params, defaults);
        if (!options.port) {
          options.port = options.protocol == "https:" ? 443 : 80;
        }
      }
      options.headers = this.getHeaders(params.headers);
      if (options.protocol == "https:") {
        request2 = https.request(options);
      } else {
        request2 = http.request(options);
      }
      this.getLength(function(err, length) {
        if (err) {
          this._error(err);
          return;
        }
        request2.setHeader("Content-Length", length);
        this.pipe(request2);
        if (cb) {
          request2.on("error", cb);
          request2.on("response", cb.bind(this, null));
        }
      }.bind(this));
      return request2;
    };
    FormData2.prototype._error = function(err) {
      if (!this.error) {
        this.error = err;
        this.pause();
        this.emit("error", err);
      }
    };
    FormData2.prototype.toString = function() {
      return "[object FormData]";
    };
  }
});

// src/bootstrap.ts
import path from "path";
import { EventEmitter } from "events";
var bootstrap = {
  version: `3.0.41`,
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
    WebhookSettings: [],
    GlobalSettings: {
      EventManagement: true,
      BetterEventNames: true,
      DisableGeometryParsing: false,
      UseShapefileCoordinates: false,
      SPCWatchesOnly: true,
      ShapefileSkipPoints: 15,
      NodeTTL: 60,
      NodeMinDistance: 120,
      EventFiltering: {
        ListeningEvents: [],
        ListeningICAO: [],
        ListeningUGC: [],
        ListeningStates: [],
        IgnoredICAO: [],
        IgnoredEvents: [`Test Message`],
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
  var _a, _b;
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
    const skip = Math.max(1, (_a = parseInt(String(bootstrap.settings.GlobalSettings.ShapefileSkipPoints), 10)) != null ? _a : 1);
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
    const skip = Math.max(1, (_b = parseInt(String(bootstrap.settings.GlobalSettings.ShapefileSkipPoints), 10)) != null ? _b : 1);
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
    if (geo == null) {
      geo = {
        type: `Polygon`,
        coordinates: []
      };
    }
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
  var _a, _b, _c;
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
  const max = (_c = options == null ? void 0 : options.max) != null ? _c : 1;
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
  bootstrap.listener.emit(`log`, `${(_a = options.title) != null ? _a : `[${bootstrap.ansi_colors.YELLOW}@atmosx/product-parser${bootstrap.ansi_colors.RESET}]`} ${options.message}`);
  if (settings.EnableJournal) {
    console.log(`${(_b = options.title) != null ? _b : `[${bootstrap.ansi_colors.YELLOW}@atmosx/product-parser${bootstrap.ansi_colors.RESET}]`} ${options.message}`);
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

// src/@core/core.createListener.ts
var createListener = (event, callback) => {
  setListener({ event, callback });
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
      entity.removeListener("nonza", listener2);
      reject(err);
    }
    function done(...args) {
      entity.removeListener("nonza", listener2);
      resolve6(...args);
    }
    function listener2(element) {
      return __async(this, null, function* () {
        try {
          yield handler(element, done);
        } catch (err) {
          onError(err);
        }
      });
    }
    stanza && entity.send(stanza).catch(onError);
    entity.on("nonza", listener2);
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
function listener(entity, middleware2, Context2) {
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
  const incomingListener = listener(entity, incoming, IncomingContext);
  const outgoingListener = listener(entity, outgoing, OutgoingContext);
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

// src/@modules/@xmpp/xmpp.xOnline.ts
var xOnline = () => {
  const settings = bootstrap.settings;
  bootstrap.session_xmpp.on(`online`, (address) => __async(null, null, function* () {
    bootstrap.cache.sigHault = false;
    bootstrap.cache.isConnected = true;
    bootstrap.cache.tReconnects = 0;
    const nickname = settings.NOAAWeatherWireServiceSettings.CredentialSettings.Nickname;
    bootstrap.session_xmpp.send(xml("presence", {
      to: `nwws@conference.nwws-oi.weather.gov/${nickname}`,
      xmlns: "http://jabber.org/protocol/muc"
    }));
    setEventEmit({
      event: `onServiceStatus`,
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
      event: `onServiceStatus`,
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
  TSU: `tsunami-watch`,
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
  "KLUB": "Lubbock, TX",
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
  "PACR": "Cordova, AK",
  "PAJK": "Juneau, AK"
};

// src/@building/building.office.ts
var getEventOffice = (options) => {
  var _a, _b, _c, _d, _e, _f, _g;
  const office = options.pVtec != null ? (_b = (_a = options.pVtec) == null ? void 0 : _a.tracking) == null ? void 0 : _b.split(`.`)[0] : (_e = (_c = options.attributes) == null ? void 0 : _c.cccc) != null ? _e : options.organization != null ? Array.isArray(options.organization) ? (_d = options.organization) == null ? void 0 : _d[0] : options.organization : null;
  const name = (_g = (_f = officeICAOs) == null ? void 0 : _f[office]) != null ? _g : null;
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
  "MODERATE LAKE EFFECT SNOWFALL RATES AND BLOWING SNOW": "Moderate Lake Effect Snowfall and Blowing Snow",
  "NO TSUNAMI THREAT": "No Active Tsunami Threat",
  "NO SIGNIFICANT TSUNAMI THREAT": "No Significant Tsunami Threat",
  "NO TSUNAMI IMPACTS ARE EXPECTED": "No Tsunami Impacts Expected",
  "A TSUNAMI THREAT EXISTS": "Tsunami Threat Exists",
  "TSUNAMI THREAT": "Active Tsunami Threat",
  "HEAT ILLNESSES": "Can cause heat illness",
  "WATCH POSSIBLE": "Watch Possible",
  "INTENSIFYING": "Intensifying",
  "CAPABLE OF PRODUCING A LANDSPOUT": "Landspout Possible"
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
  const properties2 = {
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
  if (isNaN(Number(properties2.watch_parameters.watch_number))) {
    properties2.watch_parameters.watch_number = null;
  }
  return properties2;
};

// src/@building/building.headers.ts
var getEventHeader = (options) => {
  var _a, _b, _c;
  const properties2 = options.properties;
  const vtec2 = (_a = options.vtec) != null ? _a : null;
  const ugc2 = properties2.geocode.ugc != null ? properties2.geocode.ugc.join(`-`) : `0`;
  return `ZCZC-ATMOSX-${options.getType.prefix}-${ugc2}-${(_b = vtec2 == null ? void 0 : vtec2.status) != null ? _b : `Issued`}-${(/* @__PURE__ */ new Date()).toISOString().replace(/[-:]/g, "").split(".")[0]}-${(_c = properties2.geocode.office.office) != null ? _c : `KWNS`}`;
};

// src/@dictionaries/dictionaries.eventsMatchText.ts
var eventsMatchText = {
  "Special Weather Statement": "Special Weather Statement",
  "Hurricane Warning": "Hurricane Warning",
  "Hurricane Force Wind Warning": "Hurricane Force Wind Warning",
  "Hurricane Watch": "Hurricane Watch",
  "Tropical Storm Warning": "Tropical Storm Warning",
  "Tropical Storm Watch": "Tropical Storm Watch",
  "High Wind Warning": "High Wind Warning",
  "Gale Warning": "Gale Warning",
  "Small Craft Advisory": "Small Craft Advisory",
  "Small Craft Warning": "Small Craft Warning",
  "Tsunami Warning": "Tsunami Warning",
  "Tsunami Watch": "Tsunami Watch",
  "Tsunami Advisory": "Tsunami Advisory",
  "Tsunami Information Statement": "Tsunami Information Statement",
  "Subscribers:": "National Weather Service Policy"
};

// src/@building/building.tracking.ts
var getEventTracking = (options) => {
  var _a, _b, _c, _d, _e, _f, _g;
  const properties2 = options.properties;
  const attributes = options.attributes;
  const stanza = options.stanza;
  const vtec2 = options.vtec;
  if (options.type === `RAW`) {
    const getWatchNumber = (_a = properties2.watch_parameters.watch_number) != null ? _a : null;
    if (getWatchNumber) {
      return `${properties2.geocode.office.office}.${stanza.getType.prefix}.A.${getWatchNumber}`;
    }
    return `${properties2.geocode.office.office}.${attributes.ttaaii}.${(_b = attributes.id.slice(-4).replace(`.`, ``)) != null ? _b : "0"}`;
  }
  if (options.type === `VTEC`) {
    return vtec2.tracking;
  }
  if (options.type === `API`) {
    if (options.vtec) {
      const vtecValue = Array.isArray(options.vtec) ? options.vtec[0] : options.vtec;
      const splitPVTEC = vtecValue.split(".");
      return `${splitPVTEC[2]}.${splitPVTEC[3]}.${splitPVTEC[4]}.${splitPVTEC[5]}`;
    }
    const wmoMatch = (_d = (_c = options.organization) == null ? void 0 : _c.wmoidentifier) == null ? void 0 : _d.match(/([A-Z]{4}\d{2})\s+([A-Z]{4})/);
    const station = (_e = wmoMatch == null ? void 0 : wmoMatch[2]) != null ? _e : "N/A";
    if (options.organization.featureId) {
      const idMatch = options.organization.featureId.match(/([a-f0-9]+)\.(\d+)\.(\d+)$/);
      return `${station}.${(_f = idMatch == null ? void 0 : idMatch[1]) != null ? _f : "N/A"}`;
    }
    const id2 = (_g = wmoMatch == null ? void 0 : wmoMatch[1]) != null ? _g : "N/A";
    return `${station}.${id2}`;
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
    "Radar Confirmed Tornado Warning": {
      description: "source...radar confirmed tornado.",
      tornado: `OBSERVED`
    },
    "Confirmed Tornado Warning": {
      tornado: `OBSERVED`
    },
    "Radar Indicated Tornado Warning": {}
  },
  "Blizzard Warning": {
    "PDS Blizzard Warning": {
      description: "particularly dangerous situation"
    }
  },
  "Ice Storm Warning": {
    "PDS Ice Storm Warning": {
      description: "particularly dangerous situation"
    }
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
  { type: "Statement", name: "Statement", isCancel: false, isUpdate: false, isIssued: true, isStatement: true },
  { type: "Update", name: "Updated", isCancel: false, isUpdate: true, isIssued: false, isStatement: false },
  { type: "Cancel", name: "Cancelled", isCancel: true, isUpdate: false, isIssued: false, isStatement: false },
  { type: "Alert", name: "Issued", isCancel: false, isUpdate: false, isIssued: true, isStatement: false },
  { type: "Updated", name: "Updated", isCancel: false, isUpdate: true, isIssued: false, isStatement: false },
  { type: "Expired", name: "Expired", isCancel: true, isUpdate: false, isIssued: false, isStatement: false },
  { type: "Issued", name: "Issued", isCancel: false, isUpdate: false, isIssued: true, isStatement: false },
  { type: "Extended", name: "Extended", isCancel: false, isUpdate: true, isIssued: false, isStatement: false },
  { type: "Correction", name: "Correction", isCancel: false, isUpdate: true, isIssued: false, isStatement: false },
  { type: "Upgraded", name: "Upgraded", isCancel: false, isUpdate: true, isIssued: false, isStatement: false },
  { type: "Cancelled", name: "Cancelled", isCancel: true, isUpdate: false, isIssued: false, isStatement: false },
  { type: "Routine", name: "Routine", isCancel: false, isUpdate: true, isIssued: false, isStatement: false }
];

// src/@dictionaries/dictionaries.eventCancelMessages.ts
var eventCancelMessages = [
  "has been cancelled",
  "subsided sufficiently for the advisory to be cancelled",
  "has been cancelled",
  "will be allowed to expire",
  "has diminished",
  "and no longer",
  "has been replaced",
  "The threat has ended",
  "has weakened below severe"
];

// src/@dictionaries/dictionaries.testSignatures.ts
var testSignatures = [
  `This is a test message`,
  `Monitoring message only.`,
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
  ".75": "Penny",
  ".88": "Nickel",
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
  var _a, _b, _c, _d, _e, _f;
  const properties2 = event == null ? void 0 : event.properties;
  const vtec2 = (_b = (_a = event == null ? void 0 : event.properties) == null ? void 0 : _a.metadata) == null ? void 0 : _b.vtec;
  const status = statusCorrelationText.find((c) => c.type === (properties2 == null ? void 0 : properties2.status));
  const csig = eventCancelMessages.find((sig) => properties2.description.toLowerCase().includes(sig.toLowerCase()));
  properties2.status_metadata = __spreadProps(__spreadValues({}, properties2.status_metadata), { is_issued: true, is_test: false });
  if (properties2.parameters.estimated_hail_size) {
    properties2.parameters.estimated_hail_size += ` (${(_c = hailStrings[properties2.parameters.estimated_hail_size]) != null ? _c : "--"})`;
  }
  if (status) {
    properties2.status = (_d = status.name) != null ? _d : properties2.status;
    properties2.status_metadata = __spreadProps(__spreadValues({}, properties2.status_metadata), { is_updated: !!status.isUpdate, is_issued: !!status.isIssued, is_expired: !!status.isCancel, is_statement: !!status.isStatement });
  }
  if (csig) {
    properties2.status_metadata = __spreadProps(__spreadValues({}, properties2.status_metadata), { is_expired: true });
  }
  const getProduct = (_f = (_e = vtec2 == null ? void 0 : vtec2.vtec) == null ? void 0 : _e.split(`.`)[0]) == null ? void 0 : _f.replace(`/`, ``);
  const isTestProduct = eventProducts[getProduct] == `Test Product`;
  if (isTestProduct || testSignatures.some((sig) => {
    var _a2, _b2, _c2, _d2;
    return (_d2 = (_a2 = properties2.description) == null ? void 0 : _a2.toLowerCase().includes(sig.toLowerCase())) != null ? _d2 : (_c2 = (_b2 = properties2 == null ? void 0 : properties2.parameters) == null ? void 0 : _b2.instructions) == null ? void 0 : _c2.toLowerCase().includes(sig.toLowerCase());
  })) {
    properties2.status_metadata = __spreadProps(__spreadValues({}, properties2.status_metadata), { is_test: true });
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

// src/@modules/@utilities/utilities.createHttp.ts
import request from "request";
var createHttp = (options) => __async(null, null, function* () {
  return new Promise((resolve6, reject) => {
    var _a, _b, _c, _d, _e;
    const requestOptions = {
      url: (_a = options.url) != null ? _a : `https://api.weather.gov/alerts/active`,
      headers: (_b = options.headers) != null ? _b : {
        "User-Agent": "AtmosphericX",
        "Accept": "application/geo+json, text/plain, */*; q=0.9",
        "Accept-Language": "en-US,en;q=0.9"
      },
      method: (_c = options.method) != null ? _c : `GET`,
      timeout: (_d = options.timeout) != null ? _d : 1e4,
      proxy: (_e = options.proxy) != null ? _e : null,
      maxRedirects: 1
    };
    if (options.formData) {
      requestOptions["formData"] = options.formData;
    } else if (options.body) {
      requestOptions["body"] = options.body;
    }
    request(requestOptions, (error, response2, body) => {
      var _a2, _b2, _c2, _d2, _e2;
      if (error) {
        return resolve6({
          error: true,
          options: requestOptions,
          status: -1,
          message: (_a2 = error.message) != null ? _a2 : `Unknown Error`
        });
      }
      if (response2.statusCode < 200 || response2.statusCode >= 300) {
        return resolve6({
          error: true,
          options: requestOptions,
          status: (_b2 = response2.statusCode) != null ? _b2 : -1,
          message: `HTTP Status Code ${(_c2 = response2.statusCode) != null ? _c2 : `Unknown Status Code`} (${body})`
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
        status: (_e2 = response2.statusCode) != null ? _e2 : -1,
        message: body
      });
    });
  });
});

// src/@manager/manager.createWebhook.ts
var import_form_data = __toESM(require_form_data());
var createWebhook = (options) => __async(null, null, function* () {
  var _a, _b, _c, _d, _e, _f;
  const event = options.event.properties;
  const settings = options.webhook;
  let body = [
    event.locations ? `**Locations**: ${event.locations.slice(0, 100)}` : null,
    event.issued ? `**Issued**: <t:${Math.floor(new Date(event.issued).getTime() / 1e3)}:R>` : null,
    event.expires && event.status != `Statement` ? `**Expires**: <t:${Math.floor(new Date(event.expires).getTime() / 1e3)}:R>` : null,
    (() => {
      var _a2, _b2;
      const val = (_a2 = event.parameters.estimated_wind_gusts) != null ? _a2 : null;
      const th = (_b2 = event.parameters.wind_threat) != null ? _b2 : null;
      const combined = [val, th].filter(Boolean).join(" ");
      return combined ? `**Wind Gusts**: ${val} ${th ? `(${th})` : ""}` : null;
    })(),
    (() => {
      var _a2, _b2;
      const val = (_a2 = event.parameters.estimated_hail_size) != null ? _a2 : null;
      const th = (_b2 = event.parameters.hail_threat) != null ? _b2 : null;
      return (val != null ? val : th) ? `**Hail Threat**: ${val} ${th ? `(${th})` : ""}` : null;
    })(),
    event.parameters.damage_threat ? `**Damage Threat**: ${event.parameters.damage_threat}` : null,
    event.parameters.flood_threat ? `**Flood Threat**: ${event.parameters.flood_threat}` : null,
    event.parameters.tornado_threat ? `**Tornado Threat**: ${event.parameters.tornado_threat}` : null,
    event.spc_parameters.spc_max_tornado ? `**Max Tornado Threat**: ${event.spc_parameters.spc_max_tornado}` : null,
    event.spc_parameters.spc_max_hail ? `**Max Hail Threat**: ${event.spc_parameters.spc_max_hail}` : null,
    event.spc_parameters.spc_max_wind ? `**Max Wind Threat**: ${event.spc_parameters.spc_max_wind}` : null,
    event.spc_parameters.spc_watch_issuance ? `**Watch Issuance**: ${event.spc_parameters.spc_watch_issuance}%` : null,
    event.watch_parameters.watch_number ? `**Watch Number**: ${event.watch_parameters.watch_number}` : null,
    event.watch_parameters.strong_tornadoes_probability ? `**Strong Tornadoes Probability**: ${event.watch_parameters.strong_tornadoes_probability}%` : null,
    event.watch_parameters.additional_tornadoes_probability ? `**Additional Tornadoes Probability**: ${event.watch_parameters.additional_tornadoes_probability}%` : null,
    event.watch_parameters.combined_hail_wind_probability ? `**Combined Hail/Wind Probability**: ${event.watch_parameters.combined_hail_wind_probability}%` : null,
    event.watch_parameters.severe_hail_probability ? `**Severe Hail Probability**: ${event.watch_parameters.severe_hail_probability}%` : null,
    event.watch_parameters.hail_2in_probability ? `**Hail \u22652in Probability**: ${event.watch_parameters.hail_2in_probability}%` : null,
    event.watch_parameters.max_hail_in ? `**Max Hail Inches**: ${event.watch_parameters.max_hail_in}` : null,
    event.watch_parameters.severe_wind_probability ? `**Severe Wind Probability**: ${event.watch_parameters.severe_wind_probability}%` : null,
    event.watch_parameters.max_wind_surface ? `**Max Surface Wind**: ${event.watch_parameters.max_wind_surface}` : null,
    event.watch_parameters.max_tops_x100feet ? `**Max Tops (x100 feet)**: ${event.watch_parameters.max_tops_x100feet}` : null,
    ((_a = event.parameters.tags) == null ? void 0 : _a.length) > 0 ? `**Tags**: ${event.parameters.tags.join(", ")}` : null,
    (() => {
      var _a2, _b2, _c2, _d2, _e2, _f2;
      const val = (_c2 = (_b2 = (_a2 = event.geocode) == null ? void 0 : _a2.office) == null ? void 0 : _b2.name) != null ? _c2 : `N/A`;
      const th = (_f2 = (_e2 = (_d2 = event.geocode) == null ? void 0 : _d2.office) == null ? void 0 : _e2.office) != null ? _f2 : null;
      return (val != null ? val : th) ? `**Sender**: ${val} ${th ? `(${th})` : ""}` : null;
    })(),
    ((_b = event.metadata) == null ? void 0 : _b.tracking) ? `**Tracking**: ${event.metadata.tracking}` : null,
    ((_c = event.metadata.history) == null ? void 0 : _c.length) > 0 ? `**Updates**: ${event.metadata.history.length}` : null,
    (() => {
      var _a2;
      if (event.status == `Expired`) {
        return null;
      }
      const desc = ((_a2 = event.description) != null ? _a2 : "").split("\n").map((l) => l.trim()).filter(Boolean).join("\n");
      return desc ? "```\n" + desc + "\n```" : null;
    })()
  ].filter(Boolean).join("\n");
  const isLimited = setTimeoutAction({ identifier: options.webhook.webhook, interval: options.webhook.rate, max: options.webhook.rate, addTime: true });
  if (isLimited.limited) {
    return;
  }
  if (body.length > 1900) {
    body = body.substring(0, 1900) + "\n\n[Message truncated due to length]";
    const blocks = ((_d = body.match(/```/g)) != null ? _d : []).length;
    if (blocks % 2 !== 0) body += "```";
  }
  const form = new import_form_data.default();
  const embed = {
    title: `${event.event} (${event.status})`,
    description: body,
    color: 16711680,
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    footer: { text: settings.title }
  };
  form.append("payload_json", JSON.stringify({
    username: (_e = settings.title) != null ? _e : "AtmosphericX",
    content: (_f = settings.message) != null ? _f : "",
    embeds: [embed]
  }));
  if (settings.upload) {
    form.append("file", Buffer.from(JSON.stringify(getCleanedEvent(event), null, 2)), {
      filename: `${event.event}_${event.status}_${event.metadata.tracking}.json`,
      contentType: "application/json"
    });
  }
  yield createHttp({
    url: settings.webhook,
    timeout: 2e3,
    method: `POST`,
    headers: form.getHeaders(),
    body: form
  });
});

// src/@manager/manager.updateWebhooks.ts
var updateWebhooks = (event) => __async(null, null, function* () {
  const settings = bootstrap.settings;
  const webhooks = settings.WebhookSettings;
  const eventName = event.properties.event;
  for (const socket of webhooks) {
    const events = socket.events;
    if (!events || events.length === 0) {
      yield createWebhook({ webhook: socket, event });
      continue;
    }
    const matched = events.some((pattern) => {
      if (!pattern) return false;
      if (pattern === "*" || pattern === eventName) return true;
      if (pattern.includes("*")) {
        const regex = "^" + pattern.replace(/[.+^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*") + "$";
        return new RegExp(regex).test(eventName);
      }
      return false;
    });
    if (matched) {
      yield createWebhook({ webhook: socket, event });
    }
  }
});

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
var updateNode = (selectedEvent) => __async(null, null, function* () {
  const events = bootstrap.cache.events.features;
  const ttl = bootstrap.settings.GlobalSettings.NodeTTL * 1e3;
  let total = 0;
  function update(evt) {
    return __async(this, null, function* () {
      var _a, _b, _c;
      const lastUpdate = (_c = (_b = (_a = evt == null ? void 0 : evt.properties) == null ? void 0 : _a.metadata) == null ? void 0 : _b.updated) != null ? _c : null;
      if (lastUpdate != null && Date.now() - lastUpdate < ttl) {
        return evt;
      }
      const node = yield getEventNodes(evt);
      if (node.nodes.length > 0) {
        total++;
      }
      evt.properties.metadata.nodes = node.nodes;
      evt.properties.metadata.filtered_proximity = node.filtered;
      evt.properties.metadata.updated = node.updated;
    });
  }
  if (!selectedEvent) {
    yield Promise.all(events.map((evt) => __async(null, null, function* () {
      yield update(evt);
    })));
  }
  if (selectedEvent) {
    yield update(selectedEvent);
  }
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

// src/@manager/manager.mkEvent.ts
var mkEvent = (event) => __async(null, null, function* () {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w;
  const settings = bootstrap.settings;
  const features = bootstrap.cache.events.features;
  const getHash = event.properties.metadata.hash;
  const getTracking = event.properties.metadata.tracking;
  const isEntry = (_a = bootstrap.cache.hashes) == null ? void 0 : _a.find((hash) => hash.tracking === getTracking);
  const isHashed = (_c = (_b = isEntry == null ? void 0 : isEntry.hashes) == null ? void 0 : _b.includes(getHash)) != null ? _c : false;
  const getFeature = features.find((feature) => feature.properties.metadata.tracking === getTracking);
  if (isHashed || event.properties.status_metadata.is_expired) return;
  setHash(event, isEntry);
  const isFilteredLocation = yield updateNode(event).then(() => event.properties.metadata.filtered_proximity);
  if (!isFilteredLocation && settings.GlobalSettings.EventFiltering.NodeLocationFiltering) {
    return;
  }
  setEventEmit({
    event: `onEventStatus`,
    metadata: {
      type: getFeature ? `Updated` : `New`,
      event
    },
    message: `[${getFeature ? "Updated" : "New"}] ${event.properties.event} (${event.properties.status}) (${event.properties.metadata.tracking})`
  });
  if (settings.GlobalSettings.EventManagement) {
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
        updateWebhooks(bootstrap.cache.events.features[getIndex]);
      } else {
        features.push(event);
        updateWebhooks(event);
      }
    }
  }
});

// src/@manager/manager.rmEvent.ts
var rmEvent = (event) => {
  const getEvent = bootstrap.cache.events.features.find((f) => {
    var _a, _b, _c, _d;
    return ((_b = (_a = f == null ? void 0 : f.properties) == null ? void 0 : _a.metadata) == null ? void 0 : _b.tracking) === ((_d = (_c = event == null ? void 0 : event.properties) == null ? void 0 : _c.metadata) == null ? void 0 : _d.tracking);
  });
  const cachedStatus = event.properties.status;
  event.properties.expires = (/* @__PURE__ */ new Date()).toISOString();
  event.properties.status = `Expired`;
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
    if (cachedStatus != `Statement`) updateWebhooks(event);
    bootstrap.cache.events.features.splice(bootstrap.cache.events.features.indexOf(getEvent), 1);
    bootstrap.cache.hashes = bootstrap.cache.hashes.filter((hash) => hash.tracking !== event.properties.metadata.tracking);
  }
  setEventEmit({
    event: `onEventCache`,
    metadata: bootstrap.cache.events,
    limited: true
  });
};

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
    var _a2, _b, _c, _d, _e;
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
    properties2.metadata.hash = createHash("sha256").update(JSON.stringify(filteredProperties)).digest("hex");
    setEventEmit({ event: `onProductType${enhancedEventName.replace(/\s+/g, "")}`, metadata: define2 });
    if (properties2.status_metadata.is_test) {
      setEventEmit({ event: `onTestProduct`, metadata: define2 });
      if (bools == null ? void 0 : bools.IgnoreTestProducts) return false;
    }
    if (properties2.status_metadata.is_expired) {
      setEventEmit({ event: `onExpiredProduct`, metadata: define2 });
      rmEvent(define2);
      return false;
    }
    if ((_c = (_b = properties2.metadata) == null ? void 0 : _b.vtec) == null ? void 0 : _c.is_watch) {
      const isSPC = (_e = (_d = properties2.metadata) == null ? void 0 : _d.vtec) == null ? void 0 : _e.prediction_center;
      setEventEmit({ event: isSPC ? `onStormPredictionWatch` : `onNonStormPredictionWatch`, metadata: define2 });
      if ((bools == null ? void 0 : bools.SPCWatchesOnly) && !isSPC) {
        return false;
      }
      if (!(bools == null ? void 0 : bools.SPCWatchesOnly) && isSPC) {
        return false;
      }
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
  yield updateNode();
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
    let event = Object.keys(eventsMatchText).find((event2) => message.toLowerCase().includes(event2.toLowerCase()));
    let isStatement = false;
    if (!event) {
      event = stanza.getType.type.split(`-`).map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(` `);
      isStatement = true;
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
        status: isStatement ? `Statement` : `Issued`,
        issued: !isNaN(issued.getTime()) ? issued.toISOString() : (/* @__PURE__ */ new Date()).toISOString(),
        expires: isStatement ? new Date(issued.getTime() + 120 * 1e3).toISOString() : !isNaN(expires.getTime()) ? expires.toISOString() : new Date(Date.now() + 60 * 60 * 1e3).toISOString()
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
      const expires = new Date(ugc2.expires);
      const header = getEventHeader({ properties: props, getType: stanza.getType });
      let event = Object.keys(eventsMatchText).find((event2) => message.toLowerCase().includes(event2.toLowerCase()));
      let isStatement = false;
      if (!event) {
        event = stanza.getType.type.split(`-`).map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(` `);
        isStatement = true;
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
          status: isStatement ? `Statement` : `Issued`,
          issued: !isNaN(issued.getTime()) ? issued.toISOString() : (/* @__PURE__ */ new Date()).toISOString(),
          expires: isStatement ? new Date(issued.getTime() + 120 * 1e3).toISOString() : !isNaN(expires.getTime()) ? expires.toISOString() : new Date(Date.now() + 60 * 60 * 1e3).toISOString()
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
      tracking: `${sub[2]}.${sub[3]}.${sub[4]}.${sub[5]}`,
      event: `${eventTypes[sub[3]]} ${eventActions[sub[4]]}`,
      status: eventStatus[sub[1]],
      organization: (_d = (_c = message.match(regExp.wmo)) == null ? void 0 : _c[0]) != null ? _d : null,
      expires: getExpiry2(dates),
      is_watch: (sub[4] == `A` || sub[4] == `Y`) && (sub[3] == `TO` || sub[3] == `SV`),
      prediction_center: sub[2] == `KWNS` ? true : false
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
  var _a, _b, _c, _d, _e;
  let processed = [];
  const getMessages = (_c = (_b = (_a = stanza == null ? void 0 : stanza.message) == null ? void 0 : _a.split(/(?=\$\$)/g)) == null ? void 0 : _b.map((message) => message.trim())) == null ? void 0 : _c.filter((message) => message && message !== "$$");
  if (!getMessages || (getMessages == null ? void 0 : getMessages.length) == 0) return;
  for (const message of getMessages) {
    const tick = performance.now();
    const attributes = stanza == null ? void 0 : stanza.attributes;
    const pVtec = pvExtract(message);
    const hVtec = hvExtract(message);
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
            expires: !isNaN(expires.getTime()) ? expires.toISOString() : (_e = ugc2.expires) != null ? _e : new Date(issued.getTime() + 60 * 60 * 1e3).toISOString()
          }, props), {
            metadata: {
              ms: performance.now() - tick,
              source: `events.vtec`,
              tracking: getEventTracking({ type: `VTEC`, stanza, attributes, properties: props, vtec: vtec2 }),
              header,
              vtec: pv,
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
    if (!settings.NOAAWeatherWireServiceSettings.CacheSettings.Enabled) {
      return;
    }
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
    setEventEmit({
      event: `onServiceStatus`,
      metadata: {
        message: stanza,
        from: msgFrom,
        type: `stanza`
      }
    });
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
        event: `onServiceStatus`,
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
      event: `onServiceStatus`,
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

// src/@modules/@utilities/utilities.setSleep.ts
var setSleep = (options) => __async(null, null, function* () {
  return new Promise((resolve6) => {
    setTimeout(() => {
      resolve6();
    }, options.timeout);
  });
});

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
  if (interval < 15) {
    setWarning({ message: `Reconnection interval of ${interval} seconds is too low, setting to 15 seconds` });
    interval = 15;
    bootstrap.settings.NOAAWeatherWireServiceSettings.ReconnectionSettings.ReconnectionInterval = 15;
  }
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
          event: `onServiceStatus`,
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

// src/@modules/@utilities/utilities.setCronSchedule.ts
var setCronSchedule = () => __async(null, null, function* () {
  const settings = bootstrap.settings;
  if (settings.EnableWireService) {
    if (settings.NOAAWeatherWireServiceSettings.ReconnectionSettings.Enabled) {
      void xReconnect(settings.NOAAWeatherWireServiceSettings.ReconnectionSettings.ReconnectionInterval);
    }
  } else {
    const response2 = yield createHttp({
      url: settings.NationalWeatherServiceSettings.EventsEndpoint,
      headers: {
        "User-Agent": "@atmosx/event-product-parser"
      }
    });
    if (response2.error) {
      return setEventEmit({
        event: `onServiceStatus`,
        metadata: {
          type: "fetch-api",
          message: `Failed to fetch latest events from National Weather Service API - ${response2.message}`,
          data: {},
          error: true
        }
      });
    }
    setEventEmit({
      event: `onServiceStatus`,
      metadata: {
        message: `Fetched latest events from National Weather Service API`,
        data: {},
        type: "fetch-api",
        error: false
      }
    });
    createEvent({ message: response2.message, isNWWS: false });
  }
});

// src/@manager/manager.updateEvents.ts
var updateEvents = (selectedEvent) => __async(null, null, function* () {
  const events = bootstrap.cache.events.features;
  function update(evt) {
    return __async(this, null, function* () {
      if (new Date(evt.properties.expires) < /* @__PURE__ */ new Date()) {
        rmEvent(evt);
      }
    });
  }
  if (!selectedEvent) {
    yield Promise.all(events.map((evt) => __async(null, null, function* () {
      yield update(evt);
    })));
  }
  if (selectedEvent) {
    yield update(selectedEvent);
  }
});

// src/@core/core.start.ts
import { Cron } from "croner";
var startService = (configurations) => __async(null, null, function* () {
  if (!bootstrap.isReady) {
    return setWarning({
      message: `You can not create another instance without shutting down the current one first, please make sure to call the stop() method first!`
    });
  }
  const settings = setSettings(configurations);
  bootstrap.isReady = true;
  yield initializeDatabase();
  if (settings.EnableWireService) {
    (() => __async(null, null, function* () {
      yield getCachedEvents();
      yield xDeploy();
    }))();
  }
  yield setCronSchedule();
  let scheduleInterval = !settings.EnableWireService ? settings.NationalWeatherServiceSettings.CallbackInterval : 1;
  if (!settings.EnableWireService && scheduleInterval < 15) {
    setWarning({ message: `Schedule interval of ${scheduleInterval} seconds is too low, setting to 15 seconds` });
    bootstrap.settings.NationalWeatherServiceSettings.CallbackInterval = 15;
    scheduleInterval = 15;
  }
  bootstrap.cron = new Cron(`*/${scheduleInterval} * * * * *`, () => __async(null, null, function* () {
    yield setCronSchedule();
  }));
  bootstrap.cron = new Cron(`* * * * * *`, () => __async(null, null, function* () {
    yield updateNode();
    yield updateEvents();
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

// src/@dictionaries/dictionaries.transcribedMessageReplacements.ts
var transcribedMessageReplacements = [
  { regex: /\*/g, replacement: "" },
  { regex: /\.{3,}/g, replacement: "" },
  { regex: /\bUTC\b/g, replacement: "Coordinated Universal Time" },
  { regex: /\bGMT\b/g, replacement: "Greenwich Mean Time" },
  { regex: /\bEST\b(?!\w)/g, replacement: "Eastern Standard Time" },
  { regex: /\bEDT\b(?!\w)/g, replacement: "Eastern Daylight Time" },
  { regex: /\bCST\b(?!\w)/g, replacement: "Central Standard Time" },
  { regex: /\bCDT\b(?!\w)/g, replacement: "Central Daylight Time" },
  { regex: /\bMST\b(?!\w)/g, replacement: "Mountain Standard Time" },
  { regex: /\bMDT\b(?!\w)/g, replacement: "Mountain Daylight Time" },
  { regex: /\bPST\b(?!\w)/g, replacement: "Pacific Standard Time" },
  { regex: /\bPDT\b(?!\w)/g, replacement: "Pacific Daylight Time" },
  { regex: /\bAKST\b(?!\w)/g, replacement: "Alaska Standard Time" },
  { regex: /\bAKDT\b(?!\w)/g, replacement: "Alaska Daylight Time" },
  { regex: /\bHST\b(?!\w)/g, replacement: "Hawaii Standard Time" },
  { regex: /\bHDT\b(?!\w)/g, replacement: "Hawaii Daylight Time" },
  { regex: /\bmph\b(?!\w)/g, replacement: "miles per hour" },
  { regex: /\bkm\/h\b(?!\w)/g, replacement: "kilometers per hour" },
  { regex: /\bkmh\b(?!\w)/g, replacement: "kilometers per hour" },
  { regex: /\bkt\b(?!\w)/g, replacement: "knots" },
  { regex: /\bNE\b(?!\w)/g, replacement: "northeast" },
  { regex: /\bNW\b(?!\w)/g, replacement: "northwest" },
  { regex: /\bSE\b(?!\w)/g, replacement: "southeast" },
  { regex: /\bSW\b(?!\w)/g, replacement: "southwest" },
  { regex: /\bNM\b(?!\w)/g, replacement: "nautical miles" },
  { regex: /\bdeg\b(?!\w)/g, replacement: "degrees" },
  { regex: /\btstm\b(?!\w)/g, replacement: "thunderstorm" },
  { regex: /\bmm\b(?!\w)/g, replacement: "millimeters" },
  { regex: /\bcm\b(?!\w)/g, replacement: "centimeters" },
  { regex: /\bin.\b(?!\w)/g, replacement: "inches" },
  { regex: /\bft\b(?!\w)/g, replacement: "feet" },
  { regex: /\bmi\b(?!\w)/g, replacement: "miles" },
  { regex: /\bhr\b(?!\w)/g, replacement: "hour" },
  { regex: /\bhourly\b(?!\w)/g, replacement: "per hour" },
  { regex: /\bkg\b(?!\w)/g, replacement: "kilograms" },
  { regex: /\bg\/kg\b(?!\w)/g, replacement: "grams per kilogram" },
  { regex: /\bmb\b(?!\w)/g, replacement: "millibars" },
  { regex: /\bhPa\b(?!\w)/g, replacement: "hectopascals" },
  { regex: /\bPa\b(?!\w)/g, replacement: "pascals" },
  { regex: /\bKPa\b(?!\w)/g, replacement: "kilopascals" },
  { regex: /\bC\/hr\b(?!\w)/g, replacement: "degrees Celsius per hour" },
  { regex: /\bF\/hr\b(?!\w)/g, replacement: "degrees Fahrenheit per hour" },
  { regex: /\bC\/min\b(?!\w)/g, replacement: "degrees Celsius per minute" },
  { regex: /\bF\/min\b(?!\w)/g, replacement: "degrees Fahrenheit per minute" },
  { regex: /\bC\b(?!\w)/g, replacement: "degrees Celsius" },
  { regex: /\bF\b(?!\w)/g, replacement: "degrees Fahrenheit" }
];

// src/@modules/@eas/eas.getWavPCM16.ts
var getWavPCM16 = (buffer) => {
  if (buffer.toString("ascii", 0, 4) !== "RIFF" || buffer.toString("ascii", 8, 12) !== "WAVE") {
    return null;
  }
  let fmt = null;
  let data = null;
  let i = 12;
  while (i + 8 <= buffer.length) {
    const id2 = buffer.toString("ascii", i, i + 4);
    const size = buffer.readUInt32LE(i + 4);
    const start = i + 8;
    const end = start + size;
    if (id2 === "fmt ") fmt = buffer.slice(start, end);
    if (id2 === "data") data = buffer.slice(start, end);
    i = end + size % 2;
  }
  if (!fmt || !data) return null;
  const audioFormat = fmt.readUInt16LE(0);
  const channels = fmt.readUInt16LE(2);
  const sampleRate = fmt.readUInt32LE(4);
  const bitsPerSample = fmt.readUInt16LE(14);
  if (audioFormat !== 1 || bitsPerSample !== 16 || channels !== 1) {
    return null;
  }
  const samples = new Int16Array(data.buffer, data.byteOffset, data.length / 2);
  return { samples: new Int16Array(samples), sampleRate, channels, bitsPerSample };
};

// src/@modules/@eas/eas.getSampledPCM16.ts
var getSampledPCM16 = (int16, originalRate, targetRate) => {
  if (originalRate === targetRate) return int16;
  const ratio = targetRate / originalRate;
  const outLen = Math.max(1, Math.round(int16.length * ratio));
  const out = new Int16Array(outLen);
  for (let i = 0; i < outLen; i++) {
    const pos = i / ratio;
    const i0 = Math.floor(pos);
    const i1 = Math.min(i0 + 1, int16.length - 1);
    const frac = pos - i0;
    const v = int16[i0] * (1 - frac) + int16[i1] * frac;
    out[i] = Math.round(v);
  }
  return out;
};

// src/@modules/@eas/eas.getPCMToFloat.ts
var getPCMToFloat = (int16) => {
  const out = new Float32Array(int16.length);
  for (let i = 0; i < int16.length; i++) out[i] = int16[i] / 32768;
  return out;
};

// src/@modules/@eas/eas.getFloatPCM16.ts
var getFloatPCM16 = (float32) => {
  const out = new Int16Array(float32.length);
  for (let i = 0; i < float32.length; i++) {
    let v = Math.max(-1, Math.min(1, float32[i]));
    out[i] = Math.round(v * 32767);
  }
  return out;
};

// src/@modules/@eas/eas.setRadioEffect.ts
var setRadioEffect = (int16, sampleRate) => {
  const hpCut = 3555;
  const lpCut = 1600;
  const x = getPCMToFloat(int16);
  const dt = 1 / sampleRate;
  const rcHP = 1 / (2 * Math.PI * hpCut);
  const aHP = rcHP / (rcHP + dt);
  let yHP = 0, xPrev = 0;
  for (let i = 0; i < x.length; i++) {
    const xi = x[i];
    yHP = aHP * (yHP + xi - xPrev);
    xPrev = xi;
    x[i] = yHP;
  }
  const rcLP = 1 / (2 * Math.PI * lpCut);
  const aLP = dt / (rcLP + dt);
  let yLP = 0;
  for (let i = 0; i < x.length; i++) {
    yLP = yLP + aLP * (x[i] - yLP);
    x[i] = yLP;
  }
  const compGain = 2;
  const norm = Math.tanh(compGain);
  for (let i = 0; i < x.length; i++) x[i] = Math.tanh(x[i] * compGain) / norm;
  return getFloatPCM16(x);
};

// src/@modules/@eas/eas.setAFSK.ts
var setAFSK = (bits, sampleRate) => {
  const baud = 520.83;
  const markFreq = 2083.3;
  const spaceFreq = 1562.5;
  const amplitude = 0.6;
  const twoPi = Math.PI * 2;
  const result = [];
  let phase = 0;
  let frac = 0;
  for (let b = 0; b < bits.length; b++) {
    const bit = bits[b];
    const freq = bit ? markFreq : spaceFreq;
    const samplesPerBit = sampleRate / baud + frac;
    const n = Math.round(samplesPerBit);
    frac = samplesPerBit - n;
    const inc = twoPi * freq / sampleRate;
    for (let i = 0; i < n; i++) {
      result.push(Math.round(Math.sin(phase) * amplitude * 32767));
      phase += inc;
      if (phase > twoPi) phase -= twoPi;
    }
  }
  const fadeSamples = Math.floor(sampleRate * 2e-3);
  for (let i = 0; i < fadeSamples; i++) {
    const gain = i / fadeSamples;
    result[i] = Math.round(result[i] * gain);
    result[result.length - 1 - i] = Math.round(result[result.length - 1 - i] * gain);
  }
  return Int16Array.from(result);
};

// src/@modules/@eas/eas.setAsciiToBits.ts
var setAsciiToBits = (str) => {
  const bits = [];
  for (let i = 0; i < str.length; i++) {
    const c = str.charCodeAt(i) & 255;
    bits.push(0);
    for (let b = 0; b < 8; b++) bits.push(c >> b & 1);
    bits.push(1, 1);
  }
  return bits;
};

// src/@modules/@eas/eas.getMergedPCM16.ts
var getMergedPCM16 = (arrays) => {
  let total = 0;
  for (const a of arrays) total += a.length;
  const out = new Int16Array(total);
  let o = 0;
  for (const a of arrays) {
    out.set(a, o);
    o += a.length;
  }
  return out;
};

// src/@modules/@eas/eas.setSameHeader.ts
var setSameHeader = (vtec2, repeats, sampleRate = 8e3, options = {}) => {
  var _a, _b;
  const preMarkSec = (_a = options.preMarkSec) != null ? _a : 0.3;
  const gapSec = (_b = options.gapSec) != null ? _b : 0.1;
  const bursts = [];
  const gap = new Int16Array(Math.floor(gapSec * sampleRate));
  for (let i = 0; i < repeats; i++) {
    const bodyBits = setAsciiToBits(vtec2);
    const body = setAFSK(bodyBits, sampleRate);
    const extendedBodyDuration = Math.round(preMarkSec * sampleRate);
    const extendedBody = new Int16Array(extendedBodyDuration + gap.length);
    for (let j2 = 0; j2 < extendedBodyDuration; j2++) {
      extendedBody[j2] = Math.round(body[j2 % body.length] * 0.2);
    }
    extendedBody.set(gap, extendedBodyDuration);
    bursts.push(extendedBody);
    if (i !== repeats - 1) bursts.push(gap);
  }
  return getMergedPCM16(bursts);
};

// src/@modules/@eas/eas.setAttentionTone.ts
var setAttentionTone = (ms, sampleRate) => {
  const len = Math.floor(ms * sampleRate);
  const out = new Int16Array(len);
  const f1 = 853;
  const f2 = 960;
  const twoPi = Math.PI * 2;
  const amp = 0.1;
  const fadeLen = Math.floor(sampleRate * 0);
  for (let i = 0; i < len; i++) {
    const t = i / sampleRate;
    const s = Math.sin(twoPi * f1 * t) + Math.sin(twoPi * f2 * t);
    let gain = 1;
    if (i < fadeLen) gain = i / fadeLen;
    else if (i > len - fadeLen) gain = (len - i) / fadeLen;
    const v = Math.max(-1, Math.min(1, s / 2 * amp * gain));
    out[i] = Math.round(v * 32767);
  }
  return out;
};

// src/@modules/@eas/eas.setNoise.ts
var setNoise = (int16, noiseLevel = 0.02) => {
  const x = getPCMToFloat(int16);
  for (let i = 0; i < x.length; i++) x[i] += (Math.random() * 2 - 1) * noiseLevel;
  let peak = 0;
  for (let i = 0; i < x.length; i++) peak = Math.max(peak, Math.abs(x[i]));
  if (peak > 1) for (let i = 0; i < x.length; i++) x[i] *= 0.98 / peak;
  return getFloatPCM16(x);
};

// src/@modules/@eas/eas.getPCM16.ts
var getPCM16 = (samples, sampleRate) => {
  let o = 0;
  const bytesPerSample = 2;
  const blockAlign = 1 * bytesPerSample;
  const byteRate = sampleRate * blockAlign;
  const subchunk2Size = samples.length * bytesPerSample;
  const chunkSize = 36 + subchunk2Size;
  const buffer = Buffer.alloc(44 + subchunk2Size);
  buffer.write("RIFF", o);
  o += 4;
  buffer.writeUInt32LE(chunkSize, o);
  o += 4;
  buffer.write("WAVE", o);
  o += 4;
  buffer.write("fmt ", o);
  o += 4;
  buffer.writeUInt32LE(16, o);
  o += 4;
  buffer.writeUInt16LE(1, o);
  o += 2;
  buffer.writeUInt16LE(1, o);
  o += 2;
  buffer.writeUInt32LE(sampleRate, o);
  o += 4;
  buffer.writeUInt32LE(byteRate, o);
  o += 4;
  buffer.writeUInt16LE(blockAlign, o);
  o += 2;
  buffer.writeUInt16LE(16, o);
  o += 2;
  buffer.write("data", o);
  o += 4;
  buffer.writeUInt32LE(subchunk2Size, o);
  o += 4;
  for (let i = 0; i < samples.length; i++, o += 2) {
    buffer.writeInt16LE(samples[i].value, o);
  }
  return buffer;
};

// src/@modules/@eas/eas.setEasTone.ts
import { join } from "path";
import { existsSync, mkdirSync, readFileSync, writeFileSync, unlinkSync } from "fs";
import { execSync } from "child_process";
import { platform } from "os";
import say from "say";
var setEasTone = (options) => __async(null, null, function* () {
  const settings = bootstrap.settings;
  const directory = settings.GlobalSettings.EASSettings.ArchiveDirectory;
  const prefix = settings.GlobalSettings.EASSettings.IntroWavFile;
  let message = options.message;
  let header = options.header;
  let buffTTS;
  let buffRadio;
  let buffFull = [];
  const tmpTTS = join(directory, `/temp/${Math.random().toString(36).substring(2, 15)}-${header.replace(/[^a-zA-Z0-9]/g, "")}.wav`);
  const outTTS = join(directory, `/output/${Math.random().toString(36).substring(2, 15)}-${header.replace(/[^a-zA-Z0-9]/g, "")}.wav`);
  const vTTS = process.platform === `win32` ? `Microsoft David Desktop` : `en-US-GuyNerual`;
  const vPlatform = platform();
  if (!existsSync(directory)) {
    mkdirSync(directory, { recursive: true });
  }
  if (!existsSync(join(directory, `/temp`))) {
    mkdirSync(join(directory, `/temp`), { recursive: true });
  }
  if (!existsSync(join(directory, `/output`))) {
    mkdirSync(join(directory, `/output`), { recursive: true });
  }
  for (const { regex, replacement } of transcribedMessageReplacements) {
    message = message.replace(regex, replacement);
  }
  if (vPlatform != `win32`) {
    setWarning({
      title: `EAS`,
      message: `Generation isn't supported with this OS. Please wait for further updates before trying again`
    });
    return null;
  }
  say.export(message, vTTS, 1, tmpTTS);
  while (!existsSync(tmpTTS) || (buffTTS = readFileSync(tmpTTS)).length == 0) {
    yield setSleep({ timeout: 25 });
  }
  const vWav = getWavPCM16(buffTTS);
  const vSamples = getSampledPCM16(vWav.samples, vWav.sampleRate, 8e3);
  const vRadio = setRadioEffect(vSamples, 8e3);
  if (existsSync(prefix)) {
    let tBuffer = readFileSync(prefix);
    let tWav = getWavPCM16(tBuffer);
    if (tWav == null) {
      try {
        const converted = join(directory, `/temp/${Math.random().toString(36).substring(2, 15)}.converted.wav`);
        execSync(`ffmpeg -y -i "${prefix}" -ar 8000 -ac 1 -sample_fmt s16 "${converted}"`, { stdio: "ignore" });
        if (existsSync(converted)) {
          tBuffer = readFileSync(converted);
          tWav = getWavPCM16(tBuffer);
          try {
            unlinkSync(converted);
          } catch (e) {
          }
        }
      } catch (e) {
      }
    }
    if (tWav == null) {
      setWarning({ title: `EAS`, message: `Intro tone isn't a valid .WAV file or isn't in PCM 16-bit format. Converted attempt failed; please convert it then try again.` });
      return null;
    }
    const tSamples = tWav.sampleRate != 8e3 ? getSampledPCM16(tWav.samples, tWav.sampleRate, 8e3) : tWav.samples;
    buffRadio = setRadioEffect(tSamples, 8e3);
  }
  buffFull = buffRadio != null ? [buffRadio, new Int16Array(Math.floor(0.5 * 8e3))] : [];
  buffFull.push(
    setSameHeader(header, 3, 8e3, {
      preMarkSec: 1.1,
      gapSec: 0.5
    }),
    new Int16Array(Math.floor(0.5 * 8e3)),
    setAttentionTone(8, 8e3),
    new Int16Array(Math.floor(0.5 * 8e3)),
    vRadio
  );
  for (let i = 0; i < 3; i++) {
    buffFull.push(setSameHeader(header, 1, 8e3, { preMarkSec: 0.5, gapSec: 0.1 }));
    buffFull.push(new Int16Array(Math.floor(0.5 * 8e3)));
  }
  const aSamples = getMergedPCM16(buffFull);
  const aFinal = setNoise(aSamples, 2e-3);
  const aBuffer = getPCM16(Array.from(aFinal).map((v) => ({ value: v })), 8e3);
  writeFileSync(outTTS, aBuffer);
  try {
    unlinkSync(tmpTTS);
  } catch (e) {
  }
  return outTTS;
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
    event: `onNodeAdd`,
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

// src/@core/core.getRandomEvent.ts
var getRandomEvent = () => {
  return bootstrap.cache.events.features[Math.floor(Math.random() * bootstrap.cache.events.features.length)];
};

// src/@core/core.query.ts
var query = (options) => __async(null, null, function* () {
  var _a;
  const get = yield bootstrap.database.prepare(
    `SELECT * FROM stanzas WHERE stanza LIKE ? LIMIT ?`
  ).all(`%${options.search}%`, (_a = options.max) != null ? _a : 100);
  const events = get.map((row) => JSON.parse(row.stanza));
  return events;
});

// src/@core/core.clearEvents.ts
var clearEvents = () => {
  bootstrap.cache.events.features = [];
  bootstrap.cache.hashes = [];
  setEventEmit({
    event: `onEventCache`,
    metadata: bootstrap.cache.events,
    message: `Manually cleared event cache.`
  });
};

// src/index.ts
var Manager = class {
  constructor(settings) {
    this.trycatch();
    startService(settings);
  }
  on(event, callback) {
    createListener(event, callback);
  }
  trycatch() {
    process.on("uncaughtException", (err) => {
      var _a, _b;
      const ignored = ["ETIMEDOUT", "ECONNRESET", "EHOSTUNREACH", "ENOTFOUND", "ECONNREFUSED", "EPIPE", "EADDRINUSE", "EALREADY", "EACCES", "EAGAIN", "EHOSTDOWN", "STARTTLS_FAILURE"];
      if (ignored.includes(err == null ? void 0 : err.code)) {
        setEventEmit({
          event: `onServiceStatus`,
          metadata: {
            message: `Ignored Critical Error: ${(_a = err == null ? void 0 : err.code) != null ? _a : "Unknown error code"}. This may indicate a connection issue. Attempting to continue...`,
            data: {},
            type: `error`,
            error: true
          }
        });
        return;
      }
      setWarning({ message: `Uncaught Exception: ${err instanceof Error ? (_b = err.stack) != null ? _b : err.message : String(err)}` });
    });
  }
};
var index_default = Manager;
export {
  Manager,
  clearEvents,
  index_default as default,
  getCleanedEvent,
  getEventGeometry,
  getEvents,
  getNodes,
  getRandomEvent,
  query,
  setEasTone,
  setNode,
  setSettings,
  startService,
  stopService
};
/*! Bundled license information:

mime-db/index.js:
  (*!
   * mime-db
   * Copyright(c) 2014 Jonathan Ong
   * Copyright(c) 2015-2022 Douglas Christopher Wilson
   * MIT Licensed
   *)

mime-types/index.js:
  (*!
   * mime-types
   * Copyright(c) 2014 Jonathan Ong
   * Copyright(c) 2015 Douglas Christopher Wilson
   * MIT Licensed
   *)
*/
