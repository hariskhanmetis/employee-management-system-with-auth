import { Component, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { Employee } from '../models/employee.model';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements AfterViewInit, OnDestroy {
  private chart!: am4charts.PieChart;

  @ViewChild('chartDiv', { static: false }) chartDiv!: ElementRef;

  constructor(private http: HttpClient) {}

  ngAfterViewInit() {
    this.fetchData();
  }

  fetchData() {
    this.http.get<Employee[]>('http://localhost:3000/employees').subscribe(data => {
      this.createPieChart(data);
    });
  }

  createPieChart(employees: Employee[]) {
    am4core.useTheme(am4themes_animated);
    const categoryCounts: { [key: string]: number } = {};
  
    for (const emp of employees) {
      categoryCounts[emp.category] = (categoryCounts[emp.category] || 0) + 1;
    }
  
    const chartData = Object.entries(categoryCounts).map(([category, count]) => ({
      category,
      count
    }));
  
    
    let chart = am4core.create(this.chartDiv.nativeElement, am4charts.PieChart);
    chart.data = chartData;
  
    let pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "count";
    pieSeries.dataFields.category = "category";
    pieSeries.slices.template.stroke = am4core.color("#fff");
    pieSeries.slices.template.strokeOpacity = 1;
  
    pieSeries.hiddenState.properties.opacity = 1;
    pieSeries.labels.template.fontSize = 12;

    chart.hiddenState.properties.radius = am4core.percent(90);
  
    this.chart = chart;
    this.chart.logo.disabled = true;

  }
  

  ngOnDestroy() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

}
