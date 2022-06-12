let mySites = []

const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const delBtn = document.getElementById("del-btn")
const saveBtn = document.getElementById("save-btn")
const sitesFromLocalStorage = JSON.parse(localStorage.getItem("mySites"))

if (sitesFromLocalStorage) {
    mySites = sitesFromLocalStorage
    render(mySites)
}

function render(sites) {
    let listItems = ""
    for (let i = 0; i < sites.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${sites[i]}'>
                    ${sites[i]}
                </a>
            </li>
    `
    }
    ulEl.innerHTML = listItems
}

inputBtn.addEventListener("click", function() {
    mySites.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("mySites", JSON.stringify(mySites))
    render(mySites)
})

inputEl.addEventListener("keypress", (event)=> {
    if (event.keyCode === 13) {
        event.preventDefault();
        mySites.push(inputEl.value)
        inputEl.value = ""
        render(mySites)
    }
})

saveBtn.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        mySites.push(tabs[0].url)
        localStorage.setItem("mySites", JSON.stringify(mySites))
        render(mySites)
    })
})

delBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    while (mySites.length > 0) {
        mySites.pop()
    }
    render(mySites)
})

