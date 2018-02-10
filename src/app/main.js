import {getJobInfo, isCurrentlySuccessful} from './jenkins-api'
import $ from 'jquery'

getJobInfo()
   .then(function(jobinfo) {
        if (isCurrentlySuccessful(jobinfo)) {
            $("#content").text("All good 2")
        } else {
            $("#content").text("Failing")
        }
    })
   .catch(function(error) {
        $("#error").text(JSON.stringify(error));
    });
