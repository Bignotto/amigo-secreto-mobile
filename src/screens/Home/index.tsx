import { useAuth, useUser } from "@clerk/clerk-expo";
import AppLogo from "@components/AppLogo";
import AppScreenContainer from "@components/AppScreenContainer";
import Header from "@components/Header";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "@routes/Navigation.types";

export default function Home() {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const { isSignedIn, isLoaded, signOut } = useAuth();
  const { user } = useUser();

  return (
    <AppScreenContainer>
      <Header />
      <AppLogo size="lg" />
    </AppScreenContainer>
  );
}
