(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["cytoscapeMultilevelLayout"] = factory();
	else
		root["cytoscapeMultilevelLayout"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * TODO
 * Choose the type of layout that best suits your usecase as a starting point.
 *
 * A discrete layout is one that algorithmically sets resultant positions.  It
 * does not have intermediate positions.
 *
 * A continuous layout is one that updates positions continuously, like a force-
 * directed / physics simulation layout.
 */
module.exports = __webpack_require__(3);
// module.exports = require('./continuous');

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Simple, internal Object.assign() polyfill for options objects etc.

module.exports = Object.assign != null ? Object.assign.bind(Object) : function (tgt) {
  for (var _len = arguments.length, srcs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    srcs[_key - 1] = arguments[_key];
  }

  srcs.forEach(function (src) {
    Object.keys(src).forEach(function (k) {
      return tgt[k] = src[k];
    });
  });

  return tgt;
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var impl = __webpack_require__(0);

// registers the extension on a cytoscape lib ref
var register = function register(cytoscape) {
  if (!cytoscape) {
    return;
  } // can't register if cytoscape unspecified

  cytoscape('layout', 'multilevelLayout', impl); // register with cytoscape.js
};

if (typeof cytoscape !== 'undefined') {
  // expose to global cytoscape (i.e. window.cytoscape)
  register(cytoscape);
}

module.exports = register;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var applyMultilevelLayout = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(cy) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return new Promise(function (resolve, reject) {
              var l = cy.layout({ name: "random" });
              l.pon("layoutstop").then(function () {
                // Step 1: Generate coarser graph
                generateCoarserGraph(cy);
                var cl = cy.layout(COSE);
                cl.pon("layoutstop").then(function () {
                  RenderAnotherStep();
                });
                cl.run();
                // Step 2: Generate finer graph
                var RenderAnotherStep = function RenderAnotherStep() {
                  generateFinerGraph(cy);
                  var fl = cy.layout(COSE);
                  fl.pon("layoutstop").then(function (e) {
                    if (cy.nodes().some(function (n) {
                      return n.data("childNodes");
                    })) {
                      RenderAnotherStep();
                    } else {
                      resolve(cy);
                    }
                  });
                  fl.run();
                };
                RenderAnotherStep();
              });
              l.run();
            });

          case 2:
            return _context.abrupt("return", _context.sent);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function applyMultilevelLayout(_x2) {
    return _ref.apply(this, arguments);
  };
}();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// n.b. .layoutPositions() handles all these options for you

var assign = __webpack_require__(1);

var defaults = Object.freeze({
  // animation
  animate: undefined, // whether or not to animate the layout
  animationDuration: undefined, // duration of animation in ms, if enabled
  animationEasing: undefined, // easing of animation, if enabled
  animateFilter: function animateFilter(node, i) {
    return true;
  }, // whether to animate specific nodes when animation is on; non-animated nodes immediately go to their final positions

  // viewport
  pan: undefined, // pan the graph to the provided position, given as { x, y }
  zoom: undefined, // zoom level as a positive number to set after animation
  fit: undefined, // fit the viewport to the repositioned nodes, overrides pan and zoom

  // modifications
  padding: undefined, // padding around layout
  boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
  spacingFactor: undefined, // a positive value which adjusts spacing between nodes (>1 means greater than usual spacing)
  nodeDimensionsIncludeLabels: undefined, // whether labels should be included in determining the space used by a node (default true)
  transform: function transform(node, pos) {
    return pos;
  }, // a function that applies a transform to the final node position

  // layout event callbacks
  ready: function ready() {}, // on layoutready
  stop: function stop() {} // on layoutstop
});

var COSE = {
  name: "cose",
  randomize: false,
  fit: true,
  animate: false,
  nodeRepulsion: 900000,
  edgeElasticity: 10000
};

function generateCoarserGraph(cy) {
  var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  // Remove edges with the same source and target
  cy.remove(cy.edges().filter(function (e) {
    return e.isLoop();
  }));
  var inputCount = cy.elements().length;
  var oldElements = cy.collection();
  // Iterate over each edge
  cy.edges().sort(function (e1, e2) {
    return e2.source().degree() + e2.target().degree() - (e1.source().degree() + e1.target().degree());
  }).forEach(function (edge, i) {
    var source = edge.source();
    var target = edge.target();
    // Check if the edge shares a vertext with any of the edges in previous iterations
    if (!oldElements.contains(source) && !oldElements.contains(target)) {
      // Add the source and the target nodes to the oldElements. These will be removed in the next graph
      oldElements = oldElements.union(source).union(target);
      // The edge will be removed in the next graph
      oldElements = oldElements.union(edge);
      // Combine the source and target to form a new super node
      var superNode = {
        group: "nodes",
        id: "" + level + i,
        data: {
          id: "" + level + i,
          childNodes: [source, target],
          originalEdge: edge,
          group: "multilevel",
          level: level
        }
      };
      // Add the super node to the list of nodes
      cy.add(superNode);
    }
  });

  oldElements.nodes().forEach(function (node, i) {
    var superNode = cy.nodes().filter(function (n) {
      return n.data().childNodes && n.data().childNodes.some(function (c) {
        return c.is(node);
      });
    }).first();
    node.connectedEdges().each(function (edge, j) {
      if (oldElements.contains(edge)) return;
      oldElements = oldElements.union(edge);
      var s = edge.source();
      var t = edge.target();
      var otherNode = node.is(s) ? t : s;
      if (oldElements.contains(otherNode)) {
        otherNode = cy.nodes().filter(function (n) {
          return n.data().childNodes && n.data().childNodes.some(function (c) {
            return c.is(otherNode);
          });
        }).first();
      }
      var newEdge = {
        group: "edges",
        id: "e-" + level + "-" + i + "-" + j,
        data: {
          id: "e-" + level + "-" + i + "-" + j,
          source: node.is(s) ? superNode.id() : otherNode.id(),
          target: node.is(s) ? otherNode.id() : superNode.id(),
          group: "multilevel",
          originalEdge: edge
        }
      };
      // Add the new edge
      cy.add(newEdge);
    });
  });
  cy.remove(oldElements);
  var nextGraph = cy.json();
  // Remove old elements, add new elements and return the new graph
  return inputCount - cy.elements().length <= 2 || nextGraph.elements.nodes.length < 3 ? cy : generateCoarserGraph(cy, level + 1);
}

function generateFinerGraph(cy) {
  var maxLevel = cy.nodes().max(function (n) {
    return n.data("level");
  }).value;
  var newNodes = [];
  // Elements to be removed
  var oldElements = cy.collection();
  cy.nodes().filter(function (n) {
    return n.data().childNodes && n.data("level") == maxLevel;
  }).forEach(function (sn) {
    oldElements = oldElements.union(sn);
    newNodes = [].concat(_toConsumableArray(newNodes), _toConsumableArray(sn.data().childNodes.map(function (n) {
      n.position(sn.position());
      return n;
    })));
  });
  newNodes.map(function (n) {
    return cy.add(n);
  });
  oldElements.nodes().forEach(function (n) {
    cy.add(n.data().originalEdge);
    n.connectedEdges().forEach(function (edge) {
      oldElements = oldElements.union(edge);
      cy.add(edge.data().originalEdge);
    });
  });
  cy.remove(oldElements);
  return cy;
}

var Layout = function () {
  function Layout(options) {
    _classCallCheck(this, Layout);

    this.options = assign({}, defaults, options);
  }

  _createClass(Layout, [{
    key: "run",
    value: function run() {
      var layout = this;
      var options = this.options;
      var cy = options.cy;
      var eles = options.eles;
      var nodes = eles.nodes();

      applyMultilevelLayout(cy);
      cy.layout({ name: 'preset' }).run();

      var getNodePos = function getNodePos(ele, i) {
        return;
      };

      // .layoutPositions() automatically handles the layout busywork for you
      nodes.layoutPositions(layout, options, getNodePos);
    }
  }]);

  return Layout;
}();

module.exports = Layout;

/***/ })
/******/ ]);
});