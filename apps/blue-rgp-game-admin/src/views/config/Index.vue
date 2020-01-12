<template>
  <div class="app-container">
    <BvaHeader title="配置列表"/>
    <BvaControl>
      <el-button icon="el-icon-plus" type="primary" @click="$router.push('info')">
        新增配置
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
                type: 'edit'
              }
            })">
              修改
            </el-button>
            <el-button @click="del(scope.row)">
              删除
            </el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" label="配置NAME" prop="name"/>
        <el-table-column align="center" label="配置VALUE" prop="value"/>
        <el-table-column align="center" label="配置注释" prop="comments"/>
      </el-table>
    </BvaBody>
  </div>
</template>

<script>

  import list from '@/mixins/list';

  export default {
    name: "configList",
    mixins: [list()],
    created() {
      this.loadData();
    },
    methods: {
      loadData() {
        const pageData = this.pageData;
        this.$axios.get(`/config/list`).then((res) => {
          const { data } = res;
          pageData.tableData = data.list;
        });
      },

      //删除配置
      del(row) {
        this.$confirm(`是否删除该配置？`).then(() => {
          this.$axios.get(`/config/del`, {
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
