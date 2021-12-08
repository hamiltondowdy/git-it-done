var issueContainerEl = document.querySelector("#issues-container");


var getRepoIssues = function(repo) {
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";

    fetch(apiUrl).then(function(response) {
        //request successful
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
            });
        } else {
            alert("error: request invalid");
        }
    });
};

var displayIssues = function(issues) {
    fetch(apiUrl).then(function(response) {
    if (issues.length === 0) {
        issueContainerEl.textContent = "No Open Issues";
        return;
    }
    // request successful
    if (response.ok) {
        response.json().then(function(data) {
            //pass data to DOM function
            displayIssues(data);
        });
    } else {
        alert("error: request invalid");
    }
});

for (var i = 0; i < issues.length; i++) {
    // create a link element to take users to the issue on GitHub
    var issueEl = document.createElement("a");
    issueEl.classList = "list-item flex-row justify-space-between align-center";
    issueEl.setAttribute("href", issues[i].html_url);
    issueEl.setAttribute("target", "_blank");

    //create span to hold issue title
    var titleEl = document.createElement("span");
    titleEl.textContent = issues[i].title;

    //append to container
    issueEl.appendChild(titleEl);

    //create type element
    var typeEl = document.createElement("span");

    //check if issue is an actual issue or pull
    if (issues[i].pull_request) {
        typeEl.textContent = "(Pull request)";
    } else {
        typeEl.textContent = "(Issue)";
    }

    //append to container
    issueEl.appendChild(typeEl);

    issueContainerEl.appendChild(issueEl);
}
};

getRepoIssues("facebook/react");