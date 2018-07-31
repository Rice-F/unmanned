<template>
    <div id="search">
      <header class="search-header">
        <input type="search" value="">
      </header>
      <ul class="item-list">
        <li>
          <img src="../assets/images/1.jpg" alt="">
          <div class="item-info">
            <h3>蛋糕奶茶</h3>
            <p class="price">￥26</p>
            <span>已售：351份</span>
          </div>
        </li>
        <li>
          <img src="../assets/images/1.jpg" alt="">
          <div class="item-info">
            <h3>蛋糕奶茶</h3>
            <p class="price">￥26</p>
            <span>已售：351份</span>
          </div>
        </li>
        <li>
          <img src="../assets/images/1.jpg" alt="">
          <div class="item-info">
            <h3>蛋糕奶茶</h3>
            <p class="price">￥26</p>
            <span>已售：351份</span>
          </div>
        </li>
        <li>
          <img src="../assets/images/1.jpg" alt="">
          <div class="item-info">
            <h3>蛋糕奶茶</h3>
            <p class="price">￥26</p>
            <span>已售：351份</span>
          </div>
        </li>
      </ul>
      <div class="footer-nav">
        <img src="../assets/images/navigation.png"/>
        <p>导航</p>
      </div>
      <div class="footer-menu">
        <img src="../assets/images/menu.png"/>
        <p>菜单</p>
      </div>
      <div class="footer-cart">
        <img src="../assets/images/cart.png"/>
        <p>购物车</p>
      </div>
    </div>
</template>

<script>
export default {
}
</script>

<style scoped lang="scss">
.search-header {
  width: 100%;
  height: 5rem;
  line-height: 5rem;
  text-align: center;
  input {
    width: 90%;
    height: 3.8rem;
    line-height: 3.8rem;
    border: 1px solid #eee;
    border-radius: .5rem;
  }
}

.item-list {
  padding: 0 .5rem;
  background: #fff;
  li {
    display: flex;
    padding: 1rem 0;
    border-bottom: 1px solid #eee;
    img {
      width: 6rem;
      height: 6rem;
    }
    .item-info {
      flex: 1;
      padding-left: 1rem;
    }
  }
}
</style>
