const jobOverview = "job/coop.mws.pipeline-ERGOneo/job/master"

export function getJobOverview(){
    return fetch(jenkinsEndpoint(jobOverview))
        .then(jsonBody)
        .then(parseJobOverview);
}

export function getJobDetails(buildNumber) {
    return fetch(jenkinsEndpoint(`${jobOverview}/${buildNumber}`))
    .then(jsonBody)
    .then(parseJobDetails)
}

export function getWorkflow(buildNumber) {
    return fetch(workflowEndpoint(jobOverview, `runs?since=%23${buildNumber}`))
        .then(jsonBody)
        .then(selectJob(buildNumber))
        .then(parseWorkflow)
}

function selectJob(buildNumber) {
    return function(json) {
        for(let elementIdx in json){
            const element = json[elementIdx];
            if(Number(element["id"]) == buildNumber) {
                return element;
            }
        }
        return {};
    }
}

function workflowEndpoint(path, workflowEndpoint) {
    return `jenkins/${path}/wfapi/${workflowEndpoint}`;
}

function parseWorkflow(json) {
    return {
        buildNumber: Number(json["id"]),
        stages: parseStages(json["stages"])       
    }
}

function parseStages(json) {
    let stages = [];
    for(let stageIdx in json) {
        const stage = json[stageIdx];
        stages.push({
            name: stage["name"],
            status: stage["status"],
            durationMs: Number(stage["durationMillis"])
        });
    }
    
    return stages;
}

function jenkinsEndpoint(path) {
    return `jenkins/${path}/api/json`
}

function parseJobOverview(json) {
    return {
        lastSuccessfulBuild: json["lastSuccessfulBuild"]["number"],
        lastUnsuccessfulBuild: json["lastUnsuccessfulBuild"]["number"],
        lastCompletedBuild: json["lastCompletedBuild"]["number"]
    };
}

function parseJobDetails(json) {
    return {
        timestamp: json["timestamp"]
    }
}

function jsonBody(response) {
    return response.json();
}
