<template>
  <h1>User List</h1>
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in users" :key="user.id">
        <Row :user="user" :getUsers="getUsers" />
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { ref, onMounted } from 'vue';

import { API_PORT } from '../config.js';
import Row from './Row.vue';

onMounted(() => {
  getUsers();
});

const users = ref([]);

async function getUsers() {
  try {
    const response = await fetch(`http://localhost:${API_PORT}/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    users.value = await response.json();
  } catch (error) {
    console.error(error);
  }
}
</script>

<style>
table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 16px;
  color: #333;
}

thead {
  background-color: #f4f4f4;
  color: #333;
}

th {
  padding: 12px 15px;
  text-align: center;
  border-bottom: 2px solid #ddd;
}

tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

tbody tr:nth-child(odd) {
  background-color: #fff;
}

td {
  padding: 12px 15px;
  border-bottom: 1px solid #ddd;
}

tbody tr:hover {
  background-color: #f1f1f1;
}

table:empty {
  display: none;
}

table,
th,
td {
  border: 1px solid #ddd;
}

thead {
  position: sticky;
  top: 0;
  z-index: 1;
}
</style>
