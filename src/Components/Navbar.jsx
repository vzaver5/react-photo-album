import andy from '../assets/silly.jpg'

export default function navbar() {
    return (
        <>
            <nav className="navbar">
                <img src={andy} className="logo"></img>
                <p className="company">P'Amour Collections</p>
                <ul className="navbar-nav">
                    <li className="items-nav">
                        <a className="item-link-1" href="/">Gallery</a>
                    </li>
                    <li className="items-nav">
                        <a className="item-link-1" href="/#/aboutUs">About Us</a>
                    </li>
                </ul>
            </nav>
        </>
    )
}
