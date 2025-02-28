import React from 'react';

// Component for displaying a Pokémon's image
const PokemonImage = ({ imageUrl, altText }) => (
  <img src={imageUrl} alt={altText} className="pokemon-image" />
);

// Main Pokémon Card Component
const PokemonCard = ({ pokemon }) => {
  return (
    <div className="pokemon-card">
      <h2>{pokemon.name} (ID: {pokemon.id})</h2>
      <h3>Species: {pokemon.species}</h3>
      
      <div className="sprites">
        <h4>Default Sprites</h4>
        <div className="sprite-container">
          <div>
            <h5>Front Default</h5>
            <PokemonImage imageUrl={pokemon.sprites.front_default} altText="Front Default" />
          </div>
          <div>
            <h5>Back Default</h5>
            <PokemonImage imageUrl={pokemon.sprites.back_default} altText="Back Default" />
          </div>
        </div>

        <h4>Shiny Sprites</h4>
        <div className="sprite-container">
          <div>
            <h5>Front Shiny</h5>
            <PokemonImage imageUrl={pokemon.sprites.front_shiny} altText="Front Shiny" />
          </div>
          <div>
            <h5>Back Shiny</h5>
            <PokemonImage imageUrl={pokemon.sprites.back_shiny} altText="Back Shiny" />
          </div>
        </div>

        <h4>Other Versions</h4>
        <div className="sprite-container">
          <div>
            <h5>Dream World</h5>
            <PokemonImage imageUrl={pokemon.sprites.other.dream_world.front_default} altText="Dream World" />
          </div>
          <div>
            <h5>Official Artwork</h5>
            <PokemonImage imageUrl={pokemon.sprites.other['official-artwork'].front_default} altText="Official Artwork" />
          </div>
        </div>
      </div>

      <div className="generation-versions">
        <h4>Generation Versions</h4>
        {Object.keys(pokemon.sprites.versions).map((generation) => {
          const versionData = pokemon.sprites.versions[generation];
          return (
            <div key={generation}>
              <h5>{generation}</h5>
              <div className="sprite-container">
                <div>
                  <h6>Front</h6>
                  <PokemonImage imageUrl={versionData.front_default} altText={`${generation} Front`} />
                </div>
                <div>
                  <h6>Back</h6>
                  <PokemonImage imageUrl={versionData.back_default} altText={`${generation} Back`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};