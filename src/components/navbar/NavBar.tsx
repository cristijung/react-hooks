import MenuItem from "../menuItem/MenuItem";

export default function NavBar() {
    return(
        <>
        <div>
            <MenuItem to='/'>Home</MenuItem>
            <MenuItem to='/gallery'>Galeria</MenuItem>
            <MenuItem to='/posts'>Posts</MenuItem>
            <MenuItem to='/counter'>Contador</MenuItem>
            <MenuItem to='/clock'>Relógio</MenuItem>
        </div>
        </>
    )
}