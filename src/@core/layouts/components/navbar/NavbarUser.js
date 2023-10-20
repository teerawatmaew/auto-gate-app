// ** Dropdowns Imports
import { Fragment } from 'react'

import UserDropdown from './UserDropdown'

// ** Third Party Components
import { Sun, Moon, Menu, Briefcase } from 'react-feather'
import { CardText, NavItem, NavLink } from 'reactstrap'

import Avatar from '@components/avatar'
import POCLogo from '../../../../assets/images/logo/jaot-logo.jpg'

const NavbarUser = props => {
    // ** Props
    const { skin, setSkin, setMenuVisibility } = props

    // ** Function to toggle Theme (Light/Dark)
    const ThemeToggler = () => {
        if (skin === 'dark') {
            return <Sun className='ficon' onClick={() => setSkin('light')} />
        } else {
            return <Moon className='ficon' onClick={() => setSkin('dark')} />
        }
    }

    return (
        <Fragment>
            <ul className='navbar-nav d-xl-none d-flex align-items-center'>
                <NavItem className='mobile-menu mr-auto'>
                    {/* <NavLink className='nav-menu-main menu-toggle hidden-xs is-active' onClick={() => setMenuVisibility(true)}>
            <Menu className='ficon' />
          </NavLink> */}
                    {/* <div className='alert-body inline-block'>
                        <Avatar img={POCLogo} /><span style={{ textDecoration: 'underline' }} className='ml-1 font-weight-bolder text-primary'>ระบบตรวจสอบตราประทับ</span>
                    </div> */}
                </NavItem>
            </ul>
            {/* <div className='bookmark-wrapper d-flex align-items-center'>
                <NavItem className='d-none d-lg-block'>
                    <NavLink className='nav-link-style'>
                        <ThemeToggler />
                    </NavLink>
                </NavItem>
            </div> */}
            <div className='alert-body inline-block'>
                <Avatar img={POCLogo} /><span style={{ textDecoration: 'underline' }} className='ml-1 font-weight-bolder text-primary'>ระบบตรวจสอบตราประทับอนุญาตให้พำนักในราชอาณาจักร</span>
            </div>
            <ul className='nav navbar-nav align-items-center ml-auto'>
                <UserDropdown />
            </ul>
        </Fragment>
    )
}
export default NavbarUser
