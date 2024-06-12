<template>
    <div v-if="visible" class="report-dialog">
      <div class="report-dialog-content">
        <h3>Selecionar Período do Relatório</h3>
        <Calendar v-model="dates" selectionMode="range" :manualInput="false"  inline showWeek />
        <div class="button-group">
          <button @click="downloadReport">Salvar</button>
          <button @click="cancelDialog">Voltar</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Calendar from 'primevue/calendar';
  import axios from 'axios';
  
  export default {
    components: {
      Calendar
    },
    props: {
      visible: Boolean,
    },
    data() {
      return {
        dates: null
      };
    },
    methods: {
      async formatDate(date) {
        const day = String(date.getUTCDate()).padStart(2, '0');
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        const year = date.getUTCFullYear();
        return `${day}-${month}-${year}`;
      },
      async downloadReport() {
      const [startDate, endDate] = this.dates;
      const formattedStartDate = new Date(startDate).toISOString();
      const formattedEndDate = new Date(endDate).toISOString();
      const url = `http://localhost:3000/registries/${formattedStartDate}/${formattedEndDate}`;

      try {
        const response = await fetch(url);
        if (response.ok) {
          const blob = await response.blob();
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = 'registries.xlsx';
          link.click();
        } else {
          console.error('Failed to download report', response.statusText);
        }
      } catch (error) {
        console.error('Error downloading report', error);
      }
    },
      cancelDialog() {
        this.$emit('cancel');
      }
    }
  };
  </script>
  
  <style scoped>
  .report-dialog {
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
  
  .report-dialog-content {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    z-index: 1001;
  }
  
  .report-dialog h3 {
    margin-top: 0;
  }
  
  .button-group {
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
  }
  
  .button-group button {
    padding: 8px 15px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .button-group button:hover {
    background-color: #0056b3;
  }
  </style>
  