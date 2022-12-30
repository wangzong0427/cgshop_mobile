<template>
  <div class="Home">
    <!-- 搜索框 -->
    <Search></Search>
    <!-- 轮播图 -->
    <div class="swiper-container">
          <div class="swiper-wrapper">
              <div v-for="item in banners" :key="item.id" class="swiper-slide">
                <img :src="item.pic" alt="">
              </div>
          </div>
          <!-- 如果需要分页器 -->
          <div class="swiper-pagination"></div>
    </div>
    <!-- 首页菜单 -->
    <div class="menus">
      <ul>
        <li v-for="item in menus" :key="item.id">
          <img :src="item.pic" alt="">
          <p>{{item.name}}</p>
        </li>
      </ul>
    </div>
    <!-- 精品推荐头部 -->
    <div class="recommend">
      <h2>精品推荐</h2>
    </div>
    <!-- 推荐内容 -->
    <div class="list">
      <ul>
        <li v-for="(item, index) in listData" :key="index">
          <img :src="item.url" alt="">
          <div class="describe">
            <h3>{{item.title}}</h3>
            <p>{{item.desc}}</p>
            <div class="price">
              <p v-html="item.market"></p>
              <span>现价:</span>
              <span v-html="item.price" style="color:red;"></span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Search from './Search.vue'
import 'swiper/dist/js/swiper'
import 'swiper/dist/css/swiper.css'
import Swiper from 'swiper'
import axios from 'axios'

