export class JenkinsApi {
    constructor(jobPath) {
        this.jobPath = jobPath;
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
            .then(json => this.selectPipeline(buildNumber, json))
            .then(json => this.parsePipeline(json))
    }
    
    getChangesets(buildNumber) {
        return fetch(this.workflowEndpoint(`${this.jobPath}/${buildNumber}`, "changesets"))
            .then(response => response.json())
            .then(json => this.parseChangesets(json));
    }
                  
    parseChangesets(json) {
        let changesets = [];
        for(let changesetIdx in json) {
            const changeset = json[changesetIdx];
            const commits = changeset["commits"];
            for(let commitIdx in commits) {
                const commit = commits[commitIdx];
                changesets.push({
                    "message": commit["message"],
                    "author": commit["authorJenkinsId"]
                });
            }
        }
        return changesets;
    }

    selectPipeline(buildNumber, json) {
        for(let elementIdx in json){
            const element = json[elementIdx];
            if(Number(element["id"]) == buildNumber) {
                return element;
            }
        }
        return {};
    }

    workflowEndpoint(path, workflowEndpoint) {
        return `jenkins/${path}/wfapi/${workflowEndpoint}`;
    }

    parsePipeline(json) {
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
            lastCompletedBuild: json["lastCompletedBuild"]["number"],
            lastBuild: json["lastBuild"]["number"]
        };
    }

    parseJobDetails(json) {
        return {
            timestamp: json["timestamp"],
            duration: json["duration"]
        }
    }

    jsonBody(response) {
        return response.json();
    }
}