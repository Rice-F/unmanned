<template>
    <div id="start">
      <!--<div-->
        <!--class="load"-->
        <!--v-show="!showLoading"-->
      <!--&gt;loading...</div>-->
      <div class="start-content">
        <header class="start-header">
          <img src="../assets/images/canju.png" alt="">用餐人数
        </header>
        <p class="notice">请选择正确的用餐人数 ，小二马上给你送餐具</p>
        <div class="content">
          <!-- 用餐人数 -->
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
          <!-- 备注信息文本框 -->
          <div class="remarks">
            <input
              type="text"
              placeholder="请输入您的口味要求、忌口等（可不填写）"
              v-model="remark"
            >
          </div>
          <!-- 可选备注信息 -->
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
        class="start"
        @click="addPeopleInfo()"
      >
        <span>开始点菜</span>
      </div>
    </div>
</template>

<script>
import Config from '../model/config'
import storage from '../model/storage'

export default {
  created () {
    // 判断用户是否已经选择用餐人数，如果已选择则扫码直接进入点菜页面
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
      api: Config.api
    }
  },
  methods: {
    // 将可选人数存在变量peopleNum里，循环此变量渲染ul.user-list，item表示每个li渲染的人数
    // 当用户点击用餐人数的某个li时，将当前item作为参数num传递出来，赋值给currentPeopleNum
    // 在每个li标签里判断当前currentPeopleNum和item是否相等，如相等则给li标签添加active样式
    addChangeEvent (num) {
      this.currentPeopleNum = num
    },
    // 将可选备注保存在变量remarkInfos里，循环此变量渲染ulremark-list，item表示每个li渲染的备注
    // 当用户点击某个可选备注li时，将当前item作为参数传递出来，将item.content拼接进remark变量
    // 双向绑定remark和input的内容
    addRemarks (remark) {
      this.remark += remark.content + ','
    },
    // 用户点击“开始点菜”，提交当前桌号、用餐人数、备注信息给服务器
    // 服务器获取成功并返回相应信息后，通过路由跳转到点菜页面
    addPeopleInfo () {
      let api = this.api + 'api/addPeopleInfo'
      let uid = storage.get('roomId')
      this.$http.post(api, {
        uid: uid,
        p_num: this.currentPeopleNum,
        p_mark: this.remark
      }).then((response) => {
        if (response.body.success) {
          this.$router.push({path: 'home'})
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
        // 提前存好showLoading变量，当有已选人数时，则显示loading效果并直接跳转，且不显示选择人数的部分
        // this.showLoading = true
        let orderInfo = response.body.result
        // 订单信息长度不为0表示已选用餐人数，这时直接跳转至点菜页面
        if (orderInfo.length > 0) {
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
