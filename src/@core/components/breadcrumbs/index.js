// ** React Imports
import { Link } from "react-router-dom";

// ** Third Party Components
import Proptypes from "prop-types";
import {
  Grid,
  CheckSquare,
  MessageSquare,
  Mail,
  Calendar,
} from "react-feather";

// ** Reactstrap Imports
import {
  Breadcrumb,
  DropdownMenu,
  DropdownItem,
  BreadcrumbItem,
  DropdownToggle,
  UncontrolledButtonDropdown,
} from "reactstrap";

const BreadCrumbs = (props) => {
  // ** Props
  const {
    breadCrumbTitle,
    breadCrumbParent,
    breadCrumbParent2,
    breadCrumbParent3,
    breadCrumbActive,
  } = props;

  return (
    <div className="w-100 d-flex align-items-center">
      <div className="w-100">
        <div className="row breadcrumbs-top">
          <div className="col-12">
            {breadCrumbTitle ? (
              <h2 className="content-header-title float-start mb-0">
                {breadCrumbTitle}
              </h2>
            ) : (
              ""
            )}
            <div className="breadcrumb-wrapper cursor-default">
              <Breadcrumb>
                <BreadcrumbItem tag="li">
                  <Link to="/">Home</Link>
                </BreadcrumbItem>
                {breadCrumbParent ? (
                  <BreadcrumbItem tag="li" className="text-primary text-capitalize">
                    <Link to={`/${breadCrumbParent}`}>
                    {breadCrumbParent}
                    </Link>
                  </BreadcrumbItem>
                ) : (
                  ""
                )}
                {breadCrumbParent2 ? (
                  <BreadcrumbItem tag="li" className="text-primary">
                    {breadCrumbParent2}
                  </BreadcrumbItem>
                ) : (
                  ""
                )}
                {breadCrumbParent3 ? (
                  <BreadcrumbItem tag="li" className="text-primary">
                    {breadCrumbParent3}
                  </BreadcrumbItem>
                ) : (
                  ""
                )}
                <BreadcrumbItem tag="li" active className="text-capitalize">
                  {breadCrumbActive}
                </BreadcrumbItem>
              </Breadcrumb>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BreadCrumbs;

// ** PropTypes
BreadCrumbs.propTypes = {
  // breadCrumbTitle: Proptypes.string.isRequired,
  breadCrumbActive: Proptypes.string.isRequired,
};
