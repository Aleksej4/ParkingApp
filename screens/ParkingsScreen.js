import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, RefreshControl } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useContext } from "react";
import { DataContext } from "../data_context/DataContext";
import { fetchUserParkings } from "../firebase/fetchUserParkings";
import { ParkingComponent } from "../components/ParkingComponent";
import { screenStyles } from "../styles/screenStyles";
import { ButtonComponent } from "../components/ButtonComponent";

export const ParkingsScreen = ({navigation}) => {
    const { userId } = useContext(DataContext)
    const [refreshing, setRefreshing] = useState(false)
    const [parkings, setParkings] = useState([]);
    const [refreshKey, setRefreshKey] = useState(false); 

    const fetchParkings = async () => {
        try{
            if(userId){
                const parkingsData = await fetchUserParkings(userId);
                setParkings(parkingsData)
            } else {
                console.log("User ID not found");
            }
        } catch (error) {
            console.error("Error fetching parkings:", error);
        } finally {
            setRefreshing(false)
            setRefreshKey(false)
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            onRefresh()
        }, [])
    )

    useEffect(() => {
        fetchParkings();
    }, [userId])

    const onRefresh = () => {
        setRefreshing(true)
        fetchParkings()
        setRefreshKey(true)
    }

    return(
        <View style={{backgroundColor: '#EEF5FF', flex: 1}}>
            <ScrollView 
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
            }>
                <View style={{alignItems: 'center'}}>
                    {parkings.map((parking) => (
                        <View key={parking.id}>
                            <ParkingComponent refreshKey = {refreshKey} parking={parking} onPress={() => {navigation.navigate('ParkingScreen', {parking: parking})}}/>
                        </View>
                    ))}
                </View>
            </ScrollView>
            <View style={screenStyles.bottomScreen}>
                <ButtonComponent text={"Create"} onPress={() => navigation.navigate('CreateParkingScreen')}/>
            </View>
        </View>
    )
}