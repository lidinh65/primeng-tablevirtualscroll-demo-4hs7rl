import { Component } from "@angular/core";
import { CarService } from "./carservice";
import { Car } from "./car";
import { FilterUtils } from "primeng/utils";
import { LazyLoadEvent } from "primeng/api";
import { SelectItem } from "primeng/api";
import { MessageService } from "primeng/api";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  providers: [MessageService]
})
export class AppComponent {
  cars: Car[];

  virtualCars: Car[];

  columns: any[];

  totalRecords = 500;

  constructor(private carService: CarService) {}

  ngOnInit() {
    console.log("onInit 111 ....");
    this.columns = [
      { field: "vin", header: "Vin" },
      { field: "year", header: "Year" },
      { field: "brand", header: "Brand" },
      { field: "color", header: "Color" }
    ];

    this.cars = Array.from({ length: 1000 }).map(() =>
      this.carService.generateCar()
    );
    this.virtualCars = [];
    let loadedCars = this.cars.slice(0, 100);

    //populate page of virtual cars
    Array.prototype.splice.apply(this.virtualCars, [
      ...[0, 100],
      ...loadedCars
    ]);
    //trigger change detection
    this.virtualCars = [...this.virtualCars];
  }

  loadCarsLazy(event: LazyLoadEvent) {
    console.log("\n\n loadCarsLazy(event) 2222  = " + JSON.stringify(event));
    //load data of required page
  }
}
