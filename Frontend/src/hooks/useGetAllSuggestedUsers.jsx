import {useEffect} from "react"
import { useDispatch, useSelector } from 'react-redux'
import { USER_API_ENDPOINT } from '../../endpoint.js'
import { setAllPosts } from '@/redux/postSlice';
import { toast } from 'sonner';
import axios from "axios";
import { setAllSuggestedUsers } from "@/redux/authSlice.js";

const useGetAllSuggestedUsers = () => {
    let dispatch = useDispatch();

    useEffect(() => {
        const getAllSuggestedUsers = async() => {
            try{
                const res = await axios.get(`${USER_API_ENDPOINT}/suggested` , {withCredentials : true});
                if(res.data.success){
                    dispatch(setAllSuggestedUsers(res.data.users));
                }
            }
            catch(e){
                toast(e?.response?.data?.message);
            }
        }

        getAllSuggestedUsers();
    } , [])
}

export default useGetAllSuggestedUsers;
