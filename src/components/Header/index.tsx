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
import supabase from "@services/supabase";
import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { UserProfile } from "src/@types/UserProfile";
import { useTheme } from "styled-components";
import {
  AvatarContainer,
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
  const [userProfile, setUserProfile] = useState<UserProfile>();
  const [isLoading, setIsLoading] = useState(true);

  async function loadProfile() {
    const { data, error } = await supabase
      .from("users")
      .select()
      .eq("email", user?.primaryEmailAddress?.emailAddress);
    if (error) {
      console.log({ error, key: error.details });
      return;
    }

    setUserProfile(data![0]);
    setIsLoading(false);
  }

  useEffect(() => {
    loadProfile();
  });

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
            <AppAvatar size={32} imagePath={`${user?.imageUrl}`} />
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
          <AvatarContainer></AvatarContainer>
          <MidContainer>
            <AppText bold color={theme.colors.text_light}>
              Olá 👋
            </AppText>
            {isLoading ? (
              <ActivityIndicator />
            ) : (
              <AppText bold size="xlg" color={theme.colors.text_light}>
                {userProfile?.name === null || userProfile?.name?.length === 0
                  ? user?.primaryEmailAddress?.emailAddress
                  : userProfile?.name}
              </AppText>
            )}
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
