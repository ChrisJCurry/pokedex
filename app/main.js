//import ValuesController from "./Controllers/ValuesController.js";
import WildPokemonsController from "./Controllers/WildPokemonsController.js"
import PokedexsController from "./Controllers/PokedexsController.js"

class App {
  //valuesController = new ValuesController();

  wildPokemonsController = new WildPokemonsController();
  pokedexsController = new PokedexsController();
}

window["app"] = new App();
