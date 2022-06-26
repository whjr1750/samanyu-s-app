//This is the feed screen
import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Platform,
    StatusBar,
    Image,
    FlatList
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import StoryCard from "./storycard";

let fonts = {
    'custom-font': require('../assets/fonts/Grandstander-Regular.ttf')
}

let stories = require("./stories.json")

export default class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            fontsLoaded: false
        }
    }

    componentDidMount() {
        this._loadFontsAsync()
    }

    async _loadFontsAsync() {
        await Font.loadAsync(fonts);
        this.setState({ fontsLoaded: true });
    }

    renderItem = ({ item: story }) => {
        return <StoryCard story={story} navigation={this.props.navigation} />;
    };

    keyExtractor = (item, index) => index.toString()

    render() {
        if (!this.state.fontsLoaded) {
            return <AppLoading />;
        } else {
            return (
                <View style={styles.container}>
                    <SafeAreaView style={styles.droidSafeArea} />
                    <View style={styles.appTitleTextContainer}>
                        <Text style={styles.appTitleText}>Title</Text>
                    </View>
                    <View style={styles.cardContainer}>
                        <FlatList
                            keyExtractor={this.keyExtractor}
                            data={stories}
                            renderItem={this.renderItem}
                            horizontal={true}
                        />
                    </View>
                    <View style={{ flex: 0.08 }} />
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0f0e2b",
        justifyContent: 'center'
    },
    droidSafeArea: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(5)
    },
    appTitleTextContainer: {
        justifyContent: "center",
        alignContent: 'center',
    },
    appTitleText: {
        color: "#E8C360",
        fontSize: RFValue(38),
        fontFamily: 'custom-font',
        marginLeft: 150,
        marginTop: 10
    },
    cardContainer: {
        flex: 15,
        width: "100%",
        justifyContent: 'center'
    }
});
