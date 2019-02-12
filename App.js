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
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.key}><Text style={styles.keyText}>7</Text></TouchableOpacity>
              <TouchableOpacity style={styles.key}><Text style={styles.keyText}>8</Text></TouchableOpacity>
              <TouchableOpacity style={styles.key}><Text style={styles.keyText}>9</Text></TouchableOpacity>
            </View>
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.key}><Text style={styles.keyText}>4</Text></TouchableOpacity>
              <TouchableOpacity style={styles.key}><Text style={styles.keyText}>5</Text></TouchableOpacity>
              <TouchableOpacity style={styles.key}><Text style={styles.keyText}>6</Text></TouchableOpacity>
            </View>
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.key}><Text style={styles.keyText}>1</Text></TouchableOpacity>
              <TouchableOpacity style={styles.key}><Text style={styles.keyText}>2</Text></TouchableOpacity>
              <TouchableOpacity style={styles.key}><Text style={styles.keyText}>3</Text></TouchableOpacity>
            </View>
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.key}><Text style={styles.keyText}>.</Text></TouchableOpacity>
              <TouchableOpacity style={styles.key}><Text style={styles.keyText}>0</Text></TouchableOpacity>
              <TouchableOpacity style={styles.key}><Text style={styles.keyText}>=</Text></TouchableOpacity>
            </View>
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
    flexWrap: 'wrap',
  },
  digitKeys: {
    flex: 3,
    backgroundColor: 'white',
  },
  key: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
    backgroundColor: '#8b85a6',
  },
  keyText: {
    fontSize: 40,
  },
  buttonRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  operationKeys: {
    flex: 1,
    backgroundColor: '#d3e0df',
  },
})