export default {
  name: 'Home',
  components: {
    Search
  },
  data () {
    return {
      banners: [{
        id: 1,
        pic: 'https://api.java.crmeb.net/crmebimage/public/content/2022/08/04/0f78716213f64bfa83f191d51a832cbf73f6axavoy.jpg'
      }, {
        id: 2,
        pic: 'https://api.java.crmeb.net/crmebimage/public/content/2022/10/09/d637283002694f0abd3140a6667235d9vos4hdwse4.jpg'
      }],
      menus: [],
      listData: []
    }
  },
  created () {
    // 发送请求
    axios.get('https://apif.java.crmeb.net/api/front/index').then((res) => {
      // console.log(res.data.data)
      this.menus = res.data.data.menus
    })
    var str = {"data": [{"url":"http://p0.meituan.net/scpdeal/805885a761d293db0d371a792ac148f423289.jpg","title":"蜜雪冰城","desc":"[多城市]招牌柠檬水","price":"2.99<span class=\"price-unit\">元</span>","market":"门市价:¥4"},{"url":"http://p1.meituan.net/deal/8d5f77d0b08b88ddfc7f31434e0b9c0c173511.jpg","title":"茶百道","desc":"[多城市]爆品-冷萃茶 2 选 1","price":"6.66<span class=\"price-unit\">元</span>","market":"门市价:¥8"},{"url":"http://p0.meituan.net/scpdeal/8c6c9cc6eacfdba00bc05c30a07d35b1135145.jpg","title":"甜啦啦","desc":"[多城市]酸奶冰淇淋","price":"1.66<span class=\"price-unit\">元</span>","market":"门市价:¥3"},{"url":"http://p0.meituan.net/deal/1ef13b6262c3eaf3c42127ed7fc61a01130193.jpg","title":"华莱士·全鸡汉堡","desc":"[多城市]双堡炸鸡桶","price":"40.8<span class=\"price-unit\">元</span>","market":"门市价:¥75"},{"url":"http://p0.meituan.net/deal/80f44c1eec7544dc77aa52fca780295c152320.jpg","title":"贤合庄卤味火锅","desc":"[火车站/二七广场]春意盎然特惠双人餐","price":"108<span class=\"price-unit\">元</span>","market":"门市价:¥182"},{"url":"http://p0.meituan.net/deal/45329ac7e451661339c5ad8ec507051e21604.jpg","title":"格瑞欧海鲜自助烤肉火锅","desc":"[大上海城]全天自助套餐","price":"64.9<span class=\"price-unit\">元</span>","market":"门市价:¥89"},{"url":"http://p0.meituan.net/deal/487a67380a713035280db6d77ba27508117285.jpg","title":"喜姐炸串","desc":"[多城市]脆皮水磨年糕","price":"2<span class=\"price-unit\">元</span>","market":"门市价:¥2.5"},{"url":"http://p0.meituan.net/scpdeal/edb891b1d77562a92517a7bd3625f52a208310.jpg","title":"豪客来牛排","desc":"[多城市]铁板奥尔良鸡排饭","price":"22.9<span class=\"price-unit\">元</span>","market":"门市价:¥36"},{"url":"http://p0.meituan.net/deal/9e10da144275a98d11f199cc74109b7c4046637.png","title":"潮掌门鸭恋虾特色火锅","desc":"[2店通用]豪华螺狮鸭爪爪 2-3 人餐","price":"69.9<span class=\"price-unit\">元</span>","market":"门市价:¥259"},{"url":"http://p1.meituan.net/deal/86ce67b09ef7c50dc4b7f45c2e7a2fda28765.jpg","title":"小龙坎火锅","desc":"[火车站/二七广场]招牌双人餐","price":"115<span class=\"price-unit\">元</span>","market":"门市价:¥210"},{"url":"http://p1.meituan.net/deal/058e66cec06c94faf72e1c03873e06f271202.jpg","title":"项师傅炸鸡汉堡","desc":"[丰业广场/千盛广场]香脆双鸡堡3个","price":"9.6<span class=\"price-unit\">元</span>","market":"门市价:¥15"},{"url":"http://p1.meituan.net/deal/2e9bb2fb71d7b54e0644b111c4d21ea1171289.jpg","title":"胡涂老串串牛油火锅","desc":"[3店通用]五折超值双人餐","price":"99<span class=\"price-unit\">元</span>","market":"门市价:¥159"},{"url":"http://p1.meituan.net/deal/90ed06b6232c76f4bffde4f69a6a80611753811.png","title":"蓉狮叔·川派肥肠鸡·沸腾毛肚鱼","desc":"[火车站/二七广场]招牌肥肠双人餐","price":"39.9<span class=\"price-unit\">元</span>","market":"门市价:¥146"},{"url":"http://p0.meituan.net/deal/b1cf0521bdf7fb03cfa15d340137f3c0175147.jpg","title":"孔一锅牛杂煲","desc":"[12店通用]孔一锅牛杂煲双人餐","price":"98<span class=\"price-unit\">元</span>","market":"门市价:¥127"},{"url":"http://p1.meituan.net/deal/b0ca58eac5408651f5e85f75136cbcb9235598.jpg","title":"地锅根据地","desc":"[西大街]2-3 人餐","price":"88<span class=\"price-unit\">元</span>","market":"门市价:¥146"},{"url":"http://p0.meituan.net/deal/e3e81a5a61d8006fb6833203ea5df29b89955.jpg","title":"王婆大虾·酸菜鱼","desc":"[火车站/二七广场]香辣虾•羊蝎子 1-2 人体验餐","price":"39.9<span class=\"price-unit\">元</span>","market":"门市价:¥75"},{"url":"http://p0.meituan.net/deal/564ef3a5c7346baa79fc0f1a3f1c75f223839.jpg","title":"汉堡王","desc":"[多城市]【双人餐】皇堡+双层脆鸡堡+王道嫩香鸡块+薯霸王（小）+可口可乐（中）*2\n_10614_汉堡王","price":"43.83<span class=\"price-unit\">元</span>","market":"门市价:¥87"},{"url":"http://p1.meituan.net/deal/431f34b691c92d5a6fa5b577f7463bc598390.jpg","title":"全羊鲜汤饸饹面","desc":"[惠济区]饸饹面","price":"8.8<span class=\"price-unit\">元</span>","market":"门市价:¥12"}]}
    this.listData = str.data
  },
  mounted (){
      new Swiper('.swiper-container', {
        autoplay: { //自动开始
          delay: 2500, //时间间隔
          disableOnInteraction: false //*手动操作轮播图后不会暂停*
        },
        loop: true, // 循环模式选项
          // 如果需要分页器
        pagination: {
          el: '.swiper-pagination',
          clickable: false // 分页器可以点击
        }
      })
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
html {
  font-size: 4.26667vw;
}
.Home {
  position: relative;
}
  .swiper-wrapper img {
    display: block;
    width: 100%;
    height: 10.625rem;
  }
  li {
    list-style: none;
  }

  /* 首页菜单 */
  .menus {
    margin-top: 0.9375rem;
  }
  .menus ul {
    display: flex;
    flex-wrap: wrap;
  }
  .menus li {
    width: 20%;
  }
  .menus img {
    width: 3.75rem;
  }

  /* 精品推荐头部 */
  .recommend {
    position: relative;
    margin-top: .625rem;
    height: 2.5rem;
    border: .125rem solid green;
    border-left: 0;
    border-right: 0;
  }
  .recommend h2 {
    position: absolute;
    left: 2.5rem;
    line-height: 2.5rem;
  }
  .recommend h2:before {
    position: absolute;
    left: -1.875rem;
    top: .25rem;
    content: '';
    display: block;
    margin-left: .625rem;
    width: .3125rem;
    height: 1.875rem;
    background-color: green;
  }

  /* 推荐列表 */
  .list {
    margin-top: 1.25rem;
  }
  .list li {
    display: flex;
    margin: .625rem;
    padding: .625rem;
    background-color: rgba(239, 242, 233, 0.767);
    border-radius: .625rem;
  }
  .list .price {
    margin-top: .625rem;
    border: 2px solid orange;
    border-left: 0;
  }
  .list img {
    width: 65%;
  }
  .describe {
    text-align: center;
  }
</style>
