import "../css/components/Footer.css"

export default function Footer() {
    return (
        <div className="footer">
            <div>
                <p><a>Gamify</a></p>
                <p><a>555 555 555 MVA</a></p>
                <p><a href="tel+ 475 555 555 55">55 55 55 55</a></p>
            </div>
            <div>
                <p><a href="/login">Logg inn</a></p>
                <p><a href="/register">Register</a></p>
                <p><a href="#">About Us</a></p>
            </div>
            <div>
                <p><a href="#">Contact Us</a></p>
                <p><a href="#">See our new games</a></p>
                <p><a href="#">Join our newsletter</a></p>
            </div>
        </div>
    )
}