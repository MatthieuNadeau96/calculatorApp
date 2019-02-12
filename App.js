import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.calculationDisplay}></View>
        <View style={styles.answerDisplay}></View>
        <View style={styles.keypad}>
          <View style={styles.digitKeys}>
            <TouchableOpacity style={styles.digitKey}><Text style={styles.digitKeyText}>0</Text></TouchableOpacity>
            <TouchableOpacity style={styles.digitKey}><Text style={styles.digitKeyText}>1</Text></TouchableOpacity>
            <TouchableOpacity style={styles.digitKey}><Text style={styles.digitKeyText}>2</Text></TouchableOpacity>
            <TouchableOpacity style={styles.digitKey}><Text style={styles.digitKeyText}>3</Text></TouchableOpacity>
            <TouchableOpacity style={styles.digitKey}><Text style={styles.digitKeyText}>4</Text></TouchableOpacity>
            <TouchableOpacity style={styles.digitKey}><Text style={styles.digitKeyText}>5</Text></TouchableOpacity>
            <TouchableOpacity style={styles.digitKey}><Text style={styles.digitKeyText}>6</Text></TouchableOpacity>
            <TouchableOpacity style={styles.digitKey}><Text style={styles.digitKeyText}>7</Text></TouchableOpacity>
            <TouchableOpacity style={styles.digitKey}><Text style={styles.digitKeyText}>8</Text></TouchableOpacity>
            <TouchableOpacity style={styles.digitKey}><Text style={styles.digitKeyText}>9</Text></TouchableOpacity>
          </View>
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
    flexDirection: 'row',
  },
  digitKey: {
    flex: 1,
  },
  digitKeyText: {
    fontSize: 40,
  },
  operationKeys: {
    flex: 1,
    backgroundColor: '#d3e0df',
  },
})
