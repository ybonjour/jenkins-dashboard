import {DashboardView} from "./dashboard-view.js"

export class DashboardsView extends HTMLElement {
    constructor() {
        super();
        customElements.define("dashboard-view", DashboardView);
        const pipeline = location.hash.substring(1);
        this.render(pipeline);
    }
    
    render(pipeline) {
        this.innerHTML = `<dashboard-view pipeline="${pipeline}"></dashboard-view>`;
    }
}