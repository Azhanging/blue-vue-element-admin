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
        <el-table-column align="center" label="技能名" prop="name" width="160px"/>
        <el-table-column align="center" label="技能简介" prop="description" width="160px"/>
        <el-table-column align="center" label="等级" prop="level" width="160px"/>
        <el-table-column align="center" label="是否为增益" prop="isGain" width="160px"/>

        <el-table-column align="center" label="hp" prop="hp" width="160px"/>
        <el-table-column align="center" label="hp增益" prop="hpGain" width="160px"/>
        <el-table-column align="center" label="hp增益持续时间" prop="hpGainDuration" width="160px"/>

        <el-table-column align="center" label="mp" prop="mp" width="160px"/>
        <el-table-column align="center" label="mp增益" prop="mpGain" width="160px"/>
        <el-table-column align="center" label="mp增益持续时间" prop="mpGainDuration" width="160px"/>

        <el-table-column align="center" label="物理攻击" prop="physicalAttack" width="160px"/>
        <el-table-column align="center" label="物理攻击增益" prop="physicalAttackGain" width="160px"/>
        <el-table-column align="center" label="物理攻击增益持续时间" prop="physicalAttackGainDuration" width="160px"/>

        <el-table-column align="center" label="物理防御" prop="physicalDefense" width="160px"/>
        <el-table-column align="center" label="物理防御增益" prop="physicalDefenseGain" width="160px"/>
        <el-table-column align="center" label="物理防御增益持续时间" prop="physicalDefenseGainDuration" width="160px"/>

        <el-table-column align="center" label="魔法攻击" prop="magicAttack" width="160px"/>
        <el-table-column align="center" label="魔法攻击增益" prop="magicAttackGain" width="160px"/>
        <el-table-column align="center" label="魔法攻击增益持续时间" prop="magicAttackGainDuration" width="160px"/>

        <el-table-column align="center" label="魔法防御" prop="magicDefense" width="160px"/>
        <el-table-column align="center" label="魔法防御增益" prop="magicDefenseGain" width="160px"/>
        <el-table-column align="center" label="魔法防御增益持续时间" prop="magicDefenseGainDuration" width="160px"/>

        <el-table-column align="center" label="暴击率增益" prop="critGain" width="160px"/>
        <el-table-column align="center" label="暴击率增益持续时间" prop="critGainDuration" width="160px"/>

        <el-table-column align="center" label="命中率增益" prop="hitGain" width="160px"/>
        <el-table-column align="center" label="命中率增益持续时间" prop="hitGainDuration" width="160px"/>

        <el-table-column align="center" label="闪避率增益" prop="dodgeGain" width="160px"/>
        <el-table-column align="center" label="闪避率增益持续时间" prop="dodgeGainDuration" width="160px"/>

        <el-table-column align="center" label="暴抗率增益" prop="critResistanceGain" width="160px"/>
        <el-table-column align="center" label="暴抗率增益持续时间" prop="critResistanceGainDuration" width="160px"/>
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
        this.$axios.get(`/scene/skill/list`).then((res) => {
          const { data } = res;
          pageData.tableData = data.list;
        });
      },
      //删除技能
      del(row) {
        this.$confirm(`是否删除该技能？`).then(() => {
          this.$axios.get(`/scene/skill/del`, {
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
