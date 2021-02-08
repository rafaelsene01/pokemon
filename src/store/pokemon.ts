import { reactive } from "vue";
import http from "@/service/axios";

interface State {
  data: Array<any>;
  versionGroups: Array<any>;
  loading: boolean;
  error: boolean;
}

const initialState: State = {
  data: [],
  versionGroups: [],
  loading: false,
  error: false
};

const state = reactive(initialState);

export default state;

interface PokemonList {
  name: string;
  url: string;
  [key: string]: string;
}

export async function getPokemonList(version: number) {
  try {
    state.loading = true;

    const { data } = await http.get(`generation/${version}`, {});

    const pokemonList: PokemonList[] = data.pokemon_species;

    state.versionGroups = data.version_groups.map(item => {
      const id = Number(
        item.url.replace(
          /(https:\/\/pokeapi.co\/api\/v2\/version-group\/)|(\/)/g,
          ""
        )
      );

      return { name: item.name, id };
    });

    const newData: any = [];
    pokemonList.forEach(async pokemon => {
      const id = Number(
        pokemon.url.replace(
          /(https:\/\/pokeapi.co\/api\/v2\/pokemon-species\/)|(\/)/g,
          ""
        )
      );

      const data = {
        id,
        name: pokemon.name,
        img: `https://pokeres.bastionbot.org/images/pokemon/${id}.png`,
        location: {
          data: [],
          loading: false,
          error: false
        }
      };
      newData.push(data);
    });

    state.data = newData;
  } catch (error) {
    state.error = true;
  } finally {
    state.loading = false;
  }
}

export async function getLocale(id: number) {
  try {
    state.data = state.data?.map((item: any) => {
      if (item.id === id) {
        return { ...item, location: { ...item.location, loading: true } };
      }
      return item;
    });
    const { data } = await http.get(`pokemon/${id}/encounters`);

    state.data = state.data?.map((item: any) => {
      if (item.id === id) {
        return {
          ...item,
          location: {
            ...item.location,
            data: data.map(item => item.location_area.name.replace(/[-]/g, " "))
          }
        };
      }
      return item;
    });

    console.log(data);
  } catch (error) {
    state.data = state.data?.map((item: any) => {
      if (item.id === id) {
        return { ...item, location: { ...item.location, error: true } };
      }
      return item;
    });
  } finally {
    state.data = state.data?.map((item: any) => {
      if (item.id === id) {
        return { ...item, location: { ...item.location, loading: false } };
      }
      return item;
    });
  }
}

// export function resetStore() {
//   state = reactive(initialState);
// }

// export function setApiKey(apiKey) {
//   const currentUser = { ...state.currentUser, apiKey };
//   state.currentUser = currentUser;
// }
