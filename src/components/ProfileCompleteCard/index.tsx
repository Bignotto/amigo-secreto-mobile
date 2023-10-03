import AppButton from "@components/AppButton";
import AppText from "@components/AppText";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "@routes/Navigation.types";
import React from "react";
import {
  AvatarImage,
  Container,
  ProfileInfoContainer,
  ProfileTextContainer,
} from "./styles";

type ProfileCompletedCardProps = {
  percentCompeted: number;
  userName: string;
  avatarUrl: string;
};

export default function ProfileCompleteCard({
  percentCompeted,
  userName,
  avatarUrl,
}: ProfileCompletedCardProps) {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

  return (
    <Container>
      <AppText bold>Complete seu perfil</AppText>
      <ProfileInfoContainer>
        <AvatarImage
          source={{
            uri: avatarUrl,
          }}
        />
        <ProfileTextContainer>
          <AppText bold>Seu perfil está incompleto.</AppText>
          <AppText>
            Complete as informações para seus amigos saberem mais de você, assim
            você pode ganhar presentes melhores.
          </AppText>
        </ProfileTextContainer>
      </ProfileInfoContainer>
      <AppButton
        title="Completar perfil"
        onPress={() => navigation.navigate("Profile")}
      />
    </Container>
  );
}
