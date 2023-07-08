<template>
  <div class="my-counter">
    <button
      type="button"
      class="btn btn-light"
      @click="setDown(getcount.count)"
    >
      -
    </button>
    <input
      type="number"
      class="form-control inp input-number"
      min="0"
      v-model="getcount.count"
      disabled
    />
    <button type="button" class="btn btn-light" @click="setUp">+</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      getcount: {
        count: this.count[0],
        id: this.count[1],
      },
    };
  },
  props: {
    count: {
      type: Array,
      required: true,
      validator: (value) => {
        return value.length > 0 && typeof value[0] == "number";
      },
    },
  },
  methods: {
    setDown(count) {
      if (count > 0) {
        this.getcount.count--;
        return this.$emit("setCount", this.getcount);
      }
    },
    setUp() {
      this.getcount.count++;
      return this.$emit("setCount", this.getcount);
    },
  },
};
</script>

<style lang="less" scoped>
.my-counter {
  display: flex;
  .inp {
    width: 45px;
    text-align: center;
    margin: 0 10px;
  }
  .btn,
  .inp {
    transform: scale(0.9);
  }
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  appearance: none;
  margin: 0;
}
</style>
