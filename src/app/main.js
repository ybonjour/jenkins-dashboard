import {getJobOverview, getJobDetails, getWorkflow} from "./jenkins-api.js"
import {PipelineView} from "./pipeline-view.js"
import {DurationView} from "./duration-view.js"

customElements.define("pipeline-view", PipelineView);
customElements.define("duration-view", DurationView);