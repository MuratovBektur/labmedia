<template>
  <table v-if="userList?.length" class="user-table">
    <thead>
      <tr>
        <th>Имя пользователя</th>
        <th>E-mail</th>
        <th>Дата регистрации</th>
        <th>Рейтинг</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user of userList" :key="user.id">
        <td>{{ user.username }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.registrationDateString }}</td>
        <td>{{ user.rating }}</td>
        <td @click="$emit('onRemoveUser', user.id)">
          <img src="@/assets/img/remove.svg" alt="remove" />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { IUser } from "@/helpers/types";

export default Vue.extend({
  name: "UserList",
  props: {
    userList: {
      type: Array as PropType<Array<IUser>>,
      required: true,
    },
  },
});
</script>

<style lang="scss">
.user-table {
  overflow: auto;
  display: block;
  background: $white;
  border-radius: $common-border-radius;
  padding: 16px;
  & th,
  & td {
    width: 25%;
    min-width: 150px;
    text-align: left;
  }
  & th {
    font-size: 10px;
    font-weight: 500;
    color: $dark-grey;
    padding-bottom: 20px;
  }
  & td {
    border-top: 1px solid #f7f7f7;
    font-weight: 500;
    font-size: 12px;
    color: $grey;
    padding: 14px 0 16px;
    padding-right: 10px;
    &:first-child {
      color: $blue;
    }
    &:last-child {
      width: 50px;
      min-width: 50px;
      cursor: pointer;
    }
  }
}
</style>
