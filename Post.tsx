import { useAuthState } from "react-firebase-hooks/auth";
import "../App.css"
import { auth ,db } from "../config/firebase";
import { getDocs, addDoc ,collection , query, where, doc,deleteDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { array, string } from "prop-types";
import { get } from "react-hook-form";
import { Post as IPost } from"./blog"


interface Props{
    post : IPost;
}
interface Like{
    likeId:string;
    userId:string;
    
}

export const Post = (props:Props) => {

    const { post } = props;

    const[user] = useAuthState(auth);

    const likeRef = collection(db,"LIKES");

    const likedocs = query (likeRef,where("postId" , "==" , post.id))
    
    const [likes,setLikes] = useState<Like[]|null>(null);

    const getLikes = async () =>{
        const data = await getDocs(likedocs);
        setLikes(data.docs.map((doc) =>({ userId: doc.data().userId,likeId: doc.id})))
            
    }

    const Addlike = async () =>{
        try{

            const newDoc =  await addDoc(likeRef,{userId:user?.uid,postId:post.id})
            if(user){
                setLikes((prev)=> prev ? [...prev,{userId:user.uid,likeId:newDoc.id}]:[{userId:user.uid,likeId:newDoc.id}]);

            };
        }catch(err){
            console.log(err);
        }
}
    const removeLike = async () =>{
        try{

            const likeToDeleteQuery = query(likeRef,where("postId","==",post.id),where("userId","==",user?.uid))
            const likeToDeleteData = await getDocs(likeToDeleteQuery)
            const likeId = likeToDeleteData.docs[0].id;
            const likeToDelete = doc(db,"LIKES",likeId)

            await deleteDoc(likeToDelete );
             if(user){
                setLikes((prev)=> prev && prev.filter((like)=>like.likeId !== likeId ))
        }
    }
        catch(err) {
            console.log(err)
        }
    };

    useEffect(()=>{
        getLikes();
    },[])
    
    const hasUserLiked = likes?.find((like) =>like.userId === user?.uid ) 

    return (
        
    <div className="tasks-filed" style={{display:'flex'}}>
        <div className="every-post">
            <p className="user-name">User Name : {post.username}</p><br/>
            <h5 className="post-title">Title : {post.title}</h5><br/>
            <p className="post-description"> Description : {post.description}</p><br/>
            <button className="thumbs-up" onClick={hasUserLiked? removeLike:Addlike }>
                {hasUserLiked?
                   <i className="fa-solid fa-thumbs-up"></i>
                   : <i className="fa-regular fa-thumbs-up"></i>
                }
            </button>
            {(likes?.length != null) && <p>likes:{likes.length}</p> }
        </div>
    </div>
    );
            
    };