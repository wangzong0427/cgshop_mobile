<template>
  <div class="Vip">
    <!-- 顶部分类 -->
    <div class="top">
      <ul>
        <li
          @click="changeRed($event)"
          v-for="item in topList"
          :key="item.id"
          ref="item.id"
        >
          {{ item.title }}
        </li>
        <li ref="bar" id="bar"></li>
      </ul>
    </div>

    <!-- 商品 -->
    <div class="bg" v-for="good in goodsList" :key="good.id">
      <div class="goods">
        <!-- 商品图片 -->
        <img :src="url + good.url" alt="" />
        <!-- 商品信息 -->
        <div class="info">
          <span class="name">{{ good.name }}</span>
          <span class="tags">{{ good.tags }}</span>
          <span class="price">￥{{ good.price }}</span>
        </div>
        <!-- 商品购买数量 -->
        <div class="number" v-if="good.buy">
          <span @click="jia(good);allChecked = false">＋</span>
          <span class="mid">{{ good.buy }}</span>
          <span @click="jian(good);allChecked = false">-</span>
        </div>
        <div class="car" v-else>
          <span @click="toCar(good)">加入购物车</span>
        </div>
      </div>
    </div>

    <!-- 弹出购物车以后的遮罩层 -->
    <div class="mask" ref="mask"></div>

    <!-- 底部支付 -->
    <div class="bottom">
      <div class="payBtn">
        <img src="../assets/天猫购物车 .png" alt="" @click="showCar1" />
        <router-link to="/Order">
          <div>
            <span>先用后付,0元下单</span>
            <span>确认收货后付款￥{{ totalPrice }}</span>
          </div>
        </router-link>
      </div>
      <div class="carInfo" ref="car">
        <div v-if="!haveGoods" class="noGoods">先去逛逛再来吧!</div>
        <div class="top" v-if="haveGoods">
          <div class="left">
            <input type="checkbox" ref="all" @click="allBuy($event)" v-model="allChecked" checked="false">
            <span>全选</span>
          </div>
          <div class="mid">
            <h3>购物车</h3>
          </div>
          <div class="right" @click="closeCar">关闭</div>
        </div>
        <div v-for="good in shopList" :key="good.id">
          <div class="goods">
            <input type="checkbox" @click="isBuy($event,good)" v-model="good.isBuy" ref="alone">
            <!-- 商品图片 -->
            <img :src="url + good.url" alt="" />
            <!-- 商品信息 -->
            <div class="info">
              <span class="name">{{ good.name }}</span>
              <span class="price">￥{{ good.price }}</span>
            </div>
            <!-- 商品购买数量 -->
            <div class="number" v-if="good.buy">
              <span @click="jia(good)">＋</span>
              <span class="mid">{{ good.buy }}</span>
              <span @click="jian(good)">-</span>
            </div>
            <div class="car" v-else>
              <span @click="toCar(good)">加入购物车</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Vip",
  data() {
    return {
      url: "http://192.168.0.105:8080", // 基本请求地址
      topList: [],
      goodsList: [], // 商品
      num: 0,
      isShow: false,
      haveGoods: true,
      shopList: [], // 购物车商品
      totalPrice: 0,  // 总价
      allChecked: true
    };
  },
  watch: {
    shopList: {
      deep: true,
      // immediate: true,
      handler(newVal) {
        let price = 0
        let allBuy = 0
        newVal.forEach(item => {
          if(item.isBuy != false) {
            price += item.buy*item.price
            allBuy++
          }
        })
        this.totalPrice = price
      },
    },
  },
  methods: {
    changeRed(e) {
      // 红色长条移动到鼠标点击的那一栏
      this.$refs.bar.style.left = e.target.offsetLeft + "px";
    },
    query() {
      axios.post(this.url + "/v1/goods/query", {}).then((res) => {
        this.goodsList = res.data.data.list;
        this.goodsList.forEach((good) => {
          this.$set(good, "buy", 0);
        });
        // 根据本地存储更改商品是否加入购物车
      });
    },
    // 更新浏览器存储的购物车中商品的信息
    update(good) {
      let carList = JSON.parse(localStorage.getItem("carList"));
      carList.forEach((item, index) => {
        if (good.id === item.id) {
          if (good.buy) {
            carList[index].buy = good.buy;
            carList[index].isBuy = good.isBuy
          } else {
            carList.splice(index, 1);
          }
        }
      });
      this.shopList = carList
      // 更新存储
      localStorage.setItem("carList", JSON.stringify(carList));
    },
    jia(good) {
      // 增加商品
      good.buy++;
      // 更新本地存储
      this.update(good);
    },
    jian(good) {
      // 减少商品
      good.buy--;
      // 更新本地存储
      this.update(good);

      // 解决打开购物车页面，操作商品从1-》0时，goodsList数据更新不及时的问题
      this.goodsList.forEach((item, index) => {
        if(item.id === good.id) {
          this.goodsList[index].buy = good.buy
        }
      })
    },
    // 用于一开始加载页面读取本地存储中的购物信息
    viewCar() {
      this.goodsList.forEach((good, index) => {
        let carList = localStorage.getItem("carList");
        if (carList) {
          carList = JSON.parse(carList);
        }
        carList.forEach((item) => {
          // 本地有对应商品的购物信息，则加载本地的购物数
          if (good.id === item.id) {
            this.goodsList[index].buy = item.buy;
          }
        });
      });
    },
    toCar(good) {
      // 加入购物车
      good.buy = 1;
      // 读取本地存储中的购物信息
      let carList = localStorage.getItem("carList");
      if (carList) {
        // 有
        carList = JSON.parse(carList);
      } else {
        // 无
        carList = [];
      }
      let purchased = {};
      purchased.id = good.id;
      purchased.name = good.name;
      purchased.buy = good.buy;
      purchased.price = good.price;
      purchased.url = good.url
      purchased.isBuy = this.allChecked
      // 加入商品
      carList.push(purchased);
      this.shopList = carList
      // 添加到本地存储
      localStorage.setItem("carList", JSON.stringify(carList));
      console.log(this.shopList);
    },

    // 弹出和收回购物车,以及加载购物车中的信息
    showCar1() {
      this.isShow = !this.isShow;
      if (this.isShow) {
        this.$refs.car.style.bottom = "347px";
        this.$refs.mask.style.display = "block";
      } else {
        this.$refs.car.style.bottom = "50px";
        this.$refs.mask.style.display = "none";
      }

      // 渲染购物车中的商品
      this.shopList = JSON.parse(localStorage.getItem("carList"));
      if (!this.shopList.length) {
        this.haveGoods = false;
      } else {
        this.haveGoods = true;
      }
    },

    // 关闭购物车按钮
    closeCar() {
      this.$refs.car.style.bottom = "50px";
      this.$refs.mask.style.display = "none";
      this.isShow = !this.isShow;
    },

    // 是否勾选购物车中的商品
    isBuy(e,good) {
      let allBuy = 0
      this.$set(good, 'isBuy', e.target.checked)
      this.shopList.forEach((item, index) => {
        if(item.isBuy) {
          allBuy++
        }
      })
      if(allBuy === this.shopList.length) {
        this.$refs.all.checked = true
      }else {
        this.$refs.all.checked = false
      }

      this.shopList.forEach(item => {
        this.update(item)
      })

      let price = 0
      this.shopList.forEach(item => {
          if(item.isBuy) {
            price += item.buy*item.price
          }
        })
      this.totalPrice = price
    },
    // 全部都买
    allBuy(e) {
      this.shopList.forEach((item, index) => {
        this.shopList[index].isBuy = e.target.checked
      })
      this.$refs.alone.forEach(item => {
        this.$refs.alone.checked = e.target.checked
      })
      this.shopList.forEach(item => {
        this.update(item)
      })

      let price = 0
      this.shopList.forEach(item => {
          if(item.isBuy) {
            price += item.buy*item.price
          }
        })
      this.totalPrice = price
    }
  },
  created() {
    // 如果有接口就在此处请求数据
    let rep = {
      status: 200,
      data: [
        {
          id: 0,
          title: "推荐",
        },
        {
          id: 1,
          title: "特惠",
        },
        {
          id: 2,
          title: "上新",
        },
        {
          id: 3,
          title: "蔬菜",
        },
        {
          id: 4,
          title: "水果",
        },
        {
          id: 5,
          title: "服装",
        },
      ],
      msg: "请求成功!",
    };
    this.topList = rep.data;
    // 请求商品列表
    this.query();
  },
  beforeUpdate() {
    // 注意，此时goodsList才有值，原因是JS的异步任务机制
    this.viewCar();
  }
};
</script>

