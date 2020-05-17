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
      <span class="material-icons date-picker-arrow">
        chevron_left
      </span>
      <h5
        class="date"
        @click="toggleCalendar"
      >
        {{ dayOfWeek }}, {{ date }} {{ month }} {{ year }}
      </h5>
      <span class="material-icons date-picker-arrow">
        chevron_right
      </span>
    </div>
    <CalendarPicker
      v-show="showCalendar"
      :style="{left: `${clickPosX}px`}"
      @selectDate="updateSelectedDate"
    />
  </div>
</template>

<script>
import CalendarPicker from 'vue-single-date-picker';
export default {
  components: {
    CalendarPicker
  },
  data () {
    return {
      selectedDate: new Date(),
      showCalendar: false,
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
  watch: {
    selectedDate(val) {
      this.$emit('updateDate', val);
    }
  },
  created() {
    window.addEventListener('click', this.handleClickEvent);
  },
  destroyed() {
    window.removeEventListener('click', this.handleClickEvent);
  },
  methods: {
    toggleCalendar() {
      this.showCalendar = !this.showCalendar;
    },
    handleClickEvent(event) {
      this.clickPosX = event.clientX;
      if (this.showCalendar) {
        const datePickerEl = document.getElementById('date-picker');
        const isWithinDatePicker = datePickerEl.contains(event.target);
        const isDateSelected = event.target.classList.contains('single-date-picker__date');
        if (!isWithinDatePicker || isDateSelected) {
          this.showCalendar = false;
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
@import '~vue-single-date-picker/dist/vue-single-date-picker.css';

.header {
  text-align: center;
  color: #e2b5b5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.hello {
  font-size: 100px;
  font-weight: 100;
  margin: 20px 0;
}

.date {
  text-transform: uppercase;
}

.date-picker {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .calendar-view {
    position: absolute;
    left: 50%;
    min-width: 300px;
  }

  .date,
  .date-picker-arrow {
    cursor: pointer;
  }
}
</style>
