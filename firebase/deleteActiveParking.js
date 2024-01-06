import { deleteDoc, doc } from "firebase/firestore"
import { FIRESTORE_DB } from "./firebase"

export const deleteActiveParking = async (QRData, userId) => {
    try {
        const activeParkingRef = doc(FIRESTORE_DB, 'activeParkings', userId, 'parkings', QRData)

        await deleteDoc(activeParkingRef)
    } catch (error) {
        console.error('Error deleting active parking document: ', error);
    }
}