"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import NextImage from "next/image"; 
import { Box, Text, Spinner, Grid } from "@chakra-ui/react";

const PokemonDetail = () => {
  const { id } = useParams(); // Get Pokémon ID from URL
  const [imageData, setImage] = useState(null);
  const [abilities, setAbilities] = useState([]);
  const [types, setType] = useState([]);
  const [stats, setStats] = useState([]);
  const [moves, setMoves] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchPokemon = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!response.ok) throw new Error("Pokémon not found");

        const data = await response.json();
        setAbilities(data.abilities);
        setImage(data.sprites);
        setType(data.types);
        setStats(data.stats);
        setMoves(data.moves);
      } catch (error) {
        console.error("Error fetching Pokémon:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [id]);

  if (loading) {
    return (
      <Box textAlign="center" mt={10}>
        <Spinner size="xl" />
        <Text mt={4}>Loading Pokémon data...</Text>
      </Box>
    );
  }

 
  const imagesArray = Object.entries(imageData ?? {}) 
  .filter(([, url]) => typeof url === "string" && url.trim() !== "") 
  .map(([key, url]) => ({
    name: key.replace(/_/g, " "), 
    url: url || "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/crystal/back/4.png",
  }));


  return (
    <Box p={6}>

      <Box mb={4}>
        <Text fontSize="xl" fontWeight="bold">
          Abilities
        </Text>
        <Grid
          gap={2}
          templateColumns={{ base: "repeat(1, 1fr)", sm: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)", xl: "repeat(4, 1fr)" }}
        >
          {abilities.map((ability, index) => (
            <Box key={index} p={2} borderWidth={1} borderRadius="md" mb={2}>
              <Text fontWeight="medium">Name: {ability.ability.name}</Text>
              <Text>
                URL:{" "}
                <Link
                  href={ability.ability.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  color="blue.500"
                >
                  {ability.ability.url}
                </Link>
              </Text>
              <Text>Is Hidden: {ability.is_hidden ? "Yes" : "No"}</Text>
              <Text>Slot: {ability.slot}</Text>
            </Box>
          ))}
        </Grid>
      </Box>

  
      <Box mb={4}>
        <Text fontSize="xl" fontWeight="bold">
          Type
        </Text>
        <Grid
          gap={2}
          templateColumns={{ base: "repeat(1, 1fr)", sm: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)", xl: "repeat(4, 1fr)" }}
        >
          {types.map((type, index) => (
            <Box key={index} p={2} borderWidth={1} borderRadius="md" mb={2}>
              <Text fontWeight="medium">Name: {type.type.name}</Text>
              <Text>
                URL:{" "}
                <Link
                  href={type.type.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  color="blue.500"
                >
                  {type.type.url}
                </Link>
              </Text>
              <Text>Slot: {type.slot}</Text>
            </Box>
          ))}
        </Grid>
      </Box>

   
      <Box mb={4}>
        <Text fontSize="xl" fontWeight="bold">
          Stats
        </Text>
        <Grid
          gap={2}
          templateColumns={{ base: "repeat(1, 1fr)", sm: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)", xl: "repeat(4, 1fr)" }}
        >
          {stats.map((stat, index) => (
            <Box key={index} p={3} borderWidth={1} borderRadius="md" mb={2}>
              <Text fontWeight="medium">Name: {stat.stat.name}</Text>
              <Text>Base Stat: {stat.base_stat}</Text>
              <Text>Effort: {stat.effort}</Text>
              <Text>
                URL:{" "}
                <Link
                  href={stat.stat.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  color="blue.500"
                >
                  {stat.stat.url}
                </Link>
              </Text>
            </Box>
          ))}
        </Grid>
      </Box>

    
      <Box mb={4}>
        <Text fontSize="xl" fontWeight="bold">
          Images
        </Text>
        <Grid
          gap={2}
          templateColumns={{ base: "repeat(1, 1fr)", sm: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)", xl: "repeat(4, 1fr)" }}
        >
          {imagesArray.map((img, index) => (
            <Box
              key={index}
              p={3}
              borderWidth={1}
              borderRadius="md"
              mb={2}
              textAlign="center"
            >
              <Text fontWeight="medium">{img.name}</Text>
              <NextImage src={String(img.url)} alt={img.name} width={100} height={100} />
            </Box>
          ))}
        </Grid>
      </Box>

      
      <Box mb={4}>
        <Text fontSize="xl" fontWeight="bold">
          Moves
        </Text>
        <Grid
          gap={2}
          templateColumns={{ base: "repeat(1, 1fr)", sm: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)", xl: "repeat(4, 1fr)" }}
        >
          {moves.map((moveData, index) => (
            <Box key={index} p={3} borderWidth={1} borderRadius="md" mb={2}>
              <Text fontWeight="medium">Move: {moveData.move.name}</Text>
              <Link href={moveData.move.url} legacyBehavior>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "blue" }}
                >
                  {moveData.move.url}
                </a>
              </Link>
            </Box>
          ))}
        </Grid>
      </Box> 

    </Box>
  );
};

export default PokemonDetail;
