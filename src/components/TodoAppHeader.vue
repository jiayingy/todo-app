<template>
  <div class="header">
    <h1 class="hello">
      <span>h</span>
      <span>e</span>
      <span>l</span>
      <span>l</span>
      <span>o</span>
      <span>,</span>
    </h1>
    <h5 class="date">
      {{ dayOfWeek }}, <span class="normal">{{ date }} {{ month }} {{ year }}</span>
    </h5>
  </div>
</template>

<script>
import CalendarPicker from '@jiayingy/vue-single-date-picker';
export default {
  components: {
    CalendarPicker
  },
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

<style lang="scss" scoped>
.header {
  text-align: center;
  color: #e2b5b5;
}
.hello {
  font-size: 100px;
  font-weight: 100;
  margin: 20px 0;
}

.date {
  text-transform: uppercase;
  .normal {
    font-weight: normal;
  }
}
</style>
