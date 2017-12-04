define(['./core'], function (core) {

    return {

        format: function (formatOptions, data) {
            switch (formatOptions.type) {
                case 'json':
                    return this.formatJson(data);
                case 'table':
                    return this.formatTable(formatOptions, data);
                case 'object':
                    return this.formatObject(formatOptions, data);
            }
        },

        error: function (text) {
            return '<span class="error">' + text + '</span>';
        },

        progress: function (text) {
            return '<span class="progress">' + text + '</span>';
        },

        formatJson: function (json) {
            if (typeof json != 'string') {
                json = JSON.stringify(json, undefined, 2);
            }
            json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
            return '<pre class="json">' + json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
                var cls = 'number';
                if (/^"/.test(match)) {
                    if (/:$/.test(match)) {
                        cls = 'key';
                    } else {
                        cls = 'string';
                    }
                } else if (/true|false/.test(match)) {
                    cls = 'boolean';
                } else if (/null/.test(match)) {
                    cls = 'null';
                }
                return '<span class="' + cls + '">' + match + '</span>';
            }) + '</pre>';
        },

        formatTable: function (formatOptions, data) {
            var text = [];

            text.push('<table class="terminal-table">');

            text.push('<tr>');
            for (var j = 0; j < formatOptions.columns.length; ++j) {
                var column = formatOptions.columns[j];
                text.push('<th>' + column.name + '</th>');
            }
            text.push('</tr>');

            for (var i = 0; i < data.length; ++i) {
                var record = data[i];
                text.push('<tr>');
                for (var j = 0; j < formatOptions.columns.length; ++j) {
                    var column = formatOptions.columns[j];
                    var value = record[column.name];
                    text.push('<td>' + value + '</td>');
                }
                text.push('</tr>');
            }
            text.push('</table>');
            return text.join('');
        },

        formatObject: function (formatOptions, data) {
            var text = [];
            text.push('<table class="terminal-table">');
            for (var i = 0; i < formatOptions.fields.length; ++i) {
                var field = formatOptions.fields[i];
                var value = data[field.name];
                if (core.isList(value)) {
                    value = '<pre>' + value.join('<br>') + '</pre>';
                }
                text.push('<tr>');
                text.push('<td>', field.name, '</td>');
                text.push('<td>', value, '</td>');
                text.push('</tr>');
            }
            text.push('</table>');
            return text.join('');
        }

    };

});