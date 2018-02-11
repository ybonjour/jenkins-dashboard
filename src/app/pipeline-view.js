import {JenkinsApi} from "./jenkins-api.js"
import {findAttribute} from "./find-attribute.js"

export class PipelineView extends HTMLElement {
    constructor() {
        super();
        const buildNumber = this.attributes["buildNumber"].value;
        
        this.jenkinsApi = new JenkinsApi(findAttribute(this, "pipeline").value);
        this.jenkinsApi.getPipeline(buildNumber).then(pipeline => {
            this.render(pipeline);
        });
    }
    
    render(pipeline) {
        this.innerHTML = `<div class="pipeline">
            ${this.renderStages(pipeline)}
        </div>
        `
    }
    
    renderStages(pipeline) {
        let statusStyle = {
            "SUCCESS": "successful",
            "IN_PROGRESS": "successful progress",
            "FAILED": "unsuccessful"
        };
        
        let output = "";
        for(let stageIdx in pipeline.stages) {
            const stage = pipeline.stages[stageIdx];
            const style = statusStyle[stage.status];
            output += `<div class="stage ${style}">${stage.name}<br/>(${this.periodSeconds(stage.durationMs)})</div>`
        }
        return output;
    }
    
    periodSeconds(period) {
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
}