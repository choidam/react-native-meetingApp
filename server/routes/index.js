var express = require('express');
var router = express.Router();

const faker = require('faker');
const _ = require('lodash');
const users = [];
const sensorGroups = [];
const sensors = [];
const sensorValues = {};
let gId = 0, sId = 0, uId = 0;

function fakeUser() {
  return {
    id: uId++,
    name: faker.name.findName(),
    email: faker.internet.email,
    avatar: faker.image.avatar(),
}; }

function fakeSensorGroup(user) {
  return {
    id: gId++,
    name: faker.commerce.productName(),
    location: faker.address.city(),
    img: faker.image.image(),
    user
}; }

function fakeSensor(user, sensorGroup) {
  const s = {
    id: sId++,
    name: faker.commerce.productName(),
    temp: faker.random.number(30),
    hum: faker.random.number(100),
    co2: faker.random.number(4000),
    user, sensorGroup
  };
  sensorValues[s.id] = [s.temp];
  return s;
}

function generateFakeData() { /* 가짜로 데이터를 생성하자. */
 
  for (let i = 0; i < 10; i++) {
      const user = fakeUser();
      users.push(user);
      for (let j = 0; j < faker.random.number({ min: 1, max: 5 }); j++) {
        let sensorGroup = fakeSensorGroup(user);
        sensorGroups.push(sensorGroup);
        for (let k = 0; k < faker.random.number({ min: 1, max: 10 }); k++) {
          const sensor = fakeSensor(user, sensorGroup);
          sensors.push(sensor);
        } 
      }
  } 
}

generateFakeData();

 
setInterval(() => {
  _.each(sensors, function (sensor) {
    sensor.temp += faker.random.number({ min: -1, max: 1 });
    sensor.hum += faker.random.number({ min: -3, max: 3 });
    sensor.co2 += faker.random.number({ min: -30, max: 30 });
    sensorValues[sensor.id] = [...sensorValues[sensor.id].slice(-29),
sensor.temp];
  });
}, 1000);



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express22' });
});

 
router.get('/api/users', function(req, res) {
  res.json(users);
});

router.get('/api/sensor_groups', function (req, res) {
  res.json(sensorGroups);
});
router.get('/api/sensors', function (req, res) {
  res.json(sensors);
});

router.get('/api/users/:id', function(req, res) {
  let id = parseInt(req.params.id, 10);
  res.json(users.find(e => e.id == id));
});
router.get('/api/sensor_groups/:id', function (req, res) {
  let id = parseInt(req.params.id, 10);
  res.json(sensorGroups.find(e => e.id == id));
});
router.get('/api/sensors/:id', function (req, res) {
  let id = parseInt(req.params.id, 10);
  res.json(sensors.find(e => e.id == id));
});
router.get('/api/users/:id/sensor_groups', function (req, res) {
  let id = parseInt(req.params.id, 10);
  res.json(sensorGroups.filter(e => e.user.id == id));
});
router.get('/api/sensor_groups/:id/sensors', function (req, res) {
  let id = parseInt(req.params.id, 10);
  res.json(sensors.filter(e => e.sensor_group.id == id));
});
router.get('/api/sensors/:id/values', function (req, res) {
  let id = parseInt(req.params.id, 10);
  res.json(sensorValues[id]);
});


module.exports = router;
