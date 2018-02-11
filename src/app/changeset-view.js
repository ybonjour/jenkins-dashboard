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
        let changsetList = "";
        let author = "";
        for(let changesetIdx in changesets) {
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
        }
    }
}