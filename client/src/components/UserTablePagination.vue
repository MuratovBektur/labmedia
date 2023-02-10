<template>
  <div v-if="maxCount > 1" class="user-table-pagination">
    <div>
      <button
        class="user-table-pagination__btn unclickable"
        :class="{
          'user-table-pagination__btn_disable': page === 1,
        }"
        @click="onPrevPage"
      >
        <img
          class="user-table-pagination__arrow"
          src="@/assets/img/arrow.svg"
          alt="arrow"
        />
      </button>

      <!-- 
        show all page 
        Example: 1, 2, 3, 4, 5, 6
      -->

      <template v-if="maxCount <= 8">
        <button
          v-for="n of maxCount"
          :key="n"
          class="user-table-pagination__btn"
          :class="{
            'user-table-pagination__btn_active': n === page,
          }"
          @click="$emit('onChangePage', n)"
        >
          <div>{{ n }}</div>
        </button>
      </template>

      <!-- 
        show first 3 or 4 page, ellipsis, last 3 or 4 page
        Example: 1, 2, 3, ..., 6, 7, 8
      -->

      <template v-else-if="page < 4 || page + 3 > maxCount">
        <button
          v-for="n of page === 3 ? 4 : 3"
          :key="n"
          class="user-table-pagination__btn"
          :class="{
            'user-table-pagination__btn_active': n === page,
          }"
          @click="$emit('onChangePage', n)"
        >
          <div>{{ n }}</div>
        </button>
        <button class="user-table-pagination__btn unclickable">
          <div>...</div>
        </button>
        <button
          v-for="n of lastPaginationPageCount"
          :key="lastPaginationPage(n)"
          class="user-table-pagination__btn"
          :class="{
            'user-table-pagination__btn_active': lastPaginationPage(n) === page,
          }"
          @click="$emit('onChangePage', lastPaginationPage(n))"
        >
          <div>{{ lastPaginationPage(n) }}</div>
        </button>
      </template>

      <!-- 
        show first page, ellipsis, page before current page, current page,
        page after current page, ellipsis, last page
        Example: 1, ..., 4, 5, 6,..., 11
      -->

      <template v-else>
        <button
          class="user-table-pagination__btn"
          @click="$emit('onChangePage', 1)"
        >
          <div>1</div>
        </button>
        <button class="user-table-pagination__btn unclickable">
          <div>...</div>
        </button>
        <button
          class="user-table-pagination__btn"
          @click="$emit('onChangePage', page - 1)"
        >
          <div>{{ page - 1 }}</div>
        </button>
        <button
          class="user-table-pagination__btn user-table-pagination__btn_active"
          @click="$emit('onChangePage', page)"
        >
          <div>{{ page }}</div>
        </button>
        <button
          class="user-table-pagination__btn"
          @click="$emit('onChangePage', page + 1)"
        >
          <div>{{ page + 1 }}</div>
        </button>
        <button class="user-table-pagination__btn unclickable">
          <div>...</div>
        </button>
        <button
          class="user-table-pagination__btn"
          @click="$emit('onChangePage', 1)"
        >
          <div>{{ maxCount }}</div>
        </button>
      </template>

      <button
        class="user-table-pagination__btn unclickable"
        :class="{
          'user-table-pagination__btn_disable': page === maxCount,
        }"
        @click="onNextPage"
      >
        <img
          class="user-table-pagination__arrow user-table-pagination__arrow_reverse"
          src="@/assets/img/arrow.svg"
          alt="arrow"
        />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    limit: {
      type: Number,
      required: true,
    },
    maxCount: {
      type: Number,
      required: true,
    },
    page: {
      type: Number,
      required: true,
    },
  },
  computed: {
    lastPaginationPageCount(): number {
      const showFourPageCount = this.maxCount - this.page === 2;
      return showFourPageCount ? 4 : 3;
    },
  },

  methods: {
    lastPaginationPage(n: number): number {
      return this.maxCount - (this.lastPaginationPageCount - n);
    },
    onPrevPage() {
      if (this.page <= 1) return;
      this.$emit("onPrevPage");
    },
    onNextPage() {
      if (this.page >= this.maxCount) return;
      this.$emit("onNextPage");
    },
  },
});
</script>

<style lang="scss">
.user-table-pagination {
  display: flex;
  justify-content: center;
  & > div {
    border-radius: $common-border-radius;
    padding: 10px 5px 8px;
    background-color: $white;
    display: flex;
    align-items: center;
    & > * {
      width: 30px;
      height: 30px;
      text-align: center;
    }
    & > img {
      margin: 0 10px;
    }
  }
  &__btn {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 15px;
    transition: background-color 0.3s linear;
    &:hover {
      background-color: #f5f5f6;
    }
    &_active {
      color: $blue;
      font-weight: bold;
    }
    &_disable {
      opacity: 0.5;
      cursor: not-allowed !important;
    }
  }
  &__arrow {
    width: 14px;
    position: relative;
    bottom: 1px;

    &_reverse {
      transform: rotate(180deg);
    }
  }
}

.unclickable {
  background-color: transparent !important;
  cursor: auto;
}
</style>
