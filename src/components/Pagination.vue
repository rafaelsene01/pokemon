<template>
  <nav
    class="relative z-0 inline-flex shadow-sm -space-x-px"
    aria-label="Pagination"
  >
    <a
      href="#"
      @click="previous()"
      class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
    >
      <snIcon width="24" height="24" name="Previous" />
    </a>
    <a
      v-for="key in 8"
      :key="key"
      @click="changeValue(key)"
      href="#"
      :class="[
        { 'bg-gray-200': key === version },
        { 'hidden md:block': key !== version }
      ]"
      class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
    >
      {{ key }}
    </a>
    <a
      href="#"
      @click="next()"
      class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
    >
      <snIcon width="24" height="24" name="Next" />
    </a>
  </nav>
</template>

<script lang="ts">
export default {
  name: "PaginationComponent",

  props: ["version"],

  setup(props, { emit }) {
    function changeValue(value) {
      emit("update:version", value);
    }

    function previous() {
      if (props.version > 1) {
        emit("update:version", props.version - 1);
      }
    }

    function next() {
      if (props.version < 8) {
        emit("update:version", props.version + 1);
      }
    }

    return {
      changeValue,
      previous,
      next
    };
  }
};
</script>

<style scoped>
.search {
  position: relative;
  padding: 5px 34px 5px 10px;
  -moz-box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.16) !important;
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.16) !important;
  -webkit-box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.16) !important;
  border-radius: 4px;
  outline: none;
}

.search:focus {
  border: 1px solid var(--v-primary-base);
}

.search--icon {
  position: absolute;
  margin-right: 6px;
}
</style>
