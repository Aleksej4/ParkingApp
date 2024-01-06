import { doc, getDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "./firebase";

export const fetchParking = async (QRData) => {
    try {
        const inputString = QRData
        const regex = /UserId:(.*?)ParkingId:(.*)/;
        const matches = inputString.match(regex);

        if (matches && matches.length === 3) {
            const userId = matches[1]
            const parkingId = matches[2];
        
            const userParkingRef = doc(FIRESTORE_DB, 'users', userId, 'parkings', parkingId)

            const docSnapshot = await getDoc(userParkingRef)
            if (docSnapshot.exists()){
                const parkingData = {
                    QRCodeData: docSnapshot.data().QRCodeData,
                    IsActive: docSnapshot.data().IsActive,
                    IsBeingUsed: docSnapshot.data().IsBeingUsed,
                    Location: docSnapshot.data().Location,
                    Price: docSnapshot.data().Price
                }
                console.log(parkingData.Location)

                return parkingData
            }
        } else {
            console.log("IDs not found in the string.");
        }     
    } catch (error) {
        console.error('Error fetching parking document: ', error);
        return
    }
}