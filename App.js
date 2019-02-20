import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'

import LinearGradient from 'react-native-linear-gradient'

let operations = ['DEL', '/', '*', '-', '+']

export default class App extends Component {

  state = {
    value: null,
    calculationDisplay: '',
    answerDisplay: '',
    waitingForOperand: false,
    operand: null,
    nextValue: null,
  }

  inputDigit (digit) {
    const { calculationDisplay, waitingForOperand, answerDisplay } = this.state

    if (digit === '.') {
      return this.inputDecimal()
    }

    if (digit === '=') {
      return this.validate() && this.calculateResult()
    }

    if(waitingForOperand) {
      this.setState({
        calculationDisplay: calculationDisplay + digit,
        waitingForOperand: false,
        nextValue: calculationDisplay
      })
    } else {
      this.setState({calculationDisplay: calculationDisplay+digit })
    }
  }

  inputDecimal () {
    const { calculationDisplay, waitingForOperand, operand } = this.state
    if (waitingForOperand || operand !== null) {
      this.setState({
        calculationDisplay: calculationDisplay+'.',
        waitingForOperand: false
      })
    }
    else {
      if (calculationDisplay.indexOf('.') === -1 ) {
        this.setState({calculationDisplay: calculationDisplay+'.'})
      }
    }
  }

  performOperation (operator) {
    const { calculationDisplay, operand, value, nextValue } = this.state

    switch(operator) {
      case 'DEL':
        return this.clearDisplay()
        break
      case '/':
      case '*':
      case '-':
      case '+':
        const lastChar = calculationDisplay.split('').pop()
        if(operations.indexOf(lastChar) > 0) return
        if(calculationDisplay === "") return
        this.setState({
          operand: operator,
          calculationDisplay: calculationDisplay+operator
        })
    }
  }

  clearDisplay () {
    this.setState({
      calculationDisplay: '',
      answerDisplay: '',
      value: null,
    })
  }

  validate () {
    const { calculationDisplay } = this.state
    switch(calculationDisplay.slice(-1)) {
      case '+':
      case '-':
      case '*':
      case '/':
        return false
    }
    return true
  }

  calculateResult () {
    const { calculationDisplay, answerDisplay } = this.state
    this.setState({
      answerDisplay: eval(calculationDisplay)
    })
  }

  render() {
    const { calculationDisplay, answerDisplay } = this.state

    let rows = []
    let nums = [[7,8,9], [4,5,6], [1,2,3], ['.', 0, '=']]
    for(let i = 0; i < 4; i++) {
      let row = []
      for(let j = 0; j < 3; j++) {
        row.push(
          <TouchableOpacity
            key={nums[i][j]}
            onPress={() => this.inputDigit(nums[i][j])}
            style={styles.key}>
            <Text style={styles.keyText}>{nums[i][j]}</Text>
          </TouchableOpacity>
        )
      }
      rows.push(<View key={[i]} style={styles.buttonRow}>{row}</View>)
    }

    let operationKeys = []
    for(let i = 0; i < operations.length; i++) {
      operationKeys.push(
        <TouchableOpacity
          key={operations[i]}
          onPress={() => this.performOperation(operations[i])}
          style={styles.key}>
          <Text style={styles.operationKeyText}>{operations[i]}</Text>
        </TouchableOpacity>
      )
    }

    return (
      <View style={styles.container}>
        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#393939', '#2d2d2e', '#1b1c1f']} style={styles.calculationDisplay}>
          <Text style={styles.calculationDisplayText}>{calculationDisplay}</Text>
        </LinearGradient>
        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#393939', '#2d2d2e', '#1b1c1f']} style={styles.answerDisplay}>
          <Text style={styles.answerDisplayText}>{answerDisplay}</Text>
        </LinearGradient>
        <View style={styles.keypad}>
          <View style={styles.digitKeys}>
            {rows}
          </View>
          <View style={styles.operationKeys}>
            {operationKeys}
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
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: 10,
  },
  calculationDisplayText: {
    fontSize: 70,
    color: '#ffffff',
  },
  answerDisplay: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: 10,
  },
  answerDisplayText: {
    fontSize: 35,
    color: '#ffffff',
  },
  keypad: {
    flex: 6,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  digitKeys: {
    flex: 3,
    backgroundColor: '#ffffff',
  },
  key: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  keyText: {
    fontSize: 40,
    color: '#414141',
  },
  operationKeyText: {
    fontSize: 40,
    color: '#606163',
  },
  buttonRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  operationKeys: {
    flex: 1,
    backgroundColor: '#f0f8ff',
  },
})
