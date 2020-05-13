<template>
  <div class="search">
    <v-file-input
      v-model="files"
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
      <template v-slot:selection="{ index, text }">
        <v-chip
          v-if="index < 2"
          color="accent-4"
          dark
          label
          small
        >
          {{ text }}
        </v-chip>

        <span
          v-else-if="index === 2"
          class="overline grey--text text--darken-3 mx-2"
        >
        +{{ files.length - 2 }} File(s)
      </span>
      </template>
    </v-file-input>
  </div>
</template>

<script>
export default {
  name: 'Search',
  data: () => ({
    files: [],
  }),
};
</script>
