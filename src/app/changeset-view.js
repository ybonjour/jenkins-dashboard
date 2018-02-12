import {JenkinsApi} from "./jenkins-api.js"
import {findAttribute} from "./find-attribute.js"

export class ChangesetView extends HTMLElement {
    constructor() {
        super();
        this.jenkinsApi = new JenkinsApi(findAttribute(this, "pipeline").value);
        const buildNumber = this.attributes["buildNumber"].value;
        
        this.jenkinsApi.getChangesets(buildNumber)
            .then(changesets => this.parse(changesets));
    }
    
    parse(changesets) {
        let changsetList = "";
        let author = "";
        for(let changesetIdx in changesets) {
            if(changesetIdx >= 4) {
                changsetList += `<li>...</li>`
                break;
            }
            const changeset = changesets[changesetIdx];
            changsetList += `<li>${changeset.message}</li>`;
        }
        
        if(changesets.length > 0) {
            const author = changesets[0].author;
            this.innerHTML = `
                <div class="committer">
                    <img src="committer.jpg" alt="${author}" />
                    <p>${author}</p>
                </div>
                <ul class="changeset">${changsetList}</ul>`;
        } else {
            this.innerHTML = `<div class="committer">
                    <img src="committer.jpg" alt="No changes" />
                </div>
                <ul class="changeset"><li>No Changes</li></ul>`;
        }
    }
}