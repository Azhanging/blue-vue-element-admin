<template>
  <div class="app-container">
    <BvaHeader title="地图列表"/>
    <BvaControl>
      <el-button icon="el-icon-plus" type="primary" @click="$router.push('detail')">
        新增地图
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
              path:'detail',
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
        <el-table-column align="center" label="地图名" prop="name"/>
        <el-table-column align="center" label="地图简介" prop="description"/>
        <el-table-column align="center" label="NPC">
          <template slot-scope="scope">
            {{scope.row.npc.join(',')}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="怪物" prop="monster"/>
      </el-table>
    </BvaBody>

  </div>
</template>

<script>

  import list from '@/mixins/list';

  export default {
    name: "mapList",
    mixins: [list()],
    created() {
      this.loadData();
    },
    methods: {
      loadData() {
        const pageData = this.pageData;
        this.$axios.get(`/map/list`).then((res) => {
          const { data } = res;
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
