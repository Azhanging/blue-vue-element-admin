<template>
  <div class="app-container">
    <BvaHeader title="新建资源"/>
    <BvaBody>
      <el-form :model="form" inline label-width="140px" ref="form">

        <div>
          <el-form-item label="资源名：" prop="name" :rules="$genRules({rule:/.+/,message:'资源名输入有误'})">
            <el-input v-model="form.name" placeholder="请输入资源名" class="el-form-elm-width-400"/>
          </el-form-item>
        </div>

        <div>
          <el-form-item label="资源简介：" prop="desc" :rules="$genRules({rule:/.+/,message:'资源名输入有误'})">
            <el-input v-model="form.desc" placeholder="请输入资源简介" class="el-form-elm-width-400"/>
          </el-form-item>
        </div>

        <div>
          <el-form-item label="资源类型：" prop="type" :rules="$genRules({rule:/.+/,message:'请选择资源类型'})">
            <SelectConfigType v-model="form.type" name="RESOURCE_TYPE" class="el-form-elm-width-400"/>
          </el-form-item>
        </div>

        <div>
          <el-form-item label="是否可交易：" prop="trade" :rules="$genRules({rule:/.+/,message:'请选择是否可交易'})">
            <SelectConfigType v-model="form.trade" name="TRUE_OR_FALSE_TYPE" class="el-form-elm-width-400"/>
          </el-form-item>
        </div>

        <div>
          <el-form-item label="价格：" prop="price" :rules="$genRules({rule:/^\d+$/,message:'价格输入有误'})">
            <el-input v-model.number="form.price" placeholder="请输入价格" class="el-form-elm-width-400"/>
          </el-form-item>
        </div>

        <div>
          <el-form-item label="售出价格：" prop="marketPrice" :rules="$genRules({rule:/^\d+$/,message:'售出价格输入有误'})">
            <el-input v-model.number="form.marketPrice" placeholder="请输入价格" class="el-form-elm-width-400"/>
          </el-form-item>
        </div>

        <div>
          <el-form-item label="hp：" prop="hp" :rules="$genRules({rule:/^\d+$/,message:'hp输入有误'})">
            <el-input v-model.number="form.hp" placeholder="请输入hp" class="el-form-elm-width-400"/>
          </el-form-item>
        </div>

        <div>
          <el-form-item label="mp：" prop="mp" :rules="$genRules({rule:/^\d+$/,message:'hp输入有误'})">
            <el-input v-model.number="form.mp" placeholder="请输入mp" class="el-form-elm-width-400"/>
          </el-form-item>
        </div>

        <div>
          <el-form-item label="exp：" prop="exp" :rules="$genRules({rule:/^\d+$/,message:'exp输入有误'})">
            <el-input v-model.number="form.exp" placeholder="请输入exp" class="el-form-elm-width-400"/>
          </el-form-item>
        </div>

        <div>
          <el-form-item label="物理攻击：" prop="physicalAttack" :rules="$genRules({rule:/^\d+$/,message:'输入物理攻击值输入有误'})">
            <el-input v-model.number="form.physicalAttack" placeholder="请输入物理攻击值" class="el-form-elm-width-400"/>
          </el-form-item>
        </div>

        <div>
          <el-form-item label="物理防御：" prop="physicalDefense" :rules="$genRules({rule:/^\d+$/,message:'物理防御值输入有误'})">
            <el-input v-model.number="form.physicalDefense" placeholder="请输入hp" class="el-form-elm-width-400"/>
          </el-form-item>
        </div>

        <div>
          <el-form-item label="魔法攻击：" prop="magicAttack" :rules="$genRules({rule:/^\d+$/,message:'魔法攻击值输入有误'})">
            <el-input v-model.number="form.magicAttack" placeholder="请输入hp" class="el-form-elm-width-400"/>
          </el-form-item>
        </div>

        <div>
          <el-form-item label="魔法防御：" prop="magicDefense" :rules="$genRules({rule:/^\d+$/,message:'魔法防御值输入有误'})">
            <el-input v-model.number="form.magicDefense" placeholder="请输入hp" class="el-form-elm-width-400"/>
          </el-form-item>
        </div>

        <BvaFooter>
          <el-button @click="submit" type="primary">
            提交
          </el-button>
        </BvaFooter>

      </el-form>
    </BvaBody>
  </div>
</template>

<script>

  function getFormData() {
    return {
      //资源类型
      name: '',
      //资源简介
      desc: '',
      //资源类型
      type: '',
      //是否可交易
      trade: 1,
      //售价，针对npc商店的售价
      price: 1,
      //出售价，针对npc商店的售价
      marketPrice: 1,
      //下列属性可以参照资源类型来处理
      hp: 0,
      mp: 0,
      exp: 0,
      physicalAttack: 0,
      physicalDefense: 0,
      magicAttack: 0,
      magicDefense: 0
    }
  }

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
        form: getFormData()
      };
    },
    methods: {
      getInfo() {
        this.$axios.get(`/detail`).then((data) => {
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
