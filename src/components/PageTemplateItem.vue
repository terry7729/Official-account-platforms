<template>
  <div class="template-item">
    <phone-window class="border">
      <div class="phone-box">
        
        <p class="template-title pl-10 pr-10 no-wrap" v-html="templateList.templateName || `<span class='info-text'>（未设置）</span>`">{{  }}</p>
        <div class="author pt-10 pl-10 pr-10">
          <span class="author-head" :class="{'default-bg': !$store.state.userInfo.icon}">
            <el-image
              style="width: 100%; height: 100%;"
              :src="$store.state.userInfo.icon"
              fit="fill">
            </el-image>
          </span>
          <span class="fz-12">
            {{ $store.state.userInfo.officialName }}
          </span>
        </div>

        <!-- 图文模板 -->
        <div class="template-content pt-10 pl-10 pr-10" v-if="type === '1'">
          <div class="list-item border-top cf" v-for="(item, index) in templateList.templatecontextSourceMaterials" :key="index">
            <span class="title pr-10 fz-12">{{ item.sourceMaterialTitle }}</span>
            <span class="list-img" :class="{'default-bg': item && (!item.sourceMaterialIcon || !item.sourceMaterialVideoIcon)}">
              <el-image
                style="width: 100%; height: 100%;"
                v-if="item && (item.sourceMaterialIcon || item.sourceMaterialVideoIcon)"
                :src="item.sourceMaterialIcon || item.sourceMaterialVideoIcon"
                fit="fill">
              </el-image>
            </span>
          </div>
        </div>

        <!-- 自定义模板 -->
        <div class="template-content mt-10" v-if="type === '2'">
          <div class="carousel-box">
            <el-carousel
              height="110px"
              arrow="hover"
              :autoplay="false"
              :loop="false"
              indicator-position="none">
              <el-carousel-item v-for="(item, index) in templateList.templatecontextSourceMaterials" :key="index">
                <div class="h-100 pos-r" :class="{'default-bg': item && (!item.sourceMaterialIcon || !item.sourceMaterialVideoIcon)}">
                  <el-image
                    style="width: 100%; height: 100%;"
                    v-if="item && (item.sourceMaterialIcon || item.sourceMaterialVideoIcon)"
                    :src="item.sourceMaterialIcon || item.sourceMaterialVideoIcon"
                    fit="fill">
                  </el-image>
                  <p class="title-2 no-wrap">{{ item.sourceMaterialTitle }}</p>
                </div>
              </el-carousel-item>
            </el-carousel>
          </div>

          <div class="pl-10 pr-10 page-template-tabs">
            <el-tabs v-model="templateList.activeTab">
              <el-tab-pane 
              v-for="item in templateList.templateClassifications" 
              :label="item.templateClassificationName" 
              :name="item.templateClassificationName" 
              :key="item.templateClassificationName">

                <div class="list-item border-top cf" v-for="(child, b) in item.templatecontextSourceMaterials" :key="b" style="margin-top: -1px;">
                  <span class="title pr-10 fz-12">{{ child.sourceMaterialTitle }}</span>
                  <span class="list-img" :class="{'default-bg': child && !child.sourceMaterialIcon}">
                    <el-image
                      style="width: 100%; height: 100%;"
                      v-if="child && child.sourceMaterialIcon"
                      :src="child.sourceMaterialIcon"
                      fit="fill">
                    </el-image>
                  </span>
                </div>

              </el-tab-pane>
            </el-tabs>
          </div>
        </div>

        <!-- 视频模板 -->
        <div class="template-content pt-10 pl-10 pr-10" v-if="type === '3'">
          <div class="pos-r mb-10" 
            style="height: 110px;"
            :class="{'default-bg': item && (!item.sourceMaterialIcon || !item.sourceMaterialVideoIcon)}" 
            v-for="(item, index) in templateList.templatecontextSourceMaterials" :key="index">
            <el-image
              style="width: 100%; height: 100%;"
              v-if="item && (item.sourceMaterialIcon || item.sourceMaterialVideoIcon)"
              :src="item.sourceMaterialIcon || item.sourceMaterialVideoIcon"
              fit="fill">
            </el-image>
            <span class="play-btn"></span>
            <p class="title-2 no-wrap">{{ item.sourceMaterialTitle }}</p>
          </div>
        </div>
          
      </div>

    </phone-window>

    <slot></slot>
  </div>
</template>

<script>
  import phoneWindow from '@/components/PhoneWindow'
  export default {
    components: {
      phoneWindow,
    },
    props: {
      type: {
        type: String,
        default: '1',       //模板类型： 1-图文，2-自定义分类 , 3-视频(必传)
      },
      templateTitle: {
        type: String,
        default: '模板名称',
      },
      // authorHead: {
      //   type: String,
      //   default: '',
      // },
      // author: {
      //   type: String,
      //   default: 'Bochat2019',
      // },
      templateList: {
        type: Object,
        default: {
          templateName: "模板名称",
          // sourceMaterialIds: [ 5, 12 ],
          templatecontextSourceMaterials: [
            {
              sourceMaterialTitle: '内容标题',
              sourceMaterialIcon: '',
            }
          ],
          templateClassifications: [],
          activeTab: '',
        }
      },
    },
    data() {
      return {
      }
    },
  }
</script>

<style scoped lang="scss">
  .template-item {
    width: 242px;
    box-sizing: border-box;
  }

  .phone-box {
    height: 388px;
    padding-top: 12px;
    box-sizing: border-box;
  }

  .template-title {
    font-size: 13px;
    color: #333333;
    font-weight:bold;
    height: 17px;
  }

  .author-head {
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-right: 5px;
    vertical-align: middle;
    border-radius:50%;
    overflow: hidden;
  }

  .template-content {
    overflow: hidden;
  }

  .list-item {
    padding: 7px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .title {
    flex: 1;
    color: #333333;
    font-weight:bold;
  }
  .list-img {
    width: 50px;
    height: 45px;
    border-radius: 2px;
  }

  .default-bg {
    background:rgba(210,210,210,1);
  }

  .carousel-box {
    width: 208px;
    margin: 0 auto;
  }
  .el-carousel--horizontal {
    overflow-x: visible;
  }
  .el-carousel__item {
    width: 200px;
    padding: 0 4px;
    border-radius: 4px;
  }

  .title-2 {
    width: 100%;
    height: 30px;
    line-height: 30px;
    box-sizing: border-box;
    position: absolute;
    bottom: 0;
    background:rgba(238,238,238,1);
    font-size: 12px;
    padding: 0 10px;
  }

  .play-btn {
    width: 20px;
    height: 20px;
    position: absolute;
    top: 35px;
    left: 97px;
    margin: 0 auto;
    background: url('../assets/images/video_icon@2x.png') no-repeat;
    background-size: contain;
  }
</style>