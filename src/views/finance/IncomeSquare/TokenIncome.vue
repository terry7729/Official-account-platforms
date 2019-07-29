<template>
  <div class="TokenIncome">
    <div class="top">
      <div class="wallet_card">
        <div class="total">
          <span class="gray12">累计收益折合</span> &nbsp;&nbsp;
          <span class="white20">0.02000000BTC</span>&nbsp;&nbsp;
          <el-button type="primary">提币</el-button>
        </div>
        <div class="count">
          <div class="count_item">
            <div class="gray12 title">昨日收益折合</div>
            <div class="value">
              <div class="white17">0.02000000BTC</div>
              <div class="white13">≈5566.66CNY</div>
            </div>
          </div>
          <div class="count_item">
            <div class="gray12 title">7日收益折合</div>
            <div class="value border-box">
              <div class="white17">0.02000000BTC</div>
              <div class="white13">≈5566.66CNY</div>
            </div>
          </div>
          <div class="count_item">
            <div class="gray12 title">30日收益折合</div>
            <div class="value">
              <div class="white17">0.02000000BTC</div>
              <div class="white13">≈5566.66CNY</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="width:100%;display:flex;justify-content:flex-end">
      <el-select v-model="tokenTypeID" placeholder="请选择" @change="_getList()">
        <el-option
          v-for="item in tokenType"
          :key="item.id"
          :label="item.currencyName"
          :value="item.id"
        ></el-option>
      </el-select>
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
      <el-table-column prop="opersType" label="币种">
        <template slot-scope="scope">
          <div>{{scope.row.currency.currencyName}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="tradeId" label="交易单号"></el-table-column>
      <el-table-column
        prop="createTime"
        label="时间"
        :formatter="(row, col, cell, index) => { return $funs.getTime(cell) }"
      ></el-table-column>
      <el-table-column label="数量">
        <template slot-scope="scope">
          <div style="color:#FF3B3B">{{scope.row.currencyNum}}</div>
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
  name: "TokenIncome",
  data() {
    return {
      defultTabName: "1",
      page: 1,
      pagesize: 10,
      total: 0,
      tokenTypeID: "",
      tokenType: [],
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
      tableData: []
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
        time: vm.defultTabName,
        tokenType: vm.tokenTypeID
      };
      let res = await vm.$axios.getTokenFlow(params);
      if (res.code === 0) {
        vm.tableData = res.data.list;
        vm.total = res.data.total;
      }
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
    this._getCurrency();
  }
};
</script>
<style lang="scss" scoped>
.TokenIncome {
  .white20 {
    color: #fff;
    font-size: 20px;
    font-weight: bold;
  }
  .white17 {
    color: #fff;
    font-size: 17px;
    font-weight: bold;
  }
  .white13 {
    color: #fff;
    font-size: 13px;
    font-weight: bold;
  }
  .gray12 {
    color: #bdd6ff;
    font-size: 12px;
  }
  .top {
    margin: 15px 0;
    .wallet_card {
      margin: 0 auto;
      padding: 30px 60px 30px 60px;
      box-sizing: border-box;
      width: 450pt;
      height: 130pt;
      background: url("../../../assets/images/wallet_card.png") no-repeat;
      background-size: 100% 100%;
      .total {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 15px;
        .el-button--primary {
          border-color: #ffff;
          padding: 5px 18px;
          font-size: 12px;
          margin-left: 10px;
        }
      }
      .count {
        display: flex;
        justify-content: center;
        .title {
          margin-bottom: 10px;
        }
        .count_item {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          .value {
            text-align: center;
            padding: 0px 30px 0 30px;
          }
          .border-box {
            border-right: 1px solid #fff;
            border-left: 1px solid #fff;
          }
        }
      }
    }
  }
}
</style>


