let essentialBlog = {
    status: "Draft",
    views: 40,
    comments: 133,
    date: "07/05/2020"
};

let ajaxBlog = {
    status: "Published",
    views: 80,
    comments: 149,
    date: "08/22/2023"
};

function toggle(blog, buttonId, statusId) {
let button = document.getElementById(buttonId);
let status = document.getElementById(statusId);

    if (blog.status === "Draft") {
        blog.status = "Archived";
        button.innerHTML = "Archive";
        status.innerHTML = "STATUS: Draft";
    } else if (blog.status === "Archived") {
        blog.status = "Published";
        button.innerHTML = "Publish";
        status.innerHTML = "STATUS: Archived";
    } else {
        blog.status = "Draft";
        button.innerHTML = "Draft";
        status.innerHTML = "STATUS: Published";
    }
    viewCount.textContent = blog.views;
}
function comments() {
    essentialBlog.comments++;
    document.getElementById("comments").innerText = essentialBlog.comments;
}

function comment() {
    ajaxBlog.comments++;
    document.getElementById("commentCount").innerText = ajaxBlog.comments;
}

function read(blogType) {
let currentDate = new Date();
let currentTime = currentDate.toLocaleTimeString();
currentDate = currentDate.toLocaleDateString();
if (blogType === "js") {
    essentialBlog.views++;
    document.getElementById("views").innerText = essentialBlog.views;
    document.getElementById("date").innerText = currentDate;
    document.getElementById("time").innerText = currentTime;
} else if (blogType === "xml") {
    ajaxBlog.views++;
    document.getElementById("viewCount").innerText = ajaxBlog.views;
    document.getElementById("datexml").innerText = currentDate;
    document.getElementById("timexml").innerText = currentTime;
}
}
