<template>
  <div class="app-container">
    <BvaHeader :title="(isEdit ? `编辑` : `新建`) + '职业'"/>
    <BvaBody>
      <el-form :model="form" inline label-width="140px" ref="form">

        <!-- 职业名 -->
        <div>
          <el-form-item label="职业名：" prop="name" :rules="$genRules({rule:/.+/,message:'职业名输入有误'})">
            <el-input v-model="form.name" placeholder="请输入职业名" class="bc-width-400"/>
          </el-form-item>
        </div>

        <!-- 职业简介 -->
        <div>
          <el-form-item label="职业简介：" prop="description" :rules="$genRules({rule:/.+/,message:'职业名输入有误'})">
            <el-input v-model="form.description" placeholder="请输入职业简介" class="bc-width-400"/>
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

        <!-- 技能 -->
        <div>
          <el-form-item label="技能：" :rules="$genRules({type:'array',message:'请选择技能'})">
            <SelectToApi v-model="form.skill" :multiple="true" api="/scene/skill/list" valueKey="id"
                         :labelKey="(item)=>`${item.name},LV:${item.level}`"
                         class="bc-width-400"/>
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
      //职业类型
      name: '',
      //职业简介
      description: '',
      hp: 1,
      mp: 1,
      //技能
      skill: [],
      physicalAttack: 1,
      physicalDefense: 1,
      magicAttack: 1,
      magicDefense: 1,
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
        this.$axios.get(`/scene/occupation/detail`, {
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
          const api = this.isEdit ? `/scene/occupation/update` : `/scene/occupation/create`;
          this.$axios.post(api, this.form)
            .then(() => {
              this.$router.back();
            });
        });
      }
    }
  }
</script>
