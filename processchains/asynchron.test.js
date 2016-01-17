/* global window,  console */
(function () {

	// =========================================================================
	// import other modules + define own module
	// =========================================================================
	var core = window.pc.core;
	var asynchron = window.pc.asynchron;
	var odb = window.pc.odb;
	var module = window.pc.asynchron.test = {};

	var doAsync = function (job) {
		window.setTimeout(job, 0);
	};

	var test1 = function () {

		var job1 = function (value) {
			var d = new asynchron.Deferred();
			doAsync(function () {
				d.resolve(value + 1);
			});
			return d;
		};
		var job2 = function (value) {
			var d = new asynchron.Deferred();
			doAsync(function () {
				d.resolve(value + 10);
			});
			return d;
		};

		var handler = {
			done: function (value) {
				console.log('job', value);
			},
			startJob1: function (value) {
				return job1(value);
			},
			startJob2: function (value) {
				return job2(value);
			}
		};

		job1(1).done(handler, 'done');
		job2(1).done(handler, 'done');

		job1(1).then(handler, 'startJob1').done(handler, 'done');

		asynchron.when([job1(1), job2(1)]).done(handler, 'done');
	};

	var test2 = function () {

		module.Handler = core.defineClass({
			type: 'pc.asynchron.test.Handler',
			done: function (value) {
				console.log(value);
			}
		});

		var handler = new module.Handler();
		var d1 = new asynchron.Deferred();
		d1.id = 'd1';
		d1.done(handler, 'done');

		var db = new odb.DB();
		db.put(d1);

		db.debugReload();

		d1 = db.get('d1');
		d1.resolve(10);

	};

	test1();
	test2();
})();