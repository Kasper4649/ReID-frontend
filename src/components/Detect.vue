<template>
  <div class="detect">
    <video
      :src="videoSrc"
      autoplay
      controls
      width="100%"
      height="100%"
      ref="video"
    >
    </video>
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
