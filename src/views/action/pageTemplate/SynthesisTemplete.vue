<template>
  <card title="编辑综合模板">
    <div class="flex-box mt-20">
      <div class="phone-box">
        <page-template-item
          type="2"
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
          minHeight="100"
          :datas.sync="templateList">
          <div slot="title">列表内容（{{templateList.templatecontextSourceMaterials.length}}/3）</div>
          <el-button size="mini" type="primary" @click="handleOpenDialog(-1)" slot="actionBtns">添加</el-button>
        </sort-list>

        <div class="pos-r">
          <el-tabs v-model="templateList.activeTab" type="card" class="page-template-tabs-out mt-20">
            <el-tab-pane
              v-for="(item, index) in templateList.templateClassifications"
              :key="item.templateClassificationName"
              :label="item.templateClassificationName" 
              :name="item.templateClassificationName">
              <sort-list 
                style="margin-top: -1px;"
                minHeight="100"
                :datas.sync="item">
                <div slot="title">列表内容（{{item.templatecontextSourceMaterials.length}}/20）</div>
                <el-button size="mini" type="primary" @click="handleOpenDialog(index)" slot="actionBtns">添加</el-button>
              </sort-list>
            </el-tab-pane>
          </el-tabs>

          <el-button-group class="tab-btns">
            <el-button icon="el-icon-plus" size="mini" @click="handleAddTab" :disabled="templateList.templateClassifications.length >= 3"></el-button>
            <el-button icon="el-icon-edit" size="mini" @click="handleEditTab"></el-button>
            <el-button icon="el-icon-delete" size="mini" @click="handleDelTab" :disabled="templateList.templateClassifications.length <= 1"></el-button>
          </el-button-group>
        </div>

      </div>
    </div>

    <div class="mt-20 tc">
      <el-button type="primary" @click="submit">{{ templateList.id ? '修改' : '发布' }}</el-button>
    </div>
    
    <!-- 选择素材 1级 -->
    <temp-res-dialog 
      :show.sync="showDialog" 
      :tabs="['sended', 'video', 'imgText']"
      :max="max"
      :idsData="currentObj.sourceMaterialIds"
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
          templatecontextSourceMaterials: [],
          templateClassifications: [
            {
              templateClassificationName: '分类1',
              sourceMaterialIds: [],
              templatecontextSourceMaterials: [],
            },
          ],
          activeTab: '分类1',
        },

        currentType: -1,  // 标记当前操作素材的对象，一级内容：-1，二级内容第一个标签页：0，第二个标签页：1，第三个标签页:2
        currentObj: {},   // 当前操作的素材对象
        max: 3,           // 选择素材的最大数量
      }
    },
    methods: {
      // 添加分类
      handleAddTab() {
        this.$prompt('', '请输入分类名称', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^[\u4e00-\u9fa5a-zA-Z0-9]{1,4}$/,
          inputErrorMessage: '分类名称1到4个字符，支持中文、数字和字母'
        }).then(({ value }) => {
          let list = this.templateList.templateClassifications

          if(list.length >=3) return

          for( let i=0; i<list.length; i++) {
            if(list[i].templateClassificationName === value) {
              this.$message.warning('名称已存在')
              return
            }
          }

          let obj = {
            templateClassificationName: value,
            sourceMaterialIds: [],
            templatecontextSourceMaterials: [],
          }

          list.push(obj)

          this.templateList.activeTab = value
        }).catch(() => {})
      },

      // 修改分类
      handleEditTab() {
        let list = this.templateList.templateClassifications

        this.$prompt('', '请输入分类名称', {
          confirmButtonText: '修改',
          cancelButtonText: '取消',
          inputValue: this.templateList.activeTab,
          inputPattern: /^[\u4e00-\u9fa5a-zA-Z0-9]{1,4}$/,
          inputErrorMessage: '分类名称1到4个字符，支持中文、数字和字母'
        }).then(({ value }) => {

          for( let i=0; i<list.length; i++) {
            if(list[i].templateClassificationName === value) {
              this.$message.warning('名称已存在')
              return
            }
            
            if(list[i].templateClassificationName === this.templateList.activeTab) {
              list[i].templateClassificationName = this.templateList.activeTab = value
            }
          }
        }).catch(() => {})
      },

      // 删除分类
      handleDelTab() {
        let list = this.templateList.templateClassifications
        let name, index
        for( let i=0; i<list.length; i++) {
          if(list[i].templateClassificationName === this.templateList.activeTab) {
            name = list[i].templateClassificationName
            index = i
          }
        }
        
        const h = this.$createElement
        
        this.$confirm(h('p', null, [h('span', null, '是否删除分类 '), h('span', { style: 'color: #438CFA' }, name)]), '删除提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          list.splice(index, 1)
          let newTab = index === 0 ? 0 : (index - 1)
          this.templateList.activeTab = list[newTab].templateClassificationName
        }).catch(() => {})
      },

      // 打开素材选择框
      handleOpenDialog(index) {
        if(this.currentType !== index) {
          this.currentType = index
          if(index === -1) {
            this.max = 3
            this.currentObj = this.templateList
          } else {
            this.max = 20
            this.currentObj = this.templateList.templateClassifications[index]
          }
        }

        this.showDialog = true
      },

      // 选择素材确认函数
      handleSubmit(idsData, res) {
        if(this.currentType === -1) {
          this.templateList.sourceMaterialIds = idsData
          this.templateList.templatecontextSourceMaterials = res
        } else {
          this.templateList.templateClassifications[this.currentType].sourceMaterialIds = idsData
          this.templateList.templateClassifications[this.currentType].templatecontextSourceMaterials = res
        }
      },

      // 验证数据
      valid() {
        let data = this.templateList

        if(!this.$valid.str(data.templateName, 1, 16)) {
          return '模板名称不正确'
        }

        if(!data.sourceMaterialIds.length || !data.templatecontextSourceMaterials.length ) {
          return '模板列表为空'
        }

        let childs = data.templateClassifications
        let flag = true
        for( let i=0; i<childs.length; i++) {
          if(childs[i].sourceMaterialIds.length) {
            flag = false
            break
          }
        }
        if(flag) {
          return '子模板列表为空'
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
        this.templateList.templateType = 2
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
        item.templateClassifications.map( (val, key) => {
          let childIds = []
          if(val.sourceMaterials.length) {
            val.sourceMaterials.map( childVal => {
              childIds.push(childVal.id)
            })
          } 
          val.sourceMaterialIds = childIds
          // val.templatecontextSourceMaterials = val.sourceMaterials
        })
        item.sourceMaterialIds = ids
        this.currentObj = this.templateList = item
      } else {
        this.currentObj = this.templateList
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

  .tab-btns {
    position: absolute;
    top: 5px;
    right: 0;
  }
</style>