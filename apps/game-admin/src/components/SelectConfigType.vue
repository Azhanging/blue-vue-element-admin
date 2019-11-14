<template>
  <el-select v-model="currentValue" @change="change" :disabled="disabled">
    <el-option v-for="(item,index) in data" :value="item.value" :label="item.label" :key="index"/>
  </el-select>
</template>

<script>
  export default {
    name: "select-config-type",
    props: {
      disabled: {
        default: false,
        type: Boolean
      },
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
        data: [],
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
          this.data = JSON.parse(data.value);
          this.$emit('loaded', this.data);
        });
      },
      change(val) {
        this.$emit('change', val);
      }
    }
  }
</script>
