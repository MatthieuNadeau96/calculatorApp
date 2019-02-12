import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
} from 'react-native'

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.calculationDisplay}></View>
        <View style={styles.answerDisplay}></View>
        <View style={styles.keypad}>
          <View style={styles.digitKeys}></View>
          <View style={styles.operationKeys}></View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  calculationDisplay: {
    flex: 2,
    backgroundColor: '#d4d4d4',
  },
  answerDisplay: {
    flex: 1,
    backgroundColor: '#ababab',
  },
  keypad: {
    flex: 7,
    flexDirection: 'row',
  },
  digitKeys: {
    flex: 3,
    backgroundColor: 'white',
  },
  operationKeys: {
    flex: 1,
    backgroundColor: '#d3e0df',
  },
})
