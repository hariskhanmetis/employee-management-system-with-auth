import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { Employee } from '../models/employee.model';
import { ColorModeService } from '../services/color-mode.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit, AfterViewInit, OnDestroy {
  private pieChart!: am4charts.PieChart;
  private lollipopChart!: am4charts.XYChart;
  isDarkMode = false;

  @ViewChild('chartDiv', { static: false }) chartDiv!: ElementRef;
  @ViewChild('lollipopChartDiv', { static: false }) lollipopChartDiv!: ElementRef;

  constructor(private http: HttpClient, private colorModeService: ColorModeService) {}

  ngOnInit() {
    this.colorModeService.darkMode$.subscribe(mode => {
      this.isDarkMode = mode;
      document.body.classList.toggle('dark-mode', this.isDarkMode);
    });
    console.log(this.isDarkMode);
  }

  ngAfterViewInit() {
    this.fetchData();
  }

  fetchData() {
    this.http.get<Employee[]>('http://localhost:3000/employees').subscribe(data => {
      this.createPieChart(data);
      this.createLollipopChart(data);
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
    pieSeries.labels.template.fill = this.isDarkMode ? am4core.color("#ffffff") : am4core.color("#000000");
    pieSeries.ticks.template.stroke = this.isDarkMode ? am4core.color("#ffffff") : am4core.color("#000000");
    
    chart.hiddenState.properties.radius = am4core.percent(90);

    this.pieChart = chart;
    this.pieChart.logo.disabled = true;
  }

  createLollipopChart(employees: Employee[]) {
    am4core.useTheme(am4themes_animated);
    const categoryCounts: { [key: string]: number } = {};

    for (const emp of employees) {
      categoryCounts[emp.category] = (categoryCounts[emp.category] || 0) + 1;
    }

    const chartData = Object.entries(categoryCounts).map(([category, count]) => ({
      category,
      count
    }));

    let chart = am4core.create(this.lollipopChartDiv.nativeElement, am4charts.XYChart);
    chart.data = chartData;

    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "category";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.grid.template.strokeDasharray = "1,4";
    categoryAxis.renderer.labels.template.fontSize = 12;

    categoryAxis.renderer.minGridDistance = 20;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    valueAxis.min = 0;

    let lineSeries = chart.series.push(new am4charts.ColumnSeries());
    lineSeries.dataFields.valueY = "count";
    lineSeries.dataFields.categoryX = "category";
    lineSeries.columns.template.width =1;
    
    let circleSeries = chart.series.push(new am4charts.LineSeries());
    circleSeries.dataFields.valueY = "count";
    circleSeries.dataFields.categoryX = "category";
    circleSeries.strokeWidth = 0;

    let bullet = circleSeries.bullets.push(new am4charts.CircleBullet());
    bullet.circle.radius = 7;
    bullet.circle.stroke = am4core.color("#ffffff");
    bullet.circle.strokeWidth = 2;
    
    valueAxis.renderer.grid.template.stroke = this.isDarkMode ? am4core.color("#ffffff") : am4core.color("#000000");
    categoryAxis.renderer.grid.template.stroke = this.isDarkMode ? am4core.color("#ffffff") : am4core.color("#000000");
    categoryAxis.renderer.labels.template.fill = this.isDarkMode ? am4core.color("#ffffff") : am4core.color("#000000");
    valueAxis.renderer.labels.template.fill = this.isDarkMode ? am4core.color("#ffffff") : am4core.color("#000000"); 

   
    chart.cursor = new am4charts.XYCursor();
    let cursorColor = this.isDarkMode ? am4core.color("#ffffff") : am4core.color("#000000");
    chart.cursor.lineX.stroke = cursorColor;
    chart.cursor.lineY.stroke = cursorColor;
    this.lollipopChart = chart;
    this.lollipopChart.logo.disabled = true;
  }

  ngOnDestroy() {
    if (this.pieChart) {
      this.pieChart.dispose();
    }
    if (this.lollipopChart) {
      this.lollipopChart.dispose();
    }
  }
}
