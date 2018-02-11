import {DashboardsView} from "./dashboards-view.js"
import {DashboardView} from "./dashboard-view.js"
import {PipelineView} from "./pipeline-view.js"
import {DurationView} from "./duration-view.js"
import {ChangesetView} from "./changeset-view.js"

customElements.define("dashboards-view", DashboardsView);
customElements.define("dashboard-view", DashboardView);
customElements.define("pipeline-view", PipelineView);
customElements.define("duration-view", DurationView);
customElements.define("changeset-view", ChangesetView);
