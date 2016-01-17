/* global window,  console */
(function () {

	// =========================================================================
	// import other modules + define own module
	// =========================================================================
	var core = window.pc.core;
	var module = window.pc.asynchron = {};

	module.Listener = core.defineClass({

		type: 'pc.asynchron.Listener',

		init: function (options) {
			core.extend(this, options);
		},

		resolveCombinedDeferred: function (value) {
			this.combinedDeferred.resolve(value);
		}

	});

	module.Deferred = core.defineClass({

		type: 'pc.asynchron.Deferred',

		INITIAL: 'initial',
		PENDING: 'pending',
		RESOLVED: 'resolved',
		REJECTED: 'rejected',

		init: function () {
			this.value = null;
			this.listeners = [];
			this.status = this.INITIAL;
		},

		progress: function (obj, method) {
			this.listeners.push(new module.Listener({
				obj: obj,
				method: method,
				status: this.PENDING,
				processed: false
			}));
			this.notifyListeners();
			return this;
		},

		done: function (obj, method) {
			this.listeners.push(new module.Listener({
				obj: obj,
				method: method,
				status: this.RESOLVED,
				processed: false
			}));
			this.notifyListeners();
			return this;
		},

		then: function (obj, method) {
			var combinedDeferred = new module.Deferred();
			this.listeners.push(new module.Listener({
				obj: obj,
				method: method,
				combinedDeferred: combinedDeferred,
				status: this.RESOLVED,
				processed: false
			}));
			this.notifyListeners();
			return combinedDeferred;
		},

		resolve: function (value) {
			this.value = value;
			this.status = this.RESOLVED;
			this.notifyListeners();
		},

		reject: function (value) {
			this.value = value;
			this.status = this.REJECTED;
			this.notifyListeners();
		},

		notify: function () {
			this.status = this.PENDING;
			this.notifyListeners.apply(this, arguments);
		},

		notifyListeners: function () {
			for (var i = 0; i < this.listeners.length; ++i) {
				var listener = this.listeners[i];
				if (!listener.processed && listener.status !== this.status) {
					continue;
				}
				switch (this.status) {
				case this.PENDING:
					listener.obj[listener.method].apply(listener.obj, arguments);
					break;
				case this.REJECTED:
				case this.RESOLVED:
					var deferred = listener.obj[listener.method].apply(listener.obj, [this.value]);
					if (listener.combinedDeferred) {
						deferred.done(listener, 'resolveCombinedDeferred');
					}
					listener.processed = true;
					break;
				}
			}
		}
	});

	module.When = core.defineClass({

		type: 'pc.asynchron.When',

		init: function (deferreds) {
			this.deferreds = deferreds;
			this.combinedDeferred = new module.Deferred();
			for (var i = 0; i < this.deferreds.length; ++i) {
				var deferred = this.deferreds[i];
				deferred.done(this, 'resolveHandler');
			}
			this.pending = this.deferreds.length;
		},

		done: function (obj, method) {
			this.combinedDeferred.done(obj, method);
		},

		then: function (obj, method) {
			return this.combinedDeferred.then(obj, method);
		},

		resolveHandler: function () {
			this.pending--;
			if (this.pending === 0) {
				var resolved = true;
				var result = [];
				for (var i = 0; i < this.deferreds.length; ++i) {
					var deferred = this.deferreds[i];
					result.push(deferred.value);
					if (deferred.status !== deferred.RESOLVED) {
						resolved = false;
						break;
					}
				}
				if (resolved) {
					this.combinedDeferred.resolve(result);
				} else {
					this.combinedDeferred.reject(result);
				}
			}
		}

	});

	module.when = function (deferreds) {
		return new module.When(deferreds);
	};

})();