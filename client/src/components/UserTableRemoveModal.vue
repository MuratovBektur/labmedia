<template>
  <div class="user-table-remove-modal">
    <div class="user-table-remove-modal__content">
      <div class="user-table-remove-modal__title">
        Вы уверены, что хотите удалить пользователя?
      </div>
      <div class="user-table-remove-modal__btn-container">
        <button class="user-table-remove-modal__btn" @click="onConfirm">
          Да
        </button>
        <button
          class="user-table-remove-modal__btn user-table-remove-modal__btn_active"
          @click="onCancel"
        >
          Нет
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  mounted() {
    this.disableScroll();
  },
  beforeDestroy() {
    this.enableScroll();
  },
  methods: {
    disableScroll() {
      document.body.style.overflowY = "hidden";
    },
    enableScroll() {
      document.body.style.overflowY = "auto";
    },
    onConfirm() {
      this.$emit("onConfirm");
    },
    onCancel() {
      this.$emit("onCancel");
    },
  },
});
</script>

<style lang="scss">
.user-table-remove-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  &__content {
    padding: 36px 36px 32px;
    background-color: $white;
    @media (max-width: 500px) {
      padding: 30px 30px 26px;
    }
  }
  &__title {
    font-size: 12px;
    line-height: 15px;
    color: #000000;
  }
  &__btn {
    padding: 6px 36px;
    font-weight: 500;
    font-size: 12px;
    border-radius: $common-border-radius;
    line-height: 15px;
    cursor: pointer;
    color: #828282;
    background: #e0e0e0;
    &_active {
      background-color: $blue;
      color: $white;
    }

    &-container {
      margin-top: 24px;
      display: flex;
      justify-content: center;
      & > *:first-child {
        margin-right: 36px;
      }
    }
  }
}
</style>
