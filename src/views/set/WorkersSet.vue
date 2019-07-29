<template>
  <div>
   
      <el-card shadow="never" class="cardHeight" :body-style="{height:'845px'}" >
      <div class="el-card-body-title">
        <span class="primary-text"> 人员设置</span>
      </div>
      <el-col :xs="12" :sm="16" :md="16" :lg="24" :xl="24" class>
        <el-form ref="form" class="mt-20 border forms" :model="form" label-width="129px">
         
          
          <el-form-item label="管理员" class="border-bottom">
            <div class="pl-20 left">BoChat2019</div>
            <el-button type="primary" class="updateName mr-20" @click="onSubmit">修改</el-button>
          </el-form-item>
          <el-form-item label="身份证" class="border-bottom">
            <div class="pl-20">BoChat2019</div>
            <el-button type="primary" class="updateName mr-20" @click="onSubmit">修改</el-button>
          </el-form-item>
          <el-form-item label="手机号码" class="border-bottom">
            <div class="pl-20">BoChat2019</div>
          </el-form-item>
       
          
          
       
        </el-form>
      </el-col>
    </el-card>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    methods: {}
  }
</script>

<style scoped lang="scss">
  
</style>