import React from 'react'
import './index.less'
//import Header from '../../components/Header'

import { Row, List, Col, Button, Tooltip } from 'antd';
import { PlusOutlined, StarOutlined } from '@ant-design/icons';

function FooterPart(props) {
  const partnerData = [
    {
      url: '/resources/footer/partner-logo/1.jpg',
    },
    {
      url: '/resources/footer/partner-logo/2.jpg',
    },
    {
      url: '/resources/footer/partner-logo/3.jpg',
    },
    {
      url: '/resources/footer/partner-logo/4.jpg',
    },
    {
      url: '/resources/footer/partner-logo/5.jpg',
    },
    {
      url: '/resources/footer/partner-logo/6.jpg',
    },
  ];
  const partnerProps = {
    grid: {
      gutter: 25,
      xs: 3,
      sm: 3,
      md: 3,
      lg: 3,
      xl: 3,
      xxl: 3,
    },
    dataSource: partnerData,
    renderItem: item => (
      <List.Item>
        <a href={'/'}><img src={item.url} /></a>
      </List.Item>
    )
  }


  return (

    <div className='footer-bg'>
      <div className="footer">
        <Row >
          <Col span={5} className="partner">
            <h2>合作伙伴</h2>
            <List {...partnerProps} />
          </Col>
          <Col span={1}></Col>
          <Col span={4}>
            <div className="help-center">
              <h2>帮助中心</h2>
              <p><a href="/">用户协议</a></p>
              <p><a href="/">常见问题</a></p>
              <p><a href="/">帮助中心</a></p>
              <p><a href="/">投票须知</a></p>
            </div>
          </Col>
          <Col span={4}>
            <div className="product-service">
              <h2>产品服务</h2>
              <p><a href="/">定制投票</a></p>
              <p><a href="/">定制投票</a></p>
              <p><a href="/">平台功能</a></p>
              <p><a href="/">网站声明</a></p>
            </div>
          </Col>
          <Col span={4}>
            <div className="friendly-link">
              <h2>友情链接</h2>
              <p><a href="https://www.baidu.com/">百度一下</a></p>
              <p><a href="https://www.jd.com/">京东购物</a></p>
              <p><a href="https://wotgame.cn/">坦克世界</a></p>
              <p><a href="https://www.bilibili.com/">哔哩哔哩</a></p>
            </div>
          </Col>
          <Col span={4}>
            <div className="contact">
              <h2>联系我们</h2>
              <p><a href="/">官方微博</a></p>
              <p>电话：000-00000000</p>
            </div>
          </Col>
          <Col span={2}></Col>
        </Row>
        <div className="txt-bottom">
          <p>&#169;2020-2021 tankchao.com 保留所有权利</p>
          <p>京ICP证京xx-20202020 | 京ICP备xx202020号-10 | 京网文【2020】xxxx-xxx号</p>
          <p>公安备案号xxxxxxxxxxxxx | ISBN-xxx-x-89989-xxx-x | 新出审字【2020】xxx号</p>
          <p>文明投票 | XXXXX | XXXXX | XXXXX</p>
        </div>
      </div>
    </div>
  )

}
export default FooterPart;