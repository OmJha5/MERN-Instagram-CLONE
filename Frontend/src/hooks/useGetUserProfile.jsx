import {useEffect} from "react"
import { useDispatch, useSelector } from 'react-redux'
import { USER_API_ENDPOINT } from '../../endpoint.js'
import { toast } from 'sonner';
import axios from "axios";
import { setUserProfile } from "@/redux/authSlice.js";

const useGetUserProfile = (userId) => {
    let dispatch = useDispatch();

    useEffect(() => {
        const getUserProfile = async() => {
            try{
                const res = await axios.get(`${USER_API_ENDPOINT}/${userId}/profile` , {withCredentials : true});
                if(res.data.success){
                    dispatch(setUserProfile(res.data.user));
                }
            }
            catch(e){
                toast(e?.response?.data?.message);
            }
        }

        getUserProfile();
    } , [userId])
}

export default useGetUserProfile;
