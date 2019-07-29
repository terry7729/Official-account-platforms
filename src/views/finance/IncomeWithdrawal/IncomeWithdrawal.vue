<template>
  <div>
    <mine-add></mine-add>
    <el-card shadow="never">
      <div class="el-card-body-title">
        <span class="primary-text">收益提现</span>
      </div>
      <el-tabs v-model="activeName" type="card" @tab-click="handleTabClick" class="mt-20">
        <el-tab-pane label="零钱" name="1" >
          <router-view v-if="activeName == 1" />
        </el-tab-pane>
        <el-tab-pane label="Token收益" name="2">
          <router-view v-if="activeName == 2"/>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: "1",
      oldName: "1"
    };
  },
  methods: {
    handleTabClick(tab) {
      if (tab.name !== this.oldName) {
        this.oldName = tab.name;
        let targetRoute = tab.name == "1" ? "Change" : "ChangeTokenIncome";
        this.$router.push({ name: targetRoute });
      }
    }
  },
  created() {
    let routeName = this.$route.name;
    switch (routeName) {
      case "Change":
        this.activeName = this.oldName = "1";
        break;

      case "ChangeTokenIncome":
        this.activeName = this.oldName = "2";
        break;
    }
  }
};
</script>

<style scoped lang="scss">
.tab-pane-title {
  line-height: 2;
}
.tab-pane-title-2 {
  font-size: 14px;
  color: $sub-text-color;
}
</style>