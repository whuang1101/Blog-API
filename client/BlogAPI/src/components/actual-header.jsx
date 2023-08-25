import { motion } from "framer-motion"

const ActualHeader = () => {
    return (
        <header>
            <motion.h1 whileHover={{ scale: 1.1 }} tabIndex={-1}
            whileTap={{ scale: 0.9 }}className="title" ><a href="/" style={{color:"white", textDecoration:"none"}}>The Best Blog</a></motion.h1>
            <nav>
                <motion.h3 whileHover={{ scale: 1.1 }} tabIndex={-1}
                whileTap={{ scale: 0.9 }}
            className="home"><a href="/" style={{color:"white", textDecoration:"none"}}>Home</a></motion.h3>
            </nav>
        </header>
    )
}

export default ActualHeader