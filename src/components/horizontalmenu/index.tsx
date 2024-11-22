import React from 'react';
import { Layout, Menu } from 'antd';
import { HomeOutlined, AppstoreOutlined, SettingOutlined, DropboxOutlined, LoginOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectIsAuth } from '../../redux/slices/auth';

const { Header } = Layout;

const HorizontalMenu = () => {

  const dispatch = useDispatch<any>();

  const isAuth = useSelector(selectIsAuth)



  return (
    <Layout>
      <Header>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
        >

          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to="/">
              Home
            </Link>
          </Menu.Item>


          {isAuth && (
            <Menu.Item key="3" icon={<DropboxOutlined />}>
              <Link to="/basket">
                Basket
              </Link>
            </Menu.Item>
          )}



          {isAuth ? (
            <Menu.Item key="2" icon={<LoginOutlined />}>
              <Link to="/" onClick={() => dispatch(logout())}>
                Exit
              </Link>
            </Menu.Item>
          ) : (<Menu.Item key="2" icon={<LoginOutlined />}>
            <Link to="/login">
              Sign in/Sign up
            </Link>
          </Menu.Item>)}



        </Menu>
      </Header>
    </Layout>
  );
};

export default HorizontalMenu;