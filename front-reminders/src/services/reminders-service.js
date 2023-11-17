import { api } from "@/configs/axiosConfig";

export default class remindersService {
  async GetAll() {
    return await api.get("reminder");
  }
  async Create(reminderData) {
    return await api.post("reminder", reminderData);
  }
  async Update(reminderData) {
    return await api.put(`reminder/${reminderData.id}`, reminderData);
  }

  async Delete(id) {
    return await api.delete(`reminder/${id}`);
  }
}
