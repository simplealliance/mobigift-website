// ** Third Party Components
import { useTranslation } from 'react-i18next'
import ReactCountryFlag from 'react-country-flag'

// ** Reactstrap Imports
import { UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap'
import { ChevronDown } from 'react-feather'
import { isMobileWidth, isTabletWidth } from "../../../../utility/Utils";
import clsx from 'clsx';

const IntlDropdown = () => {
  const mobileWidth = isMobileWidth();
  const tabletWidth = isTabletWidth();
  // ** Hooks
  const { i18n } = useTranslation()

  // ** Vars
  const langObj = {
    en: 'EN',
    ke: 'KE'
  }

  // ** Function to switch Language
  const handleLangUpdate = (e, lang) => {
    e.preventDefault()
    i18n.changeLanguage(lang)
  }

  return (
    <UncontrolledDropdown href='/' tag='li' className='dropdown-language nav-item'>
      <DropdownToggle href='/' tag='a' className='nav-link d-flex align-items-center' onClick={e => e.preventDefault()}>
        <ReactCountryFlag
          svg
          className='flag-icon'
          countryCode={(i18n.language === 'en' || i18n.language === 'en-US') ? 'GB' : (i18n.language).toUpperCase()}
        />
        <span className={clsx("text-body font-semibold")}>{(i18n.language === 'en' || i18n.language === 'en-US') ? "EN" : (i18n.language).toUpperCase()} <ChevronDown /></span>
      </DropdownToggle>
      <DropdownMenu className='mt-0' end>
        <DropdownItem href='/' tag='a' onClick={e => handleLangUpdate(e, 'en')}>
          <ReactCountryFlag className='' countryCode='GB' svg />
          <span className='ms-1'>English</span>
        </DropdownItem>
        <DropdownItem href='/' tag='a' onClick={e => handleLangUpdate(e, 'ke')}>
          <ReactCountryFlag className='' countryCode='KE' svg />
          <span className='ms-1'>Swahili</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default IntlDropdown