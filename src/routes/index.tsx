import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreateFriendGroup from "@screens/CreateFriendGroup";
import FriendGroupDetails from "@screens/FriendGroupDetails";
import Home from "@screens/Home";
import OAuthSignIn from "@screens/OAuthSignIn";
import Profile from "@screens/Profile";
import SearchGroup from "@screens/SearchGroup";

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="OAuthSignIn" component={OAuthSignIn} />

        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="CreateFriendGroup" component={CreateFriendGroup} />
        <Stack.Screen
          name="FriendGroupDetails"
          component={FriendGroupDetails}
        />
        <Stack.Screen name="SearchGroup" component={SearchGroup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
