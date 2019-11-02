<template>
  <div>
    <div class="app-container">
      <BvaHeader title="新增配置"/>

      <BvaBody>
        <el-form inline ref="form" label-width="200px" :model="form">
          <div>
            <el-form-item label="配置NAME：" prop="name" :rules="$genRules({rule:/.+/,message:'配置NAME输入有误'})">
              <el-input v-model="form.name" placeholder="配置NAME" class="el-form-elm-width-400"/>
            </el-form-item>
          </div>

          <div>
            <el-form-item label="配置VALUE：" prop="value" :rules="$genRules({rule:/.+/,message:'配置VALUE输入有误'})">
              <el-input v-model="form.value" placeholder="配置VALUE" class="el-form-elm-width-400"/>
            </el-form-item>
          </div>

          <div>
            <el-form-item label="配置注释：" prop="comments" :rules="$genRules({rule:/.+/,message:'配置注释输入有误'})">
              <el-input v-model="form.comments" placeholder="配置value" class="el-form-elm-width-400"/>
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
    name: "configAdd",
    data() {
      return {
        form: {
          //配置key
          name: '',
          //配置的value
          value: '',
          //注释
          comments:''
        }
      }
    },
    methods: {
      submit() {
        this.$refs['form'].validate((status) => {
          if (!status) return;
          this.$axios.post(`/config/add`, this.form).then(() => {
            this.$router.back();
          });
        });
      }
    }
  }
</script>
