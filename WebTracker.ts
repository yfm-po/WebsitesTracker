import SitesList from './SitesList';
/// <reference path="globals.d.ts" />

const sitesList = new SitesList();
inputEl = document.getElementById("input-el") as HTMLInputElement;
inputBtn = document.getElementById("input-btn") as HTMLButtonElement;
ulEl = document.getElementById("ul-el") as HTMLUListElement;
delBtn = document.getElementById("del-btn") as HTMLButtonElement;
saveBtn = document.getElementById("save-btn") as HTMLButtonElement;

function render(sites: Site[]) {
    let listItems = "";
    for (let site of sites) {
        listItems += `<li> <a target='_blank' href='${site.getName()}'> ${site.getName()} </a> </li> `;
    }
    ulEl.innerHTML = listItems;
}

inputBtn.addEventListener("click", function() {
    const site = new Site(inputEl.value);
    sitesList.addSite(site);
    inputEl.value = "";
    render(sitesList.getSites());
});

inputEl.addEventListener("keypress", (event) => {
    if (event.keyCode === 13) {
        event.preventDefault();
        const site = new Site(inputEl.value);
        sitesList.addSite(site);
        inputEl.value = "";
        render(sitesList.getSites());
    }
});

saveBtn.addEventListener("click", function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const site = new Site(tabs[0].url);
        mySites.push(tabs[0].url);
        sitesList.addSite(site);
        localStorage.setItem("mySites", JSON.stringify(mySites));
        render(mySites);
    });
});

delBtn.addEventListener("click", function() {
    sitesList.clearSites();
    localStorage.clear();
    render(mySites);
});

showAllBtn.addEventListener("click", function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.create({ url: tabs[0].url });
    });
});

hideAllBtn.addEventListener("click", function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.remove(tabs[0].id);
    });
});

ulEl.addEventListener("click", function(event) {
    const site = new Site(event.target.textContent);
    sitesList.removeSite(site);
});

//render(sitesList.getSites());

