const { createNativeStackNavigator } = require('@react-navigation/native-stack');
const { default: Login } = require('./Login');

const Stack = createNativeStackNavigator();

export function AuthStack({ }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
}
