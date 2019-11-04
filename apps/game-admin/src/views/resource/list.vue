<template>
  <div class="app-container">
    <BvaHeader title="游戏资源"/>
    <BvaControl>
      <el-button icon="el-icon-plus" type="primary" @click="$router.push('add')">
        资源管理
      </el-button>
      <el-button icon="el-icon-refresh" @click="refresh">
        刷新
      </el-button>
    </BvaControl>

    <BvaBody>
      <el-table border stripe tooltip-effect="light" :data="pageData.tableData">
        <el-table-column>
          <template slot-scope="scope">
            <el-button @click="$router.push({
              path:'detail',
              query:{
                type:'edit'
              }
            })">
              修改
            </el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" label="id" prop="id"/>
        <el-table-column align="center" label="资源名" prop="name"/>
        <el-table-column align="center" label="资源简介" prop="description"/>
        <el-table-column align="center" label="资源类型" prop="type"/>
        <el-table-column align="center" label="是否可交易" prop="trade"/>
        <el-table-column align="center" label="价格" prop="price"/>
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
          const { data } = res;
          pageData.tableData = data.list;
        });
      }
    }
  }
</script>
