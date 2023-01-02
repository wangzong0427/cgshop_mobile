<template>
    <div class="Order">
        <!-- 商品 -->
        <div class="bg" v-for="good in goodList" :key="good.id">
            <div class="goods" v-if="good.isBuy">
                <!-- 商品图片 -->
                <img :src="url + good.url" alt="" />
                <!-- 商品信息 -->
                <div class="info">
                    <span class="name">{{ good.name }}</span>
                    <span class="price">￥{{ good.price }}</span>
                </div>
                <!-- 商品购买数量 -->
                <div class="number">
                    <span class="mid">{{ good.buy }}</span>
                </div>
            </div>
        </div>
        <div class="price">
                <span>总计:</span>
                <span>{{ totalPrice }}</span>
        </div>
        <div class="buyInfo">
            <div class="name">姓名:王清华</div>
            <div class="address">地址:河南省焦作市山阳区河南理工大学新校区</div>
        </div>
        <div @click="toOrder">立即下单</div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: "Order",
    data() {
        return {
            goodList: [],
            url: "http://192.168.0.105:8080", // 基本请求地址
        };
    },
    computed: {
        totalPrice() {
            let price = 0
            this.goodList.forEach(item => {
                if(item.isBuy) {
                    price += item.buy*item.price
                }
            }) 
            return price
        },
    },
    methods: {
        // 用于一开始加载页面读取本地存储中的购物信息
        toOrder() {
            let order={
                    "mid":"1",
                    "nickName":"张三",
                    "siteName":"阿五遍历店",
                    "siteMobile":"152552322",
                    "siteAddress":"郑州市高新区",
                    "reciveUser":"莉莉",
                    "reciveMobile":"1365555"
                };
                order.payable=this.total;
                order.pay=this.total;
                let od=[];
                this.goodList.forEach(el=>{
                    let tmp={};
                    tmp.gid=el.id;
                    tmp.goodsname=el.name;
                    tmp.price=el.price;
                    tmp.num=el.num;
                    od.push(tmp);
                })
                order.orderDetail=od;
                
                //保存
                axios.post(this.url + "/v1/order/save",order)
                    .then(res => {
                        if(res.data.code == 200){
                            console.log("下单成功")
                        }
                        // console.log(res);
                })
        }
    },
    created() {
        this.goodList = JSON.parse(localStorage.getItem("carList"))
    },
};
</script>

<style lang="less">
// 商品
.bg {
    padding: 0.9375rem;
    background-color: #f6f5f5;
    .goods {
        display: flex;
        // margin: 0.9375rem;
        background-color: #fff;
        border-radius: 0.3125rem;
        img {
        width: 5.625rem;
        height: 5.625rem;
        }
        .info {
        position: relative;
        margin-left: 0.9375rem;
        width: 9.375rem;
        // background-color: pink;
        .name {
            position: absolute;
            padding: 0.1875rem;
            left: 0;
        }
        .price {
            position: absolute;
            left: 0;
            color: red;
            font-size: 1rem;
            bottom: 0.3125rem;
        }
        }
    }
    .number {
        position: relative;
        width: 5.625rem;
        span {
        position: absolute;
        right: 0;
        bottom: 0.625rem;
        display: inline-block;
        width: 1.25rem;
        height: 1.25rem;
        font-size: 1.25rem;
        line-height: 1.25rem;
        background-color: #fff;
        }
        :first-child {
        left: 0;
        border-radius: 0.3125rem;
        border: red 0.0625rem solid;
        background-color: #fff;
        }
        :last-child {
        border-radius: 0.3125rem;
        border: red 0.0625rem solid;
        }
        .mid {
        width: 3rem;
        left: 1.375rem;
        font-size: 1.0625rem;
        }
    }
    .car {
        position: relative;
        width: 5.625rem;
        span {
        position: absolute;
        left: 0;
        width: 100%;
        padding: 0.3125rem 0;
        bottom: 0.625rem;
        color: #fff;
        line-height: 100%;
        background: red;
        border-radius: 0.625rem;
        }
    }
}
.price {
    text-align: left;
}
.buyInfo {
    text-align: left;
}
</style>