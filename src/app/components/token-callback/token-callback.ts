import { Component, OnInit } from '@angular/core';
import { DiscordAuthService } from 'src/app/services/discord-auth.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: '',
  template: '',
  styles: ['']
})


export class TokenCallback implements OnInit {

  constructor(
    private _discordAuthService: DiscordAuthService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {

    // mode can be discord or digreg
    const mode = this._activatedRoute.snapshot.params.mode;
    const token = this._activatedRoute.snapshot.params.token;
    if (mode == "discord")
      this._discordAuthService.storeUserData(token)
    else if (mode == "digreg") {
      this._discordAuthService.loginDigreg(token).subscribe(data => {
        if (data.status == 200) {
          _router.navigate(['login']);
        }
      },(err) => {
        console.log(err)
      });
    }
  }

  ngOnInit(): void {

  }

}
