<template>
  <div class="border list-box">
    <div class="border-bottom">
      <div>
        <slot name="title"></slot>
      </div>
      
      <div v-show="!isSort">
        <slot name="actionBtns"></slot>
        <el-button size="mini" @click="isSort = true" v-if="datas.templatecontextSourceMaterials.length > 1">排序</el-button>
      </div>

      <div v-show="isSort">
        
        <el-button size="mini" type="primary" @click="sortDone">排序完成</el-button>
      </div>
    </div>

    <div class="pt-20 pb-20" :style="{'min-height': minHeight + 'px'}">
      <div class="list border-bottom" v-for="(item, index) in datas.templatecontextSourceMaterials" :key="index">
        <div class="list-title no-wrap mr-20">
          <span>{{item.sourceMaterialType | sourceMaterialType}}</span>
          <span>{{item.sourceMaterialTitle}}</span>
        </div>
        <div class="list-btns no-select">
          <i class="el-icon-delete" @click="handleDelete(item)" v-show="!isSort"></i>
          <i class="el-icon-d-arrow-left" @click="handleSort(item, index, 'up')" v-show="isSort"></i>
          <i class="el-icon-d-arrow-right ml-10" @click="handleSort(item, index, 'down')" v-show="isSort"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      datas: {
        type: Object,
        default: {},
      },
      minHeight: {
        type: String,
        default: '260'
      }
    },
    data() {
      return {
        isSort: false,  // 当前是否在排序状态
      }
    },
    methods: {

      // 删除
      handleDelete(item) {
        this.datas.sourceMaterialIds.filter( (val, key, arr) => {
          if(val === item.id) arr.splice(key, 1)
        })
        this.datas.templatecontextSourceMaterials.filter( (val, key, arr) => {
          if(val.id === item.id) arr.splice(key, 1)
        })
      },

      // 排序
      handleSort(item, index, type) {
        if(type === 'up' && index === 0) return
        if(type === 'down' && index === this.datas.templatecontextSourceMaterials.length - 1) return

        let ids = this.datas.sourceMaterialIds
        let res = this.datas.templatecontextSourceMaterials
        if(type === 'up') {
          [ids[index - 1], ids[index]] = [ids[index], ids[index - 1]];
          [res[index - 1], res[index]] = [res[index], res[index - 1]];
          this.datas.sourceMaterialIds = ids.splice(0, ids.length)
          this.datas.templatecontextSourceMaterials = res.splice(0, res.length)
        }
        if(type === 'down') {
          [ids[index + 1], ids[index]] = [ids[index], ids[index + 1]];
          [res[index + 1], res[index]] = [res[index], res[index + 1]];
          this.datas.sourceMaterialIds = ids.splice(0, ids.length)
          this.datas.templatecontextSourceMaterials = res.splice(0, res.length)
        }
      },

      // 排序完成
      sortDone() {
        this.isSort = false
      },
    }
  }
</script>

<style scoped lang="scss">
  .list-box {
      padding: 2px 20px;
      >div.border-bottom {
        line-height: 1.7;
        padding: 5px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .list {
        width: 100%;
        box-sizing: border-box;
        padding: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .list-title {
          flex: 1;
        }
        .list-btns {
          font-size: 18px;
          color: mix($default-color, #ccc);
          i:hover {
            cursor: pointer;
            color: $primary-color;
          }

          .el-icon-d-arrow-left {
            transform: rotate(90deg);
          }
          .el-icon-d-arrow-right {
            transform: rotate(90deg);
          }
        }

        &:first-child {
          .list-btns {
            .el-icon-d-arrow-left {
              color: $sub-text-color;
              cursor: not-allowed;
            }
          }
        }
        &:last-child {
          .list-btns {
            .el-icon-d-arrow-right {
              color: $sub-text-color;
              cursor: not-allowed;
            }
          }
        }
      }
    }
</style>