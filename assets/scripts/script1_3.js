
(function (d3) {
  'use strict';

  const svg = d3.select('svg');

  const width = +svg.attr('width');
  const height = +svg.attr('height');

  const render = data => {
    const xValue = d => d.death;
    const yValue = d => d.country;
    const margin = { top: 20, right: 40, bottom: 20, left: 100 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    
    const xScale = d3.scaleLinear()
      .domain([0, d3.max(data, xValue)])
      .range([0, innerWidth]);
    
    const yScale = d3.scaleBand()
      .domain(data.map(yValue))
      .range([0, innerHeight])
      .padding(0.1);
    
    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
    
    g.append('g').call(d3.axisLeft(yScale));
    g.append('g').call(d3.axisBottom(xScale))
      .attr('transform', `translate(0,${innerHeight})`);
    
    g.selectAll('rect').data(data)
      .enter().append('rect')
        .attr('y', d => yScale(yValue(d)))
        .attr('width', d => xScale(xValue(d)))
        .attr('height', yScale.bandwidth());
  };

  d3.csv('assets/data/script1_3.csv').then(data => {
    data.forEach(d => {
      d.death = (d.death/5210205)*100;
    });
    render(data);
  });

}(d3));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIHNlbGVjdCxcbiAgY3N2LFxuICBzY2FsZUxpbmVhcixcbiAgbWF4LFxuICBzY2FsZUJhbmQsXG4gIGF4aXNMZWZ0LFxuICBheGlzQm90dG9tXG59IGZyb20gJ2QzJztcblxuY29uc3Qgc3ZnID0gc2VsZWN0KCdzdmcnKTtcblxuY29uc3Qgd2lkdGggPSArc3ZnLmF0dHIoJ3dpZHRoJyk7XG5jb25zdCBoZWlnaHQgPSArc3ZnLmF0dHIoJ2hlaWdodCcpO1xuXG5jb25zdCByZW5kZXIgPSBkYXRhID0+IHtcbiAgY29uc3QgeFZhbHVlID0gZCA9PiBkLmRlYXRoXG4gIGNvbnN0IHlWYWx1ZSA9IGQgPT4gZC5jb3VudHJ5O1xuICBjb25zdCBtYXJnaW4gPSB7IHRvcDogMjAsIHJpZ2h0OiA0MCwgYm90dG9tOiAyMCwgbGVmdDogMTAwIH07XG4gIGNvbnN0IGlubmVyV2lkdGggPSB3aWR0aCAtIG1hcmdpbi5sZWZ0IC0gbWFyZ2luLnJpZ2h0O1xuICBjb25zdCBpbm5lckhlaWdodCA9IGhlaWdodCAtIG1hcmdpbi50b3AgLSBtYXJnaW4uYm90dG9tO1xuICBcbiAgY29uc3QgeFNjYWxlID0gc2NhbGVMaW5lYXIoKVxuICAgIC5kb21haW4oWzAsIG1heChkYXRhLCB4VmFsdWUpXSlcbiAgICAucmFuZ2UoWzAsIGlubmVyV2lkdGhdKTtcbiAgXG4gIGNvbnN0IHlTY2FsZSA9IHNjYWxlQmFuZCgpXG4gICAgLmRvbWFpbihkYXRhLm1hcCh5VmFsdWUpKVxuICAgIC5yYW5nZShbMCwgaW5uZXJIZWlnaHRdKVxuICAgIC5wYWRkaW5nKDAuMSk7XG4gIFxuICBjb25zdCBnID0gc3ZnLmFwcGVuZCgnZycpXG4gICAgLmF0dHIoJ3RyYW5zZm9ybScsIGB0cmFuc2xhdGUoJHttYXJnaW4ubGVmdH0sJHttYXJnaW4udG9wfSlgKTtcbiAgXG4gIGcuYXBwZW5kKCdnJykuY2FsbChheGlzTGVmdCh5U2NhbGUpKTtcbiAgZy5hcHBlbmQoJ2cnKS5jYWxsKGF4aXNCb3R0b20oeFNjYWxlKSlcbiAgICAuYXR0cigndHJhbnNmb3JtJywgYHRyYW5zbGF0ZSgwLCR7aW5uZXJIZWlnaHR9KWApO1xuICBcbiAgZy5zZWxlY3RBbGwoJ3JlY3QnKS5kYXRhKGRhdGEpXG4gICAgLmVudGVyKCkuYXBwZW5kKCdyZWN0JylcbiAgICAgIC5hdHRyKCd5JywgZCA9PiB5U2NhbGUoeVZhbHVlKGQpKSlcbiAgICAgIC5hdHRyKCd3aWR0aCcsIGQgPT4geFNjYWxlKHhWYWx1ZShkKSkpXG4gICAgICAuYXR0cignaGVpZ2h0JywgeVNjYWxlLmJhbmR3aWR0aCgpKTtcbn07XG5cbmNzdignZGF0YS5jc3YnKS50aGVuKGRhdGEgPT4ge1xuICBkYXRhLmZvckVhY2goZCA9PiB7XG4gICAgZC5wb3B1bGF0aW9uID0gK2QucG9wdWxhdGlvbiAqIDEwMDA7XG4gIH0pO1xuICByZW5kZXIoZGF0YSk7XG59KTsiXSwibmFtZXMiOlsic2VsZWN0Iiwic2NhbGVMaW5lYXIiLCJtYXgiLCJzY2FsZUJhbmQiLCJheGlzTGVmdCIsImF4aXNCb3R0b20iLCJjc3YiXSwibWFwcGluZ3MiOiI7OztFQVVBLE1BQU0sR0FBRyxHQUFHQSxTQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7O0VBRTFCLE1BQU0sS0FBSyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztFQUNqQyxNQUFNLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7O0VBRW5DLE1BQU0sTUFBTSxHQUFHLElBQUksSUFBSTtFQUN2QixFQUFFLE1BQU0sTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBSztFQUM3QixFQUFFLE1BQU0sTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDO0VBQ2hDLEVBQUUsTUFBTSxNQUFNLEdBQUcsRUFBRSxHQUFHLEVB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