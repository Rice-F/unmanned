<template>
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
</template>

<script>
export default {
  props: [
    'cartNum'
  ]
}
</script>

<style scoped lang="scss">
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
</style>
