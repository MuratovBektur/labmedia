<template>
  <div class="user-table-search-panel">
    <input
      class="user-table-search-panel__input"
      type="text"
      :value="value"
      @input="onChangeInput"
      placeholder="Поиск по имени или e-mail"
    />
    <div
      v-if="showClearFilter"
      class="user-table-search-panel__footer"
      @click="$emit('clearFilter')"
    >
      <img src="@/assets/img/brush.svg" alt="brush" />
      <span>Очистить фильтр</span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    value: {
      type: String,
      required: true,
    },
    showClearFilter: {
      type: Boolean,
      required: false,
    },
  },
  methods: {
    onChangeInput(event: Event) {
      const eventInput = event.target as HTMLInputElement;
      this.$emit("input", eventInput.value);
    },
  },
});
</script>

<style lang="scss">
.user-table-search-panel {
  border-radius: $common-border-radius;
  background-color: $white;
  padding: 12px 44px 17px 16px;
  @media (max-width: 700px) {
    padding-right: 16px;
  }
  &__input {
    display: block;
    border-radius: 4px;
    width: 100%;
    border: none;
    padding: 10px 31px;
    color: $soft-black;
    background: #eceff0 url(@/assets/img/search.svg) left no-repeat;
    background-position: 3px;
    &:focus {
      outline: 2px solid $blue;
    }
    &::placeholder,
    &::-ms-input-placeholder,
    &:-ms-input-placeholder {
      color: $dark-grey;
      opacity: 1;
    }
  }
  &__footer {
    margin-top: 24px;
    display: flex;
    align-items: center;
    cursor: pointer;
    & > span {
      margin-left: 4px;
      font-weight: 500;
      font-size: 12px;
      color: #4f4f4f;
    }
  }
}
</style>
