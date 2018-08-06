<template>
  <div id="home">
    <header class="index-header">
      <ul>
        <li>
          <img src="../assets/images/rexiao.png" alt="">
          <p>热销榜</p>
        </li>
        <li>
          <img src="../assets/images/caidan.png" alt="">
          <p>点过的菜</p>
        </li>
        <li>
          <img src="../assets/images/sousuo.png" alt="">
          <p>搜你喜欢</p>
        </li>
      </ul>
    </header>
    <aside class="left-cate">
      <ul>
        <li
          v-for="(item, key) in list"
          :key="item._id"
          @click="changeList(key)"
        >{{item.title}}</li>
      </ul>
      <div class="nav-cate">
        <img src="../assets/images/nav.png" alt="">
        <p>菜单</p>
      </div>
    </aside>
    <div class="content">
      <div
        class="item"
        v-for="item in list"
        :key="item._id"
      >
        <h3 class="item-cate">{{item.title}}</h3>
        <ul class="item-list">
          <li
            v-for="dish in item.list"
            :key="dish._id"
          >
            <div class="wrap">
              <router-link :to="'/particulars?id=' + dish._id">
                <img :src="api + dish.img_url" alt="">
                <p class="title">{{dish.title}}</p>
                <p class="price">{{dish.price}}</p>
              </router-link>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="bg"></div>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import NavFooter from './public/NavFooter'
import Config from '../model/config'
export default {
  mounted () {
    this.asideDomInit()
    this.requestData()
  },
  data () {
    return {
      list: [],
      api: Config.api
    }
  },
  components: {
    NavFooter
  },
  methods: {
    asideDomInit () {
      var leftCate = document.getElementsByClassName('left-cate')[0]
      var navCate = document.getElementsByClassName('nav-cate')[0]
      var bg = document.getElementsByClassName('bg')[0]
      var flag = true
      bg.onclick = navCate.onclick = function () {
        if (flag) {
          flag = false
          leftCate.style.transform = 'translate(0, 0)'
          bg.style.display = 'block'
        } else {
          flag = true
          leftCate.style.transform = 'translate(-100%, 0)'
          bg.style.display = 'none'
        }
      }
    },
    requestData () {
      var api = this.api + 'api/productlist'
      // 注意这里的this指向，箭头函数里的this指向继承自父元素
      this.$http.get(api).then(response => {
        this.list = response.body.result
      }, response => {
      })
    },
    changeList (key) {
      // 点击侧边栏item时获取相应下标，对应右边同下标分类title
      // 使右边对应内容距离页面顶部距离等于滚动条滚动距离即可
      var itemCates = document.querySelectorAll('.item-cate')
      document.documentElement.scrollTop = itemCates[key].offsetTop
      // 正确显示右边对应分类后，背景层和侧边栏隐藏
      var leftCate = document.getElementsByClassName('left-cate')[0]
      var bg = document.getElementsByClassName('bg')[0]
      leftCate.style.transform = 'translate(-100%, 0)'
      bg.style.display = 'none'
    }
  }
}
</script>

<style scoped lang="scss">
.index-header {
  width: 96%;
  height: 4.4rem;
  margin: 1rem auto 0;
  background: #fff;
  border-radius: .5rem;
  ul {
    display: flex;
    text-align: center;
    li {
      flex: 1;
      padding-top: .3rem;
      border-right: 1px solid #eee;
      &:last-child {
        border-right: none;
      }
      img {
        width: 2rem;
        height: 2rem;
        margin: 0 auto;
      }
    }
  }
}

aside.left-cate {
  z-index: 2;
  position: fixed;
  top: 0;
  left: 0;
  width: 6rem;
  height: 100%;
  background: #eee;
  transition: all .5s;
  transform: translate(-100%, 0);
  ul {
    z-index: 3;
    position: absolute;
    height: 100%;
    padding: .5rem;
    background: #eee;
    li {
      line-height: 4.4rem;
    }
  }
  .nav-cate {
    z-index: 2;
    position: absolute;
    top: 42%;
    right: -3.5rem;
    width: 5rem;
    height: 4rem;
    background: rgba(132, 128, 128, 0.9);
    border-radius: 0 50% 50% 0;
    text-align: center;
    img {
      width: 1.8rem;
      height: 1.8rem;
      margin: .4rem 0 0 1rem;
    }
    p {
      margin: -.3rem 0 0 1rem;
      color: #fff;
    }
  }
}

.content .item {
  .item-cate {
    padding: .5rem;
    text-align: center;
  }
  .item-list {
    display: flex;
    flex-wrap: wrap;
    padding: 0 .5rem;
    li {
      box-sizing: border-box;
      width: 33.3%;
      padding: .5rem;
      .wrap {
        width: 100%;
        background: #fff;
        border-radius: .5rem;
        overflow: hidden;
        img {
          width: 100%;
        }
        p {
          padding: .2rem .5rem;
        }
        p.title {
          font-weight: bold;
        }
      }
    }
  }
}

.bg {
  z-index: 1;
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(132, 128, 128, 0.4);
}

.footer-nav {
  position: fixed;
  bottom: .5rem;
  left: .5rem;
  width: 4.4rem;
  height: 4.4rem;
  text-align: center;
  color: #fff;
  background: #000;
  border-radius: 50%;
  img {
    width: 1.8rem;
    height: 1.8rem;
    margin-top: .5rem;
  }
  p {
    position: relative;
    bottom: .2rem;
  }
}

.footer-cart {
  position: fixed;
  bottom: .5rem;
  right: .5rem;
  width: 4.4rem;
  height: 4.4rem;
  text-align: center;
  color: #fff;
  background: #b30000;
  border-radius: 50%;
  img {
    width: 1.8rem;
    height: 1.8rem;
    margin-top: .5rem;
  }
  p {
    position: relative;
    bottom: .2rem;
  }
}

.footer-nav-show {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, .6);
  .list {
    li {
      position: absolute;
      left: .5rem;
      width: 4.4rem;
      height: 4.4rem;
      text-align: center;
      color: #fff;
      background: #000;
      border-radius: 50%;
      img {
        width: 1.8rem;
        height: 1.8rem;
        margin-top: .5rem;
      }
      p {
        position: relative;
        bottom: .2rem;
      }
      &:nth-child(1){
        left: 0;
        bottom: 15.4rem;
      }
      &:nth-child(2){
        left: 30%;
        bottom: 12.4rem;
        margin-left: -2.2rem;
      }
      &:nth-child(3){
        left: 45%;
        bottom: 7.4rem;
        margin-left: -2.2rem;
      }

      &:nth-child(4){
        left: 50%;
        bottom: .5rem;
        margin-left: -2.2rem;
      }
      &:nth-child(5){
        left: .5rem;
        bottom: .5rem;
      }
    }
  }
}
</style>
