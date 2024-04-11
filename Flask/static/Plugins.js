let height = document.documentElement.clientHeight;
let width = document.documentElement.clientWidth;
console.log(width)
document.querySelector('.grid-container').style.height = height + "px";
document.querySelector('.content').style.height = height + "px";
let base_url = window.location.href.split("plugins")[0]
let open = false;
const sidebar = document.querySelector('.sidebar');
const iconbutton = document.querySelector('.menu-icon');

document.querySelector('.menu-icon').onclick = function() {
    sidebar.classList.toggle('open-sidebar');
    iconbutton.classList.toggle('open-menu-icon');

}

let pluginJson;
async function getPluginsList() {
    const res = await fetch("/api/plugins/list")

    pluginJson = await res.json();

    return pluginJson;
}

function display_one_plugin_from_json(element, index, array) {

    const icon_url = document.getElementById("WillBeHideItsJustToGetIconUrl").src;
    console.log(element)
    name = element["name"]
    author = element["author"]
    updated = elapsedTime(element["updated"])
    description = element["description"]

    let html = `
    <div class="card">
                <div class="firstrow">
                    <div class="firstcolumn">
                        <p class="Title">${name}</p>
                        <p class="Author">By ${author}</p>
                        <p class="updated">${updated}</p>
                    </div>
                    <div class="secondcolumn">
                        <img src="${icon_url}" class="install" id="${name}">
                    </div>
                </div>
                <div class="secondrow">
                    <p class="description">${description}</p>
                </div>
            </div>
    `
    let div = document.querySelector(".content")
    div.innerHTML = div.innerHTML + html
    document.getElementById(name).addEventListener("click", (event) => {
        fetch(base_url+"api/plugins/install", {
        method: "POST",
            body: element),
        headers: {
        "Content-type": "application/json; charset=UTF-8"
  }
});
    })
}

function elapsedTime(updateDate) {
    let now = new Date();
    let date1 = new Date(updateDate);
    let Difference_In_Time = now.getTime() - date1.getTime();
    let Difference_In_Days = Math.round(Difference_In_Time / (1000 * 3600 * 24));
    if (Difference_In_Days > 30) {
        months = Math.floor(Difference_In_Days / 31)
        if (months === 1) {
            return `Mis à jour il a ${months} moi`
        } else {
            return `Mis à jour il a ${months} mois`
        }
    } else {
        let Difference_In_Time = now.getTime() - date1.getTime();
        let Difference_In_Days = Math.round(Difference_In_Time / (1000 * 3600 * 24));
        if (Difference_In_Days === 1) {
            return `Mis à jour il y a ${Difference_In_Days} jour`
        } else {
            return `Mis à jour il y a ${Difference_In_Days} jours`
        }
    }
}
async function displayPluginsList() {
    const json = await getPluginsList()
    console.log(json);
    json.forEach(display_one_plugin_from_json);


}
displayPluginsList();