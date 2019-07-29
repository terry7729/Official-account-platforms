<template>
  <div class="mine-add">
    <div class="mine-add-content">
      <div class="line"></div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>当前位置 :</el-breadcrumb-item>
        <el-breadcrumb-item v-for="(item, index) in $route.meta.address" :key="index">{{item}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>
</template>
<script>
export default {
  name: "mine-add",
  data() {
    return {};
  },
  created() {}
};
</script>
<style lang="scss" scoped>
.mine-add-content {
  display: flex;
  align-items: center;
  .line {
    height: 12px;
    width: 2px;
    background: #438cfa;
    margin: 0 10px;
  }
}
</style>


