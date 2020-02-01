<template>
  <div class="app-container">
    <BvaHeader :title="`${isEdit?'更新':'新增'}楼`"/>

    <BvaBody>
      <el-form inline ref="form" label-width="200px" :model="form">
        <div>
          <el-form-item label="楼名：" prop="name" :rules="$genRules({rule:/.+/,message:'楼名输入有误'})">
            <el-input v-model="form.name" placeholder="输入楼名" class="bz-width-400"/>
          </el-form-item>
        </div>

      </el-form>
    </BvaBody>

    <BvaFooter>
      <el-button type="primary" @click="submit">
        保存
      </el-button>
      <el-button plain @click="$router.back()">
        取消
      </el-button>
    </BvaFooter>
  </div>
</template>

<script>
  export default {
    name: "building-info",
    data() {
      return {
        form: {
          name: ''
        }
      }
    },
    computed: {
      isEdit() {
        return this.$route.query.type === 'edit';
      }
    },
    created() {
      if (this.isEdit) {
        this.getInfo();
      }
    },
    methods: {
      submit() {
        const api = this.isEdit ? `/building/update` : `/building/create`;
        this.$axios.post(api, this.form).then(() => {
          this.$router.back();
        });
      },
      getInfo() {
        const query = this.$route.query;
        this.$axios.get(`/building/info`, {
          params: {
            id: query.id
          }
        }).then((res) => {
          const { data } = res;
          this.form = data;
        });
      }
    }
  }
</script>
