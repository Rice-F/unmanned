<template>
    <div id="footer-nav">
      <div
        class="footer-nav"
        @click="flag=!flag"
      >
        <img src="../../assets/images/navigation.png" alt="">
        <p>导航</p>
      </div>
      <div class="footer-cart">
        <router-link to="/cart">
          <img src="../../assets/images/cart.png" alt="">
          <p>购物车</p>
          <span
            class="num"
            v-if="cartNum"
          >{{cartNum}}</span>
        </router-link>
      </div>
      <div
        class="footer-nav-show"
        v-if="flag"
      >
        <ul class="list">
          <li>
            <img src="../../assets/images/menu.png"/>
            <p>菜单</p>
          </li>
          <li>
            <img src="../../assets/images/cart.png"/>
            <p>购物车</p>
          </li>
          <li>
            <img src="../../assets/images/order.png"/>
            <p>我的订单</p>
          </li>
          <li>
            <img src="../../assets/images/wallet.png"/>
            <p>结账</p>
          </li>
          <li @click="flag=!flag">
            <img src="../../assets/images/close.png"/>
            <p>返回</p>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      flag: false
    }
  },
  props: [
    'cartNum'
  ]
}
</script>

<style scoped lang="scss">
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
    color: #fff;
  }
  .num {
    position: absolute;
    top: -.5rem;
    right: -.5rem;
    display: inline-block;
    width: 2rem;
    height: 2rem;
    line-height: 2rem;
    text-align: center;
    color: #fff;
    background: #b30000;
    border-radius: 50%;

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
      &:nth-child(1) {
        left: 0;
        bottom: 15.4rem;
      }
      &:nth-child(2) {
        left: 30%;
        bottom: 12.4rem;
        margin-left: -2.2rem;
      }
      &:nth-child(3) {
        left: 45%;
        bottom: 7.4rem;
        margin-left: -2.2rem;
      }

      &:nth-child(4) {
        left: 50%;
        bottom: .5rem;
        margin-left: -2.2rem;
      }
      &:nth-child(5) {
        left: .5rem;
        bottom: .5rem;
      }
    }
  }
}
</style>
