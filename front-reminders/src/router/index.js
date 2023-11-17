import Vue from "vue";
import VueRouter from "vue-router";
import RemindersMain from "@/views/reminders-page/reminders-main";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "remindersHome",
    component: RemindersMain,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
