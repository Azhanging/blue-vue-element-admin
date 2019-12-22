<template>
  <div>
    <div class="app-container">
      <BvaHeader :title="`${isEdit?'更新':'新增'}配置`"/>

      <BvaBody>
        <el-form inline ref="form" label-width="200px" :model="form">
          <div>
            <el-form-item label="配置NAME：" prop="name" :rules="$genRules({rule:/.+/,message:'配置NAME输入有误'})">
              <el-input v-model="form.name" placeholder="配置NAME" class="bc-width-400"/>
            </el-form-item>
          </div>

          <div>
            <el-form-item label="配置VALUE：" prop="value" :rules="$genRules({rule:/.+/,message:'配置VALUE输入有误'})">
              <el-input type="textarea" v-model="form.value" placeholder="配置VALUE" class="bc-width-400"/>
            </el-form-item>
          </div>

          <div>
            <el-form-item label="配置注释：" prop="comments" :rules="$genRules({rule:/.+/,message:'配置注释输入有误'})">
              <el-input v-model="form.comments" placeholder="配置value" class="bc-width-400"/>
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
    name: "configDetail",
    data() {
      return {
        form: {
          //配置key
          name: '',
          //配置的value
          value: '',
          //注释
          comments: ''
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
        this.getDetail();
      }
    },
    methods: {
      getDetail() {
        const query = this.$route.query;
        this.$axios.get(`/config/detail`, {
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
          const api = this.isEdit ? `/config/update` : `/config/create`;
          this.$axios.post(api, this.form).then(() => {
            this.$router.back();
          });
        });
      }
    }
  }
</script>
