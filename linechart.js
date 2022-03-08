// Load and parse data
var parseDate = d3.timeParse('%m/%d/%Y');

d3.csv('data.csv', function (d) {
  return {
    date : parseDate(d.date),
    price: +d.price
  };
}).then(lineChart);

function lineChart(data) {
  console.log(data);

  let maxDate  = d3.max(data, function (d) { return d.date; });
  let minDate  = d3.min(data, function (d) { return d.date; });
  let maxPrice = d3.max(data, function (d) { return d.price;});
  console.log(maxDate, minDate, maxPrice);

  let width  = 600;
  let height = 500;
  let margin = {
    top   : 30,
    bottom: 30,
    left  : 30,
    right : 30
  };

  let svg = d3.select('body')
    .append('svg')
      .attr('width' , width)
      .attr('height', height)
      .style('background', '#efefef');

  let chartGroup = svg
    .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  let xScale = d3.scaleTime()
      .domain([minDate, maxDate])
      .range([0, width]);

  let yScale = d3.scaleLinear()
      .domain([0, maxPrice])
      .range([height - margin.bottom - margin.top, 0]);

  let xAxis = d3.axisBottom(xScale);
  chartGroup.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0, ' + (height - margin.bottom - margin.top) + ')')
      .call(xAxis);

  let yAxis = d3.axisLeft(yScale);
  chartGroup.append('g')
      .attr('class', 'y axis')
      .attr('transform', 'translate(0, 0)')
      .call(yAxis);

  let line = d3.line()
      .x(function (d) { return xScale(d.date); })
      .y(function (d) { return yScale(d.price);})

  chartGroup.append('path')
      .attr('d', line(data))
      .attr('class', 'dataLine');
}
