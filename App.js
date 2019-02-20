import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import LinearGradient from 'react-native-linear-gradient'

let operations = ['DEL', '/', '*', '-', '+']
const divide = <FontAwesome5 size={16} name={'divide'} />
const times = <FontAwesome5 size={16} name={'times'} />
const minus = <FontAwesome5 size={16} name={'minus'} />
const plus = <FontAwesome5 size={16} name={'plus'} />

export default class App extends Component {

  state = {
    calculationDisplay: '',
    answerDisplay: '',
    waitingForOperand: false,
    operand: null,
    hasDecimals: false,
  }

  inputDigit (digit) {
    const { calculationDisplay, waitingForOperand, answerDisplay, operand } = this.state

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
    } else if (operand !== null) {
      this.setState({
        calculationDisplay: calculationDisplay+digit,
        answerDisplay: eval(calculationDisplay+digit)
      })
    }
    else {
      this.setState({ calculationDisplay: calculationDisplay+digit })
    }
  }

  inputDecimal () {
    const { calculationDisplay, waitingForOperand, operand, hasDecimals } = this.state
    if (hasDecimals) return
    if (waitingForOperand || operand !== null) {
      this.setState({
        calculationDisplay: calculationDisplay+'.',
        waitingForOperand: false,
        hasDecimals: true,
      })
    }
    else {
      if (calculationDisplay.indexOf('.') === -1 ) {
        this.setState({calculationDisplay: calculationDisplay+'.'})
      }
    }
  }

  performOperation (operator) {
    const { calculationDisplay, operand, } = this.state

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
      waitingForOperand: false,
      operand: null,
      hasDecimals: false,
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
      switch(operations[i]) {
        case '/':
          operationKeys.push(
            <TouchableOpacity
              key={operations[i]}
              onPress={() => this.performOperation(operations[i])}
              style={styles.key}>
              <Text style={styles.operationKeyText}>{divide}</Text>
            </TouchableOpacity>
          )
        break
        case '*':
          operationKeys.push(
            <TouchableOpacity
              key={operations[i]}
              onPress={() => this.performOperation(operations[i])}
              style={styles.key}>
              <Text style={styles.operationKeyText}>{times}</Text>
            </TouchableOpacity>
          )
        break
        case '-':
          operationKeys.push(
            <TouchableOpacity
              key={operations[i]}
              onPress={() => this.performOperation(operations[i])}
              style={styles.key}>
              <Text style={styles.operationKeyText}>{minus}</Text>
            </TouchableOpacity>
          )
        break
        case '+':
          operationKeys.push(
            <TouchableOpacity
              key={operations[i]}
              onPress={() => this.performOperation(operations[i])}
              style={styles.key}>
              <Text style={styles.operationKeyText}>{plus}</Text>
            </TouchableOpacity>
          )
        break
        default:
        operationKeys.push(
          <TouchableOpacity
            key={operations[i]}
            onPress={() => this.performOperation(operations[i])}
            style={styles.key}>
            <Text style={styles.operationKeyText}>{operations[i]}</Text>
          </TouchableOpacity>
        )
      }
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
    paddingBottom: 30,
  },
  answerDisplayText: {
    fontSize: 40,
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
    fontSize: 26,
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
