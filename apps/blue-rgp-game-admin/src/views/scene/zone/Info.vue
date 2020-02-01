<template>
  <div>
    <div class="app-container">
      <BvaHeader :title="`${isEdit?'更新':'新增'}游戏区域`"/>
      <BvaBody>
        <el-form inline ref="form" label-width="200px" :model="form">
          <div>
            <el-form-item label="区域名：" prop="name" :rules="$genRules({rule:/.+/,message:'区域名输入有误'})">
              <el-input v-model="form.name" placeholder="输入区域名" class="bz-width-400"/>
            </el-form-item>
          </div>

          <div>
            <el-form-item label="区域简介：" prop="description" :rules="$genRules({rule:/.+/,message:'区域名输入有误'})">
              <el-input type="textarea" v-model="form.description" placeholder="输入区域简介" class="bz-width-400"/>
            </el-form-item>
          </div>

        </el-form>
      </BvaBody>
    </div>
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
    name: "zone-info",
    data() {
      return {
        form: {
          name: '',
          description: ''
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
      getInfo() {
        const query = this.$route.query;
        this.$axios.get(`/scene/zone/info`, {
          params: {
            id: query.id
          }
        }).then((res) => {
          const { data } = res;
          this.form = data;
        });
      },
      submit() {
        this.$refs['form'].validate((status) => {
          if (!status) return;
          const api = this.isEdit ? `/scene/zone/update` : `/scene/zone/create`;
          this.$axios.post(api, this.form).then(() => {
            this.$router.back();
          });
        });
      }
    }
  }
</script>
