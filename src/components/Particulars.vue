<template>
    <div id="particulars">
      <router-link to="/home">
        <div class="back">返回</div>
      </router-link>
      <div class="p-content">
        <div class="p-info">
          <img :src="imgUrl" alt="">
          <h2>{{list.title}}</h2>
          <p class="price">{{list.price}}/份</p>
        </div>
        <div class="p-detial">
          <h3>商品详情</h3>
          <div
            class="p-detail-content"
            v-html="list.content"
          >
          </div>
        </div>
        <footer class="p-footer">
          <div class="cart">
            <strong>数量:</strong>
            <div class="cart-num">
              <div
                class="input-minus"
                @click="minusNum()"
              >-</div>
              <input
                class="input-amount"
                v-model="num"
              >
              <div
                class="input-plus"
                @click="plusNum()"
              >+</div>
            </div>
          </div>
          <button
            class="addcart"
            @click="addCart()"
          >加入购物车</button>
        </footer>
      </div>
    </div>
</template>

<script>
import Config from '../model/config'
import storage from '../model/storage'

export default {
  mounted () {
    // get传值
    // 动态路由获取传过来的id
    let id = this.$route.query.id
    this.requestData(id)
  },
  data () {
    return {
      api: Config.api,
      list: [],
      num: 1,
      imgUrl: ''
    }
  },
  methods: {
    requestData (id) {
      // 获取菜品详情
      const api = this.api + 'api/productcontent?id=' + id
      this.$http.get(api).then((response) => {
        this.list = response.body.result[0]
        this.imgUrl = this.api + this.list.img_url
      }, (err) => {
        console.log(err)
      })
    },
    minusNum () {
      if (this.num > 1) {
        --this.num
      }
    },
    plusNum () {
      ++this.num
    },
    addCart () {
      // 将桌号、菜品名称、价格、数量、菜品id及对应图片post
      let uid = storage.get('roomId')
      const api = this.api + 'api/addcart'
      this.$http.post(api, {
        uid: uid,
        title: this.list.title,
        price: this.list.price,
        num: this.num,
        product_id: this.list._id,
        img_url: this.list.img_url
      }).then((response) => {
        // 用户点击加入购物车后，客户端向服务端emit addCart
        this.$socket.emit('addcart', 'added')
        if (response.body.success) {
          this.$router.push({path: 'home'})
        }
      }, (err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped lang="scss">
.back {
  position: fixed;
  left: .5rem;
  top: .5rem;
  width: 3.8rem;
  height: 3.8rem;
  line-height: 3.8rem;
  border-radius: 50%;
  background: #000;
  color: #fff;
  text-align: center;
  &:before {
    position: relative;         /*这里换成absolute无效*/
    left: .6rem;
    top: 1.4rem;
    float: left;                /*想不通，左浮动之后就和“返回”之间有正常间距了？*/
    display: block;
    content: '';
    width: .8rem;
    height: .8rem;
    border-left: .2rem solid #fff;
    border-bottom:  .2rem solid #fff;
    transform: rotate(45deg);
  }
}
.p-content {
  .p-info {
    background: #fff;
    img {
      width: 100%;
      height: 18rem;
    }
    h2 {
      padding: .2rem .5rem;
    }
    .price {
      padding: .2rem .5rem;
      color: #b30000;
    }
  }
  .p-detial {
    margin-top: 1rem;
    background: #fff;
    h3 {
      padding: .5rem;
    }
    .p-detail-content {
      padding: 1rem;
      img {
        display: block;
        max-width: 100%;
        margin: 0 auto;
      }
      * {
        line-height: 1.5;
        color: #666;
      }
    }
  }
}

.p-footer {
  position: fixed;
  right: 0;
  left: 0;
  bottom: 0;
  height: 4.4rem;
  line-height: 4.4rem;
  border: 1px solid #eee;
  background: #fff;
  .cart {
    float: left;
    display: flex;
    strong {
      flex: 1;
      padding: 0 .5rem;
      font-size: 1.6rem;
    }
    .cart-num {
      display: flex;
      width: 10rem;
      margin-top: .8rem;
      .input-minus,
      .input-plus {
        flex: 1;
        width: 2.8rem;
        height: 2.8rem;
        line-height: 2.8rem;
        border: 1px solid #eee;
        color: #b30000;
        font-size: 2.4rem;
        text-align: center;
      }
      input {
        flex: 1;
        width: 100%;
        height: 2.8rem;
        border: none;
        border-top: 1px solid #eee;
        border-bottom: 1px solid #eee;
        text-align: center;
      }
    }
  }
  a {
    color: #fff;
  }
  .addcart {
    float: right;
    height: 3rem;
    margin: .8rem .5rem 0 0;
    padding: 0 .5rem;
    border: none;
    border-radius: .5rem;
    background: #b30000;
    color: #fff;
  }
}
</style>
