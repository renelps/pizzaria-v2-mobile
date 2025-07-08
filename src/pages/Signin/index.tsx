import React, { useContext, useState } from "react";
import { 
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator

} from "react-native";
import { AuthContext } from "../../contexts/authContext";

export default function Signin(){
  const { signIn, loadingAuth } = useContext(AuthContext)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")

  async function handleLogin(){

    if(email.trim() === '' || password.trim() === '') return;

    await signIn({ email, password })
  }

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", gap: 5, marginBottom: 20 }}>
        <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 30 }}>
          PIZZARIA
        </Text>
        <Text style={{ color: "#f62913", fontSize: 30, fontWeight: "bold"}}>
          OLIVEIRA
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput 
          placeholder="Digite o seu email..."
          style={styles.input}
          placeholderTextColor="#fff"
          onChangeText={setEmail}
          value={email}
        />
        <TextInput 
          placeholder="Digite sua senha..."
          style={styles.input}
          placeholderTextColor="#fff"
          secureTextEntry={true}
          onChangeText={setPassword}
          value={password}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>
            {loadingAuth ? <ActivityIndicator size={20}/> : "Acessar"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1d1d2e",
  },
  text: {
    color: "#fff"
  },
  logo: {
    width: 250,
    height: 259,
    resizeMode: "contain",
    backgroundColor: "#fff",
  },
  inputContainer: {
    width: "95%",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 27,
    paddingHorizontal: 22
  },
  input: {
    width: "95%",
    backgroundColor: "#101026",
    color: "#fff",
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#404040"
  },
  button: {
    backgroundColor: "#1fff",
    width: "95%",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    borderRadius: 4,
    marginTop: 15
  },
  buttonText: {
    color: "#101026",
    fontWeight: "600"

  } 
})