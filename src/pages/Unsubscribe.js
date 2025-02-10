import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "../utilities/axiosConfig"

const Unsubscribe = () => {
    const { email } = useParams()
    const profile = useSelector(store => store.AuthReducer.profile);

    useMemo(async () => {
        if (profile) {
            if (profile.email === email) {
                await axios.post("/user/unsubscribe", {
                    email
                })
            }
        }
        // nav("/")
    }, [profile, email])

    return (
        <div />
    )
}

export default Unsubscribe;