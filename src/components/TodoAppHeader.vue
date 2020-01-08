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
    <div
      id="date-picker"
      class="date-picker"
    >
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
      selectedDate: new Date(),
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
  },
  created() {
    window.addEventListener('click', this.closeCalendarOnClick);
  },
  destroyed() {
    window.removeEventListener('click', this.closeCalendarOnClick);
  },
  methods: {
    toggleCalendar() {
      this.isOpen = !this.isOpen;
    },
    closeCalendarOnClick(event) {
      const calendarPickerEl = document.getElementById('date-picker');
      if (this.isOpen && !calendarPickerEl.contains(event.target)) {
        this.isOpen = false;
      }
    }
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

.date-picker {
  position: relative;
  cursor: pointer;
  .calendar-view {
    position: absolute;
    left: 50%;
  }
}
</style>
