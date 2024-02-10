import React, { useState, useEffect } from "react";
import "./App.css";
import PokeCard from "./PokeCard";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    findPokemon("pikachu");
  }, []);

  const findPokemon = (pokemonName) =>{
    console.log(pokemonName);
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then(response => response.json())
    .then(data => {
      const typesOf = data.types[0].type.name;
        fetch(`https://pokeapi.co/api/v2/type/${typesOf}`)
        .then(response => response.json())
        .then(data => {
          const weaknesses = data.damage_relations.double_damage_from.map(type => type.name);

          fetch(`https://pokeapi.co/api/v2/type/${weaknesses[0]}`)
          .then(response => response.json())
          .then(data => {
            const weakPokemons = data.pokemon.map(pokemon => pokemon.pokemon);
            const selectedPokemons = weakPokemons.filter((_, index) => index % 3 === 0);
          
            const promises = selectedPokemons.map(pokemon => {
              return fetch(pokemon.url)
                .then(response => response.json());
            });
            Promise.all(promises)
            .then(pokemonDetails => {
              pokemonDetails.forEach(pokemon => {
                const updatedPokemons = pokemonDetails.map(pokemon => ({
                  number: pokemon.id,
                  type: pokemon.types[0].type.name,
                  name: pokemon.name
                }));
                setPokemons(updatedPokemons);
              });
            });
          })
          .catch(error => {
            setPokemons([]);
            console.error('Error fetching data:', error)
          });
      })
    })
  }

  return (
    <div className="app">
      <h1>Gotta Fetch'em All</h1>

      <div className="search">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Pick your Contender"
        />
        <img src="https://raw.githubusercontent.com/gist/adrianhajdin/997a8cdf94234e889fa47be89a4759f1/raw/f13e5a9a0d1e299696aa4a0fe3a0026fa2a387f7/search.svg"
          alt="search"
          onClick={() => findPokemon(searchTerm)}
        />
      </div>

      {pokemons?.length > 0 ? (
        <div className="container">
          {pokemons.map((pokemon) => (
             < PokeCard pokemon={pokemon} /> 
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No Pokemons found</h2>
        </div>
      )}
    </div>
  );
};

export default App;