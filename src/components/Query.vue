<template>
  <div class="query">

    <div class="input" v-if="!videoSrc">
      <v-file-input
        @change="handleChangeVideoInput"
        color="accent-4"
        label="File input"
        placeholder="Select your file"
        prepend-icon="mdi-paperclip"
        outlined
        accept="video/*"
        clearable
        v-model="files"
      >
      </v-file-input>
    </div>
    <div class="screenshot" v-if="videoSrc">
      <video
        height="300"
        :src="videoSrc"
        ref="video"
        controls
      ></video>

      <v-btn
        text
        @click="screenShot"
      >
        screenShot
      </v-btn>

      <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card>
          <v-img :src="imgSrc"></v-img>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
            <v-btn color="blue darken-1" text @click="saveScreenShot">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-img :src="img" v-for="img in imgs" :key="img+1"></v-img>
<!--      <vue-cropper-->
<!--        ref="cropper"-->
<!--        v-for="img in imgs"-->
<!--        :img="img"-->
<!--        :key="img"-->
<!--      >-->
<!--      </vue-cropper>-->
    </div>
  </div>
</template>

<script>
// import { VueCropper } from 'vue-cropper';
require('../assets/poster.js');

export default {
  name: 'Query',
  components: {
    // VueCropper,
  },
  data: () => ({
    dialog: false,
    files: [],
    videoSrc: '',
    imgSrc: '',
    imgs: [],
  }),
  methods: {
    handleChangeVideoInput() {
      const file = this.files;
      const reader = new FileReader();
      reader.onload = event => {
        this.videoSrc = event.target.result;
      };
      reader.readAsDataURL(file);
    },
    screenShot() {
      let video = this.$refs.video;
      let _this = this;
      window.$poster.videoScreenshot(video, video.currentTime, function (err, res) {
        if (err) {
          return alert(err.message);
        }
        _this.imgSrc = URL.createObjectURL(res[0].blob);
      })
      this.dialog = true;
    },
    saveScreenShot() {
      this.imgs.push(this.imgSrc);
      this.dialog = false;
    },
  },
};
</script>
