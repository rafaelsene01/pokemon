<template>
  <div class="flex flex-col h-screen">
    <Header>
      <Pagination v-model:version="version" />
      <Search v-model:filter="filter" />
    </Header>
    <div class="overflow-y-auto  flex flex-wrap justify-center">
      <div
        class="flex w-1/4 xl:w-1/6 px-2 py-3 xl:py-4 justify-center items-center"
        v-for="item in pokemonList"
        :key="item.id"
      >
        <router-link
          :to="`${item.id}`"
          class="relative flex flex-col justify-center items-center h-56 w-4/5 border border-black"
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
import Header from "@/components/Header.vue";
import Search from "@/components/Search.vue";
import Pagination from "@/components/Pagination.vue";

import useStore from "@/store";
import { computed, ref, watch } from "vue";
import { getPokemonList } from "@/store/pokemon";

export default {
  components: {
    Header,
    Search,
    Pagination
  },

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
