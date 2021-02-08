<template>
  <header
    class="header shadow-sm"
    :style="{ 'background-color': `${color}4D` }"
  >
    <router-link to="/">
      <img
        class="object-contain h-16 xl:h-20"
        src="@/assets/pokemon-logo.png"
        alt=""
      />
    </router-link>

    <slot />
  </header>
</template>

<script>
export default {
  name: "HeaderComponent",
  props: {
    color: {
      default: "#999999"
    }
  }
};
</script>

<style scoped lang="postcss">
.header {
  /*! @import */
  @apply w-full flex justify-between h-20 xl:h-24 items-center p-4 xl:p-6;
}
</style>
