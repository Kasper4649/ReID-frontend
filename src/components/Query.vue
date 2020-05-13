<template>
  <div class="query">
    <v-file-input
      v-model="file"
      color="accent-4"
      counter
      label="File input"
      placeholder="Select your files"
      prepend-icon="mdi-paperclip"
      outlined
      accept="video/*"
      clearable
      :show-size="1000"
    >
    </v-file-input>
    <div class="player" v-if="file !== []">
    <video-player
      class="vjs-custom-skin"
      ref="videoPlayer"
      :options="playerOptions"
      :playsinline="true"
    >
    </video-player>
   </div>

    <vueCropper
      ref="cropper"
      :img="option.img"
      :outputSize="option.size"
      :outputType="option.outputType"
    ></vueCropper>
  </div>
</template>

<script>
import { VueCropper } from 'vue-cropper';
import { videoPlayer } from 'vue-video-player';
import 'video.js/dist/video-js.css';

export default {
  name: 'Query',
  components: {
    VueCropper,
    videoPlayer,
  },
  data: () => ({
    file: [],
    playerOptions: {
      height: 360,
      muted: true,
      sources: [{
        type: 'video/mp4',
        src: '',
      }],
    },
    option: {
      // 'img': 'https://cdn.vuetifyjs.com/images/logos/v.svg',
    },
  }),
  mounted() {
    console.log('this is current player instance object', this.player);
  },
};
</script>
