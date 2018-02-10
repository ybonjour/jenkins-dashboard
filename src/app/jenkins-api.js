function parseJobInfo(json) {
    return {
        lastSuccessfulBuild: json["lastSuccessfulBuild"]["number"],
        lastUnSuccessfulBuild: json["lastUnsuccessfulBuild"]["number"],
        lastCompletedBuild: json["lastCompletedBuild"]["number"]
    };
}

export function getJobInfo(){
    return fetch('jenkins/job/coop.mws.pipeline-ERGOneo/job/master/api/json')
        .then(function(response) { return response.json(); })
        .then(parseJobInfo);
}

export function isCurrentlySuccessful(jobInfo) {
    return jobInfo.lastSuccessfulBuild > jobInfo.lastUnSuccessfulBuild
}