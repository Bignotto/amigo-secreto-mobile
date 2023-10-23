import AppAvatar from "@components/AppAvatar";
import AppLogo from "@components/AppLogo";
import AppScreenContainer from "@components/AppScreenContainer";
import AppSpacer from "@components/AppSpacer";
import AppText from "@components/AppText";
import Header from "@components/Header";
import { useRoute } from "@react-navigation/native";
import supabase from "@services/supabase";
import React, { useEffect, useState } from "react";
import { UserProfile } from "src/@types/UserProfile";
import { useTheme } from "styled-components";
import {
  FriendContainer,
  InfoContent,
  InfoWrapper,
  SizeInfo,
  TopContent,
} from "./styles";

type DrawFriendDetailsParams = {
  joinId: number;
};

export default function DrawFriendDetails() {
  const route = useRoute();
  const { joinId } = route.params as DrawFriendDetailsParams;

  const theme = useTheme();

  const [isLoading, setIsLoading] = useState(true);
  const [friend, setFriend] = useState<UserProfile>();

  async function loadFriend() {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("user_friends_group")
        .select("*,drawnFriendId(*)")
        .eq("id", joinId);
      if (error) {
        console.log({ error });
        return;
      }
      setFriend(data[0].drawnFriendId);
    } catch (error) {
      console.log({ error });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadFriend();
  }, []);

  //NEXT: finish drawn friend info card

  return (
    <AppScreenContainer>
      <Header />
      <AppSpacer />
      <AppLogo />
      <AppSpacer verticalSpace="xlg" />
      <FriendContainer>
        <AppText bold color={theme.colors.text_light}>
          Seu amigo secreto é
        </AppText>
        <AppSpacer />
        <AppAvatar imagePath={`${friend?.image_url}`} size={128} />
        <AppText size="xxlg" bold color={theme.colors.text_light}>
          {friend?.name}
        </AppText>
        <TopContent>
          <SizeInfo>
            <AppText size="xlg" color={theme.colors.text_light}>
              Eu calço:
            </AppText>
            <AppText size="xxlg" bold color={theme.colors.text_light}>
              {friend?.shoeSize}
            </AppText>
          </SizeInfo>
          <SizeInfo>
            <AppText size="xlg" color={theme.colors.text_light}>
              Eu uso:
            </AppText>
            <AppText size="xxlg" bold color={theme.colors.text_light}>
              {friend?.clothesSize}
            </AppText>
          </SizeInfo>
        </TopContent>
        <InfoContent>
          <InfoWrapper>
            <AppText size="lg" bold color={theme.colors.text_light}>
              Eu gosto:
            </AppText>
            <AppText size="lg" color={theme.colors.text_light}>
              {friend?.likeThings}
            </AppText>
          </InfoWrapper>
          <InfoWrapper>
            <AppText size="lg" bold color={theme.colors.text_light}>
              Eu não gosto:
            </AppText>
            <AppText size="lg" color={theme.colors.text_light}>
              {friend?.dontLikeThings}
            </AppText>
          </InfoWrapper>
        </InfoContent>
      </FriendContainer>
    </AppScreenContainer>
  );
}
