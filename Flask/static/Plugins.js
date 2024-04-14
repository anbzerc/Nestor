// Get client screen height and with
let height = document.documentElement.clientHeight;
let width = document.documentElement.clientWidth;

// Set containers proper heights
document.querySelector('.grid-container').style.height = height + "px";
document.querySelector('.content').style.height = height + "px";

// Get site's base url
let base_url = window.location.href.split("plugins")[0]

// Get sidebar and button which open sidebar
const sidebar = document.querySelector('.sidebar');
const iconbutton = document.querySelector('.menu-icon');

// Set listener for icon which open sidebar
document.querySelector('.menu-icon').onclick = function() {
    sidebar.classList.toggle('open-sidebar');
    iconbutton.classList.toggle('open-menu-icon');

}

// Function which fetch the list of plugins which can be installed AND NOT installed plugins
let pluginJson;
async function getPluginsList() {
    const res = await fetch("/api/list")
    pluginJson = await res.json();
    return pluginJson;
}

// Function which fetch the list of INSTALLED plugins
let installedPluginsList;
async function getInstalledPluginsList() {
    // Fetch flask api
    const res = await fetch("/api/plugins/list")
    installedPluginsList = await res.json();
    console.log("h" + await installedPluginsList    )
}

// Function which display one plugin, with the proper icon (install or remove)
async function display_one_plugin_from_json(element, index, array) {
    // Get url of download and remove icons
    const install_icon_url = document.getElementById("WillBeHideItsJustToGetIconUrl").src;
    const remove_icon_url = install_icon_url.split("download.png")[0] + "trash.png";

    // Get property of element i.e. plugin to display (which is given in function's parameters) p
    name = element["name"];
    author = element["author"];
    updated = elapsedTime(element["updated"]);
    description = element["description"];
    description = element["description"];

    // Create a set with a list of installed plugins
    // We use set to be able to use has() method which say us if our element given in parameter is the installed list
    installed_list = new Set(await installedPluginsList)
    console.log(installed_list)
    // Check if is install, if is installed, change to the proper icon and listener
    if (installed_list.has(name)) {
        let html = `
    <div class="card">
                <div class="firstrow">
                    <div class="firstcolumn">
                        <p class="Title">${name}</p>
                        <p class="Author">By ${author}</p>
                        <p class="updated">${updated}</p>
                    </div>
                    <div class="secondcolumn">
                        <img src="${remove_icon_url}" class="install" id="${name}-remove">
                    </div>
                </div>
                <div class="secondrow">
                    <p class="description">${description}</p>
                </div>
            </div>
    `
        let div = document.querySelector(".content")
        div.innerHTML = div.innerHTML + html
        // add listener to the remove icon
        document.getElementById(name+"-remove").addEventListener("click", (event) => {
                fetch(base_url + "api/plugins/remove", {
                        "method": "POST",
                        "body": JSON.stringify(element),
                        "headers": {"Content-type": "application/json; charset=UTF-8"}
                }
            );
            // This try except allow to change to the proper icon and send the proper request to flak on click
            try {
                document.getElementById(name+"-install").src = remove_icon_url;
                document.getElementById(name+"-install").id = name+"-remove";
                fetch(base_url + "api/plugins/install", {
                        "method": "POST",
                        "body": JSON.stringify(element),
                        "headers": {"Content-type": "application/json; charset=UTF-8"}
                })
                }
            catch (error) {
                document.getElementById(name+"-remove").src = install_icon_url;
                document.getElementById(name+"-remove").id = name+"-install"
                fetch(base_url + "api/plugins/remove", {
                        "method": "POST",
                        "body": JSON.stringify(element),
                        "headers": {"Content-type": "application/json; charset=UTF-8"}
                })
            }
        });
        }

    // If not installed display with the download icon
    else {
        let html = `
    <div class="card">
                <div class="firstrow">
                    <div class="firstcolumn">
                        <p class="Title">${name}</p>
                        <p class="Author">By ${author}</p>
                        <p class="updated">${updated}</p>
                    </div>
                    <div class="secondcolumn">
                        <img src="${install_icon_url}" class="install" id="${name}-install">
                    </div>
                </div>
                <div class="secondrow">
                    <p class="description">${description}</p>
                </div>
            </div>
    `
        let div = document.querySelector(".content")
        div.innerHTML = div.innerHTML + html
        console.log("e", element)
        // add listener to the install icon
        document.getElementById(name+"-install").addEventListener("click", (event) => {
                console.log("1")
                fetch(base_url + "api/plugins/install", {
                        "method": "POST",
                        "body": JSON.stringify(element),
                        "headers": {"Content-type": "application/json; charset=UTF-8"}
                }
            )
            // Change icon because we installed the plugin
            console.log(name+"-install")
            try {
                document.getElementById(name+"-install").src = remove_icon_url;
                document.getElementById(name+"-install").id = name+"-remove";
                fetch(base_url + "api/plugins/install", {
                        "method": "POST",
                        "body": JSON.stringify(element),
                        "headers": {"Content-type": "application/json; charset=UTF-8"}
                })
                }
            catch (error) {
                document.getElementById(name+"-remove").src = install_icon_url;
                document.getElementById(name+"-remove").id = name+"-install"
                fetch(base_url + "api/plugins/remove", {
                        "method": "POST",
                        "body": JSON.stringify(element),
                        "headers": {"Content-type": "application/json; charset=UTF-8"}
                })
            }
            console.log("fait")
            // Then change the listener to remove if clicked
        }
    )
}
}

// Function which return a string which says elapsed time since last plugin's update
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

// Function which display all plugins available to installation
async function displayPluginsList() {
    // get the list of available to installation plugins
    const json = await getPluginsList()
    // run getInstalledPluginList to update installedPluginsList variable
    await getInstalledPluginsList()
    json.forEach(await display_one_plugin_from_json);


}

displayPluginsList();