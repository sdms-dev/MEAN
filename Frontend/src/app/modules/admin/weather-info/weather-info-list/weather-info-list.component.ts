import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { HttpService } from "../../../../shared/http-service.service";

@Component({
  selector: 'app-weather-info-list',
  templateUrl: './weather-info-list.component.html',
  styleUrls: ['./weather-info-list.component.scss']
})
export class WeatherInfoListComponent implements OnInit {

  constructor(private httpService: HttpService) { }
  countryList: any;
  cityList: any;
  weatherInfo: any;
  selectedCountry: any;
  selectedCity: any = '';

  ngOnInit(): void {
    this.getCountries();
  }

  getCountries(): void {
    this.httpService
      .getData(`/countries`)
      .subscribe((response) => {
        this.countryList = response?.["data"]?.['data'] ? response?.["data"]?.['data'] : [];
      });
  }

  getCities(value: string): void {
    this.httpService
      .getData(`/cities?country=${value}`)
      .subscribe((response) => {
        this.cityList = response?.["data"]?.['data'] ? response?.["data"]?.['data'] : [];
      });
  }

  getWeatherInfo(value: string): void {
    this.httpService
      .getData(`/weather?search=${value}`)
      .subscribe((response) => {
        this.weatherInfo = response?.["data"] ? response?.["data"] : {};
      });
  }

  changeCountry(event){
    this.selectedCountry = event.target.value;
    this.selectedCity = '';
    this.getCities(event.target.value)
  }

  changeCity(event){
    this.selectedCity = event.target.value;
    this.getWeatherInfo(event.target.value)
  }

}
