import React ,{Component}from 'react'
import {StyleSheet,View,Text,TouchableOpacity,TextInput,Alert,Modal, ScrollView,KeyboardAvoidingView} from 'react-native'
import db from '../config'
import firebase from 'firebase'


export default class WelcomeScreen extends Component{

    constructor(){
       super();
       this.state = {
          emailId : '',
          password : '',
          confirmPassword : '',
          firstName : '',
          lastName : '',
          contact : '',
          isModalVisible : 'false'

       }
  }

  userLogin = (emailId, password)=>{
    firebase.auth().signInWithEmailAndPassword(emailId, password)
    .then(()=>{
      return Alert.alert("Successfully Login")
    })
    .catch((error)=> {
      var errorCode = error.code;
      var errorMessage = error.message;
      return Alert.alert(errorMessage)
    })
  }

  userSignUp = (emailId, password, confirmPassword) => {
    if (password !== confirmPassword) {
      return Alert.alert("password doesn't match\nCheck your password.");
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(emailId, password)
        .then(() => {
          db.collection("users").add({
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            contact: this.state.contact,
            email_id: this.state.emailId,
            address: this.state.address,
            IsBookRequestActive: false
          });
          return Alert.alert("User Added Successfully", "", [
            {
              text: "OK",
              onPress: () => this.setState({ isModalVisible: false })
            }
          ]);
        })
        .catch(error => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          return Alert.alert(errorMessage);
        });
    }
  };


showModal=()=>{
  return(
    <Modal 
    animationType="fade"
    transparent={true}
    visible={this.state.isModalVisible}>

      <View  style={styles.modalcontainer}>
        <ScrollView style={{width:'100 %'}}>
          <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
  <Text 
  style={styles.ModalTitle}>Registration</Text>

  <TextInput style={styles.formTextInput}
  placeholder={"firstName"}
  maxLength={10}
  onChangeText={(Text)=>{
    this.setState({
      firstName: text
    })
  }}/>

<TextInput style={styles.formTextInput}
  placeholder={"LastName"}
  maxLength={10}
  onChangeText={(text)=>{
    this.setState({
      lasttName: text
    })
  }}/>

<TextInput style={styles.formTextInput}
  placeholder={"contact"}
  maxLength={10}
  keyboardType={'numeric'}
  onChangeText={(text)=>{
    this.setState({
      firstName: text
    })
  }}/>

<TextInput style={styles.formTextInput}
  placeholder={"email"}
  maxLength={10}
  keyboardType = {'email-address'}
  onChangeText={(text)=>{
    this.setState({
      email: text
    })
  }}/>

<TextInput style={styles.formTextInput}
  placeholder={"password"}
  maxLength={10}
  secureTextEntry = {true}
  onChangeText={(text)=>{
    this.setState({
      password: text
    })
  }}/>

<TextInput style={styles.formTextInput}
  placeholder={"address"}
  maxLength={10}
  onChangeText={(text)=>{
    this.setState({
      address: text
    })
  }}/>

<TextInput style={styles.formTextInput}
  placeholder={"confirm password"}
  maxLength={10}
  secureTextEntry = {true}
  onChangeText={(Text)=>{
    this.setState({
     confirmPassword: text
    })
  }}/>

<View style={styles.modalBackButton}>
          <TouchableOpacity
            style={styles.registerButton}
            onPress={()=>
              this.userSignUp(this.state.emailId, this.state.password, this.state.confirmPassword)
            }
          >
          <Text style={styles.registerButtonText}>Register</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.modalBackButton}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={()=>this.setState({"isModalVisible":false})}
          >
          <Text style={{color:'#ff5722'}}>Cancel</Text>
          </TouchableOpacity>
        </View>



          </KeyboardAvoidingView>
        </ScrollView>
      </View>


    </Modal>
  )

  
}


render(){
    return(
        <View style = {styles.container}> 
        
        {
            this.showModal()
          }



     <View style = {style.profileContainer}>
    <Text style={style.title}> BOOK SANTA</Text>
    </View>  

<View style = {styles.buttonContainer}>
    
<TextInput
   style = {styles.loginBox}
   placholder = " example@gmail.com"
   placeholderTextColor = "black"
   keyboardType = 'email-address'
   onChangeText={(text)=>{
     this.setState ({
           emailId : text
       })
   }}
 
/>

<TextInput
   style = {styles.loginBox}
   placholder = " password"
   placeholderTextColor = "black"
  secureTextEntry = {true}
   onChangeText={(text)=>{
     this.setState ({
           emailId : text
       })
   }}
 
/>

      <TouchableOpacity
       style = {[styles.button , {marginBottom:20,marginTop:20}]}
       onPress = {()=>{this.userLogin(this.state.emailId, this.state.password)}}
       >
           <Text style = {styles.buttonText}>  Login </Text> 
     </TouchableOpacity>

     <TouchableOpacity
       style = {[styles.button , {marginBottom:20,marginTop:20}]}
       onPress = {()=>{this.userSignUp(this.state.emailId, this.state.password)}}
       >
           <Text style = {styles.buttonText}>  SignUp </Text> 
     </TouchableOpacity>



     </View>
        </View>
    )
}



}
const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:'49EDFB'
    },
    profileContainer:{
      flex:1,
      justifyContent:'center',
      alignItems:'center',
    },
    title :{
      fontSize:65,
      fontWeight:'300',
      paddingBottom:30,
      color : '#ff3d00'
    },
    loginBox:{
      width: 300,
      height: 40,
      borderBottomWidth: 1.5,
      borderColor : '#ff8a65',
      fontSize: 20,
      margin:10,
      paddingLeft:10
    },
    button:{
      width:300,
      height:50,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:25,
      backgroundColor:"#ff9800",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 8,
      },
      shadowOpacity: 0.30,
      shadowRadius: 10.32,
      elevation: 16,
    },
    buttonText:{
      color:'#ffff',
      fontWeight:'200',
      fontSize:20
    },
    buttonContainer:{
      flex:1,
      alignItems:'center'
    }
  })
  
