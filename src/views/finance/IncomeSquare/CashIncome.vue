<template>
  <div class="CashIncome">
    <div class="top">
      <div class="count">
        <div class="box">
          <div>账户余额</div>
          <div>{{balance}}</div>
          <div class="button">
            <el-button type="primary">提现</el-button>
          </div>
        </div>
        <div class="box">
          <div>累计收益</div>
          <div>{{incomes.totalEarnings}}</div>
          <div class="button">
            <el-button type="primary">查看</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom_count">
      <div class="item_box">
        <div class="item">
          <div>昨日收益&nbsp;(元)</div>
          <div>{{incomes.yesterDayEarnings}}元</div>
        </div>
        <div class="item">
          <div>7日收益&nbsp;(元)</div>
          <div>{{incomes.sevenDaysEarnings}}元</div>
        </div>
        <div class="item">
          <div>30日收益&nbsp;(元)</div>
          <div>{{incomes.thirtyDaysEarnings}}元</div>
        </div>
      </div>
    </div>
    <el-tabs v-model="defultTabName" @tab-click="handleClick">
      <el-tab-pane
        v-for="(item,index) in tabsList"
        :key="index"
        :label="item.label"
        :name="item.name"
      ></el-tab-pane>
    </el-tabs>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="opersType" label="来源">
        <template slot-scope="scope">
          <div>{{scope.row.opersType == 1 ? '商城收入':scope.row.opersType == 2? '小程序收入':'提现'}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="tradeId" label="交易单号"></el-table-column>
      <el-table-column
        prop="createTime"
        label="时间"
        :formatter="(row, col, cell, index) => { return $funs.getTime(cell) }"
      ></el-table-column>
      <el-table-column label="金额">
        <template slot-scope="scope">
          <div style="color:#FF3B3B">{{scope.row.moneyNum}}</div>
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
  name: "CashIncome",
  data() {
    return {
      defultTabName: "1",
      page: 1,
      pagesize: 10,
      total: 0,
      balance:'',
      tabsList: [
        {
          label: "昨天",
          name: "1"
        },
        {
          label: "近7天",
          name: "2"
        },
        {
          label: "本月",
          name: "3"
        },
        {
          label: "历史",
          name: "4"
        }
      ],
      tableData: [],
      incomes: {}
    };
  },
  methods: {
    // 获取流水列表
    async _getList() {
      let vm = this;
      let params = {
        page: vm.page,
        pagesize: vm.pagesize,
        officiaUserId: this.$store.state.userInfo.id,
        time: vm.defultTabName
      };
      let res = await vm.$axios.getCashFlow(params);
      console.log(res)
      if (res.code === 0) {
        vm.tableData = res.data.list;
        vm.total = res.data.total;
      }
    },
    // 获取现金收益
    async _getCashIncome() {
      let vm = this;
      let res = await vm.$axios.getCashIncome(this.$store.state.userInfo.id);
      if (res.code === 0) {
        vm.incomes = res.data;
      }
    },
    // 获取余额
    async _getBalance() {
      let vm = this;
      let res = await vm.$axios.getBalance(this.$store.state.userInfo.id);
      vm.balance = res.data
    },
    handleClick(item) {
      this._getList();
    },
    // 改变当前页
    handleCurrentChange(num) {
      this.page = num;
      this._getList();
    },
  },
  created() {
    this._getList();
    this._getCashIncome();
    this._getBalance();
  }
};
</script>
<style lang="scss" scoped>
.CashIncome {
  .top {
    display: flex;
    justify-content: center;
    .count {
      display: flex;
      justify-content: center;
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
  }
  .bottom_count {
    display: flex;
    justify-content: center;
    padding: 30px 15px 15px 15px;
    margin-bottom: 30px;
    .item_box {
      border-bottom: 1px solid #e5e5e5;
      display: flex;
      justify-content: center;
      .item {
        margin: 0 80px;
        & div:nth-child(1) {
          font-size: 10px;
          color: #676775;
          margin-bottom: 10px;
        }
        & div:nth-child(2) {
          color: #ff3b3b;
          font-weight: bold;
          font-size: 18px;
          margin-bottom: 10px;
        }
      }
    }
  }
}
</style>

