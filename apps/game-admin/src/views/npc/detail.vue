<template>
  <div>
    <div class="app-container">
      <BvaHeader :title="`${isEdit?'更新':'新增'}配置`"/>

      <BvaBody>
        <el-form inline ref="form" label-width="200px" :model="form">
          <div>
            <el-form-item label="NPC名：" prop="name" :rules="$genRules({rule:/.+/,message:'NPC名输入有误'})">
              <el-input v-model="form.name" placeholder="配置NAME" class="bc-width-400"/>
            </el-form-item>
          </div>

          <div>
            <el-form-item label="NPC简介：" prop="description" :rules="$genRules({rule:/.+/,message:'NPC简介输入有误'})">
              <el-input type="textarea" v-model="form.description" placeholder="配置VALUE" class="bc-width-400"/>
            </el-form-item>
          </div>

          <div>
            <el-form-item label="是否为商人：" prop="isChapman" :rules="$genRules({rule:/.+/,message:'配置注释输入有误'})">
              <SelectConfigType v-model="form.isChapman" name="TRUE_OR_FALSE_TYPE" class="bc-width-400"/>
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
    name: "npcDetail",
    data() {
      return {
        form: {
          name: '',
          isChapman: '',
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
        this.getDetail();
      }
    },
    methods: {
      getDetail() {
        const query = this.$route.query;
        this.$axios.get(`/npc/detail`, {
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
          const api = this.isEdit ? `/npc/update` : `/npc/create`;
          this.$axios.post(api, this.form).then(() => {
            this.$router.back();
          });
        });
      }
    }
  }
</script>
