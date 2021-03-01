import { ProxyState } from '../AppState.js'
import Pokemon from '../Models/Pokemon.js'
import { pokedexapi } from './AxiosService.js'



class PokedexsService {
    constructor() {
        this.getPokedex()
    }

    async getPokedex() {
        try {
            const res = await pokedexapi.get("")
            //console.log("Res: ", res.data)
            ProxyState.pokedexPokemon = res.data.map(p => new Pokemon(p))
        }catch(err) {
            console.error(err)
        }
    }

    async focusChoice(id) {
        console.log(id)
        try {
            const res = await pokedexapi.get(id)
            ProxyState.focusedPokemon = new Pokemon(res.data)
            document.getElementById("player-img").classList.toggle("hidden")
        }catch(error) {
            console.error(error)
        }
    }

    fightPokemon() {
        let rng = Math.floor(Math.random() * 100)
        if(ProxyState.focusedPokemon.user === null || ProxyState.focusedPokemon.user === undefined) {
            if(ProxyState.pokedexPokemon.length > 0) {
                if(rng > 50) {
                    document.getElementById("fight-text").innerText = `${rng}/100 \n Enemy ${ProxyState.focusedPokemon.name} has been knocked out!`;
                    document.getElementById("player-img").classList.add("bg-transparent")
                    document.getElementById("focus-img").classList.add("bg-danger")
                } else {
                    document.getElementById("fight-text").innerText = `${rng}/100 \n You lost your ${ProxyState.pokedexPokemon[0].name}!`;
                    document.getElementById("player-img").classList.add("bg-danger")
                    document.getElementById("focus-img").classList.add("bg-transparent")
                    this.knockOutPokemon(ProxyState.pokedexPokemon[0].id)
                }
            } else {
                document.getElementById("fight-text").innerText = `You don't have any Pokemon to fight with!`;
            }
        } else {
            document.getElementById("fight-text").innerText = `You pat ${ProxyState.focusedPokemon.name.toUpperCase()}'s head`
        }
        
        
    }

    async knockOutPokemon(id) {
        try {
            const res = await pokedexapi.delete(id)
            this.getPokedex()
            document.getElementById("player-img").classList.toggle("hidden")
        }catch(err) {
            console.error(err)
        }
    }

    async catchPokemon() {
            let rng = Math.floor(Math.random() * 100)
            if(rng > 80) {
                document.getElementById("fight-text").innerText = `${rng}/100 \n YOU CAUGHT `+ProxyState.focusedPokemon.name.toUpperCase();
                try {
                    const res = await pokedexapi.post("", ProxyState.focusedPokemon)
                    ProxyState.pokedexPokemon = [...ProxyState.pokedexPokemon, new Pokemon(res.data)]
                }catch(err) {
                    console.error(err)
                }
            } else {
                document.getElementById("fight-text").innerText = `${rng}/100 \n YOU FAILED TO CATCH `+ProxyState.focusedPokemon.name.toUpperCase();
            }
    }
    async releasePokemon() {
        try {
            const res = await pokedexapi.delete(ProxyState.focusedPokemon.id)
            ProxyState.focusedPokemon = null;
            this.getPokedex()
        }catch(err) {
            console.error(err)
        }
    }
}

export const pokedexsService = new PokedexsService();