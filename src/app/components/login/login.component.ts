import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { User } from "src/app/models/user";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  providers: [UserService]
})
export class LoginComponent {
  public title: string;
  public user: User;
  public status: string;
  public token: string;
  public identity: User;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) {
    this.title = "Login";
    this.user = new User(1, "ROLE_USER", "", "", "", "", false);
  }

  ngOnInit() {
    this.logout();
  }

  onSubmit(form) {
    this._userService.signup(this.user, true).subscribe(
      response => {
        if (response.status != "error") {
          this.status = 'success';
          this.token = response;
          localStorage.setItem("token", this.token);
          this._userService.signup(this.user).subscribe(
            response => {
              this.identity = response;
              localStorage.setItem("identity", JSON.stringify(this.identity));
              //redirect ad altro componente
              this._router.navigate(["home"]);
            },
            error => {
              console.log(<any>error);
            }
          );
        } else {
          this.status = 'error';
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  logout() {
    this._route.params.subscribe(params => {
      let logout = +params["sure"];
      if (logout == 1) {
        localStorage.removeItem("identity");
        localStorage.removeItem("token");
        this.identity = null;
        this.token = null;

        //redirect ad altro componente
        this._router.navigate(["home"]);
      }
    });
  }
}
