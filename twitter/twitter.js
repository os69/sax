(function () {

    "use strict";

    var module = {};

    var extend = function (obj1, obj2) {
        for (var key in obj2) {
            obj1[key] = obj2[key];
        }
        return obj1;
    };

    var decode1 = function (text) {
        var entities = [
            ['amp', '&'],
            ['apos', '\''],
            ['#x27', '\''],
            ['#x2F', '/'],
            ['#39', '\''],
            ['#47', '/'],
            ['lt', '<'],
            ['gt', '>'],
            ['nbsp', ' '],
            ['quot', '"']
        ];
        for (var i = 0, max = entities.length; i < max; ++i)
            text = text.replace(new RegExp('&' + entities[i][0] + ';', 'g'), entities[i][1]);
        return text;
    }

    var decode2 = function (str) {
        return str.replace(/&#(\d+);/g, function (match, dec) {
            return String.fromCharCode(dec);
        });
    };

    var decode = function (text) {
        return decode2(decode1(text));
    };

    module.Token = function () { };
    module.Token.prototype = {
        init: function (text, index) {
            this.text = text;
            this.startIndex = index;
            this.regExp.lastIndex = this.startIndex;
            var match = this.regExp.exec(text);
            this.endIndex = this.startIndex + match[0].length;
        },
        match: function (text, index) {
            this.regExp.lastIndex = 0;
            return !!this.regExp.exec(text[index]);
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
        regExp: new RegExp('[^#@\\s]+', 'g')
    });

    module.UserToken = function () { this.init.apply(this, arguments) };
    module.UserToken.prototype = extend(new module.Token(), {
        regExp: new RegExp('[@]+', 'g')
    });

    module.HashToken = function () { this.init.apply(this, arguments) };
    module.HashToken.prototype = extend(new module.Token(), {
        regExp: new RegExp('[#]+', 'g')
    });

    module.WhitespaceToken = function () { this.init.apply(this, arguments); }
    module.WhitespaceToken.prototype = extend(new module.Token(), {
        regExp: new RegExp('\\s+', 'g')
    });

    var tokenClasses = [module.WhitespaceToken, module.HashToken, module.UserToken, module.TextToken];

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
                    var token = new tokenClass(this.text, this.index, );
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
            text = decode(text);
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
                    var text = token.toString();
                    if (text.indexOf('http://') === 0 || text.indexOf('https://') === 0) {
                        node = new module.TwitterLinkNode();
                    } else {
                        node = new module.TwitterTextNode();
                    }
                }
                if (token instanceof module.UserToken) {
                    node = new module.TwitterUserNode();
                }
                if (token instanceof module.HashToken) {
                    node = new module.TwitterHashNode();
                }
                if (!node) {
                    throw 'parse error ' + token.toString();
                }
                node.parse(tokenizer);
                this.nodes.push(node);
            }
        },
        render: function (parentNode) {
            for (var i = 0; i < this.nodes.length; ++i) {
                var node = this.nodes[i];
                node.render(parentNode);
            }
        }
    };

    module.TwitterTextNode = function () { }
    module.TwitterTextNode.prototype = {
        parse: function (tokenizer) {
            this.text = tokenizer.getNextToken().toString();
        },
        render: function (parentNode) {
            parentNode.appendChild(document.createTextNode(this.text));
        }
    }

    module.TwitterUserNode = function () { }
    module.TwitterUserNode.prototype = {
        parse: function (tokenizer) {
            tokenizer.getNextToken(); // consume @-token
            this.user = tokenizer.getNextToken().toString();
        },
        render: function (parentNode) {
            parentNode.appendChild(document.createTextNode('@'+this.user));
        }
    }

    module.TwitterHashNode = function () { }
    module.TwitterHashNode.prototype = {
        parse: function (tokenizer) {
            tokenizer.getNextToken(); // consume #-token
            this.hashTag = tokenizer.getNextToken().toString();
        },
        render: function (parentNode) {
            parentNode.appendChild(document.createTextNode('#'+this.hashTag));
        }
    }

    module.TwitterLinkNode = function () { }
    module.TwitterLinkNode.prototype = {
        parse: function (tokenizer) {
            this.url = tokenizer.getNextToken().toString();
        },
        render: function (parentNode) {
            parentNode.appendChild(document.createTextNode(this.url));
        }
    }

    module.renderTweet = function(tweet){
        var twitterDocument = new module.TwitterDocument(tweet);
        twitterDocument.render(document.body);    
    }

    module.renderTweet('text #tag @user &gt; http://test.com');

})();