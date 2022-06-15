import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Avatar from "@components/avatar";
import {
  User,
  Mail,
  CheckSquare,
  MessageSquare,
  Settings,
  CreditCard,
  HelpCircle,
  Power,
  Plus,
} from "react-feather";
import {
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Spinner,
  Dropdown,
} from "reactstrap";
import { logout } from "../../../../redux/actions/app.actions";
import { useDispatch } from "react-redux";
// import {
//   resetSwitchRole,
//   switchRole,
// } from "../../../../redux/actions/auth.actions";

const UserDropdown = (props) => {
  const { userAccount, toggle, secondToggle } = props;
  // switchRoleResponse
  const dispatch = useDispatch();
  const history = useHistory()
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [toggleUi, setToggleUi] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    if (toggle) {
      setToggleUi(true);
    }
  };

  const handleRegisterAccount = () => {
    dispatch(logout());
    history.push("/register")
  }

  const renderUserImg = () => {
    if (
      userAccount?.data?.picture &&
      userAccount?.data?.picture !== "" &&
      userAccount?.data?.picture !==
        "https://avunja.s3.us-east-2.amazonaws.com/1612430516070-avatar.png"
    ) {
      return (
        <Avatar
          img={userAccount?.data?.picture}
          imgHeight="40"
          imgWidth="40"
          status="online"
          imgClassName="object-fit-cover"
        />
      );
    } else {
      const stateNum = Math.floor(Math.random() * 6),
        states = [
          "light-success",
          "light-danger",
          "light-warning",
          "light-info",
          "light-primary",
          "light-secondary",
        ],
        color = states[stateNum];
      return (
        <Avatar
          initials
          color={color}
          className="text-uppercase"
          content={userAccount?.data?.firstName + " " + userAccount?.data?.lastName}
          contentStyles={{
            borderRadius: 0,
            fontSize: "calc(18px)",
            width: "100%",
            height: "100%",
          }}
          style={{
            height: "40px",
            width: "40px",
          }}
        />
      );
    }
  };

  const renderAccountImg = (firstName, lastName) => {
    const stateNum = Math.floor(Math.random() * 6),
      states = [
        "light-success",
        "light-danger",
        "light-warning",
        "light-info",
        "light-primary",
        "light-secondary",
      ],
      color = states[stateNum];
    return (
      <Avatar
        initials
        color={color}
        className="text-uppercase"
        content={firstName + " " + lastName}
        contentStyles={{
          borderRadius: 0,
          fontSize: "calc(18px)",
          width: "100%",
          height: "100%",
        }}
        style={{
          height: "40px",
          width: "40px",
        }}
      />
    );
  };

  // useEffect(() => {
  //   return () => {
  //     if (switchRoleResponse?.data)
  //       dispatch(
  //         resetSwitchRole({
  //           data: false,
  //           loading: false,
  //           error: false,
  //         })
  //       );
  //   };
  // }, []);

  return (
    <Dropdown
      isOpen={dropdownOpen}
      toggle={toggleDropdown}
      tag="li"
      className="dropdown-user nav-item"
    >
      <DropdownToggle
        href="/"
        tag="a"
        className="nav-link dropdown-user-link"
        onClick={(e) => e.preventDefault()}
      >
        {toggle ? (
          toggleUi && secondToggle ? (
            secondToggle
          ) : (
            toggle
          )
        ) : (
          <>
            <div className="user-nav d-sm-flex d-none">
              <span className="user-name fw-bold text-capitalize">
                {userAccount?.data?.nickName
                  ? userAccount?.data.nickName
                  : `${userAccount?.data?.firstName} ${userAccount?.data?.lastName}`}
              </span>
              <span className="user-status text-capitalize">
                {userAccount?.data?.role}
              </span>
            </div>
            {renderUserImg()}
          </>
        )}
      </DropdownToggle>
      <DropdownMenu end>
        <DropdownItem disabled>
          <div className="align-middle fw-bolder text-black">{`${userAccount?.data?.firstName} ${userAccount?.data?.lastName}`}</div>
          <div className="align-middle mt-1 text-light">{`${userAccount?.data?.phoneNumber}`}</div>
        </DropdownItem>
        <DropdownItem divider />
        <DropdownItem tag={Link} to="/profile">
          <User size={14} className="me-75" />
          <span className="align-middle">Your details</span>
        </DropdownItem>
        <DropdownItem tag={Link} to="/profile">
          <Settings size={14} className="me-75" />
          <span className="align-middle">Settings</span>
        </DropdownItem>
        <DropdownItem tag={Link} to="/apps/email">
          <Mail size={14} className="me-75" />
          <span className="align-middle">Inbox</span>
        </DropdownItem>
        <DropdownItem tag={Link} to="/apps/todo">
          <CheckSquare size={14} className="me-75" />
          <span className="align-middle">Tasks</span>
        </DropdownItem>
        <DropdownItem tag={Link} to="/apps/chat">
          <MessageSquare size={14} className="me-75" />
          <span className="align-middle">Chats</span>
        </DropdownItem>
        <DropdownItem tag={Link} to="/pages/faq">
          <HelpCircle size={14} className="me-75" />
          <span className="align-middle">Help Center</span>
        </DropdownItem>
        <DropdownItem divider />
        <DropdownItem tag={Link} to="/login" onClick={handleLogout}>
          <Power size={14} className="me-75" />
          <span className="align-middle">Logout</span>
        </DropdownItem>
        <DropdownItem divider />
        {userAccount?.data?.profiles &&
          userAccount?.data?.profiles?.length !== 0 &&
          userAccount?.data.profiles.map((data, index) => (
            <DropdownItem
              key={index}
              className="w-100"
              toggle={false}
              // disabled={switchRoleResponse?.loading}
              // onClick={() => dispatch(switchRole({ role: data?.role }))}
            >
              <div className="d-flex align-items-center">
                <div>{renderAccountImg(data?.firstName, data?.lastName)}</div>
                <div className="ms-1">
                  <div className="align-middle fw-bolder">{`${data?.firstName} ${data?.lastName}`}</div>
                  <div className="align-middle mt-half">{`Your ${data?.role} account`}</div>
                  {/* {switchRoleResponse?.loading && (
                    <div className="align-middle mt-half d-flex w-100 justify-content-center">
                      <Spinner size="sm" />
                    </div>
                  )} */}
                </div>
              </div>
            </DropdownItem>
          ))}
        {/* <DropdownItem onClick={handleRegisterAccount} className="w-100">
          <Plus size={14} className="me-75" />
          <span className="align-middle">
            {userAccount?.data?.role === "customer"
              ? "Open a business account"
              : "Open a personal account"}
          </span>
        </DropdownItem>
        <DropdownItem onClick={handleRegisterAccount} className="w-100">
          <Plus size={14} className="me-75" />
          <span className="align-middle">
            {userAccount?.data?.role === "agent"
              ? "Open a business account"
              : "Open a agent account"}
          </span>
        </DropdownItem> */}
      </DropdownMenu>
    </Dropdown>
  );
};

export default UserDropdown;
