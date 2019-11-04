<template>
  <el-select v-model="currentValue" @change="change">
    <el-option v-for="(item,index) in type" :value="item.value" :label="item.label" :key="index"/>
  </el-select>
</template>

<script>
  export default {
    name: "select-config-type",
    props: {
      value: {
        default: '',
        type: [String, Number, Array]
      },
      name: {
        default: '',
        type: String
      }
    },
    data() {
      return {
        type: [],
        currentValue: ``
      };
    },
    created() {
      this.currentValue = this.value;
      this.getType();
    },
    watch: {
      value(val) {
        this.currentValue = val;
      },
      currentValue(val) {
        this.$emit('input', val);
      }
    },
    methods: {
      getType() {
        this.$axios.get(`/config/getConfigByName`, {
          params: {
            name: this.name
          }
        }).then((res) => {
          const { data } = res;
          this.type = JSON.parse(data.value);
        });
      },
      change(val) {
        this.$emit('change', val);
      }
    }
  }
</script>
