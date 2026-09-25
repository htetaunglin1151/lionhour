// Prototype fixtures, not live campus information. UI logic lives in model.js.
const schedule = (hours, closedDays = []) => Array.from({ length: 7 }, (_, day) => closedDays.includes(day) ? null : hours);
const diningSchedule = schedule('9:30 AM - 9 PM', [6]);

export const buildings = [
  { id:'john-jay', category:'dining', name:'John Jay Dining', status:'open', hours:'9:30 AM - 9 PM', week:diningSchedule },
  { id:'ferris', category:'dining', name:'Ferris Dining Hall', status:'closing', hours:'9:30 AM - 9 PM', week:diningSchedule },
  { id:'jjs', category:'dining', name:'JJ’s Place', status:'closed', hours:'9:30 AM - 9 PM', week:diningSchedule },
  { id:'fac-shack', category:'dining', name:'Fac Shack', status:'closed', hours:'9:30 AM - 9 PM', week:diningSchedule },
  { id:'hewitt', category:'dining', name:'Hewitt Dining', status:'closed', hours:'9:30 AM - 9 PM', week:diningSchedule },
  { id:'grace-dodge', category:'dining', name:'Grace Dodge Dining', status:'closed', hours:'9:30 AM - 9 PM', week:diningSchedule },
  { id:'chef-don', category:'dining', name:'Chef’s Don Pizza', status:'closed', hours:'9:30 AM - 9 PM', week:diningSchedule },
  { id:'chef-mike', category:'dining', name:'Chef’s Mike Subs', status:'closed', hours:'9:30 AM - 9 PM', week:diningSchedule },
  { id:'butler', category:'libraries', name:'Butler Library', status:'open', hours:'Open 24 hours', week:schedule('Open 24 hours') },
  { id:'avery', category:'libraries', name:'Avery Library', status:'closing', hours:'9 AM - 9 PM', week:schedule('9 AM - 9 PM') },
  { id:'business', category:'libraries', name:'Business Library', status:'closed', hours:'10 AM - 6 PM', week:schedule('10 AM - 6 PM', [6]) },
  { id:'science', category:'libraries', name:'Science & Engineering Library', status:'closed', hours:'9 AM - 8 PM', week:schedule('9 AM - 8 PM') },
  { id:'blue-java', category:'cafes', name:'Blue Java Café', status:'open', hours:'8 AM - 10 PM', week:schedule('8 AM - 10 PM') },
  { id:'joe', category:'cafes', name:'Joe Coffee', status:'closing', hours:'8 AM - 6 PM', week:schedule('8 AM - 6 PM') },
  { id:'cafe-east', category:'cafes', name:'Café East', status:'closed', hours:'10 AM - 8 PM', week:schedule('10 AM - 8 PM', [6]) },
  { id:'dodge-fitness', category:'fitness', name:'Dodge Fitness Center', status:'open', hours:'7 AM - 11 PM', week:schedule('7 AM - 11 PM') },
  { id:'pool', category:'fitness', name:'Uris Pool', status:'closing', hours:'10 AM - 8 PM', week:schedule('10 AM - 8 PM', [6]) },
  { id:'fitness-studio', category:'fitness', name:'Fitness Studio', status:'closed', hours:'9 AM - 7 PM', week:schedule('9 AM - 7 PM', [6]) },
  { id:'lerner', category:'services', name:'Lerner Hall', status:'open', hours:'8 AM - 11 PM', week:schedule('8 AM - 11 PM') },
  { id:'mail', category:'services', name:'Student Mail Center', status:'closing', hours:'9 AM - 5 PM', week:schedule('9 AM - 5 PM', [6]) },
  { id:'health', category:'services', name:'Columbia Health', status:'closed', hours:'9 AM - 5 PM', week:schedule('9 AM - 5 PM', [0,6]) }
];

const breakfastMain = { name:'Main Line', items:['Chicken Sausage','Home Fries','Scrambled Eggs','Egg White Scramble','Pancakes','Vegetable Medley'] };
const breakfast = [
  { name:'Chef Mike’s Kitchen', items:['Strawberry Matcha Bubble Tea'] },
  breakfastMain, breakfastMain, breakfastMain
];
const lunch = [
  { name:'Chef Mike’s Kitchen', items:['Roasted Tomato Soup'] },
  { name:'Main Line', items:['Grilled Chicken','Herb Roasted Potatoes','Steamed Broccoli','Lemon Tofu','Brown Rice','Seasonal Vegetables'] },
  { name:'Salad Bar', items:['Mixed Greens','Cucumber','Cherry Tomatoes','Chickpeas','Feta','Balsamic Vinaigrette'] }
];
const dinner = [
  { name:'Chef Mike’s Kitchen', items:['Pasta Primavera'] },
  { name:'Main Line', items:['Roasted Chicken','Mashed Potatoes','Green Beans','Baked Tofu','Wild Rice','Roasted Carrots'] },
  { name:'Dessert', items:['Chocolate Brownie','Fresh Fruit'] }
];
const lateNight = [
  { name:'Grill', items:['Cheeseburger','French Fries','Grilled Cheese','Veggie Burger','Sweet Potato Fries','Chicken Tenders'] },
  { name:'Dessert', items:['Chocolate Chip Cookies','Fresh Fruit'] }
];
export const menus = {
  'john-jay': { breakfast, lunch, dinner },
  ferris: { breakfast, lunch, dinner },
  jjs: { 'late-night':lateNight },
  'fac-shack': { lunch },
  hewitt: { breakfast, lunch, dinner },
  'grace-dodge': { breakfast, lunch },
  'chef-don': { lunch:[{ name:'Pizza', items:['Margherita Pizza','Pepperoni Pizza','Garden Vegetable Pizza'] }], dinner:[{ name:'Pizza', items:['Margherita Pizza','Pepperoni Pizza','Garden Vegetable Pizza'] }] },
  'chef-mike': { lunch:[{ name:'Subs', items:['Turkey & Swiss','Roasted Vegetable Sub','Italian Sub'] }] }
};
