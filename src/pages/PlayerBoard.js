import { Container, Flex, Heading, List, Stack } from "@chakra-ui/react";
import { useState } from "react";
import { useDrop } from "react-dnd";
import Player from "./Player";

function PlayerBoard() {
  const [players, setPlayer] = useState([
    { name: "Customer 1" },
    { name: "Customer 2" },
    { name: "Customer 3" },
    { name: "Customer 4" },
    { name: "Customer 5" },
    { name: "Customer 6" },
    { name: "Customer 7" },
    { name: "Customer 8" },
    { name: "Customer 9" },
    { name: "Customer 10" },
  ]);

  const [team, setTeam] = useState([]);

  const [{ isOver }, addToTeamRef] = useDrop({
    accept: "player",
    collect: (monitor) => ({ isOver: !!monitor.isOver() }),
  });

  console.log(isOver);
  const [{ isOver: isPlayerOver }, removeFromTeamRef] = useDrop({
    accept: "team",
    collect: (monitor) => ({ isOver: !!monitor.isOver() }),
  });

  const movePlayerToTeam = (item) => {
    console.log(item);
    setPlayer((prev) => prev.filter((_, i) => item.index !== i));
    setTeam((prev) => [...prev, item]);
  };
  const removePlayerFromTeam = (item) => {
    setTeam((prev) => prev.filter((_, i) => item.index !== i));
    setPlayer((prev) => [...prev, item]);
  };

  return (
    <Container maxW="800px">
      <Flex justify="space-between" height="70vh" align="center">
        <Stack width="300px">
          <Heading fontSize="3xl" color="yellow.800" textAlign="center">
            Company 1
          </Heading>
          <List
            bgGradient={
              isPlayerOver
                ? "linear(to-b, yellow.300, yellow.500)"
                : "linear(to-b, yellow.100, yellow.200)"
            }
            ref={removeFromTeamRef}
            p="4"
            minH="60vh"
            boxShadow="xl"
            borderRadius="md"
          >
            {players.map((p, i) => (
              <Player
                item={p}
                key={i}
                playerType="player"
                onDropPlayer={movePlayerToTeam}
                index={i}
              />
            ))}
          </List>
        </Stack>
        <Stack width="300px">
          <Heading fontSize="3xl" color="teal.800" textAlign="center">
            Company 2
          </Heading>
          <List
            bgGradient={
              isOver
                ? "linear(to-b, teal.300, teal.500)"
                : "linear(to-b, teal.100, teal.200)"
            }
            ref={addToTeamRef}
            minH="60vh"
            boxShadow="xl"
            borderRadius="md"
            p="4"
          >
            {team.map((p, i) => (
              <Player
                item={p}
                key={i}
                index={i}
                playerType="team"
                onDropPlayer={removePlayerFromTeam}
              />
            ))}
          </List>
        </Stack>
      </Flex>
    </Container>
  );
}

export default PlayerBoard;
