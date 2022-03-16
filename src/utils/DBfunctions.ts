import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getFirestore,
} from "firebase/firestore";
import { IBluRay } from "../interfaces/IBluRay";
import { IFirestoreMovie } from "../interfaces/IFirestoreMovie";

const deleteMovie = async (movieId: string) => {
  try {
    const movieDoc = await doc(collection(getFirestore(), `movies`), movieId);
    await deleteDoc(movieDoc);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const addMovie = async () => {};

const getMovie = async (movieId: string) => {
  try {
    const querySnapshot = await doc(
      collection(getFirestore(), `movies`),
      movieId
    );
    const mydoc = await getDoc(querySnapshot);
    const item: IFirestoreMovie = {
      id: mydoc.id,
      data: mydoc.data() as IBluRay,
    };
    return item;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
export { deleteMovie, getMovie, addMovie };
