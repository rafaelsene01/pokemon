<template>
  <div :style="optionStyle">
    <svg
      :class="{ opacity }"
      viewBox="0 0 120 30"
      xmlns="http://www.w3.org/2000/svg"
      fill="#999"
    >
      <defs>
        <svg:style>
          .opacity {
            -webkit-filter: grayscale(100%);
            filter: grayscale(1);
          }
        </svg:style>
      </defs>
      <circle cx="15" cy="15" r="15">
        <animate
          attributeName="r"
          from="15"
          to="15"
          begin="0s"
          dur="0.8s"
          values="15;9;15"
          calcMode="linear"
          repeatCount="indefinite"
        />
        <animate
          attributeName="fill-opacity"
          from="1"
          to="1"
          begin="0s"
          dur="0.8s"
          values="1;.5;1"
          calcMode="linear"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="60" cy="15" r="9" fill-opacity="0.3">
        <animate
          attributeName="r"
          from="9"
          to="9"
          begin="0s"
          dur="0.8s"
          values="9;15;9"
          calcMode="linear"
          repeatCount="indefinite"
        />
        <animate
          attributeName="fill-opacity"
          from="0.5"
          to="0.5"
          begin="0s"
          dur="0.8s"
          values=".5;1;.5"
          calcMode="linear"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="105" cy="15" r="15">
        <animate
          attributeName="r"
          from="15"
          to="15"
          begin="0s"
          dur="0.8s"
          values="15;9;15"
          calcMode="linear"
          repeatCount="indefinite"
        />
        <animate
          attributeName="fill-opacity"
          from="1"
          to="1"
          begin="0s"
          dur="0.8s"
          values="1;.5;1"
          calcMode="linear"
          repeatCount="indefinite"
        />
      </circle>
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
