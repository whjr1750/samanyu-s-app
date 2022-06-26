//User can see the full story in it
/*  Little Dhruv was five year old son of King Uttampada and queen Suniti of Bharatavarsha l, also grandson of King Manu. The king also had other son whose name was Uttama, he was son of king’s second wife Suruchi.

As per the tradition during that time, elder son inherits the throne, so Dhruv was the heir to the throne. But queen Suruchi had other plans, she did not leave any stone unturned to make all efforts to make Uttama the king and get Dhruv out of the way. Suruchi’s disdain for Dhruv deeply hurt him one day when Dhruv was sitting on his father’s lap, Suruchi insisted that uttama should sit on his lap instead of Dhruv & the king obliged. Young and sensitive Dhruv was hurt deeply, he asked Suruchi to mend her ways and give him his rightful place but she replied ” Go and ask Bhagvan Vishnu about place for you to sit, he can only help you. There is no place for you here on King’s lap”

Little but determined kid Dhruv went to the jungle away from the kingdom and started a strong penance. Very soon his strong penance was noticed by Narada Muni. He conveyed this to Bhagvan Vishnu.

After lot many months and days, one day Bhagvan Vishnu came to earth with his Garud Vahana and appeared in his divine form in front of the Dhruv. Dhruv’s joy knew no bounds after seeing Bhagvan. Bhagvan told him he was very happy with his penance and can ask for anything that he wants.

Little kid Dhruv was awestruck and could not speak anything. Loss of personal desire is precursor to reaching nirvana in Hindu mythology . Bhagvan Vishnu with his infinite wisdom understood Dhruv’s original desire and granted him a wish – you will have permanent place in my cosmic universe and will not be disturbed even by the maha pralay.

Young Dhruv who was not given place on his father’s lap ended up getting a permanent place on the creator of the universe’s lap. This is how we got our Dhruv tara (Pole Star) shining in the sky.

It’s so amazing how Indian mythology weaves elements of our daily lives into the grand scheme of things. We have a story for the ever shining star as well as flowing river. Divinity is not exclusive to the gods, it is everywhere.

Dhruv Tara is an ever shining star in the sky. Sailors who used to get lost in the sea before the advent of all the technolgy, used to look for this star in the sky to get sense of direction. Dhruv tara was their guiding star in the troubled times which kept their hope alive!
   */
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  ScrollView,
  Dimensions,TouchableOpacity
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import Ionicons from "react-native-vector-icons/Ionicons";

import * as Speech from "expo-speech";

import AppLoading from "expo-app-loading";
import * as Font from "expo-font";

let fonts = {
  'custom-font': require('../assets/fonts/Grandstander-Regular.ttf')
}

export default class Story extends Component {

  constructor(props) {
    super(props)
    this.state = {
      fontsLoaded: true,
      speakerColor: "gray",
      speakerIcon: "volume-high-outline",
    }
  }

  async _loadFontsAsync() {
    await Font.loadAsync(fonts);
    this.setState({ fontsLoaded: true });
  }

  async initiateTTS(title, author, story, moral) {
    console.log(title);
    const current_color = this.state.speakerColor;
    this.setState({
      speakerColor: current_color === "gray" ? "#ee8249" : "gray"
    });
    if (current_color === "gray") {
      Speech.speak(`${title} by ${author}`);
      Speech.speak(story);
      Speech.speak("The moral of the story is!");
      Speech.speak(moral);
    } else {
      Speech.stop();
    }
  }

  render() {
    if (!this.props.route.params) {
      this.props.navigation.navigate("Home");
    } else if (!this.state.fontsLoaded) {
      return <AppLoading />;
    } else {
      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />
          <View style={styles.appTitle}>
            <View style={styles.appTitleTextContainer}>
              <Text style={styles.appTitleText}>
                My App
              </Text>
            </View>
          </View>
          <View style={styles.storyContainer}>
            <View style={styles.dataContainer}>
              <View style={styles.titleTextContainer}>
                <Text
                  style={styles.storyTitleText}>
                  {this.props.route.params.story.title}
                </Text>
              </View>
              <View style={styles.iconContainer}>
                <TouchableOpacity
                  onPress={() =>
                    this.initiateTTS(
                      this.props.route.params.title,
                      this.props.route.params.story,
                      this.props.route.params.moral
                    )
                  }
                >
                  <Ionicons
                    name={this.state.speakerIcon}
                    size={RFValue(30)}
                    color={this.state.speakerColor}
                    style={{ margin: RFValue(15) }}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.storyTextContainer}>
              <Text
                style={styles.storyText}>
                {this.props.route.params.story.story}
              </Text>
              <Text
                style={styles.moralText}>
                Moral - {this.props.route.params.story.moral}
              </Text>
            </View>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#392C2C"
  },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
  },
  appTitle: {
    flex: 0.07,
    flexDirection: "row"
  },
  appIcon: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center"
  },
  appTitleTextContainer: {
    flex: 0.7,
    justifyContent: "center"
  },
  appTitleText: {
    color: "#E8C360",
    fontSize: RFValue(28),
    fontFamily: "custom-font"
  },
  storyContainer: {
    flex: 1
  },
  storyCard: {
    margin: RFValue(20),
    backgroundColor: "#2f345d",
    borderRadius: RFValue(20)
  },
  image: {
    width: "100%",
    alignSelf: "center",
    height: RFValue(200),
    borderTopLeftRadius: RFValue(20),
    borderTopRightRadius: RFValue(20),
    resizeMode: "contain"
  },
  dataContainer: {
    flexDirection: "row",
    padding: RFValue(20)
  },
  titleTextContainer: {
    flex: 0.8
  },
  storyTitleText: {
    fontFamily: "custom-font",
    fontSize: RFValue(25),
    color: "#E8C360"
  },
  storyAuthorText: {
    fontFamily: "custom-font",
    fontSize: RFValue(18),
    color: "#E8C360"
  },
  iconContainer: {
    flex: 0.2
  },
  storyTextContainer: {
    padding: RFValue(20)
  },
  storyText: {
    fontFamily: "custom-font",
    fontSize: RFValue(15),
    color: "#E8C360"
  },
  moralText: {
    fontFamily: "custom-font",
    fontSize: RFValue(20),
    color: "#E8C360"
  },
});
