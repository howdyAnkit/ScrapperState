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
      'largest',
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
    let offset = 0;
    $row.find('td').each((j, col) => {
      const $col = $(col);
      let value = $col.text().trim();
      const numValue = value.replace(/,/g, '');
      if(!isNaN(numValue)){
        value = numValue
      }
      if(j === 1 && $col.attr('colspan') === '2'){
        const label = labels[j];
        state[label] = value;
        offset = 1;
      }
        const label =labels[ j + offset];
        state[label] = value;
    });
    states.push(state);
  });
  console.log(states);
}

getUSStates();
