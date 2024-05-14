import { useState } from "react";
import useShowToast from "./useShowToast";
import { auth, firestore } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";
import useAuthStore from "../store/authStore";

const useLogin = () => {
	const showToast = useShowToast();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const loginUser = useAuthStore((state) => state.login);


	const login = async (inputs) => {
		setLoading(true);
		setError(null);

		if (!inputs.email || !inputs.password) {
			showToast("Error", "Please fill all the fields", "error");
			setLoading(false);
			return;
		}

		try {
			const userCred = await signInWithEmailAndPassword(auth, inputs.email, inputs.password);

			if (userCred) {
				const docRef = doc(firestore, "users", userCred.user.uid);
				const docSnap = await getDoc(docRef);
				localStorage.setItem("user-info", JSON.stringify(docSnap.data()));
				loginUser(docSnap.data());
			}
		} catch (error) {
			setError(error.message);
			showToast("Error", error.message, "error");
		} finally {
			setLoading(false);
		}
	};

	return { loading, error, login };
};

export default useLogin;
