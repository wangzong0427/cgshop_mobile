<template>
  <div class="Classify">
    <Search></Search>
    <!-- 分类列表 -->
    <div class="list">
      <div class="left">
        <ul>
          <li v-for="item in listdata" :key="item.id" data-id="item.id" @click="getId(item.id)"
          :id='picId === item.id ? "action" : ""'>{{item.name}}</li>
        </ul>
      </div>
      <div class="right">右</div>
    </div>
  </div>
</template>

<script>
// 引入搜索框
import Search from './Search.vue'
export default {
    name: "Classify",
    data () {
        return {
            listdata: [
              {
              id: 1,
              name: '推荐分类'
            },
            {
              id: 2,
              name: '京东超市'
            },
            {
              id: 3,
              name: '男装'
            },
            {
              id: 4,
              name: '奢侈品'
            },
            {
              id: 6,
              name: '女装'
            },
            {
              id: 7,
              name: '鞋靴'
            },
            {
              id: 8,
              name: '内衣配饰'
            },
            {
              id: 9,
              name: '箱包'
            },
            {
              id: 10,
              name: '美妆护肤'
            },
            {
              id: 11,
              name: '个护清洁'
            },
            {
              id: 12,
              name: '钟表珠宝'
            },
            {
              id: 13,
              name: '手机'
            },
            {
              id: 14,
              name: '数码'
            },
            {
              id: 15,
              name: '电脑办公'
            },
            {
              id: 16,
              name: '家电'
            },
            {
              id: 17,
              name: '生鲜'
            }
          ],
          picId: null
        }
    },
    // 定义子组件
    components: {
      Search
    },
    methods: {
      getId(id) {
        this.picId = id
        console.log(this.picId);
      }
    }
}

</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.list {
  display: flex;
  height: 600px;
  justify-content: space-between;
  background-color: #f5f5f5;
  overflow: hidden;
}
.left {
  margin-bottom: 25px;
  margin-right: -15px;
  overflow: auto;
}
/* 隐藏滚动条 */
.list ::-webkit-scrollbar{
  display:none;
}
.list {
  border-top: .125rem solid #ebebeb;
}
.list li {
  width: 85px;
  height: 46px;
  list-style: none;
  line-height: 46px;
  background-color: #f8f8f8;
}
#action {
  background-color: #ffffff;
}
</style>
