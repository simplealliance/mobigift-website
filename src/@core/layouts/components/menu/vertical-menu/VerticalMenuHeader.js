// ** React Imports
import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'

// ** Icons Imports
import { Disc, X, Circle } from 'react-feather'

// ** Config
import themeConfig from '@configs/themeConfig'
import jsonOne from '../../../../../assets/images/avunja/jsonOne.svg'

const VerticalMenuHeader = props => {
  // ** Props
  const { menuCollapsed, setMenuCollapsed, setMenuVisibility, setGroupOpen, menuHover } = props

  // ** Reset open group
  useEffect(() => {
    if (!menuHover && menuCollapsed) setGroupOpen([])
  }, [menuHover, menuCollapsed])

  // ** Menu toggler component
  const Toggler = () => {
    if (!menuCollapsed) {
      return (
        <Disc
          size={20}
          data-tour='toggle-icon'
          className='text-primary toggle-icon d-none d-xl-block'
          onClick={() => setMenuCollapsed(true)}
        />
      )
    } else {
      return (
        <Circle
          size={20}
          data-tour='toggle-icon'
          className='text-primary toggle-icon d-none d-xl-block'
          onClick={() => setMenuCollapsed(false)}
        />
      )
    }
  }

  return (
    <div className='navbar-header' style={{paddingBottom: "75px", marginTop: "-10px"}}>
      <ul className='nav navbar-nav flex-row'>
        {
          menuCollapsed ?
          <li className='nav-item me-auto'>
          <NavLink to='/' className='navbar-brand'>
            <span className='brand-logo'>
              <img src={jsonOne} alt='logo' width="42px" height="56px" />
            </span>
          </NavLink>
        </li>
          :
          <li className='nav-item me-auto'>
          <NavLink to='/' className='navbar-brand'>
            <span className='brand-logo d-flex align-items-center' style={{marginTop: "6px"}}>
              <img src={themeConfig.app.appLogoImage} alt='logo' width="48px" height="36px" />
              <h2 className="brand-text text-primary ms-1">Mobigift</h2>
            </span>
          </NavLink>
        </li>
        }
       
        <li className='nav-item nav-toggle mt-1'>
          <div className='nav-link modern-nav-toggle cursor-pointer'>
            <Toggler />
            <X onClick={() => setMenuVisibility(false)} className='toggle-icon icon-x d-block d-xl-none' size={20} />
          </div>
        </li>
      </ul>
    </div>
  )
}

export default VerticalMenuHeader
