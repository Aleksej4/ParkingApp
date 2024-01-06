import { collection, addDoc, doc, setDoc } from 'firebase/firestore';
import { FIRESTORE_DB } from './firebase';
 
 export const uploadUserParking = async (userId, parkingData) => {
    try{
        const userParkingsRef = collection(FIRESTORE_DB, 'users', userId, 'parkings')

        const newParkingRef = doc(userParkingsRef)

        parkingData.QRCodeData = "UserId:" + userId + "ParkingId:" + newParkingRef.id

        await setDoc(newParkingRef, parkingData)

        console.log('Parking data uploaded with ID: ', newParkingRef.id);
    } catch (error) {
        console.error('Error adding parking document: ', error);
        return null;
    }
 }