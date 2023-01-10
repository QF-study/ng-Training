import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs';
import { AppStoreModule } from 'src/app/store';
import {
  playerReducer,
  PlayState,
} from 'src/app/store/reducers/player.reducer';
import { getSongList } from 'src/app/store/selectors/player.selector';

@Component({
  selector: 'app-wy-player',
  templateUrl: './wy-player.component.html',
  styleUrls: ['./wy-player.component.less'],
})
export class WyPlayerComponent implements OnInit {
  sliderValue = 35;
  bufferOffset = 70;
  constructor(private store$: Store<PlayState>) {
    this.store$.pipe(map((getSongList) => getSongList)).subscribe((list) => {
      console.log(list);
    });
    this.store$.pipe(map((getPlayList) => getPlayList)).subscribe((list) => {
      console.log(list);
    });
    this.store$
      .pipe(map((getCurrentIndex) => getCurrentIndex))
      .subscribe((index) => {
        console.log(index);
      });
  }

  ngOnInit(): void {}
}
