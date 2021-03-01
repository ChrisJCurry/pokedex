import { ProxyState } from "../AppState.js";

export default class Pokemon {
    constructor(data) {
        this.name = data.name;
        this.img = data.img || data.sprites.front_default || data.sprites.frontDefault;
        this.description = data.description || "This is a Pokemon.";
        this.weight = data.weght;
        this.height = data.height;
        this.types = data.types;
        this.id = data.id;
        this.user = data.user;
    }

    get FocusedTemplate() {        
        let template = ""
        let source = "https://via.placeholder.com/150"
        console.log("Amount: ", ProxyState.pokedexPokemon, source)
        if(ProxyState.pokedexPokemon.length > 0) {
            source = ProxyState.pokedexPokemon[0].img
        } else {
            source = ""
        }
        console.log(source)
        template = /*html*/`
        <div class="card p-0 bg-gray">
            <div class="card-body">
                <div class="text-center">
                    <h5 class="card-title text-primary">${this.name.toUpperCase()}</h5>
                </div>
                <div class="row">
                    <div class="col-3">
                        <img id="player-img" class="img-fighting" src="${source}">
                    </div>
                    <div class="col-6  pt-4 pb-3 text-center">
                        <h2 id="fight-text"></h2>
                    </div>
                    <div class="col-3">
                        <img id="focus-img" src="${this.img}">
                    </div>
                </div>
                ${this.CatchRelease}
            </div>
        </div>
        `

        return template;
    }

    get CatchRelease() {
        let fightText = ""
        let catchText = ""
        let template = ""
        if(this.user == undefined) {
            fightText = "FIGHT"
            catchText = "CATCH"
            template += /*html*/`
            <div class="row mb-2 text-center">
                <div class="col-6">
                    <button class="btn btn-lg font-weight-bold btn-primary w-75" onclick="app.pokedexsController.fightPokemon()">FIGHT</button>
                </div>
                <div class="col-6">
                    <button class="btn btn-lg font-weight-bold btn-primary w-75">POKEMON</button>
                </div>
            </div>
            <div class="row mt-2 pt-3 text-center">
                <div class="col-6">
                    <button class="btn btn-lg font-weight-bold btn-primary w-75" onclick="app.pokedexsController.catchPokemon()">CATCH</button>
                </div>
                <div class="col-6">
                    <button class="btn btn-lg font-weight-bold btn-primary w-75">RUN</button>
                </div>
            </div>
            `
        } else {
            template += /*html*/`
            <div class="row mb-2 text-center">
                <div class="col-6">
                    <button class="btn btn-lg font-weight-bold btn-primary w-75" onclick="app.pokedexsController.fightPokemon()">PAT</button>
                </div>
                <div class="col-6">
                    <button class="btn btn-lg font-weight-bold btn-primary w-75">POKEMON</button>
                </div>
            </div>
            <div class="row mt-2 pt-3 text-center">
                <div class="col-6">
                    <button class="btn btn-lg font-weight-bold btn-primary w-75" onclick="app.pokedexsController.releasePokemon()">RELEASE</button>
                </div>
                <div class="col-6">
                    <button class="btn btn-lg font-weight-bold btn-primary w-75">RUN</button>
                </div>
            </div>
            `
        }
        

            return template;
    }
}