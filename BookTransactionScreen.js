import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, TextInput, Image} from 'react-native';
import * as permissions from 'expo-permissions'
import {BarCodeScanner} from 'expo-barcode-scanner'

export default class TransactionScreen extends React.Component {
  constructor(){
    super()
    this.state = ({
      hasCameraPermissions: null,
      scanned: false,
      scannedData: '',
      buttonState: 'normal'
    })
  }
  getCameraPermission = async() => {
    const {status} = await Permissions.askAsync (Permissions.CAMERA);
    this.setState ({
      hasCameraPermissions: status === 'granted',
      buttonState: 'clicked'
    })
  }

  handleBarcodeScanned = async({type,data}) => {
    this.setState = ({
    scannedData: data,
    scanned: true,
    buttonState: 'normal'    
  });
}
    render() {
      const hasCameraPermissions = this.state.hasCameraPermissions;
      const scanned = this.state.scanned;
      const buttonState = this.state.buttonState;
      if (buttonState === 'clicked' && hasCameraPermissions) {
      return (
        <BarCodeScanner onBarCodeScanned = {scanned? undefined:this.handleBarcodeScanned}
        style = {StyleSheet.absoluteFillObject}/> 
      );
      }

    else if (buttonState === "normal") {
      return(
        <View style = {styles.container}>
          <View>
            <Image source = {require('../assets/booklogo.jpg')} 
            style = {{width:200,height:200}}/>
            <Text style = {{textAlign: 'center', fontSize: 30}}>
              WiLy
            </Text>
          </View>
          <View style = {styles.inputView}>
            <TextInput style = {styles.imputBox}
              placeholder = 'StudentID'
              value = {this.state.scannedStudentID}>
            </TextInput>
            <TouchableOpacity style = {styles.scanButton}
            onPress = {() => this.getCameraPermission("StudentID")}>
              <Text style = {styles.buttonText}>
              </Text>
            </TouchableOpacity>
          </View>
          </View>
      )
    }
  }
}
  const styles = StyleSheet.create({
    container:{
      flex:1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    displayText:{
      fontSize: 15,
      textDecorationLine: 'underline'
    },
    scanButton:{
      backgroundColor: 'white',
      padding: 10,
      margin: 10
    },
    buttonText:{
      fontSize: 15,
      textAlign: 'center',
      marginTop: 10,
    },
    inputBox: {
      width: 200,
      height: 40,
      borderWidth: 1.5,
      borderRightWidth: 0,
      fontSize: 20
    },
    inputView: {
      flexDirection: 'row',
      margin: 20,
    },
    scanButton:{
      backgroundColor: 'lightblue',
      width: 50,
      borderWidth: 1.5,
    }
  });