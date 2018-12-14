<!-- @format -->

<template>
  <div class="jade-markdown">
    <el-tabs v-model="activeName" type="card" @tab-click="onHandleClick">
      <el-tab-pane :label="$t('write')" name="write"></el-tab-pane>
      <el-tab-pane :label="$t('preview')" name="preview"></el-tab-pane>
    </el-tabs>

    <div class="write-area" v-if="activeName === 'write'">
      <el-input
        type="textarea"
        :placeholder="placeholder"
        :maxlength="3600"
        :autosize="{ minRows: 6, maxRows: 21 }"
        v-model="originalVal"
        @change="onChangeEvent"
      ></el-input>
    </div>
    <MarkdownPreview
      class="preview-area"
      :value="originalVal"
      v-if="activeName === 'preview'"
    ></MarkdownPreview>
  </div>
</template>

<script>
import MarkdownPreview from './MarkdownPreview'

export default {
  name: 'Markdown',

  data() {
    return {
      activeName: 'write',
      originalVal: ''
    }
  },

  props: {
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    }
  },

  watch: {
    value(val) {
      this.originalVal = val
    }
  },

  components: {
    MarkdownPreview
  },

  created() {},

  mounted() {
    this.originalVal = this.value
  },

  methods: {
    onChangeEvent(value) {
      this.$emit('input', value)
    },

    onHandleClick() {}
  },

  locales: {
    en: {
      write: 'Write',
      preview: 'Preview'
    },
    zh: {
      write: '编写',
      preview: '预览'
    }
  }
}
</script>

<style></style>
