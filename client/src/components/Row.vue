<template>
  <td v-if="isEditing">
    <input v-model="name" />
  </td>
  <td v-else>{{ user.name }}</td>
  <td v-if="isEditing">
    <input v-model="email" />
  </td>
  <td v-else>{{ user.email }}</td>
  <td>
    <span
      v-if="isEditing"
      @click="handleUpdateUser"
      class="pi pi-check icon"
    ></span>
    <span v-else @click="toggleEdit" class="pi pi-pencil icon"></span>
    <span @click="handleDeleteUser" class="pi pi-trash icon"></span>
  </td>
</template>

<script setup>
import { defineProps, ref } from 'vue';
import { API_PORT } from '../config.js';

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
  getUsers: {
    type: Function,
    required: true,
  },
});

const name = ref(props.user.name);
const email = ref(props.user.email);
const isEditing = ref(false);

function toggleEdit() {
  isEditing.value = !isEditing.value;
}

async function handleDeleteUser() {
  try {
    const response = await fetch(
      `http://localhost:${API_PORT}/users/${props.user.id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      },
    );
    if (response.ok) {
      console.log('User deleted');
      props.getUsers();
    } else {
      throw new Error('Failed to delete user');
    }
  } catch (error) {
    alert(error.message);
  }
}

async function handleUpdateUser() {
  try {
    const response = await fetch(
      `http://localhost:${API_PORT}/users/${props.user.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          name: name.value,
          email: email.value,
        }),
      },
    );
    if (response.ok) {
      console.log('User updated');
      props.getUsers();
    } else {
      throw new Error('Failed to update user');
    }
  } catch (error) {
    alert(error.message);
  } finally {
    toggleEdit();
  }
}
</script>

<style scoped>
.icon {
  margin: 10px;
  cursor: pointer;
}
</style>
