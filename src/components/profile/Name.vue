<template>
  <div>
    <v-list-tile>
      <v-list-tile-content>
        <v-list-tile-sub-title>
          <v-icon class="mr-1">person</v-icon>Name
        </v-list-tile-sub-title>
        <v-list-tile-title>{{ fullNameUp === ' ' ? '...' : fullNameUp }}</v-list-tile-title>
      </v-list-tile-content>
      <v-list-tile-action>
        <v-btn icon flat class="pa-0 ma-0" @click="dialog = !dialog">
          <v-icon v-if="fullNameUp !== '  '" color="editicon">edit</v-icon>
          <v-icon v-else color="editicon">add</v-icon>
        </v-btn>
      </v-list-tile-action>
    </v-list-tile>
    <v-dialog
      v-model="dialog"
      :fullscreen="fullscreen"
      max-width="500"
      transition="dialog-bottom-transition"
      scrollable
    >
      <v-card>
        <v-toolbar class="elevation-0 white--text" color="primary">
          <v-toolbar-title>Edit Name</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click.native="dialog = false" dark>
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text>
          <v-text-field v-model="nameUpdate.first" label="First Name"></v-text-field>
          <v-text-field v-model="nameUpdate.middle" label="Middle Name"></v-text-field>
          <v-text-field v-model="nameUpdate.last" label="Last Name"></v-text-field>
        </v-card-text>
        <div>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="mx-3 mb-2" @click="cancelEdit()">CANCEL</v-btn>
            <v-btn class="mx-3 mb-2" @click="updateAttribute()" color="success">SAVE</v-btn>
          </v-card-actions>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    name: Object
  },
  data: function() {
    return {
      dialog: false,
      nameUpdate: {
        first: '',
        middle: '',
        last: ''
      },
      fullscreen: true,
      enableSave: false
    }
  },
  methods: {
    cancelEdit: function() {
      this.nameUpdate = JSON.parse(JSON.stringify(this.name))
      this.dialog = false
    },
    updateAttribute: function() {
      this.$emit('updateName', this.nameUpdate)
      this.enableSave = false
      this.dialog = false
    },
    setHeaders(param) {
      if (param === 'xs') {
        this.fullscreen = true
      } else {
        this.fullscreen = false
      }
    }
  },
  computed: {
    fullNameUp: function() {
      return (
        this.nameUpdate.first +
        ' ' +
        this.nameUpdate.middle +
        ' ' +
        this.nameUpdate.last
      )
    },
    fullNameProp: function() {
      return this.name.first + ' ' + this.name.middle + ' ' + this.name.last
    },
    breakpoint() {
      return this.$vuetify.breakpoint.name
    }
  },
  watch: {
    fullNameUp: function() {
      if (
        this.nameUpdate.first !== this.name.first ||
        this.nameUpdate.middle !== this.name.middle ||
        this.nameUpdate.last !== this.name.last
      ) {
        this.enableSave = true
      } else {
        this.enableSave = false
      }
    },
    fullNameProp: function() {
      this.nameUpdate = JSON.parse(JSON.stringify(this.name))
    },
    breakpoint() {
      this.setHeaders(this.breakpoint)
    }
  },
  created() {
    this.nameUpdate = JSON.parse(JSON.stringify(this.name))
    this.setHeaders(this.breakpoint)
  }
}
</script>
<style scoped>
</style>
