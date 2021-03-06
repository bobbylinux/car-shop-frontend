import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/user.service";
import { CarService } from "src/app/services/car.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Car } from "src/app/models/car";

@Component({
  selector: "app-car-detail",
  templateUrl: "./car-detail.component.html",
  styleUrls: ["./car-detail.component.css"],
  providers: [UserService, CarService]
})
export class CarDetailComponent implements OnInit {
  public car: Car;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _carService: CarService
  ) {}

  ngOnInit() {
    this.getCar();
  }

  getCar() {
    this._route.params.subscribe(params => {
      let id = +params["id"]; //conversione in numero di una stringa

      this._carService.getCar(id).subscribe(
        response => {
          if (response.status == "success") {
            this.car = response.car;
          } else {
            this._router.navigate(["home"]);
          }
        },
        error => {
          console.log(<any>error);
        }
      );
    });
  }
}
