export default function Layout({children}) {
    return (
        <div>
            <nav> navbar</nav>

            <main> { children }</main>

            <footer>Footer</footer>
        </div>
    )
}
