import {getJobInfo} from 'jenkins-api'
import $ from 'jquery'

getJobInfo()
   .then(function(json) {
        $("#content").text(JSON.stringify(json));
    })
   .catch(function(error) {
        $("#error").text(JSON.stringify(error));
    });