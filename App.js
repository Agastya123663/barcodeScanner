import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View ,Image} from 'react-native';
import * as Permissions from "expo-permissions"
import {BarCodeScanner} from "expo-barcode-scanner"

export default class App extends React.Component{
  constructor(){
    super();
    this.state={
      cameraPermission : null,
      scanned:false,
      scannedData : "",
      buttonState : "normal"
    }

  }
    getCameraPermissions=async()=>{
      const {status} = await Permissions.askAsync(Permissions.CAMERA)
      this.setState({
        cameraPermission:status === "granted",
        scanned:false,
        buttonState:"clicked"
      })
    }
  

  barcodeScanned=async({type,data})=>{
    this.setState({
      scannedData:data,
      scanned:true,
      buttonState:"normal"
    })
  }
  render(){
    const cameraPermissions = this.state.cameraPermission
    const scanned = this.state.scanned
    const buttonState = this.state.buttonState
    if(buttonState ==="clicked" && cameraPermissions){
      return(
        <BarCodeScanner onBarcodeScanned={scanned?undefined:this.barcodeScanned}/>
      )
    }
    else if(buttonState === "normal"){
      return(
        <View style={{backgroundColor:"#d9feff"}}>
          <View>
            <Text style={{fontSize:34,textAlign:"center",width:1000,height:50,backgroundColor:"#3ec1e6",marginLeft:300,fontStyle:"bell MT"}}>Barcode scanner</Text>
          </View>

          <View>
            <Text style={{fontSize:30,textAlign:"center",marginTop:100}}>{cameraPermissions===true?this.state.scannedData:"Scan your code and get instant results !!!"}</Text>
          </View>
          
          <View>
            <Image source={require("./assets/img.png")} style={{width:200,height:200,marginLeft:650,marginTop:50}} />
          </View>

          <View>
            <TouchableOpacity onPress={this.getCameraPermissions} style={{width:200,height:50,backgroundColor:"yellow",borderRadius:100,marginLeft:650,marginTop:50}}>
              <Text style={{textAlign:"center",fontSize:25}}>Scan</Text>
            </TouchableOpacity>
          </View>
         
        </View>
      )
    }
    
  }
}
