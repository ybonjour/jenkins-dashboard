import {JenkinsApi} from "./jenkins-api.js"

export class ChangesetView extends HTMLElement {
    constructor() {
        super();
        this.jenkinsApi = new JenkinsApi();
        const buildNumber = this.attributes["buildNumber"].value;
        
        this.jenkinsApi.getChangesets(buildNumber)
            .then(changesets => this.parse(changesets));
    }
    
    
    parse(changesets) {
        console.log(changesets);
        let changesetsOutput = "";
        for(let changesetIdx in changesets) {
            const changeset = changesets[changesetIdx];
            changesetsOutput += `<li>${changeset.message} - ${changeset.author}</li>`;
        }
        
        this.innerHTML = `<ul>${changesetsOutput}</ul>`;
    }
}