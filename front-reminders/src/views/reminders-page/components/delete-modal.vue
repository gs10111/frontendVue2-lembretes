<template>
  <v-dialog transition="dialog-bottom-transition" max-width="600">
    <template v-slot:activator="{ on, attrs }">
      <v-icon color="red" class="mr-1" v-bind="attrs" v-on="on">mdi-close-box</v-icon>
    </template>
    <template v-slot:default="dialog">
      <v-card class="pa-4">
        <h3><b>Nome:</b> {{ name }}</h3>
        <h3><b>Data:</b> {{ date }}</h3>
        <p style="color:red">Você realmente deseja deletar o lembrete ?</p>
        <v-row no-gutters justify="end" align="center">
          <v-btn class="mr-4" outlined color="primary" @click="dialog.value = false">Não</v-btn>
          <v-btn color="red" @click="() => {
            dialog.value = false
            $emit('delete')
          }">
            <span style="color: white">Sim</span>
          </v-btn>
        </v-row>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
export default {
  props: ['name', 'date'],
  methods: {
    delete() {

    }
  }

}
</script>

<style></style>