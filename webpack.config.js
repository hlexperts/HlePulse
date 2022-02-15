module.exports = {
    resolve :{
       fallback: { 
    //        "process": require.resolve("process/browser") ,
    //    "util": require.resolve("util/"),
       "path": require.resolve("path-browserify"),
       "crypto": require.resolve("crypto-browserify")
      }
       
    }
}