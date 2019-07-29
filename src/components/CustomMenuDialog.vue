<template>
  <div>
    <el-dialog title="从素材管理中选择" top="5vh" :visible.sync="show" width="610px" :before-close="handleClose" @open="handleOpen">
      <el-tabs v-model="activeTab" @tab-click="handleTabClick">

        <!-- 已发送 -->
        <el-tab-pane label="已发送" name="sended" v-if="tabs.indexOf('sended') !== -1">
          <div class="radius border of-y-auto multiple-text-checkbox" style="max-height: 60vh">
            <el-checkbox-group 
              v-model="selectIdsData"
              :max="max">
              <el-checkbox 
                v-for="item in sendedList" 
                :label="item.id" 
                :key="item.id" 
                class="border-bottom">
                <div class="no-wrap">
                  <span>{{item.sourceMaterialType | sourceMaterialType}}</span>
                  <span>{{item.sourceMaterialTitle}}</span>
                </div>
                <div class="ml-20 info-text">{{ $funs.getTime(item.updateTime).slice(0,10) }}</div>
              </el-checkbox>
            </el-checkbox-group>
            <div class="pt-50 pb-50 tc info-text" v-if="!sendedList.length">
              暂无数据
            </div>
          </div>
        </el-tab-pane>

        <!-- 素材库 -->
        <el-tab-pane label="素材库" name="source" v-if="tabs.indexOf('source') !== -1">
          <div class="radius border of-y-auto multiple-text-checkbox" style="max-height: 60vh">
            <el-checkbox-group 
              class="no-wrap"
              v-model="selectIdsData"
              :max="max">
              <el-checkbox 
                v-for="item in imgTextList" 
                :label="item.id" 
                :key="item.id" 
                class="border-bottom">
                <div class="no-wrap">
                  <span>{{item.sourceMaterialType | sourceMaterialType}}</span>
                  <span>{{item.sourceMaterialTitle}}</span>
                </div>
                <div class="ml-20 info-text">{{ $funs.getTime(item.updateTime).slice(0,10) }}</div>
              </el-checkbox>
            </el-checkbox-group>
            <div class="pt-50 pb-50 tc info-text" v-if="!imgTextList.length">
              暂无数据
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
      
      <div slot="footer" class="tc">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    props: {
      show: {
        type: Boolean,
        default: false,
      },
      tabs: {
        type: Array,
        default: ['sended', 'history', 'source', 'template'],
      },
      idsData: {
        type: Array,
        default: []
      },
      max: {
        type: Number,
        default: 20
      }
    },
    data() {
      return {
        pageNum: 1,
        pageSize: 50,

        //数据
        sendedList: [],
        videoList: [],
        imgTextList: [],

        activeTab: "sended",

        //临时保存选择的数据
        selectIdsData: [],
      }
    },
    watch: {
      tabs: {
        immediate: true,
        handler(val) {
          this.activeTab = val[0]
        }
      }
    },
    methods: {
      //模态框打开事件
      handleOpen() {
        this.selectIdsData = this.idsData
        if(!this.sendedList.length && (this.tabs.indexOf('sended') !== -1)) this.getSendedData()
        if(!this.imgTextList.length && (this.tabs.indexOf('source') !== -1)) this.getSourceData()
      },

      //模态框关闭事件
      handleClose() {
        this.$emit('update:show', false)
      },

      //切换tab标签
      handleTabClick(tab) {
        switch(tab.name) {
          case 'sended':
            if(!this.sendedList.length) this.getSendedData()
            break

          case 'source':
            if(!this.imgTextList.length) this.getSourceData()
            break
        }
      },

      //点击确认添加素材
      handleSubmit() {
        if(this.selectIdsData.length) {
          let all = this.sendedList.concat(this.videoList).concat(this.imgTextList)
          //去重
          let obj = {}
          all = all.reduce( (cur, next) => {
            obj[next.id] ? '' : obj[next.id] = true && cur.push(next)
            return cur
          }, [])

          // 把内容放到数组中一起返回到父组件
          let res = []
          this.selectIdsData.map( (val, key) => {
            all.filter( item => {
              if(item.id === val) res.push(item)
            })
          })

          this.$emit('update:show', false)
          this.$emit('submit', this.selectIdsData, res)
        } else {
           this.$message.warning('未选择任何素材')
        }
      },

      // 获取数据
      async getSendedData() {
        let params = {
          "page": this.pageNum,
          "pagesize": this.pageSize,
          "officiaUserId": this.$store.state.userInfo.id,   // 公众号ID
        }

        let res = await this.$axios.getGroupSendMsgList(params)
        if(res.code === 0) this.sendedList = res.data.list
      },
      async getSourceData() {
        let params = {
          "page": this.pageNum,
          "pagesize": this.pageSize,
          "sourceMaterialType": 1,                          // 素材类型： 1-图文， 2-图片， 3-视频
          "sourceMaterialTitle": null,                      // 素材标题
          "officiaUserId": this.$store.state.userInfo.id,   // 公众号ID
        }

        let res = await this.$axios.getMaterial(params)
        if(res.code === 0) this.imgTextList = res.data.list
      },
    },
  }
</script>

<style scoped lang="scss">
  .multiple-img-checkbox {
    width: 100px;
    height: 100px;
  }

  .upload-btn {
    width: 100px;
    height: 100px;
    box-sizing: border-box;
    border: 1px dashed $sub-text-color;
    cursor: pointer;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;

    .el-icon-plus {
      font-size: 40px;
      margin: 0 auto;
      color: $sub-text-color;
    }
    
    &:hover {
      border-color: $primary-color;
      .el-icon-plus {
        color: $primary-color;
      }
    }
  }

</style>