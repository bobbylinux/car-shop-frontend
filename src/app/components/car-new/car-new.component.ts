import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { UserService } from "src/app/services/user.service";
import { CarService } from "src/app/services/car.service";
import { Car } from "src/app/models/car";
import { User } from "src/app/models/user";

@Component({
  selector: "app-car-new",
  templateUrl: "./car-new.component.html",
  styleUrls: ["./car-new.component.css"],
  providers: [UserService, CarService]
})
export class CarNewComponent implements OnInit {
  private title: string;
  public token: string;
  public identity: User;
  public car: Car;
  public statusCar: string;
  public errorMessage: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _carService: CarService
  ) {
    this.title = "Creare nuova auto";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit() {
    if (this.identity == null) {
      this._router.navigate(["/login"]);
    }

    this.car = new Car(1, "", "", 1, "", null, null);
  }

  onSubmit(form) {
    console.log(this.car);
    this._carService.create(this.token, this.car).subscribe(
      response => {
        if (response.status == "success") {
          this.car = response.car;
          this.statusCar = "success";
          this._router.navigate(["/home"]);
        } else {
          this.statusCar = "error";
        }
      },
      error => {
        console.log(<any>error);
        this.statusCar = "error";
      }
    );
  }
}
