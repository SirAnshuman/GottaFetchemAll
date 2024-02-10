import React from 'react';

const PokeCard = ({ pokemon: { number, type, name } }) => {
  return (
    <div className="movie" key={number}>
      <div>
        <p>Pokedex Number - {number}</p>
      </div>
       
      <div>
        <img src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${number}.svg`} alt={name} />
      </div>
       
      <div>
        <span>{type}</span>
          <h3>{name.toUpperCase()}</h3>
      </div>
    </div>
  );
}

export default PokeCard;