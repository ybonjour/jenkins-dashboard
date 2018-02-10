import {JenkinsApi} from "./jenkins-api.js"
import {PipelineView} from "./pipeline-view.js"
import {DurationView} from "./duration-view.js"
import {ChangesetView} from "./changeset-view.js"

export class AppView extends HTMLElement {
    constructor() {
        super();
        customElements.define("pipeline-view", PipelineView);
        customElements.define("duration-view", DurationView);
        customElements.define("changeset-view", ChangesetView);
        
        this.jenkinsApi = new JenkinsApi();
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
        this.innerHTML = this.renderDuration(jobOverview) + this.renderChangeset(jobOverview) + this.renderPipelines(jobOverview);
    }

    renderChangeset(jobOverview) {
        return `<changeset-view buildNumber="992"></changeset-view>`
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