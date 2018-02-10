import {getJobOverview, getJobDetails, getWorkflow} from './jenkins-api.js'

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
    
        getPipeline(jobOverview.lastCompletedBuild);
    });

function renderPipeline(pipeline) {
    let output = ""
    for(let stageIdx in pipeline.stages) {
        const stage = pipeline.stages[stageIdx];
        output += `<div class="stage">${stage.name}<br/>(${periodSeconds(stage.durationMs)})</div>`
    }
    return output;
}


function getPipeline(buildNumber) {
    getWorkflow(buildNumber)
        .then(function(pipeline) {
            console.log(JSON.stringify(pipeline));
            document.getElementById("pipeline").innerHTML = renderPipeline(pipeline);
        });
}

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

function periodSeconds(period) {
    let diff = period;
    const minutes = Math.floor(diff / (1000*60));
    diff = diff % (1000*60);
    const seconds = Math.floor(diff / 1000)
    let minutesOutput = ""    
    if(minutes > 0) {
        minutesOutput += `${minutes} min `
    }
    return `${minutesOutput}${seconds} sec`
    
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