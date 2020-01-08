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
      <CalendarPicker
        v-show="isOpen"
        :style="{left: `${clickPosX}px`}"
        @selectDate="updateSelectedDate"
      />
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
      isOpen: false,
      clickPosX: 0,
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
    },
  },
  created() {
    window.addEventListener('click', this.handleClickEvent);
  },
  destroyed() {
    window.removeEventListener('click', this.handleClickEvent);
  },
  methods: {
    toggleCalendar() {
      this.isOpen = !this.isOpen;
    },
    handleClickEvent(event) {
      this.clickPosX = event.clientX;
      if (this.isOpen) {
        const datePickerEl = document.getElementById('date-picker');
        const isWithinDatePicker = datePickerEl.contains(event.target);
        const isDateSelected = event.target.classList.contains('date');
        if (!isWithinDatePicker || isDateSelected) {
          this.isOpen = false;
        }
      } 
    },
    updateSelectedDate(obj) {
      this.selectedDate = new Date(obj.year, obj.month, obj.date);
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
    min-width: 300px;
  }
}
</style>
