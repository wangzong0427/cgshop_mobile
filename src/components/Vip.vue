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
    <div class="bg" v-for="good in shopList" :key="good.id">
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
          <div class="goods" v-if="haveGoods && good.buy">
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
      isShow: false,
      haveGoods: true,
      shopList: [], // 购物车商品
      totalPrice: 0,  // 总价
      allChecked: false
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
          this.haveGoods = false
          // 计算价格
          if(item.isBuy) {
            price += item.buy*item.price
            allBuy++
          }

          if(item.buy) {
            this.haveGoods = true
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
        this.shopList = this.goodsList
        let carList = JSON.parse(localStorage.getItem("carList"))
        this.shopList.forEach((item1, i) => {
          carList.forEach(item2 => {
            if(item1.id === item2.id) {
              this.shopList[i].buy = item2.buy
            }
          })
        })
      });
    },

    // 向本地存储copy一份shopList
    confirm() {
      let endCar = []
      this.shopList.forEach(item => {
        endCar.push(item)
      })
      localStorage.setItem("endCar", JSON.stringify(endCar))
    },

    // 向本地存储想要购买的商品数量
    store() {
      let carList = []
      this.shopList.forEach(item => {
        let tmp = {}
        if(item.buy) {
          tmp.id = item.id
          tmp.buy = item.buy
          carList.push(tmp)
        }
      })
      localStorage.setItem("carList", JSON.stringify(carList))
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
    },
    jian(good) {
      // 减少商品
      good.buy--;
    },
    toCar(good) {
      // 加入购物车
      good.buy = 1;
    },

    // 弹出和收回购物车,以及加载购物车中的信息
    showCar1() {
      this.isShow = !this.isShow;
      if (this.isShow) {
        this.$refs.car.style.bottom = "21.6875rem";
        this.$refs.mask.style.display = "block";
      } else {
        this.$refs.car.style.bottom = "3.125rem";
        this.$refs.mask.style.display = "none";
      }

      let lg =0
      this.shopList.forEach(item => {
        if(item.buy > 0) {
          lg++
        }
      })
      if (!lg) {
        this.haveGoods = false;
      } else {
        this.haveGoods = true;
      }
    },

    // 关闭购物车按钮
    closeCar() {
      this.$refs.car.style.bottom = "3.125rem";
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
        }else if(!item.buy) {
          allBuy++
        }
      })
      if(allBuy === this.shopList.length) {
        this.$refs.all.checked = true
      }else {
        this.$refs.all.checked = false
      }


      // 重新计算价格
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

      // 重新计算价格
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
  updated() {
    // 每次更新数据之后，都将本地的数据也更新一下
    this.store()
    this.confirm()
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
  height: 41.6875rem;
  background: rgba(0, 0, 0, 0.6);
}

// 底部购物车
.bottom {
  position: fixed;
  bottom: 2.8125rem;
  width: 100%;
  height: 3.125rem;
  .payBtn {
    display: flex;
    position: relative;
    width: 23.4375rem;
    height: 100%;
    z-index: 2;
    background-color: #fff;
    img {
      width: 3.125rem;
      height: 3.125rem;
    }
    div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 20.3125rem;
      height: 3.125rem;
      background-color: red;
      color: #fff;
      :last-child {
        font-size: .875rem;
      }
    }
  }
  .carInfo {
    position: relative;
    bottom: 3.125rem;
    width: 23.4375rem;
    height: 18.5625rem;
    background-color: #fff;
    z-index: 1;
    transition: all 0.3s;
    .noGoods {
      padding-top: 1.25rem;
      font-size: 1.25rem;
    }

    .top {
      display: flex;
      justify-content: space-between;
      height: 2.625rem;
      .left {
        position: relative;
        width: 3.75rem;
        height: 2.625rem;
        line-height: 2.625rem;
        font-weight: 700;
        input {
          display: inline-block;
          position: absolute;
          left: .5rem;
          top: .75rem;
          width: 1rem;
          height: 1rem;
        }
        span {
          position: absolute;
          left: 1.75rem;
        }
      }

      .mid {
        padding-top: .1875rem;
      }
      .right {
        margin-left: .5rem;
        padding: .625rem .625rem 0 0 ;
      }
    }

    .goods {
      display: flex;
      position: relative;
      margin-bottom: 1.25rem;
      background-color: #fff;

      input {
        position: absolute;
        display: inline-block;
        top: 1.375rem;
        left: .5rem;
        width: .875rem;
        height: .875rem;
      }

      img {
        margin-left: 1.875rem;
        width: 3.75rem;
        height: 3.75rem;
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
