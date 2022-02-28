/*

In-class activity 08 starter code
Prof. Mosca 
Modified: 12/08/21 

*/

// Build your scatterplot in this file 

const svg3 = d3
  .select("#csv-scatter")
  .append("svg")
  .attr("width", width-margin.left-margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);

d3.csv("data/scatter.csv").then((data) => {
  let maxY = d3.max(data, function(d) { return d.score; });

  let yScale = d3.scaleLinear()
            .domain([0,maxY])
            .range([height-margin.bottom,margin.top]); 

  let xScale = d3.scaleBand()
            .domain(d3.range(data.length))
            .range([margin.left, width - margin.right])
            .padding(0.1);

  svg3.append("g")
   .attr("transform", `translate(${margin.left}, 0)`) 
   .call(d3.axisLeft(yScale)) 
   .attr("font-size", '20px'); 

  svg3.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`) 
      .call(d3.axisBottom(xScale) 
            .tickFormat(i => data[i].day))  
      .attr("font-size", '20px');

  const tooltip = d3.select("#csv-scatter") 
                .append("div") 
                .attr('id', "tooltip") 
                .style("opacity", 0) 
                .attr("class", "tooltip"); 

  const mouseover = function(event, d) {
    tooltip.html("Day: " + d.day + "<br> Score: " + d.score + "<br>") 
            .style("opacity", 1);  
  }

  const mousemove = function(event, d) {
    tooltip.style("left", (event.pageX)+"px") 
            .style("top", (event.pageY + yTooltipOffset) +"px"); 
  }

    const mouseleave = function(event, d) { 
    tooltip.style("opacity", 0); 
  }


  svg3.selectAll(".bar")
  .data(data)
  .enter()
  .append("circle")
    .attr("cx", (d, i) => xScale(i) + margin.left)
    .attr("cy", (d) => yScale(d.score))
    .attr("r", 10)
    .attr("class", "bar")
    .on("mouseover", mouseover) 
    .on("mousemove", mousemove)
    .on("mouseleave", mouseleave);
});







