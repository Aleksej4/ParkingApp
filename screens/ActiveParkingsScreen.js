import React from "react"
import { View, Text, ScrollView, RefreshControl } from "react-native"
import { screenStyles } from "../styles/screenStyles"
import { useContext, useEffect, useState } from "react"
import { useFocusEffect } from "@react-navigation/native"
import { ButtonComponent } from "../components/ButtonComponent"
import { fetchActiveParkings } from "../firebase/fetchActiveParkings"
import { DataContext } from "../data_context/DataContext"

export const ActiveParkingsScreen = ({navigation}) => {
    const [parkings, setParkings] = useState([])
    const [refreshing, setRefreshing] = useState(false)

    const { userId } = useContext(DataContext)

    const fetchActiveParkingsData = async () => {
        try {
            const parkingsData = await fetchActiveParkings(userId)
            setParkings(parkingsData)
        } catch (error){
            console.error("Error fetching parkings:", error);
        } finally {
            setRefreshing(false)
        }
    }

    useFocusEffect(
        React.useCallback(() => {
            onRefresh()
        }, [])
    )

    useEffect(() => {
        fetchActiveParkingsData()
    }, [userId])

    const onRefresh = () => {
        setRefreshing(true)
        fetchActiveParkingsData()
    }

    return(
        <View style={{backgroundColor: '#EEF5FF', flex: 1}}>
            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
                }>
                <View style={{alignItems: 'center'}}>
                    {parkings.map((parking) => (
                        <View key={parking.QRCodeData}>
                            <Text>{parking.QRCodeData}</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>
            <View style={screenStyles.bottomScreen}>
                <ButtonComponent text={"Add"} onPress={() => {navigation.navigate('QRCodeScannerScreen')}}/>
            </View>
        </View>
    )
}