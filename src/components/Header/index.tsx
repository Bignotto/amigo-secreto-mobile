import { useAuth, useUser } from "@clerk/clerk-expo";
import AppText from "@components/AppText";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "@routes/Navigation.types";
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
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const { signOut } = useAuth();

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
        <AppText bold size="xlg">
          {user?.firstName}
        </AppText>
      </MidContainer>
      <ButtonsContainer>
        <IconButton onPress={() => navigation.navigate("Profile")}>
          <FontAwesome5 name="user-edit" size={28} color="black" />
        </IconButton>
        <IconButton onPress={() => signOut()}>
          <MaterialCommunityIcons name="logout" size={32} color="black" />
        </IconButton>
      </ButtonsContainer>
    </Container>
  );
}
