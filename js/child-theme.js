/*!
  * Understrap v1.2.0 (https://understrap.com)
  * Copyright 2013-2026 The Understrap Authors (https://github.com/understrap/understrap/graphs/contributors)
  * Licensed under GPL-3.0 (undefined)
  */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('jquery')) :
	typeof define === 'function' && define.amd ? define(['exports', 'jquery'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.understrap = {}, global.jQuery));
})(this, (function (exports, require$$0$1) { 'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function getDefaultExportFromCjs (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function getAugmentedNamespace(n) {
	  var f = n.default;
		if (typeof f == "function") {
			var a = function a () {
				if (this instanceof a) {
					var args = [null];
					args.push.apply(args, arguments);
					var Ctor = Function.bind.apply(f, args);
					return new Ctor();
				}
				return f.apply(this, arguments);
			};
			a.prototype = f.prototype;
	  } else a = {};
	  Object.defineProperty(a, '__esModule', {value: true});
		Object.keys(n).forEach(function (k) {
			var d = Object.getOwnPropertyDescriptor(n, k);
			Object.defineProperty(a, k, d.get ? d : {
				enumerable: true,
				get: function () {
					return n[k];
				}
			});
		});
		return a;
	}

	var alert$1 = {exports: {}};

	var util = {exports: {}};

	/*!
	  * Bootstrap index.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	var hasRequiredUtil;

	function requireUtil () {
		if (hasRequiredUtil) return util.exports;
		hasRequiredUtil = 1;
		(function (module, exports) {
			(function (global, factory) {
			  factory(exports) ;
			})(commonjsGlobal, function (exports) {

			  /**
			   * --------------------------------------------------------------------------
			   * Bootstrap (v5.2.3): util/index.js
			   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
			   * --------------------------------------------------------------------------
			   */
			  const MAX_UID = 1000000;
			  const MILLISECONDS_MULTIPLIER = 1000;
			  const TRANSITION_END = 'transitionend'; // Shout-out Angus Croll (https://goo.gl/pxwQGp)

			  const toType = object => {
			    if (object === null || object === undefined) {
			      return `${object}`;
			    }
			    return Object.prototype.toString.call(object).match(/\s([a-z]+)/i)[1].toLowerCase();
			  };
			  /**
			   * Public Util API
			   */

			  const getUID = prefix => {
			    do {
			      prefix += Math.floor(Math.random() * MAX_UID);
			    } while (document.getElementById(prefix));
			    return prefix;
			  };
			  const getSelector = element => {
			    let selector = element.getAttribute('data-bs-target');
			    if (!selector || selector === '#') {
			      let hrefAttribute = element.getAttribute('href'); // The only valid content that could double as a selector are IDs or classes,
			      // so everything starting with `#` or `.`. If a "real" URL is used as the selector,
			      // `document.querySelector` will rightfully complain it is invalid.
			      // See https://github.com/twbs/bootstrap/issues/32273

			      if (!hrefAttribute || !hrefAttribute.includes('#') && !hrefAttribute.startsWith('.')) {
			        return null;
			      } // Just in case some CMS puts out a full URL with the anchor appended

			      if (hrefAttribute.includes('#') && !hrefAttribute.startsWith('#')) {
			        hrefAttribute = `#${hrefAttribute.split('#')[1]}`;
			      }
			      selector = hrefAttribute && hrefAttribute !== '#' ? hrefAttribute.trim() : null;
			    }
			    return selector;
			  };
			  const getSelectorFromElement = element => {
			    const selector = getSelector(element);
			    if (selector) {
			      return document.querySelector(selector) ? selector : null;
			    }
			    return null;
			  };
			  const getElementFromSelector = element => {
			    const selector = getSelector(element);
			    return selector ? document.querySelector(selector) : null;
			  };
			  const getTransitionDurationFromElement = element => {
			    if (!element) {
			      return 0;
			    } // Get transition-duration of the element

			    let {
			      transitionDuration,
			      transitionDelay
			    } = window.getComputedStyle(element);
			    const floatTransitionDuration = Number.parseFloat(transitionDuration);
			    const floatTransitionDelay = Number.parseFloat(transitionDelay); // Return 0 if element or transition duration is not found

			    if (!floatTransitionDuration && !floatTransitionDelay) {
			      return 0;
			    } // If multiple durations are defined, take the first

			    transitionDuration = transitionDuration.split(',')[0];
			    transitionDelay = transitionDelay.split(',')[0];
			    return (Number.parseFloat(transitionDuration) + Number.parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
			  };
			  const triggerTransitionEnd = element => {
			    element.dispatchEvent(new Event(TRANSITION_END));
			  };
			  const isElement = object => {
			    if (!object || typeof object !== 'object') {
			      return false;
			    }
			    if (typeof object.jquery !== 'undefined') {
			      object = object[0];
			    }
			    return typeof object.nodeType !== 'undefined';
			  };
			  const getElement = object => {
			    // it's a jQuery object or a node element
			    if (isElement(object)) {
			      return object.jquery ? object[0] : object;
			    }
			    if (typeof object === 'string' && object.length > 0) {
			      return document.querySelector(object);
			    }
			    return null;
			  };
			  const isVisible = element => {
			    if (!isElement(element) || element.getClientRects().length === 0) {
			      return false;
			    }
			    const elementIsVisible = getComputedStyle(element).getPropertyValue('visibility') === 'visible'; // Handle `details` element as its content may falsie appear visible when it is closed

			    const closedDetails = element.closest('details:not([open])');
			    if (!closedDetails) {
			      return elementIsVisible;
			    }
			    if (closedDetails !== element) {
			      const summary = element.closest('summary');
			      if (summary && summary.parentNode !== closedDetails) {
			        return false;
			      }
			      if (summary === null) {
			        return false;
			      }
			    }
			    return elementIsVisible;
			  };
			  const isDisabled = element => {
			    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
			      return true;
			    }
			    if (element.classList.contains('disabled')) {
			      return true;
			    }
			    if (typeof element.disabled !== 'undefined') {
			      return element.disabled;
			    }
			    return element.hasAttribute('disabled') && element.getAttribute('disabled') !== 'false';
			  };
			  const findShadowRoot = element => {
			    if (!document.documentElement.attachShadow) {
			      return null;
			    } // Can find the shadow root otherwise it'll return the document

			    if (typeof element.getRootNode === 'function') {
			      const root = element.getRootNode();
			      return root instanceof ShadowRoot ? root : null;
			    }
			    if (element instanceof ShadowRoot) {
			      return element;
			    } // when we don't find a shadow root

			    if (!element.parentNode) {
			      return null;
			    }
			    return findShadowRoot(element.parentNode);
			  };
			  const noop = () => {};
			  /**
			   * Trick to restart an element's animation
			   *
			   * @param {HTMLElement} element
			   * @return void
			   *
			   * @see https://www.charistheo.io/blog/2021/02/restart-a-css-animation-with-javascript/#restarting-a-css-animation
			   */

			  const reflow = element => {
			    element.offsetHeight; // eslint-disable-line no-unused-expressions
			  };

			  const getjQuery = () => {
			    if (window.jQuery && !document.body.hasAttribute('data-bs-no-jquery')) {
			      return window.jQuery;
			    }
			    return null;
			  };
			  const DOMContentLoadedCallbacks = [];
			  const onDOMContentLoaded = callback => {
			    if (document.readyState === 'loading') {
			      // add listener on the first call when the document is in loading state
			      if (!DOMContentLoadedCallbacks.length) {
			        document.addEventListener('DOMContentLoaded', () => {
			          for (const callback of DOMContentLoadedCallbacks) {
			            callback();
			          }
			        });
			      }
			      DOMContentLoadedCallbacks.push(callback);
			    } else {
			      callback();
			    }
			  };
			  const isRTL = () => document.documentElement.dir === 'rtl';
			  const defineJQueryPlugin = plugin => {
			    onDOMContentLoaded(() => {
			      const $ = getjQuery();
			      /* istanbul ignore if */

			      if ($) {
			        const name = plugin.NAME;
			        const JQUERY_NO_CONFLICT = $.fn[name];
			        $.fn[name] = plugin.jQueryInterface;
			        $.fn[name].Constructor = plugin;
			        $.fn[name].noConflict = () => {
			          $.fn[name] = JQUERY_NO_CONFLICT;
			          return plugin.jQueryInterface;
			        };
			      }
			    });
			  };
			  const execute = callback => {
			    if (typeof callback === 'function') {
			      callback();
			    }
			  };
			  const executeAfterTransition = (callback, transitionElement, waitForTransition = true) => {
			    if (!waitForTransition) {
			      execute(callback);
			      return;
			    }
			    const durationPadding = 5;
			    const emulatedDuration = getTransitionDurationFromElement(transitionElement) + durationPadding;
			    let called = false;
			    const handler = ({
			      target
			    }) => {
			      if (target !== transitionElement) {
			        return;
			      }
			      called = true;
			      transitionElement.removeEventListener(TRANSITION_END, handler);
			      execute(callback);
			    };
			    transitionElement.addEventListener(TRANSITION_END, handler);
			    setTimeout(() => {
			      if (!called) {
			        triggerTransitionEnd(transitionElement);
			      }
			    }, emulatedDuration);
			  };
			  /**
			   * Return the previous/next element of a list.
			   *
			   * @param {array} list    The list of elements
			   * @param activeElement   The active element
			   * @param shouldGetNext   Choose to get next or previous element
			   * @param isCycleAllowed
			   * @return {Element|elem} The proper element
			   */

			  const getNextActiveElement = (list, activeElement, shouldGetNext, isCycleAllowed) => {
			    const listLength = list.length;
			    let index = list.indexOf(activeElement); // if the element does not exist in the list return an element
			    // depending on the direction and if cycle is allowed

			    if (index === -1) {
			      return !shouldGetNext && isCycleAllowed ? list[listLength - 1] : list[0];
			    }
			    index += shouldGetNext ? 1 : -1;
			    if (isCycleAllowed) {
			      index = (index + listLength) % listLength;
			    }
			    return list[Math.max(0, Math.min(index, listLength - 1))];
			  };
			  exports.defineJQueryPlugin = defineJQueryPlugin;
			  exports.execute = execute;
			  exports.executeAfterTransition = executeAfterTransition;
			  exports.findShadowRoot = findShadowRoot;
			  exports.getElement = getElement;
			  exports.getElementFromSelector = getElementFromSelector;
			  exports.getNextActiveElement = getNextActiveElement;
			  exports.getSelectorFromElement = getSelectorFromElement;
			  exports.getTransitionDurationFromElement = getTransitionDurationFromElement;
			  exports.getUID = getUID;
			  exports.getjQuery = getjQuery;
			  exports.isDisabled = isDisabled;
			  exports.isElement = isElement;
			  exports.isRTL = isRTL;
			  exports.isVisible = isVisible;
			  exports.noop = noop;
			  exports.onDOMContentLoaded = onDOMContentLoaded;
			  exports.reflow = reflow;
			  exports.toType = toType;
			  exports.triggerTransitionEnd = triggerTransitionEnd;
			  Object.defineProperties(exports, {
			    __esModule: {
			      value: true
			    },
			    [Symbol.toStringTag]: {
			      value: 'Module'
			    }
			  });
			});
	} (util, util.exports));
		return util.exports;
	}

	var eventHandler = {exports: {}};

	/*!
	  * Bootstrap event-handler.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	var hasRequiredEventHandler;

	function requireEventHandler () {
		if (hasRequiredEventHandler) return eventHandler.exports;
		hasRequiredEventHandler = 1;
		(function (module, exports) {
			(function (global, factory) {
			  module.exports = factory(requireUtil()) ;
			})(commonjsGlobal, function (index) {

			  /**
			   * --------------------------------------------------------------------------
			   * Bootstrap (v5.2.3): dom/event-handler.js
			   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
			   * --------------------------------------------------------------------------
			   */
			  /**
			   * Constants
			   */
			  const namespaceRegex = /[^.]*(?=\..*)\.|.*/;
			  const stripNameRegex = /\..*/;
			  const stripUidRegex = /::\d+$/;
			  const eventRegistry = {}; // Events storage

			  let uidEvent = 1;
			  const customEvents = {
			    mouseenter: 'mouseover',
			    mouseleave: 'mouseout'
			  };
			  const nativeEvents = new Set(['click', 'dblclick', 'mouseup', 'mousedown', 'contextmenu', 'mousewheel', 'DOMMouseScroll', 'mouseover', 'mouseout', 'mousemove', 'selectstart', 'selectend', 'keydown', 'keypress', 'keyup', 'orientationchange', 'touchstart', 'touchmove', 'touchend', 'touchcancel', 'pointerdown', 'pointermove', 'pointerup', 'pointerleave', 'pointercancel', 'gesturestart', 'gesturechange', 'gestureend', 'focus', 'blur', 'change', 'reset', 'select', 'submit', 'focusin', 'focusout', 'load', 'unload', 'beforeunload', 'resize', 'move', 'DOMContentLoaded', 'readystatechange', 'error', 'abort', 'scroll']);
			  /**
			   * Private methods
			   */

			  function makeEventUid(element, uid) {
			    return uid && `${uid}::${uidEvent++}` || element.uidEvent || uidEvent++;
			  }
			  function getElementEvents(element) {
			    const uid = makeEventUid(element);
			    element.uidEvent = uid;
			    eventRegistry[uid] = eventRegistry[uid] || {};
			    return eventRegistry[uid];
			  }
			  function bootstrapHandler(element, fn) {
			    return function handler(event) {
			      hydrateObj(event, {
			        delegateTarget: element
			      });
			      if (handler.oneOff) {
			        EventHandler.off(element, event.type, fn);
			      }
			      return fn.apply(element, [event]);
			    };
			  }
			  function bootstrapDelegationHandler(element, selector, fn) {
			    return function handler(event) {
			      const domElements = element.querySelectorAll(selector);
			      for (let {
			        target
			      } = event; target && target !== this; target = target.parentNode) {
			        for (const domElement of domElements) {
			          if (domElement !== target) {
			            continue;
			          }
			          hydrateObj(event, {
			            delegateTarget: target
			          });
			          if (handler.oneOff) {
			            EventHandler.off(element, event.type, selector, fn);
			          }
			          return fn.apply(target, [event]);
			        }
			      }
			    };
			  }
			  function findHandler(events, callable, delegationSelector = null) {
			    return Object.values(events).find(event => event.callable === callable && event.delegationSelector === delegationSelector);
			  }
			  function normalizeParameters(originalTypeEvent, handler, delegationFunction) {
			    const isDelegated = typeof handler === 'string'; // todo: tooltip passes `false` instead of selector, so we need to check

			    const callable = isDelegated ? delegationFunction : handler || delegationFunction;
			    let typeEvent = getTypeEvent(originalTypeEvent);
			    if (!nativeEvents.has(typeEvent)) {
			      typeEvent = originalTypeEvent;
			    }
			    return [isDelegated, callable, typeEvent];
			  }
			  function addHandler(element, originalTypeEvent, handler, delegationFunction, oneOff) {
			    if (typeof originalTypeEvent !== 'string' || !element) {
			      return;
			    }
			    let [isDelegated, callable, typeEvent] = normalizeParameters(originalTypeEvent, handler, delegationFunction); // in case of mouseenter or mouseleave wrap the handler within a function that checks for its DOM position
			    // this prevents the handler from being dispatched the same way as mouseover or mouseout does

			    if (originalTypeEvent in customEvents) {
			      const wrapFunction = fn => {
			        return function (event) {
			          if (!event.relatedTarget || event.relatedTarget !== event.delegateTarget && !event.delegateTarget.contains(event.relatedTarget)) {
			            return fn.call(this, event);
			          }
			        };
			      };
			      callable = wrapFunction(callable);
			    }
			    const events = getElementEvents(element);
			    const handlers = events[typeEvent] || (events[typeEvent] = {});
			    const previousFunction = findHandler(handlers, callable, isDelegated ? handler : null);
			    if (previousFunction) {
			      previousFunction.oneOff = previousFunction.oneOff && oneOff;
			      return;
			    }
			    const uid = makeEventUid(callable, originalTypeEvent.replace(namespaceRegex, ''));
			    const fn = isDelegated ? bootstrapDelegationHandler(element, handler, callable) : bootstrapHandler(element, callable);
			    fn.delegationSelector = isDelegated ? handler : null;
			    fn.callable = callable;
			    fn.oneOff = oneOff;
			    fn.uidEvent = uid;
			    handlers[uid] = fn;
			    element.addEventListener(typeEvent, fn, isDelegated);
			  }
			  function removeHandler(element, events, typeEvent, handler, delegationSelector) {
			    const fn = findHandler(events[typeEvent], handler, delegationSelector);
			    if (!fn) {
			      return;
			    }
			    element.removeEventListener(typeEvent, fn, Boolean(delegationSelector));
			    delete events[typeEvent][fn.uidEvent];
			  }
			  function removeNamespacedHandlers(element, events, typeEvent, namespace) {
			    const storeElementEvent = events[typeEvent] || {};
			    for (const handlerKey of Object.keys(storeElementEvent)) {
			      if (handlerKey.includes(namespace)) {
			        const event = storeElementEvent[handlerKey];
			        removeHandler(element, events, typeEvent, event.callable, event.delegationSelector);
			      }
			    }
			  }
			  function getTypeEvent(event) {
			    // allow to get the native events from namespaced events ('click.bs.button' --> 'click')
			    event = event.replace(stripNameRegex, '');
			    return customEvents[event] || event;
			  }
			  const EventHandler = {
			    on(element, event, handler, delegationFunction) {
			      addHandler(element, event, handler, delegationFunction, false);
			    },
			    one(element, event, handler, delegationFunction) {
			      addHandler(element, event, handler, delegationFunction, true);
			    },
			    off(element, originalTypeEvent, handler, delegationFunction) {
			      if (typeof originalTypeEvent !== 'string' || !element) {
			        return;
			      }
			      const [isDelegated, callable, typeEvent] = normalizeParameters(originalTypeEvent, handler, delegationFunction);
			      const inNamespace = typeEvent !== originalTypeEvent;
			      const events = getElementEvents(element);
			      const storeElementEvent = events[typeEvent] || {};
			      const isNamespace = originalTypeEvent.startsWith('.');
			      if (typeof callable !== 'undefined') {
			        // Simplest case: handler is passed, remove that listener ONLY.
			        if (!Object.keys(storeElementEvent).length) {
			          return;
			        }
			        removeHandler(element, events, typeEvent, callable, isDelegated ? handler : null);
			        return;
			      }
			      if (isNamespace) {
			        for (const elementEvent of Object.keys(events)) {
			          removeNamespacedHandlers(element, events, elementEvent, originalTypeEvent.slice(1));
			        }
			      }
			      for (const keyHandlers of Object.keys(storeElementEvent)) {
			        const handlerKey = keyHandlers.replace(stripUidRegex, '');
			        if (!inNamespace || originalTypeEvent.includes(handlerKey)) {
			          const event = storeElementEvent[keyHandlers];
			          removeHandler(element, events, typeEvent, event.callable, event.delegationSelector);
			        }
			      }
			    },
			    trigger(element, event, args) {
			      if (typeof event !== 'string' || !element) {
			        return null;
			      }
			      const $ = index.getjQuery();
			      const typeEvent = getTypeEvent(event);
			      const inNamespace = event !== typeEvent;
			      let jQueryEvent = null;
			      let bubbles = true;
			      let nativeDispatch = true;
			      let defaultPrevented = false;
			      if (inNamespace && $) {
			        jQueryEvent = $.Event(event, args);
			        $(element).trigger(jQueryEvent);
			        bubbles = !jQueryEvent.isPropagationStopped();
			        nativeDispatch = !jQueryEvent.isImmediatePropagationStopped();
			        defaultPrevented = jQueryEvent.isDefaultPrevented();
			      }
			      let evt = new Event(event, {
			        bubbles,
			        cancelable: true
			      });
			      evt = hydrateObj(evt, args);
			      if (defaultPrevented) {
			        evt.preventDefault();
			      }
			      if (nativeDispatch) {
			        element.dispatchEvent(evt);
			      }
			      if (evt.defaultPrevented && jQueryEvent) {
			        jQueryEvent.preventDefault();
			      }
			      return evt;
			    }
			  };
			  function hydrateObj(obj, meta) {
			    for (const [key, value] of Object.entries(meta || {})) {
			      try {
			        obj[key] = value;
			      } catch (_unused) {
			        Object.defineProperty(obj, key, {
			          configurable: true,
			          get() {
			            return value;
			          }
			        });
			      }
			    }
			    return obj;
			  }
			  return EventHandler;
			});
	} (eventHandler));
		return eventHandler.exports;
	}

	var baseComponent = {exports: {}};

	var data = {exports: {}};

	/*!
	  * Bootstrap data.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	var hasRequiredData;

	function requireData () {
		if (hasRequiredData) return data.exports;
		hasRequiredData = 1;
		(function (module, exports) {
			(function (global, factory) {
			  module.exports = factory() ;
			})(commonjsGlobal, function () {

			  /**
			   * --------------------------------------------------------------------------
			   * Bootstrap (v5.2.3): dom/data.js
			   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
			   * --------------------------------------------------------------------------
			   */

			  /**
			   * Constants
			   */
			  const elementMap = new Map();
			  const data = {
			    set(element, key, instance) {
			      if (!elementMap.has(element)) {
			        elementMap.set(element, new Map());
			      }
			      const instanceMap = elementMap.get(element); // make it clear we only want one instance per element
			      // can be removed later when multiple key/instances are fine to be used

			      if (!instanceMap.has(key) && instanceMap.size !== 0) {
			        // eslint-disable-next-line no-console
			        console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(instanceMap.keys())[0]}.`);
			        return;
			      }
			      instanceMap.set(key, instance);
			    },
			    get(element, key) {
			      if (elementMap.has(element)) {
			        return elementMap.get(element).get(key) || null;
			      }
			      return null;
			    },
			    remove(element, key) {
			      if (!elementMap.has(element)) {
			        return;
			      }
			      const instanceMap = elementMap.get(element);
			      instanceMap.delete(key); // free up element references if there are no instances left for an element

			      if (instanceMap.size === 0) {
			        elementMap.delete(element);
			      }
			    }
			  };
			  return data;
			});
	} (data));
		return data.exports;
	}

	var config = {exports: {}};

	var manipulator = {exports: {}};

	/*!
	  * Bootstrap manipulator.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	var hasRequiredManipulator;

	function requireManipulator () {
		if (hasRequiredManipulator) return manipulator.exports;
		hasRequiredManipulator = 1;
		(function (module, exports) {
			(function (global, factory) {
			  module.exports = factory() ;
			})(commonjsGlobal, function () {

			  /**
			   * --------------------------------------------------------------------------
			   * Bootstrap (v5.2.3): dom/manipulator.js
			   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
			   * --------------------------------------------------------------------------
			   */
			  function normalizeData(value) {
			    if (value === 'true') {
			      return true;
			    }
			    if (value === 'false') {
			      return false;
			    }
			    if (value === Number(value).toString()) {
			      return Number(value);
			    }
			    if (value === '' || value === 'null') {
			      return null;
			    }
			    if (typeof value !== 'string') {
			      return value;
			    }
			    try {
			      return JSON.parse(decodeURIComponent(value));
			    } catch (_unused) {
			      return value;
			    }
			  }
			  function normalizeDataKey(key) {
			    return key.replace(/[A-Z]/g, chr => `-${chr.toLowerCase()}`);
			  }
			  const Manipulator = {
			    setDataAttribute(element, key, value) {
			      element.setAttribute(`data-bs-${normalizeDataKey(key)}`, value);
			    },
			    removeDataAttribute(element, key) {
			      element.removeAttribute(`data-bs-${normalizeDataKey(key)}`);
			    },
			    getDataAttributes(element) {
			      if (!element) {
			        return {};
			      }
			      const attributes = {};
			      const bsKeys = Object.keys(element.dataset).filter(key => key.startsWith('bs') && !key.startsWith('bsConfig'));
			      for (const key of bsKeys) {
			        let pureKey = key.replace(/^bs/, '');
			        pureKey = pureKey.charAt(0).toLowerCase() + pureKey.slice(1, pureKey.length);
			        attributes[pureKey] = normalizeData(element.dataset[key]);
			      }
			      return attributes;
			    },
			    getDataAttribute(element, key) {
			      return normalizeData(element.getAttribute(`data-bs-${normalizeDataKey(key)}`));
			    }
			  };
			  return Manipulator;
			});
	} (manipulator));
		return manipulator.exports;
	}

	/*!
	  * Bootstrap config.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	var hasRequiredConfig;

	function requireConfig () {
		if (hasRequiredConfig) return config.exports;
		hasRequiredConfig = 1;
		(function (module, exports) {
			(function (global, factory) {
			  module.exports = factory(requireUtil(), requireManipulator()) ;
			})(commonjsGlobal, function (index, Manipulator) {

			  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : {
			    default: e
			  };
			  const Manipulator__default = /*#__PURE__*/_interopDefaultLegacy(Manipulator);

			  /**
			   * --------------------------------------------------------------------------
			   * Bootstrap (v5.2.3): util/config.js
			   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
			   * --------------------------------------------------------------------------
			   */
			  /**
			   * Class definition
			   */

			  class Config {
			    // Getters
			    static get Default() {
			      return {};
			    }
			    static get DefaultType() {
			      return {};
			    }
			    static get NAME() {
			      throw new Error('You have to implement the static method "NAME", for each component!');
			    }
			    _getConfig(config) {
			      config = this._mergeConfigObj(config);
			      config = this._configAfterMerge(config);
			      this._typeCheckConfig(config);
			      return config;
			    }
			    _configAfterMerge(config) {
			      return config;
			    }
			    _mergeConfigObj(config, element) {
			      const jsonConfig = index.isElement(element) ? Manipulator__default.default.getDataAttribute(element, 'config') : {}; // try to parse

			      return {
			        ...this.constructor.Default,
			        ...(typeof jsonConfig === 'object' ? jsonConfig : {}),
			        ...(index.isElement(element) ? Manipulator__default.default.getDataAttributes(element) : {}),
			        ...(typeof config === 'object' ? config : {})
			      };
			    }
			    _typeCheckConfig(config, configTypes = this.constructor.DefaultType) {
			      for (const property of Object.keys(configTypes)) {
			        const expectedTypes = configTypes[property];
			        const value = config[property];
			        const valueType = index.isElement(value) ? 'element' : index.toType(value);
			        if (!new RegExp(expectedTypes).test(valueType)) {
			          throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}".`);
			        }
			      }
			    }
			  }
			  return Config;
			});
	} (config));
		return config.exports;
	}

	/*!
	  * Bootstrap base-component.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	var hasRequiredBaseComponent;

	function requireBaseComponent () {
		if (hasRequiredBaseComponent) return baseComponent.exports;
		hasRequiredBaseComponent = 1;
		(function (module, exports) {
			(function (global, factory) {
			  module.exports = factory(requireData(), requireUtil(), requireEventHandler(), requireConfig()) ;
			})(commonjsGlobal, function (Data, index, EventHandler, Config) {

			  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : {
			    default: e
			  };
			  const Data__default = /*#__PURE__*/_interopDefaultLegacy(Data);
			  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
			  const Config__default = /*#__PURE__*/_interopDefaultLegacy(Config);

			  /**
			   * --------------------------------------------------------------------------
			   * Bootstrap (v5.2.3): base-component.js
			   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
			   * --------------------------------------------------------------------------
			   */
			  /**
			   * Constants
			   */

			  const VERSION = '5.2.3';
			  /**
			   * Class definition
			   */

			  class BaseComponent extends Config__default.default {
			    constructor(element, config) {
			      super();
			      element = index.getElement(element);
			      if (!element) {
			        return;
			      }
			      this._element = element;
			      this._config = this._getConfig(config);
			      Data__default.default.set(this._element, this.constructor.DATA_KEY, this);
			    } // Public

			    dispose() {
			      Data__default.default.remove(this._element, this.constructor.DATA_KEY);
			      EventHandler__default.default.off(this._element, this.constructor.EVENT_KEY);
			      for (const propertyName of Object.getOwnPropertyNames(this)) {
			        this[propertyName] = null;
			      }
			    }
			    _queueCallback(callback, element, isAnimated = true) {
			      index.executeAfterTransition(callback, element, isAnimated);
			    }
			    _getConfig(config) {
			      config = this._mergeConfigObj(config, this._element);
			      config = this._configAfterMerge(config);
			      this._typeCheckConfig(config);
			      return config;
			    } // Static

			    static getInstance(element) {
			      return Data__default.default.get(index.getElement(element), this.DATA_KEY);
			    }
			    static getOrCreateInstance(element, config = {}) {
			      return this.getInstance(element) || new this(element, typeof config === 'object' ? config : null);
			    }
			    static get VERSION() {
			      return VERSION;
			    }
			    static get DATA_KEY() {
			      return `bs.${this.NAME}`;
			    }
			    static get EVENT_KEY() {
			      return `.${this.DATA_KEY}`;
			    }
			    static eventName(name) {
			      return `${name}${this.EVENT_KEY}`;
			    }
			  }
			  return BaseComponent;
			});
	} (baseComponent));
		return baseComponent.exports;
	}

	var componentFunctions = {exports: {}};

	/*!
	  * Bootstrap component-functions.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	var hasRequiredComponentFunctions;

	function requireComponentFunctions () {
		if (hasRequiredComponentFunctions) return componentFunctions.exports;
		hasRequiredComponentFunctions = 1;
		(function (module, exports) {
			(function (global, factory) {
			  factory(exports, requireEventHandler(), requireUtil()) ;
			})(commonjsGlobal, function (exports, EventHandler, index) {

			  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : {
			    default: e
			  };
			  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);

			  /**
			   * --------------------------------------------------------------------------
			   * Bootstrap (v5.2.3): util/component-functions.js
			   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
			   * --------------------------------------------------------------------------
			   */

			  const enableDismissTrigger = (component, method = 'hide') => {
			    const clickEvent = `click.dismiss${component.EVENT_KEY}`;
			    const name = component.NAME;
			    EventHandler__default.default.on(document, clickEvent, `[data-bs-dismiss="${name}"]`, function (event) {
			      if (['A', 'AREA'].includes(this.tagName)) {
			        event.preventDefault();
			      }
			      if (index.isDisabled(this)) {
			        return;
			      }
			      const target = index.getElementFromSelector(this) || this.closest(`.${name}`);
			      const instance = component.getOrCreateInstance(target); // Method argument is left, for Alert and only, as it doesn't implement the 'hide' method

			      instance[method]();
			    });
			  };
			  exports.enableDismissTrigger = enableDismissTrigger;
			  Object.defineProperties(exports, {
			    __esModule: {
			      value: true
			    },
			    [Symbol.toStringTag]: {
			      value: 'Module'
			    }
			  });
			});
	} (componentFunctions, componentFunctions.exports));
		return componentFunctions.exports;
	}

	/*!
	  * Bootstrap alert.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
		(function (global, factory) {
		  module.exports = factory(requireUtil(), requireEventHandler(), requireBaseComponent(), requireComponentFunctions()) ;
		})(commonjsGlobal, function (index, EventHandler, BaseComponent, componentFunctions) {

		  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : {
		    default: e
		  };
		  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
		  const BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

		  /**
		   * --------------------------------------------------------------------------
		   * Bootstrap (v5.2.3): alert.js
		   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
		   * --------------------------------------------------------------------------
		   */
		  /**
		   * Constants
		   */

		  const NAME = 'alert';
		  const DATA_KEY = 'bs.alert';
		  const EVENT_KEY = `.${DATA_KEY}`;
		  const EVENT_CLOSE = `close${EVENT_KEY}`;
		  const EVENT_CLOSED = `closed${EVENT_KEY}`;
		  const CLASS_NAME_FADE = 'fade';
		  const CLASS_NAME_SHOW = 'show';
		  /**
		   * Class definition
		   */

		  class Alert extends BaseComponent__default.default {
		    // Getters
		    static get NAME() {
		      return NAME;
		    } // Public

		    close() {
		      const closeEvent = EventHandler__default.default.trigger(this._element, EVENT_CLOSE);
		      if (closeEvent.defaultPrevented) {
		        return;
		      }
		      this._element.classList.remove(CLASS_NAME_SHOW);
		      const isAnimated = this._element.classList.contains(CLASS_NAME_FADE);
		      this._queueCallback(() => this._destroyElement(), this._element, isAnimated);
		    } // Private

		    _destroyElement() {
		      this._element.remove();
		      EventHandler__default.default.trigger(this._element, EVENT_CLOSED);
		      this.dispose();
		    } // Static

		    static jQueryInterface(config) {
		      return this.each(function () {
		        const data = Alert.getOrCreateInstance(this);
		        if (typeof config !== 'string') {
		          return;
		        }
		        if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
		          throw new TypeError(`No method named "${config}"`);
		        }
		        data[config](this);
		      });
		    }
		  }
		  /**
		   * Data API implementation
		   */

		  componentFunctions.enableDismissTrigger(Alert, 'close');
		  /**
		   * jQuery
		   */

		  index.defineJQueryPlugin(Alert);
		  return Alert;
		});
	} (alert$1));

	var alert = alert$1.exports;

	var button$1 = {exports: {}};

	/*!
	  * Bootstrap button.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
		(function (global, factory) {
		  module.exports = factory(requireUtil(), requireEventHandler(), requireBaseComponent()) ;
		})(commonjsGlobal, function (index, EventHandler, BaseComponent) {

		  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : {
		    default: e
		  };
		  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
		  const BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

		  /**
		   * --------------------------------------------------------------------------
		   * Bootstrap (v5.2.3): button.js
		   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
		   * --------------------------------------------------------------------------
		   */
		  /**
		   * Constants
		   */

		  const NAME = 'button';
		  const DATA_KEY = 'bs.button';
		  const EVENT_KEY = `.${DATA_KEY}`;
		  const DATA_API_KEY = '.data-api';
		  const CLASS_NAME_ACTIVE = 'active';
		  const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="button"]';
		  const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`;
		  /**
		   * Class definition
		   */

		  class Button extends BaseComponent__default.default {
		    // Getters
		    static get NAME() {
		      return NAME;
		    } // Public

		    toggle() {
		      // Toggle class and sync the `aria-pressed` attribute with the return value of the `.toggle()` method
		      this._element.setAttribute('aria-pressed', this._element.classList.toggle(CLASS_NAME_ACTIVE));
		    } // Static

		    static jQueryInterface(config) {
		      return this.each(function () {
		        const data = Button.getOrCreateInstance(this);
		        if (config === 'toggle') {
		          data[config]();
		        }
		      });
		    }
		  }
		  /**
		   * Data API implementation
		   */

		  EventHandler__default.default.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, event => {
		    event.preventDefault();
		    const button = event.target.closest(SELECTOR_DATA_TOGGLE);
		    const data = Button.getOrCreateInstance(button);
		    data.toggle();
		  });
		  /**
		   * jQuery
		   */

		  index.defineJQueryPlugin(Button);
		  return Button;
		});
	} (button$1));

	var button = button$1.exports;

	var carousel$1 = {exports: {}};

	var selectorEngine = {exports: {}};

	/*!
	  * Bootstrap selector-engine.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	var hasRequiredSelectorEngine;

	function requireSelectorEngine () {
		if (hasRequiredSelectorEngine) return selectorEngine.exports;
		hasRequiredSelectorEngine = 1;
		(function (module, exports) {
			(function (global, factory) {
			  module.exports = factory(requireUtil()) ;
			})(commonjsGlobal, function (index) {

			  /**
			   * --------------------------------------------------------------------------
			   * Bootstrap (v5.2.3): dom/selector-engine.js
			   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
			   * --------------------------------------------------------------------------
			   */
			  /**
			   * Constants
			   */
			  const SelectorEngine = {
			    find(selector, element = document.documentElement) {
			      return [].concat(...Element.prototype.querySelectorAll.call(element, selector));
			    },
			    findOne(selector, element = document.documentElement) {
			      return Element.prototype.querySelector.call(element, selector);
			    },
			    children(element, selector) {
			      return [].concat(...element.children).filter(child => child.matches(selector));
			    },
			    parents(element, selector) {
			      const parents = [];
			      let ancestor = element.parentNode.closest(selector);
			      while (ancestor) {
			        parents.push(ancestor);
			        ancestor = ancestor.parentNode.closest(selector);
			      }
			      return parents;
			    },
			    prev(element, selector) {
			      let previous = element.previousElementSibling;
			      while (previous) {
			        if (previous.matches(selector)) {
			          return [previous];
			        }
			        previous = previous.previousElementSibling;
			      }
			      return [];
			    },
			    // TODO: this is now unused; remove later along with prev()
			    next(element, selector) {
			      let next = element.nextElementSibling;
			      while (next) {
			        if (next.matches(selector)) {
			          return [next];
			        }
			        next = next.nextElementSibling;
			      }
			      return [];
			    },
			    focusableChildren(element) {
			      const focusables = ['a', 'button', 'input', 'textarea', 'select', 'details', '[tabindex]', '[contenteditable="true"]'].map(selector => `${selector}:not([tabindex^="-"])`).join(',');
			      return this.find(focusables, element).filter(el => !index.isDisabled(el) && index.isVisible(el));
			    }
			  };
			  return SelectorEngine;
			});
	} (selectorEngine));
		return selectorEngine.exports;
	}

	var swipe = {exports: {}};

	/*!
	  * Bootstrap swipe.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	var hasRequiredSwipe;

	function requireSwipe () {
		if (hasRequiredSwipe) return swipe.exports;
		hasRequiredSwipe = 1;
		(function (module, exports) {
			(function (global, factory) {
			  module.exports = factory(requireConfig(), requireEventHandler(), requireUtil()) ;
			})(commonjsGlobal, function (Config, EventHandler, index) {

			  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : {
			    default: e
			  };
			  const Config__default = /*#__PURE__*/_interopDefaultLegacy(Config);
			  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);

			  /**
			   * --------------------------------------------------------------------------
			   * Bootstrap (v5.2.3): util/swipe.js
			   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
			   * --------------------------------------------------------------------------
			   */
			  /**
			   * Constants
			   */

			  const NAME = 'swipe';
			  const EVENT_KEY = '.bs.swipe';
			  const EVENT_TOUCHSTART = `touchstart${EVENT_KEY}`;
			  const EVENT_TOUCHMOVE = `touchmove${EVENT_KEY}`;
			  const EVENT_TOUCHEND = `touchend${EVENT_KEY}`;
			  const EVENT_POINTERDOWN = `pointerdown${EVENT_KEY}`;
			  const EVENT_POINTERUP = `pointerup${EVENT_KEY}`;
			  const POINTER_TYPE_TOUCH = 'touch';
			  const POINTER_TYPE_PEN = 'pen';
			  const CLASS_NAME_POINTER_EVENT = 'pointer-event';
			  const SWIPE_THRESHOLD = 40;
			  const Default = {
			    endCallback: null,
			    leftCallback: null,
			    rightCallback: null
			  };
			  const DefaultType = {
			    endCallback: '(function|null)',
			    leftCallback: '(function|null)',
			    rightCallback: '(function|null)'
			  };
			  /**
			   * Class definition
			   */

			  class Swipe extends Config__default.default {
			    constructor(element, config) {
			      super();
			      this._element = element;
			      if (!element || !Swipe.isSupported()) {
			        return;
			      }
			      this._config = this._getConfig(config);
			      this._deltaX = 0;
			      this._supportPointerEvents = Boolean(window.PointerEvent);
			      this._initEvents();
			    } // Getters

			    static get Default() {
			      return Default;
			    }
			    static get DefaultType() {
			      return DefaultType;
			    }
			    static get NAME() {
			      return NAME;
			    } // Public

			    dispose() {
			      EventHandler__default.default.off(this._element, EVENT_KEY);
			    } // Private

			    _start(event) {
			      if (!this._supportPointerEvents) {
			        this._deltaX = event.touches[0].clientX;
			        return;
			      }
			      if (this._eventIsPointerPenTouch(event)) {
			        this._deltaX = event.clientX;
			      }
			    }
			    _end(event) {
			      if (this._eventIsPointerPenTouch(event)) {
			        this._deltaX = event.clientX - this._deltaX;
			      }
			      this._handleSwipe();
			      index.execute(this._config.endCallback);
			    }
			    _move(event) {
			      this._deltaX = event.touches && event.touches.length > 1 ? 0 : event.touches[0].clientX - this._deltaX;
			    }
			    _handleSwipe() {
			      const absDeltaX = Math.abs(this._deltaX);
			      if (absDeltaX <= SWIPE_THRESHOLD) {
			        return;
			      }
			      const direction = absDeltaX / this._deltaX;
			      this._deltaX = 0;
			      if (!direction) {
			        return;
			      }
			      index.execute(direction > 0 ? this._config.rightCallback : this._config.leftCallback);
			    }
			    _initEvents() {
			      if (this._supportPointerEvents) {
			        EventHandler__default.default.on(this._element, EVENT_POINTERDOWN, event => this._start(event));
			        EventHandler__default.default.on(this._element, EVENT_POINTERUP, event => this._end(event));
			        this._element.classList.add(CLASS_NAME_POINTER_EVENT);
			      } else {
			        EventHandler__default.default.on(this._element, EVENT_TOUCHSTART, event => this._start(event));
			        EventHandler__default.default.on(this._element, EVENT_TOUCHMOVE, event => this._move(event));
			        EventHandler__default.default.on(this._element, EVENT_TOUCHEND, event => this._end(event));
			      }
			    }
			    _eventIsPointerPenTouch(event) {
			      return this._supportPointerEvents && (event.pointerType === POINTER_TYPE_PEN || event.pointerType === POINTER_TYPE_TOUCH);
			    } // Static

			    static isSupported() {
			      return 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0;
			    }
			  }
			  return Swipe;
			});
	} (swipe));
		return swipe.exports;
	}

	/*!
	  * Bootstrap carousel.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
		(function (global, factory) {
		  module.exports = factory(requireUtil(), requireEventHandler(), requireManipulator(), requireSelectorEngine(), requireSwipe(), requireBaseComponent()) ;
		})(commonjsGlobal, function (index, EventHandler, Manipulator, SelectorEngine, Swipe, BaseComponent) {

		  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : {
		    default: e
		  };
		  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
		  const Manipulator__default = /*#__PURE__*/_interopDefaultLegacy(Manipulator);
		  const SelectorEngine__default = /*#__PURE__*/_interopDefaultLegacy(SelectorEngine);
		  const Swipe__default = /*#__PURE__*/_interopDefaultLegacy(Swipe);
		  const BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

		  /**
		   * --------------------------------------------------------------------------
		   * Bootstrap (v5.2.3): carousel.js
		   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
		   * --------------------------------------------------------------------------
		   */
		  /**
		   * Constants
		   */

		  const NAME = 'carousel';
		  const DATA_KEY = 'bs.carousel';
		  const EVENT_KEY = `.${DATA_KEY}`;
		  const DATA_API_KEY = '.data-api';
		  const ARROW_LEFT_KEY = 'ArrowLeft';
		  const ARROW_RIGHT_KEY = 'ArrowRight';
		  const TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch

		  const ORDER_NEXT = 'next';
		  const ORDER_PREV = 'prev';
		  const DIRECTION_LEFT = 'left';
		  const DIRECTION_RIGHT = 'right';
		  const EVENT_SLIDE = `slide${EVENT_KEY}`;
		  const EVENT_SLID = `slid${EVENT_KEY}`;
		  const EVENT_KEYDOWN = `keydown${EVENT_KEY}`;
		  const EVENT_MOUSEENTER = `mouseenter${EVENT_KEY}`;
		  const EVENT_MOUSELEAVE = `mouseleave${EVENT_KEY}`;
		  const EVENT_DRAG_START = `dragstart${EVENT_KEY}`;
		  const EVENT_LOAD_DATA_API = `load${EVENT_KEY}${DATA_API_KEY}`;
		  const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`;
		  const CLASS_NAME_CAROUSEL = 'carousel';
		  const CLASS_NAME_ACTIVE = 'active';
		  const CLASS_NAME_SLIDE = 'slide';
		  const CLASS_NAME_END = 'carousel-item-end';
		  const CLASS_NAME_START = 'carousel-item-start';
		  const CLASS_NAME_NEXT = 'carousel-item-next';
		  const CLASS_NAME_PREV = 'carousel-item-prev';
		  const SELECTOR_ACTIVE = '.active';
		  const SELECTOR_ITEM = '.carousel-item';
		  const SELECTOR_ACTIVE_ITEM = SELECTOR_ACTIVE + SELECTOR_ITEM;
		  const SELECTOR_ITEM_IMG = '.carousel-item img';
		  const SELECTOR_INDICATORS = '.carousel-indicators';
		  const SELECTOR_DATA_SLIDE = '[data-bs-slide], [data-bs-slide-to]';
		  const SELECTOR_DATA_RIDE = '[data-bs-ride="carousel"]';
		  const KEY_TO_DIRECTION = {
		    [ARROW_LEFT_KEY]: DIRECTION_RIGHT,
		    [ARROW_RIGHT_KEY]: DIRECTION_LEFT
		  };
		  const Default = {
		    interval: 5000,
		    keyboard: true,
		    pause: 'hover',
		    ride: false,
		    touch: true,
		    wrap: true
		  };
		  const DefaultType = {
		    interval: '(number|boolean)',
		    // TODO:v6 remove boolean support
		    keyboard: 'boolean',
		    pause: '(string|boolean)',
		    ride: '(boolean|string)',
		    touch: 'boolean',
		    wrap: 'boolean'
		  };
		  /**
		   * Class definition
		   */

		  class Carousel extends BaseComponent__default.default {
		    constructor(element, config) {
		      super(element, config);
		      this._interval = null;
		      this._activeElement = null;
		      this._isSliding = false;
		      this.touchTimeout = null;
		      this._swipeHelper = null;
		      this._indicatorsElement = SelectorEngine__default.default.findOne(SELECTOR_INDICATORS, this._element);
		      this._addEventListeners();
		      if (this._config.ride === CLASS_NAME_CAROUSEL) {
		        this.cycle();
		      }
		    } // Getters

		    static get Default() {
		      return Default;
		    }
		    static get DefaultType() {
		      return DefaultType;
		    }
		    static get NAME() {
		      return NAME;
		    } // Public

		    next() {
		      this._slide(ORDER_NEXT);
		    }
		    nextWhenVisible() {
		      // FIXME TODO use `document.visibilityState`
		      // Don't call next when the page isn't visible
		      // or the carousel or its parent isn't visible
		      if (!document.hidden && index.isVisible(this._element)) {
		        this.next();
		      }
		    }
		    prev() {
		      this._slide(ORDER_PREV);
		    }
		    pause() {
		      if (this._isSliding) {
		        index.triggerTransitionEnd(this._element);
		      }
		      this._clearInterval();
		    }
		    cycle() {
		      this._clearInterval();
		      this._updateInterval();
		      this._interval = setInterval(() => this.nextWhenVisible(), this._config.interval);
		    }
		    _maybeEnableCycle() {
		      if (!this._config.ride) {
		        return;
		      }
		      if (this._isSliding) {
		        EventHandler__default.default.one(this._element, EVENT_SLID, () => this.cycle());
		        return;
		      }
		      this.cycle();
		    }
		    to(index) {
		      const items = this._getItems();
		      if (index > items.length - 1 || index < 0) {
		        return;
		      }
		      if (this._isSliding) {
		        EventHandler__default.default.one(this._element, EVENT_SLID, () => this.to(index));
		        return;
		      }
		      const activeIndex = this._getItemIndex(this._getActive());
		      if (activeIndex === index) {
		        return;
		      }
		      const order = index > activeIndex ? ORDER_NEXT : ORDER_PREV;
		      this._slide(order, items[index]);
		    }
		    dispose() {
		      if (this._swipeHelper) {
		        this._swipeHelper.dispose();
		      }
		      super.dispose();
		    } // Private

		    _configAfterMerge(config) {
		      config.defaultInterval = config.interval;
		      return config;
		    }
		    _addEventListeners() {
		      if (this._config.keyboard) {
		        EventHandler__default.default.on(this._element, EVENT_KEYDOWN, event => this._keydown(event));
		      }
		      if (this._config.pause === 'hover') {
		        EventHandler__default.default.on(this._element, EVENT_MOUSEENTER, () => this.pause());
		        EventHandler__default.default.on(this._element, EVENT_MOUSELEAVE, () => this._maybeEnableCycle());
		      }
		      if (this._config.touch && Swipe__default.default.isSupported()) {
		        this._addTouchEventListeners();
		      }
		    }
		    _addTouchEventListeners() {
		      for (const img of SelectorEngine__default.default.find(SELECTOR_ITEM_IMG, this._element)) {
		        EventHandler__default.default.on(img, EVENT_DRAG_START, event => event.preventDefault());
		      }
		      const endCallBack = () => {
		        if (this._config.pause !== 'hover') {
		          return;
		        } // If it's a touch-enabled device, mouseenter/leave are fired as
		        // part of the mouse compatibility events on first tap - the carousel
		        // would stop cycling until user tapped out of it;
		        // here, we listen for touchend, explicitly pause the carousel
		        // (as if it's the second time we tap on it, mouseenter compat event
		        // is NOT fired) and after a timeout (to allow for mouse compatibility
		        // events to fire) we explicitly restart cycling

		        this.pause();
		        if (this.touchTimeout) {
		          clearTimeout(this.touchTimeout);
		        }
		        this.touchTimeout = setTimeout(() => this._maybeEnableCycle(), TOUCHEVENT_COMPAT_WAIT + this._config.interval);
		      };
		      const swipeConfig = {
		        leftCallback: () => this._slide(this._directionToOrder(DIRECTION_LEFT)),
		        rightCallback: () => this._slide(this._directionToOrder(DIRECTION_RIGHT)),
		        endCallback: endCallBack
		      };
		      this._swipeHelper = new Swipe__default.default(this._element, swipeConfig);
		    }
		    _keydown(event) {
		      if (/input|textarea/i.test(event.target.tagName)) {
		        return;
		      }
		      const direction = KEY_TO_DIRECTION[event.key];
		      if (direction) {
		        event.preventDefault();
		        this._slide(this._directionToOrder(direction));
		      }
		    }
		    _getItemIndex(element) {
		      return this._getItems().indexOf(element);
		    }
		    _setActiveIndicatorElement(index) {
		      if (!this._indicatorsElement) {
		        return;
		      }
		      const activeIndicator = SelectorEngine__default.default.findOne(SELECTOR_ACTIVE, this._indicatorsElement);
		      activeIndicator.classList.remove(CLASS_NAME_ACTIVE);
		      activeIndicator.removeAttribute('aria-current');
		      const newActiveIndicator = SelectorEngine__default.default.findOne(`[data-bs-slide-to="${index}"]`, this._indicatorsElement);
		      if (newActiveIndicator) {
		        newActiveIndicator.classList.add(CLASS_NAME_ACTIVE);
		        newActiveIndicator.setAttribute('aria-current', 'true');
		      }
		    }
		    _updateInterval() {
		      const element = this._activeElement || this._getActive();
		      if (!element) {
		        return;
		      }
		      const elementInterval = Number.parseInt(element.getAttribute('data-bs-interval'), 10);
		      this._config.interval = elementInterval || this._config.defaultInterval;
		    }
		    _slide(order, element = null) {
		      if (this._isSliding) {
		        return;
		      }
		      const activeElement = this._getActive();
		      const isNext = order === ORDER_NEXT;
		      const nextElement = element || index.getNextActiveElement(this._getItems(), activeElement, isNext, this._config.wrap);
		      if (nextElement === activeElement) {
		        return;
		      }
		      const nextElementIndex = this._getItemIndex(nextElement);
		      const triggerEvent = eventName => {
		        return EventHandler__default.default.trigger(this._element, eventName, {
		          relatedTarget: nextElement,
		          direction: this._orderToDirection(order),
		          from: this._getItemIndex(activeElement),
		          to: nextElementIndex
		        });
		      };
		      const slideEvent = triggerEvent(EVENT_SLIDE);
		      if (slideEvent.defaultPrevented) {
		        return;
		      }
		      if (!activeElement || !nextElement) {
		        // Some weirdness is happening, so we bail
		        // todo: change tests that use empty divs to avoid this check
		        return;
		      }
		      const isCycling = Boolean(this._interval);
		      this.pause();
		      this._isSliding = true;
		      this._setActiveIndicatorElement(nextElementIndex);
		      this._activeElement = nextElement;
		      const directionalClassName = isNext ? CLASS_NAME_START : CLASS_NAME_END;
		      const orderClassName = isNext ? CLASS_NAME_NEXT : CLASS_NAME_PREV;
		      nextElement.classList.add(orderClassName);
		      index.reflow(nextElement);
		      activeElement.classList.add(directionalClassName);
		      nextElement.classList.add(directionalClassName);
		      const completeCallBack = () => {
		        nextElement.classList.remove(directionalClassName, orderClassName);
		        nextElement.classList.add(CLASS_NAME_ACTIVE);
		        activeElement.classList.remove(CLASS_NAME_ACTIVE, orderClassName, directionalClassName);
		        this._isSliding = false;
		        triggerEvent(EVENT_SLID);
		      };
		      this._queueCallback(completeCallBack, activeElement, this._isAnimated());
		      if (isCycling) {
		        this.cycle();
		      }
		    }
		    _isAnimated() {
		      return this._element.classList.contains(CLASS_NAME_SLIDE);
		    }
		    _getActive() {
		      return SelectorEngine__default.default.findOne(SELECTOR_ACTIVE_ITEM, this._element);
		    }
		    _getItems() {
		      return SelectorEngine__default.default.find(SELECTOR_ITEM, this._element);
		    }
		    _clearInterval() {
		      if (this._interval) {
		        clearInterval(this._interval);
		        this._interval = null;
		      }
		    }
		    _directionToOrder(direction) {
		      if (index.isRTL()) {
		        return direction === DIRECTION_LEFT ? ORDER_PREV : ORDER_NEXT;
		      }
		      return direction === DIRECTION_LEFT ? ORDER_NEXT : ORDER_PREV;
		    }
		    _orderToDirection(order) {
		      if (index.isRTL()) {
		        return order === ORDER_PREV ? DIRECTION_LEFT : DIRECTION_RIGHT;
		      }
		      return order === ORDER_PREV ? DIRECTION_RIGHT : DIRECTION_LEFT;
		    } // Static

		    static jQueryInterface(config) {
		      return this.each(function () {
		        const data = Carousel.getOrCreateInstance(this, config);
		        if (typeof config === 'number') {
		          data.to(config);
		          return;
		        }
		        if (typeof config === 'string') {
		          if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
		            throw new TypeError(`No method named "${config}"`);
		          }
		          data[config]();
		        }
		      });
		    }
		  }
		  /**
		   * Data API implementation
		   */

		  EventHandler__default.default.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_SLIDE, function (event) {
		    const target = index.getElementFromSelector(this);
		    if (!target || !target.classList.contains(CLASS_NAME_CAROUSEL)) {
		      return;
		    }
		    event.preventDefault();
		    const carousel = Carousel.getOrCreateInstance(target);
		    const slideIndex = this.getAttribute('data-bs-slide-to');
		    if (slideIndex) {
		      carousel.to(slideIndex);
		      carousel._maybeEnableCycle();
		      return;
		    }
		    if (Manipulator__default.default.getDataAttribute(this, 'slide') === 'next') {
		      carousel.next();
		      carousel._maybeEnableCycle();
		      return;
		    }
		    carousel.prev();
		    carousel._maybeEnableCycle();
		  });
		  EventHandler__default.default.on(window, EVENT_LOAD_DATA_API, () => {
		    const carousels = SelectorEngine__default.default.find(SELECTOR_DATA_RIDE);
		    for (const carousel of carousels) {
		      Carousel.getOrCreateInstance(carousel);
		    }
		  });
		  /**
		   * jQuery
		   */

		  index.defineJQueryPlugin(Carousel);
		  return Carousel;
		});
	} (carousel$1));

	var carousel = carousel$1.exports;

	var collapse$1 = {exports: {}};

	/*!
	  * Bootstrap collapse.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
		(function (global, factory) {
		  module.exports = factory(requireUtil(), requireEventHandler(), requireSelectorEngine(), requireBaseComponent()) ;
		})(commonjsGlobal, function (index, EventHandler, SelectorEngine, BaseComponent) {

		  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : {
		    default: e
		  };
		  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
		  const SelectorEngine__default = /*#__PURE__*/_interopDefaultLegacy(SelectorEngine);
		  const BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

		  /**
		   * --------------------------------------------------------------------------
		   * Bootstrap (v5.2.3): collapse.js
		   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
		   * --------------------------------------------------------------------------
		   */
		  /**
		   * Constants
		   */

		  const NAME = 'collapse';
		  const DATA_KEY = 'bs.collapse';
		  const EVENT_KEY = `.${DATA_KEY}`;
		  const DATA_API_KEY = '.data-api';
		  const EVENT_SHOW = `show${EVENT_KEY}`;
		  const EVENT_SHOWN = `shown${EVENT_KEY}`;
		  const EVENT_HIDE = `hide${EVENT_KEY}`;
		  const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
		  const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`;
		  const CLASS_NAME_SHOW = 'show';
		  const CLASS_NAME_COLLAPSE = 'collapse';
		  const CLASS_NAME_COLLAPSING = 'collapsing';
		  const CLASS_NAME_COLLAPSED = 'collapsed';
		  const CLASS_NAME_DEEPER_CHILDREN = `:scope .${CLASS_NAME_COLLAPSE} .${CLASS_NAME_COLLAPSE}`;
		  const CLASS_NAME_HORIZONTAL = 'collapse-horizontal';
		  const WIDTH = 'width';
		  const HEIGHT = 'height';
		  const SELECTOR_ACTIVES = '.collapse.show, .collapse.collapsing';
		  const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="collapse"]';
		  const Default = {
		    parent: null,
		    toggle: true
		  };
		  const DefaultType = {
		    parent: '(null|element)',
		    toggle: 'boolean'
		  };
		  /**
		   * Class definition
		   */

		  class Collapse extends BaseComponent__default.default {
		    constructor(element, config) {
		      super(element, config);
		      this._isTransitioning = false;
		      this._triggerArray = [];
		      const toggleList = SelectorEngine__default.default.find(SELECTOR_DATA_TOGGLE);
		      for (const elem of toggleList) {
		        const selector = index.getSelectorFromElement(elem);
		        const filterElement = SelectorEngine__default.default.find(selector).filter(foundElement => foundElement === this._element);
		        if (selector !== null && filterElement.length) {
		          this._triggerArray.push(elem);
		        }
		      }
		      this._initializeChildren();
		      if (!this._config.parent) {
		        this._addAriaAndCollapsedClass(this._triggerArray, this._isShown());
		      }
		      if (this._config.toggle) {
		        this.toggle();
		      }
		    } // Getters

		    static get Default() {
		      return Default;
		    }
		    static get DefaultType() {
		      return DefaultType;
		    }
		    static get NAME() {
		      return NAME;
		    } // Public

		    toggle() {
		      if (this._isShown()) {
		        this.hide();
		      } else {
		        this.show();
		      }
		    }
		    show() {
		      if (this._isTransitioning || this._isShown()) {
		        return;
		      }
		      let activeChildren = []; // find active children

		      if (this._config.parent) {
		        activeChildren = this._getFirstLevelChildren(SELECTOR_ACTIVES).filter(element => element !== this._element).map(element => Collapse.getOrCreateInstance(element, {
		          toggle: false
		        }));
		      }
		      if (activeChildren.length && activeChildren[0]._isTransitioning) {
		        return;
		      }
		      const startEvent = EventHandler__default.default.trigger(this._element, EVENT_SHOW);
		      if (startEvent.defaultPrevented) {
		        return;
		      }
		      for (const activeInstance of activeChildren) {
		        activeInstance.hide();
		      }
		      const dimension = this._getDimension();
		      this._element.classList.remove(CLASS_NAME_COLLAPSE);
		      this._element.classList.add(CLASS_NAME_COLLAPSING);
		      this._element.style[dimension] = 0;
		      this._addAriaAndCollapsedClass(this._triggerArray, true);
		      this._isTransitioning = true;
		      const complete = () => {
		        this._isTransitioning = false;
		        this._element.classList.remove(CLASS_NAME_COLLAPSING);
		        this._element.classList.add(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW);
		        this._element.style[dimension] = '';
		        EventHandler__default.default.trigger(this._element, EVENT_SHOWN);
		      };
		      const capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
		      const scrollSize = `scroll${capitalizedDimension}`;
		      this._queueCallback(complete, this._element, true);
		      this._element.style[dimension] = `${this._element[scrollSize]}px`;
		    }
		    hide() {
		      if (this._isTransitioning || !this._isShown()) {
		        return;
		      }
		      const startEvent = EventHandler__default.default.trigger(this._element, EVENT_HIDE);
		      if (startEvent.defaultPrevented) {
		        return;
		      }
		      const dimension = this._getDimension();
		      this._element.style[dimension] = `${this._element.getBoundingClientRect()[dimension]}px`;
		      index.reflow(this._element);
		      this._element.classList.add(CLASS_NAME_COLLAPSING);
		      this._element.classList.remove(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW);
		      for (const trigger of this._triggerArray) {
		        const element = index.getElementFromSelector(trigger);
		        if (element && !this._isShown(element)) {
		          this._addAriaAndCollapsedClass([trigger], false);
		        }
		      }
		      this._isTransitioning = true;
		      const complete = () => {
		        this._isTransitioning = false;
		        this._element.classList.remove(CLASS_NAME_COLLAPSING);
		        this._element.classList.add(CLASS_NAME_COLLAPSE);
		        EventHandler__default.default.trigger(this._element, EVENT_HIDDEN);
		      };
		      this._element.style[dimension] = '';
		      this._queueCallback(complete, this._element, true);
		    }
		    _isShown(element = this._element) {
		      return element.classList.contains(CLASS_NAME_SHOW);
		    } // Private

		    _configAfterMerge(config) {
		      config.toggle = Boolean(config.toggle); // Coerce string values

		      config.parent = index.getElement(config.parent);
		      return config;
		    }
		    _getDimension() {
		      return this._element.classList.contains(CLASS_NAME_HORIZONTAL) ? WIDTH : HEIGHT;
		    }
		    _initializeChildren() {
		      if (!this._config.parent) {
		        return;
		      }
		      const children = this._getFirstLevelChildren(SELECTOR_DATA_TOGGLE);
		      for (const element of children) {
		        const selected = index.getElementFromSelector(element);
		        if (selected) {
		          this._addAriaAndCollapsedClass([element], this._isShown(selected));
		        }
		      }
		    }
		    _getFirstLevelChildren(selector) {
		      const children = SelectorEngine__default.default.find(CLASS_NAME_DEEPER_CHILDREN, this._config.parent); // remove children if greater depth

		      return SelectorEngine__default.default.find(selector, this._config.parent).filter(element => !children.includes(element));
		    }
		    _addAriaAndCollapsedClass(triggerArray, isOpen) {
		      if (!triggerArray.length) {
		        return;
		      }
		      for (const element of triggerArray) {
		        element.classList.toggle(CLASS_NAME_COLLAPSED, !isOpen);
		        element.setAttribute('aria-expanded', isOpen);
		      }
		    } // Static

		    static jQueryInterface(config) {
		      const _config = {};
		      if (typeof config === 'string' && /show|hide/.test(config)) {
		        _config.toggle = false;
		      }
		      return this.each(function () {
		        const data = Collapse.getOrCreateInstance(this, _config);
		        if (typeof config === 'string') {
		          if (typeof data[config] === 'undefined') {
		            throw new TypeError(`No method named "${config}"`);
		          }
		          data[config]();
		        }
		      });
		    }
		  }
		  /**
		   * Data API implementation
		   */

		  EventHandler__default.default.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
		    // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
		    if (event.target.tagName === 'A' || event.delegateTarget && event.delegateTarget.tagName === 'A') {
		      event.preventDefault();
		    }
		    const selector = index.getSelectorFromElement(this);
		    const selectorElements = SelectorEngine__default.default.find(selector);
		    for (const element of selectorElements) {
		      Collapse.getOrCreateInstance(element, {
		        toggle: false
		      }).toggle();
		    }
		  });
		  /**
		   * jQuery
		   */

		  index.defineJQueryPlugin(Collapse);
		  return Collapse;
		});
	} (collapse$1));

	var collapse = collapse$1.exports;

	var dropdown$1 = {exports: {}};

	var top = 'top';
	var bottom = 'bottom';
	var right = 'right';
	var left = 'left';
	var auto = 'auto';
	var basePlacements = [top, bottom, right, left];
	var start = 'start';
	var end = 'end';
	var clippingParents = 'clippingParents';
	var viewport = 'viewport';
	var popper = 'popper';
	var reference = 'reference';
	var variationPlacements = /*#__PURE__*/basePlacements.reduce(function (acc, placement) {
	  return acc.concat([placement + "-" + start, placement + "-" + end]);
	}, []);
	var placements = /*#__PURE__*/[].concat(basePlacements, [auto]).reduce(function (acc, placement) {
	  return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
	}, []); // modifiers that need to read the DOM

	var beforeRead = 'beforeRead';
	var read = 'read';
	var afterRead = 'afterRead'; // pure-logic modifiers

	var beforeMain = 'beforeMain';
	var main = 'main';
	var afterMain = 'afterMain'; // modifier with the purpose to write to the DOM (or write into a framework state)

	var beforeWrite = 'beforeWrite';
	var write = 'write';
	var afterWrite = 'afterWrite';
	var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

	function getNodeName(element) {
	  return element ? (element.nodeName || '').toLowerCase() : null;
	}

	function getWindow(node) {
	  if (node == null) {
	    return window;
	  }
	  if (node.toString() !== '[object Window]') {
	    var ownerDocument = node.ownerDocument;
	    return ownerDocument ? ownerDocument.defaultView || window : window;
	  }
	  return node;
	}

	function isElement(node) {
	  var OwnElement = getWindow(node).Element;
	  return node instanceof OwnElement || node instanceof Element;
	}
	function isHTMLElement(node) {
	  var OwnElement = getWindow(node).HTMLElement;
	  return node instanceof OwnElement || node instanceof HTMLElement;
	}
	function isShadowRoot(node) {
	  // IE 11 has no ShadowRoot
	  if (typeof ShadowRoot === 'undefined') {
	    return false;
	  }
	  var OwnElement = getWindow(node).ShadowRoot;
	  return node instanceof OwnElement || node instanceof ShadowRoot;
	}

	// and applies them to the HTMLElements such as popper and arrow

	function applyStyles(_ref) {
	  var state = _ref.state;
	  Object.keys(state.elements).forEach(function (name) {
	    var style = state.styles[name] || {};
	    var attributes = state.attributes[name] || {};
	    var element = state.elements[name]; // arrow is optional + virtual elements

	    if (!isHTMLElement(element) || !getNodeName(element)) {
	      return;
	    } // Flow doesn't support to extend this property, but it's the most
	    // effective way to apply styles to an HTMLElement
	    // $FlowFixMe[cannot-write]

	    Object.assign(element.style, style);
	    Object.keys(attributes).forEach(function (name) {
	      var value = attributes[name];
	      if (value === false) {
	        element.removeAttribute(name);
	      } else {
	        element.setAttribute(name, value === true ? '' : value);
	      }
	    });
	  });
	}
	function effect$2(_ref2) {
	  var state = _ref2.state;
	  var initialStyles = {
	    popper: {
	      position: state.options.strategy,
	      left: '0',
	      top: '0',
	      margin: '0'
	    },
	    arrow: {
	      position: 'absolute'
	    },
	    reference: {}
	  };
	  Object.assign(state.elements.popper.style, initialStyles.popper);
	  state.styles = initialStyles;
	  if (state.elements.arrow) {
	    Object.assign(state.elements.arrow.style, initialStyles.arrow);
	  }
	  return function () {
	    Object.keys(state.elements).forEach(function (name) {
	      var element = state.elements[name];
	      var attributes = state.attributes[name] || {};
	      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]); // Set all values to an empty string to unset them

	      var style = styleProperties.reduce(function (style, property) {
	        style[property] = '';
	        return style;
	      }, {}); // arrow is optional + virtual elements

	      if (!isHTMLElement(element) || !getNodeName(element)) {
	        return;
	      }
	      Object.assign(element.style, style);
	      Object.keys(attributes).forEach(function (attribute) {
	        element.removeAttribute(attribute);
	      });
	    });
	  };
	} // eslint-disable-next-line import/no-unused-modules

	var applyStyles$1 = {
	  name: 'applyStyles',
	  enabled: true,
	  phase: 'write',
	  fn: applyStyles,
	  effect: effect$2,
	  requires: ['computeStyles']
	};

	function getBasePlacement(placement) {
	  return placement.split('-')[0];
	}

	var max = Math.max;
	var min = Math.min;
	var round = Math.round;

	function getUAString() {
	  var uaData = navigator.userAgentData;
	  if (uaData != null && uaData.brands) {
	    return uaData.brands.map(function (item) {
	      return item.brand + "/" + item.version;
	    }).join(' ');
	  }
	  return navigator.userAgent;
	}

	function isLayoutViewport() {
	  return !/^((?!chrome|android).)*safari/i.test(getUAString());
	}

	function getBoundingClientRect(element, includeScale, isFixedStrategy) {
	  if (includeScale === void 0) {
	    includeScale = false;
	  }
	  if (isFixedStrategy === void 0) {
	    isFixedStrategy = false;
	  }
	  var clientRect = element.getBoundingClientRect();
	  var scaleX = 1;
	  var scaleY = 1;
	  if (includeScale && isHTMLElement(element)) {
	    scaleX = element.offsetWidth > 0 ? round(clientRect.width) / element.offsetWidth || 1 : 1;
	    scaleY = element.offsetHeight > 0 ? round(clientRect.height) / element.offsetHeight || 1 : 1;
	  }
	  var _ref = isElement(element) ? getWindow(element) : window,
	    visualViewport = _ref.visualViewport;
	  var addVisualOffsets = !isLayoutViewport() && isFixedStrategy;
	  var x = (clientRect.left + (addVisualOffsets && visualViewport ? visualViewport.offsetLeft : 0)) / scaleX;
	  var y = (clientRect.top + (addVisualOffsets && visualViewport ? visualViewport.offsetTop : 0)) / scaleY;
	  var width = clientRect.width / scaleX;
	  var height = clientRect.height / scaleY;
	  return {
	    width: width,
	    height: height,
	    top: y,
	    right: x + width,
	    bottom: y + height,
	    left: x,
	    x: x,
	    y: y
	  };
	}

	// means it doesn't take into account transforms.

	function getLayoutRect(element) {
	  var clientRect = getBoundingClientRect(element); // Use the clientRect sizes if it's not been transformed.
	  // Fixes https://github.com/popperjs/popper-core/issues/1223

	  var width = element.offsetWidth;
	  var height = element.offsetHeight;
	  if (Math.abs(clientRect.width - width) <= 1) {
	    width = clientRect.width;
	  }
	  if (Math.abs(clientRect.height - height) <= 1) {
	    height = clientRect.height;
	  }
	  return {
	    x: element.offsetLeft,
	    y: element.offsetTop,
	    width: width,
	    height: height
	  };
	}

	function contains(parent, child) {
	  var rootNode = child.getRootNode && child.getRootNode(); // First, attempt with faster native method

	  if (parent.contains(child)) {
	    return true;
	  } // then fallback to custom implementation with Shadow DOM support
	  else if (rootNode && isShadowRoot(rootNode)) {
	    var next = child;
	    do {
	      if (next && parent.isSameNode(next)) {
	        return true;
	      } // $FlowFixMe[prop-missing]: need a better way to handle this...

	      next = next.parentNode || next.host;
	    } while (next);
	  } // Give up, the result is false

	  return false;
	}

	function getComputedStyle$1(element) {
	  return getWindow(element).getComputedStyle(element);
	}

	function isTableElement(element) {
	  return ['table', 'td', 'th'].indexOf(getNodeName(element)) >= 0;
	}

	function getDocumentElement(element) {
	  // $FlowFixMe[incompatible-return]: assume body is always available
	  return ((isElement(element) ? element.ownerDocument :
	  // $FlowFixMe[prop-missing]
	  element.document) || window.document).documentElement;
	}

	function getParentNode(element) {
	  if (getNodeName(element) === 'html') {
	    return element;
	  }
	  return (
	    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
	    // $FlowFixMe[incompatible-return]
	    // $FlowFixMe[prop-missing]
	    element.assignedSlot ||
	    // step into the shadow DOM of the parent of a slotted node
	    element.parentNode || (
	    // DOM Element detected
	    isShadowRoot(element) ? element.host : null) ||
	    // ShadowRoot detected
	    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
	    getDocumentElement(element) // fallback
	  );
	}

	function getTrueOffsetParent(element) {
	  if (!isHTMLElement(element) ||
	  // https://github.com/popperjs/popper-core/issues/837
	  getComputedStyle$1(element).position === 'fixed') {
	    return null;
	  }
	  return element.offsetParent;
	} // `.offsetParent` reports `null` for fixed elements, while absolute elements
	// return the containing block

	function getContainingBlock(element) {
	  var isFirefox = /firefox/i.test(getUAString());
	  var isIE = /Trident/i.test(getUAString());
	  if (isIE && isHTMLElement(element)) {
	    // In IE 9, 10 and 11 fixed elements containing block is always established by the viewport
	    var elementCss = getComputedStyle$1(element);
	    if (elementCss.position === 'fixed') {
	      return null;
	    }
	  }
	  var currentNode = getParentNode(element);
	  if (isShadowRoot(currentNode)) {
	    currentNode = currentNode.host;
	  }
	  while (isHTMLElement(currentNode) && ['html', 'body'].indexOf(getNodeName(currentNode)) < 0) {
	    var css = getComputedStyle$1(currentNode); // This is non-exhaustive but covers the most common CSS properties that
	    // create a containing block.
	    // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block

	    if (css.transform !== 'none' || css.perspective !== 'none' || css.contain === 'paint' || ['transform', 'perspective'].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === 'filter' || isFirefox && css.filter && css.filter !== 'none') {
	      return currentNode;
	    } else {
	      currentNode = currentNode.parentNode;
	    }
	  }
	  return null;
	} // Gets the closest ancestor positioned element. Handles some edge cases,
	// such as table ancestors and cross browser bugs.

	function getOffsetParent(element) {
	  var window = getWindow(element);
	  var offsetParent = getTrueOffsetParent(element);
	  while (offsetParent && isTableElement(offsetParent) && getComputedStyle$1(offsetParent).position === 'static') {
	    offsetParent = getTrueOffsetParent(offsetParent);
	  }
	  if (offsetParent && (getNodeName(offsetParent) === 'html' || getNodeName(offsetParent) === 'body' && getComputedStyle$1(offsetParent).position === 'static')) {
	    return window;
	  }
	  return offsetParent || getContainingBlock(element) || window;
	}

	function getMainAxisFromPlacement(placement) {
	  return ['top', 'bottom'].indexOf(placement) >= 0 ? 'x' : 'y';
	}

	function within(min$1, value, max$1) {
	  return max(min$1, min(value, max$1));
	}
	function withinMaxClamp(min, value, max) {
	  var v = within(min, value, max);
	  return v > max ? max : v;
	}

	function getFreshSideObject() {
	  return {
	    top: 0,
	    right: 0,
	    bottom: 0,
	    left: 0
	  };
	}

	function mergePaddingObject(paddingObject) {
	  return Object.assign({}, getFreshSideObject(), paddingObject);
	}

	function expandToHashMap(value, keys) {
	  return keys.reduce(function (hashMap, key) {
	    hashMap[key] = value;
	    return hashMap;
	  }, {});
	}

	var toPaddingObject = function toPaddingObject(padding, state) {
	  padding = typeof padding === 'function' ? padding(Object.assign({}, state.rects, {
	    placement: state.placement
	  })) : padding;
	  return mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
	};
	function arrow(_ref) {
	  var _state$modifiersData$;
	  var state = _ref.state,
	    name = _ref.name,
	    options = _ref.options;
	  var arrowElement = state.elements.arrow;
	  var popperOffsets = state.modifiersData.popperOffsets;
	  var basePlacement = getBasePlacement(state.placement);
	  var axis = getMainAxisFromPlacement(basePlacement);
	  var isVertical = [left, right].indexOf(basePlacement) >= 0;
	  var len = isVertical ? 'height' : 'width';
	  if (!arrowElement || !popperOffsets) {
	    return;
	  }
	  var paddingObject = toPaddingObject(options.padding, state);
	  var arrowRect = getLayoutRect(arrowElement);
	  var minProp = axis === 'y' ? top : left;
	  var maxProp = axis === 'y' ? bottom : right;
	  var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets[axis] - state.rects.popper[len];
	  var startDiff = popperOffsets[axis] - state.rects.reference[axis];
	  var arrowOffsetParent = getOffsetParent(arrowElement);
	  var clientSize = arrowOffsetParent ? axis === 'y' ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
	  var centerToReference = endDiff / 2 - startDiff / 2; // Make sure the arrow doesn't overflow the popper if the center point is
	  // outside of the popper bounds

	  var min = paddingObject[minProp];
	  var max = clientSize - arrowRect[len] - paddingObject[maxProp];
	  var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
	  var offset = within(min, center, max); // Prevents breaking syntax highlighting...

	  var axisProp = axis;
	  state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset, _state$modifiersData$.centerOffset = offset - center, _state$modifiersData$);
	}
	function effect$1(_ref2) {
	  var state = _ref2.state,
	    options = _ref2.options;
	  var _options$element = options.element,
	    arrowElement = _options$element === void 0 ? '[data-popper-arrow]' : _options$element;
	  if (arrowElement == null) {
	    return;
	  } // CSS selector

	  if (typeof arrowElement === 'string') {
	    arrowElement = state.elements.popper.querySelector(arrowElement);
	    if (!arrowElement) {
	      return;
	    }
	  }
	  if (!contains(state.elements.popper, arrowElement)) {
	    return;
	  }
	  state.elements.arrow = arrowElement;
	} // eslint-disable-next-line import/no-unused-modules

	var arrow$1 = {
	  name: 'arrow',
	  enabled: true,
	  phase: 'main',
	  fn: arrow,
	  effect: effect$1,
	  requires: ['popperOffsets'],
	  requiresIfExists: ['preventOverflow']
	};

	function getVariation(placement) {
	  return placement.split('-')[1];
	}

	var unsetSides = {
	  top: 'auto',
	  right: 'auto',
	  bottom: 'auto',
	  left: 'auto'
	}; // Round the offsets to the nearest suitable subpixel based on the DPR.
	// Zooming can change the DPR, but it seems to report a value that will
	// cleanly divide the values into the appropriate subpixels.

	function roundOffsetsByDPR(_ref) {
	  var x = _ref.x,
	    y = _ref.y;
	  var win = window;
	  var dpr = win.devicePixelRatio || 1;
	  return {
	    x: round(x * dpr) / dpr || 0,
	    y: round(y * dpr) / dpr || 0
	  };
	}
	function mapToStyles(_ref2) {
	  var _Object$assign2;
	  var popper = _ref2.popper,
	    popperRect = _ref2.popperRect,
	    placement = _ref2.placement,
	    variation = _ref2.variation,
	    offsets = _ref2.offsets,
	    position = _ref2.position,
	    gpuAcceleration = _ref2.gpuAcceleration,
	    adaptive = _ref2.adaptive,
	    roundOffsets = _ref2.roundOffsets,
	    isFixed = _ref2.isFixed;
	  var _offsets$x = offsets.x,
	    x = _offsets$x === void 0 ? 0 : _offsets$x,
	    _offsets$y = offsets.y,
	    y = _offsets$y === void 0 ? 0 : _offsets$y;
	  var _ref3 = typeof roundOffsets === 'function' ? roundOffsets({
	    x: x,
	    y: y
	  }) : {
	    x: x,
	    y: y
	  };
	  x = _ref3.x;
	  y = _ref3.y;
	  var hasX = offsets.hasOwnProperty('x');
	  var hasY = offsets.hasOwnProperty('y');
	  var sideX = left;
	  var sideY = top;
	  var win = window;
	  if (adaptive) {
	    var offsetParent = getOffsetParent(popper);
	    var heightProp = 'clientHeight';
	    var widthProp = 'clientWidth';
	    if (offsetParent === getWindow(popper)) {
	      offsetParent = getDocumentElement(popper);
	      if (getComputedStyle$1(offsetParent).position !== 'static' && position === 'absolute') {
	        heightProp = 'scrollHeight';
	        widthProp = 'scrollWidth';
	      }
	    } // $FlowFixMe[incompatible-cast]: force type refinement, we compare offsetParent with window above, but Flow doesn't detect it

	    offsetParent = offsetParent;
	    if (placement === top || (placement === left || placement === right) && variation === end) {
	      sideY = bottom;
	      var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height :
	      // $FlowFixMe[prop-missing]
	      offsetParent[heightProp];
	      y -= offsetY - popperRect.height;
	      y *= gpuAcceleration ? 1 : -1;
	    }
	    if (placement === left || (placement === top || placement === bottom) && variation === end) {
	      sideX = right;
	      var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width :
	      // $FlowFixMe[prop-missing]
	      offsetParent[widthProp];
	      x -= offsetX - popperRect.width;
	      x *= gpuAcceleration ? 1 : -1;
	    }
	  }
	  var commonStyles = Object.assign({
	    position: position
	  }, adaptive && unsetSides);
	  var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
	    x: x,
	    y: y
	  }) : {
	    x: x,
	    y: y
	  };
	  x = _ref4.x;
	  y = _ref4.y;
	  if (gpuAcceleration) {
	    var _Object$assign;
	    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? '0' : '', _Object$assign[sideX] = hasX ? '0' : '', _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
	  }
	  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : '', _Object$assign2[sideX] = hasX ? x + "px" : '', _Object$assign2.transform = '', _Object$assign2));
	}
	function computeStyles(_ref5) {
	  var state = _ref5.state,
	    options = _ref5.options;
	  var _options$gpuAccelerat = options.gpuAcceleration,
	    gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat,
	    _options$adaptive = options.adaptive,
	    adaptive = _options$adaptive === void 0 ? true : _options$adaptive,
	    _options$roundOffsets = options.roundOffsets,
	    roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
	  var commonStyles = {
	    placement: getBasePlacement(state.placement),
	    variation: getVariation(state.placement),
	    popper: state.elements.popper,
	    popperRect: state.rects.popper,
	    gpuAcceleration: gpuAcceleration,
	    isFixed: state.options.strategy === 'fixed'
	  };
	  if (state.modifiersData.popperOffsets != null) {
	    state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
	      offsets: state.modifiersData.popperOffsets,
	      position: state.options.strategy,
	      adaptive: adaptive,
	      roundOffsets: roundOffsets
	    })));
	  }
	  if (state.modifiersData.arrow != null) {
	    state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
	      offsets: state.modifiersData.arrow,
	      position: 'absolute',
	      adaptive: false,
	      roundOffsets: roundOffsets
	    })));
	  }
	  state.attributes.popper = Object.assign({}, state.attributes.popper, {
	    'data-popper-placement': state.placement
	  });
	} // eslint-disable-next-line import/no-unused-modules

	var computeStyles$1 = {
	  name: 'computeStyles',
	  enabled: true,
	  phase: 'beforeWrite',
	  fn: computeStyles,
	  data: {}
	};

	var passive = {
	  passive: true
	};
	function effect(_ref) {
	  var state = _ref.state,
	    instance = _ref.instance,
	    options = _ref.options;
	  var _options$scroll = options.scroll,
	    scroll = _options$scroll === void 0 ? true : _options$scroll,
	    _options$resize = options.resize,
	    resize = _options$resize === void 0 ? true : _options$resize;
	  var window = getWindow(state.elements.popper);
	  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);
	  if (scroll) {
	    scrollParents.forEach(function (scrollParent) {
	      scrollParent.addEventListener('scroll', instance.update, passive);
	    });
	  }
	  if (resize) {
	    window.addEventListener('resize', instance.update, passive);
	  }
	  return function () {
	    if (scroll) {
	      scrollParents.forEach(function (scrollParent) {
	        scrollParent.removeEventListener('scroll', instance.update, passive);
	      });
	    }
	    if (resize) {
	      window.removeEventListener('resize', instance.update, passive);
	    }
	  };
	} // eslint-disable-next-line import/no-unused-modules

	var eventListeners = {
	  name: 'eventListeners',
	  enabled: true,
	  phase: 'write',
	  fn: function fn() {},
	  effect: effect,
	  data: {}
	};

	var hash$1 = {
	  left: 'right',
	  right: 'left',
	  bottom: 'top',
	  top: 'bottom'
	};
	function getOppositePlacement(placement) {
	  return placement.replace(/left|right|bottom|top/g, function (matched) {
	    return hash$1[matched];
	  });
	}

	var hash = {
	  start: 'end',
	  end: 'start'
	};
	function getOppositeVariationPlacement(placement) {
	  return placement.replace(/start|end/g, function (matched) {
	    return hash[matched];
	  });
	}

	function getWindowScroll(node) {
	  var win = getWindow(node);
	  var scrollLeft = win.pageXOffset;
	  var scrollTop = win.pageYOffset;
	  return {
	    scrollLeft: scrollLeft,
	    scrollTop: scrollTop
	  };
	}

	function getWindowScrollBarX(element) {
	  // If <html> has a CSS width greater than the viewport, then this will be
	  // incorrect for RTL.
	  // Popper 1 is broken in this case and never had a bug report so let's assume
	  // it's not an issue. I don't think anyone ever specifies width on <html>
	  // anyway.
	  // Browsers where the left scrollbar doesn't cause an issue report `0` for
	  // this (e.g. Edge 2019, IE11, Safari)
	  return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
	}

	function getViewportRect(element, strategy) {
	  var win = getWindow(element);
	  var html = getDocumentElement(element);
	  var visualViewport = win.visualViewport;
	  var width = html.clientWidth;
	  var height = html.clientHeight;
	  var x = 0;
	  var y = 0;
	  if (visualViewport) {
	    width = visualViewport.width;
	    height = visualViewport.height;
	    var layoutViewport = isLayoutViewport();
	    if (layoutViewport || !layoutViewport && strategy === 'fixed') {
	      x = visualViewport.offsetLeft;
	      y = visualViewport.offsetTop;
	    }
	  }
	  return {
	    width: width,
	    height: height,
	    x: x + getWindowScrollBarX(element),
	    y: y
	  };
	}

	// of the `<html>` and `<body>` rect bounds if horizontally scrollable

	function getDocumentRect(element) {
	  var _element$ownerDocumen;
	  var html = getDocumentElement(element);
	  var winScroll = getWindowScroll(element);
	  var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
	  var width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
	  var height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
	  var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
	  var y = -winScroll.scrollTop;
	  if (getComputedStyle$1(body || html).direction === 'rtl') {
	    x += max(html.clientWidth, body ? body.clientWidth : 0) - width;
	  }
	  return {
	    width: width,
	    height: height,
	    x: x,
	    y: y
	  };
	}

	function isScrollParent(element) {
	  // Firefox wants us to check `-x` and `-y` variations as well
	  var _getComputedStyle = getComputedStyle$1(element),
	    overflow = _getComputedStyle.overflow,
	    overflowX = _getComputedStyle.overflowX,
	    overflowY = _getComputedStyle.overflowY;
	  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
	}

	function getScrollParent(node) {
	  if (['html', 'body', '#document'].indexOf(getNodeName(node)) >= 0) {
	    // $FlowFixMe[incompatible-return]: assume body is always available
	    return node.ownerDocument.body;
	  }
	  if (isHTMLElement(node) && isScrollParent(node)) {
	    return node;
	  }
	  return getScrollParent(getParentNode(node));
	}

	/*
	given a DOM element, return the list of all scroll parents, up the list of ancesors
	until we get to the top window object. This list is what we attach scroll listeners
	to, because if any of these parent elements scroll, we'll need to re-calculate the
	reference element's position.
	*/

	function listScrollParents(element, list) {
	  var _element$ownerDocumen;
	  if (list === void 0) {
	    list = [];
	  }
	  var scrollParent = getScrollParent(element);
	  var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
	  var win = getWindow(scrollParent);
	  var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
	  var updatedList = list.concat(target);
	  return isBody ? updatedList :
	  // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
	  updatedList.concat(listScrollParents(getParentNode(target)));
	}

	function rectToClientRect(rect) {
	  return Object.assign({}, rect, {
	    left: rect.x,
	    top: rect.y,
	    right: rect.x + rect.width,
	    bottom: rect.y + rect.height
	  });
	}

	function getInnerBoundingClientRect(element, strategy) {
	  var rect = getBoundingClientRect(element, false, strategy === 'fixed');
	  rect.top = rect.top + element.clientTop;
	  rect.left = rect.left + element.clientLeft;
	  rect.bottom = rect.top + element.clientHeight;
	  rect.right = rect.left + element.clientWidth;
	  rect.width = element.clientWidth;
	  rect.height = element.clientHeight;
	  rect.x = rect.left;
	  rect.y = rect.top;
	  return rect;
	}
	function getClientRectFromMixedType(element, clippingParent, strategy) {
	  return clippingParent === viewport ? rectToClientRect(getViewportRect(element, strategy)) : isElement(clippingParent) ? getInnerBoundingClientRect(clippingParent, strategy) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
	} // A "clipping parent" is an overflowable container with the characteristic of
	// clipping (or hiding) overflowing elements with a position different from
	// `initial`

	function getClippingParents(element) {
	  var clippingParents = listScrollParents(getParentNode(element));
	  var canEscapeClipping = ['absolute', 'fixed'].indexOf(getComputedStyle$1(element).position) >= 0;
	  var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;
	  if (!isElement(clipperElement)) {
	    return [];
	  } // $FlowFixMe[incompatible-return]: https://github.com/facebook/flow/issues/1414

	  return clippingParents.filter(function (clippingParent) {
	    return isElement(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== 'body';
	  });
	} // Gets the maximum area that the element is visible in due to any number of
	// clipping parents

	function getClippingRect(element, boundary, rootBoundary, strategy) {
	  var mainClippingParents = boundary === 'clippingParents' ? getClippingParents(element) : [].concat(boundary);
	  var clippingParents = [].concat(mainClippingParents, [rootBoundary]);
	  var firstClippingParent = clippingParents[0];
	  var clippingRect = clippingParents.reduce(function (accRect, clippingParent) {
	    var rect = getClientRectFromMixedType(element, clippingParent, strategy);
	    accRect.top = max(rect.top, accRect.top);
	    accRect.right = min(rect.right, accRect.right);
	    accRect.bottom = min(rect.bottom, accRect.bottom);
	    accRect.left = max(rect.left, accRect.left);
	    return accRect;
	  }, getClientRectFromMixedType(element, firstClippingParent, strategy));
	  clippingRect.width = clippingRect.right - clippingRect.left;
	  clippingRect.height = clippingRect.bottom - clippingRect.top;
	  clippingRect.x = clippingRect.left;
	  clippingRect.y = clippingRect.top;
	  return clippingRect;
	}

	function computeOffsets(_ref) {
	  var reference = _ref.reference,
	    element = _ref.element,
	    placement = _ref.placement;
	  var basePlacement = placement ? getBasePlacement(placement) : null;
	  var variation = placement ? getVariation(placement) : null;
	  var commonX = reference.x + reference.width / 2 - element.width / 2;
	  var commonY = reference.y + reference.height / 2 - element.height / 2;
	  var offsets;
	  switch (basePlacement) {
	    case top:
	      offsets = {
	        x: commonX,
	        y: reference.y - element.height
	      };
	      break;
	    case bottom:
	      offsets = {
	        x: commonX,
	        y: reference.y + reference.height
	      };
	      break;
	    case right:
	      offsets = {
	        x: reference.x + reference.width,
	        y: commonY
	      };
	      break;
	    case left:
	      offsets = {
	        x: reference.x - element.width,
	        y: commonY
	      };
	      break;
	    default:
	      offsets = {
	        x: reference.x,
	        y: reference.y
	      };
	  }
	  var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;
	  if (mainAxis != null) {
	    var len = mainAxis === 'y' ? 'height' : 'width';
	    switch (variation) {
	      case start:
	        offsets[mainAxis] = offsets[mainAxis] - (reference[len] / 2 - element[len] / 2);
	        break;
	      case end:
	        offsets[mainAxis] = offsets[mainAxis] + (reference[len] / 2 - element[len] / 2);
	        break;
	    }
	  }
	  return offsets;
	}

	function detectOverflow(state, options) {
	  if (options === void 0) {
	    options = {};
	  }
	  var _options = options,
	    _options$placement = _options.placement,
	    placement = _options$placement === void 0 ? state.placement : _options$placement,
	    _options$strategy = _options.strategy,
	    strategy = _options$strategy === void 0 ? state.strategy : _options$strategy,
	    _options$boundary = _options.boundary,
	    boundary = _options$boundary === void 0 ? clippingParents : _options$boundary,
	    _options$rootBoundary = _options.rootBoundary,
	    rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary,
	    _options$elementConte = _options.elementContext,
	    elementContext = _options$elementConte === void 0 ? popper : _options$elementConte,
	    _options$altBoundary = _options.altBoundary,
	    altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary,
	    _options$padding = _options.padding,
	    padding = _options$padding === void 0 ? 0 : _options$padding;
	  var paddingObject = mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
	  var altContext = elementContext === popper ? reference : popper;
	  var popperRect = state.rects.popper;
	  var element = state.elements[altBoundary ? altContext : elementContext];
	  var clippingClientRect = getClippingRect(isElement(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary, strategy);
	  var referenceClientRect = getBoundingClientRect(state.elements.reference);
	  var popperOffsets = computeOffsets({
	    reference: referenceClientRect,
	    element: popperRect,
	    strategy: 'absolute',
	    placement: placement
	  });
	  var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets));
	  var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect; // positive = overflowing the clipping rect
	  // 0 or negative = within the clipping rect

	  var overflowOffsets = {
	    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
	    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
	    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
	    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
	  };
	  var offsetData = state.modifiersData.offset; // Offsets can be applied only to the popper element

	  if (elementContext === popper && offsetData) {
	    var offset = offsetData[placement];
	    Object.keys(overflowOffsets).forEach(function (key) {
	      var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
	      var axis = [top, bottom].indexOf(key) >= 0 ? 'y' : 'x';
	      overflowOffsets[key] += offset[axis] * multiply;
	    });
	  }
	  return overflowOffsets;
	}

	function computeAutoPlacement(state, options) {
	  if (options === void 0) {
	    options = {};
	  }
	  var _options = options,
	    placement = _options.placement,
	    boundary = _options.boundary,
	    rootBoundary = _options.rootBoundary,
	    padding = _options.padding,
	    flipVariations = _options.flipVariations,
	    _options$allowedAutoP = _options.allowedAutoPlacements,
	    allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
	  var variation = getVariation(placement);
	  var placements$1 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function (placement) {
	    return getVariation(placement) === variation;
	  }) : basePlacements;
	  var allowedPlacements = placements$1.filter(function (placement) {
	    return allowedAutoPlacements.indexOf(placement) >= 0;
	  });
	  if (allowedPlacements.length === 0) {
	    allowedPlacements = placements$1;
	  } // $FlowFixMe[incompatible-type]: Flow seems to have problems with two array unions...

	  var overflows = allowedPlacements.reduce(function (acc, placement) {
	    acc[placement] = detectOverflow(state, {
	      placement: placement,
	      boundary: boundary,
	      rootBoundary: rootBoundary,
	      padding: padding
	    })[getBasePlacement(placement)];
	    return acc;
	  }, {});
	  return Object.keys(overflows).sort(function (a, b) {
	    return overflows[a] - overflows[b];
	  });
	}

	function getExpandedFallbackPlacements(placement) {
	  if (getBasePlacement(placement) === auto) {
	    return [];
	  }
	  var oppositePlacement = getOppositePlacement(placement);
	  return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
	}
	function flip(_ref) {
	  var state = _ref.state,
	    options = _ref.options,
	    name = _ref.name;
	  if (state.modifiersData[name]._skip) {
	    return;
	  }
	  var _options$mainAxis = options.mainAxis,
	    checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
	    _options$altAxis = options.altAxis,
	    checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis,
	    specifiedFallbackPlacements = options.fallbackPlacements,
	    padding = options.padding,
	    boundary = options.boundary,
	    rootBoundary = options.rootBoundary,
	    altBoundary = options.altBoundary,
	    _options$flipVariatio = options.flipVariations,
	    flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio,
	    allowedAutoPlacements = options.allowedAutoPlacements;
	  var preferredPlacement = state.options.placement;
	  var basePlacement = getBasePlacement(preferredPlacement);
	  var isBasePlacement = basePlacement === preferredPlacement;
	  var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
	  var placements = [preferredPlacement].concat(fallbackPlacements).reduce(function (acc, placement) {
	    return acc.concat(getBasePlacement(placement) === auto ? computeAutoPlacement(state, {
	      placement: placement,
	      boundary: boundary,
	      rootBoundary: rootBoundary,
	      padding: padding,
	      flipVariations: flipVariations,
	      allowedAutoPlacements: allowedAutoPlacements
	    }) : placement);
	  }, []);
	  var referenceRect = state.rects.reference;
	  var popperRect = state.rects.popper;
	  var checksMap = new Map();
	  var makeFallbackChecks = true;
	  var firstFittingPlacement = placements[0];
	  for (var i = 0; i < placements.length; i++) {
	    var placement = placements[i];
	    var _basePlacement = getBasePlacement(placement);
	    var isStartVariation = getVariation(placement) === start;
	    var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
	    var len = isVertical ? 'width' : 'height';
	    var overflow = detectOverflow(state, {
	      placement: placement,
	      boundary: boundary,
	      rootBoundary: rootBoundary,
	      altBoundary: altBoundary,
	      padding: padding
	    });
	    var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;
	    if (referenceRect[len] > popperRect[len]) {
	      mainVariationSide = getOppositePlacement(mainVariationSide);
	    }
	    var altVariationSide = getOppositePlacement(mainVariationSide);
	    var checks = [];
	    if (checkMainAxis) {
	      checks.push(overflow[_basePlacement] <= 0);
	    }
	    if (checkAltAxis) {
	      checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
	    }
	    if (checks.every(function (check) {
	      return check;
	    })) {
	      firstFittingPlacement = placement;
	      makeFallbackChecks = false;
	      break;
	    }
	    checksMap.set(placement, checks);
	  }
	  if (makeFallbackChecks) {
	    // `2` may be desired in some cases – research later
	    var numberOfChecks = flipVariations ? 3 : 1;
	    var _loop = function _loop(_i) {
	      var fittingPlacement = placements.find(function (placement) {
	        var checks = checksMap.get(placement);
	        if (checks) {
	          return checks.slice(0, _i).every(function (check) {
	            return check;
	          });
	        }
	      });
	      if (fittingPlacement) {
	        firstFittingPlacement = fittingPlacement;
	        return "break";
	      }
	    };
	    for (var _i = numberOfChecks; _i > 0; _i--) {
	      var _ret = _loop(_i);
	      if (_ret === "break") break;
	    }
	  }
	  if (state.placement !== firstFittingPlacement) {
	    state.modifiersData[name]._skip = true;
	    state.placement = firstFittingPlacement;
	    state.reset = true;
	  }
	} // eslint-disable-next-line import/no-unused-modules

	var flip$1 = {
	  name: 'flip',
	  enabled: true,
	  phase: 'main',
	  fn: flip,
	  requiresIfExists: ['offset'],
	  data: {
	    _skip: false
	  }
	};

	function getSideOffsets(overflow, rect, preventedOffsets) {
	  if (preventedOffsets === void 0) {
	    preventedOffsets = {
	      x: 0,
	      y: 0
	    };
	  }
	  return {
	    top: overflow.top - rect.height - preventedOffsets.y,
	    right: overflow.right - rect.width + preventedOffsets.x,
	    bottom: overflow.bottom - rect.height + preventedOffsets.y,
	    left: overflow.left - rect.width - preventedOffsets.x
	  };
	}
	function isAnySideFullyClipped(overflow) {
	  return [top, right, bottom, left].some(function (side) {
	    return overflow[side] >= 0;
	  });
	}
	function hide(_ref) {
	  var state = _ref.state,
	    name = _ref.name;
	  var referenceRect = state.rects.reference;
	  var popperRect = state.rects.popper;
	  var preventedOffsets = state.modifiersData.preventOverflow;
	  var referenceOverflow = detectOverflow(state, {
	    elementContext: 'reference'
	  });
	  var popperAltOverflow = detectOverflow(state, {
	    altBoundary: true
	  });
	  var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
	  var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
	  var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
	  var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
	  state.modifiersData[name] = {
	    referenceClippingOffsets: referenceClippingOffsets,
	    popperEscapeOffsets: popperEscapeOffsets,
	    isReferenceHidden: isReferenceHidden,
	    hasPopperEscaped: hasPopperEscaped
	  };
	  state.attributes.popper = Object.assign({}, state.attributes.popper, {
	    'data-popper-reference-hidden': isReferenceHidden,
	    'data-popper-escaped': hasPopperEscaped
	  });
	} // eslint-disable-next-line import/no-unused-modules

	var hide$1 = {
	  name: 'hide',
	  enabled: true,
	  phase: 'main',
	  requiresIfExists: ['preventOverflow'],
	  fn: hide
	};

	function distanceAndSkiddingToXY(placement, rects, offset) {
	  var basePlacement = getBasePlacement(placement);
	  var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;
	  var _ref = typeof offset === 'function' ? offset(Object.assign({}, rects, {
	      placement: placement
	    })) : offset,
	    skidding = _ref[0],
	    distance = _ref[1];
	  skidding = skidding || 0;
	  distance = (distance || 0) * invertDistance;
	  return [left, right].indexOf(basePlacement) >= 0 ? {
	    x: distance,
	    y: skidding
	  } : {
	    x: skidding,
	    y: distance
	  };
	}
	function offset(_ref2) {
	  var state = _ref2.state,
	    options = _ref2.options,
	    name = _ref2.name;
	  var _options$offset = options.offset,
	    offset = _options$offset === void 0 ? [0, 0] : _options$offset;
	  var data = placements.reduce(function (acc, placement) {
	    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
	    return acc;
	  }, {});
	  var _data$state$placement = data[state.placement],
	    x = _data$state$placement.x,
	    y = _data$state$placement.y;
	  if (state.modifiersData.popperOffsets != null) {
	    state.modifiersData.popperOffsets.x += x;
	    state.modifiersData.popperOffsets.y += y;
	  }
	  state.modifiersData[name] = data;
	} // eslint-disable-next-line import/no-unused-modules

	var offset$1 = {
	  name: 'offset',
	  enabled: true,
	  phase: 'main',
	  requires: ['popperOffsets'],
	  fn: offset
	};

	function popperOffsets(_ref) {
	  var state = _ref.state,
	    name = _ref.name;
	  // Offsets are the actual position the popper needs to have to be
	  // properly positioned near its reference element
	  // This is the most basic placement, and will be adjusted by
	  // the modifiers in the next step
	  state.modifiersData[name] = computeOffsets({
	    reference: state.rects.reference,
	    element: state.rects.popper,
	    strategy: 'absolute',
	    placement: state.placement
	  });
	} // eslint-disable-next-line import/no-unused-modules

	var popperOffsets$1 = {
	  name: 'popperOffsets',
	  enabled: true,
	  phase: 'read',
	  fn: popperOffsets,
	  data: {}
	};

	function getAltAxis(axis) {
	  return axis === 'x' ? 'y' : 'x';
	}

	function preventOverflow(_ref) {
	  var state = _ref.state,
	    options = _ref.options,
	    name = _ref.name;
	  var _options$mainAxis = options.mainAxis,
	    checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
	    _options$altAxis = options.altAxis,
	    checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis,
	    boundary = options.boundary,
	    rootBoundary = options.rootBoundary,
	    altBoundary = options.altBoundary,
	    padding = options.padding,
	    _options$tether = options.tether,
	    tether = _options$tether === void 0 ? true : _options$tether,
	    _options$tetherOffset = options.tetherOffset,
	    tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
	  var overflow = detectOverflow(state, {
	    boundary: boundary,
	    rootBoundary: rootBoundary,
	    padding: padding,
	    altBoundary: altBoundary
	  });
	  var basePlacement = getBasePlacement(state.placement);
	  var variation = getVariation(state.placement);
	  var isBasePlacement = !variation;
	  var mainAxis = getMainAxisFromPlacement(basePlacement);
	  var altAxis = getAltAxis(mainAxis);
	  var popperOffsets = state.modifiersData.popperOffsets;
	  var referenceRect = state.rects.reference;
	  var popperRect = state.rects.popper;
	  var tetherOffsetValue = typeof tetherOffset === 'function' ? tetherOffset(Object.assign({}, state.rects, {
	    placement: state.placement
	  })) : tetherOffset;
	  var normalizedTetherOffsetValue = typeof tetherOffsetValue === 'number' ? {
	    mainAxis: tetherOffsetValue,
	    altAxis: tetherOffsetValue
	  } : Object.assign({
	    mainAxis: 0,
	    altAxis: 0
	  }, tetherOffsetValue);
	  var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
	  var data = {
	    x: 0,
	    y: 0
	  };
	  if (!popperOffsets) {
	    return;
	  }
	  if (checkMainAxis) {
	    var _offsetModifierState$;
	    var mainSide = mainAxis === 'y' ? top : left;
	    var altSide = mainAxis === 'y' ? bottom : right;
	    var len = mainAxis === 'y' ? 'height' : 'width';
	    var offset = popperOffsets[mainAxis];
	    var min$1 = offset + overflow[mainSide];
	    var max$1 = offset - overflow[altSide];
	    var additive = tether ? -popperRect[len] / 2 : 0;
	    var minLen = variation === start ? referenceRect[len] : popperRect[len];
	    var maxLen = variation === start ? -popperRect[len] : -referenceRect[len]; // We need to include the arrow in the calculation so the arrow doesn't go
	    // outside the reference bounds

	    var arrowElement = state.elements.arrow;
	    var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
	      width: 0,
	      height: 0
	    };
	    var arrowPaddingObject = state.modifiersData['arrow#persistent'] ? state.modifiersData['arrow#persistent'].padding : getFreshSideObject();
	    var arrowPaddingMin = arrowPaddingObject[mainSide];
	    var arrowPaddingMax = arrowPaddingObject[altSide]; // If the reference length is smaller than the arrow length, we don't want
	    // to include its full size in the calculation. If the reference is small
	    // and near the edge of a boundary, the popper can overflow even if the
	    // reference is not overflowing as well (e.g. virtual elements with no
	    // width or height)

	    var arrowLen = within(0, referenceRect[len], arrowRect[len]);
	    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
	    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
	    var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
	    var clientOffset = arrowOffsetParent ? mainAxis === 'y' ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
	    var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
	    var tetherMin = offset + minOffset - offsetModifierValue - clientOffset;
	    var tetherMax = offset + maxOffset - offsetModifierValue;
	    var preventedOffset = within(tether ? min(min$1, tetherMin) : min$1, offset, tether ? max(max$1, tetherMax) : max$1);
	    popperOffsets[mainAxis] = preventedOffset;
	    data[mainAxis] = preventedOffset - offset;
	  }
	  if (checkAltAxis) {
	    var _offsetModifierState$2;
	    var _mainSide = mainAxis === 'x' ? top : left;
	    var _altSide = mainAxis === 'x' ? bottom : right;
	    var _offset = popperOffsets[altAxis];
	    var _len = altAxis === 'y' ? 'height' : 'width';
	    var _min = _offset + overflow[_mainSide];
	    var _max = _offset - overflow[_altSide];
	    var isOriginSide = [top, left].indexOf(basePlacement) !== -1;
	    var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;
	    var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;
	    var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;
	    var _preventedOffset = tether && isOriginSide ? withinMaxClamp(_tetherMin, _offset, _tetherMax) : within(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);
	    popperOffsets[altAxis] = _preventedOffset;
	    data[altAxis] = _preventedOffset - _offset;
	  }
	  state.modifiersData[name] = data;
	} // eslint-disable-next-line import/no-unused-modules

	var preventOverflow$1 = {
	  name: 'preventOverflow',
	  enabled: true,
	  phase: 'main',
	  fn: preventOverflow,
	  requiresIfExists: ['offset']
	};

	function getHTMLElementScroll(element) {
	  return {
	    scrollLeft: element.scrollLeft,
	    scrollTop: element.scrollTop
	  };
	}

	function getNodeScroll(node) {
	  if (node === getWindow(node) || !isHTMLElement(node)) {
	    return getWindowScroll(node);
	  } else {
	    return getHTMLElementScroll(node);
	  }
	}

	function isElementScaled(element) {
	  var rect = element.getBoundingClientRect();
	  var scaleX = round(rect.width) / element.offsetWidth || 1;
	  var scaleY = round(rect.height) / element.offsetHeight || 1;
	  return scaleX !== 1 || scaleY !== 1;
	} // Returns the composite rect of an element relative to its offsetParent.
	// Composite means it takes into account transforms as well as layout.

	function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
	  if (isFixed === void 0) {
	    isFixed = false;
	  }
	  var isOffsetParentAnElement = isHTMLElement(offsetParent);
	  var offsetParentIsScaled = isHTMLElement(offsetParent) && isElementScaled(offsetParent);
	  var documentElement = getDocumentElement(offsetParent);
	  var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled, isFixed);
	  var scroll = {
	    scrollLeft: 0,
	    scrollTop: 0
	  };
	  var offsets = {
	    x: 0,
	    y: 0
	  };
	  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
	    if (getNodeName(offsetParent) !== 'body' ||
	    // https://github.com/popperjs/popper-core/issues/1078
	    isScrollParent(documentElement)) {
	      scroll = getNodeScroll(offsetParent);
	    }
	    if (isHTMLElement(offsetParent)) {
	      offsets = getBoundingClientRect(offsetParent, true);
	      offsets.x += offsetParent.clientLeft;
	      offsets.y += offsetParent.clientTop;
	    } else if (documentElement) {
	      offsets.x = getWindowScrollBarX(documentElement);
	    }
	  }
	  return {
	    x: rect.left + scroll.scrollLeft - offsets.x,
	    y: rect.top + scroll.scrollTop - offsets.y,
	    width: rect.width,
	    height: rect.height
	  };
	}

	function order(modifiers) {
	  var map = new Map();
	  var visited = new Set();
	  var result = [];
	  modifiers.forEach(function (modifier) {
	    map.set(modifier.name, modifier);
	  }); // On visiting object, check for its dependencies and visit them recursively

	  function sort(modifier) {
	    visited.add(modifier.name);
	    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
	    requires.forEach(function (dep) {
	      if (!visited.has(dep)) {
	        var depModifier = map.get(dep);
	        if (depModifier) {
	          sort(depModifier);
	        }
	      }
	    });
	    result.push(modifier);
	  }
	  modifiers.forEach(function (modifier) {
	    if (!visited.has(modifier.name)) {
	      // check for visited object
	      sort(modifier);
	    }
	  });
	  return result;
	}
	function orderModifiers(modifiers) {
	  // order based on dependencies
	  var orderedModifiers = order(modifiers); // order based on phase

	  return modifierPhases.reduce(function (acc, phase) {
	    return acc.concat(orderedModifiers.filter(function (modifier) {
	      return modifier.phase === phase;
	    }));
	  }, []);
	}

	function debounce(fn) {
	  var pending;
	  return function () {
	    if (!pending) {
	      pending = new Promise(function (resolve) {
	        Promise.resolve().then(function () {
	          pending = undefined;
	          resolve(fn());
	        });
	      });
	    }
	    return pending;
	  };
	}

	function mergeByName(modifiers) {
	  var merged = modifiers.reduce(function (merged, current) {
	    var existing = merged[current.name];
	    merged[current.name] = existing ? Object.assign({}, existing, current, {
	      options: Object.assign({}, existing.options, current.options),
	      data: Object.assign({}, existing.data, current.data)
	    }) : current;
	    return merged;
	  }, {}); // IE11 does not support Object.values

	  return Object.keys(merged).map(function (key) {
	    return merged[key];
	  });
	}

	var DEFAULT_OPTIONS = {
	  placement: 'bottom',
	  modifiers: [],
	  strategy: 'absolute'
	};
	function areValidElements() {
	  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }
	  return !args.some(function (element) {
	    return !(element && typeof element.getBoundingClientRect === 'function');
	  });
	}
	function popperGenerator(generatorOptions) {
	  if (generatorOptions === void 0) {
	    generatorOptions = {};
	  }
	  var _generatorOptions = generatorOptions,
	    _generatorOptions$def = _generatorOptions.defaultModifiers,
	    defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def,
	    _generatorOptions$def2 = _generatorOptions.defaultOptions,
	    defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
	  return function createPopper(reference, popper, options) {
	    if (options === void 0) {
	      options = defaultOptions;
	    }
	    var state = {
	      placement: 'bottom',
	      orderedModifiers: [],
	      options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
	      modifiersData: {},
	      elements: {
	        reference: reference,
	        popper: popper
	      },
	      attributes: {},
	      styles: {}
	    };
	    var effectCleanupFns = [];
	    var isDestroyed = false;
	    var instance = {
	      state: state,
	      setOptions: function setOptions(setOptionsAction) {
	        var options = typeof setOptionsAction === 'function' ? setOptionsAction(state.options) : setOptionsAction;
	        cleanupModifierEffects();
	        state.options = Object.assign({}, defaultOptions, state.options, options);
	        state.scrollParents = {
	          reference: isElement(reference) ? listScrollParents(reference) : reference.contextElement ? listScrollParents(reference.contextElement) : [],
	          popper: listScrollParents(popper)
	        }; // Orders the modifiers based on their dependencies and `phase`
	        // properties

	        var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers, state.options.modifiers))); // Strip out disabled modifiers

	        state.orderedModifiers = orderedModifiers.filter(function (m) {
	          return m.enabled;
	        }); // Validate the provided modifiers so that the consumer will get warned
	        runModifierEffects();
	        return instance.update();
	      },
	      // Sync update – it will always be executed, even if not necessary. This
	      // is useful for low frequency updates where sync behavior simplifies the
	      // logic.
	      // For high frequency updates (e.g. `resize` and `scroll` events), always
	      // prefer the async Popper#update method
	      forceUpdate: function forceUpdate() {
	        if (isDestroyed) {
	          return;
	        }
	        var _state$elements = state.elements,
	          reference = _state$elements.reference,
	          popper = _state$elements.popper; // Don't proceed if `reference` or `popper` are not valid elements
	        // anymore

	        if (!areValidElements(reference, popper)) {
	          return;
	        } // Store the reference and popper rects to be read by modifiers

	        state.rects = {
	          reference: getCompositeRect(reference, getOffsetParent(popper), state.options.strategy === 'fixed'),
	          popper: getLayoutRect(popper)
	        }; // Modifiers have the ability to reset the current update cycle. The
	        // most common use case for this is the `flip` modifier changing the
	        // placement, which then needs to re-run all the modifiers, because the
	        // logic was previously ran for the previous placement and is therefore
	        // stale/incorrect

	        state.reset = false;
	        state.placement = state.options.placement; // On each update cycle, the `modifiersData` property for each modifier
	        // is filled with the initial data specified by the modifier. This means
	        // it doesn't persist and is fresh on each update.
	        // To ensure persistent data, use `${name}#persistent`

	        state.orderedModifiers.forEach(function (modifier) {
	          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
	        });
	        for (var index = 0; index < state.orderedModifiers.length; index++) {
	          if (state.reset === true) {
	            state.reset = false;
	            index = -1;
	            continue;
	          }
	          var _state$orderedModifie = state.orderedModifiers[index],
	            fn = _state$orderedModifie.fn,
	            _state$orderedModifie2 = _state$orderedModifie.options,
	            _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2,
	            name = _state$orderedModifie.name;
	          if (typeof fn === 'function') {
	            state = fn({
	              state: state,
	              options: _options,
	              name: name,
	              instance: instance
	            }) || state;
	          }
	        }
	      },
	      // Async and optimistically optimized update – it will not be executed if
	      // not necessary (debounced to run at most once-per-tick)
	      update: debounce(function () {
	        return new Promise(function (resolve) {
	          instance.forceUpdate();
	          resolve(state);
	        });
	      }),
	      destroy: function destroy() {
	        cleanupModifierEffects();
	        isDestroyed = true;
	      }
	    };
	    if (!areValidElements(reference, popper)) {
	      return instance;
	    }
	    instance.setOptions(options).then(function (state) {
	      if (!isDestroyed && options.onFirstUpdate) {
	        options.onFirstUpdate(state);
	      }
	    }); // Modifiers have the ability to execute arbitrary code before the first
	    // update cycle runs. They will be executed in the same order as the update
	    // cycle. This is useful when a modifier adds some persistent data that
	    // other modifiers need to use, but the modifier is run after the dependent
	    // one.

	    function runModifierEffects() {
	      state.orderedModifiers.forEach(function (_ref3) {
	        var name = _ref3.name,
	          _ref3$options = _ref3.options,
	          options = _ref3$options === void 0 ? {} : _ref3$options,
	          effect = _ref3.effect;
	        if (typeof effect === 'function') {
	          var cleanupFn = effect({
	            state: state,
	            name: name,
	            instance: instance,
	            options: options
	          });
	          var noopFn = function noopFn() {};
	          effectCleanupFns.push(cleanupFn || noopFn);
	        }
	      });
	    }
	    function cleanupModifierEffects() {
	      effectCleanupFns.forEach(function (fn) {
	        return fn();
	      });
	      effectCleanupFns = [];
	    }
	    return instance;
	  };
	}
	var createPopper$2 = /*#__PURE__*/popperGenerator(); // eslint-disable-next-line import/no-unused-modules

	var defaultModifiers$1 = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1];
	var createPopper$1 = /*#__PURE__*/popperGenerator({
	  defaultModifiers: defaultModifiers$1
	}); // eslint-disable-next-line import/no-unused-modules

	var defaultModifiers = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1, offset$1, flip$1, preventOverflow$1, arrow$1, hide$1];
	var createPopper = /*#__PURE__*/popperGenerator({
	  defaultModifiers: defaultModifiers
	}); // eslint-disable-next-line import/no-unused-modules

	var lib = /*#__PURE__*/Object.freeze({
		__proto__: null,
		popperGenerator: popperGenerator,
		detectOverflow: detectOverflow,
		createPopperBase: createPopper$2,
		createPopper: createPopper,
		createPopperLite: createPopper$1,
		top: top,
		bottom: bottom,
		right: right,
		left: left,
		auto: auto,
		basePlacements: basePlacements,
		start: start,
		end: end,
		clippingParents: clippingParents,
		viewport: viewport,
		popper: popper,
		reference: reference,
		variationPlacements: variationPlacements,
		placements: placements,
		beforeRead: beforeRead,
		read: read,
		afterRead: afterRead,
		beforeMain: beforeMain,
		main: main,
		afterMain: afterMain,
		beforeWrite: beforeWrite,
		write: write,
		afterWrite: afterWrite,
		modifierPhases: modifierPhases,
		applyStyles: applyStyles$1,
		arrow: arrow$1,
		computeStyles: computeStyles$1,
		eventListeners: eventListeners,
		flip: flip$1,
		hide: hide$1,
		offset: offset$1,
		popperOffsets: popperOffsets$1,
		preventOverflow: preventOverflow$1
	});

	var require$$0 = /*@__PURE__*/getAugmentedNamespace(lib);

	/*!
	  * Bootstrap dropdown.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
		(function (global, factory) {
		  module.exports = factory(require$$0, requireUtil(), requireEventHandler(), requireManipulator(), requireSelectorEngine(), requireBaseComponent()) ;
		})(commonjsGlobal, function (Popper, index, EventHandler, Manipulator, SelectorEngine, BaseComponent) {

		  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : {
		    default: e
		  };
		  function _interopNamespace(e) {
		    if (e && e.__esModule) return e;
		    const n = Object.create(null, {
		      [Symbol.toStringTag]: {
		        value: 'Module'
		      }
		    });
		    if (e) {
		      for (const k in e) {
		        if (k !== 'default') {
		          const d = Object.getOwnPropertyDescriptor(e, k);
		          Object.defineProperty(n, k, d.get ? d : {
		            enumerable: true,
		            get: () => e[k]
		          });
		        }
		      }
		    }
		    n.default = e;
		    return Object.freeze(n);
		  }
		  const Popper__namespace = /*#__PURE__*/_interopNamespace(Popper);
		  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
		  const Manipulator__default = /*#__PURE__*/_interopDefaultLegacy(Manipulator);
		  const SelectorEngine__default = /*#__PURE__*/_interopDefaultLegacy(SelectorEngine);
		  const BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

		  /**
		   * --------------------------------------------------------------------------
		   * Bootstrap (v5.2.3): dropdown.js
		   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
		   * --------------------------------------------------------------------------
		   */
		  /**
		   * Constants
		   */

		  const NAME = 'dropdown';
		  const DATA_KEY = 'bs.dropdown';
		  const EVENT_KEY = `.${DATA_KEY}`;
		  const DATA_API_KEY = '.data-api';
		  const ESCAPE_KEY = 'Escape';
		  const TAB_KEY = 'Tab';
		  const ARROW_UP_KEY = 'ArrowUp';
		  const ARROW_DOWN_KEY = 'ArrowDown';
		  const RIGHT_MOUSE_BUTTON = 2; // MouseEvent.button value for the secondary button, usually the right button

		  const EVENT_HIDE = `hide${EVENT_KEY}`;
		  const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
		  const EVENT_SHOW = `show${EVENT_KEY}`;
		  const EVENT_SHOWN = `shown${EVENT_KEY}`;
		  const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`;
		  const EVENT_KEYDOWN_DATA_API = `keydown${EVENT_KEY}${DATA_API_KEY}`;
		  const EVENT_KEYUP_DATA_API = `keyup${EVENT_KEY}${DATA_API_KEY}`;
		  const CLASS_NAME_SHOW = 'show';
		  const CLASS_NAME_DROPUP = 'dropup';
		  const CLASS_NAME_DROPEND = 'dropend';
		  const CLASS_NAME_DROPSTART = 'dropstart';
		  const CLASS_NAME_DROPUP_CENTER = 'dropup-center';
		  const CLASS_NAME_DROPDOWN_CENTER = 'dropdown-center';
		  const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)';
		  const SELECTOR_DATA_TOGGLE_SHOWN = `${SELECTOR_DATA_TOGGLE}.${CLASS_NAME_SHOW}`;
		  const SELECTOR_MENU = '.dropdown-menu';
		  const SELECTOR_NAVBAR = '.navbar';
		  const SELECTOR_NAVBAR_NAV = '.navbar-nav';
		  const SELECTOR_VISIBLE_ITEMS = '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)';
		  const PLACEMENT_TOP = index.isRTL() ? 'top-end' : 'top-start';
		  const PLACEMENT_TOPEND = index.isRTL() ? 'top-start' : 'top-end';
		  const PLACEMENT_BOTTOM = index.isRTL() ? 'bottom-end' : 'bottom-start';
		  const PLACEMENT_BOTTOMEND = index.isRTL() ? 'bottom-start' : 'bottom-end';
		  const PLACEMENT_RIGHT = index.isRTL() ? 'left-start' : 'right-start';
		  const PLACEMENT_LEFT = index.isRTL() ? 'right-start' : 'left-start';
		  const PLACEMENT_TOPCENTER = 'top';
		  const PLACEMENT_BOTTOMCENTER = 'bottom';
		  const Default = {
		    autoClose: true,
		    boundary: 'clippingParents',
		    display: 'dynamic',
		    offset: [0, 2],
		    popperConfig: null,
		    reference: 'toggle'
		  };
		  const DefaultType = {
		    autoClose: '(boolean|string)',
		    boundary: '(string|element)',
		    display: 'string',
		    offset: '(array|string|function)',
		    popperConfig: '(null|object|function)',
		    reference: '(string|element|object)'
		  };
		  /**
		   * Class definition
		   */

		  class Dropdown extends BaseComponent__default.default {
		    constructor(element, config) {
		      super(element, config);
		      this._popper = null;
		      this._parent = this._element.parentNode; // dropdown wrapper
		      // todo: v6 revert #37011 & change markup https://getbootstrap.com/docs/5.2/forms/input-group/

		      this._menu = SelectorEngine__default.default.next(this._element, SELECTOR_MENU)[0] || SelectorEngine__default.default.prev(this._element, SELECTOR_MENU)[0] || SelectorEngine__default.default.findOne(SELECTOR_MENU, this._parent);
		      this._inNavbar = this._detectNavbar();
		    } // Getters

		    static get Default() {
		      return Default;
		    }
		    static get DefaultType() {
		      return DefaultType;
		    }
		    static get NAME() {
		      return NAME;
		    } // Public

		    toggle() {
		      return this._isShown() ? this.hide() : this.show();
		    }
		    show() {
		      if (index.isDisabled(this._element) || this._isShown()) {
		        return;
		      }
		      const relatedTarget = {
		        relatedTarget: this._element
		      };
		      const showEvent = EventHandler__default.default.trigger(this._element, EVENT_SHOW, relatedTarget);
		      if (showEvent.defaultPrevented) {
		        return;
		      }
		      this._createPopper(); // If this is a touch-enabled device we add extra
		      // empty mouseover listeners to the body's immediate children;
		      // only needed because of broken event delegation on iOS
		      // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html

		      if ('ontouchstart' in document.documentElement && !this._parent.closest(SELECTOR_NAVBAR_NAV)) {
		        for (const element of [].concat(...document.body.children)) {
		          EventHandler__default.default.on(element, 'mouseover', index.noop);
		        }
		      }
		      this._element.focus();
		      this._element.setAttribute('aria-expanded', true);
		      this._menu.classList.add(CLASS_NAME_SHOW);
		      this._element.classList.add(CLASS_NAME_SHOW);
		      EventHandler__default.default.trigger(this._element, EVENT_SHOWN, relatedTarget);
		    }
		    hide() {
		      if (index.isDisabled(this._element) || !this._isShown()) {
		        return;
		      }
		      const relatedTarget = {
		        relatedTarget: this._element
		      };
		      this._completeHide(relatedTarget);
		    }
		    dispose() {
		      if (this._popper) {
		        this._popper.destroy();
		      }
		      super.dispose();
		    }
		    update() {
		      this._inNavbar = this._detectNavbar();
		      if (this._popper) {
		        this._popper.update();
		      }
		    } // Private

		    _completeHide(relatedTarget) {
		      const hideEvent = EventHandler__default.default.trigger(this._element, EVENT_HIDE, relatedTarget);
		      if (hideEvent.defaultPrevented) {
		        return;
		      } // If this is a touch-enabled device we remove the extra
		      // empty mouseover listeners we added for iOS support

		      if ('ontouchstart' in document.documentElement) {
		        for (const element of [].concat(...document.body.children)) {
		          EventHandler__default.default.off(element, 'mouseover', index.noop);
		        }
		      }
		      if (this._popper) {
		        this._popper.destroy();
		      }
		      this._menu.classList.remove(CLASS_NAME_SHOW);
		      this._element.classList.remove(CLASS_NAME_SHOW);
		      this._element.setAttribute('aria-expanded', 'false');
		      Manipulator__default.default.removeDataAttribute(this._menu, 'popper');
		      EventHandler__default.default.trigger(this._element, EVENT_HIDDEN, relatedTarget);
		    }
		    _getConfig(config) {
		      config = super._getConfig(config);
		      if (typeof config.reference === 'object' && !index.isElement(config.reference) && typeof config.reference.getBoundingClientRect !== 'function') {
		        // Popper virtual elements require a getBoundingClientRect method
		        throw new TypeError(`${NAME.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);
		      }
		      return config;
		    }
		    _createPopper() {
		      if (typeof Popper__namespace === 'undefined') {
		        throw new TypeError('Bootstrap\'s dropdowns require Popper (https://popper.js.org)');
		      }
		      let referenceElement = this._element;
		      if (this._config.reference === 'parent') {
		        referenceElement = this._parent;
		      } else if (index.isElement(this._config.reference)) {
		        referenceElement = index.getElement(this._config.reference);
		      } else if (typeof this._config.reference === 'object') {
		        referenceElement = this._config.reference;
		      }
		      const popperConfig = this._getPopperConfig();
		      this._popper = Popper__namespace.createPopper(referenceElement, this._menu, popperConfig);
		    }
		    _isShown() {
		      return this._menu.classList.contains(CLASS_NAME_SHOW);
		    }
		    _getPlacement() {
		      const parentDropdown = this._parent;
		      if (parentDropdown.classList.contains(CLASS_NAME_DROPEND)) {
		        return PLACEMENT_RIGHT;
		      }
		      if (parentDropdown.classList.contains(CLASS_NAME_DROPSTART)) {
		        return PLACEMENT_LEFT;
		      }
		      if (parentDropdown.classList.contains(CLASS_NAME_DROPUP_CENTER)) {
		        return PLACEMENT_TOPCENTER;
		      }
		      if (parentDropdown.classList.contains(CLASS_NAME_DROPDOWN_CENTER)) {
		        return PLACEMENT_BOTTOMCENTER;
		      } // We need to trim the value because custom properties can also include spaces

		      const isEnd = getComputedStyle(this._menu).getPropertyValue('--bs-position').trim() === 'end';
		      if (parentDropdown.classList.contains(CLASS_NAME_DROPUP)) {
		        return isEnd ? PLACEMENT_TOPEND : PLACEMENT_TOP;
		      }
		      return isEnd ? PLACEMENT_BOTTOMEND : PLACEMENT_BOTTOM;
		    }
		    _detectNavbar() {
		      return this._element.closest(SELECTOR_NAVBAR) !== null;
		    }
		    _getOffset() {
		      const {
		        offset
		      } = this._config;
		      if (typeof offset === 'string') {
		        return offset.split(',').map(value => Number.parseInt(value, 10));
		      }
		      if (typeof offset === 'function') {
		        return popperData => offset(popperData, this._element);
		      }
		      return offset;
		    }
		    _getPopperConfig() {
		      const defaultBsPopperConfig = {
		        placement: this._getPlacement(),
		        modifiers: [{
		          name: 'preventOverflow',
		          options: {
		            boundary: this._config.boundary
		          }
		        }, {
		          name: 'offset',
		          options: {
		            offset: this._getOffset()
		          }
		        }]
		      }; // Disable Popper if we have a static display or Dropdown is in Navbar

		      if (this._inNavbar || this._config.display === 'static') {
		        Manipulator__default.default.setDataAttribute(this._menu, 'popper', 'static'); // todo:v6 remove

		        defaultBsPopperConfig.modifiers = [{
		          name: 'applyStyles',
		          enabled: false
		        }];
		      }
		      return {
		        ...defaultBsPopperConfig,
		        ...(typeof this._config.popperConfig === 'function' ? this._config.popperConfig(defaultBsPopperConfig) : this._config.popperConfig)
		      };
		    }
		    _selectMenuItem({
		      key,
		      target
		    }) {
		      const items = SelectorEngine__default.default.find(SELECTOR_VISIBLE_ITEMS, this._menu).filter(element => index.isVisible(element));
		      if (!items.length) {
		        return;
		      } // if target isn't included in items (e.g. when expanding the dropdown)
		      // allow cycling to get the last item in case key equals ARROW_UP_KEY

		      index.getNextActiveElement(items, target, key === ARROW_DOWN_KEY, !items.includes(target)).focus();
		    } // Static

		    static jQueryInterface(config) {
		      return this.each(function () {
		        const data = Dropdown.getOrCreateInstance(this, config);
		        if (typeof config !== 'string') {
		          return;
		        }
		        if (typeof data[config] === 'undefined') {
		          throw new TypeError(`No method named "${config}"`);
		        }
		        data[config]();
		      });
		    }
		    static clearMenus(event) {
		      if (event.button === RIGHT_MOUSE_BUTTON || event.type === 'keyup' && event.key !== TAB_KEY) {
		        return;
		      }
		      const openToggles = SelectorEngine__default.default.find(SELECTOR_DATA_TOGGLE_SHOWN);
		      for (const toggle of openToggles) {
		        const context = Dropdown.getInstance(toggle);
		        if (!context || context._config.autoClose === false) {
		          continue;
		        }
		        const composedPath = event.composedPath();
		        const isMenuTarget = composedPath.includes(context._menu);
		        if (composedPath.includes(context._element) || context._config.autoClose === 'inside' && !isMenuTarget || context._config.autoClose === 'outside' && isMenuTarget) {
		          continue;
		        } // Tab navigation through the dropdown menu or events from contained inputs shouldn't close the menu

		        if (context._menu.contains(event.target) && (event.type === 'keyup' && event.key === TAB_KEY || /input|select|option|textarea|form/i.test(event.target.tagName))) {
		          continue;
		        }
		        const relatedTarget = {
		          relatedTarget: context._element
		        };
		        if (event.type === 'click') {
		          relatedTarget.clickEvent = event;
		        }
		        context._completeHide(relatedTarget);
		      }
		    }
		    static dataApiKeydownHandler(event) {
		      // If not an UP | DOWN | ESCAPE key => not a dropdown command
		      // If input/textarea && if key is other than ESCAPE => not a dropdown command
		      const isInput = /input|textarea/i.test(event.target.tagName);
		      const isEscapeEvent = event.key === ESCAPE_KEY;
		      const isUpOrDownEvent = [ARROW_UP_KEY, ARROW_DOWN_KEY].includes(event.key);
		      if (!isUpOrDownEvent && !isEscapeEvent) {
		        return;
		      }
		      if (isInput && !isEscapeEvent) {
		        return;
		      }
		      event.preventDefault(); // todo: v6 revert #37011 & change markup https://getbootstrap.com/docs/5.2/forms/input-group/

		      const getToggleButton = this.matches(SELECTOR_DATA_TOGGLE) ? this : SelectorEngine__default.default.prev(this, SELECTOR_DATA_TOGGLE)[0] || SelectorEngine__default.default.next(this, SELECTOR_DATA_TOGGLE)[0] || SelectorEngine__default.default.findOne(SELECTOR_DATA_TOGGLE, event.delegateTarget.parentNode);
		      const instance = Dropdown.getOrCreateInstance(getToggleButton);
		      if (isUpOrDownEvent) {
		        event.stopPropagation();
		        instance.show();
		        instance._selectMenuItem(event);
		        return;
		      }
		      if (instance._isShown()) {
		        // else is escape and we check if it is shown
		        event.stopPropagation();
		        instance.hide();
		        getToggleButton.focus();
		      }
		    }
		  }
		  /**
		   * Data API implementation
		   */

		  EventHandler__default.default.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_DATA_TOGGLE, Dropdown.dataApiKeydownHandler);
		  EventHandler__default.default.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_MENU, Dropdown.dataApiKeydownHandler);
		  EventHandler__default.default.on(document, EVENT_CLICK_DATA_API, Dropdown.clearMenus);
		  EventHandler__default.default.on(document, EVENT_KEYUP_DATA_API, Dropdown.clearMenus);
		  EventHandler__default.default.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
		    event.preventDefault();
		    Dropdown.getOrCreateInstance(this).toggle();
		  });
		  /**
		   * jQuery
		   */

		  index.defineJQueryPlugin(Dropdown);
		  return Dropdown;
		});
	} (dropdown$1));

	var dropdown = /*@__PURE__*/getDefaultExportFromCjs(dropdown$1.exports);

	var modal$1 = {exports: {}};

	var scrollbar = {exports: {}};

	/*!
	  * Bootstrap scrollbar.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	var hasRequiredScrollbar;

	function requireScrollbar () {
		if (hasRequiredScrollbar) return scrollbar.exports;
		hasRequiredScrollbar = 1;
		(function (module, exports) {
			(function (global, factory) {
			  module.exports = factory(requireSelectorEngine(), requireManipulator(), requireUtil()) ;
			})(commonjsGlobal, function (SelectorEngine, Manipulator, index) {

			  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : {
			    default: e
			  };
			  const SelectorEngine__default = /*#__PURE__*/_interopDefaultLegacy(SelectorEngine);
			  const Manipulator__default = /*#__PURE__*/_interopDefaultLegacy(Manipulator);

			  /**
			   * --------------------------------------------------------------------------
			   * Bootstrap (v5.2.3): util/scrollBar.js
			   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
			   * --------------------------------------------------------------------------
			   */
			  /**
			   * Constants
			   */

			  const SELECTOR_FIXED_CONTENT = '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top';
			  const SELECTOR_STICKY_CONTENT = '.sticky-top';
			  const PROPERTY_PADDING = 'padding-right';
			  const PROPERTY_MARGIN = 'margin-right';
			  /**
			   * Class definition
			   */

			  class ScrollBarHelper {
			    constructor() {
			      this._element = document.body;
			    } // Public

			    getWidth() {
			      // https://developer.mozilla.org/en-US/docs/Web/API/Window/innerWidth#usage_notes
			      const documentWidth = document.documentElement.clientWidth;
			      return Math.abs(window.innerWidth - documentWidth);
			    }
			    hide() {
			      const width = this.getWidth();
			      this._disableOverFlow(); // give padding to element to balance the hidden scrollbar width

			      this._setElementAttributes(this._element, PROPERTY_PADDING, calculatedValue => calculatedValue + width); // trick: We adjust positive paddingRight and negative marginRight to sticky-top elements to keep showing fullwidth

			      this._setElementAttributes(SELECTOR_FIXED_CONTENT, PROPERTY_PADDING, calculatedValue => calculatedValue + width);
			      this._setElementAttributes(SELECTOR_STICKY_CONTENT, PROPERTY_MARGIN, calculatedValue => calculatedValue - width);
			    }
			    reset() {
			      this._resetElementAttributes(this._element, 'overflow');
			      this._resetElementAttributes(this._element, PROPERTY_PADDING);
			      this._resetElementAttributes(SELECTOR_FIXED_CONTENT, PROPERTY_PADDING);
			      this._resetElementAttributes(SELECTOR_STICKY_CONTENT, PROPERTY_MARGIN);
			    }
			    isOverflowing() {
			      return this.getWidth() > 0;
			    } // Private

			    _disableOverFlow() {
			      this._saveInitialAttribute(this._element, 'overflow');
			      this._element.style.overflow = 'hidden';
			    }
			    _setElementAttributes(selector, styleProperty, callback) {
			      const scrollbarWidth = this.getWidth();
			      const manipulationCallBack = element => {
			        if (element !== this._element && window.innerWidth > element.clientWidth + scrollbarWidth) {
			          return;
			        }
			        this._saveInitialAttribute(element, styleProperty);
			        const calculatedValue = window.getComputedStyle(element).getPropertyValue(styleProperty);
			        element.style.setProperty(styleProperty, `${callback(Number.parseFloat(calculatedValue))}px`);
			      };
			      this._applyManipulationCallback(selector, manipulationCallBack);
			    }
			    _saveInitialAttribute(element, styleProperty) {
			      const actualValue = element.style.getPropertyValue(styleProperty);
			      if (actualValue) {
			        Manipulator__default.default.setDataAttribute(element, styleProperty, actualValue);
			      }
			    }
			    _resetElementAttributes(selector, styleProperty) {
			      const manipulationCallBack = element => {
			        const value = Manipulator__default.default.getDataAttribute(element, styleProperty); // We only want to remove the property if the value is `null`; the value can also be zero

			        if (value === null) {
			          element.style.removeProperty(styleProperty);
			          return;
			        }
			        Manipulator__default.default.removeDataAttribute(element, styleProperty);
			        element.style.setProperty(styleProperty, value);
			      };
			      this._applyManipulationCallback(selector, manipulationCallBack);
			    }
			    _applyManipulationCallback(selector, callBack) {
			      if (index.isElement(selector)) {
			        callBack(selector);
			        return;
			      }
			      for (const sel of SelectorEngine__default.default.find(selector, this._element)) {
			        callBack(sel);
			      }
			    }
			  }
			  return ScrollBarHelper;
			});
	} (scrollbar));
		return scrollbar.exports;
	}

	var backdrop = {exports: {}};

	/*!
	  * Bootstrap backdrop.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	var hasRequiredBackdrop;

	function requireBackdrop () {
		if (hasRequiredBackdrop) return backdrop.exports;
		hasRequiredBackdrop = 1;
		(function (module, exports) {
			(function (global, factory) {
			  module.exports = factory(requireEventHandler(), requireUtil(), requireConfig()) ;
			})(commonjsGlobal, function (EventHandler, index, Config) {

			  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : {
			    default: e
			  };
			  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
			  const Config__default = /*#__PURE__*/_interopDefaultLegacy(Config);

			  /**
			   * --------------------------------------------------------------------------
			   * Bootstrap (v5.2.3): util/backdrop.js
			   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
			   * --------------------------------------------------------------------------
			   */
			  /**
			   * Constants
			   */

			  const NAME = 'backdrop';
			  const CLASS_NAME_FADE = 'fade';
			  const CLASS_NAME_SHOW = 'show';
			  const EVENT_MOUSEDOWN = `mousedown.bs.${NAME}`;
			  const Default = {
			    className: 'modal-backdrop',
			    clickCallback: null,
			    isAnimated: false,
			    isVisible: true,
			    // if false, we use the backdrop helper without adding any element to the dom
			    rootElement: 'body' // give the choice to place backdrop under different elements
			  };

			  const DefaultType = {
			    className: 'string',
			    clickCallback: '(function|null)',
			    isAnimated: 'boolean',
			    isVisible: 'boolean',
			    rootElement: '(element|string)'
			  };
			  /**
			   * Class definition
			   */

			  class Backdrop extends Config__default.default {
			    constructor(config) {
			      super();
			      this._config = this._getConfig(config);
			      this._isAppended = false;
			      this._element = null;
			    } // Getters

			    static get Default() {
			      return Default;
			    }
			    static get DefaultType() {
			      return DefaultType;
			    }
			    static get NAME() {
			      return NAME;
			    } // Public

			    show(callback) {
			      if (!this._config.isVisible) {
			        index.execute(callback);
			        return;
			      }
			      this._append();
			      const element = this._getElement();
			      if (this._config.isAnimated) {
			        index.reflow(element);
			      }
			      element.classList.add(CLASS_NAME_SHOW);
			      this._emulateAnimation(() => {
			        index.execute(callback);
			      });
			    }
			    hide(callback) {
			      if (!this._config.isVisible) {
			        index.execute(callback);
			        return;
			      }
			      this._getElement().classList.remove(CLASS_NAME_SHOW);
			      this._emulateAnimation(() => {
			        this.dispose();
			        index.execute(callback);
			      });
			    }
			    dispose() {
			      if (!this._isAppended) {
			        return;
			      }
			      EventHandler__default.default.off(this._element, EVENT_MOUSEDOWN);
			      this._element.remove();
			      this._isAppended = false;
			    } // Private

			    _getElement() {
			      if (!this._element) {
			        const backdrop = document.createElement('div');
			        backdrop.className = this._config.className;
			        if (this._config.isAnimated) {
			          backdrop.classList.add(CLASS_NAME_FADE);
			        }
			        this._element = backdrop;
			      }
			      return this._element;
			    }
			    _configAfterMerge(config) {
			      // use getElement() with the default "body" to get a fresh Element on each instantiation
			      config.rootElement = index.getElement(config.rootElement);
			      return config;
			    }
			    _append() {
			      if (this._isAppended) {
			        return;
			      }
			      const element = this._getElement();
			      this._config.rootElement.append(element);
			      EventHandler__default.default.on(element, EVENT_MOUSEDOWN, () => {
			        index.execute(this._config.clickCallback);
			      });
			      this._isAppended = true;
			    }
			    _emulateAnimation(callback) {
			      index.executeAfterTransition(callback, this._getElement(), this._config.isAnimated);
			    }
			  }
			  return Backdrop;
			});
	} (backdrop));
		return backdrop.exports;
	}

	var focustrap = {exports: {}};

	/*!
	  * Bootstrap focustrap.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	var hasRequiredFocustrap;

	function requireFocustrap () {
		if (hasRequiredFocustrap) return focustrap.exports;
		hasRequiredFocustrap = 1;
		(function (module, exports) {
			(function (global, factory) {
			  module.exports = factory(requireEventHandler(), requireSelectorEngine(), requireConfig()) ;
			})(commonjsGlobal, function (EventHandler, SelectorEngine, Config) {

			  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : {
			    default: e
			  };
			  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
			  const SelectorEngine__default = /*#__PURE__*/_interopDefaultLegacy(SelectorEngine);
			  const Config__default = /*#__PURE__*/_interopDefaultLegacy(Config);

			  /**
			   * --------------------------------------------------------------------------
			   * Bootstrap (v5.2.3): util/focustrap.js
			   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
			   * --------------------------------------------------------------------------
			   */
			  /**
			   * Constants
			   */

			  const NAME = 'focustrap';
			  const DATA_KEY = 'bs.focustrap';
			  const EVENT_KEY = `.${DATA_KEY}`;
			  const EVENT_FOCUSIN = `focusin${EVENT_KEY}`;
			  const EVENT_KEYDOWN_TAB = `keydown.tab${EVENT_KEY}`;
			  const TAB_KEY = 'Tab';
			  const TAB_NAV_FORWARD = 'forward';
			  const TAB_NAV_BACKWARD = 'backward';
			  const Default = {
			    autofocus: true,
			    trapElement: null // The element to trap focus inside of
			  };

			  const DefaultType = {
			    autofocus: 'boolean',
			    trapElement: 'element'
			  };
			  /**
			   * Class definition
			   */

			  class FocusTrap extends Config__default.default {
			    constructor(config) {
			      super();
			      this._config = this._getConfig(config);
			      this._isActive = false;
			      this._lastTabNavDirection = null;
			    } // Getters

			    static get Default() {
			      return Default;
			    }
			    static get DefaultType() {
			      return DefaultType;
			    }
			    static get NAME() {
			      return NAME;
			    } // Public

			    activate() {
			      if (this._isActive) {
			        return;
			      }
			      if (this._config.autofocus) {
			        this._config.trapElement.focus();
			      }
			      EventHandler__default.default.off(document, EVENT_KEY); // guard against infinite focus loop

			      EventHandler__default.default.on(document, EVENT_FOCUSIN, event => this._handleFocusin(event));
			      EventHandler__default.default.on(document, EVENT_KEYDOWN_TAB, event => this._handleKeydown(event));
			      this._isActive = true;
			    }
			    deactivate() {
			      if (!this._isActive) {
			        return;
			      }
			      this._isActive = false;
			      EventHandler__default.default.off(document, EVENT_KEY);
			    } // Private

			    _handleFocusin(event) {
			      const {
			        trapElement
			      } = this._config;
			      if (event.target === document || event.target === trapElement || trapElement.contains(event.target)) {
			        return;
			      }
			      const elements = SelectorEngine__default.default.focusableChildren(trapElement);
			      if (elements.length === 0) {
			        trapElement.focus();
			      } else if (this._lastTabNavDirection === TAB_NAV_BACKWARD) {
			        elements[elements.length - 1].focus();
			      } else {
			        elements[0].focus();
			      }
			    }
			    _handleKeydown(event) {
			      if (event.key !== TAB_KEY) {
			        return;
			      }
			      this._lastTabNavDirection = event.shiftKey ? TAB_NAV_BACKWARD : TAB_NAV_FORWARD;
			    }
			  }
			  return FocusTrap;
			});
	} (focustrap));
		return focustrap.exports;
	}

	/*!
	  * Bootstrap modal.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
		(function (global, factory) {
		  module.exports = factory(requireUtil(), requireEventHandler(), requireSelectorEngine(), requireScrollbar(), requireBaseComponent(), requireBackdrop(), requireFocustrap(), requireComponentFunctions()) ;
		})(commonjsGlobal, function (index, EventHandler, SelectorEngine, ScrollBarHelper, BaseComponent, Backdrop, FocusTrap, componentFunctions) {

		  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : {
		    default: e
		  };
		  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
		  const SelectorEngine__default = /*#__PURE__*/_interopDefaultLegacy(SelectorEngine);
		  const ScrollBarHelper__default = /*#__PURE__*/_interopDefaultLegacy(ScrollBarHelper);
		  const BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
		  const Backdrop__default = /*#__PURE__*/_interopDefaultLegacy(Backdrop);
		  const FocusTrap__default = /*#__PURE__*/_interopDefaultLegacy(FocusTrap);

		  /**
		   * --------------------------------------------------------------------------
		   * Bootstrap (v5.2.3): modal.js
		   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
		   * --------------------------------------------------------------------------
		   */
		  /**
		   * Constants
		   */

		  const NAME = 'modal';
		  const DATA_KEY = 'bs.modal';
		  const EVENT_KEY = `.${DATA_KEY}`;
		  const DATA_API_KEY = '.data-api';
		  const ESCAPE_KEY = 'Escape';
		  const EVENT_HIDE = `hide${EVENT_KEY}`;
		  const EVENT_HIDE_PREVENTED = `hidePrevented${EVENT_KEY}`;
		  const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
		  const EVENT_SHOW = `show${EVENT_KEY}`;
		  const EVENT_SHOWN = `shown${EVENT_KEY}`;
		  const EVENT_RESIZE = `resize${EVENT_KEY}`;
		  const EVENT_CLICK_DISMISS = `click.dismiss${EVENT_KEY}`;
		  const EVENT_MOUSEDOWN_DISMISS = `mousedown.dismiss${EVENT_KEY}`;
		  const EVENT_KEYDOWN_DISMISS = `keydown.dismiss${EVENT_KEY}`;
		  const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`;
		  const CLASS_NAME_OPEN = 'modal-open';
		  const CLASS_NAME_FADE = 'fade';
		  const CLASS_NAME_SHOW = 'show';
		  const CLASS_NAME_STATIC = 'modal-static';
		  const OPEN_SELECTOR = '.modal.show';
		  const SELECTOR_DIALOG = '.modal-dialog';
		  const SELECTOR_MODAL_BODY = '.modal-body';
		  const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="modal"]';
		  const Default = {
		    backdrop: true,
		    focus: true,
		    keyboard: true
		  };
		  const DefaultType = {
		    backdrop: '(boolean|string)',
		    focus: 'boolean',
		    keyboard: 'boolean'
		  };
		  /**
		   * Class definition
		   */

		  class Modal extends BaseComponent__default.default {
		    constructor(element, config) {
		      super(element, config);
		      this._dialog = SelectorEngine__default.default.findOne(SELECTOR_DIALOG, this._element);
		      this._backdrop = this._initializeBackDrop();
		      this._focustrap = this._initializeFocusTrap();
		      this._isShown = false;
		      this._isTransitioning = false;
		      this._scrollBar = new ScrollBarHelper__default.default();
		      this._addEventListeners();
		    } // Getters

		    static get Default() {
		      return Default;
		    }
		    static get DefaultType() {
		      return DefaultType;
		    }
		    static get NAME() {
		      return NAME;
		    } // Public

		    toggle(relatedTarget) {
		      return this._isShown ? this.hide() : this.show(relatedTarget);
		    }
		    show(relatedTarget) {
		      if (this._isShown || this._isTransitioning) {
		        return;
		      }
		      const showEvent = EventHandler__default.default.trigger(this._element, EVENT_SHOW, {
		        relatedTarget
		      });
		      if (showEvent.defaultPrevented) {
		        return;
		      }
		      this._isShown = true;
		      this._isTransitioning = true;
		      this._scrollBar.hide();
		      document.body.classList.add(CLASS_NAME_OPEN);
		      this._adjustDialog();
		      this._backdrop.show(() => this._showElement(relatedTarget));
		    }
		    hide() {
		      if (!this._isShown || this._isTransitioning) {
		        return;
		      }
		      const hideEvent = EventHandler__default.default.trigger(this._element, EVENT_HIDE);
		      if (hideEvent.defaultPrevented) {
		        return;
		      }
		      this._isShown = false;
		      this._isTransitioning = true;
		      this._focustrap.deactivate();
		      this._element.classList.remove(CLASS_NAME_SHOW);
		      this._queueCallback(() => this._hideModal(), this._element, this._isAnimated());
		    }
		    dispose() {
		      for (const htmlElement of [window, this._dialog]) {
		        EventHandler__default.default.off(htmlElement, EVENT_KEY);
		      }
		      this._backdrop.dispose();
		      this._focustrap.deactivate();
		      super.dispose();
		    }
		    handleUpdate() {
		      this._adjustDialog();
		    } // Private

		    _initializeBackDrop() {
		      return new Backdrop__default.default({
		        isVisible: Boolean(this._config.backdrop),
		        // 'static' option will be translated to true, and booleans will keep their value,
		        isAnimated: this._isAnimated()
		      });
		    }
		    _initializeFocusTrap() {
		      return new FocusTrap__default.default({
		        trapElement: this._element
		      });
		    }
		    _showElement(relatedTarget) {
		      // try to append dynamic modal
		      if (!document.body.contains(this._element)) {
		        document.body.append(this._element);
		      }
		      this._element.style.display = 'block';
		      this._element.removeAttribute('aria-hidden');
		      this._element.setAttribute('aria-modal', true);
		      this._element.setAttribute('role', 'dialog');
		      this._element.scrollTop = 0;
		      const modalBody = SelectorEngine__default.default.findOne(SELECTOR_MODAL_BODY, this._dialog);
		      if (modalBody) {
		        modalBody.scrollTop = 0;
		      }
		      index.reflow(this._element);
		      this._element.classList.add(CLASS_NAME_SHOW);
		      const transitionComplete = () => {
		        if (this._config.focus) {
		          this._focustrap.activate();
		        }
		        this._isTransitioning = false;
		        EventHandler__default.default.trigger(this._element, EVENT_SHOWN, {
		          relatedTarget
		        });
		      };
		      this._queueCallback(transitionComplete, this._dialog, this._isAnimated());
		    }
		    _addEventListeners() {
		      EventHandler__default.default.on(this._element, EVENT_KEYDOWN_DISMISS, event => {
		        if (event.key !== ESCAPE_KEY) {
		          return;
		        }
		        if (this._config.keyboard) {
		          event.preventDefault();
		          this.hide();
		          return;
		        }
		        this._triggerBackdropTransition();
		      });
		      EventHandler__default.default.on(window, EVENT_RESIZE, () => {
		        if (this._isShown && !this._isTransitioning) {
		          this._adjustDialog();
		        }
		      });
		      EventHandler__default.default.on(this._element, EVENT_MOUSEDOWN_DISMISS, event => {
		        // a bad trick to segregate clicks that may start inside dialog but end outside, and avoid listen to scrollbar clicks
		        EventHandler__default.default.one(this._element, EVENT_CLICK_DISMISS, event2 => {
		          if (this._element !== event.target || this._element !== event2.target) {
		            return;
		          }
		          if (this._config.backdrop === 'static') {
		            this._triggerBackdropTransition();
		            return;
		          }
		          if (this._config.backdrop) {
		            this.hide();
		          }
		        });
		      });
		    }
		    _hideModal() {
		      this._element.style.display = 'none';
		      this._element.setAttribute('aria-hidden', true);
		      this._element.removeAttribute('aria-modal');
		      this._element.removeAttribute('role');
		      this._isTransitioning = false;
		      this._backdrop.hide(() => {
		        document.body.classList.remove(CLASS_NAME_OPEN);
		        this._resetAdjustments();
		        this._scrollBar.reset();
		        EventHandler__default.default.trigger(this._element, EVENT_HIDDEN);
		      });
		    }
		    _isAnimated() {
		      return this._element.classList.contains(CLASS_NAME_FADE);
		    }
		    _triggerBackdropTransition() {
		      const hideEvent = EventHandler__default.default.trigger(this._element, EVENT_HIDE_PREVENTED);
		      if (hideEvent.defaultPrevented) {
		        return;
		      }
		      const isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;
		      const initialOverflowY = this._element.style.overflowY; // return if the following background transition hasn't yet completed

		      if (initialOverflowY === 'hidden' || this._element.classList.contains(CLASS_NAME_STATIC)) {
		        return;
		      }
		      if (!isModalOverflowing) {
		        this._element.style.overflowY = 'hidden';
		      }
		      this._element.classList.add(CLASS_NAME_STATIC);
		      this._queueCallback(() => {
		        this._element.classList.remove(CLASS_NAME_STATIC);
		        this._queueCallback(() => {
		          this._element.style.overflowY = initialOverflowY;
		        }, this._dialog);
		      }, this._dialog);
		      this._element.focus();
		    }
		    /**
		     * The following methods are used to handle overflowing modals
		     */

		    _adjustDialog() {
		      const isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;
		      const scrollbarWidth = this._scrollBar.getWidth();
		      const isBodyOverflowing = scrollbarWidth > 0;
		      if (isBodyOverflowing && !isModalOverflowing) {
		        const property = index.isRTL() ? 'paddingLeft' : 'paddingRight';
		        this._element.style[property] = `${scrollbarWidth}px`;
		      }
		      if (!isBodyOverflowing && isModalOverflowing) {
		        const property = index.isRTL() ? 'paddingRight' : 'paddingLeft';
		        this._element.style[property] = `${scrollbarWidth}px`;
		      }
		    }
		    _resetAdjustments() {
		      this._element.style.paddingLeft = '';
		      this._element.style.paddingRight = '';
		    } // Static

		    static jQueryInterface(config, relatedTarget) {
		      return this.each(function () {
		        const data = Modal.getOrCreateInstance(this, config);
		        if (typeof config !== 'string') {
		          return;
		        }
		        if (typeof data[config] === 'undefined') {
		          throw new TypeError(`No method named "${config}"`);
		        }
		        data[config](relatedTarget);
		      });
		    }
		  }
		  /**
		   * Data API implementation
		   */

		  EventHandler__default.default.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
		    const target = index.getElementFromSelector(this);
		    if (['A', 'AREA'].includes(this.tagName)) {
		      event.preventDefault();
		    }
		    EventHandler__default.default.one(target, EVENT_SHOW, showEvent => {
		      if (showEvent.defaultPrevented) {
		        // only register focus restorer if modal will actually get shown
		        return;
		      }
		      EventHandler__default.default.one(target, EVENT_HIDDEN, () => {
		        if (index.isVisible(this)) {
		          this.focus();
		        }
		      });
		    }); // avoid conflict when clicking modal toggler while another one is open

		    const alreadyOpen = SelectorEngine__default.default.findOne(OPEN_SELECTOR);
		    if (alreadyOpen) {
		      Modal.getInstance(alreadyOpen).hide();
		    }
		    const data = Modal.getOrCreateInstance(target);
		    data.toggle(this);
		  });
		  componentFunctions.enableDismissTrigger(Modal);
		  /**
		   * jQuery
		   */

		  index.defineJQueryPlugin(Modal);
		  return Modal;
		});
	} (modal$1));

	var modal = modal$1.exports;

	var offcanvas$1 = {exports: {}};

	/*!
	  * Bootstrap offcanvas.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
		(function (global, factory) {
		  module.exports = factory(requireUtil(), requireScrollbar(), requireEventHandler(), requireBaseComponent(), requireSelectorEngine(), requireBackdrop(), requireFocustrap(), requireComponentFunctions()) ;
		})(commonjsGlobal, function (index, ScrollBarHelper, EventHandler, BaseComponent, SelectorEngine, Backdrop, FocusTrap, componentFunctions) {

		  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : {
		    default: e
		  };
		  const ScrollBarHelper__default = /*#__PURE__*/_interopDefaultLegacy(ScrollBarHelper);
		  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
		  const BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
		  const SelectorEngine__default = /*#__PURE__*/_interopDefaultLegacy(SelectorEngine);
		  const Backdrop__default = /*#__PURE__*/_interopDefaultLegacy(Backdrop);
		  const FocusTrap__default = /*#__PURE__*/_interopDefaultLegacy(FocusTrap);

		  /**
		   * --------------------------------------------------------------------------
		   * Bootstrap (v5.2.3): offcanvas.js
		   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
		   * --------------------------------------------------------------------------
		   */
		  /**
		   * Constants
		   */

		  const NAME = 'offcanvas';
		  const DATA_KEY = 'bs.offcanvas';
		  const EVENT_KEY = `.${DATA_KEY}`;
		  const DATA_API_KEY = '.data-api';
		  const EVENT_LOAD_DATA_API = `load${EVENT_KEY}${DATA_API_KEY}`;
		  const ESCAPE_KEY = 'Escape';
		  const CLASS_NAME_SHOW = 'show';
		  const CLASS_NAME_SHOWING = 'showing';
		  const CLASS_NAME_HIDING = 'hiding';
		  const CLASS_NAME_BACKDROP = 'offcanvas-backdrop';
		  const OPEN_SELECTOR = '.offcanvas.show';
		  const EVENT_SHOW = `show${EVENT_KEY}`;
		  const EVENT_SHOWN = `shown${EVENT_KEY}`;
		  const EVENT_HIDE = `hide${EVENT_KEY}`;
		  const EVENT_HIDE_PREVENTED = `hidePrevented${EVENT_KEY}`;
		  const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
		  const EVENT_RESIZE = `resize${EVENT_KEY}`;
		  const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`;
		  const EVENT_KEYDOWN_DISMISS = `keydown.dismiss${EVENT_KEY}`;
		  const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="offcanvas"]';
		  const Default = {
		    backdrop: true,
		    keyboard: true,
		    scroll: false
		  };
		  const DefaultType = {
		    backdrop: '(boolean|string)',
		    keyboard: 'boolean',
		    scroll: 'boolean'
		  };
		  /**
		   * Class definition
		   */

		  class Offcanvas extends BaseComponent__default.default {
		    constructor(element, config) {
		      super(element, config);
		      this._isShown = false;
		      this._backdrop = this._initializeBackDrop();
		      this._focustrap = this._initializeFocusTrap();
		      this._addEventListeners();
		    } // Getters

		    static get Default() {
		      return Default;
		    }
		    static get DefaultType() {
		      return DefaultType;
		    }
		    static get NAME() {
		      return NAME;
		    } // Public

		    toggle(relatedTarget) {
		      return this._isShown ? this.hide() : this.show(relatedTarget);
		    }
		    show(relatedTarget) {
		      if (this._isShown) {
		        return;
		      }
		      const showEvent = EventHandler__default.default.trigger(this._element, EVENT_SHOW, {
		        relatedTarget
		      });
		      if (showEvent.defaultPrevented) {
		        return;
		      }
		      this._isShown = true;
		      this._backdrop.show();
		      if (!this._config.scroll) {
		        new ScrollBarHelper__default.default().hide();
		      }
		      this._element.setAttribute('aria-modal', true);
		      this._element.setAttribute('role', 'dialog');
		      this._element.classList.add(CLASS_NAME_SHOWING);
		      const completeCallBack = () => {
		        if (!this._config.scroll || this._config.backdrop) {
		          this._focustrap.activate();
		        }
		        this._element.classList.add(CLASS_NAME_SHOW);
		        this._element.classList.remove(CLASS_NAME_SHOWING);
		        EventHandler__default.default.trigger(this._element, EVENT_SHOWN, {
		          relatedTarget
		        });
		      };
		      this._queueCallback(completeCallBack, this._element, true);
		    }
		    hide() {
		      if (!this._isShown) {
		        return;
		      }
		      const hideEvent = EventHandler__default.default.trigger(this._element, EVENT_HIDE);
		      if (hideEvent.defaultPrevented) {
		        return;
		      }
		      this._focustrap.deactivate();
		      this._element.blur();
		      this._isShown = false;
		      this._element.classList.add(CLASS_NAME_HIDING);
		      this._backdrop.hide();
		      const completeCallback = () => {
		        this._element.classList.remove(CLASS_NAME_SHOW, CLASS_NAME_HIDING);
		        this._element.removeAttribute('aria-modal');
		        this._element.removeAttribute('role');
		        if (!this._config.scroll) {
		          new ScrollBarHelper__default.default().reset();
		        }
		        EventHandler__default.default.trigger(this._element, EVENT_HIDDEN);
		      };
		      this._queueCallback(completeCallback, this._element, true);
		    }
		    dispose() {
		      this._backdrop.dispose();
		      this._focustrap.deactivate();
		      super.dispose();
		    } // Private

		    _initializeBackDrop() {
		      const clickCallback = () => {
		        if (this._config.backdrop === 'static') {
		          EventHandler__default.default.trigger(this._element, EVENT_HIDE_PREVENTED);
		          return;
		        }
		        this.hide();
		      }; // 'static' option will be translated to true, and booleans will keep their value

		      const isVisible = Boolean(this._config.backdrop);
		      return new Backdrop__default.default({
		        className: CLASS_NAME_BACKDROP,
		        isVisible,
		        isAnimated: true,
		        rootElement: this._element.parentNode,
		        clickCallback: isVisible ? clickCallback : null
		      });
		    }
		    _initializeFocusTrap() {
		      return new FocusTrap__default.default({
		        trapElement: this._element
		      });
		    }
		    _addEventListeners() {
		      EventHandler__default.default.on(this._element, EVENT_KEYDOWN_DISMISS, event => {
		        if (event.key !== ESCAPE_KEY) {
		          return;
		        }
		        if (!this._config.keyboard) {
		          EventHandler__default.default.trigger(this._element, EVENT_HIDE_PREVENTED);
		          return;
		        }
		        this.hide();
		      });
		    } // Static

		    static jQueryInterface(config) {
		      return this.each(function () {
		        const data = Offcanvas.getOrCreateInstance(this, config);
		        if (typeof config !== 'string') {
		          return;
		        }
		        if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
		          throw new TypeError(`No method named "${config}"`);
		        }
		        data[config](this);
		      });
		    }
		  }
		  /**
		   * Data API implementation
		   */

		  EventHandler__default.default.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
		    const target = index.getElementFromSelector(this);
		    if (['A', 'AREA'].includes(this.tagName)) {
		      event.preventDefault();
		    }
		    if (index.isDisabled(this)) {
		      return;
		    }
		    EventHandler__default.default.one(target, EVENT_HIDDEN, () => {
		      // focus on trigger when it is closed
		      if (index.isVisible(this)) {
		        this.focus();
		      }
		    }); // avoid conflict when clicking a toggler of an offcanvas, while another is open

		    const alreadyOpen = SelectorEngine__default.default.findOne(OPEN_SELECTOR);
		    if (alreadyOpen && alreadyOpen !== target) {
		      Offcanvas.getInstance(alreadyOpen).hide();
		    }
		    const data = Offcanvas.getOrCreateInstance(target);
		    data.toggle(this);
		  });
		  EventHandler__default.default.on(window, EVENT_LOAD_DATA_API, () => {
		    for (const selector of SelectorEngine__default.default.find(OPEN_SELECTOR)) {
		      Offcanvas.getOrCreateInstance(selector).show();
		    }
		  });
		  EventHandler__default.default.on(window, EVENT_RESIZE, () => {
		    for (const element of SelectorEngine__default.default.find('[aria-modal][class*=show][class*=offcanvas-]')) {
		      if (getComputedStyle(element).position !== 'fixed') {
		        Offcanvas.getOrCreateInstance(element).hide();
		      }
		    }
		  });
		  componentFunctions.enableDismissTrigger(Offcanvas);
		  /**
		   * jQuery
		   */

		  index.defineJQueryPlugin(Offcanvas);
		  return Offcanvas;
		});
	} (offcanvas$1));

	var offcanvas = offcanvas$1.exports;

	var popover$1 = {exports: {}};

	var tooltip$1 = {exports: {}};

	var sanitizer = {exports: {}};

	/*!
	  * Bootstrap sanitizer.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	var hasRequiredSanitizer;

	function requireSanitizer () {
		if (hasRequiredSanitizer) return sanitizer.exports;
		hasRequiredSanitizer = 1;
		(function (module, exports) {
			(function (global, factory) {
			  factory(exports) ;
			})(commonjsGlobal, function (exports) {

			  /**
			   * --------------------------------------------------------------------------
			   * Bootstrap (v5.2.3): util/sanitizer.js
			   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
			   * --------------------------------------------------------------------------
			   */
			  const uriAttributes = new Set(['background', 'cite', 'href', 'itemtype', 'longdesc', 'poster', 'src', 'xlink:href']);
			  const ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;
			  /**
			   * A pattern that recognizes a commonly useful subset of URLs that are safe.
			   *
			   * Shout-out to Angular https://github.com/angular/angular/blob/12.2.x/packages/core/src/sanitization/url_sanitizer.ts
			   */

			  const SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file|sms):|[^#&/:?]*(?:[#/?]|$))/i;
			  /**
			   * A pattern that matches safe data URLs. Only matches image, video and audio types.
			   *
			   * Shout-out to Angular https://github.com/angular/angular/blob/12.2.x/packages/core/src/sanitization/url_sanitizer.ts
			   */

			  const DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i;
			  const allowedAttribute = (attribute, allowedAttributeList) => {
			    const attributeName = attribute.nodeName.toLowerCase();
			    if (allowedAttributeList.includes(attributeName)) {
			      if (uriAttributes.has(attributeName)) {
			        return Boolean(SAFE_URL_PATTERN.test(attribute.nodeValue) || DATA_URL_PATTERN.test(attribute.nodeValue));
			      }
			      return true;
			    } // Check if a regular expression validates the attribute.

			    return allowedAttributeList.filter(attributeRegex => attributeRegex instanceof RegExp).some(regex => regex.test(attributeName));
			  };
			  const DefaultAllowlist = {
			    // Global attributes allowed on any supplied element below.
			    '*': ['class', 'dir', 'id', 'lang', 'role', ARIA_ATTRIBUTE_PATTERN],
			    a: ['target', 'href', 'title', 'rel'],
			    area: [],
			    b: [],
			    br: [],
			    col: [],
			    code: [],
			    div: [],
			    em: [],
			    hr: [],
			    h1: [],
			    h2: [],
			    h3: [],
			    h4: [],
			    h5: [],
			    h6: [],
			    i: [],
			    img: ['src', 'srcset', 'alt', 'title', 'width', 'height'],
			    li: [],
			    ol: [],
			    p: [],
			    pre: [],
			    s: [],
			    small: [],
			    span: [],
			    sub: [],
			    sup: [],
			    strong: [],
			    u: [],
			    ul: []
			  };
			  function sanitizeHtml(unsafeHtml, allowList, sanitizeFunction) {
			    if (!unsafeHtml.length) {
			      return unsafeHtml;
			    }
			    if (sanitizeFunction && typeof sanitizeFunction === 'function') {
			      return sanitizeFunction(unsafeHtml);
			    }
			    const domParser = new window.DOMParser();
			    const createdDocument = domParser.parseFromString(unsafeHtml, 'text/html');
			    const elements = [].concat(...createdDocument.body.querySelectorAll('*'));
			    for (const element of elements) {
			      const elementName = element.nodeName.toLowerCase();
			      if (!Object.keys(allowList).includes(elementName)) {
			        element.remove();
			        continue;
			      }
			      const attributeList = [].concat(...element.attributes);
			      const allowedAttributes = [].concat(allowList['*'] || [], allowList[elementName] || []);
			      for (const attribute of attributeList) {
			        if (!allowedAttribute(attribute, allowedAttributes)) {
			          element.removeAttribute(attribute.nodeName);
			        }
			      }
			    }
			    return createdDocument.body.innerHTML;
			  }
			  exports.DefaultAllowlist = DefaultAllowlist;
			  exports.sanitizeHtml = sanitizeHtml;
			  Object.defineProperties(exports, {
			    __esModule: {
			      value: true
			    },
			    [Symbol.toStringTag]: {
			      value: 'Module'
			    }
			  });
			});
	} (sanitizer, sanitizer.exports));
		return sanitizer.exports;
	}

	var templateFactory = {exports: {}};

	/*!
	  * Bootstrap template-factory.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	var hasRequiredTemplateFactory;

	function requireTemplateFactory () {
		if (hasRequiredTemplateFactory) return templateFactory.exports;
		hasRequiredTemplateFactory = 1;
		(function (module, exports) {
			(function (global, factory) {
			  module.exports = factory(requireSanitizer(), requireUtil(), requireSelectorEngine(), requireConfig()) ;
			})(commonjsGlobal, function (sanitizer, index, SelectorEngine, Config) {

			  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : {
			    default: e
			  };
			  const SelectorEngine__default = /*#__PURE__*/_interopDefaultLegacy(SelectorEngine);
			  const Config__default = /*#__PURE__*/_interopDefaultLegacy(Config);

			  /**
			   * --------------------------------------------------------------------------
			   * Bootstrap (v5.2.3): util/template-factory.js
			   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
			   * --------------------------------------------------------------------------
			   */
			  /**
			   * Constants
			   */

			  const NAME = 'TemplateFactory';
			  const Default = {
			    allowList: sanitizer.DefaultAllowlist,
			    content: {},
			    // { selector : text ,  selector2 : text2 , }
			    extraClass: '',
			    html: false,
			    sanitize: true,
			    sanitizeFn: null,
			    template: '<div></div>'
			  };
			  const DefaultType = {
			    allowList: 'object',
			    content: 'object',
			    extraClass: '(string|function)',
			    html: 'boolean',
			    sanitize: 'boolean',
			    sanitizeFn: '(null|function)',
			    template: 'string'
			  };
			  const DefaultContentType = {
			    entry: '(string|element|function|null)',
			    selector: '(string|element)'
			  };
			  /**
			   * Class definition
			   */

			  class TemplateFactory extends Config__default.default {
			    constructor(config) {
			      super();
			      this._config = this._getConfig(config);
			    } // Getters

			    static get Default() {
			      return Default;
			    }
			    static get DefaultType() {
			      return DefaultType;
			    }
			    static get NAME() {
			      return NAME;
			    } // Public

			    getContent() {
			      return Object.values(this._config.content).map(config => this._resolvePossibleFunction(config)).filter(Boolean);
			    }
			    hasContent() {
			      return this.getContent().length > 0;
			    }
			    changeContent(content) {
			      this._checkContent(content);
			      this._config.content = {
			        ...this._config.content,
			        ...content
			      };
			      return this;
			    }
			    toHtml() {
			      const templateWrapper = document.createElement('div');
			      templateWrapper.innerHTML = this._maybeSanitize(this._config.template);
			      for (const [selector, text] of Object.entries(this._config.content)) {
			        this._setContent(templateWrapper, text, selector);
			      }
			      const template = templateWrapper.children[0];
			      const extraClass = this._resolvePossibleFunction(this._config.extraClass);
			      if (extraClass) {
			        template.classList.add(...extraClass.split(' '));
			      }
			      return template;
			    } // Private

			    _typeCheckConfig(config) {
			      super._typeCheckConfig(config);
			      this._checkContent(config.content);
			    }
			    _checkContent(arg) {
			      for (const [selector, content] of Object.entries(arg)) {
			        super._typeCheckConfig({
			          selector,
			          entry: content
			        }, DefaultContentType);
			      }
			    }
			    _setContent(template, content, selector) {
			      const templateElement = SelectorEngine__default.default.findOne(selector, template);
			      if (!templateElement) {
			        return;
			      }
			      content = this._resolvePossibleFunction(content);
			      if (!content) {
			        templateElement.remove();
			        return;
			      }
			      if (index.isElement(content)) {
			        this._putElementInTemplate(index.getElement(content), templateElement);
			        return;
			      }
			      if (this._config.html) {
			        templateElement.innerHTML = this._maybeSanitize(content);
			        return;
			      }
			      templateElement.textContent = content;
			    }
			    _maybeSanitize(arg) {
			      return this._config.sanitize ? sanitizer.sanitizeHtml(arg, this._config.allowList, this._config.sanitizeFn) : arg;
			    }
			    _resolvePossibleFunction(arg) {
			      return typeof arg === 'function' ? arg(this) : arg;
			    }
			    _putElementInTemplate(element, templateElement) {
			      if (this._config.html) {
			        templateElement.innerHTML = '';
			        templateElement.append(element);
			        return;
			      }
			      templateElement.textContent = element.textContent;
			    }
			  }
			  return TemplateFactory;
			});
	} (templateFactory));
		return templateFactory.exports;
	}

	/*!
	  * Bootstrap tooltip.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
		(function (global, factory) {
		  module.exports = factory(require$$0, requireUtil(), requireSanitizer(), requireEventHandler(), requireManipulator(), requireBaseComponent(), requireTemplateFactory()) ;
		})(commonjsGlobal, function (Popper, index, sanitizer, EventHandler, Manipulator, BaseComponent, TemplateFactory) {

		  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : {
		    default: e
		  };
		  function _interopNamespace(e) {
		    if (e && e.__esModule) return e;
		    const n = Object.create(null, {
		      [Symbol.toStringTag]: {
		        value: 'Module'
		      }
		    });
		    if (e) {
		      for (const k in e) {
		        if (k !== 'default') {
		          const d = Object.getOwnPropertyDescriptor(e, k);
		          Object.defineProperty(n, k, d.get ? d : {
		            enumerable: true,
		            get: () => e[k]
		          });
		        }
		      }
		    }
		    n.default = e;
		    return Object.freeze(n);
		  }
		  const Popper__namespace = /*#__PURE__*/_interopNamespace(Popper);
		  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
		  const Manipulator__default = /*#__PURE__*/_interopDefaultLegacy(Manipulator);
		  const BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
		  const TemplateFactory__default = /*#__PURE__*/_interopDefaultLegacy(TemplateFactory);

		  /**
		   * --------------------------------------------------------------------------
		   * Bootstrap (v5.2.3): tooltip.js
		   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
		   * --------------------------------------------------------------------------
		   */
		  /**
		   * Constants
		   */

		  const NAME = 'tooltip';
		  const DISALLOWED_ATTRIBUTES = new Set(['sanitize', 'allowList', 'sanitizeFn']);
		  const CLASS_NAME_FADE = 'fade';
		  const CLASS_NAME_MODAL = 'modal';
		  const CLASS_NAME_SHOW = 'show';
		  const SELECTOR_TOOLTIP_INNER = '.tooltip-inner';
		  const SELECTOR_MODAL = `.${CLASS_NAME_MODAL}`;
		  const EVENT_MODAL_HIDE = 'hide.bs.modal';
		  const TRIGGER_HOVER = 'hover';
		  const TRIGGER_FOCUS = 'focus';
		  const TRIGGER_CLICK = 'click';
		  const TRIGGER_MANUAL = 'manual';
		  const EVENT_HIDE = 'hide';
		  const EVENT_HIDDEN = 'hidden';
		  const EVENT_SHOW = 'show';
		  const EVENT_SHOWN = 'shown';
		  const EVENT_INSERTED = 'inserted';
		  const EVENT_CLICK = 'click';
		  const EVENT_FOCUSIN = 'focusin';
		  const EVENT_FOCUSOUT = 'focusout';
		  const EVENT_MOUSEENTER = 'mouseenter';
		  const EVENT_MOUSELEAVE = 'mouseleave';
		  const AttachmentMap = {
		    AUTO: 'auto',
		    TOP: 'top',
		    RIGHT: index.isRTL() ? 'left' : 'right',
		    BOTTOM: 'bottom',
		    LEFT: index.isRTL() ? 'right' : 'left'
		  };
		  const Default = {
		    allowList: sanitizer.DefaultAllowlist,
		    animation: true,
		    boundary: 'clippingParents',
		    container: false,
		    customClass: '',
		    delay: 0,
		    fallbackPlacements: ['top', 'right', 'bottom', 'left'],
		    html: false,
		    offset: [0, 0],
		    placement: 'top',
		    popperConfig: null,
		    sanitize: true,
		    sanitizeFn: null,
		    selector: false,
		    template: '<div class="tooltip" role="tooltip">' + '<div class="tooltip-arrow"></div>' + '<div class="tooltip-inner"></div>' + '</div>',
		    title: '',
		    trigger: 'hover focus'
		  };
		  const DefaultType = {
		    allowList: 'object',
		    animation: 'boolean',
		    boundary: '(string|element)',
		    container: '(string|element|boolean)',
		    customClass: '(string|function)',
		    delay: '(number|object)',
		    fallbackPlacements: 'array',
		    html: 'boolean',
		    offset: '(array|string|function)',
		    placement: '(string|function)',
		    popperConfig: '(null|object|function)',
		    sanitize: 'boolean',
		    sanitizeFn: '(null|function)',
		    selector: '(string|boolean)',
		    template: 'string',
		    title: '(string|element|function)',
		    trigger: 'string'
		  };
		  /**
		   * Class definition
		   */

		  class Tooltip extends BaseComponent__default.default {
		    constructor(element, config) {
		      if (typeof Popper__namespace === 'undefined') {
		        throw new TypeError('Bootstrap\'s tooltips require Popper (https://popper.js.org)');
		      }
		      super(element, config); // Private

		      this._isEnabled = true;
		      this._timeout = 0;
		      this._isHovered = null;
		      this._activeTrigger = {};
		      this._popper = null;
		      this._templateFactory = null;
		      this._newContent = null; // Protected

		      this.tip = null;
		      this._setListeners();
		      if (!this._config.selector) {
		        this._fixTitle();
		      }
		    } // Getters

		    static get Default() {
		      return Default;
		    }
		    static get DefaultType() {
		      return DefaultType;
		    }
		    static get NAME() {
		      return NAME;
		    } // Public

		    enable() {
		      this._isEnabled = true;
		    }
		    disable() {
		      this._isEnabled = false;
		    }
		    toggleEnabled() {
		      this._isEnabled = !this._isEnabled;
		    }
		    toggle() {
		      if (!this._isEnabled) {
		        return;
		      }
		      this._activeTrigger.click = !this._activeTrigger.click;
		      if (this._isShown()) {
		        this._leave();
		        return;
		      }
		      this._enter();
		    }
		    dispose() {
		      clearTimeout(this._timeout);
		      EventHandler__default.default.off(this._element.closest(SELECTOR_MODAL), EVENT_MODAL_HIDE, this._hideModalHandler);
		      if (this._element.getAttribute('data-bs-original-title')) {
		        this._element.setAttribute('title', this._element.getAttribute('data-bs-original-title'));
		      }
		      this._disposePopper();
		      super.dispose();
		    }
		    show() {
		      if (this._element.style.display === 'none') {
		        throw new Error('Please use show on visible elements');
		      }
		      if (!(this._isWithContent() && this._isEnabled)) {
		        return;
		      }
		      const showEvent = EventHandler__default.default.trigger(this._element, this.constructor.eventName(EVENT_SHOW));
		      const shadowRoot = index.findShadowRoot(this._element);
		      const isInTheDom = (shadowRoot || this._element.ownerDocument.documentElement).contains(this._element);
		      if (showEvent.defaultPrevented || !isInTheDom) {
		        return;
		      } // todo v6 remove this OR make it optional

		      this._disposePopper();
		      const tip = this._getTipElement();
		      this._element.setAttribute('aria-describedby', tip.getAttribute('id'));
		      const {
		        container
		      } = this._config;
		      if (!this._element.ownerDocument.documentElement.contains(this.tip)) {
		        container.append(tip);
		        EventHandler__default.default.trigger(this._element, this.constructor.eventName(EVENT_INSERTED));
		      }
		      this._popper = this._createPopper(tip);
		      tip.classList.add(CLASS_NAME_SHOW); // If this is a touch-enabled device we add extra
		      // empty mouseover listeners to the body's immediate children;
		      // only needed because of broken event delegation on iOS
		      // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html

		      if ('ontouchstart' in document.documentElement) {
		        for (const element of [].concat(...document.body.children)) {
		          EventHandler__default.default.on(element, 'mouseover', index.noop);
		        }
		      }
		      const complete = () => {
		        EventHandler__default.default.trigger(this._element, this.constructor.eventName(EVENT_SHOWN));
		        if (this._isHovered === false) {
		          this._leave();
		        }
		        this._isHovered = false;
		      };
		      this._queueCallback(complete, this.tip, this._isAnimated());
		    }
		    hide() {
		      if (!this._isShown()) {
		        return;
		      }
		      const hideEvent = EventHandler__default.default.trigger(this._element, this.constructor.eventName(EVENT_HIDE));
		      if (hideEvent.defaultPrevented) {
		        return;
		      }
		      const tip = this._getTipElement();
		      tip.classList.remove(CLASS_NAME_SHOW); // If this is a touch-enabled device we remove the extra
		      // empty mouseover listeners we added for iOS support

		      if ('ontouchstart' in document.documentElement) {
		        for (const element of [].concat(...document.body.children)) {
		          EventHandler__default.default.off(element, 'mouseover', index.noop);
		        }
		      }
		      this._activeTrigger[TRIGGER_CLICK] = false;
		      this._activeTrigger[TRIGGER_FOCUS] = false;
		      this._activeTrigger[TRIGGER_HOVER] = false;
		      this._isHovered = null; // it is a trick to support manual triggering

		      const complete = () => {
		        if (this._isWithActiveTrigger()) {
		          return;
		        }
		        if (!this._isHovered) {
		          this._disposePopper();
		        }
		        this._element.removeAttribute('aria-describedby');
		        EventHandler__default.default.trigger(this._element, this.constructor.eventName(EVENT_HIDDEN));
		      };
		      this._queueCallback(complete, this.tip, this._isAnimated());
		    }
		    update() {
		      if (this._popper) {
		        this._popper.update();
		      }
		    } // Protected

		    _isWithContent() {
		      return Boolean(this._getTitle());
		    }
		    _getTipElement() {
		      if (!this.tip) {
		        this.tip = this._createTipElement(this._newContent || this._getContentForTemplate());
		      }
		      return this.tip;
		    }
		    _createTipElement(content) {
		      const tip = this._getTemplateFactory(content).toHtml(); // todo: remove this check on v6

		      if (!tip) {
		        return null;
		      }
		      tip.classList.remove(CLASS_NAME_FADE, CLASS_NAME_SHOW); // todo: on v6 the following can be achieved with CSS only

		      tip.classList.add(`bs-${this.constructor.NAME}-auto`);
		      const tipId = index.getUID(this.constructor.NAME).toString();
		      tip.setAttribute('id', tipId);
		      if (this._isAnimated()) {
		        tip.classList.add(CLASS_NAME_FADE);
		      }
		      return tip;
		    }
		    setContent(content) {
		      this._newContent = content;
		      if (this._isShown()) {
		        this._disposePopper();
		        this.show();
		      }
		    }
		    _getTemplateFactory(content) {
		      if (this._templateFactory) {
		        this._templateFactory.changeContent(content);
		      } else {
		        this._templateFactory = new TemplateFactory__default.default({
		          ...this._config,
		          // the `content` var has to be after `this._config`
		          // to override config.content in case of popover
		          content,
		          extraClass: this._resolvePossibleFunction(this._config.customClass)
		        });
		      }
		      return this._templateFactory;
		    }
		    _getContentForTemplate() {
		      return {
		        [SELECTOR_TOOLTIP_INNER]: this._getTitle()
		      };
		    }
		    _getTitle() {
		      return this._resolvePossibleFunction(this._config.title) || this._element.getAttribute('data-bs-original-title');
		    } // Private

		    _initializeOnDelegatedTarget(event) {
		      return this.constructor.getOrCreateInstance(event.delegateTarget, this._getDelegateConfig());
		    }
		    _isAnimated() {
		      return this._config.animation || this.tip && this.tip.classList.contains(CLASS_NAME_FADE);
		    }
		    _isShown() {
		      return this.tip && this.tip.classList.contains(CLASS_NAME_SHOW);
		    }
		    _createPopper(tip) {
		      const placement = typeof this._config.placement === 'function' ? this._config.placement.call(this, tip, this._element) : this._config.placement;
		      const attachment = AttachmentMap[placement.toUpperCase()];
		      return Popper__namespace.createPopper(this._element, tip, this._getPopperConfig(attachment));
		    }
		    _getOffset() {
		      const {
		        offset
		      } = this._config;
		      if (typeof offset === 'string') {
		        return offset.split(',').map(value => Number.parseInt(value, 10));
		      }
		      if (typeof offset === 'function') {
		        return popperData => offset(popperData, this._element);
		      }
		      return offset;
		    }
		    _resolvePossibleFunction(arg) {
		      return typeof arg === 'function' ? arg.call(this._element) : arg;
		    }
		    _getPopperConfig(attachment) {
		      const defaultBsPopperConfig = {
		        placement: attachment,
		        modifiers: [{
		          name: 'flip',
		          options: {
		            fallbackPlacements: this._config.fallbackPlacements
		          }
		        }, {
		          name: 'offset',
		          options: {
		            offset: this._getOffset()
		          }
		        }, {
		          name: 'preventOverflow',
		          options: {
		            boundary: this._config.boundary
		          }
		        }, {
		          name: 'arrow',
		          options: {
		            element: `.${this.constructor.NAME}-arrow`
		          }
		        }, {
		          name: 'preSetPlacement',
		          enabled: true,
		          phase: 'beforeMain',
		          fn: data => {
		            // Pre-set Popper's placement attribute in order to read the arrow sizes properly.
		            // Otherwise, Popper mixes up the width and height dimensions since the initial arrow style is for top placement
		            this._getTipElement().setAttribute('data-popper-placement', data.state.placement);
		          }
		        }]
		      };
		      return {
		        ...defaultBsPopperConfig,
		        ...(typeof this._config.popperConfig === 'function' ? this._config.popperConfig(defaultBsPopperConfig) : this._config.popperConfig)
		      };
		    }
		    _setListeners() {
		      const triggers = this._config.trigger.split(' ');
		      for (const trigger of triggers) {
		        if (trigger === 'click') {
		          EventHandler__default.default.on(this._element, this.constructor.eventName(EVENT_CLICK), this._config.selector, event => {
		            const context = this._initializeOnDelegatedTarget(event);
		            context.toggle();
		          });
		        } else if (trigger !== TRIGGER_MANUAL) {
		          const eventIn = trigger === TRIGGER_HOVER ? this.constructor.eventName(EVENT_MOUSEENTER) : this.constructor.eventName(EVENT_FOCUSIN);
		          const eventOut = trigger === TRIGGER_HOVER ? this.constructor.eventName(EVENT_MOUSELEAVE) : this.constructor.eventName(EVENT_FOCUSOUT);
		          EventHandler__default.default.on(this._element, eventIn, this._config.selector, event => {
		            const context = this._initializeOnDelegatedTarget(event);
		            context._activeTrigger[event.type === 'focusin' ? TRIGGER_FOCUS : TRIGGER_HOVER] = true;
		            context._enter();
		          });
		          EventHandler__default.default.on(this._element, eventOut, this._config.selector, event => {
		            const context = this._initializeOnDelegatedTarget(event);
		            context._activeTrigger[event.type === 'focusout' ? TRIGGER_FOCUS : TRIGGER_HOVER] = context._element.contains(event.relatedTarget);
		            context._leave();
		          });
		        }
		      }
		      this._hideModalHandler = () => {
		        if (this._element) {
		          this.hide();
		        }
		      };
		      EventHandler__default.default.on(this._element.closest(SELECTOR_MODAL), EVENT_MODAL_HIDE, this._hideModalHandler);
		    }
		    _fixTitle() {
		      const title = this._element.getAttribute('title');
		      if (!title) {
		        return;
		      }
		      if (!this._element.getAttribute('aria-label') && !this._element.textContent.trim()) {
		        this._element.setAttribute('aria-label', title);
		      }
		      this._element.setAttribute('data-bs-original-title', title); // DO NOT USE IT. Is only for backwards compatibility

		      this._element.removeAttribute('title');
		    }
		    _enter() {
		      if (this._isShown() || this._isHovered) {
		        this._isHovered = true;
		        return;
		      }
		      this._isHovered = true;
		      this._setTimeout(() => {
		        if (this._isHovered) {
		          this.show();
		        }
		      }, this._config.delay.show);
		    }
		    _leave() {
		      if (this._isWithActiveTrigger()) {
		        return;
		      }
		      this._isHovered = false;
		      this._setTimeout(() => {
		        if (!this._isHovered) {
		          this.hide();
		        }
		      }, this._config.delay.hide);
		    }
		    _setTimeout(handler, timeout) {
		      clearTimeout(this._timeout);
		      this._timeout = setTimeout(handler, timeout);
		    }
		    _isWithActiveTrigger() {
		      return Object.values(this._activeTrigger).includes(true);
		    }
		    _getConfig(config) {
		      const dataAttributes = Manipulator__default.default.getDataAttributes(this._element);
		      for (const dataAttribute of Object.keys(dataAttributes)) {
		        if (DISALLOWED_ATTRIBUTES.has(dataAttribute)) {
		          delete dataAttributes[dataAttribute];
		        }
		      }
		      config = {
		        ...dataAttributes,
		        ...(typeof config === 'object' && config ? config : {})
		      };
		      config = this._mergeConfigObj(config);
		      config = this._configAfterMerge(config);
		      this._typeCheckConfig(config);
		      return config;
		    }
		    _configAfterMerge(config) {
		      config.container = config.container === false ? document.body : index.getElement(config.container);
		      if (typeof config.delay === 'number') {
		        config.delay = {
		          show: config.delay,
		          hide: config.delay
		        };
		      }
		      if (typeof config.title === 'number') {
		        config.title = config.title.toString();
		      }
		      if (typeof config.content === 'number') {
		        config.content = config.content.toString();
		      }
		      return config;
		    }
		    _getDelegateConfig() {
		      const config = {};
		      for (const key in this._config) {
		        if (this.constructor.Default[key] !== this._config[key]) {
		          config[key] = this._config[key];
		        }
		      }
		      config.selector = false;
		      config.trigger = 'manual'; // In the future can be replaced with:
		      // const keysWithDifferentValues = Object.entries(this._config).filter(entry => this.constructor.Default[entry[0]] !== this._config[entry[0]])
		      // `Object.fromEntries(keysWithDifferentValues)`

		      return config;
		    }
		    _disposePopper() {
		      if (this._popper) {
		        this._popper.destroy();
		        this._popper = null;
		      }
		      if (this.tip) {
		        this.tip.remove();
		        this.tip = null;
		      }
		    } // Static

		    static jQueryInterface(config) {
		      return this.each(function () {
		        const data = Tooltip.getOrCreateInstance(this, config);
		        if (typeof config !== 'string') {
		          return;
		        }
		        if (typeof data[config] === 'undefined') {
		          throw new TypeError(`No method named "${config}"`);
		        }
		        data[config]();
		      });
		    }
		  }
		  /**
		   * jQuery
		   */

		  index.defineJQueryPlugin(Tooltip);
		  return Tooltip;
		});
	} (tooltip$1));

	var tooltip = /*@__PURE__*/getDefaultExportFromCjs(tooltip$1.exports);

	/*!
	  * Bootstrap popover.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
		(function (global, factory) {
		  module.exports = factory(requireUtil(), tooltip$1.exports) ;
		})(commonjsGlobal, function (index, Tooltip) {

		  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : {
		    default: e
		  };
		  const Tooltip__default = /*#__PURE__*/_interopDefaultLegacy(Tooltip);

		  /**
		   * --------------------------------------------------------------------------
		   * Bootstrap (v5.2.3): popover.js
		   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
		   * --------------------------------------------------------------------------
		   */
		  /**
		   * Constants
		   */

		  const NAME = 'popover';
		  const SELECTOR_TITLE = '.popover-header';
		  const SELECTOR_CONTENT = '.popover-body';
		  const Default = {
		    ...Tooltip__default.default.Default,
		    content: '',
		    offset: [0, 8],
		    placement: 'right',
		    template: '<div class="popover" role="tooltip">' + '<div class="popover-arrow"></div>' + '<h3 class="popover-header"></h3>' + '<div class="popover-body"></div>' + '</div>',
		    trigger: 'click'
		  };
		  const DefaultType = {
		    ...Tooltip__default.default.DefaultType,
		    content: '(null|string|element|function)'
		  };
		  /**
		   * Class definition
		   */

		  class Popover extends Tooltip__default.default {
		    // Getters
		    static get Default() {
		      return Default;
		    }
		    static get DefaultType() {
		      return DefaultType;
		    }
		    static get NAME() {
		      return NAME;
		    } // Overrides

		    _isWithContent() {
		      return this._getTitle() || this._getContent();
		    } // Private

		    _getContentForTemplate() {
		      return {
		        [SELECTOR_TITLE]: this._getTitle(),
		        [SELECTOR_CONTENT]: this._getContent()
		      };
		    }
		    _getContent() {
		      return this._resolvePossibleFunction(this._config.content);
		    } // Static

		    static jQueryInterface(config) {
		      return this.each(function () {
		        const data = Popover.getOrCreateInstance(this, config);
		        if (typeof config !== 'string') {
		          return;
		        }
		        if (typeof data[config] === 'undefined') {
		          throw new TypeError(`No method named "${config}"`);
		        }
		        data[config]();
		      });
		    }
		  }
		  /**
		   * jQuery
		   */

		  index.defineJQueryPlugin(Popover);
		  return Popover;
		});
	} (popover$1));

	var popover = popover$1.exports;

	var scrollspy$1 = {exports: {}};

	/*!
	  * Bootstrap scrollspy.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
		(function (global, factory) {
		  module.exports = factory(requireUtil(), requireEventHandler(), requireSelectorEngine(), requireBaseComponent()) ;
		})(commonjsGlobal, function (index, EventHandler, SelectorEngine, BaseComponent) {

		  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : {
		    default: e
		  };
		  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
		  const SelectorEngine__default = /*#__PURE__*/_interopDefaultLegacy(SelectorEngine);
		  const BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

		  /**
		   * --------------------------------------------------------------------------
		   * Bootstrap (v5.2.3): scrollspy.js
		   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
		   * --------------------------------------------------------------------------
		   */
		  /**
		   * Constants
		   */

		  const NAME = 'scrollspy';
		  const DATA_KEY = 'bs.scrollspy';
		  const EVENT_KEY = `.${DATA_KEY}`;
		  const DATA_API_KEY = '.data-api';
		  const EVENT_ACTIVATE = `activate${EVENT_KEY}`;
		  const EVENT_CLICK = `click${EVENT_KEY}`;
		  const EVENT_LOAD_DATA_API = `load${EVENT_KEY}${DATA_API_KEY}`;
		  const CLASS_NAME_DROPDOWN_ITEM = 'dropdown-item';
		  const CLASS_NAME_ACTIVE = 'active';
		  const SELECTOR_DATA_SPY = '[data-bs-spy="scroll"]';
		  const SELECTOR_TARGET_LINKS = '[href]';
		  const SELECTOR_NAV_LIST_GROUP = '.nav, .list-group';
		  const SELECTOR_NAV_LINKS = '.nav-link';
		  const SELECTOR_NAV_ITEMS = '.nav-item';
		  const SELECTOR_LIST_ITEMS = '.list-group-item';
		  const SELECTOR_LINK_ITEMS = `${SELECTOR_NAV_LINKS}, ${SELECTOR_NAV_ITEMS} > ${SELECTOR_NAV_LINKS}, ${SELECTOR_LIST_ITEMS}`;
		  const SELECTOR_DROPDOWN = '.dropdown';
		  const SELECTOR_DROPDOWN_TOGGLE = '.dropdown-toggle';
		  const Default = {
		    offset: null,
		    // TODO: v6 @deprecated, keep it for backwards compatibility reasons
		    rootMargin: '0px 0px -25%',
		    smoothScroll: false,
		    target: null,
		    threshold: [0.1, 0.5, 1]
		  };
		  const DefaultType = {
		    offset: '(number|null)',
		    // TODO v6 @deprecated, keep it for backwards compatibility reasons
		    rootMargin: 'string',
		    smoothScroll: 'boolean',
		    target: 'element',
		    threshold: 'array'
		  };
		  /**
		   * Class definition
		   */

		  class ScrollSpy extends BaseComponent__default.default {
		    constructor(element, config) {
		      super(element, config); // this._element is the observablesContainer and config.target the menu links wrapper

		      this._targetLinks = new Map();
		      this._observableSections = new Map();
		      this._rootElement = getComputedStyle(this._element).overflowY === 'visible' ? null : this._element;
		      this._activeTarget = null;
		      this._observer = null;
		      this._previousScrollData = {
		        visibleEntryTop: 0,
		        parentScrollTop: 0
		      };
		      this.refresh(); // initialize
		    } // Getters

		    static get Default() {
		      return Default;
		    }
		    static get DefaultType() {
		      return DefaultType;
		    }
		    static get NAME() {
		      return NAME;
		    } // Public

		    refresh() {
		      this._initializeTargetsAndObservables();
		      this._maybeEnableSmoothScroll();
		      if (this._observer) {
		        this._observer.disconnect();
		      } else {
		        this._observer = this._getNewObserver();
		      }
		      for (const section of this._observableSections.values()) {
		        this._observer.observe(section);
		      }
		    }
		    dispose() {
		      this._observer.disconnect();
		      super.dispose();
		    } // Private

		    _configAfterMerge(config) {
		      // TODO: on v6 target should be given explicitly & remove the {target: 'ss-target'} case
		      config.target = index.getElement(config.target) || document.body; // TODO: v6 Only for backwards compatibility reasons. Use rootMargin only

		      config.rootMargin = config.offset ? `${config.offset}px 0px -30%` : config.rootMargin;
		      if (typeof config.threshold === 'string') {
		        config.threshold = config.threshold.split(',').map(value => Number.parseFloat(value));
		      }
		      return config;
		    }
		    _maybeEnableSmoothScroll() {
		      if (!this._config.smoothScroll) {
		        return;
		      } // unregister any previous listeners

		      EventHandler__default.default.off(this._config.target, EVENT_CLICK);
		      EventHandler__default.default.on(this._config.target, EVENT_CLICK, SELECTOR_TARGET_LINKS, event => {
		        const observableSection = this._observableSections.get(event.target.hash);
		        if (observableSection) {
		          event.preventDefault();
		          const root = this._rootElement || window;
		          const height = observableSection.offsetTop - this._element.offsetTop;
		          if (root.scrollTo) {
		            root.scrollTo({
		              top: height,
		              behavior: 'smooth'
		            });
		            return;
		          } // Chrome 60 doesn't support `scrollTo`

		          root.scrollTop = height;
		        }
		      });
		    }
		    _getNewObserver() {
		      const options = {
		        root: this._rootElement,
		        threshold: this._config.threshold,
		        rootMargin: this._config.rootMargin
		      };
		      return new IntersectionObserver(entries => this._observerCallback(entries), options);
		    } // The logic of selection

		    _observerCallback(entries) {
		      const targetElement = entry => this._targetLinks.get(`#${entry.target.id}`);
		      const activate = entry => {
		        this._previousScrollData.visibleEntryTop = entry.target.offsetTop;
		        this._process(targetElement(entry));
		      };
		      const parentScrollTop = (this._rootElement || document.documentElement).scrollTop;
		      const userScrollsDown = parentScrollTop >= this._previousScrollData.parentScrollTop;
		      this._previousScrollData.parentScrollTop = parentScrollTop;
		      for (const entry of entries) {
		        if (!entry.isIntersecting) {
		          this._activeTarget = null;
		          this._clearActiveClass(targetElement(entry));
		          continue;
		        }
		        const entryIsLowerThanPrevious = entry.target.offsetTop >= this._previousScrollData.visibleEntryTop; // if we are scrolling down, pick the bigger offsetTop

		        if (userScrollsDown && entryIsLowerThanPrevious) {
		          activate(entry); // if parent isn't scrolled, let's keep the first visible item, breaking the iteration

		          if (!parentScrollTop) {
		            return;
		          }
		          continue;
		        } // if we are scrolling up, pick the smallest offsetTop

		        if (!userScrollsDown && !entryIsLowerThanPrevious) {
		          activate(entry);
		        }
		      }
		    }
		    _initializeTargetsAndObservables() {
		      this._targetLinks = new Map();
		      this._observableSections = new Map();
		      const targetLinks = SelectorEngine__default.default.find(SELECTOR_TARGET_LINKS, this._config.target);
		      for (const anchor of targetLinks) {
		        // ensure that the anchor has an id and is not disabled
		        if (!anchor.hash || index.isDisabled(anchor)) {
		          continue;
		        }
		        const observableSection = SelectorEngine__default.default.findOne(anchor.hash, this._element); // ensure that the observableSection exists & is visible

		        if (index.isVisible(observableSection)) {
		          this._targetLinks.set(anchor.hash, anchor);
		          this._observableSections.set(anchor.hash, observableSection);
		        }
		      }
		    }
		    _process(target) {
		      if (this._activeTarget === target) {
		        return;
		      }
		      this._clearActiveClass(this._config.target);
		      this._activeTarget = target;
		      target.classList.add(CLASS_NAME_ACTIVE);
		      this._activateParents(target);
		      EventHandler__default.default.trigger(this._element, EVENT_ACTIVATE, {
		        relatedTarget: target
		      });
		    }
		    _activateParents(target) {
		      // Activate dropdown parents
		      if (target.classList.contains(CLASS_NAME_DROPDOWN_ITEM)) {
		        SelectorEngine__default.default.findOne(SELECTOR_DROPDOWN_TOGGLE, target.closest(SELECTOR_DROPDOWN)).classList.add(CLASS_NAME_ACTIVE);
		        return;
		      }
		      for (const listGroup of SelectorEngine__default.default.parents(target, SELECTOR_NAV_LIST_GROUP)) {
		        // Set triggered links parents as active
		        // With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor
		        for (const item of SelectorEngine__default.default.prev(listGroup, SELECTOR_LINK_ITEMS)) {
		          item.classList.add(CLASS_NAME_ACTIVE);
		        }
		      }
		    }
		    _clearActiveClass(parent) {
		      parent.classList.remove(CLASS_NAME_ACTIVE);
		      const activeNodes = SelectorEngine__default.default.find(`${SELECTOR_TARGET_LINKS}.${CLASS_NAME_ACTIVE}`, parent);
		      for (const node of activeNodes) {
		        node.classList.remove(CLASS_NAME_ACTIVE);
		      }
		    } // Static

		    static jQueryInterface(config) {
		      return this.each(function () {
		        const data = ScrollSpy.getOrCreateInstance(this, config);
		        if (typeof config !== 'string') {
		          return;
		        }
		        if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
		          throw new TypeError(`No method named "${config}"`);
		        }
		        data[config]();
		      });
		    }
		  }
		  /**
		   * Data API implementation
		   */

		  EventHandler__default.default.on(window, EVENT_LOAD_DATA_API, () => {
		    for (const spy of SelectorEngine__default.default.find(SELECTOR_DATA_SPY)) {
		      ScrollSpy.getOrCreateInstance(spy);
		    }
		  });
		  /**
		   * jQuery
		   */

		  index.defineJQueryPlugin(ScrollSpy);
		  return ScrollSpy;
		});
	} (scrollspy$1));

	var scrollspy = scrollspy$1.exports;

	var tab$1 = {exports: {}};

	/*!
	  * Bootstrap tab.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
		(function (global, factory) {
		  module.exports = factory(requireUtil(), requireEventHandler(), requireSelectorEngine(), requireBaseComponent()) ;
		})(commonjsGlobal, function (index, EventHandler, SelectorEngine, BaseComponent) {

		  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : {
		    default: e
		  };
		  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
		  const SelectorEngine__default = /*#__PURE__*/_interopDefaultLegacy(SelectorEngine);
		  const BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

		  /**
		   * --------------------------------------------------------------------------
		   * Bootstrap (v5.2.3): tab.js
		   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
		   * --------------------------------------------------------------------------
		   */
		  /**
		   * Constants
		   */

		  const NAME = 'tab';
		  const DATA_KEY = 'bs.tab';
		  const EVENT_KEY = `.${DATA_KEY}`;
		  const EVENT_HIDE = `hide${EVENT_KEY}`;
		  const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
		  const EVENT_SHOW = `show${EVENT_KEY}`;
		  const EVENT_SHOWN = `shown${EVENT_KEY}`;
		  const EVENT_CLICK_DATA_API = `click${EVENT_KEY}`;
		  const EVENT_KEYDOWN = `keydown${EVENT_KEY}`;
		  const EVENT_LOAD_DATA_API = `load${EVENT_KEY}`;
		  const ARROW_LEFT_KEY = 'ArrowLeft';
		  const ARROW_RIGHT_KEY = 'ArrowRight';
		  const ARROW_UP_KEY = 'ArrowUp';
		  const ARROW_DOWN_KEY = 'ArrowDown';
		  const CLASS_NAME_ACTIVE = 'active';
		  const CLASS_NAME_FADE = 'fade';
		  const CLASS_NAME_SHOW = 'show';
		  const CLASS_DROPDOWN = 'dropdown';
		  const SELECTOR_DROPDOWN_TOGGLE = '.dropdown-toggle';
		  const SELECTOR_DROPDOWN_MENU = '.dropdown-menu';
		  const NOT_SELECTOR_DROPDOWN_TOGGLE = ':not(.dropdown-toggle)';
		  const SELECTOR_TAB_PANEL = '.list-group, .nav, [role="tablist"]';
		  const SELECTOR_OUTER = '.nav-item, .list-group-item';
		  const SELECTOR_INNER = `.nav-link${NOT_SELECTOR_DROPDOWN_TOGGLE}, .list-group-item${NOT_SELECTOR_DROPDOWN_TOGGLE}, [role="tab"]${NOT_SELECTOR_DROPDOWN_TOGGLE}`;
		  const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]'; // todo:v6: could be only `tab`

		  const SELECTOR_INNER_ELEM = `${SELECTOR_INNER}, ${SELECTOR_DATA_TOGGLE}`;
		  const SELECTOR_DATA_TOGGLE_ACTIVE = `.${CLASS_NAME_ACTIVE}[data-bs-toggle="tab"], .${CLASS_NAME_ACTIVE}[data-bs-toggle="pill"], .${CLASS_NAME_ACTIVE}[data-bs-toggle="list"]`;
		  /**
		   * Class definition
		   */

		  class Tab extends BaseComponent__default.default {
		    constructor(element) {
		      super(element);
		      this._parent = this._element.closest(SELECTOR_TAB_PANEL);
		      if (!this._parent) {
		        return; // todo: should Throw exception on v6
		        // throw new TypeError(`${element.outerHTML} has not a valid parent ${SELECTOR_INNER_ELEM}`)
		      } // Set up initial aria attributes

		      this._setInitialAttributes(this._parent, this._getChildren());
		      EventHandler__default.default.on(this._element, EVENT_KEYDOWN, event => this._keydown(event));
		    } // Getters

		    static get NAME() {
		      return NAME;
		    } // Public

		    show() {
		      // Shows this elem and deactivate the active sibling if exists
		      const innerElem = this._element;
		      if (this._elemIsActive(innerElem)) {
		        return;
		      } // Search for active tab on same parent to deactivate it

		      const active = this._getActiveElem();
		      const hideEvent = active ? EventHandler__default.default.trigger(active, EVENT_HIDE, {
		        relatedTarget: innerElem
		      }) : null;
		      const showEvent = EventHandler__default.default.trigger(innerElem, EVENT_SHOW, {
		        relatedTarget: active
		      });
		      if (showEvent.defaultPrevented || hideEvent && hideEvent.defaultPrevented) {
		        return;
		      }
		      this._deactivate(active, innerElem);
		      this._activate(innerElem, active);
		    } // Private

		    _activate(element, relatedElem) {
		      if (!element) {
		        return;
		      }
		      element.classList.add(CLASS_NAME_ACTIVE);
		      this._activate(index.getElementFromSelector(element)); // Search and activate/show the proper section

		      const complete = () => {
		        if (element.getAttribute('role') !== 'tab') {
		          element.classList.add(CLASS_NAME_SHOW);
		          return;
		        }
		        element.removeAttribute('tabindex');
		        element.setAttribute('aria-selected', true);
		        this._toggleDropDown(element, true);
		        EventHandler__default.default.trigger(element, EVENT_SHOWN, {
		          relatedTarget: relatedElem
		        });
		      };
		      this._queueCallback(complete, element, element.classList.contains(CLASS_NAME_FADE));
		    }
		    _deactivate(element, relatedElem) {
		      if (!element) {
		        return;
		      }
		      element.classList.remove(CLASS_NAME_ACTIVE);
		      element.blur();
		      this._deactivate(index.getElementFromSelector(element)); // Search and deactivate the shown section too

		      const complete = () => {
		        if (element.getAttribute('role') !== 'tab') {
		          element.classList.remove(CLASS_NAME_SHOW);
		          return;
		        }
		        element.setAttribute('aria-selected', false);
		        element.setAttribute('tabindex', '-1');
		        this._toggleDropDown(element, false);
		        EventHandler__default.default.trigger(element, EVENT_HIDDEN, {
		          relatedTarget: relatedElem
		        });
		      };
		      this._queueCallback(complete, element, element.classList.contains(CLASS_NAME_FADE));
		    }
		    _keydown(event) {
		      if (![ARROW_LEFT_KEY, ARROW_RIGHT_KEY, ARROW_UP_KEY, ARROW_DOWN_KEY].includes(event.key)) {
		        return;
		      }
		      event.stopPropagation(); // stopPropagation/preventDefault both added to support up/down keys without scrolling the page

		      event.preventDefault();
		      const isNext = [ARROW_RIGHT_KEY, ARROW_DOWN_KEY].includes(event.key);
		      const nextActiveElement = index.getNextActiveElement(this._getChildren().filter(element => !index.isDisabled(element)), event.target, isNext, true);
		      if (nextActiveElement) {
		        nextActiveElement.focus({
		          preventScroll: true
		        });
		        Tab.getOrCreateInstance(nextActiveElement).show();
		      }
		    }
		    _getChildren() {
		      // collection of inner elements
		      return SelectorEngine__default.default.find(SELECTOR_INNER_ELEM, this._parent);
		    }
		    _getActiveElem() {
		      return this._getChildren().find(child => this._elemIsActive(child)) || null;
		    }
		    _setInitialAttributes(parent, children) {
		      this._setAttributeIfNotExists(parent, 'role', 'tablist');
		      for (const child of children) {
		        this._setInitialAttributesOnChild(child);
		      }
		    }
		    _setInitialAttributesOnChild(child) {
		      child = this._getInnerElement(child);
		      const isActive = this._elemIsActive(child);
		      const outerElem = this._getOuterElement(child);
		      child.setAttribute('aria-selected', isActive);
		      if (outerElem !== child) {
		        this._setAttributeIfNotExists(outerElem, 'role', 'presentation');
		      }
		      if (!isActive) {
		        child.setAttribute('tabindex', '-1');
		      }
		      this._setAttributeIfNotExists(child, 'role', 'tab'); // set attributes to the related panel too

		      this._setInitialAttributesOnTargetPanel(child);
		    }
		    _setInitialAttributesOnTargetPanel(child) {
		      const target = index.getElementFromSelector(child);
		      if (!target) {
		        return;
		      }
		      this._setAttributeIfNotExists(target, 'role', 'tabpanel');
		      if (child.id) {
		        this._setAttributeIfNotExists(target, 'aria-labelledby', `#${child.id}`);
		      }
		    }
		    _toggleDropDown(element, open) {
		      const outerElem = this._getOuterElement(element);
		      if (!outerElem.classList.contains(CLASS_DROPDOWN)) {
		        return;
		      }
		      const toggle = (selector, className) => {
		        const element = SelectorEngine__default.default.findOne(selector, outerElem);
		        if (element) {
		          element.classList.toggle(className, open);
		        }
		      };
		      toggle(SELECTOR_DROPDOWN_TOGGLE, CLASS_NAME_ACTIVE);
		      toggle(SELECTOR_DROPDOWN_MENU, CLASS_NAME_SHOW);
		      outerElem.setAttribute('aria-expanded', open);
		    }
		    _setAttributeIfNotExists(element, attribute, value) {
		      if (!element.hasAttribute(attribute)) {
		        element.setAttribute(attribute, value);
		      }
		    }
		    _elemIsActive(elem) {
		      return elem.classList.contains(CLASS_NAME_ACTIVE);
		    } // Try to get the inner element (usually the .nav-link)

		    _getInnerElement(elem) {
		      return elem.matches(SELECTOR_INNER_ELEM) ? elem : SelectorEngine__default.default.findOne(SELECTOR_INNER_ELEM, elem);
		    } // Try to get the outer element (usually the .nav-item)

		    _getOuterElement(elem) {
		      return elem.closest(SELECTOR_OUTER) || elem;
		    } // Static

		    static jQueryInterface(config) {
		      return this.each(function () {
		        const data = Tab.getOrCreateInstance(this);
		        if (typeof config !== 'string') {
		          return;
		        }
		        if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
		          throw new TypeError(`No method named "${config}"`);
		        }
		        data[config]();
		      });
		    }
		  }
		  /**
		   * Data API implementation
		   */

		  EventHandler__default.default.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
		    if (['A', 'AREA'].includes(this.tagName)) {
		      event.preventDefault();
		    }
		    if (index.isDisabled(this)) {
		      return;
		    }
		    Tab.getOrCreateInstance(this).show();
		  });
		  /**
		   * Initialize on focus
		   */

		  EventHandler__default.default.on(window, EVENT_LOAD_DATA_API, () => {
		    for (const element of SelectorEngine__default.default.find(SELECTOR_DATA_TOGGLE_ACTIVE)) {
		      Tab.getOrCreateInstance(element);
		    }
		  });
		  /**
		   * jQuery
		   */

		  index.defineJQueryPlugin(Tab);
		  return Tab;
		});
	} (tab$1));

	var tab = tab$1.exports;

	var toast$1 = {exports: {}};

	/*!
	  * Bootstrap toast.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
		(function (global, factory) {
		  module.exports = factory(requireUtil(), requireEventHandler(), requireBaseComponent(), requireComponentFunctions()) ;
		})(commonjsGlobal, function (index, EventHandler, BaseComponent, componentFunctions) {

		  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : {
		    default: e
		  };
		  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
		  const BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

		  /**
		   * --------------------------------------------------------------------------
		   * Bootstrap (v5.2.3): toast.js
		   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
		   * --------------------------------------------------------------------------
		   */
		  /**
		   * Constants
		   */

		  const NAME = 'toast';
		  const DATA_KEY = 'bs.toast';
		  const EVENT_KEY = `.${DATA_KEY}`;
		  const EVENT_MOUSEOVER = `mouseover${EVENT_KEY}`;
		  const EVENT_MOUSEOUT = `mouseout${EVENT_KEY}`;
		  const EVENT_FOCUSIN = `focusin${EVENT_KEY}`;
		  const EVENT_FOCUSOUT = `focusout${EVENT_KEY}`;
		  const EVENT_HIDE = `hide${EVENT_KEY}`;
		  const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
		  const EVENT_SHOW = `show${EVENT_KEY}`;
		  const EVENT_SHOWN = `shown${EVENT_KEY}`;
		  const CLASS_NAME_FADE = 'fade';
		  const CLASS_NAME_HIDE = 'hide'; // @deprecated - kept here only for backwards compatibility

		  const CLASS_NAME_SHOW = 'show';
		  const CLASS_NAME_SHOWING = 'showing';
		  const DefaultType = {
		    animation: 'boolean',
		    autohide: 'boolean',
		    delay: 'number'
		  };
		  const Default = {
		    animation: true,
		    autohide: true,
		    delay: 5000
		  };
		  /**
		   * Class definition
		   */

		  class Toast extends BaseComponent__default.default {
		    constructor(element, config) {
		      super(element, config);
		      this._timeout = null;
		      this._hasMouseInteraction = false;
		      this._hasKeyboardInteraction = false;
		      this._setListeners();
		    } // Getters

		    static get Default() {
		      return Default;
		    }
		    static get DefaultType() {
		      return DefaultType;
		    }
		    static get NAME() {
		      return NAME;
		    } // Public

		    show() {
		      const showEvent = EventHandler__default.default.trigger(this._element, EVENT_SHOW);
		      if (showEvent.defaultPrevented) {
		        return;
		      }
		      this._clearTimeout();
		      if (this._config.animation) {
		        this._element.classList.add(CLASS_NAME_FADE);
		      }
		      const complete = () => {
		        this._element.classList.remove(CLASS_NAME_SHOWING);
		        EventHandler__default.default.trigger(this._element, EVENT_SHOWN);
		        this._maybeScheduleHide();
		      };
		      this._element.classList.remove(CLASS_NAME_HIDE); // @deprecated

		      index.reflow(this._element);
		      this._element.classList.add(CLASS_NAME_SHOW, CLASS_NAME_SHOWING);
		      this._queueCallback(complete, this._element, this._config.animation);
		    }
		    hide() {
		      if (!this.isShown()) {
		        return;
		      }
		      const hideEvent = EventHandler__default.default.trigger(this._element, EVENT_HIDE);
		      if (hideEvent.defaultPrevented) {
		        return;
		      }
		      const complete = () => {
		        this._element.classList.add(CLASS_NAME_HIDE); // @deprecated

		        this._element.classList.remove(CLASS_NAME_SHOWING, CLASS_NAME_SHOW);
		        EventHandler__default.default.trigger(this._element, EVENT_HIDDEN);
		      };
		      this._element.classList.add(CLASS_NAME_SHOWING);
		      this._queueCallback(complete, this._element, this._config.animation);
		    }
		    dispose() {
		      this._clearTimeout();
		      if (this.isShown()) {
		        this._element.classList.remove(CLASS_NAME_SHOW);
		      }
		      super.dispose();
		    }
		    isShown() {
		      return this._element.classList.contains(CLASS_NAME_SHOW);
		    } // Private

		    _maybeScheduleHide() {
		      if (!this._config.autohide) {
		        return;
		      }
		      if (this._hasMouseInteraction || this._hasKeyboardInteraction) {
		        return;
		      }
		      this._timeout = setTimeout(() => {
		        this.hide();
		      }, this._config.delay);
		    }
		    _onInteraction(event, isInteracting) {
		      switch (event.type) {
		        case 'mouseover':
		        case 'mouseout':
		          {
		            this._hasMouseInteraction = isInteracting;
		            break;
		          }
		        case 'focusin':
		        case 'focusout':
		          {
		            this._hasKeyboardInteraction = isInteracting;
		            break;
		          }
		      }
		      if (isInteracting) {
		        this._clearTimeout();
		        return;
		      }
		      const nextElement = event.relatedTarget;
		      if (this._element === nextElement || this._element.contains(nextElement)) {
		        return;
		      }
		      this._maybeScheduleHide();
		    }
		    _setListeners() {
		      EventHandler__default.default.on(this._element, EVENT_MOUSEOVER, event => this._onInteraction(event, true));
		      EventHandler__default.default.on(this._element, EVENT_MOUSEOUT, event => this._onInteraction(event, false));
		      EventHandler__default.default.on(this._element, EVENT_FOCUSIN, event => this._onInteraction(event, true));
		      EventHandler__default.default.on(this._element, EVENT_FOCUSOUT, event => this._onInteraction(event, false));
		    }
		    _clearTimeout() {
		      clearTimeout(this._timeout);
		      this._timeout = null;
		    } // Static

		    static jQueryInterface(config) {
		      return this.each(function () {
		        const data = Toast.getOrCreateInstance(this, config);
		        if (typeof config === 'string') {
		          if (typeof data[config] === 'undefined') {
		            throw new TypeError(`No method named "${config}"`);
		          }
		          data[config](this);
		        }
		      });
		    }
		  }
		  /**
		   * Data API implementation
		   */

		  componentFunctions.enableDismissTrigger(Toast);
		  /**
		   * jQuery
		   */

		  index.defineJQueryPlugin(Toast);
		  return Toast;
		});
	} (toast$1));

	var toast = toast$1.exports;

	/**
	 * File skip-link-focus-fix.js.
	 *
	 * Helps with accessibility for keyboard only users.
	 *
	 * Learn more: https://git.io/vWdr2
	 */
	(function () {
	  var isWebkit = navigator.userAgent.toLowerCase().indexOf('webkit') > -1,
	    isOpera = navigator.userAgent.toLowerCase().indexOf('opera') > -1,
	    isIe = navigator.userAgent.toLowerCase().indexOf('msie') > -1;
	  if ((isWebkit || isOpera || isIe) && document.getElementById && window.addEventListener) {
	    window.addEventListener('hashchange', function () {
	      var id = location.hash.substring(1),
	        element;
	      if (!/^[A-z0-9_-]+$/.test(id)) {
	        return;
	      }
	      element = document.getElementById(id);
	      if (element) {
	        if (!/^(?:a|select|input|button|textarea)$/i.test(element.tagName)) {
	          element.tabIndex = -1;
	        }
	        element.focus();
	      }
	    }, false);
	  }
	})();

	var slick = {exports: {}};

	/*
	     _ _      _       _
	 ___| (_) ___| | __  (_)___
	/ __| | |/ __| |/ /  | / __|
	\__ \ | | (__|   < _ | \__ \
	|___/_|_|\___|_|\_(_)/ |___/
	                   |__/

	 Version: 1.8.1
	  Author: Ken Wheeler
	 Website: http://kenwheeler.github.io
	    Docs: http://kenwheeler.github.io/slick
	    Repo: http://github.com/kenwheeler/slick
	  Issues: http://github.com/kenwheeler/slick/issues

	 */

	(function (module, exports) {
		(function (factory) {

		  {
		    module.exports = factory(require$$0$1);
		  }
		})(function ($) {

		  var Slick = window.Slick || {};
		  Slick = function () {
		    var instanceUid = 0;
		    function Slick(element, settings) {
		      var _ = this,
		        dataSettings;
		      _.defaults = {
		        accessibility: true,
		        adaptiveHeight: false,
		        appendArrows: $(element),
		        appendDots: $(element),
		        arrows: true,
		        asNavFor: null,
		        prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
		        nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
		        autoplay: false,
		        autoplaySpeed: 3000,
		        centerMode: false,
		        centerPadding: '50px',
		        cssEase: 'ease',
		        customPaging: function (slider, i) {
		          return $('<button type="button" />').text(i + 1);
		        },
		        dots: false,
		        dotsClass: 'slick-dots',
		        draggable: true,
		        easing: 'linear',
		        edgeFriction: 0.35,
		        fade: false,
		        focusOnSelect: false,
		        focusOnChange: false,
		        infinite: true,
		        initialSlide: 0,
		        lazyLoad: 'ondemand',
		        mobileFirst: false,
		        pauseOnHover: true,
		        pauseOnFocus: true,
		        pauseOnDotsHover: false,
		        respondTo: 'window',
		        responsive: null,
		        rows: 1,
		        rtl: false,
		        slide: '',
		        slidesPerRow: 1,
		        slidesToShow: 1,
		        slidesToScroll: 1,
		        speed: 500,
		        swipe: true,
		        swipeToSlide: false,
		        touchMove: true,
		        touchThreshold: 5,
		        useCSS: true,
		        useTransform: true,
		        variableWidth: false,
		        vertical: false,
		        verticalSwiping: false,
		        waitForAnimate: true,
		        zIndex: 1000
		      };
		      _.initials = {
		        animating: false,
		        dragging: false,
		        autoPlayTimer: null,
		        currentDirection: 0,
		        currentLeft: null,
		        currentSlide: 0,
		        direction: 1,
		        $dots: null,
		        listWidth: null,
		        listHeight: null,
		        loadIndex: 0,
		        $nextArrow: null,
		        $prevArrow: null,
		        scrolling: false,
		        slideCount: null,
		        slideWidth: null,
		        $slideTrack: null,
		        $slides: null,
		        sliding: false,
		        slideOffset: 0,
		        swipeLeft: null,
		        swiping: false,
		        $list: null,
		        touchObject: {},
		        transformsEnabled: false,
		        unslicked: false
		      };
		      $.extend(_, _.initials);
		      _.activeBreakpoint = null;
		      _.animType = null;
		      _.animProp = null;
		      _.breakpoints = [];
		      _.breakpointSettings = [];
		      _.cssTransitions = false;
		      _.focussed = false;
		      _.interrupted = false;
		      _.hidden = 'hidden';
		      _.paused = true;
		      _.positionProp = null;
		      _.respondTo = null;
		      _.rowCount = 1;
		      _.shouldClick = true;
		      _.$slider = $(element);
		      _.$slidesCache = null;
		      _.transformType = null;
		      _.transitionType = null;
		      _.visibilityChange = 'visibilitychange';
		      _.windowWidth = 0;
		      _.windowTimer = null;
		      dataSettings = $(element).data('slick') || {};
		      _.options = $.extend({}, _.defaults, settings, dataSettings);
		      _.currentSlide = _.options.initialSlide;
		      _.originalSettings = _.options;
		      if (typeof document.mozHidden !== 'undefined') {
		        _.hidden = 'mozHidden';
		        _.visibilityChange = 'mozvisibilitychange';
		      } else if (typeof document.webkitHidden !== 'undefined') {
		        _.hidden = 'webkitHidden';
		        _.visibilityChange = 'webkitvisibilitychange';
		      }
		      _.autoPlay = $.proxy(_.autoPlay, _);
		      _.autoPlayClear = $.proxy(_.autoPlayClear, _);
		      _.autoPlayIterator = $.proxy(_.autoPlayIterator, _);
		      _.changeSlide = $.proxy(_.changeSlide, _);
		      _.clickHandler = $.proxy(_.clickHandler, _);
		      _.selectHandler = $.proxy(_.selectHandler, _);
		      _.setPosition = $.proxy(_.setPosition, _);
		      _.swipeHandler = $.proxy(_.swipeHandler, _);
		      _.dragHandler = $.proxy(_.dragHandler, _);
		      _.keyHandler = $.proxy(_.keyHandler, _);
		      _.instanceUid = instanceUid++;

		      // A simple way to check for HTML strings
		      // Strict HTML recognition (must start with <)
		      // Extracted from jQuery v1.11 source
		      _.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/;
		      _.registerBreakpoints();
		      _.init(true);
		    }
		    return Slick;
		  }();
		  Slick.prototype.activateADA = function () {
		    var _ = this;
		    _.$slideTrack.find('.slick-active').attr({
		      'aria-hidden': 'false'
		    }).find('a, input, button, select').attr({
		      'tabindex': '0'
		    });
		  };
		  Slick.prototype.addSlide = Slick.prototype.slickAdd = function (markup, index, addBefore) {
		    var _ = this;
		    if (typeof index === 'boolean') {
		      addBefore = index;
		      index = null;
		    } else if (index < 0 || index >= _.slideCount) {
		      return false;
		    }
		    _.unload();
		    if (typeof index === 'number') {
		      if (index === 0 && _.$slides.length === 0) {
		        $(markup).appendTo(_.$slideTrack);
		      } else if (addBefore) {
		        $(markup).insertBefore(_.$slides.eq(index));
		      } else {
		        $(markup).insertAfter(_.$slides.eq(index));
		      }
		    } else {
		      if (addBefore === true) {
		        $(markup).prependTo(_.$slideTrack);
		      } else {
		        $(markup).appendTo(_.$slideTrack);
		      }
		    }
		    _.$slides = _.$slideTrack.children(this.options.slide);
		    _.$slideTrack.children(this.options.slide).detach();
		    _.$slideTrack.append(_.$slides);
		    _.$slides.each(function (index, element) {
		      $(element).attr('data-slick-index', index);
		    });
		    _.$slidesCache = _.$slides;
		    _.reinit();
		  };
		  Slick.prototype.animateHeight = function () {
		    var _ = this;
		    if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
		      var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
		      _.$list.animate({
		        height: targetHeight
		      }, _.options.speed);
		    }
		  };
		  Slick.prototype.animateSlide = function (targetLeft, callback) {
		    var animProps = {},
		      _ = this;
		    _.animateHeight();
		    if (_.options.rtl === true && _.options.vertical === false) {
		      targetLeft = -targetLeft;
		    }
		    if (_.transformsEnabled === false) {
		      if (_.options.vertical === false) {
		        _.$slideTrack.animate({
		          left: targetLeft
		        }, _.options.speed, _.options.easing, callback);
		      } else {
		        _.$slideTrack.animate({
		          top: targetLeft
		        }, _.options.speed, _.options.easing, callback);
		      }
		    } else {
		      if (_.cssTransitions === false) {
		        if (_.options.rtl === true) {
		          _.currentLeft = -_.currentLeft;
		        }
		        $({
		          animStart: _.currentLeft
		        }).animate({
		          animStart: targetLeft
		        }, {
		          duration: _.options.speed,
		          easing: _.options.easing,
		          step: function (now) {
		            now = Math.ceil(now);
		            if (_.options.vertical === false) {
		              animProps[_.animType] = 'translate(' + now + 'px, 0px)';
		              _.$slideTrack.css(animProps);
		            } else {
		              animProps[_.animType] = 'translate(0px,' + now + 'px)';
		              _.$slideTrack.css(animProps);
		            }
		          },
		          complete: function () {
		            if (callback) {
		              callback.call();
		            }
		          }
		        });
		      } else {
		        _.applyTransition();
		        targetLeft = Math.ceil(targetLeft);
		        if (_.options.vertical === false) {
		          animProps[_.animType] = 'translate3d(' + targetLeft + 'px, 0px, 0px)';
		        } else {
		          animProps[_.animType] = 'translate3d(0px,' + targetLeft + 'px, 0px)';
		        }
		        _.$slideTrack.css(animProps);
		        if (callback) {
		          setTimeout(function () {
		            _.disableTransition();
		            callback.call();
		          }, _.options.speed);
		        }
		      }
		    }
		  };
		  Slick.prototype.getNavTarget = function () {
		    var _ = this,
		      asNavFor = _.options.asNavFor;
		    if (asNavFor && asNavFor !== null) {
		      asNavFor = $(asNavFor).not(_.$slider);
		    }
		    return asNavFor;
		  };
		  Slick.prototype.asNavFor = function (index) {
		    var _ = this,
		      asNavFor = _.getNavTarget();
		    if (asNavFor !== null && typeof asNavFor === 'object') {
		      asNavFor.each(function () {
		        var target = $(this).slick('getSlick');
		        if (!target.unslicked) {
		          target.slideHandler(index, true);
		        }
		      });
		    }
		  };
		  Slick.prototype.applyTransition = function (slide) {
		    var _ = this,
		      transition = {};
		    if (_.options.fade === false) {
		      transition[_.transitionType] = _.transformType + ' ' + _.options.speed + 'ms ' + _.options.cssEase;
		    } else {
		      transition[_.transitionType] = 'opacity ' + _.options.speed + 'ms ' + _.options.cssEase;
		    }
		    if (_.options.fade === false) {
		      _.$slideTrack.css(transition);
		    } else {
		      _.$slides.eq(slide).css(transition);
		    }
		  };
		  Slick.prototype.autoPlay = function () {
		    var _ = this;
		    _.autoPlayClear();
		    if (_.slideCount > _.options.slidesToShow) {
		      _.autoPlayTimer = setInterval(_.autoPlayIterator, _.options.autoplaySpeed);
		    }
		  };
		  Slick.prototype.autoPlayClear = function () {
		    var _ = this;
		    if (_.autoPlayTimer) {
		      clearInterval(_.autoPlayTimer);
		    }
		  };
		  Slick.prototype.autoPlayIterator = function () {
		    var _ = this,
		      slideTo = _.currentSlide + _.options.slidesToScroll;
		    if (!_.paused && !_.interrupted && !_.focussed) {
		      if (_.options.infinite === false) {
		        if (_.direction === 1 && _.currentSlide + 1 === _.slideCount - 1) {
		          _.direction = 0;
		        } else if (_.direction === 0) {
		          slideTo = _.currentSlide - _.options.slidesToScroll;
		          if (_.currentSlide - 1 === 0) {
		            _.direction = 1;
		          }
		        }
		      }
		      _.slideHandler(slideTo);
		    }
		  };
		  Slick.prototype.buildArrows = function () {
		    var _ = this;
		    if (_.options.arrows === true) {
		      _.$prevArrow = $(_.options.prevArrow).addClass('slick-arrow');
		      _.$nextArrow = $(_.options.nextArrow).addClass('slick-arrow');
		      if (_.slideCount > _.options.slidesToShow) {
		        _.$prevArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');
		        _.$nextArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');
		        if (_.htmlExpr.test(_.options.prevArrow)) {
		          _.$prevArrow.prependTo(_.options.appendArrows);
		        }
		        if (_.htmlExpr.test(_.options.nextArrow)) {
		          _.$nextArrow.appendTo(_.options.appendArrows);
		        }
		        if (_.options.infinite !== true) {
		          _.$prevArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
		        }
		      } else {
		        _.$prevArrow.add(_.$nextArrow).addClass('slick-hidden').attr({
		          'aria-disabled': 'true',
		          'tabindex': '-1'
		        });
		      }
		    }
		  };
		  Slick.prototype.buildDots = function () {
		    var _ = this,
		      i,
		      dot;
		    if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
		      _.$slider.addClass('slick-dotted');
		      dot = $('<ul />').addClass(_.options.dotsClass);
		      for (i = 0; i <= _.getDotCount(); i += 1) {
		        dot.append($('<li />').append(_.options.customPaging.call(this, _, i)));
		      }
		      _.$dots = dot.appendTo(_.options.appendDots);
		      _.$dots.find('li').first().addClass('slick-active');
		    }
		  };
		  Slick.prototype.buildOut = function () {
		    var _ = this;
		    _.$slides = _.$slider.children(_.options.slide + ':not(.slick-cloned)').addClass('slick-slide');
		    _.slideCount = _.$slides.length;
		    _.$slides.each(function (index, element) {
		      $(element).attr('data-slick-index', index).data('originalStyling', $(element).attr('style') || '');
		    });
		    _.$slider.addClass('slick-slider');
		    _.$slideTrack = _.slideCount === 0 ? $('<div class="slick-track"/>').appendTo(_.$slider) : _.$slides.wrapAll('<div class="slick-track"/>').parent();
		    _.$list = _.$slideTrack.wrap('<div class="slick-list"/>').parent();
		    _.$slideTrack.css('opacity', 0);
		    if (_.options.centerMode === true || _.options.swipeToSlide === true) {
		      _.options.slidesToScroll = 1;
		    }
		    $('img[data-lazy]', _.$slider).not('[src]').addClass('slick-loading');
		    _.setupInfinite();
		    _.buildArrows();
		    _.buildDots();
		    _.updateDots();
		    _.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);
		    if (_.options.draggable === true) {
		      _.$list.addClass('draggable');
		    }
		  };
		  Slick.prototype.buildRows = function () {
		    var _ = this,
		      a,
		      b,
		      c,
		      newSlides,
		      numOfSlides,
		      originalSlides,
		      slidesPerSection;
		    newSlides = document.createDocumentFragment();
		    originalSlides = _.$slider.children();
		    if (_.options.rows > 0) {
		      slidesPerSection = _.options.slidesPerRow * _.options.rows;
		      numOfSlides = Math.ceil(originalSlides.length / slidesPerSection);
		      for (a = 0; a < numOfSlides; a++) {
		        var slide = document.createElement('div');
		        for (b = 0; b < _.options.rows; b++) {
		          var row = document.createElement('div');
		          for (c = 0; c < _.options.slidesPerRow; c++) {
		            var target = a * slidesPerSection + (b * _.options.slidesPerRow + c);
		            if (originalSlides.get(target)) {
		              row.appendChild(originalSlides.get(target));
		            }
		          }
		          slide.appendChild(row);
		        }
		        newSlides.appendChild(slide);
		      }
		      _.$slider.empty().append(newSlides);
		      _.$slider.children().children().children().css({
		        'width': 100 / _.options.slidesPerRow + '%',
		        'display': 'inline-block'
		      });
		    }
		  };
		  Slick.prototype.checkResponsive = function (initial, forceUpdate) {
		    var _ = this,
		      breakpoint,
		      targetBreakpoint,
		      respondToWidth,
		      triggerBreakpoint = false;
		    var sliderWidth = _.$slider.width();
		    var windowWidth = window.innerWidth || $(window).width();
		    if (_.respondTo === 'window') {
		      respondToWidth = windowWidth;
		    } else if (_.respondTo === 'slider') {
		      respondToWidth = sliderWidth;
		    } else if (_.respondTo === 'min') {
		      respondToWidth = Math.min(windowWidth, sliderWidth);
		    }
		    if (_.options.responsive && _.options.responsive.length && _.options.responsive !== null) {
		      targetBreakpoint = null;
		      for (breakpoint in _.breakpoints) {
		        if (_.breakpoints.hasOwnProperty(breakpoint)) {
		          if (_.originalSettings.mobileFirst === false) {
		            if (respondToWidth < _.breakpoints[breakpoint]) {
		              targetBreakpoint = _.breakpoints[breakpoint];
		            }
		          } else {
		            if (respondToWidth > _.breakpoints[breakpoint]) {
		              targetBreakpoint = _.breakpoints[breakpoint];
		            }
		          }
		        }
		      }
		      if (targetBreakpoint !== null) {
		        if (_.activeBreakpoint !== null) {
		          if (targetBreakpoint !== _.activeBreakpoint || forceUpdate) {
		            _.activeBreakpoint = targetBreakpoint;
		            if (_.breakpointSettings[targetBreakpoint] === 'unslick') {
		              _.unslick(targetBreakpoint);
		            } else {
		              _.options = $.extend({}, _.originalSettings, _.breakpointSettings[targetBreakpoint]);
		              if (initial === true) {
		                _.currentSlide = _.options.initialSlide;
		              }
		              _.refresh(initial);
		            }
		            triggerBreakpoint = targetBreakpoint;
		          }
		        } else {
		          _.activeBreakpoint = targetBreakpoint;
		          if (_.breakpointSettings[targetBreakpoint] === 'unslick') {
		            _.unslick(targetBreakpoint);
		          } else {
		            _.options = $.extend({}, _.originalSettings, _.breakpointSettings[targetBreakpoint]);
		            if (initial === true) {
		              _.currentSlide = _.options.initialSlide;
		            }
		            _.refresh(initial);
		          }
		          triggerBreakpoint = targetBreakpoint;
		        }
		      } else {
		        if (_.activeBreakpoint !== null) {
		          _.activeBreakpoint = null;
		          _.options = _.originalSettings;
		          if (initial === true) {
		            _.currentSlide = _.options.initialSlide;
		          }
		          _.refresh(initial);
		          triggerBreakpoint = targetBreakpoint;
		        }
		      }

		      // only trigger breakpoints during an actual break. not on initialize.
		      if (!initial && triggerBreakpoint !== false) {
		        _.$slider.trigger('breakpoint', [_, triggerBreakpoint]);
		      }
		    }
		  };
		  Slick.prototype.changeSlide = function (event, dontAnimate) {
		    var _ = this,
		      $target = $(event.currentTarget),
		      indexOffset,
		      slideOffset,
		      unevenOffset;

		    // If target is a link, prevent default action.
		    if ($target.is('a')) {
		      event.preventDefault();
		    }

		    // If target is not the <li> element (ie: a child), find the <li>.
		    if (!$target.is('li')) {
		      $target = $target.closest('li');
		    }
		    unevenOffset = _.slideCount % _.options.slidesToScroll !== 0;
		    indexOffset = unevenOffset ? 0 : (_.slideCount - _.currentSlide) % _.options.slidesToScroll;
		    switch (event.data.message) {
		      case 'previous':
		        slideOffset = indexOffset === 0 ? _.options.slidesToScroll : _.options.slidesToShow - indexOffset;
		        if (_.slideCount > _.options.slidesToShow) {
		          _.slideHandler(_.currentSlide - slideOffset, false, dontAnimate);
		        }
		        break;
		      case 'next':
		        slideOffset = indexOffset === 0 ? _.options.slidesToScroll : indexOffset;
		        if (_.slideCount > _.options.slidesToShow) {
		          _.slideHandler(_.currentSlide + slideOffset, false, dontAnimate);
		        }
		        break;
		      case 'index':
		        var index = event.data.index === 0 ? 0 : event.data.index || $target.index() * _.options.slidesToScroll;
		        _.slideHandler(_.checkNavigable(index), false, dontAnimate);
		        $target.children().trigger('focus');
		        break;
		      default:
		        return;
		    }
		  };
		  Slick.prototype.checkNavigable = function (index) {
		    var _ = this,
		      navigables,
		      prevNavigable;
		    navigables = _.getNavigableIndexes();
		    prevNavigable = 0;
		    if (index > navigables[navigables.length - 1]) {
		      index = navigables[navigables.length - 1];
		    } else {
		      for (var n in navigables) {
		        if (index < navigables[n]) {
		          index = prevNavigable;
		          break;
		        }
		        prevNavigable = navigables[n];
		      }
		    }
		    return index;
		  };
		  Slick.prototype.cleanUpEvents = function () {
		    var _ = this;
		    if (_.options.dots && _.$dots !== null) {
		      $('li', _.$dots).off('click.slick', _.changeSlide).off('mouseenter.slick', $.proxy(_.interrupt, _, true)).off('mouseleave.slick', $.proxy(_.interrupt, _, false));
		      if (_.options.accessibility === true) {
		        _.$dots.off('keydown.slick', _.keyHandler);
		      }
		    }
		    _.$slider.off('focus.slick blur.slick');
		    if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
		      _.$prevArrow && _.$prevArrow.off('click.slick', _.changeSlide);
		      _.$nextArrow && _.$nextArrow.off('click.slick', _.changeSlide);
		      if (_.options.accessibility === true) {
		        _.$prevArrow && _.$prevArrow.off('keydown.slick', _.keyHandler);
		        _.$nextArrow && _.$nextArrow.off('keydown.slick', _.keyHandler);
		      }
		    }
		    _.$list.off('touchstart.slick mousedown.slick', _.swipeHandler);
		    _.$list.off('touchmove.slick mousemove.slick', _.swipeHandler);
		    _.$list.off('touchend.slick mouseup.slick', _.swipeHandler);
		    _.$list.off('touchcancel.slick mouseleave.slick', _.swipeHandler);
		    _.$list.off('click.slick', _.clickHandler);
		    $(document).off(_.visibilityChange, _.visibility);
		    _.cleanUpSlideEvents();
		    if (_.options.accessibility === true) {
		      _.$list.off('keydown.slick', _.keyHandler);
		    }
		    if (_.options.focusOnSelect === true) {
		      $(_.$slideTrack).children().off('click.slick', _.selectHandler);
		    }
		    $(window).off('orientationchange.slick.slick-' + _.instanceUid, _.orientationChange);
		    $(window).off('resize.slick.slick-' + _.instanceUid, _.resize);
		    $('[draggable!=true]', _.$slideTrack).off('dragstart', _.preventDefault);
		    $(window).off('load.slick.slick-' + _.instanceUid, _.setPosition);
		  };
		  Slick.prototype.cleanUpSlideEvents = function () {
		    var _ = this;
		    _.$list.off('mouseenter.slick', $.proxy(_.interrupt, _, true));
		    _.$list.off('mouseleave.slick', $.proxy(_.interrupt, _, false));
		  };
		  Slick.prototype.cleanUpRows = function () {
		    var _ = this,
		      originalSlides;
		    if (_.options.rows > 0) {
		      originalSlides = _.$slides.children().children();
		      originalSlides.removeAttr('style');
		      _.$slider.empty().append(originalSlides);
		    }
		  };
		  Slick.prototype.clickHandler = function (event) {
		    var _ = this;
		    if (_.shouldClick === false) {
		      event.stopImmediatePropagation();
		      event.stopPropagation();
		      event.preventDefault();
		    }
		  };
		  Slick.prototype.destroy = function (refresh) {
		    var _ = this;
		    _.autoPlayClear();
		    _.touchObject = {};
		    _.cleanUpEvents();
		    $('.slick-cloned', _.$slider).detach();
		    if (_.$dots) {
		      _.$dots.remove();
		    }
		    if (_.$prevArrow && _.$prevArrow.length) {
		      _.$prevArrow.removeClass('slick-disabled slick-arrow slick-hidden').removeAttr('aria-hidden aria-disabled tabindex').css('display', '');
		      if (_.htmlExpr.test(_.options.prevArrow)) {
		        _.$prevArrow.remove();
		      }
		    }
		    if (_.$nextArrow && _.$nextArrow.length) {
		      _.$nextArrow.removeClass('slick-disabled slick-arrow slick-hidden').removeAttr('aria-hidden aria-disabled tabindex').css('display', '');
		      if (_.htmlExpr.test(_.options.nextArrow)) {
		        _.$nextArrow.remove();
		      }
		    }
		    if (_.$slides) {
		      _.$slides.removeClass('slick-slide slick-active slick-center slick-visible slick-current').removeAttr('aria-hidden').removeAttr('data-slick-index').each(function () {
		        $(this).attr('style', $(this).data('originalStyling'));
		      });
		      _.$slideTrack.children(this.options.slide).detach();
		      _.$slideTrack.detach();
		      _.$list.detach();
		      _.$slider.append(_.$slides);
		    }
		    _.cleanUpRows();
		    _.$slider.removeClass('slick-slider');
		    _.$slider.removeClass('slick-initialized');
		    _.$slider.removeClass('slick-dotted');
		    _.unslicked = true;
		    if (!refresh) {
		      _.$slider.trigger('destroy', [_]);
		    }
		  };
		  Slick.prototype.disableTransition = function (slide) {
		    var _ = this,
		      transition = {};
		    transition[_.transitionType] = '';
		    if (_.options.fade === false) {
		      _.$slideTrack.css(transition);
		    } else {
		      _.$slides.eq(slide).css(transition);
		    }
		  };
		  Slick.prototype.fadeSlide = function (slideIndex, callback) {
		    var _ = this;
		    if (_.cssTransitions === false) {
		      _.$slides.eq(slideIndex).css({
		        zIndex: _.options.zIndex
		      });
		      _.$slides.eq(slideIndex).animate({
		        opacity: 1
		      }, _.options.speed, _.options.easing, callback);
		    } else {
		      _.applyTransition(slideIndex);
		      _.$slides.eq(slideIndex).css({
		        opacity: 1,
		        zIndex: _.options.zIndex
		      });
		      if (callback) {
		        setTimeout(function () {
		          _.disableTransition(slideIndex);
		          callback.call();
		        }, _.options.speed);
		      }
		    }
		  };
		  Slick.prototype.fadeSlideOut = function (slideIndex) {
		    var _ = this;
		    if (_.cssTransitions === false) {
		      _.$slides.eq(slideIndex).animate({
		        opacity: 0,
		        zIndex: _.options.zIndex - 2
		      }, _.options.speed, _.options.easing);
		    } else {
		      _.applyTransition(slideIndex);
		      _.$slides.eq(slideIndex).css({
		        opacity: 0,
		        zIndex: _.options.zIndex - 2
		      });
		    }
		  };
		  Slick.prototype.filterSlides = Slick.prototype.slickFilter = function (filter) {
		    var _ = this;
		    if (filter !== null) {
		      _.$slidesCache = _.$slides;
		      _.unload();
		      _.$slideTrack.children(this.options.slide).detach();
		      _.$slidesCache.filter(filter).appendTo(_.$slideTrack);
		      _.reinit();
		    }
		  };
		  Slick.prototype.focusHandler = function () {
		    var _ = this;
		    _.$slider.off('focus.slick blur.slick').on('focus.slick blur.slick', '*', function (event) {
		      event.stopImmediatePropagation();
		      var $sf = $(this);
		      setTimeout(function () {
		        if (_.options.pauseOnFocus) {
		          _.focussed = $sf.is(':focus');
		          _.autoPlay();
		        }
		      }, 0);
		    });
		  };
		  Slick.prototype.getCurrent = Slick.prototype.slickCurrentSlide = function () {
		    var _ = this;
		    return _.currentSlide;
		  };
		  Slick.prototype.getDotCount = function () {
		    var _ = this;
		    var breakPoint = 0;
		    var counter = 0;
		    var pagerQty = 0;
		    if (_.options.infinite === true) {
		      if (_.slideCount <= _.options.slidesToShow) {
		        ++pagerQty;
		      } else {
		        while (breakPoint < _.slideCount) {
		          ++pagerQty;
		          breakPoint = counter + _.options.slidesToScroll;
		          counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
		        }
		      }
		    } else if (_.options.centerMode === true) {
		      pagerQty = _.slideCount;
		    } else if (!_.options.asNavFor) {
		      pagerQty = 1 + Math.ceil((_.slideCount - _.options.slidesToShow) / _.options.slidesToScroll);
		    } else {
		      while (breakPoint < _.slideCount) {
		        ++pagerQty;
		        breakPoint = counter + _.options.slidesToScroll;
		        counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
		      }
		    }
		    return pagerQty - 1;
		  };
		  Slick.prototype.getLeft = function (slideIndex) {
		    var _ = this,
		      targetLeft,
		      verticalHeight,
		      verticalOffset = 0,
		      targetSlide,
		      coef;
		    _.slideOffset = 0;
		    verticalHeight = _.$slides.first().outerHeight(true);
		    if (_.options.infinite === true) {
		      if (_.slideCount > _.options.slidesToShow) {
		        _.slideOffset = _.slideWidth * _.options.slidesToShow * -1;
		        coef = -1;
		        if (_.options.vertical === true && _.options.centerMode === true) {
		          if (_.options.slidesToShow === 2) {
		            coef = -1.5;
		          } else if (_.options.slidesToShow === 1) {
		            coef = -2;
		          }
		        }
		        verticalOffset = verticalHeight * _.options.slidesToShow * coef;
		      }
		      if (_.slideCount % _.options.slidesToScroll !== 0) {
		        if (slideIndex + _.options.slidesToScroll > _.slideCount && _.slideCount > _.options.slidesToShow) {
		          if (slideIndex > _.slideCount) {
		            _.slideOffset = (_.options.slidesToShow - (slideIndex - _.slideCount)) * _.slideWidth * -1;
		            verticalOffset = (_.options.slidesToShow - (slideIndex - _.slideCount)) * verticalHeight * -1;
		          } else {
		            _.slideOffset = _.slideCount % _.options.slidesToScroll * _.slideWidth * -1;
		            verticalOffset = _.slideCount % _.options.slidesToScroll * verticalHeight * -1;
		          }
		        }
		      }
		    } else {
		      if (slideIndex + _.options.slidesToShow > _.slideCount) {
		        _.slideOffset = (slideIndex + _.options.slidesToShow - _.slideCount) * _.slideWidth;
		        verticalOffset = (slideIndex + _.options.slidesToShow - _.slideCount) * verticalHeight;
		      }
		    }
		    if (_.slideCount <= _.options.slidesToShow) {
		      _.slideOffset = 0;
		      verticalOffset = 0;
		    }
		    if (_.options.centerMode === true && _.slideCount <= _.options.slidesToShow) {
		      _.slideOffset = _.slideWidth * Math.floor(_.options.slidesToShow) / 2 - _.slideWidth * _.slideCount / 2;
		    } else if (_.options.centerMode === true && _.options.infinite === true) {
		      _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2) - _.slideWidth;
		    } else if (_.options.centerMode === true) {
		      _.slideOffset = 0;
		      _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2);
		    }
		    if (_.options.vertical === false) {
		      targetLeft = slideIndex * _.slideWidth * -1 + _.slideOffset;
		    } else {
		      targetLeft = slideIndex * verticalHeight * -1 + verticalOffset;
		    }
		    if (_.options.variableWidth === true) {
		      if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
		        targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);
		      } else {
		        targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow);
		      }
		      if (_.options.rtl === true) {
		        if (targetSlide[0]) {
		          targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
		        } else {
		          targetLeft = 0;
		        }
		      } else {
		        targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
		      }
		      if (_.options.centerMode === true) {
		        if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
		          targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);
		        } else {
		          targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow + 1);
		        }
		        if (_.options.rtl === true) {
		          if (targetSlide[0]) {
		            targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
		          } else {
		            targetLeft = 0;
		          }
		        } else {
		          targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
		        }
		        targetLeft += (_.$list.width() - targetSlide.outerWidth()) / 2;
		      }
		    }
		    return targetLeft;
		  };
		  Slick.prototype.getOption = Slick.prototype.slickGetOption = function (option) {
		    var _ = this;
		    return _.options[option];
		  };
		  Slick.prototype.getNavigableIndexes = function () {
		    var _ = this,
		      breakPoint = 0,
		      counter = 0,
		      indexes = [],
		      max;
		    if (_.options.infinite === false) {
		      max = _.slideCount;
		    } else {
		      breakPoint = _.options.slidesToScroll * -1;
		      counter = _.options.slidesToScroll * -1;
		      max = _.slideCount * 2;
		    }
		    while (breakPoint < max) {
		      indexes.push(breakPoint);
		      breakPoint = counter + _.options.slidesToScroll;
		      counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
		    }
		    return indexes;
		  };
		  Slick.prototype.getSlick = function () {
		    return this;
		  };
		  Slick.prototype.getSlideCount = function () {
		    var _ = this,
		      slidesTraversed,
		      swipedSlide,
		      centerOffset;
		    centerOffset = _.options.centerMode === true ? _.slideWidth * Math.floor(_.options.slidesToShow / 2) : 0;
		    if (_.options.swipeToSlide === true) {
		      _.$slideTrack.find('.slick-slide').each(function (index, slide) {
		        if (slide.offsetLeft - centerOffset + $(slide).outerWidth() / 2 > _.swipeLeft * -1) {
		          swipedSlide = slide;
		          return false;
		        }
		      });
		      slidesTraversed = Math.abs($(swipedSlide).attr('data-slick-index') - _.currentSlide) || 1;
		      return slidesTraversed;
		    } else {
		      return _.options.slidesToScroll;
		    }
		  };
		  Slick.prototype.goTo = Slick.prototype.slickGoTo = function (slide, dontAnimate) {
		    var _ = this;
		    _.changeSlide({
		      data: {
		        message: 'index',
		        index: parseInt(slide)
		      }
		    }, dontAnimate);
		  };
		  Slick.prototype.init = function (creation) {
		    var _ = this;
		    if (!$(_.$slider).hasClass('slick-initialized')) {
		      $(_.$slider).addClass('slick-initialized');
		      _.buildRows();
		      _.buildOut();
		      _.setProps();
		      _.startLoad();
		      _.loadSlider();
		      _.initializeEvents();
		      _.updateArrows();
		      _.updateDots();
		      _.checkResponsive(true);
		      _.focusHandler();
		    }
		    if (creation) {
		      _.$slider.trigger('init', [_]);
		    }
		    if (_.options.accessibility === true) {
		      _.initADA();
		    }
		    if (_.options.autoplay) {
		      _.paused = false;
		      _.autoPlay();
		    }
		  };
		  Slick.prototype.initADA = function () {
		    var _ = this,
		      numDotGroups = Math.ceil(_.slideCount / _.options.slidesToShow),
		      tabControlIndexes = _.getNavigableIndexes().filter(function (val) {
		        return val >= 0 && val < _.slideCount;
		      });
		    _.$slides.add(_.$slideTrack.find('.slick-cloned')).attr({
		      'aria-hidden': 'true',
		      'tabindex': '-1'
		    }).find('a, input, button, select').attr({
		      'tabindex': '-1'
		    });
		    if (_.$dots !== null) {
		      _.$slides.not(_.$slideTrack.find('.slick-cloned')).each(function (i) {
		        var slideControlIndex = tabControlIndexes.indexOf(i);
		        $(this).attr({
		          'role': 'tabpanel',
		          'id': 'slick-slide' + _.instanceUid + i,
		          'tabindex': -1
		        });
		        if (slideControlIndex !== -1) {
		          var ariaButtonControl = 'slick-slide-control' + _.instanceUid + slideControlIndex;
		          if ($('#' + ariaButtonControl).length) {
		            $(this).attr({
		              'aria-describedby': ariaButtonControl
		            });
		          }
		        }
		      });
		      _.$dots.attr('role', 'tablist').find('li').each(function (i) {
		        var mappedSlideIndex = tabControlIndexes[i];
		        $(this).attr({
		          'role': 'presentation'
		        });
		        $(this).find('button').first().attr({
		          'role': 'tab',
		          'id': 'slick-slide-control' + _.instanceUid + i,
		          'aria-controls': 'slick-slide' + _.instanceUid + mappedSlideIndex,
		          'aria-label': i + 1 + ' of ' + numDotGroups,
		          'aria-selected': null,
		          'tabindex': '-1'
		        });
		      }).eq(_.currentSlide).find('button').attr({
		        'aria-selected': 'true',
		        'tabindex': '0'
		      }).end();
		    }
		    for (var i = _.currentSlide, max = i + _.options.slidesToShow; i < max; i++) {
		      if (_.options.focusOnChange) {
		        _.$slides.eq(i).attr({
		          'tabindex': '0'
		        });
		      } else {
		        _.$slides.eq(i).removeAttr('tabindex');
		      }
		    }
		    _.activateADA();
		  };
		  Slick.prototype.initArrowEvents = function () {
		    var _ = this;
		    if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
		      _.$prevArrow.off('click.slick').on('click.slick', {
		        message: 'previous'
		      }, _.changeSlide);
		      _.$nextArrow.off('click.slick').on('click.slick', {
		        message: 'next'
		      }, _.changeSlide);
		      if (_.options.accessibility === true) {
		        _.$prevArrow.on('keydown.slick', _.keyHandler);
		        _.$nextArrow.on('keydown.slick', _.keyHandler);
		      }
		    }
		  };
		  Slick.prototype.initDotEvents = function () {
		    var _ = this;
		    if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
		      $('li', _.$dots).on('click.slick', {
		        message: 'index'
		      }, _.changeSlide);
		      if (_.options.accessibility === true) {
		        _.$dots.on('keydown.slick', _.keyHandler);
		      }
		    }
		    if (_.options.dots === true && _.options.pauseOnDotsHover === true && _.slideCount > _.options.slidesToShow) {
		      $('li', _.$dots).on('mouseenter.slick', $.proxy(_.interrupt, _, true)).on('mouseleave.slick', $.proxy(_.interrupt, _, false));
		    }
		  };
		  Slick.prototype.initSlideEvents = function () {
		    var _ = this;
		    if (_.options.pauseOnHover) {
		      _.$list.on('mouseenter.slick', $.proxy(_.interrupt, _, true));
		      _.$list.on('mouseleave.slick', $.proxy(_.interrupt, _, false));
		    }
		  };
		  Slick.prototype.initializeEvents = function () {
		    var _ = this;
		    _.initArrowEvents();
		    _.initDotEvents();
		    _.initSlideEvents();
		    _.$list.on('touchstart.slick mousedown.slick', {
		      action: 'start'
		    }, _.swipeHandler);
		    _.$list.on('touchmove.slick mousemove.slick', {
		      action: 'move'
		    }, _.swipeHandler);
		    _.$list.on('touchend.slick mouseup.slick', {
		      action: 'end'
		    }, _.swipeHandler);
		    _.$list.on('touchcancel.slick mouseleave.slick', {
		      action: 'end'
		    }, _.swipeHandler);
		    _.$list.on('click.slick', _.clickHandler);
		    $(document).on(_.visibilityChange, $.proxy(_.visibility, _));
		    if (_.options.accessibility === true) {
		      _.$list.on('keydown.slick', _.keyHandler);
		    }
		    if (_.options.focusOnSelect === true) {
		      $(_.$slideTrack).children().on('click.slick', _.selectHandler);
		    }
		    $(window).on('orientationchange.slick.slick-' + _.instanceUid, $.proxy(_.orientationChange, _));
		    $(window).on('resize.slick.slick-' + _.instanceUid, $.proxy(_.resize, _));
		    $('[draggable!=true]', _.$slideTrack).on('dragstart', _.preventDefault);
		    $(window).on('load.slick.slick-' + _.instanceUid, _.setPosition);
		    $(_.setPosition);
		  };
		  Slick.prototype.initUI = function () {
		    var _ = this;
		    if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
		      _.$prevArrow.show();
		      _.$nextArrow.show();
		    }
		    if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
		      _.$dots.show();
		    }
		  };
		  Slick.prototype.keyHandler = function (event) {
		    var _ = this;
		    //Dont slide if the cursor is inside the form fields and arrow keys are pressed
		    if (!event.target.tagName.match('TEXTAREA|INPUT|SELECT')) {
		      if (event.keyCode === 37 && _.options.accessibility === true) {
		        _.changeSlide({
		          data: {
		            message: _.options.rtl === true ? 'next' : 'previous'
		          }
		        });
		      } else if (event.keyCode === 39 && _.options.accessibility === true) {
		        _.changeSlide({
		          data: {
		            message: _.options.rtl === true ? 'previous' : 'next'
		          }
		        });
		      }
		    }
		  };
		  Slick.prototype.lazyLoad = function () {
		    var _ = this,
		      loadRange,
		      cloneRange,
		      rangeStart,
		      rangeEnd;
		    function loadImages(imagesScope) {
		      $('img[data-lazy]', imagesScope).each(function () {
		        var image = $(this),
		          imageSource = $(this).attr('data-lazy'),
		          imageSrcSet = $(this).attr('data-srcset'),
		          imageSizes = $(this).attr('data-sizes') || _.$slider.attr('data-sizes'),
		          imageToLoad = document.createElement('img');
		        imageToLoad.onload = function () {
		          image.animate({
		            opacity: 0
		          }, 100, function () {
		            if (imageSrcSet) {
		              image.attr('srcset', imageSrcSet);
		              if (imageSizes) {
		                image.attr('sizes', imageSizes);
		              }
		            }
		            image.attr('src', imageSource).animate({
		              opacity: 1
		            }, 200, function () {
		              image.removeAttr('data-lazy data-srcset data-sizes').removeClass('slick-loading');
		            });
		            _.$slider.trigger('lazyLoaded', [_, image, imageSource]);
		          });
		        };
		        imageToLoad.onerror = function () {
		          image.removeAttr('data-lazy').removeClass('slick-loading').addClass('slick-lazyload-error');
		          _.$slider.trigger('lazyLoadError', [_, image, imageSource]);
		        };
		        imageToLoad.src = imageSource;
		      });
		    }
		    if (_.options.centerMode === true) {
		      if (_.options.infinite === true) {
		        rangeStart = _.currentSlide + (_.options.slidesToShow / 2 + 1);
		        rangeEnd = rangeStart + _.options.slidesToShow + 2;
		      } else {
		        rangeStart = Math.max(0, _.currentSlide - (_.options.slidesToShow / 2 + 1));
		        rangeEnd = 2 + (_.options.slidesToShow / 2 + 1) + _.currentSlide;
		      }
		    } else {
		      rangeStart = _.options.infinite ? _.options.slidesToShow + _.currentSlide : _.currentSlide;
		      rangeEnd = Math.ceil(rangeStart + _.options.slidesToShow);
		      if (_.options.fade === true) {
		        if (rangeStart > 0) rangeStart--;
		        if (rangeEnd <= _.slideCount) rangeEnd++;
		      }
		    }
		    loadRange = _.$slider.find('.slick-slide').slice(rangeStart, rangeEnd);
		    if (_.options.lazyLoad === 'anticipated') {
		      var prevSlide = rangeStart - 1,
		        nextSlide = rangeEnd,
		        $slides = _.$slider.find('.slick-slide');
		      for (var i = 0; i < _.options.slidesToScroll; i++) {
		        if (prevSlide < 0) prevSlide = _.slideCount - 1;
		        loadRange = loadRange.add($slides.eq(prevSlide));
		        loadRange = loadRange.add($slides.eq(nextSlide));
		        prevSlide--;
		        nextSlide++;
		      }
		    }
		    loadImages(loadRange);
		    if (_.slideCount <= _.options.slidesToShow) {
		      cloneRange = _.$slider.find('.slick-slide');
		      loadImages(cloneRange);
		    } else if (_.currentSlide >= _.slideCount - _.options.slidesToShow) {
		      cloneRange = _.$slider.find('.slick-cloned').slice(0, _.options.slidesToShow);
		      loadImages(cloneRange);
		    } else if (_.currentSlide === 0) {
		      cloneRange = _.$slider.find('.slick-cloned').slice(_.options.slidesToShow * -1);
		      loadImages(cloneRange);
		    }
		  };
		  Slick.prototype.loadSlider = function () {
		    var _ = this;
		    _.setPosition();
		    _.$slideTrack.css({
		      opacity: 1
		    });
		    _.$slider.removeClass('slick-loading');
		    _.initUI();
		    if (_.options.lazyLoad === 'progressive') {
		      _.progressiveLazyLoad();
		    }
		  };
		  Slick.prototype.next = Slick.prototype.slickNext = function () {
		    var _ = this;
		    _.changeSlide({
		      data: {
		        message: 'next'
		      }
		    });
		  };
		  Slick.prototype.orientationChange = function () {
		    var _ = this;
		    _.checkResponsive();
		    _.setPosition();
		  };
		  Slick.prototype.pause = Slick.prototype.slickPause = function () {
		    var _ = this;
		    _.autoPlayClear();
		    _.paused = true;
		  };
		  Slick.prototype.play = Slick.prototype.slickPlay = function () {
		    var _ = this;
		    _.autoPlay();
		    _.options.autoplay = true;
		    _.paused = false;
		    _.focussed = false;
		    _.interrupted = false;
		  };
		  Slick.prototype.postSlide = function (index) {
		    var _ = this;
		    if (!_.unslicked) {
		      _.$slider.trigger('afterChange', [_, index]);
		      _.animating = false;
		      if (_.slideCount > _.options.slidesToShow) {
		        _.setPosition();
		      }
		      _.swipeLeft = null;
		      if (_.options.autoplay) {
		        _.autoPlay();
		      }
		      if (_.options.accessibility === true) {
		        _.initADA();
		        if (_.options.focusOnChange) {
		          var $currentSlide = $(_.$slides.get(_.currentSlide));
		          $currentSlide.attr('tabindex', 0).focus();
		        }
		      }
		    }
		  };
		  Slick.prototype.prev = Slick.prototype.slickPrev = function () {
		    var _ = this;
		    _.changeSlide({
		      data: {
		        message: 'previous'
		      }
		    });
		  };
		  Slick.prototype.preventDefault = function (event) {
		    event.preventDefault();
		  };
		  Slick.prototype.progressiveLazyLoad = function (tryCount) {
		    tryCount = tryCount || 1;
		    var _ = this,
		      $imgsToLoad = $('img[data-lazy]', _.$slider),
		      image,
		      imageSource,
		      imageSrcSet,
		      imageSizes,
		      imageToLoad;
		    if ($imgsToLoad.length) {
		      image = $imgsToLoad.first();
		      imageSource = image.attr('data-lazy');
		      imageSrcSet = image.attr('data-srcset');
		      imageSizes = image.attr('data-sizes') || _.$slider.attr('data-sizes');
		      imageToLoad = document.createElement('img');
		      imageToLoad.onload = function () {
		        if (imageSrcSet) {
		          image.attr('srcset', imageSrcSet);
		          if (imageSizes) {
		            image.attr('sizes', imageSizes);
		          }
		        }
		        image.attr('src', imageSource).removeAttr('data-lazy data-srcset data-sizes').removeClass('slick-loading');
		        if (_.options.adaptiveHeight === true) {
		          _.setPosition();
		        }
		        _.$slider.trigger('lazyLoaded', [_, image, imageSource]);
		        _.progressiveLazyLoad();
		      };
		      imageToLoad.onerror = function () {
		        if (tryCount < 3) {
		          /**
		           * try to load the image 3 times,
		           * leave a slight delay so we don't get
		           * servers blocking the request.
		           */
		          setTimeout(function () {
		            _.progressiveLazyLoad(tryCount + 1);
		          }, 500);
		        } else {
		          image.removeAttr('data-lazy').removeClass('slick-loading').addClass('slick-lazyload-error');
		          _.$slider.trigger('lazyLoadError', [_, image, imageSource]);
		          _.progressiveLazyLoad();
		        }
		      };
		      imageToLoad.src = imageSource;
		    } else {
		      _.$slider.trigger('allImagesLoaded', [_]);
		    }
		  };
		  Slick.prototype.refresh = function (initializing) {
		    var _ = this,
		      currentSlide,
		      lastVisibleIndex;
		    lastVisibleIndex = _.slideCount - _.options.slidesToShow;

		    // in non-infinite sliders, we don't want to go past the
		    // last visible index.
		    if (!_.options.infinite && _.currentSlide > lastVisibleIndex) {
		      _.currentSlide = lastVisibleIndex;
		    }

		    // if less slides than to show, go to start.
		    if (_.slideCount <= _.options.slidesToShow) {
		      _.currentSlide = 0;
		    }
		    currentSlide = _.currentSlide;
		    _.destroy(true);
		    $.extend(_, _.initials, {
		      currentSlide: currentSlide
		    });
		    _.init();
		    if (!initializing) {
		      _.changeSlide({
		        data: {
		          message: 'index',
		          index: currentSlide
		        }
		      }, false);
		    }
		  };
		  Slick.prototype.registerBreakpoints = function () {
		    var _ = this,
		      breakpoint,
		      currentBreakpoint,
		      l,
		      responsiveSettings = _.options.responsive || null;
		    if ($.type(responsiveSettings) === 'array' && responsiveSettings.length) {
		      _.respondTo = _.options.respondTo || 'window';
		      for (breakpoint in responsiveSettings) {
		        l = _.breakpoints.length - 1;
		        if (responsiveSettings.hasOwnProperty(breakpoint)) {
		          currentBreakpoint = responsiveSettings[breakpoint].breakpoint;

		          // loop through the breakpoints and cut out any existing
		          // ones with the same breakpoint number, we don't want dupes.
		          while (l >= 0) {
		            if (_.breakpoints[l] && _.breakpoints[l] === currentBreakpoint) {
		              _.breakpoints.splice(l, 1);
		            }
		            l--;
		          }
		          _.breakpoints.push(currentBreakpoint);
		          _.breakpointSettings[currentBreakpoint] = responsiveSettings[breakpoint].settings;
		        }
		      }
		      _.breakpoints.sort(function (a, b) {
		        return _.options.mobileFirst ? a - b : b - a;
		      });
		    }
		  };
		  Slick.prototype.reinit = function () {
		    var _ = this;
		    _.$slides = _.$slideTrack.children(_.options.slide).addClass('slick-slide');
		    _.slideCount = _.$slides.length;
		    if (_.currentSlide >= _.slideCount && _.currentSlide !== 0) {
		      _.currentSlide = _.currentSlide - _.options.slidesToScroll;
		    }
		    if (_.slideCount <= _.options.slidesToShow) {
		      _.currentSlide = 0;
		    }
		    _.registerBreakpoints();
		    _.setProps();
		    _.setupInfinite();
		    _.buildArrows();
		    _.updateArrows();
		    _.initArrowEvents();
		    _.buildDots();
		    _.updateDots();
		    _.initDotEvents();
		    _.cleanUpSlideEvents();
		    _.initSlideEvents();
		    _.checkResponsive(false, true);
		    if (_.options.focusOnSelect === true) {
		      $(_.$slideTrack).children().on('click.slick', _.selectHandler);
		    }
		    _.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);
		    _.setPosition();
		    _.focusHandler();
		    _.paused = !_.options.autoplay;
		    _.autoPlay();
		    _.$slider.trigger('reInit', [_]);
		  };
		  Slick.prototype.resize = function () {
		    var _ = this;
		    if ($(window).width() !== _.windowWidth) {
		      clearTimeout(_.windowDelay);
		      _.windowDelay = window.setTimeout(function () {
		        _.windowWidth = $(window).width();
		        _.checkResponsive();
		        if (!_.unslicked) {
		          _.setPosition();
		        }
		      }, 50);
		    }
		  };
		  Slick.prototype.removeSlide = Slick.prototype.slickRemove = function (index, removeBefore, removeAll) {
		    var _ = this;
		    if (typeof index === 'boolean') {
		      removeBefore = index;
		      index = removeBefore === true ? 0 : _.slideCount - 1;
		    } else {
		      index = removeBefore === true ? --index : index;
		    }
		    if (_.slideCount < 1 || index < 0 || index > _.slideCount - 1) {
		      return false;
		    }
		    _.unload();
		    if (removeAll === true) {
		      _.$slideTrack.children().remove();
		    } else {
		      _.$slideTrack.children(this.options.slide).eq(index).remove();
		    }
		    _.$slides = _.$slideTrack.children(this.options.slide);
		    _.$slideTrack.children(this.options.slide).detach();
		    _.$slideTrack.append(_.$slides);
		    _.$slidesCache = _.$slides;
		    _.reinit();
		  };
		  Slick.prototype.setCSS = function (position) {
		    var _ = this,
		      positionProps = {},
		      x,
		      y;
		    if (_.options.rtl === true) {
		      position = -position;
		    }
		    x = _.positionProp == 'left' ? Math.ceil(position) + 'px' : '0px';
		    y = _.positionProp == 'top' ? Math.ceil(position) + 'px' : '0px';
		    positionProps[_.positionProp] = position;
		    if (_.transformsEnabled === false) {
		      _.$slideTrack.css(positionProps);
		    } else {
		      positionProps = {};
		      if (_.cssTransitions === false) {
		        positionProps[_.animType] = 'translate(' + x + ', ' + y + ')';
		        _.$slideTrack.css(positionProps);
		      } else {
		        positionProps[_.animType] = 'translate3d(' + x + ', ' + y + ', 0px)';
		        _.$slideTrack.css(positionProps);
		      }
		    }
		  };
		  Slick.prototype.setDimensions = function () {
		    var _ = this;
		    if (_.options.vertical === false) {
		      if (_.options.centerMode === true) {
		        _.$list.css({
		          padding: '0px ' + _.options.centerPadding
		        });
		      }
		    } else {
		      _.$list.height(_.$slides.first().outerHeight(true) * _.options.slidesToShow);
		      if (_.options.centerMode === true) {
		        _.$list.css({
		          padding: _.options.centerPadding + ' 0px'
		        });
		      }
		    }
		    _.listWidth = _.$list.width();
		    _.listHeight = _.$list.height();
		    if (_.options.vertical === false && _.options.variableWidth === false) {
		      _.slideWidth = Math.ceil(_.listWidth / _.options.slidesToShow);
		      _.$slideTrack.width(Math.ceil(_.slideWidth * _.$slideTrack.children('.slick-slide').length));
		    } else if (_.options.variableWidth === true) {
		      _.$slideTrack.width(5000 * _.slideCount);
		    } else {
		      _.slideWidth = Math.ceil(_.listWidth);
		      _.$slideTrack.height(Math.ceil(_.$slides.first().outerHeight(true) * _.$slideTrack.children('.slick-slide').length));
		    }
		    var offset = _.$slides.first().outerWidth(true) - _.$slides.first().width();
		    if (_.options.variableWidth === false) _.$slideTrack.children('.slick-slide').width(_.slideWidth - offset);
		  };
		  Slick.prototype.setFade = function () {
		    var _ = this,
		      targetLeft;
		    _.$slides.each(function (index, element) {
		      targetLeft = _.slideWidth * index * -1;
		      if (_.options.rtl === true) {
		        $(element).css({
		          position: 'relative',
		          right: targetLeft,
		          top: 0,
		          zIndex: _.options.zIndex - 2,
		          opacity: 0
		        });
		      } else {
		        $(element).css({
		          position: 'relative',
		          left: targetLeft,
		          top: 0,
		          zIndex: _.options.zIndex - 2,
		          opacity: 0
		        });
		      }
		    });
		    _.$slides.eq(_.currentSlide).css({
		      zIndex: _.options.zIndex - 1,
		      opacity: 1
		    });
		  };
		  Slick.prototype.setHeight = function () {
		    var _ = this;
		    if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
		      var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
		      _.$list.css('height', targetHeight);
		    }
		  };
		  Slick.prototype.setOption = Slick.prototype.slickSetOption = function () {
		    /**
		     * accepts arguments in format of:
		     *
		     *  - for changing a single option's value:
		     *     .slick("setOption", option, value, refresh )
		     *
		     *  - for changing a set of responsive options:
		     *     .slick("setOption", 'responsive', [{}, ...], refresh )
		     *
		     *  - for updating multiple values at once (not responsive)
		     *     .slick("setOption", { 'option': value, ... }, refresh )
		     */

		    var _ = this,
		      l,
		      item,
		      option,
		      value,
		      refresh = false,
		      type;
		    if ($.type(arguments[0]) === 'object') {
		      option = arguments[0];
		      refresh = arguments[1];
		      type = 'multiple';
		    } else if ($.type(arguments[0]) === 'string') {
		      option = arguments[0];
		      value = arguments[1];
		      refresh = arguments[2];
		      if (arguments[0] === 'responsive' && $.type(arguments[1]) === 'array') {
		        type = 'responsive';
		      } else if (typeof arguments[1] !== 'undefined') {
		        type = 'single';
		      }
		    }
		    if (type === 'single') {
		      _.options[option] = value;
		    } else if (type === 'multiple') {
		      $.each(option, function (opt, val) {
		        _.options[opt] = val;
		      });
		    } else if (type === 'responsive') {
		      for (item in value) {
		        if ($.type(_.options.responsive) !== 'array') {
		          _.options.responsive = [value[item]];
		        } else {
		          l = _.options.responsive.length - 1;

		          // loop through the responsive object and splice out duplicates.
		          while (l >= 0) {
		            if (_.options.responsive[l].breakpoint === value[item].breakpoint) {
		              _.options.responsive.splice(l, 1);
		            }
		            l--;
		          }
		          _.options.responsive.push(value[item]);
		        }
		      }
		    }
		    if (refresh) {
		      _.unload();
		      _.reinit();
		    }
		  };
		  Slick.prototype.setPosition = function () {
		    var _ = this;
		    _.setDimensions();
		    _.setHeight();
		    if (_.options.fade === false) {
		      _.setCSS(_.getLeft(_.currentSlide));
		    } else {
		      _.setFade();
		    }
		    _.$slider.trigger('setPosition', [_]);
		  };
		  Slick.prototype.setProps = function () {
		    var _ = this,
		      bodyStyle = document.body.style;
		    _.positionProp = _.options.vertical === true ? 'top' : 'left';
		    if (_.positionProp === 'top') {
		      _.$slider.addClass('slick-vertical');
		    } else {
		      _.$slider.removeClass('slick-vertical');
		    }
		    if (bodyStyle.WebkitTransition !== undefined || bodyStyle.MozTransition !== undefined || bodyStyle.msTransition !== undefined) {
		      if (_.options.useCSS === true) {
		        _.cssTransitions = true;
		      }
		    }
		    if (_.options.fade) {
		      if (typeof _.options.zIndex === 'number') {
		        if (_.options.zIndex < 3) {
		          _.options.zIndex = 3;
		        }
		      } else {
		        _.options.zIndex = _.defaults.zIndex;
		      }
		    }
		    if (bodyStyle.OTransform !== undefined) {
		      _.animType = 'OTransform';
		      _.transformType = '-o-transform';
		      _.transitionType = 'OTransition';
		      if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
		    }
		    if (bodyStyle.MozTransform !== undefined) {
		      _.animType = 'MozTransform';
		      _.transformType = '-moz-transform';
		      _.transitionType = 'MozTransition';
		      if (bodyStyle.perspectiveProperty === undefined && bodyStyle.MozPerspective === undefined) _.animType = false;
		    }
		    if (bodyStyle.webkitTransform !== undefined) {
		      _.animType = 'webkitTransform';
		      _.transformType = '-webkit-transform';
		      _.transitionType = 'webkitTransition';
		      if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
		    }
		    if (bodyStyle.msTransform !== undefined) {
		      _.animType = 'msTransform';
		      _.transformType = '-ms-transform';
		      _.transitionType = 'msTransition';
		      if (bodyStyle.msTransform === undefined) _.animType = false;
		    }
		    if (bodyStyle.transform !== undefined && _.animType !== false) {
		      _.animType = 'transform';
		      _.transformType = 'transform';
		      _.transitionType = 'transition';
		    }
		    _.transformsEnabled = _.options.useTransform && _.animType !== null && _.animType !== false;
		  };
		  Slick.prototype.setSlideClasses = function (index) {
		    var _ = this,
		      centerOffset,
		      allSlides,
		      indexOffset,
		      remainder;
		    allSlides = _.$slider.find('.slick-slide').removeClass('slick-active slick-center slick-current').attr('aria-hidden', 'true');
		    _.$slides.eq(index).addClass('slick-current');
		    if (_.options.centerMode === true) {
		      var evenCoef = _.options.slidesToShow % 2 === 0 ? 1 : 0;
		      centerOffset = Math.floor(_.options.slidesToShow / 2);
		      if (_.options.infinite === true) {
		        if (index >= centerOffset && index <= _.slideCount - 1 - centerOffset) {
		          _.$slides.slice(index - centerOffset + evenCoef, index + centerOffset + 1).addClass('slick-active').attr('aria-hidden', 'false');
		        } else {
		          indexOffset = _.options.slidesToShow + index;
		          allSlides.slice(indexOffset - centerOffset + 1 + evenCoef, indexOffset + centerOffset + 2).addClass('slick-active').attr('aria-hidden', 'false');
		        }
		        if (index === 0) {
		          allSlides.eq(allSlides.length - 1 - _.options.slidesToShow).addClass('slick-center');
		        } else if (index === _.slideCount - 1) {
		          allSlides.eq(_.options.slidesToShow).addClass('slick-center');
		        }
		      }
		      _.$slides.eq(index).addClass('slick-center');
		    } else {
		      if (index >= 0 && index <= _.slideCount - _.options.slidesToShow) {
		        _.$slides.slice(index, index + _.options.slidesToShow).addClass('slick-active').attr('aria-hidden', 'false');
		      } else if (allSlides.length <= _.options.slidesToShow) {
		        allSlides.addClass('slick-active').attr('aria-hidden', 'false');
		      } else {
		        remainder = _.slideCount % _.options.slidesToShow;
		        indexOffset = _.options.infinite === true ? _.options.slidesToShow + index : index;
		        if (_.options.slidesToShow == _.options.slidesToScroll && _.slideCount - index < _.options.slidesToShow) {
		          allSlides.slice(indexOffset - (_.options.slidesToShow - remainder), indexOffset + remainder).addClass('slick-active').attr('aria-hidden', 'false');
		        } else {
		          allSlides.slice(indexOffset, indexOffset + _.options.slidesToShow).addClass('slick-active').attr('aria-hidden', 'false');
		        }
		      }
		    }
		    if (_.options.lazyLoad === 'ondemand' || _.options.lazyLoad === 'anticipated') {
		      _.lazyLoad();
		    }
		  };
		  Slick.prototype.setupInfinite = function () {
		    var _ = this,
		      i,
		      slideIndex,
		      infiniteCount;
		    if (_.options.fade === true) {
		      _.options.centerMode = false;
		    }
		    if (_.options.infinite === true && _.options.fade === false) {
		      slideIndex = null;
		      if (_.slideCount > _.options.slidesToShow) {
		        if (_.options.centerMode === true) {
		          infiniteCount = _.options.slidesToShow + 1;
		        } else {
		          infiniteCount = _.options.slidesToShow;
		        }
		        for (i = _.slideCount; i > _.slideCount - infiniteCount; i -= 1) {
		          slideIndex = i - 1;
		          $(_.$slides[slideIndex]).clone(true).attr('id', '').attr('data-slick-index', slideIndex - _.slideCount).prependTo(_.$slideTrack).addClass('slick-cloned');
		        }
		        for (i = 0; i < infiniteCount + _.slideCount; i += 1) {
		          slideIndex = i;
		          $(_.$slides[slideIndex]).clone(true).attr('id', '').attr('data-slick-index', slideIndex + _.slideCount).appendTo(_.$slideTrack).addClass('slick-cloned');
		        }
		        _.$slideTrack.find('.slick-cloned').find('[id]').each(function () {
		          $(this).attr('id', '');
		        });
		      }
		    }
		  };
		  Slick.prototype.interrupt = function (toggle) {
		    var _ = this;
		    if (!toggle) {
		      _.autoPlay();
		    }
		    _.interrupted = toggle;
		  };
		  Slick.prototype.selectHandler = function (event) {
		    var _ = this;
		    var targetElement = $(event.target).is('.slick-slide') ? $(event.target) : $(event.target).parents('.slick-slide');
		    var index = parseInt(targetElement.attr('data-slick-index'));
		    if (!index) index = 0;
		    if (_.slideCount <= _.options.slidesToShow) {
		      _.slideHandler(index, false, true);
		      return;
		    }
		    _.slideHandler(index);
		  };
		  Slick.prototype.slideHandler = function (index, sync, dontAnimate) {
		    var targetSlide,
		      animSlide,
		      oldSlide,
		      slideLeft,
		      targetLeft = null,
		      _ = this,
		      navTarget;
		    sync = sync || false;
		    if (_.animating === true && _.options.waitForAnimate === true) {
		      return;
		    }
		    if (_.options.fade === true && _.currentSlide === index) {
		      return;
		    }
		    if (sync === false) {
		      _.asNavFor(index);
		    }
		    targetSlide = index;
		    targetLeft = _.getLeft(targetSlide);
		    slideLeft = _.getLeft(_.currentSlide);
		    _.currentLeft = _.swipeLeft === null ? slideLeft : _.swipeLeft;
		    if (_.options.infinite === false && _.options.centerMode === false && (index < 0 || index > _.getDotCount() * _.options.slidesToScroll)) {
		      if (_.options.fade === false) {
		        targetSlide = _.currentSlide;
		        if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
		          _.animateSlide(slideLeft, function () {
		            _.postSlide(targetSlide);
		          });
		        } else {
		          _.postSlide(targetSlide);
		        }
		      }
		      return;
		    } else if (_.options.infinite === false && _.options.centerMode === true && (index < 0 || index > _.slideCount - _.options.slidesToScroll)) {
		      if (_.options.fade === false) {
		        targetSlide = _.currentSlide;
		        if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
		          _.animateSlide(slideLeft, function () {
		            _.postSlide(targetSlide);
		          });
		        } else {
		          _.postSlide(targetSlide);
		        }
		      }
		      return;
		    }
		    if (_.options.autoplay) {
		      clearInterval(_.autoPlayTimer);
		    }
		    if (targetSlide < 0) {
		      if (_.slideCount % _.options.slidesToScroll !== 0) {
		        animSlide = _.slideCount - _.slideCount % _.options.slidesToScroll;
		      } else {
		        animSlide = _.slideCount + targetSlide;
		      }
		    } else if (targetSlide >= _.slideCount) {
		      if (_.slideCount % _.options.slidesToScroll !== 0) {
		        animSlide = 0;
		      } else {
		        animSlide = targetSlide - _.slideCount;
		      }
		    } else {
		      animSlide = targetSlide;
		    }
		    _.animating = true;
		    _.$slider.trigger('beforeChange', [_, _.currentSlide, animSlide]);
		    oldSlide = _.currentSlide;
		    _.currentSlide = animSlide;
		    _.setSlideClasses(_.currentSlide);
		    if (_.options.asNavFor) {
		      navTarget = _.getNavTarget();
		      navTarget = navTarget.slick('getSlick');
		      if (navTarget.slideCount <= navTarget.options.slidesToShow) {
		        navTarget.setSlideClasses(_.currentSlide);
		      }
		    }
		    _.updateDots();
		    _.updateArrows();
		    if (_.options.fade === true) {
		      if (dontAnimate !== true) {
		        _.fadeSlideOut(oldSlide);
		        _.fadeSlide(animSlide, function () {
		          _.postSlide(animSlide);
		        });
		      } else {
		        _.postSlide(animSlide);
		      }
		      _.animateHeight();
		      return;
		    }
		    if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
		      _.animateSlide(targetLeft, function () {
		        _.postSlide(animSlide);
		      });
		    } else {
		      _.postSlide(animSlide);
		    }
		  };
		  Slick.prototype.startLoad = function () {
		    var _ = this;
		    if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
		      _.$prevArrow.hide();
		      _.$nextArrow.hide();
		    }
		    if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
		      _.$dots.hide();
		    }
		    _.$slider.addClass('slick-loading');
		  };
		  Slick.prototype.swipeDirection = function () {
		    var xDist,
		      yDist,
		      r,
		      swipeAngle,
		      _ = this;
		    xDist = _.touchObject.startX - _.touchObject.curX;
		    yDist = _.touchObject.startY - _.touchObject.curY;
		    r = Math.atan2(yDist, xDist);
		    swipeAngle = Math.round(r * 180 / Math.PI);
		    if (swipeAngle < 0) {
		      swipeAngle = 360 - Math.abs(swipeAngle);
		    }
		    if (swipeAngle <= 45 && swipeAngle >= 0) {
		      return _.options.rtl === false ? 'left' : 'right';
		    }
		    if (swipeAngle <= 360 && swipeAngle >= 315) {
		      return _.options.rtl === false ? 'left' : 'right';
		    }
		    if (swipeAngle >= 135 && swipeAngle <= 225) {
		      return _.options.rtl === false ? 'right' : 'left';
		    }
		    if (_.options.verticalSwiping === true) {
		      if (swipeAngle >= 35 && swipeAngle <= 135) {
		        return 'down';
		      } else {
		        return 'up';
		      }
		    }
		    return 'vertical';
		  };
		  Slick.prototype.swipeEnd = function (event) {
		    var _ = this,
		      slideCount,
		      direction;
		    _.dragging = false;
		    _.swiping = false;
		    if (_.scrolling) {
		      _.scrolling = false;
		      return false;
		    }
		    _.interrupted = false;
		    _.shouldClick = _.touchObject.swipeLength > 10 ? false : true;
		    if (_.touchObject.curX === undefined) {
		      return false;
		    }
		    if (_.touchObject.edgeHit === true) {
		      _.$slider.trigger('edge', [_, _.swipeDirection()]);
		    }
		    if (_.touchObject.swipeLength >= _.touchObject.minSwipe) {
		      direction = _.swipeDirection();
		      switch (direction) {
		        case 'left':
		        case 'down':
		          slideCount = _.options.swipeToSlide ? _.checkNavigable(_.currentSlide + _.getSlideCount()) : _.currentSlide + _.getSlideCount();
		          _.currentDirection = 0;
		          break;
		        case 'right':
		        case 'up':
		          slideCount = _.options.swipeToSlide ? _.checkNavigable(_.currentSlide - _.getSlideCount()) : _.currentSlide - _.getSlideCount();
		          _.currentDirection = 1;
		          break;
		      }
		      if (direction != 'vertical') {
		        _.slideHandler(slideCount);
		        _.touchObject = {};
		        _.$slider.trigger('swipe', [_, direction]);
		      }
		    } else {
		      if (_.touchObject.startX !== _.touchObject.curX) {
		        _.slideHandler(_.currentSlide);
		        _.touchObject = {};
		      }
		    }
		  };
		  Slick.prototype.swipeHandler = function (event) {
		    var _ = this;
		    if (_.options.swipe === false || 'ontouchend' in document && _.options.swipe === false) {
		      return;
		    } else if (_.options.draggable === false && event.type.indexOf('mouse') !== -1) {
		      return;
		    }
		    _.touchObject.fingerCount = event.originalEvent && event.originalEvent.touches !== undefined ? event.originalEvent.touches.length : 1;
		    _.touchObject.minSwipe = _.listWidth / _.options.touchThreshold;
		    if (_.options.verticalSwiping === true) {
		      _.touchObject.minSwipe = _.listHeight / _.options.touchThreshold;
		    }
		    switch (event.data.action) {
		      case 'start':
		        _.swipeStart(event);
		        break;
		      case 'move':
		        _.swipeMove(event);
		        break;
		      case 'end':
		        _.swipeEnd(event);
		        break;
		    }
		  };
		  Slick.prototype.swipeMove = function (event) {
		    var _ = this,
		      curLeft,
		      swipeDirection,
		      swipeLength,
		      positionOffset,
		      touches,
		      verticalSwipeLength;
		    touches = event.originalEvent !== undefined ? event.originalEvent.touches : null;
		    if (!_.dragging || _.scrolling || touches && touches.length !== 1) {
		      return false;
		    }
		    curLeft = _.getLeft(_.currentSlide);
		    _.touchObject.curX = touches !== undefined ? touches[0].pageX : event.clientX;
		    _.touchObject.curY = touches !== undefined ? touches[0].pageY : event.clientY;
		    _.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(_.touchObject.curX - _.touchObject.startX, 2)));
		    verticalSwipeLength = Math.round(Math.sqrt(Math.pow(_.touchObject.curY - _.touchObject.startY, 2)));
		    if (!_.options.verticalSwiping && !_.swiping && verticalSwipeLength > 4) {
		      _.scrolling = true;
		      return false;
		    }
		    if (_.options.verticalSwiping === true) {
		      _.touchObject.swipeLength = verticalSwipeLength;
		    }
		    swipeDirection = _.swipeDirection();
		    if (event.originalEvent !== undefined && _.touchObject.swipeLength > 4) {
		      _.swiping = true;
		      event.preventDefault();
		    }
		    positionOffset = (_.options.rtl === false ? 1 : -1) * (_.touchObject.curX > _.touchObject.startX ? 1 : -1);
		    if (_.options.verticalSwiping === true) {
		      positionOffset = _.touchObject.curY > _.touchObject.startY ? 1 : -1;
		    }
		    swipeLength = _.touchObject.swipeLength;
		    _.touchObject.edgeHit = false;
		    if (_.options.infinite === false) {
		      if (_.currentSlide === 0 && swipeDirection === 'right' || _.currentSlide >= _.getDotCount() && swipeDirection === 'left') {
		        swipeLength = _.touchObject.swipeLength * _.options.edgeFriction;
		        _.touchObject.edgeHit = true;
		      }
		    }
		    if (_.options.vertical === false) {
		      _.swipeLeft = curLeft + swipeLength * positionOffset;
		    } else {
		      _.swipeLeft = curLeft + swipeLength * (_.$list.height() / _.listWidth) * positionOffset;
		    }
		    if (_.options.verticalSwiping === true) {
		      _.swipeLeft = curLeft + swipeLength * positionOffset;
		    }
		    if (_.options.fade === true || _.options.touchMove === false) {
		      return false;
		    }
		    if (_.animating === true) {
		      _.swipeLeft = null;
		      return false;
		    }
		    _.setCSS(_.swipeLeft);
		  };
		  Slick.prototype.swipeStart = function (event) {
		    var _ = this,
		      touches;
		    _.interrupted = true;
		    if (_.touchObject.fingerCount !== 1 || _.slideCount <= _.options.slidesToShow) {
		      _.touchObject = {};
		      return false;
		    }
		    if (event.originalEvent !== undefined && event.originalEvent.touches !== undefined) {
		      touches = event.originalEvent.touches[0];
		    }
		    _.touchObject.startX = _.touchObject.curX = touches !== undefined ? touches.pageX : event.clientX;
		    _.touchObject.startY = _.touchObject.curY = touches !== undefined ? touches.pageY : event.clientY;
		    _.dragging = true;
		  };
		  Slick.prototype.unfilterSlides = Slick.prototype.slickUnfilter = function () {
		    var _ = this;
		    if (_.$slidesCache !== null) {
		      _.unload();
		      _.$slideTrack.children(this.options.slide).detach();
		      _.$slidesCache.appendTo(_.$slideTrack);
		      _.reinit();
		    }
		  };
		  Slick.prototype.unload = function () {
		    var _ = this;
		    $('.slick-cloned', _.$slider).remove();
		    if (_.$dots) {
		      _.$dots.remove();
		    }
		    if (_.$prevArrow && _.htmlExpr.test(_.options.prevArrow)) {
		      _.$prevArrow.remove();
		    }
		    if (_.$nextArrow && _.htmlExpr.test(_.options.nextArrow)) {
		      _.$nextArrow.remove();
		    }
		    _.$slides.removeClass('slick-slide slick-active slick-visible slick-current').attr('aria-hidden', 'true').css('width', '');
		  };
		  Slick.prototype.unslick = function (fromBreakpoint) {
		    var _ = this;
		    _.$slider.trigger('unslick', [_, fromBreakpoint]);
		    _.destroy();
		  };
		  Slick.prototype.updateArrows = function () {
		    var _ = this;
		    Math.floor(_.options.slidesToShow / 2);
		    if (_.options.arrows === true && _.slideCount > _.options.slidesToShow && !_.options.infinite) {
		      _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
		      _.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
		      if (_.currentSlide === 0) {
		        _.$prevArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
		        _.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
		      } else if (_.currentSlide >= _.slideCount - _.options.slidesToShow && _.options.centerMode === false) {
		        _.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
		        _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
		      } else if (_.currentSlide >= _.slideCount - 1 && _.options.centerMode === true) {
		        _.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
		        _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
		      }
		    }
		  };
		  Slick.prototype.updateDots = function () {
		    var _ = this;
		    if (_.$dots !== null) {
		      _.$dots.find('li').removeClass('slick-active').end();
		      _.$dots.find('li').eq(Math.floor(_.currentSlide / _.options.slidesToScroll)).addClass('slick-active');
		    }
		  };
		  Slick.prototype.visibility = function () {
		    var _ = this;
		    if (_.options.autoplay) {
		      if (document[_.hidden]) {
		        _.interrupted = true;
		      } else {
		        _.interrupted = false;
		      }
		    }
		  };
		  $.fn.slick = function () {
		    var _ = this,
		      opt = arguments[0],
		      args = Array.prototype.slice.call(arguments, 1),
		      l = _.length,
		      i,
		      ret;
		    for (i = 0; i < l; i++) {
		      if (typeof opt == 'object' || typeof opt == 'undefined') _[i].slick = new Slick(_[i], opt);else ret = _[i].slick[opt].apply(_[i].slick, args);
		      if (typeof ret != 'undefined') return ret;
		    }
		    return _;
		  };
		});
	} (slick));

	var uikit = {exports: {}};

	/*! UIkit 3.5.9 | https://www.getuikit.com | (c) 2014 - 2020 YOOtheme | MIT License */

	(function (module, exports) {
		(function (global, factory) {
		  module.exports = factory() ;
		})(commonjsGlobal, function () {

		  var objPrototype = Object.prototype;
		  var hasOwnProperty = objPrototype.hasOwnProperty;
		  function hasOwn(obj, key) {
		    return hasOwnProperty.call(obj, key);
		  }
		  var hyphenateCache = {};
		  var hyphenateRe = /([a-z\d])([A-Z])/g;
		  function hyphenate(str) {
		    if (!(str in hyphenateCache)) {
		      hyphenateCache[str] = str.replace(hyphenateRe, '$1-$2').toLowerCase();
		    }
		    return hyphenateCache[str];
		  }
		  var camelizeRe = /-(\w)/g;
		  function camelize(str) {
		    return str.replace(camelizeRe, toUpper);
		  }
		  function toUpper(_, c) {
		    return c ? c.toUpperCase() : '';
		  }
		  function ucfirst(str) {
		    return str.length ? toUpper(null, str.charAt(0)) + str.slice(1) : '';
		  }
		  var strPrototype = String.prototype;
		  var startsWithFn = strPrototype.startsWith || function (search) {
		    return this.lastIndexOf(search, 0) === 0;
		  };
		  function startsWith(str, search) {
		    return startsWithFn.call(str, search);
		  }
		  var endsWithFn = strPrototype.endsWith || function (search) {
		    return this.substr(-search.length) === search;
		  };
		  function endsWith(str, search) {
		    return endsWithFn.call(str, search);
		  }
		  var arrPrototype = Array.prototype;
		  var includesFn = function (search, i) {
		    return !!~this.indexOf(search, i);
		  };
		  var includesStr = strPrototype.includes || includesFn;
		  var includesArray = arrPrototype.includes || includesFn;
		  function includes(obj, search) {
		    return obj && (isString(obj) ? includesStr : includesArray).call(obj, search);
		  }
		  var findIndexFn = arrPrototype.findIndex || function (predicate) {
		    var arguments$1 = arguments;
		    for (var i = 0; i < this.length; i++) {
		      if (predicate.call(arguments$1[1], this[i], i, this)) {
		        return i;
		      }
		    }
		    return -1;
		  };
		  function findIndex(array, predicate) {
		    return findIndexFn.call(array, predicate);
		  }
		  var isArray = Array.isArray;
		  function isFunction(obj) {
		    return typeof obj === 'function';
		  }
		  function isObject(obj) {
		    return obj !== null && typeof obj === 'object';
		  }
		  var toString = objPrototype.toString;
		  function isPlainObject(obj) {
		    return toString.call(obj) === '[object Object]';
		  }
		  function isWindow(obj) {
		    return isObject(obj) && obj === obj.window;
		  }
		  function isDocument(obj) {
		    return isObject(obj) && obj.nodeType === 9;
		  }
		  function isJQuery(obj) {
		    return isObject(obj) && !!obj.jquery;
		  }
		  function isNode(obj) {
		    return isObject(obj) && obj.nodeType >= 1;
		  }
		  function isElement(obj) {
		    return isObject(obj) && obj.nodeType === 1;
		  }
		  function isNodeCollection(obj) {
		    return toString.call(obj).match(/^\[object (NodeList|HTMLCollection)\]$/);
		  }
		  function isBoolean(value) {
		    return typeof value === 'boolean';
		  }
		  function isString(value) {
		    return typeof value === 'string';
		  }
		  function isNumber(value) {
		    return typeof value === 'number';
		  }
		  function isNumeric(value) {
		    return isNumber(value) || isString(value) && !isNaN(value - parseFloat(value));
		  }
		  function isEmpty(obj) {
		    return !(isArray(obj) ? obj.length : isObject(obj) ? Object.keys(obj).length : false);
		  }
		  function isUndefined(value) {
		    return value === void 0;
		  }
		  function toBoolean(value) {
		    return isBoolean(value) ? value : value === 'true' || value === '1' || value === '' ? true : value === 'false' || value === '0' ? false : value;
		  }
		  function toNumber(value) {
		    var number = Number(value);
		    return !isNaN(number) ? number : false;
		  }
		  function toFloat(value) {
		    return parseFloat(value) || 0;
		  }
		  function toNode(element) {
		    return isNode(element) ? element : isNodeCollection(element) || isJQuery(element) ? element[0] : isArray(element) ? toNode(element[0]) : null;
		  }
		  function toNodes(element) {
		    return isNode(element) ? [element] : isNodeCollection(element) ? arrPrototype.slice.call(element) : isArray(element) ? element.map(toNode).filter(Boolean) : isJQuery(element) ? element.toArray() : [];
		  }
		  function toWindow(element) {
		    if (isWindow(element)) {
		      return element;
		    }
		    element = toNode(element);
		    return element ? (isDocument(element) ? element : element.ownerDocument).defaultView : window;
		  }
		  function toList(value) {
		    return isArray(value) ? value : isString(value) ? value.split(/,(?![^(]*\))/).map(function (value) {
		      return isNumeric(value) ? toNumber(value) : toBoolean(value.trim());
		    }) : [value];
		  }
		  function toMs(time) {
		    return !time ? 0 : endsWith(time, 'ms') ? toFloat(time) : toFloat(time) * 1000;
		  }
		  function isEqual(value, other) {
		    return value === other || isObject(value) && isObject(other) && Object.keys(value).length === Object.keys(other).length && each(value, function (val, key) {
		      return val === other[key];
		    });
		  }
		  function swap(value, a, b) {
		    return value.replace(new RegExp(a + "|" + b, 'g'), function (match) {
		      return match === a ? b : a;
		    });
		  }
		  var assign = Object.assign || function (target) {
		    var args = [],
		      len = arguments.length - 1;
		    while (len-- > 0) args[len] = arguments[len + 1];
		    target = Object(target);
		    for (var i = 0; i < args.length; i++) {
		      var source = args[i];
		      if (source !== null) {
		        for (var key in source) {
		          if (hasOwn(source, key)) {
		            target[key] = source[key];
		          }
		        }
		      }
		    }
		    return target;
		  };
		  function last(array) {
		    return array[array.length - 1];
		  }
		  function each(obj, cb) {
		    for (var key in obj) {
		      if (false === cb(obj[key], key)) {
		        return false;
		      }
		    }
		    return true;
		  }
		  function sortBy(array, prop) {
		    return array.sort(function (ref, ref$1) {
		      var propA = ref[prop];
		      if (propA === void 0) propA = 0;
		      var propB = ref$1[prop];
		      if (propB === void 0) propB = 0;
		      return propA > propB ? 1 : propB > propA ? -1 : 0;
		    });
		  }
		  function uniqueBy(array, prop) {
		    var seen = new Set();
		    return array.filter(function (ref) {
		      var check = ref[prop];
		      return seen.has(check) ? false : seen.add(check) || true;
		    } // IE 11 does not return the Set object
		    );
		  }

		  function clamp(number, min, max) {
		    if (min === void 0) min = 0;
		    if (max === void 0) max = 1;
		    return Math.min(Math.max(toNumber(number) || 0, min), max);
		  }
		  function noop() {}
		  function intersectRect(r1, r2) {
		    return r1.left < r2.right && r1.right > r2.left && r1.top < r2.bottom && r1.bottom > r2.top;
		  }
		  function pointInRect(point, rect) {
		    return point.x <= rect.right && point.x >= rect.left && point.y <= rect.bottom && point.y >= rect.top;
		  }
		  var Dimensions = {
		    ratio: function (dimensions, prop, value) {
		      var obj;
		      var aProp = prop === 'width' ? 'height' : 'width';
		      return obj = {}, obj[aProp] = dimensions[prop] ? Math.round(value * dimensions[aProp] / dimensions[prop]) : dimensions[aProp], obj[prop] = value, obj;
		    },
		    contain: function (dimensions, maxDimensions) {
		      var this$1$1 = this;
		      dimensions = assign({}, dimensions);
		      each(dimensions, function (_, prop) {
		        return dimensions = dimensions[prop] > maxDimensions[prop] ? this$1$1.ratio(dimensions, prop, maxDimensions[prop]) : dimensions;
		      });
		      return dimensions;
		    },
		    cover: function (dimensions, maxDimensions) {
		      var this$1$1 = this;
		      dimensions = this.contain(dimensions, maxDimensions);
		      each(dimensions, function (_, prop) {
		        return dimensions = dimensions[prop] < maxDimensions[prop] ? this$1$1.ratio(dimensions, prop, maxDimensions[prop]) : dimensions;
		      });
		      return dimensions;
		    }
		  };
		  function attr(element, name, value) {
		    if (isObject(name)) {
		      for (var key in name) {
		        attr(element, key, name[key]);
		      }
		      return;
		    }
		    if (isUndefined(value)) {
		      element = toNode(element);
		      return element && element.getAttribute(name);
		    } else {
		      toNodes(element).forEach(function (element) {
		        if (isFunction(value)) {
		          value = value.call(element, attr(element, name));
		        }
		        if (value === null) {
		          removeAttr(element, name);
		        } else {
		          element.setAttribute(name, value);
		        }
		      });
		    }
		  }
		  function hasAttr(element, name) {
		    return toNodes(element).some(function (element) {
		      return element.hasAttribute(name);
		    });
		  }
		  function removeAttr(element, name) {
		    element = toNodes(element);
		    name.split(' ').forEach(function (name) {
		      return element.forEach(function (element) {
		        return element.hasAttribute(name) && element.removeAttribute(name);
		      });
		    });
		  }
		  function data(element, attribute) {
		    for (var i = 0, attrs = [attribute, "data-" + attribute]; i < attrs.length; i++) {
		      if (hasAttr(element, attrs[i])) {
		        return attr(element, attrs[i]);
		      }
		    }
		  }

		  /* global DocumentTouch */

		  var inBrowser = typeof window !== 'undefined';
		  var isIE = inBrowser && /msie|trident/i.test(window.navigator.userAgent);
		  var isRtl = inBrowser && attr(document.documentElement, 'dir') === 'rtl';
		  var hasTouchEvents = inBrowser && 'ontouchstart' in window;
		  var hasPointerEvents = inBrowser && window.PointerEvent;
		  var hasTouch = inBrowser && (hasTouchEvents || window.DocumentTouch && document instanceof DocumentTouch || navigator.maxTouchPoints); // IE >=11

		  var pointerDown = hasPointerEvents ? 'pointerdown' : hasTouchEvents ? 'touchstart' : 'mousedown';
		  var pointerMove = hasPointerEvents ? 'pointermove' : hasTouchEvents ? 'touchmove' : 'mousemove';
		  var pointerUp = hasPointerEvents ? 'pointerup' : hasTouchEvents ? 'touchend' : 'mouseup';
		  var pointerEnter = hasPointerEvents ? 'pointerenter' : hasTouchEvents ? '' : 'mouseenter';
		  var pointerLeave = hasPointerEvents ? 'pointerleave' : hasTouchEvents ? '' : 'mouseleave';
		  var pointerCancel = hasPointerEvents ? 'pointercancel' : 'touchcancel';
		  function query(selector, context) {
		    return toNode(selector) || find(selector, getContext(selector, context));
		  }
		  function queryAll(selector, context) {
		    var nodes = toNodes(selector);
		    return nodes.length && nodes || findAll(selector, getContext(selector, context));
		  }
		  function getContext(selector, context) {
		    if (context === void 0) context = document;
		    return isContextSelector(selector) || isDocument(context) ? context : context.ownerDocument;
		  }
		  function find(selector, context) {
		    return toNode(_query(selector, context, 'querySelector'));
		  }
		  function findAll(selector, context) {
		    return toNodes(_query(selector, context, 'querySelectorAll'));
		  }
		  function _query(selector, context, queryFn) {
		    if (context === void 0) context = document;
		    if (!selector || !isString(selector)) {
		      return null;
		    }
		    selector = selector.replace(contextSanitizeRe, '$1 *');
		    var removes;
		    if (isContextSelector(selector)) {
		      removes = [];
		      selector = splitSelector(selector).map(function (selector, i) {
		        var ctx = context;
		        if (selector[0] === '!') {
		          var selectors = selector.substr(1).trim().split(' ');
		          ctx = closest(parent(context), selectors[0]);
		          selector = selectors.slice(1).join(' ').trim();
		        }
		        if (selector[0] === '-') {
		          var selectors$1 = selector.substr(1).trim().split(' ');
		          var prev = (ctx || context).previousElementSibling;
		          ctx = matches(prev, selector.substr(1)) ? prev : null;
		          selector = selectors$1.slice(1).join(' ');
		        }
		        if (!ctx) {
		          return null;
		        }
		        if (!ctx.id) {
		          ctx.id = "uk-" + Date.now() + i;
		          removes.push(function () {
		            return removeAttr(ctx, 'id');
		          });
		        }
		        return "#" + escape(ctx.id) + " " + selector;
		      }).filter(Boolean).join(',');
		      context = document;
		    }
		    try {
		      return context[queryFn](selector);
		    } catch (e) {
		      return null;
		    } finally {
		      removes && removes.forEach(function (remove) {
		        return remove();
		      });
		    }
		  }
		  var contextSelectorRe = /(^|[^\\],)\s*[!>+~-]/;
		  var contextSanitizeRe = /([!>+~-])(?=\s+[!>+~-]|\s*$)/g;
		  function isContextSelector(selector) {
		    return isString(selector) && selector.match(contextSelectorRe);
		  }
		  var selectorRe = /.*?[^\\](?:,|$)/g;
		  function splitSelector(selector) {
		    return selector.match(selectorRe).map(function (selector) {
		      return selector.replace(/,$/, '').trim();
		    });
		  }
		  var elProto = inBrowser ? Element.prototype : {};
		  var matchesFn = elProto.matches || elProto.webkitMatchesSelector || elProto.msMatchesSelector || noop;
		  function matches(element, selector) {
		    return toNodes(element).some(function (element) {
		      return matchesFn.call(element, selector);
		    });
		  }
		  var closestFn = elProto.closest || function (selector) {
		    var ancestor = this;
		    do {
		      if (matches(ancestor, selector)) {
		        return ancestor;
		      }
		    } while (ancestor = parent(ancestor));
		  };
		  function closest(element, selector) {
		    if (startsWith(selector, '>')) {
		      selector = selector.slice(1);
		    }
		    return isElement(element) ? closestFn.call(element, selector) : toNodes(element).map(function (element) {
		      return closest(element, selector);
		    }).filter(Boolean);
		  }
		  function parent(element) {
		    element = toNode(element);
		    return element && isElement(element.parentNode) && element.parentNode;
		  }
		  var escapeFn = inBrowser && window.CSS && CSS.escape || function (css) {
		    return css.replace(/([^\x7f-\uFFFF\w-])/g, function (match) {
		      return "\\" + match;
		    });
		  };
		  function escape(css) {
		    return isString(css) ? escapeFn.call(null, css) : '';
		  }
		  var voidElements = {
		    area: true,
		    base: true,
		    br: true,
		    col: true,
		    embed: true,
		    hr: true,
		    img: true,
		    input: true,
		    keygen: true,
		    link: true,
		    menuitem: true,
		    meta: true,
		    param: true,
		    source: true,
		    track: true,
		    wbr: true
		  };
		  function isVoidElement(element) {
		    return toNodes(element).some(function (element) {
		      return voidElements[element.tagName.toLowerCase()];
		    });
		  }
		  function isVisible(element) {
		    return toNodes(element).some(function (element) {
		      return element.offsetWidth || element.offsetHeight || element.getClientRects().length;
		    });
		  }
		  var selInput = 'input,select,textarea,button';
		  function isInput(element) {
		    return toNodes(element).some(function (element) {
		      return matches(element, selInput);
		    });
		  }
		  function filter(element, selector) {
		    return toNodes(element).filter(function (element) {
		      return matches(element, selector);
		    });
		  }
		  function within(element, selector) {
		    return !isString(selector) ? element === selector || (isDocument(selector) ? selector.documentElement : toNode(selector)).contains(toNode(element)) // IE 11 document does not implement contains
		    : matches(element, selector) || !!closest(element, selector);
		  }
		  function parents(element, selector) {
		    var elements = [];
		    while (element = parent(element)) {
		      if (!selector || matches(element, selector)) {
		        elements.push(element);
		      }
		    }
		    return elements;
		  }
		  function children(element, selector) {
		    element = toNode(element);
		    var children = element ? toNodes(element.children) : [];
		    return selector ? filter(children, selector) : children;
		  }
		  function on() {
		    var args = [],
		      len = arguments.length;
		    while (len--) args[len] = arguments[len];
		    var ref = getArgs(args);
		    var targets = ref[0];
		    var type = ref[1];
		    var selector = ref[2];
		    var listener = ref[3];
		    var useCapture = ref[4];
		    targets = toEventTargets(targets);
		    if (listener.length > 1) {
		      listener = detail(listener);
		    }
		    if (useCapture && useCapture.self) {
		      listener = selfFilter(listener);
		    }
		    if (selector) {
		      listener = delegate(targets, selector, listener);
		    }
		    useCapture = useCaptureFilter(useCapture);
		    type.split(' ').forEach(function (type) {
		      return targets.forEach(function (target) {
		        return target.addEventListener(type, listener, useCapture);
		      });
		    });
		    return function () {
		      return off(targets, type, listener, useCapture);
		    };
		  }
		  function off(targets, type, listener, useCapture) {
		    if (useCapture === void 0) useCapture = false;
		    useCapture = useCaptureFilter(useCapture);
		    targets = toEventTargets(targets);
		    type.split(' ').forEach(function (type) {
		      return targets.forEach(function (target) {
		        return target.removeEventListener(type, listener, useCapture);
		      });
		    });
		  }
		  function once() {
		    var args = [],
		      len = arguments.length;
		    while (len--) args[len] = arguments[len];
		    var ref = getArgs(args);
		    var element = ref[0];
		    var type = ref[1];
		    var selector = ref[2];
		    var listener = ref[3];
		    var useCapture = ref[4];
		    var condition = ref[5];
		    var off = on(element, type, selector, function (e) {
		      var result = !condition || condition(e);
		      if (result) {
		        off();
		        listener(e, result);
		      }
		    }, useCapture);
		    return off;
		  }
		  function trigger(targets, event, detail) {
		    return toEventTargets(targets).reduce(function (notCanceled, target) {
		      return notCanceled && target.dispatchEvent(createEvent(event, true, true, detail));
		    }, true);
		  }
		  function createEvent(e, bubbles, cancelable, detail) {
		    if (bubbles === void 0) bubbles = true;
		    if (cancelable === void 0) cancelable = false;
		    if (isString(e)) {
		      var event = document.createEvent('CustomEvent'); // IE 11
		      event.initCustomEvent(e, bubbles, cancelable, detail);
		      e = event;
		    }
		    return e;
		  }
		  function getArgs(args) {
		    if (isFunction(args[2])) {
		      args.splice(2, 0, false);
		    }
		    return args;
		  }
		  function delegate(delegates, selector, listener) {
		    var this$1$1 = this;
		    return function (e) {
		      delegates.forEach(function (delegate) {
		        var current = selector[0] === '>' ? findAll(selector, delegate).reverse().filter(function (element) {
		          return within(e.target, element);
		        })[0] : closest(e.target, selector);
		        if (current) {
		          e.delegate = delegate;
		          e.current = current;
		          listener.call(this$1$1, e);
		        }
		      });
		    };
		  }
		  function detail(listener) {
		    return function (e) {
		      return isArray(e.detail) ? listener.apply(void 0, [e].concat(e.detail)) : listener(e);
		    };
		  }
		  function selfFilter(listener) {
		    return function (e) {
		      if (e.target === e.currentTarget || e.target === e.current) {
		        return listener.call(null, e);
		      }
		    };
		  }
		  function useCaptureFilter(options) {
		    return options && isIE && !isBoolean(options) ? !!options.capture : options;
		  }
		  function isEventTarget(target) {
		    return target && 'addEventListener' in target;
		  }
		  function toEventTarget(target) {
		    return isEventTarget(target) ? target : toNode(target);
		  }
		  function toEventTargets(target) {
		    return isArray(target) ? target.map(toEventTarget).filter(Boolean) : isString(target) ? findAll(target) : isEventTarget(target) ? [target] : toNodes(target);
		  }
		  function isTouch(e) {
		    return e.pointerType === 'touch' || !!e.touches;
		  }
		  function getEventPos(e) {
		    var touches = e.touches;
		    var changedTouches = e.changedTouches;
		    var ref = touches && touches[0] || changedTouches && changedTouches[0] || e;
		    var x = ref.clientX;
		    var y = ref.clientY;
		    return {
		      x: x,
		      y: y
		    };
		  }

		  /* global setImmediate */

		  var Promise = inBrowser && window.Promise || PromiseFn;
		  var Deferred = function () {
		    var this$1$1 = this;
		    this.promise = new Promise(function (resolve, reject) {
		      this$1$1.reject = reject;
		      this$1$1.resolve = resolve;
		    });
		  };

		  /**
		   * Promises/A+ polyfill v1.1.4 (https://github.com/bramstein/promis)
		   */

		  var RESOLVED = 0;
		  var REJECTED = 1;
		  var PENDING = 2;
		  var async = inBrowser && window.setImmediate || setTimeout;
		  function PromiseFn(executor) {
		    this.state = PENDING;
		    this.value = undefined;
		    this.deferred = [];
		    var promise = this;
		    try {
		      executor(function (x) {
		        promise.resolve(x);
		      }, function (r) {
		        promise.reject(r);
		      });
		    } catch (e) {
		      promise.reject(e);
		    }
		  }
		  PromiseFn.reject = function (r) {
		    return new PromiseFn(function (resolve, reject) {
		      reject(r);
		    });
		  };
		  PromiseFn.resolve = function (x) {
		    return new PromiseFn(function (resolve, reject) {
		      resolve(x);
		    });
		  };
		  PromiseFn.all = function all(iterable) {
		    return new PromiseFn(function (resolve, reject) {
		      var result = [];
		      var count = 0;
		      if (iterable.length === 0) {
		        resolve(result);
		      }
		      function resolver(i) {
		        return function (x) {
		          result[i] = x;
		          count += 1;
		          if (count === iterable.length) {
		            resolve(result);
		          }
		        };
		      }
		      for (var i = 0; i < iterable.length; i += 1) {
		        PromiseFn.resolve(iterable[i]).then(resolver(i), reject);
		      }
		    });
		  };
		  PromiseFn.race = function race(iterable) {
		    return new PromiseFn(function (resolve, reject) {
		      for (var i = 0; i < iterable.length; i += 1) {
		        PromiseFn.resolve(iterable[i]).then(resolve, reject);
		      }
		    });
		  };
		  var p = PromiseFn.prototype;
		  p.resolve = function resolve(x) {
		    var promise = this;
		    if (promise.state === PENDING) {
		      if (x === promise) {
		        throw new TypeError('Promise settled with itself.');
		      }
		      var called = false;
		      try {
		        var then = x && x.then;
		        if (x !== null && isObject(x) && isFunction(then)) {
		          then.call(x, function (x) {
		            if (!called) {
		              promise.resolve(x);
		            }
		            called = true;
		          }, function (r) {
		            if (!called) {
		              promise.reject(r);
		            }
		            called = true;
		          });
		          return;
		        }
		      } catch (e) {
		        if (!called) {
		          promise.reject(e);
		        }
		        return;
		      }
		      promise.state = RESOLVED;
		      promise.value = x;
		      promise.notify();
		    }
		  };
		  p.reject = function reject(reason) {
		    var promise = this;
		    if (promise.state === PENDING) {
		      if (reason === promise) {
		        throw new TypeError('Promise settled with itself.');
		      }
		      promise.state = REJECTED;
		      promise.value = reason;
		      promise.notify();
		    }
		  };
		  p.notify = function notify() {
		    var this$1$1 = this;
		    async(function () {
		      if (this$1$1.state !== PENDING) {
		        while (this$1$1.deferred.length) {
		          var ref = this$1$1.deferred.shift();
		          var onResolved = ref[0];
		          var onRejected = ref[1];
		          var resolve = ref[2];
		          var reject = ref[3];
		          try {
		            if (this$1$1.state === RESOLVED) {
		              if (isFunction(onResolved)) {
		                resolve(onResolved.call(undefined, this$1$1.value));
		              } else {
		                resolve(this$1$1.value);
		              }
		            } else if (this$1$1.state === REJECTED) {
		              if (isFunction(onRejected)) {
		                resolve(onRejected.call(undefined, this$1$1.value));
		              } else {
		                reject(this$1$1.value);
		              }
		            }
		          } catch (e) {
		            reject(e);
		          }
		        }
		      }
		    });
		  };
		  p.then = function then(onResolved, onRejected) {
		    var this$1$1 = this;
		    return new PromiseFn(function (resolve, reject) {
		      this$1$1.deferred.push([onResolved, onRejected, resolve, reject]);
		      this$1$1.notify();
		    });
		  };
		  p.catch = function (onRejected) {
		    return this.then(undefined, onRejected);
		  };
		  function ajax(url, options) {
		    return new Promise(function (resolve, reject) {
		      var env = assign({
		        data: null,
		        method: 'GET',
		        headers: {},
		        xhr: new XMLHttpRequest(),
		        beforeSend: noop,
		        responseType: ''
		      }, options);
		      env.beforeSend(env);
		      var xhr = env.xhr;
		      for (var prop in env) {
		        if (prop in xhr) {
		          try {
		            xhr[prop] = env[prop];
		          } catch (e) {}
		        }
		      }
		      xhr.open(env.method.toUpperCase(), url);
		      for (var header in env.headers) {
		        xhr.setRequestHeader(header, env.headers[header]);
		      }
		      on(xhr, 'load', function () {
		        if (xhr.status === 0 || xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
		          // IE 11 does not support responseType 'json'
		          if (env.responseType === 'json' && isString(xhr.response)) {
		            xhr = assign(copyXhr(xhr), {
		              response: JSON.parse(xhr.response)
		            });
		          }
		          resolve(xhr);
		        } else {
		          reject(assign(Error(xhr.statusText), {
		            xhr: xhr,
		            status: xhr.status
		          }));
		        }
		      });
		      on(xhr, 'error', function () {
		        return reject(assign(Error('Network Error'), {
		          xhr: xhr
		        }));
		      });
		      on(xhr, 'timeout', function () {
		        return reject(assign(Error('Network Timeout'), {
		          xhr: xhr
		        }));
		      });
		      xhr.send(env.data);
		    });
		  }
		  function getImage(src, srcset, sizes) {
		    return new Promise(function (resolve, reject) {
		      var img = new Image();
		      img.onerror = function (e) {
		        return reject(e);
		      };
		      img.onload = function () {
		        return resolve(img);
		      };
		      sizes && (img.sizes = sizes);
		      srcset && (img.srcset = srcset);
		      img.src = src;
		    });
		  }
		  function copyXhr(source) {
		    var target = {};
		    for (var key in source) {
		      target[key] = source[key];
		    }
		    return target;
		  }
		  function ready(fn) {
		    if (document.readyState !== 'loading') {
		      fn();
		      return;
		    }
		    var unbind = on(document, 'DOMContentLoaded', function () {
		      unbind();
		      fn();
		    });
		  }
		  function index(element, ref) {
		    return ref ? toNodes(element).indexOf(toNode(ref)) : children(parent(element)).indexOf(element);
		  }
		  function getIndex(i, elements, current, finite) {
		    if (current === void 0) current = 0;
		    if (finite === void 0) finite = false;
		    elements = toNodes(elements);
		    var length = elements.length;
		    i = isNumeric(i) ? toNumber(i) : i === 'next' ? current + 1 : i === 'previous' ? current - 1 : index(elements, i);
		    if (finite) {
		      return clamp(i, 0, length - 1);
		    }
		    i %= length;
		    return i < 0 ? i + length : i;
		  }
		  function empty(element) {
		    element = $(element);
		    element.innerHTML = '';
		    return element;
		  }
		  function html(parent, html) {
		    parent = $(parent);
		    return isUndefined(html) ? parent.innerHTML : append(parent.hasChildNodes() ? empty(parent) : parent, html);
		  }
		  function prepend(parent, element) {
		    parent = $(parent);
		    if (!parent.hasChildNodes()) {
		      return append(parent, element);
		    } else {
		      return insertNodes(element, function (element) {
		        return parent.insertBefore(element, parent.firstChild);
		      });
		    }
		  }
		  function append(parent, element) {
		    parent = $(parent);
		    return insertNodes(element, function (element) {
		      return parent.appendChild(element);
		    });
		  }
		  function before(ref, element) {
		    ref = $(ref);
		    return insertNodes(element, function (element) {
		      return ref.parentNode.insertBefore(element, ref);
		    });
		  }
		  function after(ref, element) {
		    ref = $(ref);
		    return insertNodes(element, function (element) {
		      return ref.nextSibling ? before(ref.nextSibling, element) : append(ref.parentNode, element);
		    });
		  }
		  function insertNodes(element, fn) {
		    element = isString(element) ? fragment(element) : element;
		    return element ? 'length' in element ? toNodes(element).map(fn) : fn(element) : null;
		  }
		  function remove(element) {
		    toNodes(element).map(function (element) {
		      return element.parentNode && element.parentNode.removeChild(element);
		    });
		  }
		  function wrapAll(element, structure) {
		    structure = toNode(before(element, structure));
		    while (structure.firstChild) {
		      structure = structure.firstChild;
		    }
		    append(structure, element);
		    return structure;
		  }
		  function wrapInner(element, structure) {
		    return toNodes(toNodes(element).map(function (element) {
		      return element.hasChildNodes ? wrapAll(toNodes(element.childNodes), structure) : append(element, structure);
		    }));
		  }
		  function unwrap(element) {
		    toNodes(element).map(parent).filter(function (value, index, self) {
		      return self.indexOf(value) === index;
		    }).forEach(function (parent) {
		      before(parent, parent.childNodes);
		      remove(parent);
		    });
		  }
		  var fragmentRe = /^\s*<(\w+|!)[^>]*>/;
		  var singleTagRe = /^<(\w+)\s*\/?>(?:<\/\1>)?$/;
		  function fragment(html) {
		    var matches = singleTagRe.exec(html);
		    if (matches) {
		      return document.createElement(matches[1]);
		    }
		    var container = document.createElement('div');
		    if (fragmentRe.test(html)) {
		      container.insertAdjacentHTML('beforeend', html.trim());
		    } else {
		      container.textContent = html;
		    }
		    return container.childNodes.length > 1 ? toNodes(container.childNodes) : container.firstChild;
		  }
		  function apply(node, fn) {
		    if (!isElement(node)) {
		      return;
		    }
		    fn(node);
		    node = node.firstElementChild;
		    while (node) {
		      var next = node.nextElementSibling;
		      apply(node, fn);
		      node = next;
		    }
		  }
		  function $(selector, context) {
		    return !isString(selector) ? toNode(selector) : isHtml(selector) ? toNode(fragment(selector)) : find(selector, context);
		  }
		  function $$(selector, context) {
		    return !isString(selector) ? toNodes(selector) : isHtml(selector) ? toNodes(fragment(selector)) : findAll(selector, context);
		  }
		  function isHtml(str) {
		    return str[0] === '<' || str.match(/^\s*</);
		  }
		  function addClass(element) {
		    var args = [],
		      len = arguments.length - 1;
		    while (len-- > 0) args[len] = arguments[len + 1];
		    apply$1(element, args, 'add');
		  }
		  function removeClass(element) {
		    var args = [],
		      len = arguments.length - 1;
		    while (len-- > 0) args[len] = arguments[len + 1];
		    apply$1(element, args, 'remove');
		  }
		  function removeClasses(element, cls) {
		    attr(element, 'class', function (value) {
		      return (value || '').replace(new RegExp("\\b" + cls + "\\b", 'g'), '');
		    });
		  }
		  function replaceClass(element) {
		    var args = [],
		      len = arguments.length - 1;
		    while (len-- > 0) args[len] = arguments[len + 1];
		    args[0] && removeClass(element, args[0]);
		    args[1] && addClass(element, args[1]);
		  }
		  function hasClass(element, cls) {
		    return cls && toNodes(element).some(function (element) {
		      return element.classList.contains(cls.split(' ')[0]);
		    });
		  }
		  function toggleClass(element) {
		    var args = [],
		      len = arguments.length - 1;
		    while (len-- > 0) args[len] = arguments[len + 1];
		    if (!args.length) {
		      return;
		    }
		    args = getArgs$1(args);
		    var force = !isString(last(args)) ? args.pop() : []; // in iOS 9.3 force === undefined evaluates to false

		    args = args.filter(Boolean);
		    toNodes(element).forEach(function (ref) {
		      var classList = ref.classList;
		      for (var i = 0; i < args.length; i++) {
		        supports.Force ? classList.toggle.apply(classList, [args[i]].concat(force)) : classList[(!isUndefined(force) ? force : !classList.contains(args[i])) ? 'add' : 'remove'](args[i]);
		      }
		    });
		  }
		  function apply$1(element, args, fn) {
		    args = getArgs$1(args).filter(Boolean);
		    args.length && toNodes(element).forEach(function (ref) {
		      var classList = ref.classList;
		      supports.Multiple ? classList[fn].apply(classList, args) : args.forEach(function (cls) {
		        return classList[fn](cls);
		      });
		    });
		  }
		  function getArgs$1(args) {
		    return args.reduce(function (args, arg) {
		      return args.concat.call(args, isString(arg) && includes(arg, ' ') ? arg.trim().split(' ') : arg);
		    }, []);
		  }

		  // IE 11
		  var supports = {
		    get Multiple() {
		      return this.get('_multiple');
		    },
		    get Force() {
		      return this.get('_force');
		    },
		    get: function (key) {
		      if (!hasOwn(this, key)) {
		        var ref = document.createElement('_');
		        var classList = ref.classList;
		        classList.add('a', 'b');
		        classList.toggle('c', false);
		        this._multiple = classList.contains('b');
		        this._force = !classList.contains('c');
		      }
		      return this[key];
		    }
		  };
		  var cssNumber = {
		    'animation-iteration-count': true,
		    'column-count': true,
		    'fill-opacity': true,
		    'flex-grow': true,
		    'flex-shrink': true,
		    'font-weight': true,
		    'line-height': true,
		    'opacity': true,
		    'order': true,
		    'orphans': true,
		    'stroke-dasharray': true,
		    'stroke-dashoffset': true,
		    'widows': true,
		    'z-index': true,
		    'zoom': true
		  };
		  function css(element, property, value) {
		    return toNodes(element).map(function (element) {
		      if (isString(property)) {
		        property = propName(property);
		        if (isUndefined(value)) {
		          return getStyle(element, property);
		        } else if (!value && !isNumber(value)) {
		          element.style.removeProperty(property);
		        } else {
		          element.style[property] = isNumeric(value) && !cssNumber[property] ? value + "px" : value;
		        }
		      } else if (isArray(property)) {
		        var styles = getStyles(element);
		        return property.reduce(function (props, property) {
		          props[property] = styles[propName(property)];
		          return props;
		        }, {});
		      } else if (isObject(property)) {
		        each(property, function (value, property) {
		          return css(element, property, value);
		        });
		      }
		      return element;
		    })[0];
		  }
		  function getStyles(element, pseudoElt) {
		    element = toNode(element);
		    return element.ownerDocument.defaultView.getComputedStyle(element, pseudoElt);
		  }
		  function getStyle(element, property, pseudoElt) {
		    return getStyles(element, pseudoElt)[property];
		  }
		  var vars = {};
		  function getCssVar(name) {
		    var docEl = document.documentElement;
		    if (!isIE) {
		      return getStyles(docEl).getPropertyValue("--uk-" + name);
		    }
		    if (!(name in vars)) {
		      /* usage in css: .uk-name:before { content:"xyz" } */

		      var element = append(docEl, document.createElement('div'));
		      addClass(element, "uk-" + name);
		      vars[name] = getStyle(element, 'content', ':before').replace(/^["'](.*)["']$/, '$1');
		      remove(element);
		    }
		    return vars[name];
		  }
		  var cssProps = {};
		  function propName(name) {
		    var ret = cssProps[name];
		    if (!ret) {
		      ret = cssProps[name] = vendorPropName(name) || name;
		    }
		    return ret;
		  }
		  var cssPrefixes = ['webkit', 'moz', 'ms'];
		  function vendorPropName(name) {
		    name = hyphenate(name);
		    var ref = document.documentElement;
		    var style = ref.style;
		    if (name in style) {
		      return name;
		    }
		    var i = cssPrefixes.length,
		      prefixedName;
		    while (i--) {
		      prefixedName = "-" + cssPrefixes[i] + "-" + name;
		      if (prefixedName in style) {
		        return prefixedName;
		      }
		    }
		  }
		  function transition(element, props, duration, timing) {
		    if (duration === void 0) duration = 400;
		    if (timing === void 0) timing = 'linear';
		    return Promise.all(toNodes(element).map(function (element) {
		      return new Promise(function (resolve, reject) {
		        for (var name in props) {
		          var value = css(element, name);
		          if (value === '') {
		            css(element, name, value);
		          }
		        }
		        var timer = setTimeout(function () {
		          return trigger(element, 'transitionend');
		        }, duration);
		        once(element, 'transitionend transitioncanceled', function (ref) {
		          var type = ref.type;
		          clearTimeout(timer);
		          removeClass(element, 'uk-transition');
		          css(element, {
		            transitionProperty: '',
		            transitionDuration: '',
		            transitionTimingFunction: ''
		          });
		          type === 'transitioncanceled' ? reject() : resolve();
		        }, {
		          self: true
		        });
		        addClass(element, 'uk-transition');
		        css(element, assign({
		          transitionProperty: Object.keys(props).map(propName).join(','),
		          transitionDuration: duration + "ms",
		          transitionTimingFunction: timing
		        }, props));
		      });
		    }));
		  }
		  var Transition = {
		    start: transition,
		    stop: function (element) {
		      trigger(element, 'transitionend');
		      return Promise.resolve();
		    },
		    cancel: function (element) {
		      trigger(element, 'transitioncanceled');
		    },
		    inProgress: function (element) {
		      return hasClass(element, 'uk-transition');
		    }
		  };
		  var animationPrefix = 'uk-animation-';
		  function animate(element, animation, duration, origin, out) {
		    if (duration === void 0) duration = 200;
		    return Promise.all(toNodes(element).map(function (element) {
		      return new Promise(function (resolve, reject) {
		        trigger(element, 'animationcanceled');
		        var timer = setTimeout(function () {
		          return trigger(element, 'animationend');
		        }, duration);
		        once(element, 'animationend animationcanceled', function (ref) {
		          var type = ref.type;
		          clearTimeout(timer);
		          type === 'animationcanceled' ? reject() : resolve();
		          css(element, 'animationDuration', '');
		          removeClasses(element, animationPrefix + "\\S*");
		        }, {
		          self: true
		        });
		        css(element, 'animationDuration', duration + "ms");
		        addClass(element, animation, animationPrefix + (out ? 'leave' : 'enter'));
		        if (startsWith(animation, animationPrefix)) {
		          addClass(element, origin && "uk-transform-origin-" + origin, out && animationPrefix + "reverse");
		        }
		      });
		    }));
		  }
		  var inProgress = new RegExp(animationPrefix + "(enter|leave)");
		  var Animation = {
		    in: animate,
		    out: function (element, animation, duration, origin) {
		      return animate(element, animation, duration, origin, true);
		    },
		    inProgress: function (element) {
		      return inProgress.test(attr(element, 'class'));
		    },
		    cancel: function (element) {
		      trigger(element, 'animationcanceled');
		    }
		  };
		  var dirs = {
		    width: ['x', 'left', 'right'],
		    height: ['y', 'top', 'bottom']
		  };
		  function positionAt(element, target, elAttach, targetAttach, elOffset, targetOffset, flip, boundary) {
		    elAttach = getPos(elAttach);
		    targetAttach = getPos(targetAttach);
		    var flipped = {
		      element: elAttach,
		      target: targetAttach
		    };
		    if (!element || !target) {
		      return flipped;
		    }
		    var dim = getDimensions(element);
		    var targetDim = getDimensions(target);
		    var position = targetDim;
		    moveTo(position, elAttach, dim, -1);
		    moveTo(position, targetAttach, targetDim, 1);
		    elOffset = getOffsets(elOffset, dim.width, dim.height);
		    targetOffset = getOffsets(targetOffset, targetDim.width, targetDim.height);
		    elOffset['x'] += targetOffset['x'];
		    elOffset['y'] += targetOffset['y'];
		    position.left += elOffset['x'];
		    position.top += elOffset['y'];
		    if (flip) {
		      var boundaries = [getDimensions(toWindow(element))];
		      if (boundary) {
		        boundaries.unshift(getDimensions(boundary));
		      }
		      each(dirs, function (ref, prop) {
		        var dir = ref[0];
		        var align = ref[1];
		        var alignFlip = ref[2];
		        if (!(flip === true || includes(flip, dir))) {
		          return;
		        }
		        boundaries.some(function (boundary) {
		          var elemOffset = elAttach[dir] === align ? -dim[prop] : elAttach[dir] === alignFlip ? dim[prop] : 0;
		          var targetOffset = targetAttach[dir] === align ? targetDim[prop] : targetAttach[dir] === alignFlip ? -targetDim[prop] : 0;
		          if (position[align] < boundary[align] || position[align] + dim[prop] > boundary[alignFlip]) {
		            var centerOffset = dim[prop] / 2;
		            var centerTargetOffset = targetAttach[dir] === 'center' ? -targetDim[prop] / 2 : 0;
		            return elAttach[dir] === 'center' && (apply(centerOffset, centerTargetOffset) || apply(-centerOffset, -centerTargetOffset)) || apply(elemOffset, targetOffset);
		          }
		          function apply(elemOffset, targetOffset) {
		            var newVal = toFloat((position[align] + elemOffset + targetOffset - elOffset[dir] * 2).toFixed(4));
		            if (newVal >= boundary[align] && newVal + dim[prop] <= boundary[alignFlip]) {
		              position[align] = newVal;
		              ['element', 'target'].forEach(function (el) {
		                flipped[el][dir] = !elemOffset ? flipped[el][dir] : flipped[el][dir] === dirs[prop][1] ? dirs[prop][2] : dirs[prop][1];
		              });
		              return true;
		            }
		          }
		        });
		      });
		    }
		    offset(element, position);
		    return flipped;
		  }
		  function offset(element, coordinates) {
		    if (!coordinates) {
		      return getDimensions(element);
		    }
		    var currentOffset = getDimensions(element);
		    var pos = css(element, 'position');
		    ['left', 'top'].forEach(function (prop) {
		      if (prop in coordinates) {
		        var value = css(element, prop);
		        css(element, prop, coordinates[prop] - currentOffset[prop] + toFloat(pos === 'absolute' && value === 'auto' ? position(element)[prop] : value));
		      }
		    });
		  }
		  function getDimensions(element) {
		    var ref = toWindow(element);
		    var top = ref.pageYOffset;
		    var left = ref.pageXOffset;
		    var rect = isWindow(element) ? {
		      height: height(element),
		      width: width(element),
		      top: 0,
		      left: 0
		    } : getRect(toNode(element));
		    return {
		      height: rect.height,
		      width: rect.width,
		      top: rect.top + top,
		      left: rect.left + left,
		      bottom: rect.top + rect.height + top,
		      right: rect.left + rect.width + left
		    };
		  }
		  function position(element, parent) {
		    parent = parent || (toNode(element) || {}).offsetParent || toWindow(element).document.documentElement;
		    var elementOffset = offset(element);
		    var parentOffset = offset(parent);
		    return {
		      top: elementOffset.top - parentOffset.top - toFloat(css(parent, 'borderTopWidth')),
		      left: elementOffset.left - parentOffset.left - toFloat(css(parent, 'borderLeftWidth'))
		    };
		  }
		  function offsetPosition(element) {
		    var offset = [0, 0];
		    element = toNode(element);
		    do {
		      offset[0] += element.offsetTop;
		      offset[1] += element.offsetLeft;
		      if (css(element, 'position') === 'fixed') {
		        var win = toWindow(element);
		        offset[0] += win.pageYOffset;
		        offset[1] += win.pageXOffset;
		        return offset;
		      }
		    } while (element = element.offsetParent);
		    return offset;
		  }
		  var height = dimension('height');
		  var width = dimension('width');
		  function dimension(prop) {
		    var propName = ucfirst(prop);
		    return function (element, value) {
		      if (isUndefined(value)) {
		        if (isWindow(element)) {
		          return element["inner" + propName];
		        }
		        if (isDocument(element)) {
		          var doc = element.documentElement;
		          return Math.max(doc["offset" + propName], doc["scroll" + propName]);
		        }
		        element = toNode(element);
		        value = css(element, prop);
		        value = value === 'auto' ? element["offset" + propName] : toFloat(value) || 0;
		        return value - boxModelAdjust(element, prop);
		      } else {
		        css(element, prop, !value && value !== 0 ? '' : +value + boxModelAdjust(element, prop) + 'px');
		      }
		    };
		  }
		  function boxModelAdjust(element, prop, sizing) {
		    if (sizing === void 0) sizing = 'border-box';
		    return css(element, 'boxSizing') === sizing ? dirs[prop].slice(1).map(ucfirst).reduce(function (value, prop) {
		      return value + toFloat(css(element, "padding" + prop)) + toFloat(css(element, "border" + prop + "Width"));
		    }, 0) : 0;
		  }
		  function moveTo(position, attach, dim, factor) {
		    each(dirs, function (ref, prop) {
		      var dir = ref[0];
		      var align = ref[1];
		      var alignFlip = ref[2];
		      if (attach[dir] === alignFlip) {
		        position[align] += dim[prop] * factor;
		      } else if (attach[dir] === 'center') {
		        position[align] += dim[prop] * factor / 2;
		      }
		    });
		  }
		  function getPos(pos) {
		    var x = /left|center|right/;
		    var y = /top|center|bottom/;
		    pos = (pos || '').split(' ');
		    if (pos.length === 1) {
		      pos = x.test(pos[0]) ? pos.concat('center') : y.test(pos[0]) ? ['center'].concat(pos) : ['center', 'center'];
		    }
		    return {
		      x: x.test(pos[0]) ? pos[0] : 'center',
		      y: y.test(pos[1]) ? pos[1] : 'center'
		    };
		  }
		  function getOffsets(offsets, width, height) {
		    var ref = (offsets || '').split(' ');
		    var x = ref[0];
		    var y = ref[1];
		    return {
		      x: x ? toFloat(x) * (endsWith(x, '%') ? width / 100 : 1) : 0,
		      y: y ? toFloat(y) * (endsWith(y, '%') ? height / 100 : 1) : 0
		    };
		  }
		  function flipPosition(pos) {
		    switch (pos) {
		      case 'left':
		        return 'right';
		      case 'right':
		        return 'left';
		      case 'top':
		        return 'bottom';
		      case 'bottom':
		        return 'top';
		      default:
		        return pos;
		    }
		  }
		  function toPx(value, property, element) {
		    if (property === void 0) property = 'width';
		    if (element === void 0) element = window;
		    return isNumeric(value) ? +value : endsWith(value, 'vh') ? percent(height(toWindow(element)), value) : endsWith(value, 'vw') ? percent(width(toWindow(element)), value) : endsWith(value, '%') ? percent(getDimensions(element)[property], value) : toFloat(value);
		  }
		  function percent(base, value) {
		    return base * toFloat(value) / 100;
		  }
		  function getRect(element) {
		    if (!element) {
		      return {};
		    }
		    var style;
		    if (!isVisible(element)) {
		      style = attr(element, 'style');
		      element.style.setProperty('display', 'block', 'important');
		    }
		    var rect = element.getBoundingClientRect();
		    attr(element, 'style', style);
		    return rect;
		  }

		  /*
		      Based on:
		      Copyright (c) 2016 Wilson Page wilsonpage@me.com
		      https://github.com/wilsonpage/fastdom
		  */

		  var fastdom = {
		    reads: [],
		    writes: [],
		    read: function (task) {
		      this.reads.push(task);
		      scheduleFlush();
		      return task;
		    },
		    write: function (task) {
		      this.writes.push(task);
		      scheduleFlush();
		      return task;
		    },
		    clear: function (task) {
		      return remove$1(this.reads, task) || remove$1(this.writes, task);
		    },
		    flush: flush
		  };
		  function flush(recursion) {
		    if (recursion === void 0) recursion = 1;
		    runTasks(fastdom.reads);
		    runTasks(fastdom.writes.splice(0, fastdom.writes.length));
		    fastdom.scheduled = false;
		    if (fastdom.reads.length || fastdom.writes.length) {
		      scheduleFlush(recursion + 1);
		    }
		  }
		  var RECURSION_LIMIT = 4;
		  function scheduleFlush(recursion) {
		    if (fastdom.scheduled) {
		      return;
		    }
		    fastdom.scheduled = true;
		    if (recursion && recursion < RECURSION_LIMIT) {
		      Promise.resolve().then(function () {
		        return flush(recursion);
		      });
		    } else {
		      requestAnimationFrame(function () {
		        return flush();
		      });
		    }
		  }
		  function runTasks(tasks) {
		    var task;
		    while (task = tasks.shift()) {
		      task();
		    }
		  }
		  function remove$1(array, item) {
		    var index = array.indexOf(item);
		    return !!~index && !!array.splice(index, 1);
		  }
		  function MouseTracker() {}
		  MouseTracker.prototype = {
		    positions: [],
		    init: function () {
		      var this$1$1 = this;
		      this.positions = [];
		      var position;
		      this.unbind = on(document, 'mousemove', function (e) {
		        return position = getEventPos(e);
		      });
		      this.interval = setInterval(function () {
		        if (!position) {
		          return;
		        }
		        this$1$1.positions.push(position);
		        if (this$1$1.positions.length > 5) {
		          this$1$1.positions.shift();
		        }
		      }, 50);
		    },
		    cancel: function () {
		      this.unbind && this.unbind();
		      this.interval && clearInterval(this.interval);
		    },
		    movesTo: function (target) {
		      if (this.positions.length < 2) {
		        return false;
		      }
		      var p = target.getBoundingClientRect();
		      var left = p.left;
		      var right = p.right;
		      var top = p.top;
		      var bottom = p.bottom;
		      var ref = this.positions;
		      var prevPosition = ref[0];
		      var position = last(this.positions);
		      var path = [prevPosition, position];
		      if (pointInRect(position, p)) {
		        return false;
		      }
		      var diagonals = [[{
		        x: left,
		        y: top
		      }, {
		        x: right,
		        y: bottom
		      }], [{
		        x: left,
		        y: bottom
		      }, {
		        x: right,
		        y: top
		      }]];
		      return diagonals.some(function (diagonal) {
		        var intersection = intersect(path, diagonal);
		        return intersection && pointInRect(intersection, p);
		      });
		    }
		  };

		  // Inspired by http://paulbourke.net/geometry/pointlineplane/
		  function intersect(ref, ref$1) {
		    var ref_0 = ref[0];
		    var x1 = ref_0.x;
		    var y1 = ref_0.y;
		    var ref_1 = ref[1];
		    var x2 = ref_1.x;
		    var y2 = ref_1.y;
		    var ref$1_0 = ref$1[0];
		    var x3 = ref$1_0.x;
		    var y3 = ref$1_0.y;
		    var ref$1_1 = ref$1[1];
		    var x4 = ref$1_1.x;
		    var y4 = ref$1_1.y;
		    var denominator = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);

		    // Lines are parallel
		    if (denominator === 0) {
		      return false;
		    }
		    var ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator;
		    if (ua < 0) {
		      return false;
		    }

		    // Return an object with the x and y coordinates of the intersection
		    return {
		      x: x1 + ua * (x2 - x1),
		      y: y1 + ua * (y2 - y1)
		    };
		  }
		  var strats = {};
		  strats.events = strats.created = strats.beforeConnect = strats.connected = strats.beforeDisconnect = strats.disconnected = strats.destroy = concatStrat;

		  // args strategy
		  strats.args = function (parentVal, childVal) {
		    return childVal !== false && concatStrat(childVal || parentVal);
		  };

		  // update strategy
		  strats.update = function (parentVal, childVal) {
		    return sortBy(concatStrat(parentVal, isFunction(childVal) ? {
		      read: childVal
		    } : childVal), 'order');
		  };

		  // property strategy
		  strats.props = function (parentVal, childVal) {
		    if (isArray(childVal)) {
		      childVal = childVal.reduce(function (value, key) {
		        value[key] = String;
		        return value;
		      }, {});
		    }
		    return strats.methods(parentVal, childVal);
		  };

		  // extend strategy
		  strats.computed = strats.methods = function (parentVal, childVal) {
		    return childVal ? parentVal ? assign({}, parentVal, childVal) : childVal : parentVal;
		  };

		  // data strategy
		  strats.data = function (parentVal, childVal, vm) {
		    if (!vm) {
		      if (!childVal) {
		        return parentVal;
		      }
		      if (!parentVal) {
		        return childVal;
		      }
		      return function (vm) {
		        return mergeFnData(parentVal, childVal, vm);
		      };
		    }
		    return mergeFnData(parentVal, childVal, vm);
		  };
		  function mergeFnData(parentVal, childVal, vm) {
		    return strats.computed(isFunction(parentVal) ? parentVal.call(vm, vm) : parentVal, isFunction(childVal) ? childVal.call(vm, vm) : childVal);
		  }

		  // concat strategy
		  function concatStrat(parentVal, childVal) {
		    parentVal = parentVal && !isArray(parentVal) ? [parentVal] : parentVal;
		    return childVal ? parentVal ? parentVal.concat(childVal) : isArray(childVal) ? childVal : [childVal] : parentVal;
		  }

		  // default strategy
		  function defaultStrat(parentVal, childVal) {
		    return isUndefined(childVal) ? parentVal : childVal;
		  }
		  function mergeOptions(parent, child, vm) {
		    var options = {};
		    if (isFunction(child)) {
		      child = child.options;
		    }
		    if (child.extends) {
		      parent = mergeOptions(parent, child.extends, vm);
		    }
		    if (child.mixins) {
		      for (var i = 0, l = child.mixins.length; i < l; i++) {
		        parent = mergeOptions(parent, child.mixins[i], vm);
		      }
		    }
		    for (var key in parent) {
		      mergeKey(key);
		    }
		    for (var key$1 in child) {
		      if (!hasOwn(parent, key$1)) {
		        mergeKey(key$1);
		      }
		    }
		    function mergeKey(key) {
		      options[key] = (strats[key] || defaultStrat)(parent[key], child[key], vm);
		    }
		    return options;
		  }
		  function parseOptions(options, args) {
		    var obj;
		    if (args === void 0) args = [];
		    try {
		      return !options ? {} : startsWith(options, '{') ? JSON.parse(options) : args.length && !includes(options, ':') ? (obj = {}, obj[args[0]] = options, obj) : options.split(';').reduce(function (options, option) {
		        var ref = option.split(/:(.*)/);
		        var key = ref[0];
		        var value = ref[1];
		        if (key && !isUndefined(value)) {
		          options[key.trim()] = value.trim();
		        }
		        return options;
		      }, {});
		    } catch (e) {
		      return {};
		    }
		  }
		  function play(el) {
		    if (isIFrame(el)) {
		      call(el, {
		        func: 'playVideo',
		        method: 'play'
		      });
		    }
		    if (isHTML5(el)) {
		      try {
		        el.play().catch(noop);
		      } catch (e) {}
		    }
		  }
		  function pause(el) {
		    if (isIFrame(el)) {
		      call(el, {
		        func: 'pauseVideo',
		        method: 'pause'
		      });
		    }
		    if (isHTML5(el)) {
		      el.pause();
		    }
		  }
		  function mute(el) {
		    if (isIFrame(el)) {
		      call(el, {
		        func: 'mute',
		        method: 'setVolume',
		        value: 0
		      });
		    }
		    if (isHTML5(el)) {
		      el.muted = true;
		    }
		  }
		  function isHTML5(el) {
		    return el && el.tagName === 'VIDEO';
		  }
		  function isIFrame(el) {
		    return el && el.tagName === 'IFRAME' && (isYoutube(el) || isVimeo(el));
		  }
		  function isYoutube(el) {
		    return !!el.src.match(/\/\/.*?youtube(-nocookie)?\.[a-z]+\/(watch\?v=[^&\s]+|embed)|youtu\.be\/.*/);
		  }
		  function isVimeo(el) {
		    return !!el.src.match(/vimeo\.com\/video\/.*/);
		  }
		  function call(el, cmd) {
		    enableApi(el).then(function () {
		      return post(el, cmd);
		    });
		  }
		  function post(el, cmd) {
		    try {
		      el.contentWindow.postMessage(JSON.stringify(assign({
		        event: 'command'
		      }, cmd)), '*');
		    } catch (e) {}
		  }
		  var stateKey = '_ukPlayer';
		  var counter = 0;
		  function enableApi(el) {
		    if (el[stateKey]) {
		      return el[stateKey];
		    }
		    var youtube = isYoutube(el);
		    var vimeo = isVimeo(el);
		    var id = ++counter;
		    var poller;
		    return el[stateKey] = new Promise(function (resolve) {
		      youtube && once(el, 'load', function () {
		        var listener = function () {
		          return post(el, {
		            event: 'listening',
		            id: id
		          });
		        };
		        poller = setInterval(listener, 100);
		        listener();
		      });
		      once(window, 'message', resolve, false, function (ref) {
		        var data = ref.data;
		        try {
		          data = JSON.parse(data);
		          return data && (youtube && data.id === id && data.event === 'onReady' || vimeo && Number(data.player_id) === id);
		        } catch (e) {}
		      });
		      el.src = "" + el.src + (includes(el.src, '?') ? '&' : '?') + (youtube ? 'enablejsapi=1' : "api=1&player_id=" + id);
		    }).then(function () {
		      return clearInterval(poller);
		    });
		  }
		  function isInView(element, offsetTop, offsetLeft) {
		    if (offsetTop === void 0) offsetTop = 0;
		    if (offsetLeft === void 0) offsetLeft = 0;
		    if (!isVisible(element)) {
		      return false;
		    }
		    var parents = overflowParents(element);
		    return parents.every(function (parent, i) {
		      var client = offset(parents[i + 1] || element);
		      var ref = offset(getViewport(parent));
		      var top = ref.top;
		      var left = ref.left;
		      var bottom = ref.bottom;
		      var right = ref.right;
		      return intersectRect(client, {
		        top: top - offsetTop,
		        left: left - offsetLeft,
		        bottom: bottom + offsetTop,
		        right: right + offsetLeft
		      });
		    });
		  }
		  function scrollTop(element, top) {
		    if (isWindow(element) || isDocument(element)) {
		      element = getScrollingElement(element);
		    } else {
		      element = toNode(element);
		    }
		    element.scrollTop = top;
		  }
		  function scrollIntoView(element, ref) {
		    if (ref === void 0) ref = {};
		    var offsetBy = ref.offset;
		    if (offsetBy === void 0) offsetBy = 0;
		    if (!isVisible(element)) {
		      return;
		    }
		    var parents = overflowParents(element).reverse();
		    var diff = 0;
		    return parents.reduce(function (fn, scrollElement, i) {
		      var scrollTop = scrollElement.scrollTop;
		      var scrollHeight = scrollElement.scrollHeight;
		      var clientHeight = scrollElement.clientHeight;
		      var maxScroll = scrollHeight - clientHeight;
		      var top = Math.ceil(position(parents[i - 1] || element, getViewport(scrollElement)).top - offsetBy) + diff + scrollTop;
		      if (top > maxScroll) {
		        diff = top - maxScroll;
		        top = maxScroll;
		      } else {
		        diff = 0;
		      }
		      return function () {
		        return scrollTo(scrollElement, top - scrollTop).then(fn);
		      };
		    }, function () {
		      return Promise.resolve();
		    })();
		    function scrollTo(element, top) {
		      return new Promise(function (resolve) {
		        var scroll = element.scrollTop;
		        var duration = getDuration(Math.abs(top));
		        var start = Date.now();
		        (function step() {
		          var percent = ease(clamp((Date.now() - start) / duration));
		          scrollTop(element, scroll + top * percent);

		          // scroll more if we have not reached our destination
		          if (percent !== 1) {
		            requestAnimationFrame(step);
		          } else {
		            resolve();
		          }
		        })();
		      });
		    }
		    function getDuration(dist) {
		      return 40 * Math.pow(dist, .375);
		    }
		    function ease(k) {
		      return 0.5 * (1 - Math.cos(Math.PI * k));
		    }
		  }
		  function scrolledOver(element, heightOffset) {
		    if (heightOffset === void 0) heightOffset = 0;
		    if (!isVisible(element)) {
		      return 0;
		    }
		    var scrollElement = last(scrollParents(element));
		    var scrollHeight = scrollElement.scrollHeight;
		    var scrollTop = scrollElement.scrollTop;
		    var viewport = getViewport(scrollElement);
		    var viewportHeight = offset(viewport).height;
		    var viewportTop = offsetPosition(element)[0] - scrollTop - offsetPosition(scrollElement)[0];
		    var viewportDist = Math.min(viewportHeight, viewportTop + scrollTop);
		    var top = viewportTop - viewportDist;
		    var dist = Math.min(offset(element).height + heightOffset + viewportDist, scrollHeight - (viewportTop + scrollTop), scrollHeight - viewportHeight);
		    return clamp(-1 * top / dist);
		  }
		  function scrollParents(element, overflowRe) {
		    if (overflowRe === void 0) overflowRe = /auto|scroll/;
		    var scrollEl = getScrollingElement(element);
		    var scrollParents = parents(element).filter(function (parent) {
		      return parent === scrollEl || overflowRe.test(css(parent, 'overflow')) && parent.scrollHeight > Math.round(offset(parent).height);
		    }).reverse();
		    return scrollParents.length ? scrollParents : [scrollEl];
		  }
		  function getViewport(scrollElement) {
		    return scrollElement === getScrollingElement(scrollElement) ? window : scrollElement;
		  }
		  function overflowParents(element) {
		    return scrollParents(element, /auto|scroll|hidden/);
		  }
		  function getScrollingElement(element) {
		    var ref = toWindow(element);
		    var document = ref.document;
		    return document.scrollingElement || document.documentElement;
		  }
		  var IntersectionObserver = inBrowser && window.IntersectionObserver || /*@__PURE__*/function () {
		    function IntersectionObserverClass(callback, ref) {
		      var this$1$1 = this;
		      if (ref === void 0) ref = {};
		      var rootMargin = ref.rootMargin;
		      if (rootMargin === void 0) rootMargin = '0 0';
		      this.targets = [];
		      var ref$1 = (rootMargin || '0 0').split(' ').map(toFloat);
		      var offsetTop = ref$1[0];
		      var offsetLeft = ref$1[1];
		      this.offsetTop = offsetTop;
		      this.offsetLeft = offsetLeft;
		      var pending;
		      this.apply = function () {
		        if (pending) {
		          return;
		        }
		        pending = requestAnimationFrame(function () {
		          return setTimeout(function () {
		            var records = this$1$1.takeRecords();
		            if (records.length) {
		              callback(records, this$1$1);
		            }
		            pending = false;
		          });
		        });
		      };
		      this.off = on(window, 'scroll resize load', this.apply, {
		        passive: true,
		        capture: true
		      });
		    }
		    IntersectionObserverClass.prototype.takeRecords = function () {
		      var this$1$1 = this;
		      return this.targets.filter(function (entry) {
		        var inView = isInView(entry.target, this$1$1.offsetTop, this$1$1.offsetLeft);
		        if (entry.isIntersecting === null || inView ^ entry.isIntersecting) {
		          entry.isIntersecting = inView;
		          return true;
		        }
		      });
		    };
		    IntersectionObserverClass.prototype.observe = function (target) {
		      this.targets.push({
		        target: target,
		        isIntersecting: null
		      });
		      this.apply();
		    };
		    IntersectionObserverClass.prototype.disconnect = function () {
		      this.targets = [];
		      this.off();
		    };
		    return IntersectionObserverClass;
		  }();
		  var util = /*#__PURE__*/Object.freeze({
		    __proto__: null,
		    ajax: ajax,
		    getImage: getImage,
		    transition: transition,
		    Transition: Transition,
		    animate: animate,
		    Animation: Animation,
		    attr: attr,
		    hasAttr: hasAttr,
		    removeAttr: removeAttr,
		    data: data,
		    addClass: addClass,
		    removeClass: removeClass,
		    removeClasses: removeClasses,
		    replaceClass: replaceClass,
		    hasClass: hasClass,
		    toggleClass: toggleClass,
		    positionAt: positionAt,
		    offset: offset,
		    position: position,
		    offsetPosition: offsetPosition,
		    height: height,
		    width: width,
		    boxModelAdjust: boxModelAdjust,
		    flipPosition: flipPosition,
		    toPx: toPx,
		    ready: ready,
		    index: index,
		    getIndex: getIndex,
		    empty: empty,
		    html: html,
		    prepend: prepend,
		    append: append,
		    before: before,
		    after: after,
		    remove: remove,
		    wrapAll: wrapAll,
		    wrapInner: wrapInner,
		    unwrap: unwrap,
		    fragment: fragment,
		    apply: apply,
		    $: $,
		    $$: $$,
		    inBrowser: inBrowser,
		    isIE: isIE,
		    isRtl: isRtl,
		    hasTouch: hasTouch,
		    pointerDown: pointerDown,
		    pointerMove: pointerMove,
		    pointerUp: pointerUp,
		    pointerEnter: pointerEnter,
		    pointerLeave: pointerLeave,
		    pointerCancel: pointerCancel,
		    on: on,
		    off: off,
		    once: once,
		    trigger: trigger,
		    createEvent: createEvent,
		    toEventTargets: toEventTargets,
		    isTouch: isTouch,
		    getEventPos: getEventPos,
		    fastdom: fastdom,
		    isVoidElement: isVoidElement,
		    isVisible: isVisible,
		    selInput: selInput,
		    isInput: isInput,
		    filter: filter,
		    within: within,
		    parents: parents,
		    children: children,
		    hasOwn: hasOwn,
		    hyphenate: hyphenate,
		    camelize: camelize,
		    ucfirst: ucfirst,
		    startsWith: startsWith,
		    endsWith: endsWith,
		    includes: includes,
		    findIndex: findIndex,
		    isArray: isArray,
		    isFunction: isFunction,
		    isObject: isObject,
		    isPlainObject: isPlainObject,
		    isWindow: isWindow,
		    isDocument: isDocument,
		    isJQuery: isJQuery,
		    isNode: isNode,
		    isElement: isElement,
		    isNodeCollection: isNodeCollection,
		    isBoolean: isBoolean,
		    isString: isString,
		    isNumber: isNumber,
		    isNumeric: isNumeric,
		    isEmpty: isEmpty,
		    isUndefined: isUndefined,
		    toBoolean: toBoolean,
		    toNumber: toNumber,
		    toFloat: toFloat,
		    toNode: toNode,
		    toNodes: toNodes,
		    toWindow: toWindow,
		    toList: toList,
		    toMs: toMs,
		    isEqual: isEqual,
		    swap: swap,
		    assign: assign,
		    last: last,
		    each: each,
		    sortBy: sortBy,
		    uniqueBy: uniqueBy,
		    clamp: clamp,
		    noop: noop,
		    intersectRect: intersectRect,
		    pointInRect: pointInRect,
		    Dimensions: Dimensions,
		    MouseTracker: MouseTracker,
		    mergeOptions: mergeOptions,
		    parseOptions: parseOptions,
		    play: play,
		    pause: pause,
		    mute: mute,
		    Promise: Promise,
		    Deferred: Deferred,
		    IntersectionObserver: IntersectionObserver,
		    query: query,
		    queryAll: queryAll,
		    find: find,
		    findAll: findAll,
		    matches: matches,
		    closest: closest,
		    parent: parent,
		    escape: escape,
		    css: css,
		    getStyles: getStyles,
		    getStyle: getStyle,
		    getCssVar: getCssVar,
		    propName: propName,
		    isInView: isInView,
		    scrollTop: scrollTop,
		    scrollIntoView: scrollIntoView,
		    scrolledOver: scrolledOver,
		    scrollParents: scrollParents,
		    getViewport: getViewport
		  });
		  function globalAPI(UIkit) {
		    var DATA = UIkit.data;
		    UIkit.use = function (plugin) {
		      if (plugin.installed) {
		        return;
		      }
		      plugin.call(null, this);
		      plugin.installed = true;
		      return this;
		    };
		    UIkit.mixin = function (mixin, component) {
		      component = (isString(component) ? UIkit.component(component) : component) || this;
		      component.options = mergeOptions(component.options, mixin);
		    };
		    UIkit.extend = function (options) {
		      options = options || {};
		      var Super = this;
		      var Sub = function UIkitComponent(options) {
		        this._init(options);
		      };
		      Sub.prototype = Object.create(Super.prototype);
		      Sub.prototype.constructor = Sub;
		      Sub.options = mergeOptions(Super.options, options);
		      Sub.super = Super;
		      Sub.extend = Super.extend;
		      return Sub;
		    };
		    UIkit.update = function (element, e) {
		      element = element ? toNode(element) : document.body;
		      parents(element).reverse().forEach(function (element) {
		        return update(element[DATA], e);
		      });
		      apply(element, function (element) {
		        return update(element[DATA], e);
		      });
		    };
		    var container;
		    Object.defineProperty(UIkit, 'container', {
		      get: function () {
		        return container || document.body;
		      },
		      set: function (element) {
		        container = $(element);
		      }
		    });
		    function update(data, e) {
		      if (!data) {
		        return;
		      }
		      for (var name in data) {
		        if (data[name]._connected) {
		          data[name]._callUpdate(e);
		        }
		      }
		    }
		  }
		  function hooksAPI(UIkit) {
		    UIkit.prototype._callHook = function (hook) {
		      var this$1$1 = this;
		      var handlers = this.$options[hook];
		      if (handlers) {
		        handlers.forEach(function (handler) {
		          return handler.call(this$1$1);
		        });
		      }
		    };
		    UIkit.prototype._callConnected = function () {
		      if (this._connected) {
		        return;
		      }
		      this._data = {};
		      this._computeds = {};
		      this._frames = {
		        reads: {},
		        writes: {}
		      };
		      this._initProps();
		      this._callHook('beforeConnect');
		      this._connected = true;
		      this._initEvents();
		      this._initObserver();
		      this._callHook('connected');
		      this._callUpdate();
		    };
		    UIkit.prototype._callDisconnected = function () {
		      if (!this._connected) {
		        return;
		      }
		      this._callHook('beforeDisconnect');
		      if (this._observer) {
		        this._observer.disconnect();
		        this._observer = null;
		      }
		      this._unbindEvents();
		      this._callHook('disconnected');
		      this._connected = false;
		    };
		    UIkit.prototype._callUpdate = function (e) {
		      var this$1$1 = this;
		      if (e === void 0) e = 'update';
		      var type = e.type || e;
		      if (includes(['update', 'resize'], type)) {
		        this._callWatches();
		      }
		      var updates = this.$options.update;
		      var ref = this._frames;
		      var reads = ref.reads;
		      var writes = ref.writes;
		      if (!updates) {
		        return;
		      }
		      updates.forEach(function (ref, i) {
		        var read = ref.read;
		        var write = ref.write;
		        var events = ref.events;
		        if (type !== 'update' && !includes(events, type)) {
		          return;
		        }
		        if (read && !includes(fastdom.reads, reads[i])) {
		          reads[i] = fastdom.read(function () {
		            var result = this$1$1._connected && read.call(this$1$1, this$1$1._data, type);
		            if (result === false && write) {
		              fastdom.clear(writes[i]);
		            } else if (isPlainObject(result)) {
		              assign(this$1$1._data, result);
		            }
		          });
		        }
		        if (write && !includes(fastdom.writes, writes[i])) {
		          writes[i] = fastdom.write(function () {
		            return this$1$1._connected && write.call(this$1$1, this$1$1._data, type);
		          });
		        }
		      });
		    };
		    UIkit.prototype._callWatches = function () {
		      var this$1$1 = this;
		      var ref = this;
		      var _frames = ref._frames;
		      if (_frames._watch) {
		        return;
		      }
		      var initital = !hasOwn(_frames, '_watch');
		      _frames._watch = fastdom.read(function () {
		        if (!this$1$1._connected) {
		          return;
		        }
		        var ref = this$1$1;
		        var computed = ref.$options.computed;
		        var _computeds = ref._computeds;
		        for (var key in computed) {
		          var hasPrev = hasOwn(_computeds, key);
		          var prev = _computeds[key];
		          delete _computeds[key];
		          var ref$1 = computed[key];
		          var watch = ref$1.watch;
		          var immediate = ref$1.immediate;
		          if (watch && (initital && immediate || hasPrev && !isEqual(prev, this$1$1[key]))) {
		            watch.call(this$1$1, this$1$1[key], prev);
		          }
		        }
		        _frames._watch = null;
		      });
		    };
		  }
		  function stateAPI(UIkit) {
		    var uid = 0;
		    UIkit.prototype._init = function (options) {
		      options = options || {};
		      options.data = normalizeData(options, this.constructor.options);
		      this.$options = mergeOptions(this.constructor.options, options, this);
		      this.$el = null;
		      this.$props = {};
		      this._uid = uid++;
		      this._initData();
		      this._initMethods();
		      this._initComputeds();
		      this._callHook('created');
		      if (options.el) {
		        this.$mount(options.el);
		      }
		    };
		    UIkit.prototype._initData = function () {
		      var ref = this.$options;
		      var data = ref.data;
		      if (data === void 0) data = {};
		      for (var key in data) {
		        this.$props[key] = this[key] = data[key];
		      }
		    };
		    UIkit.prototype._initMethods = function () {
		      var ref = this.$options;
		      var methods = ref.methods;
		      if (methods) {
		        for (var key in methods) {
		          this[key] = methods[key].bind(this);
		        }
		      }
		    };
		    UIkit.prototype._initComputeds = function () {
		      var ref = this.$options;
		      var computed = ref.computed;
		      this._computeds = {};
		      if (computed) {
		        for (var key in computed) {
		          registerComputed(this, key, computed[key]);
		        }
		      }
		    };
		    UIkit.prototype._initProps = function (props) {
		      var key;
		      props = props || getProps(this.$options, this.$name);
		      for (key in props) {
		        if (!isUndefined(props[key])) {
		          this.$props[key] = props[key];
		        }
		      }
		      var exclude = [this.$options.computed, this.$options.methods];
		      for (key in this.$props) {
		        if (key in props && notIn(exclude, key)) {
		          this[key] = this.$props[key];
		        }
		      }
		    };
		    UIkit.prototype._initEvents = function () {
		      var this$1$1 = this;
		      this._events = [];
		      var ref = this.$options;
		      var events = ref.events;
		      if (events) {
		        events.forEach(function (event) {
		          if (!hasOwn(event, 'handler')) {
		            for (var key in event) {
		              registerEvent(this$1$1, event[key], key);
		            }
		          } else {
		            registerEvent(this$1$1, event);
		          }
		        });
		      }
		    };
		    UIkit.prototype._unbindEvents = function () {
		      this._events.forEach(function (unbind) {
		        return unbind();
		      });
		      delete this._events;
		    };
		    UIkit.prototype._initObserver = function () {
		      var this$1$1 = this;
		      var ref = this.$options;
		      var attrs = ref.attrs;
		      var props = ref.props;
		      var el = ref.el;
		      if (this._observer || !props || attrs === false) {
		        return;
		      }
		      attrs = isArray(attrs) ? attrs : Object.keys(props);
		      this._observer = new MutationObserver(function (records) {
		        var data = getProps(this$1$1.$options, this$1$1.$name);
		        if (records.some(function (ref) {
		          var attributeName = ref.attributeName;
		          var prop = attributeName.replace('data-', '');
		          return (prop === this$1$1.$name ? attrs : [camelize(prop), camelize(attributeName)]).some(function (prop) {
		            return !isUndefined(data[prop]) && data[prop] !== this$1$1.$props[prop];
		          });
		        })) {
		          this$1$1.$reset();
		        }
		      });
		      var filter = attrs.map(function (key) {
		        return hyphenate(key);
		      }).concat(this.$name);
		      this._observer.observe(el, {
		        attributes: true,
		        attributeFilter: filter.concat(filter.map(function (key) {
		          return "data-" + key;
		        }))
		      });
		    };
		    function getProps(opts, name) {
		      var data$1 = {};
		      var args = opts.args;
		      if (args === void 0) args = [];
		      var props = opts.props;
		      if (props === void 0) props = {};
		      var el = opts.el;
		      if (!props) {
		        return data$1;
		      }
		      for (var key in props) {
		        var prop = hyphenate(key);
		        var value = data(el, prop);
		        if (isUndefined(value)) {
		          continue;
		        }
		        value = props[key] === Boolean && value === '' ? true : coerce(props[key], value);
		        if (prop === 'target' && (!value || startsWith(value, '_'))) {
		          continue;
		        }
		        data$1[key] = value;
		      }
		      var options = parseOptions(data(el, name), args);
		      for (var key$1 in options) {
		        var prop$1 = camelize(key$1);
		        if (props[prop$1] !== undefined) {
		          data$1[prop$1] = coerce(props[prop$1], options[key$1]);
		        }
		      }
		      return data$1;
		    }
		    function registerComputed(component, key, cb) {
		      Object.defineProperty(component, key, {
		        enumerable: true,
		        get: function () {
		          var _computeds = component._computeds;
		          var $props = component.$props;
		          var $el = component.$el;
		          if (!hasOwn(_computeds, key)) {
		            _computeds[key] = (cb.get || cb).call(component, $props, $el);
		          }
		          return _computeds[key];
		        },
		        set: function (value) {
		          var _computeds = component._computeds;
		          _computeds[key] = cb.set ? cb.set.call(component, value) : value;
		          if (isUndefined(_computeds[key])) {
		            delete _computeds[key];
		          }
		        }
		      });
		    }
		    function registerEvent(component, event, key) {
		      if (!isPlainObject(event)) {
		        event = {
		          name: key,
		          handler: event
		        };
		      }
		      var name = event.name;
		      var el = event.el;
		      var handler = event.handler;
		      var capture = event.capture;
		      var passive = event.passive;
		      var delegate = event.delegate;
		      var filter = event.filter;
		      var self = event.self;
		      el = isFunction(el) ? el.call(component) : el || component.$el;
		      if (isArray(el)) {
		        el.forEach(function (el) {
		          return registerEvent(component, assign({}, event, {
		            el: el
		          }), key);
		        });
		        return;
		      }
		      if (!el || filter && !filter.call(component)) {
		        return;
		      }
		      component._events.push(on(el, name, !delegate ? null : isString(delegate) ? delegate : delegate.call(component), isString(handler) ? component[handler] : handler.bind(component), {
		        passive: passive,
		        capture: capture,
		        self: self
		      }));
		    }
		    function notIn(options, key) {
		      return options.every(function (arr) {
		        return !arr || !hasOwn(arr, key);
		      });
		    }
		    function coerce(type, value) {
		      if (type === Boolean) {
		        return toBoolean(value);
		      } else if (type === Number) {
		        return toNumber(value);
		      } else if (type === 'list') {
		        return toList(value);
		      }
		      return type ? type(value) : value;
		    }
		    function normalizeData(ref, ref$1) {
		      var data = ref.data;
		      ref.el;
		      var args = ref$1.args;
		      var props = ref$1.props;
		      if (props === void 0) props = {};
		      data = isArray(data) ? !isEmpty(args) ? data.slice(0, args.length).reduce(function (data, value, index) {
		        if (isPlainObject(value)) {
		          assign(data, value);
		        } else {
		          data[args[index]] = value;
		        }
		        return data;
		      }, {}) : undefined : data;
		      if (data) {
		        for (var key in data) {
		          if (isUndefined(data[key])) {
		            delete data[key];
		          } else {
		            data[key] = props[key] ? coerce(props[key], data[key]) : data[key];
		          }
		        }
		      }
		      return data;
		    }
		  }
		  function instanceAPI(UIkit) {
		    var DATA = UIkit.data;
		    UIkit.prototype.$create = function (component, element, data) {
		      return UIkit[component](element, data);
		    };
		    UIkit.prototype.$mount = function (el) {
		      var ref = this.$options;
		      var name = ref.name;
		      if (!el[DATA]) {
		        el[DATA] = {};
		      }
		      if (el[DATA][name]) {
		        return;
		      }
		      el[DATA][name] = this;
		      this.$el = this.$options.el = this.$options.el || el;
		      if (within(el, document)) {
		        this._callConnected();
		      }
		    };
		    UIkit.prototype.$reset = function () {
		      this._callDisconnected();
		      this._callConnected();
		    };
		    UIkit.prototype.$destroy = function (removeEl) {
		      if (removeEl === void 0) removeEl = false;
		      var ref = this.$options;
		      var el = ref.el;
		      var name = ref.name;
		      if (el) {
		        this._callDisconnected();
		      }
		      this._callHook('destroy');
		      if (!el || !el[DATA]) {
		        return;
		      }
		      delete el[DATA][name];
		      if (!isEmpty(el[DATA])) {
		        delete el[DATA];
		      }
		      if (removeEl) {
		        remove(this.$el);
		      }
		    };
		    UIkit.prototype.$emit = function (e) {
		      this._callUpdate(e);
		    };
		    UIkit.prototype.$update = function (element, e) {
		      if (element === void 0) element = this.$el;
		      UIkit.update(element, e);
		    };
		    UIkit.prototype.$getComponent = UIkit.getComponent;
		    var names = {};
		    Object.defineProperties(UIkit.prototype, {
		      $container: Object.getOwnPropertyDescriptor(UIkit, 'container'),
		      $name: {
		        get: function () {
		          var ref = this.$options;
		          var name = ref.name;
		          if (!names[name]) {
		            names[name] = UIkit.prefix + hyphenate(name);
		          }
		          return names[name];
		        }
		      }
		    });
		  }
		  function componentAPI(UIkit) {
		    var DATA = UIkit.data;
		    var components = {};
		    UIkit.component = function (name, options) {
		      var id = hyphenate(name);
		      name = camelize(id);
		      if (!options) {
		        if (isPlainObject(components[name])) {
		          components[name] = UIkit.extend(components[name]);
		        }
		        return components[name];
		      }
		      UIkit[name] = function (element, data) {
		        var i = arguments.length,
		          argsArray = Array(i);
		        while (i--) argsArray[i] = arguments[i];
		        var component = UIkit.component(name);
		        return component.options.functional ? new component({
		          data: isPlainObject(element) ? element : [].concat(argsArray)
		        }) : !element ? init(element) : $$(element).map(init)[0];
		        function init(element) {
		          var instance = UIkit.getComponent(element, name);
		          if (instance) {
		            if (!data) {
		              return instance;
		            } else {
		              instance.$destroy();
		            }
		          }
		          return new component({
		            el: element,
		            data: data
		          });
		        }
		      };
		      var opt = isPlainObject(options) ? assign({}, options) : options.options;
		      opt.name = name;
		      if (opt.install) {
		        opt.install(UIkit, opt, name);
		      }
		      if (UIkit._initialized && !opt.functional) {
		        fastdom.read(function () {
		          return UIkit[name]("[uk-" + id + "],[data-uk-" + id + "]");
		        });
		      }
		      return components[name] = isPlainObject(options) ? opt : options;
		    };
		    UIkit.getComponents = function (element) {
		      return element && element[DATA] || {};
		    };
		    UIkit.getComponent = function (element, name) {
		      return UIkit.getComponents(element)[name];
		    };
		    UIkit.connect = function (node) {
		      if (node[DATA]) {
		        for (var name in node[DATA]) {
		          node[DATA][name]._callConnected();
		        }
		      }
		      for (var i = 0; i < node.attributes.length; i++) {
		        var name$1 = getComponentName(node.attributes[i].name);
		        if (name$1 && name$1 in components) {
		          UIkit[name$1](node);
		        }
		      }
		    };
		    UIkit.disconnect = function (node) {
		      for (var name in node[DATA]) {
		        node[DATA][name]._callDisconnected();
		      }
		    };
		  }
		  function getComponentName(attribute) {
		    return startsWith(attribute, 'uk-') || startsWith(attribute, 'data-uk-') ? camelize(attribute.replace('data-uk-', '').replace('uk-', '')) : false;
		  }
		  var UIkit = function (options) {
		    this._init(options);
		  };
		  UIkit.util = util;
		  UIkit.data = '__uikit__';
		  UIkit.prefix = 'uk-';
		  UIkit.options = {};
		  UIkit.version = '3.5.9';
		  globalAPI(UIkit);
		  hooksAPI(UIkit);
		  stateAPI(UIkit);
		  componentAPI(UIkit);
		  instanceAPI(UIkit);
		  function Core(UIkit) {
		    inBrowser && ready(function () {
		      UIkit.update();
		      on(window, 'load resize', function () {
		        return UIkit.update(null, 'resize');
		      });
		      on(document, 'loadedmetadata load', function (ref) {
		        var target = ref.target;
		        return UIkit.update(target, 'resize');
		      }, true);

		      // throttle `scroll` event (Safari triggers multiple `scroll` events per frame)
		      var pending;
		      on(window, 'scroll', function (e) {
		        if (pending) {
		          return;
		        }
		        pending = true;
		        fastdom.write(function () {
		          return pending = false;
		        });
		        UIkit.update(null, e.type);
		      }, {
		        passive: true,
		        capture: true
		      });
		      var started = 0;
		      on(document, 'animationstart', function (ref) {
		        var target = ref.target;
		        if ((css(target, 'animationName') || '').match(/^uk-.*(left|right)/)) {
		          started++;
		          css(document.body, 'overflowX', 'hidden');
		          setTimeout(function () {
		            if (! --started) {
		              css(document.body, 'overflowX', '');
		            }
		          }, toMs(css(target, 'animationDuration')) + 100);
		        }
		      }, true);
		      var off;
		      on(document, pointerDown, function (e) {
		        off && off();
		        if (!isTouch(e)) {
		          return;
		        }

		        // Handle Swipe Gesture
		        var pos = getEventPos(e);
		        var target = 'tagName' in e.target ? e.target : e.target.parentNode;
		        off = once(document, pointerUp + " " + pointerCancel, function (e) {
		          var ref = getEventPos(e);
		          var x = ref.x;
		          var y = ref.y;

		          // swipe
		          if (target && x && Math.abs(pos.x - x) > 100 || y && Math.abs(pos.y - y) > 100) {
		            setTimeout(function () {
		              trigger(target, 'swipe');
		              trigger(target, "swipe" + swipeDirection(pos.x, pos.y, x, y));
		            });
		          }
		        });
		      }, {
		        passive: true
		      });
		    });
		  }
		  function swipeDirection(x1, y1, x2, y2) {
		    return Math.abs(x1 - x2) >= Math.abs(y1 - y2) ? x1 - x2 > 0 ? 'Left' : 'Right' : y1 - y2 > 0 ? 'Up' : 'Down';
		  }
		  function boot(UIkit) {
		    var connect = UIkit.connect;
		    var disconnect = UIkit.disconnect;
		    if (!inBrowser || !window.MutationObserver) {
		      return;
		    }
		    fastdom.read(init);
		    function init() {
		      if (document.body) {
		        apply(document.body, connect);
		      }
		      new MutationObserver(function (mutations) {
		        var updates = [];
		        mutations.forEach(function (mutation) {
		          return applyMutation(mutation, updates);
		        });
		        updates.forEach(function (el) {
		          return UIkit.update(el);
		        });
		      }).observe(document, {
		        childList: true,
		        subtree: true,
		        characterData: true,
		        attributes: true
		      });
		      UIkit._initialized = true;
		    }
		    function applyMutation(mutation, updates) {
		      var target = mutation.target;
		      var type = mutation.type;
		      var update = type !== 'attributes' ? applyChildList(mutation) : applyAttribute(mutation);
		      if (update && !updates.some(function (element) {
		        return element.contains(target);
		      })) {
		        updates.push(target.contains ? target : target.parentNode); // IE 11 text node does not implement contains
		      }
		    }

		    function applyAttribute(ref) {
		      var target = ref.target;
		      var attributeName = ref.attributeName;
		      if (attributeName === 'href') {
		        return true;
		      }
		      var name = getComponentName(attributeName);
		      if (!name || !(name in UIkit)) {
		        return;
		      }
		      if (hasAttr(target, attributeName)) {
		        UIkit[name](target);
		        return true;
		      }
		      var component = UIkit.getComponent(target, name);
		      if (component) {
		        component.$destroy();
		        return true;
		      }
		    }
		    function applyChildList(ref) {
		      var addedNodes = ref.addedNodes;
		      var removedNodes = ref.removedNodes;
		      for (var i = 0; i < addedNodes.length; i++) {
		        apply(addedNodes[i], connect);
		      }
		      for (var i$1 = 0; i$1 < removedNodes.length; i$1++) {
		        apply(removedNodes[i$1], disconnect);
		      }
		      return true;
		    }
		  }
		  var Class = {
		    connected: function () {
		      !hasClass(this.$el, this.$name) && addClass(this.$el, this.$name);
		    }
		  };
		  var Togglable = {
		    props: {
		      cls: Boolean,
		      animation: 'list',
		      duration: Number,
		      origin: String,
		      transition: String
		    },
		    data: {
		      cls: false,
		      animation: [false],
		      duration: 200,
		      origin: false,
		      transition: 'linear',
		      initProps: {
		        overflow: '',
		        height: '',
		        paddingTop: '',
		        paddingBottom: '',
		        marginTop: '',
		        marginBottom: ''
		      },
		      hideProps: {
		        overflow: 'hidden',
		        height: 0,
		        paddingTop: 0,
		        paddingBottom: 0,
		        marginTop: 0,
		        marginBottom: 0
		      }
		    },
		    computed: {
		      hasAnimation: function (ref) {
		        var animation = ref.animation;
		        return !!animation[0];
		      },
		      hasTransition: function (ref) {
		        var animation = ref.animation;
		        return this.hasAnimation && animation[0] === true;
		      }
		    },
		    methods: {
		      toggleElement: function (targets, show, animate) {
		        var this$1$1 = this;
		        return Promise.all(toNodes(targets).map(function (el) {
		          return new Promise(function (resolve) {
		            return this$1$1._toggleElement(el, show, animate).then(resolve, noop);
		          });
		        }));
		      },
		      isToggled: function (el) {
		        var nodes = toNodes(el || this.$el);
		        return this.cls ? hasClass(nodes, this.cls.split(' ')[0]) : !hasAttr(nodes, 'hidden');
		      },
		      updateAria: function (el) {
		        if (this.cls === false) {
		          attr(el, 'aria-hidden', !this.isToggled(el));
		        }
		      },
		      _toggleElement: function (el, show, animate) {
		        var this$1$1 = this;
		        show = isBoolean(show) ? show : Animation.inProgress(el) ? hasClass(el, 'uk-animation-leave') : Transition.inProgress(el) ? el.style.height === '0px' : !this.isToggled(el);
		        if (!trigger(el, "before" + (show ? 'show' : 'hide'), [this])) {
		          return Promise.reject();
		        }
		        var promise = (isFunction(animate) ? animate : animate === false || !this.hasAnimation ? this._toggle : this.hasTransition ? toggleHeight(this) : toggleAnimation(this))(el, show);
		        trigger(el, show ? 'show' : 'hide', [this]);
		        var final = function () {
		          trigger(el, show ? 'shown' : 'hidden', [this$1$1]);
		          this$1$1.$update(el);
		        };
		        return (promise || Promise.resolve()).then(final);
		      },
		      _toggle: function (el, toggled) {
		        if (!el) {
		          return;
		        }
		        toggled = Boolean(toggled);
		        var changed;
		        if (this.cls) {
		          changed = includes(this.cls, ' ') || toggled !== hasClass(el, this.cls);
		          changed && toggleClass(el, this.cls, includes(this.cls, ' ') ? undefined : toggled);
		        } else {
		          changed = toggled === el.hidden;
		          changed && (el.hidden = !toggled);
		        }
		        $$('[autofocus]', el).some(function (el) {
		          return isVisible(el) ? el.focus() || true : el.blur();
		        });
		        this.updateAria(el);
		        if (changed) {
		          trigger(el, 'toggled', [this]);
		          this.$update(el);
		        }
		      }
		    }
		  };
		  function toggleHeight(ref) {
		    var isToggled = ref.isToggled;
		    var duration = ref.duration;
		    var initProps = ref.initProps;
		    var hideProps = ref.hideProps;
		    var transition = ref.transition;
		    var _toggle = ref._toggle;
		    return function (el, show) {
		      var inProgress = Transition.inProgress(el);
		      var inner = el.hasChildNodes ? toFloat(css(el.firstElementChild, 'marginTop')) + toFloat(css(el.lastElementChild, 'marginBottom')) : 0;
		      var currentHeight = isVisible(el) ? height(el) + (inProgress ? 0 : inner) : 0;
		      Transition.cancel(el);
		      if (!isToggled(el)) {
		        _toggle(el, true);
		      }
		      height(el, '');

		      // Update child components first
		      fastdom.flush();
		      var endHeight = height(el) + (inProgress ? 0 : inner);
		      height(el, currentHeight);
		      return (show ? Transition.start(el, assign({}, initProps, {
		        overflow: 'hidden',
		        height: endHeight
		      }), Math.round(duration * (1 - currentHeight / endHeight)), transition) : Transition.start(el, hideProps, Math.round(duration * (currentHeight / endHeight)), transition).then(function () {
		        return _toggle(el, false);
		      })).then(function () {
		        return css(el, initProps);
		      });
		    };
		  }
		  function toggleAnimation(cmp) {
		    return function (el, show) {
		      Animation.cancel(el);
		      var animation = cmp.animation;
		      var duration = cmp.duration;
		      var _toggle = cmp._toggle;
		      if (show) {
		        _toggle(el, true);
		        return Animation.in(el, animation[0], duration, cmp.origin);
		      }
		      return Animation.out(el, animation[1] || animation[0], duration, cmp.origin).then(function () {
		        return _toggle(el, false);
		      });
		    };
		  }
		  var Accordion = {
		    mixins: [Class, Togglable],
		    props: {
		      targets: String,
		      active: null,
		      collapsible: Boolean,
		      multiple: Boolean,
		      toggle: String,
		      content: String,
		      transition: String,
		      offset: Number
		    },
		    data: {
		      targets: '> *',
		      active: false,
		      animation: [true],
		      collapsible: true,
		      multiple: false,
		      clsOpen: 'uk-open',
		      toggle: '> .uk-accordion-title',
		      content: '> .uk-accordion-content',
		      transition: 'ease',
		      offset: 0
		    },
		    computed: {
		      items: {
		        get: function (ref, $el) {
		          var targets = ref.targets;
		          return $$(targets, $el);
		        },
		        watch: function (items, prev) {
		          var this$1$1 = this;
		          items.forEach(function (el) {
		            return hide($(this$1$1.content, el), !hasClass(el, this$1$1.clsOpen));
		          });
		          if (prev || hasClass(items, this.clsOpen)) {
		            return;
		          }
		          var active = this.active !== false && items[Number(this.active)] || !this.collapsible && items[0];
		          if (active) {
		            this.toggle(active, false);
		          }
		        },
		        immediate: true
		      }
		    },
		    events: [{
		      name: 'click',
		      delegate: function () {
		        return this.targets + " " + this.$props.toggle;
		      },
		      handler: function (e) {
		        e.preventDefault();
		        this.toggle(index($$(this.targets + " " + this.$props.toggle, this.$el), e.current));
		      }
		    }],
		    methods: {
		      toggle: function (item, animate) {
		        var this$1$1 = this;
		        var items = [this.items[getIndex(item, this.items)]];
		        var activeItems = filter(this.items, "." + this.clsOpen);
		        if (!this.multiple && !includes(activeItems, items[0])) {
		          items = items.concat(activeItems);
		        }
		        if (!this.collapsible && activeItems.length < 2 && !filter(items, ":not(." + this.clsOpen + ")").length) {
		          return;
		        }
		        items.forEach(function (el) {
		          return this$1$1.toggleElement(el, !hasClass(el, this$1$1.clsOpen), function (el, show) {
		            toggleClass(el, this$1$1.clsOpen, show);
		            var content = $("" + (el._wrapper ? '> * ' : '') + this$1$1.content, el);
		            if (animate === false || !this$1$1.hasTransition) {
		              hide(content, !show);
		              return;
		            }
		            if (!el._wrapper) {
		              el._wrapper = wrapAll(content, "<div" + (show ? ' hidden' : '') + ">");
		            }
		            hide(content, false);
		            return toggleHeight(this$1$1)(el._wrapper, show).then(function () {
		              hide(content, !show);
		              delete el._wrapper;
		              unwrap(content);
		              if (show) {
		                var toggle = $(this$1$1.$props.toggle, el);
		                if (!isInView(toggle)) {
		                  scrollIntoView(toggle, {
		                    offset: this$1$1.offset
		                  });
		                }
		              }
		            });
		          });
		        });
		      }
		    }
		  };
		  function hide(el, hide) {
		    el && (el.hidden = hide);
		  }
		  var alert = {
		    mixins: [Class, Togglable],
		    args: 'animation',
		    props: {
		      close: String
		    },
		    data: {
		      animation: [true],
		      selClose: '.uk-alert-close',
		      duration: 150,
		      hideProps: assign({
		        opacity: 0
		      }, Togglable.data.hideProps)
		    },
		    events: [{
		      name: 'click',
		      delegate: function () {
		        return this.selClose;
		      },
		      handler: function (e) {
		        e.preventDefault();
		        this.close();
		      }
		    }],
		    methods: {
		      close: function () {
		        var this$1$1 = this;
		        this.toggleElement(this.$el).then(function () {
		          return this$1$1.$destroy(true);
		        });
		      }
		    }
		  };
		  var Video = {
		    args: 'autoplay',
		    props: {
		      automute: Boolean,
		      autoplay: Boolean
		    },
		    data: {
		      automute: false,
		      autoplay: true
		    },
		    computed: {
		      inView: function (ref) {
		        var autoplay = ref.autoplay;
		        return autoplay === 'inview';
		      }
		    },
		    connected: function () {
		      if (this.inView && !hasAttr(this.$el, 'preload')) {
		        this.$el.preload = 'none';
		      }
		      if (this.automute) {
		        mute(this.$el);
		      }
		    },
		    update: {
		      read: function () {
		        return {
		          visible: isVisible(this.$el) && css(this.$el, 'visibility') !== 'hidden',
		          inView: this.inView && isInView(this.$el)
		        };
		      },
		      write: function (ref) {
		        var visible = ref.visible;
		        var inView = ref.inView;
		        if (!visible || this.inView && !inView) {
		          pause(this.$el);
		        } else if (this.autoplay === true || this.inView && inView) {
		          play(this.$el);
		        }
		      },
		      events: ['resize', 'scroll']
		    }
		  };
		  var cover = {
		    mixins: [Class, Video],
		    props: {
		      width: Number,
		      height: Number
		    },
		    data: {
		      automute: true
		    },
		    update: {
		      read: function () {
		        var el = this.$el;
		        var ref = getPositionedParent(el) || el.parentNode;
		        var height = ref.offsetHeight;
		        var width = ref.offsetWidth;
		        var dim = Dimensions.cover({
		          width: this.width || el.naturalWidth || el.videoWidth || el.clientWidth,
		          height: this.height || el.naturalHeight || el.videoHeight || el.clientHeight
		        }, {
		          width: width + (width % 2 ? 1 : 0),
		          height: height + (height % 2 ? 1 : 0)
		        });
		        if (!dim.width || !dim.height) {
		          return false;
		        }
		        return dim;
		      },
		      write: function (ref) {
		        var height = ref.height;
		        var width = ref.width;
		        css(this.$el, {
		          height: height,
		          width: width
		        });
		      },
		      events: ['resize']
		    }
		  };
		  function getPositionedParent(el) {
		    while (el = parent(el)) {
		      if (css(el, 'position') !== 'static') {
		        return el;
		      }
		    }
		  }
		  var Position = {
		    props: {
		      pos: String,
		      offset: null,
		      flip: Boolean,
		      clsPos: String
		    },
		    data: {
		      pos: "bottom-" + (!isRtl ? 'left' : 'right'),
		      flip: true,
		      offset: false,
		      clsPos: ''
		    },
		    computed: {
		      pos: function (ref) {
		        var pos = ref.pos;
		        return (pos + (!includes(pos, '-') ? '-center' : '')).split('-');
		      },
		      dir: function () {
		        return this.pos[0];
		      },
		      align: function () {
		        return this.pos[1];
		      }
		    },
		    methods: {
		      positionAt: function (element, target, boundary) {
		        removeClasses(element, this.clsPos + "-(top|bottom|left|right)(-[a-z]+)?");
		        var node;
		        var ref = this;
		        var offset$1 = ref.offset;
		        var axis = this.getAxis();
		        if (!isNumeric(offset$1)) {
		          node = $(offset$1);
		          offset$1 = node ? offset(node)[axis === 'x' ? 'left' : 'top'] - offset(target)[axis === 'x' ? 'right' : 'bottom'] : 0;
		        }
		        var ref$1 = positionAt(element, target, axis === 'x' ? flipPosition(this.dir) + " " + this.align : this.align + " " + flipPosition(this.dir), axis === 'x' ? this.dir + " " + this.align : this.align + " " + this.dir, axis === 'x' ? "" + (this.dir === 'left' ? -offset$1 : offset$1) : " " + (this.dir === 'top' ? -offset$1 : offset$1), null, this.flip, boundary).target;
		        var x = ref$1.x;
		        var y = ref$1.y;
		        this.dir = axis === 'x' ? x : y;
		        this.align = axis === 'x' ? y : x;
		        toggleClass(element, this.clsPos + "-" + this.dir + "-" + this.align, this.offset === false);
		      },
		      getAxis: function () {
		        return this.dir === 'top' || this.dir === 'bottom' ? 'y' : 'x';
		      }
		    }
		  };
		  var active;
		  var drop = {
		    mixins: [Position, Togglable],
		    args: 'pos',
		    props: {
		      mode: 'list',
		      toggle: Boolean,
		      boundary: Boolean,
		      boundaryAlign: Boolean,
		      delayShow: Number,
		      delayHide: Number,
		      clsDrop: String
		    },
		    data: {
		      mode: ['click', 'hover'],
		      toggle: '- *',
		      boundary: inBrowser && window,
		      boundaryAlign: false,
		      delayShow: 0,
		      delayHide: 800,
		      clsDrop: false,
		      animation: ['uk-animation-fade'],
		      cls: 'uk-open'
		    },
		    computed: {
		      boundary: function (ref, $el) {
		        var boundary = ref.boundary;
		        return query(boundary, $el);
		      },
		      clsDrop: function (ref) {
		        var clsDrop = ref.clsDrop;
		        return clsDrop || "uk-" + this.$options.name;
		      },
		      clsPos: function () {
		        return this.clsDrop;
		      }
		    },
		    created: function () {
		      this.tracker = new MouseTracker();
		    },
		    connected: function () {
		      addClass(this.$el, this.clsDrop);
		      var ref = this.$props;
		      var toggle = ref.toggle;
		      this.toggle = toggle && this.$create('toggle', query(toggle, this.$el), {
		        target: this.$el,
		        mode: this.mode
		      });
		      !this.toggle && trigger(this.$el, 'updatearia');
		    },
		    disconnected: function () {
		      if (this.isActive()) {
		        active = null;
		      }
		    },
		    events: [{
		      name: 'click',
		      delegate: function () {
		        return "." + this.clsDrop + "-close";
		      },
		      handler: function (e) {
		        e.preventDefault();
		        this.hide(false);
		      }
		    }, {
		      name: 'click',
		      delegate: function () {
		        return 'a[href^="#"]';
		      },
		      handler: function (ref) {
		        var defaultPrevented = ref.defaultPrevented;
		        var hash = ref.current.hash;
		        if (!defaultPrevented && hash && !within(hash, this.$el)) {
		          this.hide(false);
		        }
		      }
		    }, {
		      name: 'beforescroll',
		      handler: function () {
		        this.hide(false);
		      }
		    }, {
		      name: 'toggle',
		      self: true,
		      handler: function (e, toggle) {
		        e.preventDefault();
		        if (this.isToggled()) {
		          this.hide(false);
		        } else {
		          this.show(toggle, false);
		        }
		      }
		    }, {
		      name: 'toggleshow',
		      self: true,
		      handler: function (e, toggle) {
		        e.preventDefault();
		        this.show(toggle);
		      }
		    }, {
		      name: 'togglehide',
		      self: true,
		      handler: function (e) {
		        e.preventDefault();
		        this.hide();
		      }
		    }, {
		      name: pointerEnter,
		      filter: function () {
		        return includes(this.mode, 'hover');
		      },
		      handler: function (e) {
		        if (!isTouch(e)) {
		          this.clearTimers();
		        }
		      }
		    }, {
		      name: pointerLeave,
		      filter: function () {
		        return includes(this.mode, 'hover');
		      },
		      handler: function (e) {
		        if (!isTouch(e) && e.relatedTarget) {
		          this.hide();
		        }
		      }
		    }, {
		      name: 'toggled',
		      self: true,
		      handler: function () {
		        if (!this.isToggled()) {
		          return;
		        }
		        this.clearTimers();
		        this.position();
		      }
		    }, {
		      name: 'show',
		      self: true,
		      handler: function () {
		        var this$1$1 = this;
		        active = this;
		        this.tracker.init();
		        trigger(this.$el, 'updatearia');
		        once(this.$el, 'hide', on(document, pointerDown, function (ref) {
		          var target = ref.target;
		          return !within(target, this$1$1.$el) && once(document, pointerUp + " " + pointerCancel + " scroll", function (ref) {
		            var defaultPrevented = ref.defaultPrevented;
		            var type = ref.type;
		            var newTarget = ref.target;
		            if (!defaultPrevented && type === pointerUp && target === newTarget && !(this$1$1.toggle && within(target, this$1$1.toggle.$el))) {
		              this$1$1.hide(false);
		            }
		          }, true);
		        }), {
		          self: true
		        });
		        once(this.$el, 'hide', on(document, 'keydown', function (e) {
		          if (e.keyCode === 27) {
		            e.preventDefault();
		            this$1$1.hide(false);
		          }
		        }), {
		          self: true
		        });
		      }
		    }, {
		      name: 'beforehide',
		      self: true,
		      handler: function () {
		        this.clearTimers();
		      }
		    }, {
		      name: 'hide',
		      handler: function (ref) {
		        var target = ref.target;
		        if (this.$el !== target) {
		          active = active === null && within(target, this.$el) && this.isToggled() ? this : active;
		          return;
		        }
		        active = this.isActive() ? null : active;
		        trigger(this.$el, 'updatearia');
		        this.tracker.cancel();
		      }
		    }, {
		      name: 'updatearia',
		      self: true,
		      handler: function (e, toggle) {
		        e.preventDefault();
		        this.updateAria(this.$el);
		        if (toggle || this.toggle) {
		          attr((toggle || this.toggle).$el, 'aria-expanded', this.isToggled());
		          toggleClass(this.toggle.$el, this.cls, this.isToggled());
		        }
		      }
		    }],
		    update: {
		      write: function () {
		        if (this.isToggled() && !Animation.inProgress(this.$el)) {
		          this.position();
		        }
		      },
		      events: ['resize']
		    },
		    methods: {
		      show: function (toggle, delay) {
		        var this$1$1 = this;
		        if (toggle === void 0) toggle = this.toggle;
		        if (delay === void 0) delay = true;
		        if (this.isToggled() && toggle && this.toggle && toggle.$el !== this.toggle.$el) {
		          this.hide(false);
		        }
		        this.toggle = toggle;
		        this.clearTimers();
		        if (this.isActive()) {
		          return;
		        }
		        if (active) {
		          if (delay && active.isDelaying) {
		            this.showTimer = setTimeout(this.show, 10);
		            return;
		          }
		          var prev;
		          while (active && prev !== active && !within(this.$el, active.$el)) {
		            prev = active;
		            active.hide(false);
		          }
		        }
		        this.showTimer = setTimeout(function () {
		          return !this$1$1.isToggled() && this$1$1.toggleElement(this$1$1.$el, true);
		        }, delay && this.delayShow || 0);
		      },
		      hide: function (delay) {
		        var this$1$1 = this;
		        if (delay === void 0) delay = true;
		        var hide = function () {
		          return this$1$1.toggleElement(this$1$1.$el, false, false);
		        };
		        this.clearTimers();
		        this.isDelaying = getPositionedElements(this.$el).some(function (el) {
		          return this$1$1.tracker.movesTo(el);
		        });
		        if (delay && this.isDelaying) {
		          this.hideTimer = setTimeout(this.hide, 50);
		        } else if (delay && this.delayHide) {
		          this.hideTimer = setTimeout(hide, this.delayHide);
		        } else {
		          hide();
		        }
		      },
		      clearTimers: function () {
		        clearTimeout(this.showTimer);
		        clearTimeout(this.hideTimer);
		        this.showTimer = null;
		        this.hideTimer = null;
		        this.isDelaying = false;
		      },
		      isActive: function () {
		        return active === this;
		      },
		      position: function () {
		        removeClass(this.$el, this.clsDrop + "-stack");
		        toggleClass(this.$el, this.clsDrop + "-boundary", this.boundaryAlign);
		        var boundary = offset(this.boundary);
		        var alignTo = this.boundaryAlign ? boundary : offset(this.toggle.$el);
		        if (this.align === 'justify') {
		          var prop = this.getAxis() === 'y' ? 'width' : 'height';
		          css(this.$el, prop, alignTo[prop]);
		        } else if (this.$el.offsetWidth > Math.max(boundary.right - alignTo.left, alignTo.right - boundary.left)) {
		          addClass(this.$el, this.clsDrop + "-stack");
		        }
		        this.positionAt(this.$el, this.boundaryAlign ? this.boundary : this.toggle.$el, this.boundary);
		      }
		    }
		  };
		  function getPositionedElements(el) {
		    var result = [];
		    apply(el, function (el) {
		      return css(el, 'position') !== 'static' && result.push(el);
		    });
		    return result;
		  }
		  var formCustom = {
		    mixins: [Class],
		    args: 'target',
		    props: {
		      target: Boolean
		    },
		    data: {
		      target: false
		    },
		    computed: {
		      input: function (_, $el) {
		        return $(selInput, $el);
		      },
		      state: function () {
		        return this.input.nextElementSibling;
		      },
		      target: function (ref, $el) {
		        var target = ref.target;
		        return target && (target === true && this.input.parentNode === $el && this.input.nextElementSibling || query(target, $el));
		      }
		    },
		    update: function () {
		      var ref = this;
		      var target = ref.target;
		      var input = ref.input;
		      if (!target) {
		        return;
		      }
		      var option;
		      var prop = isInput(target) ? 'value' : 'textContent';
		      var prev = target[prop];
		      var value = input.files && input.files[0] ? input.files[0].name : matches(input, 'select') && (option = $$('option', input).filter(function (el) {
		        return el.selected;
		      })[0]) // eslint-disable-line prefer-destructuring
		      ? option.textContent : input.value;
		      if (prev !== value) {
		        target[prop] = value;
		      }
		    },
		    events: [{
		      name: 'change',
		      handler: function () {
		        this.$update();
		      }
		    }, {
		      name: 'reset',
		      el: function () {
		        return closest(this.$el, 'form');
		      },
		      handler: function () {
		        this.$update();
		      }
		    }]
		  };

		  // Deprecated
		  var gif = {
		    update: {
		      read: function (data) {
		        var inview = isInView(this.$el);
		        if (!inview || data.isInView === inview) {
		          return false;
		        }
		        data.isInView = inview;
		      },
		      write: function () {
		        this.$el.src = '' + this.$el.src; // force self-assign
		      },

		      events: ['scroll', 'resize']
		    }
		  };
		  var Margin = {
		    props: {
		      margin: String,
		      firstColumn: Boolean
		    },
		    data: {
		      margin: 'uk-margin-small-top',
		      firstColumn: 'uk-first-column'
		    },
		    update: {
		      read: function () {
		        var rows = getRows(this.$el.children);
		        return {
		          rows: rows,
		          columns: getColumns(rows)
		        };
		      },
		      write: function (ref) {
		        var this$1$1 = this;
		        var columns = ref.columns;
		        var rows = ref.rows;
		        rows.forEach(function (row, i) {
		          return row.forEach(function (el) {
		            toggleClass(el, this$1$1.margin, i !== 0);
		            toggleClass(el, this$1$1.firstColumn, includes(columns[0], el));
		          });
		        });
		      },
		      events: ['resize']
		    }
		  };
		  function getRows(items) {
		    return sortBy$1(items, 'top', 'bottom');
		  }
		  function getColumns(rows) {
		    var columns = [[]];
		    rows.forEach(function (row) {
		      return sortBy$1(row, 'left', 'right').forEach(function (column, i) {
		        return columns[i] = !columns[i] ? column : columns[i].concat(column);
		      });
		    });
		    return isRtl ? columns.reverse() : columns;
		  }
		  function sortBy$1(items, startProp, endProp) {
		    var sorted = [[]];
		    for (var i = 0; i < items.length; i++) {
		      var el = items[i];
		      if (!isVisible(el)) {
		        continue;
		      }
		      var dim = getOffset(el);
		      for (var j = sorted.length - 1; j >= 0; j--) {
		        var current = sorted[j];
		        if (!current[0]) {
		          current.push(el);
		          break;
		        }
		        var startDim = void 0;
		        if (current[0].offsetParent === el.offsetParent) {
		          startDim = getOffset(current[0]);
		        } else {
		          dim = getOffset(el, true);
		          startDim = getOffset(current[0], true);
		        }
		        if (dim[startProp] >= startDim[endProp] - 1 && dim[startProp] !== startDim[startProp]) {
		          sorted.push([el]);
		          break;
		        }
		        if (dim[endProp] - 1 > startDim[startProp] || dim[startProp] === startDim[startProp]) {
		          current.push(el);
		          break;
		        }
		        if (j === 0) {
		          sorted.unshift([el]);
		          break;
		        }
		      }
		    }
		    return sorted;
		  }
		  function getOffset(element, offset) {
		    var assign;
		    if (offset === void 0) offset = false;
		    var offsetTop = element.offsetTop;
		    var offsetLeft = element.offsetLeft;
		    var offsetHeight = element.offsetHeight;
		    var offsetWidth = element.offsetWidth;
		    if (offset) {
		      assign = offsetPosition(element), offsetTop = assign[0], offsetLeft = assign[1];
		    }
		    return {
		      top: offsetTop,
		      left: offsetLeft,
		      bottom: offsetTop + offsetHeight,
		      right: offsetLeft + offsetWidth
		    };
		  }
		  var grid = {
		    extends: Margin,
		    mixins: [Class],
		    name: 'grid',
		    props: {
		      masonry: Boolean,
		      parallax: Number
		    },
		    data: {
		      margin: 'uk-grid-margin',
		      clsStack: 'uk-grid-stack',
		      masonry: false,
		      parallax: 0
		    },
		    connected: function () {
		      this.masonry && addClass(this.$el, 'uk-flex-top uk-flex-wrap-top');
		    },
		    update: [{
		      write: function (ref) {
		        var columns = ref.columns;
		        toggleClass(this.$el, this.clsStack, columns.length < 2);
		      },
		      events: ['resize']
		    }, {
		      read: function (ref) {
		        var columns = ref.columns;
		        var rows = ref.rows;
		        var nodes = children(this.$el);
		        if (!nodes.length || !this.masonry && !this.parallax) {
		          return false;
		        }
		        var transitionInProgress = nodes.some(Transition.inProgress);
		        var translates = false;
		        var columnHeights = getColumnHeights(columns);
		        var margin = getMarginTop(nodes, this.margin) * (rows.length - 1);
		        var elHeight = Math.max.apply(Math, columnHeights) + margin;
		        if (this.masonry) {
		          columns = columns.map(function (column) {
		            return sortBy(column, 'offsetTop');
		          });
		          translates = getTranslates(rows, columns);
		        }
		        var padding = Math.abs(this.parallax);
		        if (padding) {
		          padding = columnHeights.reduce(function (newPadding, hgt, i) {
		            return Math.max(newPadding, hgt + margin + (i % 2 ? padding : padding / 8) - elHeight);
		          }, 0);
		        }
		        return {
		          padding: padding,
		          columns: columns,
		          translates: translates,
		          height: transitionInProgress ? false : this.masonry ? elHeight : ''
		        };
		      },
		      write: function (ref) {
		        var height = ref.height;
		        var padding = ref.padding;
		        css(this.$el, 'paddingBottom', padding || '');
		        height !== false && css(this.$el, 'height', height);
		      },
		      events: ['resize']
		    }, {
		      read: function (ref) {
		        var height$1 = ref.height;
		        return {
		          scrolled: this.parallax ? scrolledOver(this.$el, height$1 ? height$1 - height(this.$el) : 0) * Math.abs(this.parallax) : false
		        };
		      },
		      write: function (ref) {
		        var columns = ref.columns;
		        var scrolled = ref.scrolled;
		        var translates = ref.translates;
		        if (scrolled === false && !translates) {
		          return;
		        }
		        columns.forEach(function (column, i) {
		          return column.forEach(function (el, j) {
		            return css(el, 'transform', !scrolled && !translates ? '' : "translateY(" + ((translates && -translates[i][j]) + (scrolled ? i % 2 ? scrolled : scrolled / 8 : 0)) + "px)");
		          });
		        });
		      },
		      events: ['scroll', 'resize']
		    }]
		  };
		  function getTranslates(rows, columns) {
		    var rowHeights = rows.map(function (row) {
		      return Math.max.apply(Math, row.map(function (el) {
		        return el.offsetHeight;
		      }));
		    });
		    return columns.map(function (elements) {
		      var prev = 0;
		      return elements.map(function (element, row) {
		        return prev += row ? rowHeights[row - 1] - elements[row - 1].offsetHeight : 0;
		      });
		    });
		  }
		  function getMarginTop(nodes, cls) {
		    var ref = nodes.filter(function (el) {
		      return hasClass(el, cls);
		    });
		    var node = ref[0];
		    return toFloat(node ? css(node, 'marginTop') : css(nodes[0], 'paddingLeft'));
		  }
		  function getColumnHeights(columns) {
		    return columns.map(function (column) {
		      return column.reduce(function (sum, el) {
		        return sum + el.offsetHeight;
		      }, 0);
		    });
		  }

		  // IE 11 fix (min-height on a flex container won't apply to its flex items)
		  var FlexBug = isIE ? {
		    props: {
		      selMinHeight: String
		    },
		    data: {
		      selMinHeight: false,
		      forceHeight: false
		    },
		    computed: {
		      elements: function (ref, $el) {
		        var selMinHeight = ref.selMinHeight;
		        return selMinHeight ? $$(selMinHeight, $el) : [$el];
		      }
		    },
		    update: [{
		      read: function () {
		        css(this.elements, 'height', '');
		      },
		      order: -5,
		      events: ['resize']
		    }, {
		      write: function () {
		        var this$1$1 = this;
		        this.elements.forEach(function (el) {
		          var height = toFloat(css(el, 'minHeight'));
		          if (height && (this$1$1.forceHeight || Math.round(height + boxModelAdjust(el, 'height', 'content-box')) >= el.offsetHeight)) {
		            css(el, 'height', height);
		          }
		        });
		      },
		      order: 5,
		      events: ['resize']
		    }]
		  } : {};
		  var heightMatch = {
		    mixins: [FlexBug],
		    args: 'target',
		    props: {
		      target: String,
		      row: Boolean
		    },
		    data: {
		      target: '> *',
		      row: true,
		      forceHeight: true
		    },
		    computed: {
		      elements: function (ref, $el) {
		        var target = ref.target;
		        return $$(target, $el);
		      }
		    },
		    update: {
		      read: function () {
		        return {
		          rows: (this.row ? getRows(this.elements) : [this.elements]).map(match)
		        };
		      },
		      write: function (ref) {
		        var rows = ref.rows;
		        rows.forEach(function (ref) {
		          var heights = ref.heights;
		          var elements = ref.elements;
		          return elements.forEach(function (el, i) {
		            return css(el, 'minHeight', heights[i]);
		          });
		        });
		      },
		      events: ['resize']
		    }
		  };
		  function match(elements) {
		    var assign;
		    if (elements.length < 2) {
		      return {
		        heights: [''],
		        elements: elements
		      };
		    }
		    var ref = getHeights(elements);
		    var heights = ref.heights;
		    var max = ref.max;
		    var hasMinHeight = elements.some(function (el) {
		      return el.style.minHeight;
		    });
		    var hasShrunk = elements.some(function (el, i) {
		      return !el.style.minHeight && heights[i] < max;
		    });
		    if (hasMinHeight && hasShrunk) {
		      css(elements, 'minHeight', '');
		      assign = getHeights(elements), heights = assign.heights, max = assign.max;
		    }
		    heights = elements.map(function (el, i) {
		      return heights[i] === max && toFloat(el.style.minHeight).toFixed(2) !== max.toFixed(2) ? '' : max;
		    });
		    return {
		      heights: heights,
		      elements: elements
		    };
		  }
		  function getHeights(elements) {
		    var heights = elements.map(function (el) {
		      return offset(el).height - boxModelAdjust(el, 'height', 'content-box');
		    });
		    var max = Math.max.apply(null, heights);
		    return {
		      heights: heights,
		      max: max
		    };
		  }
		  var heightViewport = {
		    mixins: [FlexBug],
		    props: {
		      expand: Boolean,
		      offsetTop: Boolean,
		      offsetBottom: Boolean,
		      minHeight: Number
		    },
		    data: {
		      expand: false,
		      offsetTop: false,
		      offsetBottom: false,
		      minHeight: 0
		    },
		    update: {
		      read: function (ref) {
		        var prev = ref.minHeight;
		        if (!isVisible(this.$el)) {
		          return false;
		        }
		        var minHeight = '';
		        var box = boxModelAdjust(this.$el, 'height', 'content-box');
		        if (this.expand) {
		          this.$el.dataset.heightExpand = '';
		          if ($('[data-height-expand]') !== this.$el) {
		            return false;
		          }
		          minHeight = height(window) - (offsetHeight(document.documentElement) - offsetHeight(this.$el)) - box || '';
		        } else {
		          // on mobile devices (iOS and Android) window.innerHeight !== 100vh
		          minHeight = 'calc(100vh';
		          if (this.offsetTop) {
		            var ref$1 = offset(this.$el);
		            var top = ref$1.top;
		            minHeight += top > 0 && top < height(window) / 2 ? " - " + top + "px" : '';
		          }
		          if (this.offsetBottom === true) {
		            minHeight += " - " + offsetHeight(this.$el.nextElementSibling) + "px";
		          } else if (isNumeric(this.offsetBottom)) {
		            minHeight += " - " + this.offsetBottom + "vh";
		          } else if (this.offsetBottom && endsWith(this.offsetBottom, 'px')) {
		            minHeight += " - " + toFloat(this.offsetBottom) + "px";
		          } else if (isString(this.offsetBottom)) {
		            minHeight += " - " + offsetHeight(query(this.offsetBottom, this.$el)) + "px";
		          }
		          minHeight += (box ? " - " + box + "px" : '') + ")";
		        }
		        return {
		          minHeight: minHeight,
		          prev: prev
		        };
		      },
		      write: function (ref) {
		        var minHeight = ref.minHeight;
		        var prev = ref.prev;
		        css(this.$el, {
		          minHeight: minHeight
		        });
		        if (minHeight !== prev) {
		          this.$update(this.$el, 'resize');
		        }
		        if (this.minHeight && toFloat(css(this.$el, 'minHeight')) < this.minHeight) {
		          css(this.$el, 'minHeight', this.minHeight);
		        }
		      },
		      events: ['resize']
		    }
		  };
		  function offsetHeight(el) {
		    return el && offset(el).height || 0;
		  }
		  var SVG = {
		    args: 'src',
		    props: {
		      id: Boolean,
		      icon: String,
		      src: String,
		      style: String,
		      width: Number,
		      height: Number,
		      ratio: Number,
		      class: String,
		      strokeAnimation: Boolean,
		      focusable: Boolean,
		      // IE 11
		      attributes: 'list'
		    },
		    data: {
		      ratio: 1,
		      include: ['style', 'class', 'focusable'],
		      class: '',
		      strokeAnimation: false
		    },
		    beforeConnect: function () {
		      this.class += ' uk-svg';
		    },
		    connected: function () {
		      var this$1$1 = this;
		      var assign;
		      if (!this.icon && includes(this.src, '#')) {
		        assign = this.src.split('#'), this.src = assign[0], this.icon = assign[1];
		      }
		      this.svg = this.getSvg().then(function (el) {
		        this$1$1.applyAttributes(el);
		        return this$1$1.svgEl = insertSVG(el, this$1$1.$el);
		      }, noop);
		    },
		    disconnected: function () {
		      var this$1$1 = this;
		      if (isVoidElement(this.$el)) {
		        this.$el.hidden = false;
		      }
		      if (this.svg) {
		        this.svg.then(function (svg) {
		          return (!this$1$1._connected || svg !== this$1$1.svgEl) && remove(svg);
		        }, noop);
		      }
		      this.svg = this.svgEl = null;
		    },
		    update: {
		      read: function () {
		        return !!(this.strokeAnimation && this.svgEl && isVisible(this.svgEl));
		      },
		      write: function () {
		        applyAnimation(this.svgEl);
		      },
		      type: ['resize']
		    },
		    methods: {
		      getSvg: function () {
		        var this$1$1 = this;
		        return loadSVG(this.src).then(function (svg) {
		          return parseSVG(svg, this$1$1.icon) || Promise.reject('SVG not found.');
		        });
		      },
		      applyAttributes: function (el) {
		        var this$1$1 = this;
		        for (var prop in this.$options.props) {
		          if (this[prop] && includes(this.include, prop)) {
		            attr(el, prop, this[prop]);
		          }
		        }
		        for (var attribute in this.attributes) {
		          var ref = this.attributes[attribute].split(':', 2);
		          var prop$1 = ref[0];
		          var value = ref[1];
		          attr(el, prop$1, value);
		        }
		        if (!this.id) {
		          removeAttr(el, 'id');
		        }
		        var props = ['width', 'height'];
		        var dimensions = [this.width, this.height];
		        if (!dimensions.some(function (val) {
		          return val;
		        })) {
		          dimensions = props.map(function (prop) {
		            return attr(el, prop);
		          });
		        }
		        var viewBox = attr(el, 'viewBox');
		        if (viewBox && !dimensions.some(function (val) {
		          return val;
		        })) {
		          dimensions = viewBox.split(' ').slice(2);
		        }
		        dimensions.forEach(function (val, i) {
		          val = (val | 0) * this$1$1.ratio;
		          val && attr(el, props[i], val);
		          if (val && !dimensions[i ^ 1]) {
		            removeAttr(el, props[i ^ 1]);
		          }
		        });
		        attr(el, 'data-svg', this.icon || this.src);
		      }
		    }
		  };
		  var svgs = {};
		  function loadSVG(src) {
		    if (svgs[src]) {
		      return svgs[src];
		    }
		    return svgs[src] = new Promise(function (resolve, reject) {
		      if (!src) {
		        reject();
		        return;
		      }
		      if (startsWith(src, 'data:')) {
		        resolve(decodeURIComponent(src.split(',')[1]));
		      } else {
		        ajax(src).then(function (xhr) {
		          return resolve(xhr.response);
		        }, function () {
		          return reject('SVG not found.');
		        });
		      }
		    });
		  }
		  function parseSVG(svg, icon) {
		    if (icon && includes(svg, '<symbol')) {
		      svg = parseSymbols(svg, icon) || svg;
		    }
		    svg = $(svg.substr(svg.indexOf('<svg')));
		    return svg && svg.hasChildNodes() && svg;
		  }
		  var symbolRe = /<symbol([^]*?id=(['"])(.+?)\2[^]*?<\/)symbol>/g;
		  var symbols = {};
		  function parseSymbols(svg, icon) {
		    if (!symbols[svg]) {
		      symbols[svg] = {};
		      symbolRe.lastIndex = 0;
		      var match;
		      while (match = symbolRe.exec(svg)) {
		        symbols[svg][match[3]] = "<svg xmlns=\"http://www.w3.org/2000/svg\"" + match[1] + "svg>";
		      }
		    }
		    return symbols[svg][icon];
		  }
		  function applyAnimation(el) {
		    var length = getMaxPathLength(el);
		    if (length) {
		      el.style.setProperty('--uk-animation-stroke', length);
		    }
		  }
		  function getMaxPathLength(el) {
		    return Math.ceil(Math.max.apply(Math, [0].concat($$('[stroke]', el).map(function (stroke) {
		      try {
		        return stroke.getTotalLength();
		      } catch (e) {
		        return 0;
		      }
		    }))));
		  }
		  function insertSVG(el, root) {
		    if (isVoidElement(root) || root.tagName === 'CANVAS') {
		      root.hidden = true;
		      var next = root.nextElementSibling;
		      return equals(el, next) ? next : after(root, el);
		    }
		    var last = root.lastElementChild;
		    return equals(el, last) ? last : append(root, el);
		  }
		  function equals(el, other) {
		    return attr(el, 'data-svg') === attr(other, 'data-svg');
		  }
		  var closeIcon = "<svg width=\"14\" height=\"14\" viewBox=\"0 0 14 14\" xmlns=\"http://www.w3.org/2000/svg\"><line fill=\"none\" stroke=\"#000\" stroke-width=\"1.1\" x1=\"1\" y1=\"1\" x2=\"13\" y2=\"13\"/><line fill=\"none\" stroke=\"#000\" stroke-width=\"1.1\" x1=\"13\" y1=\"1\" x2=\"1\" y2=\"13\"/></svg>";
		  var closeLarge = "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><line fill=\"none\" stroke=\"#000\" stroke-width=\"1.4\" x1=\"1\" y1=\"1\" x2=\"19\" y2=\"19\"/><line fill=\"none\" stroke=\"#000\" stroke-width=\"1.4\" x1=\"19\" y1=\"1\" x2=\"1\" y2=\"19\"/></svg>";
		  var marker = "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"9\" y=\"4\" width=\"1\" height=\"11\"/><rect x=\"4\" y=\"9\" width=\"11\" height=\"1\"/></svg>";
		  var navbarToggleIcon = "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><rect y=\"9\" width=\"20\" height=\"2\"/><rect y=\"3\" width=\"20\" height=\"2\"/><rect y=\"15\" width=\"20\" height=\"2\"/></svg>";
		  var overlayIcon = "<svg width=\"40\" height=\"40\" viewBox=\"0 0 40 40\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"19\" y=\"0\" width=\"1\" height=\"40\"/><rect x=\"0\" y=\"19\" width=\"40\" height=\"1\"/></svg>";
		  var paginationNext = "<svg width=\"7\" height=\"12\" viewBox=\"0 0 7 12\" xmlns=\"http://www.w3.org/2000/svg\"><polyline fill=\"none\" stroke=\"#000\" stroke-width=\"1.2\" points=\"1 1 6 6 1 11\"/></svg>";
		  var paginationPrevious = "<svg width=\"7\" height=\"12\" viewBox=\"0 0 7 12\" xmlns=\"http://www.w3.org/2000/svg\"><polyline fill=\"none\" stroke=\"#000\" stroke-width=\"1.2\" points=\"6 1 1 6 6 11\"/></svg>";
		  var searchIcon = "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><circle fill=\"none\" stroke=\"#000\" stroke-width=\"1.1\" cx=\"9\" cy=\"9\" r=\"7\"/><path fill=\"none\" stroke=\"#000\" stroke-width=\"1.1\" d=\"M14,14 L18,18 L14,14 Z\"/></svg>";
		  var searchLarge = "<svg width=\"40\" height=\"40\" viewBox=\"0 0 40 40\" xmlns=\"http://www.w3.org/2000/svg\"><circle fill=\"none\" stroke=\"#000\" stroke-width=\"1.8\" cx=\"17.5\" cy=\"17.5\" r=\"16.5\"/><line fill=\"none\" stroke=\"#000\" stroke-width=\"1.8\" x1=\"38\" y1=\"39\" x2=\"29\" y2=\"30\"/></svg>";
		  var searchNavbar = "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><circle fill=\"none\" stroke=\"#000\" stroke-width=\"1.1\" cx=\"10.5\" cy=\"10.5\" r=\"9.5\"/><line fill=\"none\" stroke=\"#000\" stroke-width=\"1.1\" x1=\"23\" y1=\"23\" x2=\"17\" y2=\"17\"/></svg>";
		  var slidenavNext = "<svg width=\"14px\" height=\"24px\" viewBox=\"0 0 14 24\" xmlns=\"http://www.w3.org/2000/svg\"><polyline fill=\"none\" stroke=\"#000\" stroke-width=\"1.4\" points=\"1.225,23 12.775,12 1.225,1 \"/></svg>";
		  var slidenavNextLarge = "<svg width=\"25px\" height=\"40px\" viewBox=\"0 0 25 40\" xmlns=\"http://www.w3.org/2000/svg\"><polyline fill=\"none\" stroke=\"#000\" stroke-width=\"2\" points=\"4.002,38.547 22.527,20.024 4,1.5 \"/></svg>";
		  var slidenavPrevious = "<svg width=\"14px\" height=\"24px\" viewBox=\"0 0 14 24\" xmlns=\"http://www.w3.org/2000/svg\"><polyline fill=\"none\" stroke=\"#000\" stroke-width=\"1.4\" points=\"12.775,1 1.225,12 12.775,23 \"/></svg>";
		  var slidenavPreviousLarge = "<svg width=\"25px\" height=\"40px\" viewBox=\"0 0 25 40\" xmlns=\"http://www.w3.org/2000/svg\"><polyline fill=\"none\" stroke=\"#000\" stroke-width=\"2\" points=\"20.527,1.5 2,20.024 20.525,38.547 \"/></svg>";
		  var spinner = "<svg width=\"30\" height=\"30\" viewBox=\"0 0 30 30\" xmlns=\"http://www.w3.org/2000/svg\"><circle fill=\"none\" stroke=\"#000\" cx=\"15\" cy=\"15\" r=\"14\"/></svg>";
		  var totop = "<svg width=\"18\" height=\"10\" viewBox=\"0 0 18 10\" xmlns=\"http://www.w3.org/2000/svg\"><polyline fill=\"none\" stroke=\"#000\" stroke-width=\"1.2\" points=\"1 9 9 1 17 9 \"/></svg>";
		  var icons = {
		    spinner: spinner,
		    totop: totop,
		    marker: marker,
		    'close-icon': closeIcon,
		    'close-large': closeLarge,
		    'navbar-toggle-icon': navbarToggleIcon,
		    'overlay-icon': overlayIcon,
		    'pagination-next': paginationNext,
		    'pagination-previous': paginationPrevious,
		    'search-icon': searchIcon,
		    'search-large': searchLarge,
		    'search-navbar': searchNavbar,
		    'slidenav-next': slidenavNext,
		    'slidenav-next-large': slidenavNextLarge,
		    'slidenav-previous': slidenavPrevious,
		    'slidenav-previous-large': slidenavPreviousLarge
		  };
		  var Icon = {
		    install: install,
		    extends: SVG,
		    args: 'icon',
		    props: ['icon'],
		    data: {
		      include: ['focusable']
		    },
		    isIcon: true,
		    beforeConnect: function () {
		      addClass(this.$el, 'uk-icon');
		    },
		    methods: {
		      getSvg: function () {
		        var icon = getIcon(this.icon);
		        if (!icon) {
		          return Promise.reject('Icon not found.');
		        }
		        return Promise.resolve(icon);
		      }
		    }
		  };
		  var IconComponent = {
		    args: false,
		    extends: Icon,
		    data: function (vm) {
		      return {
		        icon: hyphenate(vm.constructor.options.name)
		      };
		    },
		    beforeConnect: function () {
		      addClass(this.$el, this.$name);
		    }
		  };
		  var Slidenav = {
		    extends: IconComponent,
		    beforeConnect: function () {
		      addClass(this.$el, 'uk-slidenav');
		    },
		    computed: {
		      icon: function (ref, $el) {
		        var icon = ref.icon;
		        return hasClass($el, 'uk-slidenav-large') ? icon + "-large" : icon;
		      }
		    }
		  };
		  var Search = {
		    extends: IconComponent,
		    computed: {
		      icon: function (ref, $el) {
		        var icon = ref.icon;
		        return hasClass($el, 'uk-search-icon') && parents($el, '.uk-search-large').length ? 'search-large' : parents($el, '.uk-search-navbar').length ? 'search-navbar' : icon;
		      }
		    }
		  };
		  var Close = {
		    extends: IconComponent,
		    computed: {
		      icon: function () {
		        return "close-" + (hasClass(this.$el, 'uk-close-large') ? 'large' : 'icon');
		      }
		    }
		  };
		  var Spinner = {
		    extends: IconComponent,
		    connected: function () {
		      var this$1$1 = this;
		      this.svg.then(function (svg) {
		        return this$1$1.ratio !== 1 && css($('circle', svg), 'strokeWidth', 1 / this$1$1.ratio);
		      }, noop);
		    }
		  };
		  var parsed = {};
		  function install(UIkit) {
		    UIkit.icon.add = function (name, svg) {
		      var obj;
		      var added = isString(name) ? (obj = {}, obj[name] = svg, obj) : name;
		      each(added, function (svg, name) {
		        icons[name] = svg;
		        delete parsed[name];
		      });
		      if (UIkit._initialized) {
		        apply(document.body, function (el) {
		          return each(UIkit.getComponents(el), function (cmp) {
		            cmp.$options.isIcon && cmp.icon in added && cmp.$reset();
		          });
		        });
		      }
		    };
		  }
		  function getIcon(icon) {
		    if (!icons[icon]) {
		      return null;
		    }
		    if (!parsed[icon]) {
		      parsed[icon] = $((icons[applyRtl(icon)] || icons[icon]).trim());
		    }
		    return parsed[icon].cloneNode(true);
		  }
		  function applyRtl(icon) {
		    return isRtl ? swap(swap(icon, 'left', 'right'), 'previous', 'next') : icon;
		  }
		  var img = {
		    args: 'dataSrc',
		    props: {
		      dataSrc: String,
		      dataSrcset: Boolean,
		      sizes: String,
		      width: Number,
		      height: Number,
		      offsetTop: String,
		      offsetLeft: String,
		      target: String
		    },
		    data: {
		      dataSrc: '',
		      dataSrcset: false,
		      sizes: false,
		      width: false,
		      height: false,
		      offsetTop: '50vh',
		      offsetLeft: 0,
		      target: false
		    },
		    computed: {
		      cacheKey: function (ref) {
		        var dataSrc = ref.dataSrc;
		        return this.$name + "." + dataSrc;
		      },
		      width: function (ref) {
		        var width = ref.width;
		        var dataWidth = ref.dataWidth;
		        return width || dataWidth;
		      },
		      height: function (ref) {
		        var height = ref.height;
		        var dataHeight = ref.dataHeight;
		        return height || dataHeight;
		      },
		      sizes: function (ref) {
		        var sizes = ref.sizes;
		        var dataSizes = ref.dataSizes;
		        return sizes || dataSizes;
		      },
		      isImg: function (_, $el) {
		        return isImg($el);
		      },
		      target: {
		        get: function (ref) {
		          var target = ref.target;
		          return [this.$el].concat(queryAll(target, this.$el));
		        },
		        watch: function () {
		          this.observe();
		        }
		      },
		      offsetTop: function (ref) {
		        var offsetTop = ref.offsetTop;
		        return toPx(offsetTop, 'height');
		      },
		      offsetLeft: function (ref) {
		        var offsetLeft = ref.offsetLeft;
		        return toPx(offsetLeft, 'width');
		      }
		    },
		    connected: function () {
		      if (storage[this.cacheKey]) {
		        setSrcAttrs(this.$el, storage[this.cacheKey], this.dataSrcset, this.sizes);
		      } else if (this.isImg && this.width && this.height) {
		        setSrcAttrs(this.$el, getPlaceholderImage(this.width, this.height, this.sizes));
		      }
		      this.observer = new IntersectionObserver(this.load, {
		        rootMargin: this.offsetTop + "px " + this.offsetLeft + "px"
		      });
		      requestAnimationFrame(this.observe);
		    },
		    disconnected: function () {
		      this.observer.disconnect();
		    },
		    update: {
		      read: function (ref) {
		        var this$1$1 = this;
		        var image = ref.image;
		        if (!image && document.readyState === 'complete') {
		          this.load(this.observer.takeRecords());
		        }
		        if (this.isImg) {
		          return false;
		        }
		        image && image.then(function (img) {
		          return img && img.currentSrc !== '' && setSrcAttrs(this$1$1.$el, currentSrc(img));
		        });
		      },
		      write: function (data) {
		        if (this.dataSrcset && window.devicePixelRatio !== 1) {
		          var bgSize = css(this.$el, 'backgroundSize');
		          if (bgSize.match(/^(auto\s?)+$/) || toFloat(bgSize) === data.bgSize) {
		            data.bgSize = getSourceSize(this.dataSrcset, this.sizes);
		            css(this.$el, 'backgroundSize', data.bgSize + "px");
		          }
		        }
		      },
		      events: ['resize']
		    },
		    methods: {
		      load: function (entries) {
		        var this$1$1 = this;

		        // Old chromium based browsers (UC Browser) did not implement `isIntersecting`
		        if (!entries.some(function (entry) {
		          return isUndefined(entry.isIntersecting) || entry.isIntersecting;
		        })) {
		          return;
		        }
		        this._data.image = getImage(this.dataSrc, this.dataSrcset, this.sizes).then(function (img) {
		          setSrcAttrs(this$1$1.$el, currentSrc(img), img.srcset, img.sizes);
		          storage[this$1$1.cacheKey] = currentSrc(img);
		          return img;
		        }, function (e) {
		          return trigger(this$1$1.$el, new e.constructor(e.type, e));
		        });
		        this.observer.disconnect();
		      },
		      observe: function () {
		        var this$1$1 = this;
		        if (this._connected && !this._data.image) {
		          this.target.forEach(function (el) {
		            return this$1$1.observer.observe(el);
		          });
		        }
		      }
		    }
		  };
		  function setSrcAttrs(el, src, srcset, sizes) {
		    if (isImg(el)) {
		      sizes && (el.sizes = sizes);
		      srcset && (el.srcset = srcset);
		      src && (el.src = src);
		    } else if (src) {
		      var change = !includes(el.style.backgroundImage, src);
		      if (change) {
		        css(el, 'backgroundImage', "url(" + escape(src) + ")");
		        trigger(el, createEvent('load', false));
		      }
		    }
		  }
		  function getPlaceholderImage(width, height, sizes) {
		    var assign;
		    if (sizes) {
		      assign = Dimensions.ratio({
		        width: width,
		        height: height
		      }, 'width', toPx(sizesToPixel(sizes))), width = assign.width, height = assign.height;
		    }
		    return "data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"" + width + "\" height=\"" + height + "\"></svg>";
		  }
		  var sizesRe = /\s*(.*?)\s*(\w+|calc\(.*?\))\s*(?:,|$)/g;
		  function sizesToPixel(sizes) {
		    var matches;
		    sizesRe.lastIndex = 0;
		    while (matches = sizesRe.exec(sizes)) {
		      if (!matches[1] || window.matchMedia(matches[1]).matches) {
		        matches = evaluateSize(matches[2]);
		        break;
		      }
		    }
		    return matches || '100vw';
		  }
		  var sizeRe = /\d+(?:\w+|%)/g;
		  var additionRe = /[+-]?(\d+)/g;
		  function evaluateSize(size) {
		    return startsWith(size, 'calc') ? size.substring(5, size.length - 1).replace(sizeRe, function (size) {
		      return toPx(size);
		    }).replace(/ /g, '').match(additionRe).reduce(function (a, b) {
		      return a + +b;
		    }, 0) : size;
		  }
		  var srcSetRe = /\s+\d+w\s*(?:,|$)/g;
		  function getSourceSize(srcset, sizes) {
		    var srcSize = toPx(sizesToPixel(sizes));
		    var descriptors = (srcset.match(srcSetRe) || []).map(toFloat).sort(function (a, b) {
		      return a - b;
		    });
		    return descriptors.filter(function (size) {
		      return size >= srcSize;
		    })[0] || descriptors.pop() || '';
		  }
		  function isImg(el) {
		    return el.tagName === 'IMG';
		  }
		  function currentSrc(el) {
		    return el.currentSrc || el.src;
		  }
		  var key = '__test__';
		  var storage;

		  // workaround for Safari's private browsing mode and accessing sessionStorage in Blink
		  try {
		    storage = window.sessionStorage || {};
		    storage[key] = 1;
		    delete storage[key];
		  } catch (e) {
		    storage = {};
		  }
		  var Media = {
		    props: {
		      media: Boolean
		    },
		    data: {
		      media: false
		    },
		    computed: {
		      matchMedia: function () {
		        var media = toMedia(this.media);
		        return !media || window.matchMedia(media).matches;
		      }
		    }
		  };
		  function toMedia(value) {
		    if (isString(value)) {
		      if (value[0] === '@') {
		        var name = "breakpoint-" + value.substr(1);
		        value = toFloat(getCssVar(name));
		      } else if (isNaN(value)) {
		        return value;
		      }
		    }
		    return value && !isNaN(value) ? "(min-width: " + value + "px)" : false;
		  }
		  var leader = {
		    mixins: [Class, Media],
		    props: {
		      fill: String
		    },
		    data: {
		      fill: '',
		      clsWrapper: 'uk-leader-fill',
		      clsHide: 'uk-leader-hide',
		      attrFill: 'data-fill'
		    },
		    computed: {
		      fill: function (ref) {
		        var fill = ref.fill;
		        return fill || getCssVar('leader-fill-content');
		      }
		    },
		    connected: function () {
		      var assign;
		      assign = wrapInner(this.$el, "<span class=\"" + this.clsWrapper + "\">"), this.wrapper = assign[0];
		    },
		    disconnected: function () {
		      unwrap(this.wrapper.childNodes);
		    },
		    update: {
		      read: function (ref) {
		        var changed = ref.changed;
		        var width = ref.width;
		        var prev = width;
		        width = Math.floor(this.$el.offsetWidth / 2);
		        return {
		          width: width,
		          fill: this.fill,
		          changed: changed || prev !== width,
		          hide: !this.matchMedia
		        };
		      },
		      write: function (data) {
		        toggleClass(this.wrapper, this.clsHide, data.hide);
		        if (data.changed) {
		          data.changed = false;
		          attr(this.wrapper, this.attrFill, new Array(data.width).join(data.fill));
		        }
		      },
		      events: ['resize']
		    }
		  };
		  var Container = {
		    props: {
		      container: Boolean
		    },
		    data: {
		      container: true
		    },
		    computed: {
		      container: function (ref) {
		        var container = ref.container;
		        return container === true && this.$container || container && $(container);
		      }
		    }
		  };
		  var active$1 = [];
		  var Modal = {
		    mixins: [Class, Container, Togglable],
		    props: {
		      selPanel: String,
		      selClose: String,
		      escClose: Boolean,
		      bgClose: Boolean,
		      stack: Boolean
		    },
		    data: {
		      cls: 'uk-open',
		      escClose: true,
		      bgClose: true,
		      overlay: true,
		      stack: false
		    },
		    computed: {
		      panel: function (ref, $el) {
		        var selPanel = ref.selPanel;
		        return $(selPanel, $el);
		      },
		      transitionElement: function () {
		        return this.panel;
		      },
		      bgClose: function (ref) {
		        var bgClose = ref.bgClose;
		        return bgClose && this.panel;
		      }
		    },
		    beforeDisconnect: function () {
		      if (this.isToggled()) {
		        this.toggleElement(this.$el, false, false);
		      }
		    },
		    events: [{
		      name: 'click',
		      delegate: function () {
		        return this.selClose;
		      },
		      handler: function (e) {
		        e.preventDefault();
		        this.hide();
		      }
		    }, {
		      name: 'toggle',
		      self: true,
		      handler: function (e) {
		        if (e.defaultPrevented) {
		          return;
		        }
		        e.preventDefault();
		        if (this.isToggled() === includes(active$1, this)) {
		          this.toggle();
		        }
		      }
		    }, {
		      name: 'beforeshow',
		      self: true,
		      handler: function (e) {
		        if (includes(active$1, this)) {
		          return false;
		        }
		        if (!this.stack && active$1.length) {
		          Promise.all(active$1.map(function (modal) {
		            return modal.hide();
		          })).then(this.show);
		          e.preventDefault();
		        } else {
		          active$1.push(this);
		        }
		      }
		    }, {
		      name: 'show',
		      self: true,
		      handler: function () {
		        var this$1$1 = this;
		        if (width(window) - width(document) && this.overlay) {
		          css(document.body, 'overflowY', 'scroll');
		        }
		        if (this.stack) {
		          css(this.$el, 'zIndex', toFloat(css(this.$el, 'zIndex')) + active$1.length);
		        }
		        addClass(document.documentElement, this.clsPage);
		        if (this.bgClose) {
		          once(this.$el, 'hide', on(document, pointerDown, function (ref) {
		            var target = ref.target;
		            if (last(active$1) !== this$1$1 || this$1$1.overlay && !within(target, this$1$1.$el) || within(target, this$1$1.panel)) {
		              return;
		            }
		            once(document, pointerUp + " " + pointerCancel + " scroll", function (ref) {
		              var defaultPrevented = ref.defaultPrevented;
		              var type = ref.type;
		              var newTarget = ref.target;
		              if (!defaultPrevented && type === pointerUp && target === newTarget) {
		                this$1$1.hide();
		              }
		            }, true);
		          }), {
		            self: true
		          });
		        }
		        if (this.escClose) {
		          once(this.$el, 'hide', on(document, 'keydown', function (e) {
		            if (e.keyCode === 27 && last(active$1) === this$1$1) {
		              e.preventDefault();
		              this$1$1.hide();
		            }
		          }), {
		            self: true
		          });
		        }
		      }
		    }, {
		      name: 'hidden',
		      self: true,
		      handler: function () {
		        var this$1$1 = this;
		        active$1.splice(active$1.indexOf(this), 1);
		        if (!active$1.length) {
		          css(document.body, 'overflowY', '');
		        }
		        css(this.$el, 'zIndex', '');
		        if (!active$1.some(function (modal) {
		          return modal.clsPage === this$1$1.clsPage;
		        })) {
		          removeClass(document.documentElement, this.clsPage);
		        }
		      }
		    }],
		    methods: {
		      toggle: function () {
		        return this.isToggled() ? this.hide() : this.show();
		      },
		      show: function () {
		        var this$1$1 = this;
		        if (this.container && this.$el.parentNode !== this.container) {
		          append(this.container, this.$el);
		          return new Promise(function (resolve) {
		            return requestAnimationFrame(function () {
		              return this$1$1.show().then(resolve);
		            });
		          });
		        }
		        return this.toggleElement(this.$el, true, animate$1(this));
		      },
		      hide: function () {
		        return this.toggleElement(this.$el, false, animate$1(this));
		      }
		    }
		  };
		  function animate$1(ref) {
		    var transitionElement = ref.transitionElement;
		    var _toggle = ref._toggle;
		    return function (el, show) {
		      return new Promise(function (resolve, reject) {
		        return once(el, 'show hide', function () {
		          el._reject && el._reject();
		          el._reject = reject;
		          _toggle(el, show);
		          var off = once(transitionElement, 'transitionstart', function () {
		            once(transitionElement, 'transitionend transitioncancel', resolve, {
		              self: true
		            });
		            clearTimeout(timer);
		          }, {
		            self: true
		          });
		          var timer = setTimeout(function () {
		            off();
		            resolve();
		          }, toMs(css(transitionElement, 'transitionDuration')));
		        });
		      });
		    };
		  }
		  var modal = {
		    install: install$1,
		    mixins: [Modal],
		    data: {
		      clsPage: 'uk-modal-page',
		      selPanel: '.uk-modal-dialog',
		      selClose: '.uk-modal-close, .uk-modal-close-default, .uk-modal-close-outside, .uk-modal-close-full'
		    },
		    events: [{
		      name: 'show',
		      self: true,
		      handler: function () {
		        if (hasClass(this.panel, 'uk-margin-auto-vertical')) {
		          addClass(this.$el, 'uk-flex');
		        } else {
		          css(this.$el, 'display', 'block');
		        }
		        height(this.$el); // force reflow
		      }
		    }, {
		      name: 'hidden',
		      self: true,
		      handler: function () {
		        css(this.$el, 'display', '');
		        removeClass(this.$el, 'uk-flex');
		      }
		    }]
		  };
		  function install$1(ref) {
		    var modal = ref.modal;
		    modal.dialog = function (content, options) {
		      var dialog = modal("<div class=\"uk-modal\"> <div class=\"uk-modal-dialog\">" + content + "</div> </div>", options);
		      dialog.show();
		      on(dialog.$el, 'hidden', function () {
		        return Promise.resolve().then(function () {
		          return dialog.$destroy(true);
		        });
		      }, {
		        self: true
		      });
		      return dialog;
		    };
		    modal.alert = function (message, options) {
		      return openDialog(function (ref) {
		        var labels = ref.labels;
		        return "<div class=\"uk-modal-body\">" + (isString(message) ? message : html(message)) + "</div> <div class=\"uk-modal-footer uk-text-right\"> <button class=\"uk-button uk-button-primary uk-modal-close\" autofocus>" + labels.ok + "</button> </div>";
		      }, options, function (deferred) {
		        return deferred.resolve();
		      });
		    };
		    modal.confirm = function (message, options) {
		      return openDialog(function (ref) {
		        var labels = ref.labels;
		        return "<form> <div class=\"uk-modal-body\">" + (isString(message) ? message : html(message)) + "</div> <div class=\"uk-modal-footer uk-text-right\"> <button class=\"uk-button uk-button-default uk-modal-close\" type=\"button\">" + labels.cancel + "</button> <button class=\"uk-button uk-button-primary\" autofocus>" + labels.ok + "</button> </div> </form>";
		      }, options, function (deferred) {
		        return deferred.reject();
		      });
		    };
		    modal.prompt = function (message, value, options) {
		      return openDialog(function (ref) {
		        var labels = ref.labels;
		        return "<form class=\"uk-form-stacked\"> <div class=\"uk-modal-body\"> <label>" + (isString(message) ? message : html(message)) + "</label> <input class=\"uk-input\" value=\"" + (value || '') + "\" autofocus> </div> <div class=\"uk-modal-footer uk-text-right\"> <button class=\"uk-button uk-button-default uk-modal-close\" type=\"button\">" + labels.cancel + "</button> <button class=\"uk-button uk-button-primary\">" + labels.ok + "</button> </div> </form>";
		      }, options, function (deferred) {
		        return deferred.resolve(null);
		      }, function (dialog) {
		        return $('input', dialog.$el).value;
		      });
		    };
		    modal.labels = {
		      ok: 'Ok',
		      cancel: 'Cancel'
		    };
		    function openDialog(tmpl, options, hideFn, submitFn) {
		      options = assign({
		        bgClose: false,
		        escClose: true,
		        labels: modal.labels
		      }, options);
		      var dialog = modal.dialog(tmpl(options), options);
		      var deferred = new Deferred();
		      var resolved = false;
		      on(dialog.$el, 'submit', 'form', function (e) {
		        e.preventDefault();
		        deferred.resolve(submitFn && submitFn(dialog));
		        resolved = true;
		        dialog.hide();
		      });
		      on(dialog.$el, 'hide', function () {
		        return !resolved && hideFn(deferred);
		      });
		      deferred.promise.dialog = dialog;
		      return deferred.promise;
		    }
		  }
		  var nav = {
		    extends: Accordion,
		    data: {
		      targets: '> .uk-parent',
		      toggle: '> a',
		      content: '> ul'
		    }
		  };
		  var navbar = {
		    mixins: [Class, FlexBug],
		    props: {
		      dropdown: String,
		      mode: 'list',
		      align: String,
		      offset: Number,
		      boundary: Boolean,
		      boundaryAlign: Boolean,
		      clsDrop: String,
		      delayShow: Number,
		      delayHide: Number,
		      dropbar: Boolean,
		      dropbarMode: String,
		      dropbarAnchor: Boolean,
		      duration: Number
		    },
		    data: {
		      dropdown: '.uk-navbar-nav > li',
		      align: !isRtl ? 'left' : 'right',
		      clsDrop: 'uk-navbar-dropdown',
		      mode: undefined,
		      offset: undefined,
		      delayShow: undefined,
		      delayHide: undefined,
		      boundaryAlign: undefined,
		      flip: 'x',
		      boundary: true,
		      dropbar: false,
		      dropbarMode: 'slide',
		      dropbarAnchor: false,
		      duration: 200,
		      forceHeight: true,
		      selMinHeight: '.uk-navbar-nav > li > a, .uk-navbar-item, .uk-navbar-toggle'
		    },
		    computed: {
		      boundary: function (ref, $el) {
		        var boundary = ref.boundary;
		        var boundaryAlign = ref.boundaryAlign;
		        return boundary === true || boundaryAlign ? $el : boundary;
		      },
		      dropbarAnchor: function (ref, $el) {
		        var dropbarAnchor = ref.dropbarAnchor;
		        return query(dropbarAnchor, $el);
		      },
		      pos: function (ref) {
		        var align = ref.align;
		        return "bottom-" + align;
		      },
		      dropbar: {
		        get: function (ref) {
		          var dropbar = ref.dropbar;
		          if (!dropbar) {
		            return null;
		          }
		          dropbar = this._dropbar || query(dropbar, this.$el) || $('+ .uk-navbar-dropbar', this.$el);
		          return dropbar ? dropbar : this._dropbar = $('<div></div>');
		        },
		        watch: function (dropbar) {
		          addClass(dropbar, 'uk-navbar-dropbar');
		        },
		        immediate: true
		      },
		      dropdowns: {
		        get: function (ref, $el) {
		          var dropdown = ref.dropdown;
		          var clsDrop = ref.clsDrop;
		          return $$(dropdown + " ." + clsDrop, $el);
		        },
		        watch: function (dropdowns) {
		          var this$1$1 = this;
		          this.$create('drop', dropdowns.filter(function (el) {
		            return !this$1$1.getDropdown(el);
		          }), assign({}, this.$props, {
		            boundary: this.boundary,
		            pos: this.pos,
		            offset: this.dropbar || this.offset
		          }));
		        },
		        immediate: true
		      }
		    },
		    disconnected: function () {
		      this.dropbar && remove(this.dropbar);
		      delete this._dropbar;
		    },
		    events: [{
		      name: 'mouseover',
		      delegate: function () {
		        return this.dropdown;
		      },
		      handler: function (ref) {
		        var current = ref.current;
		        var active = this.getActive();
		        if (active && active.toggle && !within(active.toggle.$el, current) && !active.tracker.movesTo(active.$el)) {
		          active.hide(false);
		        }
		      }
		    }, {
		      name: 'mouseleave',
		      el: function () {
		        return this.dropbar;
		      },
		      handler: function () {
		        var active = this.getActive();
		        if (active && !this.dropdowns.some(function (el) {
		          return matches(el, ':hover');
		        })) {
		          active.hide();
		        }
		      }
		    }, {
		      name: 'beforeshow',
		      capture: true,
		      filter: function () {
		        return this.dropbar;
		      },
		      handler: function () {
		        if (!this.dropbar.parentNode) {
		          after(this.dropbarAnchor || this.$el, this.dropbar);
		        }
		      }
		    }, {
		      name: 'show',
		      filter: function () {
		        return this.dropbar;
		      },
		      handler: function (_, ref) {
		        var $el = ref.$el;
		        var dir = ref.dir;
		        if (!hasClass($el, this.clsDrop)) {
		          return;
		        }
		        if (this.dropbarMode === 'slide') {
		          addClass(this.dropbar, 'uk-navbar-dropbar-slide');
		        }
		        this.clsDrop && addClass($el, this.clsDrop + "-dropbar");
		        if (dir === 'bottom') {
		          this.transitionTo($el.offsetHeight + toFloat(css($el, 'marginTop')) + toFloat(css($el, 'marginBottom')), $el);
		        }
		      }
		    }, {
		      name: 'beforehide',
		      filter: function () {
		        return this.dropbar;
		      },
		      handler: function (e, ref) {
		        var $el = ref.$el;
		        var active = this.getActive();
		        if (matches(this.dropbar, ':hover') && active && active.$el === $el) {
		          e.preventDefault();
		        }
		      }
		    }, {
		      name: 'hide',
		      filter: function () {
		        return this.dropbar;
		      },
		      handler: function (_, ref) {
		        var $el = ref.$el;
		        if (!hasClass($el, this.clsDrop)) {
		          return;
		        }
		        var active = this.getActive();
		        if (!active || active && active.$el === $el) {
		          this.transitionTo(0);
		        }
		      }
		    }],
		    methods: {
		      getActive: function () {
		        var ref = this.dropdowns.map(this.getDropdown).filter(function (drop) {
		          return drop && drop.isActive();
		        });
		        var active = ref[0];
		        return active && includes(active.mode, 'hover') && within(active.toggle.$el, this.$el) && active;
		      },
		      transitionTo: function (newHeight, el) {
		        var this$1$1 = this;
		        var ref = this;
		        var dropbar = ref.dropbar;
		        var oldHeight = isVisible(dropbar) ? height(dropbar) : 0;
		        el = oldHeight < newHeight && el;
		        css(el, 'clip', "rect(0," + el.offsetWidth + "px," + oldHeight + "px,0)");
		        height(dropbar, oldHeight);
		        Transition.cancel([el, dropbar]);
		        return Promise.all([Transition.start(dropbar, {
		          height: newHeight
		        }, this.duration), Transition.start(el, {
		          clip: "rect(0," + el.offsetWidth + "px," + newHeight + "px,0)"
		        }, this.duration)]).catch(noop).then(function () {
		          css(el, {
		            clip: ''
		          });
		          this$1$1.$update(dropbar);
		        });
		      },
		      getDropdown: function (el) {
		        return this.$getComponent(el, 'drop') || this.$getComponent(el, 'dropdown');
		      }
		    }
		  };
		  var offcanvas = {
		    mixins: [Modal],
		    args: 'mode',
		    props: {
		      mode: String,
		      flip: Boolean,
		      overlay: Boolean
		    },
		    data: {
		      mode: 'slide',
		      flip: false,
		      overlay: false,
		      clsPage: 'uk-offcanvas-page',
		      clsContainer: 'uk-offcanvas-container',
		      selPanel: '.uk-offcanvas-bar',
		      clsFlip: 'uk-offcanvas-flip',
		      clsContainerAnimation: 'uk-offcanvas-container-animation',
		      clsSidebarAnimation: 'uk-offcanvas-bar-animation',
		      clsMode: 'uk-offcanvas',
		      clsOverlay: 'uk-offcanvas-overlay',
		      selClose: '.uk-offcanvas-close',
		      container: false
		    },
		    computed: {
		      clsFlip: function (ref) {
		        var flip = ref.flip;
		        var clsFlip = ref.clsFlip;
		        return flip ? clsFlip : '';
		      },
		      clsOverlay: function (ref) {
		        var overlay = ref.overlay;
		        var clsOverlay = ref.clsOverlay;
		        return overlay ? clsOverlay : '';
		      },
		      clsMode: function (ref) {
		        var mode = ref.mode;
		        var clsMode = ref.clsMode;
		        return clsMode + "-" + mode;
		      },
		      clsSidebarAnimation: function (ref) {
		        var mode = ref.mode;
		        var clsSidebarAnimation = ref.clsSidebarAnimation;
		        return mode === 'none' || mode === 'reveal' ? '' : clsSidebarAnimation;
		      },
		      clsContainerAnimation: function (ref) {
		        var mode = ref.mode;
		        var clsContainerAnimation = ref.clsContainerAnimation;
		        return mode !== 'push' && mode !== 'reveal' ? '' : clsContainerAnimation;
		      },
		      transitionElement: function (ref) {
		        var mode = ref.mode;
		        return mode === 'reveal' ? this.panel.parentNode : this.panel;
		      }
		    },
		    events: [{
		      name: 'click',
		      delegate: function () {
		        return 'a[href^="#"]';
		      },
		      handler: function (ref) {
		        var hash = ref.current.hash;
		        var defaultPrevented = ref.defaultPrevented;
		        if (!defaultPrevented && hash && $(hash, document.body)) {
		          this.hide();
		        }
		      }
		    }, {
		      name: 'touchstart',
		      passive: true,
		      el: function () {
		        return this.panel;
		      },
		      handler: function (ref) {
		        var targetTouches = ref.targetTouches;
		        if (targetTouches.length === 1) {
		          this.clientY = targetTouches[0].clientY;
		        }
		      }
		    }, {
		      name: 'touchmove',
		      self: true,
		      passive: false,
		      filter: function () {
		        return this.overlay;
		      },
		      handler: function (e) {
		        e.cancelable && e.preventDefault();
		      }
		    }, {
		      name: 'touchmove',
		      passive: false,
		      el: function () {
		        return this.panel;
		      },
		      handler: function (e) {
		        if (e.targetTouches.length !== 1) {
		          return;
		        }
		        var clientY = event.targetTouches[0].clientY - this.clientY;
		        var ref = this.panel;
		        var scrollTop = ref.scrollTop;
		        var scrollHeight = ref.scrollHeight;
		        var clientHeight = ref.clientHeight;
		        if (clientHeight >= scrollHeight || scrollTop === 0 && clientY > 0 || scrollHeight - scrollTop <= clientHeight && clientY < 0) {
		          e.cancelable && e.preventDefault();
		        }
		      }
		    }, {
		      name: 'show',
		      self: true,
		      handler: function () {
		        if (this.mode === 'reveal' && !hasClass(this.panel.parentNode, this.clsMode)) {
		          wrapAll(this.panel, '<div>');
		          addClass(this.panel.parentNode, this.clsMode);
		        }
		        css(document.documentElement, 'overflowY', this.overlay ? 'hidden' : '');
		        addClass(document.body, this.clsContainer, this.clsFlip);
		        css(document.body, 'touch-action', 'pan-y pinch-zoom');
		        css(this.$el, 'display', 'block');
		        addClass(this.$el, this.clsOverlay);
		        addClass(this.panel, this.clsSidebarAnimation, this.mode !== 'reveal' ? this.clsMode : '');
		        height(document.body); // force reflow
		        addClass(document.body, this.clsContainerAnimation);
		        this.clsContainerAnimation && suppressUserScale();
		      }
		    }, {
		      name: 'hide',
		      self: true,
		      handler: function () {
		        removeClass(document.body, this.clsContainerAnimation);
		        css(document.body, 'touch-action', '');
		      }
		    }, {
		      name: 'hidden',
		      self: true,
		      handler: function () {
		        this.clsContainerAnimation && resumeUserScale();
		        if (this.mode === 'reveal') {
		          unwrap(this.panel);
		        }
		        removeClass(this.panel, this.clsSidebarAnimation, this.clsMode);
		        removeClass(this.$el, this.clsOverlay);
		        css(this.$el, 'display', '');
		        removeClass(document.body, this.clsContainer, this.clsFlip);
		        css(document.documentElement, 'overflowY', '');
		      }
		    }, {
		      name: 'swipeLeft swipeRight',
		      handler: function (e) {
		        if (this.isToggled() && endsWith(e.type, 'Left') ^ this.flip) {
		          this.hide();
		        }
		      }
		    }]
		  };

		  // Chrome in responsive mode zooms page upon opening offcanvas
		  function suppressUserScale() {
		    getViewport$1().content += ',user-scalable=0';
		  }
		  function resumeUserScale() {
		    var viewport = getViewport$1();
		    viewport.content = viewport.content.replace(/,user-scalable=0$/, '');
		  }
		  function getViewport$1() {
		    return $('meta[name="viewport"]', document.head) || append(document.head, '<meta name="viewport">');
		  }
		  var overflowAuto = {
		    mixins: [Class],
		    props: {
		      selContainer: String,
		      selContent: String
		    },
		    data: {
		      selContainer: '.uk-modal',
		      selContent: '.uk-modal-dialog'
		    },
		    computed: {
		      container: function (ref, $el) {
		        var selContainer = ref.selContainer;
		        return closest($el, selContainer);
		      },
		      content: function (ref, $el) {
		        var selContent = ref.selContent;
		        return closest($el, selContent);
		      }
		    },
		    connected: function () {
		      css(this.$el, 'minHeight', 150);
		    },
		    update: {
		      read: function () {
		        if (!this.content || !this.container) {
		          return false;
		        }
		        return {
		          current: toFloat(css(this.$el, 'maxHeight')),
		          max: Math.max(150, height(this.container) - (offset(this.content).height - height(this.$el)))
		        };
		      },
		      write: function (ref) {
		        var current = ref.current;
		        var max = ref.max;
		        css(this.$el, 'maxHeight', max);
		        if (Math.round(current) !== Math.round(max)) {
		          trigger(this.$el, 'resize');
		        }
		      },
		      events: ['resize']
		    }
		  };
		  var responsive = {
		    props: ['width', 'height'],
		    connected: function () {
		      addClass(this.$el, 'uk-responsive-width');
		    },
		    update: {
		      read: function () {
		        return isVisible(this.$el) && this.width && this.height ? {
		          width: width(this.$el.parentNode),
		          height: this.height
		        } : false;
		      },
		      write: function (dim) {
		        height(this.$el, Dimensions.contain({
		          height: this.height,
		          width: this.width
		        }, dim).height);
		      },
		      events: ['resize']
		    }
		  };
		  var scroll = {
		    props: {
		      offset: Number
		    },
		    data: {
		      offset: 0
		    },
		    methods: {
		      scrollTo: function (el) {
		        var this$1$1 = this;
		        el = el && $(el) || document.body;
		        if (trigger(this.$el, 'beforescroll', [this, el])) {
		          scrollIntoView(el, {
		            offset: this.offset
		          }).then(function () {
		            return trigger(this$1$1.$el, 'scrolled', [this$1$1, el]);
		          });
		        }
		      }
		    },
		    events: {
		      click: function (e) {
		        if (e.defaultPrevented) {
		          return;
		        }
		        e.preventDefault();
		        this.scrollTo(escape(decodeURIComponent(this.$el.hash)).substr(1));
		      }
		    }
		  };
		  var stateKey$1 = '_ukScrollspy';
		  var scrollspy = {
		    args: 'cls',
		    props: {
		      cls: String,
		      target: String,
		      hidden: Boolean,
		      offsetTop: Number,
		      offsetLeft: Number,
		      repeat: Boolean,
		      delay: Number
		    },
		    data: function () {
		      return {
		        cls: false,
		        target: false,
		        hidden: true,
		        offsetTop: 0,
		        offsetLeft: 0,
		        repeat: false,
		        delay: 0,
		        inViewClass: 'uk-scrollspy-inview'
		      };
		    },
		    computed: {
		      elements: {
		        get: function (ref, $el) {
		          var target = ref.target;
		          return target ? $$(target, $el) : [$el];
		        },
		        watch: function (elements) {
		          if (this.hidden) {
		            css(filter(elements, ":not(." + this.inViewClass + ")"), 'visibility', 'hidden');
		          }
		        },
		        immediate: true
		      }
		    },
		    update: [{
		      read: function (ref) {
		        var this$1$1 = this;
		        var update = ref.update;
		        if (!update) {
		          return;
		        }
		        this.elements.forEach(function (el) {
		          if (!el[stateKey$1]) {
		            el[stateKey$1] = {
		              cls: data(el, 'uk-scrollspy-class') || this$1$1.cls
		            };
		          }
		          el[stateKey$1].show = isInView(el, this$1$1.offsetTop, this$1$1.offsetLeft);
		        });
		      },
		      write: function (data) {
		        var this$1$1 = this;

		        // Let child components be applied at least once first
		        if (!data.update) {
		          this.$emit();
		          return data.update = true;
		        }
		        this.elements.forEach(function (el) {
		          var state = el[stateKey$1];
		          var toggle = function (inview) {
		            css(el, 'visibility', !inview && this$1$1.hidden ? 'hidden' : '');
		            toggleClass(el, this$1$1.inViewClass, inview);
		            toggleClass(el, state.cls);
		            trigger(el, inview ? 'inview' : 'outview');
		            state.inview = inview;
		            this$1$1.$update(el);
		          };
		          if (state.show && !state.inview && !state.queued) {
		            state.queued = true;
		            data.promise = (data.promise || Promise.resolve()).then(function () {
		              return new Promise(function (resolve) {
		                return setTimeout(resolve, this$1$1.delay);
		              });
		            }).then(function () {
		              toggle(true);
		              setTimeout(function () {
		                state.queued = false;
		                this$1$1.$emit();
		              }, 300);
		            });
		          } else if (!state.show && state.inview && !state.queued && this$1$1.repeat) {
		            toggle(false);
		          }
		        });
		      },
		      events: ['scroll', 'resize']
		    }]
		  };
		  var scrollspyNav = {
		    props: {
		      cls: String,
		      closest: String,
		      scroll: Boolean,
		      overflow: Boolean,
		      offset: Number
		    },
		    data: {
		      cls: 'uk-active',
		      closest: false,
		      scroll: false,
		      overflow: true,
		      offset: 0
		    },
		    computed: {
		      links: {
		        get: function (_, $el) {
		          return $$('a[href^="#"]', $el).filter(function (el) {
		            return el.hash;
		          });
		        },
		        watch: function (links) {
		          if (this.scroll) {
		            this.$create('scroll', links, {
		              offset: this.offset || 0
		            });
		          }
		        },
		        immediate: true
		      },
		      targets: function () {
		        return $$(this.links.map(function (el) {
		          return escape(el.hash).substr(1);
		        }).join(','));
		      },
		      elements: function (ref) {
		        var selector = ref.closest;
		        return closest(this.links, selector || '*');
		      }
		    },
		    update: [{
		      read: function () {
		        var this$1$1 = this;
		        var ref = this.targets;
		        var length = ref.length;
		        if (!length || !isVisible(this.$el)) {
		          return false;
		        }
		        var scrollElement = last(scrollParents(this.targets[0]));
		        var scrollTop = scrollElement.scrollTop;
		        var scrollHeight = scrollElement.scrollHeight;
		        var viewport = getViewport(scrollElement);
		        var max = scrollHeight - offset(viewport).height;
		        var active = false;
		        if (scrollTop === max) {
		          active = length - 1;
		        } else {
		          this.targets.every(function (el, i) {
		            if (position(el, viewport).top - this$1$1.offset <= 0) {
		              active = i;
		              return true;
		            }
		          });
		          if (active === false && this.overflow) {
		            active = 0;
		          }
		        }
		        return {
		          active: active
		        };
		      },
		      write: function (ref) {
		        var active = ref.active;
		        this.links.forEach(function (el) {
		          return el.blur();
		        });
		        removeClass(this.elements, this.cls);
		        if (active !== false) {
		          trigger(this.$el, 'active', [active, addClass(this.elements[active], this.cls)]);
		        }
		      },
		      events: ['scroll', 'resize']
		    }]
		  };
		  var sticky = {
		    mixins: [Class, Media],
		    props: {
		      top: null,
		      bottom: Boolean,
		      offset: String,
		      animation: String,
		      clsActive: String,
		      clsInactive: String,
		      clsFixed: String,
		      clsBelow: String,
		      selTarget: String,
		      widthElement: Boolean,
		      showOnUp: Boolean,
		      targetOffset: Number
		    },
		    data: {
		      top: 0,
		      bottom: false,
		      offset: 0,
		      animation: '',
		      clsActive: 'uk-active',
		      clsInactive: '',
		      clsFixed: 'uk-sticky-fixed',
		      clsBelow: 'uk-sticky-below',
		      selTarget: '',
		      widthElement: false,
		      showOnUp: false,
		      targetOffset: false
		    },
		    computed: {
		      offset: function (ref) {
		        var offset = ref.offset;
		        return toPx(offset);
		      },
		      selTarget: function (ref, $el) {
		        var selTarget = ref.selTarget;
		        return selTarget && $(selTarget, $el) || $el;
		      },
		      widthElement: function (ref, $el) {
		        var widthElement = ref.widthElement;
		        return query(widthElement, $el) || this.placeholder;
		      },
		      isActive: {
		        get: function () {
		          return hasClass(this.selTarget, this.clsActive);
		        },
		        set: function (value) {
		          if (value && !this.isActive) {
		            replaceClass(this.selTarget, this.clsInactive, this.clsActive);
		            trigger(this.$el, 'active');
		          } else if (!value && !hasClass(this.selTarget, this.clsInactive)) {
		            replaceClass(this.selTarget, this.clsActive, this.clsInactive);
		            trigger(this.$el, 'inactive');
		          }
		        }
		      }
		    },
		    connected: function () {
		      this.placeholder = $('+ .uk-sticky-placeholder', this.$el) || $('<div class="uk-sticky-placeholder"></div>');
		      this.isFixed = false;
		      this.isActive = false;
		    },
		    disconnected: function () {
		      if (this.isFixed) {
		        this.hide();
		        removeClass(this.selTarget, this.clsInactive);
		      }
		      remove(this.placeholder);
		      this.placeholder = null;
		      this.widthElement = null;
		    },
		    events: [{
		      name: 'load hashchange popstate',
		      el: inBrowser && window,
		      handler: function () {
		        var this$1$1 = this;
		        if (!(this.targetOffset !== false && location.hash && window.pageYOffset > 0)) {
		          return;
		        }
		        var target = $(location.hash);
		        if (target) {
		          fastdom.read(function () {
		            var ref = offset(target);
		            var top = ref.top;
		            var elTop = offset(this$1$1.$el).top;
		            var elHeight = this$1$1.$el.offsetHeight;
		            if (this$1$1.isFixed && elTop + elHeight >= top && elTop <= top + target.offsetHeight) {
		              scrollTop(window, top - elHeight - (isNumeric(this$1$1.targetOffset) ? this$1$1.targetOffset : 0) - this$1$1.offset);
		            }
		          });
		        }
		      }
		    }],
		    update: [{
		      read: function (ref, type) {
		        var height = ref.height;
		        this.inactive = !this.matchMedia || !isVisible(this.$el);
		        if (this.inactive) {
		          return false;
		        }
		        if (this.isActive && type !== 'update') {
		          this.hide();
		          height = this.$el.offsetHeight;
		          this.show();
		        }
		        height = !this.isActive ? this.$el.offsetHeight : height;
		        this.topOffset = offset(this.isFixed ? this.placeholder : this.$el).top;
		        this.bottomOffset = this.topOffset + height;
		        var bottom = parseProp('bottom', this);
		        this.top = Math.max(toFloat(parseProp('top', this)), this.topOffset) - this.offset;
		        this.bottom = bottom && bottom - this.$el.offsetHeight;
		        this.width = offset(isVisible(this.widthElement) ? this.widthElement : this.$el).width;
		        return {
		          height: height,
		          top: offsetPosition(this.placeholder)[0],
		          margins: css(this.$el, ['marginTop', 'marginBottom', 'marginLeft', 'marginRight'])
		        };
		      },
		      write: function (ref) {
		        var height = ref.height;
		        var margins = ref.margins;
		        var ref$1 = this;
		        var placeholder = ref$1.placeholder;
		        css(placeholder, assign({
		          height: height
		        }, margins));
		        if (!within(placeholder, document)) {
		          after(this.$el, placeholder);
		          placeholder.hidden = true;
		        }
		        this.isActive = !!this.isActive; // force self-assign
		      },

		      events: ['resize']
		    }, {
		      read: function (ref) {
		        var scroll = ref.scroll;
		        if (scroll === void 0) scroll = 0;
		        this.scroll = window.pageYOffset;
		        return {
		          dir: scroll <= this.scroll ? 'down' : 'up',
		          scroll: this.scroll
		        };
		      },
		      write: function (data, type) {
		        var this$1$1 = this;
		        var now = Date.now();
		        var initTimestamp = data.initTimestamp;
		        if (initTimestamp === void 0) initTimestamp = 0;
		        var dir = data.dir;
		        var lastDir = data.lastDir;
		        var lastScroll = data.lastScroll;
		        var scroll = data.scroll;
		        var top = data.top;
		        data.lastScroll = scroll;
		        if (scroll < 0 || scroll === lastScroll && type === 'scroll' || this.showOnUp && type !== 'scroll' && !this.isFixed) {
		          return;
		        }
		        if (now - initTimestamp > 300 || dir !== lastDir) {
		          data.initScroll = scroll;
		          data.initTimestamp = now;
		        }
		        data.lastDir = dir;
		        if (this.showOnUp && !this.isFixed && Math.abs(data.initScroll - scroll) <= 30 && Math.abs(lastScroll - scroll) <= 10) {
		          return;
		        }
		        if (this.inactive || scroll < this.top || this.showOnUp && (scroll <= this.top || dir === 'down' && type === 'scroll' || dir === 'up' && !this.isFixed && scroll <= this.bottomOffset)) {
		          if (!this.isFixed) {
		            if (Animation.inProgress(this.$el) && top > scroll) {
		              Animation.cancel(this.$el);
		              this.hide();
		            }
		            return;
		          }
		          this.isFixed = false;
		          if (this.animation && scroll > this.topOffset) {
		            Animation.cancel(this.$el);
		            Animation.out(this.$el, this.animation).then(function () {
		              return this$1$1.hide();
		            }, noop);
		          } else {
		            this.hide();
		          }
		        } else if (this.isFixed) {
		          this.update();
		        } else if (this.animation) {
		          Animation.cancel(this.$el);
		          this.show();
		          Animation.in(this.$el, this.animation).catch(noop);
		        } else {
		          this.show();
		        }
		      },
		      events: ['resize', 'scroll']
		    }],
		    methods: {
		      show: function () {
		        this.isFixed = true;
		        this.update();
		        this.placeholder.hidden = false;
		      },
		      hide: function () {
		        this.isActive = false;
		        removeClass(this.$el, this.clsFixed, this.clsBelow);
		        css(this.$el, {
		          position: '',
		          top: '',
		          width: ''
		        });
		        this.placeholder.hidden = true;
		      },
		      update: function () {
		        var active = this.top !== 0 || this.scroll > this.top;
		        var top = Math.max(0, this.offset);
		        if (isNumeric(this.bottom) && this.scroll > this.bottom - this.offset) {
		          top = this.bottom - this.scroll;
		        }
		        css(this.$el, {
		          position: 'fixed',
		          top: top + "px",
		          width: this.width
		        });
		        this.isActive = active;
		        toggleClass(this.$el, this.clsBelow, this.scroll > this.bottomOffset);
		        addClass(this.$el, this.clsFixed);
		      }
		    }
		  };
		  function parseProp(prop, ref) {
		    var $props = ref.$props;
		    var $el = ref.$el;
		    var propOffset = ref[prop + "Offset"];
		    var value = $props[prop];
		    if (!value) {
		      return;
		    }
		    if (isString(value) && value.match(/^-?\d/)) {
		      return propOffset + toPx(value);
		    } else {
		      return offset(value === true ? $el.parentNode : query(value, $el)).bottom;
		    }
		  }
		  var Switcher = {
		    mixins: [Togglable],
		    args: 'connect',
		    props: {
		      connect: String,
		      toggle: String,
		      active: Number,
		      swiping: Boolean
		    },
		    data: {
		      connect: '~.uk-switcher',
		      toggle: '> * > :first-child',
		      active: 0,
		      swiping: true,
		      cls: 'uk-active',
		      clsContainer: 'uk-switcher',
		      attrItem: 'uk-switcher-item'
		    },
		    computed: {
		      connects: {
		        get: function (ref, $el) {
		          var connect = ref.connect;
		          return queryAll(connect, $el);
		        },
		        watch: function (connects) {
		          var this$1$1 = this;
		          connects.forEach(function (list) {
		            return this$1$1.updateAria(list.children);
		          });
		          if (this.swiping) {
		            css(connects, 'touch-action', 'pan-y pinch-zoom');
		          }
		        },
		        immediate: true
		      },
		      toggles: {
		        get: function (ref, $el) {
		          var toggle = ref.toggle;
		          return $$(toggle, $el).filter(function (el) {
		            return !matches(el, '.uk-disabled *, .uk-disabled, [disabled]');
		          });
		        },
		        watch: function (toggles) {
		          var active = this.index();
		          this.show(~active && active || toggles[this.active] || toggles[0]);
		        },
		        immediate: true
		      },
		      children: function () {
		        var this$1$1 = this;
		        return children(this.$el).filter(function (child) {
		          return this$1$1.toggles.some(function (toggle) {
		            return within(toggle, child);
		          });
		        });
		      }
		    },
		    events: [{
		      name: 'click',
		      delegate: function () {
		        return this.toggle;
		      },
		      handler: function (e) {
		        if (!includes(this.toggles, e.current)) {
		          return;
		        }
		        e.preventDefault();
		        this.show(e.current);
		      }
		    }, {
		      name: 'click',
		      el: function () {
		        return this.connects;
		      },
		      delegate: function () {
		        return "[" + this.attrItem + "],[data-" + this.attrItem + "]";
		      },
		      handler: function (e) {
		        e.preventDefault();
		        this.show(data(e.current, this.attrItem));
		      }
		    }, {
		      name: 'swipeRight swipeLeft',
		      filter: function () {
		        return this.swiping;
		      },
		      el: function () {
		        return this.connects;
		      },
		      handler: function (ref) {
		        var type = ref.type;
		        this.show(endsWith(type, 'Left') ? 'next' : 'previous');
		      }
		    }],
		    methods: {
		      index: function () {
		        var this$1$1 = this;
		        return findIndex(this.children, function (el) {
		          return hasClass(el, this$1$1.cls);
		        });
		      },
		      show: function (item) {
		        var this$1$1 = this;
		        var prev = this.index();
		        var next = getIndex(item, this.toggles, prev);
		        if (prev === next) {
		          return;
		        }
		        this.children.forEach(function (child, i) {
		          toggleClass(child, this$1$1.cls, next === i);
		          attr(this$1$1.toggles[i], 'aria-expanded', next === i);
		        });
		        this.connects.forEach(function (ref) {
		          var children = ref.children;
		          return this$1$1.toggleElement(toNodes(children).filter(function (child, i) {
		            return i !== next && this$1$1.isToggled(child);
		          }), false, prev >= 0).then(function () {
		            return this$1$1.toggleElement(children[next], true, prev >= 0);
		          });
		        });
		      }
		    }
		  };
		  var tab = {
		    mixins: [Class],
		    extends: Switcher,
		    props: {
		      media: Boolean
		    },
		    data: {
		      media: 960,
		      attrItem: 'uk-tab-item'
		    },
		    connected: function () {
		      var cls = hasClass(this.$el, 'uk-tab-left') ? 'uk-tab-left' : hasClass(this.$el, 'uk-tab-right') ? 'uk-tab-right' : false;
		      if (cls) {
		        this.$create('toggle', this.$el, {
		          cls: cls,
		          mode: 'media',
		          media: this.media
		        });
		      }
		    }
		  };
		  var toggle = {
		    mixins: [Media, Togglable],
		    args: 'target',
		    props: {
		      href: String,
		      target: null,
		      mode: 'list',
		      queued: Boolean
		    },
		    data: {
		      href: false,
		      target: false,
		      mode: 'click',
		      queued: true
		    },
		    computed: {
		      target: {
		        get: function (ref, $el) {
		          var href = ref.href;
		          var target = ref.target;
		          target = queryAll(target || href, $el);
		          return target.length && target || [$el];
		        },
		        watch: function () {
		          trigger(this.target, 'updatearia', [this]);
		        },
		        immediate: true
		      }
		    },
		    events: [{
		      name: pointerEnter + " " + pointerLeave,
		      filter: function () {
		        return includes(this.mode, 'hover');
		      },
		      handler: function (e) {
		        if (!isTouch(e)) {
		          this.toggle("toggle" + (e.type === pointerEnter ? 'show' : 'hide'));
		        }
		      }
		    }, {
		      name: 'click',
		      filter: function () {
		        return includes(this.mode, 'click') || hasTouch && includes(this.mode, 'hover');
		      },
		      handler: function (e) {
		        // TODO better isToggled handling
		        var link;
		        if (closest(e.target, 'a[href="#"], a[href=""]') || (link = closest(e.target, 'a[href]')) && (this.cls && !hasClass(this.target, this.cls.split(' ')[0]) || !isVisible(this.target) || link.hash && matches(this.target, link.hash))) {
		          e.preventDefault();
		        }
		        this.toggle();
		      }
		    }],
		    update: {
		      read: function () {
		        return includes(this.mode, 'media') && this.media ? {
		          match: this.matchMedia
		        } : false;
		      },
		      write: function (ref) {
		        var match = ref.match;
		        var toggled = this.isToggled(this.target);
		        if (match ? !toggled : toggled) {
		          this.toggle();
		        }
		      },
		      events: ['resize']
		    },
		    methods: {
		      toggle: function (type) {
		        var this$1$1 = this;
		        if (!trigger(this.target, type || 'toggle', [this])) {
		          return;
		        }
		        if (this.queued) {
		          var toggled = this.target.filter(this.isToggled);
		          this.toggleElement(toggled, false).then(function () {
		            return this$1$1.toggleElement(this$1$1.target.filter(function (el) {
		              return !includes(toggled, el);
		            }), true);
		          });
		        } else {
		          this.toggleElement(this.target);
		        }
		      }
		    }
		  };
		  var components = /*#__PURE__*/Object.freeze({
		    __proto__: null,
		    Accordion: Accordion,
		    Alert: alert,
		    Cover: cover,
		    Drop: drop,
		    Dropdown: drop,
		    FormCustom: formCustom,
		    Gif: gif,
		    Grid: grid,
		    HeightMatch: heightMatch,
		    HeightViewport: heightViewport,
		    Icon: Icon,
		    Img: img,
		    Leader: leader,
		    Margin: Margin,
		    Modal: modal,
		    Nav: nav,
		    Navbar: navbar,
		    Offcanvas: offcanvas,
		    OverflowAuto: overflowAuto,
		    Responsive: responsive,
		    Scroll: scroll,
		    Scrollspy: scrollspy,
		    ScrollspyNav: scrollspyNav,
		    Sticky: sticky,
		    Svg: SVG,
		    Switcher: Switcher,
		    Tab: tab,
		    Toggle: toggle,
		    Video: Video,
		    Close: Close,
		    Spinner: Spinner,
		    SlidenavNext: Slidenav,
		    SlidenavPrevious: Slidenav,
		    SearchIcon: Search,
		    Marker: IconComponent,
		    NavbarToggleIcon: IconComponent,
		    OverlayIcon: IconComponent,
		    PaginationNext: IconComponent,
		    PaginationPrevious: IconComponent,
		    Totop: IconComponent
		  });

		  // register components
		  each(components, function (component, name) {
		    return UIkit.component(name, component);
		  });

		  // core functionality
		  UIkit.use(Core);
		  boot(UIkit);
		  var countdown = {
		    mixins: [Class],
		    props: {
		      date: String,
		      clsWrapper: String
		    },
		    data: {
		      date: '',
		      clsWrapper: '.uk-countdown-%unit%'
		    },
		    computed: {
		      date: function (ref) {
		        var date = ref.date;
		        return Date.parse(date);
		      },
		      days: function (ref, $el) {
		        var clsWrapper = ref.clsWrapper;
		        return $(clsWrapper.replace('%unit%', 'days'), $el);
		      },
		      hours: function (ref, $el) {
		        var clsWrapper = ref.clsWrapper;
		        return $(clsWrapper.replace('%unit%', 'hours'), $el);
		      },
		      minutes: function (ref, $el) {
		        var clsWrapper = ref.clsWrapper;
		        return $(clsWrapper.replace('%unit%', 'minutes'), $el);
		      },
		      seconds: function (ref, $el) {
		        var clsWrapper = ref.clsWrapper;
		        return $(clsWrapper.replace('%unit%', 'seconds'), $el);
		      },
		      units: function () {
		        var this$1$1 = this;
		        return ['days', 'hours', 'minutes', 'seconds'].filter(function (unit) {
		          return this$1$1[unit];
		        });
		      }
		    },
		    connected: function () {
		      this.start();
		    },
		    disconnected: function () {
		      var this$1$1 = this;
		      this.stop();
		      this.units.forEach(function (unit) {
		        return empty(this$1$1[unit]);
		      });
		    },
		    events: [{
		      name: 'visibilitychange',
		      el: inBrowser && document,
		      handler: function () {
		        if (document.hidden) {
		          this.stop();
		        } else {
		          this.start();
		        }
		      }
		    }],
		    update: {
		      write: function () {
		        var this$1$1 = this;
		        var timespan = getTimeSpan(this.date);
		        if (timespan.total <= 0) {
		          this.stop();
		          timespan.days = timespan.hours = timespan.minutes = timespan.seconds = 0;
		        }
		        this.units.forEach(function (unit) {
		          var digits = String(Math.floor(timespan[unit]));
		          digits = digits.length < 2 ? "0" + digits : digits;
		          var el = this$1$1[unit];
		          if (el.textContent !== digits) {
		            digits = digits.split('');
		            if (digits.length !== el.children.length) {
		              html(el, digits.map(function () {
		                return '<span></span>';
		              }).join(''));
		            }
		            digits.forEach(function (digit, i) {
		              return el.children[i].textContent = digit;
		            });
		          }
		        });
		      }
		    },
		    methods: {
		      start: function () {
		        this.stop();
		        if (this.date && this.units.length) {
		          this.$update();
		          this.timer = setInterval(this.$update, 1000);
		        }
		      },
		      stop: function () {
		        if (this.timer) {
		          clearInterval(this.timer);
		          this.timer = null;
		        }
		      }
		    }
		  };
		  function getTimeSpan(date) {
		    var total = date - Date.now();
		    return {
		      total: total,
		      seconds: total / 1000 % 60,
		      minutes: total / 1000 / 60 % 60,
		      hours: total / 1000 / 60 / 60 % 24,
		      days: total / 1000 / 60 / 60 / 24
		    };
		  }
		  var targetClass = 'uk-animation-target';
		  var Animate = {
		    props: {
		      animation: Number
		    },
		    data: {
		      animation: 150
		    },
		    methods: {
		      animate: function (action, target) {
		        var this$1$1 = this;
		        if (target === void 0) target = this.$el;
		        addStyle();
		        var children$1 = children(target);
		        var propsFrom = children$1.map(function (el) {
		          return getProps(el, true);
		        });
		        var oldHeight = height(target);
		        var oldScrollY = window.pageYOffset;
		        action();
		        Transition.cancel(target);
		        children$1.forEach(Transition.cancel);
		        reset(target);
		        this.$update(target, 'resize');
		        fastdom.flush();
		        var newHeight = height(target);
		        children$1 = children$1.concat(children(target).filter(function (el) {
		          return !includes(children$1, el);
		        }));
		        var propsTo = children$1.map(function (el, i) {
		          return el.parentNode && i in propsFrom ? propsFrom[i] ? isVisible(el) ? getPositionWithMargin(el) : {
		            opacity: 0
		          } : {
		            opacity: isVisible(el) ? 1 : 0
		          } : false;
		        });
		        propsFrom = propsTo.map(function (props, i) {
		          var from = children$1[i].parentNode === target ? propsFrom[i] || getProps(children$1[i]) : false;
		          if (from) {
		            if (!props) {
		              delete from.opacity;
		            } else if (!('opacity' in props)) {
		              var opacity = from.opacity;
		              if (opacity % 1) {
		                props.opacity = 1;
		              } else {
		                delete from.opacity;
		              }
		            }
		          }
		          return from;
		        });
		        addClass(target, targetClass);
		        children$1.forEach(function (el, i) {
		          return propsFrom[i] && css(el, propsFrom[i]);
		        });
		        css(target, {
		          height: oldHeight,
		          display: 'block'
		        });
		        scrollTop(window, oldScrollY);
		        return Promise.all(children$1.map(function (el, i) {
		          return ['top', 'left', 'height', 'width'].some(function (prop) {
		            return propsFrom[i][prop] !== propsTo[i][prop];
		          }) && Transition.start(el, propsTo[i], this$1$1.animation, 'ease');
		        }).concat(oldHeight !== newHeight && Transition.start(target, {
		          height: newHeight
		        }, this.animation, 'ease'))).then(function () {
		          children$1.forEach(function (el, i) {
		            return css(el, {
		              display: propsTo[i].opacity === 0 ? 'none' : '',
		              zIndex: ''
		            });
		          });
		          reset(target);
		          this$1$1.$update(target, 'resize');
		          fastdom.flush(); // needed for IE11
		        }, noop);
		      }
		    }
		  };
		  function getProps(el, opacity) {
		    var zIndex = css(el, 'zIndex');
		    return isVisible(el) ? assign({
		      display: '',
		      opacity: opacity ? css(el, 'opacity') : '0',
		      pointerEvents: 'none',
		      position: 'absolute',
		      zIndex: zIndex === 'auto' ? index(el) : zIndex
		    }, getPositionWithMargin(el)) : false;
		  }
		  function reset(el) {
		    css(el.children, {
		      height: '',
		      left: '',
		      opacity: '',
		      pointerEvents: '',
		      position: '',
		      top: '',
		      width: ''
		    });
		    removeClass(el, targetClass);
		    css(el, {
		      height: '',
		      display: ''
		    });
		  }
		  function getPositionWithMargin(el) {
		    var ref = offset(el);
		    var height = ref.height;
		    var width = ref.width;
		    var ref$1 = position(el);
		    var top = ref$1.top;
		    var left = ref$1.left;
		    return {
		      top: top,
		      left: left,
		      height: height,
		      width: width
		    };
		  }
		  var style;
		  function addStyle() {
		    if (style) {
		      return;
		    }
		    style = append(document.head, '<style>').sheet;
		    style.insertRule("." + targetClass + " > * {\n            margin-top: 0 !important;\n            transform: none !important;\n        }", 0);
		  }
		  var filter$1 = {
		    mixins: [Animate],
		    args: 'target',
		    props: {
		      target: Boolean,
		      selActive: Boolean
		    },
		    data: {
		      target: null,
		      selActive: false,
		      attrItem: 'uk-filter-control',
		      cls: 'uk-active',
		      animation: 250
		    },
		    computed: {
		      toggles: {
		        get: function (ref, $el) {
		          ref.attrItem;
		          return $$("[" + this.attrItem + "],[data-" + this.attrItem + "]", $el);
		        },
		        watch: function () {
		          var this$1$1 = this;
		          this.updateState();
		          if (this.selActive !== false) {
		            var actives = $$(this.selActive, this.$el);
		            this.toggles.forEach(function (el) {
		              return toggleClass(el, this$1$1.cls, includes(actives, el));
		            });
		          }
		        },
		        immediate: true
		      },
		      children: {
		        get: function (ref, $el) {
		          var target = ref.target;
		          return $$(target + " > *", $el);
		        },
		        watch: function (list, old) {
		          if (!isEqualList(list, old)) {
		            this.updateState();
		          }
		        }
		      }
		    },
		    events: [{
		      name: 'click',
		      delegate: function () {
		        return "[" + this.attrItem + "],[data-" + this.attrItem + "]";
		      },
		      handler: function (e) {
		        e.preventDefault();
		        this.apply(e.current);
		      }
		    }],
		    methods: {
		      apply: function (el) {
		        this.setState(mergeState(el, this.attrItem, this.getState()));
		      },
		      getState: function () {
		        var this$1$1 = this;
		        return this.toggles.filter(function (item) {
		          return hasClass(item, this$1$1.cls);
		        }).reduce(function (state, el) {
		          return mergeState(el, this$1$1.attrItem, state);
		        }, {
		          filter: {
		            '': ''
		          },
		          sort: []
		        });
		      },
		      setState: function (state, animate) {
		        var this$1$1 = this;
		        if (animate === void 0) animate = true;
		        state = assign({
		          filter: {
		            '': ''
		          },
		          sort: []
		        }, state);
		        trigger(this.$el, 'beforeFilter', [this, state]);
		        this.toggles.forEach(function (el) {
		          return toggleClass(el, this$1$1.cls, !!matchFilter(el, this$1$1.attrItem, state));
		        });
		        Promise.all($$(this.target, this.$el).map(function (target) {
		          var children$1 = children(target);
		          return animate ? this$1$1.animate(function () {
		            return applyState(state, target, children$1);
		          }, target) : applyState(state, target, children$1);
		        })).then(function () {
		          return trigger(this$1$1.$el, 'afterFilter', [this$1$1]);
		        });
		      },
		      updateState: function () {
		        var this$1$1 = this;
		        fastdom.write(function () {
		          return this$1$1.setState(this$1$1.getState(), false);
		        });
		      }
		    }
		  };
		  function getFilter(el, attr) {
		    return parseOptions(data(el, attr), ['filter']);
		  }
		  function applyState(state, target, children) {
		    var selector = getSelector(state);
		    children.forEach(function (el) {
		      return css(el, 'display', selector && !matches(el, selector) ? 'none' : '');
		    });
		    var ref = state.sort;
		    var sort = ref[0];
		    var order = ref[1];
		    if (sort) {
		      var sorted = sortItems(children, sort, order);
		      if (!isEqual(sorted, children)) {
		        append(target, sorted);
		      }
		    }
		  }
		  function mergeState(el, attr, state) {
		    var filterBy = getFilter(el, attr);
		    var filter = filterBy.filter;
		    var group = filterBy.group;
		    var sort = filterBy.sort;
		    var order = filterBy.order;
		    if (order === void 0) order = 'asc';
		    if (filter || isUndefined(sort)) {
		      if (group) {
		        if (filter) {
		          delete state.filter[''];
		          state.filter[group] = filter;
		        } else {
		          delete state.filter[group];
		          if (isEmpty(state.filter) || '' in state.filter) {
		            state.filter = {
		              '': filter || ''
		            };
		          }
		        }
		      } else {
		        state.filter = {
		          '': filter || ''
		        };
		      }
		    }
		    if (!isUndefined(sort)) {
		      state.sort = [sort, order];
		    }
		    return state;
		  }
		  function matchFilter(el, attr, ref) {
		    var stateFilter = ref.filter;
		    if (stateFilter === void 0) stateFilter = {
		      '': ''
		    };
		    var ref_sort = ref.sort;
		    var stateSort = ref_sort[0];
		    var stateOrder = ref_sort[1];
		    var ref$1 = getFilter(el, attr);
		    var filter = ref$1.filter;
		    if (filter === void 0) filter = '';
		    var group = ref$1.group;
		    if (group === void 0) group = '';
		    var sort = ref$1.sort;
		    var order = ref$1.order;
		    if (order === void 0) order = 'asc';
		    return isUndefined(sort) ? group in stateFilter && filter === stateFilter[group] || !filter && group && !(group in stateFilter) && !stateFilter[''] : stateSort === sort && stateOrder === order;
		  }
		  function isEqualList(listA, listB) {
		    return listA.length === listB.length && listA.every(function (el) {
		      return ~listB.indexOf(el);
		    });
		  }
		  function getSelector(ref) {
		    var filter = ref.filter;
		    var selector = '';
		    each(filter, function (value) {
		      return selector += value || '';
		    });
		    return selector;
		  }
		  function sortItems(nodes, sort, order) {
		    return assign([], nodes).sort(function (a, b) {
		      return data(a, sort).localeCompare(data(b, sort), undefined, {
		        numeric: true
		      }) * (order === 'asc' || -1);
		    });
		  }
		  var Animations = {
		    slide: {
		      show: function (dir) {
		        return [{
		          transform: translate(dir * -100)
		        }, {
		          transform: translate()
		        }];
		      },
		      percent: function (current) {
		        return translated(current);
		      },
		      translate: function (percent, dir) {
		        return [{
		          transform: translate(dir * -100 * percent)
		        }, {
		          transform: translate(dir * 100 * (1 - percent))
		        }];
		      }
		    }
		  };
		  function translated(el) {
		    return Math.abs(css(el, 'transform').split(',')[4] / el.offsetWidth) || 0;
		  }
		  function translate(value, unit) {
		    if (value === void 0) value = 0;
		    if (unit === void 0) unit = '%';
		    value += value ? unit : '';
		    return isIE ? "translateX(" + value + ")" : "translate3d(" + value + ", 0, 0)"; // currently not translate3d in IE, translate3d within translate3d does not work while transitioning
		  }

		  function scale3d(value) {
		    return "scale3d(" + value + ", " + value + ", 1)";
		  }
		  var Animations$1 = assign({}, Animations, {
		    fade: {
		      show: function () {
		        return [{
		          opacity: 0
		        }, {
		          opacity: 1
		        }];
		      },
		      percent: function (current) {
		        return 1 - css(current, 'opacity');
		      },
		      translate: function (percent) {
		        return [{
		          opacity: 1 - percent
		        }, {
		          opacity: percent
		        }];
		      }
		    },
		    scale: {
		      show: function () {
		        return [{
		          opacity: 0,
		          transform: scale3d(1 - .2)
		        }, {
		          opacity: 1,
		          transform: scale3d(1)
		        }];
		      },
		      percent: function (current) {
		        return 1 - css(current, 'opacity');
		      },
		      translate: function (percent) {
		        return [{
		          opacity: 1 - percent,
		          transform: scale3d(1 - .2 * percent)
		        }, {
		          opacity: percent,
		          transform: scale3d(1 - .2 + .2 * percent)
		        }];
		      }
		    }
		  });
		  function Transitioner(prev, next, dir, ref) {
		    var animation = ref.animation;
		    var easing = ref.easing;
		    var percent = animation.percent;
		    var translate = animation.translate;
		    var show = animation.show;
		    if (show === void 0) show = noop;
		    var props = show(dir);
		    var deferred = new Deferred();
		    return {
		      dir: dir,
		      show: function (duration, percent, linear) {
		        var this$1$1 = this;
		        if (percent === void 0) percent = 0;
		        var timing = linear ? 'linear' : easing;
		        duration -= Math.round(duration * clamp(percent, -1, 1));
		        this.translate(percent);
		        triggerUpdate(next, 'itemin', {
		          percent: percent,
		          duration: duration,
		          timing: timing,
		          dir: dir
		        });
		        triggerUpdate(prev, 'itemout', {
		          percent: 1 - percent,
		          duration: duration,
		          timing: timing,
		          dir: dir
		        });
		        Promise.all([Transition.start(next, props[1], duration, timing), Transition.start(prev, props[0], duration, timing)]).then(function () {
		          this$1$1.reset();
		          deferred.resolve();
		        }, noop);
		        return deferred.promise;
		      },
		      stop: function () {
		        return Transition.stop([next, prev]);
		      },
		      cancel: function () {
		        Transition.cancel([next, prev]);
		      },
		      reset: function () {
		        for (var prop in props[0]) {
		          css([next, prev], prop, '');
		        }
		      },
		      forward: function (duration, percent) {
		        if (percent === void 0) percent = this.percent();
		        Transition.cancel([next, prev]);
		        return this.show(duration, percent, true);
		      },
		      translate: function (percent) {
		        this.reset();
		        var props = translate(percent, dir);
		        css(next, props[1]);
		        css(prev, props[0]);
		        triggerUpdate(next, 'itemtranslatein', {
		          percent: percent,
		          dir: dir
		        });
		        triggerUpdate(prev, 'itemtranslateout', {
		          percent: 1 - percent,
		          dir: dir
		        });
		      },
		      percent: function () {
		        return percent(prev || next, next, dir);
		      },
		      getDistance: function () {
		        return prev && prev.offsetWidth;
		      }
		    };
		  }
		  function triggerUpdate(el, type, data) {
		    trigger(el, createEvent(type, false, false, data));
		  }
		  var SliderAutoplay = {
		    props: {
		      autoplay: Boolean,
		      autoplayInterval: Number,
		      pauseOnHover: Boolean
		    },
		    data: {
		      autoplay: false,
		      autoplayInterval: 7000,
		      pauseOnHover: true
		    },
		    connected: function () {
		      this.autoplay && this.startAutoplay();
		    },
		    disconnected: function () {
		      this.stopAutoplay();
		    },
		    update: function () {
		      attr(this.slides, 'tabindex', '-1');
		    },
		    events: [{
		      name: 'visibilitychange',
		      el: inBrowser && document,
		      filter: function () {
		        return this.autoplay;
		      },
		      handler: function () {
		        if (document.hidden) {
		          this.stopAutoplay();
		        } else {
		          this.startAutoplay();
		        }
		      }
		    }],
		    methods: {
		      startAutoplay: function () {
		        var this$1$1 = this;
		        this.stopAutoplay();
		        this.interval = setInterval(function () {
		          return (!this$1$1.draggable || !$(':focus', this$1$1.$el)) && (!this$1$1.pauseOnHover || !matches(this$1$1.$el, ':hover')) && !this$1$1.stack.length && this$1$1.show('next');
		        }, this.autoplayInterval);
		      },
		      stopAutoplay: function () {
		        this.interval && clearInterval(this.interval);
		      }
		    }
		  };
		  var SliderDrag = {
		    props: {
		      draggable: Boolean
		    },
		    data: {
		      draggable: true,
		      threshold: 10
		    },
		    created: function () {
		      var this$1$1 = this;
		      ['start', 'move', 'end'].forEach(function (key) {
		        var fn = this$1$1[key];
		        this$1$1[key] = function (e) {
		          var pos = getEventPos(e).x * (isRtl ? -1 : 1);
		          this$1$1.prevPos = pos !== this$1$1.pos ? this$1$1.pos : this$1$1.prevPos;
		          this$1$1.pos = pos;
		          fn(e);
		        };
		      });
		    },
		    events: [{
		      name: pointerDown,
		      delegate: function () {
		        return this.selSlides;
		      },
		      handler: function (e) {
		        if (!this.draggable || !isTouch(e) && hasTextNodesOnly(e.target) || closest(e.target, selInput) || e.button > 0 || this.length < 2) {
		          return;
		        }
		        this.start(e);
		      }
		    }, {
		      name: 'dragstart',
		      handler: function (e) {
		        e.preventDefault();
		      }
		    }],
		    methods: {
		      start: function () {
		        this.drag = this.pos;
		        if (this._transitioner) {
		          this.percent = this._transitioner.percent();
		          this.drag += this._transitioner.getDistance() * this.percent * this.dir;
		          this._transitioner.cancel();
		          this._transitioner.translate(this.percent);
		          this.dragging = true;
		          this.stack = [];
		        } else {
		          this.prevIndex = this.index;
		        }

		        // See above workaround notice
		        on(document, pointerMove, this.move, {
		          passive: false
		        });
		        on(document, pointerUp + " " + pointerCancel, this.end, true);
		        css(this.list, 'userSelect', 'none');
		      },
		      move: function (e) {
		        var this$1$1 = this;
		        var distance = this.pos - this.drag;
		        if (distance === 0 || this.prevPos === this.pos || !this.dragging && Math.abs(distance) < this.threshold) {
		          return;
		        }
		        css(this.list, 'pointerEvents', 'none');
		        e.cancelable && e.preventDefault();
		        this.dragging = true;
		        this.dir = distance < 0 ? 1 : -1;
		        var ref = this;
		        var slides = ref.slides;
		        var ref$1 = this;
		        var prevIndex = ref$1.prevIndex;
		        var dis = Math.abs(distance);
		        var nextIndex = this.getIndex(prevIndex + this.dir, prevIndex);
		        var width = this._getDistance(prevIndex, nextIndex) || slides[prevIndex].offsetWidth;
		        while (nextIndex !== prevIndex && dis > width) {
		          this.drag -= width * this.dir;
		          prevIndex = nextIndex;
		          dis -= width;
		          nextIndex = this.getIndex(prevIndex + this.dir, prevIndex);
		          width = this._getDistance(prevIndex, nextIndex) || slides[prevIndex].offsetWidth;
		        }
		        this.percent = dis / width;
		        var prev = slides[prevIndex];
		        var next = slides[nextIndex];
		        var changed = this.index !== nextIndex;
		        var edge = prevIndex === nextIndex;
		        var itemShown;
		        [this.index, this.prevIndex].filter(function (i) {
		          return !includes([nextIndex, prevIndex], i);
		        }).forEach(function (i) {
		          trigger(slides[i], 'itemhidden', [this$1$1]);
		          if (edge) {
		            itemShown = true;
		            this$1$1.prevIndex = prevIndex;
		          }
		        });
		        if (this.index === prevIndex && this.prevIndex !== prevIndex || itemShown) {
		          trigger(slides[this.index], 'itemshown', [this]);
		        }
		        if (changed) {
		          this.prevIndex = prevIndex;
		          this.index = nextIndex;
		          !edge && trigger(prev, 'beforeitemhide', [this]);
		          trigger(next, 'beforeitemshow', [this]);
		        }
		        this._transitioner = this._translate(Math.abs(this.percent), prev, !edge && next);
		        if (changed) {
		          !edge && trigger(prev, 'itemhide', [this]);
		          trigger(next, 'itemshow', [this]);
		        }
		      },
		      end: function () {
		        off(document, pointerMove, this.move, {
		          passive: false
		        });
		        off(document, pointerUp + " " + pointerCancel, this.end, true);
		        if (this.dragging) {
		          this.dragging = null;
		          if (this.index === this.prevIndex) {
		            this.percent = 1 - this.percent;
		            this.dir *= -1;
		            this._show(false, this.index, true);
		            this._transitioner = null;
		          } else {
		            var dirChange = (isRtl ? this.dir * (isRtl ? 1 : -1) : this.dir) < 0 === this.prevPos > this.pos;
		            this.index = dirChange ? this.index : this.prevIndex;
		            if (dirChange) {
		              this.percent = 1 - this.percent;
		            }
		            this.show(this.dir > 0 && !dirChange || this.dir < 0 && dirChange ? 'next' : 'previous', true);
		          }
		        }
		        css(this.list, {
		          userSelect: '',
		          pointerEvents: ''
		        });
		        this.drag = this.percent = null;
		      }
		    }
		  };
		  function hasTextNodesOnly(el) {
		    return !el.children.length && el.childNodes.length;
		  }
		  var SliderNav = {
		    data: {
		      selNav: false
		    },
		    computed: {
		      nav: function (ref, $el) {
		        var selNav = ref.selNav;
		        return $(selNav, $el);
		      },
		      selNavItem: function (ref) {
		        var attrItem = ref.attrItem;
		        return "[" + attrItem + "],[data-" + attrItem + "]";
		      },
		      navItems: function (_, $el) {
		        return $$(this.selNavItem, $el);
		      }
		    },
		    update: {
		      write: function () {
		        var this$1$1 = this;
		        if (this.nav && this.length !== this.nav.children.length) {
		          html(this.nav, this.slides.map(function (_, i) {
		            return "<li " + this$1$1.attrItem + "=\"" + i + "\"><a href></a></li>";
		          }).join(''));
		        }
		        toggleClass($$(this.selNavItem, this.$el).concat(this.nav), 'uk-hidden', !this.maxIndex);
		        this.updateNav();
		      },
		      events: ['resize']
		    },
		    events: [{
		      name: 'click',
		      delegate: function () {
		        return this.selNavItem;
		      },
		      handler: function (e) {
		        e.preventDefault();
		        this.show(data(e.current, this.attrItem));
		      }
		    }, {
		      name: 'itemshow',
		      handler: 'updateNav'
		    }],
		    methods: {
		      updateNav: function () {
		        var this$1$1 = this;
		        var i = this.getValidIndex();
		        this.navItems.forEach(function (el) {
		          var cmd = data(el, this$1$1.attrItem);
		          toggleClass(el, this$1$1.clsActive, toNumber(cmd) === i);
		          toggleClass(el, 'uk-invisible', this$1$1.finite && (cmd === 'previous' && i === 0 || cmd === 'next' && i >= this$1$1.maxIndex));
		        });
		      }
		    }
		  };
		  var Slider = {
		    mixins: [SliderAutoplay, SliderDrag, SliderNav],
		    props: {
		      clsActivated: Boolean,
		      easing: String,
		      index: Number,
		      finite: Boolean,
		      velocity: Number,
		      selSlides: String
		    },
		    data: function () {
		      return {
		        easing: 'ease',
		        finite: false,
		        velocity: 1,
		        index: 0,
		        prevIndex: -1,
		        stack: [],
		        percent: 0,
		        clsActive: 'uk-active',
		        clsActivated: false,
		        Transitioner: false,
		        transitionOptions: {}
		      };
		    },
		    connected: function () {
		      this.prevIndex = -1;
		      this.index = this.getValidIndex(this.index);
		      this.stack = [];
		    },
		    disconnected: function () {
		      removeClass(this.slides, this.clsActive);
		    },
		    computed: {
		      duration: function (ref, $el) {
		        var velocity = ref.velocity;
		        return speedUp($el.offsetWidth / velocity);
		      },
		      list: function (ref, $el) {
		        var selList = ref.selList;
		        return $(selList, $el);
		      },
		      maxIndex: function () {
		        return this.length - 1;
		      },
		      selSlides: function (ref) {
		        var selList = ref.selList;
		        var selSlides = ref.selSlides;
		        return selList + " " + (selSlides || '> *');
		      },
		      slides: {
		        get: function () {
		          return $$(this.selSlides, this.$el);
		        },
		        watch: function () {
		          this.$reset();
		        }
		      },
		      length: function () {
		        return this.slides.length;
		      }
		    },
		    events: {
		      itemshown: function () {
		        this.$update(this.list);
		      }
		    },
		    methods: {
		      show: function (index, force) {
		        var this$1$1 = this;
		        if (force === void 0) force = false;
		        if (this.dragging || !this.length) {
		          return;
		        }
		        var ref = this;
		        var stack = ref.stack;
		        var queueIndex = force ? 0 : stack.length;
		        var reset = function () {
		          stack.splice(queueIndex, 1);
		          if (stack.length) {
		            this$1$1.show(stack.shift(), true);
		          }
		        };
		        stack[force ? 'unshift' : 'push'](index);
		        if (!force && stack.length > 1) {
		          if (stack.length === 2) {
		            this._transitioner.forward(Math.min(this.duration, 200));
		          }
		          return;
		        }
		        var prevIndex = this.getIndex(this.index);
		        var prev = hasClass(this.slides, this.clsActive) && this.slides[prevIndex];
		        var nextIndex = this.getIndex(index, this.index);
		        var next = this.slides[nextIndex];
		        if (prev === next) {
		          reset();
		          return;
		        }
		        this.dir = getDirection(index, prevIndex);
		        this.prevIndex = prevIndex;
		        this.index = nextIndex;
		        if (prev && !trigger(prev, 'beforeitemhide', [this]) || !trigger(next, 'beforeitemshow', [this, prev])) {
		          this.index = this.prevIndex;
		          reset();
		          return;
		        }
		        var promise = this._show(prev, next, force).then(function () {
		          prev && trigger(prev, 'itemhidden', [this$1$1]);
		          trigger(next, 'itemshown', [this$1$1]);
		          return new Promise(function (resolve) {
		            fastdom.write(function () {
		              stack.shift();
		              if (stack.length) {
		                this$1$1.show(stack.shift(), true);
		              } else {
		                this$1$1._transitioner = null;
		              }
		              resolve();
		            });
		          });
		        });
		        prev && trigger(prev, 'itemhide', [this]);
		        trigger(next, 'itemshow', [this]);
		        return promise;
		      },
		      getIndex: function (index, prev) {
		        if (index === void 0) index = this.index;
		        if (prev === void 0) prev = this.index;
		        return clamp(getIndex(index, this.slides, prev, this.finite), 0, this.maxIndex);
		      },
		      getValidIndex: function (index, prevIndex) {
		        if (index === void 0) index = this.index;
		        if (prevIndex === void 0) prevIndex = this.prevIndex;
		        return this.getIndex(index, prevIndex);
		      },
		      _show: function (prev, next, force) {
		        this._transitioner = this._getTransitioner(prev, next, this.dir, assign({
		          easing: force ? next.offsetWidth < 600 ? 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' /* easeOutQuad */ : 'cubic-bezier(0.165, 0.84, 0.44, 1)' /* easeOutQuart */ : this.easing
		        }, this.transitionOptions));
		        if (!force && !prev) {
		          this._translate(1);
		          return Promise.resolve();
		        }
		        var ref = this.stack;
		        var length = ref.length;
		        return this._transitioner[length > 1 ? 'forward' : 'show'](length > 1 ? Math.min(this.duration, 75 + 75 / (length - 1)) : this.duration, this.percent);
		      },
		      _getDistance: function (prev, next) {
		        return this._getTransitioner(prev, prev !== next && next).getDistance();
		      },
		      _translate: function (percent, prev, next) {
		        if (prev === void 0) prev = this.prevIndex;
		        if (next === void 0) next = this.index;
		        var transitioner = this._getTransitioner(prev !== next ? prev : false, next);
		        transitioner.translate(percent);
		        return transitioner;
		      },
		      _getTransitioner: function (prev, next, dir, options) {
		        if (prev === void 0) prev = this.prevIndex;
		        if (next === void 0) next = this.index;
		        if (dir === void 0) dir = this.dir || 1;
		        if (options === void 0) options = this.transitionOptions;
		        return new this.Transitioner(isNumber(prev) ? this.slides[prev] : prev, isNumber(next) ? this.slides[next] : next, dir * (isRtl ? -1 : 1), options);
		      }
		    }
		  };
		  function getDirection(index, prevIndex) {
		    return index === 'next' ? 1 : index === 'previous' ? -1 : index < prevIndex ? -1 : 1;
		  }
		  function speedUp(x) {
		    return .5 * x + 300; // parabola through (400,500; 600,600; 1800,1200)
		  }

		  var Slideshow = {
		    mixins: [Slider],
		    props: {
		      animation: String
		    },
		    data: {
		      animation: 'slide',
		      clsActivated: 'uk-transition-active',
		      Animations: Animations,
		      Transitioner: Transitioner
		    },
		    computed: {
		      animation: function (ref) {
		        var animation = ref.animation;
		        var Animations = ref.Animations;
		        return assign(Animations[animation] || Animations.slide, {
		          name: animation
		        });
		      },
		      transitionOptions: function () {
		        return {
		          animation: this.animation
		        };
		      }
		    },
		    events: {
		      'itemshow itemhide itemshown itemhidden': function (ref) {
		        var target = ref.target;
		        this.$update(target);
		      },
		      beforeitemshow: function (ref) {
		        var target = ref.target;
		        addClass(target, this.clsActive);
		      },
		      itemshown: function (ref) {
		        var target = ref.target;
		        addClass(target, this.clsActivated);
		      },
		      itemhidden: function (ref) {
		        var target = ref.target;
		        removeClass(target, this.clsActive, this.clsActivated);
		      }
		    }
		  };
		  var LightboxPanel = {
		    mixins: [Container, Modal, Togglable, Slideshow],
		    functional: true,
		    props: {
		      delayControls: Number,
		      preload: Number,
		      videoAutoplay: Boolean,
		      template: String
		    },
		    data: function () {
		      return {
		        preload: 1,
		        videoAutoplay: false,
		        delayControls: 3000,
		        items: [],
		        cls: 'uk-open',
		        clsPage: 'uk-lightbox-page',
		        selList: '.uk-lightbox-items',
		        attrItem: 'uk-lightbox-item',
		        selClose: '.uk-close-large',
		        selCaption: '.uk-lightbox-caption',
		        pauseOnHover: false,
		        velocity: 2,
		        Animations: Animations$1,
		        template: "<div class=\"uk-lightbox uk-overflow-hidden\"> <ul class=\"uk-lightbox-items\"></ul> <div class=\"uk-lightbox-toolbar uk-position-top uk-text-right uk-transition-slide-top uk-transition-opaque\"> <button class=\"uk-lightbox-toolbar-icon uk-close-large\" type=\"button\" uk-close></button> </div> <a class=\"uk-lightbox-button uk-position-center-left uk-position-medium uk-transition-fade\" href uk-slidenav-previous uk-lightbox-item=\"previous\"></a> <a class=\"uk-lightbox-button uk-position-center-right uk-position-medium uk-transition-fade\" href uk-slidenav-next uk-lightbox-item=\"next\"></a> <div class=\"uk-lightbox-toolbar uk-lightbox-caption uk-position-bottom uk-text-center uk-transition-slide-bottom uk-transition-opaque\"></div> </div>"
		      };
		    },
		    created: function () {
		      var $el = $(this.template);
		      var list = $(this.selList, $el);
		      this.items.forEach(function () {
		        return append(list, '<li>');
		      });
		      this.$mount(append(this.container, $el));
		    },
		    computed: {
		      caption: function (ref, $el) {
		        ref.selCaption;
		        return $('.uk-lightbox-caption', $el);
		      }
		    },
		    events: [{
		      name: pointerMove + " " + pointerDown + " keydown",
		      handler: 'showControls'
		    }, {
		      name: 'click',
		      self: true,
		      delegate: function () {
		        return this.selSlides;
		      },
		      handler: function (e) {
		        if (e.defaultPrevented) {
		          return;
		        }
		        this.hide();
		      }
		    }, {
		      name: 'shown',
		      self: true,
		      handler: function () {
		        this.showControls();
		      }
		    }, {
		      name: 'hide',
		      self: true,
		      handler: function () {
		        this.hideControls();
		        removeClass(this.slides, this.clsActive);
		        Transition.stop(this.slides);
		      }
		    }, {
		      name: 'hidden',
		      self: true,
		      handler: function () {
		        this.$destroy(true);
		      }
		    }, {
		      name: 'keyup',
		      el: inBrowser && document,
		      handler: function (e) {
		        if (!this.isToggled(this.$el) || !this.draggable) {
		          return;
		        }
		        switch (e.keyCode) {
		          case 37:
		            this.show('previous');
		            break;
		          case 39:
		            this.show('next');
		            break;
		        }
		      }
		    }, {
		      name: 'beforeitemshow',
		      handler: function (e) {
		        if (this.isToggled()) {
		          return;
		        }
		        this.draggable = false;
		        e.preventDefault();
		        this.toggleElement(this.$el, true, false);
		        this.animation = Animations$1['scale'];
		        removeClass(e.target, this.clsActive);
		        this.stack.splice(1, 0, this.index);
		      }
		    }, {
		      name: 'itemshow',
		      handler: function () {
		        html(this.caption, this.getItem().caption || '');
		        for (var j = -this.preload; j <= this.preload; j++) {
		          this.loadItem(this.index + j);
		        }
		      }
		    }, {
		      name: 'itemshown',
		      handler: function () {
		        this.draggable = this.$props.draggable;
		      }
		    }, {
		      name: 'itemload',
		      handler: function (_, item) {
		        var this$1$1 = this;
		        var src = item.source;
		        var type = item.type;
		        var alt = item.alt;
		        if (alt === void 0) alt = '';
		        var poster = item.poster;
		        var attrs = item.attrs;
		        if (attrs === void 0) attrs = {};
		        this.setItem(item, '<span uk-spinner></span>');
		        if (!src) {
		          return;
		        }
		        var matches;
		        var iframeAttrs = {
		          frameborder: '0',
		          allow: 'autoplay',
		          allowfullscreen: '',
		          style: 'max-width: 100%; box-sizing: border-box;',
		          'uk-responsive': '',
		          'uk-video': "" + this.videoAutoplay
		        };

		        // Image
		        if (type === 'image' || src.match(/\.(jpe?g|png|gif|svg|webp)($|\?)/i)) {
		          getImage(src, attrs.srcset, attrs.size).then(function (ref) {
		            var width = ref.width;
		            var height = ref.height;
		            return this$1$1.setItem(item, createEl('img', assign({
		              src: src,
		              width: width,
		              height: height,
		              alt: alt
		            }, attrs)));
		          }, function () {
		            return this$1$1.setError(item);
		          });

		          // Video
		        } else if (type === 'video' || src.match(/\.(mp4|webm|ogv)($|\?)/i)) {
		          var video = createEl('video', assign({
		            src: src,
		            poster: poster,
		            controls: '',
		            playsinline: '',
		            'uk-video': "" + this.videoAutoplay
		          }, attrs));
		          on(video, 'loadedmetadata', function () {
		            attr(video, {
		              width: video.videoWidth,
		              height: video.videoHeight
		            });
		            this$1$1.setItem(item, video);
		          });
		          on(video, 'error', function () {
		            return this$1$1.setError(item);
		          });

		          // Iframe
		        } else if (type === 'iframe' || src.match(/\.(html|php)($|\?)/i)) {
		          this.setItem(item, createEl('iframe', assign({
		            src: src,
		            frameborder: '0',
		            allowfullscreen: '',
		            class: 'uk-lightbox-iframe'
		          }, attrs)));

		          // YouTube
		        } else if (matches = src.match(/\/\/(?:.*?youtube(-nocookie)?\..*?[?&]v=|youtu\.be\/)([\w-]{11})[&?]?(.*)?/)) {
		          this.setItem(item, createEl('iframe', assign({
		            src: "https://www.youtube" + (matches[1] || '') + ".com/embed/" + matches[2] + (matches[3] ? "?" + matches[3] : ''),
		            width: 1920,
		            height: 1080
		          }, iframeAttrs, attrs)));

		          // Vimeo
		        } else if (matches = src.match(/\/\/.*?vimeo\.[a-z]+\/(\d+)[&?]?(.*)?/)) {
		          ajax("https://vimeo.com/api/oembed.json?maxwidth=1920&url=" + encodeURI(src), {
		            responseType: 'json',
		            withCredentials: false
		          }).then(function (ref) {
		            var ref_response = ref.response;
		            var height = ref_response.height;
		            var width = ref_response.width;
		            return this$1$1.setItem(item, createEl('iframe', assign({
		              src: "https://player.vimeo.com/video/" + matches[1] + (matches[2] ? "?" + matches[2] : ''),
		              width: width,
		              height: height
		            }, iframeAttrs, attrs)));
		          }, function () {
		            return this$1$1.setError(item);
		          });
		        }
		      }
		    }],
		    methods: {
		      loadItem: function (index) {
		        if (index === void 0) index = this.index;
		        var item = this.getItem(index);
		        if (!this.getSlide(item).childElementCount) {
		          trigger(this.$el, 'itemload', [item]);
		        }
		      },
		      getItem: function (index) {
		        if (index === void 0) index = this.index;
		        return this.items[getIndex(index, this.slides)];
		      },
		      setItem: function (item, content) {
		        trigger(this.$el, 'itemloaded', [this, html(this.getSlide(item), content)]);
		      },
		      getSlide: function (item) {
		        return this.slides[this.items.indexOf(item)];
		      },
		      setError: function (item) {
		        this.setItem(item, '<span uk-icon="icon: bolt; ratio: 2"></span>');
		      },
		      showControls: function () {
		        clearTimeout(this.controlsTimer);
		        this.controlsTimer = setTimeout(this.hideControls, this.delayControls);
		        addClass(this.$el, 'uk-active', 'uk-transition-active');
		      },
		      hideControls: function () {
		        removeClass(this.$el, 'uk-active', 'uk-transition-active');
		      }
		    }
		  };
		  function createEl(tag, attrs) {
		    var el = fragment("<" + tag + ">");
		    attr(el, attrs);
		    return el;
		  }
		  var lightbox = {
		    install: install$2,
		    props: {
		      toggle: String
		    },
		    data: {
		      toggle: 'a'
		    },
		    computed: {
		      toggles: {
		        get: function (ref, $el) {
		          var toggle = ref.toggle;
		          return $$(toggle, $el);
		        },
		        watch: function () {
		          this.hide();
		        }
		      }
		    },
		    disconnected: function () {
		      this.hide();
		    },
		    events: [{
		      name: 'click',
		      delegate: function () {
		        return this.toggle + ":not(.uk-disabled)";
		      },
		      handler: function (e) {
		        e.preventDefault();
		        this.show(e.current);
		      }
		    }],
		    methods: {
		      show: function (index) {
		        var this$1$1 = this;
		        var items = uniqueBy(this.toggles.map(toItem), 'source');
		        if (isElement(index)) {
		          var ref = toItem(index);
		          var source = ref.source;
		          index = findIndex(items, function (ref) {
		            var src = ref.source;
		            return source === src;
		          });
		        }
		        this.panel = this.panel || this.$create('lightboxPanel', assign({}, this.$props, {
		          items: items
		        }));
		        on(this.panel.$el, 'hidden', function () {
		          return this$1$1.panel = false;
		        });
		        return this.panel.show(index);
		      },
		      hide: function () {
		        return this.panel && this.panel.hide();
		      }
		    }
		  };
		  function install$2(UIkit, Lightbox) {
		    if (!UIkit.lightboxPanel) {
		      UIkit.component('lightboxPanel', LightboxPanel);
		    }
		    assign(Lightbox.props, UIkit.component('lightboxPanel').options.props);
		  }
		  function toItem(el) {
		    var item = {};
		    ['href', 'caption', 'type', 'poster', 'alt', 'attrs'].forEach(function (attr) {
		      item[attr === 'href' ? 'source' : attr] = data(el, attr);
		    });
		    item.attrs = parseOptions(item.attrs);
		    return item;
		  }
		  var obj;
		  var notification = {
		    functional: true,
		    args: ['message', 'status'],
		    data: {
		      message: '',
		      status: '',
		      timeout: 5000,
		      group: null,
		      pos: 'top-center',
		      clsContainer: 'uk-notification',
		      clsClose: 'uk-notification-close',
		      clsMsg: 'uk-notification-message'
		    },
		    install: install$3,
		    computed: {
		      marginProp: function (ref) {
		        var pos = ref.pos;
		        return "margin" + (startsWith(pos, 'top') ? 'Top' : 'Bottom');
		      },
		      startProps: function () {
		        var obj;
		        return obj = {
		          opacity: 0
		        }, obj[this.marginProp] = -this.$el.offsetHeight, obj;
		      }
		    },
		    created: function () {
		      var container = $("." + this.clsContainer + "-" + this.pos, this.$container) || append(this.$container, "<div class=\"" + this.clsContainer + " " + this.clsContainer + "-" + this.pos + "\" style=\"display: block\"></div>");
		      this.$mount(append(container, "<div class=\"" + this.clsMsg + (this.status ? " " + this.clsMsg + "-" + this.status : '') + "\"> <a href class=\"" + this.clsClose + "\" data-uk-close></a> <div>" + this.message + "</div> </div>"));
		    },
		    connected: function () {
		      var this$1$1 = this;
		      var obj;
		      var margin = toFloat(css(this.$el, this.marginProp));
		      Transition.start(css(this.$el, this.startProps), (obj = {
		        opacity: 1
		      }, obj[this.marginProp] = margin, obj)).then(function () {
		        if (this$1$1.timeout) {
		          this$1$1.timer = setTimeout(this$1$1.close, this$1$1.timeout);
		        }
		      });
		    },
		    events: (obj = {
		      click: function (e) {
		        if (closest(e.target, 'a[href="#"],a[href=""]')) {
		          e.preventDefault();
		        }
		        this.close();
		      }
		    }, obj[pointerEnter] = function () {
		      if (this.timer) {
		        clearTimeout(this.timer);
		      }
		    }, obj[pointerLeave] = function () {
		      if (this.timeout) {
		        this.timer = setTimeout(this.close, this.timeout);
		      }
		    }, obj),
		    methods: {
		      close: function (immediate) {
		        var this$1$1 = this;
		        var removeFn = function () {
		          var container = this$1$1.$el.parentNode;
		          trigger(this$1$1.$el, 'close', [this$1$1]);
		          remove(this$1$1.$el);
		          if (container && !container.hasChildNodes()) {
		            remove(container);
		          }
		        };
		        if (this.timer) {
		          clearTimeout(this.timer);
		        }
		        if (immediate) {
		          removeFn();
		        } else {
		          Transition.start(this.$el, this.startProps).then(removeFn);
		        }
		      }
		    }
		  };
		  function install$3(UIkit) {
		    UIkit.notification.closeAll = function (group, immediate) {
		      apply(document.body, function (el) {
		        var notification = UIkit.getComponent(el, 'notification');
		        if (notification && (!group || group === notification.group)) {
		          notification.close(immediate);
		        }
		      });
		    };
		  }
		  var props = ['x', 'y', 'bgx', 'bgy', 'rotate', 'scale', 'color', 'backgroundColor', 'borderColor', 'opacity', 'blur', 'hue', 'grayscale', 'invert', 'saturate', 'sepia', 'fopacity', 'stroke'];
		  var Parallax = {
		    mixins: [Media],
		    props: props.reduce(function (props, prop) {
		      props[prop] = 'list';
		      return props;
		    }, {}),
		    data: props.reduce(function (data, prop) {
		      data[prop] = undefined;
		      return data;
		    }, {}),
		    computed: {
		      props: function (properties, $el) {
		        var this$1$1 = this;
		        return props.reduce(function (props, prop) {
		          if (isUndefined(properties[prop])) {
		            return props;
		          }
		          var isColor = prop.match(/color/i);
		          var isCssProp = isColor || prop === 'opacity';
		          var pos, bgPos, diff;
		          var steps = properties[prop].slice(0);
		          if (isCssProp) {
		            css($el, prop, '');
		          }
		          if (steps.length < 2) {
		            steps.unshift((prop === 'scale' ? 1 : isCssProp ? css($el, prop) : 0) || 0);
		          }
		          var unit = getUnit(steps);
		          if (isColor) {
		            var ref = $el.style;
		            var color = ref.color;
		            steps = steps.map(function (step) {
		              return parseColor($el, step);
		            });
		            $el.style.color = color;
		          } else if (startsWith(prop, 'bg')) {
		            var attr = prop === 'bgy' ? 'height' : 'width';
		            steps = steps.map(function (step) {
		              return toPx(step, attr, this$1$1.$el);
		            });
		            css($el, "background-position-" + prop[2], '');
		            bgPos = css($el, 'backgroundPosition').split(' ')[prop[2] === 'x' ? 0 : 1]; // IE 11 can't read background-position-[x|y]

		            if (this$1$1.covers) {
		              var min = Math.min.apply(Math, steps);
		              var max = Math.max.apply(Math, steps);
		              var down = steps.indexOf(min) < steps.indexOf(max);
		              diff = max - min;
		              steps = steps.map(function (step) {
		                return step - (down ? min : max);
		              });
		              pos = (down ? -diff : 0) + "px";
		            } else {
		              pos = bgPos;
		            }
		          } else {
		            steps = steps.map(toFloat);
		          }
		          if (prop === 'stroke') {
		            if (!steps.some(function (step) {
		              return step;
		            })) {
		              return props;
		            }
		            var length = getMaxPathLength(this$1$1.$el);
		            css($el, 'strokeDasharray', length);
		            if (unit === '%') {
		              steps = steps.map(function (step) {
		                return step * length / 100;
		              });
		            }
		            steps = steps.reverse();
		            prop = 'strokeDashoffset';
		          }
		          props[prop] = {
		            steps: steps,
		            unit: unit,
		            pos: pos,
		            bgPos: bgPos,
		            diff: diff
		          };
		          return props;
		        }, {});
		      },
		      bgProps: function () {
		        var this$1$1 = this;
		        return ['bgx', 'bgy'].filter(function (bg) {
		          return bg in this$1$1.props;
		        });
		      },
		      covers: function (_, $el) {
		        return covers($el);
		      }
		    },
		    disconnected: function () {
		      delete this._image;
		    },
		    update: {
		      read: function (data) {
		        var this$1$1 = this;
		        data.active = this.matchMedia;
		        if (!data.active) {
		          return;
		        }
		        if (!data.image && this.covers && this.bgProps.length) {
		          var src = css(this.$el, 'backgroundImage').replace(/^none|url\(["']?(.+?)["']?\)$/, '$1');
		          if (src) {
		            var img = new Image();
		            img.src = src;
		            data.image = img;
		            if (!img.naturalWidth) {
		              img.onload = function () {
		                return this$1$1.$update();
		              };
		            }
		          }
		        }
		        var image = data.image;
		        if (!image || !image.naturalWidth) {
		          return;
		        }
		        var dimEl = {
		          width: this.$el.offsetWidth,
		          height: this.$el.offsetHeight
		        };
		        var dimImage = {
		          width: image.naturalWidth,
		          height: image.naturalHeight
		        };
		        var dim = Dimensions.cover(dimImage, dimEl);
		        this.bgProps.forEach(function (prop) {
		          var ref = this$1$1.props[prop];
		          var diff = ref.diff;
		          var bgPos = ref.bgPos;
		          var steps = ref.steps;
		          var attr = prop === 'bgy' ? 'height' : 'width';
		          var span = dim[attr] - dimEl[attr];
		          if (span < diff) {
		            dimEl[attr] = dim[attr] + diff - span;
		          } else if (span > diff) {
		            var posPercentage = dimEl[attr] / toPx(bgPos, attr, this$1$1.$el);
		            if (posPercentage) {
		              this$1$1.props[prop].steps = steps.map(function (step) {
		                return step - (span - diff) / posPercentage;
		              });
		            }
		          }
		          dim = Dimensions.cover(dimImage, dimEl);
		        });
		        data.dim = dim;
		      },
		      write: function (ref) {
		        var dim = ref.dim;
		        var active = ref.active;
		        if (!active) {
		          css(this.$el, {
		            backgroundSize: '',
		            backgroundRepeat: ''
		          });
		          return;
		        }
		        dim && css(this.$el, {
		          backgroundSize: dim.width + "px " + dim.height + "px",
		          backgroundRepeat: 'no-repeat'
		        });
		      },
		      events: ['resize']
		    },
		    methods: {
		      reset: function () {
		        var this$1$1 = this;
		        each(this.getCss(0), function (_, prop) {
		          return css(this$1$1.$el, prop, '');
		        });
		      },
		      getCss: function (percent) {
		        var ref = this;
		        var props = ref.props;
		        return Object.keys(props).reduce(function (css, prop) {
		          var ref = props[prop];
		          var steps = ref.steps;
		          var unit = ref.unit;
		          var pos = ref.pos;
		          var value = getValue(steps, percent);
		          switch (prop) {
		            // transforms
		            case 'x':
		            case 'y':
		              {
		                unit = unit || 'px';
		                css.transform += " translate" + ucfirst(prop) + "(" + toFloat(value).toFixed(unit === 'px' ? 0 : 2) + unit + ")";
		                break;
		              }
		            case 'rotate':
		              unit = unit || 'deg';
		              css.transform += " rotate(" + (value + unit) + ")";
		              break;
		            case 'scale':
		              css.transform += " scale(" + value + ")";
		              break;

		            // bg image
		            case 'bgy':
		            case 'bgx':
		              css["background-position-" + prop[2]] = "calc(" + pos + " + " + value + "px)";
		              break;

		            // color
		            case 'color':
		            case 'backgroundColor':
		            case 'borderColor':
		              {
		                var ref$1 = getStep(steps, percent);
		                var start = ref$1[0];
		                var end = ref$1[1];
		                var p = ref$1[2];
		                css[prop] = "rgba(" + start.map(function (value, i) {
		                  value = value + p * (end[i] - value);
		                  return i === 3 ? toFloat(value) : parseInt(value, 10);
		                }).join(',') + ")";
		                break;
		              }
		            // CSS Filter
		            case 'blur':
		              unit = unit || 'px';
		              css.filter += " blur(" + (value + unit) + ")";
		              break;
		            case 'hue':
		              unit = unit || 'deg';
		              css.filter += " hue-rotate(" + (value + unit) + ")";
		              break;
		            case 'fopacity':
		              unit = unit || '%';
		              css.filter += " opacity(" + (value + unit) + ")";
		              break;
		            case 'grayscale':
		            case 'invert':
		            case 'saturate':
		            case 'sepia':
		              unit = unit || '%';
		              css.filter += " " + prop + "(" + (value + unit) + ")";
		              break;
		            default:
		              css[prop] = value;
		          }
		          return css;
		        }, {
		          transform: '',
		          filter: ''
		        });
		      }
		    }
		  };
		  function parseColor(el, color) {
		    return css(css(el, 'color', color), 'color').split(/[(),]/g).slice(1, -1).concat(1).slice(0, 4).map(toFloat);
		  }
		  function getStep(steps, percent) {
		    var count = steps.length - 1;
		    var index = Math.min(Math.floor(count * percent), count - 1);
		    var step = steps.slice(index, index + 2);
		    step.push(percent === 1 ? 1 : percent % (1 / count) * count);
		    return step;
		  }
		  function getValue(steps, percent, digits) {
		    if (digits === void 0) digits = 2;
		    var ref = getStep(steps, percent);
		    var start = ref[0];
		    var end = ref[1];
		    var p = ref[2];
		    return (isNumber(start) ? start + Math.abs(start - end) * p * (start < end ? 1 : -1) : +end).toFixed(digits);
		  }
		  function getUnit(steps) {
		    return steps.reduce(function (unit, step) {
		      return isString(step) && step.replace(/-|\d/g, '').trim() || unit;
		    }, '');
		  }
		  function covers(el) {
		    var ref = el.style;
		    var backgroundSize = ref.backgroundSize;
		    var covers = css(css(el, 'backgroundSize', ''), 'backgroundSize') === 'cover';
		    el.style.backgroundSize = backgroundSize;
		    return covers;
		  }
		  var parallax = {
		    mixins: [Parallax],
		    props: {
		      target: String,
		      viewport: Number,
		      easing: Number
		    },
		    data: {
		      target: false,
		      viewport: 1,
		      easing: 1
		    },
		    computed: {
		      target: function (ref, $el) {
		        var target = ref.target;
		        return getOffsetElement(target && query(target, $el) || $el);
		      }
		    },
		    update: {
		      read: function (ref, type) {
		        var percent = ref.percent;
		        var active = ref.active;
		        if (type !== 'scroll') {
		          percent = false;
		        }
		        if (!active) {
		          return;
		        }
		        var prev = percent;
		        percent = ease(scrolledOver(this.target) / (this.viewport || 1), this.easing);
		        return {
		          percent: percent,
		          style: prev !== percent ? this.getCss(percent) : false
		        };
		      },
		      write: function (ref) {
		        var style = ref.style;
		        var active = ref.active;
		        if (!active) {
		          this.reset();
		          return;
		        }
		        style && css(this.$el, style);
		      },
		      events: ['scroll', 'resize']
		    }
		  };
		  function ease(percent, easing) {
		    return clamp(percent * (1 - (easing - easing * percent)));
		  }

		  // SVG elements do not inherit from HTMLElement
		  function getOffsetElement(el) {
		    return el ? 'offsetTop' in el ? el : getOffsetElement(el.parentNode) : document.body;
		  }
		  var SliderReactive = {
		    update: {
		      write: function () {
		        if (this.stack.length || this.dragging) {
		          return;
		        }
		        var index = this.getValidIndex(this.index);
		        if (!~this.prevIndex || this.index !== index) {
		          this.show(index);
		        }
		      },
		      events: ['resize']
		    }
		  };
		  function Transitioner$1(prev, next, dir, ref) {
		    var center = ref.center;
		    var easing = ref.easing;
		    var list = ref.list;
		    var deferred = new Deferred();
		    var from = prev ? getLeft(prev, list, center) : getLeft(next, list, center) + offset(next).width * dir;
		    var to = next ? getLeft(next, list, center) : from + offset(prev).width * dir * (isRtl ? -1 : 1);
		    return {
		      dir: dir,
		      show: function (duration, percent, linear) {
		        if (percent === void 0) percent = 0;
		        var timing = linear ? 'linear' : easing;
		        duration -= Math.round(duration * clamp(percent, -1, 1));
		        this.translate(percent);
		        prev && this.updateTranslates();
		        percent = prev ? percent : clamp(percent, 0, 1);
		        triggerUpdate$1(this.getItemIn(), 'itemin', {
		          percent: percent,
		          duration: duration,
		          timing: timing,
		          dir: dir
		        });
		        prev && triggerUpdate$1(this.getItemIn(true), 'itemout', {
		          percent: 1 - percent,
		          duration: duration,
		          timing: timing,
		          dir: dir
		        });

		        // Workaround for a bug in iOS Safari 14.0 which does not let you transition to the same value twice
		        var randomOffset = index(next) / 10000;
		        Transition.start(list, {
		          transform: translate((-to + randomOffset) * (isRtl ? -1 : 1), 'px')
		        }, duration, timing).then(deferred.resolve, noop);
		        return deferred.promise;
		      },
		      stop: function () {
		        return Transition.stop(list);
		      },
		      cancel: function () {
		        Transition.cancel(list);
		      },
		      reset: function () {
		        css(list, 'transform', '');
		      },
		      forward: function (duration, percent) {
		        if (percent === void 0) percent = this.percent();
		        Transition.cancel(list);
		        return this.show(duration, percent, true);
		      },
		      translate: function (percent) {
		        var distance = this.getDistance() * dir * (isRtl ? -1 : 1);
		        css(list, 'transform', translate(clamp(-to + (distance - distance * percent), -getWidth(list), offset(list).width) * (isRtl ? -1 : 1), 'px'));
		        this.updateTranslates();
		        if (prev) {
		          percent = clamp(percent, -1, 1);
		          triggerUpdate$1(this.getItemIn(), 'itemtranslatein', {
		            percent: percent,
		            dir: dir
		          });
		          triggerUpdate$1(this.getItemIn(true), 'itemtranslateout', {
		            percent: 1 - percent,
		            dir: dir
		          });
		        }
		      },
		      percent: function () {
		        return Math.abs((css(list, 'transform').split(',')[4] * (isRtl ? -1 : 1) + from) / (to - from));
		      },
		      getDistance: function () {
		        return Math.abs(to - from);
		      },
		      getItemIn: function (out) {
		        if (out === void 0) out = false;
		        var actives = this.getActives();
		        var all = sortBy(slides(list), 'offsetLeft');
		        var i = index(all, actives[dir * (out ? -1 : 1) > 0 ? actives.length - 1 : 0]);
		        return ~i && all[i + (prev && !out ? dir : 0)];
		      },
		      getActives: function () {
		        var left = getLeft(prev || next, list, center);
		        return sortBy(slides(list).filter(function (slide) {
		          var slideLeft = getElLeft(slide, list);
		          return slideLeft >= left && slideLeft + offset(slide).width <= offset(list).width + left;
		        }), 'offsetLeft');
		      },
		      updateTranslates: function () {
		        var actives = this.getActives();
		        slides(list).forEach(function (slide) {
		          var isActive = includes(actives, slide);
		          triggerUpdate$1(slide, "itemtranslate" + (isActive ? 'in' : 'out'), {
		            percent: isActive ? 1 : 0,
		            dir: slide.offsetLeft <= next.offsetLeft ? 1 : -1
		          });
		        });
		      }
		    };
		  }
		  function getLeft(el, list, center) {
		    var left = getElLeft(el, list);
		    return center ? left - centerEl(el, list) : Math.min(left, getMax(list));
		  }
		  function getMax(list) {
		    return Math.max(0, getWidth(list) - offset(list).width);
		  }
		  function getWidth(list) {
		    return slides(list).reduce(function (right, el) {
		      return offset(el).width + right;
		    }, 0);
		  }
		  function getMaxWidth(list) {
		    return slides(list).reduce(function (right, el) {
		      return Math.max(right, offset(el).width);
		    }, 0);
		  }
		  function centerEl(el, list) {
		    return offset(list).width / 2 - offset(el).width / 2;
		  }
		  function getElLeft(el, list) {
		    return (position(el).left + (isRtl ? offset(el).width - offset(list).width : 0)) * (isRtl ? -1 : 1);
		  }
		  function triggerUpdate$1(el, type, data) {
		    trigger(el, createEvent(type, false, false, data));
		  }
		  function slides(list) {
		    return children(list);
		  }
		  var slider = {
		    mixins: [Class, Slider, SliderReactive],
		    props: {
		      center: Boolean,
		      sets: Boolean
		    },
		    data: {
		      center: false,
		      sets: false,
		      attrItem: 'uk-slider-item',
		      selList: '.uk-slider-items',
		      selNav: '.uk-slider-nav',
		      clsContainer: 'uk-slider-container',
		      Transitioner: Transitioner$1
		    },
		    computed: {
		      avgWidth: function () {
		        return getWidth(this.list) / this.length;
		      },
		      finite: function (ref) {
		        var finite = ref.finite;
		        return finite || Math.ceil(getWidth(this.list)) < offset(this.list).width + getMaxWidth(this.list) + this.center;
		      },
		      maxIndex: function () {
		        if (!this.finite || this.center && !this.sets) {
		          return this.length - 1;
		        }
		        if (this.center) {
		          return last(this.sets);
		        }
		        css(this.slides, 'order', '');
		        var max = getMax(this.list);
		        var i = this.length;
		        while (i--) {
		          if (getElLeft(this.list.children[i], this.list) < max) {
		            return Math.min(i + 1, this.length - 1);
		          }
		        }
		        return 0;
		      },
		      sets: function (ref) {
		        var this$1$1 = this;
		        var sets = ref.sets;
		        var width = offset(this.list).width / (this.center ? 2 : 1);
		        var left = 0;
		        var leftCenter = width;
		        var slideLeft = 0;
		        sets = sets && this.slides.reduce(function (sets, slide, i) {
		          var ref = offset(slide);
		          var slideWidth = ref.width;
		          var slideRight = slideLeft + slideWidth;
		          if (slideRight > left) {
		            if (!this$1$1.center && i > this$1$1.maxIndex) {
		              i = this$1$1.maxIndex;
		            }
		            if (!includes(sets, i)) {
		              var cmp = this$1$1.slides[i + 1];
		              if (this$1$1.center && cmp && slideWidth < leftCenter - offset(cmp).width / 2) {
		                leftCenter -= slideWidth;
		              } else {
		                leftCenter = width;
		                sets.push(i);
		                left = slideLeft + width + (this$1$1.center ? slideWidth / 2 : 0);
		              }
		            }
		          }
		          slideLeft += slideWidth;
		          return sets;
		        }, []);
		        return !isEmpty(sets) && sets;
		      },
		      transitionOptions: function () {
		        return {
		          center: this.center,
		          list: this.list
		        };
		      }
		    },
		    connected: function () {
		      toggleClass(this.$el, this.clsContainer, !$("." + this.clsContainer, this.$el));
		    },
		    update: {
		      write: function () {
		        var this$1$1 = this;
		        $$("[" + this.attrItem + "],[data-" + this.attrItem + "]", this.$el).forEach(function (el) {
		          var index = data(el, this$1$1.attrItem);
		          this$1$1.maxIndex && toggleClass(el, 'uk-hidden', isNumeric(index) && (this$1$1.sets && !includes(this$1$1.sets, toFloat(index)) || index > this$1$1.maxIndex));
		        });
		        if (this.length && !this.dragging && !this.stack.length) {
		          this.reorder();
		          this._translate(1);
		        }
		        var actives = this._getTransitioner(this.index).getActives();
		        this.slides.forEach(function (slide) {
		          return toggleClass(slide, this$1$1.clsActive, includes(actives, slide));
		        });
		        (!this.sets || includes(this.sets, toFloat(this.index))) && this.slides.forEach(function (slide) {
		          return toggleClass(slide, this$1$1.clsActivated, includes(actives, slide));
		        });
		      },
		      events: ['resize']
		    },
		    events: {
		      beforeitemshow: function (e) {
		        if (!this.dragging && this.sets && this.stack.length < 2 && !includes(this.sets, this.index)) {
		          this.index = this.getValidIndex();
		        }
		        var diff = Math.abs(this.index - this.prevIndex + (this.dir > 0 && this.index < this.prevIndex || this.dir < 0 && this.index > this.prevIndex ? (this.maxIndex + 1) * this.dir : 0));
		        if (!this.dragging && diff > 1) {
		          for (var i = 0; i < diff; i++) {
		            this.stack.splice(1, 0, this.dir > 0 ? 'next' : 'previous');
		          }
		          e.preventDefault();
		          return;
		        }
		        this.duration = speedUp(this.avgWidth / this.velocity) * (offset(this.dir < 0 || !this.slides[this.prevIndex] ? this.slides[this.index] : this.slides[this.prevIndex]).width / this.avgWidth);
		        this.reorder();
		      },
		      itemshow: function () {
		        ~this.prevIndex && addClass(this._getTransitioner().getItemIn(), this.clsActive);
		      }
		    },
		    methods: {
		      reorder: function () {
		        var this$1$1 = this;
		        if (this.finite) {
		          css(this.slides, 'order', '');
		          return;
		        }
		        var index = this.dir > 0 && this.slides[this.prevIndex] ? this.prevIndex : this.index;
		        this.slides.forEach(function (slide, i) {
		          return css(slide, 'order', this$1$1.dir > 0 && i < index ? 1 : this$1$1.dir < 0 && i >= this$1$1.index ? -1 : '');
		        });
		        if (!this.center) {
		          return;
		        }
		        var next = this.slides[index];
		        var width = offset(this.list).width / 2 - offset(next).width / 2;
		        var j = 0;
		        while (width > 0) {
		          var slideIndex = this.getIndex(--j + index, index);
		          var slide = this.slides[slideIndex];
		          css(slide, 'order', slideIndex > index ? -2 : -1);
		          width -= offset(slide).width;
		        }
		      },
		      getValidIndex: function (index, prevIndex) {
		        if (index === void 0) index = this.index;
		        if (prevIndex === void 0) prevIndex = this.prevIndex;
		        index = this.getIndex(index, prevIndex);
		        if (!this.sets) {
		          return index;
		        }
		        var prev;
		        do {
		          if (includes(this.sets, index)) {
		            return index;
		          }
		          prev = index;
		          index = this.getIndex(index + this.dir, prevIndex);
		        } while (index !== prev);
		        return index;
		      }
		    }
		  };
		  var sliderParallax = {
		    mixins: [Parallax],
		    data: {
		      selItem: '!li'
		    },
		    computed: {
		      item: function (ref, $el) {
		        var selItem = ref.selItem;
		        return query(selItem, $el);
		      }
		    },
		    events: [{
		      name: 'itemshown',
		      self: true,
		      el: function () {
		        return this.item;
		      },
		      handler: function () {
		        css(this.$el, this.getCss(.5));
		      }
		    }, {
		      name: 'itemin itemout',
		      self: true,
		      el: function () {
		        return this.item;
		      },
		      handler: function (ref) {
		        var type = ref.type;
		        var ref_detail = ref.detail;
		        var percent = ref_detail.percent;
		        var duration = ref_detail.duration;
		        var timing = ref_detail.timing;
		        var dir = ref_detail.dir;
		        Transition.cancel(this.$el);
		        css(this.$el, this.getCss(getCurrent(type, dir, percent)));
		        Transition.start(this.$el, this.getCss(isIn(type) ? .5 : dir > 0 ? 1 : 0), duration, timing).catch(noop);
		      }
		    }, {
		      name: 'transitioncanceled transitionend',
		      self: true,
		      el: function () {
		        return this.item;
		      },
		      handler: function () {
		        Transition.cancel(this.$el);
		      }
		    }, {
		      name: 'itemtranslatein itemtranslateout',
		      self: true,
		      el: function () {
		        return this.item;
		      },
		      handler: function (ref) {
		        var type = ref.type;
		        var ref_detail = ref.detail;
		        var percent = ref_detail.percent;
		        var dir = ref_detail.dir;
		        Transition.cancel(this.$el);
		        css(this.$el, this.getCss(getCurrent(type, dir, percent)));
		      }
		    }]
		  };
		  function isIn(type) {
		    return endsWith(type, 'in');
		  }
		  function getCurrent(type, dir, percent) {
		    percent /= 2;
		    return !isIn(type) ? dir < 0 ? percent : 1 - percent : dir < 0 ? 1 - percent : percent;
		  }
		  var Animations$2 = assign({}, Animations, {
		    fade: {
		      show: function () {
		        return [{
		          opacity: 0,
		          zIndex: 0
		        }, {
		          zIndex: -1
		        }];
		      },
		      percent: function (current) {
		        return 1 - css(current, 'opacity');
		      },
		      translate: function (percent) {
		        return [{
		          opacity: 1 - percent,
		          zIndex: 0
		        }, {
		          zIndex: -1
		        }];
		      }
		    },
		    scale: {
		      show: function () {
		        return [{
		          opacity: 0,
		          transform: scale3d(1 + .5),
		          zIndex: 0
		        }, {
		          zIndex: -1
		        }];
		      },
		      percent: function (current) {
		        return 1 - css(current, 'opacity');
		      },
		      translate: function (percent) {
		        return [{
		          opacity: 1 - percent,
		          transform: scale3d(1 + .5 * percent),
		          zIndex: 0
		        }, {
		          zIndex: -1
		        }];
		      }
		    },
		    pull: {
		      show: function (dir) {
		        return dir < 0 ? [{
		          transform: translate(30),
		          zIndex: -1
		        }, {
		          transform: translate(),
		          zIndex: 0
		        }] : [{
		          transform: translate(-100),
		          zIndex: 0
		        }, {
		          transform: translate(),
		          zIndex: -1
		        }];
		      },
		      percent: function (current, next, dir) {
		        return dir < 0 ? 1 - translated(next) : translated(current);
		      },
		      translate: function (percent, dir) {
		        return dir < 0 ? [{
		          transform: translate(30 * percent),
		          zIndex: -1
		        }, {
		          transform: translate(-100 * (1 - percent)),
		          zIndex: 0
		        }] : [{
		          transform: translate(-percent * 100),
		          zIndex: 0
		        }, {
		          transform: translate(30 * (1 - percent)),
		          zIndex: -1
		        }];
		      }
		    },
		    push: {
		      show: function (dir) {
		        return dir < 0 ? [{
		          transform: translate(100),
		          zIndex: 0
		        }, {
		          transform: translate(),
		          zIndex: -1
		        }] : [{
		          transform: translate(-30),
		          zIndex: -1
		        }, {
		          transform: translate(),
		          zIndex: 0
		        }];
		      },
		      percent: function (current, next, dir) {
		        return dir > 0 ? 1 - translated(next) : translated(current);
		      },
		      translate: function (percent, dir) {
		        return dir < 0 ? [{
		          transform: translate(percent * 100),
		          zIndex: 0
		        }, {
		          transform: translate(-30 * (1 - percent)),
		          zIndex: -1
		        }] : [{
		          transform: translate(-30 * percent),
		          zIndex: -1
		        }, {
		          transform: translate(100 * (1 - percent)),
		          zIndex: 0
		        }];
		      }
		    }
		  });
		  var slideshow = {
		    mixins: [Class, Slideshow, SliderReactive],
		    props: {
		      ratio: String,
		      minHeight: Number,
		      maxHeight: Number
		    },
		    data: {
		      ratio: '16:9',
		      minHeight: false,
		      maxHeight: false,
		      selList: '.uk-slideshow-items',
		      attrItem: 'uk-slideshow-item',
		      selNav: '.uk-slideshow-nav',
		      Animations: Animations$2
		    },
		    update: {
		      read: function () {
		        var ref = this.ratio.split(':').map(Number);
		        var width = ref[0];
		        var height = ref[1];
		        height = height * this.list.offsetWidth / width || 0;
		        if (this.minHeight) {
		          height = Math.max(this.minHeight, height);
		        }
		        if (this.maxHeight) {
		          height = Math.min(this.maxHeight, height);
		        }
		        return {
		          height: height - boxModelAdjust(this.list, 'height', 'content-box')
		        };
		      },
		      write: function (ref) {
		        var height = ref.height;
		        height > 0 && css(this.list, 'minHeight', height);
		      },
		      events: ['resize']
		    }
		  };
		  var sortable = {
		    mixins: [Class, Animate],
		    props: {
		      group: String,
		      threshold: Number,
		      clsItem: String,
		      clsPlaceholder: String,
		      clsDrag: String,
		      clsDragState: String,
		      clsBase: String,
		      clsNoDrag: String,
		      clsEmpty: String,
		      clsCustom: String,
		      handle: String
		    },
		    data: {
		      group: false,
		      threshold: 5,
		      clsItem: 'uk-sortable-item',
		      clsPlaceholder: 'uk-sortable-placeholder',
		      clsDrag: 'uk-sortable-drag',
		      clsDragState: 'uk-drag',
		      clsBase: 'uk-sortable',
		      clsNoDrag: 'uk-sortable-nodrag',
		      clsEmpty: 'uk-sortable-empty',
		      clsCustom: '',
		      handle: false,
		      pos: {}
		    },
		    created: function () {
		      var this$1$1 = this;
		      ['init', 'start', 'move', 'end'].forEach(function (key) {
		        var fn = this$1$1[key];
		        this$1$1[key] = function (e) {
		          assign(this$1$1.pos, getEventPos(e));
		          fn(e);
		        };
		      });
		    },
		    events: {
		      name: pointerDown,
		      passive: false,
		      handler: 'init'
		    },
		    computed: {
		      target: function () {
		        return (this.$el.tBodies || [this.$el])[0];
		      },
		      items: function () {
		        return children(this.target);
		      },
		      isEmpty: {
		        get: function () {
		          return isEmpty(this.items);
		        },
		        watch: function (empty) {
		          toggleClass(this.target, this.clsEmpty, empty);
		        },
		        immediate: true
		      },
		      handles: {
		        get: function (ref, el) {
		          var handle = ref.handle;
		          return handle ? $$(handle, el) : this.items;
		        },
		        watch: function (handles, prev) {
		          css(prev, {
		            touchAction: '',
		            userSelect: ''
		          });
		          css(handles, {
		            touchAction: hasTouch ? 'none' : '',
		            userSelect: 'none'
		          }); // touchAction set to 'none' causes a performance drop in Chrome 80
		        },

		        immediate: true
		      }
		    },
		    update: {
		      write: function () {
		        if (!this.drag || !parent(this.placeholder)) {
		          return;
		        }

		        // clamp to viewport
		        var ref = this.pos;
		        var x = ref.x;
		        var y = ref.y;
		        var ref$1 = this.origin;
		        var offsetTop = ref$1.offsetTop;
		        var offsetLeft = ref$1.offsetLeft;
		        var target = document.elementFromPoint(x, y);
		        css(this.drag, {
		          top: y - offsetTop,
		          left: x - offsetLeft
		        });
		        var sortable = this.getSortable(target);
		        var previous = this.getSortable(this.placeholder);
		        var move = sortable !== previous;
		        if (!sortable || within(target, this.placeholder) || move && (!sortable.group || sortable.group !== previous.group)) {
		          return;
		        }
		        target = sortable.target === target.parentNode && target || sortable.items.filter(function (element) {
		          return within(target, element);
		        })[0];
		        if (move) {
		          previous.remove(this.placeholder);
		        } else if (!target) {
		          return;
		        }
		        sortable.insert(this.placeholder, target);
		        if (!includes(this.touched, sortable)) {
		          this.touched.push(sortable);
		        }
		      },
		      events: ['move']
		    },
		    methods: {
		      init: function (e) {
		        var target = e.target;
		        var button = e.button;
		        var defaultPrevented = e.defaultPrevented;
		        var ref = this.items.filter(function (el) {
		          return within(target, el);
		        });
		        var placeholder = ref[0];
		        if (!placeholder || defaultPrevented || button > 0 || isInput(target) || within(target, "." + this.clsNoDrag) || this.handle && !within(target, this.handle)) {
		          return;
		        }
		        e.preventDefault();
		        this.touched = [this];
		        this.placeholder = placeholder;
		        this.origin = assign({
		          target: target,
		          index: index(placeholder)
		        }, this.pos);
		        on(document, pointerMove, this.move);
		        on(document, pointerUp, this.end);
		        if (!this.threshold) {
		          this.start(e);
		        }
		      },
		      start: function (e) {
		        this.drag = appendDrag(this.$container, this.placeholder);
		        var ref = this.placeholder.getBoundingClientRect();
		        var left = ref.left;
		        var top = ref.top;
		        assign(this.origin, {
		          offsetLeft: this.pos.x - left,
		          offsetTop: this.pos.y - top
		        });
		        addClass(this.drag, this.clsDrag, this.clsCustom);
		        addClass(this.placeholder, this.clsPlaceholder);
		        addClass(this.items, this.clsItem);
		        addClass(document.documentElement, this.clsDragState);
		        trigger(this.$el, 'start', [this, this.placeholder]);
		        trackScroll(this.pos);
		        this.move(e);
		      },
		      move: function (e) {
		        if (this.drag) {
		          this.$emit('move');
		        } else if (Math.abs(this.pos.x - this.origin.x) > this.threshold || Math.abs(this.pos.y - this.origin.y) > this.threshold) {
		          this.start(e);
		        }
		      },
		      end: function (e) {
		        off(document, pointerMove, this.move);
		        off(document, pointerUp, this.end);
		        off(window, 'scroll', this.scroll);
		        if (!this.drag) {
		          return;
		        }
		        untrackScroll();
		        var sortable = this.getSortable(this.placeholder);
		        if (this === sortable) {
		          if (this.origin.index !== index(this.placeholder)) {
		            trigger(this.$el, 'moved', [this, this.placeholder]);
		          }
		        } else {
		          trigger(sortable.$el, 'added', [sortable, this.placeholder]);
		          trigger(this.$el, 'removed', [this, this.placeholder]);
		        }
		        trigger(this.$el, 'stop', [this, this.placeholder]);
		        remove(this.drag);
		        this.drag = null;
		        var classes = this.touched.map(function (sortable) {
		          return sortable.clsPlaceholder + " " + sortable.clsItem;
		        }).join(' ');
		        this.touched.forEach(function (sortable) {
		          return removeClass(sortable.items, classes);
		        });
		        removeClass(document.documentElement, this.clsDragState);
		      },
		      insert: function (element, target) {
		        var this$1$1 = this;
		        addClass(this.items, this.clsItem);
		        var insert = function () {
		          if (target) {
		            if (!within(element, this$1$1.target) || isPredecessor(element, target)) {
		              before(target, element);
		            } else {
		              after(target, element);
		            }
		          } else {
		            append(this$1$1.target, element);
		          }
		        };
		        if (this.animation) {
		          this.animate(insert);
		        } else {
		          insert();
		        }
		      },
		      remove: function (element) {
		        if (!within(element, this.target)) {
		          return;
		        }
		        if (this.animation) {
		          this.animate(function () {
		            return remove(element);
		          });
		        } else {
		          remove(element);
		        }
		      },
		      getSortable: function (element) {
		        return element && (this.$getComponent(element, 'sortable') || this.getSortable(element.parentNode));
		      }
		    }
		  };
		  function isPredecessor(element, target) {
		    return element.parentNode === target.parentNode && index(element) > index(target);
		  }
		  var trackTimer;
		  function trackScroll(pos) {
		    var last = Date.now();
		    trackTimer = setInterval(function () {
		      var x = pos.x;
		      var y = pos.y;
		      y += window.pageYOffset;
		      var dist = (Date.now() - last) * .3;
		      last = Date.now();
		      scrollParents(document.elementFromPoint(x, pos.y)).some(function (scrollEl) {
		        var scroll = scrollEl.scrollTop;
		        var scrollHeight = scrollEl.scrollHeight;
		        var ref = offset(getViewport(scrollEl));
		        var top = ref.top;
		        var bottom = ref.bottom;
		        var height = ref.height;
		        if (top < y && top + 35 > y) {
		          scroll -= dist;
		        } else if (bottom > y && bottom - 35 < y) {
		          scroll += dist;
		        } else {
		          return;
		        }
		        if (scroll > 0 && scroll < scrollHeight - height) {
		          scrollTop(scrollEl, scroll);
		          return true;
		        }
		      });
		    }, 15);
		  }
		  function untrackScroll() {
		    clearInterval(trackTimer);
		  }
		  function appendDrag(container, element) {
		    var clone = append(container, element.outerHTML.replace(/(^<)(?:li|tr)|(?:li|tr)(\/>$)/g, '$1div$2'));
		    clone.style.setProperty('margin', '0', 'important');
		    css(clone, assign({
		      boxSizing: 'border-box',
		      width: element.offsetWidth,
		      height: element.offsetHeight,
		      overflow: 'hidden'
		    }, css(element, ['paddingLeft', 'paddingRight', 'paddingTop', 'paddingBottom'])));
		    height(clone.firstElementChild, height(element.firstElementChild));
		    return clone;
		  }
		  var obj$1;
		  var actives = [];
		  var tooltip = {
		    mixins: [Container, Togglable, Position],
		    args: 'title',
		    props: {
		      delay: Number,
		      title: String
		    },
		    data: {
		      pos: 'top',
		      title: '',
		      delay: 0,
		      animation: ['uk-animation-scale-up'],
		      duration: 100,
		      cls: 'uk-active',
		      clsPos: 'uk-tooltip'
		    },
		    beforeConnect: function () {
		      this._hasTitle = hasAttr(this.$el, 'title');
		      attr(this.$el, {
		        title: '',
		        'aria-expanded': false
		      });
		    },
		    disconnected: function () {
		      this.hide();
		      attr(this.$el, {
		        title: this._hasTitle ? this.title : null,
		        'aria-expanded': null
		      });
		    },
		    methods: {
		      show: function () {
		        var this$1$1 = this;
		        if (this.isActive() || !this.title) {
		          return;
		        }
		        actives.forEach(function (active) {
		          return active.hide();
		        });
		        actives.push(this);
		        this._unbind = on(document, pointerUp, function (e) {
		          return !within(e.target, this$1$1.$el) && this$1$1.hide();
		        });
		        clearTimeout(this.showTimer);
		        this.showTimer = setTimeout(this._show, this.delay);
		      },
		      hide: function () {
		        var this$1$1 = this;
		        if (!this.isActive() || matches(this.$el, 'input:focus')) {
		          return;
		        }
		        this.toggleElement(this.tooltip, false, false).then(function () {
		          actives.splice(actives.indexOf(this$1$1), 1);
		          clearTimeout(this$1$1.showTimer);
		          this$1$1.tooltip = remove(this$1$1.tooltip);
		          this$1$1._unbind();
		        });
		      },
		      _show: function () {
		        var this$1$1 = this;
		        this.tooltip = append(this.container, "<div class=\"" + this.clsPos + "\"> <div class=\"" + this.clsPos + "-inner\">" + this.title + "</div> </div>");
		        on(this.tooltip, 'toggled', function () {
		          var toggled = this$1$1.isToggled(this$1$1.tooltip);
		          attr(this$1$1.$el, 'aria-expanded', toggled);
		          if (!toggled) {
		            return;
		          }
		          this$1$1.positionAt(this$1$1.tooltip, this$1$1.$el);
		          this$1$1.origin = this$1$1.getAxis() === 'y' ? flipPosition(this$1$1.dir) + "-" + this$1$1.align : this$1$1.align + "-" + flipPosition(this$1$1.dir);
		        });
		        this.toggleElement(this.tooltip, true);
		      },
		      isActive: function () {
		        return includes(actives, this);
		      }
		    },
		    events: (obj$1 = {
		      focus: 'show',
		      blur: 'hide'
		    }, obj$1[pointerEnter + " " + pointerLeave] = function (e) {
		      if (isTouch(e)) {
		        return;
		      }
		      e.type === pointerEnter ? this.show() : this.hide();
		    }, obj$1[pointerDown] = function (e) {
		      if (!isTouch(e)) {
		        return;
		      }
		      this.isActive() ? this.hide() : this.show();
		    }, obj$1)
		  };
		  var upload = {
		    props: {
		      allow: String,
		      clsDragover: String,
		      concurrent: Number,
		      maxSize: Number,
		      method: String,
		      mime: String,
		      msgInvalidMime: String,
		      msgInvalidName: String,
		      msgInvalidSize: String,
		      multiple: Boolean,
		      name: String,
		      params: Object,
		      type: String,
		      url: String
		    },
		    data: {
		      allow: false,
		      clsDragover: 'uk-dragover',
		      concurrent: 1,
		      maxSize: 0,
		      method: 'POST',
		      mime: false,
		      msgInvalidMime: 'Invalid File Type: %s',
		      msgInvalidName: 'Invalid File Name: %s',
		      msgInvalidSize: 'Invalid File Size: %s Kilobytes Max',
		      multiple: false,
		      name: 'files[]',
		      params: {},
		      type: '',
		      url: '',
		      abort: noop,
		      beforeAll: noop,
		      beforeSend: noop,
		      complete: noop,
		      completeAll: noop,
		      error: noop,
		      fail: noop,
		      load: noop,
		      loadEnd: noop,
		      loadStart: noop,
		      progress: noop
		    },
		    events: {
		      change: function (e) {
		        if (!matches(e.target, 'input[type="file"]')) {
		          return;
		        }
		        e.preventDefault();
		        if (e.target.files) {
		          this.upload(e.target.files);
		        }
		        e.target.value = '';
		      },
		      drop: function (e) {
		        stop(e);
		        var transfer = e.dataTransfer;
		        if (!transfer || !transfer.files) {
		          return;
		        }
		        removeClass(this.$el, this.clsDragover);
		        this.upload(transfer.files);
		      },
		      dragenter: function (e) {
		        stop(e);
		      },
		      dragover: function (e) {
		        stop(e);
		        addClass(this.$el, this.clsDragover);
		      },
		      dragleave: function (e) {
		        stop(e);
		        removeClass(this.$el, this.clsDragover);
		      }
		    },
		    methods: {
		      upload: function (files) {
		        var this$1$1 = this;
		        if (!files.length) {
		          return;
		        }
		        trigger(this.$el, 'upload', [files]);
		        for (var i = 0; i < files.length; i++) {
		          if (this.maxSize && this.maxSize * 1000 < files[i].size) {
		            this.fail(this.msgInvalidSize.replace('%s', this.maxSize));
		            return;
		          }
		          if (this.allow && !match$1(this.allow, files[i].name)) {
		            this.fail(this.msgInvalidName.replace('%s', this.allow));
		            return;
		          }
		          if (this.mime && !match$1(this.mime, files[i].type)) {
		            this.fail(this.msgInvalidMime.replace('%s', this.mime));
		            return;
		          }
		        }
		        if (!this.multiple) {
		          files = [files[0]];
		        }
		        this.beforeAll(this, files);
		        var chunks = chunk(files, this.concurrent);
		        var upload = function (files) {
		          var data = new FormData();
		          files.forEach(function (file) {
		            return data.append(this$1$1.name, file);
		          });
		          for (var key in this$1$1.params) {
		            data.append(key, this$1$1.params[key]);
		          }
		          ajax(this$1$1.url, {
		            data: data,
		            method: this$1$1.method,
		            responseType: this$1$1.type,
		            beforeSend: function (env) {
		              var xhr = env.xhr;
		              xhr.upload && on(xhr.upload, 'progress', this$1$1.progress);
		              ['loadStart', 'load', 'loadEnd', 'abort'].forEach(function (type) {
		                return on(xhr, type.toLowerCase(), this$1$1[type]);
		              });
		              this$1$1.beforeSend(env);
		            }
		          }).then(function (xhr) {
		            this$1$1.complete(xhr);
		            if (chunks.length) {
		              upload(chunks.shift());
		            } else {
		              this$1$1.completeAll(xhr);
		            }
		          }, function (e) {
		            return this$1$1.error(e);
		          });
		        };
		        upload(chunks.shift());
		      }
		    }
		  };
		  function match$1(pattern, path) {
		    return path.match(new RegExp("^" + pattern.replace(/\//g, '\\/').replace(/\*\*/g, '(\\/[^\\/]+)*').replace(/\*/g, '[^\\/]+').replace(/((?!\\))\?/g, '$1.') + "$", 'i'));
		  }
		  function chunk(files, size) {
		    var chunks = [];
		    for (var i = 0; i < files.length; i += size) {
		      var chunk = [];
		      for (var j = 0; j < size; j++) {
		        chunk.push(files[i + j]);
		      }
		      chunks.push(chunk);
		    }
		    return chunks;
		  }
		  function stop(e) {
		    e.preventDefault();
		    e.stopPropagation();
		  }
		  var components$1 = /*#__PURE__*/Object.freeze({
		    __proto__: null,
		    Countdown: countdown,
		    Filter: filter$1,
		    Lightbox: lightbox,
		    LightboxPanel: LightboxPanel,
		    Notification: notification,
		    Parallax: parallax,
		    Slider: slider,
		    SliderParallax: sliderParallax,
		    Slideshow: slideshow,
		    SlideshowParallax: sliderParallax,
		    Sortable: sortable,
		    Tooltip: tooltip,
		    Upload: upload
		  });
		  each(components$1, function (component, name) {
		    return UIkit.component(name, component);
		  });
		  return UIkit;
		});
	} (uikit));

	// Add your custom JS here.
	document.addEventListener("DOMContentLoaded", () => {
	  const target = document.getElementById("single-wrapper");
	  if (!target) return;
	  const offset = 84;
	  const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
	  window.scrollTo({
	    top,
	    behavior: "auto" // change to 'smooth' if you want animation
	  });
	});

	jQuery(function ($) {
	  // Specials Slider
	  $(".specials-slider").slick({
	    dots: true,
	    arrows: false,
	    infinite: true,
	    autoplay: true,
	    autoplaySpeed: 5000,
	    speed: 500,
	    fade: true,
	    pauseOnHover: false,
	    cssEase: "linear"
	  });

	  // Food Slider
	  $(".food-slider").slick({
	    slidesToShow: 5,
	    slidesToScroll: 1,
	    arrows: true,
	    infinite: true,
	    autoplay: true,
	    autoplaySpeed: 4000,
	    speed: 600,
	    responsive: [{
	      breakpoint: 1200,
	      settings: {
	        slidesToShow: 3
	      }
	    }, {
	      breakpoint: 992,
	      settings: {
	        slidesToShow: 2
	      }
	    }, {
	      breakpoint: 768,
	      settings: {
	        slidesToShow: 1
	      }
	    }]
	  });

	  // Close mobile nav after clicking a link
	  $(".navbar-nav li a").on("click", function () {
	    if (!$(this).hasClass("dropdown-toggle")) {
	      $(".navbar-collapse").collapse("hide");
	    }
	  });

	  // Scrollspy classes
	  $(".slide-in-bottom-md").attr("uk-scrollspy", "cls: uk-animation-slide-bottom-medium; delay: 100");
	  $(".slide-in-left-md").attr("uk-scrollspy", "cls: uk-animation-slide-left-medium; delay: 100");
	  $(".slide-in-right-md").attr("uk-scrollspy", "cls: uk-animation-slide-right-medium; delay: 100");
	  $(".slide-in-bottom-sm").attr("uk-scrollspy", "cls: uk-animation-slide-bottom-small; delay: 100");
	  $(".slide-in-left-sm").attr("uk-scrollspy", "cls: uk-animation-slide-left-small; delay: 100");
	  $(".slide-in-right-sm").attr("uk-scrollspy", "cls: uk-animation-slide-right-small; delay: 100");
	  $(".fade-in").attr("uk-scrollspy", "cls: uk-animation-fade; delay: 100");
	  $(".fade-in-children").attr("uk-scrollspy", "target: > *; cls: uk-animation-fade; delay: 100");
	  $(".slide-in-bottom-sm-children").attr("uk-scrollspy", "target: > *; cls: uk-animation-slide-bottom-small; delay: 100");
	  $(".slide-in-bottom-md-children").attr("uk-scrollspy", "target: > *; cls: uk-animation-slide-bottom-medium; delay: 100");
	  $(".slide-in-left-sm-children").attr("uk-scrollspy", "target: > *; cls: uk-animation-slide-left-small; delay: 100");
	});

	exports.Alert = alert;
	exports.Button = button;
	exports.Carousel = carousel;
	exports.Collapse = collapse;
	exports.Dropdown = dropdown;
	exports.Modal = modal;
	exports.Offcanvas = offcanvas;
	exports.Popover = popover;
	exports.Scrollspy = scrollspy;
	exports.Tab = tab;
	exports.Toast = toast;
	exports.Tooltip = tooltip;

}));
//# sourceMappingURL=child-theme.js.map
