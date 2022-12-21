import { defineStore } from 'pinia';
import { ref, listAll, getDownloadURL, deleteObject, getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const auth = getAuth();
const storage = getStorage();

export const useImagesStore = defineStore('images', {
  state: () => ({
    images: [],
  }),
  getters: {
    getImages: (state) => state.images,
  },
  actions: {
    fetchImages() {
      const folderPath = '/images/' + auth.currentUser.uid + '/';
      const listRef = ref(storage, folderPath);

      listAll(listRef)
        .then((res) => {
          res.items.forEach((itemRef) => {
            getDownloadURL(ref(storage, itemRef.fullPath)).then((url) => {
              let data = {
                fullPath: itemRef.fullPath,
                name: itemRef.name,
                reference: itemRef,
                url,
              };
              if (this.images.find((image) => image.url === data.url)) return;
              this.images.push(data);
            });
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    removeImage(imageUrl) {
      this.images = this.images.filter((image) => image.url !== imageUrl);
    },
  },
});
