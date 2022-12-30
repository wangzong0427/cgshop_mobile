<template>
    <div class="Search">
        <input type="text" placeholder="游戏显卡">
        <span class="iconfont icon-guanbi"></span>
        <span class="iconfont icon-xiangji"></span>
        <span class="iconfont icon-saoyisao"></span>
        <span class="iconfont icon-24gf-ellipsisVertical"></span>
    </div>
</template>
<script>
export default {
    name: 'Search',
    data () {
        return {
            msg: '内容'
        }
    }
}
</script>
<style scoped>
.Search {
    position: relative;
    height: 2.825rem;
    background-color: #f9f9f9;
}
.Search input {
    position: absolute;
    left: 1.25rem;
    top: .375rem;
    width: 15.625rem;
    height: 1.875rem;
    border: 0;
    border-radius: 1.25rem;
    background-color: #f0f3f5;
    text-indent: 2.25rem;
    font-size: .875rem;
}
.Search .icon-guanbi {
    position: absolute;
    left: 1.875rem;
    top: .8025rem;
    font-size: 1.125rem;
}
.Search .icon-xiangji {
    position: absolute;
    top: .75rem;
    right: 7.1875rem;
    font-size: 1.25rem;
}
.Search .icon-saoyisao {
    position: absolute;
    right: 3.75rem;
    top: .625rem;
    font-size: 1.375rem;
}
.Search .icon-24gf-ellipsisVertical {
    position: absolute;
    right: .9375rem;
    top: .6875rem;
    font-size: 1.25rem;
}
</style>