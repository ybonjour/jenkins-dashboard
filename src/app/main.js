import {getJobOverview, getJobDetails, getWorkflow} from "./jenkins-api.js"
import {PipelineView} from "./pipeline-view.js"

customElements.define("pipeline-view", PipelineView);

getJobOverview()
    .then(function(jobOverview) {
        const durationElement = document.getElementById("duration");
        let buildNumber;
        let cssClass;
        if (isCurrentlySuccessful(jobOverview)) {
            buildNumber = jobOverview.lastUnsuccessfulBuild;
            durationElement.className = "successful";
        } else {
            buildNumber = jobOverview.lastUnsuccessfulBuild;
            durationElement.className = "unsuccessful";
        }
        getDurationText(buildNumber, jobOverview.lastCompletedBuild)
            .then(function(text) {
                durationElement.innerHTML = text;
            });
    });

function isCurrentlySuccessful(jobOverview) {
    return jobOverview.lastSuccessfulBuild > jobOverview.lastUnsuccessfulBuild
}

function getDurationText(buildNumber, lastBuildNumber) {
    return sinceText(buildNumber)
        .then(function(period) {
            const numBuilds = lastBuildNumber - buildNumber;
            return `${period} (${numBuilds} Builds)`
        });
}

function sinceText(buildNumber) {
    return getJobDetails(buildNumber)
        .then(function(job) {
            return periodMinutes(job.timestamp, Date.now());
        });
}

function periodMinutes(from, to) {
    let diff = to - from;
    const hours = Math.floor(diff / (1000*60*60));
    diff = diff % (1000*60*60);
    const minutes = Math.floor(diff / (1000*60));
    let hoursOutput = ""
    if(hours > 0) {
        hoursOutput += `${hours} h `
    }
    return `${hoursOutput}${minutes} min`;
}