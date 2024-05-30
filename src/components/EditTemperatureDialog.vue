<template>
  <div v-if="visible" class="edit-dialog">
    <div class="edit-dialog-content">
      <h3>Editar Temperatura Ideal</h3>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="temperature">Temperatura:</label>
          <input type="number" id="temperature" v-model.number="temperature" step="0.01">
        </div>
        <div class="form-group">
          <label for="offset">Offset:</label>
          <input type="number" id="offset" v-model.number="offset" step="0.01">
        </div>
        <div class="button-group">
          <button type="submit">Confirmar</button>
          <button type="button" @click="cancelForm">Cancelar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    visible: Boolean,
  },
  data() {
    return {
      temperature: 0,
      offset: 0
    };
  },
  mounted() {
    this.getConfigInfo();
  },
  methods: {
    async getConfigInfo() {
      try {
        const response = await axios.get('http://localhost:3000/configs/2');
        const { temperature, offset } = response.data;
        this.temperature = temperature;
        this.offset = offset;
      } catch (error) {
        console.error('Erro ao obter informações da configuração:', error);
        this.temperature = 0;
        this.offset = 0;
      }
    },
    async submitForm() {
      const updateConfigDto = {
        temperature: this.temperature,
        offset: this.offset
      };
      try {
        await axios.patch('http://localhost:3000/configs/2', updateConfigDto);
        this.$emit('submit', updateConfigDto); // Emit updated data to parent component
      } catch (error) {
        console.error('Erro ao enviar requisição PATCH:', error);
      }
    },
    cancelForm() {
      this.$emit('cancel');
    }
  }
};
</script>

<style scoped>
h3 {
    color: black;
}

.edit-dialog {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.edit-dialog-content {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    z-index: 1001;
}

.edit-dialog h3 {
    margin-top: 0;
}

.form-group {
    margin-top: 15px;
    margin-bottom: 15px;
    margin-right: 15px;
}

.form-group label {
    display: block;
    color: black;
}

.form-group input {
    width: 100%;
    padding: 8px;
}

.button-group button {
    padding: 8px 15px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-right: 10px;
}

.button-group button:last-child {
    margin-right: 0;
}

.button-group button:hover {
    background-color: #0056b3;
}
</style>
