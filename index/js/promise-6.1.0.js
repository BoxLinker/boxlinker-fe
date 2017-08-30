(function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        const a = typeof require === 'function' && require;
        if (!u && a) return a(o, !0);
        if (i) return i(o, !0);
        const f = new Error(`Cannot find module '${o}'`);
        throw ((f.code = 'MODULE_NOT_FOUND'), f);
      }
      const l = (n[o] = {
        exports: {},
      });
      t[o][0].call(
        l.exports,
        e => {
          const n = t[o][1][e];
          return s(n || e);
        },
        l,
        l.exports,
        e,
        t,
        n,
        r,
      );
    }
    return n[o].exports;
  }
  var i = typeof require === 'function' && require;
  for (let o = 0; o < r.length; o++) s(r[o]);
  return s;
})(
  {
    1: [
      function(require, module, exports) {
        const process = (module.exports = {});
        process.nextTick = (function() {
          const canSetImmediate =
            typeof window !== 'undefined' && window.setImmediate;
          const canPost =
            typeof window !== 'undefined' &&
            window.postMessage &&
            window.addEventListener;
          if (canSetImmediate) {
            return function(f) {
              return window.setImmediate(f);
            };
          }
          if (canPost) {
            const queue = [];
            window.addEventListener(
              'message',
              ev => {
                const source = ev.source;
                if (
                  (source === window || source === null) &&
                  ev.data === 'process-tick'
                ) {
                  ev.stopPropagation();
                  if (queue.length > 0) {
                    const fn = queue.shift();
                    fn();
                  }
                }
              },
              true,
            );
            return function nextTick(fn) {
              queue.push(fn);
              window.postMessage('process-tick', '*');
            };
          }
          return function nextTick(fn) {
            setTimeout(fn, 0);
          };
        })();
        process.title = 'browser';
        process.browser = true;
        process.env = {};
        process.argv = [];
        function noop() {}
        process.on = noop;
        process.addListener = noop;
        process.once = noop;
        process.off = noop;
        process.removeListener = noop;
        process.removeAllListeners = noop;
        process.emit = noop;
        process.binding = function(name) {
          throw new Error('process.binding is not supported');
        };
        process.cwd = function() {
          return '/';
        };
        process.chdir = function(dir) {
          throw new Error('process.chdir is not supported');
        };
      },
      {},
    ],
    2: [
      function(require, module, exports) {
        const asap = require('asap');
        module.exports = Promise;
        function Promise(fn) {
          if (typeof this !== 'object')
            throw new TypeError('Promises must be constructed via new');
          if (typeof fn !== 'function') throw new TypeError('not a function');
          let state = null;
          let value = null;
          let deferreds = [];
          const self = this;
          this.then = function(onFulfilled, onRejected) {
            return new self.constructor((resolve, reject) => {
              handle(new Handler(onFulfilled, onRejected, resolve, reject));
            });
          };
          function handle(deferred) {
            if (state === null) {
              deferreds.push(deferred);
              return;
            }
            asap(() => {
              const cb = state ? deferred.onFulfilled : deferred.onRejected;
              if (cb === null) {
                (state ? deferred.resolve : deferred.reject)(value);
                return;
              }
              let ret;
              try {
                ret = cb(value);
              } catch (e) {
                deferred.reject(e);
                return;
              }
              deferred.resolve(ret);
            });
          }
          function resolve(newValue) {
            try {
              if (newValue === self)
                throw new TypeError(
                  'A promise cannot be resolved with itself.',
                );
              if (
                newValue &&
                (typeof newValue === 'object' || typeof newValue === 'function')
              ) {
                const then = newValue.then;
                if (typeof then === 'function') {
                  doResolve(then.bind(newValue), resolve, reject);
                  return;
                }
              }
              state = true;
              value = newValue;
              finale();
            } catch (e) {
              reject(e);
            }
          }
          function reject(newValue) {
            state = false;
            value = newValue;
            finale();
          }
          function finale() {
            for (let i = 0, len = deferreds.length; i < len; i++)
              handle(deferreds[i]);
            deferreds = null;
          }
          doResolve(fn, resolve, reject);
        }
        function Handler(onFulfilled, onRejected, resolve, reject) {
          this.onFulfilled =
            typeof onFulfilled === 'function' ? onFulfilled : null;
          this.onRejected =
            typeof onRejected === 'function' ? onRejected : null;
          this.resolve = resolve;
          this.reject = reject;
        }
        function doResolve(fn, onFulfilled, onRejected) {
          let done = false;
          try {
            fn(
              value => {
                if (done) return;
                done = true;
                onFulfilled(value);
              },
              reason => {
                if (done) return;
                done = true;
                onRejected(reason);
              },
            );
          } catch (ex) {
            if (done) return;
            done = true;
            onRejected(ex);
          }
        }
      },
      {
        asap: 4,
      },
    ],
    3: [
      function(require, module, exports) {
        const Promise = require('./core.js');
        const asap = require('asap');
        module.exports = Promise;
        function ValuePromise(value) {
          this.then = function(onFulfilled) {
            if (typeof onFulfilled !== 'function') return this;
            return new Promise((resolve, reject) => {
              asap(() => {
                try {
                  resolve(onFulfilled(value));
                } catch (ex) {
                  reject(ex);
                }
              });
            });
          };
        }
        ValuePromise.prototype = Promise.prototype;
        const TRUE = new ValuePromise(true);
        const FALSE = new ValuePromise(false);
        const NULL = new ValuePromise(null);
        const UNDEFINED = new ValuePromise(undefined);
        const ZERO = new ValuePromise(0);
        const EMPTYSTRING = new ValuePromise('');
        Promise.resolve = function(value) {
          if (value instanceof Promise) return value;
          if (value === null) return NULL;
          if (value === undefined) return UNDEFINED;
          if (value === true) return TRUE;
          if (value === false) return FALSE;
          if (value === 0) return ZERO;
          if (value === '') return EMPTYSTRING;
          if (typeof value === 'object' || typeof value === 'function') {
            try {
              const then = value.then;
              if (typeof then === 'function') {
                return new Promise(then.bind(value));
              }
            } catch (ex) {
              return new Promise((resolve, reject) => {
                reject(ex);
              });
            }
          }
          return new ValuePromise(value);
        };
        Promise.all = function(arr) {
          const args = Array.prototype.slice.call(arr);
          return new Promise((resolve, reject) => {
            if (args.length === 0) return resolve([]);
            let remaining = args.length;
            function res(i, val) {
              try {
                if (
                  val &&
                  (typeof val === 'object' || typeof val === 'function')
                ) {
                  const then = val.then;
                  if (typeof then === 'function') {
                    then.call(
                      val,
                      val => {
                        res(i, val);
                      },
                      reject,
                    );
                    return;
                  }
                }
                args[i] = val;
                if (--remaining === 0) {
                  resolve(args);
                }
              } catch (ex) {
                reject(ex);
              }
            }
            for (let i = 0; i < args.length; i++) {
              res(i, args[i]);
            }
          });
        };
        Promise.reject = function(value) {
          return new Promise((resolve, reject) => {
            reject(value);
          });
        };
        Promise.race = function(values) {
          return new Promise((resolve, reject) => {
            values.forEach(value => {
              Promise.resolve(value).then(resolve, reject);
            });
          });
        };
        Promise.prototype.catch = function(onRejected) {
          return this.then(null, onRejected);
        };
      },
      {
        './core.js': 2,
        asap: 4,
      },
    ],
    4: [
      function(require, module, exports) {
        (function(process) {
          let head = {
            task: void 0,
            next: null,
          };
          let tail = head;
          let flushing = false;
          let requestFlush = void 0;
          let isNodeJS = false;
          function flush() {
            while (head.next) {
              head = head.next;
              const task = head.task;
              head.task = void 0;
              const domain = head.domain;
              if (domain) {
                head.domain = void 0;
                domain.enter();
              }
              try {
                task();
              } catch (e) {
                if (isNodeJS) {
                  if (domain) {
                    domain.exit();
                  }
                  setTimeout(flush, 0);
                  if (domain) {
                    domain.enter();
                  }
                  throw e;
                } else {
                  setTimeout(() => {
                    throw e;
                  }, 0);
                }
              }
              if (domain) {
                domain.exit();
              }
            }
            flushing = false;
          }
          if (typeof process !== 'undefined' && process.nextTick) {
            isNodeJS = true;
            requestFlush = function() {
              process.nextTick(flush);
            };
          } else if (typeof setImmediate === 'function') {
            if (typeof window !== 'undefined') {
              requestFlush = setImmediate.bind(window, flush);
            } else {
              requestFlush = function() {
                setImmediate(flush);
              };
            }
          } else if (typeof MessageChannel !== 'undefined') {
            const channel = new MessageChannel();
            channel.port1.onmessage = flush;
            requestFlush = function() {
              channel.port2.postMessage(0);
            };
          } else {
            requestFlush = function() {
              setTimeout(flush, 0);
            };
          }
          function asap(task) {
            tail = tail.next = {
              task,
              domain: isNodeJS && process.domain,
              next: null,
            };
            if (!flushing) {
              flushing = true;
              requestFlush();
            }
          }
          module.exports = asap;
        }.call(this, require('_process')));
      },
      {
        _process: 1,
      },
    ],
    5: [
      function(require, module, exports) {
        if (typeof Promise.prototype.done !== 'function') {
          Promise.prototype.done = function(onFulfilled, onRejected) {
            const self = arguments.length
              ? this.then.apply(this, arguments)
              : this;
            self.then(null, err => {
              setTimeout(() => {
                throw err;
              }, 0);
            });
          };
        }
      },
      {},
    ],
    6: [
      function(require, module, exports) {
        const asap = require('asap');
        if (typeof Promise === 'undefined') {
          Promise = require('./lib/core.js');
          require('./lib/es6-extensions.js');
        }
        require('./polyfill-done.js');
      },
      {
        './lib/core.js': 2,
        './lib/es6-extensions.js': 3,
        './polyfill-done.js': 5,
        asap: 4,
      },
    ],
  },
  {},
  [6],
);
// # sourceMappingURL=/polyfills/promise-6.1.0.js.map
