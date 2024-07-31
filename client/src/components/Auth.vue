<template>
  <div class="form-container">
    <h1>Welcome Back</h1>
    <h4 v-if="loginMode">Sign in to your account</h4>
    <h4 v-else=>Register your account</h4>
    <form @submit="handleSubmit">
      <label class="form-label" for="email">Email</label>
      <input
        type="email"
        id="email"
        v-model="email"
        placeholder="example@example.com"
      />
      <label v-if="!loginMode" class="form-label" for="name">Name</label>
      <input
        v-if="!loginMode"
        type="text"
        id="name"
        v-model="name"
        placeholder="Enter your name"
      />
      <label class="form-label" for="password">Password</label>
      <input
        type="password"
        id="password"
        v-model="password"
        placeholder="Enter your password"
      />
      <button type="submit">{{loginMode ? 'Login' : 'Register'}}</button>
      <label class="error" v-if="error">{{error}}</label>
    </form>
    <label >{{loginMode ? "Don't" : 'Already'}} have an account? <a @click="changeMode">{{!loginMode ? 'Login' : 'Register'}}</a></label>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'
import { API_PORT } from '../config.js';

const email = ref('');
const password = ref('');
const name = ref('');
const loginMode = ref(true);
const error = ref("");

const router = useRouter();

function changeMode() {
  loginMode.value = !loginMode.value;
}

function handleSubmit(event) {
  event.preventDefault();
  error.value = "";
  if (loginMode.value) {
    login();
  } else {
    register();
  }
}
async function login() {
  try {
    const response = await fetch(`http://localhost:${API_PORT}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
      credentials: 'include',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    router.push('/');

  } catch (e) {
    error.value = e.message;
  }

}

async function register() {
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

  } catch (e) {
    error.value = e.message;
  }
}
</script>

<style scoped>
.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1 {
  margin-bottom: 10px;
  font-size: 40px;
}

h4 {
  align-self: center;
  margin: 0;
  color: rgb(99, 99, 108);
}

form {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  margin-bottom: 20px;
}

input {
  margin-bottom: 10px;
  height: 35px;
  width: 300px;
  border: 1px solid rgb(228, 228, 243);
  padding: 5px;
  border-radius: 10px;
}

input::placeholder {
  color: rgb(99, 99, 108);
  font-size: 14px;
}

.form-label {
  margin-bottom: 5px;
  align-self: flex-start;
}

button {
  margin-top: 20px;
}

a {
  text-decoration: underline;
  cursor: pointer;
}

.error {
  color: red;
  margin-top: 10px;
}
</style>
