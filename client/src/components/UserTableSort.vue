<template>
  <div class="user-table-sort">
    <div class="user-table-sort__title">Сортировка:</div>
    <div
      v-for="sortType of sortTypes"
      :key="sortType.value"
      @click="onSelectSortType(sortType.value)"
      class="user-table-sort__item"
      :class="{
        'user-table-sort__item_active': sortType.value === activeSortType,
      }"
    >
      {{ sortType.title }}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import { TUserSortType } from "@/helpers/types";

export default Vue.extend({
  props: {
    activeSortType: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      sortTypes: [
        {
          title: "Дата регистрации",
          value: "registrationDate",
        },
        {
          title: "Рейтинг",
          value: "rating",
        },
      ] as Array<{
        title: string;
        value: TUserSortType;
      }>,
    };
  },
  methods: {
    onSelectSortType(sortType: TUserSortType) {
      this.$emit("onSelectSortType", sortType);
    },
  },
});
</script>

<style lang="scss">
.user-table-sort {
  display: flex;
  & > *:not(:last-child) {
    margin-right: 8px;
  }
  &__title {
    color: $dark-grey;
    font-weight: 500;
    font-size: 10px;
    line-height: 14px;
  }
  &__item {
    font-weight: 500;
    font-size: 10px;
    line-height: 14px;

    user-select: none;
    color: $dark-grey;
    border-bottom: 1px dashed $dark-grey;
    text-decoration: none;
    cursor: pointer;
    &_active {
      color: $soft-black;
      border-bottom-color: $soft-black;
    }
  }
}
</style>
