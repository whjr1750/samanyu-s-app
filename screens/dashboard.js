import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigator from "../navigation/tabnavigator";
import StackNavigator from "../navigation/stacknavigator";
export default function DashboardScreen() {
    return (
        <NavigationContainer>
            <StackNavigator />
        </NavigationContainer>
    );
}
