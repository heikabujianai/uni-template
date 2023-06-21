<template>
  <layout-view>
    {{ content }}
  </layout-view>
</template>

<script setup>
import {example} from "@/service";
import {ref} from "vue";
import LayoutView from "@/components/layoutView/layoutView.vue";

const content = ref("");
example({name: "file", filePath: "res.tempFilePaths"}).then(data => {
  console.log("example=>", data);
  // content.value = data;
}).catch(err => {
  console.log("err=>", err);
});
</script>

<style lang="scss" scoped>

</style>
