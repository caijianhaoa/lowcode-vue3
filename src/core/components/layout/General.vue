<template>
  <div class="layout-general-container">
   <a-row
      :align="align"
      :gutter="gutter"
      :justify="justify"
      :wrap="wrap"
      >
        <slot></slot>
   </a-row>
  </div>
</template>
<script lang="ts">
import createReactive from '/@/core/utils/createReacitve'

export default defineComponent({
  name: 'general',
  props: {
    compProps: {
      type: Object,
      default: {}
    }
  },
  setup(props) {
    const { compProps } = props;
    let data = createReactive({
      compProps
    });

    console.log(data)
    
    return {
      align: toRefs(data).align,
      gutter: toRefs(data).gutter,
      justify: toRefs(data).justify,
      wrap: toRefs(data).wrap,
      styles: toRefs(data).styles,
    }
  },
})
</script>

<style scoped lang="less">
.layout-general-container{
  width: 100%;
}
</style>
