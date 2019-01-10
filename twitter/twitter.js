(function () {

    "use strict";

    var module = {};

    var extend = function (obj1, obj2) {
        for (var key in obj2) {
            obj1[key] = obj2[key];
        }
        return obj1;
    };

    var firstIndexOf = function (text, index, characters, invert) {
        for (var i = index; i < text.length; ++i) {
            var char = text[i];
            if (invert) {
                if (characters.indexOf(char) < 0) {
                    return i;
                }
            } else {
                if (characters.indexOf(char) >= 0) {
                    return i;
                }
            }
        }
        return text.length;
    };

    module.Token = function () { };
    module.Token.prototype = {
        init: function (text, index) {
            this.text = text;
            this.startIndex = index;
            for (this.endIndex = index; this.endIndex < text.length; ++this.endIndex) {
                if (!this.regExp.test(text[this.endIndex])) {
                    return;
                }
            }
        },
        match: function (text, index) {
            return this.regExp.test(text[index]);
        },
        getLength: function () {
            return this.endIndex - this.startIndex;
        },
        toString: function () {
            return this.text.slice(this.startIndex, this.endIndex);
        }
    };

    module.TextToken = function () { this.init.apply(this, arguments) };
    module.TextToken.prototype = extend(new module.Token(), {
        regExp: new RegExp('[^@\\s]')
    });

    module.UserToken = function () { this.init.apply(this, arguments) };
    module.UserToken.prototype = extend(new module.Token(), {
        regExp: new RegExp('[@]')
    });

    module.WhitespaceToken = function () { this.init.apply(this, arguments); }
    module.WhitespaceToken.prototype = extend(new module.Token(), {
        regExp: new RegExp('\\s')
    });

    var tokenClasses = [module.WhitespaceToken, module.UserToken, module.TextToken];

    module.Tokenizer = function () { this.init.apply(this, arguments); }
    module.Tokenizer.prototype = {
        init: function (text) {
            this.text = text;
            this.index = 0;
        },
        getNextToken: function () {
            while (true) {
                var token = this._getNextToken();
                if (!token) {
                    return null;
                }
                return token;
            }
        },
        finished: function () {
            return this.lookAhead() === null;
        },
        _getNextToken: function () {
            if (this.index >= this.text.length) {
                return null;
            }
            for (var i = 0; i < tokenClasses.length; ++i) {
                var tokenClass = tokenClasses[i];
                if (tokenClass.prototype.match(this.text, this.index)) {
                    var token = new tokenClass(this.text, this.index);
                    this.index += token.getLength();
                    return token;
                }
            }
            throw 'tokenization error';
        },
        lookAhead: function (count) {
            count = count || 1;
            var index = this.index;
            var tokens = [];
            for (var i = 0; i < count; ++i) {
                var token = this.getNextToken();
                tokens.push(token);
            }
            this.index = index;
            if (count === 1) {
                return tokens[0];
            } else {
                return tokens;
            }
        }
    };

    module.TwitterDocument = function () {
        this.init.apply(this, arguments);
    };
    module.TwitterDocument.prototype = {
        init: function (text) {
            this.nodes = [];
            this.parse(text);
        },
        parse: function (text) {
            var tokenizer = new module.Tokenizer(text);
            while (true) {
                var token = tokenizer.lookAhead(1);
                if (!token) {
                    break;
                }
                var node = null;
                if (token instanceof module.WhitespaceToken) {
                    node = new module.TwitterTextNode();
                }
                if (token instanceof module.TextToken) {
                    node = new module.TwitterTextNode();
                }
                if (token instanceof module.UserToken) {
                    node = new module.TwitterUserNode();
                }
                if (!node) {
                    throw 'parse error ' + token.toString();
                }
                node.parse(tokenizer);
                this.nodes.push(node);
            }
        }
    };

    module.TwitterTextNode = function () { }
    module.TwitterTextNode.prototype = {
        parse: function (tokenizer) {
            this.text = tokenizer.getNextToken().toString();
        }
    }

    module.TwitterUserNode = function () { }
    module.TwitterUserNode.prototype = {
        parse: function (tokenizer) {
            tokenizer.getNextToken(); // consume @-token
            this.user = tokenizer.getNextToken().toString();
        }
    }

    var twitterDocument = new module.TwitterDocument('Hello World @sap');

})();