<template>

  <section class="grid__wrapper">
    <h2 class="title">Galería</h2>
    <ul class="image__grid">
      <li v-for="(image, index) in images" :key="image + '-' + index">
        <q-img
          :src="image.url"
          spinner-color="white"
          style="aspect-ratio: 1/1; width: 100%;"
          fit="scale-down"
        />
        <div class="item__buttons">
          <q-btn @click="handleDownload(image.url, image.name)"
              :ripple="{ center: true }"
              unelevated
              color="primary"
              icon="download">
              <q-tooltip class="bg-ongoing">Descargar</q-tooltip>
          </q-btn>

          <q-btn @click="handleDelete(image.reference, image.url)"
              :ripple="{ center: true }"
              unelevated
              color="red"
              icon="delete">
              <q-tooltip class="bg-ongoing">Eliminar</q-tooltip>
          </q-btn>
        </div>
      </li>
    </ul>
  </section>

</template>

<script>
import { defineComponent } from 'vue';
import { ref, listAll, getDownloadURL, deleteObject } from "firebase/storage";
import { useImagesStore } from 'src/stores/images-store';
import { useQuasar } from 'quasar'

const imagesState = useImagesStore();

export default defineComponent({
  name: 'ImageGrid',

  setup(){
    const $q = useQuasar();

    function confirmDelete (deleteCB) {
      $q.dialog({
        title: 'Confirmar',
        message: '¿Desea eliminar este archivo de forma permanente?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        // console.log('>>>> OK')
        deleteCB();
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      })
    }

    function showNotif(message){
      $q.notify({
        message,
        icon: 'check',
        position: 'top',
        timeout: 700,
        color: 'negative'
      })
    }

    return { confirmDelete, showNotif }
  },

  computed: {
    images(){return imagesState.getImages}
  },
  methods: {

    handleDownload(imageUrl, name){

      fetch(imageUrl)
        .then(res => res.blob())
        .then(blob => {
          const blobUrl = URL.createObjectURL(blob);
          let downloadLink = document.createElement('a');
          downloadLink.href = blobUrl;
          downloadLink.target = '_blank';
          downloadLink.setAttribute('download', name);
          downloadLink.click();
        })
    },

    handleDelete(imageRef, imageUrl){
      const deleteImage = () =>  deleteObject(imageRef).then(() => {
        this.showNotif('Imagen Eliminada')
        imagesState.removeImage(imageUrl);
      }).catch(err => {
        console.error(err);
      });

      this.confirmDelete(deleteImage);
    }
  },
  created(){
    // this.getImages();
    imagesState.fetchImages();
  }
});
</script>
<style lang="scss" scoped>
.title{
  margin: 0;
  font-size: 42px;
  font-weight: 600;
  color: #1976d2;
  background-image: -webkit-linear-gradient(45deg, #1976d2 24%,#19afd1 69%);
  background-clip: text;
  -webkit-background-clip: text;
  text-fill-color: transparent;
  -webkit-text-fill-color: transparent;
}
.grid__wrapper{
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  gap: 20px;
  background: #fafafa;
  padding: 30px 0;
}
.image__grid {
  /**
   * User input values.
   */
  --grid-layout-gap: 15px;
  --grid-column-count: 4;
  --grid-item--min-width: 180px;

  /**
   * Calculated values.
   */
  --gap-count: calc(var(--grid-column-count) - 1);
  --total-gap-width: calc(var(--gap-count) * var(--grid-layout-gap));
  --grid-item--max-width: calc((100% - var(--total-gap-width)) / var(--grid-column-count));

  width: 90%;
  max-width: 1200px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(max(var(--grid-item--min-width), var(--grid-item--max-width)), 1fr));
  grid-gap: var(--grid-layout-gap);

  list-style: none;
  padding: 0;
  margin: 0;

  li {
    width: 100%;
    background: #fff;
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: center;
    border: 1px solid #cdcdcd;
    padding: 10px;
    border-radius: 10px;
    transition: all .1s ease-in;
    box-shadow: 0px 0px 8px 2px rgba($color: #424242, $alpha: .18);

    &:hover {
      transform: scale(1.05);
      z-index: 1;
    }

    .item__buttons {
      margin-top: auto;
      display: flex;
      justify-content: center;
      gap: 10px;
    }
  }
}
</style>
