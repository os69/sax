define(['./core', './lib/esprima'], function (core, esprima) {

    var search = function (text, index, direction, chars) {
        while (true) {
            if (index >= text.length) {
                return -1;
            }
            if (index < 0) {
                return -1;
            }
            var char = text[index];
            if (chars.indexOf(char) >= 0) {
                return index;
            }
            if (direction === 'forward') {
                index += 1;
            } else {
                index -= 1;
            }
        }
    };

    var suggest = function (line, evalFunc) {

        // cut chars after cursor
        var text = line.text.slice(0, line.cursor);

        // calculate expression
        var startIndex = search(text, line.cursor - 1, 'backwards', ' ();');
        var expression;
        if (startIndex < 0) {
            startIndex = -1;
        }
        expression = text.slice(startIndex + 1, line.cursor);

        // parse object and property of expression
        var subStartIndex = search(expression, expression.length - 1, 'backwards', ['.']);
        if (subStartIndex < 0) {
            return { completion: '', suggestions: [] };
        }
        var object = expression.slice(0, subStartIndex);
        var property = expression.slice(subStartIndex + 1);

        // eval object
        try {
            object = evalFunc(object);
        } catch (e) {
            return {
                completion: '',
                suggestions: []
            };
        }

        // search object for matching properties
        var matchingProperties = [];
        for (var prop in object) {
            if (prop[0] === '_') {
                continue;
            }
            if (['constructor', 'equals', 'clone'].indexOf(prop) >= 0) {
                continue;
            }
            if (prop.indexOf(property) === 0) {
                matchingProperties.push(prop);
            }
        }

        if (matchingProperties.length == 1) {
            var matchingProperty = matchingProperties[0];
            return {
                completion: matchingProperty.slice(property.length),
                suggestions: []
            };
        } else {
            return {
                completion: '',
                suggestions: matchingProperties
            };
        }



    };

    return suggest;
});

