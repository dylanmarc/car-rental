import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';

//Base car data.
const basedata = [
  {
    'id': Date.now() - 100,
    'carMaker': 'Ford',
    'carModel': 'Mustang',
    'manufactureYear': '2011',
    'seats': '4',
    'pricePerDay': 50,
    'rent': { 'rented': true, 'rentedFrom': Date.now() - 100000000, 'rentedTo': '', 'history': [] }
  },
  {
    'id': Date.now() - 200,
    'carMaker': 'Nissan',
    'carModel': 'Cube',
    'manufactureYear': '2015',
    'seats': '4',
    'pricePerDay': 60,
    'rent': { 'rented': false, 'rentedFrom': '', 'rentedTo': '', 'history': [] }
  },
  {
    'id': Date.now() - 300,
    'carMaker': 'Totoya',
    'carModel': 'Corolla',
    'manufactureYear': '2011',
    'seats': '4',
    'pricePerDay': 200,
    'rent': { 'rented': true, 'rentedFrom': Date.now() - 900000000, 'rentedTo': '', 'history': [] }
  },
  {
    'id': Date.now() - 400,
    'carMaker': 'Totoya',
    'carModel': 'Corolla',
    'manufactureYear': '2011',
    'seats': '4',
    'pricePerDay': 55,
    'rent': { 'rented': false, 'rentedFrom': '', 'rentedTo': '', 'history': [] }
  },
  {
    'id': Date.now() - 500,
    'carMaker': 'Totoya',
    'carModel': 'Corolla',
    'manufactureYear': '2011',
    'seats': '4',
    'pricePerDay': 70,
    'rent': { 'rented': false, 'rentedFrom': '', 'rentedTo': '', 'history': [] }
  }
]

//Constructor for new cars.
function Car(id, carMaker, carModel, manufactureYear, seats, pricePerDay, rent) {
  this.id = id;
  this.carMaker = carMaker;
  this.carModel = carModel;
  this.manufactureYear = manufactureYear;
  this.seats = seats;
  this.pricePerDay = pricePerDay;
  this.rent = { rented: false, rentedFrom: Date, rentedTo: Date, history: [] };
}


export default class App extends React.Component {
  //Setting up the states for all of the cars.
  constructor(props) {
    super(props);
    this.state = {
      data: basedata,
      make: '',
      model: '',
      year: '',
      seats: '',
      price: '',
      rent: { rented: false, rentedFrom: Date, rentedTo: Date, history: [] },

      edit: false,
      viewRent: false,
      makeEdit: ''
    };

    //Input event handlers.
    this.handleMakeChange = this.handleMakeChange.bind(this)
    this.handleModelChange = this.handleModelChange.bind(this)
    this.handleYearChange = this.handleYearChange.bind(this)
    this.handleSeatsChange = this.handleSeatsChange.bind(this)
    this.handlePriceChange = this.handlePriceChange.bind(this)

    //Button event handlers.
    this.handleClick = this.handleClick.bind(this)
    this.editCar = this.editCar.bind(this)
    this.viewRent = this.viewRent.bind(this)
    this.handleMakeChange = this.handleMakeChange.bind(this)
    this.confirmEdit = this.confirmEdit.bind(this)
  }

  //code for making the input fields work
  handleMakeChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleModelChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleYearChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleSeatsChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handlePriceChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  //Handles adding new cars.
  handleClick(e) {
    e.preventDefault();

    //Create a car object and fill it in with the input field's values.
    const newCar = new Car(0, 'carMaker', 'carModel', 'manufactureYear', 'seats', 60);
    newCar.id = Date.now();
    newCar.carMaker = this.state.make;
    newCar.carModel = this.state.model;
    newCar.manufactureYear = this.state.year;
    newCar.seats = this.state.seats;
    newCar.pricePerDay = this.state.price;

    //Fill with spoof data if fields aren't entered in.
    if (newCar.carMaker.length < 1) {
      newCar.carMaker = 'Toyota';
    }
    if (newCar.carModel.length < 1) {
      newCar.carModel = 'Corolla';
    }
    if (newCar.manufactureYear.length < 1) {
      newCar.manufactureYear = '2010';
    }
    if (newCar.seats.length < 1) {
      newCar.seats = 4;
    }
    if (newCar.pricePerDay.length < 1) {
      newCar.pricePerDay = 65;
    }

    //Push new car to the array.
    this.setState({ data: [...this.state.data, newCar] })

    //Alert user that new car has been added.
    alert(newCar.carMaker + ' ' + newCar.carModel + ' Added!');

    //Reset input fields.
    this.setState({
      make: '',
      model: '',
      year: '',
      seats: '',
      price: '',
    });

  }

  //Function for edit confirmation. Issues with creating unique accessible input values caused this function to not be properly implemented.
  confirmEdit(e, d) {
    e.preventDefault();
    alert('Edit not saved. Please refer to cover email for more details.');
  }

  //Removes car from array.
  removeCar(d) {
    alert(d.carMaker + ' ' + d.carModel + ' (' + d.id + ') ' + 'has been removed');
    this.setState({ data: this.state.data.filter(car => car.id !== d.id) })
  }

  //Toggle for opening/closing edit form.
  editCar(d) {
    d.edit = !d.edit;
    this.setState({ edit: d.edit })
  }

