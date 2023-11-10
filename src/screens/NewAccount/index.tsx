import AppScreenContainer from "@components/AppScreenContainer";
import AppText from "@components/AppText";
import { useRoute } from "@react-navigation/native";
import supabase from "@services/supabase";
import React, { useEffect, useState } from "react";
import { Alert } from "react-native";

type NewAccountParams = {
  email: string;
};

export default function NewAccount() {
  const route = useRoute();
  const { email } = route.params as NewAccountParams;

  const [isLoading, setIsLoading] = useState(true);

  async function checkEmail() {
    console.log("checking email");
    const { data, error } = await supabase
      .from("users")
      .select("email")
      .eq("email", email.trim().toLowerCase());

    console.log({ data });
    if (data![0]) {
      Alert.alert("Já existe uma conta usando este e-mail.");
    }
  }

  useEffect(() => {
    checkEmail();
  }, []);

  return (
    <AppScreenContainer>
      <AppText>This is new account screen {email}</AppText>
    </AppScreenContainer>
  );
}
