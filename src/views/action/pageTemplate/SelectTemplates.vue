<template>
  <card title="选择模板">
    <div class="template-list">

      <div class="pd-10 border mt-20 template-item">
        <page-template-item
          type="1"
          :templateList="templateList_1"
        >
          <p class="tc mt-20 bold">列表模板</p>
          <p class="tc mt-10 info-text fz-12">图文视频组成的列表页面</p>
          <div class="tc mt-20 mb-20">
            <el-button type="primary" class="mt-20" @click="$router.push({name: 'ListTemplate'})">选择</el-button>
          </div>
        </page-template-item>
      </div>

      <div class="pd-10 border mt-20 template-item">
        <page-template-item
          type="2"
          :templateList="templateList_2"
        >
          <p class="tc mt-20 bold">综合模板</p>
          <p class="tc mt-10 info-text fz-12">封面与多内容组成的页面</p>
          <div class="tc mt-20 mb-20">
            <el-button type="primary" class="mt-20" @click="$router.push({name: 'SynthesisTemplete'})">选择</el-button>
          </div>
        </page-template-item>
      </div>

      <div class="pd-10 border mt-20 template-item">
        <page-template-item
          type="3"
          :templateList="templateList_3"
        >
          <p class="tc mt-20 bold">视频模板</p>
          <p class="tc mt-10 info-text fz-12">视频列表</p>
          <div class="tc mt-20 mb-20">
            <el-button type="primary" class="mt-20" @click="$router.push({name: 'VideoTemplate'})">选择</el-button>
          </div>
        </page-template-item>
      </div>

    </div>
  </card>
</template>

<script>
  import pageTemplateItem from '@/components/PageTemplateItem'
  export default {
    components: {
      pageTemplateItem,
    },
    data() {
      return {
        templateList_1: {
          templateName: "模板名称",
          templatecontextSourceMaterials: [
            {
              sourceMaterialTitle: '内容标题1',
              sourceMaterialIcon: '',
            },
            {
              sourceMaterialTitle: '内容标题2',
              sourceMaterialIcon: '',
            },
            {
              sourceMaterialTitle: '内容标题3',
              sourceMaterialIcon: '',
            },
            {
              sourceMaterialTitle: '内容标题4',
              sourceMaterialIcon: '',
            },
            {
              sourceMaterialTitle: '内容标题5',
              sourceMaterialIcon: '',
            },
          ]
        },
        
        templateList_2: {
          templateName: "模板名称",
          templatecontextSourceMaterials: [
            {
              sourceMaterialTitle: '内容标题1',
              sourceMaterialIcon: '',
            },
          ],
          templateClassifications: [
            {
              templateClassificationName: "分类1",
              templatecontextSourceMaterials: [
                {
                  sourceMaterialTitle: '内容标题2',
                  sourceMaterialIcon: '',
                },
                {
                  sourceMaterialTitle: '内容标题3',
                  sourceMaterialIcon: '',
                },
              ]
            },
            {
              templateClassificationName: "分类2",
              templatecontextSourceMaterials: [
                {
                  sourceMaterialTitle: '内容标题4',
                  sourceMaterialIcon: '',
                },
                // {
              ]
            }
          ],
          activeTab: '分类1'
        },
        
        templateList_3: {
          templateName: "模板名称",
          templatecontextSourceMaterials: [
            {
              sourceMaterialTitle: '内容标题1',
              sourceMaterialIcon: '',
            },
            {
              sourceMaterialTitle: '内容标题2',
              sourceMaterialIcon: '',
            },
          ]
        },
      }
    },
  }
</script>

<style scoped lang="scss">
  .template-list {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    .template-item {
      width: 242px;
      &:hover {
        background: mix($primary-color, #fff, 8%);
        border-color: mix($primary-color, #fff, 15%)
      }
      &:not(:last-child) {
        margin-right: 2%;
      }
    }
  }
</style>