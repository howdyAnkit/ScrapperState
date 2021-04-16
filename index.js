const axios = require('axios');
const cheerio = require('cheerio');

const page_url ='https://en.wikipedia.org/wiki/List_of_states_and_territories_of_the_United_States';

async function getUSStates() {
  const {data} = await axios.get(page_url); //HTTP REQUEST
  const $ = cheerio.load(data); //feeding the datat to cheerio
  const table = $('caption:contains("States of the United States of America")').parent();
  const states = [];
  table.find('tbody tr').slice(2).each((i, element) => { //When we use each we get collection we dont get the jqyery collection
    const $row = $(element);  //we are going to take that element and turn into jquery colleection
    const state = {};
    state.name = $row.find(`th a`).first().text().trim();// we are using the propety which are built in to jquery instead of innerTextHtml we are using .text()
    const labels = [
      'code',
      'capital',
      'ratification',
      'population', 
      'total_area_miles',
      'total_area_km',
      'land_area_miles',
      'land_area_km',
      'water_area_miles',
      'water_area_km',
      'number_of_reps',
    ];
    $row.find('td').each((i, element) => {
      const $col = $(element);
      const label = labels[i];
      state[label] = $col.text().trim();
    });
    states.push(state);
  });
  console.log(states);
}

getUSStates();
