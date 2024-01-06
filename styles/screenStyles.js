import { StyleSheet } from "react-native";

export const screenStyles = StyleSheet.create({

    centerScreen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#EEF5FF"
    },

    bottomScreen: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: "#EEF5FF"
    },

    topScreen: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#EEF5FF'
    }

})