import "../css/home.css";
import {motion} from "framer-motion"
const Header = () => {
    const handleHomeClick = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      };
      const handleScrollDown = () => {
        window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
      };
      const handleEnterKey = (event) => {
        if (event.key === "Enter") {
            handleHomeClick();
        }
    };
    const handleScrollDownEnter = (event) => {
        if (event.key === "Enter") {
            handleScrollDown();
        }
    };
    
 return (
    <header>
        <motion.h1 whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}className="title" >The Best Blog</motion.h1>
        <nav>
            <motion.h3 whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="home" onClick={handleHomeClick} onKeyDown={handleEnterKey}>Home</motion.h3>
            <motion.h3 whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="post" onClick={handleScrollDown} onKeyDown={handleScrollDownEnter}>Post</motion.h3>
            <motion.h3 whileHover={{ scale: 1.1 }} tabIndex={-1}
            whileTap={{ scale: 0.9 }}><a href= "/login" style={{color:"white", textDecoration: "none"}}>Login</a></motion.h3>
        </nav>
    </header>
 )
}

export default Header;