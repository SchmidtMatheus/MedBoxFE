<template>
  <div class="app-container">
    <header>
      <h1>Controle e Monitoramento de Temperatura</h1>
      <h2>Temperatura Interna do Refrigerador</h2>
      <div class="header-buttons">
        <button @click="showDialog">Editar Temperatura Ideal</button>
        <button @click="generateReport">Gerar Relatórios</button>
      </div>
    </header>
    <EditTemperatureDialog :visible="dialogVisible" @submit="submitForm" @cancel="cancelForm" />
    <div class="content">
      <div class="temperature-chart">
        <TemperatureChart />
      </div>
    </div>
    <footer>
      <p>&copy; Projeto desenvolvido para a disciplina de TCC no curso de Ciência da Computação da UNESC.</p>
    </footer>
  </div>
</template>

<script>
import TemperatureChart from './components/TemperatureChart.vue';
import EditTemperatureDialog from './components/EditTemperatureDialog.vue';

export default {
  components: {
    TemperatureChart,
    EditTemperatureDialog
  },
  data() {
    return {
      dialogVisible: false
    };
  },
  methods: {
    showDialog() {
      this.dialogVisible = true;
    },
    async submitForm(formData) {
      console.log('Dados do formulário:', formData);
      this.dialogVisible = false;
    },
    cancelForm() {
      this.dialogVisible = false;
    },
    generateReport() {
      console.log('Gerando relatório...');
      // Lógica para gerar relatório vai aqui
    }
  }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.app-container {
  position: relative;
  min-height: 100vh;
  background-color: #fff;
  color: #222;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

header {
  text-align: left;
  margin-bottom: 1rem;
  position: relative;
}

h1 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

h2 {
  font-size: 0.9rem;
  font-weight: normal;
  margin-bottom: 0.5rem;
}

.header-buttons {
  position: absolute;
  top: 0;
  right: 0;
  margin: 1rem;
}

button {
  margin-left: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: rgb(75, 192, 192);
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.temperature-chart {
  width: 70%;
}

.content {
  display: flex;
  justify-content: center;
  align-items: center;
}

footer {
  width: 100%;
  text-align: center;
  margin-top: 1rem;
}
</style>
