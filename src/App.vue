<template>
  <hello-world></hello-world>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import flexibie from './js/flexible'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>
<style lang="less">
        .panel {
          position: relative;
          border: 10px solid transparent;
          border-width: .6375rem .475rem .25rem 1.65rem;
          border-image-source: url(/src/assets/images/border.png);
          border-image-slice: 51 38 20 132;
          margin-bottom: .25rem;

          .panel-inner {
            position: absolute;
            padding: .3rem .45rem;
            top: -0.6375rem;
            left: -1.65rem;
            right: -.475rem;
            bottom: -.25rem;
          }

          h3 {
            font-size: .25rem;
            color: #fff;
            font-weight: normal;
          }
        }
</style>