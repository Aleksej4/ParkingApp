import { collection, doc, setDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "./firebase";

export const uploadActiveParking = async (userId, parkingData, QRCodeData) => {
    try {
        const userActiveParkingRef = collection(FIRESTORE_DB, 'activeParkings', userId, 'parkings')

        const newParkingRef = doc(userActiveParkingRef, QRCodeData)

        await setDoc(newParkingRef, parkingData)

    } catch (error){
        console.error('Error uploading active parking: ', error);
    }
}