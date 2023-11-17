<template>
  <v-card class="pa-4 mb-4" :width="`${$vuetify.breakpoint.name == 'xs' ? 100 : 70}%`">
    <v-card-title>Novo lembrete</v-card-title>
    <v-card-text>
      <v-form ref="form">
        <v-text-field v-model="newReminder.reminderName" label="Nome" prepend-icon="mdi-note-outline" required
          :rules="requiredRule" clearable></v-text-field>
        <v-text-field v-model="newReminder.creationDate" type="date" label="Data" prepend-icon="mdi-calendar" required
          :rules="requiredRule" clearable></v-text-field>
        <v-btn v-if="newReminder.id != ''" class="mt-4 mr-4" color="primary" @click="cancelEditingMode">Cancelar
          Edição</v-btn>
        <v-btn class="mt-4" color="primary" :disabled="!unlockButton" @click="handlerReminder">{{ newReminder.id != '' ?
          "Salvar Alterações" :
          "Criar" }}</v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: ['selectedReminder'],
  data() {
    return {
      newReminder: {
        id: '',
        reminderName: null, creationDate: null
      },
      requiredRule: [(v) => !!v || "Campo obrigatório"],
      unlockButton: false,
    }
  },
  methods: {
    handlerReminder() {
      this.newReminder.creationDate = new Date(this.newReminder.creationDate)
      this.$emit('handlerReminder', this.newReminder)
      this.newReminder = { id: '', reminderName: null, creationDate: null }
      this.$refs.form.resetValidation()
    },
    prepareDate(date) {
      return date.split('T')[0]
    },
    cancelEditingMode() {
      this.$emit('clearSelectedReminder')
      this.$refs.form.resetValidation()
    }
  },
  watch: {
    newReminder: {
      handler(value) {
        this.unlockButton = value.reminderName == null && value.creationDate == null ? false : this.$refs.form.validate()
      }, deep: true
    },
    selectedReminder: {
      handler(value) {
        this.newReminder = value ?
          { id: value.id, reminderName: value.reminderName, creationDate: this.prepareDate(value.creationDate) }
          :
          { id: '', reminderName: null, creationDate: null }
      }
    }
  }
}
</script>

<style></style>