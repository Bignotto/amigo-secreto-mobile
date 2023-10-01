import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import AppButton from "@components/AppButton";
import AppScreenContainer from "@components/AppScreenContainer";
import AppText from "@components/AppText";
import { appUseAuth } from "@hooks/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "@routes/Navigation.types";

export default function Home() {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const { appSignOut } = appUseAuth();
  const { user } = useUser();

  return (
    <AppScreenContainer>
      <AppText>
        RN Expo StyledComponents with Stack Navigation and Clerk authentication
      </AppText>
      <AppText>Template version: 2</AppText>

      <SignedIn>
        <AppText>{user?.primaryEmailAddress?.emailAddress}</AppText>
        <AppButton title="Log out" onPress={() => appSignOut()} />
      </SignedIn>
      <SignedOut>
        <AppText>No user logged in</AppText>
        <AppButton
          title="Login"
          onPress={() => navigation.navigate("OAuthSignIn")}
        />
      </SignedOut>
    </AppScreenContainer>
  );
}
