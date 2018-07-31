<template>
    <div id="start">
      <div class="start-content">
        <header class="start-header">
          <img src="../assets/images/canju.png" alt="">用餐人数
        </header>
        <p class="notice">请选择正确的用餐人数 ，小二马上给你送餐具</p>
        <div class="content">
          <ul class="user-list">
            <li>
              <span>1人</span>
            </li>
            <li>
              <span>2人</span>
            </li>
            <li>
              <span>3人</span>
            </li>
            <li>
              <span>4人</span>
            </li>
            <li>
              <span>5人</span>
            </li>
            <li>
              <span>6人</span>
            </li>
            <li>
              <span>7人</span>
            </li>
            <li>
              <span>8人</span>
            </li>
            <li>
              <span>9人</span>
            </li>
            <li>
              <span>10人</span>
            </li>
            <li>
              <span>11人</span>
            </li>
            <li>
              <span>12人</span>
            </li>
          </ul>
        </div>
      </div>
      <router-link to="/home">
        <div class="start">
          <span>开始点菜</span>
        </div>
      </router-link>
    </div>
</template>

<script>
export default {
}
</script>

<style scoped lang="scss">
.start-content {
  .start-header {
    width: 10rem;
    height: 3.2rem;
    margin: 5rem auto 0;
    background: #000;
    color: #fff;
    border-radius: .5rem;
    img {
      position: relative;
      top: .5rem;
      height: 2.2rem;
      margin: 0 1rem;
    }
  }
  .notice {
    margin: 1rem 0;
    color: #b30000;
    text-align: center;
  }
}

.user-list {
  display: flex;
  flex-wrap: wrap;
  padding: .5rem;
  li {
    padding: .5rem;
    width: 25%;
    box-sizing: border-box;
    span {
      display: block;
      width: 100%;
      height: 3.2rem;
      border: 1px solid #ccc;
      background: #fff;
      line-height: 3.2rem;
      text-align: center;
      border-radius: .5rem;
    }
  }
}

.start {
  position: fixed;
  bottom: 5rem;
  left: 50%;
  margin-left: -3rem;
  width: 6rem;
  height: 6rem;
  background: #b30000;
  color: #fff;
  border-radius: 50%;
  span {
    position: relative;
    top: 1.5rem;
    display: block;
    width: 2rem;
    margin: 0 auto;
  }
}
</style>
