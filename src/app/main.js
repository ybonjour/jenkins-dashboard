define(function(require) {
   var jenkinsApi = require('./jenkins-api') 
   jenkinsApi.getJobInfo()
       .then(function(json) {
            console.log("Got a response");
            console.log(json); })
       .catch(function(error) {
            console.log("Got an error");
            console.log(error); });
});