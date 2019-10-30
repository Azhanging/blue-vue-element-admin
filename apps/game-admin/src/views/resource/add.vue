<template>
  <div class="app-container">
    <BvaHeader title="新建资源"/>
    <BvaBody>
      <el-form :model="form" inline label-width="140px" ref="form">

        <div>
          <el-form-item label="资源名" prop="name" :rules="$genRules({rule:/.+/,message:'资源名输入有误'})">
            <el-input v-model="form.name" placeholder="请输入资源名"/>
          </el-form-item>
        </div>

        <div>
          <el-form-item label="资源简介" prop="desc" :rules="$genRules({rule:/.+/,message:'资源名输入有误'})">
            <el-input v-model="form.desc" placeholder="请输入资源简介"/>
          </el-form-item>
        </div>

        <div>
          <el-form-item label="资源类型" prop="type" :rules="$genRules({rule:/.+/,message:'请选择资源类型'})">
            <el-select v-model.number="form.type" placeholder="请选择资源类型">
              <el-option v-for="(item,index) in resourceType"
                         :label="item.label"
                         :value="item.value" :key="index"/>
            </el-select>
          </el-form-item>
        </div>

        <div>
          <el-form-item label="是否可交易" prop="trade" :rules="$genRules({rule:/.+/,message:'请选择是否可交易'})">
            <el-select v-model.number="form.trade" placeholder="请选择是否可交易">
              <el-option v-for="(item,index) in tradeType"
                         :label="item.label"
                         :value="item.value" :key="index"/>
            </el-select>
          </el-form-item>
        </div>

        <div>
          <el-form-item label="价格" prop="price" :rules="$genRules({rule:/^\d+$/,message:'价格输入有误'})">
            <el-input v-model.number="form.price" placeholder="请输入价格"/>
          </el-form-item>
        </div>

        <div class="bc-pd-14">
          <el-button @click="submit" type="primary">
            提交
          </el-button>
        </div>

      </el-form>
    </BvaBody>
  </div>
</template>

<script>
  //常量
  import $const from '@/const';

  export default {
    name: "resource-add",
    computed: {
      //编辑状态
      isEdit() {
        return this.$route.query.type === 'edit';
      }
    },
    created() {
      //编辑状态
      if (this.isEdit) {
        this.getInfo();
      }
    },
    data() {
      return {
        form: {
          name: '',
          desc: '',
          type: '',
          trade: '',
          price: ''
        },
        //资源类型
        resourceType: $const.getResourceType(),
        //是否可交易
        tradeType: $const.getTradeType()
      };
    },
    methods: {
      getInfo() {
        this.$axios.get(``).then((data) => {
          this.form = data;
        });
      },
      submit() {
        this.$refs['form'].validate((status) => {
          if (!status) return;
          this.$axios.post(`/resource/add`, this.form)
            .then(() => {
              this.$router.back();
            });
        });
      }
    }
  }
</script>
