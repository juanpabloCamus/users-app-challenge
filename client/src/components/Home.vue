<template>
  <div class="home-container">
    <div class="header">
      <h1>User List</h1>
      <button @click="handleLogout">Logout</button>
    </div>
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
          <Row :user="user" :getUsers="getUsers" :logout="handleLogout" />
        </tr>
      </tbody>
    </table>
    <div class="form-container">
      <h1>Create new user</h1>
      <form @submit="handleSubmit">
        <label class="form-label" for="email">Email</label>
        <input
          type="email"
          id="email"
          v-model="email"
          placeholder="example@example.com"
        />
        <label class="form-label" for="name">Name</label>
        <input type="text" id="name" v-model="name" placeholder="Enter name" />
        <label class="form-label" for="password">Password</label>
        <input
          type="password"
          id="password"
          v-model="password"
          placeholder="Enter password"
        />
        <button type="submit">Register</button>
        <label class="error" v-if="error">{{ error }}</label>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

import { API_PORT } from '../config.js';
import Row from './Row.vue';
import Auth from './Auth.vue';

const router = useRouter();

onMounted(() => {
  getUsers();
});

const users = ref([]);
const email = ref('');
const password = ref('');
const name = ref('');
const error = ref('');

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

async function handleLogout() {
  try {
    const response = await fetch(`http://localhost:${API_PORT}/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    localStorage.removeItem('user');
    router.push('/auth');
  } catch (e) {
    console.error(e);
  }
}

async function handleSubmit(event) {
  event.preventDefault();
  error.value = '';
  try {
    const response = await fetch(`http://localhost:${API_PORT}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email.value,
        name: name.value,
        password: password.value,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    getUsers();
  } catch (e) {
    error.value = e.message;
  }
}
</script>

<style>
.home-container {
  margin: 0;
  display: flex;
  min-width: 100vh;
  min-height: 100vh;
  flex-direction: column;
}

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

h1 {
  text-align: left;
}

.header {
  display: flex;
  justify-content: space-between;
  align-content: center;
  align-items: center;
}

.header button {
  height: 50px;
}
</style>
