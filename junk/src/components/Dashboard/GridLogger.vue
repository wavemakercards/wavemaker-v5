<script>
export default {
  data() {
    return {
      currentdate: new Date(),
      wordcountprogress : 0,
      month: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    };
  },
  computed: {
    monthDays() {
      const now = new Date(this.currentdate);
      const year = now.getFullYear();
      const month = now.getMonth(); // 0-based index (0 = January, 11 = December)
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      return daysInMonth;
    },
    prevMonthDays() {
      const now = new Date(this.currentdate);
      const year = now.getFullYear();
      const month = now.getMonth(); // 0-based index (0 = January, 11 = December)
      const daysInMonth = new Date(year, month, 0).getDate(); // Month is set to 0 for the previous month
      return daysInMonth;
    },
    nextMonthDays() {
      const now = new Date(this.currentdate);
      const year = now.getFullYear();
      const month = now.getMonth(); // 0-based index (0 = January, 11 = December)
      const daysInMonth = new Date(year, month - 1, 0).getDate(); // Month is set to 0 for the previous month
      return daysInMonth;
    },
  },
  mounted() {
    if (!this.$root.syncdb.Settings.tracker) {
      this.$root.syncdb.Settings.tracker = {
        wordcount: 0,
        target: 2500,
        log: {
          "2025-02-01": 123,
          "2025-02-02": 432,
          "2025-02-03": 234,
          "2025-02-04": 345,
          "2025-02-05": 456,
          "2025-02-06": 567,
          "2025-02-07": 678,
          "2025-02-08": 789,
          "2025-02-09": 890,
          "2025-02-10": 901,
          "2025-02-11": 123,
          "2025-02-12": 234,
          "2025-02-13": 345,
          "2025-02-14": 456,
          "2025-02-15": 567,
          "2025-02-16": 678,
          "2025-02-17": 789,
          "2025-02-18": 890,
          "2025-02-19": 901,
          "2025-02-20": 123,
          "2025-02-21": 234,
          "2025-02-22": 345,
          "2025-02-23": 456,
          "2025-02-24": 567,
          "2025-02-25": 678,
          "2025-02-26": 789,
          "2025-02-27": 890,
          "2025-02-28": 901,
          "2025-03-01": 123,
          "2025-03-02": 234,
          "2025-03-03": 345,
          "2025-03-04": 456,
          "2025-03-05": 567,
          "2025-03-06": 678,
          "2025-03-07": 789,
          "2025-03-08": 890,
          "2025-03-09": 901,
          "2025-03-10": 123,
          "2025-03-11": 234,
          "2025-03-12": 345,
          "2025-03-13": 456,
          "2025-03-14": 567,
          "2025-03-15": 678,
          "2025-03-16": 789,
          "2025-03-17": 890,
          "2025-03-18": 901,
          "2025-03-19": 123,
          "2025-03-20": 234,
          "2025-03-21": 345,
        },
      };
    }
  },
  methods: {
    update() {
      this.$root.UpdateRecord(
        "Settings",
        this.$root.syncdb.Settings.uuid,
        this.$root.syncdb.Settings
      );
    },
    monthName(v = 0) {
      let x = this.currentdate.getMonth() + v;
      if (x === -1) {
        x = 11;
      }
      if (x === 12) {
        x = 0;
      }
      return this.month[x];
    },
    getLogValue(d, m) {
      const year = this.currentdate.getFullYear();
      const month = this.currentdate.getMonth() + m; // 1-based index
      const day = String(d).padStart(2, "0");
      const dateKey = `${year}-${String(month).padStart(2, "0")}-${day}`;

      const count = this.$root.syncdb.Settings.tracker.log[dateKey] || 0;
      const target = this.$root.syncdb.Settings.tracker.target || 1; // Default to 1 if target is 0
      const percent = count / target;

      return {
        count: count,
        percent: percent,
      };
    },
    advanceMonth() {
      const current = new Date(this.currentdate);
      current.setMonth(current.getMonth() + 1);
      this.currentdate = current;
    },
    reduceMonth() {
      const current = new Date(this.currentdate);
      current.setMonth(current.getMonth() - 1);
      this.currentdate = current;
    },
  },
};
</script>

<template>
  <div v-if="this.$root.syncdb.Settings.tracker">
    <h3>{{ $root.syncdb.Settings.tracker.wordcount }} Words</h3>
    <label
      >Daily Wordcount Target
      <input type="number" v-model="$root.syncdb.Settings.tracker.target" />
    </label>

    <p style="text-align: center">Your Goals</p>
    <div>
      <button @click="reduceMonth">Previous Month</button>
      <button @click="advanceMonth">Next Month</button>
    </div>
    <div class="calendars">
      <div>
        <div class="month">{{ monthName(-1) }}</div>
        <div class="calendar">
          <div
            class="day"
            v-for="d in prevMonthDays"
            :title="getLogValue(d, 0).count + ' Words'"
          >
            <div
              class="block"
              :style="`opacity:${getLogValue(d, 0).percent}`"
            ></div>
          </div>
        </div>
      </div>
      <div>
        <div class="month">{{ monthName() }}</div>
        <div class="calendar">
          <div
            class="day"
            v-for="d in monthDays"
            :title="getLogValue(d, 1).count + ' Words'"
          >
            <div
              class="block"
              :style="`opacity:${getLogValue(d, 1).percent}`"
            ></div>
          </div>
        </div>
      </div>

      <div class="progress-container">
              <svg class="progress-circle" viewBox="0 0 36 36">
                <path
                  class="circle-bg"
                  d="M18 2.0845
                     a 15.9155 15.9155 0 0 1 0 31.831
                     a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  class="circle"
                  :style="`stroke-dasharray: ${wordcountprogress}, 100`"
                  d="M18 2.0845
                     a 15.9155 15.9155 0 0 1 0 31.831
                     a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
            </div>
      <!--
      <div>
        <div class="month">{{ monthName(1) }}</div>
        <div class="calendar">
          <div
            class="day"
            v-for="d in nextMonthDays"
            :title="getLogValue(d, 2).count + ' Words'"
          >
            <div
              class="block"
              :style="`opacity:${getLogValue(d, 2).percent}`"
            ></div>
          </div>
        </div>
      </div>
    -->
    </div>
  </div>
</template>
<style>

.calendars {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px; /* Space between columns */
  width: 360px;
  padding: 10px;
  margin: 0 auto;
}
.month {
  text-align: center;
}

.calendar {
  width: 114px;
}

.day {
  display: inline-block;
  width: 15px;
  height: 15px;
  margin: 2px;
  text-align: center;
  line-height: 25px;
  border: 1px solid #999;
  transition: all 140ms ease-in;
  cursor: pointer;
}
.block {
  width: 100%;
  height: 100%;
  background-color: #efefef
}
.day:hover {
  border: 1px solid #fff;
}

.progress-container {
  position: relative;
  width: 100px;
  height: 100px;
  margin: 0 auto;
}

.progress-circle {
  transform: rotate(-90deg);
  width: 100%;
  height: 100%;
}

.circle-bg {
  fill: none;
  stroke: #e6e6e6; /* Light gray background for the circle */
  stroke-width: 3;
}

.circle {
  fill: none;
  stroke: var(--accent2); /* Primary color for progress */
  stroke-width: 3;
  stroke-linecap: round;
  transition: stroke-dasharray 0.3s ease;
}
</style>
