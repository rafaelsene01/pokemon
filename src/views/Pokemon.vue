<template>
  <div class="flex flex-col h-screen">
    <Header />
    <div class="overflow-y-auto mt-5 flex flex-col items-center">
      <div
        class="relative flex flex-col justify-center items-center h-56 w-4/5 border border-black"
      >
        <img
          class="object-contain h-28 xl:h-32 mb-2"
          :src="pokemon.img"
          @error="setAltImg"
          alt=""
        />

        <div
          class="absolute capitalize w-full h-8 bottom-0 flex justify-center items-center border-t border-black"
        >
          {{ pokemon.name }}
        </div>
      </div>
      <div class="relative  h-56 w-4/5 border border-t-0 border-black">
        <dl>
          <dt>Jogos</dt>
          <dd
            class="capitalize"
            v-for="game in pokemon.versionGroups"
            :key="game.id"
          >
            Pokémon {{ game.name.replace("-", " & ") }}
          </dd>
          <dt>Localização</dt>
          <dd
            class="capitalize"
            v-for="location in pokemon.location.data"
            :key="location"
          >
            {{ location }}
          </dd>
        </dl>
      </div>
    </div>
  </div>
</template>
<script>
import Header from "@/components/Header.vue";
import { useRoute, useRouter } from "vue-router";
import useStore from "@/store";
import { computed, watch } from "vue";
import { getLocale } from "@/store/pokemon";

export default {
  components: {
    Header
  },

  setup() {
    const route = useRoute();
    const router = useRouter();
    const id = Number(route?.params?.id);
    if (isNaN(id)) {
      router.push({ name: "Home" });
    }

    const store = useStore("Pokemon");

    const pokemon = computed(() => {
      return {
        ...store.data?.find(item => item.id === id),
        versionGroups: store.versionGroups
      };
    });

    watch(
      () => pokemon.value,
      () => {
        if (!pokemon.value.id) {
          router.push({ name: "Home" });
        }
      }
    );

    getLocale(id);

    function setAltImg(event) {
      event.target.src = require("@/assets/pokeball.png");
    }

    return { pokemon, setAltImg };
  }
};
</script>
