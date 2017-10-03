var app = new Vue({
	el: '#app',
	data: {
		running: false,
		lapSet: false,

		minutes: 0,
		seconds: 0,
		centiseconds: 0,

		prevLapMinutes: 0,
		prevLapSeconds: 0,
		prevLapCentiseconds: 0,

		lapMinutes: 0,
		lapSeconds: 0,
		lapCentiseconds: 0,
		lapsRecorded: [],
		lapIndex: 0
	},
	computed: {
		btnLabel: function() {
			return (this.running) ? ('STOP'):('START');
		}
	},		
	methods: {
		runTimer: function() {
				console.log('Timer running');
				this.timerRunning = setInterval(function() {
					if(this.centiseconds >= 99) {
						this.seconds++;
						this.centiseconds = 0;
					}
					if(this.seconds >= 60) {
						this.minutes++;
						this.seconds = 0;
					}
					this.centiseconds++;
			}.bind(this), 10);
		},
		stopTimer: function() {
			console.log('Timer stopped.');
			clearInterval(this.timerRunning);
		},
		toggleTimerState: function() {
			this.running ? this.stopTimer() : this.runTimer();
			this.running = !this.running;
		},
		checkSingleDigit: function(num) {
			return (num < 10) ? ('0' + num):(num);
		},
		resetTimer: function() {
			console.log('Timer reset.');
			this.lapsRecorded = [];
			this.lapSet = false;
			this.centiseconds = this.seconds = this.minutes = 0;
			this.lapCentiseconds = this.lapSeconds = this.lapMinutes = this.lapIndex = 0;
			this.prevLapCentiseconds = this.prevLapSeconds = this.prevLapMinutes = 0;
		},
		saveLapTime: function() {
			this.lapSet = true;
			this.lapMinutes = (this.minutes - this.prevLapMinutes);
			this.lapSeconds = (this.seconds - this.prevLapSeconds);
			this.lapCentiseconds = (this.centiseconds - this.prevLapCentiseconds);

			if(this.lapSeconds < 0) {
				this.lapSeconds = 60 + this.lapSeconds;
				this.lapMinutes--;
			}
			if(this.lapCentiseconds < 0) {
				this.lapCentiseconds = 100 + this.lapCentiseconds;
				this.lapSeconds--;
			}

			this.lapIndex++;

			this.lapsRecorded.unshift(this.checkSingleDigit(this.lapIndex) + ". " +
				 this.checkSingleDigit(this.lapMinutes) + ':' +
				 this.checkSingleDigit(this.lapSeconds) + ':' +
				 this.checkSingleDigit(this.lapCentiseconds));
			console.log("Lap time recorded.");

			this.prevLapCentiseconds = this.centiseconds;
			this.prevLapSeconds = this.seconds;
			this.prevLapMinutes = this.minutes;
		},
	}
})