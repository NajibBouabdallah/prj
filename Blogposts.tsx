import { useForm } from "react-hook-form"
import * as yup from 'yup';
import "../App.css"
import { addDoc , collection } from 'firebase/firestore'
import { auth,db } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";

export interface CreateFormData {
    title:string;
    description:string;
}

export const Blogposts =(props:any)=>{

    const [user] = useAuthState(auth)
    const navigate = useNavigate();
    const schema =yup.object().shape({
        title: yup.string().required("you must put a title"),
        description: yup.string().required("you must add a description")
    })

    const {register,handleSubmit,formState:{errors}} = useForm<CreateFormData>({
        resolver: yupResolver(schema),
    })

    const postsRef = collection(db,"posts");

    const onCreatePost = async (data:CreateFormData) =>{
      await addDoc(postsRef , {
        ...data,  
        username: user?.displayName,
        userId: user?.uid,
    });
    navigate("/Blog");
    };
  
    return (
        <div style={{background:props.background1}}> 
            <form onSubmit={handleSubmit(onCreatePost)} style={{marginLeft:'30%'}}>
                <input className={'textarea title'} placeholder="Title" {...register("title")}/>
                <p>{errors.title?.message}</p>
                <textarea className="textarea" placeholder="Do you Want to say something" {...register("description")}/>
                <p>{errors.description?.message}</p>
                <input className="submit-button" type={'submit'} />
            </form>
        </div>
    )
}