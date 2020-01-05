<template>
  <div class="app-container">
    <BvaHeader :title="(isEdit ? `编辑` : `新建`) + '任务'"/>
    <BvaBody>
      <el-form :model="form" inline label-width="140px" ref="form">

        <!--任务名-->
        <div>
          <el-form-item label="任务名：" prop="name" :rules="$genRules({rule:/.+/,message:'任务名输入有误'})">
            <el-input v-model="form.name" placeholder="请输入任务名" class="bc-width-400"/>
          </el-form-item>
        </div>

        <!--任务简介-->
        <div>
          <el-form-item label="任务简介：" prop="description" :rules="$genRules({rule:/.+/,message:'任务简介输入有误'})">
            <el-input v-model="form.description" placeholder="请输入任务简介" class="bc-width-400"/>
          </el-form-item>
        </div>


        <!--任务类型-->
        <div>
          <el-form-item label="任务类型：" prop="type" :rules="$genRules({rule:/^\d$/,message:'请选择任务类型'})">
            <!-- 奖励类型 -->
            <SelectConfigType v-model="form.type" name="TASK_TYPE" class="bc-width-400"/>
          </el-form-item>
        </div>

        <div>
          <el-form-item label="下一任务：">
            <!-- 奖励类型 -->
            <SelectToApi v-model="form.nextTaskId" api="/scene/task/list" labelKey="name" :got="(data)=>{
              //过滤掉当前的任务，避免回环依赖任务
              return data.list.map((item)=>{
                const {id} = this.$route.query;
                if(item.id !== parseInt(id)) return item;
              }).filter((item)=>item);
            }" class="bc-width-400"/>
          </el-form-item>
        </div>

        <div>
          <el-form-item label="任务依赖：">
            <!-- 奖励类型 -->
            <SelectToApi v-model="form.dependent" :multiple="true" api="/scene/task/list" labelKey="name" :got="(data)=>{
              //过滤掉当前的任务，避免回环依赖任务
              return data.list.map((item)=>{
                const {id} = this.$route.query;
                if(item.id !== parseInt(id)) return item;
              }).filter((item)=>item);
            }" class="bc-width-400"/>
          </el-form-item>
        </div>

        <div>
          <el-form-item label="任务等级：" prop="level" :rules="$genRules({rule:/^\d+$/,message:`输入任务等级有误`})">
            <el-input v-model="form.level" placehodler="请输入任务等级" class="bc-width-400"/>
          </el-form-item>
        </div>

        <!--任务对话-->
        <div>
          <div>
            <el-form-item label="任务对话：" prop="dialogue" :rules="$genRules({rule:/.+/,message:'任务对话有误'})">
              <el-table border stripe tooltip-effect="light" :data="form.dialogue" class="bc-width-800">
                <el-table-column align="center" label="类型">
                  <template slot-scope="scope">
                    <SelectConfigType v-model="scope.row.type" name="DIALOGUE_TYPE"/>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="内容">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.content" placeholder="请输入对话内容"/>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="操作">
                  <template slot-scope="scope">
                    <el-button @click="form.dialogue.splice(scope.$index,1)">
                      删除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-form-item>
          </div>
          <div>
            <el-form-item label=" ">
              <SelectConfigType v-model="dialogueData.type" name="DIALOGUE_TYPE" class="bc-width-200"/>
              <el-input v-model="dialogueData.content" class="bc-width-200" placeholder="对话内容"/>
              <el-button @click="addDialogue">
                添加
              </el-button>
            </el-form-item>
          </div>

        </div>

        <div>
          <div>
            <el-form-item label="任务奖励：" prop="reward" :rules="$genRules({type:'array',message:'请添加奖励'})">
              <el-table border stripe tooltip-effect="light" :data="form.reward" class="bc-width-800">
                <el-table-column align="center" label="类型">
                  <template slot-scope="scope">
                    <SelectConfigType v-model="scope.row.type" name="REWARD_TYPE" disabled/>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="资源" prop="resourceName">
                  <template slot-scope="scope">
                    <!-- 资源列表 -->
                    <SelectToApi api="/scene/resource/list" v-model="scope.row.resourceId" v-if="scope.row.type === 1"
                                 :disabled="true"/>
                    <template v-else>
                      {{'-'}}
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
              <SelectConfigType v-model="rewardData.type" name="REWARD_TYPE" class="bc-width-200"/>
              <!-- 资源列表 -->
              <SelectToApi api="/scene/resource/list" v-model="rewardData.resourceId" v-show="rewardData.type === 1"/>
              <!-- 奖励的数量或者是奖励的量值 -->
              <el-input v-model="rewardData.amount" class="bc-width-200" placeholder="奖励的数量或者是奖励的量值"/>

              <el-button @click="addRules('reward')">
                添加
              </el-button>

            </el-form-item>
          </div>
        </div>

        <div>
          <div>
            <el-form-item label="任务需求：">
              <el-table border stripe tooltip-effect="light" :data="form.requirement" class="bc-width-800">
                <el-table-column align="center" label="类型">
                  <template slot-scope="scope">
                    <SelectConfigType v-model="scope.row.type" name="TASK_REQUIREMENT_TYPE" :disabled="true"/>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="资源" prop="resourceName">
                  <template slot-scope="scope">
                    <!-- 资源列表 -->
                    <SelectToApi api="/scene/resource/list" v-model="scope.row.bindId" v-if="scope.row.type === 1"
                                 :disabled="true"/>
                    <!--怪物列表-->
                    <SelectToApi api="/scene/monster/list" v-model="scope.row.bindId" v-else-if="scope.row.type === 2"
                                 :disabled="true"/>
                    <!-- 其他 -->
                    <template v-else>
                      {{'-'}}
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
                    <el-button @click="form.requirement.splice(scope.$index,1)">
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
              <SelectConfigType v-model="requirementData.type" name="TASK_REQUIREMENT_TYPE"
                                @change="requirementData.bindId = ''"
                                class="bc-width-200"/>
              <!-- 资源列表 -->
              <SelectToApi api="/scene/resource/list" v-model="requirementData.bindId"
                           v-show="requirementData.type === 1"/>

              <!-- 怪物列表 -->
              <SelectToApi api="/scene/monster/list" v-model="requirementData.bindId"
                           v-show="requirementData.type === 2"/>

              <!-- 奖励的数量或者是奖励的量值 -->
              <el-input v-model="requirementData.amount" class="bc-width-200" placeholder="数量或量值"/>

              <el-button @click="addRules('requirement')">
                添加
              </el-button>

            </el-form-item>
          </div>
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
      //任务对话
      dialogue: [],
      //资源简介
      description: '',
      //任务等级限制
      level: 1,
      //奖励
      reward: [],
      //下一个任务
      nextTaskId: '',
      //依赖任务
      dependent: [],
      //任务完成需求
      requirement: []
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
      resourceId: ''
    };
  }

  function getRequirementData() {
    return {
      //奖励类型
      type: 1,
      //奖励的数量
      amount: 1,
      //绑定id
      bindId: ''
    };
  }

  //对话数据
  function getDialogueData() {
    return {
      type: 1,
      content: ''
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
        //依赖数据
        requirementData: getRequirementData(),
        dialogueData: getDialogueData(),
        //资源列表
        resourceList: [],
        //奖励类型列表
        rewardTypeList: []
      };
    },
    methods: {
      getInfo() {
        const query = this.$route.query;
        this.$axios.get(`/scene/task/detail`, {
          params: {
            id: query.id
          }
        }).then((res) => {
          const {data} = res;
          this.form = data;
        });
      },

      clearData(type) {
        if (type === 'reward') {
          this[`${type}Data`] = getRewardData();
        } else if (type === 'requirement') {
          this[`${type}Data`] = getRequirementData();
        } else if (type === 'dialogue') {
          this.dialogueData = getDialogueData();
        }
      },

      //添加资源到数组中
      addRules(type) {
        let listData = [];
        let formData = {};
        //建立类型
        if (!(type === 'reward' || type === 'requirement')) return;
        listData = this.form[type];
        formData = this[`${type}Data`];
        if (formData.type === 1 && !formData.resourceId) {
          return this.$message({
            message: `请选择资源`,
            type: 'error'
          });
        }
        listData.push(formData);
        this.clearData(type);
      },

      //添加对话
      addDialogue() {
        this.form.dialogue.push(this.dialogueData);
        this.clearData('dialogue');
      },

      submit() {
        this.$refs['form'].validate((status) => {
          if (!status) return;
          const api = this.isEdit ? `/scene/task/update` : `/scene/task/create`;
          this.$axios.post(api, this.form)
            .then(() => {
              this.$router.back();
            });
        });
      }
    }
  }
</script>
