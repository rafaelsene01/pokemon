<template>
  <div :style="optionStyle">
    <svg
      :class="{ opacity }"
      class="h-5 w-5"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fill-rule="evenodd"
        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
        clip-rule="evenodd"
      />
    </svg>
  </div>
</template>

<script>
import { computed } from "vue";

export default {
  props: {
    width: { type: [String, Number], default: 120 },
    height: { type: [String, Number], default: 30 },
    opacity: { type: Boolean, default: false }
  },
  setup(props) {
    function convertValue(value) {
      if (
        (typeof value == "string" && value.matches("[0-9]+")) ||
        typeof value == "number"
      ) {
        value = value + "px";
      }
      return value;
    }
    const optionStyle = computed(() => {
      return {
        width: convertValue(props.size),
        height: convertValue(props.size),
        color: props.color
      };
    });
    return {
      optionStyle
    };
  }
};
</script>
