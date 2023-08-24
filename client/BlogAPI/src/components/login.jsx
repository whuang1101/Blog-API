import {motion} from "framer-motion"
import "../css/login.css"
import { useState } from "react";
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const formData = {
        username: username,
        password: password
    };
    const fadeInVariants = {
        hidden: { opacity: .2 },
        visible: { opacity: 1 }
      };
    const handleSubmit = async (e) => {
        e.preventDefault();    

        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json()
            console.log(data);
            if (response.ok) {
                if (data.token) {
                    console.log("Token:", data.token); // Log the token
                }
            } 
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    }
    return(   
        <motion.div initial="hidden"
        animate="visible"
        variants={fadeInVariants}
        transition={{ duration: 1 }}>
        <header>
        <motion.h1 whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}className="title" ><a href="/" style={{color:"white", textDecoration:"none"}}>The Best Blog</a></motion.h1>
        <nav>
            <motion.h3 whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="home"><a href="/" style={{color:"white", textDecoration:"none"}}>Home</a></motion.h3>
        </nav>
    </header>
    <div className="home-section">
        <div className="login-form" >
         <form onSubmit={handleSubmit}>
                <div className="username-container">
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div className="password-container">
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className="submit-container">
                    <input type="submit" className="submit" />
                </div>
            </form>
        </div>

    </div>
    </motion.div>
    
    )
    
}
export default Login