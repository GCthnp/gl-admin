import React, { useEffect, useState } from 'react';
import { Layout, Input, Menu, Card, Pagination } from 'antd';

import { reqProduct, reqSearch } from "../../api"

import Sheader from "./header/sheader"

import "./main.less"

const { Header, Sider } = Layout;
const { Search } = Input;
const { SubMenu } = Menu;
const { Meta } = Card;

let total = 0
const pageSize = 2

function ShopHome(props) {


    const [product, setProduct] = useState([])
    const [searchName, setSearchName] = useState('')

    const getProducts = async (pageNum) => {
        console.log(searchName);
        let result;
        if (searchName) {
            result = await reqSearch({
                pageNum,
                pageSize: pageSize,
                searchName,
                searchType: "productName"
            })
        } else {
            result = await reqProduct(pageNum, pageSize)
        }

        if (result.status === 0) {
            total = result.data.total
            setProduct(result.data.list)
        }
    }


    const onSearch = value => {
        setSearchName(value);
        getProducts(1)
    };

    useEffect(() => {
        getProducts(1)
        // eslint-disable-next-line
    }, [])

    function handleClick(e) {
        console.log('click', e);
    }

    return (
        <div className="app">
            
            <Sheader />
            
            <Layout>
                <Header className="header">
                    <div className="logo" />
                    <Search className="search" placeholder="input search text" onSearch={onSearch} enterButton />
                </Header>


                <Layout className="content">
                    <Sider width={200} className="site-layout-background">
                        <Menu
                            mode="vertical"
                            // defaultSelectedKeys={['1']}
                            // defaultOpenKeys={['sub1']}
                            style={{ height: '100%', borderRight: 0 }}
                            onClick={handleClick}
                        >
                            <SubMenu key="sub4" title="智能手环">
                                <Menu.Item key="1">小米</Menu.Item>
                                <Menu.Item key="2">华为</Menu.Item>
                                <Menu.Item key="3">apple</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub5" title="手机">
                                <Menu.Item key="4">小米</Menu.Item>
                                <Menu.Item key="5">华为</Menu.Item>
                                <Menu.Item key="6">apple</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub6" title="电脑">
                                <Menu.Item key="7">小米</Menu.Item>
                                <Menu.Item key="8">华为</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub7" title="家电">
                                <Menu.Item key="9">小米</Menu.Item>
                                <Menu.Item key="10">华为</Menu.Item>
                                <Menu.Item key="11">apple</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub8" title="配件">
                                <Menu.Item key="12">小米</Menu.Item>
                                <Menu.Item key="13">华为</Menu.Item>
                                <Menu.Item key="14">apple</Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Layout className="cardContain">

                        {
                            product.map(item => {
                                console.log(product)

                                return (
                                    <Card
                                        key={item._id}
                                        className="card_item"
                                        hoverable
                                        cover={<img style={{ height: 240 }} alt="example" src={item.imgs.length > 0 ? `http://localhost:5000/upload/${item.imgs[0]}` : "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"} />}
                                    >
                                        <Meta title={item.name} description={<span style={{ color: "red" }}>{"￥" + item.price}</span>} />
                                    </Card>
                                )
                            })
                        }

                    </Layout>

                </Layout>
                <Pagination
                    style={{ width: "1226px", margin: "10px auto", textAlign: "center" }}
                    pageSize={pageSize}
                    total={total}
                    showTotal={total => `共 ${total} 条`}
                    showQuickJumper
                    onChange={getProducts}
                />
            </Layout>
        </div>
    );
}

export default ShopHome;