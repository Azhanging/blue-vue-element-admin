<template>
  <div>
    <div class="app-container">
      <BvaHeader :title="`${isEdit?'更新':'新增'}NPC`"/>

      <BvaBody>
        <el-form inline ref="form" label-width="200px" :model="form">
          <div>
            <el-form-item label="NPC名：" prop="name" :rules="$genRules({rule:/.+/,message:'NPC名输入有误'})">
              <el-input v-model="form.name" placeholder="NPC名" class="bc-width-400"/>
            </el-form-item>
          </div>

          <div>
            <el-form-item label="NPC简介：" prop="description" :rules="$genRules({rule:/.+/,message:'NPC简介输入有误'})">
              <el-input type="textarea" v-model="form.description" placeholder="请输入NPC简介" class="bc-width-400"/>
            </el-form-item>
          </div>

          <div>
            <el-form-item label="是否为商人：" prop="isChapman" :rules="$genRules({rule:/.+/,message:'请选择是否为商人'})">
              <SelectConfigType v-model="form.isChapman" name="TRUE_OR_FALSE_TYPE" class="bc-width-400" @change="(val)=>{(val===0) && (form.resource = [])}"/>
            </el-form-item>
          </div>

          <div v-if="form.isChapman === 1" key="resource">
            <el-form-item label="绑定资源：" prop="resource" :rules="$genRules({type:'array',message:'请选择绑定资源'})">
              <SelectToApi v-model="form.resource" api="/scene/resource/list" class="bc-width-400" :multiple="true"/>
            </el-form-item>
          </div>

          <div>
            <el-form-item label="绑定任务：">
              <SelectToApi v-model="form.task" api="/scene/task/list" class="bc-width-400" :multiple="true"/>
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
          description: '',
          //是否为商人
          isChapman: '',
          //绑定任务
          task: [],
          //资源
          resource: []
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
        this.$axios.get(`/scene/npc/detail`, {
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
          const api = this.isEdit ? `/scene/npc/update` : `/scene/npc/create`;
          this.$axios.post(api, this.form).then(() => {
            this.$router.back();
          });
        });
      }
    }
  }
</script>
