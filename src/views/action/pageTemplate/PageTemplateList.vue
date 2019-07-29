<template>
  <div>
    <card title="页面模板">
      <p class="tc mt-20">新建一个公众号页面，可复制链接放在自定义菜单发布</p>
      <div class="tc mt-20">
        <el-button class="el-icon-plus" type="primary" @click="$router.push({name: 'SelectTemplates'})">新建模板</el-button>
      </div>
    </card>

    <card title="我的模板" v-if="list.length">
      <div class="list pt-10 pb-20">
        <div class="list-item" v-for="(item, index) in list" :key="index">
          <page-template-item
            :type="String(item.templateType)"
            :templateList="item">
          </page-template-item>

          <div class="pt-20 tc">
            <el-button type="primary" size="small" @click="handleEdit(item)">编辑</el-button>
            <el-button type="danger" size="small" @click="handleDelete(item)">删除</el-button>
          </div>
        </div>
      </div>
    </card>
  </div>
</template>

<script>
  import pageTemplateItem from '@/components/PageTemplateItem'
  export default {
    components: {
      pageTemplateItem,
    },
    data() {
      return {
        list: [],
      }
    },
    methods: {
      // 获取模板列表
      async getData() {
        let res = await this.$axios.getCustomTemplateList({officiaUserId: this.$store.state.userInfo.id})
        if(res.code === 0) {
          res.data.map( val => {
            if(val.templateType === 2) {
              val.activeTab = val.templateClassifications[0].templateClassificationName
              val.templateClassifications.map( childVal => {
                childVal.templatecontextSourceMaterials = childVal.sourceMaterials
              })
            }
          })
          this.list = res.data
        }
      },

      // 编辑模板
      handleEdit(item) {
        switch(item.templateType) {
          case 1: 
            this.$router.push({name: 'ListTemplate', params: {item}})
            break

          case 2: 
            this.$router.push({name: 'SynthesisTemplete', params: {item}})
            break

          case 3: 
            this.$router.push({name: 'VideoTemplate', params: {item}})
            break
        } 
      },

      // 删除模板
      handleDelete(item) {
        this.$confirm('是否删除此模板？', '删除确认', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          type: 'warning',
        }).then( async () => {

          let res = await this.$axios.delCustomTemplate({pagetemplateId: item.id})
          if(res.code === 0) {
            this.$message.success(res.msg)
            this.getData()
          }
          
        }).catch( () => {
          //do nothing
        })
      },
    },

    created() {
      this.getData()
    }
  }
</script>

<style scoped lang="scss">
  .list {
    display: flex;
    flex-wrap: wrap;
    .list-item {
      padding: 20px 1%;
      &:hover {
        background: mix($primary-color, #fff, 5%);
      }
    }
  }
</style>