import { Component, OnInit } from "@angular/core";
import { Car } from "src/app/models/car";
import { CarService } from "src/app/services/car.service";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "default",
  templateUrl: "./default.component.html",
  providers: [UserService, CarService]
})
export class DefaultComponent implements OnInit {
  private title: string;
  public cars: Array<Car>;
  public token: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _carService: CarService
  ) {
    this.title = "Home Page";
    this.token = this._userService.getToken();
  }

  ngOnInit(): void {
    this.getCars();
  }

  getCars() {
    this._carService.getCars().subscribe(
      response => {
        if (response.status == "success") {
          this.cars = response.cars;
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  deleteCar(id) {
    this._carService.delete(this.token, id).subscribe(
      response => {
        this.getCars();
      }, 
      error => {
        console.log(<any>error);
      }
    )
  }
}
