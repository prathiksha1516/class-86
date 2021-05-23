import {createDrawerNavigator} from 'react-navigation-drawer'
import {AppTabNavigator} from './AppTabNavigaor'
import CustomSideBar from './CustomSideBar'
import SettingScreen from '../screens/SettingScreen'
import NotificationScreen from '../screens/NotificationScreen'
import MyDonationScreen from '../screens/MyDonationScreen'
export const AppDrawerNavigaor = createDrawerNavigator({
    Home:{
        screen:AppTabNavigator
    },
    MyDonations:{
        screen:MyDonationScreen
    },
    Notification:{
        screen:NotificationScreen

    },


    setting:{
        screen:SettingScreen
    }
},
    {
        contentComponent:CustomSideBar
 },
{
    initialRouteName:'Home'
})