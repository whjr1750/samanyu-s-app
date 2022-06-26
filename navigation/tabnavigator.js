import React from "react";
import { StyleSheet } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RFValue } from "react-native-responsive-fontsize";
import Home from "../screens/home";
import Settings from "../screens/settings";

const Tab = createMaterialBottomTabNavigator();

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator labeled={false}
            barStyle={styles.bottomTabStyle}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === "HomeScreen") {
                        iconName = focused ? "home" : "home-outline";
                    }  else if (route.name === "Settings") {
                        iconName = focused ? "settings" : "settings-outline";
                      }
                    return (
                        <Ionicons
                            name={iconName}
                            size={RFValue(25)}
                            color={color}
                            style={styles.icons}
                        />
                    );
                }
            })}
            activeColor={"#cce0ff"}
            inactiveColor={"#F1F3CE"}
        >
            <Tab.Screen name="HomeScreen" component={Home} />
            <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    bottomTabStyle: {
        backgroundColor: "#0f0e2b",
        height: "8%",
        overflow: "hidden",
        position: "absolute"
    },
    icons: {
        width: RFValue(30),
        height: RFValue(30)
    }
})

export default BottomTabNavigator;