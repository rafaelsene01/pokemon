<template>
  <div class="flex mr-4 items-center justify-end">
    <input placeholder="Pesquisar" class="search w-36" v-model="search.input" />
    <snIcon
      width="24"
      height="24"
      class="absolute mr-3"
      v-if="search.status === 'WRITE'"
      name="MessageLoad"
    />
  </div>
</template>

<script lang="ts">
import { onBeforeMount, reactive, watch } from "vue";

export default {
  name: "SearchComponent",

  props: ["filter"],

  setup(props, { emit }) {
    const search: any = reactive({
      input: "",
      status: "",
      startTimeout: new Function()
    });

    onBeforeMount(() => {
      search.input = props.filter;
    });

    watch(
      () => search.input,
      text => {
        search.status = "WRITE";
        clearTimeout(search.startTimeout);
        search.startTimeout = setTimeout(() => {
          search.status = "LOADING";
          setTimeout(() => {
            emit("update:filter", text);
            search.status = "";
          }, 100);
        }, 500);
      }
    );

    return {
      search
    };
  }
};
</script>

<style lang="postcss" scoped>
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
