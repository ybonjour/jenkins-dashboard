function parse(json) {
    return {
        lastSuccessfulBuild: json["lastSuccessfulBuild"]["number"],
        lastUnSuccessfulBuild: json["lastUnsuccessfulBuild"]["number"],
        lastCompletedBuild: json["lastCompletedBuild"]["number"]
    };
}

export function getJobInfo(){
    return fetch('jenkins/job/coop.mws.pipeline-ERGOneo/job/master/api/json')
        .then(function(response) { return response.json(); })
        .then(parse);
} 