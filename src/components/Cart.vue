<template>
    <div id="cart">
      <div class="cart-content">
        <div class="cart-info">
          <h2>购物车</h2>
          <div class="diner-remark">
            <div class="left">
              <p>用餐人数：2人</p>
              <p>备注：无</p>
            </div>
            <div class="right">
              <img src="../assets/images/edit.png" alt="">
              <p>修改</p>
            </div>
          </div>
          <div class="dishes-price">
            <p>购物车中一共有6个菜</p>
            <p>合计：<span class="price">￥58</span></p>
          </div>
        </div>
        <ul class="cart-list">
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
      </div>
      <nav-footer></nav-footer>
      <div class="footer-menu">
        <img src="../assets/images/menu.png"/>
        <p>菜单</p>
      </div>
    </div>
</template>

<script>
import NavFooter from './public/NavFooter'
import Config from '../model/config'
export default {
  mounted () {
    this.getCartData()
  },
  data () {
    return {
      api: Config.api,
      list: []
    }
  },
  components: {
    NavFooter
  },
  methods: {
    getCartData () {
      var api = this.api + 'api/cartlist?uid=a0b0'
      this.$http.get(api).then((response) => {
        this.list = response.body.result
      }, (err) => {
        console.log(err)
      })
    },
    minusNum (item, key) {
      // 本地数量改变后，同时修改服务器数据
      var productId = item.productId
      var num = item.num
      var api = this.api + 'api/decCart?uid=a0b0&productId=' + productId + '&num=' + num
      this.$http.get(api).then((response) => {
        console.log(response)
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
      var productId = item._
      var num = item.num
      var api = this.api + 'api/incCart?uid=a0b0&productId=' + productId + '&num=' + num
      this.$http.get(api).then((response) => {
        console.log(response)
      }, (err) => {
        console.log(err)
      })
      ++item.num
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
        img {
          width: 1.8rem;
          height: 1.8rem;

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

  .prompt {
    text-align: center;
    line-height: 3;
    h3 {
      font-size: 1.8rem;
    }
  }
}
</style>
