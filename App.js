import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'

export default class App extends Component {

  state = {
    calculationDisplay: '',
    answerDisplay: '',
    waitingForOperand: false,
    operator: null,
  }

  inputDigit (digit) {
    const { calculationDisplay, waitingForOperand, answerDisplay } = this.state
    if(waitingForOperand) {
      this.setState({
        calculationDisplay: calculationDisplay + digit,
        waitingForOperand: false,
      })
    } else {
      this.setState({calculationDisplay: calculationDisplay+digit })
    }
  }

  inputDecimal () {
    const { calculationDisplay, waitingForOperand } = this.state
    if (waitingForOperand) {
      this.setState({
        calculationDisplay: calculationDisplay+'.',
        waitingForOperand: false
      })
    }
    else {
      if (calculationDisplay.indexOf('.') === -1) {
        this.setState({calculationDisplay: calculationDisplay+'.'})
      }
    }
  }

  performOperation (operator) {
    this.setState({
      waitingForOperand: true,
      operator: operator,
      calculationDisplay: this.state.calculationDisplay+operator,
    })

  }

  clearDisplay () {
    this.setState({calculationDisplay: '', answerDisplay: '',})
  }

  render() {
    const { calculationDisplay, answerDisplay } = this.state

    return (
      <View style={styles.container}>
        <View style={styles.calculationDisplay}>
          <Text style={styles.calculationDisplayText}>{calculationDisplay}</Text>
        </View>
        <View style={styles.answerDisplay}>
          <Text style={styles.answerDisplayText}>{answerDisplay}</Text>
        </View>
        <View style={styles.keypad}>
          <View style={styles.digitKeys}>
            <View style={styles.buttonRow}>
              <TouchableOpacity
                onPress={() => this.inputDigit(7)}
                style={styles.key}>
                <Text style={styles.keyText}>7</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.inputDigit(8)}
                style={styles.key}>
                <Text style={styles.keyText}>8</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.inputDigit(9)}
                style={styles.key}>
                <Text style={styles.keyText}>9</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonRow}>
              <TouchableOpacity
                onPress={() => this.inputDigit(4)}
                style={styles.key}>
                <Text style={styles.keyText}>4</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.inputDigit(5)}
                style={styles.key}>
                <Text style={styles.keyText}>5</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.inputDigit(6)}
                style={styles.key}>
                <Text style={styles.keyText}>6</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonRow}>
              <TouchableOpacity
                onPress={() => this.inputDigit(1)}
                style={styles.key}>
                <Text style={styles.keyText}>1</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.inputDigit(2)}
                style={styles.key}>
                <Text style={styles.keyText}>2</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.inputDigit(3)}
                style={styles.key}>
                <Text style={styles.keyText}>3</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonRow}>
              <TouchableOpacity
                onPress={() => this.inputDecimal()}
                style={styles.key}>
                <Text style={styles.keyText}>.</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.inputDigit(0)}
                style={styles.key}>
                <Text style={styles.keyText}>0</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.key}>
                <Text style={styles.keyText}>=</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.operationKeys}>
            <TouchableOpacity
              onPress={() => this.clearDisplay()}
              style={styles.key}>
              <Text style={styles.keyText}>DEL</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.performOperation('/')}
              style={styles.key}>
              <Text style={styles.keyText}>/</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.performOperation('*')}
              style={styles.key}>
              <Text style={styles.keyText}>*</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.performOperation('-')}
              style={styles.key}>
              <Text style={styles.keyText}>-</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.performOperation('+')}
              style={styles.key}>
              <Text style={styles.keyText}>+</Text>
            </TouchableOpacity>
          </View>
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
    flex: 3,
    backgroundColor: '#d4d4d4',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: 10,
  },
  calculationDisplayText: {
    fontSize: 70,
  },
  answerDisplay: {
    flex: 1,
    backgroundColor: '#ababab',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: 10,
  },
  answerDisplayText: {
    fontSize: 35,
  },
  keypad: {
    flex: 6,
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
    backgroundColor: '#e8e8e9',
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
