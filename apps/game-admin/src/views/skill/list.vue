<template>
  <div class="app-container">
    <BvaHeader title="技能列表"/>
    <BvaControl>
      <el-button icon="el-icon-plus" type="primary" @click="$router.push('detail')">
        技能管理
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
        <el-table-column align="center" label="技能名" prop="name"/>
        <el-table-column align="center" label="技能简介" prop="description"/>
        <el-table-column align="center" label="hp" prop="hp"/>
        <el-table-column align="center" label="mp" prop="mp"/>
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
    name: "skillList",
    mixins: [list()],
    created() {
      this.loadData();
    },
    methods: {
      loadData() {
        const pageData = this.pageData;
        this.$axios.get(`/skill/list`).then((res) => {
          const { data } = res;
          pageData.tableData = data.list;
        });
      },
      //删除技能
      del(row) {
        this.$confirm(`是否删除该技能？`).then(() => {
          this.$axios.get(`/skill/del`, {
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
