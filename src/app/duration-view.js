import {JenkinsApi} from "./jenkins-api.js"

export class DurationView extends HTMLElement {
    constructor() {
        super();
        this.jenkinsApi = new JenkinsApi();
        this.lastSuccessfulBuild = Number(this.attributes["lastSuccessfulBuild"].value);
        this.lastUnsuccessfulBuild = Number(this.attributes["lastUnsuccessfulBuild"].value);
        this.lastCompletedBuild = Number(this.attributes["lastCompletedBuild"].value);
        
        const lastDifferentBuild = this.isCurrentlySuccessful() ? this.lastUnsuccessfulBuild : this.lastSuccessfulBuild;
        const style = this.isCurrentlySuccessful() ?  "successful" : "unsuccessful";

        this.getDurationText(lastDifferentBuild, this.lastCompletedBuild)
            .then(text => this.render(text, style));
    }

    render(text, style) {
        this.innerHTML = `
            <h1 class="${style}">
                ${text}
            </h1>`;
    }
    
    isCurrentlySuccessful() {
        return this.lastSuccessfulBuild > this.lastUnsuccessfulBuild
    }
    
    getDurationText(buildNumber, lastBuildNumber) {
        return this.sinceText(buildNumber)
            .then(period => {
                const numBuilds = lastBuildNumber - buildNumber;
                return `${period} (${numBuilds} Builds)`
            });
    }

    sinceText(buildNumber) {
        return this.jenkinsApi.getJobDetails(buildNumber)
            .then(job => {
                const diff = Date.now() - (job.timestamp + job.duration);
                return this.periodMinutes(diff)
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