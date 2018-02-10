import {getJobInfo} from './jenkins-api.js'
import $ from '../node_modules/jquery/dist/jquery.js'

getJobInfo()
   .then(function(json) {
        $("#content").text(JSON.stringify(json));
    })
   .catch(function(error) {
        $("#error").text(JSON.stringify(error));
    });