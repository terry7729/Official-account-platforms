<template>
  <div class="ChangeTokenIncome">
    <el-table :data="TokenBalance" border style="width: 100%">
      <el-table-column label="币种">
        <template slot-scope="scope">
          <div style="display:flex">
            <div></div>
            <div>{{scope.row.currency.currencyName}}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="currencyNum" label="可提现"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <div>
            <el-button type="primary" size="mini" @click="TokenWithdrawal(scope.row.currency)">提币</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin:30px 0">
      <el-row>
        <el-col :span="24">
          <span style="margin:0 10px;">提现记录</span>
          <el-select v-model="tokenTypeID" placeholder="请选择" @change="_getTokenCoinRecord()">
            <el-option
              v-for="item in tokenType"
              :key="item.id"
              :label="item.currencyName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>
    </div>
    <el-table :data="ListData" border style="width: 100%">
      <el-table-column prop="ID" label="提现单号"></el-table-column>
      <el-table-column prop="currencyName" label="币种"></el-table-column>
      <el-table-column prop="CURRENCY_URL" label="提现地址"></el-table-column>
      <el-table-column prop="WITHDRAW_MONEY_NUM" label="提现数量"></el-table-column>
      <el-table-column prop="WITHDRAW_ACTUL_NUM" label="实际数量"></el-table-column>
      <el-table-column
        prop="CREATE_TIME"
        label="操作时间"
        :formatter="(row, col, cell, index) => { return $funs.getTime(cell) }"
      ></el-table-column>
      <el-table-column label="操作">
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
  name: "ChangeTokenIncome",
  data() {
    return {
      TokenBalance: [],
      ListData: [],
      tokenType: [],
      tokenTypeID: "",
      page: 1,
      pagesize: 10,
      total: 0
    };
  },
  methods: {
    // 获取token余额
    async _getTokenBalance() {
      let vm = this;
      let res = await vm.$axios.getTokenBalance(3);
      vm.TokenBalance = res.data;
    },
    //查询token提币申请记录
    async _getTokenCoinRecord() {
      let vm = this;
      let params = {
        page: vm.page,
        pagesize: vm.pagesize,
        officiaUserId: 3,
        tokenType: vm.tokenTypeID
      };
      let res = await vm.$axios.getTokenCoinRecord(params);
      vm.ListData = res.data.list;
      vm.total = res.data.total;
    },
    // 获取币种类型
    async _getCurrency() {
      let vm = this;
      let res = await vm.$axios.getCurrency();
      if (res.code == 0) {
        let a = {
          currencyName: "所有Token",
          id: ""
        };
        vm.tokenType = res.data;
        vm.tokenType.unshift(a);
      }
    },
    // 改变当前页
    handleCurrentChange(num) {
      this.page = num;
      this._getTokenCoinRecord();
    },
    //跳token提币页面传币种名和id
    TokenWithdrawal(item) {
      this.$router.push({
        path: "/TokenWithdrawal",
        query: {
          currencyName: item.currencyName,
          id: item.id
        }
      });
    }
  },
  created() {
    this._getTokenBalance();
    this._getCurrency();
    this._getTokenCoinRecord();
  }
};
</script>
<style lang="scss" scoped>
.sucess {
  color: #66cd32;
}
.fail {
  color: #ff3b3b;
}
.process {
  color: #fea826;
}
</style>

