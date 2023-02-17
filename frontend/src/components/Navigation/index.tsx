import styles from './index.module.css';
import { CgProfile } from "react-icons/cg";
import { IconType } from 'react-icons';
import { NavLink } from 'react-router-dom';
const Navigation = () => {
  const mapLinks = ({Icon, to}: ILink) =>{
   return <li key={Math.random()}>
    <NavLink to={to} 
    className={({isActive}) => isActive ? styles.navIconsActive : styles.navIconsNotActive}
    >
      <Icon size={30}/>
    </NavLink>
   </li>   
  }
  const links:ILink[] = [
    {Icon: CgProfile, to: '/'},
    {Icon: CgProfile, to: '/users'},
    {Icon: CgProfile, to: '/groups'},
    {Icon: CgProfile, to: '/settings'},
    {Icon: CgProfile, to: '/user'},
  ];
  return<nav className={styles.navigation}>
    <ul className={styles.navIcons}>
      {links.map(mapLinks)}
    </ul>
  </nav>
}

export default Navigation;

interface ILink{
  Icon: IconType;
  to: string;
};