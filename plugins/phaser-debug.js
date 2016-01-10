!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var n;"undefined"!=typeof window?n=window:"undefined"!=typeof global?n=global:"undefined"!=typeof self&&(n=self);var f=n;f=f.Phaser||(f.Phaser={}),f=f.Plugin||(f.Plugin={}),f.Debug=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var ui = require('./util/ui'),
    css = require('./styles/main.less'),
    PerformancePanel = require('./panels/Performance'),
    ScenePanel = require('./panels/Scene');

/**
 * @class Phaser.Plugin.Debug
 * @classdesc Phaser - Debug Plugin
 *
 * @constructor
 * @extends Phaser.Plugin
 *
 * @param {Phaser.Game} game - A reference to the currently running game.
 * @param {Any} parent - The object that owns this plugin, usually Phaser.PluginManager.
 */
function Debug(game, parent) {
    Phaser.Plugin.call(this, game, parent);

    this.panels = {
        performance: null,
        scene: null
    };

    this.tickTimings = {
        lastStart: 0,
        start: 0,
        ms: 0
    };

    this.timings = {
        preUpdate: {
            physics  : 0,
            state    : 0,
            plugins  : 0,
            stage    : 0
        },
        update: {
            state    : 0,
            stage    : 0,
            tweens   : 0,
            sound    : 0,
            input    : 0,
            physics  : 0,
            particles: 0,
            plugins  : 0
        },
        postUpdate: {
            stage    : 0,
            plugins  : 0
        },
        preRender: {
            state    : 0
        },
        render: {
            renderer : 0,
            plugins  : 0,
            state    : 0
        },
        postRender: {
            plugins  : 0
        }
    };

    this._container = null;
    this._bar = null;

    this._stats = {
        ms: null,
        fps: null,
        dpf: null,
        ent: null
    };

    this.timer = (window.performance ? window.performance : Date);
}

//  Extends the Phaser.Plugin template, setting up values we need
Debug.prototype = Object.create(Phaser.Plugin.prototype);
Debug.prototype.constructor = Debug;

Debug.PKG = require('../package.json');
Debug.VERSION = Debug.PKG.version;

module.exports = Debug;

Debug.prototype.init = function () {
    // create the panels
    this.panels.performance = new PerformancePanel(this.game, this);
    this.panels.scene = new ScenePanel(this.game, this);

    // add elements to the page
    ui.addCss(css);
    document.body.appendChild(this._createElement());

    this._bindEvents();

    // wrap each component's update methods so we can time them
    for (var method in this.timings) {
        for (var comp in this.timings[method]) {
            this._wrap(this.game, comp, method, comp);
        }
    }

    // wrap the game update method
    this._wrap(this, 'game', 'update');

    // initialize each panel
    for (var p in this.panels) {
        if (this.panels[p].init) {
            this.panels[p].init.apply(this.panels[p], arguments);
        }
    }
};

/**
 * Post-Update is called after all the update methods have already been called, but before the render calls.
 * It is only called if active is set to true.
 *
 * @method Phaser.Plugin.Debug#postUpdate
 */
Debug.prototype.postUpdate = function () {
    for (var p in this.panels) {
        if (this.panels[p].update && this.panels[p].active) {
            this.panels[p].update();
        }
    }

    var fps = Math.round(1000 / (this.tickTimings.start - this.tickTimings.lastStart)),
        dpf = this.game.renderer.renderSession.drawCount;

    fps = fps > 60 ? 60 : fps;

    // update stats indicators
    ui.setText(this._stats.dpf.firstElementChild, dpf === undefined ? '(N/A)' : dpf, 3);
    ui.setText(this._stats.ms.firstElementChild, Math.round(this.tickTimings.ms), 4);
    ui.setText(this._stats.fps.firstElementChild, Math.round(fps), 2);
};

/**
 * Marks a point on the performance graph with a label to help you corrolate events and timing on the graph
 *
 * @method Phaser.Plugin.Debug#mark
 */
Debug.prototype.mark = function (label) {
    if (this.panels.performance) {
        this.panels.performance.mark(label);
    }
};

Debug.prototype.destroy = function () {
    Phaser.Plugin.prototype.destroy.call(this);

    for (var p in this.panels) {
        this.panels[p].destroy();
    }

    this.panels = null;
    this.tickTimings = null;
    this.timings = null;

    this._container = null;
    this._bar = null;
    this._stats = null;

    this.timer = null;
};

Debug.prototype._wrap = function (obj, component, method, timingStat) {
    if (!obj[component] || !obj[component][method]) {
        return;
    }

    obj[component][method] = (function(self, name, method, stat, fn) {
        var start = 0,
            end = 0;

        // special tick capture for game update
        if (name === 'game' && method === 'update' && !stat) {
            return function () {
                start = self.timer.now();

                self.tickTimings.lastStart = self.tickTimings.start;
                self.tickTimings.start = start;

                fn.apply(this, arguments);

                end = self.timer.now();

                self.tickTimings.ms = end - start;
            };
        }
        else {
            return function () {
                start = self.timer.now();

                fn.apply(this, arguments);

                end = self.timer.now();

                self.timings[method][stat] = end - start;
            };
        }
    })(this, component, method, timingStat, obj[component][method]);
};

Debug.prototype._bindEvents = function () {
    var activePanel,
        self = this;

    ui.on(this._bar, 'click', '.pdebug-menu-item', function(e) {
        e.preventDefault();

        var panel = self.panels[e.target.getAttribute('href').replace('#', '')];

        if(!panel) {
            return;
        }

        if(activePanel) {
            activePanel.toggle();
            ui.removeClass(activePanel._menuItem, 'active');

            if(activePanel.name === panel.name) {
                activePanel = null;
                return;
            }
        }

        ui.addClass(e.target, 'active');
        panel.toggle();
        activePanel = panel;
    });
};

Debug.prototype._createElement = function () {
    var c = this._container = document.createElement('div'),
        bar = this._bar = document.createElement('div');

    //container
    ui.addClass(c, 'pdebug');
    c.appendChild(bar);

    //the menu bar
    ui.addClass(bar, 'pdebug-menu');
    bar.appendChild(this._createMenuHead());
    bar.appendChild(this._createMenuStats());

    //add the panels
    for(var p in this.panels) {
        bar.appendChild(this.panels[p].createMenuElement());
        c.appendChild(this.panels[p].createPanelElement());
    }

    return c;
};

Debug.prototype._createMenuHead = function () {
    var div = document.createElement('span'),
        r = this.game.renderType,
        type = (r === Phaser.WEBGL ? 'WebGL' : (r === Phaser.HEADLESS ? 'Headless' : 'Canvas'));

    ui.addClass(div, 'pdebug-head');
    ui.setText(div, 'Phaser Debug (' + type + '):');

    return div;
};

