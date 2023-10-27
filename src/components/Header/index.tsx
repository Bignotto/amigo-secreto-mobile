import { useAuth, useUser } from "@clerk/clerk-expo";
import AppIconButton from "@components/AppIconButton";
import AppLogo from "@components/AppLogo";
import AppText from "@components/AppText";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "@routes/Navigation.types";
import React from "react";
import { useTheme } from "styled-components";
import {
  AvatarContainer,
  AvatarImage,
  ButtonsContainer,
  HeaderContainer,
  LogoContainer,
  MidContainer,
} from "./styles";

export default function Header() {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const { signOut } = useAuth();
  const { user } = useUser();

  const theme = useTheme();

  return (
    <>
      <LogoContainer>
        <AppLogo size="md" color={theme.colors.white} />
      </LogoContainer>
      <HeaderContainer>
        <AvatarContainer>
          <AvatarImage
            source={{
              uri: `${user?.imageUrl}`,
            }}
          />
        </AvatarContainer>
        <MidContainer>
          <AppText bold color={theme.colors.text_light}>
            Olá 👋
          </AppText>
          <AppText bold size="xlg" color={theme.colors.text_light}>
            {user?.firstName}
          </AppText>
        </MidContainer>
        <ButtonsContainer>
          <AppIconButton onPress={() => navigation.navigate("Profile")}>
            <FontAwesome5
              name="user-edit"
              size={28}
              color={theme.colors.text_light}
            />
          </AppIconButton>
          <AppIconButton onPress={() => signOut()}>
            <MaterialCommunityIcons
              name="logout"
              size={32}
              color={theme.colors.text_light}
            />
          </AppIconButton>
        </ButtonsContainer>
      </HeaderContainer>
    </>
  );
}
