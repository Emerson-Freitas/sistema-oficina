import { Stack } from 'expo-router';
import { useAuth } from './context/AuthContext';
import { Button } from 'react-native';

export default function Layout() {
    const { authState, onLogout } = useAuth();

    return (
        <Stack
            screenOptions={{
                headerStyle: {
                backgroundColor: '#f4511e',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                fontWeight: 'bold',
                },
            }}
        >
        {authState?.authenticated ? (
            <Stack.Screen 
                name="Home"
                options={{
                    headerRight: () => <Button onPress={onLogout} title="Sair" />
                }}
            />
        ) : (
            <Stack.Screen name="Login"/>
        )}
        </Stack>
    );
}


// export const Layout = () => {
//     const { authState, onLogout } = useAuth();
//     return (
//         <NavigationContainer>
//             <Stack.Navigator>
//                 {authState?.authenticated ? (
//                     <Stack.Screen 
//                         name="Home" 
//                         component={Home}
//                         options={{
//                             headerRight: () => <Button onPress={onLogout} title="Sair" />
//                         }}
//                     ></Stack.Screen>
//                 ) : (
//                     <Stack.Screen name="Login" component={Login}></Stack.Screen>
//                 )}
//             </Stack.Navigator>
//         </NavigationContainer>
//     )
// }