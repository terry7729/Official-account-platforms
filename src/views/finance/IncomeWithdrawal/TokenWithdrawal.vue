<template>
  <div class="TokenWithdrawal">
    <mine-add></mine-add>
    <el-card shadow="never">
      <div class="el-card-body-title">
        <span class="primary-text">Token提现&nbsp;>&nbsp;{{$route.query.currencyName}}</span>
      </div>
    </el-card>
    <div class="content">
      <el-table :data="list" border style="width: 100%" @current-change="handleSelectionChange">
        <el-table-column prop="currencyNum" label="选择">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.checked" @change="checkboxChange"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column prop="currencyLabel" label="地址标签"></el-table-column>
        <el-table-column prop="currencyUrl" label="提币地址"></el-table-column>
        <el-table-column prop label="操作">
          <template>
            <div>删除</div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  name: "TokenWithdrawal",
  data() {
    return {
      list: [],
      selectItem: {},
      fakeSelectItem: {}
    };
  },
  methods: {
    async getlist() {
      let vm = this;
      let data = {
        currencyId: 3,
        officiaUserId: vm.$route.query.id
      };
      let res = await vm.$axios.getWithdrawCurrency(data);
      if (res.code == 0) {
        res.data.forEach(item => {
          item.checked = false;
        });
        this.list = res.data;
      }
    },

    //手动实现checkbox单选
    handleSelectionChange(row) {
      this.list.forEach(item => {
        if (item.id !== row.id) {
          item.checked = false;
        }
      });
      this.fakeSelectItem = row;
    },
    checkboxChange(boolean) {
      // 如果是checked = true 再赋值
      if (boolean) {
        this.selectItem = this.fakeSelectItem;
      } else {
        for (var key in this.selectItem) {
          delete this.selectItem[key];
        }
      }
    }
  },
  created() {
    this.getlist();
  }
};
</script>
<style lang="scss" scoped>
.content {
  padding: 0px 300px 0 300px;
}
</style>

