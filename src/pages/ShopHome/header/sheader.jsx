import React from 'react';
import "./s_header.less"

function sheader(props) {
    return (
        <div className="sHeader">
            <div class="mock1">
                <div class="counte clear">
                    <ul class="left">
                        <li>小米商城</li><span>|</span>
                        <li>MIUI</li><span>|</span>
                        <li>loT</li><span>|</span>
                        <li>云服务</li><span>|</span>
                        <li>金融</li><span>|</span>
                        <li>有品</li><span>|</span>
                        <li>小爱平台开放</li><span>|</span>
                        <li>企业团购</li><span>|</span>
                        <li>资质证照</li><span>|</span>
                        <li>协议规则</li><span>|</span>
                        <li>下载app</li><span>|</span>
                        <li>SelctLocation</li>
                    </ul>
                    <ul class="right">
                        <li>登陆</li><span>|</span>
                        <li>注册</li><span>|</span>
                        <li>消息通知</li>
                        <div class="shop_car">
                            <img src={require('./shop_car.png').default} alt="shop_Car" class="shop_img"/>购物车(0)
                        </div>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default sheader;