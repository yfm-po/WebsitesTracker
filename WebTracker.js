/// <reference path="globals.d.ts" />
// const inputEl = document.getElementById("input-el") as HTMLInputElement;
// const inputBtn = document.getElementById("input-btn") as HTMLButtonElement;
// const ulEl = document.getElementById("ul-el") as HTMLUListElement;
// const delBtn = document.getElementById("del-btn") as HTMLButtonElement;
// const saveBtn = document.getElementById("save-btn") as HTMLButtonElement;
// const sitesFromLocalStorage = JSON.parse(localStorage.getItem("mySites") || '[]');
var mySites = [];
if (sitesFromLocalStorage) {
    mySites = sitesFromLocalStorage;
    render(mySites);
}
function render(sites) {
    var listItems = "";
    for (var i = 0; i < sites.length; i++) {
        listItems += "<li> <a target='_blank' href='".concat(sites[i], "'> ").concat(sites[i], " </a> </li> ");
    }
    ulEl.innerHTML = listItems;
}
inputBtn.addEventListener("click", function () {
    mySites.push(inputEl.value);
    inputEl.value = "";
    localStorage.setItem("mySites", JSON.stringify(mySites));
    render(mySites);
});
inputEl.addEventListener("keypress", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        mySites.push(inputEl.value);
        inputEl.value = "";
        render(mySites);
    }
});
saveBtn.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        mySites.push(tabs[0].url);
        localStorage.setItem("mySites", JSON.stringify(mySites));
        render(mySites);
    });
});
delBtn.addEventListener("dblclick", function () {
    localStorage.clear();
    while (mySites.length > 0) {
        mySites.pop();
    }
    render(mySites);
});
