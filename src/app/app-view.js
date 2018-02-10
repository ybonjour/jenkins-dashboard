import {JenkinsApi} from "./jenkins-api.js"
import {PipelineView} from "./pipeline-view.js"
import {DurationView} from "./duration-view.js"

export class AppView extends HTMLElement {
    constructor() {
        super();
        console.log("created");
        customElements.define("pipeline-view", PipelineView);
        customElements.define("duration-view", DurationView);
        this.render();
//        this.jenkinsApi.getJobOverview().then(jobOverview => this.render(jobOverview));
    }
    
    render() {
        
        this.innerHTML = `
            <duration-view></duration-view>
            <pipeline-view></pipeline-view>
        `;
    }
}