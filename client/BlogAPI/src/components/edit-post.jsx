/* eslint-disable react/prop-types */
import { motion } from "framer-motion"


const PostEdit = ({editPost, setEditPost, dropIn, setEditOpen, setData}) => {
    const handleSubmitButton = async(e) => {
        const updatedPost = {...editPost};
        console.log(updatedPost)
        e.preventDefault();
        
        try
        { fetch(`http://localhost:3000/posts/${editPost._id}`,
        {method:"PUT",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedPost),
        token: localStorage.getItem("token")
        }).then(response => response.json()).then(data => setData(data));
        console.log("switched");
        setEditOpen(false);
    }
        catch (error){
            console.error(error);
        }
    }
    const handleEditPost = (e) => {
        if(e.target.name === "title") {
            const newTitle =e.target.value;
            const newPost = {...editPost};
            newPost.title = newTitle;
            setEditPost(newPost)
        }
        else if (e.target.name === "text"){
            const newText =e.target.value;
            const newPost = {...editPost};
            newPost.text = newText;
            setEditPost(newPost)
        }
        else if (e.target.name === "picture_url"){
            const picture_url =e.target.value;
            const newPost = {...editPost};
            newPost.picture_url = picture_url;
            setEditPost(newPost)
        }
        else if (e.target.name === "form_is_published") {
            const newPost = {...editPost};
            newPost.is_published = !newPost.is_published;  
            setEditPost(newPost)
        }
        }
    return(
    <>
    <div className="hi"></div>
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
                    <label htmlFor="title">Post title:</label>
                    <input type="text" name="title" required={true} value={editPost.title} onChange={(e) =>handleEditPost(e)} />
                    <label htmlFor="text">Text</label>
                    <textarea type="text" name="text" required={true} value={editPost.text}  onChange={(e) =>handleEditPost(e)} rows={10} cols={20}/>
                    <label htmlFor="picture_url">URL for picture</label>
                    <input type="text" name="picture_url" value={editPost.picture_url}  onChange={(e) =>handleEditPost(e)}/>
                    <div className="is_published">
                        <label htmlFor="form_is_published">Is published?</label>
                        <input type="checkbox" name="form_is_published" checked={editPost.is_published}  onChange={(e) =>handleEditPost(e)}/>
                    </div>
                    <input type="submit" />
                </form>
                </motion.div>
            </motion.div>
            </>
    )
}
export default PostEdit;