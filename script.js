// Get the form and result container elements
var form = document.getElementById("myForm");
var resultContainer = document.getElementById("result");

// Add event listener to form submission
form.addEventListener('submit', function(e) {
    e.preventDefault();
    fetchProfile();
});

// Function to fetch user profile
function fetchProfile() {
    var search = document.getElementById("search").value;
    var originalName = search.split(' ').join('');

    // Send fetch request to GitHub API
    fetch("https://api.github.com/users/" + originalName)
        .then((result) => {
            // Check if rate limit exceeded
            if (result.status === 403) {
                // Get rate limit reset time
                var rateLimitReset = new Date(result.headers.get('X-RateLimit-Reset') * 1000);
                throw new Error("Rate limit exceeded. Try again after " + rateLimitReset.toLocaleString());
            }
            // Check username length
            if (originalName.length > 30) {
                throw new Error("Username must not exceed 30 characters");
            }
            // Check if user not found
            if (!result.ok) {
                throw new Error("User not found");
            }
            // Parse response JSON
            return result.json();
        })
        .then((data) => {
            displayProfile(data);
        })
        .catch((error) => {
            // Handle errors and display error message
            resultContainer.innerHTML = `
                <p>${error.message}</p>
                <button onclick="refreshPage()">Try Again</button>
            `;
        });
}

// Function to display user profile
function displayProfile(profile) {
    // Clear previous result
    resultContainer.innerHTML = '';

    // Create elements to display user details
    var avatar = document.createElement('img');
    avatar.src = profile.avatar_url;
    avatar.alt = "User Avatar";
    avatar.classList.add('avatar-small');

    var username = document.createElement('h2');
    username.textContent = profile.login;

    var bio = document.createElement('p');
    bio.textContent = "Bio: " + (profile.bio ? profile.bio : "No bio available");

    var following = document.createElement('p');
    following.textContent = "Following: " + profile.following;

    var followers = document.createElement('p');
    followers.textContent = "Followers: " + profile.followers;

    var location = document.createElement('p');
    location.textContent = "Location: " + (profile.location ? profile.location : "Not specified");

    var repos = document.createElement('p');
    repos.textContent = "Public Repositories: " + profile.public_repos;

    // Append elements to result container
    resultContainer.appendChild(avatar);
    resultContainer.appendChild(username);
    resultContainer.appendChild(bio);
    resultContainer.appendChild(following);
    resultContainer.appendChild(followers);
    resultContainer.appendChild(location);
    resultContainer.appendChild(repos);
}

// Function to refresh the page
function refreshPage() {
    location.reload();
}
