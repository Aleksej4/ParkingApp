import { FIRESTORE_DB } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

export const fetchActiveParkings = async (userId) => {
    try{
        const activeParkingsRef = collection(FIRESTORE_DB, 'activeParkings', userId, 'parkings')

        const activeParkingsSnapshot = await getDocs(activeParkingsRef)

        const activeParkingsData = []
        activeParkingsSnapshot.forEach((doc) =>{
            const parking = {
                QRCodeData: doc.id,
                Location: doc.data().Location,
                Price: doc.data().Price,
                StartDate: doc.data().StartDate
            }
            activeParkingsData.push(parking)
        })

        return activeParkingsData
    } catch (error) {
        console.error('Error fetching active parkings:', error)

        return []
    }
}