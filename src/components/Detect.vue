<template>
  <div class="detect">
    <div class="screenshot">
      <video
        height="300"
        :src="videoSrc"
        ref="video"
        controls
      >
      </video>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'Detect',
    data: () => ({
      videoSrc: '',
    }),
    mounted() {
      this.videoSrc = this.$store.state.markedVideo;
    }
  };
</script>
