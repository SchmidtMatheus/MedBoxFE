<template>
  <div class="app-container">
    <Toast ref="toast" />
    <header>
      <h1>Controle e Monitoramento de Temperatura</h1>
      <h2>Temperatura Interna do Refrigerador</h2>
      <div class="header-buttons">
        <button @click="showDialog">Editar Temperatura Ideal</button>
        <button @click="showReportDialog">Gerar Relatórios</button>
      </div>
    </header>
    <EditTemperatureDialog :visible="dialogVisible" @submit="submitForm" @cancel="cancelForm" />
    <ReportDialog :visible="reportDialogVisible" @submit="submitReportForm" @cancel="cancelReportForm" />
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
import ReportDialog from './components/ReportDialog.vue';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';

export default {
  components: {
    TemperatureChart,
    EditTemperatureDialog,
    ReportDialog,
    Toast
  },
  data() {
    return {
      dialogVisible: false,
      reportDialogVisible: false
    };
  },
  mounted() {
    this.$toast = this.$toast || this.$root.$toast;
  },
  methods: {
    showDialog() {
      this.dialogVisible = true;
    },
    async submitForm() {
      this.dialogVisible = false;
    },
    cancelForm() {
      this.dialogVisible = false;
    },
    showReportDialog() {
      this.reportDialogVisible = true;
    },
    submitReportForm(dates) {
      console.log('Datas selecionadas para o relatório:', dates);
      this.reportDialogVisible = false;
      // Lógica adicional para manipulação de dados do relatório, se necessário
    },
    cancelReportForm() {
      this.reportDialogVisible = false;
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
