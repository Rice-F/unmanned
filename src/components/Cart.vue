<template>
    <div id="cart">
      <div class="cart-content">
        <div
          class="cart-info"
        >
          <h2>购物车</h2>
          <!-- 用餐人数及备注 -->
          <div
            class="diner-remark"
            v-if="orderInfos.p_num"
          >
            <div class="left">
              <p>用餐人数：{{orderInfos.p_num}}</p>
              <p>
                备注：
                <span v-if="orderInfos.p_mark">{{orderInfos.p_mark}}</span>
                <span v-if="!orderInfos.p_mark">无</span>
              </p>
            </div>
            <div class="right">
              <router-link to="/editorderinfo">
                <img src="../assets/images/edit.png" alt="">
                <p>修改</p>
              </router-link>
            </div>
          </div>
          <!-- 菜品数量及总价 -->
          <div
            class="dishes-price"
            v-if="totalNum"
          >
            <p>购物车中一共有{{totalNum}}个菜</p>
            <p>合计：<span class="price">￥{{totalPrice}}</span></p>
          </div>
        </div>
        <!-- 已点菜品列表 -->
        <ul
          class="cart-list"
          v-if="totalNum"
        >
          <li
            v-for="(item,key) in list"
            :key="item._id"
          >
            <div class="left-food">
              <img v-if="item.img_url" :src="api + item.img_url" alt="">
              <img v-else :src="api + item.imgUrl" alt="">
              <div class="food-info">
                <p>{{item.title}}</p>
                <p class="price">￥{{item.price}}</p>
              </div>
            </div>
            <div class="right-amount">
              <div
                class="input-minus"
                @click="minusNum(item,key)"
              >-</div>
              <input
                class="input-amount"
                v-model="item.num"
              >
              <div
                class="input-plus"
                @click="plusNum(item)"
              >+</div>
            </div>
          </li>
        </ul>
      </div>
      <div class="hot-food">
        <h3>本店顾客最常点的菜</h3>
        <div class="listbox">
          <ul class="item-list">
            <li>
              <div class="wrap">
                <img src="../assets/images/1.jpg" alt="">
                <p class="title">大蒜腊肉</p>
                <p class="price">¥26</p>
              </div>
            </li>
            <li>
              <div class="wrap">
                <img src="../assets/images/1.jpg" alt="">
                <p class="title">大蒜腊肉</p>
                <p class="price">¥26</p>
              </div>
            </li>
            <li>
              <div class="wrap">
                <img src="../assets/images/1.jpg" alt="">
                <p class="title">大蒜腊肉</p>
                <p class="price">¥26</p>
              </div>
            </li>
            <li>
              <div class="wrap">
                <img src="../assets/images/1.jpg" alt="">
                <p class="title">大蒜腊肉</p>
                <p class="price">¥26</p>
              </div>
            </li>
            <li>
              <div class="wrap">
                <img src="../assets/images/1.jpg" alt="">
                <p class="title">大蒜腊肉</p>
                <p class="price">¥26</p>
              </div>
            </li>
            <li>
              <div class="wrap">
                <img src="../assets/images/1.jpg" alt="">
                <p class="title">大蒜腊肉</p>
                <p class="price">¥26</p>
              </div>
            </li>
            <li>
              <div class="wrap">
                <img src="../assets/images/1.jpg" alt="">
                <p class="title">大蒜腊肉</p>
                <p class="price">¥26</p>
              </div>
            </li>
            <li>
              <div class="wrap">
                <img src="../assets/images/1.jpg" alt="">
                <p class="title">大蒜腊肉</p>
                <p class="price">¥26</p>
              </div>
            </li>
            <li>
              <div class="wrap">
                <img src="../assets/images/1.jpg" alt="">
                <p class="title">大蒜腊肉</p>
                <p class="price">¥26</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div
        class="no-cartList"
        v-if="!totalNum"
      >您的购物车空空的，点击菜单开始点菜吧！</div>
      <div
        class="footer-submit"
        @click="subOrder()"
      >
        <img src="../assets/images/doorder.png" alt="">
        <p>下单</p>
      </div>
      <nav-footer></nav-footer>
      <menu-footer></menu-footer>
    </div>
</template>

<script>
import NavFooter from './public/NavFooter'
import Config from '../model/config'
import MenuFooter from './public/MenuFooter'
import storage from '../model/storage'

