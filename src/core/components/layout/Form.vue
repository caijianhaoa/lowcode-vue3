<template>
  <div class="layout-form-container">
    <a-form
      :model="model" 
      :layout="layout"
      :name="name"
      :validateMessages="validateMessages"
      >
       <draggable
          v-model="child.options.mock.columns"
          tag="a-row"
          :group="{ name: 'lowcode'}"
          item-key="id"
          handle=".ant-col"
          :componentData="{
            align,
            gutter,
            justify,
            wrap
          }"
          @add="handleAdd"
        >
          <template #item="{element}">
            <a-col :span="12" class="border h-46 flex-ali-cen">
              <a-form-item
                :name="element.options.layouts.formItem.name"
                :label="element.options.layouts.formItem.label"
                :rules="element.options.layouts.formItem.rules"
                >
                <renderer layout="form" :type="element.type" :globalOptions="worksheetData.options" :componentOptions="element.options" />
              </a-form-item>
              <!-- mask layer -->
              <div class="mask-layer-container" @click="handleSelect(element)"></div>
            </a-col>
          </template>
        </draggable>
    </a-form>
  </div>
</template>
<script lang="ts">
import createReactive from '/@/core/utils/createReacitve'
import draggable from "vuedraggable";
import { useSchemesStore } from '/@/store/modules/scheme';

const store = useSchemesStore();

export default defineComponent({
  components: {
    draggable
  },
  props: {
    worksheetData: {
      type: Object,
      default: {}
    },
    child: {
      type: Object,
      default: {}
    },
    compProps: {
      type: Object,
      default: {}
    },
    compMock: {
      type: Object,
      default: {}
    }
  },
  setup(props) {
    const { compProps, compMock, child } = props;

    let recordWidget = ref([]);
    let data = createReactive({
      compProps,
      compMock,
    });

    const handleAdd = (e) => {
      console.log('add')
      console.log(e)
      const curWidget = e.item._underlying_vm_;
      recordWidget.value = {...curWidget, ...{ parentId: child.id }};
      // set recordWidget
      store.handleSetRecordWidget(recordWidget.value);
    }

    const handleSelect = (selectd) => {
      recordWidget.value = selectd;
      // set recordWidget
      store.handleSetRecordWidget(recordWidget.value);
    }

    return {
      ...toRefs(props),
      model: toRefs(data).model,
      layout:toRefs(data).layout,
      name: toRefs(data).name,
      validateMessages: toRefs(data).validateMessages,
      columns: toRefs(data).columns,
      align: toRefs(data).align,
      gutter: toRefs(data).gutter,
      justify: toRefs(data).justify,
      wrap: toRefs(data).wrap,
      styles: toRefs(data).styles,
      handleAdd,
      handleSelect,
    }
  },
})
</script>

<style scoped lang="less">
.layout-form-container{
  width: 100%;
  .renderer-container{
    height: 100%;
  }
  .border{
    border-right: 1px solid #EEE;
    &:last-of-type{
      border: none;
    }
  }
} 
</style>
