"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Box, Image, Text, List, ListItem, Button, Spinner, Badge } from "@chakra-ui/react";

const PokemonDetail = () => {
  const { id } = useParams(); // Get Pokémon ID from URL
  const [image, setImage] = useState(null);
  const [abilities, setAbilities] = useState([]);
  const [type, setType] = useState([]);
  const [stats, setStats] = useState([]);
  const [moves, setMoves] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return; // Prevent fetching if no ID

    const fetchPokemon = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!response.ok) throw new Error("Pokémon not found");

        const data = await response.json();
        setAbilities(data.abilities);
        setImage(data.sprites.sprites);
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

  // Hydration safeguard
  if (loading) {
    return (
      <Box textAlign="center" mt={10}>
        <Spinner size="xl" />
        <Text mt={4}>Loading Pokémon data...</Text>
      </Box>
    );
  }

  if (!image) {
    return (
      <Box textAlign="center" mt={10}>
        <Text fontSize="2xl" color="red.500">Pokémon not found.</Text>
        <Link href="/pokemon">
          <Button mt={4} colorScheme="teal">Back to Pokémon List</Button>
        </Link>
      </Box>
    );
  }

  return (
    <Box p={6}>
      <Box mb={4}>
        <Text fontSize="xl" fontWeight="bold">Image</Text>
        Hi 
      </Box>

     
    </Box>
  );
};

export default PokemonDetail;