export default {
  mounted () {
    this.getCartData()
    this.getOrderInfo()
  },
  data () {
    return {
      api: Config.api,
      list: [],
      totalPrice: 0,
      totalNum: 0,
      orderInfos: []
    }
  },
  components: {
    NavFooter,
    MenuFooter
  },
  methods: {
    // 获取用户点单的菜品 显示在购物车页面
    getCartData () {
      let uid = storage.get('roomId')
      const api = this.api + 'api/cartlist?uid=' + uid
      this.$http.get(api).then((response) => {
        this.list = response.body.result
        this.getTotalResult()
      }, (err) => {
        console.log(err)
      })
    },
    minusNum (item, key) {
      // 本地数量改变后，同时修改服务器数据
      let productId = item.product_id
      let num = item.num
      let uid = storage.get('roomId')
      const api = this.api + 'api/decCart?uid=' + uid + '&product_id=' + productId + '&num=' + num
      this.$http.get(api).then((response) => {
        // 用户点击-后，客户端向服务端emit addCart
        this.$socket.emit('addcart', 'added')
        this.getTotalResult()
      }, (err) => {
        console.log(err)
      })
      if (item.num === 1) {
        this.list.splice(key, 1)
      } else {
        --item.num
      }
    },
    plusNum (item) {
      // 本地数量改变后，同时修改服务器数据
      let productId = item.product_id
      let num = item.num
      let uid = storage.get('roomId')
      let api = this.api + 'api/incCart?uid=' + uid + '&product_id=' + productId + '&num=' + num
      this.$http.get(api).then((response) => {
        // 用户点击加入购物车后，客户端向服务端emit addCart
        this.$socket.emit('addcart', 'added')
        this.getTotalResult()
      }, (err) => {
        console.log(err)
      })
      ++item.num
    },
    getTotalResult () {
      // 获取菜单总数量以及总价格
      let totalPrice = 0
      let totalNum = 0
      for (let i = 0; i < this.list.length; i++) {
        // 遍历已选菜单，用菜品单价*数量获取总价
        totalPrice += parseFloat(this.list[i].price * this.list[i].num)
        // 累加各菜品数量获取总数量
        totalNum += this.list[i].num
      }
      this.totalPrice = totalPrice
      this.totalNum = totalNum
    },
    getOrderInfo () {
      // 获取订单信息，人数、备注等
      let uid = storage.get('roomId')
      let api = this.api + 'api/peopleInfoList?uid=' + uid
      this.$http.get(api).then((response) => {
        this.orderInfos = response.body.result[0]
      }, (err) => {
        console.log(err)
      })
    },
    subOrder () {
      // 下单，提交桌号、人数、备注、总价及总数
      let uid = storage.get('roomId')
      let num = this.orderInfos.p_num
      let remark = this.orderInfos.p_mark
      let totalPrice = this.totalPrice
      let totalNum = this.totalNum
      // 把数组转换成字符串传给服务器
      let list = JSON.stringify(this.list)

      // 将cart页面数据post给服务器
      let api = this.api + 'api/addOrder'
      this.$http.post(api, {
        uid,
        p_num: num,
        p_mark: remark,
        total_price: totalPrice,
        total_num: totalNum,
        order: list
      }).then((response) => {
        if (response.body.success) {
          this.$router.push({path: 'order'})
        } else {
          alert('提交数据有误！')
        }
      }, (err) => {
        console.log(err)
      })
    }
  },
  sockets: {
    addcart () {
      // 更新购物车数据
      this.getCartData()
    }
  }
}
</script>

<style scoped lang="scss">
.cart-content {
  padding: 1rem;
  .cart-info {
    padding: .5rem;
    border-radius: .5rem;
    background: #fff;
    h2 {
      padding: .8rem 0;
      text-align: center;
      border-bottom: 1px solid #eee;
    }
    .diner-remark {
      display: flex;
      padding: .5rem 0;
      border-bottom: 1px solid #eee;
      .left {
        flex: 1;
        p {
          line-height: 2;
          &:first-child {
            color: #b30000;
          }
        }
      }
      .right {
        width: 4rem;
        text-align: center;
        a {
          color: #555;
          img {
            width: 1.8rem;
            height: 1.8rem;
          }
        }
      }
    }
    .dishes-price {
      padding: .5rem 0;
      border-bottom: 1px solid #eee;
      p {
        line-height: 2;
        .price {
          font-size: 2.4rem;
          color: #b30000;
        }
      }
    }
  }

  .cart-list {
    margin-top: 1rem;
    padding: .5rem;
    background: #fff;
    border-radius: .5rem;
    li {
      display: flex;
      padding: 1rem 0;
      border-bottom: 1px solid #eee;
      .left-food {
        display: flex;
        flex: 1;
        img {
          width: 4rem;
          height: 4rem;
          margin-right: .8rem;
          border-radius: .5rem;
        }
      }
      .right-amount {
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
  }
  .prompt {
    text-align: center;
    line-height: 3;
    h3 {
      font-size: 1.8rem;
    }
  }
}
.hot-food {
  margin: 1rem 0 4rem;
  padding: .5rem;
  border-radius: .5rem;
  background: #fff;
  h3 {
    margin-bottom: .5rem;
    font-size: 1.4rem;
  }
  .listbox {
    width: 100%;
    overflow-x: auto;
    .item-list {
      width: 80rem;
      li {
        float: left;
        box-sizing: border-box;
        width: 8rem;
        padding: .5rem;
        .wrap {
          width: 100%;
          background: #fff;
          border-radius: .5rem;
          overflow: hidden;
          img {
            width: 100%;
          }
        }
      }
    }
  }
}
.no-cartList {
  line-height: 3;
  text-align: center;
}
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
