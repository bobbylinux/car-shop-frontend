import { Component } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    providers: [UserService]
})

export class RegisterComponent {
  public title: string;
  public user: User;
  public status: string;

  constructor(private _route: ActivatedRoute, private _router: Router, private _userService: UserService) {
    this.title = "Registrazione";
    this.user = new User(1,'ROLE_USER','','', '','',false);
  }

  onSubmit(form) {
    this._userService.register(this.user).subscribe(
      response => {
        this.status = response.status;
        if (response.status == 'success') {
          //svuotare il form
          this.user = new User(1,'ROLE_USER','','', '','',false); 
          form.reset();
        } else {
            this.status = 'error';
        }
      }, 
      error => {
        console.log(<any>error);
      }
    )
  }

}
