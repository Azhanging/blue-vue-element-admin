<template>
  <div class="app-container">
    <BvaHeader :title="(isEdit ? `编辑` : `新建`) + '怪物'"/>
    <BvaBody>
      <el-form :model="form" inline label-width="140px" ref="form">

        <div>
          <el-form-item label="怪物名：" prop="name" :rules="$genRules({rule:/.+/,message:'怪物名输入有误'})">
            <el-input v-model="form.name" placeholder="请输入怪物名" class="bc-width-400"/>
          </el-form-item>
        </div>

        <div>
          <el-form-item label="怪物简介：" prop="description" :rules="$genRules({rule:/.+/,message:'怪物名输入有误'})">
            <el-input v-model="form.description" placeholder="请输入怪物名简介" class="bc-width-400"/>
          </el-form-item>
        </div>

        <div>
          <el-form-item label="hp：" prop="hp" :rules="$genRules({rule:/^\d+$/,message:'hp输入有误'})">
            <el-input v-model.number="form.hp" placeholder="请输入hp" class="bc-width-400"/>
          </el-form-item>
        </div>

        <div>
          <el-form-item label="mp：" prop="mp" :rules="$genRules({rule:/^\d+$/,message:'hp输入有误'})">
            <el-input v-model.number="form.mp" placeholder="请输入mp" class="bc-width-400"/>
          </el-form-item>
        </div>

        <div>
          <div>
            <el-form-item label="奖励：" prop="reward" :rules="$genRules({type:'array',message:'请添加奖励'})">
              <el-table border stripe tooltip-effect="light" :data="form.reward" class="bc-width-800">
                <el-table-column align="center" label="类型">
                  <template slot-scope="scope">
                    <SelectConfigType v-model="scope.row.type" name="REWARD_TYPE" disabled/>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="资源" prop="resourceName">
                  <template slot-scope="scope">
                    <!-- 资源列表 -->
                    <SelectToApi api="/scene/resource/list" v-model="scope.row.resourceId" v-if="scope.row.type === 1"/>
                    <template v-else>
                      -
                    </template>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="奖励概率">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.chance" placeholder="请输入奖励概率" v-if="scope.row.type === 1"/>
                    <template v-else>
                      {{scope.row.chance}}
                    </template>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="量值">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.amount" placeholder="请输入量值"/>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="操作">
                  <template slot-scope="scope">
                    <el-button @click="form.reward.splice(scope.$index,1)">
                      删除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-form-item>
          </div>
          <div>
            <el-form-item label=" ">
              <!-- 奖励类型 -->
              <SelectConfigType v-model.number="rewardData.type" name="REWARD_TYPE" class="bc-width-200"
                                @change="changeRewardType"/>
              <!-- 资源列表 -->
              <SelectToApi api="/scene/resource/list" v-model.number="rewardData.resourceId"
                           v-show="rewardData.type === 1"/>
              <!-- 概率掉落 -->
              <el-input v-show="rewardData.type === 1" v-model.number="rewardData.chance" class="bc-width-200"
                        placeholder="资源概率掉落1-100"/>
              <!-- 奖励的数量或者是奖励的量值 -->
              <el-input v-model.number="rewardData.amount" class="bc-width-200"
                        placeholder="奖励的数量或者是奖励的量值"/>

              <el-button @click="addReward">
                添加
              </el-button>

            </el-form-item>
          </div>
        </div>

        <div>
          <el-form-item label="物理攻击：" prop="physicalAttack" :rules="$genRules({rule:/^\d+$/,message:'输入物理攻击值输入有误'})">
            <el-input v-model.number="form.physicalAttack" placeholder="请输入物理攻击值" class="bc-width-400"/>
          </el-form-item>
        </div>

        <div>
          <el-form-item label="物理防御：" prop="physicalDefense" :rules="$genRules({rule:/^\d+$/,message:'物理防御值输入有误'})">
            <el-input v-model.number="form.physicalDefense" placeholder="请输入hp" class="bc-width-400"/>
          </el-form-item>
        </div>

        <div>
          <el-form-item label="魔法攻击：" prop="magicAttack" :rules="$genRules({rule:/^\d+$/,message:'魔法攻击值输入有误'})">
            <el-input v-model.number="form.magicAttack" placeholder="请输入hp" class="bc-width-400"/>
          </el-form-item>
        </div>

        <div>
          <el-form-item label="魔法防御：" prop="magicDefense" :rules="$genRules({rule:/^\d+$/,message:'魔法防御值输入有误'})">
            <el-input v-model.number="form.magicDefense" placeholder="请输入hp" class="bc-width-400"/>
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
      //奖励
      reward: [],
      //下列属性可以参照资源类型来处理
      hp: 1,
      mp: 1,
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

  //获取资源数据
  function getRewardData() {
    return {
      //奖励类型
      type: 1,
      //奖励的数量
      amount: 1,
      //资源id
      resourceId: '',
      //概率
      chance: 100
    };
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
        form: getFormData(),
        //奖励数据
        rewardData: getRewardData(),
        //资源列表
        resourceList: [],
        //奖励类型列表
        rewardTypeList: []
      };
    },
    methods: {
      //修改奖励的类型
      changeRewardType() {
        this.rewardData.chance = 100;
      },
      getInfo() {
        const query = this.$route.query;
        this.$axios.get(`/scene/monster/detail`, {
          params: {
            id: query.id
          }
        }).then((res) => {
          const { data } = res;
          this.form = data;
        });
      },

      clearRewardData() {
        this.rewardData = getRewardData();
      },

      //添加资源到数组中
      addReward() {
        const rewardData = this.rewardData;
        if (rewardData.type === 1 && !rewardData.chance && !rewardData.resourceId) {
          this.$message({
            message: `请选择资源和填写概率`,
            type: 'error'
          });
          return;
        }
        this.form.reward.push(rewardData);
        this.clearRewardData();
      },

      submit() {
        this.$refs['form'].validate((status) => {
          if (!status) return;
          const api = this.isEdit ? `/scene/monster/update` : `/scene/monster/create`;
          this.$axios.post(api, this.form)
            .then(() => {
              this.$router.back();
            });
        });
      }
    }
  }
</script>
