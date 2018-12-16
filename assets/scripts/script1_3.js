var margin = { top: 50, right: 20, bottom: 30, left: 40 },
       width = 960 - margin.left - margin.right,
       height = 500 - margin.top - margin.bottom;

    var formatPercent = d3.format(".0%");

    var x = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1, 1);

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .tickFormat(d3.format(".0"));
    //.tickFormat(formatPercent);

    var tip = d3.tip()
      .attr('class', 'd3-tip')
      .offset([-10, 0])
      .html(function (d) {
          return "<strong>Country:</strong> <span style='color:red'>" + d.country + "<br/><strong>Percentage:</strong> <span style='color:red'>" + d.Percentage + "<br/></span><span>death:</strong> <span style='color:red'>" + d.death + "</span>";
      })

    var svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.call(tip);

    var data = [
  {
    "country": "European Union",
	"countr":"EU",
    "death": 1321593
  },
  {
    "country": "Belgium",
	"countr":"BEL",
    "death": 27237
  },
  {
    "country": "Bulgaria",
	"countr":"BG",
    "death": 17957
  },
  {
    "country": "Czechia",
	"countr":"CZ",
    "death": 26862
  },
  {
    "country": "Denmark",
	"countr":"DEN",
    "death": 15403
  },
  {
    "country": "Germany",
	"countr":"GER",
    "death": 226662
  },
  {
    "country": "Estonia",
	"countr":"EST",
    "death": 3856
  },
  {
    "country": "Ireland",
	"countr":"IRE",
    "death": 8847
  },
  {
    "country": "Greece",
	"countr":"GR",
    "death": 29669
  },
  {
    "country": "Spain",
	"countr":"ESP",
    "death": 107083
  },
  {
    "country": "France",
	"countr":"FR",
    "death": 162045
  },
  {
    "country": "Croatia",
	"countr":"CRO",
    "death": 14024
  },
  {
    "country": "Italy",
	"countr":"IT",
    "death": 169835
  },
  {
    "country": "Cyprus",
	"countr":"CYP",
    "death": 1337
  },
  {
    "country": "Latvia",
	"countr":"LAT",
    "death": 5876
  },
  {
    "country": "Lithuania",
	"countr":"LIT",
    "death": 8294
  },
  {
    "country": "Luxembourg",
	"countr":"LUX",
    "death": 1057
  },
  {
    "country": "Hungary",
	"countr":"HUN",
    "death": 32772
  },
  {
    "country": "Malta",
	"countr":"MAL",
    "death": 917
  },
  {
    "country": "Netherlands",
	"countr":"NET",
    "death": 44321
  },
  {
    "country": "Austria",
	"countr":"AUS",
    "death": 20404
  },
  {
    "country": "Poland",
	"countr":"PL",
    "death": 100676
  },
  {
    "country": "Portugal",
	"countr":"POR",
    "death": 26489
  },
  {
    "country": "Romania",
	"countr":"RO",
    "death": 51075
  },
  {
    "country": "Slovenia",
	"countr":"SLV",
    "death": 6228
  },
  {
    "country": "Slovakia",
	"countr":"SLK",
    "death": 13690
  },
  {
    "country": "Finland",
	"countr":"FIN",
    "death": 12161
  },
  {
    "country": "Sweden",
	"countr":"SWE",
    "death": 22405
  },
  {
    "country": "United Kingdom",
	"countr":"UK",
    "death": 164411
  },
  {
    "country": "Iceland",
	"countr":"ICE",
    "death": 597
  },
  {
    "country": "Liechtenstein",
	"countr":"LIE",
    "death": 62
  },
  {
    "country": "Norway",
	"countr":"NOR",
    "death": 10766
  },
  {
    "country": "Switzerland",
	"countr":"SWI",
    "death": 17297
  },
  {
    "country": "Serbia",
	"countr":"SER",
    "death": 21394
  },
  {
    "country": "Turkey",
	"countr":"TUR",
    "death": 76581
  }
];

    var granddeath = 0;
    data.forEach(function (d) {
        granddeath += d.death;
    });

    data.forEach(function (d) {
        d['Percentage'] = parseFloat(((d.death / granddeath) * 100).toFixed(2));
    });

    x.domain(data.map(function (d) { return d.countr; }));
    y.domain([0, d3.max(data, function (d) { return d.Percentage; })]);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Percentage");

    svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function (d) { return x(d.countr); })
        .attr("width", x.rangeBand())
        .attr("y", function (d) { return y(d.Percentage); })
        .attr("height", function (d) { return height - y(d.Percentage); })
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide);

    d3.select("input").on("change", change);

    var xAxisDefault = x.domain(data
               .map(function (d) { return d.countr; }))
               .copy();
    function change() {
        var x0;
        if (this.checked) {
            x0 = x.domain(data.sort(this.checked
                ? function (a, b) { return b.Percentage - a.Percentage; }
                : function (a, b) { return d3.ascending(a.countr, b.countr); })
                .map(function (d) { return d.countr; }))
                .copy();
        } else {
            x0 = xAxisDefault;
        }
        svg.selectAll(".bar")
            .sort(function (a, b) { return x0(a.countr) - x0(b.countr); });

        var transition = svg.transition().duration(750),
            delay = function (d, i) { return i * 50; };

        transition.selectAll(".bar")
            .delay(delay)
            .attr("x", function (d, i) {
                return x0(d.countr);
            });

        transition.select(".x.axis")
            .call(xAxis)
          .selectAll("g")
            .delay(delay);
    }