import React, { useEffect, useState, useContext, } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { MailOutlined,  UserOutlined,RocketOutlined, HomeOutlined,BarsOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { Layout, Menu, theme, Button, Avatar, Dropdown, Typography, Row } from 'antd';
import RouterBeforeEach from '../../routes/gaurd';
import i18n from '../../i18n';
import LocaleContext from '../../LocaleContext';
import { useTranslation } from "react-i18next";


const { Header, Content, Footer, Sider } = Layout;



const personalItems = [
  {
    label: "Account Settings",
    key: 'profile',
    icon: <MailOutlined />,
  },
  {
    label: "Support",
    key: 'support',
    icon: <MailOutlined />,
  },

];



const App = () => {
    const { t } = useTranslation();
    const { locale } = useContext(LocaleContext);

    const [collapsed, setCollapsed] = useState(false);

    const [current, setCurrent] = useState('');
    
    const { token: { colorBgContainer }} = theme.useToken();

    const items = [
      {
        label: t('home_page'),
        key: "",
        icon: <HomeOutlined />
      },
      {
        label: t("product_footprint"),
        key: 'product-carbon-footprint',
        icon: <BarsOutlined />,
        children: [
          {        
            label: t("factor_db"),
            key: 'factor_db',
            icon: <BarsOutlined />,
            },
          {        
          label: t("LCA"),
          key: 'LCA',
          icon: <BarsOutlined />,
          },
          {
            label: t("efootprint"),
            key: 'efootprint',
            icon: <BarsOutlined />,
          }
        ]
      },
      {
        label: t("LCA-note"),
        key: 'LCA-note',
        icon: <BarsOutlined />,
      },
      {
        label: t("organization_footprint"),
        key: 'organization-carbon-footprint',
        icon: <BarsOutlined />,
      },  
      {
        label: t("ESG"),
        key: 'ESG',
        icon: <BarsOutlined />,
      },  
      {
        label: t("training"),
        key: 'training',
        icon: <BarsOutlined />,
      },  
      {
        label: t("sign_in"),
        key: 'login',
        icon: <UserOutlined />,
      }
    ];


    const changeLocale  = (l) => {

      if (locale !== l) {
        // console.log('click',locale, l)
        i18n.changeLanguage(l);
      }
    }

    const navigate = useNavigate();

    const navi = (e) => {
      setCurrent(e.key)
      navigate(`/${e.key}` ,{
        replace: false,
      })
    };


    const languages = [
      {
        label: <Button onClick={() => changeLocale('en')}> English </Button>,
        key: 'English',
        icon: <EnvironmentOutlined />,
      },
      {
        label: <Button onClick={() => changeLocale('zh')}> 简体中文 </Button>,
        key: 'simplified-Chinese',
        icon: <EnvironmentOutlined />,
      },
      {
        label: <Button onClick={() => changeLocale('zh-CHT')}> 繁體中文 </Button>,
        key: 'traditional-Chinese',
        icon: <EnvironmentOutlined />,
      },
    ]



  return (
    <Layout> 
        <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 5,
          width: '100%',
          background: 'grey',
        }}>

          <Row justify="end" align="middle">

            <Dropdown
                menu={{
                  items: languages,
                }}
                
                placement="bottomRight"
              >
                <Avatar size="large" icon={<RocketOutlined />} />
                
              </Dropdown>
            
              {t('language')}

            </Row>  
          
          
        </Header> 

        <Layout 
          style={{
          // minHeight: '100vh',
        }}>
          <Sider collapsible 
          collapsed={collapsed} 
          onCollapse={(value) => setCollapsed(value)} 
          style={{
          overflow: 'auto',
          height: '100vh',
          position: 'sticky',
          left: 0,
          top: 0,
          background: colorBgContainer,
          
      }}>

          <Menu 
          theme="light" 
          mode="inline" 
          selectedKeys={[current]}
          defaultSelectedKeys={""} 
          items={items}
          onClick={navi}
          />
          </Sider>
          <Layout>
            <Content
            style={{
                margin: '24px 16px 0',
                overflow: 'auto',
            }}
            >
              <RouterBeforeEach/>
            </Content>
            <Footer
            style={{
              textAlign: 'center',
            }}
          >
            ZeoLCA.com - LCA Tools, Training & Database Center
            </Footer>
          </Layout>
        </Layout>
     </Layout> 
  );
};
export default App;