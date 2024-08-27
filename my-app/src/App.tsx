import React, { useEffect, useState } from "react";
import "./App.css";

// create a type for our pokemon data
type Pokemon = {
  results: {
    name: string;
    url: string;
  }[]; //make sure typescript know that your results is an array type
};

export default function App() {
  const [pokemon, setGetPokemon] = useState<Pokemon["results"]>([]);

  const pokeURL = "https://pokeapi.co/api/v2/pokemon/";

  const fetchPokemon = async () => {
    try {
      const response = await fetch(pokeURL);
      // function will reject the promise on some errors,
      //  but not if the server responds with an error status like 404: so we also check the response status and throw if it is not OK.
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const data: Pokemon = await response.json();

      // Extracting names and URLs from the results
      const namesAndUrl = data.results.map((result) => ({
        name: result.name,
        url: result.url,
      }));
      // Update state with the new data
      setGetPokemon(namesAndUrl);
    } catch (error) {
      console.error("Error fetching Pokemon:", error);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  return (
    <div className="App">
      {pokemon.map((p, index) => {
        return (
          <div key={index}>
            {/* wrong way to do it */}
            <h1>{p.name}</h1>
            <h1>{p.url}</h1>
            {/*Property 'name' does not exist on type 'never[]'. 
            because we have not declared a type, we get this error from typescript*/}
          </div>
        );
      })}
    </div>
  );
}
