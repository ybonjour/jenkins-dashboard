import {getJobInfo, isCurrentlySuccessful, numberOfSuccessfulBuilds} from './jenkins-api'
import $ from 'jquery'

getJobInfo()
   .then(function(jobinfo) {
        let text;
        if (isCurrentlySuccessful(jobinfo)) {
            text = `All good since ${numberOfSuccessfulBuilds(jobinfo)} builds`
        } else {
            text = `Failing since ${numberOfUnsuccessfulBuilds(jobinfo)} builds`
        }
        $("#content").text(text)
    })
   .catch(function(error) {
        $("#error").text(JSON.stringify(error));
    });
