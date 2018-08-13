<template>
  <div class="footer-menu">
    <router-link to="/home">
      <img src="../../assets/images/menu.png"/>
      <p>菜单</p>
    </router-link>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped lang="scss">
.footer-menu {
  position: fixed;
  left: 50%;
  bottom: .5rem;
  width: 4.4rem;
  height: 4.4rem;
  margin-left: -2.2rem;
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
    color: #fff;
  }
}
</style>
