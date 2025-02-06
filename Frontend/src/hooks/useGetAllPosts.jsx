import {useEffect} from "react"
import { useDispatch, useSelector } from 'react-redux'
import { POST_API_ENDPOINT } from '../../endpoint.js'
import { setAllPosts } from '@/redux/postSlice';
import { toast } from 'sonner';
import axios from "axios";

const useGetAllPost = () => {
    let dispatch = useDispatch();

    useEffect(() => {
        const fetchAllPost = async() => {
            try{
                const res = await axios.get(`${POST_API_ENDPOINT}/all` , {withCredentials : true});
                if(res.data.success){
                    dispatch(setAllPosts(res.data.posts));
                }
            }
            catch(e){
                toast(e?.response?.data?.message);
            }
        }

        fetchAllPost();
    } , [])
}

export default useGetAllPost;
