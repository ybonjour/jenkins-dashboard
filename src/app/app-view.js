import {JenkinsApi} from "./jenkins-api.js"
import {PipelineView} from "./pipeline-view.js"
import {DurationView} from "./duration-view.js"

export class AppView extends HTMLElement {
    constructor() {
        super();
        customElements.define("pipeline-view", PipelineView);
        customElements.define("duration-view", DurationView);
        
        this.jenkinsApi = new JenkinsApi();
        
        this.jenkinsApi.getJobOverview().then(jobOverview => this.render(jobOverview));
    }
    
    render(jobOverview) {
        this.innerHTML = `
            <duration-view 
                lastSuccessfulBuild="${jobOverview.lastSuccessfulBuild}"
                lastCompletedBuild="${jobOverview.lastCompletedBuild}"
                lastUnsuccessfulBuild="${jobOverview.lastUnsuccessfulBuild}"
            ></duration-view>
            <pipeline-view buildNumber="${jobOverview.lastCompletedBuild}"></pipeline-view>
        `;
    }
}