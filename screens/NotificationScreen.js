import React ,{Component}from 'react'
import {StyleSheet,FlatList,View,Text,TouchableOpacity,TextInput,Alert,Modal, ScrollView,KeyboardAvoidingView} from 'react-native'
import db from '../config'
import firebase from 'firebase'
import MyHeader from '../component/MyHeader'
import {ListItem,Icon} from 'react-native-element'

export default class NotificationScreen extends Component{
    constructor(props){
super(props)
this.state={
    userId:firebase.auth().currentUser.email,
    allNotification:[]
}
this.NotificationRef=null
    }
    getNotifications=()=>{
        this.requestRef = db.collection("all_notifications")
        .where("notification_status", "==", "unread")
        .where("targeted_user_id",'==',this.state.userId)
        .onSnapshot((snapshot)=>{
          var allNotifications =  []
          snapshot.docs.map((doc) =>{
            var notification = doc.data()
            notification["doc_id"] = doc.id
            allNotifications.push(notification)
          });
          this.setState({
              allNotifications : allNotifications
          });
        })
      }
      componentDidMount(){
          this.getNotifications()
      }
    keyExtractor=(item,index)=>index.toString()
    renderItem=({item,index})=>{
        return(
            <ListItem 
            key={index}
            leftElement={<Icon name="book" type="font-awesome" color="purple" />} 
            title={item.book_name}      
            titleStyle={{color:"black",fontWeigt:bold}}
            bottomDivider
            />
        )}
        render(){
            return(
                <View style={{flex:1}}>
         <MyHeader navigation={this.props.navigation}  title="allNotification"/>
         <View style={{flex:1}}>
        
         {
                     this.state.allNotification.length === 0
                     ?(
                       <View style={styles.subtitle}>
                         <Text style={{ fontSize: 20}}>you no Notification</Text>
                       </View>
                     )
                     :(
                       <FlatList
                         keyExtractor={this.keyExtractor}
                         data={this.state.allNotification}
                         renderItem={this.renderItem}
                       />
                     )
                   }
             
         </View>
        
                </View>
            )
        }
}

