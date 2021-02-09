<template>
  <div class="flex flex-col h-screen">
    <snHeader>
      <snPagination v-model:version="version" />
      <snSearch v-model:filter="filter" />
    </snHeader>
    <div
      class="overflow-y-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4"
    >
      <div v-for="item in pokemonList" :key="item.id">
        <router-link
          :to="`${item.id}`"
          class="relative shadow-xl rounded-md flex flex-col justify-center items-center h-56 border border-black"
        >
          <img
            class="object-contain h-28 xl:h-32 mb-2"
            :src="item.img"
            @error="setAltImg"
            alt=""
          />

          <div
            class="absolute capitalize w-full h-8 bottom-0 flex justify-center items-center border-t border-black"
          >
            {{ item.name }}
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import useStore from "@/store";
import { computed, ref, watch } from "vue";
import { getPokemonList } from "@/store/pokemon";

export default {
  setup() {
    const store = useStore("Pokemon");
    const filter = ref("");
    const version = ref(1);

    getPokemonList(version.value);

    watch(
      () => version.value,
      () => {
        getPokemonList(version.value);
      }
    );

    const pokemonList = computed(() => {
      return (
        store.data?.filter(item => {
          if (
            item?.name
              ?.toLowerCase()
              ?.match(new RegExp(filter.value.toLowerCase()))
          ) {
            return true;
          }
          return false;
        }) || []
      );
    });

    function setAltImg(event) {
      event.target.src = require("@/assets/pokeball.png");
    }

    return { pokemonList, filter, setAltImg, version };
  }
};
</script>
