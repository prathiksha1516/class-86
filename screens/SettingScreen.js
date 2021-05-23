import React ,{Component}from 'react'
import {StyleSheet,View,Text,TouchableOpacity,TextInput,Alert,Modal, ScrollView,KeyboardAvoidingView, SnapshotViewIOS} from 'react-native'
import db from '../config'
import firebase from 'firebase'
import myHeader from '../component/MyHeader'

export default class SettingScreen extends Component{
    constructor(){
        super()
        this.State={
            firstName:'',
            lastName:'',
            address:'',
            contact:'',
            emailId:'',
            docId:'',
        }
    }
    getUserDetails=()=>{;
var email=firebase .auth().currentuser.email;
db.collection('users').where('email_id','==',email).get().then(Snapshot=>{
    Snapshot.forEach(doc=>{
        var data =doc.data()
        this.setState({
            firstName:data.first_name,
            lastName:data.last_name,
            address:data.address,
            contact:data.contact,
            emailId:data.email_Id,
            docId:doc.id
        })
    })
})
    }
    componentDidMount(){
this.getUserDetails()
  }


updateUserDetails=()=>{
    db.collection('users').doc(this.state.doc.id).updaate({
        "first_naame":this.state.firstName,
        "last_naame":this.state.lastName,
        "address":this.state.address,
        "contact":this.state.contact,
        
    })
    Alert.alert("profile updated sussesfuly")
}
    
    render(){
        return(
            <View style = {styles.container}>

            <myHeader title="SettingScreen" navigation={this.props.navigation}/>
            <View style={styles.formContainer}>
                <TextInput
                style={styles.formTextInput}
                placeholder={"firstName"}
                maxLength={9}
                onChangeText={(text)=>{
this.setState({
firstName:text

})
}}
value={this.state.firstName}
/>

<TextInput
                style={styles.formTextInput}
                placeholder={"lastName"}
                maxLength={9}
                onChangeText={(text)=>{
this.setState({
lastName:text

})
}}
value={this.state.lastName}
/>

<TextInput
                style={styles.formTextInput}
                placeholder={"contact"}
                keyboardType={'numeric'}
                maxLength={9}
                onChangeText={(text)=>{
this.setState({
    contact:text

})
}}
value={this.state.contact}
/>

<TextInput
                style={styles.formTextInput}
                placeholder={"address"}
                multiline={true}
                maxLength={9}
                onChangeText={(text)=>{
this.setState({
    addresst:text

})
}}
value={this.state.address}
/>
<TouchableOpacity
 style={styles.button}
 onPress={()=>{
     this.updateUserDetails()
     
 }}>
     <Text style={styles.buttonText}> Save Change</Text>
 </TouchableOpacity>

            </View>
           
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container : {
      flex:1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    formContainer:{
      flex:1,
      width:'100%',
      alignItems: 'center'
    },
    formTextInput:{
      width:"75%",
      height:35,
      alignSelf:'center',
      borderColor:'#ffab91',
      borderRadius:10,
      borderWidth:1,
      marginTop:20,
      padding:10,
    },
    button:{
      width:"75%",
      height:50,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:10,
      backgroundColor:"#ff5722",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 8,
      },
      shadowOpacity: 0.44,
      shadowRadius: 10.32,
      elevation: 16,
      marginTop:20
    },
    buttonText:{
      fontSize:25,
      fontWeight:"bold",
      color:"#fff"
    }
  })
  
  