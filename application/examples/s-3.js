var argv = require("yargs")
    .usage('Usuage: node $0 --l=[num] --n[num]')
    .demand(['l','b'])
    .argv;
    
var rect = require("./rect-2");    

function solveRect(l,b){
    console.log(l+","+b);
    
    rect(l,b, function(err,rectangle){
        // if no error, error is set to null
        if(err){
           console.log(err);
        } 
        else{
           console.log("Per "+rectangle.perimeter());
        }
    });
}

solveRect(argv.l, argv.b);