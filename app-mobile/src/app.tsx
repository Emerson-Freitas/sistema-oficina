// import { StatusBar } from "expo-status-bar";
// import { Button, StyleSheet, Text, View } from "react-native";
// import { AuthProvider, useAuth } from "./context/AuthContext";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import Home from "./app/Home";
// import Login from "./app/Login";
// import { useEffect } from "react";

// const Stack = createNativeStackNavigator();

// export default function App() {
//     return (
//         <AuthProvider>
//             <Layout/>
//         </AuthProvider>
//     );
// }

// // export const Layout = () => {
// //     const { authState, onLogout } = useAuth();


// //     useEffect(() => {console.log("montou a tela")}, [])
// //     return (
// //         <NavigationContainer>
// //             <Stack.Navigator>
// //                 {authState?.authenticated ? (
// //                     <Stack.Screen 
// //                         name="Home" 
// //                         component={Home}
// //                         options={{
// //                             headerRight: () => <Button onPress={onLogout} title="Sair" />
// //                         }}
// //                     ></Stack.Screen>
// //                 ) : (
// //                     <Stack.Screen name="Login" component={Login}></Stack.Screen>
// //                 )}
// //             </Stack.Navigator>
// //         </NavigationContainer>
// //     )
// // }