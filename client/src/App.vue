<template>
  <div id="app">
    <div class="app-main-content">
      <h1 class="app-main-content__title">Список пользователей</h1>
      <UserTableSearchPanel
        class="app-main-content__search-panel"
        v-model="searchText"
        :showClearFilter="showClearFilter"
        @clearFilter="clearFilter"
      />
      <UserTableSort
        class="app-main-content__sort-panel"
        @onSelectSortType="onSelectSortType"
        :activeSortType="sort?.type || null"
      />
      <UserTableFetching v-if="!isFetchedUserList" />
      <template v-else-if="filteredAndSortedUserList?.length">
        <UserTable
          :userList="filteredUserListByPage"
          @onRemoveUser="onRemoveUser"
        />
        <UserTablePagination
          class="app-main-content__pagination-panel"
          :page="page"
          :limit="limit"
          :maxCount="maxCount"
          @onChangePage="onChangePage"
          @onNextPage="page++"
          @onPrevPage="page--"
        />
      </template>
      <UserTableNotFound v-else />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";
import sortBy from "@/helpers/sortBy";
import formatDate from "@/helpers/formatDate";
import api from "@/helpers/api";

import {
  IUser,
  TUserSort,
  TUserSortType,
  TUserSortOrder,
  IUserFetched,
} from "@/helpers/types";

import UserTable from "@/components/UserTable.vue";
import UserTablePagination from "@/components/UserTablePagination.vue";
import UserTableSearchPanel from "@/components/UserTableSearchPanel.vue";
import UserTableFetching from "@/components/UserTableFetching.vue";
import UserTableNotFound from "@/components/UserTableNotFound.vue";
import UserTableSort from "@/components/UserTableSort.vue";

const CNST: {
  [key: string]: TUserSortOrder;
} = {
  DESC: "desc",
  ASC: "asc",
};

export default Vue.extend({
  name: "App",
  components: {
    UserTable,
    UserTablePagination,
    UserTableSearchPanel,
    UserTableFetching,
    UserTableNotFound,
    UserTableSort,
  },
  data() {
    return {
      userList: [] as Array<IUser>,
      removedUserListIds: [] as string[],
      page: 1,
      limit: 5,
      isFetchedUserList: false,
      sort: null as TUserSort,
      searchText: "",
    };
  },
  computed: {
    showClearFilter(): boolean {
      return !!(this.searchText || this.sort);
    },
    maxCount(): number {
      return Math.ceil(this.filteredAndSortedUserList.length / this.limit);
    },
    filteredAndSortedUserList(): Array<IUser> {
      const text = this.searchText.toLowerCase();
      return this.sortUserList.filter((user) => {
        const { username, email } = user;
        return (
          // filter by search text
          (username.toLowerCase().includes(text) ||
            email.toLowerCase().includes(text)) &&
          // filter by removed user list
          !this.removedUserListIds.includes(user.id)
        );
      });
    },
    sortUserList(): Array<IUser> {
      if (this.sort?.type) {
        return sortBy<IUser>({
          list: this.userList,
          prop: this.sort.type,
          order: this.sort.order,
        });
      }
      return this.userList;
    },
    filteredUserListByPage(): Array<IUser> {
      const page = this.page;
      const limit = this.limit;

      const startIdx = (page - 1) * limit;
      const endIdx = page * limit;

      return this.filteredAndSortedUserList.slice(startIdx, endIdx);
    },
  },
  async created() {
    this.userList = await this.fetchUserList();
    this.isFetchedUserList = true;
  },
  methods: {
    clearFilter() {
      this.searchText = "";
      this.sort = null;
    },
    onSelectSortType(sortType: TUserSortType) {
      const type = this.sort?.type;
      if (type === sortType) {
        const order = this.sort?.order === CNST.ASC ? CNST.DESC : CNST.ASC;
        // const order = this.sort?.order === "asc" ? "desc" : "asc";
        this.sort = {
          type: sortType,
          order,
        };
        return;
      }
      this.sort = {
        type: sortType,
        order: CNST.DESC,
      };
    },
    async onRemoveUser(userId: string) {
      const canDelete = await this.$dialogBox.confirm({
        title: "Вы уверены, что хотите удалить пользователя?",
        okText: "Да",
        cancelText: "Нет",
      });
      if (canDelete) {
        this.removedUserListIds.push(userId);
      }
    },
    onPrevPage() {
      if (this.page > 1) {
        this.page--;
      }
    },
    onNextPage() {
      if (this.maxCount > this.page) {
        this.page++;
      }
    },
    onChangePage(page: number): void {
      this.page = page;
    },
    async fetchUserList(): Promise<IUser[]> {
      try {
        const url = "https://5ebbb8e5f2cfeb001697d05c.mockapi.io/users";
        delete axios.defaults.headers.common["Accept-Encoding"];
        const { data } = await api.get<IUserFetched[]>(url, {
          // transformRequest: (data, headers) => {
          //   console.log("headers", headers);
          //   // delete headers.common["Accept-Encoding"];
          //   return data;
          // },
          data: {},
          headers: {
            Accept: "application/json",
            "content-type": "application/json",
          },
        });
        return data.map((user) => ({
          ...user,
          registrationDateString: formatDate(user.registration_date),
          registrationDate: new Date(user.registration_date),
        }));
      } catch (err) {
        const msg = "Fetch user list error:" + err;
        // eslint-disable-next-line
        console.error(msg);
        throw msg;
      }
    },
  },
  watch: {
    searchText() {
      this.page = 1;
    },
    sort: {
      handler() {
        this.page = 1;
      },
      deep: true,
    },
    maxCount(val) {
      if (val < this.page) {
        this.page = val;
      }
    },
  },
});
</script>

<style lang="scss">
@import url("https://unpkg.com/reset-css/reset.css");
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap");

*,
*:before,
*:after {
  line-height: calc(100% + 4px);
  box-sizing: border-box;
}
#app {
  font-family: Inter, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  background: #e5e5e5;
  min-height: 100vh;
  padding: 12px 0;
}
.app-main-content {
  padding: 0 20px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  &__title {
    color: $soft-black;
    font-weight: 700;
    font-size: 24px;
    line-height: 28px;
    margin-bottom: 20px;
  }
  &__search-panel {
    margin-bottom: 72px;
  }
  &__sort-panel {
    margin-bottom: 15px;
  }
  &__pagination-panel {
    margin-top: 15px;
  }
}
.user-table {
  margin-bottom: 20px;
}
button {
  background-color: transparent;
  border: none;
}
</style>
