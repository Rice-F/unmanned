<template>
  <div id="start">
    <div class="start-content">
      <header class="start-header">
        <img src="../assets/images/canju.png" alt="">修改用餐人数
      </header>
      <p class="notice">请选择正确的用餐人数</p>
      <div class="content">
        <ul class="user-list">
          <li
            v-for="item in peopleNum"
            :key="item"
            @click="addChangeEvent(item)"
            :class="{active: item == currentPeopleNum ? true : false}"
          >
            <span>{{item}}人</span>
          </li>
        </ul>
        <div class="remarks">
          <input
            type="text"
            placeholder="请输入您的口味要求、忌口等（可不填写）"
            v-model="remark"
          >
        </div>
        <ul class="remark-list">
          <li
            v-for="(item,index) in remarkInfos"
            :key="index"
            @click="addRemarks(item)"
          >
            <span>{{item.content}}</span>
          </li>
        </ul>
      </div>
    </div>
    <div
      class="confirm"
      @click="addPeopleInfo()"
    >
      <span>确定</span>
    </div>
    <div class="cancel">
      <router-link to="/cart">
        <span>取消</span>
      </router-link>
    </div>
  </div>
</template>

<script>
import Config from '../model/config'
import storage from '../model/storage'

export default {
  mounted () {
    this.getOrderInfo()
  },
  data () {
    return {
      peopleNum: 12,
      currentPeopleNum: 1,
      remark: '',
      remarkInfos: [
        {
          content: '打包'
        },
        {
          content: '微辣'
        },
        {
          content: '不要辣'
        },
        {
          content: '变态辣'
        }
      ],
      api: Config.api,
      orderInfos: []
    }
  },
  methods: {
    addChangeEvent (num) {
      // 将可选人数存在变量peopleNum里，循环可选人数在页面上
      // 当点击某个人数item时，将当前人数赋值给currentPeopleNum
      this.currentPeopleNum = num
    },
    addRemarks (remark) {
      this.remark += remark.content + ','
    },
    addPeopleInfo () {
      let api = this.api + 'api/addPeopleInfo'
      let uid = storage.get('roomId')
      this.$http.post(api, {
        uid: uid,
        p_num: this.currentPeopleNum,
        p_mark: this.remark
      }).then((response) => {
        if (response.body.success) {
          this.$router.push({path: 'cart'})
        }
      }, (err) => {
        console.log(err)
      })
    },
    getOrderInfo () {
      // 获取订单信息，人数、备注等
      let uid = storage.get('roomId')
      let api = this.api + 'api/peopleInfoList?uid=' + uid
      this.$http.get(api).then((response) => {
        this.orderInfos = response.body.result[0]
        this.currentPeopleNum = this.orderInfos.p_num
        this.remark = this.orderInfos.p_mark
      }, (err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .start-content {
    .start-header {
      width: 11rem;
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
    li.active {
      span {
        color: #fff;
        border: 1px solid #b30000;
        background: #b30000;
      }
    }
  }
  .remark-list {
    display: flex;
    padding: 0 .5rem;
    margin-top: 2rem;
    li {
      margin: 0 .5rem;
      span {
        display: block;
        padding: .2rem .5rem;
        color: #666;
        border: 1px solid #ccc;
        background: #fff;
        text-align: center;
        border-radius: .5rem;
      }
    }
    li.active {
      span {
        color: #fff;
        border: 1px solid #b30000;
        background: #b30000;
      }
    }
  }
  .remarks {
    margin: 1rem;
    input {
      width: 100%;
      height: 3rem;
      padding-left: .5rem;
      margin-left: -.4rem;
      line-height: 3rem;
      border: 1px solid #eee;
    }
  }

  .confirm {
    position: fixed;
    bottom: 5rem;
    left: 6rem;
    width: 6rem;
    height: 6rem;
    background: #b30000;
    border-radius: 50%;
    span {
      display: block;
      width: 2rem;
      line-height: 6rem;
      margin: 0 auto;
      color: #fff;
    }
  }
  .cancel {
    position: fixed;
    bottom: 5rem;
    right: 6rem;
    width: 6rem;
    height: 6rem;
    background: #b30000;
    color: #fff;
    border-radius: 50%;
    span {
      display: block;
      width: 2rem;
      line-height: 6rem;
      margin: 0 auto;
      color: #fff;
    }
  }
</style>
