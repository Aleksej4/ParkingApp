import { updateDoc, doc } from "firebase/firestore";
import { FIRESTORE_DB } from "./firebase";

export const updateParkingState = async (QRData, IsBeingUsed) => {
    try {
        const inputString = QRData
        const regex = /UserId:(.*?)ParkingId:(.*)/;
        const matches = inputString.match(regex);

        if (matches && matches.length === 3) {
            const userId = matches[1]
            const parkingId = matches[2];
        
            const userParkingRef = doc(FIRESTORE_DB, 'users', userId, 'parkings', parkingId)

            const updateField = {
                IsBeingUsed: !IsBeingUsed
            }

            await updateDoc(userParkingRef, updateField)
            return true
        } else {
            console.log("IDs not found in the string.");
        }     
    } catch (error) {
        console.error('Error fetching parking document: ', error);
        return false
    }
}