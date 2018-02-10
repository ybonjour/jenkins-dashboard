export class JenkinsApi {
    constructor() {
        this.jobPath = "job/coop.mws.pipeline-ERGOneo/job/master";    
    }

    getJobOverview(){
        return fetch(this.jenkinsEndpoint(this.jobPath))
            .then(response => response.json())
            .then(json => this.parseJobOverview(json));
    }

    getJobDetails(buildNumber) {
        return fetch(this.jenkinsEndpoint(`${this.jobPath}/${buildNumber}`))
            .then(response => response.json())
            .then(json => this.parseJobDetails(json))
    }

    getPipeline(buildNumber) {
        return fetch(this.workflowEndpoint(this.jobPath, `runs?since=%23${buildNumber}`))
            .then(response => response.json())
            .then(this.selectJob(buildNumber))
            .then(job => this.parseWorkflow(job))
    }

    selectJob(buildNumber) {
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

    workflowEndpoint(path, workflowEndpoint) {
        return `jenkins/${path}/wfapi/${workflowEndpoint}`;
    }

    parseWorkflow(json) {
        return {
            buildNumber: Number(json["id"]),
            stages: this.parseStages(json["stages"])       
        }
    }

    parseStages(json) {
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

    jenkinsEndpoint(path) {
        return `jenkins/${path}/api/json`
    }

    parseJobOverview(json) {
        return {
            lastSuccessfulBuild: json["lastSuccessfulBuild"]["number"],
            lastUnsuccessfulBuild: json["lastUnsuccessfulBuild"]["number"],
            lastCompletedBuild: json["lastCompletedBuild"]["number"]
        };
    }

    parseJobDetails(json) {
        return {
            timestamp: json["timestamp"]
        }
    }

    jsonBody(response) {
        return response.json();
    }
}