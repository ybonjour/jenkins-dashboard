export class DashboardsView extends HTMLElement {
    constructor() {
        super();
        const pipelines = location.hash.substring(1);
        if(pipelines != "") {
            this.render(pipelines.split("&"));    
        }
    }
    
    render(pipelines){
        for(let pipeline of pipelines) {
            console.log(pipeline);
            this.innerHTML += this.renderPipeline(pipeline);
        }
    }
    
    renderPipeline(pipeline) {
        return `<dashboard-view pipeline="${pipeline}"></dashboard-view>`;
    }
}