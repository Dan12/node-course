var rect = require("./rect-1")

function solveRect(l,b){
    console.log(l+","+b);
    if(l < 0 || b < 0){
        console.log("error");
    }
    else{
        console.log("Area "+rect.area(l,b));
        console.log("Per "+rect.perimeter(l,b));
    }
    console.log("")
}

solveRect(2,4);
solveRect(3,5);
solveRect(-3,5);