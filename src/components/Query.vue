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
        <v-card height="500px" width="500px">
          <vueCropper
            ref="cropper"
            :img="imgSrc"
            :outputType="option.outputType"
            :info="true"
            :autoCrop="option.autoCrop"
            :centerBox="option.centerBox"
            :high="option.high"
          ></vueCropper>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
            <v-btn color="blue darken-1" text @click="saveScreenShot">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <div class="img" v-if="imgSrc !== []">
        <v-row>
          <v-col cols="6" md="8" offset-md="2">
            <v-card>
              <v-container fluid>
                <v-row>
                  <v-col
                    class="d-flex child-flex"
                    cols="5"
                    v-for="img in imgs"
                    :key="img"
                  >
                    <v-card flat tile class="d-flex">
                      <v-img
                        :src="img"
                        aspect-ratio="1"
                        contain
                        max-height="300px"
                        class="lighten-2"
                      >
                      </v-img>
                    </v-card>
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-col>
        </v-row>
      </div>

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
    videoTime: '',
    imgSrc: '',
    imgs: [],
    screenShots: [],
    option: {
      outputType: "png",
      autoCrop: true,
      // 只有自动截图开启宽度高度才生效
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
        _this.videoTime = video.currentTime;
        _this.imgSrc = URL.createObjectURL(res[0].blob);
      })
      this.dialog = true;
    },
    saveScreenShot() {
      let _this = this;
      this.$refs.cropper.getCropBlob((data) => {
        _this.imgs.push(URL.createObjectURL(data));
        _this.screenShots.push(
          new File([data], parseInt(_this.videoTime)*25+'', { type: 'image/png' })
        );
      })
      this.dialog = false;
      this.$store.commit('SET_SCREENSHOTS', this.screenShots);
      console.log(this.screenShots);
    },
  },
};
</script>
