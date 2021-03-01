import { ProxyState } from '../AppState.js'
import Pokemon from '../Models/Pokemon.js'
import { pokeapi } from './AxiosService.js'



class WildPokemonsService {
    constructor() {
        this.getWildPokemon()
    }

    async getWildPokemon() {
        try {
            const res = await pokeapi.get("")
            ProxyState.wildPokemon = res.data.results
        } catch (err) {
            console.error(err)
        }
    }

    async focusChoice(name) {
        this.getAbilities(name)
        try {
            const res = await pokeapi.get(name)
            ProxyState.focusedPokemon = new Pokemon(res.data)
            document.getElementById("player-img").classList.remove("hidden")
        } catch (err) {
            console.error(err)
        }
    }

    async getAbilities(name) {
        try {
            const res = await pokeapi.get(`${name}`)
            ProxyState.focusedAbilities = res.data.abilities
        } catch (err) {
            console.error(err)
        }
    }
}

export const wildPokemonsService = new WildPokemonsService();
