import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ActualHeader from "./actual-header";
import { motion } from "framer-motion";
import EditComment from "./edit-comment";
const CommentEdit = () => {
    const [data, setData] = useState();
    const [comment, setComment] = useState({});
    const [editOpen,setEditOpen] = useState(false);
    const {id} = useParams();
    const handleComment = (item) => {
        const newItem = {...item}
        setEditOpen(true);
        setComment(newItem)
    }
    const dropIn = {
        hidden: {
            y: "-100vh",
            opacity: 0,
        },
        visible: {
            y:"0",
            opacity:1,
            transition: {
                duration: .1,
                type:"spring",
                damping:25,
                stiffness: 500,
            }
        },
        exit: {
            y:"100vh",
            opacity: 0,
        }
    }
    const deleteHandle = (item) => {
        const message = {...item};
        fetch(`http://localhost:3000/comments/${id}`, {
            method: "DELETE",
            headers: {
              "Authorization": `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(message),
            token: localStorage.getItem("token")
          }).then(response => {if(response.ok){
            setData(prevData => ({
                ...prevData,
                comments: prevData.comments.filter(comment => comment._id !== item._id),
              }));
          }})
          .catch(error => {
            console.error(error);
          });
    }
    useEffect(() => {

        const fetchData = async () => {  
            try {
                const apiUrl = `http://localhost:3000/posts/${id}`;
                const response = await fetch(apiUrl);
                const data = await response.json();
                setData(data);
            } catch (error) {
                console.error("Error Fetching data: ", error);
            }
        };
    
        fetchData();
    }, [id]);
    return (
        <>
         <ActualHeader /> 
         {editOpen &&
         <EditComment dropIn={dropIn} setEditOpen={setEditOpen} setComment={setComment} comment={comment} setData={setData} data={data}/>}
         
     {  data &&  <div className="main-content">
        <div className="comments">
        <div className="actual-comments">
        { data && data.comments.length === 0 ? <div className="no-comment" tabIndex={0}>No comments currently for this blog</div>: 
        <> <div className="comment-title" tabIndex={0}>
             Comments
         </div>
         {data && data.comments.map((item) => (
             <div className="one-comment" key={item._id}>
                 <div className="comment-user" tabIndex={0}>{item.user}</div>
                 <div className="comment-text" tabIndex={0}>{item.text}</div>
                 <div className="edit-delete-comment">
                    <motion.div className="edit-comment"whileHover={{ scale: 1.1 }} tabIndex={-1}
            whileTap={{ scale: 0.9 }} onClick={() =>handleComment(item)}>Edit</motion.div>
                    <motion.div whileHover={{ scale: 1.1 }} tabIndex={-1}
            whileTap={{ scale: 0.9 }}className="delete-comment" onClick={() => {deleteHandle(item)}}>Delete</motion.div>
                 </div>

             </div>
         ))}
         </>
         }
     </div>
    </div>
    </div>}
    </>
    )
}

export default CommentEdit