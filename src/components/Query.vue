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
      >
      </video>

      <v-btn
        text
        @click="screenShot"
      >
        screenShot
      </v-btn>

      <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card height="400px" width="400px">
          <vueCropper
            ref="cropper"
            :img="imgSrc"
            :outputType="option.outputType"
            :info="true"
            :autoCrop="option.autoCrop"
            :centerBox="option.centerBox"
            :high="option.high"
          ></vueCropper>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
            <v-btn color="blue darken-1" text @click="saveScreenShot">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-img :src="img" v-for="img in imgs" :key="img+1"></v-img>

    </div>
  </div>
</template>

<script>
import { VueCropper } from 'vue-cropper';
require('../assets/poster.js');

export default {
  name: 'Query',
  components: {
    VueCropper,
  },
  data: () => ({
    dialog: false,
    files: [],
    videoSrc: '',
    imgSrc: '',
    imgs: [],
    option: {
      outputType: "png",
      autoCrop: true,
      // 只有自动截图开启 宽度高度才生效
      centerBox: true,
      high: false,
    },
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
      let _this = this;
      this.$refs.cropper.getCropBlob((data) => {
        _this.imgs.push(URL.createObjectURL(data));
      })
      this.dialog = false;
      console.log(this.imgs);
      console.log(this.imgSrc);
    },
  },
};
</script>
