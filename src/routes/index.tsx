import React, { useContext } from "react";

import { Text, View, ActivityIndicator } from "react-native";

import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes";
import { AuthContext } from "../contexts/authContext";

function Routes(){
  const { isAuthenticated, loading } = useContext(AuthContext);
  


  if(loading) {
    return (
      <View style={{ 
        flex: 1, 
        backgroundColor: "#f5f7fb", 
        justifyContent: "center", 
        alignItems: "center" 
      }}
      >
        <ActivityIndicator size={44}/>
      </View>
    )
  }


  return (
    isAuthenticated ? <AppRoutes /> : <AuthRoutes />
  )
}

export default Routes;