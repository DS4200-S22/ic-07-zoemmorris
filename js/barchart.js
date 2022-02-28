/*

In-class activity 08 starter code
Prof. Mosca 
Modified: 12/08/21 

*/

// Build your bar charts in this file 


// Set dimensions and margins for plots 
const width = 900; 
const height = 450; 
const margin = {left:50, right:50, bottom:50, top:50}; 
const yTooltipOffset = 15; 


// adds an svg to the hard-coded-bar div with the given width, height, and viewbox 
const svg1 = d3
  .select("#hard-coded-bar")
  .append("svg")
  .attr("width", width-margin.left-margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);

// Hardcoded barchart data
const data1 = [
  {name: 'A', score: 92},
  {name: 'B', score: 15},
  {name: 'C', score: 67},
  {name: 'D', score: 89},
  {name: 'E', score: 53},
  {name: 'F', score: 91},
  {name: 'G', score: 18}
];

/*

  Axes

*/ 

// Gets the max y value from the given data
let maxY1 = d3.max(data1, function(d) { return d.score; });

// Gets an appropriate scale for the y-axis based on the window dimensions   
let yScale1 = d3.scaleLinear()
            .domain([0,maxY1])
            .range([height-margin.bottom,margin.top]); 

// Gets an appropriate scale for the x-axis based o n the window dimensions, and adds a bit of passing 
let xScale1 = d3.scaleBand()
            .domain(d3.range(data1.length))
            .range([margin.left, width - margin.right])
            .padding(0.1); 

//  adds y axis to the svg
svg1.append("g")
   .attr("transform", `translate(${margin.left}, 0)`) 
   .call(d3.axisLeft(yScale1)) 
   .attr("font-size", '20px'); 

// adds x axis to the svg 
svg1.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`) 
    .call(d3.axisBottom(xScale1) 
            .tickFormat(i => data1[i].name))  
    .attr("font-size", '20px'); 

/* 

  Tooltip Set-up  

*/

// creates a tooltip for the data in the bar chart
const tooltip1 = d3.select("#hard-coded-bar") 
                .append("div") 
                .attr('id', "tooltip1") 
                .style("opacity", 0) 
                .attr("class", "tooltip"); 

// adds the tooltip to the visualization for when the user hovers over a bar in the chart  
const mouseover1 = function(event, d) {
  tooltip1.html("Name: " + d.name + "<br> Score: " + d.score + "<br>") 
          .style("opacity", 1);  
}

// allows the tooltip to be seen no matter where on the bar the user is hovering over 
const mousemove1 = function(event, d) {
  tooltip1.style("left", (event.pageX)+"px") 
          .style("top", (event.pageY + yTooltipOffset) +"px"); 
}

// removes the tooltip when the user is no longer hovering over the visualization 
const mouseleave1 = function(event, d) { 
  tooltip1.style("opacity", 0); 
}

/* 

  Bars 

*/

// adds the bars to the visualization based on the data 
svg1.selectAll(".bar") 
   .data(data1) 
   .enter()  
   .append("rect") 
     .attr("class", "bar") 
     .attr("x", (d,i) => xScale1(i)) 
     .attr("y", (d) => yScale1(d.score)) 
     .attr("height", (d) => (height - margin.bottom) - yScale1(d.score)) 
     .attr("width", xScale1.bandwidth()) 
     .on("mouseover", mouseover1) 
     .on("mousemove", mousemove1)
     .on("mouseleave", mouseleave1);


// Step 11:
const svg2 = d3
  .select("#csv-bar")
  .append("svg")
  .attr("width", width-margin.left-margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);

d3.csv("data/barchart.csv").then((data) => {

  let maxY2 = d3.max(data, function(d) { return d.score; });

  let yScale2 = d3.scaleLinear()
            .domain([0,maxY2])
            .range([height-margin.bottom,margin.top]); 

  let xScale2 = d3.scaleBand()
            .domain(d3.range(data.length))
            .range([margin.left, width - margin.right])
            .padding(0.1);

  svg2.append("g")
   .attr("transform", `translate(${margin.left}, 0)`) 
   .call(d3.axisLeft(yScale2)) 
   .attr("font-size", '20px'); 

  svg2.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`) 
      .call(d3.axisBottom(xScale2) 
            .tickFormat(i => data[i].name))  
      .attr("font-size", '20px');

  const tooltip2 = d3.select("#csv-bar") 
                .append("div") 
                .attr('id', "tooltip2") 
                .style("opacity", 0) 
                .attr("class", "tooltip"); 

  const mouseover2 = function(event, d) {
    tooltip2.html("Name: " + d.name + "<br> Score: " + d.score + "<br>") 
            .style("opacity", 1);  
  }

  const mousemove2 = function(event, d) {
    tooltip2.style("left", (event.pageX)+"px") 
            .style("top", (event.pageY + yTooltipOffset) +"px"); 
  }

  const mouseleave2 = function(event, d) { 
    tooltip2.style("opacity", 0); 
  }

  svg2.selectAll(".bar")
  .data(data)
  .enter()
  .append("rect")
    .attr("class", "bar")
    .attr("x", (d,i) => xScale2(i)) 
    .attr("y", (d) => yScale2(d.score))
    .attr("height", (d) => (height - margin.bottom) - yScale2(d.score)) 
    .attr("width", xScale2.bandwidth())
    .on("mouseover", mouseover2) 
    .on("mousemove", mousemove2)
    .on("mouseleave", mouseleave2);
});




