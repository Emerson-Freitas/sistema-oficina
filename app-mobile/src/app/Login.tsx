import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, IconButton, TextInput, TextInputAffixProps, Tooltip } from "react-native-paper";
import axios, { AxiosResponse } from "axios";
import { useAuth } from "./context/AuthContext";

interface IUser {
  id: string
  name: string 
  cpf: string
  telephone: string
  email: string 
  created_at?: Date | string
  picture?: string
}

interface ILogin {
  email: string;
  password: string;
}

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false)
  const [visible, setVisible] = useState<boolean>(true)
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [user, setUser] = useState<IUser | any>();
  const { onLogin } = useAuth();
  const handleVisible = () => {
    setVisible(!visible)
  }

  const login = async () => {
    const credentials = { email, password }
    const result = await onLogin!(credentials)
    console.log("result>>>", result)
  }

//   useEffect(() => {
//     if (errorMessage) {
//       setErrorMessage(null)
//     }
//   }, [email, password])

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <TextInput
          label="Email"
          value={email}
          onChangeText={(email) => setEmail(email)}
          style={styles.input}
        />
        <TextInput
          label="Senha"
          value={password}
          onChangeText={(password) => setPassword(password)}
          style={styles.input}
          secureTextEntry={!visible}
          right={visible ? <TextInput.Icon onPress={handleVisible} icon="eye"/> : <TextInput.Icon onPress={handleVisible} icon="eye"/>}
        />
        {/* {errorMessage !== null && (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        )} */}
        <Button loading={loading} style={styles.buttonLogin} mode="contained" onPress={login} buttonColor="green">Entrar</Button>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  errorMessage: {
    color: "red",
    fontWeight: "bold",
    padding: "1%",
    marginTop: "1%",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    padding: "5%",
    width: "96%",
    height: 280,
    backgroundColor: "#ffe",
  },
  input: {
    borderRadius: 2,
    marginTop: "2.5%",
    marginBottom: "2.5%",
  },
  buttonLogin: {
    marginTop: 12,
  }
});
