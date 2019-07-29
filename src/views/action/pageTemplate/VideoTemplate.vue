<template>
  <card title="编辑视频模板">
    <div class="flex-box mt-20">
      <div class="phone-box">
        <page-template-item
          type="3"
          :templateList="templateList"
        >
        </page-template-item>
      </div>

      <div class="editor-box ml-20">
        <el-form label-width="80px" label-position="left" hide-required-asterisk>
          <el-form-item label="模板名称">
            <el-input
              v-model="templateList.templateName"
              :maxlength="16"
              placeholder="请输入模板名称"
              show-word-limit>
            </el-input>
            <span class="info-text fz-12">名称不超过16个字，可包含 数字、字母、中文</span>
          </el-form-item>
        </el-form>

        <sort-list 
          class="mt-20" 
          :datas.sync="templateList">
          <div slot="title">列表内容（{{templateList.templatecontextSourceMaterials.length}}/20）</div>
          <el-button size="mini" type="primary" @click="showDialog = true" slot="actionBtns">添加</el-button>
        </sort-list>

      </div>
    </div>

    <div class="mt-20 tc">
      <el-button type="primary" @click="submit">{{ templateList.id ? '修改' : '发布' }}</el-button>
    </div>
    
    <!-- 选择素材 -->
     <temp-res-dialog 
      :show.sync="showDialog" 
      :tabs="['video']"
      :idsData="templateList.sourceMaterialIds"
      @submit="handleSubmit">
    </temp-res-dialog>
  </card>
</template>

<script>
  import pageTemplateItem from '@/components/PageTemplateItem'
  import tempResDialog from '@/components/TempResDialog'
  import sortList from '@/components/SortList'
  export default {
    components: {
      pageTemplateItem,
      tempResDialog,
      sortList,
    },

    data() {
      return {
        showDialog: false,
        templateList: {
          templateName: "模板名称",
          sourceMaterialIds: [],
          templatecontextSourceMaterials: []
        }
      }
    },
    methods: {
      // 选择素材确认函数
      handleSubmit(idsData, res) {
        this.templateList.sourceMaterialIds = idsData
        this.templateList.templatecontextSourceMaterials = res
      },

      // 验证数据
      valid() {
        let data = this.templateList

        if(!this.$valid.str(data.templateName, 1, 16)) {
          return '模板名称不正确'
        }

        if(!data.sourceMaterialIds.length || !data.templatecontextSourceMaterials.length) {
          return '模板列表为空'
        }
      },

      // 提交数据
      async submit() {
        let msg = this.valid()
        if(msg) {
          this.$message.warning(msg)
          return
        }

        if(this.templateList.id) {
          this.updateData()
        } else {
          this.addData()
        }
      },
      // 新建
      async addData() {
        this.templateList.officiaUserId = this.$store.state.userInfo.id
        this.templateList.templateType = 3
        let res = await this.$axios.addCustomTemplate(this.templateList)
        if(res.code === 0) {
          this.$message.success(res.msg)
          setTimeout( () => {
            this.$router.push({name: 'PageTemplateList'})
          }, 1000)
        }
      },
      // 修改
      async updateData() {
        let res = await this.$axios.updateCustomTemplate(this.templateList)
        if(res.code === 0) {
          this.$message.success(res.msg)
          setTimeout( () => {
            this.$router.push({name: 'PageTemplateList'})
          }, 1000)
        }
      },
    },

    created() {
      let item = this.$route.params.item
      if(item) {
        let ids = []
        item.templatecontextSourceMaterials.map( (val, key) => {
          ids.push(val.id)
        })
        item.sourceMaterialIds = ids
        this.templateList = item
      }
    }
  }
</script>

<style scoped lang="scss">
  .flex-box {
    display: flex;
  }

  .editor-box {
    flex: 1;
    overflow: hidden;

    .el-form {
      width: 100%;
      max-width: 550px;
    }

  }
</style>