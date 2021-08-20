// get air.json
const http = new XMLHttpRequest();
http.onreadystatechange = main;
http.open('GET', 'air.json', true);
http.send();


function main() {
  if(http.readyState === XMLHttpRequest.DONE) {
    if(http.status === 200) {
      let data = process(JSON.parse(http.responseText));
      data = exclude(data, ['health']);
      draw(data);
    }
    else return console.log('http error');
  }
}


function process(input) {
  // build data array with attributes
  let data = { params: [] };
  for(const obj of input) {
    // create attribute array if not exists
    if(!data.params.includes(obj.attribute)) {
      data.params.push(obj.attribute);
      data[obj.attribute] = [];
    }

    // put data to attribute array
    obj.created = new Date(obj.created); // timestamp
    data[obj.attribute].push(obj);
  }
  return data;
}


function exclude(data, filter) {
  // find attributes that contain filter keywords
  let filter_targets = [];
  for(param of data.params) {
    for(keyword of filter) {
      if(param.toLowerCase().includes(keyword))
        filter_targets.push(param);
    }
  }

  // remove attributes that contain filter keywords
  for(target of filter_targets) {
    delete data[target];
    data.params.splice(data.params.indexOf(target), 1);
  }
  return data;
}


function draw(data) {
  for(param of data.params) {
    // draw html
    const div = document.createElement('div');
    div.setAttribute('id', `${param}-container`);
    document.getElementById("container").appendChild(div);
    document.getElementById(`${param}-container`).innerHTML = `
    <table class='${param}-filter'>
      <tr>
        <td>기간</td>
        <td>&ensp;:&ensp;</td>
        <td>
          <input type='date' id='${param}-start-date' data-param='${param}'>
          &nbsp;~&nbsp;
          <input type='date' id='${param}-end-date' data-param='${param}'>
        </td>
      </tr>
      <tr>
        <td>threshold</td>
        <td>&ensp;:&ensp;</td>
        <td><input type='number' id='${param}-threshold' data-param='${param}'></td>
      </tr>
    </table>
    <input type='button' data-param='${param}' value='Apply'></input>
    <canvas id='${param}-chart' data-param='${param}'></canvas>
    <hr style='margin: 3rem 0;'>
    `;

    // set chart
    const chart = new Chart(document.getElementById(`${param}-chart`).getContext('2d'), {
      type: 'line',
      data: {
        datasets: [{
          label: param_contexts[param].name,
          data: data[param].map(o => new Object({ x: o.created.getTime(), y: o.value }))
        }]
      },
      options: {
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'hour',
              displayFormats: {
                'hour': 'M월 D일 A h시',
                'day': 'M월 D일'
              },
              tooltipFormat: 'YYYY년 M월 D일 A h시 m분 s초'
            },
            title: { display: true, text: '시간' }
          },
          y: {
            title: { display: true, text: param_contexts[param].unit }
          }
        },
        elements: {
          point: { radius: 2, hitRadius: 10 },
          line: { tension: 0.5 }
        }
      }
    });

    // filter event detection
    for(const input of document.querySelectorAll(`input[type=button][data-param=${param}]`)) {
      input.addEventListener('click', e => {
        // set input data
        const param = input.dataset.param;
        const threshold = document.getElementById(`${param}-threshold`).value;
        let startDate = document.getElementById(`${param}-start-date`).value;
        let endDate = document.getElementById(`${param}-end-date`).value;

        let mode;
        if(startDate && endDate && threshold) mode = 'both';
        else if(startDate && endDate && !threshold) mode = 'time';
        else if(!(startDate && endDate) && threshold) mode = 'threshold';

        if(mode === 'both' || mode === 'time') {
          startDate = new Date(startDate + 'T00:00:00');
          endDate = new Date(endDate + 'T24:00:00');
        }

        // filtering
        chart.data.datasets[0].data = data[param].filter(x => {
          if(mode === 'both') {
            if(x.created > startDate && x.created < endDate && x.value >= threshold)
              return x;
          }
          else if(mode === 'time') {
            if (x.created > startDate && x.created < endDate)
              return x;
          }
          else if(mode === 'threshold') {
            if (x.value >= threshold)
              return x;
          }
        }).map(o => new Object({ x: o.created.getTime(), y: o.value }));

        // update chart
        chart.update();
      });
    }
  }
}


const param_contexts = {
  airQuality: { name: '공기질', unit: '' },
  battery: { name: '배터리', unit: '' },
  carbonDioxide: { name: '이산화탄소', unit: '' },
  dustLevel: { name: '먼지', unit: '' },
  fineDustLevel: { name: '미세먼지', unit: '' },
  humidity: { name: '습도', unit: '' },
  illuminance: { name: '조도', unit: '' },
  temperature: { name: '온도', unit: '' },
  veryFineDustLevel: { name: '초미세먼지', unit: '' }
}
