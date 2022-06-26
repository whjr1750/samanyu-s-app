import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigator from "../navigation/tabnavigator";

export default function DashboardScreen() {
    return (
        <NavigationContainer>
            <BottomTabNavigator />
        </NavigationContainer>
    );
}
