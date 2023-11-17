<template>
  <v-card class="pa-4" :width="`${$vuetify.breakpoint.name == 'xs' ? 100 : 70}%`">
    <v-card-title>Lista de lembretes</v-card-title>
    <v-list>
      <v-list-item v-for="(reminder, index) in list" :key="index">
        <v-list-item-content>
          <v-list-item-title>{{ reminder.date }}</v-list-item-title>
          <v-list-item-subtitle v-for="item, index in reminder.list" :key="index">
            <v-row no-gutters align="center">
              <span class="mr-2">{{ item.name }}</span>
              <v-icon color="blue" @click="$emit('update', item.id)">mdi-pencil-box</v-icon>
              <delete-modal @delete="$emit('delete', item.id)" :name="item.name" :date="reminder.date" />
            </v-row>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
import { formatDate } from '@/utils-scripts/format-date'
import deleteModal from './delete-modal.vue'
export default {
  components: { deleteModal },
  props: ['list'],
  methods: {
    formatDate,
  }
}
</script>
