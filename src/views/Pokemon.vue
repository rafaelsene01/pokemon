<template>
  <div class="flex flex-col h-screen">
    <Header />
    <div class="overflow-y-auto py-5">
      <div class="w-full flex flex-col items-center">
        <div
          class="relative rounded-t-md flex flex-col justify-center items-center h-96 w-4/5 md:w-3/5 xl:w-2/5 border border-black"
        >
          <img
            class="object-contain h-44 xl:h-48 mb-2"
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
        <div
          class="h-auto rounded-b-md  w-4/5 md:w-3/5 xl:w-2/5 border border-t-0 border-black"
        >
          <dl>
            <dt>Jogos</dt>
            <dd
              class="capitalize"
              :class="{ 'bg-gray-100': index % 2 === 0 }"
              v-for="(game, index) in pokemon.versionGroups"
              :key="game.id"
            >
              Pokémon {{ game.name.replace("-", " & ") }}
            </dd>
            <dt>Localização</dt>
            <div
              v-if="loading || empty"
              class="flex justify-center items-center h-12"
            >
              <Icon
                v-if="loading"
                width="24"
                height="24"
                class="search--icon"
                name="MessageLoad"
              />
              <span v-else>Não há registros</span>
            </div>
            <dd
              v-else
              class="capitalize"
              :class="{ 'bg-gray-100': index % 2 === 0 }"
              v-for="(location, index) in locations"
              :key="location"
            >
              {{ location }}
            </dd>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Header from "@/components/Header.vue";
import Icon from "@/components/Icon/index.vue";
import { useRoute, useRouter } from "vue-router";
import useStore from "@/store";
import { computed, watch } from "vue";
import { getLocale } from "@/store/pokemon";

export default {
  components: {
    Header,
    Icon
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

    const locations = computed(() => pokemon?.value?.location?.data);
    const loading = computed(
      () => pokemon?.value?.location?.loading && locations.value.length === 0
    );
    const empty = computed(
      () => !pokemon?.value?.location?.loading && locations.value.length === 0
    );

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

    return { pokemon, setAltImg, locations, loading, empty };
  }
};
</script>

<style lang="postcss">
dl {
  @apply mb-2;
}

dt {
  @apply bg-gray-300 px-4;
}

dd {
  @apply px-8 py-1;
}
</style>
