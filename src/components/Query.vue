<template>
  <div class="query">
    <v-container>
      <v-row
        v-if="!videoSrc"
      >
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
      </v-row>

      <v-row
        v-if="videoSrc"
        justify="center"
      >
        <video
          width="100%"
          height="100%"
          :src="videoSrc"
          ref="video"
          muted
          controls
        >
        </video>
      </v-row>

      <v-row
        v-if="videoSrc"
        justify="center"
        class="pa-2"
      >
        <v-btn
          text
          @click="screenShot"
        >
          screenShot
        </v-btn>
      </v-row>

      <v-row
        v-if="imgs.length !== 0"
        justify="center"
      >
        <v-col
          cols="12"
        >
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
                      height="100%"
                      width="100%"
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

      <v-dialog
        v-model="dialog"
        persistent
        max-width="700px"
      >
        <v-card
          height="400px"
          width="100%"
        >
          <vueCropper
            ref="cropper"
            :img="imgSrc"
            :outputType="option.outputType"
            :info="true"
            :autoCrop="option.autoCrop"
            :centerBox="option.centerBox"
            :high="option.high"
          >
          </vueCropper>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="cancelScreenShot">Close</v-btn>
            <v-btn text @click="saveScreenShot">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
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
      let file = this.files;
      let reader = new FileReader();
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
          new File(
            [data],
            parseInt(_this.videoTime) * 25 + '',
            { type: 'image/png' }
          )
        );
      })
      this.dialog = false;
      this.$store.commit('SET_SCREENSHOTS', this.screenShots);
    },
    cancelScreenShot() {
      this.dialog = false;
      this.imgSrc = '';
    },
  },
};
</script>
