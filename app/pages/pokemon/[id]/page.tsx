"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Box, Image, Text, Spinner, Grid } from "@chakra-ui/react";

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

  // Convert image data to array, filter null values, and provide a fallback
  const imagesArray = Object.entries(imageData || {})
    .filter(([_, value]) => value) // Remove null or undefined images
    .map(([key, value]) => ({
      name: key.replace(/_/g, " "), // Replace underscores with spaces for readability
      url: typeof value === "string" ? value : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/crystal/back/4.png", // Fallback image
    }));

  return (
    <Box p={6}>
      {/* Abilities Section */}
      <Box mb={4}>
        <Text fontSize="xl" fontWeight="bold">Abilities</Text>
        <Grid gap={2} gridTemplateColumns="repeat(4, 1fr)">
          {abilities.map((ability, index) => (
            <Box key={index} p={2} borderWidth={1} borderRadius="md" mb={2}>
              <Text fontWeight="medium">Name: {ability.ability.name}</Text>
              <Text>URL: <Link href={ability.ability.url} target="_blank" rel="noopener noreferrer" color="blue.500">{ability.ability.url}</Link></Text>
              <Text>Is Hidden: {ability.is_hidden ? "Yes" : "No"}</Text>
              <Text>Slot: {ability.slot}</Text>
            </Box>
          ))}
        </Grid>
      </Box>

      {/* Type Section */}
      <Box mb={4}>
        <Text fontSize="xl" fontWeight="bold">Type</Text>
        <Grid gap={2} gridTemplateColumns="repeat(4, 1fr)">
          {types.map((type, index) => (
            <Box key={index} p={2} borderWidth={1} borderRadius="md" mb={2}>
              <Text fontWeight="medium">Name: {type.type.name}</Text>
              <Text>URL: <Link href={type.type.url} target="_blank" rel="noopener noreferrer" color="blue.500">{type.type.url}</Link></Text>
              <Text>Slot: {type.slot}</Text>
            </Box>
          ))}
        </Grid>
      </Box>

      {/* Stats Section */}
      <Box mb={4}>
        <Text fontSize="xl" fontWeight="bold">Stats</Text>
        <Grid gap={2} gridTemplateColumns="repeat(3, 1fr)">
          {stats.map((stat, index) => (
            <Box key={index} p={3} borderWidth={1} borderRadius="md" mb={2}>
              <Text fontWeight="medium">Name: {stat.stat.name}</Text>
              <Text>Base Stat: {stat.base_stat}</Text>
              <Text>Effort: {stat.effort}</Text>
              <Text>URL: <Link href={stat.stat.url} target="_blank" rel="noopener noreferrer" color="blue.500">{stat.stat.url}</Link></Text>
            </Box>
          ))}
        </Grid>
      </Box>

      {/* Images Section */}
      <Box mb={4}>
        <Text fontSize="xl" fontWeight="bold">Images</Text>
        <Grid gap={2} gridTemplateColumns="repeat(3, 1fr)">
          {imagesArray.map((img, index) => (
            <Box key={index} p={3} borderWidth={1} borderRadius="md" mb={2} textAlign="center">
              <Text fontWeight="medium">{img.name}</Text>
              <Image src={img.url} alt={img.name} boxSize="100px" />
            </Box>
          ))}
        </Grid>
      </Box>

      {/* Moves Section (Fixed `<a>` inside `<a>` issue) */}
      <Box mb={4}>
        <Text fontSize="xl" fontWeight="bold">Moves</Text>
        <Grid gap={2} gridTemplateColumns="repeat(3, 1fr)">
          {moves.map((moveData, index) => (
            <Box key={index} p={3} borderWidth={1} borderRadius="md" mb={2}>
              <Text fontWeight="medium">Move: {moveData.move.name}</Text>
              <Link href={moveData.move.url} legacyBehavior>
                <a target="_blank" rel="noopener noreferrer" style={{ color: "blue" }}>
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
