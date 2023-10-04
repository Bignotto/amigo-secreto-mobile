import { useUser } from "@clerk/clerk-expo";
import AppAvatar from "@components/AppAvatar";
import AppInput from "@components/AppInput";
import AppLogo from "@components/AppLogo";
import AppScreenContainer from "@components/AppScreenContainer";
import AppSpacer from "@components/AppSpacer";
import AppText from "@components/AppText";
import supabase from "@services/supabase";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ActivityIndicator } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { FormContainer, TopScreenContainer } from "./styles";

export default function Profile() {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(true);

  const { control, setValue, handleSubmit } = useForm();

  useEffect(() => {
    async function loadProfile() {
      const { data, error } = await supabase
        .from("users")
        .select()
        .eq("email", user?.primaryEmailAddress?.emailAddress);
      if (error) {
        console.log({ error });
      }
      if (data) {
        setValue("clothesSize", data[0].clothesSize);
        setValue("shoeSize", data[0].shoeSize);
        setValue("likeThings", data[0].likeThings);
        setValue("dontLikeThings", data[0].clothesSize);
      }
      setIsLoading(false);
    }
    loadProfile();
  }, []);

  return (
    <AppScreenContainer>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <TopScreenContainer>
            <AppLogo size="sm" />
            <AppSpacer />
            <AppAvatar imagePath={`${user?.imageUrl}`} size={200} />
            <AppSpacer />
            <AppText size="lg" bold>
              Perfil público de {user?.fullName}
            </AppText>
          </TopScreenContainer>
          <AppSpacer />
          <FormContainer>
            <Controller
              control={control}
              name="clothesSize"
              render={({ field: { onChange, onBlur, value } }) => (
                <AppInput
                  label="Tamanho que você veste?"
                  value={value}
                  onChangeText={(value) => onChange(value)}
                />
              )}
            />
            <Controller
              control={control}
              name="shoeSize"
              render={({ field: { onChange, onBlur, value } }) => (
                <AppInput
                  label="Tamanho que calça?"
                  value={value}
                  onChangeText={(value) => onChange(value)}
                />
              )}
            />
            <Controller
              control={control}
              name="likeThings"
              render={({ field: { onChange, onBlur, value } }) => (
                <AppInput
                  label="Do que você gosta?"
                  value={value}
                  onChangeText={(value) => onChange(value)}
                />
              )}
            />
            <Controller
              control={control}
              name="dontLikeThings"
              render={({ field: { onChange, onBlur, value } }) => (
                <AppInput
                  label="Do que você não gosta?"
                  value={value}
                  onChangeText={(value) => onChange(value)}
                />
              )}
            />
          </FormContainer>
        </ScrollView>
      )}
    </AppScreenContainer>
  );
}
