<template>
  <v-container fluid class="main-content">
    <add-edit-reminders @handlerReminder="handlerReminder($event)" :selectedReminder="selectedReminder"
      @clearSelectedReminder="selectedReminder = undefined" />
    <list-reminders :list="remindersList" @delete="deleteReminder($event)" @update="setSelectedReminder($event)" />
  </v-container>
</template>

<script>
import addEditReminders from './components/add-edit-reminders.vue';
import ListReminders from './components/list-reminders.vue';
import Service from '@/services/reminders-service'
import { formatDate } from '@/utils-scripts/format-date';
export default {
  components: { addEditReminders, ListReminders },
  data() {
    return {
      service: new Service(),
      remindersList: [],
      originalRemindersList: [],
      selectedReminder: {}
    }
  },
  methods: {
    objectForReminderList(date, item) {
      return {
        date, list: [item]
      }
    },
    sortListByDate(list) {
      const compareDate = (currentItem, nextitem) => new Date(currentItem.creationDate) - new Date(nextitem.creationDate)
      list.sort(compareDate)
    },
    groupData(list) {
      this.sortListByDate(list)
      list.forEach((reminder) => {
        const date = formatDate(reminder.creationDate)
        const index = this.remindersList.findIndex((item) => item.date === date
        )
        const mapedReminder = { name: reminder.reminderName, id: reminder.id }
        if (index === -1) this.remindersList.push(this.objectForReminderList(date, mapedReminder))
        else this.remindersList[index].list.push(mapedReminder)
      })
    },
    getAll() {
      this.remindersList = []
      this.originalRemindersList = []
      this.service.GetAll().then((res) => {
        this.originalRemindersList = res.data
        this.groupData(res.data)
      }).catch((error) => {
        console.log(error)
      })
    },
    handlerReminder(data) {
      if (data.id == '') this.createReminder(data)
      else this.updateReminder(data)
    },
    createReminder(data) {
      this.service.Create(data).then((res) => {
        if (res.data == "Created Successfully") this.getAll()
      }).catch((error) => {
        console.log(error)
      })
    },
    updateReminder(data) {
      this.service.Update(data).then((res) => {
        if (res.data == "Updated Successfully") this.getAll()
      }).catch((error) => {
        console.log(error)
      })
    },
    deleteReminder(id) {
      this.service.Delete(id).then((res) => {
        if (res.data == "Deleted Successfully") this.getAll()
      }).catch((error) => {
        console.log(error)
      })
    },
    setSelectedReminder(id) {
      this.selectedReminder = this.originalRemindersList.find((reminder) => reminder.id === id)
    }
  },
  created() {
    this.getAll()
  }

}
</script>
<style lang="scss" scoped>
.main-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100%;
}
</style>