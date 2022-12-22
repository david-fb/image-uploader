<template>
  <h2 class="title">Subir Imagen</h2>
  <section class="PickImage__container">
    <q-file
        v-model="file"
        label="Elegir Imagen"
        outlined
        use-chips
        style="width: 250px; max-width: 300px;"
        accept="image/*"
        @update:model-value="handlePickImage"
      />
    <div>
      <q-img
        :src="url"
        spinner-color="white"
        style="height: 170px; width: 180px; border: 1px solid #ccc;"
        fit="scale-down"
      />
      <q-btn
        id="upload-image-button"
        :disable="url == null"
        color="primary"
        icon="upload"
        label="Subir"
        @click="handleUploadImage"
        :loading="loading"
      />
    </div>
  </section>

</template>

<script>
import { defineComponent } from 'vue';
import { ref, uploadBytes } from "firebase/storage";
import { useImagesStore } from 'src/stores/images-store';
import { useQuasar } from 'quasar'

const imagesState = useImagesStore();

export default defineComponent({
  name: 'ImageUploader',

  setup() {
    const $q = useQuasar();

    return {
      showNotif(message){
        $q.notify({
          message,
          icon: 'check',
          position: 'top',
          timeout: 700,
        })
      }
    }
  },
  data: () => (
    {
      file: null,
      url: null,
      loading: false,
    }
),
  methods: {
    handlePickImage(file){
      if(!file){
        this.url = null;
        return;
      };
      this.url = URL.createObjectURL(file);
    },
    handleUploadImage(){
      const imagePath = '/images/' + this.$auth.currentUser.uid + '/';
      const storageRef = ref(this.$firebaseStorage, imagePath + this.file.name);
      this.loading = true;
      uploadBytes(storageRef, this.file).then(snapshot => {
        setTimeout(() =>{
          imagesState.fetchImages();
          this.showNotif('Imagen subida');
          this.loading = false;
        },1000)
        this.file = null;
        this.url = null;
      }).catch(err => {
        this.loading = false;
        console.error(err);
      })
    },
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
.PickImage__container{
  width: 90%;
  max-width: 1200px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;

  div {
    width: fit-content;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
  }
}

@media (max-width: 660px){
  .PickImage__container{
    flex-direction: column;
  }
}
</style>
