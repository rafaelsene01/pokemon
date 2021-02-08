<template>
  <div v-bind="filtered">
    <component :is="name" v-bind="$props" />
  </div>
</template>

<script>
import MessageLoad from "./MessageLoad.vue";

export default {
  components: {
    MessageLoad
  },
  props: {
    name: { type: String, required: true },
    color: { type: String },
    size: { type: [Number, String] },
    opacity: { type: Boolean },
    width: { type: [Number, String] },
    height: { type: [Number, String] }
  },
  computed: {
    filtered() {
      const newAttrs = { ...this.$attrs };
      return newAttrs;
    }
  }
};
</script>
