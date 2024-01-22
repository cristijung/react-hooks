
import { Link } from 'react-router-dom';


interface ItemMenuProps {
    children: React.ReactNode;
    to: string;
}

export default function MenuItem({ children, to}: ItemMenuProps) {
    return(
        <>
       <Link to={to}>{ children }</Link>
        </>
    )
}