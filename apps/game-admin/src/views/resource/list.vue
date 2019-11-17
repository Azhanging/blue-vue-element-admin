<template>
  <div class="app-container">
    <BvaHeader title="资源列表"/>
    <BvaControl>
      <el-button icon="el-icon-plus" type="primary" @click="$router.push('detail')">
        资源管理
      </el-button>
      <el-button icon="el-icon-refresh" @click="refresh">
        刷新
      </el-button>
    </BvaControl>

    <BvaBody>
      <el-table border stripe tooltip-effect="light" :data="pageData.tableData">
        <el-table-column align="center" label="操作" width="200px">
          <template slot-scope="scope">
            <el-button @click="$router.push({
              path:'detail',
              query:{
                id:scope.row.id,
                type:'edit'
              }
            })">
              修改
            </el-button>
            <el-button @click="del(scope.row)">
              删除
            </el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" label="资源名" prop="name"/>
        <el-table-column align="center" label="资源简介" prop="description"/>
        <el-table-column align="center" label="资源类型" prop="typeText"/>
        <el-table-column align="center" label="是否可交易" prop="tradeText" width="100"/>
        <el-table-column align="center" label="价格" prop="price"/>
        <el-table-column align="center" label="售卖价" prop="marketPrice"/>
        <el-table-column align="center" label="hp" prop="hp"/>
        <el-table-column align="center" label="mp" prop="mp"/>
        <el-table-column align="center" label="exp" prop="exp"/>
        <el-table-column align="center" label="是否绑定" prop="isBindText"/>
        <el-table-column align="center" label="时效类型" prop="durationTypeText"/>
        <el-table-column align="center" label="时效性" prop="duration"/>
        <el-table-column align="center" label="物理攻击" prop="physicalAttack"/>
        <el-table-column align="center" label="物理防御" prop="physicalDefense"/>
        <el-table-column align="center" label="魔法攻击" prop="magicAttack"/>
        <el-table-column align="center" label="魔法防御" prop="magicDefense"/>
        <el-table-column align="center" label="暴击率" prop="crit"/>
        <el-table-column align="center" label="命中率" prop="hit"/>
        <el-table-column align="center" label="闪避率" prop="dodge"/>
        <el-table-column align="center" label="暴抗率" prop="critResistance"/>
      </el-table>
    </BvaBody>

  </div>
</template>

<script>

  import list from '@/mixins/list';

  export default {
    name: "resourceList",
    mixins: [list()],
    created() {
      this.loadData();
    },
    methods: {
      loadData() {
        const pageData = this.pageData;
        this.$axios.get(`/resource/list`).then((res) => {
          const {data} = res;
          pageData.tableData = data.list;
        });
      },
      //删除资源
      del(row) {
        this.$confirm(`是否删除该资源？`).then(() => {
          this.$axios.get(`/resource/del`, {
            params: {
              id: row.id
            }
          }).then(() => {
            this.refreshPage();
          });
        });
      }
    }
  }
</script>
