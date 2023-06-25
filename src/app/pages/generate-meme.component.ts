import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { State } from '../store';
import { Meme } from '../modules';
import { FormBuilder, Validators } from '@angular/forms';
import { untilDestroyed } from '@ngneat/until-destroy';
import { debounceTime, distinctUntilChanged, combineLatestWith } from 'rxjs';

@Component({
  selector: 'app-generate-meme',
  standalone: true,
  imports: [CommonModule],
  template: ` <div *ngIf="selectedImage; else noImage">
      <img
        class="w-1/2 object-cover"
        src="{{ selectedImage.url }}"
        alt="{{ selectedImage.name }}"
      />
      <div class="w-1/2"></div>
    </div>

    <ng-template #noImage>
      <p>Error: No Image Found.</p>
    </ng-template>`,
})
export class GenerateMemeComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}
  private _stateStore = inject(State);
  store = this._stateStore.store;
  selectedImage: Meme | undefined;

  private _formBuilder = inject(FormBuilder);
  postForm = this._formBuilder.group({
    input: ['', Validators.required],
  });

  private watchForm() {
    const bodyValuesChanges = this.postForm.get('body')?.valueChanges;
    if (bodyValuesChanges) {
      this.postForm
        .get('title')
        ?.valueChanges.pipe(
          debounceTime(1000),
          distinctUntilChanged(),
          combineLatestWith(bodyValuesChanges),
          untilDestroyed(this)
        );
    }
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.selectedImage = this.store().memes.find((meme) => meme.id === id);
    this.watchForm();
  }
}
