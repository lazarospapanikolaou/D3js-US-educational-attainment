var data = [{
    "value": "45.0",
    "date": "1995"
}, {
    "value": "45.0",
    "date": "1996"
}, {
    "value": "45.0",
    "date": "1997"
}, {
    "value": "45.0",
    "date": "1998"
}, {
    "value": "45.0",
    "date": "1999"
}, {
    "value": "45.0",
    "date": "2000"
}, {
    "value": "42.5",
    "date": "2001"
}, {
    "value": "40.0",
    "date": "2002"
}, {
    "value": "40.0",
    "date": "2003"
}, {
    "value": "40.0",
    "date": "2004"
}, {
    "value": "40.0",
    "date": "2005"
}, {  
    "value": "40.0",
    "date": "2006"
}, {
    "value": "40.0",
    "date": "2007"
}, {
    "value": "40.0",
    "date": "2008"
}, {
    "value": "40.0",
    "date": "2009"
}, {
    "value": "49.0",
    "date": "2010"
{, {
    "value": "49.0",
    "date": "2011"
}, {
    "value": "49.0",
    "date": "2012"
}, {
    "value": "46.0",
    "date": "2013"
}, {
    "value": "46.0",
    "date": "2014"
}, {
    "value": "48.0",
    "date": "2015"
}, {
    "value": "48.0",
    "date": "2016"
}, {
    "value": "55.0",
    "date": "2017"
},
           
    ];

var lineChart = d3.select("#lineChart");
var WIDTH = 700;
var HEIGHT = 400;
var MARGINS = {top: 30,right:50, bottom:30, left:50};

var xScale = d3.scale.linear().range([MARGINS.left, WIDTH-MARGINS.right]).domain([1995,2017]);
var yScale = d3.scale.linear().range([HEIGHT-MARGINS.top, MARGINS.bottom]).domain([30.0,100.0]);

var xAxes = d3.svg.axis().scale(xScale);
var yAxes = d3.svg.axis().scale(yScale).orient("left");

lineChart.append("g")
	.attr("transform", "translate(0," + (HEIGHT-MARGINS.bottom) + ")")
	.attr("class","x")
	.call(xAxes);

lineChart.append("g")
	.attr("transform", "translate(" + (MARGINS.left) + ",0)")
	.attr("class","y")
	.call(yAxes);

var line = d3.svg.line()
	.x(function(d){return xScale(d.date);})
	.y(function(d){return yScale(d.value);});

lineChart.append("path")
	.attr("d", line(data))
	.attr("stroke", "green")
	.attr("stroke-width", 2)
	.attr("fill", "none");

var points = lineChart.selectAll("dot")
	.data(data)
    	.enter().append("circle")
	.attr("class","pionts")
    	.attr("r", 5)
    	.attr("cx", function(d) { return xScale(d.date); })
    	.attr("cy", function(d) { return yScale(d.value); });

lineChart.on("mouseover", function(){points.style("display",null);});
lineChart.on("mouseout", function(){points.style("display","none");});

var pointsLineX = lineChart.append("line")
	.attr("stroke-width", 1)
	.attr("stroke", "black")
	.style("stroke-dasharray", ("3, 3"))
	.style("display", "none");

var pointsLineY = lineChart.append("line")
	.attr("stroke-width", 1)
	.attr("stroke", "black")
	.style("stroke-dasharray", ("3, 3"))
	.style("display", "none");

var textLineX = lineChart.append("text")
	.style("display", "none");

var textLineY = lineChart.append("text")
	.style("display", "none");

points.on("mouseover",function(d){
	
  pointsLineX.data(data)
	.attr("x1",xScale(d.date))
	.attr("x2",xScale(d.date))
	.attr("y1",yScale(d.value)-10)
	.attr("y2",HEIGHT-MARGINS.bottom)
	.style("display", null);
  
  pointsLineY.data(data)
	.attr("x1",0+MARGINS.left)
	.attr("x2",xScale(d.date)+10)
	.attr("y1",yScale(d.value))
	.attr("y2",yScale(d.value))
	.style("display", null);
  
   textLineX
	.attr("x",xScale(d.date)+10)
	.attr("y",(HEIGHT-MARGINS.top)-((HEIGHT-MARGINS.top-yScale(d.value))/2))
	.text(d.date)
	.style("display",null);
  
   textLineY
	.attr("x",(xScale(d.date)+MARGINS.left)/2)
	.attr("y",yScale(d.value)-10)
	.text(d.value)
	.style("display",null);
  
});

points.on("mouseout",function(){
  pointsLineX.style("display","none");
  pointsLineY.style("display","none");
  textLineY.style("display","none");
  textLineX.style("display","none");
});
