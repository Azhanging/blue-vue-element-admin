<template>
  <div class="app-container">
    <BvaHeader :title="`${isEdit?'更新':'新增'}房间`"/>

    <BvaBody>
      <el-form inline ref="form" label-width="200px" :model="form">

        <div>
          <el-form-item label="楼名：" prop="buildingId" :rules="$genRules({rule:/.+/,message:'请选择楼名'})">
            <SelectToApi api="/building/list" v-model="form.buildingId" class="bz-width-400"/>
          </el-form-item>
        </div>

        <div>
          <el-form-item label="房间名：" prop="name" :rules="$genRules({rule:/.+/,message:'房间名输入有误'})">
            <el-input v-model="form.name" placeholder="输入房间名" class="bz-width-400"/>
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
    name: "room-info",
    data() {
      return {
        form: {
          name: '',
          buildingId: ''
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
        const api = this.isEdit ? `/room/update` : `/room/create`;
        this.$axios.post(api, this.form).then(() => {
          this.$router.back();
        });
      },
      getInfo() {
        const query = this.$route.query;
        this.$axios.get(`/room/info`, {
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
