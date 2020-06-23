class Open extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDay: new Date(),
      currentTime: new Date(),
      weekDay: new Date().getDay(),
      openTime: new Date(null, null, null, 9, 15, 0, 0),
      closeTime: new Date(null, null, null, 17, 0, 0, 0),
      bankHolidays: [{
        data: []
      }],
      shopOpen: false
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
    this.state.shopOpen = !this.state.bankHolidays["england-and-wales"].events.some(holiday => {
      let bankHoliday = new Date(holiday.date).toLocaleDateString("en-GB");

      if (this.state.currentDay.toLocaleDateString("en-GB") === bankHoliday) {
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
          shopOpen: false
        });
        break;

      case 1:
        //Monday
        this.setState({
          openTime: new Date(null, null, null, 10, 0, 0, 0),
          closeTime: new Date(null, null, null, 16, 0, 0, 0)
        });
        break;

      case 2:
        //Tuesday
        this.setState({
          openTime: new Date(null, null, null, 10, 0, 0, 0),
          closeTime: new Date(null, null, null, 16, 0, 0, 0)
        });
        break;

      case 3:
        //Wednesday
        this.setState({
          openTime: new Date(null, null, null, 10, 0, 0, 0),
          closeTime: new Date(null, null, null, 16, 0, 0, 0)
        });
        break;

      case 4:
        //Thursday
        this.setState({
          openTime: new Date(null, null, null, 10, 0, 0, 0),
          closeTime: new Date(null, null, null, 16, 0, 0, 0)
        });
        break;

      case 5:
        //Friday
        this.setState({
          openTime: new Date(null, null, null, 10, 0, 0, 0),
          closeTime: new Date(null, null, null, 16, 0, 0, 0)
        });
        break;

      case 6:
        //Saturday
        this.setState({
          openTime: new Date(null, null, null, 10, 0, 0, 0),
          closeTime: new Date(null, null, null, 16, 0, 0, 0)
        });
        break;
    }
  }

  applyMargin() {
    let element = document.getElementById("mobileMargin");

    if (element) {
      element.className += " additional-margin";
    }
  }

  render() {
    if (this.state.shopOpen && this.state.currentTime.getHours() >= this.state.openTime.getHours() && this.state.currentTime.getHours() < this.state.closeTime.getHours()) {
      this.applyMargin();
      return React.createElement("div", {
        className: "open-wrapper"
      }, React.createElement("h2", null, "Open now!"), React.createElement("h3", null, "Until ", this.state.closeTime.toLocaleTimeString('en-GB', {
        hour: 'numeric',
        hour12: true
      })));
    } else {
      return null;
    }
  }

} //TODO:
//checkHolidays outside of tick function


ReactDOM.render(React.createElement(Open, null), document.getElementById("open"));