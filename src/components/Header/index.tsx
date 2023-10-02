import { useUser } from "@clerk/clerk-expo";
import AppText from "@components/AppText";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import {
  AvatarContainer,
  AvatarImage,
  ButtonsContainer,
  Container,
  IconButton,
  MidContainer,
} from "./styles";

export default function Header() {
  const { user } = useUser();
  return (
    <Container>
      <AvatarContainer>
        <AvatarImage
          source={{
            uri: `${user?.imageUrl}`,
          }}
        />
      </AvatarContainer>
      <MidContainer>
        <AppText bold>Olá 👋</AppText>
        <AppText bold size="lg">
          {user?.firstName}
        </AppText>
      </MidContainer>
      <ButtonsContainer>
        <IconButton>
          <FontAwesome5 name="user-edit" size={28} color="black" />
        </IconButton>
        <IconButton>
          <MaterialCommunityIcons name="logout" size={32} color="black" />
        </IconButton>
      </ButtonsContainer>
    </Container>
  );
}
