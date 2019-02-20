import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'

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
          calculationDisplay: calculationDisplay+operator
        })
    }
    // this.setState({
    //   waitingForOperand: true,
    //   operand: operator,
    //   calculationDisplay: calculationDisplay+operator,
    // })
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
      rows.push(<View style={styles.buttonRow}>{row}</View>)
    }

    let operationKeys = []
    for(let i = 0; i < operations.length; i++) {
      operationKeys.push(
        <TouchableOpacity
          key={operations[i]}
          onPress={() => this.performOperation(operations[i])}
          style={styles.key}>
          <Text style={styles.keyText}>{operations[i]}</Text>
        </TouchableOpacity>
      )
    }

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
