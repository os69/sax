define(['./Node'], function(Node){

    module = {
        createNode : function(params){
            return new Node(params);
        }
    };

    return module;

});