<template>
    <div id="order">
      <div class="order-content">
        <div class="order-info">
          <div class="order-receive">
            <img src="../assets/images/timer.png" alt="">
            <div class="receive-info">
              <h2>{{list.uid}}号桌门店接单</h2>
              <p>请及时联系服务员确认菜品信息！</p>
            </div>
          </div>
          <h3>已点菜品{{list.total_num}}份，合计：<span>{{list.total_price}}元</span></h3>
        </div>
        <div class="order-list">
          <h3>菜品详情</h3>
          <ul class="items">
            <li
              v-for="item in list.items"
              :key="item._id"
            >
              <div class="item">{{item.title}}/{{item.status}}</div>
              <div class="amount">{{item.num}}份</div>
              <div class="price">{{item.price}}元</div>
            </li>
          </ul>
        </div>
      </div>
      <div
        class="footer-pay"
        @click="doPay()"
      >
        <p>立即支付</p>
      </div>
      <nav-footer></nav-footer>
      <menu-footer></menu-footer>
    </div>
</template>

<script>
import NavFooter from './public/NavFooter'
import MenuFooter from './public/MenuFooter'
import Config from '../model/config'
import storage from '../model/storage'

export default {
  mounted () {
    this.getOrder()
  },
  data () {
    return {
      api: Config.api,
      list: []
    }
  },
  components: {
    NavFooter,
    MenuFooter
  },
  methods: {
    getOrder () {
      let uid = storage.get('roomId')
      let api = this.api + 'api/getOrder?uid=' + uid

      this.$http.get(api).then((response) => {
        this.list = response.body.result[0]
      }, (err) => {
        console.log(err)
      })
    },
    doPay () {
      // 立即支付
      let that = this
      let uid = storage.get('roomId')
      let api = this.api + 'api/doPay'
      this.$http.post(api, {
        uid,
        toal_price: that.list.total_price,
        order_id: that.list.order_id,
        return_url: 'http://localhost:8080/#/success'
      }).then((response) => {
        console.log(response)
        location.href = response.body.result.data
      }, (err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped lang="scss">
.order-content {
  padding: 1rem;
  .order-info {
    background: #fff;
    border-radius: .5rem;
    .order-receive {
      display: flex;
      img {
        width: 5.6rem;
        height: 5.6rem;
      }
      .receive-info {
        flex: 1;
        padding-top: .5rem;
      }
    }
    h3 {
      line-height: 2;
      padding: .5rem;
      span {
        font-size: 2rem;
        color: #b30000;
      }
    }
  }
  .order-list {
    margin-top: 1rem;
    padding: .5rem;
    background: #fff;
    border-radius: .5rem;
    h3 {
      line-height: 2;
    }
    .items {
      li {
        display: flex;
        line-height: 2;
        padding: .5rem 0;
        .item {
          flex: 2;
        }
        .amount {
          flex: 1;
          text-align: center;
        }
        .price {
          flex: 1;
          text-align: center;
        }
      }
    }
  }

  .pay-info {
    background: #fff;
    border-radius: .5rem;
    h3 {
      padding: 2rem 0 .5rem 0;
      font-size: 2rem;
      text-align: center;

    }
    .pay-detail {
      display: flex;
      padding: .5rem;
      line-height: 2;
      border-bottom: 1px solid #eee;
      .t-num,
      .p-num,
      .order-time {
        flex: 1;
      }
    }
    .pay-price {
      display: flex;
      margin: 1rem 0;
      padding: .5rem .5rem 1rem;
      line-height: 2;
      p {
        flex: 1;
        span {
          font-size: 2rem;
          color: #b30000;
        }
      }
      .pay-btn {
        position: relative;
        top: .5rem;
        width: 10rem;
        height: 2.6rem;
        line-height: 2.6rem;
        background: #b30000;
        text-align: center;
        color: #fff;
        border-radius: .5rem;
      }
    }
  }
}
.footer-pay {
  position: fixed;
  bottom: .5rem;
  right: .5rem;
  width: 4.4rem;
  height: 4.4rem;
  margin-left: -2.2rem;
  text-align: center;
  color: #fff;
  background: #b30000;
  border-radius: 50%;
  p {
    position: relative;
    line-height: 4.4rem;
    color: #fff;
  }
}
</style>
