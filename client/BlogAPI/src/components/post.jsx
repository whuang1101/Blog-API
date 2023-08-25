import {motion} from "framer-motion"
import { useEffect, useState } from "react";
import "../css/post.css";
import { useParams } from 'react-router-dom';
import Footer from "./footer";
import LoadingScreen from "./loading-screen";
const Post = () => {
    const {id} = useParams();
    const [user, setUser] = useState("");
    const [text, setText] = useState("");
    const [data, setData] = useState()
    const fadeInVariants = {
        hidden: { opacity: .2 },
        visible: { opacity: 1 }
      };
      useEffect(() => {

        const fetchData = async () => {  
            try {
                const apiUrl = `http://localhost:3000/posts/${id}`;
                const response = await fetch(apiUrl);
                const data = await response.json();
                console.log(data)
                setData(data);
            } catch (error) {
                console.error("Error Fetching data: ", error);
            }
        };
    
        fetchData();
    }, [id]);

    const handleCommentSubmit = async(e) => {
        const newComment = {
            user: user,
            text: text,
            date: new Date(),
            post: id,
        }
        e.preventDefault();
        try
        { fetch("http://localhost:3000/comments/",
         {method:"POST",
         headers: {
             "Content-Type": "application/json"
         },
         body: JSON.stringify(newComment),
         }).then(response => response.json())
         setData(prevData => ({
            ...prevData,
            comments: [...prevData.comments, newComment]
          }))
         setUser("")
         setText("")
         }
         catch(error) {
             console.error(Error);
         }
    }
    return (
        <motion.div initial="hidden"
        animate="visible"
        variants={fadeInVariants}
        transition={{ duration: 1 }}>
        <header>
            <motion.h1 whileHover={{ scale: 1.1 }} tabIndex={-1}
            whileTap={{ scale: 0.9 }}className="title" ><a href="/" style={{color:"white", textDecoration:"none"}}>The Best Blog</a></motion.h1>
            <nav>
                <motion.h3 whileHover={{ scale: 1.1 }} tabIndex={-1}
                whileTap={{ scale: 0.9 }}
            className="home"><a href="/" style={{color:"white", textDecoration:"none"}}>Home</a></motion.h3>
            </nav>
        </header>
        <div className="main-content" >
            <div className="post-container">
                        {data ? (
                        <>
                            <h1 className="post-title" tabIndex={0}>{data.title}</h1>
                            <div className="post-text" tabIndex={0}>{data.text}</div>
                            <div className="date" tabIndex={0}>{data.date.slice(0,10)}</div>
                        </>
                    ) : (
                        <LoadingScreen/ >
                    )}

            </div>
            <div className="comments">
                    <form className="comments-form" onSubmit={(e) => {handleCommentSubmit(e)}}>
                    <h1 className="add-comment" tabIndex={0}>Add Comment</h1>
                    <div className="username-form">
                        <label htmlFor="username" className="font">Username:</label>
                        <input type="text" name="username" onChange={(e) => setUser(e.target.value)} value={user}/>
                    </div>
                    <div className="comment-area">
                        <label htmlFor="comment" className="font">Comment:</label>
                        <textarea name=" comment" rows={10} onChange={(e) => setText(e.target.value)} value={text}/>
                    </div>
                    <input type="submit" className="submit" />
                    </form>
                <div className="actual-comments">
                    
                   { data && data.comments.length === 0 ? <div className="no-comment" tabIndex={0}>No comments currently for this blog</div>: 
                   <> <div className="comment-title" tabIndex={0}>
                        Comments
                    </div>
                    {data && data.comments.map((item) => (
                        <div className="one-comment" key={item._id}>
                            <div className="comment-user" tabIndex={0}>{item.user}</div>
                            <div className="comment-text" tabIndex={0}>{item.text}</div>
                        </div>
                    ))}
                    </>
                    }
                </div>
            </div>
        </div>
        <Footer/>
        </motion.div>
    )
}

export default Post