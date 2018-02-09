define(function(require) {
    const jenkinsApi = require('./jenkins-api');
    const jquery = require('jquery');
    
    jenkinsApi.getJobInfo()
       .then(function(json) {
            jquery("#content").text(JSON.stringify(json));
        })
       .catch(function(error) {
            jquery("#error").text(JSON.stringify(error));
        });
});