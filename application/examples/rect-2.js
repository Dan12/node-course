// callback function: first parameter is the error
// the second parameter is filled with information

module.exports = function(x,y,callback){
    try{
        if(x<0 || y < 0){
            // error message returned to the main application
            // error caught by catch
            throw new Error("Rect dims are wrong (neg)");
        }
        else{
            callback(null, {
                // closures
                // perimeter and area function don't take any values
                // x and y from outer function
                perimeter: function() {
                    return 2*(x+y);
                },
                // x and y is used in inner function
                area: function() {
                    return x*y;
                }
            });
        }
    }
    catch (error) {
        // convention that the first variable is the error
        callback(error,null);
    }
}