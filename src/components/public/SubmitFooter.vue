<template>
  <div
    class="footer-submit"
  >
    <img src="../../assets/images/doorder.png" alt="">
    <p>下单</p>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped lang="scss">
.footer-submit {
  position: fixed;
  bottom: .5rem;
  right: .5rem;
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
</style>
