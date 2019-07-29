<template>
  <div class="ChangeTokenIncome">
    <div style="display:flex;justify-content:center;margin:20px 0;">
      <div class="box">
        <div>资产余额</div>
        <div>
          {{balance}}
          <span>¥</span>
        </div>
        <div class="button">
          <el-button type="primary">提现</el-button>
        </div>
      </div>
    </div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="记录ID"></el-table-column>
      <el-table-column label="提现账户" width="300">
        <template slot-scope="scope">
          <div>{{scope.row.bankCard.bankAccountName + ' | ' + scope.row.bankCard.bankLabel + ' | '+ format(scope.row.bankCard.bankCardAccount)}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="withdrawMoneyNum" label="提现金额"></el-table-column>
      <el-table-column label="实际到账">
        <template slot-scope="scope">
          <div style="color:#FF3B3B">{{scope.row.withdrawActulNum}}</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="操作时间"
        :formatter="(row, col, cell, index) => { return $funs.getTime(cell) }"
      ></el-table-column>
      <el-table-column prop="status" label="操作">
        <template slot-scope="scope">
          <div
            :class="scope.row.status == 0?'process':scope.row.status == 1 ? 'sucess' : 'fail'"
          >{{scope.row.status == 0?'处理中':scope.row.status == 1 ? '处理完成' : '处理失败'}}</div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="mt-20 tr"
      background
      layout="prev, pager, next"
      :current-page="page"
      :page-size="pagesize"
      @current-change="handleCurrentChange"
      :total="total"
    ></el-pagination>
  </div>
</template>
<script>
export default {
  data() {
    return {
      page: 1,
      pagesize: 10,
      total: 0,
      tableData: [],
      balance:0
    };
  },
  methods: {
    // 改变当前页
    handleCurrentChange(num) {
      this.page = num;
      this._getList();
    },
    async _getList() {
      let vm = this;
      let params = {
        page: vm.page,
        pagesize: vm.pagesize,
        officiaUserId: this.$store.state.userInfo.id
      };
      let res = await vm.$axios.getChangeWithdraw(params);
      console.log(res);
      if (res.code === 0) {
        vm.tableData = res.data.list;
        vm.total = res.data.total;
      }
    },
    // 获取余额
    async _getBalance() {
      let vm = this;
      let res = await vm.$axios.getBalance(this.$store.state.userInfo.id);
      vm.balance = res.data
    },
    format(str) {
      let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      if (!reg.test(str)) {
        return this.$funs.starformat(str, 5, 4, -4);
      }
      let emailStart = str.split("@")[0];
      let emailEnd = str.split("@")[1];
      return this.$funs.starformat(emailStart, 4, 2, -3) + emailEnd;
    }
  },
  created() {
    this._getList();
    this._getBalance()
  }
};
</script>
<style lang="scss" scoped>
.ChangeTokenIncome {
  .sucess {
    color: #66cd32;
  }
  .fail {
    color: #ff3b3b;
  }
  .process {
    color: #fea826;
  }
  .box {
    width: 250pt;
    height: 90pt;
    background: url("../../../assets/images/wallet_card.png") no-repeat;
    background-size: 100% 100%;
    color: #ffffff;
    padding: 40px 10px 10px 30px;
    box-sizing: border-box;
    &:nth-child(1) {
      margin-right: 30px;
    }
    & div:nth-child(1) {
      font-size: 10px;
      margin-bottom: 10px;
    }
    & div:nth-child(2) {
      font-size: 20px;
      font-weight: bold;
      span {
        font-size: 15px;
        font-weight: normal;
      }
    }
    .button {
      text-align: right;
      .el-button--primary {
        border-color: #ffff;
        padding: 5px 18px;
        font-size: 12px;
      }
    }
  }
}
</style>

