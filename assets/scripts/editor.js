var seconds = 0;
var editorarea = document.getElementById("editorarea");
var renderloading = document.getElementById("renderloading");
var renderarea = document.getElementById("renderarea");
var messagearea = document.getElementById("messagearea");
var messagediv = document.getElementsByClassName("message")[0];
var savebtn = document.getElementById("savebtn");

function parseMarkdown() {
    renderarea.classList.add("hidden");
    renderloading.classList.remove("hidden");
    var data = new FormData();
    data.append("cleartext", editorarea.value);

    fetch("/api/parse.php", {
        method: "POST",
        headers: {},
        body: data
    }).then((response) => {
        return response.json();
    }).then((value) => {
        if (value.status != true) {
            messagearea.innerHTML = value.message;
            messagediv.classList.remove("hidden");
        } else {
            renderarea.innerHTML = value.result;
            messagediv.classList.add("hidden");
        }
        renderloading.classList.add("hidden");
        renderarea.classList.remove("hidden");
    });
}

function saveFile() {
    var a = document.createElement("a");
    a.href = window.URL.createObjectURL(new Blob([editorarea.value], { type: "text/markdown" }));
    a.download = "markdownfile.md";
    a.click();
    savebtn.setAttribute("disabled", "");
}

function toggleSpellcheck() {
    if(editorarea.getAttribute("spellcheck") == "true") {
        editorarea.setAttribute("spellcheck", "false")
    }
    else {
        editorarea.setAttribute("spellcheck", "true");
    }
}

parseMarkdown();

editorarea.addEventListener("input", function (ev) {
    seconds = 2;
    savebtn.removeAttribute("disabled");
});

setInterval(function () {
    if (seconds > 0) {
        seconds--;
        if (seconds == 0) {
            parseMarkdown()
        }
    }
}, 1000);