import {JenkinsApi} from "./jenkins-api.js"

export class DurationView extends HTMLElement {
    constructor() {
        super();
        this.jenkinsApi = new JenkinsApi();
        let that = this;
        this.jenkinsApi.getJobOverview().then(function(jobOverview) {
            let buildNumber;
            let style;
            if (that.isCurrentlySuccessful(jobOverview)) {
                buildNumber = jobOverview.lastUnsuccessfulBuild;
                style = "successful";
            } else {
                buildNumber = jobOverview.lastUnsuccessfulBuild;
                style = "unsuccessful";
            }
            
            that.getDurationText(buildNumber, jobOverview.lastCompletedBuild)
                .then(function(text) {
                    that.render(text, style)
                });
        });
    }

    render(text, style) {
        this.innerHTML = `
            <h1 class="${style}">
                ${text}
            </h1>`;
    }
    
    isCurrentlySuccessful(jobOverview) {
        return jobOverview.lastSuccessfulBuild > jobOverview.lastUnsuccessfulBuild
    }
    
    getDurationText(buildNumber, lastBuildNumber) {
        return this.sinceText(buildNumber)
            .then(function(period) {
                const numBuilds = lastBuildNumber - buildNumber;
                return `${period} (${numBuilds} Builds)`
            });
    }

    sinceText(buildNumber) {
        let that = this;
        return this.jenkinsApi.getJobDetails(buildNumber)
            .then(function(job) {
                return that.periodMinutes(Date.now() - job.timestamp);
            });
    }

    periodMinutes(period) {
        let diff = period;
        const hours = Math.floor(diff / (1000*60*60));
        diff = diff % (1000*60*60);
        const minutes = Math.floor(diff / (1000*60));
        let hoursOutput = ""
        if(hours > 0) {
            hoursOutput += `${hours} h `
        }
        return `${hoursOutput}${minutes} min`;
    }
}