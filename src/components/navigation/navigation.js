import { NavLink } from 'react-router-dom';
import '../css/link.css';
export default function Navigation() {
  return (
    <nav>
      <NavLink to="/" exact className="link" activeClassName="activeLink">
        HomePage
      </NavLink>
      <NavLink to="/movies" exact className="link" activeClassName="activeLink">
        Movies
      </NavLink>
    </nav>
  );
}
