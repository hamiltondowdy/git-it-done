var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");



var getUserRepos = function(user) {
    var apiUrl = "https://api.github.com/users/"+ user + "/repos";
    // Make a request to the url
        fetch(apiUrl).then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    displayRepos(data, user);
                });
            } else {
                alert("Error: User Not Found");
        }
    })
    .catch(function(error) {
        alert("Unable to connect to Github");
    });
}
        

var formSubmitHandler = function(event) {
    event.preventDefault();
    //get the value from input element
    var username = nameInputEl.value.trim();

    if(username) {
        getUserRepos(username);
        nameInputEl.value = "";
    } else {
        alert("Enter a valid GitHub username");
    }
};

var displayRepos = function(repos, searchTerm) {
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;

    //check if api returns any repos at all
    if (repos.length === 0) {
        repoContainerEl.textContent = "No Repositories Found";
        return;
    }

    //loop through repos
    for (var i = 0; i < repos.length; i++) {
        //format repo name
        var repoName = repos[i].owner.login + "/" + repos[i].name;

        //create container for each repo
        var repoEl = document.createElement("div");
        repoEl.classList = "list-item flex-row justify-space-between align-center";

        //create span element to hold repo name
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;

        //create status element
        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";

        //check if the current repo has open issues
        if(repos[i].open_issues_count > 0) {
            statusEl.innerHTML = 
            "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
        } else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }

        //append to container
        repoEl.appendChild(statusEl);

        //append to container
        repoEl.appendChild(titleEl);

        //append container to DOM
        repoContainerEl.appendChild(repoEl);
    }
}

userFormEl.addEventListener("submit", formSubmitHandler);