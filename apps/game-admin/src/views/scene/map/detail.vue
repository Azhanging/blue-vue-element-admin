<template>
  <div>
    <div class="app-container">
      <BvaHeader :title="`${isEdit?'更新':'新增'}地图`"/>

      <BvaBody>
        <el-form inline ref="form" label-width="200px" :model="form">
          <div>
            <el-form-item label="地图名：" prop="name" :rules="$genRules({rule:/.+/,message:'地图名输入有误'})">
              <el-input v-model="form.name" placeholder="输入地图名" class="bc-width-400"/>
            </el-form-item>
          </div>

          <div>
            <el-form-item label="地图简介：" prop="description" :rules="$genRules({rule:/.+/,message:'地图名输入有误'})">
              <el-input type="textarea" v-model="form.description" placeholder="输入地图简介" class="bc-width-400"/>
            </el-form-item>
          </div>

          <div>
            <el-form-item label="其他地图：">
              <SelectToApi v-model="form.map" :multiple="true" api="/scene/map/list" valueKey="id" labelKey="name"
                           class="bc-width-400"/>
            </el-form-item>
          </div>

          <div>
            <el-form-item label="添加NPC：">
              <SelectToApi v-model="form.npc" :multiple="true" api="/scene/npc/list" valueKey="id" labelKey="name"
                           class="bc-width-400"/>
            </el-form-item>
          </div>

          <div>
            <el-form-item label="添加怪物：">
              <SelectToApi v-model="form.monster" :multiple="true" api="/scene/monster/list" valueKey="id" labelKey="name"
                           class="bc-width-400"/>
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
    name: "mapDetail",
    data() {
      return {
        form: {
          name: '',
          description: '',
          npc: [],
          monster: [],
          map: []
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
        this.$axios.get(`/scene/map/detail`, {
          params: {
            id: query.id
          }
        }).then((res) => {
          const {data} = res;
          this.form = data;
        });
      },
      submit() {
        this.$refs['form'].validate((status) => {
          if (!status) return;
          const api = this.isEdit ? `/scene/map/update` : `/scene/map/create`;
          this.$axios.post(api, this.form).then(() => {
            this.$router.back();
          });
        });
      }
    }
  }
</script>
