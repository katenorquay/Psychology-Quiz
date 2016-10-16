$( document ).ready(function() {
  $('.single-item').slick();

  $(".results-button").on('click', function(event) {
    event.preventDefault();
    calculateResults();
    getCount();
    whichCharacter();
    displayCharacter();
    $(".chart-container").css("display", "block");
    $(".single-item").css("display", "none");
  });
});

function generatePie(dataset) {
  var width = 360;
  var height = 360;
  var radius = Math.min(width, height) / 2;
  var donutWidth = 75;

  var color = d3.scaleOrdinal()
    .range(['#464cf4', '#a409f2', '#ec008c', '#eff70c']);

  var svg = d3.select('#chart')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', 'translate(' + (width / 2) +  ',' + (height / 2) + ')');

    var arc = d3.arc()
      .innerRadius(radius - donutWidth)
      .outerRadius(radius);

  var pie = d3.pie()
    .value(function(d) { return d.count; })
    .sort(null);

  var path = svg.selectAll('path')
    .data(pie(dataset))
    .enter()
    .append('path')
    .attr('d', arc)
    .attr('fill', function(d, i) {
    return color(d.data.label);
  });

  var legendRectSize = 18;
  var legendSpacing = 4;

  var legend = svg.selectAll('.legend')
  .data(color.domain())
  .enter()
  .append('g')
  .attr('class', 'legend')
  .attr('transform', function(d, i) {
    var height = legendRectSize + legendSpacing;
    var offset =  height * color.domain().length / 2;
    var horz = -2 * legendRectSize;
    var vert = i * height - offset;
    return 'translate(' + horz + ',' + vert + ')';
  });

  legend.append('rect')
  .attr('width', legendRectSize)
  .attr('height', legendRectSize)
  .style('fill', color)
  .style('stroke', color);

  legend.append('text')
  .attr('x', legendRectSize + legendSpacing)
  .attr('y', legendRectSize - legendSpacing)
  .text(function(d) { return d; });

}

function countResults () {
  var testVar = $('input[type=radio]:checked');
  var countMiranda = testVar.filter("[data-vote='Miranda']").length;
  var countCarrie = testVar.filter("[data-vote='Carrie']").length;
  var countSamantha = testVar.filter("[data-vote='Samantha']").length;
  var countCharlotte = testVar.filter("[data-vote='Charlotte']").length;
  return [{
    label: "Miranda",
    count: countMiranda
  },{
    label: "Carrie",
    count: countCarrie
  },{
    label: "Samantha",
    count: countSamantha
  },{
    label: "Charlotte",
    count: countCharlotte
  }
         ]
}

function calculateResults() {
  var dataset = countResults();
  generatePie(dataset);
}



function getCount() {
  var newArray = [];
  var dataset = countResults();
  for (i = 0; i < 4; i++) {
    newArray.push(dataset[i]['count']);
  }
      return newArray;
  }

function whichCharacter() {
  var myArray = getCount();
  var largestNumber = 0;
  var indexOfGreatest = '';
  for (i =0; i < myArray.length; i++) {
    if(myArray[i] > largestNumber) {
      largestNumber = myArray[i];
      indexOfGreatest = [i]
    }
  }
  return indexOfGreatest;
}

function displayCharacter() {
  var character = whichCharacter();
  if (character == '0') {
      $("#miranda-info").css("display", "block");
  } else if (character == '1') {
      $("#carrie-info").css("display", "block");
  } else if (character == '2') {
      $("#samantha-info").css("display", "block");
  } else if (character == '3') {
      $("#charlotte-info").css("display", "block");
  }
}
