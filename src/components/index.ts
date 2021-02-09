/* eslint-disable */
import snHeader from "./Header.vue";
import snIcon from "./Icon/index.vue";
import snPagination from "./Pagination.vue";
import snSearch from "./Search.vue";

interface Comp {
  [key: string]: any;
}

const Components: Comp = {
  snHeader,
  snIcon,
  snPagination,
  snSearch
};

export default Components;
