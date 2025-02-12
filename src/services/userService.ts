import { db } from "./firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import bcrypt from "bcryptjs";
import { User } from "@/types/model";

const auth = getAuth();

//Create user with authentication
export const createUserWithAuth = async (
  email: string,
  password: string,
  fullName: string,
  role: "Inventory Manager" | "Program Manager"
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    const hashedPassword = await bcrypt.hash(password, 10);

    const usersRef = collection(db, "users");
    const docRef = await addDoc(usersRef, {
      user_id: user.uid, // Store UID inside document
      full_name: fullName,
      email: email,
      role: role,
      password_hash: hashedPassword,
      created_at: new Date().toISOString(),
    });

    return { success: true, documentId: docRef.id };
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
};

//Get all users
export const getUsers = async (): Promise<User[]> => {
  const usersRef = collection(db, "users");
  const querySnapshot = await getDocs(usersRef);

  return querySnapshot.docs.map((doc) => {
    const data = doc.data();

    return {
      id: doc.id,
      full_name: data.full_name || "",
      email: data.email || "",
      role: data.role || "",
      created_at: data.created_at || "",
    };
  });
};

//Update user
export const updateUser = async (
  userId: string,
  updatedData: { fullName: string; email: string; role: string }
) => {
  try {
    const userRef = doc(db, "users", userId);

    await updateDoc(userRef, {
      full_name: updatedData.fullName,
      email: updatedData.email,
      role: updatedData.role,
    });

    return { success: true, message: "User updated successfully!" };
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message || "Failed to update user.",
    };
  }
};
export const deleteUser = async (id: string) => {
  await deleteDoc(doc(db, "users", id));
};
