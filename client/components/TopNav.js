import { useState, useEffect, useContext } from "react";
import { Menu } from "antd";
import Link from "next/link";
import {
  AppstoreOutlined,
  CarryOutOutlined,
  CoffeeOutlined,
  LoginOutlined,
  LogoutOutlined,
  TeamOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Context } from "../context";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const { Item, SubMenu, ItemGroup } = Menu;

const TopNav = () => {
  const [current, setCurrent] = useState("");

  const { state, dispatch } = useContext(Context);
  const { user } = state;

  const router = useRouter();

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  useEffect(() => {
    document.title = current
  }, [current])

  const logout = async () => {
    dispatch({ type: "LOGOUT" });
    window.localStorage.removeItem("user");
    const { data } = await axios.get("/api/logout");
    toast(data.message);
    router.push("/login");
  };

  return (
    <Menu mode='horizontal' selectedKeys={[current]}>
      <Item
        key='/'
        onClick={(e) => setCurrent(e.key)}
        icon={<AppstoreOutlined className='text-dark fs-5' />}
      >
        <Link href='/'>
          <a
            className='badge bg-warning text-dark text-wrap'
            style={{
              width: "7rem",
              height: "1.4rem",
              fontWeight: "700",
              fontSize: "0.8rem",
            }}
          >
            eLearning
          </a>
        </Link>
      </Item>

      {user === null && (
        <>
          <Item
            key='/login'
            onClick={(e) => setCurrent(e.key)}
            icon={<LoginOutlined className='text-success fs-5' />}
          >
            <Link href='/login'>
              <a
                className='badge bg-danger text-light text-wrap'
                style={{
                  width: "7rem",
                  height: "1.4rem",
                  fontWeight: "700",
                  fontSize: "0.8rem",
                }}
              >
                Login
              </a>
            </Link>
          </Item>

          <Item
            key='/register'
            onClick={(e) => setCurrent(e.key)}
            icon={<UserAddOutlined className='text-success fs-5' />}
          >
            <Link href='/register'>
              <a
                className='badge bg-danger text-light text-wrap'
                style={{
                  width: "7rem",
                  height: "1.4rem",
                  fontWeight: "700",
                  fontSize: "0.8rem",
                }}
              >
                Register
              </a>
            </Link>
          </Item>
        </>
      )}

      {user && user.role && user.role.includes("Instructor") ? (
        <Item
          key='/instructor/course/create'
          onClick={(e) => setCurrent(e.key)}
          icon={<CarryOutOutlined className='text-dark fs-5' />}
        >
          <Link href='/instructor/course/create'>
            <a
              className='badge bg-dark text-light text-wrap'
              style={{
                width: "7rem",
                height: "1.4rem",
                fontWeight: "700",
                fontSize: "0.8rem",
              }}
            >
              Create a course
            </a>
          </Link>
        </Item>
      ) : (
        <Item
          key='/user/become-instructor'
          onClick={(e) => setCurrent(e.key)}
          icon={<TeamOutlined className='text-dark fs-5' />}
        >
          <Link href='/user/become-instructor'>
            <a
              className='badge bg-dark text-light text-wrap'
              style={{
                width: "8.3rem",
                height: "1.4rem",
                fontWeight: "700",
                fontSize: "0.8rem",
              }}
            >
              Become Instructor
            </a>
          </Link>
        </Item>
      )}

      {user && user.role && user.role.includes("Instructor") && (
        <Item
          key='/instructor'
          onClick={(e) => setCurrent(e.key)}
          icon={<TeamOutlined className='text-primary fs-5' />}
        >
          <Link href='/instructor'>
            <a
              className='badge bg-primary text-light text-wrap'
              style={{
                width: "6rem",
                height: "1.4rem",
                fontWeight: "700",
                fontSize: "0.8rem",
              }}
            >
              Instructor
            </a>
          </Link>
          ,
        </Item>
      )}

      {user !== null && (
        <SubMenu
          icon={<CoffeeOutlined className='fs-5' />}
          title={user && user.name}
          className='float-end text-danger fw-bolder'
          style={{
            fontWeight: "900",
            fontSize: "1rem",
          }}
        >
          <ItemGroup>
            <Item key='/user'>
              <Link href='/user'>
                <h5>
                  <span class='badge rounded-pill bg-primary'>Dashboard</span>
                </h5>
              </Link>
            </Item>

            <Item onClick={logout}>
              <h5>
                <span class='badge rounded-pill bg-danger'>Logout</span>
              </h5>
            </Item>
          </ItemGroup>
        </SubMenu>
      )}
    </Menu>
  );
};

export default TopNav;
