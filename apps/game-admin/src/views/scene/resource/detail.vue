<template>
  <div class="app-container">
    <BvaHeader :title="(isEdit ? `编辑` : `新建`) + '资源'"/>
    <BvaBody>
      <el-form :model="form" inline label-width="140px" ref="form">

        <!-- 资源名 -->
        <div>
          <el-form-item label="资源名：" prop="name" :rules="$genRules({rule:/.+/,message:'资源名输入有误'})">
            <el-input v-model="form.name" placeholder="请输入资源名" class="bc-width-400"/>
          </el-form-item>
        </div>

        <!-- 资源简介 -->
        <div>
          <el-form-item label="资源简介：" prop="description" :rules="$genRules({rule:/.+/,message:'资源名输入有误'})">
            <el-input v-model="form.description" placeholder="请输入资源简介" class="bc-width-400"/>
          </el-form-item>
        </div>

        <!-- 资源类型 -->
        <div>
          <el-form-item label="资源类型：" prop="type" :rules="$genRules({rule:/.+/,message:'请选择资源类型'})">
            <SelectConfigType v-model="form.type" name="RESOURCE_TYPE" class="bc-width-400"
                              @change="form.durationType = 0;(form.type !== 3 && (form.occupation = ''))"/>
          </el-form-item>
        </div>

        <!-- 职业 -->
        <div v-if="form.type === 3">
          <el-form-item label="职业：" prop="occupation" :rules="$genRules({rule:/.+/,message:'请选择职业'})">
            <SelectToApi v-model="form.occupation" api="/scene/occupation/list" class="bc-width-400"
                         valueKey="id" labelKey="name"/>
          </el-form-item>
        </div>

        <!-- 时效类型 -->
        <div v-if="form.type === 1">
          <el-form-item label="时效类型：" prop="durationType" :rules="$genRules({rule:/.+/,message:'请选择时效类型'})">
            <SelectConfigType v-model="form.durationType" name="DURATION_TYPE" class="bc-width-400"
                              @change="form.durationType !== 3 && (form.duration = 0)"/>
          </el-form-item>
        </div>

        <!-- 时效时间 -->
        <div v-if="form.durationType === 3">
          <el-form-item label="资源时效：" prop="duration" :rules="$genRules({rule:/.+/,message:'资源时效输入有误'})">
            <el-input v-model="form.duration" placeholder="" class="bc-width-400"/>
          </el-form-item>
        </div>

        <!-- 是否可交易 -->
        <div>
          <el-form-item label="是否可交易：" prop="trade" :rules="$genRules({rule:/.+/,message:'请选择是否可交易'})">
            <SelectConfigType v-model="form.trade" name="TRUE_OR_FALSE_TYPE" class="bc-width-400"/>
          </el-form-item>
        </div>

        <!-- 价格 -->
        <div>
          <el-form-item label="价格：" prop="price" :rules="$genRules({rule:/^\d+$/,message:'价格输入有误'})">
            <el-input v-model.number="form.price" placeholder="请输入价格" class="bc-width-400"/>
          </el-form-item>
        </div>

        <!-- 售出价格 -->
        <div>
          <el-form-item label="售出价格：" prop="marketPrice" :rules="$genRules({rule:/^\d+$/,message:'售出价格输入有误'})">
            <el-input v-model.number="form.marketPrice" placeholder="请输入价格" class="bc-width-400"/>
          </el-form-item>
        </div>

        <!-- hp -->
        <div>
          <el-form-item label="hp：" prop="hp" :rules="$genRules({rule:/^\d+$/,message:'hp输入有误'})">
            <el-input v-model.number="form.hp" placeholder="请输入hp" class="bc-width-400"/>
          </el-form-item>
        </div>

        <!-- mp -->
        <div>
          <el-form-item label="mp：" prop="mp" :rules="$genRules({rule:/^\d+$/,message:'hp输入有误'})">
            <el-input v-model.number="form.mp" placeholder="请输入mp" class="bc-width-400"/>
          </el-form-item>
        </div>

        <!-- exp -->
        <div>
          <el-form-item label="exp：" prop="exp" :rules="$genRules({rule:/^\d+$/,message:'exp输入有误'})">
            <el-input v-model.number="form.exp" placeholder="请输入exp" class="bc-width-400"/>
          </el-form-item>
        </div>

        <!-- 是否绑定 -->
        <div>
          <el-form-item label="是否绑定：" prop="exp" :rules="$genRules({rule:/^\d+$/,message:'exp输入有误'})">
            <SelectConfigType name="TRUE_OR_FALSE_TYPE" v-model="form.isBind" class="bc-width-400"/>
          </el-form-item>
        </div>

        <!-- 物理攻击 -->
        <div>
          <el-form-item label="物理攻击：" prop="physicalAttack" :rules="$genRules({rule:/^\d+$/,message:'物理攻击值输入有误'})">
            <el-input v-model.number="form.physicalAttack" placeholder="请输入物理攻击" class="bc-width-400"/>
          </el-form-item>
        </div>

        <!-- 物理防御 -->
        <div>
          <el-form-item label="物理防御：" prop="physicalDefense" :rules="$genRules({rule:/^\d+$/,message:'物理防御输入有误'})">
            <el-input v-model.number="form.physicalDefense" placeholder="请输入物理防御" class="bc-width-400"/>
          </el-form-item>
        </div>

        <!-- 魔法攻击 -->
        <div>
          <el-form-item label="魔法攻击：" prop="magicAttack" :rules="$genRules({rule:/^\d+$/,message:'魔法攻击输入有误'})">
            <el-input v-model.number="form.magicAttack" placeholder="请输入魔法攻击" class="bc-width-400"/>
          </el-form-item>
        </div>

        <!-- 魔法防御 -->
        <div>
          <el-form-item label="魔法防御：" prop="magicDefense" :rules="$genRules({rule:/^\d+$/,message:'魔法防御输入有误'})">
            <el-input v-model.number="form.magicDefense" placeholder="请输入魔法防御" class="bc-width-400"/>
          </el-form-item>
        </div>

        <!-- 暴击率 -->
        <div>
          <el-form-item label="暴击率：" prop="crit" :rules="$genRules({rule:/^\d+$/,message:'暴击率输入有误'})">
            <el-input v-model.number="form.crit" placeholder="请输入暴击率" class="bc-width-400"/>
          </el-form-item>
        </div>

        <!-- 命中率 -->
        <div>
          <el-form-item label="命中率：" prop="hit" :rules="$genRules({rule:/^\d+$/,message:'命中率输入有误'})">
            <el-input v-model.number="form.hit" placeholder="请输入命中率" class="bc-width-400"/>
          </el-form-item>
        </div>

        <!-- 闪避率 -->
        <div>
          <el-form-item label="闪避率：" prop="dodge" :rules="$genRules({rule:/^\d+$/,message:'闪避率输入有误'})">
            <el-input v-model.number="form.dodge" placeholder="请输入闪避率" class="bc-width-400"/>
          </el-form-item>
        </div>

        <!-- 暴抗率 -->
        <div>
          <el-form-item label="暴抗率：" prop="critResistance" :rules="$genRules({rule:/^\d+$/,message:'暴击抵抗率输入有误'})">
            <el-input v-model.number="form.critResistance" placeholder="请输入暴抗率" class="bc-width-400"/>
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
      description: '',
      //资源类型
      type: '',
      //职业使用类型
      occupation: ``,
      //是否可交易
      trade: 1,
      //售价，针对npc商店的售价
      price: 1,
      //出售价，针对npc商店的售价
      marketPrice: 1,
      //是否绑定
      isBind: 0,
      //时效性类型
      durationType: 0,
      //资源的时效时间
      duration: 0,
      //下列属性可以参照资源类型来处理
      hp: 0,
      mp: 0,
      exp: 0,
      physicalAttack: 0,
      physicalDefense: 0,
      magicAttack: 0,
      magicDefense: 0,
      //暴击率
      crit: 0,
      //命中率
      hit: 0,
      //闪避率
      dodge: 0,
      //暴击抵抗率
      critResistance: 0
    }
  }

  export default {
    name: "resourceDetail",
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
        const query = this.$route.query;
        this.$axios.get(`/scene/resource/detail`, {
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
          const api = this.isEdit ? `/scene/resource/update` : `/scene/resource/create`;
          this.$axios.post(api, this.form)
            .then(() => {
              this.$router.back();
            });
        });
      }
    }
  }
</script>
