import { StudybotApi } from 'src/app/types/apiTypes';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DiscordAuthService } from 'src/app/services/discord-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  discordLoginRoute: string;
  digregLoginRoute: string;
  user!: StudybotApi.User;

  constructor(private _actRoute: ActivatedRoute, private _discordAuthService: DiscordAuthService) {
    this.digregLoginRoute = "https://auth.studybot.it/login/digreg";
    this.discordLoginRoute = "https://auth.studybot.it/login/discord";
  }

  ngOnInit(): void {

    /* Discord login */

    if (this._actRoute.snapshot.queryParams.token && !this._discordAuthService.checkTokenValidity())
      this._discordAuthService.storeUserData(this._actRoute.snapshot.queryParams.token)

    if (this._discordAuthService.checkTokenValidity()) {
      this._discordAuthService.getUserData().subscribe(result => {
        this.user = result;

        /* Digreg login */

        if (this._actRoute.snapshot.queryParams.digregToken && this.user) {
          this._discordAuthService.loginDigreg(this._actRoute.snapshot.queryParams.digregToken).subscribe(result => {
            this._discordAuthService.getUserData().subscribe(result => {
              this.user = result;
            })
          });
        }
      })
    }
  }

  logoutDiscord() {
    this._discordAuthService.logoutUser();
    window.location.reload();
  }

  logoutDigreg() {
    this._discordAuthService.logoutDigreg().subscribe(result => {
      window.location.reload();
    });
  }
}
