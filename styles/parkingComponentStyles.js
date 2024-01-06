import { StyleSheet } from "react-native";

export const parkingComponentStyles = StyleSheet.create({
    container: {
        backgroundColor: "#9EB8D9",
        width: 340,
        height: 100,
        margin: 16,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },

    boxFrameContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
        height: 100,
    },

    infoFrameContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 140,
        height: 100,
    },
    
    infoBoxContainer: {
        justifyContent: 'center',
        width: 140,
        height: 50,
    }
})