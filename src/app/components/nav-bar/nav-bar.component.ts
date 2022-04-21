import { StudybotApi } from 'src/app/types/apiTypes';
import { DiscordAuthService } from 'src/app/services/discord-auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  slideMenuClass: string;
  user!: StudybotApi.User;

  constructor(private _discordAuthService: DiscordAuthService) {
    this.slideMenuClass = "hidden"
  }


  ngOnInit(): void {
    this._discordAuthService.getUserData().subscribe(result => {
      this.user = result;
    });
  }

  slideMenu() {
    if (this.slideMenuClass === "hidden") {
      this.slideMenuClass = "shown";
    } else {
      this.slideMenuClass = "hidden";
    }
  }

  checkLogin(): boolean {
    return this._discordAuthService.checkTokenValidity();
  }

}
