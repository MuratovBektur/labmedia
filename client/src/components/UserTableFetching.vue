<template>
  <div class="user-table-fetching">
    <div class="user-table-fetching__content"></div>
  </div>
</template>

<style lang="scss">
$spinnerSize: 40px;
.user-table-fetching {
  padding: 16px;
  background-color: $white;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  &__content {
    width: $spinnerSize;
    height: $spinnerSize;
    border: 3px solid transparent;
    border-top-color: $blue;
    animation: spin 1s linear infinite;
    border-radius: 50%;
  }
  @keyframes spin {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
