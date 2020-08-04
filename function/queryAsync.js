const con = require("./getDBConnection.js")
module.exports = function (request) {
    return new Promise(function(resolve, reject){
    con.query(request, function(err, result) {
        if (err) return reject(err);
          resolve(result);
    })
})
}