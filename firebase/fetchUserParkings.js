import { FIRESTORE_DB } from "./firebase"
import { collection, getDocs} from "firebase/firestore";

export const fetchUserParkings = async (userId) => {
    try{
        const userParkingsRef = collection(FIRESTORE_DB, 'users', userId, 'parkings')

        const parkingsSnapshot = await getDocs(userParkingsRef);

        const parkingsData = [];
        parkingsSnapshot.forEach((doc) => {
            const parking = {
                id: doc.id,
                IsActive: doc.data().IsActive,
                IsBeingUsed: doc.data().IsBeingUsed,
                Location: doc.data().Location,
                Price: doc.data().Price,
                QRData: doc.data().QRCodeData
            }
            parkingsData.push(parking);
        });

        return parkingsData
    } catch (error) {
        console.error('Error fetching parkings:', error)

        return []
    }
}