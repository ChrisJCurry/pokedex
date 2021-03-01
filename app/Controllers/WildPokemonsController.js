import { ProxyState } from '../AppState.js'
import { wildPokemonsService } from '../Services/WildPokemonsService.js'


function _draw() {
    let wildPokemon = ProxyState.wildPokemon;
    let template = ""

    wildPokemon.forEach(p => template += /*html*/`
        <div class="card-columns my-2 side-card p-2 bg-gray">
            <div class="card-body" onclick="app.wildPokemonsController.focusChoice('${p.name}')">
                <h5 class="card-title">${p.name}</h5>
            </div>
        </div>
    `)

    document.getElementById("wild-pokemon").innerHTML = template

}

function _drawFocus() {
    let focused = ProxyState.focusedPokemon;
    let template = ""
    if (ProxyState.focusedPokemon === null) {
        document.getElementById("focused").innerHTML = ""
    } else {
        template += focused.FocusedTemplate
        document.getElementById("focused").innerHTML = template
    }
}

export default class WildPokemonsController {
    constructor() {
        ProxyState.on("wildPokemon", _draw)
        ProxyState.on("focusedPokemon", _drawFocus)
        _draw()
    }

    focusChoice(name) {
        wildPokemonsService.focusChoice(name);
    }
}