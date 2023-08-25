import { useEffect, useState } from "react"
import { motion} from "framer-motion";
import "../css/editor.css"

const Edit = () => {
    const [data, setData] = useState([]);
    const [check, setCheck] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [pictureUrl, setPictureUrl] = useState("");
    const [isPublished, setIsPublished] = useState(false);

    const close = () => setModalOpen(false);
    const open = () => setModalOpen(true);
    
    const fadeInVariants = {
        hidden: { opacity: .2 },
        visible: { opacity: 1 }
      };
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
    useEffect(() => {
        const getData = async() => {
            try {
                const apiUrl = "http://localhost:3000/posts";
                const response = await fetch(apiUrl);
                const data = await response.json();
                setData(data);
            } catch (error) {
                console.error("Error Fetching data: ", error);
            }
        }
        
        getData()
    },[check])
    const deletePost = async(item) => {
        try
        { fetch(`http://localhost:3000/posts/${item._id}`,
        {method:"DELETE",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        },
        token: localStorage.getItem("token"),
        }).then(response => response.json()).then(data => setData(data));
    }
        catch (error){
            console.error(error);
        }
    }
    const submitForm = async(e) => {
        e.preventDefault();
        const newPost = {
            title: title,
            text: text,
            date: new Date(),
            comments: [],
            picture_url: pictureUrl,
            is_published: isPublished
        }
        try
       { fetch("http://localhost:3000/posts/",
        {method:"POST",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newPost),
        token: localStorage.getItem("token"),
        }).then(response => response.json()).then(data => setData(data));
        
        setCheck(!check)}
        catch(error) {
            console.error(Error);
        }
    }
    const changePublishStatus = async(item) => {
        const newItem = {...item};
        newItem.is_published = !item.is_published;
        try {
            fetch(`http://localhost:3000/posts/${item._id}`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newItem),
                token: localStorage.getItem("token"),
            }
            ).then(response => response.json())
            .then(data => {
              // Handle the response data
              setData(data);
            })
            setCheck(!check)
        }
        catch (error) {
            console.error(Error)
        }    }
    return( 
        <motion.div initial="hidden"
        animate="visible"
        variants={fadeInVariants}
        transition={{ duration: 1 }}>

        {   modalOpen &&
            <motion.div
                className="backdrop"
                onClick={close}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}>
                <motion.div variants={dropIn} initial="hidden" animate="visible" exit="exit" onClick={(e) => e.stopPropagation()} className="modal"> 
                <form onSubmit={(e) => submitForm(e)} tabIndex={0} className="add-blog">
                    <h1 style={{padding: 0, margin: 0}}>Add Post</h1>
                    <label htmlFor="title">Post title:</label>
                    <input type="text" name="title" required={true} onChange={(e) => setTitle(e.target.value)}/>
                    <label htmlFor="text">Text</label>
                    <textarea type="text" name="text" required={true} onChange={(e) => setText(e.target.value)}/>
                    <label htmlFor="picture_url">URL for picture</label>
                    <input type="text" name="picture_url"  onChange={(e) => setPictureUrl(e.target.value)}/>
                    <div className="is_published">
                        <label htmlFor="form_is_published">Is published?</label>
                        <input type="checkbox" name="form_is_published" onChange={(e) => setIsPublished(e.target.checked)}/>
                    </div>
                    <input type="submit" />
                </form>
                </motion.div>
            </motion.div>
    }
        <header>
        <motion.h1 whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}className="title" ><a href="/" style={{color:"white", textDecoration:"none"}}>The Best Blog</a></motion.h1>
        <nav>
        <motion.h3 whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="home" onClick={() => open()}> + Add Blog</motion.h3>
            <motion.h3 whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="home"><a href="/" style={{color:"white", textDecoration:"none"}}>Home</a></motion.h3>
        </nav>
    </header>
    <div className="data-section">
        <div className="blog-editor">
            {data.map((item) => (
                <div className="blog-edit" key={item._id}>
                    <div className="blog-edit-title">{item.title}</div>
                    <div className="publish-delete">
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="delete" onClick={() => {deletePost(item)} }>
                            Delete?
                        </motion.div>
                        <div className="published">
                            <label htmlFor="published">Is published?</label>
                            <input type="checkbox" name="published" checked={item.is_published} onChange={() =>{changePublishStatus(item)}} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
     </div>
     </motion.div>
    )
}

export default Edit