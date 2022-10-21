import React from 'react';
import {useState} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';

export default function App() {
  // Mapeamento de teclas
  const buttons = ['LIMPAR', 'DEL', '%', '/', 7, 8, 9, "x", 6, 5, 4, '-', 3, 2, 1, '+', 0, '.', '+/-', '=']

  const [currentNumber, setCurrentNumber] = useState("")
  const [lastNumber, setLastNumber] = useState("")

  function calculator(){
    var operator = "+";
    var isNumber = true;
    var resultNumber = 0;
    const splitNumbers = currentNumber.split(' ');

    for (let index = 0; index < splitNumbers.length; index++) {
      const value = splitNumbers[index];
      var valueNumber = parseInt(value);
      
      if (isNumber) {
        if (!Number.isNaN(valueNumber)) {
          if (index > 0) {
            // Faz ação referente tecla pressionada
            switch(operator){
              case '+':   
                resultNumber = resultNumber + valueNumber;
                break
              case '-': 
                resultNumber = resultNumber - valueNumber;
                break
              case 'x':
                resultNumber = resultNumber * parseInt(value);
                break
              case '/': 
                resultNumber = resultNumber / parseInt(value);
                break
              case '%': 
                const firstResult = resultNumber * valueNumber;
                resultNumber = firstResult / 100;
                break
            }
          } else {
            resultNumber = valueNumber;
          }
        }

        isNumber = false;
      } else {
        operator = value;
        isNumber = true;
      }
    }

    const lastValue = parseInt(splitNumbers[splitNumbers.length - 1]);

    if (Number.isNaN(lastValue) && operator == '%') {
      resultNumber = resultNumber / 100;
    }
    
    setCurrentNumber(resultNumber.toString());
  }

  function handleInput(buttonPressed){  
    const splitNumbers = currentNumber.split(' ');

    console.log(buttonPressed) // Mostra no Console a tecla pressionada
    if(buttonPressed === '+' | buttonPressed === "-" | buttonPressed === "x" | buttonPressed === "/" | buttonPressed === "%" ){
      if (currentNumber.length > 0) {
        var lastCharacter = currentNumber.substring(currentNumber.length - 1);

        if (lastCharacter != " ") {        
          setCurrentNumber(currentNumber + " " + buttonPressed + " ")
        }
      }

      return
    } else if (buttonPressed === '.') {
      var lastCharacter = currentNumber.substring(currentNumber.length - 1);

      console.log("O ultimo caracter é " + lastCharacter);

      if (lastCharacter === '.') {
        return;
      }
    }

    switch(buttonPressed){
      case 'DEL':
        if (lastNumber.length > 0 && splitNumbers.length < 2) {
          setLastNumber("") 
          setCurrentNumber("") 
        } else {
          var charactersRemove = 1;
          const lastCharacter = splitNumbers[splitNumbers.length - 1];
  
          if(lastCharacter === '+' | lastCharacter === "-" | lastCharacter === "x" | lastCharacter === "/" ){
            charactersRemove = 2;
          } else if (lastCharacter.length == 0) {          
            charactersRemove = 3;
          }
  
          setCurrentNumber(currentNumber.substring(0, (currentNumber.length - charactersRemove)))
        }
        return
      case 'LIMPAR': // Limpa todo o conteúdo
        setLastNumber("") 
        setCurrentNumber("") 
        return
      case '=':
        setLastNumber(currentNumber + " = ")
        calculator()
        return
      case '+/-':
        if (currentNumber.length > 0) {
          const splitNumbers = currentNumber.split(' ');
          var lastValue = parseInt(splitNumbers[splitNumbers.length - 1]);
          
          if (!Number.isNaN(lastValue)) {
            var newCurrentNumber = "";

            if (lastValue > 0) {
              splitNumbers[splitNumbers.length - 1] = "-" + lastValue;
            } else {
              var stringValue = lastValue.toString();
              
              splitNumbers[splitNumbers.length - 1] = stringValue.substring(1);
            }

            splitNumbers.forEach(value => {
              newCurrentNumber += value + " ";
            });

            newCurrentNumber = newCurrentNumber.slice(0, -1);
            setCurrentNumber(newCurrentNumber)
          }
        }
        return
    }

    if (lastNumber.length > 0 && splitNumbers.length < 2) {
      setLastNumber("");
      setCurrentNumber(buttonPressed.toString()); 
    } else {
      setCurrentNumber(currentNumber + buttonPressed);
    }
  }


  return (
    <View style={styles.container}>

      {/* Area onde o resultado é exibido */}
      <View style={styles.results}>
        <Text style={styles.historyText}>{lastNumber}</Text>
        <Text style={styles.resultText}>{currentNumber}</Text>
      </View>

      {/* Area onde os botões são exibidos*/}
      <View style={styles.buttons}>

        {buttons.map((button) => 
          button === '=' ? // Mapeamento do botão =
        <TouchableOpacity onPress={() => handleInput(button)} key={button} style={[styles.button, {backgroundColor: '#3dd0e3'}]}>
          <Text style={[styles.textButton, {color: "white", fontSize: 30}]}>{button}</Text>
        </TouchableOpacity>
          : // Mapeamento dos outros botões
          <TouchableOpacity onPress={() => handleInput(button)} key={button} style={styles.button}>
            <Text style={[styles.textButton, {color: typeof(button) === 'number' ? 'black': '#0093a6'}]}>{button}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

// Estilização
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  results: {
    flex: 2,
    justifyContent: "center",
    backgroundColor: "#f5f5f5"
  },
  resultText: {
    color: "#282F38",
    fontSize: 32,
    fontWeight: "bold",
    padding: 12,
    textAlign: "right"
  },
  historyText:{
    color: "#7c7c7c",
    fontSize: 20,
    marginRight: 10,
    alignSelf: 'flex-end',
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 90, 
    minHeight: 90,
    flex: 2,
  },
  textButton: {
    color: "#7c7c7c",
    fontSize: 20,
  } 
});