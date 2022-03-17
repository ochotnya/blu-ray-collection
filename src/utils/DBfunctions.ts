import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import init from "../firebase";
import { IBluRay } from "../interfaces/IBluRay";
import { IFirestoreMovie } from "../interfaces/IFirestoreMovie";

init(); //initialize firebase app
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

const addMovie = async (movie: IBluRay | undefined) => {
  if (movie !== undefined) {
    try {
      await writeToFirebase(movie);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
};

const writeToFirebase = async (diskInfo: IBluRay) => {
  const collectionRef = collection(getFirestore(), "movies");
  await addDoc(collectionRef, diskInfo);
};

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

const updateMovie = async (movieId: string, newDiskType: string) => {
  try {
    const movieDoc = await doc(collection(getFirestore(), `movies`), movieId);
    await updateDoc(movieDoc, { type: newDiskType });
  } catch (error) {
    console.log(error);
  }
};
const getMovieQuery = async () => {
  const collectionRef = collection(getFirestore(), "movies");
  const q = query(collectionRef, orderBy("type"), limit(5));
  const mydocs = await getDocs(q);
  mydocs.docs.forEach((d) => console.log(d.data()));
};
export { deleteMovie, getMovie, addMovie, getMovieQuery, updateMovie };
