import { StatusBar } from 'expo-status-bar';
import React,{useState, useEffect} from 'react';
import { StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import Constants from 'expo-constants'
import Botao from './Botao';

export default function App() {

  console.disableYellowBox = true;

  const [primeiroValor, setPrimeiroValor] = useState(0);
  const [segundoValor, setSegundoValor] = useState(0);
  const [sinal, setSinal] = useState("");

  const [stringCalculo, setStringCalculo] = useState(0);

  var numeros = [];
  for(var i=0; i<=9; i++){
    numeros.push(i);
  }

  function logicaCalculadora(n){

    if(sinal == ""){
      setPrimeiroValor(parseInt(primeiroValor.toString() + n.toString()));
      setStringCalculo(parseInt(primeiroValor.toString() + n.toString()));
    }
    if((n == "+" || n == "-" || n == "*" || n == "/") && segundoValor == 0){
      setStringCalculo(primeiroValor.toString() + n);
      setSinal(n);
    }
    if(sinal != ""){
      setSegundoValor(parseInt(segundoValor.toString() + n.toString()));
      setStringCalculo(primeiroValor+ sinal +parseInt(segundoValor.toString() + n.toString()));
    }

    if(n == "C"){
      setStringCalculo(0);
      setSinal("");
      setPrimeiroValor(0);
      setSegundoValor(0);
    }

    if(n == "="){
      let resultado = 0;
      if(sinal == "+"){
        resultado = primeiroValor + segundoValor
      }
      else if(sinal == "-"){
        resultado = primeiroValor - segundoValor
      }
      else if(sinal == "*"){
        resultado = primeiroValor * segundoValor
      }
      else if(sinal == "/"){
        resultado = primeiroValor / segundoValor
      }
      setStringCalculo(resultado);
      setSinal("");
      setPrimeiroValor(resultado);
      setSegundoValor(0);
    }
  }

  return (
    <View style={{flex:1, marginTop:Constants.statusBarHeight, backgroundColor:'black'}}>
      <StatusBar style='dark' />
      <View style={styles.topo}>
        <Text style={{fontSize:25, color:"white"}}>{stringCalculo}</Text>
      </View>

      <View style={{flexDirection:"row", height:"16.6%", alignItems:"center"}}>
        <TouchableOpacity onPress={()=> logicaCalculadora("+")} style={styles.btnFuncao}><Text style={{fontSize:25, color:"white"}}>+</Text></TouchableOpacity>
        <TouchableOpacity onPress={()=> logicaCalculadora("-")} style={styles.btnFuncao}><Text style={{fontSize:25, color:"white"}}>-</Text></TouchableOpacity>
        <TouchableOpacity onPress={()=> logicaCalculadora("*")} style={styles.btnFuncao}><Text style={{fontSize:25, color:"white"}}>*</Text></TouchableOpacity>
        <TouchableOpacity onPress={()=> logicaCalculadora("/")} style={styles.btnFuncao}><Text style={{fontSize:25, color:"white"}}>/</Text></TouchableOpacity>
        <TouchableOpacity onPress={()=> logicaCalculadora("=")} style={styles.btnFuncao}><Text style={{fontSize:30, color:"green"}}>=</Text></TouchableOpacity>
        <TouchableOpacity onPress={()=> logicaCalculadora("C")} style={styles.btnFuncao}><Text style={{fontSize:30, color:"yellow"}}>C</Text></TouchableOpacity>
      </View>

      <View style={{flexDirection:"row", flexWrap:"wrap", borderTopColor:"black", borderTopWidth:2, height:"66.8%"}}>
        {
          numeros.map(function(e){
            return(<Botao logicaCalculadora={logicaCalculadora} numero={e}></Botao>)
          })
        }
      </View> 

       

    </View>
  );
}

const styles = StyleSheet.create({
  topo:{
    padding:10,
    borderBottomWidth:2,
    height:"16.6%",
    justifyContent:"center",
    paddingLeft:20
  },

  btnFuncao:{
    width:"16.6%", 
    backgroundColor:"rgb(20,20,20)", 
    justifyContent:"center", 
    alignItems:"center", 
    height:"100%"}
});
