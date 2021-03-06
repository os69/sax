"use strict";

require("core-js/modules/es.promise");

define([], function () {
  var module = {};

  module.request = function (options) {
    return new Promise(function (resolve, reject) {
      var xhttp = new XMLHttpRequest();

      xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
          resolve(xhttp.responseText);
          return;
        }

        if (xhttp.readyState == 4) {
          reject(xhttp);
        }
      };

      xhttp.open(options.method, options.url, true);
      options.headers = options.headers || {};

      for (var header in options.headers) {
        xhttp.setRequestHeader(header, options.headers[header]);
      }

      xhttp.send(options.body);
    });
  };

  module.get = function (url, headers) {
    return module.request({
      method: 'GET',
      url: url,
      headers: headers
    });
  };

  module.post = function (url, body, headers) {
    return module.request({
      method: 'POST',
      url: url,
      headers: headers,
      body: body
    });
  };

  module.getJson = function (url) {
    return module.get(url).then(result => JSON.parse(result));
  };

  module.postJson = function (url, json) {
    return module.post(url, JSON.stringify(json), {
      'Content-Type': 'application/json'
    });
  };

  return module;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb3JlL2FqYXguanMiXSwibmFtZXMiOlsiZGVmaW5lIiwibW9kdWxlIiwicmVxdWVzdCIsIm9wdGlvbnMiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInhodHRwIiwiWE1MSHR0cFJlcXVlc3QiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJyZWFkeVN0YXRlIiwic3RhdHVzIiwicmVzcG9uc2VUZXh0Iiwib3BlbiIsIm1ldGhvZCIsInVybCIsImhlYWRlcnMiLCJoZWFkZXIiLCJzZXRSZXF1ZXN0SGVhZGVyIiwic2VuZCIsImJvZHkiLCJnZXQiLCJwb3N0IiwiZ2V0SnNvbiIsInRoZW4iLCJyZXN1bHQiLCJKU09OIiwicGFyc2UiLCJwb3N0SnNvbiIsImpzb24iLCJzdHJpbmdpZnkiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQUEsTUFBTSxDQUFDLEVBQUQsRUFBSyxZQUFZO0FBRW5CLE1BQUlDLE1BQU0sR0FBRyxFQUFiOztBQUVBQSxFQUFBQSxNQUFNLENBQUNDLE9BQVAsR0FBaUIsVUFBVUMsT0FBVixFQUFtQjtBQUNoQyxXQUFPLElBQUlDLE9BQUosQ0FBWSxVQUFVQyxPQUFWLEVBQW1CQyxNQUFuQixFQUEyQjtBQUMxQyxVQUFJQyxLQUFLLEdBQUcsSUFBSUMsY0FBSixFQUFaOztBQUNBRCxNQUFBQSxLQUFLLENBQUNFLGtCQUFOLEdBQTJCLFlBQVk7QUFDbkMsWUFBSUYsS0FBSyxDQUFDRyxVQUFOLElBQW9CLENBQXBCLElBQXlCSCxLQUFLLENBQUNJLE1BQU4sSUFBZ0IsR0FBN0MsRUFBa0Q7QUFDOUNOLFVBQUFBLE9BQU8sQ0FBQ0UsS0FBSyxDQUFDSyxZQUFQLENBQVA7QUFDQTtBQUNIOztBQUNELFlBQUlMLEtBQUssQ0FBQ0csVUFBTixJQUFvQixDQUF4QixFQUEyQjtBQUN2QkosVUFBQUEsTUFBTSxDQUFDQyxLQUFELENBQU47QUFDSDtBQUNKLE9BUkQ7O0FBU0FBLE1BQUFBLEtBQUssQ0FBQ00sSUFBTixDQUFXVixPQUFPLENBQUNXLE1BQW5CLEVBQTJCWCxPQUFPLENBQUNZLEdBQW5DLEVBQXdDLElBQXhDO0FBQ0FaLE1BQUFBLE9BQU8sQ0FBQ2EsT0FBUixHQUFrQmIsT0FBTyxDQUFDYSxPQUFSLElBQW1CLEVBQXJDOztBQUNBLFdBQUssSUFBSUMsTUFBVCxJQUFtQmQsT0FBTyxDQUFDYSxPQUEzQixFQUFvQztBQUNoQ1QsUUFBQUEsS0FBSyxDQUFDVyxnQkFBTixDQUF1QkQsTUFBdkIsRUFBK0JkLE9BQU8sQ0FBQ2EsT0FBUixDQUFnQkMsTUFBaEIsQ0FBL0I7QUFDSDs7QUFDRFYsTUFBQUEsS0FBSyxDQUFDWSxJQUFOLENBQVdoQixPQUFPLENBQUNpQixJQUFuQjtBQUNILEtBakJNLENBQVA7QUFrQkgsR0FuQkQ7O0FBcUJBbkIsRUFBQUEsTUFBTSxDQUFDb0IsR0FBUCxHQUFhLFVBQVVOLEdBQVYsRUFBZUMsT0FBZixFQUF3QjtBQUNqQyxXQUFPZixNQUFNLENBQUNDLE9BQVAsQ0FBZTtBQUNsQlksTUFBQUEsTUFBTSxFQUFFLEtBRFU7QUFFbEJDLE1BQUFBLEdBQUcsRUFBRUEsR0FGYTtBQUdsQkMsTUFBQUEsT0FBTyxFQUFFQTtBQUhTLEtBQWYsQ0FBUDtBQUtILEdBTkQ7O0FBUUFmLEVBQUFBLE1BQU0sQ0FBQ3FCLElBQVAsR0FBYyxVQUFVUCxHQUFWLEVBQWVLLElBQWYsRUFBcUJKLE9BQXJCLEVBQThCO0FBQ3hDLFdBQU9mLE1BQU0sQ0FBQ0MsT0FBUCxDQUFlO0FBQ2xCWSxNQUFBQSxNQUFNLEVBQUUsTUFEVTtBQUVsQkMsTUFBQUEsR0FBRyxFQUFFQSxHQUZhO0FBR2xCQyxNQUFBQSxPQUFPLEVBQUVBLE9BSFM7QUFJbEJJLE1BQUFBLElBQUksRUFBRUE7QUFKWSxLQUFmLENBQVA7QUFNSCxHQVBEOztBQVNBbkIsRUFBQUEsTUFBTSxDQUFDc0IsT0FBUCxHQUFpQixVQUFVUixHQUFWLEVBQWU7QUFDNUIsV0FBT2QsTUFBTSxDQUFDb0IsR0FBUCxDQUFXTixHQUFYLEVBQWdCUyxJQUFoQixDQUFxQkMsTUFBTSxJQUFJQyxJQUFJLENBQUNDLEtBQUwsQ0FBV0YsTUFBWCxDQUEvQixDQUFQO0FBQ0gsR0FGRDs7QUFJQXhCLEVBQUFBLE1BQU0sQ0FBQzJCLFFBQVAsR0FBa0IsVUFBVWIsR0FBVixFQUFlYyxJQUFmLEVBQXFCO0FBQ25DLFdBQU81QixNQUFNLENBQUNxQixJQUFQLENBQVlQLEdBQVosRUFBaUJXLElBQUksQ0FBQ0ksU0FBTCxDQUFlRCxJQUFmLENBQWpCLEVBQXVDO0FBQUUsc0JBQWdCO0FBQWxCLEtBQXZDLENBQVA7QUFDSCxHQUZEOztBQUlBLFNBQU81QixNQUFQO0FBRUgsQ0FwREssQ0FBTiIsInNvdXJjZXNDb250ZW50IjpbImRlZmluZShbXSwgZnVuY3Rpb24gKCkge1xuXG4gICAgdmFyIG1vZHVsZSA9IHt9O1xuXG4gICAgbW9kdWxlLnJlcXVlc3QgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgdmFyIHhodHRwID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgICAgICB4aHR0cC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHhodHRwLnJlYWR5U3RhdGUgPT0gNCAmJiB4aHR0cC5zdGF0dXMgPT0gMjAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoeGh0dHAucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoeGh0dHAucmVhZHlTdGF0ZSA9PSA0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdCh4aHR0cCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHhodHRwLm9wZW4ob3B0aW9ucy5tZXRob2QsIG9wdGlvbnMudXJsLCB0cnVlKTtcbiAgICAgICAgICAgIG9wdGlvbnMuaGVhZGVycyA9IG9wdGlvbnMuaGVhZGVycyB8fCB7fTtcbiAgICAgICAgICAgIGZvciAodmFyIGhlYWRlciBpbiBvcHRpb25zLmhlYWRlcnMpIHtcbiAgICAgICAgICAgICAgICB4aHR0cC5zZXRSZXF1ZXN0SGVhZGVyKGhlYWRlciwgb3B0aW9ucy5oZWFkZXJzW2hlYWRlcl0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgeGh0dHAuc2VuZChvcHRpb25zLmJvZHkpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBtb2R1bGUuZ2V0ID0gZnVuY3Rpb24gKHVybCwgaGVhZGVycykge1xuICAgICAgICByZXR1cm4gbW9kdWxlLnJlcXVlc3Qoe1xuICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICAgIHVybDogdXJsLFxuICAgICAgICAgICAgaGVhZGVyczogaGVhZGVyc1xuICAgICAgICB9KVxuICAgIH07XG5cbiAgICBtb2R1bGUucG9zdCA9IGZ1bmN0aW9uICh1cmwsIGJvZHksIGhlYWRlcnMpIHtcbiAgICAgICAgcmV0dXJuIG1vZHVsZS5yZXF1ZXN0KHtcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgICAgICBoZWFkZXJzOiBoZWFkZXJzLFxuICAgICAgICAgICAgYm9keTogYm9keVxuICAgICAgICB9KVxuICAgIH07XG5cbiAgICBtb2R1bGUuZ2V0SnNvbiA9IGZ1bmN0aW9uICh1cmwpIHtcbiAgICAgICAgcmV0dXJuIG1vZHVsZS5nZXQodXJsKS50aGVuKHJlc3VsdCA9PiBKU09OLnBhcnNlKHJlc3VsdCkpO1xuICAgIH1cblxuICAgIG1vZHVsZS5wb3N0SnNvbiA9IGZ1bmN0aW9uICh1cmwsIGpzb24pIHtcbiAgICAgICAgcmV0dXJuIG1vZHVsZS5wb3N0KHVybCwgSlNPTi5zdHJpbmdpZnkoanNvbiksIHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gbW9kdWxlO1xuXG59KTsiXX0=