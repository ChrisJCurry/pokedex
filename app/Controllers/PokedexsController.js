import {ProxyState} from '../AppState.js'
import {pokedexsService} from '../Services/PokedexsService.js'

function _draw() {
    let pokedexPokemon = ProxyState.pokedexPokemon;
    let template = ""

    pokedexPokemon.forEach(p => template += /*html*/`
        <div class="card my-2 side-card p-0 bg-gray">
            <div class="card-body" onclick="app.pokedexsController.focusChoice('${p.id}')">
                <h5 class="card-title">${p.name}</h5>
            </div>
        </div>
    `)

    document.getElementById("pokedex-pokemon").innerHTML = template
}

export default class PokedexsController {
    constructor() {
        console.log("pokedex controller")
        ProxyState.on("pokedexPokemon", _draw)
        _draw()
    }

    catchPokemon() {
        pokedexsService.catchPokemon();
    }

    fightPokemon() {
        pokedexsService.fightPokemon();
    }

    releasePokemon() {
        pokedexsService.releasePokemon();
    }

    focusChoice(id) {
        pokedexsService.focusChoice(id);
    }

}