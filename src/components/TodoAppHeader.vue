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
      <h5
        class="date"
        @click="toggleCalendar"
      >
      {{ dayOfWeek }}, <span class="normal">{{ date }} {{ month }} {{ year }}</span>
    </h5>
      <CalendarPicker v-if="isOpen" />
    </div>
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
      isOpen: false
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
    toggleCalendar() {
      this.isOpen = !this.isOpen;
    },
  }
};
</script>

<style lang="scss" scoped>
@import '~@jiayingy/vue-single-date-picker/dist/vue-single-date-picker.css';

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
