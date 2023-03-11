import "../App.css"
import { getDocs,collection, doc } from 'firebase/firestore'
import { db } from "../config/firebase"
import { useContext, useEffect, useState } from "react";
import { Post } from "./Post";
import { Appcontext } from "../App";

export interface Post{
    id:string;
    userId:string;
    title:string;
    username:string;
    description:string;
}
interface Props{
    background1:string;
}

export const Blog = (props:Props) =>{

    const background1 = useContext(Appcontext)
    const [postsList,setPsotsList] = useState<Post[] | null>(null);
    const postsRef= collection(db,"posts");
    const getPost = async() =>{
        const data = await getDocs(postsRef);
        setPsotsList(data.docs.map((doc)=>({...doc.data(),id: doc.id}))as Post[]);
        
    }
    useEffect(()=>{
        getPost();
    },[])
    return (
        <div style={{background:props.background1 }}>
            {
                postsList?.map((post)=>( <Post post={post} />))
            } 
        </div>
    );
}