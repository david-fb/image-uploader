<template>
  <q-page class="flex column main">
    <ImageUploader />
    <ImageGrid />
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import ImageUploader from "../components/ImageUploader.vue";
import ImageGrid from 'src/components/ImageGrid.vue';

export default defineComponent({
  name: 'IndexPage',
  components: {ImageUploader, ImageGrid},
});
</script>
<style lang="scss" scoped>
.main {
  gap: 20px;
  padding-bottom: 30px;
  align-items: center;
}
</style>
