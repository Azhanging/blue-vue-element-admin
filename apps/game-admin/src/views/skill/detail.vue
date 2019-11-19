<template>
  <div class="app-container">
    <BvaHeader :title="(isEdit ? `编辑` : `新建`) + '技能'"/>
    <BvaBody>
      <el-form :model="form" inline label-width="200px" ref="form">

        <!-- 技能名 -->
        <div>
          <el-form-item label="技能名：" prop="name" :rules="$genRules({rule:/.+/,message:'技能名输入有误'})">
            <el-input v-model="form.name" placeholder="请输入技能名" class="bc-width-400"/>
          </el-form-item>
        </div>

        <!-- 技能简介 -->
        <div>
          <el-form-item label="技能简介：" prop="description" :rules="$genRules({rule:/.+/,message:'技能名输入有误'})">
            <el-input v-model="form.description" placeholder="请输入技能简介" class="bc-width-400"/>
          </el-form-item>
        </div>

        <!-- 等级 -->
        <div>
          <el-form-item label="等级：" prop="level" :rules="$genRules({rule:/^\d+$/,message:'等级输入有误'})">
            <el-input v-model.number="form.level" placeholder="请输入等级" class="bc-width-400"/>
          </el-form-item>
        </div>

        <!-- 消耗 -->
        <div>
          <el-form-item label="消耗hp：" prop="consumeHp" :rules="$genRules({rule:/^\d+$/,message:'消耗hp输入有误'})">
            <el-input v-model.number="form.consumeHp" placeholder="请输入消耗hp" class="bc-width-400"/>
          </el-form-item>
        </div>

        <div>
          <el-form-item label="消耗mp：" prop="consumeMp" :rules="$genRules({rule:/^\d+$/,message:'消耗mp输入有误'})">
            <el-input v-model.number="form.consumeMp" placeholder="请输入消耗mp" class="bc-width-400"/>
          </el-form-item>
        </div>

        <!-- 是否为增益 -->
        <div>
          <el-form-item label="增益：" prop="isGain" :rules="$genRules({rule:/^\d+$/,message:'请选择增益'})">
            <SelectConfigType name="TRUE_OR_FALSE_TYPE" v-model="form.isGain" class="bc-width-400"
                              @change="changeGain"/>
          </el-form-item>
        </div>

        <!-- hp -->
        <div>
          <el-form-item label="hp：" prop="hp" :rules="$genRules({rule:/^\d+$/,message:'hp输入有误'})">
            <el-input v-model.number="form.hp" placeholder="请输入hp" class="bc-width-400"/>
          </el-form-item>
        </div>

        <div v-if="form.isGain === 1">
          <el-form-item label="hp增益：" prop="hpGain" :rules="$genRules({rule:/^\d+$/,message:'hp增益输入有误'})">
            <el-input v-model.number="form.hpGain" placeholder="请输入hp增益" class="bc-width-400"/>
          </el-form-item>
        </div>

        <div v-if="form.isGain === 1">
          <el-form-item label="hp增益持续时间：" prop="hpGainDuration"
                        :rules="$genRules({rule:/^\d+$/,message:'hp增益持续时间输入有误'})">
            <el-input v-model.number="form.hpGainDuration" placeholder="请输入hp增益持续时间" class="bc-width-400"/>
          </el-form-item>
        </div>

        <!-- mp -->
        <div>
          <el-form-item label="mp：" prop="mp" :rules="$genRules({rule:/^\d+$/,message:'mp输入有误'})">
            <el-input v-model.number="form.mp" placeholder="请输入mp" class="bc-width-400"/>
          </el-form-item>
        </div>

        <div v-if="form.isGain === 1">
          <el-form-item label="mp增益：" prop="mpGain" :rules="$genRules({rule:/^\d+$/,message:'mp增益输入有误'})">
            <el-input v-model.number="form.mpGain" placeholder="请输入mp增益" class="bc-width-400"/>
          </el-form-item>
        </div>

        <div v-if="form.isGain === 1">
          <el-form-item label="mp增益持续时间：" prop="mpGainDuration"
                        :rules="$genRules({rule:/^\d+$/,message:'mp增益持续时间输入有误'})">
            <el-input v-model.number="form.mpGainDuration" placeholder="请输入mp增益持续时间" class="bc-width-400"/>
          </el-form-item>
        </div>

        <!-- 物理攻击 -->
        <div>
          <el-form-item label="物理攻击：" prop="physicalAttack" :rules="$genRules({rule:/^\d+$/,message:'物理攻击输入有误'})">
            <el-input v-model.number="form.physicalAttack" placeholder="请输入物理攻击" class="bc-width-400"/>
          </el-form-item>
        </div>

        <div v-if="form.isGain === 1">
          <el-form-item label="物理攻击增益：" prop="physicalAttackGain"
                        :rules="$genRules({rule:/^\d+$/,message:'物理攻击增益输入有误'})">
            <el-input v-model.number="form.physicalAttackGain" placeholder="请输入物理攻击增益" class="bc-width-400"/>
          </el-form-item>
        </div>

        <div v-if="form.isGain === 1">
          <el-form-item label="物理攻击增益持续时间：" prop="physicalAttackGainDuration"
                        :rules="$genRules({rule:/^\d+$/,message:'物理攻击增益持续时间输入有误'})">
            <el-input v-model.number="form.physicalAttackGainDuration" placeholder="请输入物理攻击增益持续时间"
                      class="bc-width-400"/>
          </el-form-item>
        </div>

        <!-- 物理防御 -->
        <div v-if="form.isGain === 1">
          <el-form-item label="物理防御增益：" prop="physicalDefenseGain"
                        :rules="$genRules({rule:/^\d+$/,message:'物理防御增益输入有误'})">
            <el-input v-model.number="form.physicalDefenseGain" placeholder="请输入物理防御增益" class="bc-width-400"/>
          </el-form-item>
        </div>

        <div v-if="form.isGain === 1">
          <el-form-item label="物理防御增益持续时间：" prop="physicalDefenseGainDuration"
                        :rules="$genRules({rule:/^\d+$/,message:'物理防御增益持续时间输入有误'})">
            <el-input v-model.number="form.physicalDefenseGainDuration" placeholder="请输入物理防御增益持续时间"
                      class="bc-width-400"/>
          </el-form-item>
        </div>

        <!-- 魔法攻击 -->
        <div>
          <el-form-item label="魔法攻击：" prop="magicAttack" :rules="$genRules({rule:/^\d+$/,message:'魔法攻击输入有误'})">
            <el-input v-model.number="form.magicAttack" placeholder="请输入魔法攻击" class="bc-width-400"/>
          </el-form-item>
        </div>

        <div v-if="form.isGain === 1">
          <el-form-item label="魔法攻击增益：" prop="magicAttackGain" :rules="$genRules({rule:/^\d+$/,message:'魔法攻击增益输入有误'})">
            <el-input v-model.number="form.magicAttackGain" placeholder="请输入魔法攻击增益" class="bc-width-400"/>
          </el-form-item>
        </div>

        <div v-if="form.isGain === 1">
          <el-form-item label="魔法攻击增益持续时间：" prop="magicAttackGainDuration"
                        :rules="$genRules({rule:/^\d+$/,message:'魔法攻击增益持续时间输入有误'})">
            <el-input v-model.number="form.magicAttackGainDuration" placeholder="请输入魔法攻击增益持续时间" class="bc-width-400"/>
          </el-form-item>
        </div>

        <!-- 魔法防御 -->
        <div v-if="form.isGain === 1">
          <el-form-item label="魔法防御增益：" prop="magicDefenseGain" :rules="$genRules({rule:/^\d+$/,message:'魔法防御增益输入有误'})">
            <el-input v-model.number="form.magicDefenseGain" placeholder="请输入魔法防御增益" class="bc-width-400"/>
          </el-form-item>
        </div>

        <div v-if="form.isGain === 1">
          <el-form-item label="魔法防御增益持续时间：" prop="magicDefenseGainDuration"
                        :rules="$genRules({rule:/^\d+$/,message:'魔法防御增益持续时间输入有误'})">
            <el-input v-model.number="form.magicDefenseGainDuration" placeholder="请输入魔法防御增益持续时间" class="bc-width-400"/>
          </el-form-item>
        </div>

        <!-- 暴击率 -->
        <div v-if="form.isGain === 1">
          <el-form-item label="暴击率增益：" prop="critGain" :rules="$genRules({rule:/^\d+$/,message:'暴击率输入有误'})">
            <el-input v-model.number="form.critGain" placeholder="请输入暴击率" class="bc-width-400"/>
          </el-form-item>
        </div>

        <div v-if="form.isGain === 1">
          <el-form-item label="暴击率持续时间：" prop="critGainDuration"
                        :rules="$genRules({rule:/^\d+$/,message:'暴击率持续时间输入有误'})">
            <el-input v-model.number="form.critGainDuration" placeholder="请输入暴击率持续时间" class="bc-width-400"/>
          </el-form-item>
        </div>

        <!-- 命中率 -->
        <div v-if="form.isGain === 1">
          <el-form-item label="命中率增益：" prop="hitGain" :rules="$genRules({rule:/^\d+$/,message:'命中率输入有误'})">
            <el-input v-model.number="form.hitGain" placeholder="请输入命中率" class="bc-width-400"/>
          </el-form-item>
        </div>

        <div v-if="form.isGain === 1">
          <el-form-item label="命中率持续时间：" prop="hitGainDuration"
                        :rules="$genRules({rule:/^\d+$/,message:'命中率持续时间输入有误'})">
            <el-input v-model.number="form.hitGainDuration" placeholder="请输入命中率持续时间" class="bc-width-400"/>
          </el-form-item>
        </div>

        <!-- 闪避率 -->
        <div v-if="form.isGain === 1">
          <el-form-item label="闪避率增益：" prop="dodgeGain" :rules="$genRules({rule:/^\d+$/,message:'闪避率输入有误'})">
            <el-input v-model.number="form.dodgeGain" placeholder="请输入闪避率" class="bc-width-400"/>
          </el-form-item>
        </div>

        <div v-if="form.isGain === 1">
          <el-form-item label="闪避率持续时间：" prop="dodgeGainDuration"
                        :rules="$genRules({rule:/^\d+$/,message:'闪避率持续时间输入有误'})">
            <el-input v-model.number="form.dodgeGainDuration" placeholder="请输入闪避率持续时间" class="bc-width-400"/>
          </el-form-item>
        </div>

        <!-- 暴抗率 -->
        <div v-if="form.isGain === 1">
          <el-form-item label="暴抗率增益：" prop="critResistanceGain" :rules="$genRules({rule:/^\d+$/,message:'暴抗率输入有误'})">
            <el-input v-model.number="form.critResistanceGain" placeholder="请输入暴抗率" class="bc-width-400"/>
          </el-form-item>
        </div>

        <div v-if="form.isGain === 1">
          <el-form-item label="暴抗率持续时间：" prop="critResistanceGainDuration"
                        :rules="$genRules({rule:/^\d+$/,message:'暴抗率持续时间输入有误'})">
            <el-input v-model.number="form.critResistanceGainDuration" placeholder="请输入暴抗率持续时间" class="bc-width-400"/>
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
      //技能类型
      name: '',
      //技能简介
      description: '',

      hp: 0,
      hpGain: 0,
      hpGainDuration: 0,

      mp: 0,
      mpGain: 0,
      mpGainDuration: 0,

      physicalAttack: 0,
      physicalAttackGain: 0,
      physicalAttackGainDuration: 0,

      physicalDefenseGain: 0,
      physicalDefenseGainDuration: 0,

      magicAttack: 0,
      magicAttackGain: 0,
      magicAttackGainDuration: 0,

      magicDefenseGain: 0,
      magicDefenseGainDuration: 0,

      critGain: 0,
      critGainDuration: 0,

      hitGain: 0,
      hitGainDuration: 0,

      dodgeGain: 0,
      dodgeGainDuration: 0,

      critResistanceGain: 0,
      critResistanceGainDuration: 0,

      //消耗
      consumeHp: 0,
      consumeMp: 0,

      //等级
      level: 1,
      //是够增益类型
      isGain: 0
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

      //修改增益
      changeGain(val) {
        //清空增益内容
        if (val === 0) {
          const form = this.form;
          form.hpGain = form.hpGainDuration = 0;
          form.mpGain = form.mpGainDuration = 0;
          form.physicalAttackGain = form.physicalAttackGainDuration = 0;
          form.physicalDefenseGain = form.physicalDefenseGainDuration = 0;
          form.magicAttackGain = form.magicAttackGainDuration = 0;
          form.magicDefenseGain = form.magicDefenseGainDuration = 0;
          form.critGain = form.critGainDuration = 0;
          form.hitGain = form.hitGainDuration = 0;
          form.dodgeGain = form.dodgeGainDuration = 0;
          form.critGain = form.critGainDuration = 0;
        }
      },

      getInfo() {
        const query = this.$route.query;
        this.$axios.get(`/skill/detail`, {
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
          const api = this.isEdit ? `/skill/update` : `/skill/create`;
          this.$axios.post(api, this.form)
            .then(() => {
              this.$router.back();
            });
        });
      }
    }
  }
</script>
