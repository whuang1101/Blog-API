import "../css/home.css"
const Header = () => {
 return (
    <header>
        <h1 className="title">The Best Blog</h1>
        <nav>
            <h3 className="home">Home</h3>
            <h3 className="post">Post</h3>
            <h3>Login</h3>
        </nav>
    </header>
 )
}

export default Header;