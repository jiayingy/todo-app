<template>
  <h1 class="todo-header">
    <span>h</span>
    <span>e</span>
    <span>l</span>
    <span>l</span>
    <span>o</span>
    </h1>
    <h5 class="date">
      {{ dayOfWeek }}, <span class="normal">{{ date }} {{ month }} {{ year }}</span>
    </h5>
  </div>
</template>

<script>
export default {
  data () {
    return {
      selectedDate: new Date()
    };
  },
  computed: {
    dayOfWeek () {
      return this.selectedDate.toLocaleString('en-us', {
        weekday: 'long'
      });
    },
    date () {
      return this.selectedDate.getDate();
    },
    month () {
      return this.selectedDate.toLocaleString('en-US', {
        month: 'short'
      });
    },
    year () {
      return this.selectedDate.toLocaleString('en-US', {
        year: 'numeric'
      });
    }
}
};
</script>

<style>
.todo-header {
  font-size: 100px;
  text-align: center;
  font-weight: bold;
  /* letter-spacing: 7px; */
  color: #D10E7A;
  margin: 20px 0;
}
</style>