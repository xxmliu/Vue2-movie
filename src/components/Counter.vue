<template>
  <div>
    <div class="counter">
      <!-- 此处设计一个插槽 -->
      <slot />

      <slot name="start"/>

      <button :disabled="n<=min" @click="n--">-</button>
      <span>{{n}}</span>
      <button :disabled="n>=max" @click="n++">+</button>

      <!-- 此处这几一个具名插槽 -->
      <slot name="end"/>

    </div>
  </div>
</template>

<script>
  export default {

    props: {
      // 自定义属性
      min: {
        type:Number,
        default:0
      },
      max: {
        type:Number,
        default:10
      },
      value: {
        type:Number,
        default:1
      }
    },
    data() {
      return {
        n: this.value
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>