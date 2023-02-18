import Footer from "./Footer";

const Layout = ({ children } : any) => {
    return(
        <div>
            {children}
            <Footer />
        </div>
    )
}

export default Layout;