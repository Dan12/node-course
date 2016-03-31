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

solveRect(2,4);
solveRect(3,5);
solveRect(-3,5);