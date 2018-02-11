import {JenkinsApi} from "./jenkins-api.js"
import {findAttribute} from "./find-attribute.js"

export class DashboardView extends HTMLElement {
    constructor() {
        super();        
        this.jenkinsApi = new JenkinsApi(findAttribute(this, "pipeline").value);
        this.loadAndRepeat(10000);
    }
    
    loadAndRepeat(waitMs) {
        let that = this;
        this.load().then(setTimeout(function() { that.loadAndRepeat(waitMs) }, waitMs));
    }
    
    load() {
        return this.jenkinsApi.getJobOverview().then(jobOverview => this.render(jobOverview));
    }
    
    render(jobOverview) {
        this.innerHTML = `
            
            <div class="header">
                ${this.renderDuration(jobOverview)}
                <div class="right">
                    <div class="title">${jobOverview.name}</div>
                    ${this.renderChangeset(jobOverview)}
                </div>
            </div>
            ${this.renderPipelines(jobOverview)}`;
    }

    renderChangeset(jobOverview) {
        return `<changeset-view buildNumber="${jobOverview.lastBuild}"></changeset-view>`
    }
    
    renderDuration(jobOverview) {
        return `
            <duration-view 
                lastSuccessfulBuild="${jobOverview.lastSuccessfulBuild}"
                lastCompletedBuild="${jobOverview.lastCompletedBuild}"
                lastUnsuccessfulBuild="${jobOverview.lastUnsuccessfulBuild}"
            ></duration-view>`;
    }
    
    renderPipelines(jobOverview) {
        const runningPipeline = this.isPipelineRunning(jobOverview) ? this.renderPipeline(jobOverview.lastBuild) : "";
        
        const completedPipeline = this.renderPipeline(jobOverview.lastCompletedBuild);
        
        return runningPipeline + completedPipeline;
    }
    
    renderPipeline(buildNumber) {
        return `<pipeline-view buildNumber="${buildNumber}"></pipeline-view>`;
    }
    
    isPipelineRunning(jobOverview) {
        return jobOverview.lastBuild > jobOverview.lastCompletedBuild;
    }
}