// ** Vertical Menu Components
import VerticalNavMenuLink from './VerticalNavMenuLink'
import VerticalNavMenuGroup from './VerticalNavMenuGroup'
import VerticalNavMenuSectionHeader from './VerticalNavMenuSectionHeader'

// ** Utils
import {
  canViewMenuItem,
  canViewMenuGroup,
  resolveVerticalNavMenuItemComponent as resolveNavItemComponent
} from '@layouts/utils'
import { useSelector } from 'react-redux'

const VerticalMenuNavItems = props => {
  // ** Components Object
  const Components = {
    VerticalNavMenuLink,
    VerticalNavMenuGroup,
    VerticalNavMenuSectionHeader
  }

  const { userProfileData } = useSelector((state) => state.app);

  // ** Render Nav Menu Items
  const RenderNavItems = props.items.map((item, index) => {
    const userPhoneNumber = userProfileData?.user?.phoneNumber
    const TagName = Components[resolveNavItemComponent(item)]
    
    if(!item.hidden){
      if (item.children) {
        const isChildContainHidden = (item.children).some((child) => child.hidden)
        if(!isChildContainHidden){
          return <TagName item={item} index={index} key={item.id} {...props} />
        }
        else{
        const isChildContainNotHideFor = (item.children).some((child) => child.notHideFor)
        const itemsNotHideFor = (item.children).filter((child) => child.notHideFor)
          if(isChildContainNotHideFor){
            const isValidUser = (itemsNotHideFor).some((allowedNumber) => allowedNumber === userPhoneNumber)
            if(isValidUser){
              return <TagName item={item} index={index} key={item.id} {...props} />
            }
          }
        }
      }
      return <TagName key={item.id || item.header} item={item} {...props} />
    }
    else{
      if(item.notHideFor){
        const isValidUser = (item.notHideFor).some((allowedNumber) => allowedNumber === userPhoneNumber)
          if(isValidUser){
            if (item.children) {
              return <TagName item={item} index={index} key={item.id} {...props} />
            }
            return <TagName key={item.id || item.header} item={item} {...props} />
          }
      }
    }
  })

  return RenderNavItems
}

export default VerticalMenuNavItems
