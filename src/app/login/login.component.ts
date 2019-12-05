import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginData = {}; 
  totalData = [];
  currentUser = {};

  constructor(private loginService :LoginService,private router : Router) { }

  ngOnInit() {
  
  }
  login(){
    this.getLoginDetais();
   console.log(this.loginData);
  
  }
  getLoginDetais() {
    this.loginService.getLoginDetais().subscribe(data => { 
      this.totalData = data
      this.totalData.filter(obj => obj.first_name == this.loginData['userName'])
  .map(obj => { this.currentUser = obj; this.currentUser['auth'] = true;
  if(this.currentUser){
    this.redirectUrl();
  }

});

    }, error => console.log(error));
  }
  redirectUrl(){
    if(this.currentUser && this.currentUser['auth'] ){
      this.router.navigate(['/dashboard']);
    }
  }
}
