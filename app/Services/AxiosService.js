// @ts-ignore
export const pokedexapi = axios.create({
    baseURL: 'https://bcw-sandbox.herokuapp.com/api/ChrisJCurry/pokemon/',
    timeout: 10000
})

// @ts-ignore
export const pokeapi = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/pokemon',
    timeout: 10000
})