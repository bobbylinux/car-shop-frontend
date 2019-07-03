import { Component, OnInit } from "@angular/core";
import { Car } from "src/app/models/car";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "src/app/services/user.service";
import { CarService } from "src/app/services/car.service";

@Component({
  selector: "app-car-edit",
  templateUrl: "../car-new/car-new.component.html",
  providers: [UserService, CarService]
})
export class CarEditComponent implements OnInit {
  public car: Car;
  private token: string;
  private statusCar: string;
  private pageTitle: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _carService: CarService
  ) {
    this.token = this._userService.getToken();
    this.pageTitle = "Modifica auto"
  }

  ngOnInit() {
    this._route.params.subscribe(params => {
      let id = +params["id"]; //conversione in numero di una stringa
      this.getCar(id);
    });
  }

  getCar(id) {
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
  }

  onSubmit(form) {
    this._carService.update(this.token, this.car, this.car.id).subscribe(
      response => {
        if (response.status == "success") {
          this.statusCar = "success";
          this.car = response.car;
          this._router.navigate(['/cars', this.car.id]);
        }
      },
      error => {
        console.log(<any>error);
      }
    )
  }
}