<style scoped lang="less">
html {
  font-size: 4.26667vw;
}
* {
  margin: 0;
  padding: 0;
}
a {
  text-decoration: none;
}
/* body {
  background-color: blue;
} */
.top {
  ul {
    display: flex;
    position: relative;
    #bar {
      position: absolute;
      left: 0rem;
      padding: 0;
      bottom: 0;
      width: 16.67vw;
      height: 0.125rem;
      background-color: red;
      transition: all 0.5s;
    }
  }
  li {
    flex: 1;
    padding: 0.625rem;
    list-style: none;
  }
}
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
      .tags {
        position: absolute;
        left: 0;
        top: 1.875rem;
        padding: 0.1875rem;
        font-size: 0.75rem;
        line-height: 100%;
        color: #fff;
        background-color: red;
        border-radius: 0.625rem;
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

// 遮罩层
.mask {
  display: none;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 667px;
  background: rgba(0, 0, 0, 0.6);
}

// 底部购物车
.bottom {
  position: fixed;
  bottom: 45px;
  width: 100%;
  height: 50px;
  .payBtn {
    display: flex;
    position: relative;
    width: 375px;
    height: 100%;
    z-index: 2;
    background-color: #fff;
    img {
      width: 50px;
      height: 50px;
    }
    div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 325px;
      height: 50px;
      background-color: red;
      color: #fff;
      :last-child {
        font-size: 14px;
      }
    }
  }
  .carInfo {
    position: relative;
    bottom: 50px;
    width: 375px;
    height: 297px;
    background-color: #fff;
    z-index: 1;
    transition: all 0.3s;
    .noGoods {
      padding-top: 20px;
      font-size: 20px;
    }

    .top {
      display: flex;
      justify-content: space-between;
      height: 42px;
      .left {
        position: relative;
        width: 60px;
        height: 42px;
        line-height: 42px;
        font-weight: 700;
        input {
          display: inline-block;
          position: absolute;
          left: 8px;
          top: 12px;
          width: 16px;
          height: 16px;
        }
        span {
          position: absolute;
          left: 28px;
        }
      }

      .mid {
        padding-top: 3px;
      }
      .right {
        margin-left: 8px;
        padding: 10px 10px 0 0 ;
      }
    }

    .goods {
      display: flex;
      position: relative;
      margin-bottom: 20px;
      background-color: #fff;

      input {
        position: absolute;
        display: inline-block;
        top: 22px;
        left: 8px;
        width: 14px;
        height: 14px;
      }

      img {
        margin-left: 30px;
        width: 60px;
        height: 60px;
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
  }
}
</style>
