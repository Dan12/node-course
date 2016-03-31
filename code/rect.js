// module.exports = function(){
//     return {
//         perimeter: function(x,y) {return(2*(x+y));},
//         area: function(x,y) {return (x*y);}
//     };
// }

exports.perimeter = function(x,y){
    return 2*(x+y);
}

// exports is alias for module.exports
exports.area = function(x,y){
    return x*y;
}