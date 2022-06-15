// ** React Imports
import { Link } from "react-router-dom";
import { Fragment, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { ShoppingCart, X } from "react-feather";
import {
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Badge,
  Button,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import payImage from "../../../../assets/images/avunja/icons/pay.svg";
import airtime from "../../../../assets/images/avunja/icons/airtime.svg";
import electricity from "../../../../assets/images/avunja/icons/electricity.svg";
import water from "../../../../assets/images/avunja/icons/water.svg";
import { deleteCartItem } from "@store/actions/app.actions";
import "@styles/react/libs/input-number/input-number.scss";
import { formatAmount, isMobileWidth } from "../../../../utility/Utils";
import clsx from "clsx";

const CartDropdown = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.app);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const mobileWidth = isMobileWidth()
  const renderCartItems = () => {
    if (cart.length) {
      let total = 0;

      return (
        <Fragment>
          <PerfectScrollbar
            className="scrollable-container media-list"
            options={{
              wheelPropagation: false,
            }}
          >
            {cart.map((item) => {
              let amount = 0;
             (item.data).forEach((data) => {total += +data.amount; amount += +data.amount;})

              return (
                <div key={item.id} className="list-item align-items-center pt-1 pb-1" style={{maxHeight: "100px", minHeight: "100px"}}>
                  <img
                    className="d-block rounded me-1"
                    src={
                      item.type === "AIRTIME"
                        ? airtime
                        : item.type === "ELECTRICITY_BILL"
                        ? electricity
                        : item.type === "WATER_BILL"
                        ? water
                        : payImage
                    }
                    alt={item.type}
                    width="50"
                    height="50"
                  />
                  <div className="flex-grow-1 ms-1">
                    <span className="d-flex justify-content-end cursor-pointer">
                      <X
                        size={14}
                        className="cart-item-remove"
                        onClick={() =>
                          dispatch(deleteCartItem({ id: item.id }))
                        }
                      />
                    </span>
                    <div className="media-heading">
                      <h6 className="cart-item-title">
                        {item.type === "AIRTIME"
                          ? "Airtime"
                          : item.type === "ELECTRICITY_BILL"
                          ? "Electricity Bill"
                          : item.type === "WATER_BILL"
                          ? "Water Bill"
                          : null}
                      </h6>
                    </div>
                    <h6 className="mt-1">
                      {item.data.length} {item.type === "AIRTIME"
                          ? `Number${item.data.length > 1 ? "s" : ""}`
                          : item.type === "ELECTRICITY_BILL"
                          ? `Electricity Bill${item.data.length > 1 ? "s" : ""}`
                          : item.type === "WATER_BILL"
                          ? `Water Bill${item.data.length > 1 ? "s" : ""}`
                          : null}
                    </h6>
                    <h5 className="mt-1">
                      KES {formatAmount(Number(parseInt(amount)))}
                    </h5>
                  </div>
                </div>
              );
            })}
          </PerfectScrollbar>
          <li className="dropdown-menu-footer mx-2 mb-1">
            <div className="d-flex justify-content-between my-1">
              <h6 className="fw-bolder mb-0">Total:</h6>
              <h6 className="text-primary fw-bolder mb-0">
                KES {formatAmount(Number(parseInt(total).toFixed(2)))}
              </h6>
            </div>
            <Button
              tag={Link}
              to="/checkout"
              color="primary"
              block
              onClick={toggle}
            >
              Checkout
            </Button>
          </li>
        </Fragment>
      );
    } else {
      return <p className="m-0 p-1 text-center">Your cart is empty</p>;
    }
  };

  return (
    <Dropdown
      isOpen={dropdownOpen}
      toggle={toggle}
      tag="li"
      className="dropdown-cart nav-item me-25"
    >
      <DropdownToggle tag="a" className="nav-link position-relative">
        <ShoppingCart />
        {cart.length > 0 ? (
          <Badge pill color="primary" className="badge-down">
            {cart.length}
          </Badge>
        ) : null}
      </DropdownToggle>
      <DropdownMenu
        end
        tag="ul"
        className={clsx("dropdown-menu-media dropdown-cart mt-0", mobileWidth && "w-100")}
      >
        <li className="dropdown-menu-header">
          <DropdownItem tag="div" className="d-flex" header>
            <h4 className="notification-title mb-0 me-auto">My Cart</h4>
            <Badge color="light-primary" pill>
              {cart.length || 0} Items
            </Badge>
          </DropdownItem>
        </li>
        {renderCartItems()}
      </DropdownMenu>
    </Dropdown>
  );
};

export default CartDropdown;