  //Handles the renting of cars. Logs when they are rented and unrented, creates a rentPeriod object to save to rental history.
  rentCar(d) {
    //Toggle rental status.
    d.rent.rented = !d.rent.rented;

    if (d.rent.rented == true) {
      //Saves rented from date.
      d.rent.rentedFrom = Date.now();
    } else {
      //Saves rented to date.
      d.rent.rentedTo = Date.now();

      //Randomise miles driven.
      const milesDriven = Math.floor(Math.random() * Math.floor(50));

      //Get day-difference between rental times.
      const timeDiff = d.rent.rentedTo - d.rent.rentedFrom;
      const dayDiff = timeDiff / (1000 * 3600 * 24);

      //All of the required rent information in an object.
      const rentPeriod = {
        //Convert rented to and from data into legible dates.
        from: new Intl.DateTimeFormat('en-NZ', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(d.rent.rentedFrom),
        to: new Intl.DateTimeFormat('en-NZ', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(d.rent.rentedTo),

        //Set all appropriate rental information
        days: dayDiff,
        miles: milesDriven,
        price: d.pricePerDay,
        total: dayDiff * d.pricePerDay,
        totalgst: dayDiff * d.pricePerDay * 1.15,
      }
      //After saving a rent period, add it to the history array.
      d.rent.history.unshift(rentPeriod);
    }
    //Save changes to history array into the car's rent object
    this.setState({ rent: d.rent })
  }

  //Toggle for opening/closing rental history.
  viewRent(d) {
    d.viewRent = !d.viewRent;
    this.setState({ edit: d.viewRent })
  }

  //Handles the input field value's for editing existing cars.
  handleMakeChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  //What is going to be rendered/displayed on the website.
  render() {
    return (
      <div className='main'>
        <h1 className='title'>Little Fleet United</h1>
        <h2 className='title'>Rental Car Management System</h2>
        <div className='add-car'>
          <div className='add-form'>
            <form>
              <label>Make: </label><input type='text' name='make' placeholder='Toyota' value={this.state.make} onChange={this.handleMakeChange} /><br />
              <label>Model: </label><input type='text' name='model' placeholder='Corolla' value={this.state.model} onChange={this.handleModelChange} /><br />
              <label>Year: </label><input type='number' name='year' placeholder='2010' value={this.state.year} onChange={this.handleYearChange} /><br />
              <label>Seats: </label><input type='number' name='seats' placeholder='4' value={this.state.seats} onChange={this.handleSeatsChange} /><br />
              <label>Price per day: </label><input type='number' name='price' placeholder='65' value={this.state.price} onChange={this.handlePriceChange} /><br />
              <button id='add' onClick={this.handleClick}>Add New Car</button>
            </form>
          </div>
        </div>

        <ul>
          {/* Display all the cars in the array as list items */}
          {this.state.data.map(d =>
            <li className='car' key={d.id}>
              <div className='top'>
                <div className='top-txt'>
                  <h2>
                    {d.carMaker} {d.carModel} {d.rent.rented ? '(Rented)' : '(Available)'}
                  </h2>
                  <br />
                  <p>
                    Year: {d.manufactureYear}<br />
                    Seats: {d.seats}<br />
                    Price per day: ${d.pricePerDay} <br />
                    ID: {d.id}
                  </p>
                </div>
                <div className='buttons'>
                  <button id='rent' onClick={() => this.rentCar(d)}>{d.rent.rented ? 'Unrent' : 'Rent'}</button>
                  <button id='viewRent' onClick={() => this.viewRent(d)}>{d.viewRent ? 'Close Rent History' : 'View Rent History'}</button>
                  <button id='remove' onClick={() => this.removeCar(d)}>Delete</button>
                  <button id='edit' onClick={() => this.editCar(d)}>{d.edit ? 'Cancel' : 'Edit'}</button>
                </div>
              </div>

              {/* Edit form */}
              {d.edit ?
                <div className='edit-form'>
                  <form>
                    <label>Make: </label><input type='text' name='makeEdit' placeholder='Toyota' value={this.state.makeEdit[d.id]} onChange={this.handleMakeChange} /><br />
                    <label>Model: </label><input type='text' name='makeEdit' placeholder='Corolla' value={this.state.makeEdit[d.id]} onChange={this.handleMakeChange} /><br />
                    <label>Year: </label><input type='text' name='makeEdit' placeholder='2010' value={this.state.makeEdit[d.id]} onChange={this.handleMakeChange} /><br />
                    <label>Seats: </label><input type='text' name='makeEdit' placeholder='4' value={this.state.makeEdit[d.id]} onChange={this.handleMakeChange} /><br />
                    <label>Price per day: </label><input type='text' name='makeEdit' placeholder='65' value={this.state.makeEdit[d.id]} onChange={this.handleMakeChange} /><br />
                    <button id='edit' onClick={(e) => this.confirmEdit(e, d)}>Confirm</button>
                  </form>
                </div>
                : null
              }

              {/* Rental history */}
              {d.viewRent ?
                <div>
                  {d.rent.history.length > 0 ? d.rent.history.map(h =>
                    <p className='history' key={h.days}>
                      From: {h.from}<br />
                      To: {h.to}<br />
                      Days rented: {h.days.toFixed(1)}<br />
                      Miles driven: {h.miles}<br />
                      Price per day: ${h.price}<br />
                      Total Cost: ${h.total.toFixed(2)}<br />
                      Total Cost (GST included): ${h.totalgst.toFixed(2)}
                    </p>)
                    : <p className='history'>No history</p>}
                </div>
                : null
              }
            </li>)}
        </ul>
      </div>
    );
  }
}

//Rendering the page.
ReactDOM.render(
  <App />,
  document.getElementById('root')
);

