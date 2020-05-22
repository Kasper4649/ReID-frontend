<template>
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row
          align="center"
          justify="center">
          <v-col
            cols="15"
            sm="10"
            md="7"
          >
            <h1
              class="title font-weight-bold ma-3 text-center"
              @click="step=1"
            >
              Person Re-Identification
            </h1>

            <v-card
              class="mx-auto"
              max-width="2000"
            >
              <v-card-title class="title font-weight-regular justify-space-between">
                <span>{{ currentTitle }}</span>
                <v-avatar
                  color="black lighten-2"
                  class="subheading white--text"
                  size="24"
                  v-text="step"
                ></v-avatar>
              </v-card-title>

              <v-window v-model="step">
                <v-window-item :value="1">
                  <div class="pa-4 text-center">
                    <query></query>
                  </div>
                </v-window-item>

                <v-window-item :value="2">
                  <div class="pa-4 text-center">
                    <search></search>
                  </div>
                </v-window-item>

                <v-window-item :value="3">
                  <div class="pa-4 text-center">
                    <detect></detect>
                  </div>
                </v-window-item>
              </v-window>

              <v-divider></v-divider>

              <v-card-actions v-if="step !== 3">
                <v-btn
                  text
                  @click="step--"
                  v-if="step !== 1"
                >
                  Cancel
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  text
                  @click="commit()"
                >
                  Next
                </v-btn>
              </v-card-actions>
            </v-card>

          </v-col>
        </v-row>
      </v-container>
    </v-content>
</template>

<script>
import Query from '../components/Query.vue';
import Search from '../components/Search.vue';
import Detect from '../components/Detect.vue';

import { query, search } from '../api/api.js';

export default {
  name: 'Home',
  components: {
    Query,
    Search,
    Detect,
  },
  data: () => ({
    step: 1,
  }),
  computed: {
    currentTitle() {
      switch (this.step) {
        case 1:
          return 'Query';
        case 2:
          return 'Search';
        default:
          return 'Object Detected';
      }
    },
  },
  methods: {
    commit() {
      let _this = this;
      switch (_this.step) {
        case 1:
          let files = this.$store.state.screenShots;
          let params = new FormData();
          for(let i = 0; i < files.length; i++) {
            params.append('files', files[i]);
          }
          query(params).then(res => {
            console.log(res);
            _this.step++;
          }).catch(err => {
            console.log(err);
          });
          return
        case 2:
          let file = this.$store.state.uploadedVideo;
          let param = new FormData();
          param.append('file', file);
          search(param).then(res => {
            console.log(res);
            _this.step++;
          }).catch(err => {
            console.log(err);
          });
          return
      }
    },
  },
};
</script>
