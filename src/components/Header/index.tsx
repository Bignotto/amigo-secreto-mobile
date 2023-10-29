import { useAuth, useUser } from "@clerk/clerk-expo";
import AppAvatar from "@components/AppAvatar";
import AppIconButton from "@components/AppIconButton";
import { IconButton } from "@components/AppIconButton/styles";
import AppLogo from "@components/AppLogo";
import AppText from "@components/AppText";
import {
  AntDesign,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "@routes/Navigation.types";
import React, { useState } from "react";
import { useTheme } from "styled-components";
import {
  AvatarContainer,
  AvatarImage,
  ButtonsContainer,
  HeaderContainer,
  IconButtonWrapper,
  LogoContainer,
  MidContainer,
} from "./styles";

type HeaderProps = {
  showBackButton?: boolean;
};

export default function Header({ showBackButton = true }: HeaderProps) {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const { signOut } = useAuth();
  const { user } = useUser();

  const theme = useTheme();

  const [showHeaderButtons, setShowHeaderButtons] = useState(false);

  function toggleHeaderButtons() {
    setShowHeaderButtons((actual) => !actual);
  }

  return (
    <>
      <LogoContainer>
        <IconButtonWrapper>
          {showBackButton ? (
            <IconButton onPress={() => navigation.goBack()}>
              <AntDesign name="back" size={24} color={theme.colors.white} />
            </IconButton>
          ) : (
            <AppAvatar size={28} imagePath={`${user?.imageUrl}`} />
          )}
        </IconButtonWrapper>
        <AppLogo size="md" color={theme.colors.white} />
        <IconButtonWrapper>
          {showHeaderButtons ? (
            <AntDesign
              name="up"
              size={24}
              color={theme.colors.white}
              onPress={toggleHeaderButtons}
            />
          ) : (
            <AntDesign
              name="down"
              size={24}
              color={theme.colors.white}
              onPress={toggleHeaderButtons}
            />
          )}
        </IconButtonWrapper>
      </LogoContainer>
      {showHeaderButtons && (
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
      )}
    </>
  );
}
