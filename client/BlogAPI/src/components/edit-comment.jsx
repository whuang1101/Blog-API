/* eslint-disable react/prop-types */
import {motion} from "framer-motion"
import { useParams } from "react-router-dom";
const EditComment = ({dropIn,setEditOpen, setComment, comment, setData, data}) => {
    const {id} = useParams();
    const handleSetComment = (e) => {
        if(e.target.name === "user"){
            const newUser = {...comment};
            newUser.user = e.target.value;
            setComment(newUser);
        }
        else if (e.target.name === "text") {
            const newText = {...comment};
            newText.text = e.target.value;
            setComment(newText);
        }
    }
    const handleSubmitButton = (e) => {
        e.preventDefault()
        const message = {... comment}

        fetch(`http://localhost:3000/comments/${message._id}`, {
            method:"PUT",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify(message),
              token: localStorage.getItem("token")
            }).then(response =>{
                if(response.ok) {
                    setData(prevData => ({
                        ...prevData,
                        comments: prevData.comments.map(comment => comment._id === message._id ? message : comment)
                      }));}
            })
        setEditOpen(false);
    }
    return (
        <>
        <motion.div
        className="backdrop"
        onClick={() => setEditOpen(false)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}>
        <motion.div variants={dropIn} initial="hidden" animate="visible" exit="exit" onClick={(e) => e.stopPropagation()} className="modal"> 
        {/* will make new submit */}
        <form tabIndex={0} className="add-blog" onSubmit={(e) => handleSubmitButton(e)}>
            <h1 style={{padding: 0, margin: 0}}>Edit Post</h1>
            <label htmlFor="user">Username: </label>
            <input type="text" name="user" required={true} value={comment.user} onChange={(e) => handleSetComment(e)}/>
            <label htmlFor="text">Text</label>
            <input type="text" name="text" required={true} value={comment.text} onChange={(e) => handleSetComment(e)}/>

            <input type="submit" />
        </form>
        </motion.div>
    </motion.div>
    </>
    )
}
export default EditComment;