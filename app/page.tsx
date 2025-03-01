"use client";

import { useEffect, useState } from "react";
import {
  Input,
  Button,
  VStack,
  HStack,
  Heading,
  Text,
  Grid,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [search, setSearch] = useState("");
  const [pokemonList, setPokemonList] = useState<
    { name: string; url: string }[]
  >([]);
  const [filteredPokemon, setFilteredPokemon] = useState<
    { name: string; url: string }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch all Pokémon when the page loads
  useEffect(() => {
    async function fetchAllData() {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=100`
        );
        const data = await response.json();
        setPokemonList(data.results);
        setFilteredPokemon(data.results); 
      } catch (error) {
        console.error("Error fetching Pokémon:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchAllData();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!search.trim()) return;
    router.push(`/page/${search.toLowerCase()}`); 
  };

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    const filtered = pokemonList.filter((pokemon) =>
      pokemon.name.includes(value)
    );
    setFilteredPokemon(filtered);
  };

  return (
    <VStack spacing={4} p={5}>
      <Heading fontSize={"2xl"} textAlign={"center"} m={4}>
        Search Pokémon
      </Heading>

      
      <form onSubmit={handleSearch}>
        <HStack>
          <Input
            placeholder="Search Pokémon..."
            value={search}
            onChange={handleFilter}
          />
          <Button type="submit" colorScheme="blue">
            Search
          </Button>
        </HStack>
      </form>

     
      {loading ? (
        <Text>Loading Pokémon...</Text>
      ) : (
        <Grid gap={5} templateColumns="repeat(5, 1fr)">
          {filteredPokemon.map((pokemon, index) => (
            <HStack
              key={index}
              justify="space-between"
              w="100%"
              mt={4}
              border="1px solid black"
              boxShadow="md"
              p={10}
              flexDirection={'column'}
              borderRadius="md"
            >
              <Text>{pokemon.name}</Text>
              <Button
                colorScheme="teal"
                size="sm"
                onClick={() => {
                  const pokemonId = pokemon.url.split("/").slice(-2, -1)[0]; 
                  router.push(`/pages/pokemon/${pokemonId}`);
                }}
              >
                View
              </Button>
            </HStack>
          ))}
        </Grid>
      )}
    </VStack>
  );
}