Debug.prototype._createMenuStats = function () {
    var div = document.createElement('div');

    ui.addClass(div, 'pdebug-stats');

    this._stats.ms = document.createElement('span');
    this._stats.fps = document.createElement('span');
    this._stats.dpf = document.createElement('span');
    // this._stats.ent = document.createElement('span');

    ui.addClass(this._stats.ms, 'pdebug-stats-item ms');
    ui.setHtml(this._stats.ms, '<span>0</span> ms');
    div.appendChild(this._stats.ms);

    ui.addClass(this._stats.fps, 'pdebug-stats-item fps');
    ui.setHtml(this._stats.fps, '<span>0</span> fps');
    div.appendChild(this._stats.fps);

    ui.addClass(this._stats.dpf, 'pdebug-stats-item dpf');
    ui.setHtml(this._stats.dpf, '<span>0</span> draws');
    div.appendChild(this._stats.dpf);

    // ui.addClass(this._stats.ent, 'pdebug-stats-item ent');
    // ui.setHtml(this._stats.ent, '<span>0</span> entities');
    // div.appendChild(this._stats.ent);

    return div;
};

},{"../package.json":10,"./panels/Performance":15,"./panels/Scene":16,"./styles/main.less":17,"./util/ui":19}],2:[function(require,module,exports){
"use strict";
/*globals Handlebars: true */
var base = require("./handlebars/base");

// Each of these augment the Handlebars object. No need to setup here.
// (This is done to easily share code between commonjs and browse envs)
var SafeString = require("./handlebars/safe-string")["default"];
var Exception = require("./handlebars/exception")["default"];
var Utils = require("./handlebars/utils");
var runtime = require("./handlebars/runtime");

// For compatibility and usage outside of module systems, make the Handlebars object a namespace
var create = function() {
  var hb = new base.HandlebarsEnvironment();

  Utils.extend(hb, base);
  hb.SafeString = SafeString;
  hb.Exception = Exception;
  hb.Utils = Utils;
  hb.escapeExpression = Utils.escapeExpression;

  hb.VM = runtime;
  hb.template = function(spec) {
    return runtime.template(spec, hb);
  };

  return hb;
};

var Handlebars = create();
Handlebars.create = create;

Handlebars['default'] = Handlebars;

exports["default"] = Handlebars;
},{"./handlebars/base":3,"./handlebars/exception":4,"./handlebars/runtime":5,"./handlebars/safe-string":6,"./handlebars/utils":7}],3:[function(require,module,exports){
"use strict";
var Utils = require("./utils");
var Exception = require("./exception")["default"];

var VERSION = "2.0.0";
exports.VERSION = VERSION;var COMPILER_REVISION = 6;
exports.COMPILER_REVISION = COMPILER_REVISION;
var REVISION_CHANGES = {
  1: '<= 1.0.rc.2', // 1.0.rc.2 is actually rev2 but doesn't report it
  2: '== 1.0.0-rc.3',
  3: '== 1.0.0-rc.4',
  4: '== 1.x.x',
  5: '== 2.0.0-alpha.x',
  6: '>= 2.0.0-beta.1'
};
exports.REVISION_CHANGES = REVISION_CHANGES;
var isArray = Utils.isArray,
    isFunction = Utils.isFunction,
    toString = Utils.toString,
    objectType = '[object Object]';

function HandlebarsEnvironment(helpers, partials) {
  this.helpers = helpers || {};
  this.partials = partials || {};

  registerDefaultHelpers(this);
}

exports.HandlebarsEnvironment = HandlebarsEnvironment;HandlebarsEnvironment.prototype = {
  constructor: HandlebarsEnvironment,

  logger: logger,
  log: log,

  registerHelper: function(name, fn) {
    if (toString.call(name) === objectType) {
      if (fn) { throw new Exception('Arg not supported with multiple helpers'); }
      Utils.extend(this.helpers, name);
    } else {
      this.helpers[name] = fn;
    }
  },
  unregisterHelper: function(name) {
    delete this.helpers[name];
  },

  registerPartial: function(name, partial) {
    if (toString.call(name) === objectType) {
      Utils.extend(this.partials,  name);
    } else {
      this.partials[name] = partial;
    }
  },
  unregisterPartial: function(name) {
    delete this.partials[name];
  }
};

function registerDefaultHelpers(instance) {
  instance.registerHelper('helperMissing', function(/* [args, ]options */) {
    if(arguments.length === 1) {
      // A missing field in a {{foo}} constuct.
      return undefined;
    } else {
      // Someone is actually trying to call something, blow up.
      throw new Exception("Missing helper: '" + arguments[arguments.length-1].name + "'");
    }
  });

  instance.registerHelper('blockHelperMissing', function(context, options) {
    var inverse = options.inverse,
        fn = options.fn;

    if(context === true) {
      return fn(this);
    } else if(context === false || context == null) {
      return inverse(this);
    } else if (isArray(context)) {
      if(context.length > 0) {
        if (options.ids) {
          options.ids = [options.name];
        }

        return instance.helpers.each(context, options);
      } else {
        return inverse(this);
      }
    } else {
      if (options.data && options.ids) {
        var data = createFrame(options.data);
        data.contextPath = Utils.appendContextPath(options.data.contextPath, options.name);
        options = {data: data};
      }

      return fn(context, options);
    }
  });

  instance.registerHelper('each', function(context, options) {
    if (!options) {
      throw new Exception('Must pass iterator to #each');
    }

    var fn = options.fn, inverse = options.inverse;
    var i = 0, ret = "", data;

    var contextPath;
    if (options.data && options.ids) {
      contextPath = Utils.appendContextPath(options.data.contextPath, options.ids[0]) + '.';
    }

    if (isFunction(context)) { context = context.call(this); }

    if (options.data) {
      data = createFrame(options.data);
    }

    if(context && typeof context === 'object') {
      if (isArray(context)) {
        for(var j = context.length; i<j; i++) {
          if (data) {
            data.index = i;
            data.first = (i === 0);
            data.last  = (i === (context.length-1));

            if (contextPath) {
              data.contextPath = contextPath + i;
            }
          }
          ret = ret + fn(context[i], { data: data });
        }
      } else {
        for(var key in context) {
          if(context.hasOwnProperty(key)) {
            if(data) {
              data.key = key;
              data.index = i;
              data.first = (i === 0);

              if (contextPath) {
                data.contextPath = contextPath + key;
              }
            }
            ret = ret + fn(context[key], {data: data});
            i++;
          }
        }
      }
    }

    if(i === 0){
      ret = inverse(this);
    }

    return ret;
  });

  instance.registerHelper('if', function(conditional, options) {
    if (isFunction(conditional)) { conditional = conditional.call(this); }

    // Default behavior is to render the positive path if the value is truthy and not empty.
    // The `includeZero` option may be set to treat the condtional as purely not empty based on the
    // behavior of isEmpty. Effectively this determines if 0 is handled by the positive path or negative.
    if ((!options.hash.includeZero && !conditional) || Utils.isEmpty(conditional)) {
      return options.inverse(this);
    } else {
      return options.fn(this);
    }
  });

  instance.registerHelper('unless', function(conditional, options) {
    return instance.helpers['if'].call(this, conditional, {fn: options.inverse, inverse: options.fn, hash: options.hash});
  });

  instance.registerHelper('with', function(context, options) {
    if (isFunction(context)) { context = context.call(this); }

    var fn = options.fn;

    if (!Utils.isEmpty(context)) {
      if (options.data && options.ids) {
        var data = createFrame(options.data);
        data.contextPath = Utils.appendContextPath(options.data.contextPath, options.ids[0]);
        options = {data:data};
      }

      return fn(context, options);
    } else {
      return options.inverse(this);
    }
  });

  instance.registerHelper('log', function(message, options) {
    var level = options.data && options.data.level != null ? parseInt(options.data.level, 10) : 1;
    instance.log(level, message);
  });

  instance.registerHelper('lookup', function(obj, field) {
    return obj && obj[field];
  });
}

var logger = {
  methodMap: { 0: 'debug', 1: 'info', 2: 'warn', 3: 'error' },

  // State enum
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
  level: 3,

  // can be overridden in the host environment
  log: function(level, message) {
    if (logger.level <= level) {
      var method = logger.methodMap[level];
      if (typeof console !== 'undefined' && console[method]) {
        console[method].call(console, message);
      }
    }
  }
};
exports.logger = logger;
var log = logger.log;
exports.log = log;
var createFrame = function(object) {
  var frame = Utils.extend({}, object);
  frame._parent = object;
  return frame;
};
exports.createFrame = createFrame;
},{"./exception":4,"./utils":7}],4:[function(require,module,exports){
"use strict";

var errorProps = ['description', 'fileName', 'lineNumber', 'message', 'name', 'number', 'stack'];

function Exception(message, node) {
  var line;
  if (node && node.firstLine) {
    line = node.firstLine;

    message += ' - ' + line + ':' + node.firstColumn;
  }

  var tmp = Error.prototype.constructor.call(this, message);

  // Unfortunately errors are not enumerable in Chrome (at least), so `for prop in tmp` doesn't work.
  for (var idx = 0; idx < errorProps.length; idx++) {
    this[errorProps[idx]] = tmp[errorProps[idx]];
  }

  if (line) {
    this.lineNumber = line;
    this.column = node.firstColumn;
  }
}

Exception.prototype = new Error();

exports["default"] = Exception;
},{}],5:[function(require,module,exports){
"use strict";
var Utils = require("./utils");
var Exception = require("./exception")["default"];
var COMPILER_REVISION = require("./base").COMPILER_REVISION;
var REVISION_CHANGES = require("./base").REVISION_CHANGES;
var createFrame = require("./base").createFrame;

function checkRevision(compilerInfo) {
  var compilerRevision = compilerInfo && compilerInfo[0] || 1,
      currentRevision = COMPILER_REVISION;

  if (compilerRevision !== currentRevision) {
    if (compilerRevision < currentRevision) {
      var runtimeVersions = REVISION_CHANGES[currentRevision],
          compilerVersions = REVISION_CHANGES[compilerRevision];
      throw new Exception("Template was precompiled with an older version of Handlebars than the current runtime. "+
            "Please update your precompiler to a newer version ("+runtimeVersions+") or downgrade your runtime to an older version ("+compilerVersions+").");
    } else {
      // Use the embedded version info since the runtime doesn't know about this revision yet
      throw new Exception("Template was precompiled with a newer version of Handlebars than the current runtime. "+
            "Please update your runtime to a newer version ("+compilerInfo[1]+").");
    }
  }
}

exports.checkRevision = checkRevision;// TODO: Remove this line and break up compilePartial

function template(templateSpec, env) {
  /* istanbul ignore next */
  if (!env) {
    throw new Exception("No environment passed to template");
  }
  if (!templateSpec || !templateSpec.main) {
    throw new Exception('Unknown template object: ' + typeof templateSpec);
  }

  // Note: Using env.VM references rather than local var references throughout this section to allow
  // for external users to override these as psuedo-supported APIs.
  env.VM.checkRevision(templateSpec.compiler);

  var invokePartialWrapper = function(partial, indent, name, context, hash, helpers, partials, data, depths) {
    if (hash) {
      context = Utils.extend({}, context, hash);
    }

    var result = env.VM.invokePartial.call(this, partial, name, context, helpers, partials, data, depths);

    if (result == null && env.compile) {
      var options = { helpers: helpers, partials: partials, data: data, depths: depths };
      partials[name] = env.compile(partial, { data: data !== undefined, compat: templateSpec.compat }, env);
      result = partials[name](context, options);
    }
    if (result != null) {
      if (indent) {
        var lines = result.split('\n');
        for (var i = 0, l = lines.length; i < l; i++) {
          if (!lines[i] && i + 1 === l) {
            break;
          }

          lines[i] = indent + lines[i];
        }
        result = lines.join('\n');
      }
      return result;
    } else {
      throw new Exception("The partial " + name + " could not be compiled when running in runtime-only mode");
    }
  };

  // Just add water
  var container = {
    lookup: function(depths, name) {
      var len = depths.length;
      for (var i = 0; i < len; i++) {
        if (depths[i] && depths[i][name] != null) {
          return depths[i][name];
        }
      }
    },
    lambda: function(current, context) {
      return typeof current === 'function' ? current.call(context) : current;
    },

    escapeExpression: Utils.escapeExpression,
    invokePartial: invokePartialWrapper,

    fn: function(i) {
      return templateSpec[i];
    },

    programs: [],
    program: function(i, data, depths) {
      var programWrapper = this.programs[i],
          fn = this.fn(i);
      if (data || depths) {
        programWrapper = program(this, i, fn, data, depths);
      } else if (!programWrapper) {
        programWrapper = this.programs[i] = program(this, i, fn);
      }
      return programWrapper;
    },

    data: function(data, depth) {
      while (data && depth--) {
        data = data._parent;
      }
      return data;
    },
    merge: function(param, common) {
      var ret = param || common;

      if (param && common && (param !== common)) {
        ret = Utils.extend({}, common, param);
      }

      return ret;
    },

    noop: env.VM.noop,
    compilerInfo: templateSpec.compiler
  };

  var ret = function(context, options) {
    options = options || {};
    var data = options.data;

    ret._setup(options);
    if (!options.partial && templateSpec.useData) {
      data = initData(context, data);
    }
    var depths;
    if (templateSpec.useDepths) {
      depths = options.depths ? [context].concat(options.depths) : [context];
    }

    return templateSpec.main.call(container, context, container.helpers, container.partials, data, depths);
  };
  ret.isTop = true;

  ret._setup = function(options) {
    if (!options.partial) {
      container.helpers = container.merge(options.helpers, env.helpers);

      if (templateSpec.usePartial) {
        container.partials = container.merge(options.partials, env.partials);
      }
    } else {
      container.helpers = options.helpers;
      container.partials = options.partials;
    }
  };

  ret._child = function(i, data, depths) {
    if (templateSpec.useDepths && !depths) {
      throw new Exception('must pass parent depths');
    }

    return program(container, i, templateSpec[i], data, depths);
  };
  return ret;
}

exports.template = template;function program(container, i, fn, data, depths) {
  var prog = function(context, options) {
    options = options || {};

    return fn.call(container, context, container.helpers, container.partials, options.data || data, depths && [context].concat(depths));
  };
  prog.program = i;
  prog.depth = depths ? depths.length : 0;
  return prog;
}

exports.program = program;function invokePartial(partial, name, context, helpers, partials, data, depths) {
  var options = { partial: true, helpers: helpers, partials: partials, data: data, depths: depths };

  if(partial === undefined) {
    throw new Exception("The partial " + name + " could not be found");
  } else if(partial instanceof Function) {
    return partial(context, options);
  }
}

exports.invokePartial = invokePartial;function noop() { return ""; }

exports.noop = noop;function initData(context, data) {
  if (!data || !('root' in data)) {
    data = data ? createFrame(data) : {};
    data.root = context;
  }
  return data;
}
},{"./base":3,"./exception":4,"./utils":7}],6:[function(require,module,exports){
"use strict";
// Build out our basic SafeString type
function SafeString(string) {
  this.string = string;
}

SafeString.prototype.toString = function() {
  return "" + this.string;
};

exports["default"] = SafeString;
},{}],7:[function(require,module,exports){
"use strict";
/*jshint -W004 */
var SafeString = require("./safe-string")["default"];

var escape = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#x27;",
  "`": "&#x60;"
};

var badChars = /[&<>"'`]/g;
var possible = /[&<>"'`]/;

function escapeChar(chr) {
  return escape[chr];
}

function extend(obj /* , ...source */) {
  for (var i = 1; i < arguments.length; i++) {
    for (var key in arguments[i]) {
      if (Object.prototype.hasOwnProperty.call(arguments[i], key)) {
        obj[key] = arguments[i][key];
      }
    }
  }

  return obj;
}

exports.extend = extend;var toString = Object.prototype.toString;
exports.toString = toString;
// Sourced from lodash
// https://github.com/bestiejs/lodash/blob/master/LICENSE.txt
var isFunction = function(value) {
  return typeof value === 'function';
};
// fallback for older versions of Chrome and Safari
/* istanbul ignore next */
if (isFunction(/x/)) {
  isFunction = function(value) {
    return typeof value === 'function' && toString.call(value) === '[object Function]';
  };
}
var isFunction;
exports.isFunction = isFunction;
/* istanbul ignore next */
var isArray = Array.isArray || function(value) {
  return (value && typeof value === 'object') ? toString.call(value) === '[object Array]' : false;
};
exports.isArray = isArray;

function escapeExpression(string) {
  // don't escape SafeStrings, since they're already safe
  if (string instanceof SafeString) {
    return string.toString();
  } else if (string == null) {
    return "";
  } else if (!string) {
    return string + '';
  }

  // Force a string conversion as this will be done by the append regardless and
  // the regex test will do this transparently behind the scenes, causing issues if
  // an object's to string has escaped characters in it.
  string = "" + string;

  if(!possible.test(string)) { return string; }
  return string.replace(badChars, escapeChar);
}

exports.escapeExpression = escapeExpression;function isEmpty(value) {
  if (!value && value !== 0) {
    return true;
  } else if (isArray(value) && value.length === 0) {
    return true;
  } else {
    return false;
  }
}

exports.isEmpty = isEmpty;function appendContextPath(contextPath, id) {
  return (contextPath ? contextPath + '.' : '') + id;
}

exports.appendContextPath = appendContextPath;
},{"./safe-string":6}],8:[function(require,module,exports){
// Create a simple path alias to allow browserify to resolve
// the runtime on a supported path.
module.exports = require('./dist/cjs/handlebars.runtime');

},{"./dist/cjs/handlebars.runtime":2}],9:[function(require,module,exports){
module.exports = require("handlebars/runtime")["default"];

},{"handlebars/runtime":8}],10:[function(require,module,exports){
module.exports={
  "name": "phaser-debug",
  "version": "1.1.5",
  "description": "Simple debug module for phaser",
  "author": "Chad Engler <chad@pantherdev.com>",
  "license": "MIT",
  "homepage": "https://github.com/englercj/phaser-debug",
  "repository": {
    "type": "git",
    "url": "https://github.com/englercj/phaser-debug.git"
  },
  "bugs": {
    "url": "https://github.com/englercj/phaser-debug/issues"
  },
  "keywords": [
    "phaser",
    "debug",
    "html5",
    "game",
    "engine"
  ],
  "dependencies": {
    "handlebars": "^2.0.0",
    "node-lessify": "^0.0.5",
    "hbsfy": "^2.1.0"
  },
  "devDependencies": {
    "browserify": "^5.11.1",
    "event-stream": "^3.1.7",
    "gulp": "^3.8.8",
    "gulp-bump": "^0.1.11",
    "gulp-git": "^0.5.3",
    "gulp-jshint": "^1.8.4",
    "gulp-util": "^3.0.1",
    "jshint-summary": "^0.4.0",
    "vinyl-source-stream": "^0.1.1",
    "watchify": "^1.0.2"
  },
  "main": "./dist/phaser-debug.js",
  "browser": "./src/index.js",
  "browserify": {
    "transform": [
      "hbsfy",
      "node-lessify"
    ],
    "transform-options": {
      "node-lessify": "textMode"
    }
  }
}

},{}],11:[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"1":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "    <label>Children:</label>\n    <strong>"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.children : depth0)) != null ? stack1.length : stack1), depth0))
    + "</strong>\n    <br/>\n";
},"3":function(depth0,helpers,partials,data) {
  var stack1, buffer = "    <label>Texture:</label>\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.texture : depth0)) != null ? stack1.baseTexture : stack1)) != null ? stack1.source : stack1)) != null ? stack1.src : stack1), {"name":"if","hash":{},"fn":this.program(4, data),"inverse":this.program(6, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "    <br/>\n";
},"4":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "        <a href=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.texture : depth0)) != null ? stack1.baseTexture : stack1)) != null ? stack1.source : stack1)) != null ? stack1.src : stack1), depth0))
    + "\" target=\"_blank\">"
    + escapeExpression(lambda(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.texture : depth0)) != null ? stack1.baseTexture : stack1)) != null ? stack1.source : stack1)) != null ? stack1.src : stack1), depth0))
    + "</a>\n";
},"6":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "        <strong>"
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.texture : depth0)) != null ? stack1.baseTexture : stack1)) != null ? stack1.source : stack1), depth0))
    + "</strong>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, lambda=this.lambda, buffer = "<br/><br/>\n\n<label>Name:</label>\n<strong>"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</strong>\n<br/>\n\n<label>Type:</label>\n<strong>"
    + escapeExpression(((helper = (helper = helpers.typeString || (depth0 != null ? depth0.typeString : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"typeString","hash":{},"data":data}) : helper)))
    + "</strong>\n<br/>\n\n<label>Position:</label>\n<strong>"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.position : depth0)) != null ? stack1.x : stack1), depth0))
    + "</strong> x <strong>"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.position : depth0)) != null ? stack1.y : stack1), depth0))
    + "</strong>\n<br/>\n\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.children : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.texture : depth0), {"name":"if","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"useData":true});

},{"hbsfy/runtime":9}],12:[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<ul class=\"sidebar\">\n</ul>\n\n<a href=\"#\" class=\"refresh\">refresh</a>\n<div class=\"details\">\n</div>\n";
  },"useData":true});

},{"hbsfy/runtime":9}],13:[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "        <span class=\"weak\">("
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + ")</span>\n";
},"3":function(depth0,helpers,partials,data) {
  var stack1, buffer = "        <ul>\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.children : depth0), {"name":"each","hash":{},"fn":this.program(4, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "        </ul>\n";
},"4":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = this.invokePartial(partials.sceneTree, '                ', 'sceneTree', depth0, undefined, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = escapeExpression(((helper = (helper = helpers.listItemOpen || (depth0 != null ? depth0.listItemOpen : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"listItemOpen","hash":{},"data":data}) : helper)))
    + "\n    "
    + escapeExpression(((helper = (helper = helpers.typeString || (depth0 != null ? depth0.typeString : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"typeString","hash":{},"data":data}) : helper)))
    + "\n\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.name : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.children : depth0), {"name":"if","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</li>\n";
},"usePartial":true,"useData":true});

},{"hbsfy/runtime":9}],14:[function(require,module,exports){
var ui = require('../util/ui');

function Panel(game, parent) {
    this.game = game;
    this.parent = parent;

    this.name = '';
    this.title = '';
    this.active = false;

    this._panel = null;
}

Panel.prototype.constructor = Panel;

module.exports = Panel;

//builds the html for a panel
Panel.prototype.createPanelElement = function () {
    var elm = this._panel = document.createElement('div');
    ui.addClass(elm, 'pdebug-panel ' + this.name);

    return elm;
};

//builds the html for this panels menu item
Panel.prototype.createMenuElement = function () {
    var elm = this._menuItem = document.createElement('a');

    elm.href = '#' + this.name;

    ui.addClass(elm, 'pdebug-menu-item ' + this.name);
    ui.setText(elm, this.title);

    return elm;
};

Panel.prototype.toggle = function () {
    if (this.active) {
        this.hide();
    } else {
        this.show();
    }
};

Panel.prototype.show = function () {
    this.active = true;
    ui.setStyle(this._panel, 'display', 'block');
};

Panel.prototype.hide = function () {
    this.active = false;
    ui.setStyle(this._panel, 'display', 'none');
};

Panel.prototype.destroy = function () {
    this.game = null;
    this.parent = null;

    this.name = null;
    this.title = null;
    this.active = null;

    this._panel = null;
};

},{"../util/ui":19}],15:[function(require,module,exports){
// TODO: Not measuring render time!!

var Panel = require('./Panel'),
    Graph = require('../util/Graph');

function Performance(game, parent) {
    Panel.call(this, game, parent);

    this.name = 'performance';
    this.title = 'Performance';
    this.eventQueue = [];

    this.graph = null;

    this.colorPalettes = {
        _default: [
            // Colors from: https://github.com/highslide-software/highcharts.com/blob/master/js/themes/grid.js
            '#058DC7', '#50B432', '#ED561B', '#DDDF00',
            '#24CBE5', '#64E572', '#FF9655', '#FFF263',
            '#6AF9C4',
            // Colors from: https://github.com/highslide-software/highcharts.com/blob/master/js/themes/dark-unica.js
            '#2b908f', '#90ee7e', '#f45b5b', '#7798BF',
            '#aaeeee', '#ff0066', '#eeaaee',
            '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'
        ]
    };
}

Performance.prototype = Object.create(Panel.prototype);
Performance.prototype.constructor = Performance;

module.exports = Performance;

Performance.prototype.createPanelElement = function () {
    var elm = Panel.prototype.createPanelElement.call(this);

    this.graph = new Graph(elm, window.innerWidth - 20, 256, this.colorPalettes._default);

    return elm;
};

Performance.prototype.update = function () {
    this.graph.addData(this.parent.timings, this.eventQueue.shift());
};

Performance.prototype.mark = function (label) {
    this.eventQueue.push(label);
};

Performance.prototype.destroy = function () {
    Panel.prototype.destroy.call(this);

    this.graph.destroy();

    this.eventQueue = null;
    this.graph = null;
    this.colorPalettes = null;
};

},{"../util/Graph":18,"./Panel":14}],16:[function(require,module,exports){
var Panel = require('./Panel'),
    ui = require('../util/ui'),
    Handlebars = require('hbsfy/runtime');

//require templates
var panelHtml = require('../hbs/scene/panel.hbs'),
    detailsHtml = require('../hbs/scene/details.hbs'),
    treeHtml = require('../hbs/scene/tree.hbs'),
    _cache = {},
    _id = 0;

Handlebars.registerPartial('sceneDetails', detailsHtml);
Handlebars.registerPartial('sceneTree', treeHtml);
Handlebars.registerHelper('typeString', typeToString);
Handlebars.registerHelper('listItemOpen', listItemOpen);

function Scene(game, parent) {
    Panel.call(this, game, parent);

    this.name = 'scene';
    this.title = 'Scene Tree';

    this._tree = null;

    this.tree = null;
    this.details = null;
    this.refresh = null;

    this.selected = null;
}

Scene.prototype = Object.create(Panel.prototype);
Scene.prototype.constructor = Scene;

module.exports = Scene;

Scene.prototype.createPanelElement = function () {
    Panel.prototype.createPanelElement.call(this);

    this._panel.innerHTML = panelHtml(this.game.stage);

    this.tree = this._panel.querySelector('.sidebar');
    this.details = this._panel.querySelector('.details');
    this.refresh = this._panel.querySelector('.refresh');

    ui.on(this.tree, 'click', 'li', this._onLiClick.bind(this));
    ui.on(this.refresh, 'click', this._onRefreshClick.bind(this));

    // this.renderer = new PIXI.CanvasRenderer(
    //     512,
    //     256,
    //     document.createElement('canvas'),
    //     true
    // );

    return this._panel;
};

Scene.prototype.rebuildTree = function () {
    ui.empty(this.tree);

    _cache = {};

    this.tree.innerHTML = treeHtml(this.game.stage);

    this.select(this.tree.querySelector('li:first-child'));
    ui.addClass(this.selected, 'expanded');

    this.reloadDetails();
};

Scene.prototype.reloadDetails = function () {
    var id = this.selected.dataset.id;

    this.details.innerHTML = detailsHtml(_cache[id]);
    // this.details.appendChild(this.renderer.view);

    // this.renderer.renderDisplayObject(_cache[id]);
};

Scene.prototype.select = function (li) {
    if (this.selected) {
        ui.removeClass(this.selected, 'selected');
    }

    this.selected = li;
    ui.addClass(this.selected, 'selected');
};

Scene.prototype.show = function () {
    this.rebuildTree();

    Panel.prototype.show.call(this);
};

Scene.prototype.destroy = function () {
    Panel.prototype.destroy.call(this);

    this.tree = null;
    this.details = null;
    this.refresh = null;
};

Scene.prototype._onLiClick = function (e) {
    e.stopPropagation();

    this.select(e.delegateTarget);

    ui.toggleClass(e.delegateTarget, 'expanded');

    this.reloadDetails();
};

Scene.prototype._onRefreshClick = function (e) {
    e.preventDefault();
    e.stopPropagation();

    this.rebuildTree();
};

function listItemOpen () {
    _cache[++_id] = this;

    return new Handlebars.SafeString(
        '<li ' + (this.children && this.children.length ? 'class="has-children" ' : '') + 'data-id="' + _id + '">'
    );
}

function typeToString () {
    var node = this;

    // If no phaser type defined, try to guess
    if (node.type === undefined) {
        if (node instanceof PIXI.Stage) {
            return 'PIXI Stage';
        }
        else if (node instanceof PIXI.Sprite) {
            return 'PIXI Sprite';
        }
        else if (node instanceof PIXI.DisplayObjectContainer) {
            return 'PIXI DisplayObjectContainer';
        }
        else if (node instanceof PIXI.DisplayObject) {
            return 'PIXI DisplayObject';
        }
        else {
            return 'Unknown';
        }
    }
    // return a string for the phaser type
    else {
        switch(node.type) {
            case Phaser.SPRITE:
                return 'Sprite';

            case Phaser.BUTTON:
                return 'Button';

            case Phaser.IMAGE:
                return 'Image';

            case Phaser.GRAPHICS:
                return 'Graphics';

            case Phaser.TEXT:
                return 'Text';

            case Phaser.TILESPRITE:
                return 'Tile Sprite';

            case Phaser.BITMAPTEXT:
                return 'Bitmap Text';

            case Phaser.GROUP:
                return 'Group';

            case Phaser.RENDERTEXTURE:
                return 'Render Texture';

            case Phaser.TILEMAP:
                return 'Tilemap';

            case Phaser.TILEMAPLAYER:
                return 'Tilemap Layer';

            case Phaser.EMITTER:
                return 'Emitter';

            case Phaser.POLYGON:
                return 'Polygon';

            case Phaser.BITMAPDATA:
                return 'Bitmap Data';

            case Phaser.CANVAS_FILTER:
                return 'Canvas Filter';

            case Phaser.WEBGL_FILTER:
                return 'WebGL Filter';

            case Phaser.ELLIPSE:
                return 'Ellipse';

            case Phaser.SPRITEBATCH:
                return 'Sprite Batch';

            case Phaser.RETROFONT:
                return 'Retro Font';

            case Phaser.POINTER:
                return 'Pointer';

            case Phaser.ROPE:
                return 'Rope';

            default:
                return 'Unknown';
        }
    }
}

},{"../hbs/scene/details.hbs":11,"../hbs/scene/panel.hbs":12,"../hbs/scene/tree.hbs":13,"../util/ui":19,"./Panel":14,"hbsfy/runtime":9}],17:[function(require,module,exports){
module.exports = ".pdebug{font-size:14px;position:fixed;bottom:0;width:100%;color:#aaa;background:#333;border-top:3px solid #00bf00}.pdebug a{color:#00bf00}.pdebug label{display:inline-block;width:60px}.pdebug strong{font-weight:400;color:#fff}.pdebug .weak{color:#aaa}.pdebug .pdebug-menu{height:32px;padding:0 15px;text-shadow:1px 1px 0 #111;background:#333}.pdebug .pdebug-menu span{display:inline-block;height:32px;line-height:32px}.pdebug .pdebug-menu .pdebug-head{padding-right:25px;border-right:1px solid #666}.pdebug .pdebug-menu .pdebug-stats{float:right;padding:0 0 0 10px}.pdebug .pdebug-menu .pdebug-stats .pdebug-stats-item{display:inline-block;width:100px;text-align:right}.pdebug .pdebug-menu .pdebug-stats .pdebug-stats-item>span{color:#fff}.pdebug .pdebug-menu .pdebug-stats .pdebug-stats-item.obj{width:100px;border:0}.pdebug .pdebug-menu .pdebug-menu-item{color:#fff;display:inline-block;text-decoration:none;padding:0 10px;height:32px;line-height:32px;border-right:1px solid #666}.pdebug .pdebug-menu .pdebug-menu-item.active{color:#00bf00;background:#111}.pdebug .pdebug-panel{display:none;height:265px;overflow:auto;font-size:12px;background:#111}.pdebug .pdebug-panel.scene .sidebar{float:left;height:100%;min-width:175px;max-width:500px;resize:horizontal;overflow:auto}.pdebug .pdebug-panel.scene .details{float:left;height:100%}.pdebug .pdebug-panel.scene .refresh{position:absolute}.pdebug .pdebug-panel.scene>ul{padding:0;margin:0;border-right:solid 1px #aaa;margin-right:10px}.pdebug .pdebug-panel.scene>ul li{color:#fff;list-style:none;cursor:pointer}.pdebug .pdebug-panel.scene>ul li.expanded>ul{display:block}.pdebug .pdebug-panel.scene>ul li.selected{color:#00bf00}.pdebug .pdebug-panel.scene>ul li::before{content:\'-\';display:inline-block;width:12px;height:1px;color:#aaa}.pdebug .pdebug-panel.scene>ul li.has-children::before{content:\'\';display:inline-block;width:0;height:0;margin:0 6px 0 0;border-top:6px solid transparent;border-bottom:6px solid transparent;border-right:0;border-left:6px solid rgba(255,255,255,.3)}.pdebug .pdebug-panel.scene>ul li.has-children.expanded::before{margin:0 4px 0 -4px;border-top:6px solid rgba(255,255,255,.3);border-left:6px solid transparent;border-right:6px solid transparent;border-bottom:0}.pdebug .pdebug-panel.scene>ul li>ul{display:none;padding:0 0 0 10px}input[type=checkbox]{visibility:hidden}.checkbox{width:75px;height:26px;background:#333;position:relative;line-height:normal;-webkit-border-radius:50px;-moz-border-radius:50px;border-radius:50px;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.5),0 1px 0 rgba(255,255,255,.2);-moz-box-shadow:inset 0 1px 1px rgba(0,0,0,.5),0 1px 0 rgba(255,255,255,.2);-o-box-shadow:inset 0 1px 1px rgba(0,0,0,.5),0 1px 0 rgba(255,255,255,.2);-ms-box-shadow:inset 0 1px 1px rgba(0,0,0,.5),0 1px 0 rgba(255,255,255,.2);box-shadow:inset 0 1px 1px rgba(0,0,0,.5),0 1px 0 rgba(255,255,255,.2)}.checkbox:after{content:\'OFF\';font:12px/26px Arial,sans-serif;color:#000;position:absolute;right:10px;z-index:0;font-weight:700;text-shadow:1px 1px 0 rgba(255,255,255,.15)}.checkbox:before{content:\'ON\';font:12px/26px Arial,sans-serif;color:#00bf00;position:absolute;left:10px;z-index:0;font-weight:700}.checkbox+span{position:relative;display:block;top:-25px;left:90px;width:200px;color:#fcfff4;font-size:1.1em}.checkbox input[type=checkbox]:checked+label{left:38px}.checkbox label{display:block;width:34px;height:20px;-webkit-border-radius:50px;-moz-border-radius:50px;border-radius:50px;-webkit-transition:all .4s ease;-moz-transition:all .4s ease;-o-transition:all .4s ease;-ms-transition:all .4s ease;transition:all .4s ease;cursor:pointer;position:absolute;top:3px;left:3px;z-index:1;background:#fcfff4;background:-webkit-linear-gradient(top,#fcfff4 0,#dfe5d7 40%,#b3bead 100%);background:-moz-linear-gradient(top,#fcfff4 0,#dfe5d7 40%,#b3bead 100%);background:-o-linear-gradient(top,#fcfff4 0,#dfe5d7 40%,#b3bead 100%);background:-ms-linear-gradient(top,#fcfff4 0,#dfe5d7 40%,#b3bead 100%);background:linear-gradient(top,#fcfff4 0,#dfe5d7 40%,#b3bead 100%);-webkit-box-shadow:0 2px 5px 0 rgba(0,0,0,.3);-moz-box-shadow:0 2px 5px 0 rgba(0,0,0,.3);box-shadow:0 2px 5px 0 rgba(0,0,0,.3)}";
},{}],18:[function(require,module,exports){
// TODO: Move the legend into DOM?

function Graph(container, width, height, colors, options) {
    options = options || {};

    this.canvas = document.createElement('canvas');
    this.canvas.width = width;
    this.canvas.height = height;
    container.appendChild(this.canvas);

    this.ctx = this.canvas.getContext('2d');

    this.labelStyle = 'rgba(200, 200, 200, 0.6)';

    this.maxValue = options.maxValue || 50;
    this.padding = options.labelPadding || 5;

    this.dataLineWidth = options.lineWidth || 1;
    this.legendWidth = 230;
    this.legendBoxSize = 10;
    this.legendIndent = 5;

    this.eventY = this.padding * 2;

    this.colors = colors;

    this.dataCanvas = document.createElement('canvas');
    this.dataCanvas.width = width - this.legendWidth;
    this.dataCanvas.height = height;
    this.dctx = this.dataCanvas.getContext('2d');

    this.dataCanvasBuffer = document.createElement('canvas');
    this.dataCanvasBuffer.width = this.dataCanvas.width - this.dataLineWidth;
    this.dataCanvasBuffer.height = this.dataCanvas.height;
    this.bctx = this.dataCanvasBuffer.getContext('2d');
}

Graph.prototype.constructor = Graph;

module.exports = Graph;

// render the graph with the new data point
Graph.prototype.addData = function (values, event) {
    // clear the main canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.drawBg();
    this.drawLegend(values);
    this.drawData(values, event);
};

Graph.prototype.drawBg = function () {
    var fps60 = Math.floor(this.canvas.height - (this.canvas.height * (16 / this.maxValue))) + 0.5,
        fps30 = Math.floor(this.canvas.height - (this.canvas.height * (33 / this.maxValue))) + 0.5;

    this.ctx.strokeStyle = this.ctx.fillStyle = this.labelStyle;
    this.ctx.lineWidth = 1;

    //draw top marker line
    this.ctx.beginPath();
    this.ctx.moveTo(this.legendWidth, fps60);
    this.ctx.lineTo(this.canvas.width, fps60);
    this.ctx.stroke();

    this.ctx.fillText('16ms (60 fps)', this.legendWidth + this.padding, fps60 - this.padding);

    //draw the second marker line
    this.ctx.beginPath();
    this.ctx.moveTo(this.legendWidth, fps30);
    this.ctx.lineTo(this.canvas.width, fps30);
    this.ctx.stroke();

    this.ctx.fillText('33ms (30 fps)', this.legendWidth + this.padding, fps30 - this.padding);

    //draw baseline marker
    this.ctx.beginPath();
    this.ctx.moveTo(this.legendWidth, this.canvas.height - 0.5);
    this.ctx.lineTo(this.canvas.width, this.canvas.height - 0.5);
    this.ctx.stroke();
};

Graph.prototype.drawLegend = function (values) {
    var colorIndex = 0,
        yIndex = 0,
        x = this.padding,
        y = 0;

    for (var k in values) {
        y = (yIndex * this.legendBoxSize) + (this.padding * (yIndex + 1)) + this.padding;

        // Draw parent label
        this.ctx.fillStyle = this.labelStyle;
        this.ctx.fillText(k, x, y);

        ++yIndex;

        // Draw children
        for (var c in values[k]) {
            y = (yIndex * this.legendBoxSize) + (this.padding * yIndex);

            this.ctx.fillStyle = this.colors[colorIndex++ % this.colors.length];
            this.ctx.fillRect(x + this.legendIndent, y, this.legendBoxSize, this.legendBoxSize);

            this.ctx.fillStyle = this.labelStyle;
            this.ctx.fillText(
                Math.round(values[k][c]) + 'ms - ' + c,
                x + this.legendIndent + this.legendBoxSize + this.padding,
                y + this.legendBoxSize
            );

            ++yIndex;

            if (yIndex > 16) {
                x += this.legendWidth / 2;
                yIndex = 0;
            }
        }
    }
};

Graph.prototype.drawData = function (values, event) {
    var x = this.dataCanvas.width - this.dataLineWidth + 0.5,
        y = this.dataCanvas.height - 0.5;

    // clear the buffer
    this.bctx.clearRect(0, 0, this.dataCanvasBuffer.width, this.dataCanvasBuffer.height);

    // draw the data canvas to the buffer, skipping the first line
    this.bctx.drawImage(
        this.dataCanvas,
        this.dataLineWidth, 0, x, y,
        0, 0, x, y
    );

    // clear the data canvas
    this.dctx.clearRect(0, 0, this.dataCanvas.width, this.dataCanvas.height);

    // draw the buffer back to the data canvas
    this.dctx.drawImage(this.dataCanvasBuffer, 0, 0);

    // draw event to the new line of the data canvas if there was one
    if (event) {
        this.dctx.beginPath();
        this.dctx.strokeStyle = this.dctx.fillStyle = '#ff0000';
        this.dctx.lineWidth = this.dataLineWidth;

        this.dctx.moveTo(x, y);
        this.dctx.lineTo(x, 0);

        this.dctx.stroke();

        this.dctx.textAlign = 'right';
        this.dctx.fillText(event, x - this.padding, this.eventY);

        this.eventY += (this.padding * 2);

        if (this.eventY > (this.dataCanvas.height / 2)) {
            this.eventY = (this.padding * 2);
        }
    }

    // draws the data values to the new line of the data canvas

    // draw the new data points
    var colorIndex = 0,
        step = 0;

    for (var k in values) {
        for (var c in values[k]) {
            this.dctx.beginPath();
            this.dctx.strokeStyle = this.dctx.fillStyle = this.colors[colorIndex++ % this.colors.length];
            this.dctx.lineWidth = this.dataLineWidth;

            step = ((values[k][c] / this.maxValue) * this.dataCanvas.height);
            step = step < 0 ? 0 : step;

            this.dctx.moveTo(x, y);
            this.dctx.lineTo(x, y-=step);

            this.dctx.stroke();
        }
    }

    // draw the data canvas to the main rendered canvas
    this.ctx.drawImage(this.dataCanvas, this.legendWidth, 0);
};

Graph.prototype.destroy = function () {
    this.canvas = null;
    this.ctx = null;

    this.labelStyle = null;

    this.maxValue = null;
    this.padding = null;

    this.dataLineWidth = null;
    this.legendWidth = null;
    this.legendBoxSize = null;
    this.legendIndent = null;

    this.colors = null;

    this.dataCanvas = null;
    this.dctx = null;

    this.dataCanvasBuffer = null;
    this.bctx = null;
};

},{}],19:[function(require,module,exports){
//Some general dom helpers
var ui = {
    delegate: function (dom, evt, selector, fn) {
        dom.addEventListener(evt, function(e) {
            window.target = e.target;
            if (e.target && e.target.matches(selector)) {
                e.delegateTarget = e.target;

                if (fn) {
                    fn(e);
                }
            }
            else if (e.target.parentElement && e.target.parentElement.matches(selector)) {
                e.delegateTarget = e.target.parentElement;

                if (fn) {
                    fn(e);
                }
            }
        });
    },

    on: function (dom, evt, delegate, fn) {
        if (typeof delegate === 'function') {
            fn = delegate;
            delegate = null;
        }

        if (delegate) {
            return ui.delegate(dom, evt, delegate, fn);
        }

        dom.addEventListener(evt, fn);
    },

    removeClass: function (dom, cls) {
        var classes = dom.className.split(' '),
            i = classes.indexOf(cls);

        if(i !== -1) {
            classes.splice(i, 1);
            dom.className = classes.join(' ').trim();
        }
    },

    addClass: function (dom, cls) {
        var classes = dom.className.split(' ');

        classes.push(cls);
        dom.className = classes.join(' ').trim();
    },

    hasClass: function (dom, cls) {
        return dom.className.split(' ').indexOf(cls) !== -1;
    },

    toggleClass: function (dom, cls) {
        if (ui.hasClass(dom, cls)) {
            ui.removeClass(dom, cls);
        } else {
            ui.addClass(dom, cls);
        }
    },

    setText: function (dom, txt) {
        dom.textContent = txt;
    },

    setHtml: function (dom, html) {
        dom.innerHTML = html;
    },

    setStyle: function (dom, style, value) {
        if(typeof style === 'string') {
            dom.style[style] = value;
        } else {
            for(var key in style) {
                dom.style[key] = style[key];
            }
        }
    },

    empty: function (dom) {
        while(dom.firstChild) {
            dom.removeChild(dom.firstChild);
        }
    },

    show: function (dom) {
        ui.setStyle(dom, 'display', 'block');
    },

    hide: function (dom) {
        ui.setStyle(dom, 'display', 'none');
    },

    clear: function () {
        var br = document.createElement('br');
        ui.setStyle(br, 'clear', 'both');

        return br;
    },

    addCss: function (css) {
        var style = document.createElement('style');

        style.type = 'text/css';

        if (style.styleSheet){
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }

        document.head.appendChild(style);
    }
};

module.exports = ui;

// polyfill for matchesSelector
if (!HTMLElement.prototype.matches) {
    var htmlprot = HTMLElement.prototype;

    htmlprot.matches =
        htmlprot.matches ||
        htmlprot.webkitMatchesSelector ||
        htmlprot.mozMatchesSelector ||
        htmlprot.msMatchesSelector ||
        htmlprot.oMatchesSelector ||
        function (selector) {
            // poorman's polyfill for matchesSelector
            var elements = this.parentElement.querySelectorAll(selector),
                element,
                i = 0;

            while (element = elements[i++]) {
                if (element === this) {
                    return true;
                }
            }

            return false;
        };
}

},{}]},{},[1])(1)
});