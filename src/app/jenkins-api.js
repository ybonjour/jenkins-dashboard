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
        return fetch(this.jenkinsEndpoint(this.jobPath, buildNumber))
            .then(response => response.json())
            .then(json => this.parseJobDetails(json))
    }

    getPipeline(buildNumber) {
        return fetch(this.workflowEndpoint(this.jobPath, buildNumber))
            .then(response => response.json())
            .then(json => this.parsePipeline(json))
    }
    
    getChangesets(buildNumber) {
        return fetch(this.workflowEndpoint(this.jobPath, buildNumber, "changesets"))
            .then(response => response.json())
            .then(json => this.parseChangesets(json));
    }
    
    workflowEndpoint(job, buildNumber, workflowEndpoint) {
        const endpoint = workflowEndpoint ? workflowEndpoint : "";
        return `jenkins/${job}/${buildNumber}/wfapi/${endpoint}`;
    }
    
    jenkinsEndpoint(job, buildNumber) {
        const buildNumberOrEmpty = buildNumber ? buildNumber : ""
        return `jenkins/${job}/${buildNumberOrEmpty}/api/json`
    }
                  
    parseChangesets(json) {
        let changesets = [];
        let addedCommits = [];
        for(let changesetIdx in json) {
            const changeset = json[changesetIdx];
            const commits = changeset["commits"];
            for(let commitIdx in commits) {
                const commit = commits[commitIdx];
                
                if(!addedCommits.includes(commit["commitId"])) {
                    addedCommits.push(commit["commitId"]);
                    changesets.push({
                        "message": commit["message"],
                        "author": commit["authorJenkinsId"]
                    });   
                }
            }
        }
        return changesets;
    }

    parsePipeline(json) {
        return {
            buildNumber: Number(json["id"]),
            startTimeMs: json["startTimeMillis"],
            status: json["status"],
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

    parseJobOverview(json) {
        
        return {
            name: json["fullName"],
            lastSuccessfulBuild: this.numberOrDefault(json, "lastSuccessfulBuild", 1),
            lastUnsuccessfulBuild: this.numberOrDefault(json, "lastUnsuccessfulBuild", 1),
            lastCompletedBuild: this.numberOrDefault(json, "lastCompletedBuild", 1),
            lastBuild: this.numberOrDefault(json, "lastBuild", 1)
        };
    }
    
    numberOrDefault(json, name, defaultValue) {
        if(json[name] == null) {
            return defaultValue;
        }
        
        return json[name]["number"];
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