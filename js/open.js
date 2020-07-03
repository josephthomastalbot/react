class Open extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: new Date(),
      weekDay: new Date().getDay(),
      openTime: new Date(),
      closeTime: new Date(),
      bankHolidays: [{
        data: []
      }],
      openToday: false
    };
  }

  componentDidMount() {
    this.intervalID = setInterval(() => this.tick(), 1000);
    this.loadJSON();
    this.setHours();
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  tick() {
    this.setState({
      currentTime: new Date()
    });
  }

  async loadJSON() {
    await fetch('https://www.gov.uk/bank-holidays.json').then(response => response.json()).then(data => {
      this.setState({
        bankHolidays: data
      });
    });
    this.compareHolidays();
  }

  compareHolidays() {
    this.state.openToday = !this.state.bankHolidays["england-and-wales"].events.some(holiday => {
      let bankHoliday = new Date(holiday.date).toLocaleDateString("en-GB");

      if (this.state.currentTime.toLocaleDateString("en-GB") === bankHoliday) {
        console.log("Denude is closed, for " + holiday.title);
        return true;
      }
    });
  }

  setHours() {
    switch (this.state.weekDay) {
      case 0:
        //Sunday
        this.setState({
          openToday: false
        });
        break;

      case 1:
        //Monday
        this.state.openTime.setHours(10, 0, 0);
        this.state.closeTime.setHours(16, 0, 0);
        break;

      case 2:
        //Tuesday
        this.state.openTime.setHours(10, 0, 0);
        this.state.closeTime.setHours(16, 0, 0);
        break;

      case 3:
        //Wednesday
        this.state.openTime.setHours(10, 0, 0);
        this.state.closeTime.setHours(16, 0, 0);
        break;

      case 4:
        //Thursday
        this.state.openTime.setHours(10, 0, 0);
        this.state.closeTime.setHours(16, 0, 0);
        break;

      case 5:
        //Friday
        this.state.openTime.setHours(10, 0, 0);
        this.state.closeTime.setHours(10, 0, 0);
        break;

      case 6:
        //Saturday
        this.state.openTime.setHours(10, 0, 0);
        this.state.closeTime.setHours(16, 0, 0);
        break;
    }
  }

  applyMargin() {
    let element = document.getElementById("mobileMargin");
    element.classList.add("additional-margin");
  }

  removeMargin() {
    let element = document.getElementById("mobileMargin");
    element.classList.remove("additional-margin");
  }

  render() {
    if (this.state.openToday && this.state.currentTime >= this.state.openTime && this.state.currentTime <= this.state.closeTime) {
      this.applyMargin();
      return React.createElement("div", {
        className: "open-wrapper"
      }, React.createElement("h2", null, "Open now!"), React.createElement("h3", null, "Until ", this.state.closeTime.toLocaleTimeString('en-GB', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      })));
    } else {
      this.removeMargin();
      return null;
    }
  }

}

ReactDOM.render(React.createElement(Open, null), document.getElementById("open"));