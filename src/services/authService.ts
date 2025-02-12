import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  getAuth,
} from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebaseConfig";

const auth = getAuth();

export const logIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    const usersRef = collection(db, "users");
    const q = query(usersRef, where("user_id", "==", user.uid));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();

      if (userData.role === "Super Admin") {
        return { success: true, role: "Super Admin", user: userData };
      } else if (userData.role === "Inventory Manager") {
        return { success: true, role: "Inventory Manager", user: userData };
      } else if (userData.role === "Program Manager") {
        return { success: true, role: "Program Manager", user: userData };
      } else {
        return { success: false, message: "Invalid role" };
      }
    } else {
      return { success: false, message: "User record missing" };
    }
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
};

export const getUserRole = async (): Promise<
  "Inventory Manager" | "Program Manager" | "Super Admin" | null
> => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        reject(new Error("User is not authenticated"));
        return;
      }

      try {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("user_id", "==", user.uid));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];
          const userData = userDoc.data();

          resolve(userData.role);
        } else {
          resolve(null);
        }
      } catch (error) {
        reject(new Error(`Error fetching user role: ${error}`));
      }
    });
  });
};

export const getCurrentUser = async (): Promise<{
  name: string;
  email: string;
} | null> => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        reject(new Error("User is not authenticated"));
        return;
      }

      try {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("user_id", "==", user.uid));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];
          const userData = userDoc.data();

          resolve({
            name: userData.full_name,
            email: userData.email,
          });
        } else {
          resolve(null);
        }
      } catch (error) {
        reject(new Error(`Error fetching user data: ${error}`));
      }
    });
  });
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
};

export const observeAuthState = (callback: (user: unknown) => void) => {
  return onAuthStateChanged(auth, callback);
};
