<template>
  <div class="app-container">

    <BvaHeader title="房间列表"/>

    <BvaControl>
      <el-button icon="el-icon-plus" type="primary" @click="$router.push('info')">
        新增房间
      </el-button>
      <el-button icon="el-icon-refresh" @click="refresh">
        刷新
      </el-button>
    </BvaControl>

    <BvaBody>
      <el-table border stripe tooltip-effect="light" :data="pageData.tableData">
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button @click="$router.push({
              path:'info',
              query:{
                id: scope.row.id,
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
        <el-table-column align="center" label="房间名" prop="name"/>
        <el-table-column align="center" label="楼名" prop="building.name"/>
      </el-table>
    </BvaBody>

  </div>
</template>

<script>
  import list from '@/mixins/list';

  export default {
    name: "room-list",
    mixins: [list()],
    created() {
      this.loadData();
    },
    methods: {
      loadData() {
        this.$axios.get(`/room/list`).then((res) => {
          const { data } = res;
          this.pageData.tableData = data.list;
        });
      },
      del(row) {
        this.$confirm(`是否删除该房间？`).then(() => {
          this.$axios.get(`/room/del`, {
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
