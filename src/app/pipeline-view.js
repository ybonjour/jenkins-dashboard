import {JenkinsApi} from "./jenkins-api.js"

export class PipelineView extends HTMLElement {
    constructor() {
        super();
        this.jenkinsApi = new JenkinsApi();
        let that = this;
        this.jenkinsApi.getJobOverview().then(function(jobOverview){
            that.jenkinsApi.getPipeline(jobOverview.lastCompletedBuild).then(function(pipeline) {
                that.render(pipeline);
            }); 
        });
    }
    
    render(pipeline) {
        this.innerHTML = `<div class="pipeline">
            ${this.renderStages(pipeline)}
        </div>
        `
    }
    
    renderStages(pipeline) {
        let output = "";
        for(let stageIdx in pipeline.stages) {
            const stage = pipeline.stages[stageIdx];
            output += `<div class="stage">${stage.name}<br/>(${this.periodSeconds(stage.durationMs)})</div>`
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