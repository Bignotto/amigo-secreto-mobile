import { useUser } from "@clerk/clerk-expo";
import AppAvatar from "@components/AppAvatar";
import AppButton from "@components/AppButton";
import AppInput from "@components/AppInput";
import AppLogo from "@components/AppLogo";
import AppScreenContainer from "@components/AppScreenContainer";
import AppSpacer from "@components/AppSpacer";
import AppText from "@components/AppText";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "@routes/Navigation.types";
import supabase from "@services/supabase";
import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useTheme } from "styled-components";
import { FormContainer, TopScreenContainer } from "./styles";

export default function Profile() {
  const { user } = useUser();
  const theme = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

  const [isLoading, setIsLoading] = useState(true);

  const [name, setName] = useState("");
  const [clothesSize, setClothesSize] = useState("");
  const [shoeSize, setShoeSize] = useState("");
  const [likeThings, setLikeThings] = useState("");
  const [dontLikeThings, setDontLikeThings] = useState("");

  async function loadProfile() {
    const { data, error } = await supabase
      .from("users")
      .select()
      .eq("email", user?.primaryEmailAddress?.emailAddress);
    if (error) {
      console.log({ error });
    }
    if (data) {
      setName(data[0].name);
      setClothesSize(data[0].clothesSize);
      setShoeSize(data[0].shoeSize);
      setLikeThings(data[0].likeThings);
      setDontLikeThings(data[0].dontLikeThings);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    loadProfile();
  }, []);

  async function handleSaveProfile() {
    setIsLoading(true);
    let { data, error } = await supabase
      .from("users")
      .update({
        name,
        clothesSize,
        shoeSize,
        likeThings,
        dontLikeThings,
      })
      .eq("id", user?.id);
    if (error) {
      console.log({ error });
      setIsLoading(false);
      return;
    }

    navigation.goBack();
  }

  return (
    <AppScreenContainer
      header={
        <TopScreenContainer>
          <AppLogo size="md" color={theme.colors.white} />
          <AppSpacer />
          <AppAvatar imagePath={`${user?.imageUrl}`} size={180} />
          <AppSpacer />
          <AppText bold color={theme.colors.white}>
            Perfil público de{" "}
          </AppText>
          <AppText size="xxlg" bold color={theme.colors.white}>
            {name === null || name.length === 0
              ? user?.primaryEmailAddress?.emailAddress
              : name}
          </AppText>
        </TopScreenContainer>
      }
    >
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <AppSpacer />
          <FormContainer>
            <AppInput
              label="Qual o seu nome?"
              value={name}
              onChangeText={(text) => setName(text)}
            />
            <AppSpacer />
            <AppInput
              label="O tamanho das suas roupas"
              value={clothesSize}
              onChangeText={(text) => setClothesSize(text)}
              placeholder="38 GG"
            />
            <AppSpacer />
            <AppInput
              label="Que número você calça?"
              value={shoeSize}
              onChangeText={(value) => setShoeSize(value)}
              placeholder="39/40"
            />

            <AppInput
              label="Do que você gosta?"
              value={likeThings}
              onChangeText={(value) => setLikeThings(value)}
              numberOfLines={4}
              multiline
              textAlignVertical="top"
              placeholder="Azul, colecionáveis e chocolate!"
            />

            <AppInput
              label="Do que você não gosta?"
              value={dontLikeThings}
              onChangeText={(value) => setDontLikeThings(value)}
              numberOfLines={4}
              multiline
              textAlignVertical="top"
              placeholder="Verde, cerveja e vinho, chinelo e pijama"
            />

            <AppSpacer />
            <AppButton
              title="Salvar"
              onPress={handleSaveProfile}
              variant="positive"
            />
            <AppSpacer verticalSpace="sm" />
            <AppButton
              title="Cancelar"
              onPress={() => navigation.goBack()}
              variant="negative"
            />
          </FormContainer>
        </ScrollView>
      )}
    </AppScreenContainer>
  );
}
