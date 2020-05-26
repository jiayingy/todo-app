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
      <span
        class="material-icons date-picker-arrow"
        @click="toggleDate('back')"
      >
        chevron_left
      </span>
      <h5
        class="date"
        @click="toggleCalendar"
      >
        {{ dayOfWeek }}, {{ date }} {{ month }} {{ year }}
      </h5>
      <span
        class="material-icons date-picker-arrow"
        @click="toggleDate('forward')"
      >
        chevron_right
      </span>
      <CalendarPicker
        v-show="showCalendar"
        :date="selectedDateObj"
        @selectDate="updateSelectedDate"
      />
    </div>
  </div>
</template>

<script>
import CalendarPicker from 'vue-single-date-picker';

const ONE_DAY = 60 * 60 * 24 * 1000;

export default {
  components: {
    CalendarPicker
  },
  data () {
    return {
      selectedDate: new Date(),
      showCalendar: false,
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
    selectedDateObj() {
      if (this.selectedDate) {
        return {
          date: this.selectedDate.getDate(),
          month: this.selectedDate.getMonth(),
          year: this.selectedDate.getFullYear()
        }
      }
      return null;
    }
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
    },
    toggleDate(val) {
      if (val === 'back') {
        this.selectedDate = new Date(this.selectedDate.getTime() - ONE_DAY);
      } else {
        this.selectedDate = new Date(this.selectedDate.getTime() + ONE_DAY);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import '~vue-single-date-picker/dist/vue-single-date-picker.css';

#single-date-picker {
  position: absolute;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  min-width: fit-content;
}

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
