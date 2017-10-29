var fs = require('fs');
var child_process = require('child_process');


var send = function(){
    var result = fs.createReadStream('test2_g.jpg');
    result.pipe(process.stdout);
};

var convert = function(){ 
    var child = child_process.spawn('convert',['-type', 'Grayscale', 'test2.jpg','test2_g.jpg']);
    //child.stdout.pipe(process.stdout, { end: false });
    child.stderr.pipe(process.stderr, { end: false });
    child.on('exit',function(code){
        send();
    });
}

var writeStream = fs.createWriteStream('test2.jpg');
process.stdin.pipe(writeStream);
writeStream.on('finish', function () {
    convert();    
});